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
  console.log(dataW)
  res.send(dataW);
});

server.listen(PORT, () => {
  console.log(`i am istineng on port ${PORT}`);
});
