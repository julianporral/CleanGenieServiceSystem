import React, { useState, useEffect } from 'react';
import { auth, db } from '../GoogleSignin/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './userdesign.css'; // Import your existing CSS file
import { FaBars } from 'react-icons/fa'; // Import burger menu icon from react-icons library
import CompanyLogo from './CompanyLogo.png';

const UserLandingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State to track mobile view
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar open/close

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userBookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
                    const querySnapshot = await getDocs(userBookingsQuery);
                    const userBookingsData = querySnapshot.docs.map(doc => doc.data());
                    setBookings(userBookingsData);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching user bookings:', error);
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, []);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log('Sign-out successful');
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState); // Toggle sidebar state
    };

    // Update isMobile state on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredBookings = bookings.filter(booking => booking.selectedDate === selectedDate);
    const remainingBookings = bookings.filter(booking => booking.selectedDate !== selectedDate);

    return (
        <div className="user-landing-page">
            <header className="header">
                {/* Render the burger menu icon only if it's in mobile view */}
                {isMobile && (
                    <div className="burger-menu" onClick={toggleSidebar}>
                        <FaBars />
                    </div>
                )}
                <div className="header-content">
                    <h1>Clean Genie Cleaning Co.  <img src={CompanyLogo} alt="Submit" width="50" height="40" />
                    <button className="signout-button" onClick={handleSignOut}>Sign Out</button></h1>  
                    <div className="logo-signout">
                      
                    </div>
                </div>
                
            </header>
          
            <main className="main-container">
                <section className="user-info">
                    <div className="date-picker">
                        <label htmlFor="datepicker">Select Date:</label>
                        <input
                            type="date"
                            id="datepicker"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <h3>Bookings for {selectedDate}</h3>
                    <ul className="booking-list">
                        {filteredBookings.map((booking, index) => (
                            <li key={index} className="booking-item">
                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Region:</strong> {booking.region}</p>
                                <p><strong>Date:</strong> {booking.selectedDate}</p>
                                <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                                <p><strong>Total Price:</strong> {booking.totalPrice}</p>
                                <p><strong>Booked At:</strong> {booking.bookedAt}</p>
                                <p><strong>Service:</strong> {booking.service}</p>
                            </li>
                        ))}
                        {/* Show remaining bookings below */}
                        {remainingBookings.map((booking, index) => (
                            <li key={index} className="booking-item">
                                <p><strong>Region:</strong> {booking.region}</p>
                                <p><strong>Date:</strong> {booking.selectedDate}</p>
                                <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                                <p><strong>Total Price:</strong> {booking.totalPrice}</p>
                                <p><strong>Booked At:</strong> {booking.bookedAt}</p>
                                <p><strong>Service:</strong> {booking.service}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            {/* Conditionally render the sidebar based on isSidebarOpen state */}
            {isSidebarOpen && (
                <aside className="sidebar">
                    {/* Add your sidebar content here */}
                </aside>
            )}
        </div>
    );
};

export default UserLandingPage;
