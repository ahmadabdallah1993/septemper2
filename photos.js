'use strict';
const axios = require("axios");

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


  class SplashP {
    constructor(item) {
      this.url = item.urls.regular;
      this.likes = item.likes;
    }
  }

  module.exports = getSplashPhotoHandler;