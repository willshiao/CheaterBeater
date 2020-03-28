import React, { Component } from 'react';
import './Landing.css';
import { Button } from 'antd';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        HI IM LANDING
        <Button type="primary">Search</Button>
      </div>
    )
  }
}

export default Landing;