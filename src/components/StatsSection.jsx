import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    Clock,
    Target,
    Award,
    Layers,
    RefreshCw,
    ChevronDown
} from 'lucide-react';
import { useQuizSync } from '../hooks/useQuizSync';
import { useFlashcards } from '../hooks/useFlashcards';

/**
 * StatsSection - Display user learning statistics on profile page
 */
export default function StatsSection() {
    const { getUserStats, getQuizHistory, loading: quizLoading } = useQuizSync();
    const { flashcards, stats: flashcardStats } = useFlashcards();

    const [quizStats, setQuizStats] = useState(null);
    const [quizHistory, setQuizHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);

        // Reduced timeout from 5s to 3s
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Stats loading timeout')), 3000)
        );

        try {
            // Race between actual fetch and timeout
            const [stats, history] = await Promise.race([
                Promise.all([getUserStats(), getQuizHistory()]),
                timeoutPromise
            ]);

            setQuizStats(stats || {
                totalQuizzes: 0,
                totalQuestions: 0,
                totalCorrect: 0,
                averageScore: 0,
                totalTimeSpent: 0
            });
            setQuizHistory(Array.isArray(history) ? history.slice(0, 10) : []);
        } catch (error) {
            console.error('⚠️ Stats loading error:', error);
            // Set default empty stats on error/timeout
            setQuizStats({
                totalQuizzes: 0,
                totalQuestions: 0,
                totalCorrect: 0,
                averageScore: 0,
                totalTimeSpent: 0
            });
            setQuizHistory([]);
        } finally {
            setLoading(false);
        }
    };

    // Format time in minutes/hours
    const formatTime = (seconds) => {
        if (!seconds) return '0 min';
        if (seconds < 60) return `${seconds} sec`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
        return `${(seconds / 3600).toFixed(1)} h`;
    };

    if (loading) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Mes Statistiques
                </h2>
                <button
                    onClick={loadStats}
                    className="text-zinc-400 hover:text-white transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Target}
                    label="Quiz complétés"
                    value={quizStats?.totalQuizzes || 0}
                    color="blue"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Score moyen"
                    value={`${quizStats?.averageScore || 0}%`}
                    color="green"
                />
                <StatCard
                    icon={Clock}
                    label="Temps d'étude"
                    value={formatTime(quizStats?.totalTimeSpent || 0)}
                    color="purple"
                />
                <StatCard
                    icon={Layers}
                    label="Flashcards"
                    value={flashcards?.length || 0}
                    color="yellow"
                />
            </div>

            {/* Progress Summary */}
            <div className="p-4 bg-zinc-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-zinc-400">Progression globale</span>
                    <span className="text-sm text-white font-medium">
                        {quizStats?.totalCorrect || 0} / {quizStats?.totalQuestions || 0} bonnes réponses
                    </span>
                </div>
                <div className="w-full h-3 bg-zinc-700 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: quizStats?.totalQuestions
                                ? `${(quizStats.totalCorrect / quizStats.totalQuestions * 100)}%`
                                : '0%'
                        }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    />
                </div>
            </div>

            {/* Flashcard Stats */}
            {flashcards && flashcards.length > 0 && (
                <div className="p-4 bg-zinc-800/50 rounded-xl">
                    <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        Flashcards
                    </h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                            <p className="text-2xl font-bold text-white">{flashcardStats?.reviewedCards || 0}</p>
                            <p className="text-xs text-zinc-400">Révisées</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-400">{flashcardStats?.correctCount || 0}</p>
                            <p className="text-xs text-zinc-400">Correctes</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-400">{flashcardStats?.incorrectCount || 0}</p>
                            <p className="text-xs text-zinc-400">À revoir</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Quiz History */}
            {quizHistory.length > 0 && (
                <div>
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="w-full flex items-center justify-between p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors"
                    >
                        <span className="text-sm font-medium text-white">Historique des quiz</span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                    </button>

                    {showHistory && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 space-y-2"
                        >
                            {quizHistory.map((quiz, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg"
                                >
                                    <div>
                                        <p className="text-sm text-white font-medium">
                                            {quiz.quizTitle || quiz.quizId}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            {new Date(quiz.completedAt).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${quiz.percentage >= 80 ? 'text-green-400' :
                                            quiz.percentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                            {quiz.percentage}%
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            {quiz.score}/{quiz.total}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            )}

            {/* Empty State */}
            {(!quizStats || quizStats.totalQuizzes === 0) && flashcards.length === 0 && (
                <div className="text-center py-6 text-zinc-400">
                    <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Pas encore de statistiques</p>
                    <p className="text-xs mt-1">Commencez un quiz pour voir vos progrès !</p>
                </div>
            )}
        </div>
    );
}

// Individual stat card component
function StatCard({ icon: Icon, label, value, color }) {
    const colorClasses = {
        blue: 'text-blue-400 bg-blue-500/10',
        green: 'text-green-400 bg-green-500/10',
        purple: 'text-purple-400 bg-purple-500/10',
        yellow: 'text-yellow-400 bg-yellow-500/10',
    };

    return (
        <div className="p-4 bg-zinc-800/30 rounded-xl text-center">
            <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                <Icon className="w-5 h-5" />
            </div>
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-400">{label}</p>
        </div>
    );
}
