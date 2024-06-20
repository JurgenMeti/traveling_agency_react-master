import React, { useState, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useOutsideClick from './useOutsideClick'; // Make sure the path is correct

const FilterBox = ({ onFilterChange }) => {
  const [filterActive, setFilterActive] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    if (filterActive) setFilterActive(false);
  });

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  const handleOptionClick = (option) => {
    onFilterChange(option); // Pass the selected option back to the parent component
    setFilterActive(false); // Close the dropdown after selection
  };

  return (
    <div 
      ref={ref} 
      className='filter_box' 
      onClick={toggleFilter} 
      style={{ 
        cursor: 'pointer',
        userSelect: 'none'  // Prevent text selection
      }}
    >
      <h2>Filter By Price</h2>
      <KeyboardArrowDownIcon style={{ fontSize: '36px', color: 'black' }} />
      {filterActive && (
        <div className="dropdown-content">
          <option value="high-to-low" onClick={() => handleOptionClick('high-to-low')}>Price High-To-Low</option>
          <option value="low-to-high" onClick={() => handleOptionClick('low-to-high')}>Price Low-To-High</option>
          <option value="100-250" onClick={() => handleOptionClick('100-250')}>$100-$250</option>
          <option value="250-500" onClick={() => handleOptionClick('250-500')}>$250-$500</option>
          <option value="500+" onClick={() => handleOptionClick('500+')}>$500+</option>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
