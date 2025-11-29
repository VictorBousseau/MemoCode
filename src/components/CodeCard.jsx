import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MermaidDiagram from './MermaidDiagram';

export default function CodeCard({ snippet, language = 'python' }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-zinc-100">{snippet.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1 whitespace-pre-line">{snippet.description}</p>
                </div>
                {snippet.code && (
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                        title="Copy code"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                )}
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
                        remarkPlugins={[remarkGfm]}
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
