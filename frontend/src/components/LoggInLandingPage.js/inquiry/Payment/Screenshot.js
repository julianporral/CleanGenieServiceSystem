import React, { useState } from 'react';
import './Screenshot.css';
import UserHeader from '../../UserHeader';

const Screenshot = () => {
  const [images, setImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState('gcash');

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImages([...images, { image: reader.result, type: selectedOption }]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="screenshot-container">
      <UserHeader />
      <div className="screenshot-header">
        <h1>Clean Genie Cleaning Co.</h1>
      </div>


      <div className="screenshot-line"></div>

     
      <div className='Pending-payment'>
        <h1>Payment Type:</h1>
        <p>Service Type: </p>
        <p>Amount: </p>
      </div>

      <div className='Span'></div>
      
      <div className="upload-form">
        <h2>Upload a photo</h2>
        <div className="option-container">
          <input type="radio" id="gcash" name="uploadOption" value="gcash" checked={selectedOption === 'gcash'} onChange={handleOptionChange} />
          <label htmlFor="gcash">GCash Image</label>
        </div>
        <input type="file" onChange={handleUpload} />
      </div>
      <div className="uploaded-image-container">
        {images.map((image, index) => (
          <div key={index} className="uploaded-image-wrapper">
            <div className="image-frame">
              <img src={image.image} alt={`Uploaded Image ${index + 1}`} className="uploaded-image" />
            </div>
            <p>Type: {image.type}</p>
          </div>
        ))}
        {/* Placeholder for the uploaded image */}
        <div className="uploaded-image-wrapper placeholder">
          <div className="image-frame">
            <div className="placeholder-text">No Image Uploaded</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screenshot;
