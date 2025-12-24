import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
    MessageSquarePlus, X, Bug, Lightbulb, HelpCircle,
    Send, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FEEDBACK_TYPES = [
    { id: 'bug', label: 'Signaler un bug', icon: Bug, color: 'red' },
    { id: 'feature', label: 'Suggérer une fonctionnalité', icon: Lightbulb, color: 'yellow' },
    { id: 'question', label: 'Poser une question', icon: HelpCircle, color: 'blue' },
];

export default function FeedbackWidget() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState('bug');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const resetForm = () => {
        setFeedbackType('bug');
        setTitle('');
        setMessage('');
        setEmail(user?.email || '');
        setStatus('idle');
        setErrorMessage('');
    };

    const handleClose = () => {
        setIsOpen(false);
        // Reset form after animation
        setTimeout(resetForm, 300);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !message.trim()) {
            setErrorMessage('Veuillez remplir tous les champs obligatoires.');
            setStatus('error');
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        const templateParams = {
            feedback_type: FEEDBACK_TYPES.find(t => t.id === feedbackType)?.label || feedbackType,
            title: title.trim(),
            message: message.trim(),
            from_email: email || 'Non fourni',
            page_url: window.location.href,
            user_agent: navigator.userAgent,
            date: new Date().toLocaleString('fr-FR', {
                dateStyle: 'full',
                timeStyle: 'short'
            }),
        };

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            // Auto-close after success
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setErrorMessage('Erreur lors de l\'envoi. Veuillez réessayer.');
            setStatus('error');
        }
    };

    const selectedType = FEEDBACK_TYPES.find(t => t.id === feedbackType);

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                title="Envoyer un feedback"
                aria-label="Ouvrir le formulaire de feedback"
            >
                <MessageSquarePlus className="w-5 h-5" />
            </button>

            {/* Modal Overlay & Content */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                            onClick={handleClose}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl z-[101] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <MessageSquarePlus className="w-5 h-5 text-blue-400" />
                                    <h2 className="text-lg font-semibold text-white">Envoyer un feedback</h2>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-8 text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Merci !</h3>
                                    <p className="text-zinc-400">Votre feedback a été envoyé avec succès.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                    {/* Feedback Type Selector */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                                            Type de feedback
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {FEEDBACK_TYPES.map((type) => {
                                                const Icon = type.icon;
                                                const isSelected = feedbackType === type.id;
                                                return (
                                                    <button
                                                        key={type.id}
                                                        type="button"
                                                        onClick={() => setFeedbackType(type.id)}
                                                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all cursor-pointer ${isSelected
                                                            ? `border-${type.color}-500 bg-${type.color}-500/10 text-${type.color}-400`
                                                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800'
                                                            }`}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                        <span className="text-xs text-center">{type.label.split(' ')[0]}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Email (optional) */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-300 mb-1">
                                            Email <span className="text-zinc-500">(optionnel)</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="votre@email.com"
                                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-300 mb-1">
                                            Titre <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Résumé en quelques mots..."
                                            required
                                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-300 mb-1">
                                            Description <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Décrivez votre feedback en détail..."
                                            required
                                            rows={4}
                                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {status === 'error' && errorMessage && (
                                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            {errorMessage}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Envoyer le feedback
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
