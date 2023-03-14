import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  articles=[];
  
    constructor(){
        super()
        console.log("constructor news");
        this.state={
          articles: this.articles,
            loading:false
        }
    }
    async componentDidMount(){
      console.log("cdm");
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=b35360b5b776464999fe0453b3121989";
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({articles : parsedData.articles});
    }
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top HeadLines</h2>
        <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url?element.url:""}>
        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:""} newsUrl={element.url?element.url:""}/>
        </div>})}
       
        </div>
      </div>
    )
  }
}

export default News
