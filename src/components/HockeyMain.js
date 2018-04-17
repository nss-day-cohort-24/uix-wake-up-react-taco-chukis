import { Card, Button, CardTitle, CardText } from 'reactstrap';

import React, { Component } from 'react';


let url = 'https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff/scoreboard.json?fordate=20180414';
let username = 'batkins4';
let password = 'Cohort24';

let headers = new Headers();
class HockeyMain extends Component {

    constructor(props){
        super(props);

        this.state = {
            hockeyMainLoaded: false,
            objResult: [],
            showResult: false,
            error: null
        }
        console.log("constructor: ", constructor);

        this.showClicked=this.showClicked.bind(this);
    }

        componentDidMount() {
            this.getHockeyMain();
    }

        showClicked() {
            this.setState({
                showResult: true
            })
        }

        

        getHockeyMain() {

            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            fetch(url, {method:'GET',
            headers: headers,
            //credentials: 'user:passwd'
           })
            .then(response => response.json())
            .then(json => 
                {formatGames(json)
            
            }
        
        );



                (result) => {
                    this.setState({
                        HockeyMainLoaded: true,
                        objResult: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                }
        }
        

        render() {
            const {error, HockeyMainLoaded, objResult, showResult} = this.state;

            if(error) {
                return (
                    <div>
                        <div> Error: {error.message}</div>
                    </div>
                )
            
            } else if(!HockeyMainLoaded) {
                return <div>Loading...</div>
            } else{
                return (
                    <div>Hockey</div>
                )
            }
        }
    }

    function formatGames(json) {
        console.log("made it",json.scoreboard.gameScore);
        // const x = json.scoreboard.gameScore.maps((game,index) => 
        // <div key={index}>{game.awayTeam.City}</div>
    // )
    }

    export default HockeyMain;