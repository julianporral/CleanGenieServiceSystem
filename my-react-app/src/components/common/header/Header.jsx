import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head"; // Import the Head component
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);

  // Function to handle smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setClick(false); // Close the mobile navigation menu after clicking a link
    }
  };

  return (
    <>
      <Head /> {/* Include the Head component to render the title */}
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
              <Link to="/" onClick={() => scrollToSection("inquiry")}>
                Inquiry
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => scrollToSection("gallery")}>
                Gallery
              </Link>
            </li>

            <li>
            <li>
  <Link to="/reservation">
    Reservation
  </Link>
</li>

            </li>

           


          </ul>
          <div className="start"></div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
