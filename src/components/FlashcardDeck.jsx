import React, { useState } from 'react';
import { Play, Trash2, BookOpen, TrendingUp, Filter } from 'lucide-react';
import { useFlashcards } from '../hooks/useFlashcards';
import FlashcardSession from './FlashcardSession';

export default function FlashcardDeck() {
    const {
        flashcards,
        stats,
        removeFlashcard,
        markAsReviewed,
        getByTopic,
        getUnreviewed
    } = useFlashcards();

    const [isSessionActive, setIsSessionActive] = useState(false);
    const [filterTopic, setFilterTopic] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Get unique topics
    const topics = ['all', ...new Set(flashcards.map(c => c.topic))];

    // Filter flashcards
    const filteredCards = flashcards.filter(card => {
        const topicMatch = filterTopic === 'all' || card.topic === filterTopic;
        const statusMatch =
            filterStatus === 'all' ||
            (filterStatus === 'unreviewed' && card.reviewedAt === null) ||
            (filterStatus === 'reviewed' && card.reviewedAt !== null);
        return topicMatch && statusMatch;
    });

    const handleStartSession = () => {
        if (filteredCards.length > 0) {
            setIsSessionActive(true);
        }
    };

    const handleSessionComplete = (sessionStats) => {
        // Mark all cards as reviewed
        sessionStats.reviewed.forEach(({ cardId, wasCorrect }) => {
            markAsReviewed(cardId, wasCorrect);
        });
    };

    if (isSessionActive) {
        return (
            <FlashcardSession
                flashcards={filteredCards}
                onExit={() => setIsSessionActive(false)}
                onComplete={handleSessionComplete}
            />
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Mes Flashcards</h1>
                <p className="text-zinc-400">Révisez vos connaissances avec des cartes mémoire</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="w-6 h-6 text-blue-400" />
                        <span className="text-sm text-zinc-400">Total</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats.totalCards}</div>
                    <div className="text-sm text-zinc-500 mt-1">cartes</div>
                </div>

                <div className="bg-gradient-to-br from-green-600/20 to-green-600/10 border border-green-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        <span className="text-sm text-zinc-400">Révisées</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats.reviewedCards}</div>
                    <div className="text-sm text-zinc-500 mt-1">
                        {stats.totalCards > 0
                            ? `${Math.round((stats.reviewedCards / stats.totalCards) * 100)}%`
                            : '0%'
                        }
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Filter className="w-6 h-6 text-purple-400" />
                        <span className="text-sm text-zinc-400">Taux de réussite</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {stats.correctCount + stats.incorrectCount > 0
                            ? `${Math.round((stats.correctCount / (stats.correctCount + stats.incorrectCount)) * 100)}%`
                            : 'N/A'
                        }
                    </div>
                    <div className="text-sm text-zinc-500 mt-1">
                        {stats.correctCount} ✅ • {stats.incorrectCount} ❌
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm text-zinc-400 mb-2">Topic</label>
                        <select
                            value={filterTopic}
                            onChange={(e) => setFilterTopic(e.target.value)}
                            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500"
                        >
                            {topics.map(topic => (
                                <option key={topic} value={topic}>
                                    {topic === 'all' ? 'Tous les topics' : topic}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm text-zinc-400 mb-2">Statut</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500"
                        >
                            <option value="all">Toutes</option>
                            <option value="unreviewed">Non révisées</option>
                            <option value="reviewed">Révisées</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={handleStartSession}
                            disabled={filteredCards.length === 0}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Play className="w-5 h-5" />
                            Commencer ({filteredCards.length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Flashcard List */}
            {filteredCards.length > 0 ? (
                <div className="grid gap-4">
                    {filteredCards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-blue-500/50 transition-all"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium">
                                            {card.topic}
                                        </span>
                                        <span className="px-2 py-1 bg-zinc-700 text-zinc-400 rounded text-xs">
                                            {card.type}
                                        </span>
                                        {card.reviewedAt && (
                                            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                                                ✅ Révisée
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {card.question}
                                    </h3>
                                    <p className="text-zinc-400 text-sm">
                                        <strong>Réponse :</strong> {card.answer}
                                    </p>
                                    {card.timesReviewed > 0 && (
                                        <div className="mt-2 text-xs text-zinc-500">
                                            Révisée {card.timesReviewed} fois •{' '}
                                            {card.correctCount > 0 && `✅ ${card.correctCount}`}
                                            {card.correctCount > 0 && card.incorrectCount > 0 && ' • '}
                                            {card.incorrectCount > 0 && `❌ ${card.incorrectCount}`}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeFlashcard(card.id)}
                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-5 h-5 text-zinc-500 group-hover:text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <BookOpen className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500 text-lg mb-2">
                        {flashcards.length === 0
                            ? 'Aucune flashcard pour le moment'
                            : 'Aucune flashcard ne correspond aux filtres'
                        }
                    </p>
                    <p className="text-zinc-600 text-sm">
                        {flashcards.length === 0
                            ? 'Ajoutez des questions depuis les quiz pour commencer'
                            : 'Essayez de changer les filtres'
                        }
                    </p>
                </div>
            )}
        </div>
    );
}
