import React, { Component } from 'react';
import { Button } from 'antd';
import { CodeBlock, dracula } from 'react-code-blocks'
import Cblocks from './Cblocks/Cblocks';
import './Results.scss';

const logo = require('../../assets/imgs/logo.svg');

class Results extends Component {
  render(){
    return(
      <div>
        <div className="Results__parent">
          <div className="Results__header">
            <div className="Results__logo-container">
              <img className="Results__logo-styling" src={logo}></img>
              <p className="Results__heading">Cheater Beater</p>
            </div>
            <Button className="Results__button">BACK</Button>
          </div>
          <Cblocks />
         </div>
      </div>
    )
  }
}

export default Results;
