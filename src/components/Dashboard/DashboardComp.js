import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DashboardComp = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <strong>Email:</strong> {currentUser.email}
            <strong>Email:</strong> {currentUser.name}

        </div>
    )
}

export default DashboardComp;
