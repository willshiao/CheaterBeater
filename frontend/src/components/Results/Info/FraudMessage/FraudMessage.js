import React from 'react';
import './FraudMessage.scss';
import content from '../../../../content';
import cbImage from '../../../../assets/imgs/cb-4.svg';

const { results: { info: { fraudMessage } } } = content;

const FraudMessage = () => {
  return (
    <section className="FraudMessage">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <img src={cbImage} alt="Cheater Beater" className="FraudMessage__image"/>
        </div>
        <div className="row justify-content-center">
          <div className="FraudMessage__messageContainer">
            <h2 className="FraudMessage__title">{fraudMessage.title}</h2>
            <p className="FraudMessage__message">{fraudMessage.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FraudMessage;