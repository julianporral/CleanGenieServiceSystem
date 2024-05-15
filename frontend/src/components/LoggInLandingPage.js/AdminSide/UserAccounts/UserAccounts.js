import React, { useState, useEffect } from 'react';
import './UserAccounts.css'; // Import CSS for styling
import { FaArrowLeft } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
const UserAccounts = () => {
  // State to manage user accounts
  const [userAccounts, setUserAccounts] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

  // Function to handle adding a new user account
  const handleAddUser = () => {
    setUserAccounts([...userAccounts, newUser]);
    setNewUser({ username: '', email: '', password: '' });
  };

  // Effect to automatically add user when all fields are filled
  useEffect(() => {
    if (newUser.username && newUser.email && newUser.password) {
      handleAddUser();
    }
  }, [newUser]);

  return (
    <div className="user-accounts-container">
      <h1>User Accounts</h1>

      {/* Form to add a new user */}
      <div className="add-user-form">
        <h2>Add New User</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </div>
      </div>

      {/* Display user accounts */}
      <div className="user-list">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/admin" className="back-button"><FaArrowLeft /> Go Back</Link>
    </div>
  );
};

export default UserAccounts;
