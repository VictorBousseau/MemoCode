import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    RefreshCw,
    X,
    Save,
    ChevronDown,
    FileQuestion,
    Code,
    CheckCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

// Available categories for questions
const CATEGORIES = [
    'python', 'sql', 'javascript', 'pandas', 'numpy',
    'git', 'pyspark', 'dax', 'power-query', 'nosql', 'r'
];

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const QUESTION_TYPES = ['mcq', 'code-completion', 'true-false'];

/**
 * QuizManagement - Admin component for managing quiz questions
 */
export default function QuizManagement() {
    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [formData, setFormData] = useState({
        category: 'python',
        difficulty: 'easy',
        question: '',
        options: ['', '', '', ''],
        correct_answer: '0',
        explanation: '',
        is_public: true
    });

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('quiz_questions')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) throw error;
            setQuestions(data || []);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (question = null) => {
        if (question) {
            setEditingQuestion(question);
            setFormData({
                category: question.category,
                difficulty: question.difficulty || 'easy',
                question: question.question,
                options: question.options || ['', '', '', ''],
                correct_answer: question.correct_answer,
                explanation: question.explanation || '',
                is_public: question.is_public !== false
            });
        } else {
            setEditingQuestion(null);
            setFormData({
                category: 'python',
                difficulty: 'easy',
                question: '',
                options: ['', '', '', ''],
                correct_answer: '0',
                explanation: '',
                is_public: true
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingQuestion(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const questionData = {
                category: formData.category,
                difficulty: formData.difficulty,
                question: formData.question,
                options: formData.options.filter(o => o.trim() !== ''),
                correct_answer: formData.correct_answer,
                explanation: formData.explanation,
                is_public: formData.is_public,
                created_by: user?.id
            };

            if (editingQuestion) {
                // Update existing
                const { error } = await supabase
                    .from('quiz_questions')
                    .update(questionData)
                    .eq('id', editingQuestion.id);

                if (error) throw error;
            } else {
                // Create new
                const { error } = await supabase
                    .from('quiz_questions')
                    .insert(questionData);

                if (error) throw error;
            }

            closeModal();
            fetchQuestions();
        } catch (error) {
            console.error('Error saving question:', error);
            alert('Erreur lors de la sauvegarde: ' + error.message);
        }
    };

    const deleteQuestion = async (id) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) return;

        try {
            const { error } = await supabase
                .from('quiz_questions')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setQuestions(questions.filter(q => q.id !== id));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const filteredQuestions = questions.filter(q => {
        const matchesSearch = q.question?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getDifficultyBadge = (difficulty) => {
        const classes = {
            easy: 'bg-green-500/20 text-green-400 border-green-500/30',
            medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            hard: 'bg-red-500/20 text-red-400 border-red-500/30',
        };
        return classes[difficulty] || classes.easy;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Gestion des Questions</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nouvelle Question
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une question..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                    <option value="all">Toutes catégories</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <button
                    onClick={fetchQuestions}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
                {loading ? (
                    <div className="text-center py-12 text-zinc-400">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                        Chargement...
                    </div>
                ) : filteredQuestions.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400">
                        <FileQuestion className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Aucune question trouvée</p>
                        <p className="text-sm mt-1">La base de données ne contient pas encore de questions</p>
                    </div>
                ) : (
                    filteredQuestions.map((q) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{q.question}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded">
                                            {q.category}
                                        </span>
                                        <span className={`px-2 py-0.5 text-xs rounded border ${getDifficultyBadge(q.difficulty)}`}>
                                            {q.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openModal(q)}
                                        className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteQuestion(q.id)}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm text-zinc-400">
                <span>Total: {questions.length} questions</span>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">
                                    {editingQuestion ? 'Modifier la question' : 'Nouvelle question'}
                                </h3>
                                <button onClick={closeModal} className="text-zinc-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {/* Category & Difficulty */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">Catégorie</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                                        >
                                            {CATEGORIES.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">Difficulté</label>
                                        <select
                                            value={formData.difficulty}
                                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                                        >
                                            {DIFFICULTIES.map(diff => (
                                                <option key={diff} value={diff}>{diff}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Question */}
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Question</label>
                                    <textarea
                                        value={formData.question}
                                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none resize-none"
                                        placeholder="Entrez la question..."
                                    />
                                </div>

                                {/* Options */}
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Options</label>
                                    <div className="space-y-2">
                                        {formData.options.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="correct"
                                                    checked={formData.correct_answer === String(index)}
                                                    onChange={() => setFormData({ ...formData, correct_answer: String(index) })}
                                                    className="w-4 h-4 text-blue-500"
                                                />
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => {
                                                        const newOptions = [...formData.options];
                                                        newOptions[index] = e.target.value;
                                                        setFormData({ ...formData, options: newOptions });
                                                    }}
                                                    className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                                                    placeholder={`Option ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-2">Sélectionnez la bonne réponse</p>
                                </div>

                                {/* Explanation */}
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Explication (optionnel)</label>
                                    <textarea
                                        value={formData.explanation}
                                        onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                        rows={2}
                                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none resize-none"
                                        placeholder="Explication de la réponse..."
                                    />
                                </div>

                                {/* Public toggle */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="is_public"
                                        checked={formData.is_public}
                                        onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                                        className="w-4 h-4 text-blue-500 rounded"
                                    />
                                    <label htmlFor="is_public" className="text-sm text-zinc-300">
                                        Question publique (visible par tous)
                                    </label>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingQuestion ? 'Enregistrer' : 'Créer'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
