import React from "react";
import Hero from "./hero/Hero";
import AboutCard from "../about/AboutCard";
import Gallery from "../gallery/Gallery";
import Services from "../services/Services";

import "./Home.css"; 
import InfoContacts from "../LastInf&Message/InfoContacts";
import Info from "../MoreInfo/Info";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <section id="hero">
        <Hero/>
      </section>
      <section id="about">
        <AboutCard />
      </section>
      <section id="services">
        <Services />
      </section>
      <Info/>
      <section id="gallery">
        <Gallery />
      </section>
     
     <InfoContacts/>

      <button 
        className="back-to-top-button" 
        onClick={scrollToTop}
        title="Back to Top"
      >
        &uarr;
      </button>
    </>
  );
};

export default Home;
