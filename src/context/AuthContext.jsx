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
    // Fetch user role and permissions
    const fetchUserRole = async (userId) => {
        try {
            console.log('Fetching role for user:', userId);

            // 1. Get role_id from users table
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('role_id')
                .eq('id', userId)
                .single();

            if (userError) {
                console.error('Error fetching user role_id:', userError);
                throw userError;
            }

            if (!userData?.role_id) {
                console.warn('No role_id found for user');
                setUserRole('user');
                setPermissions({});
                return;
            }

            // 2. Get role details from roles table
            const { data: roleData, error: roleError } = await supabase
                .from('roles')
                .select('name, permissions')
                .eq('id', userData.role_id)
                .single();

            if (roleError) {
                console.error('Error fetching role details:', roleError);
                throw roleError;
            }

            if (roleData) {
                console.log('Setting user role to:', roleData.name);
                setUserRole(roleData.name);
                setPermissions(roleData.permissions || {});
            }
        } catch (error) {
            console.error('Error in fetchUserRole sequence:', error);
            setUserRole('user'); // Default to 'user' on error
            setPermissions({});
        }
    };

    useEffect(() => {
        let isMounted = true;

        // Set a timeout to prevent infinite loading (5 seconds max)
        const loadingTimeout = setTimeout(() => {
            if (isMounted && loading) {
                console.warn('Auth loading timeout - setting loading to false');
                setLoading(false);
            }
        }, 5000);

        // Initialize auth state
        const initAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Error getting session:', error);
                }

                if (isMounted) {
                    if (session?.user) {
                        console.log('Session found for user:', session.user.id);
                        setUser(session.user);
                        await fetchUserRole(session.user.id);
                    } else {
                        console.log('No active session');
                        setUser(null);
                        setUserRole(null);
                        setPermissions({});
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error in initAuth:', error);
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);

            if (!isMounted) return;

            if (event === 'SIGNED_OUT') {
                console.log('User signed out');
                setUser(null);
                setUserRole(null);
                setPermissions({});
                setLoading(false);
                return;
            }

            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                if (session?.user) {
                    console.log('User signed in/refreshed:', session.user.id);
                    setUser(session.user);
                    await fetchUserRole(session.user.id);
                }
            }

            setLoading(false);
        });

        return () => {
            isMounted = false;
            clearTimeout(loadingTimeout);
            subscription.unsubscribe();
        };
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
            // Race between actual signOut and a 2s timeout
            // This ensures local logout happens even if network/Supabase hangs
            await Promise.race([
                supabase.auth.signOut(),
                new Promise(resolve => setTimeout(resolve, 2000))
            ]);
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
