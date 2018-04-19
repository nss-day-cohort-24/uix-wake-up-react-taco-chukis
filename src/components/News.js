import React, { Component } from 'react';
import { Card } from 'reactstrap';
import firebase from 'firebase';
import keyIndex from 'react-key-index';


let article;
let newsImg = "";

class News extends Component {

    constructor(props){
        super(props);

        this.state = {
            newsLoaded: false,
            objResult: [],
            error: null
        }
    }


    componentDidMount() {
        this.getNews();
    }

    
    getAnotherClicked() {
        console.log("GET CLICKED FUNCTION News");
        article = document.getElementById("save-news");
        // var userRef = firebase.database().ref(`/users/${this.props.uid}`);
        // userRef.update({ title: objResult.articles.title,
        //                  url: objResult.articles.url });
        this.setState({
            newsLoaded: false,
            objResult: [],
            error: null,
            news: article,
        },
        this.getNews());
           
    }



        getNews() {
            fetch("https://newsapi.org/v2/top-headlines?country=us&category=technology&limit=10&apiKey=e453a2b70d6f424aa4afd355a6919f35")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        newsLoaded: true,
                        objResult: result.articles
                    });
                    console.log("news object: ", this.setState.objResult);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                })

        }


        
    /*render is grabbing the state object inside of the constructor and rendering the object result (objResult)
    objResult is being set through the api fetch*/
        render() {
            let {error, newsLoaded, objResult} = this.state;

            let tenArticles = objResult.splice(10);
            console.log("TEN ARTICLES ", tenArticles);
            let indexedArticles = keyIndex(objResult, 0);
            console.log("INDEXED ARTICLES: ", indexedArticles);

            if(error) {
                return (
                    <div>
                        <div> Error: {error.message}</div>
                    </div>
                )
            
            } else if(!newsLoaded) {
                return <div>Loading...</div>
            } else{
              
                let newsArticle = objResult.map((link, index) => (
                    <div key={index}>
                      <Card className="card-tile card my-3 mx-2">
                            <img className="card-tile-img card-img-top" src={link.urlToImage} alt="Card image cap" />
                          <div className="card-tile-news card-body">
                          <h5><a href={link.url} alt={link.title} title={link.title}>{link.title}</a></h5>
                            <p className="card-text">
                            {link.description}<br/>
                            Source: {link.source.name}<span className="whiteTxt star-right"><i className="fas fa-star fa-lg" id={link.id} onClick={this.getAnotherClicked.bind(this)}/></span>
                            </p>
                        
                          </div>
                      </Card>
                    </div>
                ))
                {console.log("what was clicked? ", article)}
                return (
                    <div>{newsArticle}</div>
                )
            }
        }
    }

    export default News;