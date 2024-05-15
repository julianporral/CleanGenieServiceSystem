import React, { useEffect, useState } from 'react';
import UserHeader from '../UserHeader';
import FAQ from './Faq/FAQ';
import { db, auth, getUserDetails } from '../../GoogleSignin/config';
import { collection, setDoc, doc } from 'firebase/firestore';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './inquiry.css';

const Inquiry = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(auth.currentUser){
      getUserDetails().then((userDetails) => {
        setUser(userDetails)
        setName(userDetails.username)
        setEmail(userDetails.email)
        setPhone(userDetails.phone)
      })
    }
  }, [auth])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataInquiry = {
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      };

      const inquiryRef = collection(db, "inquiries");
      await setDoc(doc(inquiryRef), dataInquiry);
      alert('Inquiry sent successfully!');

      setMessage('');
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('Failed to send inquiry. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <UserHeader />
      <div className="content-container">
        <div className="faq-container">
          <FAQ />
        </div>

        <header className="inquiry-header">
          <h1>Clean Genie Cleaning Co.</h1>
        </header>
        <div className="notification">
          {/* Notification content goes here */}
        </div>

        <div className="inquiry-container">
          <h2>Ask a Question</h2>
          <form className="inquiry-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required />
            </div>
            <div className='form-group'>
            <label htmlFor="phone">Phone:</label>
              <input type="text" id="name" phone="phone" value={phone} onChange={(e) => setName(e.target.value)} placeholder="Your Phone Number" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" placeholder="Your message" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className="social-media">
            <p>You can also ask Clean Genie Cleaning Co. through social media:</p>
            <div className="social-media-icons">
              <a href="mailto:clean.genie8888@gmail.com" className="social-icon"><FaEnvelope /></a>
              <a href="https://www.facebook.com/clean.genieco" className="social-icon"><FaFacebookF /></a>
              <a href="https://www.instagram.com/cg.cleaningco/" className="social-icon"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;


