import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from "./RangeSlider"
import axios from "axios";
import utils from "./utils";
import { LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip,Legend } from "recharts";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pressure: 1000,
      temperature: 25,
      amountOfRainfall: [],
      url: 'https://private-4945e-weather34.apiary-proxy.com/weather34/rain',
      rainChart: []
    }
  }

  componentWillMount() {
    utils.get(this.state.url).then((res) => {
      this.setState({
        amountOfRainfall: res.data[0],
        rainChart: this.getRainFallAmount(res.data[0].days)
      })
    }).catch((err) => {
      console.log("ERROR:::::::::::::: ", err)
    })
  }

  getRainFallAmount(days) {
    let newArray = days.map((val) => {
      let prediction = utils.chanceOfRain(this.state.pressure, this.state.temperature, val.amount);
      return { name: `day ${val.day}`, upperBound: prediction[2], lowerBound: prediction[0], mean: prediction[1] }
    })

    return newArray;
  }
  changeHandler(key, e) {
    
    this.setState({
      [key]: e.target.value,
      rainChart: this.getRainFallAmount(this.state.amountOfRainfall.days)
    })
  }
  render() {
    return (
      <div className="App">
        <div className="slider-container">
          <Slider min="970" max="1030" onChange={this.changeHandler.bind(this, 'pressure')} value={this.state.pressure}>
            Pressure hPa.
        </Slider>
          <Slider min="10" max="35" onChange={this.changeHandler.bind(this, 'temperature')} value={this.state.temperature}>
            Temperature
        </Slider>
        </div>
        <LineChart width={600} height={200} data={this.state.rainChart} syncId="anyId"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
           <Legend />
          <Line type='monotone' dataKey='lowerBound' stroke='#8884d8' fill='#8884d8' />
          <Line type='monotone' dataKey='mean' stroke='#82ca9d' fill='#82ca9d' />
          <Line type='monotone' dataKey='upperBound' stroke='#ffc658' fill='#ffc658' />
        </LineChart>
      </div>
    );
  }
}

export default App;
