import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const services = [
    {
      title: "Deep Cleaning",
      description: "Thorough cleaning service for your home or office.",
      image: "image1.jpg"
    },
    {
      title: "In and Out Cleaning",
      description: "Complete cleaning service for both interior and exterior areas.",
      image: "image2.jpg"
    },
    {
      title: "Post-construction Cleaning",
      description: "Specialized cleaning service for newly constructed or renovated spaces.",
      image: "image3.jpg"
    }
  ];

  const handleServiceClick = (index) => {
    setSelectedService(index + 1);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className='services-container'>
      <h1 className="title">Our Services</h1>
      <div className="image-grid">
        {services.map((service, index) => (
          <div className="image-container" key={index} onClick={() => handleServiceClick(index)}>
            <img src={service.image} alt={service.title} />
            <p className="image-title">{service.title}</p>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={`image${selectedService}.jpg`} alt={`Image ${selectedService}`} />
            <div className="image-info">
              <h2>{services[selectedService - 1].title}</h2>
              <p>{services[selectedService - 1].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
