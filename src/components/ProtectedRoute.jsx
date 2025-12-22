import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render children or outlet
    return children ? children : <Outlet />;
}
