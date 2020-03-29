import React, { Component } from 'react';
import { Progress } from 'antd';
import './BarGraph.scss';
import content from '../../../../content';

const { results: { info: { barGraph } } } = content;

class BarGraph extends Component {
  render(){
    return(
      <div>
        <p className="BarGraph__label">{barGraph.firstLabel}</p>
        <Progress className="BarGraph__bar" strokeColor={{'0%': '#F46F6F', '100%': '#F46F6F'}} percent={50} status="active" />
        <p className="BarGraph__label">{barGraph.secondLabel}</p>
        <Progress className="BarGraph__bar" strokeColor={{'0%': '#FF9473', '100%': '#FF9473'}} percent={23} status="active" />
        <p className="BarGraph__label">{barGraph.thirdLabel}</p>
        <Progress className="BarGraph__bar" strokeColor={{'0%': '#FFC5B3', '100%': '#FFC5B3'}} percent={89} status="active" />
      </div>
    )
  }
}

export default BarGraph;
