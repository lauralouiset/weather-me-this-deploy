#WEATHER ME THIS!
(HEROKU LINK)
https://lauraloui.se

Weather Me This! is a weather forecasting app built by Laura-Louise Tobin as a project to learn Node.js!


Weather Me This! is powered by Google Places Autocomplete API, Google Maps Geocoding API, with weather information from the Dark Sky weather forecast API (https://darksky.net/poweredby/).

This app is deployed via Heroku and can be seen here(LINK GOES HERE!!)

#How It Works

Weather Me This! is build in vanilla Node.js -- that's right, no Express! In order to learn Node.js as best as I could, I decided to stick to vanilla Node. Creation of a web server, routing, and retrieval of static files (js, css, and images) as well as dynamically-rendered html templates are all handled by native node modules including FileSystem (for reading and writing files, and creating streams), Event Emitter (for passing around forecast data and error messages to different parts of the app), and the http module (for creating a web server and parsing request and response data). 

When a search is made, a POST request is sent to the server, which redirects to the forecast route. The request URL is parsed for search location and temperature units (Celcius or Fahrenheit). An API call is made to the Google Maps Geocoding API to provide latitudinal and longitudinal coordinates, which are passed in turn to the Dark Sky Weather API (with the specified temperature units encoded). Date information is provided with the Date() object; postal codes are removed from the displayed search location with RegEx patterns; the search input is Google Autocomplete-enabled. The code was then transpiled with Babel and deployed via Heroku.


Additional tools used in this project include jQuery (for front-end functionality), Axios (for API info retrieval), Babel, Sass, and CSS Grid.
			

Weather icons c/o <a href="https://www.flaticon.com/packs/weather-151">FlatIcon</a>. Link svg icons c/o <a href="https://fontawesome.com/license">FontAwesome</a>.>



STRETCH GOALS


- fix command line app with sectioned out functions and correctly-done chained api calls
-- using callbacks or promises, and http.get();
