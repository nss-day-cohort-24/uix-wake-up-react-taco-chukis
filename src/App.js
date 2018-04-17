import React, { Component } from 'react';
import holderImg from './img/museum.jpg';
import './App.css';
import Nav from './Nav.js';
import './App.css';
import News from './components/News';
import HockeyMain from './components/HockeyMain';

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
            <HockeyMain />    
          </div>
        {/* end hockey */}
        </div>
        {/* end weather/hockey */}
        <News />
      </div>
    );
  }
}


// componentDidMount() {
//   this.authListener = rebase.initializedApp.auth().onAuthStateChanged((user) =>{
//       if (user) {
//           this.setState({
//               authed: true,
//               loading: false,
//               uid: user.uid
//           });
      
//       } else{
//           this.setState({
//               authed: false,
//               loading: false,
//               uid: null,
//           })
//       }
//   })
// }

// componentWillUnmount() {
//   console.log("componentWillUnmount function");
// }

export default App;
