// ScreenshotPage.js

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../GoogleSignin/config';
import { collection, addDoc } from 'firebase/firestore';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './Screenshot.css';
import UserHeader from '../../UserHeader';

const ScreenshotPage = () => {
  const [images, setImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState('gcash');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    }
  }, []);

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

  const handleSubmit = async () => {
    try {
      const batch = [];
      images.forEach(image => {
        const newScreenshotRef = collection(db, 'screenshots');
        const data = {
          userId: user.uid,
          image: image.image,
          type: image.type,
          timestamp: new Date().toISOString()
        };
        batch.push(addDoc(newScreenshotRef, data));
      });
      await Promise.all(batch);
      alert('Screenshots uploaded successfully!');
      setImages([]);
    } catch (error) {
      console.error('Error uploading screenshots:', error);
      alert('Failed to upload screenshots. Please try again later.');
    }
  };

  return (
    <div className='screenshot-container'>
      <UserHeader />
      <div className='screenshot-header'>
        <h1>Clean Genie Cleaning Co.</h1>
      </div>
      <div className='screenshot-line'></div>
      <div className='upload-form'>
        <h2>Upload a photo</h2>
        <div className='option-container'>
          <input
            type='radio'
            id='gcash'
            name='uploadOption'
            value='gcash'
            checked={selectedOption === 'gcash'}
            onChange={handleOptionChange}
          />
          <label htmlFor='gcash'>GCash Image</label>
        </div>
        <input type='file' onChange={handleUpload} />
      </div>
      <div className='uploaded-image-container'>
        {images.map((image, index) => (
          <div key={index} className='uploaded-image-wrapper'>
            <div className='image-frame'>
              <img src={image.image} alt={`Uploaded Image ${index + 1}`} className='uploaded-image' />
            </div>
            <p>Type: {image.type}</p>
          </div>
        ))}
      </div>
      <button className='upload-button' onClick={handleSubmit}>Upload</button>
      <Link to='/admin' className='admin-back-button'><FaArrowLeft /> Go Back</Link>
    </div>
  );
};

export default ScreenshotPage;
