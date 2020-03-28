import React, { Component } from 'react';
import { CodeBlock, atomOneDark } from 'react-code-blocks'
import './Cblocks.scss'


class Cblocks extends Component {
  state = {
    score: "65.5",
    codeList: [
      {
        fileName: "index.js",
        text: "function sayHi(){\n alert(\"Hello World\"); \nsayHi() \nlet x = \"bye\"}",
        language: "javascript",
        highlight: "2"
      }
    ]
  }

  render(){
    return(
      <div>
        <div className="Cblocks__parent">
          <div className="container-fluid Cblocks__container">
            <div className="row Cblocks__header-container">
              <h1 className="Cblocks__header">CB score: <span style={{padding: 0, color: '#F46F6F'}}>{this.state.score}</span></h1>
              <h1 className="Cblocks__subHeader">Code Plagarism</h1>
            </div>
            <div className="row Cblocks__block-container">
              <p className="Cblocks__fileName">{this.state.codeList[0].fileName}</p>
              <CodeBlock
                  text={this.state.codeList[0].text}
                  language={this.state.codeList[0].language}
                  highlight={this.state.codeList[0].highlight}
                  showLineNumbers={true}
                  theme={atomOneDark}
              />
              <p className="Cblocks__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lectus eget dui sagittis rutrum. Curabitur sed elit sed mi imperdiet tempus. Aliquam commodo aliquet arcu, eget consequat enim aliquam non. Vestibulum posuere, arcu eu egestas vehicula, metus erat sollicitudin neque, id sodales justo tortor sed orci.</p>
            </div>
            <div className="row Cblocks__block-container">
              <p className="Cblocks__fileName">{this.state.codeList[0].fileName}</p>
              <CodeBlock
                  text={this.state.codeList[0].text}
                  language={this.state.codeList[0].language}
                  highlight={this.state.codeList[0].highlight}
                  showLineNumbers={true}
                  theme={atomOneDark}
                  className="testing"
              />
              <p className="Cblocks__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lectus eget dui sagittis rutrum. Curabitur sed elit sed mi imperdiet tempus. Aliquam commodo aliquet arcu, eget consequat enim aliquam non. Vestibulum posuere, arcu eu egestas vehicula, metus erat sollicitudin neque, id sodales justo tortor sed orci.</p>
            </div>
          </div>
         </div>
      </div>
    )
  }
}

export default Cblocks;
