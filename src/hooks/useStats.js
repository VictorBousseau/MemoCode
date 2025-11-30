import { useState, useEffect } from 'react';

const STORAGE_KEY = 'memocode_stats';

export function useStats() {
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {
            views: [],
            lastVisit: null,
            currentStreak: 0,
            longestStreak: 0
        };
    });

    // Update streak on mount
    useEffect(() => {
        const today = new Date().toDateString();
        const lastVisit = stats.lastVisit ? new Date(stats.lastVisit).toDateString() : null;

        if (lastVisit !== today) {
            updateStreak();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }, [stats]);

    const updateStreak = () => {
        const today = new Date();
        const todayStr = today.toDateString();
        const lastVisit = stats.lastVisit ? new Date(stats.lastVisit) : null;

        if (!lastVisit) {
            // First visit
            setStats(prev => ({
                ...prev,
                lastVisit: todayStr,
                currentStreak: 1,
                longestStreak: Math.max(1, prev.longestStreak || 0)
            }));
            return;
        }

        const lastVisitStr = lastVisit.toDateString();

        if (lastVisitStr === todayStr) {
            // Same day, no change
            return;
        }

        // Calculate difference in days
        const diffTime = today.setHours(0, 0, 0, 0) - lastVisit.setHours(0, 0, 0, 0);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            // Consecutive day!
            const newStreak = (stats.currentStreak || 0) + 1;
            setStats(prev => ({
                ...prev,
                lastVisit: todayStr,
                currentStreak: newStreak,
                longestStreak: Math.max(newStreak, prev.longestStreak || 0)
            }));
        } else {
            // Streak broken
            setStats(prev => ({
                ...prev,
                lastVisit: todayStr,
                currentStreak: 1
            }));
        }
    };

    const logView = (snippetId, theme) => {
        const now = Date.now();
        setStats(prev => ({
            ...prev,
            views: [...prev.views, { snippetId, theme, timestamp: now }]
        }));
    };

    const getWeeklyViews = () => {
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        return stats.views.filter(v => v.timestamp > oneWeekAgo).length;
    };

    const getTopThemes = () => {
        const themeCounts = stats.views.reduce((acc, curr) => {
            acc[curr.theme] = (acc[curr.theme] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(themeCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([theme, count]) => ({ theme, count }));
    };

    const getStreak = () => {
        return {
            current: stats.currentStreak || 0,
            longest: stats.longestStreak || 0
        };
    };

    return { logView, getWeeklyViews, getTopThemes, getStreak };
}
