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
    // Check localStorage for cached session SYNCHRONOUSLY at initialization
    // This runs BEFORE the first render, so no loading spinner is ever shown
    const getInitialAuthState = () => {
        try {
            const storageKey = Object.keys(localStorage).find(key =>
                key.startsWith('sb-') && key.endsWith('-auth-token')
            );
            if (storageKey) {
                const cached = localStorage.getItem(storageKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (parsed?.user && parsed?.expires_at) {
                        // Check if token is not expired (with 60s buffer)
                        const expiresAt = parsed.expires_at * 1000;
                        if (Date.now() < expiresAt - 60000) {
                            console.log('⚡ Instant auth from cache');
                            return { user: parsed.user, loading: false };
                        }
                    }
                }
            }
        } catch (e) {
            console.warn('Could not read cached session:', e);
        }
        return { user: null, loading: true };
    };

    const initialState = getInitialAuthState();
    const [user, setUser] = useState(initialState.user);
    const [loading, setLoading] = useState(initialState.loading);
    const [userRole, setUserRole] = useState('user'); // Default to 'user' instead of null
    const [permissions, setPermissions] = useState({});

    // Fetch user role and permissions - FAST VERSION
    const fetchUserRole = async (userId) => {
        try {
            console.log('🔍 Fetching role for user:', userId);

            // Add a safety timeout for the entire operation
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('fetchUserRole timeout')), 8000)
            );

            const fetchPromise = (async () => {
                // Query 1: Get role_id (fast, no JOIN)
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('role_id')
                    .eq('id', userId)
                    .maybeSingle();

                if (userError) {
                    console.error('❌ Error fetching role_id:', userError);
                    throw userError;
                }

                if (!userData?.role_id) {
                    console.warn('⚠️ No role_id for user');
                    return null;
                }

                console.log('📋 Got role_id:', userData.role_id);

                // Query 2: Get role details (fast, no JOIN)
                const { data: roleData, error: roleError } = await supabase
                    .from('roles')
                    .select('name, permissions')
                    .eq('id', userData.role_id)
                    .maybeSingle();

                if (roleError) {
                    console.error('❌ Error fetching role:', roleError);
                    throw roleError;
                }

                return roleData;
            })();

            const roleData = await Promise.race([fetchPromise, timeoutPromise]);

            if (roleData) {
                console.log('✅ Setting user role to:', roleData.name);
                setUserRole(roleData.name);
                setPermissions(roleData.permissions || {});
            } else {
                console.warn('⚠️ No role data, defaulting to user');
                setUserRole('user');
                setPermissions({});
            }
        } catch (error) {
            console.error('❌ Exception in fetchUserRole:', error.message);
            setUserRole('user');
            setPermissions({});
        }
    };

    useEffect(() => {
        let isMounted = true;
        let isInitialized = initialState.user !== null; // Already initialized if we have cached user

        // Fetch role if we have a cached user
        if (initialState.user) {
            fetchUserRole(initialState.user.id).catch(console.error);
        }

        // Verify session with Supabase (async) - updates if needed
        const verifySession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('❌ Error getting session:', error);
                }

                if (isMounted) {
                    if (session?.user) {
                        console.log('👤 Session verified:', session.user.email);
                        setUser(session.user);
                        // Fetch role if we didn't have cached user before
                        if (!initialState.user) {
                            await fetchUserRole(session.user.id);
                        }
                    } else {
                        console.log('🚫 No active session');
                        setUser(null);
                        setUserRole('user');
                        setPermissions({});
                    }
                    isInitialized = true;
                    setLoading(false);
                }
            } catch (error) {
                console.error('❌ Error in verifySession:', error);
                if (isMounted) {
                    isInitialized = true;
                    setLoading(false);
                }
            }
        };

        verifySession();

        // Listen for auth changes AFTER initialization
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('🔄 Auth state changed:', event, 'isInitialized:', isInitialized);

            if (!isMounted) return;

            // Skip events during initialization - initAuth handles it
            if (!isInitialized && event !== 'SIGNED_OUT') {
                console.log('⏳ Skipping event during initialization');
                return;
            }

            if (event === 'SIGNED_OUT') {
                console.log('👋 User signed out');
                setUser(null);
                setUserRole('user');
                setPermissions({});
                setLoading(false);
                return;
            }

            if (event === 'SIGNED_IN') {
                if (session?.user) {
                    console.log('✅ User signed in:', session.user.email);
                    setLoading(true);
                    setUser(session.user);
                    await fetchUserRole(session.user.id);
                    console.log('✅ SIGNED_IN complete, setting loading=false');
                    setLoading(false);
                }
            }

            if (event === 'TOKEN_REFRESHED') {
                if (session?.user) {
                    console.log('🔄 Token refreshed for:', session.user.email);
                    setUser(session.user);
                    // Don't refetch role on token refresh - it hasn't changed
                }
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signUp = async (email, password, options = {}) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options,
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
        console.log('🚪 Signing out...');
        // Clear state FIRST for instant UI feedback
        setUser(null);
        setUserRole('user');
        setPermissions({});

        // Then call Supabase (don't wait for it)
        supabase.auth.signOut().catch(err => {
            console.error('❌ Supabase signOut error (non-blocking):', err);
        });

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
