import React, { Component } from 'react';
import { Button, Row, Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
import './App.css';
import Geocode from "react-geocode";
import OutputTemp from "./components/OutputTemp"
import InputCoordenate from "./components/InputCoordenate"
import OutpuError from './components/OutputError';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';

const initialState = {
  latitude: "",
  longitude: "",
  location1: "",
  location2: "",
  temperature: "",
  error: "",
  googleKey: "YOUR_API_KEY",
  openweather: "YOUR_API_KEY"

}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = initialState;
  }

  //Dinamic function to add the user input to state
  updateInputValue = (event) =>{
    this.setState({[event.target.name]: event.target.value});
  }

  reset = () => {
    this.setState(initialState);
  }

  searchTemperatureByLocation = () =>{
    this.reset();
    let location = this.state.location1+" "+this.state.location2;   
    Geocode.setApiKey(this.state.googleKey);
    // Get latidude & longitude from location.
    Geocode.fromAddress(location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          latitude: lat.toFixed(3),
          longitude: lng.toFixed(3)
        });
        //Trigger temperature request
        this.getTemperature();
      },
      error => {
        this.setState({error: error.message});
      }
    );
  }

  //Verify valid timestamp
  validCache = (value) =>{
    return Math.floor(((value-new Date())/1000/60/60) << 0) < 2
  }

  //Fetch data from weather api
  loadFromApi = (url,lat,lon) =>{
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.props.onAdd({id: lat.concat(lon), temperature:data.main.temp});
      this.setState({temperature: data.main.temp});
    })
  }

  //Get temperature and save it on temperature state
  async getTemperature(){
    let lat = this.state.latitude
    let lon = this.state.longitude
    let url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+this.state.openweather

    //First I search the coordinates between the stored ones
    let storedTemperature = ""
    this.props.storedTempeatures.forEach(element => {
      if(element.id == lat.concat(lon) && this.validCache(element.date) ){
        storedTemperature = element;
      }
      //If i found a element with a expired interval it will be deleted from the store
      if(!this.validCache(element.date)){
        this.props.onDelete(element.id);
      }
    });

    //if the searched value was found in the store it will appear in the screen
    //if the the value was not found the request will bring it to us and add it in the screen and in the store
    if(storedTemperature){
      this.setState({temperature: storedTemperature.value});
    }else{
      this.loadFromApi(url,lat,lon);
    }
  }

  render() {
    return (
    <div>
      <div className="header">
        <h2>Temperature App</h2>
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
              <InputCoordenate label={"Location Reference 1"} name={"location1"} update={this.updateInputValue} value={this.state.location1}/>
              <InputCoordenate label={"Location Reference 2"} name={"location2"} update={this.updateInputValue} value={this.state.location2}/>
            </Row>
            <Row className="body-container">
              <Button name="longitude" color="primary" onClick={this.searchTemperatureByLocation}>Show Temperature</Button>
            </Row>
            </CardBody>
              <CardFooter>
                <Row className="output-container">
                  {this.state.error == "" && this.state.temperature != "" &&  
                    <OutputTemp lat={this.state.latitude} lng={this.state.longitude} temp={this.state.temperature}/>}
                  {this.state.error != "" &&
                    <OutpuError error={this.state.error} />}
                </Row>
              </CardFooter>
        </Card>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      storedTempeatures: state.temperatures
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onAdd: (temp) => dispatch({type: actionTypes.ADD, weather: temp}),
      onDelete: (temp) => dispatch({type: actionTypes.DELETE, id: temp}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
