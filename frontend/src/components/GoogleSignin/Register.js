import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './config';
import { Link, Redirect } from 'react-router-dom';
import './Register.css';

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { username, firstName, lastName, email, password } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      if (newUser) {
        const role = 'customer'; // Hardcoded role for admin registration
        await setDoc(doc(db, 'users', newUser.uid), { // Store user data in 'Admin' collection
          username,
          firstName,
          lastName,
          email: newUser.email,
          role
        });
        setUser(newUser);
        onRegisterSuccess();
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Redirect to="/userlandingpage" />;
  }

  return (
    <div className="register-container">
      <div className='register-logo'>
        <h1>Welcome User</h1>
      </div>
      <form className="register-form" onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
        {error && <div className="error-message">{error}</div>}
        <div className="login-links">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
