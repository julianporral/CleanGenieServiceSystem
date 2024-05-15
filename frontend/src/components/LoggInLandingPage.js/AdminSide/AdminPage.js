import React from 'react';
import './admin.css'; // Import CSS if needed
import SidebarAdmin from './SidebarAdmin';

const AdminPage = () => {
    return (
        <div>
            <h1 className="sidebar-company-title">Clean Genie Cleaning Co.</h1>
            <div className="new-container">
                <SidebarAdmin />
                <div className="new-content-container">
                    <div id="new-updates" className="new-panel">
                        <h2>Updates</h2>
                        {/* Add content for updates */}
                        <p>This is where you can display updates.</p>
                    </div>
                    <div id="new-booking" className="new-panel">
                        <h2>Ongoing Booking</h2>
                        {/* Add content for ongoing booking */}
                        <p>This is where you can display ongoing bookings.</p>
                    </div>
                    <div id="new-inquiries" className="new-panel">
                        <h2>Inquiries</h2>
                        {/* Add content for inquiries */}
                        <p>This is where you can display inquiries.</p>
                    </div>
                    <div id="new-calendar" className="new-panel">
                        <h2>Calendar of Booking</h2>
                        {/* Add content for calendar of booking */}
                        <p>This is where you can display the calendar of booking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
