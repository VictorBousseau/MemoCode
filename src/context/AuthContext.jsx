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
            console.log('Fetching role for user:', userId);
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

            if (error) {
                console.error('Error in fetchUserRole query:', error);
                throw error;
            }

            console.log('fetchUserRole data:', data);

            if (data && data.roles) {
                console.log('Setting user role to:', data.roles.name);
                setUserRole(data.roles.name);
                setPermissions(data.roles.permissions || {});
            } else {
                console.warn('No role data found, setting default user role');
                setUserRole('user');
                setPermissions({});
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            setUserRole('user'); // Default to 'user' on error
            setPermissions({});
        }
    };

    useEffect(() => {
        let isMounted = true;

        // Set a timeout to prevent infinite loading (3 seconds max)
        const loadingTimeout = setTimeout(() => {
            if (isMounted && loading) {
                console.warn('Auth loading timeout - setting loading to false');
                setLoading(false);
            }
        }, 3000);

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (isMounted) {
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchUserRole(session.user.id);
                }
                setLoading(false);
            }
        }).catch((error) => {
            console.error('Error getting session:', error);
            if (isMounted) {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (isMounted) {
                setUser(session?.user ?? null);
                if (session?.user) {
                    await fetchUserRole(session.user.id);
                } else {
                    setUserRole(null);
                    setPermissions({});
                }
                setLoading(false);
            }
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
