import React, { Component } from 'react';
import { Progress } from 'antd';
import './BarGraph.scss';

class BarGraph extends Component {
  render(){
    return(
      <div>
        <Progress strokeColor={{'0%': '#F46F6F', '100%': '#F46F6F'}} percent={50} status="active" />
        <Progress strokeColor={{'0%': '#FF9473', '100%': '#FF9473'}} percent={23} status="active" />
        <Progress strokeColor={{'0%': '#FFC5B3', '100%': '#FFC5B3'}} percent={89} status="active" />
      </div>
    )
  }
}

export default BarGraph;
