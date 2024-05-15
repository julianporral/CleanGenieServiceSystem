// BookingContext.js
import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState(null);

  const setBooking = (data) => {
    setBookingData(data);
  };

  return (
    <BookingContext.Provider value={{ bookingData, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  return useContext(BookingContext);
};
    