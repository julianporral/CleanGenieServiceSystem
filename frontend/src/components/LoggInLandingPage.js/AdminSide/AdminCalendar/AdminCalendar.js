import React, { useState } from 'react';
import './admincalendar.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons
import { Link } from 'react-router-dom';

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AdminCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to compare if two dates are the same (ignoring time)
  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarGrid = [];

  // Fill the grid with blank cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarGrid.push(<div key={`blank-${i}`} className="admin-calendar-cell blank-cell"></div>);
  }

  // Fill the grid with cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isCurrentDate = isSameDate(date, new Date()); // Check if it's the current date

    calendarGrid.push(
      <div key={day} className={`admin-calendar-cell ${isCurrentDate ? 'current-date' : ''}`}>
        {day}
      </div>
    );
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <div className="admin-calendar-container">
      <h2 className="admin-calendar-title">Admin Calendar</h2>
      <div className="admin-calendar-info-container">
        <div className="admin-calendar">
          <div className="calendar-navigation">
            <div className="calendar-navigation-button" onClick={goToPreviousMonth}>
              <FaArrowLeft />
            </div>
            <div className="calendar-navigation-month">{currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</div>
            <div className="calendar-navigation-button" onClick={goToNextMonth}>
              <FaArrowRight />
            </div>
          </div>
          <div className="admin-calendar-header">
            {daysInWeek.map(day => (
              <div key={day} className="admin-header-cell">
                {day}
              </div>
            ))}
          </div>
          <div className="admin-calendar-body">
            {calendarGrid}
          </div>
        </div>
        <div className="admin-booking-info">
          <h2>Booking Information</h2>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>
          <p>- </p>

          {/* Add booking information here */}
        </div>
      </div>
      <Link to="/admin" className="admin-back-button"><FaArrowLeft /> Go Back</Link>
    </div>
  );
};

export default AdminCalendar;
