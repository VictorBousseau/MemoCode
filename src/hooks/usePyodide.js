import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing Pyodide (Python in browser)
 */
export function usePyodide() {
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [output, setOutput] = useState('');
    const [plot, setPlot] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);

    const pyodideRef = useRef(null);
    const stdoutRef = useRef([]);

    // Load Pyodide
    useEffect(() => {
        let mounted = true;

        async function loadPyodide() {
            if (pyodideRef.current) return; // Already loaded

            setIsLoading(true);
            setError(null);

            try {
                // Load Pyodide from CDN
                const pyodide = await window.loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
                });

                // Load basic packages
                await pyodide.loadPackage(['pandas', 'numpy', 'matplotlib', 'micropip']);

                // Install complex packages via micropip
                const micropip = pyodide.pyimport("micropip");
                await micropip.install(['seaborn', 'plotly', 'scikit-learn', 'statsmodels']);

                // Monkey-patch plotly.show to return JSON
                await pyodide.runPythonAsync(`
import plotly.graph_objects as go
import plotly.io as pio
import json
import sys

def custom_show(self, *args, **kwargs):
    # Print a magic string that we can capture in JS
    print("##PLOTLY_JSON_START##")
    print(self.to_json())
    print("##PLOTLY_JSON_END##")

# Patch the method
go.Figure.show = custom_show
                `);


                if (mounted) {
                    pyodideRef.current = pyodide;
                    setIsReady(true);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Failed to load Pyodide:', err);
                if (mounted) {
                    setError('Erreur lors du chargement de Python. Veuillez rafraîchir la page.');
                    setIsLoading(false);
                }
            }
        }

        loadPyodide();

        return () => {
            mounted = false;
        };
    }, []);

    // Run Python code
    const runPython = useCallback(async (code) => {
        if (!pyodideRef.current) {
            setError('Python n\'est pas encore chargé');
            return null;
        }

        setIsExecuting(true);
        setError(null);
        setPlot(null);
        stdoutRef.current = [];

        try {
            const pyodide = pyodideRef.current;

            // Redirect stdout to capture print statements
            await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
            `);

            // Run user code
            const startTime = performance.now();
            const result = await pyodide.runPythonAsync(code);
            const executionTime = ((performance.now() - startTime) / 1000).toFixed(2);

            // Get stdout
            const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');

            // Reset stdout
            await pyodide.runPythonAsync(`
sys.stdout = StringIO()
            `);

            // Format output & Parse Plotly JSON
            let outputText = '';
            let plotData = null;

            if (stdout) {
                const plotStart = stdout.indexOf('##PLOTLY_JSON_START##');
                const plotEnd = stdout.indexOf('##PLOTLY_JSON_END##');

                if (plotStart !== -1 && plotEnd !== -1) {
                    // Extract JSON
                    const jsonString = stdout.substring(plotStart + 21, plotEnd).trim();
                    try {
                        plotData = JSON.parse(jsonString);
                    } catch (e) {
                        console.error("Failed to parse Plotly JSON", e);
                    }

                    // Remove plot data from visible output
                    outputText = stdout.substring(0, plotStart) + stdout.substring(plotEnd + 19);
                } else {
                    outputText = stdout;
                }
            }

            // If there's a result (last expression), show it
            if (result !== undefined && result !== null) {
                // Convert Python objects to string representation
                const resultStr = pyodide.runPython(`
import sys
from io import StringIO
_result = ${JSON.stringify(result)}
if hasattr(_result, 'to_string'):
    str(_result.to_string())
else:
    str(_result)
                `);

                if (resultStr && resultStr !== 'None') {
                    outputText += (outputText ? '\n\n' : '') + resultStr;
                }
            }

            setOutput(outputText || (plotData ? '✅ Graphique généré' : '✅ Code exécuté avec succès (pas de sortie)'));
            setPlot(plotData);
            setIsExecuting(false);

            return {
                success: true,
                output: outputText,
                executionTime,
                result,
                plot: plotData
            };

        } catch (err) {
            console.error('Python execution error:', err);

            // Format error message
            let errorMessage = err.message || 'Erreur inconnue';

            // Clean up error message
            errorMessage = errorMessage
                .replace(/File "<exec>", line (\d+)/, 'Ligne $1')
                .replace(/Traceback \(most recent call last\):/, 'Erreur:');

            setError(errorMessage);
            setOutput('');
            setIsExecuting(false);

            return {
                success: false,
                error: errorMessage
            };
        }
    }, []);

    // Clear output
    const clearOutput = useCallback(() => {
        setOutput('');
        setError(null);
        setPlot(null);
    }, []);

    return {
        isLoading,
        isReady,
        isExecuting,
        error,
        output,
        plot,
        runPython,
        clearOutput
    };
}
