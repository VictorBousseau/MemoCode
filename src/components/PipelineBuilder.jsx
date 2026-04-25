import React, { useState, useMemo } from 'react';
import {
    Plus, Trash2, ArrowUp, ArrowDown, Copy, Check, GitBranch,
    Filter, Search, Combine, Edit3, Columns, Eraser, Replace,
    PlusCircle, Type, ArrowDownUp, CopyMinus, Droplet
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../hooks/useTheme';

// ============================================================
// Helpers
// ============================================================

const isNumeric = (v) => v !== '' && !isNaN(v);
const formatVal = (v) => isNumeric(v) ? v : `'${v}'`;
const splitCsv = (s) => s.split(',').map(c => c.trim()).filter(Boolean);

// Génère un id unique simple
let _uid = 0;
const uid = () => `step_${Date.now()}_${++_uid}`;

// ============================================================
// Shared components
// ============================================================

const ColumnInput = ({ value, onChange, placeholder = "Nom de la colonne" }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        list="pipeline-column-suggestions"
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
        placeholder={placeholder}
    />
);

// ============================================================
// Step Definitions
// Chaque step expose:
//  - label, icon, defaultConfig
//  - render: (config, update) => JSX (form de config)
//  - body: (config, inVar) => string  → expression sur la droite du `=`
//        OU code multi-ligne complet si l'opération en a besoin
//  - chain: (config) => string → fragment chainable (commence par "." ou "[")
// ============================================================

const STEP_TYPES = {
    filter_simple: {
        label: 'Filtre simple',
        icon: Filter,
        defaultConfig: { column: 'colonne', operator: '==', value: 'valeur' },
        render: (c, set) => (
            <>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Colonne</label>
                    <ColumnInput value={c.column} onChange={(e) => set({ column: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">Opérateur</label>
                        <select value={c.operator} onChange={(e) => set({ operator: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="==">==</option>
                            <option value="!=">!=</option>
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value="contains">Contient</option>
                            <option value="isin">Est dans</option>
                            <option value="notna">Non vide</option>
                        </select>
                    </div>
                    {c.operator !== 'notna' && (
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Valeur</label>
                            <input type="text" value={c.value} onChange={(e) => set({ value: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                    )}
                </div>
            </>
        ),
        body: (c, inVar) => {
            if (c.operator === 'contains') return `${inVar}[${inVar}['${c.column}'].str.contains('${c.value}', na=False)]`;
            if (c.operator === 'isin') {
                const items = splitCsv(c.value).map(formatVal).join(', ');
                return `${inVar}[${inVar}['${c.column}'].isin([${items}])]`;
            }
            if (c.operator === 'notna') return `${inVar}[${inVar}['${c.column}'].notna()]`;
            return `${inVar}[${inVar}['${c.column}'] ${c.operator} ${formatVal(c.value)}]`;
        },
        chain: (c) => {
            if (c.operator === 'contains') return `.loc[lambda d: d['${c.column}'].str.contains('${c.value}', na=False)]`;
            if (c.operator === 'isin') {
                const items = splitCsv(c.value).map(formatVal).join(', ');
                return `.loc[lambda d: d['${c.column}'].isin([${items}])]`;
            }
            if (c.operator === 'notna') return `.loc[lambda d: d['${c.column}'].notna()]`;
            // Pour query : il faut backticks si nom non standard, simplifié ici
            return `.query("${c.column} ${c.operator} ${isNumeric(c.value) ? c.value : `'${c.value}'`}")`;
        },
    },

    filter_query: {
        label: 'Filtre conditions multiples',
        icon: Search,
        defaultConfig: { expression: "age > 30 and ville == 'Paris'" },
        render: (c, set) => (
            <div>
                <label className="block text-xs text-zinc-500 mb-1">
                    Expression (syntaxe pandas <code className="text-purple-400">query</code>)
                </label>
                <textarea
                    value={c.expression}
                    onChange={(e) => set({ expression: e.target.value })}
                    rows={2}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm font-mono"
                    placeholder="age > 30 and (ville == 'Paris' or ville == 'Lyon')"
                />
                <p className="text-xs text-zinc-500 mt-1">Opérateurs: <code>and / or / not</code>, parenthèses, <code>in</code>, <code>~</code></p>
            </div>
        ),
        body: (c, inVar) => `${inVar}.query("${c.expression.replace(/"/g, '\\"')}")`,
        chain: (c) => `.query("${c.expression.replace(/"/g, '\\"')}")`,
    },

    merge: {
        label: 'Jointure',
        icon: Combine,
        defaultConfig: {
            rightDf: 'df_right', joinType: 'left',
            leftOn: 'id', rightOn: 'id', isMultiCol: false,
            useSuffixes: false, leftSuffix: '_x', rightSuffix: '_y'
        },
        render: (c, set) => (
            <>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">DataFrame droit</label>
                        <input type="text" value={c.rightDf} onChange={(e) => set({ rightDf: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">Type</label>
                        <select value={c.joinType} onChange={(e) => set({ joinType: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="inner">Inner</option>
                            <option value="outer">Outer</option>
                        </select>
                    </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-zinc-400">
                    <input type="checkbox" checked={c.isMultiCol} onChange={(e) => set({ isMultiCol: e.target.checked })} className="rounded border-zinc-700 bg-zinc-900 text-purple-500" />
                    Jointure sur plusieurs colonnes
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">{c.isMultiCol ? 'Clés gauche (csv)' : 'Clé gauche'}</label>
                        <ColumnInput value={c.leftOn} onChange={(e) => set({ leftOn: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">{c.isMultiCol ? 'Clés droite (csv)' : 'Clé droite'}</label>
                        <ColumnInput value={c.rightOn} onChange={(e) => set({ rightOn: e.target.value })} />
                    </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-zinc-400">
                    <input type="checkbox" checked={c.useSuffixes} onChange={(e) => set({ useSuffixes: e.target.checked })} className="rounded border-zinc-700 bg-zinc-900 text-purple-500" />
                    Suffixes personnalisés (colonnes en doublon)
                </label>
                {c.useSuffixes && (
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Suffixe gauche</label>
                            <input type="text" value={c.leftSuffix} onChange={(e) => set({ leftSuffix: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Suffixe droit</label>
                            <input type="text" value={c.rightSuffix} onChange={(e) => set({ rightSuffix: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                    </div>
                )}
            </>
        ),
        body: (c, inVar) => {
            const lk = c.isMultiCol ? `[${splitCsv(c.leftOn).map(k => `'${k}'`).join(', ')}]` : `'${c.leftOn}'`;
            const rk = c.isMultiCol ? `[${splitCsv(c.rightOn).map(k => `'${k}'`).join(', ')}]` : `'${c.rightOn}'`;
            const suff = c.useSuffixes ? `,\n    suffixes=('${c.leftSuffix}', '${c.rightSuffix}')` : '';
            return `pd.merge(\n    ${inVar},\n    ${c.rightDf},\n    left_on=${lk},\n    right_on=${rk},\n    how='${c.joinType}'${suff}\n)`;
        },
        chain: (c) => {
            // Pour le chaining, on utilise la méthode .merge() sur le DF gauche
            const lk = c.isMultiCol ? `[${splitCsv(c.leftOn).map(k => `'${k}'`).join(', ')}]` : `'${c.leftOn}'`;
            const rk = c.isMultiCol ? `[${splitCsv(c.rightOn).map(k => `'${k}'`).join(', ')}]` : `'${c.rightOn}'`;
            const suff = c.useSuffixes ? `, suffixes=('${c.leftSuffix}', '${c.rightSuffix}')` : '';
            return `.merge(${c.rightDf}, left_on=${lk}, right_on=${rk}, how='${c.joinType}'${suff})`;
        },
    },

    rename: {
        label: 'Renommage de colonnes',
        icon: Edit3,
        defaultConfig: { mappings: [{ old: 'ancien_nom', new: 'nouveau_nom' }] },
        render: (c, set) => (
            <div className="space-y-2">
                <label className="block text-xs text-zinc-500">Mappings (ancien → nouveau)</label>
                {c.mappings.map((m, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-center">
                        <ColumnInput value={m.old} onChange={(e) => {
                            const next = [...c.mappings]; next[idx] = { ...m, old: e.target.value };
                            set({ mappings: next });
                        }} placeholder="ancien" />
                        <span className="text-zinc-500">→</span>
                        <input type="text" value={m.new} onChange={(e) => {
                            const next = [...c.mappings]; next[idx] = { ...m, new: e.target.value };
                            set({ mappings: next });
                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" placeholder="nouveau" />
                        <button onClick={() => set({ mappings: c.mappings.filter((_, i) => i !== idx) })} className="text-zinc-500 hover:text-red-400 p-1">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button onClick={() => set({ mappings: [...c.mappings, { old: '', new: '' }] })} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Ajouter un mapping
                </button>
            </div>
        ),
        body: (c, inVar) => {
            const dict = c.mappings.filter(m => m.old).map(m => `'${m.old}': '${m.new}'`).join(', ');
            return `${inVar}.rename(columns={${dict}})`;
        },
        chain: (c) => {
            const dict = c.mappings.filter(m => m.old).map(m => `'${m.old}': '${m.new}'`).join(', ');
            return `.rename(columns={${dict}})`;
        },
    },

    select: {
        label: 'Sélection de colonnes',
        icon: Columns,
        defaultConfig: { columns: 'col1, col2, col3' },
        render: (c, set) => (
            <div>
                <label className="block text-xs text-zinc-500 mb-1">Colonnes à conserver (csv)</label>
                <ColumnInput value={c.columns} onChange={(e) => set({ columns: e.target.value })} placeholder="col1, col2, col3" />
            </div>
        ),
        body: (c, inVar) => {
            const cols = splitCsv(c.columns).map(x => `'${x}'`).join(', ');
            return `${inVar}[[${cols}]]`;
        },
        chain: (c) => {
            const cols = splitCsv(c.columns).map(x => `'${x}'`).join(', ');
            return `[[${cols}]]`;
        },
    },

    drop_cols: {
        label: 'Suppression de colonnes',
        icon: Eraser,
        defaultConfig: { columns: 'col_inutile' },
        render: (c, set) => (
            <div>
                <label className="block text-xs text-zinc-500 mb-1">Colonnes à supprimer (csv)</label>
                <ColumnInput value={c.columns} onChange={(e) => set({ columns: e.target.value })} />
            </div>
        ),
        body: (c, inVar) => {
            const cols = splitCsv(c.columns);
            const arg = cols.length > 1 ? `columns=[${cols.map(x => `'${x}'`).join(', ')}]` : `columns='${cols[0] || ''}'`;
            return `${inVar}.drop(${arg})`;
        },
        chain: (c) => {
            const cols = splitCsv(c.columns);
            const arg = cols.length > 1 ? `columns=[${cols.map(x => `'${x}'`).join(', ')}]` : `columns='${cols[0] || ''}'`;
            return `.drop(${arg})`;
        },
    },

    replace_value: {
        label: 'Remplacement de valeur',
        icon: Replace,
        defaultConfig: { mode: 'literal', column: 'colonne', mappings: [{ old: '2567', new: '8547' }] },
        render: (c, set) => (
            <>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Mode</label>
                    <select value={c.mode} onChange={(e) => set({ mode: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="literal">Remplacement littéral (val → val)</option>
                        <option value="normalize">Normalisation accents (é → e, à → a, ...)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Colonne (vide = toutes les colonnes texte)</label>
                    <ColumnInput value={c.column} onChange={(e) => set({ column: e.target.value })} placeholder="(optionnel)" />
                </div>
                {c.mode === 'literal' && (
                    <div className="space-y-2">
                        <label className="block text-xs text-zinc-500">Mappings (ancien → nouveau)</label>
                        {c.mappings.map((m, idx) => (
                            <div key={idx} className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-center">
                                <input type="text" value={m.old} onChange={(e) => {
                                    const next = [...c.mappings]; next[idx] = { ...m, old: e.target.value };
                                    set({ mappings: next });
                                }} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                                <span className="text-zinc-500">→</span>
                                <input type="text" value={m.new} onChange={(e) => {
                                    const next = [...c.mappings]; next[idx] = { ...m, new: e.target.value };
                                    set({ mappings: next });
                                }} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                                <button onClick={() => set({ mappings: c.mappings.filter((_, i) => i !== idx) })} className="text-zinc-500 hover:text-red-400 p-1">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button onClick={() => set({ mappings: [...c.mappings, { old: '', new: '' }] })} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                            <Plus className="w-3 h-3" /> Ajouter un mapping
                        </button>
                    </div>
                )}
            </>
        ),
        body: (c, inVar) => {
            if (c.mode === 'normalize') {
                if (c.column) {
                    return [
                        `# Nécessite : import unicodedata`,
                        `${inVar} = ${inVar}.copy()`,
                        `${inVar}['${c.column}'] = (`,
                        `    ${inVar}['${c.column}']`,
                        `    .astype(str)`,
                        `    .apply(lambda s: unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode('utf-8'))`,
                        `)`,
                    ].join('\n');
                }
                return [
                    `# Nécessite : import unicodedata`,
                    `${inVar} = ${inVar}.copy()`,
                    `_obj = ${inVar}.select_dtypes(include='object').columns`,
                    `${inVar}[_obj] = ${inVar}[_obj].apply(`,
                    `    lambda s: s.astype(str).map(lambda x: unicodedata.normalize('NFKD', x).encode('ascii', 'ignore').decode('utf-8'))`,
                    `)`,
                ].join('\n');
            }
            // Mode littéral
            const dict = c.mappings.filter(m => m.old !== '').map(m => `'${m.old}': '${m.new}'`).join(', ');
            if (c.column) {
                return `${inVar}.assign(**{'${c.column}': ${inVar}['${c.column}'].replace({${dict}})})`;
            }
            return `${inVar}.replace({${dict}})`;
        },
        // Pour le chaining, on garde une seule expression : on bascule en mode "instructions" via .pipe pour normalize
        chain: (c) => {
            if (c.mode === 'normalize') {
                if (c.column) {
                    return `.assign(**{'${c.column}': lambda d: d['${c.column}'].astype(str).map(lambda x: unicodedata.normalize('NFKD', x).encode('ascii', 'ignore').decode('utf-8'))})`;
                }
                return `.pipe(lambda d: d.assign(**{c: d[c].astype(str).map(lambda x: unicodedata.normalize('NFKD', x).encode('ascii', 'ignore').decode('utf-8')) for c in d.select_dtypes(include='object').columns}))`;
            }
            const dict = c.mappings.filter(m => m.old !== '').map(m => `'${m.old}': '${m.new}'`).join(', ');
            if (c.column) {
                return `.assign(**{'${c.column}': lambda d: d['${c.column}'].replace({${dict}})})`;
            }
            return `.replace({${dict}})`;
        },
    },

    assign: {
        label: 'Création de colonne (assign)',
        icon: PlusCircle,
        defaultConfig: { column: 'nouvelle_col', expression: "d['col_a'] + d['col_b']" },
        render: (c, set) => (
            <>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Nom de la colonne</label>
                    <input type="text" value={c.column} onChange={(e) => set({ column: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">
                        Expression (utilise <code className="text-purple-400">d</code> pour le DataFrame courant)
                    </label>
                    <textarea
                        value={c.expression}
                        onChange={(e) => set({ expression: e.target.value })}
                        rows={2}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm font-mono"
                        placeholder="d['prix'] * d['quantite']"
                    />
                </div>
            </>
        ),
        body: (c, inVar) => `${inVar}.assign(**{'${c.column}': lambda d: ${c.expression}})`,
        chain: (c) => `.assign(**{'${c.column}': lambda d: ${c.expression}})`,
    },

    convert_type: {
        label: 'Conversion de type',
        icon: Type,
        defaultConfig: { column: 'colonne', targetType: 'numeric', errors: 'coerce' },
        render: (c, set) => (
            <>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Colonne</label>
                    <ColumnInput value={c.column} onChange={(e) => set({ column: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">Type cible</label>
                        <select value={c.targetType} onChange={(e) => set({ targetType: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="numeric">Numérique</option>
                            <option value="datetime">Date</option>
                            <option value="str">Texte</option>
                            <option value="category">Catégorie</option>
                            <option value="int64">int64</option>
                            <option value="float64">float64</option>
                        </select>
                    </div>
                    {(c.targetType === 'numeric' || c.targetType === 'datetime') && (
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Erreurs</label>
                            <select value={c.errors} onChange={(e) => set({ errors: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                                <option value="coerce">coerce (NaN si erreur)</option>
                                <option value="raise">raise</option>
                                <option value="ignore">ignore</option>
                            </select>
                        </div>
                    )}
                </div>
            </>
        ),
        body: (c, inVar) => {
            if (c.targetType === 'numeric') return `${inVar}.assign(**{'${c.column}': lambda d: pd.to_numeric(d['${c.column}'], errors='${c.errors}')})`;
            if (c.targetType === 'datetime') return `${inVar}.assign(**{'${c.column}': lambda d: pd.to_datetime(d['${c.column}'], errors='${c.errors}')})`;
            return `${inVar}.assign(**{'${c.column}': lambda d: d['${c.column}'].astype('${c.targetType}')})`;
        },
        chain: (c) => {
            if (c.targetType === 'numeric') return `.assign(**{'${c.column}': lambda d: pd.to_numeric(d['${c.column}'], errors='${c.errors}')})`;
            if (c.targetType === 'datetime') return `.assign(**{'${c.column}': lambda d: pd.to_datetime(d['${c.column}'], errors='${c.errors}')})`;
            return `.assign(**{'${c.column}': lambda d: d['${c.column}'].astype('${c.targetType}')})`;
        },
    },

    sort: {
        label: 'Tri',
        icon: ArrowDownUp,
        defaultConfig: { columns: 'date', ascending: 'False', naPosition: 'last' },
        render: (c, set) => (
            <>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Colonnes (csv)</label>
                    <ColumnInput value={c.columns} onChange={(e) => set({ columns: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">Croissant</label>
                        <select value={c.ascending} onChange={(e) => set({ ascending: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="True">Oui</option>
                            <option value="False">Non</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">NaN</label>
                        <select value={c.naPosition} onChange={(e) => set({ naPosition: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="last">Fin</option>
                            <option value="first">Début</option>
                        </select>
                    </div>
                </div>
            </>
        ),
        body: (c, inVar) => {
            const cols = splitCsv(c.columns);
            const by = cols.length > 1 ? `[${cols.map(x => `'${x}'`).join(', ')}]` : `'${cols[0] || ''}'`;
            return `${inVar}.sort_values(by=${by}, ascending=${c.ascending}, na_position='${c.naPosition}')`;
        },
        chain: (c) => {
            const cols = splitCsv(c.columns);
            const by = cols.length > 1 ? `[${cols.map(x => `'${x}'`).join(', ')}]` : `'${cols[0] || ''}'`;
            return `.sort_values(by=${by}, ascending=${c.ascending}, na_position='${c.naPosition}')`;
        },
    },

    drop_duplicates: {
        label: 'Dédoublonnage',
        icon: CopyMinus,
        defaultConfig: { subset: '', keep: 'first' },
        render: (c, set) => (
            <>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Sous-ensemble (csv, vide = toutes)</label>
                    <ColumnInput value={c.subset} onChange={(e) => set({ subset: e.target.value })} placeholder="(optionnel)" />
                </div>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Conserver</label>
                    <select value={c.keep} onChange={(e) => set({ keep: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="first">Première occurrence</option>
                        <option value="last">Dernière occurrence</option>
                        <option value="False">Aucune (supprime tous les doublons)</option>
                    </select>
                </div>
            </>
        ),
        body: (c, inVar) => {
            const cols = splitCsv(c.subset);
            const subset = cols.length > 0 ? `subset=[${cols.map(x => `'${x}'`).join(', ')}], ` : '';
            return `${inVar}.drop_duplicates(${subset}keep=${c.keep === 'False' ? 'False' : `'${c.keep}'`})`;
        },
        chain: (c) => {
            const cols = splitCsv(c.subset);
            const subset = cols.length > 0 ? `subset=[${cols.map(x => `'${x}'`).join(', ')}], ` : '';
            return `.drop_duplicates(${subset}keep=${c.keep === 'False' ? 'False' : `'${c.keep}'`})`;
        },
    },

    handle_na: {
        label: 'Gestion des NaN',
        icon: Droplet,
        defaultConfig: { action: 'drop', axis: 'rows', subset: '', fillValue: '0' },
        render: (c, set) => (
            <>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">Action</label>
                    <select value={c.action} onChange={(e) => set({ action: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="drop">Supprimer</option>
                        <option value="fill">Remplacer</option>
                    </select>
                </div>
                {c.action === 'drop' ? (
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Axe</label>
                            <select value={c.axis} onChange={(e) => set({ axis: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm">
                                <option value="rows">Lignes</option>
                                <option value="columns">Colonnes</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Subset (csv)</label>
                            <ColumnInput value={c.subset} onChange={(e) => set({ subset: e.target.value })} placeholder="(optionnel)" />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="block text-xs text-zinc-500 mb-1">Valeur de remplacement</label>
                        <input type="text" value={c.fillValue} onChange={(e) => set({ fillValue: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                )}
            </>
        ),
        body: (c, inVar) => {
            if (c.action === 'drop') {
                const args = [];
                if (c.axis === 'columns') args.push('axis=1');
                const cols = splitCsv(c.subset);
                if (cols.length > 0) args.push(`subset=[${cols.map(x => `'${x}'`).join(', ')}]`);
                return `${inVar}.dropna(${args.join(', ')})`;
            }
            return `${inVar}.fillna(${formatVal(c.fillValue)})`;
        },
        chain: (c) => {
            if (c.action === 'drop') {
                const args = [];
                if (c.axis === 'columns') args.push('axis=1');
                const cols = splitCsv(c.subset);
                if (cols.length > 0) args.push(`subset=[${cols.map(x => `'${x}'`).join(', ')}]`);
                return `.dropna(${args.join(', ')})`;
            }
            return `.fillna(${formatVal(c.fillValue)})`;
        },
    },
};

const STEP_ORDER = [
    'filter_simple', 'filter_query', 'merge', 'rename', 'select', 'drop_cols',
    'replace_value', 'assign', 'convert_type', 'sort', 'drop_duplicates', 'handle_na'
];

// ============================================================
// Code generators (3 styles)
// ============================================================

const generateVariablesCode = (sourceDf, steps) => {
    if (steps.length === 0) return `# Ajoutez des étapes pour générer le pipeline.\n${sourceDf} = ${sourceDf}  # df source`;
    const lines = [];
    let inVar = sourceDf;
    let needsUnicodedata = false;
    steps.forEach((step, i) => {
        const def = STEP_TYPES[step.type];
        const outVar = `df_${i + 1}`;
        const body = def.body(step.config, inVar);
        lines.push(`# Étape ${i + 1} : ${def.label}`);
        if (body.includes('unicodedata')) needsUnicodedata = true;
        // Si body contient des sauts de ligne, c'est un bloc multi-ligne déjà construit
        if (body.includes('\n') && body.includes(inVar) && !body.startsWith(inVar)) {
            // Bloc construit comme code complet (cas normalize) — on le ré-écrit avec outVar
            lines.push(body.replace(new RegExp(`^${inVar} = ${inVar}\\.copy\\(\\)`, 'm'), `${outVar} = ${inVar}.copy()`)
                          .replace(new RegExp(`${inVar}\\[`, 'g'), `${outVar}[`)
                          .replace(new RegExp(`${inVar}\\.select_dtypes`, 'g'), `${outVar}.select_dtypes`));
        } else {
            lines.push(`${outVar} = ${body}`);
        }
        lines.push('');
        inVar = outVar;
    });
    const header = [
        'import pandas as pd',
        needsUnicodedata ? 'import unicodedata' : null,
        '',
    ].filter(x => x !== null).join('\n');
    // Note finale
    lines.push(`# Résultat final dans : ${inVar}`);
    return header + '\n' + lines.join('\n');
};

const generateChainingCode = (sourceDf, steps) => {
    if (steps.length === 0) return `# Ajoutez des étapes pour générer le pipeline.`;
    let needsUnicodedata = false;
    const fragments = steps.map((step) => {
        const def = STEP_TYPES[step.type];
        const frag = def.chain(step.config);
        if (frag.includes('unicodedata')) needsUnicodedata = true;
        return `    # ${def.label}\n    ${frag}`;
    });
    const header = [
        'import pandas as pd',
        needsUnicodedata ? 'import unicodedata' : null,
        '',
    ].filter(x => x !== null).join('\n');
    return `${header}\ndf_final = (\n    ${sourceDf}\n${fragments.join('\n')}\n)`;
};

const generatePipeCode = (sourceDf, steps) => {
    if (steps.length === 0) return `# Ajoutez des étapes pour générer le pipeline.`;
    let needsUnicodedata = false;
    const funcs = [];
    const calls = [];
    steps.forEach((step, i) => {
        const def = STEP_TYPES[step.type];
        const fname = `step_${i + 1}_${step.type}`;
        const body = def.body(step.config, 'df');
        if (body.includes('unicodedata')) needsUnicodedata = true;

        // Si body multi-ligne (cas normalize), on l'inclut tel quel
        if (body.includes('\n')) {
            const indented = body.split('\n')
                .filter(l => !l.startsWith('# Nécessite'))
                .map(l => `    ${l}`)
                .join('\n');
            funcs.push(`def ${fname}(df):\n    """${def.label}"""\n${indented}\n    return df`);
        } else {
            funcs.push(`def ${fname}(df):\n    """${def.label}"""\n    return ${body}`);
        }
        calls.push(`    .pipe(${fname})`);
    });
    const header = [
        'import pandas as pd',
        needsUnicodedata ? 'import unicodedata' : null,
        '',
    ].filter(x => x !== null).join('\n');
    return `${header}\n${funcs.join('\n\n')}\n\ndf_final = (\n    ${sourceDf}\n${calls.join('\n')}\n)`;
};

// ============================================================
// Main component
// ============================================================

export default function PipelineBuilder({ columns = [] }) {
    const [sourceDf, setSourceDf] = useState('df');
    const [style, setStyle] = useState('variables'); // variables | chaining | pipe
    const [steps, setSteps] = useState([]);
    const [showStepPicker, setShowStepPicker] = useState(false);
    const [copied, setCopied] = useState(false);
    const { currentTheme } = useTheme();

    const addStep = (type) => {
        const def = STEP_TYPES[type];
        setSteps([...steps, { id: uid(), type, config: structuredClone(def.defaultConfig) }]);
        setShowStepPicker(false);
    };

    const removeStep = (id) => setSteps(steps.filter(s => s.id !== id));

    const moveStep = (id, dir) => {
        const idx = steps.findIndex(s => s.id === id);
        if (idx < 0) return;
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= steps.length) return;
        const next = [...steps];
        [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
        setSteps(next);
    };

    const updateStepConfig = (id, partial) => {
        setSteps(steps.map(s => s.id === id ? { ...s, config: { ...s.config, ...partial } } : s));
    };

    const generatedCode = useMemo(() => {
        if (style === 'chaining') return generateChainingCode(sourceDf, steps);
        if (style === 'pipe') return generatePipeCode(sourceDf, steps);
        return generateVariablesCode(sourceDf, steps);
    }, [sourceDf, steps, style]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Style switcher + DF source */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-2">
                    <label className="block text-xs text-zinc-500">Nom du DataFrame source</label>
                    <input
                        type="text"
                        value={sourceDf}
                        onChange={(e) => setSourceDf(e.target.value || 'df')}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-2">
                    <label className="block text-xs text-zinc-500">Style de code</label>
                    <div className="flex p-1 bg-zinc-900 rounded-lg w-fit border border-zinc-800">
                        {[
                            { id: 'variables', label: 'Variables', hint: 'df_1, df_2, ... (pédagogique)' },
                            { id: 'chaining', label: 'Chaining', hint: 'df.x().y().z()' },
                            { id: 'pipe', label: '.pipe()', hint: 'fonctions nommées' },
                        ].map(s => (
                            <button
                                key={s.id}
                                onClick={() => setStyle(s.id)}
                                title={s.hint}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${style === s.id ? 'bg-purple-600/20 text-purple-400 border border-purple-600/20' : 'text-zinc-400 hover:text-white'}`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Steps list */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-purple-400" />
                            Étapes du pipeline ({steps.length})
                        </h3>
                        <button
                            onClick={() => setShowStepPicker(!showStepPicker)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Ajouter
                        </button>
                    </div>

                    {showStepPicker && (
                        <div className="grid grid-cols-2 gap-2 p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                            {STEP_ORDER.map(type => {
                                const def = STEP_TYPES[type];
                                const Icon = def.icon;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => addStep(type)}
                                        className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white text-sm transition-colors text-left"
                                    >
                                        <Icon className="w-4 h-4 text-purple-400 shrink-0" />
                                        <span className="truncate">{def.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {steps.length === 0 && !showStepPicker && (
                        <div className="text-center py-8 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
                            Aucune étape. Cliquez sur <strong>Ajouter</strong> pour commencer.
                        </div>
                    )}

                    {steps.map((step, idx) => {
                        const def = STEP_TYPES[step.type];
                        const Icon = def.icon;
                        return (
                            <div key={step.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-xs font-mono text-zinc-500 shrink-0">#{idx + 1}</span>
                                        <Icon className="w-4 h-4 text-purple-400 shrink-0" />
                                        <span className="text-sm font-medium text-white truncate">{def.label}</span>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button onClick={() => moveStep(step.id, -1)} disabled={idx === 0} className="p-1 text-zinc-500 hover:text-white disabled:opacity-30">
                                            <ArrowUp className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => moveStep(step.id, 1)} disabled={idx === steps.length - 1} className="p-1 text-zinc-500 hover:text-white disabled:opacity-30">
                                            <ArrowDown className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => removeStep(step.id)} className="p-1 text-zinc-500 hover:text-red-400">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3 pt-1">
                                    {def.render(step.config, (partial) => updateStepConfig(step.id, partial))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Code preview */}
                <div className="space-y-3 lg:sticky lg:top-4 lg:self-start">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">Code généré</h3>
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
                        <div className="relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 min-h-[200px] font-mono text-sm">
                            <SyntaxHighlighter
                                language="python"
                                style={currentTheme === 'light' ? vs : vscDarkPlus}
                                customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '0.85rem' }}
                            >
                                {generatedCode}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>

            <datalist id="pipeline-column-suggestions">
                {columns.map((col, idx) => (
                    <option key={idx} value={col.name}>{col.name} ({col.type})</option>
                ))}
            </datalist>
        </div>
    );
}
