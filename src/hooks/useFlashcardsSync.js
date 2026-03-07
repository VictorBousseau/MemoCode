import { useState, useCallback, useEffect } from 'react';

const LOCAL_FLASHCARDS_KEY = 'memocode_flashcards';

/**
 * Hook for managing flashcards in localStorage (auth removed)
 */
export function useFlashcardsSync() {
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error] = useState(null);

    // Load flashcards on mount
    useEffect(() => {
        loadFlashcards();
    }, []);

    const loadFlashcards = useCallback(async () => {
        setLoading(true);
        try {
            const stored = localStorage.getItem(LOCAL_FLASHCARDS_KEY);
            setFlashcards(stored ? JSON.parse(stored) : []);
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            setFlashcards([]);
        } finally {
            setLoading(false);
        }
    }, []);

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

        const updatedCards = [...flashcards, newCard];
        setFlashcards(updatedCards);
        saveToLocalStorage(updatedCards);

        return newCard;
    }, [flashcards]);

    const removeFlashcard = useCallback(async (cardId) => {
        const updatedCards = flashcards.filter(card => card.id !== cardId);
        setFlashcards(updatedCards);
        saveToLocalStorage(updatedCards);
    }, [flashcards]);

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
    }, [flashcards]);

    const hasFlashcard = useCallback((questionId) => {
        return flashcards.some(card => card.questionId === questionId);
    }, [flashcards]);

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
