import React from 'react';
import './SafeMessage.scss';
import content from '../../../../content';
import cbImage from '../../../../assets/imgs/cb-3.svg';

const { results: { info: { safeMessage } } } = content;

const SafeMessage = () => {
  return (
    <section className="SafeMessage">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <img src={cbImage} alt="Cheater Beater" className="SafeMessage__image"/>
        </div>
        <div className="row justify-content-center">
          <div className="SafeMessage__messageContainer">
            <h2 className="SafeMessage__title">{safeMessage.title}</h2>
            <p className="SafeMessage__message">{safeMessage.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SafeMessage;