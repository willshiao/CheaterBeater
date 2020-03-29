import React, { Component } from 'react';
import { CodeBlock, androidstudio } from 'react-code-blocks'
import './Cblocks.scss'
import EllipsisText from "react-ellipsis-text";
// import { codeData } from '../../../../mocks';

class Cblocks extends Component {
  render(){
    console.log("Got props inside Cblocks", this.props);
    const { codeBlocks } = this.props;

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
              codeBlocks.length > 0 && codeBlocks.map(codeBlock => {
                const { code, filePath, language } = codeBlock;

                return (
                  <div className="col-8 Cblocks__block-container">
                    <a href={filePath} className="Cblocks__fileNameLink">
                      <p className="Cblocks__fileName">{filePath}</p>
                    </a>
                    {code.map(({ block, plagiarismLinks }) => (
                      <div className="Cblocks__block">
                        <div className="row justify-content-center">
                          <div className="col-8" style={{fontFamily: 'Courier Prime'}}>
                            <CodeBlock
                              text={block}
                              language={language.toLowerCase()}
                              showLineNumbers={false}
                              theme={androidstudio}
                            />
                          </div>
                          <div className="col-4">
                            <div className="Cblocks__links">
                              <ul className="Cblocks__list">
                                {plagiarismLinks
                                  && plagiarismLinks.length > 0
                                  && plagiarismLinks.map(link => (
                                    <li className="Cblocks__link">
                                      <a href={link} className="Cblocks__href" target="_blank">
                                        <EllipsisText text={link} length={"30"} />
                                      </a>
                                    </li>
                                  )
                                )}
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
