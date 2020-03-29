import React, { Component } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Gauge.scss';
import cbImage from '../../../../assets/imgs/cb-4.svg';

class Gauge extends Component {
  render(){
    return(
      <div className="Gauge__container">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-8">
              <div className="Gauge__inner-container">
                <GaugeChart id="gauge-chart3"
                  nrOfLevels={30}
                  colors={["#F46F6F", "#FFC371"]}
                  arcWidth={0.5}
                  percent={0.37}
                  hideText={true}
                />
                <h1 className="Gauge__header">CB score: <span style={{color: '#F46F6F'}}>37%</span></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Gauge;
