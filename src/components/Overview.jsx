import React from 'react';
import { FileCode2, Database, GitBranch, Zap, TrendingUp, BarChart3, Table, ArrowRight, Flame, FileSpreadsheet } from 'lucide-react';
import { pythonContent } from '../data/pythonContent';
import { sqlContent } from '../data/sqlContent';
import { gitContent } from '../data/gitContent';
import { pysparkContent } from '../data/pysparkContent';
import { daxContent } from '../data/daxContent';
import { mContent } from '../data/mContent';
import { rContent } from '../data/rContent';

import { useStats } from '../hooks/useStats';

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
        id: 'NoSQL',
        name: 'NoSQL',
        icon: Database,
        color: 'text-indigo-400',
        bg: 'bg-indigo-400/10',
        description: "Au-delà des tables relationnelles. Découvrez MongoDB pour les documents JSON et Neo4j pour l'analyse de graphes et de relations complexes."
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
    {
        id: 'Exemples',
        name: 'Exemples',
        icon: FileCode2,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        description: "Cas pratiques et projets. De la simulation numérique à l'optimisation avec Gurobi, en passant par des projets Data Science complets."
    },
    {
        id: 'Excel',
        name: 'Excel',
        icon: FileSpreadsheet,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        description: "Maîtrisez le tableur incontournable. Des formules de base aux tableaux croisés dynamiques, en passant par les raccourcis essentiels pour gagner du temps."
    },
];

export default function Overview({ onNavigate }) {
    const { getWeeklyViews, getTopThemes, getStreak } = useStats();
    const weeklyViews = getWeeklyViews();
    const topThemes = getTopThemes();
    const streak = getStreak();

    return (
        <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">
                    Vue d'ensemble
                </h2>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-8">
                    Une bibliothèque complète de snippets et de guides pour accompagner chaque étape de vos projets Data.
                </p>

                {/* Stats Section */}
                {(weeklyViews > 0 || topThemes.length > 0) && (
                    <div className="flex justify-center gap-6 flex-wrap animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl font-bold text-white">{weeklyViews}</div>
                                <div className="text-sm text-zinc-400">Snippets vus cette semaine</div>
                            </div>
                        </div>

                        {topThemes.length > 0 && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 flex items-center gap-4">
                                <div className="p-3 bg-purple-500/10 rounded-lg">
                                    <Zap className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm text-zinc-400 mb-1">Top Thèmes</div>
                                    <div className="flex gap-2">
                                        {topThemes.map((t, i) => (
                                            <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                                                {t.theme}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Streak Badge */}
                        {streak.current > 0 && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 flex items-center gap-4">
                                <div className="p-3 bg-orange-500/10 rounded-lg">
                                    <Flame className="w-6 h-6 text-orange-400" />
                                </div>
                                <div className="text-left">
                                    <div className="text-2xl font-bold text-white flex items-center gap-2">
                                        {streak.current}
                                        {streak.current >= 7 && <span className="text-xl">🔥</span>}
                                    </div>
                                    <div className="text-sm text-zinc-400">Jours d'affilée</div>
                                    {streak.longest > streak.current && (
                                        <div className="text-xs text-zinc-500 mt-1">Record : {streak.longest}</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
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
