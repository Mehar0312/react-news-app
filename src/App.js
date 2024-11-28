import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// import NewsItem from './components/NewsItem';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export class App extends Component {
  pageSize = 12;
  country = 'us';
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country={this.country} category="general"></News>}></Route>
            <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} country={this.country} category="general"></News>}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country={this.country} category="entertainment"></News>}></Route>
            <Route exact path="/business" element={<News key="" pageSize={this.pageSize} country={this.country} category="business"></News>}></Route>
            <Route exact path="/health" element={<News key="business" pageSize={this.pageSize} country={this.country} category="health"></News>}></Route>
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country={this.country} category="science"></News>}></Route>
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country={this.country} category="sports"></News>}></Route>
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country={this.country} category="technology"></News>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App

