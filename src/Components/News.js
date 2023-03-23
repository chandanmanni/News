import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

export class News extends Component {
static defaultProps={
country:'in',
pagesize:8,
category: 'general'
}

static propTypes={
  country:PropTypes.string,
  pagesize:PropTypes.number,
  category: PropTypes.string
}


  articles=[];
  
    constructor(){
        super()
        console.log("constructor news");
        this.state={
          articles: this.articles,
          page:1,
          totalResults:0,
            loading:false
        }
    }
    async componentDidMount(){
      console.log("cdm");
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&page=${this.state.page}&apiKey=b35360b5b776464999fe0453b3121989&pageSize=20`;
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({articles : parsedData.articles, totalResults:parsedData.totalResults });
    }

  //   handleNext= async ()=>{
  //     if(this.state.page> Math.ceil(this.state.totalResults/20)){}
  //     else{
  //     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b35360b5b776464999fe0453b3121989&page=${this.state.page+1}&pageSize=20`;
  //     let data=await fetch(url);
  //     let parsedData=await data.json();
      
  //     this.setState({articles : parsedData.articles});
  //   this.setState({page:this.state.page+1})
  // }
  //   }

  //   handlePrevious=async ()=>{
  //     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b35360b5b776464999fe0453b3121989&page=${this.state.page-1}&pageSize=20`;
  //     let data=await fetch(url);
  //     let parsedData=await data.json();

  //     this.setState({articles : parsedData.articles});
  //     this.setState({page:this.state.page-1})

  //   }
    fetchMoreData = async () => {
      this.setState({page:this.state.page+1})
      const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=b35360b5b776464999fe0453b3121989&page=${this.state.page+1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false,
      })
  };
  render() {
    return (
      <>

      <div className='container my-3'>
        <h2>NewsMonkey - Top HeadLines</h2>
        <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.title?element.title:""}>
        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:""} newsUrl={element.url?element.url:""} author={element.author} publishedAt={new Date(element.publishedAt).toDateString()}/>
        </div>})}
       
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length != this.state.totalResults}
          loader={<Spinner></Spinner>}
        ></InfiniteScroll>
      </div>
    

      {/* <div className='container d-flex justify-content-between'>
        <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevious} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled={this.state.page +1> Math.ceil(this.state.totalResults/20)} onClick={this.handleNext} className ="btn btn-dark">Next &rarr;</button>
      </div> */}
      </>
    )
  }
}

export default News
