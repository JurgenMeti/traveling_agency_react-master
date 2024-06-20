import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './contexts/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Profile.css';

const EditProfile = () => {
    const { user, login } = useUser();
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        nationality: user.nationality,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        role: user.role
    });


    const navigate = useNavigate(); // Initialize useNavigate

    const handlePasswordChangeClick = () => {
        navigate('/change-password'); // Navigate to ChangePassword component
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelect = (name, value) => {
        // Capitalizing the role values when set
        const capitalizedValue = value === 'Admin' ? 'ADMIN' : value === 'User' ? 'USER' : value;
        setFormData(prevState => ({ ...prevState, [name]: capitalizedValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('Update Response:', response.data);
            alert('Profile updated successfully!');
            login({ ...response.data, id: user.id });
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className='Profile__Split'>
            <div className='Profile__foto-majtas'>
                <img src="travel-8785493.jpg" alt="" />
            </div>
            <div className='Profile__form-djathtas'>
                <form className="Profile__edit-form" onSubmit={handleSubmit}>
                    {/* Input fields for personal information */}
                    <div className='first__last-name'>
                        <div className='first__name-lbel'>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className='last__name-lbel'>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="nationality">Nationality</label>
                    <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

                    {/* Gender and Role selection with updated capitalization for roles */}
                    <div className='gender__admin-box'>
                        <div className='gender__label-column'>
                            <label htmlFor="gender">Gender</label>
                            <div className="gender-selection">
                                <div className={`gender-option ${formData.gender === 'Male' ? 'selected' : ''}`} onClick={() => handleSelect('gender', 'Male')}>Male</div>
                                <div className={`gender-option ${formData.gender === 'Female' ? 'selected' : ''}`} onClick={() => handleSelect('gender', 'Female')}>Female</div>
                            </div>
                        </div>
                        <div className='role__label-column'>
                            <label htmlFor="role">Role</label>
                            <div className="role-selection">
                                <div className={`role-option ${formData.role === 'ADMIN' ? 'selected' : ''}`} onClick={() => handleSelect('role', 'Admin')}>ADMIN</div>
                                <div className={`role-option ${formData.role === 'USER' ? 'selected' : ''}`} onClick={() => handleSelect('role', 'User')}>USER</div>
                            </div>
                        </div>
                    </div>
                    <button type="submit">Update Profile</button>
                    <p>Want to change password? <span onClick={handlePasswordChangeClick} style={{ color: '#0056b3', cursor: 'pointer', textDecoration: 'underline' }}>Change it here</span></p>
                 </form>
            </div>
        </div>
    );
};

export default EditProfile;
