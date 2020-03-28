import React from 'react';
import './Footer.scss';
import content from '../../../content';

const { footer } = content;

const Footer = () => {
  return (
    <section className="Footer">
      <p className="Footer__desc">{footer.description}</p>
    </section>
  )
}

export default Footer;