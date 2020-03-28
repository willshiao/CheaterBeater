import React from 'react';
import './How.scss';

const How = () => {
  return(
    <section className="How">
      <div className="container-fluid">
        <h2 className="How__title">How it Works</h2>
        <div className="row justify-content-center">
          <div className="col-3">
            <div className="How__wrapper How__first">
              <h2 className="How__subtitle">Transparent</h2>
              <p className="How__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lectus eget dui sagittis rutrum. Curabitur sed elit sed mi imperdiet tempus. Aliquam commodo aliquet arcu, eget consequat enim aliquam non. Vestibulum posuere, arcu eu egestas vehicula, metus erat sollicitudin neque, id sodales justo tortor sed orci.</p>
            </div>
          </div>
          <div className="col-3">
            <div className="How__wrapper How__second">
              <h2 className="How__subtitle">Transparent</h2>
              <p className="How__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lectus eget dui sagittis rutrum. Curabitur sed elit sed mi imperdiet tempus. Aliquam commodo aliquet arcu, eget consequat enim aliquam non. Vestibulum posuere, arcu eu egestas vehicula, metus erat sollicitudin neque, id sodales justo tortor sed orci.</p>
            </div>
          </div>
          <div className="col-3">
            <div className="How__wrapper How__third">
              <h2 className="How__subtitle">Transparent</h2>
              <p className="How__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel lectus eget dui sagittis rutrum. Curabitur sed elit sed mi imperdiet tempus. Aliquam commodo aliquet arcu, eget consequat enim aliquam non. Vestibulum posuere, arcu eu egestas vehicula, metus erat sollicitudin neque, id sodales justo tortor sed orci.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default How;