import React, { Component } from 'react';

class DeleteTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourId: ''
        };
    }

    handleChange = (event) => {
        this.setState({ tourId: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { tourId } = this.state;

        if (tourId) {
            fetch(`http://localhost:8080/api/tours/${tourId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Tour deleted successfully!');
                } else {
                    alert('Failed to delete the tour. Please check the ID and try again.');
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('Please enter a valid tour ID.');
        }
    }

    render() {
        return (
            <div>
                <h1>Delete Tour</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="tourId">Tour ID:</label>
                    <input
                        type="text"
                        id="tourId"
                        name="tourId"
                        value={this.state.tourId}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Delete Tour</button>
                </form>
            </div>
        );
    }
}

export default DeleteTour;
