import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AdminRoute - Protects routes that require admin privileges
 * Redirects non-admin users to home page
 */
export default function AdminRoute({ children }) {
    const { user, loading, isAdmin, userRole } = useAuth();

    // Show loading state while checking auth OR while role is being fetched
    // This prevents premature redirects
    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-zinc-400">Vérification des permissions...</p>
                </div>
            </div>
        );
    }

    // Redirect if not logged in
    if (!user) {
        console.log('❌ AdminRoute: No user, redirecting to /login');
        return <Navigate to="/login" replace />;
    }

    // Check admin status
    const adminStatus = isAdmin();
    console.log(`🔐 AdminRoute: user=${user.email}, role=${userRole}, isAdmin=${adminStatus}`);

    // Redirect if not admin
    if (!adminStatus) {
        console.log('❌ AdminRoute: Not admin, redirecting to /');
        return <Navigate to="/" replace />;
    }

    console.log('✅ AdminRoute: Access granted');
    return children;
}
