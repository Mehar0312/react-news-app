import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewMonkey`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1, string.length);
  }

  async updateNewsOnClick(newPage) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df28a757cd0c4a3eb8027e2bb021a1ed&page=${newPage}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    const newPage = this.state.page;
    this.updateNewsOnClick(newPage);
  }

  handlePrevClick = async () => {
    const newPage = this.state.page - 1;
    this.setState({page: newPage});
    this.updateNewsOnClick(newPage);
  }

  handleNextClick = async () => {
    const newPage = this.state.page + 1;
    this.setState({page: newPage});
    this.updateNewsOnClick(newPage);
  } 

  render() {
    return (
      <div className='container mb-4'>
        <h2 className="text-center">New Monkey - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
        {this.state.loading && <Spinner/>} 
        <div className="row my-3">
          {!this.state.loading && this.state.articles.map((element) => {           
            return (
            <div className="col-md-4 my-3" key={element.url}>
              <NewsItem 
                title={element.title?element.title.slice(0,45):""} 
                description={element.description?element.description.slice(0,88):""} 
                imgUrl={element.urlToImage} 
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>); 
          })}
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="container d-flex justify-content-between">
              <button type="button" className="btn btn-light" onClick={this.handlePrevClick} disabled={this.state.page <= 1}>&larr;Previous</button>
              <button type="button" className="btn btn-light" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next&rarr;</button>
            </div>
          </div>
          <div className="col-md-3"></div> 
        </div>
      </div>
    )
  }
}

export default News
