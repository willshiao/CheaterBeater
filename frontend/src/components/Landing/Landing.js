import React, { Component } from 'react';
import './Landing.scss';
import Nav from './Nav/Nav';
import Search from './Search/Search';
import About from './About/About';
import How from './How/How';
import Challenges from './Challenges/Challenges';
import Footer from './Footer/Footer';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <Nav />
        <Search />
        <About />
        <How />
        <Challenges />
        <Footer />
      </div>
    )
  }
}

export default Landing;