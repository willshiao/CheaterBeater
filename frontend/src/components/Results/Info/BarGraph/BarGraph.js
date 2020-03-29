import React, { Component } from 'react';
import { Progress } from 'antd';
import './BarGraph.scss';
import content from '../../../../content';

const { results: { info: { barGraph } } } = content;

class BarGraph extends Component {
  render() {
    console.log("Got props inside BarGraph component", this.props);
    const { percentageFileMatches, percentageLineMatches } = this.props;

    return(
      <div>
        <p className="BarGraph__label">{barGraph.lineMatches}</p>
        <Progress
          className="BarGraph__bar"
          strokeColor={{'0%': '#F46F6F', '100%': '#F46F6F'}}
          percent={percentageLineMatches}
          status="active"
        />
        <p className="BarGraph__label">{barGraph.fileMatches}</p>
        <Progress
          className="BarGraph__bar"
          strokeColor={{'0%': '#FF9473', '100%': '#FF9473'}}
          percent={percentageFileMatches}
          status="active"
        />
      </div>
    )
  }
}

export default BarGraph;
