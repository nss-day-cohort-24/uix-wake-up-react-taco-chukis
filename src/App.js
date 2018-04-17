import React, { Component } from 'react';
import holderImg from './img/museum.jpg';
import './App.css';
import Nav from './Nav.js';
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

        {/* weather */}
          <div className="card-tile my-3 mx-2 p-3 col-md-6">
            <p className="display-3">33</p>
          </div>
        {/* end hockey */}
          
        {/* hockey */}
          <div className="card-tile my-3 mx-2 p-3 col-md-6">
            <p className="">Hockey Stats</p>          
          </div>
        {/* end hockey */}
        </div>
        {/* end weather/hockey */}
        <News />
      </div>
    );
  }
}

export default App;
