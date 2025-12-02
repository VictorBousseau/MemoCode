import React, { useState, useEffect } from 'react';
import { Copy, Check, Wand2, BarChart3, Database, AlertTriangle } from 'lucide-react';

export default function CodeGenerator() {
    const [mode, setMode] = useState('data'); // 'data' or 'viz'
    const [language, setLanguage] = useState('Python');
    const [action, setAction] = useState('merge');
    const [vizAction, setVizAction] = useState('histogram');
    const [generatedCode, setGeneratedCode] = useState('');
    const [copied, setCopied] = useState(false);

    // --- Form States (Data) ---
    const [mergeData, setMergeData] = useState({ leftTable: 'df_left', rightTable: 'df_right', joinType: 'left', leftOn: 'id', rightOn: 'id', isMultiCol: false });
    const [readCsvData, setReadCsvData] = useState({ filePath: 'data.csv', sep: ',', header: '0', hasHeader: true });
    const [convertData, setConvertData] = useState({ column: 'colonne', targetType: 'numeric', errors: 'coerce' });
    const [filterData, setFilterData] = useState({ column: 'colonne', operator: '==', value: 'valeur', type: 'value' });
    const [groupData, setGroupData] = useState({ groupCols: 'ville', targetCol: 'salaire', aggFunc: 'mean' });
    const [pivotData, setPivotData] = useState({ index: 'date', columns: 'categorie', values: 'montant', aggfunc: 'sum' });
    const [cleanData, setCleanData] = useState({ action: 'drop', axis: 'rows', fillValue: '0', subset: '' });
    const [sortData, setSortData] = useState({ columns: 'date, montant', ascending: 'False', naPosition: 'last' });
    const [exportData, setExportData] = useState({ format: 'csv', path: 'output.csv', index: false, sep: ',' });
    const [concatData, setConcatData] = useState({ dataframes: 'df1, df2', axis: '0', ignoreIndex: true });

    // --- Form States (Viz) ---
    const [vizData, setVizData] = useState({
        x: 'colonne_x',
        y: 'colonne_y',
        hue: '',
        title: 'Mon Graphique',
        bins: 30 // for histogram
    });

    useEffect(() => {
        generateCode();
    }, [mode, language, action, vizAction, mergeData, readCsvData, convertData, filterData, groupData, pivotData, cleanData, sortData, exportData, concatData, vizData]);

    const generateCode = () => {
        if (language === 'Python') {
            let code = '';

            if (mode === 'data') {
                // ... (Existing Data Logic) ...
                switch (action) {
                    case 'merge':
                        const leftKeys = mergeData.isMultiCol ? `[${mergeData.leftOn.split(',').map(k => `'${k.trim()}'`).join(', ')}]` : `'${mergeData.leftOn}'`;
                        const rightKeys = mergeData.isMultiCol ? `[${mergeData.rightOn.split(',').map(k => `'${k.trim()}'`).join(', ')}]` : `'${mergeData.rightOn}'`;
                        code = `# Fusion des dataframes\n${mergeData.leftTable} = pd.merge(\n    ${mergeData.leftTable},\n    ${mergeData.rightTable},\n    left_on=${leftKeys},\n    right_on=${rightKeys},\n    how='${mergeData.joinType}'\n)`;
                        break;
                    case 'read_csv':
                        let options = [];
                        if (readCsvData.sep !== ',') options.push(`sep='${readCsvData.sep}'`);
                        if (readCsvData.header !== '0') options.push(`header=${readCsvData.header}`);
                        if (!readCsvData.hasHeader) options.push(`header=None`);
                        const optionsStr = options.length > 0 ? `, ${options.join(', ')}` : '';
                        code = `# Lecture du fichier CSV\ndf = pd.read_csv('${readCsvData.filePath}'${optionsStr})`;
                        break;
                    case 'convert_type':
                        if (convertData.targetType === 'numeric') code = `# Conversion en numérique\ndf['${convertData.column}'] = pd.to_numeric(df['${convertData.column}'], errors='${convertData.errors}')`;
                        else if (convertData.targetType === 'datetime') code = `# Conversion en datetime\ndf['${convertData.column}'] = pd.to_datetime(df['${convertData.column}'], errors='${convertData.errors}')`;
                        else code = `# Conversion de type simple\ndf['${convertData.column}'] = df['${convertData.column}'].astype('${convertData.targetType}')`;
                        break;
                    case 'filter':
                        let condition = '';
                        const val = filterData.type === 'value' && isNaN(filterData.value) ? `'${filterData.value}'` : filterData.value;
                        if (filterData.operator === 'contains') condition = `df['${filterData.column}'].str.contains(${val}, na=False)`;
                        else if (filterData.operator === 'isin') condition = `df['${filterData.column}'].isin([${val}])`;
                        else condition = `df['${filterData.column}'] ${filterData.operator} ${val}`;
                        code = `# Filtrage des données\ndf_filtered = df[${condition}]`;
                        break;
                    case 'groupby':
                        const groups = groupData.groupCols.includes(',') ? `[${groupData.groupCols.split(',').map(c => `'${c.trim()}'`).join(', ')}]` : `'${groupData.groupCols}'`;
                        code = `# Agrégation par groupe\ndf_grouped = df.groupby(${groups})['${groupData.targetCol}'].${groupData.aggFunc}()\n\n# Pour garder sous forme de DataFrame\ndf_grouped = df_grouped.reset_index()`;
                        break;
                    case 'pivot':
                        code = `# Tableau Croisé Dynamique (Pivot Table)\npivot_df = df.pivot_table(\n    index='${pivotData.index}',\n    columns='${pivotData.columns}',\n    values='${pivotData.values}',\n    aggfunc='${pivotData.aggfunc}'\n)`;
                        break;
                    case 'clean':
                        if (cleanData.action === 'drop') {
                            const subset = cleanData.subset ? `, subset=['${cleanData.subset}']` : '';
                            const axis = cleanData.axis === 'columns' ? `, axis=1` : '';
                            code = `# Supprimer les valeurs manquantes\ndf_clean = df.dropna(${axis.replace(', ', '')}${subset})`;
                        } else {
                            const fillVal = isNaN(cleanData.fillValue) ? `'${cleanData.fillValue}'` : cleanData.fillValue;
                            code = `# Remplacer les valeurs manquantes\ndf_clean = df.fillna(${fillVal})`;
                        }
                        break;
                    case 'sort':
                        const cols = sortData.columns.includes(',') ? `[${sortData.columns.split(',').map(c => `'${c.trim()}'`).join(', ')}]` : `'${sortData.columns}'`;
                        const ascending = sortData.ascending === 'True' ? 'True' : 'False';
                        code = `# Tri des données\ndf_sorted = df.sort_values(\n    by=${cols},\n    ascending=${ascending},\n    na_position='${sortData.naPosition}'\n)`;
                        break;
                    case 'export':
                        if (exportData.format === 'csv') {
                            const sep = exportData.sep !== ',' ? `, sep='${exportData.sep}'` : '';
                            code = `# Export en CSV\ndf.to_csv('${exportData.path}', index=${exportData.index}${sep})`;
                        } else {
                            code = `# Export en Excel\ndf.to_excel('${exportData.path}', index=${exportData.index})`;
                        }
                        break;
                    case 'concat':
                        const dfs = `[${concatData.dataframes}]`;
                        const axisConcat = concatData.axis === '1' ? ', axis=1' : '';
                        const ignore = concatData.ignoreIndex ? ', ignore_index=True' : '';
                        code = `# Concaténation (Empilement)\ndf_concat = pd.concat(${dfs}${axisConcat}${ignore})`;
                        break;
                }
            } else {
                // --- Viz Logic ---
                const hueStr = vizData.hue ? `, hue='${vizData.hue}'` : '';
                const titleStr = vizData.title ? `\nplt.title('${vizData.title}')` : '';

                switch (vizAction) {
                    case 'histogram':
                        code = `# Histogramme (Distribution)\nsns.histplot(data=df, x='${vizData.x}', bins=${vizData.bins}, kde=True${hueStr})${titleStr}\nplt.show()`;
                        break;
                    case 'boxplot':
                        code = `# Boîte à moustaches (Outliers)\nsns.boxplot(data=df, x='${vizData.x}', y='${vizData.y}'${hueStr})${titleStr}\nplt.show()`;
                        break;
                    case 'scatterplot':
                        code = `# Nuage de points (Corrélation)\nsns.scatterplot(data=df, x='${vizData.x}', y='${vizData.y}'${hueStr})${titleStr}\nplt.show()`;
                        break;
                    case 'barplot':
                        code = `# Diagramme en barres (Comparaison)\nsns.barplot(data=df, x='${vizData.x}', y='${vizData.y}'${hueStr})${titleStr}\nplt.show()`;
                        break;
                    case 'lineplot':
                        code = `# Courbe (Série Temporelle)\nsns.lineplot(data=df, x='${vizData.x}', y='${vizData.y}'${hueStr})${titleStr}\nplt.show()`;
                        break;
                }
            }
            setGeneratedCode(code);
        }
    };

    const getWarning = () => {
        if (mode !== 'viz') return null;
        switch (vizAction) {
            case 'histogram':
                return "⚠️ 'x' doit être une colonne numérique.";
            case 'boxplot':
                return "⚠️ 'x' est généralement catégoriel, 'y' doit être numérique.";
            case 'scatterplot':
            case 'lineplot':
                return "⚠️ 'x' et 'y' doivent être numériques (ou date pour x dans lineplot).";
            case 'barplot':
                return "⚠️ 'x' est catégoriel, 'y' est numérique (moyenne par défaut).";
            default:
                return null;
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Wand2 className="w-8 h-8 text-purple-500" />
                    Générateur de Code
                </h1>
                <p className="text-zinc-400">Créez vos snippets rapidement sans IA.</p>
            </div>

            {/* Mode Switcher */}
            <div className="flex p-1 bg-zinc-900 rounded-lg w-fit border border-zinc-800">
                <button
                    onClick={() => setMode('data')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'data' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                >
                    <Database className="w-4 h-4" />
                    Données
                </button>
                <button
                    onClick={() => setMode('viz')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'viz' ? 'bg-purple-600/20 text-purple-400 border border-purple-600/20 shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                >
                    <BarChart3 className="w-4 h-4" />
                    Visuels
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration Panel */}
                <div className="space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <div className="space-y-4">

                        {mode === 'data' ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Action</label>
                                    <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none">
                                        <option value="merge">Jointure (Merge)</option>
                                        <option value="read_csv">Lire un CSV</option>
                                        <option value="convert_type">Changer le Type</option>
                                        <option value="filter">Filtrer</option>
                                        <option value="groupby">Grouper (GroupBy)</option>
                                        <option value="pivot">Pivot Table</option>
                                        <option value="clean">Nettoyage (NaN)</option>
                                        <option value="sort">Trier</option>
                                        <option value="export">Exporter</option>
                                        <option value="concat">Concaténer</option>
                                    </select>
                                </div>
                                <div className="h-px bg-zinc-800 my-4" />

                                {/* ... (Include all previous data forms here - condensed for brevity in this replace block, but full code should have them) ... */}
                                {/* Re-inserting the data forms logic from previous step to ensure nothing is lost */}
                                {action === 'merge' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Table Gauche</label><input type="text" value={mergeData.leftTable} onChange={(e) => setMergeData({ ...mergeData, leftTable: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">Table Droite</label><input type="text" value={mergeData.rightTable} onChange={(e) => setMergeData({ ...mergeData, rightTable: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        </div>
                                        <div><label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer"><input type="checkbox" checked={mergeData.isMultiCol} onChange={(e) => setMergeData({ ...mergeData, isMultiCol: e.target.checked })} className="rounded border-zinc-700 bg-zinc-900 text-purple-500 focus:ring-purple-500" /> Jointure sur plusieurs colonnes</label></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">{mergeData.isMultiCol ? 'Clés Gauche (csv)' : 'Clé Gauche'}</label><input type="text" value={mergeData.leftOn} onChange={(e) => setMergeData({ ...mergeData, leftOn: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">{mergeData.isMultiCol ? 'Clés Droite (csv)' : 'Clé Droite'}</label><input type="text" value={mergeData.rightOn} onChange={(e) => setMergeData({ ...mergeData, rightOn: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        </div>
                                        <div><label className="block text-xs text-zinc-500 mb-1">Type</label><select value={mergeData.joinType} onChange={(e) => setMergeData({ ...mergeData, joinType: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="left">Left</option><option value="right">Right</option><option value="inner">Inner</option><option value="outer">Outer</option></select></div>
                                    </div>
                                )}
                                {action === 'read_csv' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div><label className="block text-xs text-zinc-500 mb-1">Chemin</label><input type="text" value={readCsvData.filePath} onChange={(e) => setReadCsvData({ ...readCsvData, filePath: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Séparateur</label><input type="text" value={readCsvData.sep} onChange={(e) => setReadCsvData({ ...readCsvData, sep: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">Header</label><input type="number" value={readCsvData.header} onChange={(e) => setReadCsvData({ ...readCsvData, header: e.target.value })} disabled={!readCsvData.hasHeader} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm disabled:opacity-50" /></div>
                                        </div>
                                        <div><label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer"><input type="checkbox" checked={readCsvData.hasHeader} onChange={(e) => setReadCsvData({ ...readCsvData, hasHeader: e.target.checked })} className="rounded border-zinc-700 bg-zinc-900 text-purple-500 focus:ring-purple-500" /> Avec en-têtes</label></div>
                                    </div>
                                )}
                                {action === 'convert_type' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div><label className="block text-xs text-zinc-500 mb-1">Colonne</label><input type="text" value={convertData.column} onChange={(e) => setConvertData({ ...convertData, column: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        <div><label className="block text-xs text-zinc-500 mb-1">Type Cible</label><select value={convertData.targetType} onChange={(e) => setConvertData({ ...convertData, targetType: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="numeric">Numérique</option><option value="datetime">Date</option><option value="str">Texte</option><option value="category">Catégorie</option></select></div>
                                        {(convertData.targetType === 'numeric' || convertData.targetType === 'datetime') && (<div><label className="block text-xs text-zinc-500 mb-1">Erreurs</label><select value={convertData.errors} onChange={(e) => setConvertData({ ...convertData, errors: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="coerce">Coerce</option><option value="raise">Raise</option><option value="ignore">Ignore</option></select></div>)}
                                    </div>
                                )}
                                {action === 'filter' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div><label className="block text-xs text-zinc-500 mb-1">Colonne</label><input type="text" value={filterData.column} onChange={(e) => setFilterData({ ...filterData, column: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Opérateur</label><select value={filterData.operator} onChange={(e) => setFilterData({ ...filterData, operator: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="==">==</option><option value="!=">!=</option><option value=">">&gt;</option><option value="<">&lt;</option><option value=">=">&gt;=</option><option value="<=">&lt;=</option><option value="contains">Contient</option><option value="isin">Est dans</option></select></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">Valeur</label><input type="text" value={filterData.value} onChange={(e) => setFilterData({ ...filterData, value: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        </div>
                                    </div>
                                )}
                                {action === 'groupby' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div><label className="block text-xs text-zinc-500 mb-1">Groupes</label><input type="text" value={groupData.groupCols} onChange={(e) => setGroupData({ ...groupData, groupCols: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Cible</label><input type="text" value={groupData.targetCol} onChange={(e) => setGroupData({ ...groupData, targetCol: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">Fonction</label><select value={groupData.aggFunc} onChange={(e) => setGroupData({ ...groupData, aggFunc: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="mean">Moyenne</option><option value="sum">Somme</option><option value="count">Compte</option><option value="min">Min</option><option value="max">Max</option></select></div>
                                        </div>
                                    </div>
                                )}
                                {action === 'pivot' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Index</label><input type="text" value={pivotData.index} onChange={(e) => setPivotData({ ...pivotData, index: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">Colonnes</label><input type="text" value={pivotData.columns} onChange={(e) => setPivotData({ ...pivotData, columns: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Valeurs</label><input type="text" value={pivotData.values} onChange={(e) => setPivotData({ ...pivotData, values: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">Fonction</label><select value={pivotData.aggfunc} onChange={(e) => setPivotData({ ...pivotData, aggfunc: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="mean">Moyenne</option><option value="sum">Somme</option><option value="count">Compte</option></select></div>
                                        </div>
                                    </div>
                                )}
                                {action === 'clean' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div><label className="block text-xs text-zinc-500 mb-1">Action</label><select value={cleanData.action} onChange={(e) => setCleanData({ ...cleanData, action: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="drop">Supprimer</option><option value="fill">Remplacer</option></select></div>
                                        {cleanData.action === 'drop' ? (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><label className="block text-xs text-zinc-500 mb-1">Axe</label><select value={cleanData.axis} onChange={(e) => setCleanData({ ...cleanData, axis: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="rows">Lignes</option><option value="columns">Colonnes</option></select></div>
                                                <div><label className="block text-xs text-zinc-500 mb-1">Subset</label><input type="text" value={cleanData.subset} onChange={(e) => setCleanData({ ...cleanData, subset: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                            </div>
                                        ) : (
                                            <div><label className="block text-xs text-zinc-500 mb-1">Valeur</label><input type="text" value={cleanData.fillValue} onChange={(e) => setCleanData({ ...cleanData, fillValue: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        )}
                                    </div>
                                )}
                                {action === 'sort' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div><label className="block text-xs text-zinc-500 mb-1">Colonnes</label><input type="text" value={sortData.columns} onChange={(e) => setSortData({ ...sortData, columns: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Croissant</label><select value={sortData.ascending} onChange={(e) => setSortData({ ...sortData, ascending: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="True">Oui</option><option value="False">Non</option></select></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">NaN</label><select value={sortData.naPosition} onChange={(e) => setSortData({ ...sortData, naPosition: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="last">Fin</option><option value="first">Début</option></select></div>
                                        </div>
                                    </div>
                                )}
                                {action === 'export' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Format</label><select value={exportData.format} onChange={(e) => setExportData({ ...exportData, format: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="csv">CSV</option><option value="excel">Excel</option></select></div>
                                            <div><label className="block text-xs text-zinc-500 mb-1">Chemin</label><input type="text" value={exportData.path} onChange={(e) => setExportData({ ...exportData, path: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer h-full"><input type="checkbox" checked={exportData.index} onChange={(e) => setExportData({ ...exportData, index: e.target.checked })} className="rounded border-zinc-700 bg-zinc-900 text-purple-500 focus:ring-purple-500" /> Index</label></div>
                                            {exportData.format === 'csv' && (<div><label className="block text-xs text-zinc-500 mb-1">Séparateur</label><input type="text" value={exportData.sep} onChange={(e) => setExportData({ ...exportData, sep: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>)}
                                        </div>
                                    </div>
                                )}
                                {action === 'concat' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div><label className="block text-xs text-zinc-500 mb-1">DataFrames</label><input type="text" value={concatData.dataframes} onChange={(e) => setConcatData({ ...concatData, dataframes: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="block text-xs text-zinc-500 mb-1">Axe</label><select value={concatData.axis} onChange={(e) => setConcatData({ ...concatData, axis: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm"><option value="0">Vertical</option><option value="1">Horizontal</option></select></div>
                                            <div><label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer h-full pt-4"><input type="checkbox" checked={concatData.ignoreIndex} onChange={(e) => setConcatData({ ...concatData, ignoreIndex: e.target.checked })} className="rounded border-zinc-700 bg-zinc-900 text-purple-500 focus:ring-purple-500" /> Ignorer l'index</label></div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            // --- Viz Forms ---
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1">Type de Graphique</label>
                                    <select value={vizAction} onChange={(e) => setVizAction(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none">
                                        <option value="histogram">Histogramme (Distribution)</option>
                                        <option value="boxplot">Boxplot (Outliers)</option>
                                        <option value="scatterplot">Scatterplot (Corrélation)</option>
                                        <option value="barplot">Barplot (Comparaison)</option>
                                        <option value="lineplot">Lineplot (Série Temporelle)</option>
                                    </select>
                                </div>

                                <div className="h-px bg-zinc-800 my-4" />

                                {/* Warning Message */}
                                {getWarning() && (
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm">
                                        <AlertTriangle className="w-5 h-5 shrink-0" />
                                        <p>{getWarning()}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-1">Axe X</label>
                                        <input type="text" value={vizData.x} onChange={(e) => setVizData({ ...vizData, x: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                                    </div>
                                    {vizAction !== 'histogram' && (
                                        <div>
                                            <label className="block text-xs text-zinc-500 mb-1">Axe Y</label>
                                            <input type="text" value={vizData.y} onChange={(e) => setVizData({ ...vizData, y: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                                        </div>
                                    )}
                                    {vizAction === 'histogram' && (
                                        <div>
                                            <label className="block text-xs text-zinc-500 mb-1">Bins (Barres)</label>
                                            <input type="number" value={vizData.bins} onChange={(e) => setVizData({ ...vizData, bins: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-1">Couleur (Hue - Optionnel)</label>
                                        <input type="text" value={vizData.hue} onChange={(e) => setVizData({ ...vizData, hue: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" placeholder="colonne_categorie" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-zinc-500 mb-1">Titre</label>
                                        <input type="text" value={vizData.title} onChange={(e) => setVizData({ ...vizData, title: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Résultat</h2>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copié !' : 'Copier'}
                        </button>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity blur" />
                        <div className="relative bg-zinc-950 rounded-xl p-6 border border-zinc-800 min-h-[200px] font-mono text-sm overflow-x-auto">
                            <pre className="text-zinc-300">
                                {generatedCode}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
