import React, { Component } from 'react';
import './Landing.scss';
import Search from './Search/Search';
import About from './About/About';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <Search />
        <About />
      </div>
    )
  }
}

export default Landing;