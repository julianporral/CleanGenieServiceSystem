import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import InquiryForm from "./InquiryForm/InquiryForm";

const Header = () => {
  const [click, setClick] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setClick(false);
    }
  };

  const handleInquiryClick = () => {
    setShowInquiryForm(true);
  };

  const handleCloseInquiryForm = () => {
    setShowInquiryForm(false);
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
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
          </ul>
          <div className="start">
            <button onClick={handleInquiryClick}>Book Now</button>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
      {showInquiryForm && (
        <div className="overlay">
          <div className="modal">
            <div className="close-bar" onClick={handleCloseInquiryForm}>
              <span>&times;</span>
            </div>
            <InquiryForm onClose={handleCloseInquiryForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
