import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCountry = () => {
    const [name, setName] = useState('');
    const [continentId, setContinentId] = useState('');
    const [continents, setContinents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchContinents = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/continents');
                setContinents(response.data || []); // Set continents or an empty array if undefined
                setLoading(false);
            } catch (error) {
                setError('Error fetching continents: ' + error.message);
                setLoading(false);
            }
        };
    
        fetchContinents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const country = {
                name,
                continent: { id: parseInt(continentId, 10) } // Ensure the continent ID is sent as a number
            };
            const response = await axios.post('http://localhost:8080/api/countries/postCoutry', country);
            alert('Country created successfully');
            console.log("Country creation response:", response.data);
        } catch (error) {
            alert('Failed to create country');
            console.error("Creation error:", error);
        }
    };

    return (
        <div>
            <h1>Create a Country</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading continents...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Country Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter country name"
                            required
                        />
                    </div>
                    <div>
                        <label>Continent:</label>
                        <select
                            value={continentId}
                            onChange={(e) => setContinentId(e.target.value)}
                            required
                        >
                            <option value="">Select a Continent</option>
                            {continents.map((continent) => (
                                <option key={continent.id} value={continent.id}>
                                    {continent.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Create Country</button>
                </form>
            )}
        </div>
    );
};

export default CreateCountry;
