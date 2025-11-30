import { useState, useEffect } from 'react';

export const useFavorites = () => {
    const STORAGE_KEY = 'memocode_favorites';

    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (snippet) => {
        setFavorites(prev => {
            if (prev.some(fav => fav.id === snippet.id)) return prev;
            return [...prev, snippet];
        });
    };

    const removeFavorite = (snippetId) => {
        setFavorites(prev => prev.filter(fav => fav.id !== snippetId));
    };

    const isFavorite = (snippetId) => {
        return favorites.some(fav => fav.id === snippetId);
    };

    const toggleFavorite = (snippet) => {
        if (isFavorite(snippet.id)) {
            removeFavorite(snippet.id);
        } else {
            addFavorite(snippet);
        }
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite
    };
};
