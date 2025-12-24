import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AdminRoute - Protects routes that require admin privileges
 * Redirects non-admin users to home page
 */
export default function AdminRoute({ children }) {
    const { user, loading, isAdmin } = useAuth();

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Redirect if not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect if not admin
    if (!isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return children;
}
