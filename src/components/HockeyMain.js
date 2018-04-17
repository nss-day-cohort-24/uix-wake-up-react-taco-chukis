import { Card, Button, CardTitle, CardText } from 'reactstrap';

import React, { Component } from 'react';


let url = 'https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff/scoreboard.json?fordate=20180414';
let username = 'batkins4';
let password = 'Cohort24';


let headers = new Headers();

function getHockeyMain() {

            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            fetch(url, {method:'GET',
            headers: headers,
            //credentials: 'user:passwd'
           })
            .then(response => response.json())
            .then(json => 
                {
                    
                    console.log("made it",json.scoreboard.gameScore);
                    let games = json.scoreboard.gameScore;
                    console.log(games,"games");
                    const gameList = games.map((game,index) => 
                    <div key={index}> {game.game.awayTeam.City} </div>
                )
                console.log(gameList);
                return gameList;




            })
        }


function HockeyContent(){
    let gameList = getHockeyMain();
    console.log("gameList",gameList);
    return(
        <div id="hockey-list">
        {gameList}
        </div>
    )
}













// class HockeyMain extends Component {

//     constructor(props){
//         super(props);

//         this.state = {
//             hockeyMainLoaded: false,
//             objResult: [],
//             showResult: false,
//             error: null
//         }
//         console.log("constructor: ", constructor);

//         this.showClicked=this.showClicked.bind(this);
//     }

//         componentDidMount() {
//             this.getHockeyMain();
//     }

//         showClicked() {
//             this.setState({
//                 showResult: true
//             })
//         }

        

//         getHockeyMain() {

//             headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

//             fetch(url, {method:'GET',
//             headers: headers,
//             //credentials: 'user:passwd'
//            })
//             .then(response => response.json())
//             .then(json => 
//                 {
                    
//                     console.log("made it",json.scoreboard.gameScore);
//                     let games = json.scoreboard.gameScore;
//                     console.log(games,"games");
//                     const gameList = games.map((game,index) => 
//                     <div key={index}> {game.game.awayTeam.City} </div>
//                 )
//                 console.log(gameList);
            




//                 (result) => {
//                     this.setState({
//                         HockeyMainLoaded: true,
//                         objResult: result
//                     });
//                 },
//                 (error) => {
//                     this.setState({
//                         HockeyMainLoaded: false,
//                         error: error,
//                     })
//                 }
//             }
        
//         );
//         }
        

//         render() {
//             const {error, HockeyMainLoaded, objResult, showResult} = this.state;

//             if(error) {
//                 return (
//                     <div>
//                         <div> Error: {error.message}</div>
//                     </div>
//                 )
            
//             } else{
//                 return (
//                     <div>{gameList}</div>
//                 )
//             }
//         }
//     }


    export default HockeyContent;