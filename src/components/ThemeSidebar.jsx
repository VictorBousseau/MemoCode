import React from 'react';
import { ChevronRight } from 'lucide-react';

export default React.memo(function ThemeSidebar({ activeTheme, activeCategoryId, setActiveCategoryId }) {
    return (
        <div className="w-64 flex-shrink-0 sticky top-8 space-y-6">
            {/* Categories */}
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
    );
});
