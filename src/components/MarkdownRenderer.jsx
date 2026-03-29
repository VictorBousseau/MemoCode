import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default React.memo(function MarkdownRenderer({ children }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                                background: 'transparent',
                                padding: '1rem',
                                margin: 0,
                                borderRadius: '0.75rem',
                                border: '1px solid rgb(63, 63, 70)'
                            }}
                            codeTagProps={{
                                style: {
                                    background: 'transparent'
                                }
                            }}
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-blue-300" {...props}>
                            {children}
                        </code>
                    );
                },
                table({ children }) {
                    return (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-zinc-700">
                                {children}
                            </table>
                        </div>
                    );
                },
                th({ children }) {
                    return (
                        <th className="border border-zinc-700 bg-zinc-800 px-4 py-2 text-left">
                            {children}
                        </th>
                    );
                },
                td({ children }) {
                    return (
                        <td className="border border-zinc-700 px-4 py-2">
                            {children}
                        </td>
                    );
                },
                blockquote({ children }) {
                    return (
                        <blockquote className="border-l-4 border-blue-500 bg-blue-500/10 pl-4 py-2 my-4 rounded-r-lg">
                            {children}
                        </blockquote>
                    );
                }
            }}
        >
            {children}
        </ReactMarkdown>
    );
});
