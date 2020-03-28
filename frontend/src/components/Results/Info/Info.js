import React, { Component } from 'react';
import './Info.scss';
import Gauge from './Gauge/Gauge';
import Cblocks from './Cblocks/Cblocks';
import SafeMessage from './SafeMessage/SafeMessage';

class Info extends Component {
  render() {
    const { data } = this.props;
    
    return (
      <section className="Info">
        <Gauge />
        {data && <Cblocks data={data} />}
        {!data && <SafeMessage />}
      </section>
    )
  }
}

export default Info;