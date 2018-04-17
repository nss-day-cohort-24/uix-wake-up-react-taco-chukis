import React, { Component } from 'react';

// url for box score API.
// Still need to add a function to retrieve current date.

let url = 'https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff/scoreboard.json?fordate=20180414';
let username = 'batkins4';
let password = 'Cohort24';

// new Headers() required for authenticating API

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
// calls the main API call function
        componentDidMount() {
            this.getHockeyMain();
    }

        showClicked() {
            this.setState({
                showResult: false
            })
        }

        
// main function to call API
        getHockeyMain() {

            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            fetch(url, {method:'GET',
            headers: headers,
            //credentials: 'user:passwd'
           })
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        hockeyMainLoaded: true,
                        objResult: result
                    });
                    console.log("result: ", result);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                })
            
        

        }
        

        render() {
            const {error, hockeyMainLoaded, objResult, showResult} = this.state;

            if(error) {
                return (
                    <div>
                        <div> Error: {error.message}</div>
                    </div>
                )
            
            } else if(!hockeyMainLoaded) {
                return <div>Loading...</div>
            } else{
                // defines variable to retrieve array of different games per day
                let games = objResult.scoreboard.gameScore;
                console.log("games",games);
                // runs through each game and finds the away team and home team as well as scores
                let gamesList = games.map((link,index) => (
            //    link.game.awayTeam.City;
                    <div className="game-list" key={index}>
                        <div className="teams">
                            {link.game.awayTeam.City}: {link.awayScore}
                            <br></br>
                            {link.game.homeTeam.City}: {link.homeScore}
                            <hr></hr>
                        </div>

                    </div>
                ));
                console.log("state",this.state);
                console.log("gamesList",gamesList);
                return (
                    <div>{gamesList}</div>
                )
            }
        }
    }


    export default HockeyMain;