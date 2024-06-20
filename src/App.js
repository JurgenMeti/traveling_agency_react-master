import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; // Import the UserProvider

import CreateTour from './CreateTour';
import RegistrationForm from './RegistrationForm';
import DeleteTour from './DeleteTour';
import Profile from './Profile';
import Login from './Login';
import HomePage from './HomePage';
import TourDetails from './TourDetails';
import Admin from './Admin';
import PromoteTourPage from './PromoteTourPage';
import TravelForm from './TravelForm';
// import HomePageNR from './HomePageNR';
import ViewPurchasedTours from './ViewPurchasedTours'; // Import the new component
import CreateContinent from './CreateContinent';
import CreateCountry from './CreateCountry';  // Import the new CreateCountry component
import CreateCity from './CreateCity';


function App() {
  return (
    <UserProvider> {/* Wrap all routes within UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/delete-tour" element={<DeleteTour />} />
          <Route path="/create-tour" element={<CreateTour />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/promote-tour" element={<PromoteTourPage />} />
          <Route path="/travel-form" element={<TravelForm />} />
          {/* <Route path="/HomePageNR" element={<HomePageNR />} /> */}
          <Route path="/view-purchased-tours" element={<ViewPurchasedTours />} />
          <Route path="/create-continent" element={<CreateContinent />} />
          <Route path="/create-country" element={<CreateCountry />} /> {/* New route for creating countries */}
          <Route path="/create-city" element={<CreateCity />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
