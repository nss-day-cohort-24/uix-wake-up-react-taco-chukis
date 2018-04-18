import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// url for box score API.
// Still need to add a function to retrieve current date.

let url = 'https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff/team_gamelogs.json?team=nsh&&date=since-3-days-ago';
let username = 'batkins4';
let password = 'Cohort24';
let gamesList;
let team = "NSH";
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
               teamLoaded: false,
                objResult: {},
                error: null,
            }, this.setState({
                modal: !this.state.modal
            }), this.getHockeyMain());
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
                console.log("state",this.state);
                console.log("gamesList",gamesList);
                let games = objResult.teamgamelogs.gamelogs;
                if(games["0"].game.awayTeam.Abbreviation == "NSH"){

                    console.log("games",games);    
                return (
                <div>
                    <button onClick={this.toggle}>
                        <i className="whiteTxt fas fa-location-arrow fa-sm"></i>
                    </button>
                    <div className="game-list">
                    <div className="teams">
                    {games["0"].game.date}
                    <br></br>
                        {games["0"].game.awayTeam.City}: {games["0"].stats.GoalsAgainst["#text"]}
                        <br></br>
                        {games["0"].game.homeTeam.City}: {games["0"].stats.GoalsFor["#text"]}
                        <hr></hr>
                    </div>

                </div>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}></ModalHeader>
                        <ModalBody>
                            <select id="teams">
                                <option value="NSH">Nashville Predators</option>
                                <option value="volvo">Colorado Avalanche</option>
                                <option value="volvo">Winnipeg Jets</option>
                                <option value="volvo">Minnesota Wild</option>
                                <option value="volvo">Vegas Golden Knights</option>
                                <option value="volvo">LA Kings</option>
                                <option value="volvo">Anneheim Ducks</option>
                                <option value="volvo">San Jose Sharks</option>
                                <option value="volvo">Washington Capitals</option>
                                <option value="volvo">Columbus Blue Jackets</option>
                                <option value="volvo">Shittsburg Penguins</option>
                                <option value="volvo">Philadelphia Flyers</option>
                                <option value="volvo">Tampa Bay Lightning </option>
                                <option value="volvo">New Jersey Devils</option>
                                <option value="volvo">Boston Bruins</option>
                                <option value="volvo">Toronto Maple Leafs</option>
                            </select>
                        </ModalBody>
                        <ModalFooter>
                            <button className="pillbutton" onClick={this.getAnotherClicked.bind(this)}>><p>change team</p></button>
                        </ModalFooter>
                        </Modal>
                    </div>
                </div>
                    
                )
            }else{
                console.log("games",games);    
                return (
                    <div>
                        <button onClick={this.toggle}>
                            <i className="whiteTxt fas fa-location-arrow fa-sm"></i>
                        </button>
                        <div className="game-list">
                        <div className="teams">
                            {games["0"].game.date}
                            <br></br>
                            {games["0"].game.awayTeam.City}: {games["0"].stats.GoalsAgainst["#text"]}
                            <br></br>
                            {games["0"].game.homeTeam.City}: {games["0"].stats.GoalsFor["#text"]}
                        </div>
    
                    </div>
                        <div>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}></ModalHeader>
                            <ModalBody>
                                <select id="teams">
                                    <option value="NSH">Nashville Predators</option>
                                    <option value="volvo">Colorado Avalanche</option>
                                    <option value="volvo">Winnipeg Jets</option>
                                    <option value="volvo">Minnesota Wild</option>
                                    <option value="volvo">Vegas Golden Knights</option>
                                    <option value="volvo">LA Kings</option>
                                    <option value="volvo">Anneheim Ducks</option>
                                    <option value="volvo">San Jose Sharks</option>
                                    <option value="volvo">Washington Capitals</option>
                                    <option value="volvo">Columbus Blue Jackets</option>
                                    <option value="volvo">Shittsburg Penguins</option>
                                    <option value="volvo">Philadelphia Flyers</option>
                                    <option value="volvo">Tampa Bay Lightning </option>
                                    <option value="volvo">New Jersey Devils</option>
                                    <option value="volvo">Boston Bruins</option>
                                    <option value="volvo">Toronto Maple Leafs</option>
                                </select>
                            </ModalBody>
                            <ModalFooter>
                                <button className="pillbutton" onClick={this.getAnotherClicked.bind(this)}>><p>change team</p></button>
                            </ModalFooter>
                            </Modal>
                        </div>
                    </div>


                )}
            }
        }
    }


    export default HockeyMain;