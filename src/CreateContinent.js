import React, { useState } from 'react';
import axios from 'axios';

const CreateContinent = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/continents', { name });
      alert('Continent created successfully');
      console.log(response.data);
    } catch (error) {
      alert('Failed to create continent');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create a Continent</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter continent name"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateContinent;
