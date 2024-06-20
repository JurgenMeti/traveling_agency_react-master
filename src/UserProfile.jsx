import React from 'react';
import { useUser } from './contexts/UserContext';

const UserProfile = () => {
    const { user } = useUser();

    if (!user) {
        return <p>Please log in</p>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>User ID: {user.id}</p>
            <p>Name: {user.name}</p>
            // other user details
        </div>
    );
};

export default UserProfile;
