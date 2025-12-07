import React, { useState, useEffect } from 'react';
import { Play, Trash2, Loader2, CheckCircle, XCircle, Code2, BookOpen, Database } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { usePyodide } from '../hooks/usePyodide';
import { useSqlJs } from '../hooks/useSqlJs';
import { getPythonExample, getPythonExamplesList } from '../utils/pythonExamples';
import { getSqlExample, getSqlExamplesList } from '../utils/sqlExamples';
import Plot from 'react-plotly.js';

export default function CodePlayground({ initialCode, initialLanguage }) {
    const [language, setLanguage] = useState(initialLanguage || 'python');
    const [code, setCode] = useState(initialCode || (initialLanguage === 'sql' ? getSqlExample('select_all').code : getPythonExample('hello_world').code));
    const [selectedExample, setSelectedExample] = useState(initialCode ? 'custom' : 'hello_world');

    useEffect(() => {
        if (initialCode) {
            setCode(initialCode);
            setSelectedExample('custom');
        }
        if (initialLanguage) {
            setLanguage(initialLanguage);
        }
    }, [initialCode, initialLanguage]);

    const pyodide = usePyodide();
    const sqlJs = useSqlJs();

    // Initialize Mermaid when switching to SQL
    useEffect(() => {
        if (language === 'sql' && window.mermaid && sqlJs.isReady) {
            setTimeout(() => {
                window.mermaid.init(undefined, '.mermaid');
            }, 100);
        }
    }, [language, sqlJs.isReady]);

    const isPython = language === 'python';
    const current = isPython ? pyodide : sqlJs;
    const examples = isPython ? getPythonExamplesList() : getSqlExamplesList();

    const handleRunCode = async () => {
        console.log('Exécution lancée...', { language, code });
        try {
            if (isPython) {
                await pyodide.runPython(code);
            } else {
                await sqlJs.runSQL(code);
            }
            console.log('Exécution terminée');
        } catch (err) {
            console.error('Erreur exécution playground:', err);
        }
    };

    const handleClearCode = () => {
        setCode('');
        current.clearOutput ? current.clearOutput() : current.clearResults();
    };

    const handleLoadExample = (exampleKey) => {
        const example = isPython ? getPythonExample(exampleKey) : getSqlExample(exampleKey);
        setCode(example.code);
        setSelectedExample(exampleKey);
        current.clearOutput ? current.clearOutput() : current.clearResults();
    };

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        const firstExample = newLang === 'python' ? 'hello_world' : 'select_all';
        handleLoadExample(firstExample);
    };

    const output = isPython ? current.output : null;
    const results = isPython ? null : current.results;
    const error = current.error;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                    {isPython ? '🐍' : '🗄️'} {isPython ? 'Python' : 'SQL'} Playground
                </h1>
                <p className="text-zinc-400">
                    Exécutez du code {isPython ? 'Python' : 'SQL'} directement dans votre navigateur
                </p>
            </div>

            {/* Language Selector */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => handleLanguageChange('python')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${isPython
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                >
                    🐍 Python
                </button>
                <button
                    onClick={() => handleLanguageChange('sql')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${!isPython
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                >
                    🗄️ SQL
                </button>
            </div>

            {/* Loading State */}
            {current.isLoading && (
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
                    <Loader2 className="w-8 h-8 text-blue-400 mx-auto mb-3 animate-spin" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                        Chargement de {isPython ? 'Python' : 'SQL'}...
                    </h3>
                </div>
            )}

            {/* Main Content */}
            {current.isReady && (
                <>
                    {/* Database Schema (SQL only) */}
                    {!isPython && (
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Database className="w-5 h-5 text-blue-400" />
                                Schéma de la base de données
                            </h3>

                            {/* Tables Layout - Horizontal */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                                {/* DEPARTMENTS Table */}
                                <div className="bg-purple-600/10 border-2 border-purple-500/30 rounded-lg p-4">
                                    <h4 className="font-bold text-purple-300 mb-3 text-center">🏢 DEPARTMENTS</h4>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-purple-500/30">
                                                <th className="text-left py-1 text-purple-200">Colonne</th>
                                                <th className="text-left py-1 text-purple-200">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-zinc-300">
                                            <tr><td className="py-1">id</td><td className="text-xs text-purple-400">INT PK</td></tr>
                                            <tr><td className="py-1">name</td><td className="text-xs">TEXT</td></tr>
                                            <tr><td className="py-1">location</td><td className="text-xs">TEXT</td></tr>
                                            <tr><td className="py-1">budget</td><td className="text-xs">INT</td></tr>
                                        </tbody>
                                    </table>
                                    <p className="text-xs text-zinc-500 mt-2">4 départements</p>
                                </div>

                                {/* EMPLOYEES Table */}
                                <div className="bg-blue-600/10 border-2 border-blue-500/30 rounded-lg p-4">
                                    <h4 className="font-bold text-blue-300 mb-3 text-center">👥 EMPLOYEES</h4>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-blue-500/30">
                                                <th className="text-left py-1 text-blue-200">Colonne</th>
                                                <th className="text-left py-1 text-blue-200">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-zinc-300">
                                            <tr><td className="py-1">id</td><td className="text-xs text-blue-400">INT PK</td></tr>
                                            <tr><td className="py-1">name</td><td className="text-xs">TEXT</td></tr>
                                            <tr><td className="py-1">department_id</td><td className="text-xs text-purple-400">INT FK</td></tr>
                                            <tr><td className="py-1">salary</td><td className="text-xs">INT</td></tr>
                                            <tr><td className="py-1">hire_date</td><td className="text-xs">TEXT</td></tr>
                                        </tbody>
                                    </table>
                                    <p className="text-xs text-zinc-500 mt-2">8 employés</p>
                                </div>

                                {/* SALES Table */}
                                <div className="bg-green-600/10 border-2 border-green-500/30 rounded-lg p-4">
                                    <h4 className="font-bold text-green-300 mb-3 text-center">💰 SALES</h4>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-green-500/30">
                                                <th className="text-left py-1 text-green-200">Colonne</th>
                                                <th className="text-left py-1 text-green-200">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-zinc-300">
                                            <tr><td className="py-1">id</td><td className="text-xs text-green-400">INT PK</td></tr>
                                            <tr><td className="py-1">employee_id</td><td className="text-xs text-blue-400">INT FK</td></tr>
                                            <tr><td className="py-1">product</td><td className="text-xs">TEXT</td></tr>
                                            <tr><td className="py-1">amount</td><td className="text-xs">REAL</td></tr>
                                            <tr><td className="py-1">sale_date</td><td className="text-xs">TEXT</td></tr>
                                        </tbody>
                                    </table>
                                    <p className="text-xs text-zinc-500 mt-2">10 ventes</p>
                                </div>
                            </div>

                            {/* Relations */}
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                                <h4 className="font-semibold text-zinc-300 mb-2 text-sm">🔗 Relations</h4>
                                <div className="flex flex-wrap gap-3 text-sm">
                                    <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full">
                                        DEPARTMENTS → EMPLOYEES (department_id)
                                    </span>
                                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full">
                                        EMPLOYEES → SALES (employee_id)
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Toolbar */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-5 h-5 text-zinc-400" />
                                <select
                                    value={selectedExample}
                                    onChange={(e) => handleLoadExample(e.target.value)}
                                    className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Charger un exemple...</option>
                                    {examples.map(({ key, title }) => (
                                        <option key={key} value={key}>{title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleClearCode}
                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Effacer
                                </button>
                                <button
                                    onClick={handleRunCode}
                                    disabled={current.isExecuting || !code.trim()}
                                    className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                                >
                                    {current.isExecuting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Exécution...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5" />
                                            Exécuter
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="bg-zinc-800/50 px-4 py-2 border-b border-zinc-700 flex items-center gap-2">
                            {isPython ? <Code2 className="w-4 h-4 text-zinc-400" /> : <Database className="w-4 h-4 text-zinc-400" />}
                            <span className="text-sm text-zinc-400 font-medium">
                                Éditeur {isPython ? 'Python' : 'SQL'}
                            </span>
                        </div>
                        <Editor
                            height="400px"
                            defaultLanguage={isPython ? 'python' : 'sql'}
                            language={isPython ? 'python' : 'sql'}
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                tabSize: isPython ? 4 : 2,
                                wordWrap: 'on'
                            }}
                        />
                    </div>

                    {/* Results Panel */}
                    {(output || results || error || (isPython && pyodide.plot)) && (
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                            <div className={`px-4 py-2 border-b flex items-center gap-2 ${error
                                ? 'bg-red-600/20 border-red-500/30'
                                : 'bg-green-600/20 border-green-500/30'
                                }`}>
                                {error ? (
                                    <>
                                        <XCircle className="w-4 h-4 text-red-400" />
                                        <span className="text-sm text-red-300 font-medium">Erreur</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-green-300 font-medium">Résultat</span>
                                    </>
                                )}
                            </div>
                            <div className="p-6">
                                {isPython && pyodide.plot && (
                                    <div className="mb-6 bg-white rounded-lg p-2 overflow-hidden">
                                        <Plot
                                            data={pyodide.plot.data}
                                            layout={{
                                                ...pyodide.plot.layout,
                                                autosize: true,
                                                width: undefined, // Let it fill container
                                                height: undefined,
                                                margin: { t: 40, r: 20, l: 40, b: 40 }
                                            }}
                                            useResizeHandler={true}
                                            style={{ width: '100%', height: '500px' }}
                                            config={{ responsive: true, displayModeBar: true }}
                                        />
                                    </div>
                                )}

                                {error ? (
                                    <pre className="text-red-300 font-mono text-sm whitespace-pre-wrap">{error}</pre>
                                ) : isPython ? (
                                    <pre className="text-zinc-200 font-mono text-sm whitespace-pre-wrap">{output}</pre>
                                ) : results?.type === 'data' ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-zinc-700">
                                                    {results.data[0]?.columns.map((col, i) => (
                                                        <th key={i} className="px-4 py-2 text-left text-zinc-300 font-semibold">{col}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results.data[0]?.values.map((row, i) => (
                                                    <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                                        {row.map((cell, j) => (
                                                            <td key={j} className="px-4 py-2 text-zinc-200">{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-xs text-zinc-500 mt-3">
                                            {results.rowCount} ligne(s) • {results.executionTime}s
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-zinc-300">{results?.message}</p>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
