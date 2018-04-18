import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import App from './App.js';
import logo from './img/fanatic-logo-4.2.png';
import Location from './components/Location.js';


function Nav(props) {
    return (
        <Router>
            <div className="px-3 pt-3 darkgray d-flex flex-row justify-content-between align-items-center">
                {/* <Link to='/components/Location'>Location</Link> */}
                <p className="invisible whiteTxt">fanatic</p>                
                <p className="whiteTxt"><img src={logo} width="180px"/></p>
                <p className="whiteTxt">logout</p>
            {/* <Route path='/components/Location' conponent={Location} /> */}
            </div>
        </Router>
    );
}


export default Nav;