import { useLocalStorage } from './useLocalStorage';

export const useFavorites = () => {
    const [favorites, setFavorites] = useLocalStorage('memocode_favorites', []);

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
