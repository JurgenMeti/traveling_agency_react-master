import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First API call for authentication
      const authResponse = await axios.post('http://localhost:8080/api/login', formData);
      console.log('Auth Response:', authResponse.data);

      // Second API call to get user details by email
      const detailsResponse = await axios.get(`http://localhost:8080/api/users/${formData.email}`);
      console.log('Details Response:', detailsResponse.data);

      // Save user data to local storage, excluding password
      const { password, ...userDetails } = detailsResponse.data;
      localStorage.setItem('user', JSON.stringify(userDetails));

      // Clear form and errors
      setFormData({
        email: '',
        password: '',
      });
      setErrors({});

      // Navigate to HomePage
      navigate('/');
    } catch (error) {
      // Handle errors here
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data });
      } else {
        console.error('Error during login or fetching details:', error);
        setErrors({ general: 'An error occurred during login or fetching details. Please try again.' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <div className="error">{errors.general}</div>}

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
