// PromoteTourPage.js

import React, { useState } from 'react';
import axios from 'axios';

const PromoteTourPage = () => {
  const [formData, setFormData] = useState({
    tourId: '',
    promotionStatus: '',
    discountPercentage: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePromoteTour = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/tours/${formData.tourId}/promotion`,
        null, // Set the request body to null as there's no JSON data to send
        {
          params: { // Use params to send URL parameters
            promotionStatus: formData.promotionStatus.toUpperCase(),
            discountPercentage: parseFloat(formData.discountPercentage),
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data); // Log the response for debugging
      alert('Tour promotion successful!');
    } catch (error) {
      console.error('Error promoting tour:', error);
      alert('Error promoting tour. Please try again.');
    }
  };

  return (
    <div className="promotion-container">
      <h1>Promote Tour</h1>
      <div className="input-container">
        <div className="input-field">
          <label>Tour ID:</label>
          <input
            type="number"
            name="tourId"
            value={formData.tourId}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-field">
          <label>Promotion Status:</label>
          <input
            type="text"
            name="promotionStatus"
            value={formData.promotionStatus}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-field">
          <label>Discount Percentage:</label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleInputChange}
          />
        </div>
        <button className="buttonu" onClick={handlePromoteTour}>
          Promote Tour
        </button>
      </div>
    </div>
  );
};

export default PromoteTourPage;
