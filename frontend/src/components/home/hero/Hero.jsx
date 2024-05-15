import React from "react";
import { Link } from "react-router-dom";
import "./hero.css";
import Title from "../../common/title/Title";



const Hero = () => {
 
  return (    
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <Title subtitle="WELCOME TO CLEAN GENIE CLEANING CO." title="Best Cleaning Service System" />
            <p>Clean Genie Cleaning Co. is a professional, high-quality cleaning service provider.</p>
           
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
