import React, { Component } from 'react';
import './App.css';
import News from './components/News';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to React</h1>
        </header>
       
        <News />
      </div>
    );
  }
}

export default App;
