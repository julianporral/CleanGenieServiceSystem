import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Services.css'; // Import CSS styles

const Services = () => {
  const [services, setServices] = useState([]);

  // Function to fetch services from the server
  const fetchServices = () => {
    axios.get('/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  };

  // useEffect to fetch services when the component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className='services-container'>
      <h1 className="title">Our Services</h1>
      <div className="image-grid">
        {/* Blank image containers */}
        <div className="image-container blank">
          <img src="placeholder1.jpg" alt="Blank Service 1" />
          <p className="image-title">Blank Service 1</p>
          <p className="description">Description of Blank Service 1</p>
        </div>
        <div className="image-container blank">
          <img src="placeholder2.jpg" alt="Blank Service 2" />
          <p className="image-title">Blank Service 2</p>
          <p className="description">Description of Blank Service 2</p>
        </div>
        <div className="image-container blank">
          <img src="placeholder3.jpg" alt="Blank Service 3" />
          <p className="image-title">Blank Service 3</p>
          <p className="description">Description of Blank Service 3</p>
        </div>

        {/* Display fetched services */}
        {services.map(service => (
          <div className="image-container" key={service.id}>
            <img src={service.image} alt={service.name} />
            <p className="image-title">{service.name}</p>
            <p className="description">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Links removed */}
    </div>
  );
};

export default Services;
