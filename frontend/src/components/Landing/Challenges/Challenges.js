import React from 'react';
import './Challenges.scss';
import cbImage from '../../../assets/imgs/cb-2.svg';

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
              <h2 className="Challenges__title">Challenges</h2>
              <p className="Challenges__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lectus eget dui sagittis rutrum. Curabitur sed elit sed mi imperdiet tempus. Aliquam commodo aliquet arcu, eget consequat enim aliquam non. Vestibulum posuere, arcu eu egestas vehicula, metus erat sollicitudin neque, id sodales justo tortor sed orci. Proin vitae ex eget ante semper accumsan.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Challenges;