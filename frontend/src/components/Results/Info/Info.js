import React, { Component } from 'react';
import './Info.scss';
import { Button } from 'antd';
import Gauge from './Gauge/Gauge';
import BarGraph from './BarGraph/BarGraph';
import Graph from './Graph/Graph';
import Cblocks from './Cblocks/Cblocks';
import SafeMessage from './SafeMessage/SafeMessage';
import FraudMessage from './FraudMessage/FraudMessage';

class Info extends Component {
  render() {
    const { data } = this.props;

    return (
      <section className="Info" id="printMe">
        <div className="container-fluid">
          <div className="row justify-content-center Info__top">
            <div className="col-10">
              <div className="row">
                <div className="col Info__chart-container">
                  <Gauge />
                  <BarGraph />
                </div>
                <div className="col">
                  {/* {!data && <SafeMessage />} */}
                  {!data && <FraudMessage />}
                </div>
              </div>
            </div>
          </div>
          <Cblocks data={data} />
          {!data && <Graph /> }
        </div>
      </section>
    )
  }
}

export default Info;
