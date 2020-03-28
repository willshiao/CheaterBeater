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

const svgChild = {
  shape: 'circle',
  shapeProps: {
    r: 10,
    fill: '#ffbfab',
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
            nodeSvgShape: svgChild
          },
        ]
      },
      {
        name: 'Eric Ong',
        children: [
          {
            name: 'Toor',
            nodeSvgShape: svgChild,
            children: [
              {
                name: '10%'
              }
            ]
          },
          {
            name: 'Skancare',
            nodeSvgShape: svgChild,
            children: [
              {
                name: '20%'
              }
            ]
          },
          {
            name: 'Carpuul',
            nodeSvgShape: svgChild
          },
          {
            name: 'o',
            nodeSvgShape: svgChild
          },
          {
            name: 's',
            nodeSvgShape: svgChild
          }
        ]
      },
      {
        name: 'John Shin',
        children: [
          {
            name: 'Toor',
            nodeSvgShape: svgChild
          },
          {
            name: 'Skancare',
            nodeSvgShape: svgChild
          },
          {
            name: 'Carpuul',
            nodeSvgShape: svgChild
          },
          {
            name: 'o',
            nodeSvgShape: svgChild
          },
          {
            name: 's',
            nodeSvgShape: svgChild
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
    return(
      <div className="container-fluid Graph__container">
      <h1 className="Graph__header">Similar Projects</h1>
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
            styles={
              {
                nodes: {
                  name: {
                    color: 'red'
                  }
                }
              }
            }
          />
        </div>
      </div>
    )
  }
}

export default Graph;
