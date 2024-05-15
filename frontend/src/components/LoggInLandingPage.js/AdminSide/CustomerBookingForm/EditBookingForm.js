import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Import arrow icons
import { Link } from 'react-router-dom';
import CompanyLogo from './CompanyLogo.png';

const EditBookingForm = () => {
  const [region, setRegion] = useState('Manila/Quezon City/Bulacan');
  const [area, setArea] = useState('100');
  const [service, setService] = useState('Deep Cleaning');

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='edit-booking-title'>   <h2>Booking Form <input type="image" src={CompanyLogo} alt="Submit" width="50" height="40" /></h2>
    <div className="booking-page">
     
      <div className="booking-content">
        <div className="booking-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="region">Region:</label>
              <input type="text" id="region" value={region} onChange={handleRegionChange} />
            </div>
            <div className="form-group">
              <label htmlFor="area">Area (square meters):</label>
              <input type="number" id="area" min="1" value={area} onChange={handleAreaChange} />
            </div>
            <div className="form-group">
              <label htmlFor="service">Service:</label>
              <select id="service" value={service} onChange={handleServiceChange}>
                <option value="Deep Cleaning">Deep Cleaning</option>
                <option value="Post Construction Cleaning">Post Construction Cleaning</option>
                <option value="In and Out Cleaning">In and Out Cleaning</option>
              </select>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
      <Link to="/admin" className="admin-back-button"><FaArrowLeft /> Go Back</Link>
    </div>
     
     </div>
  );
};

export default EditBookingForm;
