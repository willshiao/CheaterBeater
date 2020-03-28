import React from 'react';
import './About.scss';
import content from '../../../content';
import cbImage from '../../../assets/imgs/cb-1.svg';

const { about } = content;

const About = () => {
  return (
    <section className="About">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="About__wrapper">
              <h2 className="About__title">{about.title}</h2>
              <p className="About__desc">{about.description}</p>
            </div>
          </div>
          <div className="col-6">
            <img src={cbImage} alt="Cheater Beater" className="About__image"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;