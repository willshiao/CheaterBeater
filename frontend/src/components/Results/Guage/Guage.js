import React, { Component } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Guage.scss';

class Guage extends Component {
  render(){
    return(
      <div className="Guage__container">
        <div className="Guage__inner-container">
          <GaugeChart id="gauge-chart3"
            nrOfLevels={30}
            colors={["#F46F6F", "#FFC371"]}
            arcWidth={0.3}
            percent={0.37}
            hideText={true}
          />
          <h1 className="Guage__header">CB score: <span style={{color: '#F46F6F'}}>37%</span></h1>
        </div>
      </div>
    )
  }
}

export default Guage;
