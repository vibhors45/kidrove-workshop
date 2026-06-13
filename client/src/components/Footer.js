import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div className="footer__brand">
        <span className="footer__logo">🤖 KidRove</span>
        <p className="footer__tagline">Empowering the next generation of innovators.</p>
      </div>
      <div className="footer__links">
        <a href="mailto:hello@kidrove.com">hello@kidrove.com</a>
        <a href="tel:+918000000000">+91 80000 00000</a>
        <a href="https://www.kidrove.com" target="_blank" rel="noreferrer">kidrove.com</a>
      </div>
      <div className="footer__copy">
        © 2026 KidRove. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
