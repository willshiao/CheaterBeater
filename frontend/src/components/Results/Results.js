import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/cb-logo.svg';
import Info from './Info/Info';
import './Results.scss';
import Footer from '../Footer/Footer';

class Results extends Component {
  render() {
    console.log(this.props.location.state);
    const { data } = this.props.location.state;
    console.log("Got data", data);

    return(
      <section className="Results">
        <div className="Results__header">
          <div className="Results__logo-container">
            <img className="Results__logo-styling" alt="Cheater Beater" src={logo}></img>
          </div>
          <Link to="/">
            <Button className="Results__button">BACK</Button>
          </Link>
        </div>
        <Info data={data} />
        <Footer />
      </section>
    )
  }
}

export default Results;
