import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Trophy, Target, Clock, BookMarked, Terminal } from 'lucide-react';
import QuizCard from './QuizCard';
import CodePlayground from './CodePlayground';
import { useQuizProgress } from '../hooks/useQuizProgress';
import { useFlashcards } from '../hooks/useFlashcards';

export default function QuizSession({ quizId, onExit }) {
    const {
        quiz,
        currentQuestion,
        currentQuestionIndex,
        showFeedback,
        isCompleted,
        isCurrentQuestionAnswered,
        submitAnswer,
        nextQuestion,
        previousQuestion,
        resetQuiz,
        calculateScore,
        isAnswerCorrect,
        progress,
        answers
    } = useQuizProgress(quizId);

    const [isPlaygroundOpen, setIsPlaygroundOpen] = React.useState(false);
    const { addMultipleFlashcards } = useFlashcards();

    if (!quiz) {
        return (
            <div className="text-center py-16">
                <p className="text-zinc-400">Chargement du quiz...</p>
            </div>
        );
    }

    if (isCompleted) {
        const { score, total, percentage } = calculateScore();

        return (
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Results Header */}
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 text-center">
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Quiz Terminé !
                    </h2>
                    <p className="text-zinc-300 mb-6">{quiz.title}</p>

                    <div className="flex items-center justify-center gap-8 mb-6">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-400 mb-1">
                                {percentage}%
                            </div>
                            <div className="text-sm text-zinc-400">Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-white mb-1">
                                {score}/{total}
                            </div>
                            <div className="text-sm text-zinc-400">Bonnes réponses</div>
                        </div>
                    </div>

                    {/* Performance Message */}
                    <div className="text-lg text-zinc-200">
                        {percentage >= 90 && '🎉 Excellent ! Vous maîtrisez parfaitement le sujet !'}
                        {percentage >= 70 && percentage < 90 && '👍 Très bien ! Quelques révisions et ce sera parfait.'}
                        {percentage >= 50 && percentage < 70 && '📚 Pas mal ! Continuez à vous entraîner.'}
                        {percentage < 50 && '💪 Continuez vos efforts ! La pratique rend parfait.'}
                    </div>
                </div>

                {/* Detailed Results */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Détails des réponses</h3>
                    <div className="space-y-3">
                        {quiz.questions.map((question, index) => {
                            const isCorrect = isAnswerCorrect(question.id);
                            return (
                                <div
                                    key={question.id}
                                    className={`p-4 rounded-lg border-2 ${isCorrect
                                        ? 'border-green-500/30 bg-green-500/10'
                                        : 'border-red-500/30 bg-red-500/10'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'
                                            }`}>
                                            <span className="text-white text-sm font-bold">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-zinc-200 font-medium mb-1">
                                                {question.question}
                                            </p>
                                            <p className="text-sm text-zinc-400">
                                                {question.explanation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4">
                    {/* Add to Flashcards Button - ALL questions */}
                    <button
                        onClick={() => {
                            const allQuestions = quiz.questions.map(q => ({
                                ...q,
                                topic: quiz.tags?.[0] || 'general',
                                difficulty: quiz.difficulty
                            }));
                            addMultipleFlashcards(allQuestions);
                            alert(`${allQuestions.length} question(s) ajoutée(s) aux flashcards !`);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-orange-600/20 hover:bg-orange-600/30 border-2 border-orange-500/30 text-orange-300 font-medium rounded-lg transition-colors"
                    >
                        <BookMarked className="w-5 h-5" />
                        Ajouter toutes les questions aux flashcards ({quiz.questions.length})
                    </button>

                    <div className="flex gap-4">
                        <button
                            onClick={resetQuiz}
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Recommencer
                        </button>
                        <button
                            onClick={onExit}
                            className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Retour aux quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Quiz Header */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{quiz.title}</h2>
                        <p className="text-zinc-400">{quiz.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Schema Button for SQL Quizzes */}
                        {quiz.tags?.includes('sql') && (
                            <button
                                onClick={() => document.getElementById('schema-modal').showModal()}
                                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full transition-colors text-sm text-zinc-300"
                            >
                                <BookMarked className="w-4 h-4" />
                                Voir la base
                            </button>
                        )}

                        {/* Playground / Scratchpad Button */}
                        {['python', 'sql'].includes((quiz.tags?.[0] || '').toLowerCase()) && (
                            <button
                                onClick={() => {
                                    setIsPlaygroundOpen(true);
                                    setTimeout(() => document.getElementById('playground-modal').showModal(), 0);
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full transition-colors text-sm text-green-400"
                            >
                                <Terminal className="w-4 h-4" />
                                Brouillon
                            </button>
                        )}

                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
                            <Target className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">
                                {quiz.difficulty === 'beginner' && 'Débutant'}
                                {quiz.difficulty === 'intermediate' && 'Intermédiaire'}
                                {quiz.difficulty === 'advanced' && 'Avancé'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Schema Modal using native dialog */}
                <dialog id="schema-modal" className="bg-transparent backdrop:bg-black/50 p-0 w-full max-w-4xl m-auto rounded-xl">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Schéma de la base de données</h3>
                            <button
                                onClick={() => document.getElementById('schema-modal').close()}
                                className="text-zinc-400 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        {/* Horizontal Schema Layout (Same as CodePlayground) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                            {/* DEPARTMENTS Table */}
                            <div className="bg-purple-600/10 border-2 border-purple-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-purple-300 mb-3 text-center">🏢 DEPARTMENTS</h4>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-purple-500/30">
                                            <th className="text-left py-1 text-purple-200">Colonne</th>
                                            <th className="text-left py-1 text-purple-200">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-zinc-300">
                                        <tr><td className="py-1">id</td><td className="text-xs text-purple-400">INT PK</td></tr>
                                        <tr><td className="py-1">name</td><td className="text-xs">TEXT</td></tr>
                                        <tr><td className="py-1">location</td><td className="text-xs">TEXT</td></tr>
                                        <tr><td className="py-1">budget</td><td className="text-xs">INT</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* EMPLOYEES Table */}
                            <div className="bg-blue-600/10 border-2 border-blue-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-blue-300 mb-3 text-center">👥 EMPLOYEES</h4>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-blue-500/30">
                                            <th className="text-left py-1 text-blue-200">Colonne</th>
                                            <th className="text-left py-1 text-blue-200">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-zinc-300">
                                        <tr><td className="py-1">id</td><td className="text-xs text-blue-400">INT PK</td></tr>
                                        <tr><td className="py-1">name</td><td className="text-xs">TEXT</td></tr>
                                        <tr><td className="py-1">department_id</td><td className="text-xs text-purple-400">INT FK</td></tr>
                                        <tr><td className="py-1">salary</td><td className="text-xs">INT</td></tr>
                                        <tr><td className="py-1">hire_date</td><td className="text-xs">TEXT</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* SALES Table */}
                            <div className="bg-green-600/10 border-2 border-green-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-green-300 mb-3 text-center">💰 SALES</h4>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-green-500/30">
                                            <th className="text-left py-1 text-green-200">Colonne</th>
                                            <th className="text-left py-1 text-green-200">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-zinc-300">
                                        <tr><td className="py-1">id</td><td className="text-xs text-green-400">INT PK</td></tr>
                                        <tr><td className="py-1">employee_id</td><td className="text-xs text-blue-400">INT FK</td></tr>
                                        <tr><td className="py-1">product</td><td className="text-xs">TEXT</td></tr>
                                        <tr><td className="py-1">amount</td><td className="text-xs">REAL</td></tr>
                                        <tr><td className="py-1">sale_date</td><td className="text-xs">TEXT</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </dialog>

                {/* Playground Modal */}
                <dialog id="playground-modal" className="bg-transparent backdrop:bg-black/80 p-0 w-full h-full max-w-6xl max-h-[90vh] m-auto rounded-xl">
                    <div className="bg-zinc-950 border border-zinc-700 rounded-xl shadow-2xl h-full flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-green-400" />
                                Brouillon / Test Rapide
                            </h3>
                            <button
                                onClick={() => {
                                    document.getElementById('playground-modal').close();
                                    setIsPlaygroundOpen(false);
                                }}
                                className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            {isPlaygroundOpen && (
                                <CodePlayground
                                    initialLanguage={quiz.tags?.includes('sql') ? 'sql' : 'python'}
                                    initialCode=""
                                />
                            )}
                        </div>
                    </div>
                </dialog>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">
                            Question {currentQuestionIndex + 1} sur {quiz.questions.length}
                        </span>
                        <span className="text-zinc-400">
                            {progress.answered} / {progress.total} répondues
                        </span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <QuizCard
                question={currentQuestion}
                onSubmit={(answer) => submitAnswer(currentQuestion.id, answer)}
                userAnswer={answers[currentQuestion.id]?.answer}
                showFeedback={showFeedback}
                isCorrect={isAnswerCorrect(currentQuestion.id)}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Précédent
                </button>

                <button
                    onClick={onExit}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors"
                >
                    Quitter
                </button>

                <button
                    onClick={nextQuestion}
                    disabled={!showFeedback}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                    {currentQuestionIndex === quiz.questions.length - 1 ? 'Terminer' : 'Suivant'}
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
