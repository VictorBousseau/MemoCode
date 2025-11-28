import React, { useState, useEffect } from 'react';
import CodeCard from './CodeCard';
import { ChevronRight, Layers, BarChart, BrainCircuit } from 'lucide-react';

const themeIcons = {
    pandas: Layers,
    visualization: BarChart,
    ml: BrainCircuit
};

export default function LanguageView({ content }) {
    // Default to first theme and its first category
    const [activeThemeId, setActiveThemeId] = useState(content.themes[0].id);
    const [activeCategoryId, setActiveCategoryId] = useState(content.themes[0].categories[0]?.id);

    // Get current theme and category objects
    const activeTheme = content.themes.find(t => t.id === activeThemeId);
    const activeCategory = activeTheme?.categories.find(c => c.id === activeCategoryId);

    // Determine language based on content structure (simple heuristic)
    // If themes have 'sql_basics', it's SQL, otherwise Python
    const language = content.themes.some(t => t.id === 'sql_basics') ? 'sql' : 'python';

    // Reset category when theme changes
    useEffect(() => {
        if (activeTheme && activeTheme.categories.length > 0) {
            setActiveCategoryId(activeTheme.categories[0].id);
        }
    }, [activeThemeId]);

    return (
        <div className="space-y-8">
            {/* Theme Tabs (Top Navigation) */}
            <div className="flex space-x-2 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800 w-fit overflow-x-auto">
                {content.themes.map((theme) => {
                    const Icon = themeIcons[theme.id] || Layers;
                    return (
                        <button
                            key={theme.id}
                            onClick={() => setActiveThemeId(theme.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeThemeId === theme.id
                                ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {theme.title}
                        </button>
                    );
                })}
            </div>

            <div className="flex gap-8 items-start">
                {/* Category Sidebar (Left Navigation) */}
                <div className="w-64 flex-shrink-0 sticky top-8">
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-3">
                            {activeTheme?.title}
                        </h3>
                        {activeTheme?.categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategoryId(category.id)}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group ${activeCategoryId === category.id
                                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                                    }`}
                            >
                                <span className="truncate">{category.title}</span>
                                {activeCategoryId === category.id && (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {activeCategory ? (
                        <>
                            <div className="mb-8 border-b border-zinc-800 pb-6">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {activeCategory.title}
                                </h2>
                                <p className="text-zinc-400">
                                    {activeCategory.description}
                                </p>
                            </div>

                            <div className="grid gap-8">
                                {activeCategory.snippets.map((snippet, index) => {
                                    // Check if we need to render a sub-category header
                                    const showSubHeader = snippet.subCategory && (
                                        index === 0 || activeCategory.snippets[index - 1].subCategory !== snippet.subCategory
                                    );

                                    return (
                                        <React.Fragment key={snippet.id}>
                                            {showSubHeader && (
                                                <h3 className="text-xl font-semibold text-blue-400 mt-4 mb-2 flex items-center gap-2">
                                                    <div className="h-px flex-1 bg-zinc-800 mr-4"></div>
                                                    {snippet.subCategory}
                                                    <div className="h-px flex-1 bg-zinc-800 ml-4"></div>
                                                </h3>
                                            )}
                                            <CodeCard snippet={snippet} language={language} />
                                        </React.Fragment>
                                    );
                                })}
                                {activeCategory.snippets.length === 0 && (
                                    <div className="text-zinc-500 italic">
                                        Aucun snippet pour le moment.
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-zinc-500">Sélectionnez une catégorie.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
