import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCity = () => {
  const [name, setName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/countries');
        setCountries(response.data || []); // Set countries or an empty array if undefined
        setLoading(false);
      } catch (error) {
        setError('Error fetching countries: ' + error.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const city = {
        name,
        country: { id: parseInt(countryId, 10) } // Ensure the country ID is sent as a number
      };
      const response = await axios.post('http://localhost:8080/api/cities', city);
      alert('City created successfully');
      console.log("City creation response:", response.data);
    } catch (error) {
      alert('Failed to create city');
      console.error("Creation error:", error);
    }
  };

  return (
    <div>
      <h1>Create a City</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>City Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter city name"
              required
            />
          </div>
          <div>
            <label>Country:</label>
            <select
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              required
            >
              <option value="">Select a Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create City</button>
        </form>
      )}
    </div>
  );
};

export default CreateCity;
