import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

const LOCAL_HISTORY_KEY = 'memocode_quiz_history';

/**
 * Hook for syncing quiz results with Supabase
 * Falls back to localStorage when user is not authenticated
 */
export function useQuizSync() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Save quiz result - syncs to Supabase if logged in, otherwise localStorage
     */
    const saveQuizResult = useCallback(async (quizResult) => {
        const { quizId, quizTitle, score, total, percentage, timeSpent, answers } = quizResult;

        // Always save to localStorage as cache
        saveToLocalStorage(quizResult);

        // If user is logged in, sync to Supabase
        if (user) {
            setLoading(true);
            setError(null);

            try {
                // Insert quiz session
                const { data: session, error: sessionError } = await supabase
                    .from('quiz_sessions')
                    .insert({
                        user_id: user.id,
                        quiz_id: quizId,
                        quiz_title: quizTitle,
                        score: score,
                        total_questions: total,
                        percentage: percentage,
                        time_spent_seconds: timeSpent,
                        completed_at: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (sessionError) {
                    // If table doesn't exist, fallback to localStorage only
                    console.warn('Quiz sync failed, using localStorage:', sessionError.message);
                    return { success: true, source: 'localStorage' };
                }

                // Insert individual answers for detailed analytics (optional)
                if (session && answers && Object.keys(answers).length > 0) {
                    const answerRecords = Object.entries(answers).map(([questionId, answerData]) => ({
                        session_id: session.id,
                        question_id: questionId,
                        user_answer: answerData.answer?.toString() || '',
                        answered_at: new Date(answerData.timestamp).toISOString()
                    }));

                    await supabase
                        .from('quiz_answers')
                        .insert(answerRecords)
                        .catch(e => console.warn('Answer sync skipped:', e.message));
                }

                return { success: true, source: 'supabase', sessionId: session.id };
            } catch (e) {
                setError(e.message);
                console.error('Quiz sync error:', e);
                return { success: true, source: 'localStorage', error: e.message };
            } finally {
                setLoading(false);
            }
        }

        return { success: true, source: 'localStorage' };
    }, [user]);

    /**
     * Get quiz history - prioritizes Supabase if logged in
     */
    const getQuizHistory = useCallback(async () => {
        // If user is logged in, fetch from Supabase
        if (user) {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('quiz_sessions')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('completed_at', { ascending: false })
                    .limit(50);

                if (error) {
                    console.warn('Failed to fetch from Supabase:', error.message);
                    return getFromLocalStorage();
                }

                // Transform to match expected format
                return data.map(session => ({
                    quizId: session.quiz_id,
                    quizTitle: session.quiz_title,
                    score: session.score,
                    total: session.total_questions,
                    percentage: session.percentage,
                    timeSpent: session.time_spent_seconds,
                    completedAt: new Date(session.completed_at).getTime()
                }));
            } catch (e) {
                console.error('Error fetching quiz history:', e);
                return getFromLocalStorage();
            } finally {
                setLoading(false);
            }
        }

        // Fallback to localStorage
        return getFromLocalStorage();
    }, [user]);

    /**
     * Get user statistics from Supabase
     */
    const getUserStats = useCallback(async () => {
        if (!user) {
            return getLocalStats();
        }

        try {
            const { data, error } = await supabase
                .from('quiz_sessions')
                .select('score, total_questions, percentage, time_spent_seconds')
                .eq('user_id', user.id);

            if (error || !data || data.length === 0) {
                return getLocalStats();
            }

            const totalQuizzes = data.length;
            const totalQuestions = data.reduce((sum, s) => sum + s.total_questions, 0);
            const totalCorrect = data.reduce((sum, s) => sum + s.score, 0);
            const totalTime = data.reduce((sum, s) => sum + (s.time_spent_seconds || 0), 0);
            const avgPercentage = data.reduce((sum, s) => sum + s.percentage, 0) / totalQuizzes;

            return {
                totalQuizzes,
                totalQuestions,
                totalCorrect,
                averageScore: Math.round(avgPercentage),
                totalTimeSpent: totalTime,
                source: 'supabase'
            };
        } catch (e) {
            console.error('Error fetching stats:', e);
            return getLocalStats();
        }
    }, [user]);

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
