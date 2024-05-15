import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { getUserDetails } from '../GoogleSignin/config';
import { FaBars } from 'react-icons/fa';

const UserHeader = () => {
  const [userName, setUserName] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ocularVisits, setOcularVisits] = useState([]);
  const userBookingId = 'user_booking_id'; // Replace 'user_booking_id' with the actual user's booking ID

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDetails = await getUserDetails();
        setUserName(userDetails.username);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchOcularVisits = async () => {
      try {
        // Fetch ocular visits
        // This should be filtered based on the current user's booking ID
        // Replace the following lines with the appropriate Firebase Firestore queries
        /*
        const querySnapshot = await getDocs(collection(db, 'ocularvisits'));
        const fetchedOcularVisits = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const userOcularVisits = fetchedOcularVisits.filter(visit => visit.bookingId === userBookingId);
        */
        // For now, set sample data
        const sampleOcularVisits = [
          { id: 1, selectedDate: new Date(), details: 'Sample visit 1', bookingId: 'user_booking_id' },
          { id: 2, selectedDate: new Date(), details: 'Sample visit 2', bookingId: 'other_booking_id' },
        ];
        const userOcularVisits = sampleOcularVisits.filter(visit => visit.bookingId === userBookingId);
        
        setOcularVisits(userOcularVisits);
      } catch (error) {
        console.error('Error fetching ocular visits:', error);
      }
    };

    fetchOcularVisits();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={isMobile ? "sidebar-container-mobile" : "sidebar-container-desktop"}>
      {isMobile && (
        <div className="burger-menu" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}
      <div className="sidebar-header">
        <div className="profile-section"> 
          <h2>Customer Profile</h2>
          <p>Welcome, {userName || "User"}</p>
        </div>
        {(isMobile && sidebarOpen) || !isMobile ? (
          <div className="navigation-section">
            <div className="navigation-links">
              <h2>Menu</h2>
              <ul>
                <li><Link to="/userlandingpage" className="link-to-button">History</Link></li>
                <li><Link to="/screenshot" className="link-to-button">Payment Method</Link></li>
                <li><Link to="/inquiry" className="link-to-button">Inquiry</Link></li>
              </ul>
            </div>
          </div>
        ) : null}
        <div className="book-now">
          <h2>Booking Page</h2>
          <Link to="/booking" className="link-to-button book-now-button">BOOK NOW</Link>
        </div>
      </div>
      {(isMobile && sidebarOpen) || !isMobile ? (
        <div className="right-panel">
          <div className="ocular-visits-list">
            {ocularVisits.map(visit => (
              <div key={visit.id} className="ocular-visit-item">
                <p>Date: {visit.selectedDate instanceof Date ? visit.selectedDate.toLocaleDateString() : 'Invalid Date'}</p>
                <p>Details: {visit.details}</p>
                  
                
              </div>
            ))}
          </div>
        
        </div>
      ) : null}
    </div>
  );
};

export default UserHeader;
