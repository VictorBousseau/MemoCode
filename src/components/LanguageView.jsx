import React, { useState, useEffect } from 'react';
import CodeCard from './CodeCard';
import { ChevronRight, Layers, BarChart, BrainCircuit, FileCode, Lightbulb, Settings, Zap, Table, Code, Binary, TrendingUp, Layout, Terminal } from 'lucide-react';

const themeIcons = {
    pandas: Layers,
    visualization: BarChart,
    ml: BrainCircuit,
    python_basics: FileCode,
    python_tips: Lightbulb,
    python_production: Settings,
    polars: Zap,
    skrub: Table,
    snippets_utiles: Code,
    numpy: Binary,
    statsmodels: TrendingUp,
    statsmodels: TrendingUp,
    streamlit: Layout,
    dax_mastery: BarChart,
    power_query_ui: Layout,
    m_language: Code,
    simulation: BrainCircuit,
    optimisation: Zap,
    data_science: BarChart,
    data_science: BarChart,
    python_date: FileCode,
    language_tools: Terminal
};

export default function LanguageView({ content, searchQuery }) {
    // Default to first theme and its first category
    const [activeThemeId, setActiveThemeId] = useState(content.themes[0].id);
    const [activeCategoryId, setActiveCategoryId] = useState(content.themes[0].categories[0]?.id);

    // Get current theme and category objects
    const activeTheme = content.themes.find(t => t.id === activeThemeId);
    const activeCategory = activeTheme?.categories.find(c => c.id === activeCategoryId);

    // Determine language based on content structure (simple heuristic)
    // If themes have 'sql_basics', it's SQL. If 'git_basics', it's Bash. Otherwise Python.
    let language = 'python';
    if (content.themes.some(t => t.id === 'sql_basics')) {
        language = 'sql';
    } else if (content.themes.some(t => t.id === 'git_basics')) {
        language = 'bash';
    } else if (content.themes.some(t => t.id === 'dax_basics' || t.id === 'dax_mastery')) {
        language = 'dax';
    } else if (content.themes.some(t => t.id === 'power_query_ui')) {
        language = 'powerquery';
    } else if (content.themes.some(t => t.id === 'r_basics')) {
        language = 'r';
    }

    // Reset state when content changes (i.e., when language changes)
    useEffect(() => {
        if (content && content.themes.length > 0) {
            setActiveThemeId(content.themes[0].id);
            if (content.themes[0].categories.length > 0) {
                setActiveCategoryId(content.themes[0].categories[0].id);
            }
        }
    }, [content]);

    // Reset category when theme changes
    useEffect(() => {
        if (activeTheme && activeTheme.categories.length > 0) {
            setActiveCategoryId(activeTheme.categories[0].id);
        }
    }, [activeThemeId]);

    // --- Search Logic ---
    const getFilteredSnippets = () => {
        if (!searchQuery) return [];
        const query = searchQuery.toLowerCase();

        // Flatten all snippets from all themes and categories
        return content.themes.flatMap(theme =>
            theme.categories.flatMap(category =>
                category.snippets.filter(snippet =>
                    snippet.title.toLowerCase().includes(query) ||
                    snippet.description.toLowerCase().includes(query) ||
                    (snippet.code && snippet.code.toLowerCase().includes(query)) ||
                    (snippet.markdown && snippet.markdown.toLowerCase().includes(query))
                ).map(snippet => ({
                    ...snippet,
                    themeTitle: theme.title,
                    categoryTitle: category.title
                }))
            )
        );
    };

    const searchResults = getFilteredSnippets();

    if (searchQuery) {
        return (
            <div className="space-y-8">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-zinc-400">
                        Résultats pour "{searchQuery}"
                        <span className="ml-2 text-sm font-normal text-zinc-500">
                            ({searchResults.length} trouvé{searchResults.length > 1 ? 's' : ''})
                        </span>
                    </h2>
                </div>

                {searchResults.length > 0 ? (
                    <div className="grid gap-8">
                        {searchResults.map((snippet) => (
                            <div key={snippet.id} className="relative">
                                <div className="absolute -top-3 left-0 bg-blue-500/10 text-blue-400 text-xs px-2 py-0.5 rounded border border-blue-500/20">
                                    {snippet.themeTitle} &gt; {snippet.categoryTitle}
                                </div>
                                <CodeCard snippet={snippet} language={language} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-zinc-500">
                        <p className="text-lg">Aucun résultat trouvé.</p>
                        <p className="text-sm mt-2">Essayez d'autres mots-clés.</p>
                    </div>
                )}
            </div>
        );
    }

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
                        {activeTheme?.categories?.map((category) => (
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
