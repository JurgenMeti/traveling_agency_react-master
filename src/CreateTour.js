import React, { Component } from 'react';

class CreateTours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imgURL: '',
            fromCityId: '',
            fromAirportId: '',
            toCityId: '',
            toAirportId: '',
            departureDate: '',
            dateOfReturn: '',
            numberOfDays: '',
            cityCountry: '',
            type: '',
            promoted: '',
            discountPercentage: '',
            priceOfTour: '',
            originalPriceOfTour: '',
            numberOfSeats: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            name, imgURL, fromCityId, fromAirportId, toCityId, toAirportId,
            departureDate, dateOfReturn, numberOfDays, cityCountry,
            type, promoted, discountPercentage, priceOfTour, originalPriceOfTour,
            numberOfSeats
        } = this.state;

        const tourData = {
            name, imgURL,
            fromCity: { id: fromCityId },
            fromAirport: { id: fromAirportId },
            toCity: { id: toCityId },
            toAirport: { id: toAirportId },
            departureDate, dateOfReturn, numberOfDays, cityCountry,
            type, promoted, discountPercentage, priceOfTour, originalPriceOfTour,
            numberOfSeats
        };

        fetch('http://localhost:8080/api/tours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tourData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Tour created successfully!');
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />

                <label>Image URL:</label>
                <input type="text" name="imgURL" value={this.state.imgURL} onChange={this.handleChange} />

                <label>From City ID:</label>
                <input type="number" name="fromCityId" value={this.state.fromCityId} onChange={this.handleChange} />

                <label>From Airport ID:</label>
                <input type="number" name="fromAirportId" value={this.state.fromAirportId} onChange={this.handleChange} />

                <label>To City ID:</label>
                <input type="number" name="toCityId" value={this.state.toCityId} onChange={this.handleChange} />

                <label>To Airport ID:</label>
                <input type="number" name="toAirportId" value={this.state.toAirportId} onChange={this.handleChange} />

                <label>Departure Date:</label>
                <input type="date" name="departureDate" value={this.state.departureDate} onChange={this.handleChange} />

                <label>Date of Return:</label>
                <input type="date" name="dateOfReturn" value={this.state.dateOfReturn} onChange={this.handleChange} />

                <label>Number of Days:</label>
                <input type="number" name="numberOfDays" value={this.state.numberOfDays} onChange={this.handleChange} />

                <label>City and Country:</label>
                <input type="text" name="cityCountry" value={this.state.cityCountry} onChange={this.handleChange} />

                <label>Type of Tour:</label>
                <input type="text" name="type" value={this.state.type} onChange={this.handleChange} />

                <label>Promoted:</label>
                <select name="promoted" value={this.state.promoted} onChange={this.handleChange}>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>

                <label>Discount Percentage:</label>
                <input type="number" name="discountPercentage" value={this.state.discountPercentage} onChange={this.handleChange} />

                <label>Price of Tour:</label>
                <input type="number" name="priceOfTour" value={this.state.priceOfTour} onChange={this.handleChange} />

                <label>Original Price of Tour:</label>
                <input type="number" name="originalPriceOfTour" value={this.state.originalPriceOfTour} onChange={this.handleChange} />

                <label>Number of Seats:</label>
                <input type="number" name="numberOfSeats" value={this.state.numberOfSeats} onChange={this.handleChange} />

                <button type="submit">Create Tour</button>
            </form>
        );
    }
}

export default CreateTours;
