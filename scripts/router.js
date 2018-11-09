'use strict';
const Forecast = require('./forecast');
const render = require('./render');
const querystring = require('querystring');
const fs = require('fs');


const mime = {
	html: 'text/html',
	css: 'text/css',
	jpg: 'image/jpeg',
	png: 'image/png',
	js: 'application/javascript'
};

const getExtension = (file) => file.split('.')[1];
const staticTypes = ['css', 'js', 'png', 'jpg'];
const isStatic = (extension) => staticTypes.includes(extension) ? true : false;

// Serves up static files - css/js/jpg/png
function serveStatic(request, response){
	const type = getExtension(request.url);
	if (isStatic(type)){
		response.writeHead(200, { 'Content-type': mime[type] });
		fs.createReadStream(`.${request.url}`).pipe(response);
	}
}

// serves HTML for home route (search page)
function homeRoute(request, response) {
	if (request.url === "/") {
		
		if (request.method.toLowerCase() === "get") {
			response.writeHead(200, mime.html);
			render.view("header", {}, response);
			render.view("about", {}, response);
			render.view("search", {}, response);
			render.view("footer", {}, response);
			response.end();
		} else {
			request.on("data", postBody => {
				// get the post data from body, extract searchTerm
				const query = querystring.parse(postBody.toString());
				const tempUnit = query.tempUnit;
				//encodes URI removing spaces and unusual/accented characters
				const searchLocation = encodeURI(query.searchLocation);
				// redirect to searchterm forecast
				response.writeHead(303, { 'Location': `/${searchLocation}&${tempUnit}`});
				response.end();
			});
		}
	}
}

// serves HTML for forecast route (after search)
function forecastRoute(request, response) {
	const queryURL = request.url.replace("/", "");
	const type = getExtension(request.url) || 'forecast';
	
	if (queryURL.length !== 0 && type === 'forecast') {
		const splitQuery = queryURL.split('&');
		const searchLocation = splitQuery[0];
		const tempUnit = splitQuery[1];

		response.writeHead(200, mime.html);
		render.view("header", {}, response);
		// get forecast from APIs
		const forecast = new Forecast(searchLocation, tempUnit);
		forecast.getForecast(searchLocation).then(()=>{
		}).catch((e) => {
			console.log("Unable to complete that request.");
		});
		
		forecast.on("end", (weatherInfo) => {
			// store the values from weatherInfo Map
			const weatherValues = {};
			weatherInfo.forEach((key, value) => {
				weatherValues[value] = key;
			});
			render.view("about", {}, response);
			render.view("forecast", weatherValues, response)
			render.view("footer", {}, response)
			response.end();
		});
		
		forecast.on("error", function (error) {
			render.view("error", { errorMessage: error.message }, response);
			render.view("about", {}, response);
			render.view("search", {}, response);
			render.view("footer", {}, response)
			response.end();
		});
	}
}

module.exports.home = homeRoute;
module.exports.forecast = forecastRoute;
module.exports.static = serveStatic;