import React, { Component } from 'react';
import './Info.scss';
import Gauge from './Gauge/Gauge';
import BarGraph from './BarGraph/BarGraph';
import ExactMatches from './ExactMatches/ExactMatches';
import Graph from './Graph/Graph';
import Cblocks from './Cblocks/Cblocks';
import SafeMessage from './SafeMessage/SafeMessage';
import FraudMessage from './FraudMessage/FraudMessage';
import { CHEATER_LIMIT } from '../../../shared/constants';

class Info extends Component {
  render() {
    const { data } = this.props;
    const { totalStats } = data;

    const percentageLineMatches = Math.round((totalStats.totalSame / totalStats.totalChecked) * 100);
    const percentageFileMatches = Math.round((totalStats.totalFilesSame / totalStats.totalFilesChecked) * 100);
    console.log("Calculated percentageLineMatches", percentageLineMatches);
    console.log("Calculated percentageFileMatches", percentageFileMatches);

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
                  <Gauge cheaterScore={totalStats.cheaterScore} />
                  <BarGraph
                    percentageFileMatches={percentageFileMatches}
                    percentageLineMatches={percentageLineMatches}
                  />
                </div>
                <div className="col">
                  {totalStats.cheaterScore > CHEATER_LIMIT ? (
                    <FraudMessage />
                  ) : (
                    <SafeMessage />
                  )}
                </div>
              </div>
            </div>
          </div>
          {data.matchedList && data.matchedList.length > 0 && <ExactMatches matchedList={data.matchedList} />}
          {data && data.partialMatches && data.partialMatches.length > 0 && <Cblocks codeBlocks={data.partialMatches} />}
          {data && <Graph treeData={{teamMembers: data.teamMembers, projectName: data.projectName}} />}
        </div>
      </section>
    )
  }
}

export default Info;
