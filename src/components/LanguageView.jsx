import React, { useState } from 'react';
import CodeCard from './CodeCard';

export default function LanguageView({ content }) {
    const [activeTab, setActiveTab] = useState(content.categories[0].id);

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex space-x-1 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 w-fit">
                {content.categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === category.id
                                ? 'bg-zinc-800 text-white shadow-sm'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                            }`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="grid gap-6">
                {content.categories
                    .find((c) => c.id === activeTab)
                    ?.snippets.map((snippet) => (
                        <CodeCard key={snippet.id} snippet={snippet} />
                    ))}
            </div>
        </div>
    );
}
