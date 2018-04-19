import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import App from './App.js';
import logo from './img/fanatic-logo-4.2.png';
import {loginWithGoogle} from './components/auth';
import { logout } from './components/auth';
import {user} from './components/base';

class Nav extends Component {

    
    render(){
        if (this.state.uid != null) {
            return (
                <div className="px-3 pt-3 darkgray d-flex flex-row justify-content-between align-items-center">
                    <a onClick={() => { logout() }}>logout</a>
                    <p className="whiteTxt"><img src={logo} alt="" width="180px" /></p>
                    <p className="whiteTxt"><i class="fas fa-star fa-lg"></i></p>
                </div>
            );
        } else {
            return (
                <div className="px-3 pt-3 darkgray d-flex flex-row justify-content-between align-items-center">
                    <a onClick={() => { loginWithGoogle() }}>login</a>
                    <p className="whiteTxt"><img src={logo} alt="" width="180px" /></p>
                    <p className="whiteTxt"><i class="fas fa-star fa-lg"></i></p>
                </div>
            );    
        }
    }
}


export default Nav;