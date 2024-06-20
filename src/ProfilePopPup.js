import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePopup.css';

const ProfilePopup = ({ userId, onClose }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Add other fields as needed
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}`, userData);
      onClose();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="profile-popup">
      <div className="popup-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={userData.email} onChange={handleChange} />
          </label>
          {/* Add other fields as needed */}
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePopup;
