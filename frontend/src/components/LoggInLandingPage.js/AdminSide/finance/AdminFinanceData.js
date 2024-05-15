import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './AdminFinanceData.css';

const UserFinanceData = () => {
  const [tables, setTables] = useState(Array.from({ length: 20 }, () => []));

  const tableContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = tableContainerRef.current;
      if (container.scrollHeight - container.scrollTop === container.clientHeight) {
        // If user scrolled to the bottom, add a new table
        setTables(prevTables => [...prevTables, []]);
      }
    };

    const container = tableContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const generateTables = () => {
    return tables.map((table, index) => (
      <table key={index}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Type of Payment</th>
            <th>Paid / Not Paid</th>
            <th>Ongoing</th>
          </tr>
        </thead>
        <tbody>
          {/* Render table rows */}
          <tr>
            <td colSpan="6" className="empty-table-message">No data available</td>
          </tr>
        </tbody>
      </table>
    ));
  };

  return (
    <div className="user-finance-data">
      <h1>Finance Data Sheet</h1>
      <div className="finance-table-container" ref={tableContainerRef}>
        {generateTables()}
      </div>
      <Link to="/admin" className="back-button"><FaArrowLeft /> Go Back</Link>
    </div>
  );
};

export default UserFinanceData;
