import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        {/* {console.log(description)} */}
        <div className="card">
          <div>
            <span className="badge rounded-pill bg-danger" style={{position: 'absolute', right: '0'}}>{source}</span>
          </div>
          <img src={imgUrl != null ?imgUrl:"https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg"} className="card-img-top" alt="..." style={{height: 190}}/>
          <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text">
                <small className="text-body-secondary">By {author!==""?author:"Unknown"}</small>
                <br/>
                <small className="text-body-secondary">{new Date(date).toGMTString()}</small>
              </p>
              <a href={newsUrl} target='_blank' className="text-link" rel="noreferrer">Read more</a>
          </div>
        </div>
      </div>
      
    )
  }
}

export default NewsItem
