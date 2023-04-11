import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user } = UserAuth();
    if (!user) {
 
        console.error("Error: You cannot access this page without an account")
        return <Navigate to='/'/>;
    }
    return children;
};