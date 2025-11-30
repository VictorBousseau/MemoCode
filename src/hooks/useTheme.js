import { useState, useEffect } from 'react';
import { themes } from '../themes';

const STORAGE_KEY = 'memocode_theme';

export function useTheme() {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved || 'dark';
    });

    // Apply theme on mount
    useEffect(() => {
        applyTheme(currentTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, currentTheme);
        applyTheme(currentTheme);
    }, [currentTheme]);

    const applyTheme = (themeName) => {
        const theme = themes[themeName];
        if (!theme) {
            console.warn(`Theme "${themeName}" not found`);
            return;
        }

        console.log('Applying theme:', themeName, theme.colors);
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Update html class for backward compatibility
        if (themeName === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    };

    return {
        currentTheme,
        setTheme: setCurrentTheme,
        availableThemes: Object.keys(themes),
        themes
    };
}
