import React from 'react';
import './About.scss';
import cbImage from '../../../assets/imgs/cb-1.svg';

const About = () => {
  return (
    <section className="About">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="About__wrapper">
              <h2 className="About__title">About</h2>
              <p className="About__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lectus eget dui sagittis rutrum. Curabitur sed elit sed mi imperdiet tempus. Aliquam commodo aliquet arcu, eget consequat enim aliquam non. Vestibulum posuere, arcu eu egestas vehicula, metus erat sollicitudin neque, id sodales justo tortor sed orci. Proin vitae ex eget ante semper accumsan.</p>
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