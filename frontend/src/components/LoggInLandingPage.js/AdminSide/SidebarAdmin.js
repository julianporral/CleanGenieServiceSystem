import React from 'react';
import { Link } from 'react-router-dom';



const SidebarAdmin = () => {
    return (
        <div className="new-sidebar-container">
            
          {/**Dashboard// Ongoing pages on admin page */}

            {/* Batch 1: Updates */}
            <div className="sidebar-batch">
                <h2 className="sidebar-title">Updates</h2>
                <ul>
                <li>
  <Link to="/customerinquiry" className="new-sidebar-button">
    Inquiry Messages
  </Link>
</li>

                    <li><Link to="/admincalendar" className="new-sidebar-button">Calendar for Booking</Link></li>
                </ul>
            </div>

            {/* Batch 2: Edits */}
            <div className="sidebar-batch">
                <h2 className="sidebar-title">Maintenance</h2>
                <ul>
                    <li><Link to="/serviceedit" className="new-sidebar-button">Home Page Services</Link></li>
                    <li><Link to="/galleryedit" className="new-sidebar-button">Home Page Gallery </Link></li>
                    <li><Link to="/editbookingform" className="new-sidebar-button">Customer Booking Form</Link></li>
                </ul>
            </div>

            {/* Batch 3: Data */}
            <div className="sidebar-batch">
                <h2 className="sidebar-title">Data</h2>
                <ul>
                    <li><Link to="/adminfinancedata" className="new-sidebar-button">Finance</Link></li>
                    <li><Link to="/materialdata" className="new-sidebar-button">Material Data</Link></li>
                </ul>
            </div>

            {/* Batch 4: User Accounts */}
            <div className="sidebar-batch">
                <h2 className="sidebar-title">User Accounts</h2>
                <ul>
                    <li><Link to="/useraccount" className="new-sidebar-button">User Profile</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarAdmin;
