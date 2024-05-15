import React, { useState, useEffect } from 'react';
import { auth, db } from '../GoogleSignin/config';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import './userdesign.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const UserLandingPage = (props) => {
    const [userDetails, setUserDetails] = useState(null);
    const [userText, setUserText] = useState('');
    const [savedTexts, setSavedTexts] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility on mobile

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
                    if (doc.exists()) {
                        setUserDetails(doc.data());
                        setSavedTexts(doc.data().savedTexts || []);
                        setBookingHistory(doc.data().bookingHistory || []);
                    } else {
                        console.log("User data not found");
                    }
                });
                return () => unsubscribeSnapshot();
            } else {
                console.log("User is not logged in");
            }
        });

        return () => unsubscribeAuth();
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

    const handleChange = (event) => {
        setUserText(event.target.value);
    };

    const handleSave = async () => {
        if (userText.trim() !== '') {
            const updatedTexts = [...savedTexts, userText];
            const updatedBookingHistory = [...bookingHistory];
            const bookingData = props.location?.state?.bookingData;

            if (bookingData) {
                updatedBookingHistory.push(bookingData);
            }

            setSavedTexts(updatedTexts);
            setBookingHistory(updatedBookingHistory);

            try {
                const user = auth.currentUser;
                if (user) {
                    const docRef = doc(db, "Users", user.uid);
                    await setDoc(docRef, { savedTexts: updatedTexts, bookingHistory: updatedBookingHistory }, { merge: true });
                    setUserText('');
                }
            } catch (error) {
                console.error('Error saving text: ', error);
            }
        }
    };

    // Function to toggle menu visibility on mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`user-landing-page ${isMenuOpen ? 'menu-open' : ''}`}>
            <header className="header">
                <h1>Clean Genie Cleaning Co.</h1>
                <button onClick={handleSignOut}>Sign Out</button>
            </header>
            {/* Hamburger menu icon */}
            <div className="hamburger-menu-icon" onClick={toggleMenu}>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            </div>
            {/* Menu panel */}
            {isMenuOpen && (
                <div className="menu-panel">
                    <nav>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            {/* Add more menu items as needed */}
                        </ul>
                    </nav>
                </div>
            )}
            <main className="main-container">
                <section className="user-info">
                    <h2>Welcome, {userDetails ? userDetails.username : 'User'}!</h2>
                    <div className="text-area-container">
                        <textarea value={userText} onChange={handleChange} placeholder="Write something..." />
                        <button onClick={handleSave}>Save</button>
                    </div>
                    <div className="saved-texts-container">
                        {savedTexts.map((text, index) => (
                            <div key={index} className="saved-text">
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="booking-history">
                    <h2>Booking History</h2>
                    <div className="booking-items-container">
                        {bookingHistory.map((booking, index) => (
                            <div key={index} className="booking-item">
                                <p>Name: {booking.name}</p>
                                <p>Region: {booking.region}</p>
                                <p>Date: {booking.selectedDate}</p>
                                <p>Total Price: {booking.totalPrice}</p>
                                <p>Booked At: {booking.bookedAt}</p>
                                <p>Service: {booking.service}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserLandingPage;
