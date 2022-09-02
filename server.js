const express = require("express");

const cors = require("cors");

const server = express();

server.use(cors());

const weatherData = require("./weather.json");

PORT = 3005;

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
  try{
    const weatherArr = dataW.data.map( item => new Forcast(item))
    ///console.log(weatherArr); //to check it in terminal
    //res.state(200).send(weatherArr);
    res.send(weatherArr);
  }catch{

  }
 
});

// function Forcast(item){

// }  //function or class and inside it constructor

function Forcast(item){
  
    this.date =  item.valid_date;
    this.description = item.weather.description;
  
}


server.listen(PORT, () => {
  console.log(`i am istineng on port ${PORT}`);
});
