import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import firebase from 'firebase';

// url for box score API.
// Still need to add a function to retrieve current date.
let team = "NSH";
// let url = `https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff/team_gamelogs.json?team=${team}&&date=since-3-days-ago`;
let username = 'batkins4';
let password = 'Cohort24';
// gameResult is the variabl that holds the L or the W for the team's loss or win
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


        this.toggle = this.toggle.bind(this);
        this.getHockeyMain = this.getHockeyMain.bind(this);
        this.getUser = this.getUser.bind(this);


    }

        toggle() {
            this.setState({
                modal: !this.state.modal
            });
        }        
// calls the main API call function
componentDidMount() {
            this.getHockeyMain();
    }
    
    getUser() {
    
        var userTeam = this.props.userObj.team;
        console.log("userTeam", userTeam);
        this.getWeather(userTeam);
      
    }

// When the button within the modal is clicked, it will go here and reset the state, then run the getHockeyMain function
        getAnotherClicked() {


            team = document.getElementById("teams").value;
            this.props.updateTeam(team);

        this.setState({
                modal: !this.state.modal
            })
            this.getHockeyMain();
        }

        
// main function to call API
        getHockeyMain() {

            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            fetch(`https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff/team_gamelogs.json?team=${team}&&date=since-7-days-ago`, {method:'GET',
            headers: headers,
           })
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        hockeyMainLoaded: true,
                        objResult: result
                    });

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                })
            
        

        }
        

        render() {
            const {error, hockeyMainLoaded, objResult} = this.state;

            if(error) {
                return (
                    <div>
                        <div> Error: {error.message}</div>
                    </div>
                )
            
            } else if(!hockeyMainLoaded) {
                return <div>Loading...</div>
            } else{     
                
                let games = objResult.teamgamelogs.gamelogs;
                let z= games.length-1;
                if(games[`${z}`].stats.Wins["#text"] == "1"){
                    gameResult = <h1 className="win">W</h1>
                }
                else{
                    gameResult = <h1 className="loss">L</h1>
                }
                if(games[`${z}`].game.awayTeam.Abbreviation == team){
                return (
                <div>
                    <div className="whiteTxt">
                    <div className="whiteTxt">
                    <p className="my-0 py-0">Last Game:</p>
                    <hr></hr>
                    <div className="d-flex flex-row">
                        {gameResult}
                        <div>
                            <p className="my-0 py-0">{games[`${z}`].game.awayTeam.City}: {games[`${z}`].stats.GoalsFor["#text"]}
                            <br></br>
                            {games[`${z}`].game.homeTeam.City}: {games[`${z}`].stats.GoalsAgainst["#text"]}</p>
                            <hr></hr>
                        </div>
                    </div>
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

                return (
                    <div>
                        <div className="whiteTxt">
                        <div className="whiteTxt">
                            <p className="pb-1 mb-0 underline-border">Last game:<br />{moment(games[`${z}`].game.date).format('dddd[,] MMM Do')}</p>
                            <div className="underline-border mb-1 d-flex flex-row justify-content-center">
                                <div className="mr-3 mb-0 pb-0 align-self-center">
                                    {gameResult}
                                </div>
                                <div className="align-self-center">
                                    {/* <hr></hr> */}
                                    <p className="my-0 py-0">{games[`${z}`].game.awayTeam.City}: {games[`${z}`].stats.GoalsAgainst["#text"]}</p>
                                    {/* <br></br> */}
                                    <p className="my-0 py-0">{games[`${z}`].game.homeTeam.City}: {games[`${z}`].stats.GoalsFor["#text"]}</p>
                                    {/* <hr></hr> */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="" onClick={this.toggle}>
                                    <i className="whiteTxt fas fa-trophy"></i>
                                </button>
                            </div>
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