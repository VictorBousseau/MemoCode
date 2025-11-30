import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ language, theme, category, onNavigate }) {
    if (!language && !theme) return null;

    return (
        <nav className="flex items-center text-sm text-zinc-400 mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
            <button
                onClick={() => onNavigate('Overview')}
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
                <Home className="w-4 h-4" />
                <span className="sr-only">Accueil</span>
            </button>

            {language && (
                <>
                    <ChevronRight className="w-4 h-4 mx-2 text-zinc-600" />
                    <span className="font-medium text-zinc-200">{language}</span>
                </>
            )}

            {theme && (
                <>
                    <ChevronRight className="w-4 h-4 mx-2 text-zinc-600" />
                    <span className="text-zinc-300">{theme}</span>
                </>
            )}

            {category && (
                <>
                    <ChevronRight className="w-4 h-4 mx-2 text-zinc-600" />
                    <span className="text-blue-400 font-medium bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {category}
                    </span>
                </>
            )}
        </nav>
    );
}
