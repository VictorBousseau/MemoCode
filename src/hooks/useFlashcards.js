import { useFlashcardsSync } from './useFlashcardsSync';

/**
 * Custom hook for managing flashcards
 * Now uses useFlashcardsSync for Supabase synchronization
 * This wrapper maintains backward compatibility with existing components
 */
export function useFlashcards() {
    const {
        flashcards,
        loading,
        error,
        addFlashcard,
        removeFlashcard,
        markAsReviewed,
        hasFlashcard,
        getStats,
        refresh
    } = useFlashcardsSync();

    // Get stats object
    const stats = getStats();

    // Helper functions for filtering
    const getByTopic = (topic) => {
        return flashcards.filter(card => card.topic === topic);
    };

    const getByDifficulty = (difficulty) => {
        return flashcards.filter(card => card.difficulty === difficulty);
    };

    const getUnreviewed = () => {
        return flashcards.filter(card => card.reviewedAt === null);
    };

    // Add multiple flashcards (batch operation)
    const addMultipleFlashcards = async (questions) => {
        const newCards = [];
        for (const q of questions) {
            const card = await addFlashcard(q);
            newCards.push(card);
        }
        return newCards;
    };

    return {
        flashcards,
        stats,
        loading,
        error,
        addFlashcard,
        addMultipleFlashcards,
        removeFlashcard,
        markAsReviewed,
        getByTopic,
        getByDifficulty,
        getUnreviewed,
        hasFlashcard,
        refresh
    };
}

// Helper function to extract answer text from question
export function getAnswerText(question) {
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
