// CustomerInquiry.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { db } from '../../../GoogleSignin/config';
import './CustomerInquiry.css';

const CustomerInquiry = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Function to fetch inquiries from Firestore
    const fetchInquiries = async () => {
      try {
        const snapshot = await db.collection('inquiries').orderBy('timestamp', 'desc').get();
        const fetchedInquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInquiries(fetchedInquiries);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };

    fetchInquiries(); // Call the fetchInquiries function when the component mounts
  }, []);

  return (
    <div className='customer-inquiry-container'>
      <h1 className="page-title">Customer Inquiries</h1>
      <div className="inquiry-list">
        {inquiries.map(inquiry => (
          <div key={inquiry.id} className="inquiry">
            <h2 className="inquiry-title">{inquiry.name}</h2>
            <p className="inquiry-date">{inquiry.timestamp}</p>
            <p className="inquiry-message">{inquiry.message}</p>
            {/* Link to view inquiry details (if needed) */}
          </div>
        ))}
      </div>
      <Link to="/admin" className="back-button"><FaArrowLeft /> Go Back</Link>
    </div>
  );
};

export default CustomerInquiry;
