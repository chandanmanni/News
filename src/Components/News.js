import React from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import { useState, useEffect } from 'react';

const News =(props)=> {
const [articles,setarticles]=useState([]);
const [page,setpage]=useState(1);
const [totalResults,settotalResults]=useState(0);


  
  
useEffect(()=>{updateNews()},[])
    
    const updateNews= async ()=>{
      
      props.setProgress(10)
      console.log("cdm");
      props.setProgress(30)
        // let url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&page=${page}&apiKey=b35360b5b776464999fe0453b3121989&pageSize=20`;
        let url=`https://news-api14.p.rapidapi.com/v2/trendings?topic=${props.category}&language=en&country=in&page=${page}&limit=20`;
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '3cede79d37msh6c08059bc73cf2ep1d9953jsn68fabd9bb822',
            'x-rapidapi-host': 'news-api14.p.rapidapi.com'
          }
        };
        let data=await fetch(url, options);
        let parsedData=await data.json();
      props.setProgress(70)
        console.log(parsedData);
        setarticles(parsedData.data);
        settotalResults(parsedData.totalHits);
        
      props.setProgress(100)
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
    const fetchMoreData = async () => {
      props.setProgress(10)
      setpage(page+1);
      props.setProgress(30)
      //const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apikey=b35360b5b776464999fe0453b3121989&page=${page+1}&pageSize=20`;
      const url = `https://news-api14.p.rapidapi.com/v2/trendings?topic=${props.category}&language=en&country=in&page=${page+1}&limit=20`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '3cede79d37msh6c08059bc73cf2ep1d9953jsn68fabd9bb822',
          'x-rapidapi-host': 'news-api14.p.rapidapi.com'
        }
      };
      let data = await fetch(url,options);
      let parsedData = await data.json()
      props.setProgress(70)
      setarticles(articles.concat(parsedData.data))
      settotalResults(parsedData.totalHits);
      
      props.setProgress(100)
  };
    return (
      <>

      <div className='container my-3' >
        <h2 style={{margin: "70px 0px 20px 330px"}}>NewsMonkey - Top HeadLines</h2>
        <div className="row">
            {articles.map((element)=>{
                return <div className="col-md-4" key={element.title?element.title:""}>
        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.thumbnail?element.thumbnail:""} newsUrl={element.url?element.url:""} author={element.author} publishedAt={new Date(element.publishedAt).toDateString()}/>
        </div>})}
       
        </div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length != totalResults}
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


News.defaultProps={
  country:'in',
  pagesize:8,
  category: 'General'
  }
  
News.propTypes={
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category: PropTypes.string
  }

export default News
