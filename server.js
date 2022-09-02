"use strict";
const express = require("express");
const cors = require("cors");
const server = express();
server.use(cors());
require("dotenv").config();
const weatherData = require("./weather.json");
const { default: axios } = require("axios");

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
server.get("/splashPhoto", getSplashPhotoHandler);

function getSplashPhotoHandler(req, res) {
  const searchPhotos = req.query.photos;
  console.log(searchPhotos); //to see the searchPhotos to the terminal
  const URL = `https://api.unsplash.com/search/photos?query=${searchPhotos}&client_id=${process.env.key}`;
  console.log(URL); //to see the url in terminal

  //   try {
  //     const apiResult = await axios.get(URL);
  //     // res.send(apiResult.data);
  //     let arrPhoto = apiResult.data.results.map((item) => {
  //       return new SplashP(item);
  //     });
  //     console.log(arrPhoto);
  //     res.send(arrPhoto);
  //   } catch {}

  axios
    .get(URL)
    .then((result) => {
      let arrPhoto = result.data.results.map((item) => {
        return new SplashP(item);
      });
      res.send(arrPhoto);
    })
    .catch((error) => {
      res.send(error);
    });
}

// https://api.themoviedb.org/3/search/movie?api_key=516a315cbe724b34d8db26e97561e390&query=Jack+Reacher

// http://localhost:3005/movie?searchMovie=amman
server.get("/movie", getMovieHandeler);

function getMovieHandeler(req, res) {
  let moviii = req.query.searchMovie;
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=516a315cbe724b34d8db26e97561e390&query=${moviii}`;
  axios
    .get(URL)
    .then((result) => {
      // console.log(result.data.results);

      let arr = result.data.results.map((item) => {
        return new Mov(item);
      });
      console.log(arr);
      res.send(arr);
    })
    .catch((error) => {
      console.log(error);
    });
}

class Mov {
  constructor(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.backdrop_path = item.backdrop_path;
  }
}

class SplashP {
  constructor(item) {
    this.url = item.urls.regular;
    this.likes = item.likes;
  }
}

// function Forcast(item){

// }  //function or class and inside it constructor

function Forcast(item) {
  this.date = item.valid_date;
  this.description = item.weather.description;
}

server.listen(PORT, () => {
  console.log(`i am istineng on port ${PORT}`);
});
