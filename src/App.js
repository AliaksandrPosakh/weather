import React, {Component} from 'react';
import './App.css';
import WeatherApi1 from './components/weatherApi1';
import WeatherApi2 from './components/weatherApi2';

class App extends Component {
  constructor() {
    super();
    this.state ={
        city : '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange (event) {
      this.setState({city: event.target.value});
  }

  render() {
    return (
      <div>
        <WeatherApi1
          handleChange={this.handleChange}
          city={this.state.city}
        />
        <WeatherApi2
          handleChange={this.handleChange}
          city={this.state.city}
        />
      </div>
    );
  }
  
}

export default App;
