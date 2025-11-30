import { useState, useEffect } from 'react';

export const useTheme = () => {
    const STORAGE_KEY = 'memocode_theme';

    const [theme, setTheme] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored || 'dark';
        } catch {
            return 'dark';
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, theme);
        document.documentElement.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme };
};
