import React, { useState, useEffect } from 'react';
import CodeCard from './CodeCard';
import FilterPanel from './FilterPanel';
import { ChevronRight, Layers, BarChart, BrainCircuit, FileCode, Lightbulb, Settings, Zap, Table, Code, Binary, TrendingUp, Layout, Terminal, Star, Filter } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useHistory } from '../hooks/useHistory';
import { useNotes } from '../hooks/useNotes';

const themeIcons = {
    pandas: Layers,
    visualization: BarChart,
    ml: BrainCircuit,
    python_tips: Lightbulb,
    python_production: Settings,
    polars: Zap,
    skrub: Table,
    snippets_utiles: Code,
    numpy: Binary,
    statsmodels: TrendingUp,
    streamlit: Layout,
    dax_mastery: BarChart,
    power_query_ui: Layout,
    m_language: Code,
    simulation: BrainCircuit,
    optimisation: Zap,
    data_science: BarChart,
    python_date: FileCode,
    python_basics: Terminal
};

import Breadcrumbs from './Breadcrumbs';

export default function LanguageView({ content, searchQuery, languageName, onNavigate, onSearch }) {
    const { favorites, isFavorite, toggleFavorite } = useFavorites();
    const { history, addToHistory } = useHistory();
    const { getNote, setNote } = useNotes();

    // Add favorites and history as special "categories"
    const FAVORITES_ID = '__favorites__';
    const HISTORY_ID = '__history__';

    // Ensure we don't default to FAVORITES_ID if it's empty, unless explicitly selected
    const [activeThemeId, setActiveThemeId] = useState(
        favorites.length > 0 ? FAVORITES_ID : (content.themes[0]?.id || null)
    );
    const [activeCategoryId, setActiveCategoryId] = useState(content.themes[0]?.categories[0]?.id);

    // Filter State
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        levels: [],
        tags: [],
        hasNotes: false
    });

    // Extract all unique tags from content for the filter panel
    const availableTags = React.useMemo(() => {
        const tags = new Set();
        content.themes.forEach(theme => {
            theme.categories.forEach(category => {
                category.snippets.forEach(snippet => {
                    snippet.tags?.forEach(tag => tags.add(tag));
                });
            });
        });
        return Array.from(tags).sort();
    }, [content]);

    // Get current theme and category objects
    const activeTheme = (activeThemeId === FAVORITES_ID || activeThemeId === HISTORY_ID)
        ? null
        : content.themes.find(t => t.id === activeThemeId);
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
        if (content?.themes?.length > 0) {
            setActiveThemeId(content.themes[0].id);
            if (content.themes[0].categories?.length > 0) {
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
        const hasActiveFilters = filters.levels.length > 0 || filters.tags.length > 0 || filters.hasNotes;
        if (!searchQuery && !hasActiveFilters) return [];

        const query = searchQuery ? searchQuery.toLowerCase() : '';

        // Extract tags (e.g. "#pandas", "#sql") - supports accents
        const tags = query.match(/#[\w\u00C0-\u00FF]+/g) || [];
        const searchTerms = query.replace(/#[\w\u00C0-\u00FF]+/g, '').trim();

        // Flatten all snippets from all themes and categories
        return content.themes.flatMap(theme =>
            theme.categories.flatMap(category => {
                return category.snippets.filter(snippet => {
                    // Check if snippet matches ALL tags
                    const matchesTags = tags.length === 0 || tags.every(tag => {
                        const cleanTag = tag.slice(1).toLowerCase();
                        return (
                            theme.id.toLowerCase().includes(cleanTag) ||
                            theme.title.toLowerCase().includes(cleanTag) ||
                            category.id.toLowerCase().includes(cleanTag) ||
                            category.title.toLowerCase().includes(cleanTag) ||
                            (snippet.tags && snippet.tags.some(t => t.toLowerCase().includes(cleanTag)))
                        );
                    });

                    if (!matchesTags) return false;

                    // Filter by text content (only if there's a search query)
                    if (searchQuery) {
                        const matchesText = searchTerms === '' ||
                            snippet.title.toLowerCase().includes(searchTerms) ||
                            snippet.description.toLowerCase().includes(searchTerms) ||
                            (snippet.code && snippet.code.toLowerCase().includes(searchTerms)) ||
                            (snippet.markdown && snippet.markdown.toLowerCase().includes(searchTerms));

                        if (!matchesText) return false;
                    }

                    // Level Filter (OR logic)
                    if (filters.levels.length > 0 && !filters.levels.includes(snippet.level)) {
                        return false;
                    }

                    // Tag Filter (AND logic for selected tags from panel)
                    if (filters.tags.length > 0) {
                        const snippetTags = snippet.tags || [];
                        const hasAllTags = filters.tags.every(tag => snippetTags.includes(tag));
                        if (!hasAllTags) return false;
                    }

                    // Notes Filter
                    if (filters.hasNotes) {
                        const note = getNote(snippet.id);
                        if (!note) return false;
                    }

                    return true;
                }).map(snippet => ({
                    ...snippet,
                    themeTitle: theme.title,
                    categoryTitle: category.title
                }));
            })
        );
    };

    const searchResults = getFilteredSnippets();

    const handleTagClick = (tag) => {
        if (onSearch) {
            onSearch(`#${tag}`);
        }
    };

    // Show search results if query exists OR if filters are active
    const hasActiveFilters = filters.levels.length > 0 || filters.tags.length > 0 || filters.hasNotes;

    if (searchQuery || hasActiveFilters) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-zinc-400">
                        {searchQuery ? `Résultats pour "${searchQuery}"` : 'Résultats filtrés'}
                        <span className="ml-2 text-sm font-normal text-zinc-500">
                            ({searchResults.length} trouvé{searchResults.length > 1 ? 's' : ''})
                        </span>
                    </h2>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${showFilters || (filters.levels.length > 0 || filters.tags.length > 0 || filters.hasNotes)
                            ? 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                            : 'bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        Filtres
                        {(filters.levels.length > 0 || filters.tags.length > 0 || filters.hasNotes) && (
                            <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                {filters.levels.length + filters.tags.length + (filters.hasNotes ? 1 : 0)}
                            </span>
                        )}
                    </button>
                </div>

                {showFilters && (
                    <FilterPanel
                        filters={filters}
                        onChange={setFilters}
                        availableTags={availableTags}
                        onClose={() => setShowFilters(false)}
                    />
                )}

                {searchResults.length > 0 ? (
                    <div className="grid gap-6 mt-10">
                        {searchResults.map((snippet, index) => (
                            <div key={snippet.id} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards" style={{ animationDelay: `${index * 50}ms` }}>
                                <CodeCard
                                    snippet={snippet}
                                    language={snippet.language || language}
                                    isFavorite={isFavorite(snippet.id)}
                                    onToggleFavorite={() => toggleFavorite(snippet)}
                                    onClick={() => addToHistory(snippet, snippet.themeTitle, snippet.categoryTitle)}
                                    note={getNote(snippet.id)}
                                    onNoteChange={(text) => setNote(snippet.id, text)}
                                    onTagClick={handleTagClick}
                                    theme={snippet.themeTitle}
                                    searchQuery={searchQuery}
                                    breadcrumb={`${snippet.contextName ? `${snippet.contextName} > ` : ''}${snippet.themeTitle} > ${snippet.categoryTitle}`}
                                />
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
                {/* Favorites Tab */}
                <button
                    onClick={() => setActiveThemeId(FAVORITES_ID)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeThemeId === FAVORITES_ID
                        ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        }`}
                >
                    <Star className={`w-4 h-4 ${activeThemeId === FAVORITES_ID ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    Favoris {favorites.length > 0 && `(${favorites.length})`}
                </button>

                {/* History Tab */}
                <button
                    onClick={() => setActiveThemeId(HISTORY_ID)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeThemeId === HISTORY_ID
                        ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        }`}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-zinc-400 rounded-full opacity-20 animate-ping" style={{ display: history.length > 0 ? 'none' : 'none' }}></div>
                        <div className={`w-4 h-4 border-2 rounded-full border-current flex items-center justify-center ${activeThemeId === HISTORY_ID ? 'text-blue-400 border-blue-400' : ''}`}>
                            <div className="w-0.5 h-1.5 bg-current rounded-full -mt-0.5"></div>
                        </div>
                    </div>
                    Récents
                </button>

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
                {/* Category Sidebar (Left Navigation) - Hidden for Favorites and History */}
                {activeThemeId !== FAVORITES_ID && activeThemeId !== HISTORY_ID && (
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
                )}

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {!searchQuery && (
                        <Breadcrumbs
                            language={languageName}
                            theme={activeTheme?.title || (activeThemeId === FAVORITES_ID ? 'Favoris' : activeThemeId === HISTORY_ID ? 'Récents' : '')}
                            category={activeCategory?.title}
                            onNavigate={onNavigate}
                        />
                    )}
                    {activeThemeId === HISTORY_ID ? (
                        /* History View */
                        <>
                            <div className="mb-8 border-b border-zinc-800 pb-6">
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 border-2 border-blue-400 rounded-full flex items-center justify-center">
                                        <div className="w-0.5 h-2.5 bg-blue-400 rounded-full -mt-0.5"></div>
                                    </div>
                                    Récemment consultés
                                </h2>
                                <p className="text-zinc-400">
                                    Vos 10 derniers snippets consultés.
                                </p>
                            </div>

                            <div className="grid gap-8">
                                {history.map((item, index) => (
                                    <div key={`${item.id}-${item.timestamp}`} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards" style={{ animationDelay: `${index * 50}ms` }}>
                                        <div className="text-xs text-zinc-500 mb-2 flex items-center gap-2">
                                            <span>{item.themeTitle}</span>
                                            <ChevronRight className="w-3 h-3" />
                                            <span>{item.categoryTitle}</span>
                                            <span className="ml-auto text-zinc-600">
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <CodeCard
                                            snippet={item}
                                            language={item.language || language}
                                            isFavorite={isFavorite(item.id)}
                                            onToggleFavorite={() => toggleFavorite(item)}
                                            onClick={() => addToHistory(item, item.themeTitle, item.categoryTitle)}
                                            note={getNote(item.id)}
                                            onNoteChange={(text) => setNote(item.id, text)}
                                            theme={item.themeTitle}
                                        />
                                    </div>
                                ))}
                                {history.length === 0 && (
                                    <div className="text-center py-16 text-zinc-500">
                                        <p className="text-lg">Aucun historique récent</p>
                                        <p className="text-sm mt-2">Consultez des snippets pour les voir apparaître ici</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : activeThemeId === FAVORITES_ID ? (
                        /* Favorites View */
                        <>
                            <div className="mb-8 border-b border-zinc-800 pb-6">
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    Mes Favoris
                                </h2>
                                <p className="text-zinc-400">
                                    Retrouvez tous vos snippets favoris en un seul endroit.
                                </p>
                            </div>

                            <div className="grid gap-8">
                                {favorites.map((fav, index) => {
                                    // Find the snippet in all themes/categories
                                    let snippet = null;
                                    let themeTitle = '';
                                    let categoryTitle = '';

                                    for (const theme of content.themes) {
                                        for (const category of theme.categories) {
                                            const found = category.snippets.find(s => s.id === fav.id);
                                            if (found) {
                                                snippet = found;
                                                themeTitle = theme.title;
                                                categoryTitle = category.title;
                                                break;
                                            }
                                        }
                                        if (snippet) break;
                                    }

                                    if (!snippet) return null;

                                    return (
                                        <div key={fav.id} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards" style={{ animationDelay: `${index * 50}ms` }}>
                                            <div className="text-xs text-zinc-500 mb-2 flex items-center gap-2">
                                                <span>{themeTitle}</span>
                                                <ChevronRight className="w-3 h-3" />
                                                <span>{categoryTitle}</span>
                                            </div>
                                            <CodeCard
                                                snippet={snippet}
                                                language={snippet.language || language}
                                                isFavorite={true}
                                                onToggleFavorite={() => toggleFavorite(snippet)}
                                                onClick={() => addToHistory(snippet, themeTitle, categoryTitle)}
                                                note={getNote(snippet.id)}
                                                onNoteChange={(text) => setNote(snippet.id, text)}
                                                theme={themeTitle}
                                            />
                                        </div>
                                    );
                                })}
                                {favorites.length === 0 && (
                                    <div className="text-center py-16 text-zinc-500">
                                        <Star className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                        <p className="text-lg">Aucun favori pour le moment</p>
                                        <p className="text-sm mt-2">Cliquez sur l'étoile des snippets pour les ajouter ici</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : activeCategory ? (
                        /* Regular Category View */
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
                                            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards" style={{ animationDelay: `${index * 50}ms` }}>
                                                <CodeCard
                                                    snippet={snippet}
                                                    language={snippet.language || language}
                                                    isFavorite={isFavorite(snippet.id)}
                                                    onToggleFavorite={() => toggleFavorite(snippet)}
                                                    onClick={() => addToHistory(snippet, activeTheme.title, activeCategory.title)}
                                                    note={getNote(snippet.id)}
                                                    onNoteChange={(text) => setNote(snippet.id, text)}
                                                    theme={activeTheme.title}
                                                />
                                            </div>
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
