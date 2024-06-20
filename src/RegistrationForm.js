import React, { useState } from 'react';
import axios from 'axios';
import nationalities from './Nationalities.json'; // Import the JSON file
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    nationality: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nationality') {
      const selectedNationality = nationalities.find((nation) => nation.name === value);
      if (selectedNationality) {
        setFormData({
          ...formData,
          [name]: value,
          phoneNumber: selectedNationality.dial_code,
          countryCode: selectedNationality.code,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === 'phoneNumber') {
      const formattedNumber = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formattedNumber,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return phoneNumber;
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const areaCode = cleanedNumber.substring(0, 3);
    const firstPart = cleanedNumber.substring(3, 6);
    const secondPart = cleanedNumber.substring(6, 9);
    const thirdPart = cleanedNumber.substring(9);
    const formattedNumber = `(${areaCode}) ${firstPart} ${secondPart} ${thirdPart}`;
    return formattedNumber.trim();
  };

  // Example on how to enhance logging for debugging
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log('Submitting form data:', formData);  // Debug: Log form data being submitted
    const response = await axios.post('http://localhost:8080/api/signup', formData);
    console.log('Registration Response:', response.data);  // Debug: Log response from the server

    const userDetailsResponse = await axios.get(`http://localhost:8080/api/users/${formData.email}`);
    console.log('User Details Response:', userDetailsResponse.data);  // Debug: Log fetched user details

    const { password, ...userDetails } = userDetailsResponse.data;
    localStorage.setItem('user', JSON.stringify(userDetails));

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      nationality: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      role: '',
    });
    setErrors({});

    navigate('/');
  } catch (error) {
    console.error('Registration error:', error);  // Debug: Log any errors encountered
    if (error.response && error.response.data) {
      setErrors({ general: error.response.data });
    } else {
      setErrors({ general: 'An error occurred during registration. Please try again.' });
    }
  }
};


  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <div className="error">{errors.general}</div>}

      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
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
      <div>
        <label>Nationality:</label>
        <select
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
        >
          <option value="">Select Nationality</option>
          {nationalities.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
