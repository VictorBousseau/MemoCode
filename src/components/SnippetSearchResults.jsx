import React from 'react';
import { Filter } from 'lucide-react';
import CodeCard from './CodeCard';
import FilterPanel from './FilterPanel';

export default function SnippetSearchResults({
    searchResults, searchQuery, filters, showFilters,
    setShowFilters, setFilters, availableTags, language,
    isFavorite, toggleFavorite, addToHistory,
    getNote, setNote, getPriority, setPriority, handleTagClick
}) {
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
                                priority={getPriority(snippet.id)}
                                onPriorityChange={(level) => setPriority(snippet.id, level)}
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
