import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { auth } from './config';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './config'; // Import db from your config file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authListener = onAuthStateChanged(getAuth(), async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'Admin', user.uid)); // Change collection name to 'Admin'
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === 'admin');
        }
      }
    });

    return () => authListener();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setUser(user);
    } catch (error) {
      console.error('Error logging in:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    if (isAdmin) {
      return <Redirect to="/adminpage" />;
    } else {
      return <Redirect to="/userlandingpage" />;
    }
  }

  return (
    <div className="login-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
          <button type="submit" className="login-button">Login</button>
          <div className="login-links">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
