import React from 'react';
import Sidebar from './Sidebar';
import { Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Layout({ children, selectedLanguage, onSelectLanguage, searchQuery, setSearchQuery }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30 overflow-hidden">
            <Sidebar selectedLanguage={selectedLanguage} onSelectLanguage={onSelectLanguage} />
            <main className="flex-1 overflow-y-auto h-full">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                        <h1 className="text-4xl font-bold text-white">
                            {selectedLanguage}
                        </h1>

                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                                title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            {/* Search Bar */}
                            <div className="relative w-96">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-zinc-500" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg leading-5 bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-950 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                                    placeholder={`Rechercher dans ${selectedLanguage}...`}
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
