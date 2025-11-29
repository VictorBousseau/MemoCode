import React, { useEffect, useState } from 'react';

export default function MermaidDiagram({ chart }) {
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!chart) return;

            try {
                // Check if mermaid is loaded
                if (!window.mermaid) {
                    throw new Error('Mermaid library not loaded');
                }

                // Initialize if needed (idempotent)
                window.mermaid.initialize({
                    startOnLoad: false,
                    theme: 'dark',
                    securityLevel: 'loose',
                    fontFamily: 'Inter, sans-serif',
                });

                // Generate a unique ID for this render
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                // Render the SVG
                const { svg } = await window.mermaid.render(id, chart);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error('Mermaid render error:', err);
                setError(`Erreur: ${err.message || err}`);
            }
        };

        // Retry a few times if mermaid isn't loaded yet (race condition with script tag)
        const attemptRender = (attempts = 0) => {
            if (window.mermaid) {
                renderDiagram();
            } else if (attempts < 10) {
                setTimeout(() => attemptRender(attempts + 1), 100);
            } else {
                setError('Erreur: La librairie Mermaid ne s\'est pas chargée.');
            }
        };

        attemptRender();
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

    return (
        <div
            className="mermaid my-4 flex justify-center bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
