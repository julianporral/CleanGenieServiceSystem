import React, { useState, useEffect } from 'react';
import { db } from '../../../GoogleSignin/config';
import { getDocs, collection } from 'firebase/firestore';
import './AdminFinanceData.css';
import CompanyLogo from './CompanyLogo.png';

const AdminFinanceData = ({ onPaymentChange }) => {
    const [bookings, setBookings] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingSnapshot = await getDocs(collection(db, 'bookings'));
                const bookingsData = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), paid: false }));
                setBookings(bookingsData);
                return bookingsData;
            } catch (error) {
                console.error('Error fetching bookings:', error);
                return [];
            }
        };

        const fetchExpenses = async (bookingsData) => {
            try {
                const expensesData = await Promise.all(bookingsData.map(async (booking) => {
                    const cleaners = await calculateCleaners(booking.area);
                    return {
                        id: booking.service, // Change from booking.userId to booking.service
                        cleaners: cleaners,
                        materialsEquipments: booking.materialsEquipments
                    };
                }));
                setExpenses(expensesData);
                setLoading(false);
            } catch (error) {
                console.error('Error calculating expenses:', error);
                setLoading(false);
            }
        };

        const initializeData = async () => {
            const bookingsData = await fetchBookings();
            await fetchExpenses(bookingsData);
        };

        initializeData();
    }, []);

    const calculateCleaners = async (area) => {
        if (area <= 10) {
            return 1;
        } else if (area <= 30) {
            return 2;
        } else if (area <= 40) {
            return 3;
        } else if (area <= 50) {
            return 3;
        } else if (area <= 80) {
            return 4;
        } else if (area <= 100) {
            return 5;
        } else if (area <= 250) {
            return 4;
        } else if (area <= 500) {
            return 5;
        } else if (area <= 700) {
            return 7;
        } else if (area <= 1000) {
            return 8;
        } else {
            return 9;
        }
    };

    const handlePayment = async (index) => {
        try {
            const updatedBookings = [...bookings];
            updatedBookings[index].paid = !updatedBookings[index].paid;
            setBookings(updatedBookings);
            onPaymentChange(updatedBookings[index].id, updatedBookings[index].paid);
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const exceedColumnThreshold = expenses.length > 5;

    return (
        <div className="admin-finance-data">
            <div className="header">
                <h1 className="page-title">Financial Report</h1>
                <img className="company-logo" src={CompanyLogo} alt="Company Logo" width="50" height="40" />
            </div>
            <div className="data-container">
                <div className="horizontal-section">
                    <h2>Bookings</h2>
                    <div className="table-container horizontal-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Service</th>
                                    <th>Email</th>
                                    <th>Personal UID</th>
                                    <th>Total Price</th>
                                    <th>Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index}>
                                        <td>{booking.userName}</td>
                                        <td>{booking.service}</td>
                                        <td>{booking.email}</td>
                                        <td>{booking.personalUID}</td>
                                        <td>₱{booking.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <button
                                                onClick={() => handlePayment(index)}
                                                className={booking.paid ? 'paid' : 'not-paid'}
                                            >
                                                {booking.paid ? 'Paid' : 'Not Paid'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="vertical-section">
                    <div className="financial-section">
                        <h2>Expenses</h2>
                        <div className={`table-container ${exceedColumnThreshold ? 'scrollable' : ''}`}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Cleaners</th>
                                        <th>Material/Equipments</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map((expense, index) => (
                                        <tr key={index}>
                                            <td>{expense.id}</td>
                                            <td>{expense.cleaners}</td>
                                            <td>{expense.materialsEquipments}</td>
                                            <td>
                                                ₱{(expense.cleaners * 750).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="financial-section">
                        <h2>Total Revenue</h2>
                        <p>₱{totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
                </div>
            <footer>
                <p>© 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AdminFinanceData;

           
