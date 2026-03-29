import React, { useState, useEffect } from 'react';
import CodeCard from './CodeCard';
import TagHierarchy from './TagHierarchy';
import TagFilter from './TagFilter';
import SnippetSearchResults from './SnippetSearchResults';
import SnippetGrid from './SnippetGrid';
import ThemeSidebar from './ThemeSidebar';
import Breadcrumbs from './Breadcrumbs';
import { ChevronRight, Layers, BarChart, BrainCircuit, FileCode, Lightbulb, Settings, Zap, Table, Code, Binary, TrendingUp, Layout, Terminal, Star, Filter, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useHistory } from '../hooks/useHistory';
import { useNotes } from '../hooks/useNotes';
import { useUserData } from '../hooks/useUserData';
import { useTagFilter } from '../hooks/useTagFilter';
import { countSnippetsByTag } from '../data/tagHierarchy';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

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
    python_basics: Terminal,
    admin_basics: Table,
    data_manipulation: Filter,
    shortcuts: Zap
};

export default function LanguageView({ content, searchQuery, languageName, onNavigate, onSearch }) {
    const { favorites, isFavorite, toggleFavorite } = useFavorites();
    const { history, addToHistory } = useHistory();
    const { getNote, setNote } = useNotes();
    const { getPriority, setPriority, getSortOrder, updateSortOrder } = useUserData();

    const {
        selectedTags, filterMode, expandedNodes,
        toggleTag, clearTags, toggleFilterMode, toggleNode,
        filterSnippets, hasActiveFilters: hasTagFilters
    } = useTagFilter();

    const tagCounts = React.useMemo(() => {
        const allSnippets = content.themes.flatMap(theme =>
            theme.categories.flatMap(category => category.snippets)
        );
        return countSnippetsByTag(allSnippets);
    }, [content]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const FAVORITES_ID = '__favorites__';
    const HISTORY_ID = '__history__';

    const [activeThemeId, setActiveThemeId] = useState(
        favorites.length > 0 ? FAVORITES_ID : (content.themes[0]?.id || null)
    );
    const [activeCategoryId, setActiveCategoryId] = useState(content.themes[0]?.categories[0]?.id);
    const [sortBy, setSortBy] = useState('manual');
    const [selectedSnippetId, setSelectedSnippetId] = useState(null);

    useEffect(() => { setSelectedSnippetId(null); }, [activeCategoryId]);

    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ levels: [], tags: [], hasNotes: false });

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

    const activeTheme = (activeThemeId === FAVORITES_ID || activeThemeId === HISTORY_ID)
        ? null
        : content.themes.find(t => t.id === activeThemeId);
    const activeCategory = activeTheme?.categories.find(c => c.id === activeCategoryId);

    // Sort snippets
    const sortedSnippets = React.useMemo(() => {
        let snippets = [];

        if (hasTagFilters) {
            const allSnippets = content.themes.flatMap(theme =>
                theme.categories.flatMap(category =>
                    category.snippets.map(snippet => ({
                        ...snippet,
                        themeTitle: theme.title,
                        categoryTitle: category.title
                    }))
                )
            );
            snippets = filterSnippets(allSnippets);
        } else {
            if (!activeCategory) return [];
            snippets = [...activeCategory.snippets];
        }

        if (sortBy === 'priority') {
            return snippets.sort((a, b) => {
                const pA = getPriority(a.id);
                const pB = getPriority(b.id);
                if (pA !== pB) return pB - pA;
                return 0;
            });
        }

        if (!hasTagFilters && activeCategory) {
            const savedOrder = getSortOrder(activeCategory.id);
            if (savedOrder) {
                const snippetMap = new Map(snippets.map(s => [s.id, s]));
                const sorted = savedOrder.map(id => snippetMap.get(id)).filter(s => s !== undefined);
                const savedIds = new Set(savedOrder);
                const newSnippets = snippets.filter(s => !savedIds.has(s.id));
                return [...sorted, ...newSnippets];
            }
        }

        return snippets;
    }, [activeCategory, content, getSortOrder, sortBy, getPriority, filterSnippets, hasTagFilters]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = sortedSnippets.findIndex((s) => s.id === active.id);
            const newIndex = sortedSnippets.findIndex((s) => s.id === over.id);
            const newOrder = arrayMove(sortedSnippets, oldIndex, newIndex).map(s => s.id);
            updateSortOrder(activeCategory.id, newOrder);
        }
    };

    // Determine language
    let language = 'python';
    if (content.themes.some(t => t.id === 'sql_basics')) {
        language = 'sql';
    } else if (content.themes.some(t => t.id === 'git_basics')) {
        language = 'bash';
    } else if (content.themes.some(t => t.id === 'dax_basics' || t.id === 'dax_mastery' || t.id === 'dax_essentials')) {
        language = 'dax';
    } else if (content.themes.some(t => t.id === 'power_query_ui')) {
        language = 'powerquery';
    } else if (content.themes.some(t => t.id === 'r_basics')) {
        language = 'r';
    } else if (content.themes.some(t => t.id === 'pyspark_basics')) {
        language = 'pyspark';
    } else if (content.themes.some(t => t.id === 'nosql_concepts')) {
        language = 'nosql';
    } else if (content.themes.some(t => t.id === 'simulation' || t.id === 'optimisation')) {
        language = 'python-examples';
    } else if (content.themes.some(t => t.id === 'admin_basics' || t.id === 'data_manipulation')) {
        language = 'excel';
    }

    useEffect(() => {
        if (content?.themes?.length > 0) {
            setActiveThemeId(content.themes[0].id);
            if (content.themes[0].categories?.length > 0) {
                setActiveCategoryId(content.themes[0].categories[0].id);
            }
        }
    }, [content]);

    useEffect(() => {
        if (activeTheme && activeTheme.categories.length > 0) {
            setActiveCategoryId(activeTheme.categories[0].id);
        }
    }, [activeThemeId]);

    // Search Logic
    const getFilteredSnippets = () => {
        const hasActiveFilters = filters.levels.length > 0 || filters.tags.length > 0 || filters.hasNotes;
        if (!searchQuery && !hasActiveFilters) return [];

        const query = searchQuery ? searchQuery.toLowerCase() : '';
        const tags = query.match(/#[\w\u00C0-\u00FF]+/g) || [];
        const searchTerms = query.replace(/#[\w\u00C0-\u00FF]+/g, '').trim();

        return content.themes.flatMap(theme =>
            theme.categories.flatMap(category => {
                return category.snippets.filter(snippet => {
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
                    if (searchQuery) {
                        const matchesText = searchTerms === '' ||
                            snippet.title.toLowerCase().includes(searchTerms) ||
                            snippet.description.toLowerCase().includes(searchTerms) ||
                            (snippet.code && snippet.code.toLowerCase().includes(searchTerms)) ||
                            (snippet.markdown && snippet.markdown.toLowerCase().includes(searchTerms));
                        if (!matchesText) return false;
                    }
                    if (filters.levels.length > 0 && !filters.levels.includes(snippet.level)) return false;
                    if (filters.tags.length > 0) {
                        const snippetTags = snippet.tags || [];
                        if (!filters.tags.every(tag => snippetTags.includes(tag))) return false;
                    }
                    if (filters.hasNotes && !getNote(snippet.id)) return false;
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
    const handleTagClick = (tag) => { if (onSearch) onSearch(`#${tag}`); };
    const hasActiveFilters = filters.levels.length > 0 || filters.tags.length > 0 || filters.hasNotes;

    // Search/Filter view
    if (searchQuery || hasActiveFilters) {
        return (
            <SnippetSearchResults
                searchResults={searchResults}
                searchQuery={searchQuery}
                filters={filters}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                setFilters={setFilters}
                availableTags={availableTags}
                language={language}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                addToHistory={addToHistory}
                getNote={getNote}
                setNote={setNote}
                getPriority={getPriority}
                setPriority={setPriority}
                handleTagClick={handleTagClick}
            />
        );
    }

    // Normal view
    return (
        <div className="space-y-8">
            {/* Theme Tabs */}
            <div className="flex space-x-2 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800 w-fit overflow-x-auto">
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

                <button
                    onClick={() => setActiveThemeId(HISTORY_ID)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeThemeId === HISTORY_ID
                        ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        }`}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-zinc-400 rounded-full opacity-20 animate-ping" style={{ display: 'none' }}></div>
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
                {/* Category Sidebar */}
                {activeThemeId !== FAVORITES_ID && activeThemeId !== HISTORY_ID && (
                    <ThemeSidebar
                        activeTheme={activeTheme}
                        activeCategoryId={activeCategoryId}
                        setActiveCategoryId={setActiveCategoryId}
                    />
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
                        <>
                            <div className="mb-8 border-b border-zinc-800 pb-6">
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <div className="w-6 h-6 border-2 border-blue-400 rounded-full flex items-center justify-center">
                                        <div className="w-0.5 h-2.5 bg-blue-400 rounded-full -mt-0.5"></div>
                                    </div>
                                    Récemment consultés
                                </h2>
                                <p className="text-zinc-400">Vos 10 derniers snippets consultés.</p>
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
                                            priority={getPriority(item.id)}
                                            onPriorityChange={(level) => setPriority(item.id, level)}
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
                        <>
                            <div className="mb-8 border-b border-zinc-800 pb-6">
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    Mes Favoris
                                </h2>
                                <p className="text-zinc-400">Retrouvez tous vos snippets favoris en un seul endroit.</p>
                            </div>
                            <div className="grid gap-8">
                                {favorites.map((fav, index) => {
                                    let snippet = null;
                                    let themeTitle = '';
                                    let categoryTitle = '';
                                    for (const theme of content.themes) {
                                        for (const category of theme.categories) {
                                            const found = category.snippets.find(s => s.id === fav.id);
                                            if (found) { snippet = found; themeTitle = theme.title; categoryTitle = category.title; break; }
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
                                                priority={getPriority(snippet.id)}
                                                onPriorityChange={(level) => setPriority(snippet.id, level)}
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
                    ) : activeCategory && (!activeCategory.displayMode || activeCategory.displayMode === 'grid') ? (
                        <SnippetGrid
                            sortedSnippets={sortedSnippets}
                            language={language}
                            activeTheme={activeTheme}
                            activeCategory={activeCategory}
                            hasTagFilters={hasTagFilters}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            sensors={sensors}
                            handleDragEnd={handleDragEnd}
                            isFavorite={isFavorite}
                            toggleFavorite={toggleFavorite}
                            addToHistory={addToHistory}
                            getNote={getNote}
                            setNote={setNote}
                            getPriority={getPriority}
                            setPriority={setPriority}
                        />
                    ) : activeCategory && activeCategory.displayMode === 'list' ? (
                        !selectedSnippetId ? (
                            <div className="space-y-6">
                                <div className="mb-8 border-b border-zinc-800 pb-6">
                                    <h2 className="text-2xl font-bold text-white mb-2">{activeCategory.title}</h2>
                                    <p className="text-zinc-400">{activeCategory.description}</p>
                                </div>
                                <div className="grid gap-4">
                                    {sortedSnippets.map((snippet) => (
                                        <button
                                            key={snippet.id}
                                            onClick={() => setSelectedSnippetId(snippet.id)}
                                            className="w-full text-left p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{snippet.title}</h3>
                                                    <p className="text-zinc-400">{snippet.description}</p>
                                                </div>
                                                <ChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <button
                                    onClick={() => setSelectedSnippetId(null)}
                                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group mb-4"
                                >
                                    <div className="p-2 rounded-lg bg-zinc-800/50 group-hover:bg-zinc-800 border border-zinc-700/50 group-hover:border-zinc-700 transition-all">
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                    </div>
                                    <span>Retour au menu</span>
                                </button>
                                {(() => {
                                    const snippet = sortedSnippets.find(s => s.id === selectedSnippetId);
                                    if (!snippet) return null;
                                    return (
                                        <CodeCard
                                            snippet={snippet}
                                            language={snippet.language || language}
                                            isFavorite={isFavorite(snippet.id)}
                                            onToggleFavorite={() => toggleFavorite(snippet)}
                                            onClick={() => addToHistory(snippet, activeTheme.title, activeCategory.title)}
                                            note={getNote(snippet.id)}
                                            onNoteChange={(text) => setNote(snippet.id, text)}
                                            theme={activeTheme.title}
                                            priority={getPriority(snippet.id)}
                                            onPriorityChange={(level) => setPriority(snippet.id, level)}
                                        />
                                    );
                                })()}
                            </div>
                        )
                    ) : (
                        <div className="text-zinc-500">Sélectionnez une catégorie.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
