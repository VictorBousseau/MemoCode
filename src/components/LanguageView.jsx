import React, { useState } from 'react';
import CodeCard from './CodeCard';
import { ChevronRight } from 'lucide-react';

export default function LanguageView({ content }) {
    const [activeCategory, setActiveCategory] = useState(content.categories[0].id);

    return (
        <div className="flex gap-8">
            {/* Table of Contents (Sticky Sidebar) */}
            <div className="w-64 flex-shrink-0">
                <div className="sticky top-8 space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 px-3">
                        Sommaire
                    </h3>
                    {content.categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${activeCategory === category.id
                                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                                }`}
                        >
                            <span className="truncate">{category.title}</span>
                            {activeCategory === category.id && (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {content.categories.find(c => c.id === activeCategory)?.title}
                    </h2>
                    <p className="text-zinc-400">
                        {content.categories.find(c => c.id === activeCategory)?.description}
                    </p>
                </div>

                <div className="grid gap-8">
                    {content.categories
                        .find((c) => c.id === activeCategory)
                        ?.snippets.map((snippet) => (
                            <CodeCard key={snippet.id} snippet={snippet} />
                        ))}
                </div>
            </div>
        </div>
    );
}
