import React from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css'; // Import your CSS file for styling

const Admin = () => {
  const navigate = useNavigate();

  const handleCreateTourClick = () => {
    navigate('/create-tour'); // Navigate to the Create Tour page
  };

  const handlePromoteTourClick = () => {
    navigate('/promote-tour'); // Navigate to the Promote Tour page
  };

  const handleDeleteTourClick = () => {
    navigate('/delete-tour'); // Navigate to the Delete Tour page
  };

  const handleViewPurchasedToursClick = () => {
    navigate('/view-purchased-tours'); // Navigate to the View Purchased Tours page
  };

  const handleCreateContinentClick = () => {
    navigate('/create-continent'); // Navigate to the Create Continent page
  };

  const handleCreateCountryClick = () => {
    navigate('/create-country'); // Navigate to the Create Continent page
  };

  const handleCreateCityClick = () => {
    navigate('/create-city'); // Navigate to the Create City page
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <div className="button-container">
        <button className="button" onClick={handleCreateTourClick}>Create Tour</button>
        <button className="button" onClick={handlePromoteTourClick}>Promote Tour</button>
        <button className="button" onClick={handleDeleteTourClick}>Delete Tour</button>
        <button className="button" onClick={handleViewPurchasedToursClick}>View Purchased Tours</button>
        <button className="button" onClick={handleCreateContinentClick}>Create Continent</button>
        <button className="button" onClick={handleCreateCountryClick}>Create Country</button>
        <button className="button" onClick={handleCreateCityClick}>Create City</button>

      </div>
    </div>
  );
};

export default Admin;
