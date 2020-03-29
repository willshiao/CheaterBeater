import React, { Component } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Gauge.scss';

class Gauge extends Component {
  render(){
    return(
      <div className="Gauge__container">
        <div className="Gauge__inner-container">
          <GaugeChart id="gauge-chart3"
            nrOfLevels={10}
            colors={["#F46F6F", "#FFC371"]}
            arcWidth={0.5}
            percent={0.37}
            hideText={true}
          />
          <h2 className="Gauge__header">CB score: <span style={{color: '#F46F6F'}}>37%</span></h2>
        </div>
      </div>
    )
  }
}

export default Gauge;
