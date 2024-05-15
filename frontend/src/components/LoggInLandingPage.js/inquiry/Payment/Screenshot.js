import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../GoogleSignin/config';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import UserHeader from '../../UserHeader';
import './Screenshot.css';

const Screenshot = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [imageUrls, setImageUrls] = useState({}); // State to store image URLs for each booking

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userBookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(userBookingsQuery);
          const userBookingsData = querySnapshot.docs.map(doc => doc.data());

          // Filter bookings based on payment method
          const gcashBookings = userBookingsData.filter(booking => booking.paymentMethod === 'GCash');
          setUserBookings(gcashBookings);

          // Fetch image URLs for each booking
          const urls = {};
          await Promise.all(gcashBookings.map(async booking => {
            const imageUrlSnapshot = await getDocs(query(collection(db, 'ScreenShotImages'), where('bookingId', '==', booking.id)));
            const imageUrlData = imageUrlSnapshot.docs.map(doc => doc.data());
            urls[booking.id] = imageUrlData.length > 0 ? imageUrlData[0].imageUrl : '';
          }));
          setImageUrls(urls);
        }
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };

    fetchUserBookings();
  }, []);

  const handleImageUpload = async (e, bookingId) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        const imageUrl = reader.result; // Use the data URL as the image URL
        setImageUrls(prevState => ({
          ...prevState,
          [bookingId]: imageUrl // Store image URL for the corresponding booking ID
        }));
        // Store the image URL in Firestore
        await addDoc(collection(db, 'ScreenShotImages'), { imageUrl, bookingId });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } catch (error) {
      console.error('Error storing image URL in Firestore:', error);
    }
  };

  return (
    <div className="screenshot-container">
      <UserHeader />
      <div className="screenshot-header">
        <h1>Clean Genie Cleaning Co.</h1>
      </div>
      <div className="screenshot-line"></div>
      <form className="form-box">
       
         
        <div className="box">
          <h3>Categories of Bookings</h3>
          <div className="history-container">
            {userBookings.length > 0 ? (
              userBookings.map((booking, index) => (
                <div key={index} className="history-item">
                  <h4>{booking.selectedDate}</h4>
                  <p>
                    <strong>Service Type:</strong> {booking.service},&nbsp;
                    <strong>Payment Method:</strong> {booking.paymentMethod},&nbsp;
                    <strong>Amount:</strong> PHP {booking.totalPrice}
                  </p>
                  <div className="image-insertion">
                    <h3>Insert Image</h3>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, booking.id)} />
                  </div>
                  {/* Display the image URL for each booking */}
                  {imageUrls[booking.id] && <img src={imageUrls[booking.id]} alt={`Image for booking ${index}`} />}
                </div>
              ))
            ) : (
              <div className="no-bookings">No bookings found for GCash payment method</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Screenshot;
