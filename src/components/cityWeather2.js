import React, {Component} from 'react';

class CityWeathersForm2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    render() {
        return (
            <aside className='weatherForm2'>
                <h1>weather in {this.props.city}</h1>
                <p>temperature now: {this.props.tempNow}</p>
                <p>air pressure: {this.props.airPressure}</p>
                <p>humidity: {this.props.humidity}</p>
                <p>wind speed: {this.props.windSpeed}</p>
                <p>condition: {this.props.condition}</p>
            </aside>
        )
    }
}

export default CityWeathersForm2;