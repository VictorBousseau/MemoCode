import React from 'react';
import { X, Filter } from 'lucide-react';
import { getTagPath } from '../data/tagHierarchy';

export default function TagFilter({
    selectedTags = [],
    filterMode = 'AND',
    onClearTags,
    onToggleMode
}) {

    if (selectedTags.length === 0) return null;

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-zinc-300">
                        Filtres actifs ({selectedTags.length})
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* AND/OR Toggle */}
                    <button
                        onClick={onToggleMode}
                        className={`
              px-2 py-1 text-xs rounded font-medium transition-colors
              ${filterMode === 'AND'
                                ? 'bg-blue-500 text-white'
                                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                            }
            `}
                        title="Changer le mode de filtrage"
                    >
                        {filterMode}
                    </button>

                    {/* Clear All */}
                    <button
                        onClick={onClearTags}
                        className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                        Tout effacer
                    </button>
                </div>
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2">
                {selectedTags.map(tagId => {
                    const path = getTagPath(tagId);
                    const label = path.join(' › ');

                    return (
                        <div
                            key={tagId}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300"
                        >
                            <span>{label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Help Text */}
            <p className="text-xs text-zinc-500">
                {filterMode === 'AND'
                    ? 'Affiche les snippets qui correspondent à TOUS les tags sélectionnés'
                    : 'Affiche les snippets qui correspondent à AU MOINS UN tag sélectionné'
                }
            </p>
        </div>
    );
}
