import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import FilterBox from './FilterBox';
import './Header.css';
import './text.css';
import './Footer.css';
import Carousel from './Carousel';



const Footer = () => {
  return (
    <footer className="footer">
      <div className='logo-footer'>
        <h1>Frista Tours</h1>
        <h3>© 2024 Wild. All rights reserved.</h3>
      </div>
      <div className='content-footer'>
        <nav className='footer-nav'>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#tours">Tours</a>
          <a href="#contact">Contact</a>
          <a href="#help">Help</a>
        </nav>
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Email: contact@fristatours.com</p>
          <p>Phone: +850 234 567 890</p>
          <p>Address: 123 Adventure Lane, Travel City, TX 78901</p>
        </div>
        <div className="social-media">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
};



const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  const svgRef = useRef(null);  // Define useRef for SVG manipulation
  const [countdown, setCountdown] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);  // State to control the display of the countdown


  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const departureTime = new Date(tour.departureDate);
      const timeDiff = departureTime - now;

      if (timeDiff > 0) {
        let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setCountdown(`${days} Days : ${hours} Hrs : ${minutes} Min : ${seconds} Sec`);
        setShowCountdown(days <= 4);  // Only show countdown when there are 4 or fewer days remaining
      } else {
        setCountdown('Tour has departed');
        setShowCountdown(false);  // Do not show countdown if the tour has departed
      }
    };

    // Update countdown every second
    const timer = setInterval(updateCountdown, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [tour.departureDate]);


  const handleViewDetails = () => {
    navigate(`/tour/${tour.id}`);
  };



  return (
    <div className="card">
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${tour.imgURL})`,
          backgroundColor: tour.image ? 'transparent' : 'red'
        }}
      >
        {!tour.image && <span className="no-image"></span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{tour.name}</h3>

        <div className='date-name'>
          <svg width="12" height="14" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 4.5C9 7.5 4.5 11 4.5 11C4.5 11 0 7.5 0 4.5C0 2.049 2.049 0 4.5 0C6.951 0 9 2.049 9 4.5Z" fill="white" />
            <path d="M4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6Z" fill="#5214EF" stroke="#5214EF" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h5>{tour.cityCountry}</h5>
          <svg width="14" height="14" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_189_68)">
              <path d="M1.1786 1.57141C0.97021 1.57141 0.770364 1.65419 0.623014 1.80154C0.475664 1.94889 0.392883 2.14874 0.392883 2.35713V9.82141C0.392883 10.0298 0.475664 10.2297 0.623014 10.377C0.770364 10.5243 0.97021 10.6071 1.1786 10.6071H9.82145C10.0298 10.6071 10.2297 10.5243 10.377 10.377C10.5244 10.2297 10.6072 10.0298 10.6072 9.82141V2.35713C10.6072 2.14874 10.5244 1.94889 10.377 1.80154C10.2297 1.65419 10.0298 1.57141 9.82145 1.57141H8.25003" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M0.392883 4.32141H10.6072" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2.75 0.392853V2.75" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.25 0.392853V2.75" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2.75 1.57141H6.67857" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_189_68">
                <rect width="11" height="11" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h5>{tour.numberOfDays} Days</h5>


        </div>

        <div className="tour-details">
        <h5>${tour.priceOfTour}</h5>
        <h4> /Person</h4>
        </div>
        {showCountdown && (
          <div className='cityCountry'>
            <h1>
              <svg className='svg-city' width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.49995 12.5357C9.83343 12.5357 12.5357 9.83349 12.5357 6.50001C12.5357 3.16658 9.83343 0.464294 6.49995 0.464294C3.16652 0.464294 0.464233 3.16658 0.464233 6.50001C0.464233 9.83349 3.16652 12.5357 6.49995 12.5357Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.5 4.17859V6.50002L8.85857 9.24859" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {countdown}
            </h1>
          </div>
        )}


        {tour.priceForAdult && (
          <p><strong>Price for Adult:</strong> ${tour.priceForAdult}</p>
        )}
        <div className='buttoni'>
          <button className="view-details-button" onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
    </div>
  );
};



const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showLogout, setShowLogout] = useState(false);
  const welcomeButtonRef = useRef(null);


  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tours/getAllTours');
        setTours(response.data);
        setFilteredTours(response.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (welcomeButtonRef.current && !welcomeButtonRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [welcomeButtonRef]);

  const handleFilterChange = (filterOption) => {
    let sortedTours = [...tours];
    switch (filterOption) {
      case 'high-to-low':
        sortedTours.sort((a, b) => b.priceOfTour - a.priceOfTour);
        break;
      case 'low-to-high':
        sortedTours.sort((a, b) => a.priceOfTour - b.priceOfTour);
        break;
      case '100-250':
        sortedTours = sortedTours.filter(tour => tour.priceOfTour >= 100 && tour.priceOfTour <= 250);
        break;
      case '250-500':
        sortedTours = sortedTours.filter(tour => tour.priceOfTour >= 250 && tour.priceOfTour <= 500);
        break;
      case '500+':
        sortedTours = sortedTours.filter(tour => tour.priceOfTour > 500);
        break;
      default:
        sortedTours = [...tours];
    }
    setFilteredTours(sortedTours);
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };



  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');  // Clear user data
    navigate('/login');               // Navigate to the login page
  };

  const handleLogIn = () => {
    navigate('/login');  // Change this to your actual login route
  };

  const handleSignUp = () => {
    navigate('/RegistrationForm');  // Change this to your actual signup route
  };

  const handleProfileClick = () => {
    navigate('/profile');  // Navigate to profile page
  };



  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="/gango.png" alt="Logo" />
        </div>
        <div className="nav-middle">
          <a href="/">Home</a>
          <a href="/tours">Tours</a>
          <a href="/about">About Us</a>
          <a href="/feedback">Feedback</a>
        </div>
        <div className="nav-right">
          {user ? (
            <div ref={welcomeButtonRef} className='welcome-button' onClick={toggleLogout}>
              Welcome, {user.firstName}
              {showLogout && (
                <>
                  <button className="button-common logout-button" onClick={handleLogout}>Logout</button>
                  <button className="button-common profile-button" onClick={handleProfileClick}>Profile</button>
                  {user.role === 'ADMIN' && (
                    <button className="button-common admin-button" onClick={handleAdminClick}>Admin</button>
                  )}                </>
              )}
            </div>
          ) : (
            <>
              <div onClick={handleSignUp}>Sign Up</div>
              <div onClick={handleLogIn}>Log In</div>
            </>
          )}
        </div>
      </header>
      <div className="text">
        <div className='photo-container'>
          <div className='photo-container-text'>
            <h3>#Explore. Dream. Discover.</h3>
            <h1>Experience the beauty and culture of <span className="highlight">Albania</span> like never before with the leading travel agency in the country.</h1>
          </div>
          <img src="/kator.png" alt="" />
        </div> 
      </div>
      <Carousel />
      <div className="continentst">
        <div className="tour-packages">
          <h1>Tour Packages</h1>
        </div>
        <div className="filter_container">
          <FilterBox filterActive={filterActive} setFilterActive={setFilterActive} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="card-container">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))
        ) : (
          <div className='error-message'>
            <p>No tours available in this price range.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );

};

export default HomePage;
