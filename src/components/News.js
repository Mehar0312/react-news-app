import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1, string.length);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewMonkey`;
    updateNews();
    //eslint-disable-next-line
  }, []);

  const updateNews = async () => {
    const newPage = page;
    props.setProgress(10);
    setPage(newPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${newPage}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }

  const fetchMoreData = async () => {
    const newPage = page + 1;
    props.setProgress(0);
    setPage(newPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${newPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTimeout(() => {
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }, 500);
    props.setProgress(100);  
  };

    return (
      <>
        <h2 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>New Monkey - Top {capitalizeFirstLetter(props.category)} headlines</h2>
        {loading && <Spinner/>} 
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container mb-4'>
            <div className="row my-3">
              {articles.map((element) => {           
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

News.defaultProps = {
  country: 'us',
  pageSize: 6,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
