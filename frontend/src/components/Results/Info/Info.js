import React, { Component } from 'react';
import './Info.scss';
import Gauge from './Gauge/Gauge';
import Graph from './Graph/Graph';
import Cblocks from './Cblocks/Cblocks';
import SafeMessage from './SafeMessage/SafeMessage';

class Info extends Component {
  render() {
    const { data } = this.props;

    return (
      <section className="Info">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-6">
              <Gauge />
            </div>
          </div>
          {<Cblocks data={data} />}
          <Graph />
        </div>
      </section>
    )
  }
}

export default Info;
