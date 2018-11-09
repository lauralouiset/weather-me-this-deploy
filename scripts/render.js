'use strict';
const fs = require('fs');


function mergeValues(values, content){
	for(let key in values){
		// replace all {{key}} with the values in 'values' object
		content = content.replace(`{{${key}}}`, values[key]);
		}
	return content;
}

function view(templateName, values, response){
	// read from the template files
	let fileContents = fs.readFileSync(`./views/${templateName}.html`, { 'encoding': "utf8" } );
	// insert values into the content
		fileContents = mergeValues(values, fileContents);
		// write out to the response
		response.write(fileContents);
}

module.exports.view = view;