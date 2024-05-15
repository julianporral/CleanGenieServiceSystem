import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import UserLandingPage from "../../LoggInLandingPage.js/UserLandingPage"; // Import UserLandingPage component
import './header.css';

const Header = () => {
  const [click, setClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleToggleClick = () => {
    setClick(!click);
  };

  const handleSignInSuccess = () => {
    setLoggedIn(true);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
      setClick(false);
    }
  };

  return (
    <div>
      <Head />
      <header className={`header-fixed ${click ? "active" : ""}`}>
        <nav className="flexSB">
          <ul className="flexSB" onClick={() => setClick(false)}>
            <li>
              <Link to="/" onClick={() => scrollToSection("hero")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection("about")}>
                About
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection("services")}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection("gallery")}>
                Gallery
              </Link>
            </li>
            {loggedIn && (
              <li>
                <Link to="/" onClick={() => scrollToSection("userPage")}>
                  User Page
                </Link>
              </li>
            )}
          </ul>
          <div className="start">
            {!loggedIn ? (
              <>
                <Link to="/register">
                  <button>Register Now</button>
                </Link>
               
              </>
            ) : (
              <UserLandingPage />
            )}
          </div>
          <button className="toggle" onClick={handleToggleClick}>
            {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
