import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function CodeCard({ snippet }) {
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
                <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                    title="Copy code"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
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

            <div className="relative group">
                <SyntaxHighlighter
                    language="python"
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
        </div>
    );
}
