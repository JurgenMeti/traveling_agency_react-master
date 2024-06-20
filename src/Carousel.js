import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css'; // Create and import your CSS file

const Carousel = () => {
  const images = [
    { src: 'njishi.jpg', text: 'Asia' },
    { src: 'dyshi.jpg', text: 'Africa' },
    { src: 'treshi.jpg', text: 'Australia' },
    { src: 'katershi.jpg', text: 'Europe' },
    { src: 'pesa.jpg', text: 'S. America' },
    // Add more images as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
          carouselRef.current.style.transition = 'none';
          setCurrentIndex(images.length);
        } else if (currentIndex === images.length + 1) {
          carouselRef.current.style.transition = 'none';
          setCurrentIndex(1);
        }
      };

      const carousel = carouselRef.current;
      carousel.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        carousel.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, [currentIndex, isTransitioning, images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index + 1);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (isTransitioning) {
      if (currentIndex === 0 || currentIndex === images.length + 1) {
        carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      } else {
        carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      }
    }
  }, [isTransitioning, currentIndex, images.length]);

  useEffect(() => {
    const handleInitialLoad = () => {
      setCurrentIndex(1);
    };

    handleInitialLoad();
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        ref={carouselRef}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="image-container inactive">
          <img src={images[images.length - 1].src} alt={`Slide ${images.length}`} />
          <div className="overlay-text">{images[images.length - 1].text}</div>
        </div>
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${index + 1 === currentIndex ? 'active' : 'inactive'}`}
          >
            <img src={image.src} alt={`Slide ${index + 1}`} />
            <div className="overlay-text">{image.text}</div>
          </div>
        ))}
        <div className="image-container inactive">
          <img src={images[0].src} alt="Slide 1" />
          <div className="overlay-text">{images[0].text}</div>
        </div>
      </div>
      <div className="ball-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`ball ${index + 1 === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
      
    </div>
  );
};

export default Carousel;
