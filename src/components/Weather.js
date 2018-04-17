import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import loading from '../img/loadinggif.gif';

let zipCode = 37216


class Weather extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            weatherLoaded: false,
            objResult: {},
            error: null,
            modal: false
        }
        
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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
            error: null,
        }, this.setState({
            modal: !this.state.modal
        }), this.getWeather());
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
                    objResult: result,
                    isHidden: true
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
                    <div><h3 className="whiteTx">Error: {error.message}</h3></div>
                </div>
            )
        } else if (!weatherLoaded) {
            return (
                <div className="d-flex align-items-center justify-content-center">
                    <img src={loading} className="w-25 h-25" alt="logo" />
                </div>
            )
        } else {
            return (
                <div className="card-tile my-3 mx-2 p-3 col-md-6">
                    <div className="d-flex flex-row align-items-center">
                        <p className="my-0 py-0 whiteTxt">{objResult.name}</p>
                        <button onClick={this.toggle}>
                            <i className="whiteTxt fas fa-location-arrow fa-sm"></i>
                        </button>
                    </div>
                    <h1 className="underline-border display-4 teal py-0 my-0">{Math.round(objResult.main.temp)}&deg;</h1>
                    <p className="py-1 whiteTxt">{objResult.weather[0].description}</p>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}></ModalHeader>
                            <ModalBody>
                                <input id="zip" type="text" className="border w-100" placeholder="enter zipcode"></input>
                            </ModalBody>
                            <ModalFooter>
                                <button className="pillbutton" onClick={this.getAnotherClicked.bind(this)}><p>change zip</p></button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    
                </div>
            )
        }
        // const Child = () => (
        // <div className='modal'>
           
        // </div>
        // )
    }
}

export default Weather;