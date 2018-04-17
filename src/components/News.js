import React, { Component } from 'react';
import holderImg from '../img/museum.jpg';
import { Card, Button, CardTitle, CardText } from 'reactstrap';


function NewsSetup(props) {
    return (

        <div>
          <div className="card-tile card my-3 mx-2">
            <img className="card-img-top" src={holderImg} alt="Card image cap" />
              <div className="card-tile card-body">
                <p className="card-tile card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              
              </div>
          </div>


      <Card>
        {props.newsLoaded ?
           <span>
              <CardTitle>{props.newsTitle}</CardTitle>

              <CardText>{props.newsTitle}</CardText>
           </span>
           :
           <CardTitle>US News</CardTitle>
        }
        {props.showResult ?
            <div> </div> 
            :
            <div>nope</div>
        }
      </Card>
      </div>

    )
}

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
        console.log("constructor: ", constructor);

        this.showClicked=this.showClicked.bind(this);
    }
        componentDidMount() {
            this.getNews();
    }

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
                        objResult: result.articles
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
                    <div>
                        <NewsSetup newsLoaded={newsLoaded}
                        newsTitle={objResult.title}
                        newsContent={objResult.description}
                        showResult={showResult}
                        showClicked={this.showClicked}
                        />
                    </div>
                )
            }
        }
    }

    export default News;