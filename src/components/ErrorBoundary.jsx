import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught:', error, info);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-white mb-2">
                        Quelque chose s'est mal passé
                    </h2>
                    <p className="text-zinc-400 mb-6 max-w-md">
                        Une erreur inattendue s'est produite. Vos données sont sauvegardées.
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                    >
                        Réessayer
                    </button>
                    {import.meta.env.DEV && (
                        <details className="mt-6 text-left max-w-2xl w-full">
                            <summary className="text-zinc-500 cursor-pointer text-sm">
                                Détails de l'erreur (dev only)
                            </summary>
                            <pre className="mt-2 p-4 bg-zinc-900 rounded-lg text-xs text-red-400 overflow-auto">
                                {this.state.error?.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}
