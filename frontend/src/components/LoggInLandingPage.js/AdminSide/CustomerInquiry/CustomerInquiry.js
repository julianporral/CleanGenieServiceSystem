import React, { useState, useEffect } from 'react';
import { db } from '../../../GoogleSignin/config';
import { getDocs, collection, query, where } from 'firebase/firestore'; // Import Firestore functions
import { FaArrowLeft } from 'react-icons/fa'; // Import arrow icon
import { Link } from 'react-router-dom';
import CompanyLogo from './CompanyLogo.png';

import './CustomerInquiry.css';

const CustomerInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const inquirySnapshot = await getDocs(collection(db, 'inquiries'));
        let inquiryData = inquirySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        inquiryData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort inquiries by timestamp in descending order
        
        // Fetch phone number for each inquiry based on user's email
        for (let i = 0; i < inquiryData.length; i++) {
          const inquiry = inquiryData[i];
          const userDetailsQuery = query(collection(db, 'users'), where('email', '==', inquiry.email));
          const userDetailsSnapshot = await getDocs(userDetailsQuery);
          userDetailsSnapshot.forEach(doc => {
            inquiry.phone = doc.data().phone; // Add phone number to inquiry object
          });
        }

        setInquiries(inquiryData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while data is being fetched
  }

  return (
    <div className='customer-inquiry-container'>
      <h1 className="page-title">Customer Inquiries<input type="image" src={CompanyLogo} alt="Submit" width="50" height="40" /> </h1>
      <Link to="/admin" className="admin-back-button"><FaArrowLeft /> Go Back</Link> 
      <div className="inquiry-list">
        {inquiries.map(inquiry => (
          <div key={inquiry.id} className="inquiry">
            <h3 className="inquiry-title">Username: {inquiry.name}</h3>
            <p className="inquiry-email">Email: {inquiry.email}</p>
            <p className='inquiry-phone'>Phone: {inquiry.phone}</p>
            <p className="inquiry-date">Date: {inquiry.timestamp}</p>
            <p> Message:</p>
            <div className="inquiry-message-container">
              <p className="inquiry-message">{inquiry.message}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CustomerInquiry;
