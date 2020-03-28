import React from 'react';
import './How.scss';
import content from '../../../content';

const { how } = content;

const How = () => {
  return(
    <section className="How">
      <div className="container-fluid">
        <h2 className="How__title">{how.title}</h2>
        <div className="row justify-content-center">
          <div className="col-3">
            <div className="How__wrapper How__first">
              <h2 className="How__subtitle">{how.firstSubtitle}</h2>
              <p className="How__desc">{how.firstDescription}</p>
            </div>
          </div>
          <div className="col-3">
            <div className="How__wrapper How__second">
              <h2 className="How__subtitle">{how.secondSubtitle}</h2>
              <p className="How__desc">{how.secondDescription}</p>
            </div>
          </div>
          <div className="col-3">
            <div className="How__wrapper How__third">
              <h2 className="How__subtitle">{how.thirdSubtitle}</h2>
              <p className="How__desc">{how.thirdDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default How;