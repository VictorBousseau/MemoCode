import React, { useState } from 'react';
import { Play, Clock, Target, ChevronRight, BookMarked } from 'lucide-react';
import { getAllQuizzes, getAllQuestionsFromBank } from '../data/quizData';
import { useFlashcards } from '../hooks/useFlashcards';
import QuizSession from './QuizSession';

export default function QuizList() {
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [filterDifficulty, setFilterDifficulty] = useState('all');
    const { addMultipleFlashcards } = useFlashcards();

    const allQuizzes = getAllQuizzes();

    const filteredQuizzes = filterDifficulty === 'all'
        ? allQuizzes
        : allQuizzes.filter(q => q.difficulty === filterDifficulty);

    if (selectedQuizId) {
        return <QuizSession quizId={selectedQuizId} onExit={() => setSelectedQuizId(null)} />;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Quiz & Exercices</h1>
                <p className="text-zinc-400">Testez vos connaissances et progressez</p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 justify-center">
                {[
                    { value: 'all', label: 'Tous' },
                    { value: 'beginner', label: 'Débutant' },
                    { value: 'intermediate', label: 'Intermédiaire' },
                    { value: 'advanced', label: 'Avancé' }
                ].map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setFilterDifficulty(value)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterDifficulty === value
                            ? 'bg-blue-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Quiz Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredQuizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                    {quiz.title}
                                </h3>
                                <p className="text-sm text-zinc-400">{quiz.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4 text-sm text-zinc-500">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{quiz.estimatedTime} min</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Target className="w-4 h-4" />
                                <span>{quiz.questionCount || quiz.questions?.length || 0} questions</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${quiz.difficulty === 'beginner'
                                ? 'bg-green-500/20 text-green-400'
                                : quiz.difficulty === 'intermediate'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}>
                                {quiz.difficulty === 'beginner' && 'Débutant'}
                                {quiz.difficulty === 'intermediate' && 'Intermédiaire'}
                                {quiz.difficulty === 'advanced' && 'Avancé'}
                            </span>
                            {quiz.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedQuizId(quiz.id)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                            >
                                <Play className="w-5 h-5" />
                                Commencer
                            </button>
                            <button
                                onClick={() => {
                                    // Get ALL questions from the question bank (not just 5 random)
                                    if (quiz.questionBank) {
                                        const allQuestions = getAllQuestionsFromBank(quiz.questionBank);
                                        if (allQuestions.length > 0) {
                                            const questionsWithMeta = allQuestions.map(q => ({
                                                ...q,
                                                topic: quiz.tags?.[0] || 'general',
                                                difficulty: quiz.difficulty
                                            }));
                                            addMultipleFlashcards(questionsWithMeta);
                                            alert(`${allQuestions.length} flashcards créées depuis "${quiz.title}" !`);
                                        }
                                    }
                                }}
                                className="px-4 py-3 bg-orange-600/20 hover:bg-orange-600/30 border-2 border-orange-500/30 text-orange-300 font-medium rounded-lg transition-colors"
                                title="Créer des flashcards"
                            >
                                <BookMarked className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredQuizzes.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-zinc-500">Aucun quiz disponible pour ce niveau</p>
                </div>
            )}
        </div>
    );
}
