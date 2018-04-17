import React, { Component } from 'react';
import holderImg from './img/museum.jpg';
import './App.css';
import Nav from './Nav.js';
import Weather from './components/Weather.js';
import './App.css';
import News from './components/News';

class App extends Component {
  render() {
    return (
      <div className="">
        <header>
          <Nav />
        </header>
        
        <div className="d-flex flex-row justify-content-around">
        {/* weather hockey */}
            <Weather />
        {/* hockey */}
          <div className="card-tile my-3 mx-2 p-3 col-md-6">
            <p className="">Hockey Stats</p>          
          </div>
        {/* end hockey */}
        </div>
        {/* end weather/hockey */}
        {/* news */}
        <div>
        {/* news card */}
          <div className="card-tile card my-3 mx-2">
            <img className="card-tile-img card-img-top" src={holderImg} alt="Card image cap" />
              <div className="card-tile-news card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
          </div>
        {/* end news card  */}
        </div>
      {/* end news */}
      </div>
    );
  }
}

export default App;
