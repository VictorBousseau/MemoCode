import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users,
    FileQuestion,
    BarChart3,
    Home,
    LogOut,
    ChevronRight,
    Settings,
    Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import UserManagement from './admin/UserManagement';
import QuizManagement from './admin/QuizManagement';

/**
 * AdminDashboard - Main admin panel with navigation
 */
export default function AdminDashboard() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [activeSection, setActiveSection] = useState('overview');
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalQuizSessions: 0,
        totalFlashcards: 0
    });
    const [loading, setLoading] = useState(true);

    // Fetch dashboard stats
    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            // Get total users
            const { count: usersCount } = await supabase
                .from('users')
                .select('*', { count: 'exact', head: true });

            // Get total quiz sessions
            const { count: quizCount } = await supabase
                .from('quiz_sessions')
                .select('*', { count: 'exact', head: true });

            // Get total flashcards
            const { count: flashcardsCount } = await supabase
                .from('user_flashcards')
                .select('*', { count: 'exact', head: true });

            setStats({
                totalUsers: usersCount || 0,
                totalQuizSessions: quizCount || 0,
                totalFlashcards: flashcardsCount || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const menuItems = [
        { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
        { id: 'users', label: 'Utilisateurs', icon: Users },
        { id: 'quizzes', label: 'Questions Quiz', icon: FileQuestion },
    ];

    const handleLogout = () => {
        console.log('🚪 Logout clicked');
        signOut(); // Don't await - instant logout
        navigate('/');
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'users':
                return <UserManagement />;
            case 'quizzes':
                return <QuizManagement />;
            case 'overview':
            default:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Vue d'ensemble</h2>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatsCard
                                title="Utilisateurs"
                                value={stats.totalUsers}
                                icon={Users}
                                color="blue"
                                loading={loading}
                            />
                            <StatsCard
                                title="Quiz Complétés"
                                value={stats.totalQuizSessions}
                                icon={FileQuestion}
                                color="green"
                                loading={loading}
                            />
                            <StatsCard
                                title="Flashcards Créées"
                                value={stats.totalFlashcards}
                                icon={BarChart3}
                                color="purple"
                                loading={loading}
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-white mb-4">Actions rapides</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <QuickAction
                                    title="Gérer les utilisateurs"
                                    description="Voir et modifier les rôles utilisateurs"
                                    onClick={() => setActiveSection('users')}
                                />
                                <QuickAction
                                    title="Gérer les questions"
                                    description="Ajouter ou modifier les questions de quiz"
                                    onClick={() => setActiveSection('quizzes')}
                                />
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex">
            {/* Sidebar */}
            <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white">Admin</h1>
                            <p className="text-xs text-zinc-400">MemoCode</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === item.id
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                            {activeSection === item.id && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-zinc-800 space-y-2">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        <span>Retour au site</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    );
}

// Stats Card Component
function StatsCard({ title, value, icon: Icon, color, loading }) {
    const colorClasses = {
        blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
        green: 'from-green-500/20 to-green-600/10 border-green-500/30',
        purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    };

    const iconColorClasses = {
        blue: 'text-blue-400',
        green: 'text-green-400',
        purple: 'text-purple-400',
    };

    return (
        <div className={`p-6 rounded-xl bg-gradient-to-br ${colorClasses[color]} border`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-zinc-400 mb-1">{title}</p>
                    {loading ? (
                        <div className="h-8 w-16 bg-zinc-700 animate-pulse rounded"></div>
                    ) : (
                        <p className="text-3xl font-bold text-white">{value}</p>
                    )}
                </div>
                <div className={`p-3 rounded-lg bg-zinc-800/50 ${iconColorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}

// Quick Action Component
function QuickAction({ title, description, onClick }) {
    return (
        <button
            onClick={onClick}
            className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-left group"
        >
            <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                {title}
            </h4>
            <p className="text-sm text-zinc-400 mt-1">{description}</p>
        </button>
    );
}
