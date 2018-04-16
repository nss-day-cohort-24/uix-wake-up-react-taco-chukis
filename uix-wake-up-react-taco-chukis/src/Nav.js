import React, { Component } from 'react';
import App from './App.js';


function Nav(props) {
    return (
        <div className="px-3 pt-3 darkgray d-flex flex-row justify-content-between align-items-center">
            <p className="whiteTxt">#</p>
            <p className="whiteTxt">fanatic</p>
            <p className="whiteTxt">logout</p>            
        </div>
    );
}



export default Nav;