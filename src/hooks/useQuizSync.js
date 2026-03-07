import { useState, useCallback } from 'react';

const LOCAL_HISTORY_KEY = 'memocode_quiz_history';

/**
 * Hook for storing quiz results in localStorage (auth removed)
 */
export function useQuizSync() {
    const [loading] = useState(false);
    const [error] = useState(null);

    const saveQuizResult = useCallback(async (quizResult) => {
        saveToLocalStorage(quizResult);
        return { success: true, source: 'localStorage' };
    }, []);

    const getQuizHistory = useCallback(async () => {
        return getFromLocalStorage();
    }, []);

    const getUserStats = useCallback(async () => {
        return getLocalStats();
    }, []);

    return {
        saveQuizResult,
        getQuizHistory,
        getUserStats,
        loading,
        error
    };
}

// Helper: Save to localStorage
function saveToLocalStorage(quizResult) {
    try {
        const stored = localStorage.getItem(LOCAL_HISTORY_KEY);
        const history = stored ? JSON.parse(stored) : [];

        history.push({
            ...quizResult,
            completedAt: Date.now()
        });

        // Keep only last 100 results
        if (history.length > 100) {
            history.shift();
        }

        localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

// Helper: Get from localStorage
function getFromLocalStorage() {
    try {
        const stored = localStorage.getItem(LOCAL_HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to read from localStorage:', e);
        return [];
    }
}

// Helper: Get local stats
function getLocalStats() {
    const history = getFromLocalStorage();

    if (history.length === 0) {
        return {
            totalQuizzes: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            averageScore: 0,
            totalTimeSpent: 0,
            source: 'localStorage'
        };
    }

    const totalQuizzes = history.length;
    const totalQuestions = history.reduce((sum, h) => sum + (h.total || 0), 0);
    const totalCorrect = history.reduce((sum, h) => sum + (h.score || 0), 0);
    const totalTime = history.reduce((sum, h) => sum + (h.timeSpent || 0), 0);
    const avgPercentage = history.reduce((sum, h) => sum + (h.percentage || 0), 0) / totalQuizzes;

    return {
        totalQuizzes,
        totalQuestions,
        totalCorrect,
        averageScore: Math.round(avgPercentage),
        totalTimeSpent: totalTime,
        source: 'localStorage'
    };
}
