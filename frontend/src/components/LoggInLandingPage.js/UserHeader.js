import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { auth } from '../GoogleSignin/config';

const UserInfo = ({ currentUser }) => {
  return (
    <div className="profile-info">
      <p>{currentUser ? currentUser.displayName : "No User"}</p>
    </div>
  );
};

const UserHeader = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility on mobile

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log('Sign-out successful');
        setCurrentUser(null);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  // Function to toggle menu visibility on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`sidebar-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="sidebar-header">
        {/* Hamburger menu icon */}
        <div className="hamburger-menu-icon" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
        {/* Profile and navigation sections */}
        <div className="profile-section"> 
          <h2>Customer Profile</h2>
          <UserInfo currentUser={currentUser} />
        </div>
        <div className={`navigation-section ${isMenuOpen ? 'open' : ''}`}>
          <div className="navigation-links">
            <h2>Menu</h2>
            <Link to="/userlandingpage" className="link-to-button">History</Link>
            <Link to="/screenshot" className="link-to-button">Payment Method</Link>
            <Link to="/inquiry" className="link-to-button">Inquiry</Link>
          </div>
        </div>
        <div className="book-now">
          <h2>Booking Page</h2>
          <Link to="/booking" className="link-to-button book-now-button">BOOK NOW</Link>
        </div>
      </div>
      {/* Additional panel */}
      <div className={`right-panel ${isMenuOpen ? 'hide-on-mobile' : ''}`}>
        <h2>Ongoing Service</h2>
        <p>-- .</p>
      </div>
      {/* Overlay to close the menu when clicked outside */}
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default UserHeader;
