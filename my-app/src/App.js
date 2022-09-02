import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
      weath: [],
      photoArray: []
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    //send request to the third party
    const cityName = event.target.city.value;
    const key = "pk.d63f789567346be0d16e65b136ea44aa";
    const URL = `https://us1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`;
    let resultResponce;
    try {
      resultResponce = await axios.get(URL);
      // console.log(resultResponce.data[0].lat);

      this.setState({
        display_name: resultResponce.data[0].display_name,
        lat: resultResponce.data[0].lat,
        lon: resultResponce.data[0].lon,
        correctFlag: true,
        cardFlag: true,
        errorFlag: false,
      });
    } catch {
      this.setState({
        errorFlag: true,
        correctFlag: false,
        cardFlag: false,
      });
    }
    this.weather(resultResponce.data[0].lat, resultResponce.data[0].lon);
    this.siplashSplash(cityName)

    //ahmad
  };

  weather = async (lat, lon) => {
    const url = `http://localhost:3005/weatherLocalApi?lat=${lat}&lon=${lon}`;
    try {
      const result = await axios.get(url);
      this.setState({
        dataFlag: true,
        weath: result.data,
      });
      console.log(result.data);

      // console.log('****************************',typeof result.data);
      // let a = JSON.stringify(result.data)
      // return a.map( item => item)

      //  result.data.map( item => {
      //     return (this.setState({
      //       dataFlag: true,
      //       weath: item
      //     }))
      //   })

      // console.log('---------------------',this.state.weath[0].date)
    } catch {}
  };


  siplashSplash = async (n) => {
    const URl = `http://localhost:3005/splashPhoto?photos=${n}`
    
    try{
      const gPhoto = await axios.get(URl);
      this.setState({
        photoArray: gPhoto.data
      })
      console.log(gPhoto.data)
    }catch{
      

    }
    

  }


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
            <Card.Title>Forcast for three days: </Card.Title>

            {this.state.weath.map((item) => {
              return (
                <>
                <br></br>
                  <Card.Text>Date: {item.date}</Card.Text>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <br></br>
                  </>
              );
            })}
          </Card>
        )}

        <br></br>

        <>
        
      
        {this.state.photoArray.map( item => {
          return (<Row xs={1} md={2} className="g-4">
          {Array.from({ length: 4 }).map((_, idx) => (
          <Col>
          <Card>
            <Card.Img variant="top" src={item.url} />
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                {item.likes}
              </Card.Text>
            </Card.Body>
          </Card>
          
        </Col>
        
      ))}
       </Row>)
        })}
       
        
        </>






      </div>
    );
  }
}

export default App;
