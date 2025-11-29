import React from 'react';
import { FileCode2, BarChart3, Zap, TrendingUp, Database, GitBranch, Table, LayoutGrid, Github } from 'lucide-react';

const languages = [
    { name: 'Python', icon: FileCode2 },
    { name: 'R', icon: BarChart3 },
    { name: 'SQL', icon: Database },
    { name: 'Git', icon: GitBranch },
    { name: 'PySpark', icon: Zap },
    { name: 'DAX', icon: TrendingUp },
    { name: 'Power Query (M)', icon: Table },
    { name: 'Exemples', icon: FileCode2 },
];

export default function Sidebar({ selectedLanguage, onSelectLanguage }) {
    return (
        <aside className="w-64 bg-zinc-900 text-white flex flex-col border-r border-zinc-800 h-screen sticky top-0">
            <div className="p-6 border-b border-zinc-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    MemoCode
                </h1>
                <p className="text-xs text-zinc-400 mt-1">Snippets Data Science</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => onSelectLanguage('Overview')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${selectedLanguage === 'Overview'
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                        }`}
                >
                    <LayoutGrid className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Vue d'ensemble</span>
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
            </nav>
            <div className="p-4 border-t border-zinc-800 space-y-4">
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
                    v1.0.0 • Built with ❤️
                </div>
            </div>
        </aside>
    );
}
