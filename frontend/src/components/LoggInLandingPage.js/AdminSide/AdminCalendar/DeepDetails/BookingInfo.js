import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../GoogleSignin/config';

const BookingInfo = ({ deletedBooking }) => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const fetchedBookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(fetchedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const fetchedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchBookings();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (deletedBooking) {
      setBookings(prevBookings => [...prevBookings, deletedBooking]);
    }
  }, [deletedBooking]);

  return (
    <div>
      <h2>Booking History</h2>
      <div className="booking-list">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-details">
            <p><span className="booking-label">Date:</span> {booking.selectedDate}</p>
            <p><span className="booking-label">Region:</span> {booking.region}</p>
            <p><span className="booking-label">Area:</span> {booking.area}</p>
            <p><span className="booking-label">Service:</span> {booking.service}</p>
            <p><span className="booking-label">Price:</span> {booking.totalPrice}</p>
            {users.map(user => {
              if (user.id === booking.userId) {
                return (
                  <div key={user.id} className="user-details">
                    <p><span className="user-label">User Name:</span> {user.name}</p>
                    <p><span className="user-label">Email:</span> {user.email}</p>
                    <p><span className="user-label">Phone:</span> {user.phone}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingInfo;
