import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export class App extends Component {
  pageSize = 12;
  country = 'us';

  state = {
    proress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress});
  }

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar></Navbar>
          
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country={this.country} category="general"></News>}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country={this.country} category="general"></News>}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country={this.country} category="entertainment"></News>}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="" pageSize={this.pageSize} country={this.country} category="business"></News>}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country={this.country} category="health"></News>}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country={this.country} category="science"></News>}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country={this.country} category="sports"></News>}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country={this.country} category="technology"></News>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App

