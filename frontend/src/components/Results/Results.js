import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/logo.svg';
import { CodeBlock, dracula } from 'react-code-blocks';
import Cblocks from './Cblocks/Cblocks';
import Guage from './Guage/Guage';
import './Results.scss';

class Results extends Component {
  render(){
    return(
      <div>
        <div className="Results__parent">
          <div className="Results__header">
            <div className="Results__logo-container">
              <img className="Results__logo-styling" alt="Cheater Beater" src={logo}></img>
              <p className="Results__heading">Cheater Beater</p>
            </div>
            <Link to="/">
              <Button className="Results__button">BACK</Button>
            </Link>
          </div>
          <div>
            <Guage />
          </div>
          <Cblocks data={this.props.location.state}/>
         </div>
      </div>
    )
  }
}

export default Results;
