import React, { Component } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Gauge.scss';

class Gauge extends Component {
  render(){
    const roundedScore = this.props.cheaterScore.toFixed(2);

    return(
      <div className="Gauge__container">
        <div className="Gauge__inner-container">
          <GaugeChart id="gauge-chart3"
            nrOfLevels={10}
            colors={["#F46F6F", "#FFC371"]}
            arcWidth={0.5}
            percent={roundedScore}
            hideText={true}
          />
          <h2 className="Gauge__header">CB score: <span style={{color: '#F46F6F'}}>{roundedScore * 100}</span></h2>
        </div>
      </div>
    )
  }
}

export default Gauge;
