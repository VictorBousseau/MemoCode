import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import CodeCard from './CodeCard';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="touch-none">
            {children({ ...attributes, ...listeners })}
        </div>
    );
}

export default function SnippetGrid({
    sortedSnippets, language, activeTheme, activeCategory, hasTagFilters,
    sortBy, setSortBy, sensors, handleDragEnd,
    isFavorite, toggleFavorite, addToHistory,
    getNote, setNote, getPriority, setPriority
}) {
    return (
        <>
            <div className="mb-8 border-b border-zinc-800 pb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {activeCategory.title}
                    </h2>
                    <p className="text-zinc-400">
                        {activeCategory.description}
                    </p>
                </div>
                <button
                    onClick={() => setSortBy(prev => prev === 'manual' ? 'priority' : 'manual')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${sortBy === 'priority'
                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        : 'bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300'
                        }`}
                >
                    <Star className={`w-4 h-4 ${sortBy === 'priority' ? 'fill-current' : ''}`} />
                    {sortBy === 'priority' ? 'Tri : Priorité' : 'Tri : Manuel'}
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sortedSnippets.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="grid gap-8">
                        {sortedSnippets.map((snippet, index) => {
                            // Check if we need to render a sub-category header
                            const showSubHeader = snippet.subCategory && (
                                index === 0 || sortedSnippets[index - 1].subCategory !== snippet.subCategory
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
                                    <SortableItem id={snippet.id}>
                                        {(dragHandleProps) => (
                                            <>
                                                {/* Show breadcrumb when filters are active */}
                                                {hasTagFilters && snippet.themeTitle && snippet.categoryTitle && (
                                                    <div className="text-xs text-zinc-500 mb-2 flex items-center gap-2">
                                                        <span>{snippet.themeTitle}</span>
                                                        <ChevronRight className="w-3 h-3" />
                                                        <span>{snippet.categoryTitle}</span>
                                                    </div>
                                                )}
                                                <CodeCard
                                                    snippet={snippet}
                                                    language={snippet.language || language}
                                                    isFavorite={isFavorite(snippet.id)}
                                                    onToggleFavorite={() => toggleFavorite(snippet)}
                                                    onClick={() => addToHistory(snippet, snippet.themeTitle || activeTheme?.title, snippet.categoryTitle || activeCategory?.title)}
                                                    note={getNote(snippet.id)}
                                                    onNoteChange={(text) => setNote(snippet.id, text)}
                                                    theme={snippet.themeTitle || activeTheme?.title}
                                                    priority={getPriority(snippet.id)}
                                                    onPriorityChange={(level) => setPriority(snippet.id, level)}
                                                    dragHandleProps={undefined}
                                                />
                                            </>
                                        )}
                                    </SortableItem>
                                </React.Fragment>
                            );
                        })}
                        {sortedSnippets.length === 0 && (
                            <div className="text-zinc-500 italic">
                                Aucun snippet pour le moment.
                            </div>
                        )}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {/* Optional: Custom overlay */}
                </DragOverlay>
            </DndContext>
        </>
    );
}
