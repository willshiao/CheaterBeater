import React, { Component } from 'react';
import './Landing.scss';
import Search from './Search/Search';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <Search />
      </div>
    )
  }
}

export default Landing;