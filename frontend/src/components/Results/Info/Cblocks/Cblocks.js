import React, { Component } from 'react';
import { CodeBlock, androidstudio } from 'react-code-blocks'
import './Cblocks.scss'
import { codeData } from '../../../../mocks';

class Cblocks extends Component {
  render(){
    console.log(this.props.data);
    return(
      <section className="Cblocks">
        <div className="container-fluid">
          <div className="row justify-content-center Cblocks__header-container">
            <div className="col-8">
              <h2 className="Cblocks__subHeader">Code Plagiarism</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {
              codeData.length > 0 && codeData.map(data => {
                const { code, filePath, language } = data;

                return (
                  <div className="col-8 Cblocks__block-container">
                    <p className="Cblocks__fileName">{filePath}</p>
                    {code.map(({ block, plagiarismLinks }) => (
                      <div className="Cblocks__block">
                        <div className="row justify-content-center">
                          <div className="col-9">
                            <CodeBlock
                              text={block}
                              language={language}
                              showLineNumbers={false}
                              theme={androidstudio}
                            />
                          </div>
                          <div className="col-3">
                            <div className="Cblocks__links">
                              <ul>
                                {plagiarismLinks.map(link => <li className="Cblocks__link">{link}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    )
  }
}

export default Cblocks;
