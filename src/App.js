import React, { Component } from 'react';
import { Button, Row, Card, CardHeader, CardBody} from 'reactstrap';
import './App.css';
import Geocode from "react-geocode";
import OutputTemp from "./components/OutputTemp"
import InputCoordenate from "./components/InputCoordenate"

class App extends Component {

  state = {
    latitude: "-27.5914116",
    longitude: "-48.5265818",
    address: "",
    temperature: ""
  }

  //Dinamic function to add the user input to state
  updateInputValue = (event) =>{
    this.setState({[event.target.name]: event.target.value})
  }

  searchTemperatureByLocation = () =>{
    Geocode.setApiKey("AIzaSyAg6rz9WIBVRKGEo-Zqx9tjDxSTF4Yk6rs");

    // Get address from latidude & longitude.
    Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({address: address})
        //Trigger temperature request
        this.getTemperature()
      },
      error => {
        console.error(error);
      }
    );
  }

  //Get temperature and save it on temperature state
  getTemperature = () =>{
    let lat = this.state.latitude
    let lon = this.state.longitude
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c")
    .then(res => res.json())
    .then(data => {
      this.setState({temperature: data.main.temp})
    })
  }

  render() {

    return (
    <div>
      <div className="header">
        <h2>OnSign TV Temperature App</h2>
      </div>
      <div className="container">
        <Card>
          <CardHeader>
            <Row>
              Current Temperature For Location
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="body-container">
              <InputCoordenate label={"Latitude"} name={"latitude"} update={this.updateInputValue} value={this.state.latitude}/>
              <InputCoordenate label={"Longitude"} name={"longitude"} update={this.updateInputValue} value={this.state.longitude}/>
            </Row>
            <Row className="body-container">
              <Button name="longitude" color="primary" onClick={this.searchTemperatureByLocation}>Show Temperature</Button>
            </Row>
            </CardBody>
            {this.state.temperature != "" && <OutputTemp address={this.state.address} temp={this.state.temperature}/>}
        </Card>
      </div>
    </div>
    );
  }
}

export default App;
