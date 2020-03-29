import React, { Component } from 'react';
import './Landing.scss';
import Nav from './Nav/Nav';
import Search from './Search/Search';
import About from './About/About';
import How from './How/How';
import Challenges from './Challenges/Challenges';
import Footer from '../Footer/Footer';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <Nav />
        <Search />
        <div id="About">
          <About />
        </div>
        <div id="How">
          <How />
        </div>
        <div id="Challenges">
          <Challenges />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Landing;
