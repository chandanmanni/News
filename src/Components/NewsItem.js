import React from 'react'

const NewsItem =(props)=> {
    
    let {title,description,imageUrl,newsUrl, author, publishedAt}=props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
  <img src={!imageUrl?"https://static1.xdaimages.com/wordpress/wp-content/uploads/2021/08/Samsung_Galaxy_Watch_4_Classic-Featured_Image_Lifestyle_07_1056375794-Web.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">Source {!author?"Unknown":author} on {publishedAt}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem
