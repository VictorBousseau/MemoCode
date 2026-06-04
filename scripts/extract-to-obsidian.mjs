#!/usr/bin/env node
// Extrait les snippets de src/data/<lang>Content.js vers le coffre Obsidian
// Usage : node scripts/extract-to-obsidian.mjs python [autres langages...]
// Sans args : extrait tous les langages connus.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OBSIDIAN_ROOT = path.resolve(
    PROJECT_ROOT,
    '..',
    'MON IA',
    'SecondBrain',
    '10_Projets',
    'memocode'
);

// Mapping : clé sidebar dans App.jsx → (fichier source, slug coffre, langage Monaco/mdcode)
const LANGUAGES = {
    python: { src: 'pythonContent.js', dir: 'python', mdLang: 'python', tag: 'python' },
    sql: { src: 'sqlContent.js', dir: 'sql', mdLang: 'sql', tag: 'sql' },
    git: { src: 'gitContent.js', dir: 'git', mdLang: 'bash', tag: 'git' },
    pyspark: { src: 'pysparkContent.js', dir: 'pyspark', mdLang: 'python', tag: 'pyspark' },
    dax: { src: 'daxContent.js', dir: 'dax', mdLang: 'dax', tag: 'dax' },
    m: { src: 'mContent.js', dir: 'm-query', mdLang: 'powerquery', tag: 'm-query' },
    nosql: { src: 'nosqlContent.js', dir: 'nosql', mdLang: 'javascript', tag: 'nosql' },
    r: { src: 'rContent.js', dir: 'r', mdLang: 'r', tag: 'r' },
    excel: { src: 'excelContent.js', dir: 'excel', mdLang: 'excel', tag: 'excel' },
};

const TODAY = new Date().toISOString().slice(0, 10);

const slugify = (s) =>
    String(s || '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);

const levelToDifficulty = (level) => {
    const map = {
        beginner: 'debutant',
        intermediate: 'intermediaire',
        advanced: 'avance',
        expert: 'expert',
    };
    return map[level] || level || 'intermediaire';
};

const renderFrontmatter = (obj) => {
    const lines = ['---'];
    for (const [k, v] of Object.entries(obj)) {
        if (v === undefined || v === null) continue;
        if (Array.isArray(v)) {
            lines.push(`${k}: [${v.map((x) => JSON.stringify(x)).join(', ')}]`);
        } else if (typeof v === 'boolean' || typeof v === 'number') {
            lines.push(`${k}: ${v}`);
        } else {
            const s = String(v);
            lines.push(/[:#]/.test(s) ? `${k}: "${s.replace(/"/g, '\\"')}"` : `${k}: ${s}`);
        }
    }
    lines.push('---');
    return lines.join('\n');
};

const renderBody = ({ snippet, theme, category, lang }) => {
    const lines = [];
    lines.push(`# ${snippet.title}`);
    lines.push('');
    if (snippet.description) {
        lines.push(snippet.description);
        lines.push('');
    }

    // Cas 1 : multi-cellules (markdown + code alternés)
    if (Array.isArray(snippet.cells) && snippet.cells.length > 0) {
        snippet.cells.forEach((cell, i) => {
            if (cell.title) {
                lines.push(`## ${cell.title}`);
                lines.push('');
            } else if (snippet.cells.length > 1) {
                lines.push(`## Étape ${i + 1}`);
                lines.push('');
            }
            if (cell.markdown) {
                lines.push(cell.markdown.trim());
                lines.push('');
            }
            if (cell.code) {
                lines.push('```' + (cell.language || lang.mdLang));
                lines.push(cell.code.trimEnd());
                lines.push('```');
                lines.push('');
            }
        });
    } else if (snippet.code) {
        // Cas 2 : un seul bloc de code
        lines.push('## Code');
        lines.push('');
        lines.push('```' + lang.mdLang);
        lines.push(snippet.code.trimEnd());
        lines.push('```');
        lines.push('');
    } else if (snippet.markdown) {
        // Cas 3 : markdown pur (cheat sheet, concept)
        lines.push(snippet.markdown.trim());
        lines.push('');
    }

    lines.push('---');
    lines.push(
        `> Source : \`src/data/${lang.src}\` → thème \`${theme.id}\` → catégorie \`${category.id}\` → snippet \`${snippet.id}\``
    );
    return lines.join('\n');
};

const ensureDir = async (dir) => {
    await fs.mkdir(dir, { recursive: true });
};

const writeSnippet = async ({ snippet, theme, category, lang, outDir }) => {
    const themeDir = path.join(outDir, slugify(theme.id));
    await ensureDir(themeDir);

    const fname = `${slugify(category.id)}-${slugify(snippet.id)}.md`;
    const fpath = path.join(themeDir, fname);

    const hasExecutable = Boolean(snippet.code || (snippet.cells && snippet.cells.some((c) => c.code)));
    const fm = renderFrontmatter({
        type: 'snippet',
        tags: ['snippet', lang.tag, slugify(theme.id), ...(snippet.tags || [])],
        language: lang.tag,
        created: TODAY,
        project: 'memocode',
        extension: hasExecutable,
        difficulty: levelToDifficulty(snippet.level),
        source_id: `${theme.id}/${category.id}/${snippet.id}`,
        theme: theme.title,
        category: category.title,
    });
    const body = renderBody({ snippet, theme, category, lang });
    await fs.writeFile(fpath, `${fm}\n\n${body}\n`, 'utf8');
    return fpath;
};

const writeLangIndex = async ({ langKey, lang, content, outDir, stats }) => {
    const lines = [];
    lines.push('---');
    lines.push('type: meta');
    lines.push(`tags: [index, memocode, ${lang.tag}]`);
    lines.push(`created: ${TODAY}`);
    lines.push(`updated: ${TODAY}`);
    lines.push('project: memocode');
    lines.push(`language: ${lang.tag}`);
    lines.push('---');
    lines.push('');
    lines.push(`# 📇 Index — ${langKey[0].toUpperCase() + langKey.slice(1)}`);
    lines.push('');
    lines.push(
        `> Source : \`src/data/${lang.src}\` — ${stats.total} snippets répartis sur ${content.themes.length} thèmes.`
    );
    lines.push('');
    lines.push(`> Index généré le ${TODAY} par \`scripts/extract-to-obsidian.mjs\`. **Ne pas éditer à la main** — les modifications seront écrasées au prochain extract.`);
    lines.push('');

    for (const theme of content.themes) {
        const totalSnippets = theme.categories.reduce(
            (sum, cat) => sum + cat.snippets.length,
            0
        );
        lines.push(`## ${theme.title} (${totalSnippets})`);
        lines.push('');
        if (theme.description) {
            lines.push(`_${theme.description}_`);
            lines.push('');
        }
        for (const cat of theme.categories) {
            lines.push(`### ${cat.title}`);
            lines.push('');
            for (const s of cat.snippets) {
                const fname = `${slugify(cat.id)}-${slugify(s.id)}`;
                const tagDiff = s.level ? ` _(${levelToDifficulty(s.level)})_` : '';
                const desc = s.description ? ` — ${s.description}` : '';
                lines.push(`- [[${slugify(theme.id)}/${fname}|${s.title}]]${tagDiff}${desc}`);
            }
            lines.push('');
        }
    }

    await fs.writeFile(path.join(outDir, '_index.md'), lines.join('\n'), 'utf8');
};

const extractLanguage = async (langKey) => {
    const lang = LANGUAGES[langKey];
    if (!lang) {
        console.error(`❌ Langage inconnu : ${langKey}`);
        return;
    }
    const srcPath = path.join(PROJECT_ROOT, 'src', 'data', lang.src);
    let mod;
    try {
        const url = 'file:///' + srcPath.replace(/\\/g, '/');
        mod = await import(url);
    } catch (e) {
        console.error(`❌ Impossible d'importer ${srcPath} :`, e.message);
        return;
    }
    // Trouver l'export (pythonContent, sqlContent, ...)
    const contentKey = Object.keys(mod).find((k) => k.endsWith('Content'));
    if (!contentKey) {
        console.error(`❌ Pas d'export *Content dans ${srcPath}`);
        return;
    }
    const content = mod[contentKey];
    if (!content?.themes) {
        console.error(`❌ Structure inattendue dans ${srcPath}`);
        return;
    }

    const outDir = path.join(OBSIDIAN_ROOT, lang.dir);
    await ensureDir(outDir);

    const stats = { total: 0, withCode: 0, withCells: 0, markdownOnly: 0 };
    for (const theme of content.themes) {
        for (const cat of theme.categories) {
            for (const snippet of cat.snippets) {
                await writeSnippet({ snippet, theme, category: cat, lang, outDir });
                stats.total++;
                if (snippet.code) stats.withCode++;
                else if (snippet.cells) stats.withCells++;
                else stats.markdownOnly++;
            }
        }
    }

    await writeLangIndex({ langKey, lang, content, outDir, stats });

    console.log(
        `✅ ${langKey} : ${stats.total} snippets (code=${stats.withCode}, cells=${stats.withCells}, md=${stats.markdownOnly}) → ${path.relative(PROJECT_ROOT, outDir)}`
    );
};

const main = async () => {
    const args = process.argv.slice(2);
    const targets = args.length > 0 ? args : Object.keys(LANGUAGES);
    for (const t of targets) {
        await extractLanguage(t);
    }
};

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
