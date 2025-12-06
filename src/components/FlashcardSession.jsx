import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Trophy } from 'lucide-react';
import FlashcardCard from './FlashcardCard';

export default function FlashcardSession({ flashcards, onExit, onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sessionStats, setSessionStats] = useState({
        correct: 0,
        incorrect: 0,
        reviewed: []
    });
    const [isCompleted, setIsCompleted] = useState(false);

    const currentCard = flashcards[currentIndex];
    const progress = ((currentIndex + 1) / flashcards.length) * 100;

    const handleRate = (cardId, wasCorrect) => {
        // Update session stats
        setSessionStats(prev => ({
            correct: wasCorrect ? prev.correct + 1 : prev.correct,
            incorrect: !wasCorrect ? prev.incorrect + 1 : prev.incorrect,
            reviewed: [...prev.reviewed, { cardId, wasCorrect }]
        }));

        // Move to next card or complete session
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsCompleted(true);
            if (onComplete) {
                onComplete(sessionStats);
            }
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    if (flashcards.length === 0) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <p className="text-zinc-400 text-lg mb-4">Aucune flashcard à réviser</p>
                <button
                    onClick={onExit}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                >
                    Retour
                </button>
            </div>
        );
    }

    if (isCompleted) {
        const percentage = Math.round((sessionStats.correct / flashcards.length) * 100);

        return (
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Completion Screen */}
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 text-center">
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Session Terminée !
                    </h2>
                    <p className="text-zinc-300 mb-6">
                        Vous avez révisé {flashcards.length} flashcards
                    </p>

                    <div className="flex items-center justify-center gap-8 mb-6">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-400 mb-1">
                                {percentage}%
                            </div>
                            <div className="text-sm text-zinc-400">Réussite</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-green-400 mb-1">
                                {sessionStats.correct}
                            </div>
                            <div className="text-sm text-zinc-400">Correctes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-red-400 mb-1">
                                {sessionStats.incorrect}
                            </div>
                            <div className="text-sm text-zinc-400">Incorrectes</div>
                        </div>
                    </div>

                    <div className="text-lg text-zinc-200">
                        {percentage >= 90 && '🎉 Excellent ! Vous maîtrisez parfaitement !'}
                        {percentage >= 70 && percentage < 90 && '👍 Très bien ! Continuez comme ça !'}
                        {percentage >= 50 && percentage < 70 && '📚 Pas mal ! Un peu plus de révision et ce sera parfait.'}
                        {percentage < 50 && '💪 Continuez vos efforts ! La pratique rend parfait.'}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            setCurrentIndex(0);
                            setSessionStats({ correct: 0, incorrect: 0, reviewed: [] });
                            setIsCompleted(false);
                        }}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                    >
                        Recommencer
                    </button>
                    <button
                        onClick={onExit}
                        className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors"
                    >
                        Retour aux flashcards
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">
                        Session de Révision
                    </h2>
                    <button
                        onClick={onExit}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">
                            Carte {currentIndex + 1} sur {flashcards.length}
                        </span>
                        <span className="text-zinc-400">
                            {sessionStats.correct} ✅ • {sessionStats.incorrect} ❌
                        </span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Flashcard */}
            <FlashcardCard
                flashcard={currentCard}
                onRate={handleRate}
                showControls={true}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Précédent
                </button>

                <span className="text-zinc-500 text-sm">
                    {currentIndex + 1} / {flashcards.length}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === flashcards.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                    Suivant
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
