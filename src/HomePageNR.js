import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import './Header.css';
import './text.css';
import './Footer.css';
import FilterBox from './FilterBox';

const Footer = () => {
  return (
    <footer className="footer">
      <div className='logo-footer'>
        <h1>Frista. Tours</h1>
        <h3>© 2024 Wild. All rights reserved.</h3>
      </div>
      <div className='content-footer'>
        <div className='first-content-footer-txt'>
          <h2>Home</h2>
          <h2>About Us</h2>
          <h2>Tours</h2>
          <h2>Contact</h2>
          <h2>Help</h2>
        </div>
      </div>
    </footer>
  );
};

const TourCard = ({ tour, handleLoginPrompt }) => {
  const navigate = useNavigate();
  const svgRef = useRef(null);  // Define useRef for SVG manipulation

  const handleViewDetails = () => {
    handleLoginPrompt(() => navigate(`/tour/${tour.id}`));
  };

  const [svgStyle, setSvgStyle] = useState({
    fill: "#252B32",
    stroke: "white"
  });

  const toggleSvgColor = () => {
    setSvgStyle({
      fill: svgStyle.fill === "#252B32" ? "white" : "#252B32",
      stroke: svgStyle.stroke === "white" ? "#5214EF" : "white"
    });
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
        <h5 className="tour-details">{tour.numberOfDays} Days • ${tour.priceOfTour} Total</h5>
        <div className="svgi" onClick={toggleSvgColor}>
          <svg ref={svgRef} width="30" height="33" viewBox="0 0 15 13" fill={svgStyle.fill} stroke={svgStyle.stroke} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.45405 11.7654L1.97968 6.80678C-0.995531 3.83157 3.37802 -1.88082 7.45405 2.74066C11.53 -1.88082 15.8839 3.85141 12.9284 6.80678L7.45405 11.7654Z" />
          </svg>
        </div>
        <div className='cityCountry'>
          <h1>
            <svg className='svg-city' width="14" height="16" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4.5C9 7.5 4.5 11 4.5 11C4.5 11 0 7.5 0 4.5C0 2.049 2.049 0 4.5 0C6.951 0 9 2.049 9 4.5Z" fill="white" />
              <path d="M4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6Z" fill="#5214EF" stroke="#5214EF" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {tour.cityCountry}
          </h1>
        </div>
        
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

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

  const handleLoginPrompt = (callback) => {
    if (!isLoggedIn) {
      alert("Please log in or sign up to continue.");
    } else {
      callback();
    }
  };

  const handleFilterChange = (filterOption) => {
    handleLoginPrompt(() => {
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
    });
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="/gango.png" alt="Logo" />
        </div>
        <div className="nav-middle">
          <a href="/HomePageNR">Home</a>
          <a href="/tours">Tours</a>
          <a href="/about">About Us</a>
          <a href="/feedback">Feedback</a>
        </div>
        <div className="nav-right">
        <div onClick={() => navigate('/login')}>Login</div>
        <div onClick={() => navigate('/')}>Sign Up</div>        </div>
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
      <div className="continents">
        <div className="image-container">
          <img src="japraku.png" alt="Asia" />
          <div className="overlay-text">Asia</div>
        </div>
      </div>
      <div className="ball-container">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
      <div className="continents">
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
            <TourCard key={tour.id} tour={tour} handleLoginPrompt={handleLoginPrompt} />
          ))
        ) : (
          <div className='error-message'>
            <p>No tours available in this price range.</p>
          </div>
        )}
      </div>
      <Footer />
      <div className="admin-box" onClick={() => handleLoginPrompt(() => navigate('/admin'))}>
        <h2>Admin</h2>
      </div>
      <div className="PromoteTour" onClick={() => handleLoginPrompt(() => navigate('/promote-tour'))}>
        <h2>Promote Tour</h2>
      </div>
    </div>
  );
};

export default HomePage;
