import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

// url for box score API.
// Still need to add a function to retrieve current date.
let team = "NSH";
// let url = `https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff/team_gamelogs.json?team=${team}&&date=since-3-days-ago`;
let username = 'batkins4';
let password = 'Cohort24';
let gameResult;


// new Headers() required for authenticating API

let headers = new Headers();
class HockeyMain extends Component {


    constructor(props){
        super(props);

        this.state = {
            hockeyMainLoaded: false,
            objResult: [],
            showResult: false,
            error: null,
            modal: false
        }
        console.log("constructor: ", constructor);

        this.toggle = this.toggle.bind(this);


    }
// calls the main API call function
        toggle() {
            this.setState({
                modal: !this.state.modal
            });
        }        

componentDidMount() {
            this.getHockeyMain();
    }

        showClicked() {
            this.setState({
                showResult: false
            })
        }


        getAnotherClicked() {
            console.log("get another");
            team = document.getElementById("teams").value;
            console.log("team", team);
            this.setState({
               hockeyMainLoaded: false,
                objResult: [],
                error: null,
            }, this.setState({
                modal: !this.state.modal
            }), this.getHockeyMain());
        }

        
// main function to call API
        getHockeyMain() {

            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            fetch(`https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff/team_gamelogs.json?team=${team}&&date=since-3-days-ago`, {method:'GET',
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
                console.log("state",this.state);
                console.log("THIS IS THE OBJ RESULT",objResult);
                let games = objResult.teamgamelogs.gamelogs;
                if(games["0"].stats.Wins["#text"] == "1"){
                    gameResult = <h1 className="win">W</h1>
                }
                else{
                    gameResult = <h1 className="loss">L</h1>
                }
                if(games["0"].game.awayTeam.Abbreviation == team){

                    console.log("games",games);    
                return (
                <div>
                    <div className="whiteTxt">
                    <div className="whiteTxt">
                    <p className="my-0 py-0">{moment(games["0"].game.date).format('ddd[,] MMM Do')}</p>
                    <hr></hr>
                    <p className="my-0 py-0">{games["0"].game.awayTeam.City}: {games["0"].stats.GoalsAgainst["#text"]}
                        <br></br>
                        {games["0"].game.homeTeam.City}: {games["0"].stats.GoalsFor["#text"]}</p>
                        <hr></hr>
                        {gameResult}
                        <button onClick={this.toggle}>
                        <i className="fas fa-trophy"></i>
                        </button>
                    </div>

                </div>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Choose Your Favorite Team</ModalHeader>
                        <ModalBody>
                            <select id="teams">
                                <option value="NSH">Nashville Predators</option>
                                <option value="COL">Colorado Avalanche</option>
                                <option value="WPJ">Winnipeg Jets</option>
                                <option value="MIN">Minnesota Wild</option>
                                <option value="VGK">Vegas Golden Knights</option>
                                <option value="LAK">LA Kings</option>
                                <option value="ANA">Anneheim Ducks</option>
                                <option value="SJS">San Jose Sharks</option>
                                <option value="WSH">Washington Capitals</option>
                                <option value="CBJ">Columbus Blue Jackets</option>
                                <option value="PIT">Shittsburg Penguins</option>
                                <option value="PHI">Philadelphia Flyers</option>
                                <option value="TBL">Tampa Bay Lightning </option>
                                <option value="NJD">New Jersey Devils</option>
                                <option value="BOS">Boston Bruins</option>
                                <option value="TOR">Toronto Maple Leafs</option>
                            </select>
                        </ModalBody>
                        <ModalFooter>
                            <button className="pillbutton" onClick={this.getAnotherClicked.bind(this)}><p>change team</p></button>
                        </ModalFooter>
                        </Modal>
                    </div>
                </div>
                    
                )
            }else{
                console.log("games",games);    
                return (
                    <div>
                        <div className="whiteTxt">
                        <div className="whiteTxt">
                            <p className="my-0 py-0">{moment(games["0"].game.date).format('ddd[,] MMM Do')}</p>
                            <hr></hr>
                            <p className="my-0 py-0">{games["0"].game.awayTeam.City}: {games["0"].stats.GoalsAgainst["#text"]}
                            <br></br>
                            {games["0"].game.homeTeam.City}: {games["0"].stats.GoalsFor["#text"]}</p>
                            <hr></hr>
                            {gameResult}
                            <button onClick={this.toggle}>
                            <i className="fas fa-trophy"></i>
                            </button>
                        </div>
    
                    </div>
                        <div>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Choose Your Favorite Team</ModalHeader>
                            <ModalBody>
                            Choose Your Favorite Team
                                <select id="teams">
                                <option value="NSH">Nashville Predators</option>
                                <option value="COL">Colorado Avalanche</option>
                                <option value="WPJ">Winnipeg Jets</option>
                                <option value="MIN">Minnesota Wild</option>
                                <option value="VGK">Vegas Golden Knights</option>
                                <option value="LAK">LA Kings</option>
                                <option value="ANA">Anneheim Ducks</option>
                                <option value="SJS">San Jose Sharks</option>
                                <option value="WSH">Washington Capitals</option>
                                <option value="CBJ">Columbus Blue Jackets</option>
                                <option value="PIT">Shittsburg Penguins</option>
                                <option value="PHI">Philadelphia Flyers</option>
                                <option value="TBL">Tampa Bay Lightning </option>
                                <option value="NJD">New Jersey Devils</option>
                                <option value="BOS">Boston Bruins</option>
                                <option value="TOR">Toronto Maple Leafs</option>
                                </select>
                            </ModalBody>
                            <ModalFooter>
                                <button className="pillbutton" onClick={this.getAnotherClicked.bind(this)}><p>change team</p></button>
                            </ModalFooter>
                            </Modal>
                        </div>
                    </div>


                )}
            }
        }
    }


    export default HockeyMain;