import React from 'react';
import { Download, Upload, X } from 'lucide-react';

export default function DataSettings({ isOpen, onClose }) {
    if (!isOpen) return null;

    const handleExport = () => {
        const data = {
            notes: localStorage.getItem('memocode_notes'),
            history: localStorage.getItem('memocode_history'),
            favorites: localStorage.getItem('memocode_favorites')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `memocode_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.notes) localStorage.setItem('memocode_notes', data.notes);
                if (data.history) localStorage.setItem('memocode_history', data.history);
                if (data.favorites) localStorage.setItem('memocode_favorites', data.favorites);
                window.location.reload(); // Reload to reflect changes
            } catch (error) {
                alert('Erreur lors de l\'importation : Fichier invalide');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Gestion des Données</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <h3 className="font-medium text-zinc-200 mb-2 flex items-center gap-2">
                            <Download className="w-4 h-4 text-blue-400" />
                            Sauvegarde
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4">
                            Téléchargez une copie de vos notes, favoris et historique.
                        </p>
                        <button
                            onClick={handleExport}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Exporter les données (JSON)
                        </button>
                    </div>

                    <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <h3 className="font-medium text-zinc-200 mb-2 flex items-center gap-2">
                            <Upload className="w-4 h-4 text-green-400" />
                            Restauration
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4">
                            Importez un fichier de sauvegarde. Attention, cela écrasera les données actuelles.
                        </p>
                        <label className="w-full flex items-center justify-center py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
                            Importer un fichier
                            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
