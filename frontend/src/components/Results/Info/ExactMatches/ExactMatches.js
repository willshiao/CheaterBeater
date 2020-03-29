import React, { Component } from 'react';
import './ExactMatches.scss';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class ExactMatches extends Component {
  render() {
    const { matchedList } = this.props;
    console.log("Got matchedList", matchedList);

    return (
      <section className="ExactMatches">
        <div className="row justify-content-center">
          <div className="col-8">
            <h2 className="ExactMatches__title">Exact Matches</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8">
            <Collapse accordion>
              {matchedList.map(({ filePath, sameAs }, index) => {
                return (
                  <Panel className="ExactMatches__panelHeader" header={filePath} key={index}>
                    <ul className="ExactMatches__list">
                      {sameAs.map(link => (
                        <li className="ExactMatches__link">
                          <a href={link} className="ExactMatches__href" target="_blank">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                )
              })}
            </Collapse>
          </div>
        </div>
      </section>
    )
  }
}

export default ExactMatches;