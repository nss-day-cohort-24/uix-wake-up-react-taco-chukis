import React, { Component } from 'react';

// import { Card, Button, CardTitle, CardText } from 'reactstrap';

// API Call(fetch) for weather using zipcode
// 

// function to format News as desired


//render top 10 news results in the US

class News extends Component {

    constructor(props){
        super(props);

        this.state = {
            newsLoaded: false,
            objResult: [],
            showResult: false,
            error: null
        }

        this.showClicked=this.showClicked.bind(this);
    }

        componentDidMount() {
            this.getNews()
        }
        /* COMPONENTDIDMOUNT function is running the getNews() function to show the results of the news api*/

        showClicked() {
            this.setState({
                showResult: true
            })
        }

        

        getNews() {
            fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e453a2b70d6f424aa4afd355a6919f35")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        newsLoaded: true,
                        objResult: result
                    });
                    
                    console.log("result: ", result.articles);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                })
        }
        

        render() {
            const {error, newsLoaded, objResult, showResult} = this.state;

            if(error) {
                return (
                    <div>
                        <div> Error: {error.message}</div>
                    </div>
                )
            
            } else if(!newsLoaded) {
                return <div>Loading...</div>
            } else{
                return (
                    <div>News:
                    </div>
                )
            }
        }
    }

    export default News;