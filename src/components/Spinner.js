import React, { Component } from 'react'
import loading from './Spinner.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="loading" style={{height: "50px"}}/>
      </div>
    )
  }
}
