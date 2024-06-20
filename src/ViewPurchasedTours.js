import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPurchasedTours = () => {
  const [purchasedTours, setPurchasedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasedTours = async () => {
      try {
        const response = await axios.get('http://localhost:8080/purchasingTours');
        setPurchasedTours(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch purchased tours:', err);
        setError('Failed to load purchased tours');
        setLoading(false);
      }
    };

    fetchPurchasedTours();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Purchased Tours</h1>
      {purchasedTours.length > 0 ? (
        purchasedTours.map((item, index) => (
          <div key={index} style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
            <h2>{item.tour ? item.tour.name : 'Tour information not available'}</h2>
            {item.tour && item.tour.imgURL ? (
              <img src={item.tour.imgURL} alt={item.tour.name || "Tour Image"} style={{ width: '100%', height: 'auto' }} />
            ) : <p>No image available</p>}
            <p><strong>Purchase ID:</strong> {item.id}</p>
            <p><strong>Tour ID:</strong> {item.tour ? item.tour.id : 'N/A'}</p>
            <p><strong>Departure Date:</strong> {item.tour ? item.tour.departureDate : 'N/A'}</p>
            <p><strong>Date of Return:</strong> {item.tour ? item.tour.dateOfReturn : 'N/A'}</p>
            <p><strong>Number of Days:</strong> {item.tour ? item.tour.numberOfDays : 'N/A'}</p>
            <p><strong>Location:</strong> {item.tour ? item.tour.cityCountry : 'N/A'}</p>
            <p><strong>Type:</strong> {item.tour ? item.tour.type : 'N/A'}</p>
            <p><strong>Promoted:</strong> {item.tour ? item.tour.promoted : 'N/A'}</p>
            <p><strong>Discount Percentage:</strong> {item.tour ? item.tour.discountPercentage + '%' : 'N/A'}</p>
            <p><strong>Price of Tour:</strong> ${item.tour ? item.tour.priceOfTour : 'N/A'}</p>
            <p><strong>Original Price of Tour:</strong> ${item.tour ? item.tour.originalPriceOfTour : 'N/A'}</p>
            <p><strong>Number of Seats:</strong> {item.tour ? item.tour.numberOfSeats : 'N/A'}</p>

            <h3>User Information</h3>
            <p><strong>User ID:</strong> {item.user ? item.user.id : 'N/A'}</p>
            <p><strong>Name:</strong> {item.user ? `${item.user.firstName} ${item.user.lastName}` : 'N/A'}</p>
            <p><strong>Email:</strong> {item.user ? item.user.email : 'N/A'}</p>
            <p><strong>Nationality:</strong> {item.user ? item.user.nationality : 'N/A'}</p>
            <p><strong>Phone Number:</strong> {item.user ? item.user.phoneNumber : 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {item.user ? item.user.dateOfBirth : 'N/A'}</p>
            <p><strong>Gender:</strong> {item.user ? item.user.gender : 'N/A'}</p>
            <p><strong>Role:</strong> {item.user ? item.user.role : 'N/A'}</p>
          </div>
        ))
      ) : (
        <p>No tours have been purchased yet.</p>
      )}
    </div>
  );
};

export default ViewPurchasedTours;
