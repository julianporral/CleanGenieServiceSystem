import React, { useState, useEffect } from 'react';
import './Bookingpage.css';
import UserHeader from '../UserHeader';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth, getUserDetails } from '../../GoogleSignin/config';

const BookingPage = ({ history }) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [region, setRegion] = useState('');
  const [area, setArea] = useState(0);
  const [service, setService] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      getUserDetails().then((userDetails) => {
        setUser(userDetails);
      });
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const fetchedBookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Filter out the deleted bookings
      const filteredBookings = fetchedBookings.filter(booking => !booking.isDeleted);
      setBookings(filteredBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  

  const isDateBooked = (date) => {
    return bookings.some(booking => {
      const bookingDate = new Date(booking.selectedDate);
      return (
        bookingDate.getDate() === date &&
        bookingDate.getMonth() + 1 === month &&
        bookingDate.getFullYear() === year
      );
    });
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const calendarDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const isBooked = isDateBooked(day);
      const isCurrentDate = day === currentDate.getDate() && month === (currentDate.getMonth() + 1) && year === currentDate.getFullYear();
      const className = isBooked ? 'calendar-day booked' : 'calendar-day';
      const backgroundColor = isBooked ? 'red' : isCurrentDate ? 'lightblue' : 'transparent';
      calendarDays.push(
        <div
          key={day}
          className={className}
          onClick={() => !isBooked && setSelectedDate(day)}
          style={{ backgroundColor, cursor: isBooked ? 'not-allowed' : 'pointer' }}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    calculateTotalPrice(e.target.value, area);
  };

  const handleAreaChange = (e) => {
    setArea(parseInt(e.target.value));
    calculateTotalPrice(region, parseInt(e.target.value));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotalPrice = (selectedRegion, selectedArea) => {
    let price = 0;
  
    if (selectedRegion === 'North Luzon' || selectedRegion === 'South Luzon') {
      price += 3000;
    } else if (selectedRegion === 'Manila/Quezon City/Bulacan') {
      price += 500;
    }
  
    // Modify the conditions to reflect the pricing based on area for each service
    if (service === 'Deep Cleaning') {
      if (selectedArea <= 60) {
        price += 2199;
      } else {
        price += (selectedArea - 60) * 42 + 2199;
      }
    } else if (service === 'General Move In/Out Cleaning') {
      if (selectedArea === 60) {
        price += 1899;
      } else {
        price += (selectedArea - 60) * 39 + 1899;
      }
    } else if (service === 'Post-Construction/Renovation Cleaning') {
      if (selectedArea <= 60) {
        price += 2745;  
      } else {
        price += (selectedArea - 60) * 45 + 2745;
      }
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
    if (!paymentMethod) {
      errors.paymentMethod = 'Payment method is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const user = auth.currentUser;
      if (user) {
        const userDetails = await getUserDetails(); // Fetch user details
        const bookingData = {
          region,
          area,
          service,
          paymentMethod,
          selectedDate: `${month}/${selectedDate}/${year}`,
          totalPrice,
          bookedAt: new Date().toLocaleString(),
          createdBy: 'User', // Indicate that this booking is made by the user
          userId: user.uid, // Add the user's UID to the booking data
          userName: userDetails.username, // Add the username to the booking data
          email: userDetails.email, // Add the email to the booking data
        };
        const docRef = await addDoc(collection(db, 'bookings'), bookingData);
        console.log('Booking added with ID: ', docRef.id);
        alert('Booking successful!');
        history.push('/userlandingpage', { bookingData: bookingData });
      }
    } catch (error) {
      console.error('Error adding booking: ', error);
    }
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
<label htmlFor="service">Service:</label>
<select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
  <option value="">Select Services</option>
  <option value="Deep Cleaning">Deep Cleaning</option>
  <option value="General Move In/Out Cleaning">General Move In/Out Cleaning</option>
  <option value="Post-Construction/Renovation Cleaning">Post-Construction/Renovation Cleaning</option>
</select>
{errors.service && <div className="error">{errors.service}</div>}
</div>
            <div className="form-group">
              <label htmlFor="area">Area (square meters):</label>
              <input type="number" id="area" name="area" min="1" value={area} onChange={handleAreaChange} />
{errors.area && <div className="error">{errors.area}</div>}
</div>
<div className="form-group">
<label htmlFor="date">Selected Date:</label>
<input type="text" id="date" name="date" readOnly value={`${month}/${selectedDate}/${year}`} />
</div>
<div className="form-group">
<label htmlFor="paymentMethod">Payment Method:</label>
<select id="paymentMethod" name="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
  <option value="">Select Payment Method</option>
  <option value="Cash">Cash</option>
  <option value="GCash">GCash</option>
  <option value="Cheque">Cheque</option>
</select>
{errors.paymentMethod && <div className="error">{errors.paymentMethod}</div>}
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
<div className="instruction">
<p>Red: Already Booked, Blue: Current Date.</p>
<p>Book 10 days before the Cleaning Service</p>
<p>To have space for an ocular visit</p>
</div>
</div>
</div>
</div>
);
};

export default BookingPage;
