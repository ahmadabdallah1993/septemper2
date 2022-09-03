"use strict";
const express = require("express");
const cors = require("cors");
const server = express();
server.use(cors());
require("dotenv").config();
const weatherData = require("./weather.json");
const axios = require("axios");
let getSplash = require('./photos');
let movhandler = require('./movie');


const PORT = process.env.PORT || 3005;


// http://localhost:3005/
server.get("/", (req, res) => {
  console.log("helllllo from home route");
});


// http://localhost:3005/weatherLocalApi?LAT=PUT_LATITUDE&LON=PUT-LON
server.get("/weatherLocalApi", (req, res) => {
  console.log(req.query.lat);
  console.log(req.query.lon);

  let dataW = weatherData.find((item) => {
    if (item.lat == req.query.lat && item.lon == req.query.lon) {
      return item;
    }
  });
  // console.log(dataW)
  try {
    const weatherArr = dataW.data.map((item) => new Forcast(item));
    ///console.log(weatherArr); //to check it in terminal
    //res.state(200).send(weatherArr);
    res.send(weatherArr);
  } catch {}
});

// https://api.unsplash.com/search/photos?query=amman&client_id=78SAdbKiselbecZPc5yPsPVZKOsoVBMbdNgQfdOpaOw

// http://localhost:3005/splashPhoto?photos=cars
server.get("/splashPhoto", getSplash);



// https://api.themoviedb.org/3/search/movie?api_key=516a315cbe724b34d8db26e97561e390&query=Jack+Reacher

// http://localhost:3005/movie?searchMovie=amman
server.get("/movie", movhandler);




// function Forcast(item){

// }  //function or class and inside it constructor

function Forcast(item) {
  this.date = item.valid_date;
  this.description = item.weather.description;
}

server.listen(PORT, () => {
  console.log(`i am istineng on port ${PORT}`);
});
