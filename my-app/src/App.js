import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      lat: "",
      lon: "",
      error: "soory something went wrong",
      errorFlag: false,
      correctFlag: false,
      cardFlag: false,
      dataFlag: false,
      wind_dir: 0,
      low_temp: 0,
      max_temp: 0,
      moonset_ts: 0,
      datetime: "",
      temp: 0,
      min_temp: 0,
      clouds_mid: 0,
      clouds_low: 0,
      description: "",
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    //send request to the third party
    const cityName = event.target.city.value;
    const key = "pk.d63f789567346be0d16e65b136ea44aa";
    const URL = `https://us1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`;

    try {
      let resultResponce = await axios.get(URL);
      // console.log(resultResponce.data[0].lat);

      this.setState({
        display_name: resultResponce.data[0].display_name,
        lat: resultResponce.data[0].lat,
        lon: resultResponce.data[0].lon,
        correctFlag: true,
        cardFlag: true,
        errorFlag: false,
      });
      this.weather(resultResponce.data[0].lat, resultResponce.data[0].lon);
    } catch {
      this.setState({
        errorFlag: true,
        correctFlag: false,
        cardFlag: false,
      });
    }

    //ahmad
  };

  weather = async (lat, lon) => {
    const url = `http://localhost:3005/weatherLocalApi?lat=${lat}&lon=${lon}`;
    try {
      const result = await axios.get(url);
      console.log(result.data.data[0].wind_dir);
      this.setState({
        dataFlag: true,
        wind_dir: result.data.data[0].wind_dir,
        low_temp: result.data.data[0].low_temp,
        max_temp: result.data.max_temp,
        moonset_ts: result.data.data[0].moonset_ts,
        datetime: result.data.data[0].datetime,
        temp: result.data.data[0].temp,
        min_temp: result.data.data[0].min_temp,
        clouds_mid: result.data.data[0].clouds_mid,
        clouds_low: result.data.data[0].clouds_low,
        description: result.data.data[0].weather.description,
      });
    } catch {}
  };

  render() {
    return (
      <div>
        <h1>location Application</h1>

        <Form onSubmit={this.getLocationData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="please enter a city name..."
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <br></br>
        {this.state.cardFlag && (
          <Card style={{ width: "100rem" }}>
            {this.state.correctFlag && (
              <Card.Img
                variant="top"
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.d63f789567346be0d16e65b136ea44aa&center=${this.state.lat},${this.state.lon}`}
              />
            )}
            <Card.Body>
              <Card.Text>
                {this.state.correctFlag && (
                  <h3>Display Name: {this.state.display_name}</h3>
                )}
                {this.state.correctFlag && <p>Longitude: {this.state.lon}</p>}
                {this.state.correctFlag && <p>Latitude: {this.state.lat}</p>}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {this.state.errorFlag && <h4>Error: {this.state.error}</h4>}

        {this.state.dataFlag && (
          <Card className="bg-dark text-white">
            
              <Card.Title>Forcast: </Card.Title>
              <Card.Text></Card.Text>
              <Card.Text>wind_dir: {this.state.wind_dir}</Card.Text>
              <Card.Text>low_temp: {this.state.low_temp}</Card.Text>
              <Card.Text>max_temp: {this.state.max_temp}</Card.Text>
              <Card.Text>moonset_ts: {this.state.moonset_ts}</Card.Text>
              <Card.Text>
              temp: {this.state.temp}
              </Card.Text>
              <Card.Text>datetime: {this.state.datetime}</Card.Text>
              <Card.Text>min_temp: {this.state.min_temp}</Card.Text>
              <Card.Text>clouds_mid: {this.state.clouds_mid}</Card.Text>
              <Card.Text>clouds_low: {this.state.clouds_low}</Card.Text>
              <Card.Text>description: {this.state.description}</Card.Text>
            
          </Card>
        )}

        <br></br>
      </div>
    );
  }
}

export default App;
