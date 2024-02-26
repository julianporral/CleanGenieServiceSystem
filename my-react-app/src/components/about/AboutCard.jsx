import React from "react";
import Heading from "../common/heading/Heading";
import { homeAbout } from "../../dummydata";
import { Link } from "react-router-dom"; // Import Link component
import "./About.css";
import Contacts from "./AboutInfo/Background/Contacts"; // Import Contacts component

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='./BgImage.webp' alt='' />
          </div>
          <div className='right row'>
            <Heading id='heading' subtitle='About Us' title='Clean Genie Online Service System' />
            <div className='items'>
              {homeAbout.map((val, index) => (
                <div className="item-link" key={index}>
                  {/* Wrap each item with a Link to a different component */}
                  {index === 0 && (
                    <Link to={`/background`} className='item-link'>
                      <div className='item flexSB'>
                        <div className='img'>
                          <img src={val.cover} alt='' />
                        </div>
                        <div className='text'>
                          <h2>{val.title}</h2>
                          <p>{val.desc}</p>
                        </div>
                      </div>
                    </Link>
                  )}
                  {index === 1 && (
                    <Link to={`/certificate`} className='item-link'>
                      <div className='item flexSB'>
                        <div className='img'>
                          <img src={val.cover} alt='' />
                        </div>
                        <div className='text'>
                          <h2>{val.title}</h2>
                          <p>{val.desc}</p>
                        </div>
                      </div>
                    </Link>
                  )}
                  {index === 2 && (
                    <Link to={`/contacts`} className='item-link'> {/* Link to the Contacts component */}
                      <div className='item flexSB'>
                        <div className='img'>
                          <img src={val.cover} alt='' />
                        </div>
                        <div className='text'>
                          <h2>{val.title}</h2>
                          <p>{val.desc}</p>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Include the Contacts component */}
      <Contacts />
    </>
  );
};

export default AboutCard;
