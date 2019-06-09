import React, {Component} from 'react';
import *as constans from '../constans/constans';
import CityWeathersForm from './cityweather';
import api from '../localStorageApi';

class WeatherApi1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityWeather: {},
            isOpen: false
        }
        this.getWeathersData = this.getWeathersData.bind(this);
        this.renderWeatherForm = this.renderWeatherForm.bind(this);
    }
    handleChange (event) {
        this.setState({citiesName: event.target.value});
    }
       
    getWeathersData() {
        const weatherCityList = api.readFromLocalStorage(constans.LOCAL_STORAGE_KEY1);
        let time = new Date().getHours();
        const newDataList = weatherCityList.filter(item => time - item.date < 1);
        console.log(newDataList);
        let x = newDataList.find(item => item.city.toLowerCase() === this.props.city.toLowerCase());
        if(x != undefined) {
            this.setState({cityWeather: x});

        }
        else {
            fetch(constans.PROXY_URL + constans.URL + this.props.city)
                .then(response => response.json())
                .then(data => {
                    const firstCity = data[0];
                    return firstCity.woeid;
                })

                .then(cityId =>
                    fetch(constans.PROXY_URL + constans.CITY_WEATHER_URL + cityId)
                        .then(response => response.json())
                        .then(data => {
                            const x = data.consolidated_weather;
                            const weatherParam = x[0];
                            const weathersData = {
                                date: new Date().getHours(),
                                city: data.title,
                                maxTemp: weatherParam.max_temp,
                                minTemp: weatherParam.min_temp,
                                tempNow: weatherParam.the_temp,
                                airPressure: weatherParam.air_pressure,
                                humidity: weatherParam.humidity,
                                windSpeed: weatherParam.wind_speed,
                                weatherStateName: weatherParam.weather_state_name
                            }
                            this.setState({cityWeather: weathersData, isOpen: true});
                            api.addDataInLocalStorage(this.state.cityWeather, constans.LOCAL_STORAGE_KEY1);
                        })
                )
                console.log('re1');
        }      
    }

    closeWeathersForm() {
        this.setState({isOpen: false});
    }
    renderWeatherForm() {
        if(this.state.isOpen) {
            return <CityWeathersForm
                    renderWeatherForm={this.renderWeatherForm}
                    city={this.state.cityWeather.city}
                    maxTemp={this.state.cityWeather.maxTemp}
                    minTemp={this.state.cityWeather.minTemp}
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
        return (
            <div>
                <input  onChange={this.props.handleChange} value={this.props.citiesName} placeholder='insert city...'/>
                <button className='but1' onClick={this.getWeathersData}>show weather on metaWeather.com</button>
                {this.renderWeatherForm()} 
            </div>
        )
    }
}

export default WeatherApi1;