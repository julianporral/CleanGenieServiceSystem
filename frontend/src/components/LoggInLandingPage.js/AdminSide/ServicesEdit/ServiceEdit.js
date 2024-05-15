import React from 'react';
import './ServiceEdit.css'; // Import the CSS file

const ServiceEdit = () => {
  return (
    <div>
      <h2>Image Containers</h2>
      <div className="container">
        <div className="container">
          <img src="https://via.placeholder.com/150" alt="Image 1" className="image" />
          <p className="text">Image 1</p>
        </div>
        <div className="container">
          <img src="https://via.placeholder.com/150" alt="Image 2" className="image" />
          <p className="text">Image 2</p>
        </div>
        <div className="container">
          <img src="https://via.placeholder.com/150" alt="Image 3" className="image" />
          <p className="text">Image 3</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceEdit;
