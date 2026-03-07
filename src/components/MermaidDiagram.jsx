import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid/dist/mermaid.esm.min.mjs';



export default function MermaidDiagram({ chart }) {
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);
    const containerRef = React.useRef(null);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!chart) return;

            try {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'dark',
                    securityLevel: 'loose',
                    fontFamily: 'sans-serif',
                    flowchart: {
                        useMaxWidth: false,
                        htmlLabels: false
                    }
                });

                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg: rawSvg } = await mermaid.render(id, chart);

                // Set overflow visible right away on the SVG tag
                const modifiedSvg = rawSvg.replace(/<svg/, '<svg style="overflow: visible; max-width: none;"');
                setSvg(modifiedSvg);
                setError(null);
            } catch (err) {
                console.error('Mermaid render error:', err);
                setError(`Erreur: ${err.message || err}`);
            }
        };

        renderDiagram();
    }, [chart]);

    // Robust fix for Mermaid size measurement issues
    useEffect(() => {
        if (svg && containerRef.current) {
            // Wait slightly for DOM injection and fonts
            const timer = setTimeout(() => {
                const svgEl = containerRef.current.querySelector('svg');
                if (svgEl) {
                    try {
                        const bbox = svgEl.getBBox();

                        const paddingX = 40;
                        const paddingY = 40;

                        const newWidth = Math.ceil(bbox.width + paddingX * 2);
                        const newHeight = Math.ceil(bbox.height + paddingY * 2);

                        // Ajuster la viewBox pour englober tous les éléments avec des marges (y compris au-dessus)
                        svgEl.setAttribute('viewBox', `${bbox.x - paddingX} ${bbox.y - paddingY} ${newWidth} ${newHeight}`);

                        // Forcer les dimensions pour que le SVG soit 1:1 avec sa viewBox
                        svgEl.setAttribute('width', newWidth);
                        svgEl.setAttribute('height', newHeight);
                        svgEl.style.minWidth = `${newWidth}px`;
                        svgEl.style.minHeight = `${newHeight}px`;
                        svgEl.style.margin = '0 auto';
                    } catch (e) {
                        // getBBox might throw if display is none, silently ignore
                    }
                }
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [svg]);

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
            ref={containerRef}
            className="my-4 bg-zinc-900/50 rounded-lg border border-zinc-800 p-4"
            style={{ overflowX: 'auto' }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
