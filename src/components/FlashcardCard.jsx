import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

export default function FlashcardCard({ flashcard, onRate, showControls = true }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleRate = (wasCorrect) => {
        if (onRate) {
            onRate(flashcard.id, wasCorrect);
        }
        // Reset flip for next card
        setIsFlipped(false);
    };

    return (
        <div className="perspective-1000 w-full max-w-2xl mx-auto">
            <div
                className={`relative w-full h-96 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
                    }`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front Face - Question */}
                <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500/30 rounded-2xl p-8 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                                Question
                            </span>
                            <span className="text-xs text-zinc-500 uppercase">
                                {flashcard.topic}
                            </span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                            <h2 className="text-2xl font-bold text-white text-center">
                                {flashcard.question}
                            </h2>

                            {/* Display code for code-completion questions */}
                            {flashcard.code && (
                                <div className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                                    <pre className="text-zinc-300 font-mono text-sm whitespace-pre-wrap">
                                        {flashcard.code}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleFlip}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <RotateCw className="w-5 h-5" />
                        Afficher la réponse
                    </button>
                </div>

                {/* Back Face - Answer */}
                <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-500/30 rounded-2xl p-8 flex flex-col justify-between"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                                Réponse
                            </span>
                            <span className="text-xs text-zinc-500 uppercase">
                                {flashcard.topic}
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-green-300 mb-2">
                                    {flashcard.answer}
                                </h3>
                            </div>

                            {flashcard.explanation && (
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                    <p className="text-sm text-zinc-300">
                                        💡 <strong>Explication :</strong> {flashcard.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {showControls ? (
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleRate(false)}
                                className="flex-1 py-4 bg-red-600/20 hover:bg-red-600/30 border-2 border-red-500/30 text-red-300 font-medium rounded-lg transition-colors"
                            >
                                ❌ Je ne sais pas
                            </button>
                            <button
                                onClick={() => handleRate(true)}
                                className="flex-1 py-4 bg-green-600/20 hover:bg-green-600/30 border-2 border-green-500/30 text-green-300 font-medium rounded-lg transition-colors"
                            >
                                ✅ Je sais
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleFlip}
                            className="w-full py-4 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <RotateCw className="w-5 h-5" />
                            Retourner
                        </button>
                    )}
                </div>
            </div>

            {/* Stats */}
            {flashcard.timesReviewed > 0 && (
                <div className="mt-4 text-center text-sm text-zinc-500">
                    Révisée {flashcard.timesReviewed} fois •{' '}
                    {flashcard.correctCount > 0 && (
                        <span className="text-green-400">
                            ✅ {flashcard.correctCount}
                        </span>
                    )}
                    {flashcard.correctCount > 0 && flashcard.incorrectCount > 0 && ' • '}
                    {flashcard.incorrectCount > 0 && (
                        <span className="text-red-400">
                            ❌ {flashcard.incorrectCount}
                        </span>
                    )}
                </div>
            )}

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
}
