'use strict';
const axios = require("axios");

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

  module.exports = getMovieHandeler;
  