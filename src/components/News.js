import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewMonkey`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1, string.length);
  }

  async componentDidMount() {
    const newPage = this.state.page;
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df28a757cd0c4a3eb8027e2bb021a1ed&page=${newPage}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    const newPage = this.state.page + 1;
    this.props.setProgress(0);
    this.setState({page: newPage});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df28a757cd0c4a3eb8027e2bb021a1ed&page=${newPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTimeout(() => {
      this.setState({
        articles: this.state.articles.concat(parsedData.articles), 
        totalResults: parsedData.totalResults
      });
    }, 500);
    this.props.setProgress(100);  
  };

  render() {
    return (
      <>
        <h2 className="text-center">New Monkey - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
        {this.state.loading && <Spinner/>} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container mb-4'>
            <div className="row my-3">
              {this.state.articles.map((element) => {           
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
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
