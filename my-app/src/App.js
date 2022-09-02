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
      weath: []
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
     
      // console.log(result.data);
      
      result.data.map( item => {
        this.setState({
          dataFlag: true,
          weath: this.state.weath.push(item)
        })
      })
      
      console.log(this.state.weath[0].date)
    
    } catch {

    }
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

        {this.state.dataFlag && 
  
    <Card className="bg-dark text-white">
     
      
        <Card.Title>Forcast</Card.Title>
        

      {this.state.weath.map( item => {
        return <Card.Text>{item.date}</Card.Text>
      })}
        
        <Card.Text>Last updated 3 mins ago</Card.Text>
    </Card>}

        

        

         
        

        <br></br>
      </div>
    );
  }
}

export default App;
