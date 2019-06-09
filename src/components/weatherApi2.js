import React, {Component} from 'react';
import *as constans from '../constans/constans';
import CityWeathersForm2 from './cityWeather2';
import api from '../localStorageApi';

class WeatherApi2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityWeather: {},
            isOpen: false,
        }
        this.getWeathersData = this.getWeathersData.bind(this);
        this.renderWeatherForm = this.renderWeatherForm.bind(this);
    }

   
    
    getWeathersData() {
        const weatherCityList = api.readFromLocalStorage(constans.LOCAL_STORAGE_KEY2);
        let time = new Date().getHours();
        const newDataList = weatherCityList.filter(item => time - item.date < 2);
        console.log(newDataList);
        let x = newDataList.find(item => item.city.toLowerCase() === this.props.city.toLowerCase());
        if(x != undefined) {
            this.setState({cityWeather: x});

        }
        else {
            fetch(constans.OTHER_CITY_WEATHER_API + constans.API_KEY + '&q='  + this.props.city)
            .then(response => response.json())
            .then(data => {
                const weatherData = {
                    date: new Date().getHours(),
                    city: data.location.name, 
                    tempNow: data.current.temp_c,
                    airPressure: data.current.pressure_mb,
                    humidity: data.current.humidity,
                    windSpeed: data.current.wind_kph,
                    weatherStateName: data.current.condition.text 
                }     
                this.setState({
                    cityWeather: weatherData,
                    isOpen: true,
                });
                api.addDataInLocalStorage(this.state.cityWeather, constans.LOCAL_STORAGE_KEY2);
            });
            console.log('re');
        }   
    }
    renderWeatherForm() {
        if(this.state.isOpen) {
            return <CityWeathersForm2
                    city={this.state.cityWeather.city}
                    tempNow={this.state.cityWeather.tempNow}
                    airPressure={this.state.cityWeather.airPressure}
                    humidity={this.state.cityWeather.humidity}
                    windSpeed={this.state.cityWeather.windSpeed}
                    condition={this.state.cityWeather.weatherStateName}
                />
        }
        else {
            return <div></div>
        }
    }

    render() {
        return(
            <div>
                <button className='but2' onClick={this.getWeathersData}>show weather with apixu.com</button>
                {this.renderWeatherForm()}
            </div>
        )
    }
}

export default WeatherApi2;