import { useState, useEffect } from 'react';

const STORAGE_KEY = 'memocode_user_data';

export function useUserData() {
    const [userData, setUserData] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : { priorities: {}, sortOrders: {} };
        } catch (e) {
            console.error('Failed to load user data', e);
            return { priorities: {}, sortOrders: {} };
        }
    });

    // Save to localStorage whenever data changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        } catch (e) {
            console.error('Failed to save user data', e);
        }
    }, [userData]);

    const setPriority = (snippetId, level) => {
        setUserData(prev => ({
            ...prev,
            priorities: {
                ...prev.priorities,
                [snippetId]: level
            }
        }));
    };

    const getPriority = (snippetId) => {
        return userData.priorities?.[snippetId] || 0;
    };

    const updateSortOrder = (categoryId, newOrder) => {
        setUserData(prev => ({
            ...prev,
            sortOrders: {
                ...prev.sortOrders,
                [categoryId]: newOrder
            }
        }));
    };

    const getSortOrder = (categoryId) => {
        return userData.sortOrders?.[categoryId] || null;
    };

    return {
        priorities: userData.priorities || {},
        sortOrders: userData.sortOrders || {},
        setPriority,
        getPriority,
        updateSortOrder,
        getSortOrder
    };
}
