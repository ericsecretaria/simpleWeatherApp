//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  const url = "https://api.weatherapi.com/v1/forecast.json?key=92307089306b4da889574214232204&q=London&days=7&aqi=no&alerts=no";

  https.get(url, function(response){
    console.log(response.statusCode);

    let data = "";

    response.on("data", function(chunk){
      data += chunk;
    });

    response.on("end", function(){
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const query = weatherData.location.name;
      const currLocal = weatherData.location.localtime;

      const day1 = weatherData.forecast.forecastday[0].date;
      const day1Condition = weatherData.current.condition.text;
      const day1Temp = weatherData.current.temp_c;

      res.write("<h1>You're currently looking at the weather in " + query + " as of " + currLocal + ".</h1>");
      res.write("<hr>");
      res.write("<p>The weather as of " + day1 + " is " + day1Condition + " with a " + day1Temp +" degree celcius.</p>");
      res.send();
    });
  });

});

app.listen(3000, function(){
  console.log("The server is running on port 3000");
});


// 92307089306b4da889574214232204 - api key
// https://www.weatherapi.com/my/ - website
// api call below:
// https://api.weatherapi.com/v1/forecast.json?key=92307089306b4da889574214232204&q=London&days=7&aqi=no&alerts=no
