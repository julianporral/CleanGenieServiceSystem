import React, { useState } from 'react';
import './InquiryForm.css'; 

const InquiryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    contactNumber: '',
    inquiryMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(formData);
   
    onClose();
  };

  return (
    <div className="inquiry-form-container">
      <div className="close-bar" onClick={onClose}>
        <span>&times;</span>
      </div>
      <h2>Inquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="inquiryMessage">Inquiry/Message</label>
          <textarea id="inquiryMessage" name="inquiryMessage" value={formData.inquiryMessage} onChange={handleChange} rows="4" required></textarea>
        </div>
      
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InquiryForm;
