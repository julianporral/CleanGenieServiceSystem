import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../GoogleSignin/config';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CompanyLogo from './CompanyLogo.png';
import './admincalendar.css';

const AdminCalendar = ({ updatedTransactionId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [ocularVisits, setOcularVisits] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState('');
  const [ocularVisitsDates, setOcularVisitsDates] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [notification, setNotification] = useState('');
  const [scheduledOcularVisits, setScheduledOcularVisits] = useState({});
  const [lockedBookingId, setLockedBookingId] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const fetchedBookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filteredBookings = fetchedBookings.filter(booking => !booking.isDeleted);
        const sortedBookings = filteredBookings.sort((a, b) => new Date(a.selectedDate) - new Date(b.selectedDate));
        setBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchOcularVisits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'ocularvisits'));
        const fetchedOcularVisits = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOcularVisits(fetchedOcularVisits);
        const ocularDates = fetchedOcularVisits.map(visit => new Date(visit.selectedDate).toLocaleDateString());
        setOcularVisitsDates(ocularDates);

        const scheduledIds = {};
        fetchedOcularVisits.forEach(visit => {
          scheduledIds[visit.bookingId] = true;
        });
        setScheduledOcularVisits(scheduledIds);
      } catch (error) {
        console.error('Error fetching ocular visits:', error);
      }
    };

    fetchBookings();
    fetchOcularVisits();
  }, []);

  // Handle the updated transaction ID passed from AdminFinanceData
  useEffect(() => {
    if (updatedTransactionId) {
      const updatedOcularVisits = ocularVisits.filter(visit => visit.bookingId !== updatedTransactionId);
      setOcularVisits(updatedOcularVisits);
    }
  }, [updatedTransactionId, ocularVisits]);

  const confirmDeleteBooking = async () => {
    try {
      await updateDoc(doc(db, 'bookings', bookingIdToDelete), { isDeleted: true });
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingIdToDelete));

      const ocularVisitsToDelete = ocularVisits.filter(visit => visit.bookingId === bookingIdToDelete);
      ocularVisitsToDelete.forEach(async (visit) => {
        await deleteDoc(doc(db, 'ocularvisits', visit.id));
      });
      setOcularVisits(prevOcularVisits => prevOcularVisits.filter(visit => visit.bookingId !== bookingIdToDelete));

      const updatedScheduledOcularVisits = { ...scheduledOcularVisits };
      delete updatedScheduledOcularVisits[bookingIdToDelete];
      setScheduledOcularVisits(updatedScheduledOcularVisits);

      setNotification('Booking cleared successfully.');
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error marking booking as deleted:', error);
    }
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleCalendarClick = async (date) => {
    if (!selectedBookingId) {
      alert('Please select a booking first.');
      return;
    }

    if (lockedBookingId === selectedBookingId) {
      alert('A date has already been scheduled for this booking.');
      return;
    }

    try {
      const isDateScheduled = ocularVisitsDates.includes(date.toLocaleDateString());
      if (isDateScheduled) {
        alert('This date is already scheduled for an ocular visit.');
        return;
      }

      const selectedBooking = bookings.find(booking => booking.id === selectedBookingId);
      const bookingDateString = selectedBooking ? ` for booked date ${selectedBooking.selectedDate}` : '';
      const newOcularVisit = {
        selectedDate: date,
        details: `Ocular Visit : ${date.toDateString()}${bookingDateString}`,
        bookingId: selectedBookingId
      };

      addOcularVisit(newOcularVisit);
      setNotification(`Ocular visit scheduled for ${date.toDateString()}`);

      setLockedBookingId(selectedBookingId);
    } catch (error) {
      console.error('Error adding ocular visit:', error);
    }
  };

  const handleBookingSelection = (e) => {
    setSelectedBookingId(e.target.value);
    setLockedBookingId('');
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const displayOcularVisits = () => {
    if (ocularVisits.length === 0) {
      return null;
    }

    return (
      <div className="panel-container ocular-visits">
        <h3>Ocular Visits</h3>
        <div className="panel-content scroll-container">
          {ocularVisits.map(visit => (
            <div key={visit.id} className="ocular-visit-item">
              <p className="visit-details">{visit.details}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const scheduleOcularVisit = () => {
    return (
      <div className="panel-container schedule-ocular-visit">
        <h3>Schedule Ocular Visit</h3>
        <div className="panel-content">
          <select className="booking-dropdown" onChange={handleBookingSelection}>
            <option value="">Choose a booking</option>
            {bookings.map(booking => {
              const isAlreadyScheduled = scheduledOcularVisits[booking.id];
              return (
                <option key={booking.id} value={booking.id} disabled={isAlreadyScheduled}>
                  {booking.selectedDate} - {booking.region} {isAlreadyScheduled && '(Already Scheduled)'}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  };

  const addOcularVisit = async (ocularVisit) => {
    try {
      const docRef = await addDoc(collection(db, 'ocularvisits'), ocularVisit);
      setOcularVisits(prevOcularVisits => [...prevOcularVisits, { id: docRef.id, ...ocularVisit }]);
      const updatedOcularDates = [...ocularVisitsDates, ocularVisit.selectedDate.toLocaleDateString()];
      setOcularVisitsDates(updatedOcularDates);
    } catch (error) {
      console.error('Error adding ocular visit:', error);
    }
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarGrid = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarGrid.push(<div key={`blank-${i}`} className="admin-calendar-cell blank-cell"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isBooked = bookings.some(booking => isSameDate(new Date(booking.selectedDate), date));
    const isDateScheduled = ocularVisitsDates.includes(date.toLocaleDateString());
    const isLocked = lockedBookingId && selectedBookingId === lockedBookingId;

    calendarGrid.push(
      <div
        key={day}
        className={`admin-calendar-cell ${isBooked ? 'booked-date' : ''} ${isDateScheduled ? 'scheduled-date' : ''} ${isLocked ? 'locked-date' : ''}`}
        onClick={() => isDateScheduled || isLocked ? null : handleCalendarClick(date)}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="admin-calendar-container">
      <h2 className="admin-calendar-title">
        Admin Calendar <input type="image" src={CompanyLogo} alt="Submit" width="50" height="40" /> 
      </h2> 
      {notification && <div className="notification">{notification}</div>}
      <div className="admin-calendar-info-container">
        <div className="admin-calendar">
          <div className="calendar-navigation">
            <div className="calendar-navigation-button" onClick={goToPreviousMonth}>
              <FaArrowLeft />
            </div>
            <div className="calendar-navigation-month">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </div>
            <div className="calendar-navigation-button" onClick={goToNextMonth}>
              <FaArrowRight />
            </div>
          </div>
          <div className="admin-calendar-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="admin-header-cell">
                {day}
              </div>
            ))}
          </div>
          <div className="admin-calendar-body">{calendarGrid}</div>
        </div>
        <div className="admin-booking-info">
          <h2>Booking Information</h2>
          <div className="booking-list">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-details">
                <p>
                  <span className="booking-label">Selected Date:</span> {booking.selectedDate}
                </p>
                <p>
                  <span className="booking-label">Region:</span> {booking.region}
                </p>
                <p>
                  <span className="booking-label">Area:</span> {booking.area}{' '}
                </p>
                <p>
                  <span className="booking-label">Service:</span> {booking.service}
                </p>
                <p>
                  <span className="booking-label">Total Price:</span> {booking.totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ocular-visit-section">
        {displayOcularVisits()}
        {scheduleOcularVisit()}
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to clear this booking?</p>
          <div>
            <button onClick={confirmDeleteBooking}>Yes</button>
            <button onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        </div>
      )}
      <Link to="/admin" className="admin-back-button">
        <FaArrowLeft /> Back to Admin
      </Link>
    </div>
  );
};

export default AdminCalendar;
