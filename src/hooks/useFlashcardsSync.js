import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

const LOCAL_FLASHCARDS_KEY = 'memocode_flashcards';
const LOCAL_STATS_KEY = 'memocode_flashcard_stats';

/**
 * Hook for syncing flashcards with Supabase
 * Falls back to localStorage when user is not authenticated
 */
export function useFlashcardsSync() {
    const { user } = useAuth();
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load flashcards on mount
    useEffect(() => {
        loadFlashcards();
    }, [user]);

    /**
     * Load flashcards - from Supabase if logged in, otherwise localStorage
     */
    const loadFlashcards = useCallback(async () => {
        setLoading(true);

        if (user) {
            try {
                const { data, error } = await supabase
                    .from('user_flashcards')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.warn('Failed to load from Supabase:', error.message);
                    loadFromLocalStorage();
                    return;
                }

                // Transform to match expected format
                const cards = data.map(card => ({
                    id: card.id,
                    questionId: card.question_id,
                    question: card.question,
                    code: card.code,
                    answer: card.answer,
                    explanation: card.explanation,
                    type: card.type,
                    topic: card.topic,
                    difficulty: card.difficulty,
                    addedAt: new Date(card.created_at).getTime(),
                    reviewedAt: card.reviewed_at ? new Date(card.reviewed_at).getTime() : null,
                    timesReviewed: card.times_reviewed || 0,
                    correctCount: card.correct_count || 0,
                    incorrectCount: card.incorrect_count || 0
                }));

                setFlashcards(cards);
            } catch (e) {
                console.error('Error loading flashcards:', e);
                loadFromLocalStorage();
            }
        } else {
            loadFromLocalStorage();
        }

        setLoading(false);
    }, [user]);

    const loadFromLocalStorage = () => {
        try {
            const stored = localStorage.getItem(LOCAL_FLASHCARDS_KEY);
            setFlashcards(stored ? JSON.parse(stored) : []);
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            setFlashcards([]);
        }
    };

    /**
     * Add a new flashcard
     */
    const addFlashcard = useCallback(async (questionData) => {
        const newCard = {
            id: `flashcard_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            questionId: questionData.id,
            question: questionData.question || questionData.statement,
            code: questionData.code || null,
            answer: getAnswerText(questionData),
            explanation: questionData.explanation,
            type: questionData.type,
            topic: questionData.topic || 'general',
            difficulty: questionData.difficulty || 'beginner',
            addedAt: Date.now(),
            reviewedAt: null,
            timesReviewed: 0,
            correctCount: 0,
            incorrectCount: 0
        };

        // Update local state immediately
        const updatedCards = [...flashcards, newCard];
        setFlashcards(updatedCards);

        // Save to localStorage as cache
        saveToLocalStorage(updatedCards);

        // Sync to Supabase if logged in
        if (user) {
            try {
                const { error } = await supabase
                    .from('user_flashcards')
                    .insert({
                        id: newCard.id,
                        user_id: user.id,
                        question_id: newCard.questionId,
                        question: newCard.question,
                        code: newCard.code,
                        answer: newCard.answer,
                        explanation: newCard.explanation,
                        type: newCard.type,
                        topic: newCard.topic,
                        difficulty: newCard.difficulty
                    });

                if (error) {
                    console.warn('Failed to sync flashcard:', error.message);
                }
            } catch (e) {
                console.error('Error syncing flashcard:', e);
            }
        }

        return newCard;
    }, [flashcards, user]);

    /**
     * Remove a flashcard
     */
    const removeFlashcard = useCallback(async (cardId) => {
        const updatedCards = flashcards.filter(card => card.id !== cardId);
        setFlashcards(updatedCards);
        saveToLocalStorage(updatedCards);

        if (user) {
            try {
                await supabase
                    .from('user_flashcards')
                    .delete()
                    .eq('id', cardId)
                    .eq('user_id', user.id);
            } catch (e) {
                console.error('Error deleting flashcard:', e);
            }
        }
    }, [flashcards, user]);

    /**
     * Mark flashcard as reviewed (update progress)
     */
    const markAsReviewed = useCallback(async (cardId, wasCorrect) => {
        const updatedCards = flashcards.map(card => {
            if (card.id === cardId) {
                return {
                    ...card,
                    reviewedAt: Date.now(),
                    timesReviewed: card.timesReviewed + 1,
                    correctCount: wasCorrect ? card.correctCount + 1 : card.correctCount,
                    incorrectCount: !wasCorrect ? card.incorrectCount + 1 : card.incorrectCount
                };
            }
            return card;
        });

        setFlashcards(updatedCards);
        saveToLocalStorage(updatedCards);

        if (user) {
            const card = updatedCards.find(c => c.id === cardId);
            if (card) {
                try {
                    await supabase
                        .from('user_flashcards')
                        .update({
                            reviewed_at: new Date().toISOString(),
                            times_reviewed: card.timesReviewed,
                            correct_count: card.correctCount,
                            incorrect_count: card.incorrectCount
                        })
                        .eq('id', cardId)
                        .eq('user_id', user.id);
                } catch (e) {
                    console.error('Error updating flashcard:', e);
                }
            }
        }
    }, [flashcards, user]);

    /**
     * Check if question already exists as flashcard
     */
    const hasFlashcard = useCallback((questionId) => {
        return flashcards.some(card => card.questionId === questionId);
    }, [flashcards]);

    /**
     * Get flashcard statistics
     */
    const getStats = useCallback(() => {
        const reviewedCards = flashcards.filter(c => c.reviewedAt !== null).length;
        const totalCorrect = flashcards.reduce((sum, c) => sum + c.correctCount, 0);
        const totalIncorrect = flashcards.reduce((sum, c) => sum + c.incorrectCount, 0);

        return {
            totalCards: flashcards.length,
            reviewedCards,
            correctCount: totalCorrect,
            incorrectCount: totalIncorrect
        };
    }, [flashcards]);

    return {
        flashcards,
        loading,
        error,
        addFlashcard,
        removeFlashcard,
        markAsReviewed,
        hasFlashcard,
        getStats,
        refresh: loadFlashcards
    };
}

// Helper: Save to localStorage
function saveToLocalStorage(cards) {
    try {
        localStorage.setItem(LOCAL_FLASHCARDS_KEY, JSON.stringify(cards));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

// Helper: Extract answer text from question
function getAnswerText(question) {
    switch (question.type) {
        case 'mcq':
            return question.options?.[question.correctAnswer] || '';
        case 'code-completion':
            return question.correctAnswer || '';
        case 'true-false':
            return question.correctAnswer ? 'Vrai' : 'Faux';
        default:
            return 'N/A';
    }
}
