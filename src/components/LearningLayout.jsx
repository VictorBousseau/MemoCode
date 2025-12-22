import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
    Home, Brain, BookMarked, Code2, LogOut, User,
    GraduationCap, Lock, ChevronLeft
} from 'lucide-react';
import FeedbackWidget from './FeedbackWidget';

/**
 * LearningLayout - Layout component for the Learning Zone pages
 * Includes navigation sidebar and logout functionality
 */
export default function LearningLayout({ children }) {
    const { user, signOut } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const navItems = [
        { path: '/learn/quiz', label: 'Quiz & Exercices', icon: Brain, color: 'green' },
        { path: '/learn/flashcards', label: 'Flashcards', icon: BookMarked, color: 'orange' },
        { path: '/learn/playground', label: 'Playground', icon: Code2, color: 'purple' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <header className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Left - Back to Home & Title */}
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <Home className="w-5 h-5" />
                                <span className="hidden sm:inline">Accueil</span>
                            </Link>
                            <div className="hidden sm:block h-6 w-px bg-zinc-700" />
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-6 h-6 text-blue-400" />
                                <h1 className="text-xl font-bold text-white">Learning Zone</h1>
                            </div>
                        </div>

                        {/* Right - Feedback & User Info & Logout */}
                        <div className="flex items-center gap-3">
                            <FeedbackWidget />
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-700 rounded-lg transition-colors"
                                        title="Mon Profil"
                                    >
                                        <User className="w-4 h-4 text-zinc-400" />
                                        <span className="text-sm text-zinc-300 truncate max-w-[150px]">
                                            {user.email}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Déconnexion</span>
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    <Lock className="w-4 h-4" />
                                    <span>Se connecter</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-zinc-900/50 border-b border-zinc-800">
                <div className="container mx-auto px-4">
                    <div className="flex gap-1 overflow-x-auto py-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${isActive
                                        ? `bg-${item.color}-600/20 text-${item.color}-400 border border-${item.color}-600/30`
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
