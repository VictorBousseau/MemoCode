import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import UnifiedSidebar from './UnifiedSidebar';
import { Search, Menu, X, User, LogOut, GraduationCap } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { useIsMobile } from '../hooks/useMediaQuery';
import { drawer, modalBackdrop } from '../utils/animations';
import { useAuth } from '../context/AuthContext';
import FeedbackWidget from './FeedbackWidget';

export default function Layout({ children, selectedLanguage, onSelectLanguage, searchQuery, setSearchQuery }) {
    const searchInputRef = React.useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMobile = useIsMobile();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
            // Close sidebar on Escape
            if (e.key === 'Escape' && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSidebarOpen]);

    // Close sidebar when changing language on mobile
    const handleSelectLanguage = (lang) => {
        onSelectLanguage(lang);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30 overflow-hidden">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && isSidebarOpen && (
                    <motion.div
                        variants={modalBackdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Drawer on mobile, fixed on desktop */}
            <AnimatePresence>
                {(!isMobile || isSidebarOpen) && (
                    <motion.div
                        variants={isMobile ? drawer : undefined}
                        initial={isMobile ? "closed" : undefined}
                        animate={isMobile ? "open" : undefined}
                        exit={isMobile ? "closed" : undefined}
                        className={`
                            ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
                            h-full
                        `}
                    >
                        <UnifiedSidebar
                            selectedLanguage={selectedLanguage}
                            onSelectLanguage={handleSelectLanguage}
                            onClose={isMobile ? () => setIsSidebarOpen(false) : undefined}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-full">
                <div className="p-4 sm:p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-12 border-b border-zinc-800 pb-3 sm:pb-4">
                        <div className="flex items-center gap-3">
                            {/* Mobile Menu Button */}
                            {isMobile && (
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                                    aria-label="Ouvrir le menu"
                                >
                                    <Menu className="w-6 h-6" />
                                </button>
                            )}

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                                {selectedLanguage}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Auth Buttons */}
                            {user ? (
                                // Logged in - Show Profile + Logout
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/profile"
                                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                                    >
                                        <User className="w-4 h-4" />
                                        Mon Profil
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors text-sm cursor-pointer"
                                        title="Se déconnecter"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        {!isMobile && <span>Logout</span>}
                                    </button>
                                </div>
                            ) : (
                                // Not logged in - Show Sign In + Sign Up
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/login"
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-sm"
                                    >
                                        <User className="w-4 h-4" />
                                        {!isMobile && <span>Sign In</span>}
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}

                            {/* Feedback Widget */}
                            <FeedbackWidget />

                            {/* Theme Selector */}
                            <ThemeSelector />

                            {/* Search Bar */}
                            <div className="relative w-48 sm:w-64 md:w-96">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500" />
                                </div>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    className="block w-full pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2 border border-zinc-800 rounded-lg leading-5 bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-950 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm transition-colors duration-200"
                                    placeholder={isMobile ? 'Rechercher...' : `Rechercher dans ${selectedLanguage}... (Ctrl+K)`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {children}
                </div>
            </main>
        </div>
    );
}
