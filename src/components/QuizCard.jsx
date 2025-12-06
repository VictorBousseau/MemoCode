import React, { useState } from 'react';
import { Check, X, Lightbulb } from 'lucide-react';

export default function QuizCard({
    question,
    onSubmit,
    userAnswer,
    showFeedback,
    isCorrect
}) {
    const [answer, setAnswer] = useState(userAnswer || '');
    const [showHint, setShowHint] = useState(false);

    const handleSubmit = () => {
        if (answer !== '') {
            onSubmit(answer);
        }
    };

    const renderMCQ = () => (
        <div className="space-y-3">
            {question.options.map((option, index) => {
                const isSelected = answer === index;
                const isCorrectOption = index === question.correctAnswer;
                const showCorrect = showFeedback && isCorrectOption;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                    <button
                        key={index}
                        onClick={() => !showFeedback && setAnswer(index)}
                        disabled={showFeedback}
                        className={`
                            w-full text-left p-4 rounded-lg border-2 transition-all
                            ${isSelected && !showFeedback ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700'}
                            ${showCorrect ? 'border-green-500 bg-green-500/10' : ''}
                            ${showIncorrect ? 'border-red-500 bg-red-500/10' : ''}
                            ${!showFeedback ? 'hover:border-blue-400 hover:bg-zinc-800/50 cursor-pointer' : 'cursor-default'}
                            disabled:opacity-60
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-200">{option}</span>
                            {showCorrect && <Check className="w-5 h-5 text-green-400" />}
                            {showIncorrect && <X className="w-5 h-5 text-red-400" />}
                        </div>
                    </button>
                );
            })}
        </div>
    );

    const renderCodeCompletion = () => (
        <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                <pre className="text-zinc-300 whitespace-pre-wrap">
                    {question.code}
                </pre>
            </div>
            <input
                type="text"
                value={answer}
                onChange={(e) => !showFeedback && setAnswer(e.target.value)}
                disabled={showFeedback}
                placeholder="Votre réponse..."
                className={`
                    w-full px-4 py-3 bg-zinc-900 border-2 rounded-lg text-zinc-200
                    focus:outline-none focus:border-blue-500 transition-colors
                    ${showFeedback && isCorrect ? 'border-green-500' : ''}
                    ${showFeedback && !isCorrect ? 'border-red-500' : 'border-zinc-700'}
                    disabled:opacity-60 disabled:cursor-not-allowed
                `}
            />
        </div>
    );

    const renderTrueFalse = () => (
        <div className="space-y-3">
            {[
                { value: true, label: 'Vrai' },
                { value: false, label: 'Faux' }
            ].map(({ value, label }) => {
                const isSelected = answer === value;
                const isCorrectOption = value === question.correctAnswer;
                const showCorrect = showFeedback && isCorrectOption;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                    <button
                        key={label}
                        onClick={() => !showFeedback && setAnswer(value)}
                        disabled={showFeedback}
                        className={`
                            w-full text-left p-4 rounded-lg border-2 transition-all
                            ${isSelected && !showFeedback ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700'}
                            ${showCorrect ? 'border-green-500 bg-green-500/10' : ''}
                            ${showIncorrect ? 'border-red-500 bg-red-500/10' : ''}
                            ${!showFeedback ? 'hover:border-blue-400 hover:bg-zinc-800/50 cursor-pointer' : 'cursor-default'}
                            disabled:opacity-60
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-200 font-medium">{label}</span>
                            {showCorrect && <Check className="w-5 h-5 text-green-400" />}
                            {showIncorrect && <X className="w-5 h-5 text-red-400" />}
                        </div>
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6">
            {/* Question */}
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    {question.question}
                </h3>
                {question.statement && (
                    <p className="text-zinc-300 italic">
                        "{question.statement}"
                    </p>
                )}
            </div>

            {/* Answer Input */}
            {question.type === 'mcq' && question.options && renderMCQ()}
            {question.type === 'code-completion' && renderCodeCompletion()}
            {question.type === 'true-false' && renderTrueFalse()}

            {/* Fallback for unknown/invalid types */}
            {!['mcq', 'code-completion', 'true-false'].includes(question.type) && (
                <div className="text-red-400 p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                    Erreur: Type de question inconnu ou malformé ({question.type})
                </div>
            )}
            {question.type === 'mcq' && !question.options && (
                <div className="text-red-400 p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                    Erreur: Options manquantes pour ce QCM
                </div>
            )}

            {/* Hints */}
            {question.hints && question.hints.length > 0 && !showFeedback && (
                <div>
                    <button
                        onClick={() => setShowHint(!showHint)}
                        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                        <Lightbulb className="w-4 h-4" />
                        <span className="text-sm">{showHint ? 'Masquer l\'indice' : 'Afficher un indice'}</span>
                    </button>
                    {showHint && (
                        <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <p className="text-sm text-yellow-200">
                                💡 {question.hints[0]}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Feedback */}
            {showFeedback && (
                <div className={`p-4 rounded-lg border-2 ${isCorrect
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                    }`}>
                    <div className="flex items-start gap-3">
                        {isCorrect ? (
                            <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                            <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                            <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-300' : 'text-red-300'
                                }`}>
                                {isCorrect ? 'Correct !' : 'Incorrect'}
                            </p>
                            <p className="text-sm text-zinc-300">
                                {question.explanation}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            {!showFeedback && (
                <button
                    onClick={handleSubmit}
                    disabled={answer === ''}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                    Valider
                </button>
            )}
        </div>
    );
}
