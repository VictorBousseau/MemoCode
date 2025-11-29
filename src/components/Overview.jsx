import React from 'react';
import { FileCode2, Database, GitBranch, Zap, TrendingUp, BarChart3, Table, ArrowRight } from 'lucide-react';
import { pythonContent } from '../data/pythonContent';
import { sqlContent } from '../data/sqlContent';
import { gitContent } from '../data/gitContent';
import { pysparkContent } from '../data/pysparkContent';
import { daxContent } from '../data/daxContent';
import { mContent } from '../data/mContent';
import { rContent } from '../data/rContent';

const languages = [
    {
        id: 'Python',
        name: 'Python',
        icon: FileCode2,
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
        description: "Le cœur de la Data Science. Retrouvez l'intégralité des manipulations de données avec Pandas, la visualisation avancée avec Seaborn, et les pipelines de Machine Learning avec Scikit-Learn."
    },
    {
        id: 'SQL',
        name: 'SQL',
        icon: Database,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        description: "Le langage universel des bases de données. Apprenez à extraire, filtrer et agréger vos données, des requêtes simples aux fonctions de fenêtrage complexes."
    },
    {
        id: 'PySpark',
        name: 'PySpark',
        icon: Zap,
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        description: "Passez à l'échelle supérieure. Tout ce qu'il faut pour le Big Data : manipulation de DataFrames distribués, optimisation des calculs et création d'UDFs performantes."
    },
    {
        id: 'Power Query (M)',
        name: 'Power Query (M)',
        icon: Table,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        description: "L'ETL accessible. Des tutoriels pour transformer vos données via l'interface graphique et des guides pour décrypter le langage M sous-jacent."
    },
    {
        id: 'DAX',
        name: 'DAX',
        icon: TrendingUp,
        color: 'text-green-400',
        bg: 'bg-green-400/10',
        description: "La puissance de Power BI. Créez des mesures dynamiques, maîtrisez le contexte de filtre et réalisez des analyses temporelles avancées."
    },
    {
        id: 'R',
        name: 'R',
        icon: BarChart3,
        color: 'text-blue-300',
        bg: 'bg-blue-300/10',
        description: "L'alternative statistique. L'essentiel pour la manipulation de données et l'analyse statistique traditionnelle."
    },
    {
        id: 'Git',
        name: 'Git',
        icon: GitBranch,
        color: 'text-red-400',
        bg: 'bg-red-400/10',
        description: "Gérez vos versions. Les commandes indispensables pour sauvegarder, partager et collaborer sur vos projets de code."
    },
];

export default function Overview({ onNavigate }) {
    return (
        <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">
                    Vue d'ensemble
                </h2>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                    Une bibliothèque complète de snippets et de guides pour accompagner chaque étape de vos projets Data.
                </p>
            </div>

            <div className="space-y-6">
                {languages.map((lang) => (
                    <div
                        key={lang.id}
                        onClick={() => onNavigate(lang.id)}
                        className="group flex items-start gap-6 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
                    >
                        <div className={`p-4 rounded-xl flex-shrink-0 ${lang.bg} ${lang.color} group-hover:scale-110 transition-transform duration-300`}>
                            <lang.icon className="w-8 h-8" />
                        </div>

                        <div className="flex-1 pt-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                    {lang.name}
                                </h3>
                                <ArrowRight className={`w-6 h-6 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300`} />
                            </div>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                {lang.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
