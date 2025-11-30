import { useState, useEffect } from 'react';

export function useHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('memocode_history');
        if (stored) {
            try {
                setHistory(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse history:', e);
            }
        }
    }, []);

    const addToHistory = (snippet, themeTitle, categoryTitle) => {
        setHistory(prev => {
            // Remove if already exists (to move to top)
            const filtered = prev.filter(item => item.id !== snippet.id);

            const newItem = {
                id: snippet.id,
                title: snippet.title,
                description: snippet.description,
                code: snippet.code,
                language: snippet.language, // Optional
                themeTitle,
                categoryTitle,
                timestamp: Date.now()
            };

            const newHistory = [newItem, ...filtered].slice(0, 10); // Keep last 10
            localStorage.setItem('memocode_history', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('memocode_history');
    };

    return { history, addToHistory, clearHistory };
}
