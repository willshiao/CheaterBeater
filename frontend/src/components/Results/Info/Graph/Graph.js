import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import './Graph.scss';

const svgParent = {
  shape: 'circle',
  shapeProps: {
    r: 6,
    fill: '#F46F6F',
  }
}

function format(treeData) {
  console.log("Got props", treeData);
  console.log("Got title", treeData.projectName);

  let temp = [];
  let members = treeData.teamMembers;
  for (let i = 0; i < members.length; ++i){
    let projects = [];
    for (let j = 0; j < members[i].projects.length; ++j){
      if (j == 4){
        break;
      }
      projects.push({
        'name': members[i].projects[j]
      });
    }
    temp.push({
      'name': members[i].name,
      'children': projects
    });
  }

  console.log("this is temp", temp);


  const testTreeData = [{
    'name': treeData.projectName,
    'children': temp
  }];

  return testTreeData;
}

class Graph extends Component {

  render(){
    const testTreeData = format(this.props.treeData)
    console.log("state", testTreeData)
    return(
      <div className="container-fluid Graph__container">
        <div className="row justify-content-center">
          <div className="col-8">
            <h2 className="Graph__header">Similar Projects</h2>
          </div>
        </div>
        <div className="row Graph__tree-container">
          <Tree
            data={testTreeData}
            zoomable={false}
            orientation={'vertical'}
            nodeSvgShape={svgParent}
            translate={
              {
                x: window.innerWidth/2.1,
                y: 20
              }
            }
            scaleExtent={
              {
                min: 0.1,
                max: 0.5
              }
            }
          />
        </div>
      </div>
    )
  }
}

export default Graph;
