import React, { Component } from 'react';

let zipCode = 37216


class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherLoaded: false,
            objResult: {},
            error: null
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.getWeather();
    }


    getAnotherClicked() {
        console.log("get another");
        zipCode = document.getElementById("zip").value;
        console.log("zipcode", zipCode);
        this.setState({
            weatherLoaded: false,
            objResult: {},
            error: null
        }, this.getWeather());
    }


    getWeather() {
        console.log("get Weather");
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=1765613948f4837c08e40e5267e00dc0&units=imperial`)
            .then(res => res.json())
            .then(
            (result) => {
                console.log("result", result);
                this.setState({
                    weatherLoaded: true,
                    objResult: result
                });
            },
            (error) => {
                console.log("error");
                this.setState({
                    isLoaded: true,
                    error: error
                });
            })
    }
    render() {
        const { error, weatherLoaded, objResult } = this.state;

        if (error) {
            return (
                <div>
                    <div>Error: {error.message}</div>
                </div>
            )
        } else if (!weatherLoaded) {
            return <div>Loading... </div>
        } else {
            return (
                <div className="card-tile my-3 mx-2 p-3 col-md-6">
                    <p className="my-0 py-0 whiteTxt">{objResult.name}</p>
                    <h1 className="underline-border display-4 teal py-0 my-0">{Math.round(objResult.main.temp)}&deg;</h1>
                    <p className="py-1 whiteTxt">{objResult.weather[0].description}</p>
                    {/* <input id="zip" type="text"></input>
                    <button onClick={this.getAnotherClicked.bind(this)}>Get Weather</button> */}
                </div>
            )
        }
    }
}

export default Weather;