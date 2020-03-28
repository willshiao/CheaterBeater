import React from 'react';
import './Challenges.scss';
import content from '../../../content';
import cbImage from '../../../assets/imgs/cb-2.svg';

const { challenges } = content;

const Challenges = () => {
  return (
    <section className="Challenges">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-6">
            <img src={cbImage} alt="Cheater Beater" className="Challenges__image"/>
          </div>
          <div className="col-6">
            <div className="Challenges__wrapper">
              <h2 className="Challenges__title">{challenges.title}</h2>
              <p className="Challenges__desc">{challenges.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Challenges;