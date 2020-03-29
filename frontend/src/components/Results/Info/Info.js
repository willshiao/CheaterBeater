import React, { Component } from 'react';
import './Info.scss';
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
      <section className="Info">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10">
              <h2 className="Info__projectName">{data.projectName}</h2>
            </div>
          </div>
          <div className="row justify-content-center Info__top">
            <div className="col-10">
              <div className="row">
                <div className="col Info__chart-container">
                  <Gauge />
                  <BarGraph
                    percentageFileMatches={data.percentageFileMatches}
                    percentageLineMatches={Math.round((data.totalStats.totalSame / data.totalStats.totalChecked) * 100)}
                  />
                </div>
                <div className="col">
                  {data ? (
                    <FraudMessage />
                  ) : (
                    <SafeMessage />
                  )}
                </div>
              </div>
            </div>
          </div>
          {data && <Cblocks codeBlocks={data.partialMatches} />}
          {data && <Graph treeData={{teamMembers: data.teamMembers, projectName: data.projectName}} />}
        </div>
      </section>
    )
  }
}

export default Info;
