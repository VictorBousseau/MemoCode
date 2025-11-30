import React from 'react';
import { X, Check, Filter } from 'lucide-react';

export default function FilterPanel({ filters, onChange, availableTags, onClose }) {
    const levels = [
        { id: 'beginner', label: 'Débutant' },
        { id: 'intermediate', label: 'Intermédiaire' },
        { id: 'advanced', label: 'Avancé' }
    ];

    const handleLevelToggle = (levelId) => {
        const newLevels = filters.levels.includes(levelId)
            ? filters.levels.filter(l => l !== levelId)
            : [...filters.levels, levelId];
        onChange({ ...filters, levels: newLevels });
    };

    const handleTagToggle = (tag) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag];
        onChange({ ...filters, tags: newTags });
    };

    const handleNotesToggle = () => {
        onChange({ ...filters, hasNotes: !filters.hasNotes });
    };

    return (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 mb-6 animate-in fade-in slide-in-from-top-2 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtres
                </h3>
                <div className="flex items-center gap-2">
                    {(filters.levels.length > 0 || filters.tags.length > 0 || filters.hasNotes) && (
                        <button
                            onClick={() => onChange({ levels: [], tags: [], hasNotes: false })}
                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors mr-2"
                        >
                            Réinitialiser
                        </button>
                    )}
                    {onClose && (
                        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {/* Levels */}
                <div>
                    <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Difficulté</h4>
                    <div className="flex flex-wrap gap-2">
                        {levels.map(level => (
                            <button
                                key={level.id}
                                onClick={() => handleLevelToggle(level.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${filters.levels.includes(level.id)
                                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                    : 'bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300'
                                    }`}
                            >
                                {filters.levels.includes(level.id) && <Check className="w-3 h-3" />}
                                {level.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notes Toggle */}
                <div>
                    <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Personnel</h4>
                    <button
                        onClick={handleNotesToggle}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${filters.hasNotes
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300'
                            }`}
                    >
                        {filters.hasNotes && <Check className="w-3 h-3" />}
                        Avec mes notes
                    </button>
                </div>

                {/* Tags */}
                {availableTags.length > 0 && (
                    <div>
                        <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Tags Populaires</h4>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                            {availableTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagToggle(tag)}
                                    className={`px-2.5 py-1 rounded-md text-xs border transition-all ${filters.tags.includes(tag)
                                        ? 'bg-zinc-700 text-zinc-200 border-zinc-600'
                                        : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-400'
                                        }`}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
