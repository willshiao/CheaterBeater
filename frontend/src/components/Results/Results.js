import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/logo.svg';
import { CodeBlock, dracula } from 'react-code-blocks';
import Cblocks from './Cblocks/Cblocks';
import './Results.scss';

class Results extends Component {
  render(){
    console.log("Got data: ", this.props.location.state);

    return(
      <div>
        <div className="Results__parent">
          <div className="Results__header">
            <div className="Results__logo-container">
              <img className="Results__logo-styling" alt="Cheater Beater" src={logo}></img>
              <p className="Results__heading">Cheater Beater</p>
            </div>
            <Button className="Results__button">
              <Link to="/">BACK</Link>
            </Button>
          </div>
          <Cblocks />
         </div>
      </div>
    )
  }
}

export default Results;
