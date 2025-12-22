import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [permissions, setPermissions] = useState({});

    // Fetch user role and permissions
    const fetchUserRole = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select(`
          role_id,
          roles (
            name,
            permissions
          )
        `)
                .eq('id', userId)
                .single();

            if (error) throw error;

            if (data) {
                setUserRole(data.roles.name);
                setPermissions(data.roles.permissions);
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserRole(session.user.id);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchUserRole(session.user.id);
            } else {
                setUserRole(null);
                setPermissions({});
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { data, error };
    };

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            // Always clear user state
            setUser(null);
            setUserRole(null);
            setPermissions({});
        }
        return { error: null };
    };

    const resetPassword = async (email) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        return { data, error };
    };

    const updatePassword = async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        return { data, error };
    };

    // Permission helpers
    const hasPermission = (permission) => {
        return permissions[permission] === true;
    };

    const isAdmin = () => {
        return userRole === 'admin';
    };

    const value = {
        user,
        userRole,
        permissions,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        hasPermission,
        isAdmin,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
