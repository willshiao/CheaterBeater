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
        <Gauge />
        {<Cblocks data={data} />}
        <Graph />
      </section>
    )
  }
}

export default Info;
