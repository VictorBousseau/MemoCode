import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'memocode_flashcards';
const STATS_KEY = 'memocode_flashcard_stats';

/**
 * Custom hook for managing flashcards
 */
export function useFlashcards() {
    const [flashcards, setFlashcards] = useState([]);
    const [stats, setStats] = useState({
        totalCards: 0,
        reviewedCards: 0,
        correctCount: 0,
        incorrectCount: 0
    });

    // Load flashcards from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const storedStats = localStorage.getItem(STATS_KEY);

        if (stored) {
            try {
                setFlashcards(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to load flashcards:', e);
            }
        }

        if (storedStats) {
            try {
                setStats(JSON.parse(storedStats));
            } catch (e) {
                console.error('Failed to load stats:', e);
            }
        }
    }, []);

    // Save flashcards to localStorage
    const saveFlashcards = useCallback((cards) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
        setFlashcards(cards);
    }, []);

    // Save stats to localStorage
    const saveStats = useCallback((newStats) => {
        localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
        setStats(newStats);
    }, []);

    // Add a new flashcard
    const addFlashcard = useCallback((questionData) => {
        const newCard = {
            id: `flashcard_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            questionId: questionData.id,
            question: questionData.question || questionData.statement,
            code: questionData.code || null, // Add code for code-completion questions
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
        saveFlashcards(updatedCards);

        const updatedStats = {
            ...stats,
            totalCards: updatedCards.length
        };
        saveStats(updatedStats);

        return newCard;
    }, [flashcards, stats, saveFlashcards, saveStats]);

    // Add multiple flashcards at once
    const addMultipleFlashcards = useCallback((questions) => {
        const newCards = questions.map(q => ({
            id: `flashcard_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            questionId: q.id,
            question: q.question || q.statement,
            code: q.code || null, // Add code for code-completion questions
            answer: getAnswerText(q),
            explanation: q.explanation,
            type: q.type,
            topic: q.topic || 'general',
            difficulty: q.difficulty || 'beginner',
            addedAt: Date.now(),
            reviewedAt: null,
            timesReviewed: 0,
            correctCount: 0,
            incorrectCount: 0
        }));

        const updatedCards = [...flashcards, ...newCards];
        saveFlashcards(updatedCards);

        const updatedStats = {
            ...stats,
            totalCards: updatedCards.length
        };
        saveStats(updatedStats);

        return newCards;
    }, [flashcards, stats, saveFlashcards, saveStats]);

    // Remove a flashcard
    const removeFlashcard = useCallback((cardId) => {
        const updatedCards = flashcards.filter(card => card.id !== cardId);
        saveFlashcards(updatedCards);

        const updatedStats = {
            ...stats,
            totalCards: updatedCards.length
        };
        saveStats(updatedStats);
    }, [flashcards, stats, saveFlashcards, saveStats]);

    // Mark flashcard as reviewed
    const markAsReviewed = useCallback((cardId, wasCorrect) => {
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

        saveFlashcards(updatedCards);

        // Update stats
        const reviewedCards = updatedCards.filter(c => c.reviewedAt !== null).length;
        const totalCorrect = updatedCards.reduce((sum, c) => sum + c.correctCount, 0);
        const totalIncorrect = updatedCards.reduce((sum, c) => sum + c.incorrectCount, 0);

        const updatedStats = {
            totalCards: updatedCards.length,
            reviewedCards,
            correctCount: totalCorrect,
            incorrectCount: totalIncorrect
        };
        saveStats(updatedStats);
    }, [flashcards, saveFlashcards, saveStats]);

    // Get flashcards by topic
    const getByTopic = useCallback((topic) => {
        return flashcards.filter(card => card.topic === topic);
    }, [flashcards]);

    // Get flashcards by difficulty
    const getByDifficulty = useCallback((difficulty) => {
        return flashcards.filter(card => card.difficulty === difficulty);
    }, [flashcards]);

    // Get unreviewed flashcards
    const getUnreviewed = useCallback(() => {
        return flashcards.filter(card => card.reviewedAt === null);
    }, [flashcards]);

    // Check if question already exists as flashcard
    const hasFlashcard = useCallback((questionId) => {
        return flashcards.some(card => card.questionId === questionId);
    }, [flashcards]);

    return {
        flashcards,
        stats,
        addFlashcard,
        addMultipleFlashcards,
        removeFlashcard,
        markAsReviewed,
        getByTopic,
        getByDifficulty,
        getUnreviewed,
        hasFlashcard
    };
}

// Helper function to extract answer text from question
function getAnswerText(question) {
    switch (question.type) {
        case 'mcq':
            return question.options[question.correctAnswer];
        case 'code-completion':
            return question.correctAnswer;
        case 'true-false':
            return question.correctAnswer ? 'Vrai' : 'Faux';
        default:
            return 'N/A';
    }
}
