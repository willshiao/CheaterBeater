import React, { Component } from 'react';
import './Info.scss';
import { Button } from 'antd';
import Gauge from './Gauge/Gauge';
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
                <div className="col">
                  <Gauge />
                </div>
                <div className="col">
                  {/* {!data && <SafeMessage />} */}
                  {!data && <FraudMessage />}
                </div>
              </div>
            </div>
          </div>
          {/* {<Cblocks data={data} />}
          <Graph /> */}
        </div>
      </section>
    )
  }
}

export default Info;
