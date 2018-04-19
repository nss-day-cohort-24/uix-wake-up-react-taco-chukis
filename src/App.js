import React, { Component } from 'react';
import holderImg from './img/museum.jpg';
import './App.css';
import Nav from './Nav.js';
import Weather from './components/Weather.js';
import './App.css';
import News from './components/News';
import HockeyMain from './components/HockeyMain';
import {rebase} from './components/base';
import logo from './img/fanatic-logo-4.2.png';
import { loginWithGoogle } from './components/auth';
import { logout } from './components/auth';
import firebase from 'firebase'

const defaultzip = 37216; 
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authed: false,
      loading: true,
      userObj: {
        zip: 37216,
        uid: null
      }
    }
    this.updateZip = this.updateZip.bind(this);
  }
  
componentDidMount() {
  this.authListener = rebase.initializedApp.auth().onAuthStateChanged((user) =>{
    // console.log("USER", user);
      if (user) {
          this.setState({
              authed: true,
              loading: false,
              userObj: {
                zip: user.zip,
                uid: user.uid
              }
              
            });
        console.log("user.userObj", this.state.userObj)
      } else{
          this.setState({
              authed: false,
              loading: false,
              userObj: {
                zip: 37216,
                uid: null
              }
          })
      }
  })
}

componentWillMount() {

  console.log("componentWillUnmount function");
  // this.ref = rebase.syncState(`/users/${this.state.userObj.uid}/`, {
  //     context: this,
  //     state: 'userObj'
  // })
}

updateZip(zipCode){
  console.log("zipcode updateZip", zipCode);
  const userObj = {...this.state.userObj};
  userObj.zip = zipCode;
  this.setState({userObj});
  console.log("userobj", {userObj})

  var userRef = firebase.database().ref(`/users/${this.state.userObj.uid}`);
        userRef.update({ zip: zipCode });

   this.ref = rebase.syncState(`/users/${this.state.userObj.uid}/`, {
      context: this,
      state: 'userObj'
  })
}


  render() {
    return (
      <div className="">
        <header>
          {this.state.authed ?

            <div className="px-3 pt-3 darkgray d-flex flex-row justify-content-between align-items-center">
              <a onClick={() => { logout() }}>logout</a>
              <p className="whiteTxt"><img src={logo} width="180px" /></p>
              <p className="whiteTxt"><i className="fas fa-star fa-lg"></i></p>
            </div>
          :
            <div className="px-3 pt-3 darkgray d-flex flex-row justify-content-between align-items-center">
              <a onClick={() => { loginWithGoogle() }}>login</a>
              <p className="whiteTxt"><img src={logo} width="180px" /></p>
              <p className="invisible whiteTxt"><i className="fas fa-star fa-lg"></i></p>
            </div>
           
          }
          {/* <Nav /> */}
        </header>
        
        <div className="d-flex flex-row justify-content-around">
        {/* weather hockey */}
            <Weather userObj={this.state.userObj}
              updateZip={this.updateZip} />
            
        {/* hockey */}
          <div className="card-tile my-3 mx-2 p-3 col-md-6">    
            <HockeyMain uid={this.state.uid}/>    
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
