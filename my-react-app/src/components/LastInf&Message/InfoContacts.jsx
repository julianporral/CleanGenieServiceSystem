// InfoContacts.jsx
import React from 'react';
import './InfoContacts.css';

const InfoContacts = () => {
  return (
    <section className='bottom-header'>
      <div className='container flexSB'>
        <div className='logo'>
          <h1>CLEAN GENIE CLEANING CO.</h1>
          <span>ONLINE CLEANING SERVICE SYSTEM</span>
        </div>
        <div className='contact-info'>
          <p>Gmail: clean.genie888@gmail.com</p>
          <p>Phone: 0905 289 5407</p>
        </div>
        <div className='social'>
          <i className='fab fa-facebook-f icon'></i>
          <i className='fab fa-instagram icon'></i>
          <i className='fab fa-twitter icon'></i>
          <i className='fab fa-youtube icon'></i>
        </div>
      </div>
    </section>
  );
};

export default InfoContacts;
