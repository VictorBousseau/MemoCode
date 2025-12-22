import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileCode2, BarChart3, Zap, TrendingUp, Database, GitBranch, Table, LayoutGrid, Github, Settings, X, Wand2, Brain, BookMarked, Code2, Lock, GraduationCap, Home } from 'lucide-react';
import DataSettings from './DataSettings';
import { useAuth } from '../context/AuthContext';

const languages = [
    { name: 'Python', icon: FileCode2 },
    { name: 'R', icon: BarChart3 },
    { name: 'SQL', icon: Database },
    { name: 'Git', icon: GitBranch },
    { name: 'PySpark', icon: Zap },
    { name: 'DAX', icon: TrendingUp },
    { name: 'Power Query (M)', icon: Table },
    { name: 'NoSQL', icon: Database },
    { name: 'Exemples', icon: FileCode2 },
];

export default function UnifiedSidebar({ selectedLanguage, onSelectLanguage, onClose }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();
    const isInLearningZone = location.pathname.startsWith('/learn');

    return (
        <aside className="w-64 bg-zinc-900 text-white flex flex-col border-r border-zinc-800 h-full overflow-y-auto">
            <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            MemoCode
                        </h1>
                        <p className="text-xs text-zinc-400 mt-1">Snippets & Learning</p>
                    </div>

                    {/* Close button for mobile */}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors md:hidden"
                            aria-label="Fermer le menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                {/* PUBLIC SECTION */}
                <div>
                    <div className="flex items-center gap-2 px-2 mb-2">
                        <Home className="w-4 h-4 text-zinc-500" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Public
                        </h3>
                    </div>

                    <Link
                        to="/"
                        onClick={() => { onSelectLanguage?.('Overview'); onClose?.(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${(selectedLanguage === 'Overview' && !isInLearningZone)
                            ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                    >
                        <LayoutGrid className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Vue d'ensemble</span>
                    </Link>

                    {onSelectLanguage && (
                        <>
                            <button
                                onClick={() => onSelectLanguage('CodeCreation')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${selectedLanguage === 'CodeCreation'
                                    ? 'bg-purple-600/10 text-purple-400 border border-purple-600/20'
                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                    }`}
                            >
                                <Wand2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Création de code</span>
                            </button>

                            <div className="h-px bg-zinc-800 my-2 mx-2" />

                            {languages.map((lang) => (
                                <button
                                    key={lang.name}
                                    onClick={() => onSelectLanguage(lang.name)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${selectedLanguage === lang.name
                                        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                        }`}
                                >
                                    <lang.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">{lang.name}</span>
                                </button>
                            ))}
                        </>
                    )}
                </div>

                {/* LEARNING ZONE SECTION */}
                <div>
                    <div className="flex items-center gap-2 px-2 mb-2">
                        <GraduationCap className="w-4 h-4 text-zinc-500" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Learning Zone
                        </h3>
                        {!user && (
                            <Lock className="w-3 h-3 text-zinc-600" />
                        )}
                    </div>

                    {/* Learning Zone links - Always visible */}
                    <Link
                        to="/learn/quiz"
                        onClick={onClose}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === '/learn/quiz'
                            ? 'bg-green-600/10 text-green-400 border border-green-600/20'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                    >
                        <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Quiz & Exercices</span>
                        {!user && <Lock className="w-4 h-4 ml-auto text-zinc-600" />}
                    </Link>

                    <Link
                        to="/learn/flashcards"
                        onClick={onClose}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === '/learn/flashcards'
                            ? 'bg-orange-600/10 text-orange-400 border border-orange-600/20'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                    >
                        <BookMarked className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Flashcards</span>
                        {!user && <Lock className="w-4 h-4 ml-auto text-zinc-600" />}
                    </Link>

                    <Link
                        to="/learn/playground"
                        onClick={onClose}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === '/learn/playground'
                            ? 'bg-purple-600/10 text-purple-400 border border-purple-600/20'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                    >
                        <Code2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Playground</span>
                        {!user && <Lock className="w-4 h-4 ml-auto text-zinc-600" />}
                    </Link>
                </div>
            </nav>

            <div className="p-4 border-t border-zinc-800 space-y-4">
                {onSelectLanguage && (
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white group"
                    >
                        <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                        <span className="text-sm font-medium">Gérer les données</span>
                    </button>
                )}

                <a
                    href="https://github.com/VictorBousseau"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group"
                >
                    <div className="p-1.5 rounded-md bg-zinc-950 text-white group-hover:scale-110 transition-transform">
                        <Github className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-zinc-200">Victor Bousseau</p>
                        <p className="text-xs text-zinc-500">@VictorBousseau</p>
                    </div>
                </a>

                <div className="text-xs text-zinc-600 text-center">
                    v2.0.0 • Built with ❤️
                </div>
            </div>

            {onSelectLanguage && (
                <DataSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            )}
        </aside>
    );
}
