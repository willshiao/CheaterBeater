import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import './Graph.scss';

const svgParent = {
  shape: 'circle',
  shapeProps: {
    r: 10,
    fill: '#F46F6F',
  }
}

const myTreeData = [
  {
    name: 'Toor',
    children: [
      {
        name: 'Aditya Acharya',
        children: [
          {
            name: 'Toor',
          },
        ]
      },
      {
        name: 'Eric Ong',
        children: [
          {
            name: 'Toor 10%'
          },
          {
            name: 'Skancare 20%'
          },
          {
            name: 'Carpuul',
          },
          {
            name: 'o',
          },
          {
            name: 's',
          }
        ]
      },
      {
        name: 'John Shin',
        children: [
          {
            name: 'Toor',
          },
          {
            name: 'Skancare',
          },
          {
            name: 'Carpuul',
          },
          {
            name: 'o',
          },
          {
            name: 's',
          }
        ]
      },
      {
        name: 'Jihwan Kim'
      }
    ],
  },
];


class Graph extends Component {
  render(){
    const { treeData } = this.props;
    console.log("Got props", treeData);

    return(
      <div className="container-fluid Graph__container">
        <div className="row justify-content-center">
          <div className="col-8">
            <h2 className="Graph__header">Similar Projects</h2>
          </div>
        </div>
        <div className="row Graph__tree-container">
          <Tree
            data={myTreeData}
            zoomable={false}
            orientation={'vertical'}
            nodeSvgShape={svgParent}
            translate={
              {
                x: 675,
                y: 20
              }
            }
            scaleExtent={
              {
                min: 0.1,
                max: 0.7
              }
            }
          />
        </div>
      </div>
    )
  }
}

export default Graph;
