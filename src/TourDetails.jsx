import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './TourDetails.css';

const TourDetails = () => {
    const { id } = useParams(); // Get the tour id from the URL parameters
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from local storage
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);

        // Fetch tour details from the backend
        const fetchTourDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tours/${id}`);
                setTour(response.data);
            } catch (error) {
                console.error('Error fetching tour details:', error);
                setError('Error fetching tour details');
            } finally {
                setLoading(false);
            }
        };

        fetchTourDetails();
    }, [id]);

    // Handle the purchase operation
    const handlePurchase = async () => {
        if (!user || !tour) {
            alert("Please log in and ensure the tour details are loaded to purchase the tour.");
            return;
        }

        // Prepare the data for the POST request
        const purchasingTour = {
            tour: { id: tour.id },
            user: { id: user.id }
        };

        console.log("Purchasing Tour Payload:", purchasingTour); // Add this to check payload

        try {
            await axios.post('http://localhost:8080/purchasingTours', purchasingTour);
            alert('Tour purchased successfully!');
            navigate('/purchased-tours'); // Navigate to a confirmation page or purchased tours list
        } catch (error) {
            console.error('Error purchasing tour:', error);
            alert('Failed to purchase tour.');
        }
    };

    // Conditional rendering based on data loading and availability
    if (loading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="tour-details-container">
            <h1>Tour Details</h1>
            {tour ? (
                <div className="tour-info-container">
                    <h2>{tour.name}</h2>
                    <p><strong>Price:</strong> {tour.priceOfTour}</p>
                    <p><strong>Duration:</strong> {tour.numberOfDays} days</p>
                    <p><strong>Departure Date:</strong> {tour.departureDate}</p>
                    <p><strong>Date of Return:</strong> {tour.dateOfReturn}</p>
                    <p>
                        <strong>From City:</strong> {tour.fromCity.name} <br />
                        <strong>From Country:</strong> {tour.fromCity.country.name} <br />
                        <strong>From Continent:</strong> {tour.fromCity.country.continent.name}
                    </p>
                    <p><strong>From Airport:</strong> {tour.fromAirport.name} ({tour.fromAirport.code})</p>
                    <p>
                        <strong>To City:</strong> {tour.toCity.name} <br />
                        <strong>To Country:</strong> {tour.toCity.country.name} <br />
                        <strong>To Continent:</strong> {tour.toCity.country.continent.name}
                    </p>
                    <p><strong>To Airport:</strong> {tour.toAirport.name} ({tour.toAirport.code})</p>
                    <button onClick={handlePurchase}>Purchase Tour</button>
                </div>
            ) : <p>Tour not found</p>}

            <h2>User Information</h2>
            {user ? (
                <div className="user-info-container">
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Nationality:</strong> {user.nationality}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            ) : <p>User information not available. Please log in.</p>}
        </div>
    );
};

export default TourDetails;
