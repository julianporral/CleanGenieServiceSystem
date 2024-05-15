import React, { useState } from 'react';
import './Bookingpage.css';
import UserHeader from '../UserHeader';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../GoogleSignin/config';

const BookingPage = ({ history }) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [region, setRegion] = useState('');
  const [area, setArea] = useState(0);
  const [service, setService] = useState('');
  const [errors, setErrors] = useState({});

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    calculateTotalPrice(e.target.value, area);
  };

  const handleAreaChange = (e) => {
    setArea(parseInt(e.target.value));
    calculateTotalPrice(region, parseInt(e.target.value));
  };

  const calculateTotalPrice = (selectedRegion, selectedArea) => {
    let price = 0;

    if (selectedRegion === 'South Luzon' || selectedRegion === 'North Luzon') {
      price += 3000;
    } else if (selectedRegion === 'Manila/Quezon City/Bulacan') {
      price += 500;
    }

    if (selectedArea >= 8 && selectedArea <= 11) {
      price += 3000;
    } else if (selectedArea >= 12 && selectedArea <= 16) {
      price += 7000;
    } else if (selectedArea >= 18 && selectedArea <= 24) {
      price += 10000;
    }

    setTotalPrice(price);
  };

  const handleMonthChange = (increment) => {
    let newMonth = month + increment;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!region) {
      errors.region = 'Region is required';
    }
    if (!area) {
      errors.area = 'Area is required';
    }
    if (!service) {
      errors.service = 'Service is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const user = auth.currentUser;
      if (user) {
        const bookingData = {
          region,
          area,
          service,
          selectedDate: `${month}/${selectedDate}/${year}`,
          totalPrice,
          bookedAt: new Date().toLocaleString(),
        };
        const docRef = await addDoc(collection(db, 'users', user.uid, 'bookings'), bookingData);
        console.log('Booking added with ID: ', docRef.id);
        alert('Booking successful!');
        history.push('/userlandingpage', { bookingData: bookingData });
      }
    } catch (error) {
      console.error('Error adding booking: ', error);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const className = i === selectedDate ? 'calendar-day selected' : 'calendar-day';
      calendarDays.push(
        <div key={i} className={className} onClick={() => setSelectedDate(i)}>
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="booking-page">
      <UserHeader />
      <div className="booking-header">
        <h1>Clean Genie Cleaning Co.</h1>
      </div>
      <div className="Line"></div>
      <div className="booking-content">
        <div className="booking-form">
          <h2>Booking Form</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="region">Region:</label>
              <select id="region" name="region" value={region} onChange={handleRegionChange}>
                <option value="">Select Region</option>
                <option value="North Luzon">North Luzon</option>
                <option value="South Luzon">South Luzon</option>
                <option value="Manila/Quezon City/Bulacan">Manila/Quezon City/Bulacan</option>
              </select>
              {errors.region && <div className="error">{errors.region}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="area">Area (square meters):</label>
              <input type="number" id="area" name="area" min="1" value={area} onChange={handleAreaChange} />
              {errors.area && <div className="error">{errors.area}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="service">Service:</label>
              <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
                <option value="">Select Services</option>
                <option value="Deep Cleaning">Deep Cleaning</option>
                <option value="Post Construction Cleaning">Post Construction Cleaning</option>
                <option value="In and Out Cleaning">In and Out Cleaning</option>
              </select>
              {errors.service && <div className="error">{errors.service}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="date">Selected Date:</label>
              <input type="text" id="date" name="date" readOnly value={`${month}/${selectedDate}/${year}`} />
            </div>
            <div className="form-group">
              <label htmlFor="total">Total Price:</label>
              <input type="text" id="total" name="total" readOnly value={`PHP ${totalPrice}`} />
            </div>
            <button type="submit">BOOK NOW</button>
          </form>
        </div>
        <div className="calendar-container">
          <div className="calendar">
            <div className="calendar-header">
              <button onClick={() => handleMonthChange(-1)}>Previous Month</button>
              <h2>{new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
              <button onClick={() => handleMonthChange(1)}>Next Month</button>
            </div>
            <div className="calendar-body">{renderCalendar()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
