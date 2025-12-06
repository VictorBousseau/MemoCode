import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid/dist/mermaid.esm.min.mjs';

export default function MermaidDiagram({ chart }) {
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!chart) return;

            try {
                // Initialize
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'dark',
                    securityLevel: 'loose',
                    fontFamily: 'Inter, sans-serif',
                });

                // Generate a unique ID for this render
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                // Render the SVG
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error('Mermaid render error:', err);
                setError(`Erreur: ${err.message || err}`);
            }
        };

        renderDiagram();
    }, [chart]);

    if (error) {
        return (
            <div className="text-red-400 text-sm p-4 border border-red-500/20 rounded bg-red-500/10 font-mono whitespace-pre-wrap">
                <p className="font-bold mb-2">Erreur de rendu du diagramme :</p>
                {error}
                <details className="mt-2 text-xs text-zinc-500">
                    <summary>Code source du graphique</summary>
                    <pre className="mt-1">{chart}</pre>
                </details>
            </div>
        );
    }

    // Use inline styles to ensure they're not overridden and the diagram displays properly
    return (
        <div
            className="my-4 bg-zinc-900/50 rounded-lg border border-zinc-800"
            style={{ overflowX: 'auto' }}
        >
            <div
                className="p-4"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minWidth: 'max-content'
                }}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    );
}
