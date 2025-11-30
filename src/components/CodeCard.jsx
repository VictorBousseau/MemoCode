import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Star, Pencil } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import MermaidDiagram from './MermaidDiagram';
import DifficultyBadge from './DifficultyBadge';

import { useStats } from '../hooks/useStats';

export default function CodeCard({ snippet, language = 'python', isFavorite = false, onToggleFavorite, onClick, note, onNoteChange, onTagClick, theme, searchQuery, breadcrumb }) {
    const [copied, setCopied] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const { logView } = useStats();

    // Helper for highlighting text
    const highlightText = (text, query) => {
        if (!query || !text) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ?
                <mark key={i} className="bg-yellow-500/30 text-yellow-200 rounded-sm px-0.5">{part}</mark> :
                part
        );
    };

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        logView(snippet.id, theme || 'Unknown'); // Log interaction
        setTimeout(() => setCopied(false), 2000);
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        if (onToggleFavorite) {
            onToggleFavorite();
            if (!isFavorite) logView(snippet.id, theme || 'Unknown'); // Log interaction
        }
    };

    const handleToggleNote = (e) => {
        e.stopPropagation();
        setShowNote(!showNote);
    };

    const handleNoteClick = (e) => {
        e.stopPropagation();
    };

    const handleTagClick = (e, tag) => {
        e.stopPropagation();
        if (onTagClick) onTagClick(tag);
    };

    return (
        <div
            onClick={onClick}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
        >
            {breadcrumb && (
                <div className="bg-blue-500/10 text-blue-400 text-xs px-4 py-2 border-b border-blue-500/20">
                    {breadcrumb}
                </div>
            )}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-lg font-semibold text-zinc-100">
                                {highlightText(snippet.title, searchQuery)}
                            </h3>
                            {snippet.level && <DifficultyBadge level={snippet.level} />}
                            {snippet.tags && snippet.tags.map(tag => (
                                <span
                                    key={tag}
                                    onClick={(e) => handleTagClick(e, tag)}
                                    className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 border border-blue-900/50 hover:bg-blue-900/50 hover:border-blue-400/50 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm text-zinc-400 mt-1 whitespace-pre-line text-left">
                            {highlightText(snippet.description, searchQuery)}
                        </p>

                        {/* Note Display (Preview) */}
                        {note && !showNote && (
                            <div className="mt-3 text-sm text-yellow-500/80 italic flex items-center gap-2">
                                <Pencil className="w-3 h-3" />
                                <span className="truncate max-w-md">{note}</span>
                            </div>
                        )}

                        {/* Note Editor */}
                        {showNote && (
                            <div className="mt-3" onClick={handleNoteClick}>
                                <textarea
                                    value={note || ''}
                                    onChange={(e) => onNoteChange(e.target.value)}
                                    placeholder="Ajouter une note personnelle..."
                                    className="w-full bg-black/30 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500 min-h-[80px]"
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 ml-4 items-start">
                        {onNoteChange && (
                            <button
                                onClick={handleToggleNote}
                                className={`p-2 hover:bg-zinc-800 rounded-lg transition-colors ${note ? 'text-yellow-500' : 'text-zinc-400 hover:text-white'}`}
                                title="Ajouter une note"
                            >
                                <Pencil className={`w-4 h-4 ${note ? 'fill-yellow-500/20' : ''}`} />
                            </button>
                        )}
                        {onToggleFavorite && (
                            <button
                                onClick={handleToggleFavorite}
                                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-yellow-400"
                                title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                            >
                                <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                            </button>
                        )}
                        {snippet.code && (
                            <div className="relative">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                                    title="Copy code"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                                {copied && (
                                    <div className="absolute top-full right-0 mt-1 px-2 py-1 bg-zinc-800 text-white text-xs rounded shadow-lg whitespace-nowrap border border-zinc-700 z-10 animate-in fade-in zoom-in duration-200">
                                        Copié !
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Theoretical Visual Image */}
            {snippet.image && (
                <div className="border-b border-zinc-800 bg-black/20 p-4 flex justify-center">
                    <img
                        src={snippet.image}
                        alt={`Visualisation pour ${snippet.title}`}
                        className="max-h-64 rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                    />
                </div>
            )}

            {snippet.markdown && (
                <div className="p-6 text-zinc-300 overflow-x-auto border-b border-zinc-800 last:border-0">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match && match[1] === 'mermaid' ? (
                                    <MermaidDiagram chart={String(children).replace(/\n$/, '')} />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            strong: ({ node, ...props }) => <span className="font-bold text-white" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-2 my-2" {...props} />,
                            li: ({ node, ...props }) => <li className="text-zinc-300" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
                            h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-white mt-4 mb-2" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-white mt-3 mb-2" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-md font-bold text-white mt-2 mb-1" {...props} />,
                            table: ({ node, ...props }) => <table className="min-w-full divide-y divide-zinc-700 border border-zinc-700 rounded-lg my-4" {...props} />,
                            thead: ({ node, ...props }) => <thead className="bg-zinc-800" {...props} />,
                            tbody: ({ node, ...props }) => <tbody className="divide-y divide-zinc-700 bg-zinc-900/50" {...props} />,
                            tr: ({ node, ...props }) => <tr className="hover:bg-zinc-800/50 transition-colors" {...props} />,
                            th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider border-r border-zinc-700 last:border-r-0" {...props} />,
                            td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-zinc-400 border-r border-zinc-700 last:border-r-0" {...props} />,
                        }}
                    >
                        {snippet.markdown}
                    </ReactMarkdown>
                </div>
            )}

            {snippet.code && (
                <div className="relative group">
                    <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            background: 'transparent',
                            fontSize: '0.9rem',
                        }}
                    >
                        {snippet.code}
                    </SyntaxHighlighter>
                </div>
            )}
        </div>
    );
}
