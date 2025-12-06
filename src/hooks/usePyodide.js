import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing Pyodide (Python in browser)
 */
export function usePyodide() {
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [output, setOutput] = useState('');
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

                // Load pandas
                await pyodide.loadPackage(['pandas', 'numpy']);

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

            // Format output
            let outputText = '';

            if (stdout) {
                outputText += stdout;
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

            setOutput(outputText || '✅ Code exécuté avec succès (pas de sortie)');
            setIsExecuting(false);

            return {
                success: true,
                output: outputText,
                executionTime,
                result
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
    }, []);

    return {
        isLoading,
        isReady,
        isExecuting,
        error,
        output,
        runPython,
        clearOutput
    };
}
