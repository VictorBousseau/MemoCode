import React, { useState, useMemo } from 'react';
import { FileDown, Search, FileText, FolderOpen, GitPullRequest, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { RESOURCES } from '../data/resourcesData';

const BASE = import.meta.env.BASE_URL;

function CodeBlock({ children }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="relative group">
            <pre className="bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-sm text-zinc-300 overflow-x-auto">
                <code>{children}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
        </div>
    );
}

function ContributionGuide() {
    const [open, setOpen] = useState(false);
    return (
        <div className="mt-12 border border-zinc-700 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <GitPullRequest className="w-5 h-5 text-red-400" />
                    <span className="font-semibold text-white">Contribuer une ressource</span>
                </div>
                {open ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
            </button>
            {open && (
                <div className="px-5 py-5 space-y-5 text-sm text-zinc-300 leading-relaxed">
                    <p className="text-zinc-400">
                        Vous souhaitez partager un document ? Suivez ces étapes pour soumettre une Pull Request sur GitHub.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-white mb-2">1. Forker et cloner le repo</h4>
                            <p className="text-zinc-400 mb-2">Sur GitHub, cliquez <strong className="text-zinc-300">Fork</strong> sur le repo MemoCode, puis :</p>
                            <CodeBlock>{`git clone https://github.com/<VOTRE-USERNAME>/MemoCode.git\ncd MemoCode`}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-2">2. Créer une branche</h4>
                            <CodeBlock>{`git checkout -b ajout-ressource-nom-du-document`}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-2">3. Déposer le PDF</h4>
                            <CodeBlock>{`cp /chemin/vers/mon-document.pdf public/resources/`}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-2">4. Ajouter l'entrée dans le registre</h4>
                            <p className="text-zinc-400 mb-2">
                                Ouvrir <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-red-400">src/data/resourcesData.js</code> et ajouter un objet dans le tableau :
                            </p>
                            <CodeBlock>{`{
  id: 'resource-mon-document',
  title: 'Mon Document',
  description: 'Résumé en 2-3 phrases du contenu.',
  fileName: 'mon-document.pdf',
  category: 'Python',
},`}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-2">5. Commit et push</h4>
                            <CodeBlock>{`git add public/resources/mon-document.pdf src/data/resourcesData.js\ngit commit -m "Ajout ressource : Mon Document"\ngit push origin ajout-ressource-nom-du-document`}</CodeBlock>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-2">6. Ouvrir une Pull Request</h4>
                            <p className="text-zinc-400">
                                Sur GitHub → votre fork → <strong className="text-zinc-300">Compare & pull request</strong>. Décrivez brièvement le document ajouté et soumettez la PR. Le mainteneur validera votre contribution.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ResourcesPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Toutes');

    const categories = useMemo(() => {
        const cats = [...new Set(RESOURCES.map(r => r.category))];
        return ['Toutes', ...cats.sort()];
    }, []);

    const filtered = useMemo(() => {
        return RESOURCES.filter(r => {
            const matchSearch = !search
                || r.title.toLowerCase().includes(search.toLowerCase())
                || r.description.toLowerCase().includes(search.toLowerCase());
            const matchCat = selectedCategory === 'Toutes' || r.category === selectedCategory;
            return matchSearch && matchCat;
        });
    }, [search, selectedCategory]);

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <FileDown className="w-8 h-8 text-red-400" />
                    Ressources
                </h2>
                <p className="text-zinc-400 mt-2">
                    Documents et supports téléchargeables au format PDF.
                </p>
            </div>

            {/* Filters */}
            {RESOURCES.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Rechercher un document..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                        />
                    </div>
                    {categories.length > 2 && (
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    )}
                </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                    {filtered.map(resource => (
                        <div
                            key={resource.id}
                            className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5 flex flex-col gap-3 hover:border-red-500/40 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <FileText className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <h3 className="text-lg font-semibold text-white truncate">{resource.title}</h3>
                                    {resource.category && (
                                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-red-500/15 text-red-400 rounded-full">
                                            {resource.category}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed">{resource.description}</p>
                            <a
                                href={`${BASE}resources/${resource.fileName}`}
                                download
                                className="mt-auto inline-flex items-center gap-2 self-start px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <FileDown className="w-4 h-4" />
                                Télécharger
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <FolderOpen className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400 text-lg">
                        {RESOURCES.length === 0
                            ? 'Aucune ressource pour le moment.'
                            : 'Aucun document ne correspond à votre recherche.'}
                    </p>
                </div>
            )}

            {/* Contribution Guide */}
            <ContributionGuide />
        </div>
    );
}
