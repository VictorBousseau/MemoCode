# Prompt Claude Code — Refactoring technique MemoCode

## CONTEXTE

Tu travailles sur le projet MemoCode (React 19 + Vite 7 + Tailwind CSS 4).
Avant toute modification, lis les fichiers concernés en entier.
Travaille dans cet ordre strict — chaque étape dépend de la précédente.

Stack confirmée (package.json) :
- React 19, Vite 7, Tailwind CSS 4
- react-router-dom 7, framer-motion, dnd-kit
- Aucun framework de test installé

---

## ÉTAPE 1 — Hook `useLocalStorage` générique

### Contexte

Le pattern localStorage est dupliqué dans au minimum 10 hooks.
Exemple observé dans `useFavorites.js` :
```js
const [state, setState] = useState(() => {
    try {
        const stored = localStorage.getItem(KEY);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch { return defaultValue; }
});
useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
}, [state]);
```

### Action

Créer `src/hooks/useLocalStorage.js` :

```js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            console.warn(`useLocalStorage: impossible d'écrire la clé "${key}"`);
        }
    }, [key, value]);

    return [value, setValue];
}
```

Ensuite, **refactorer `useFavorites.js`** pour utiliser ce hook :

```js
import { useLocalStorage } from './useLocalStorage';

export const useFavorites = () => {
    const [favorites, setFavorites] = useLocalStorage('memocode_favorites', []);

    const addFavorite = (snippet) => {
        setFavorites(prev => {
            if (prev.some(fav => fav.id === snippet.id)) return prev;
            return [...prev, snippet];
        });
    };

    const removeFavorite = (snippetId) => {
        setFavorites(prev => prev.filter(fav => fav.id !== snippetId));
    };

    const isFavorite = (snippetId) => favorites.some(fav => fav.id === snippetId);

    const toggleFavorite = (snippet) => {
        isFavorite(snippet.id) ? removeFavorite(snippet.id) : addFavorite(snippet);
    };

    return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};
```

Appliquer le même refactoring à **tous les autres hooks** qui utilisent le pattern
localStorage manuellement (useHistory, useNotes, useUserData, useStats, etc.).
Lire chaque hook avant de le modifier.

---

## ÉTAPE 2 — Découpage de `LanguageView.jsx` (765 lignes)

### Contexte observé dans le fichier

`LanguageView.jsx` fait 3 choses distinctes :
1. **Logique de filtrage/recherche** — `getFilteredSnippets()`, `hasActiveFilters`, tag filtering
2. **Vue recherche** — rendu conditionnel quand `searchQuery` est actif (lignes ~329-394)
3. **Vue normale** — tabs thèmes, sidebar catégories, grille snippets, favoris, historique (lignes ~397-765)

### Action : extraire 3 composants

**A) `src/components/SnippetSearchResults.jsx`**

Extraire le bloc JSX retourné quand `searchQuery || hasActiveFilters` est vrai (lignes ~329-394).
Props : `{ searchResults, searchQuery, filters, showFilters, setShowFilters, setFilters,
           availableTags, language, isFavorite, toggleFavorite, addToHistory,
           getNote, setNote, getPriority, setPriority, handleTagClick }`

```jsx
// src/components/SnippetSearchResults.jsx
import React from 'react';
import { Filter } from 'lucide-react';
import CodeCard from './CodeCard';
import FilterPanel from './FilterPanel';

export default function SnippetSearchResults({
    searchResults, searchQuery, filters, showFilters,
    setShowFilters, setFilters, availableTags, language,
    isFavorite, toggleFavorite, addToHistory,
    getNote, setNote, getPriority, setPriority, handleTagClick
}) {
    // Déplacer ici tout le JSX du bloc searchQuery || hasActiveFilters
}
```

**B) `src/components/SnippetGrid.jsx`**

Extraire le rendu de la grille de snippets avec DnD (mode grid, lignes ~600-690).
Props : `{ sortedSnippets, language, activeTheme, activeCategory, hasTagFilters,
           sortBy, setSortBy, sensors, handleDragEnd,
           isFavorite, toggleFavorite, addToHistory,
           getNote, setNote, getPriority, setPriority }`

**C) `src/components/ThemeSidebar.jsx`**

Extraire la sidebar gauche (catégories, lignes ~450-474).
Props : `{ activeTheme, activeCategoryId, setActiveCategoryId }`

```jsx
// src/components/ThemeSidebar.jsx
export default function ThemeSidebar({ activeTheme, activeCategoryId, setActiveCategoryId }) {
    // La div className="w-64 flex-shrink-0 sticky top-8..."
}
```

### Ce qui reste dans `LanguageView.jsx` après découpage

- Tous les hooks et états (useFavorites, useHistory, useNotes, useTagFilter, etc.)
- La logique de tri (`sortedSnippets` useMemo, `handleDragEnd`)
- La logique de détection de langage
- Le retour conditionnel qui utilise les 3 nouveaux composants
- Cible : **< 300 lignes**

---

## ÉTAPE 3 — Découpage de `CourseDetail.jsx` (518 lignes)

### Contexte observé dans le fichier

`CourseDetail.jsx` contient :
1. **`EXERCISE_FILES`** — objet statique de 60+ entrées (lignes 20-79) : données pures, pas de logique
2. **`CourseSidebar`** — la `<aside>` complète avec progression + liste chapitres (lignes 148-311)
3. **`MarkdownRenderer`** — le `<ReactMarkdown>` avec tous ses `components` (lignes 356-421) — **dupliqué** dans d'autres composants selon le rapport

### Action : extraire 3 éléments

**A) `src/data/exerciseFiles.js`**

Déplacer l'objet `EXERCISE_FILES` et la fonction `getExerciseFolder` hors du composant :

```js
// src/data/exerciseFiles.js
export const EXERCISE_FILES = {
    '01-variables': { exercice: '01-variables-exercice.py', solution: '01-variables-solution.py' },
    // ... toutes les entrées existantes
};

export const getExerciseFolder = (courseId) => {
    if (courseId === 'data-engineering') return 'data-engineering';
    return 'python';
};
```

**B) `src/components/CourseSidebar.jsx`**

Extraire la `<aside>` complète (lignes 148-311).
Props : `{ course, courseId, currentChapterId, completedChapters, sidebarOpen }`

```jsx
// src/components/CourseSidebar.jsx
export default function CourseSidebar({ course, courseId, currentChapterId, completedChapters, sidebarOpen }) {
    // Tout le contenu de <aside>...</aside>
}
```

**C) `src/components/MarkdownRenderer.jsx`**

Extraire le `<ReactMarkdown>` avec ses composants personnalisés (code, table, th, td, blockquote).
Ce composant est probablement dupliqué ailleurs — le créer une seule fois ici et l'importer partout.
Props : `{ children }` (le contenu markdown en string)

```jsx
// src/components/MarkdownRenderer.jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownRenderer({ children }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }) { /* ... */ },
                table({ children }) { /* ... */ },
                th({ children }) { /* ... */ },
                td({ children }) { /* ... */ },
                blockquote({ children }) { /* ... */ },
            }}
        >
            {children}
        </ReactMarkdown>
    );
}
```

Chercher dans tout le projet les autres endroits où ReactMarkdown est utilisé avec
des composants similaires et **remplacer par `<MarkdownRenderer>`**.

### Ce qui reste dans `CourseDetail.jsx` après découpage

- Les imports
- `getChapterContent()` switch function (lignes 88-100)
- Le composant principal avec ses états (sidebarOpen, completedChapters)
- `markCompleted()`
- Le JSX assemblant CourseSidebar + main content avec MarkdownRenderer
- Cible : **< 200 lignes**

---

## ÉTAPE 4 — React.memo sur les composants feuilles

### Contexte

Aucun composant n'utilise `React.memo`. Les listes de 100+ snippets re-rendent
entièrement à chaque interaction (toggle favori, changement de note, etc.).

### Action

Après le découpage des étapes 2 et 3, appliquer `React.memo` sur ces composants :

**Composants à memoïser (priorité haute) :**

```jsx
// CodeCard — rendu des snippets individuels, le plus critique
export default React.memo(function CodeCard({ snippet, language, isFavorite, ... }) {
    // composant existant inchangé
});
```

```jsx
// ThemeSidebar — nouveau composant créé à l'étape 2
export default React.memo(function ThemeSidebar({ ... }) { ... });
```

```jsx
// CourseSidebar — nouveau composant créé à l'étape 3
export default React.memo(function CourseSidebar({ ... }) { ... });
```

```jsx
// MarkdownRenderer — nouveau composant créé à l'étape 3
export default React.memo(function MarkdownRenderer({ children }) { ... });
```

**Règle :** ne pas memoïser les composants pages (LanguageView, CourseDetail) ni
les composants qui reçoivent des fonctions inline non memoïsées comme props —
ça n'apporterait rien sans `useCallback` sur les handlers.

**À NE PAS faire à cette étape :** ajouter useCallback/useMemo partout.
Uniquement React.memo sur les composants feuilles listés ci-dessus.

---

## ÉTAPE 5 — Error Boundary global

### Action

Créer `src/components/ErrorBoundary.jsx` :

```jsx
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
        // En dev : afficher dans la console
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught:', error, info);
        }
        // En prod : ici on pourrait envoyer à un service de monitoring
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
```

Ensuite, **wrapper les zones critiques dans `App.jsx`** (ou le composant racine) :

```jsx
import ErrorBoundary from './components/ErrorBoundary';

// Wrapper les routes principales — pas l'app entière
// (pour ne pas perdre la navbar si une seule page crash)
<ErrorBoundary>
    <LanguageView ... />
</ErrorBoundary>

<ErrorBoundary>
    <CourseDetail />
</ErrorBoundary>
```

Lire `App.jsx` avant de placer les boundaries — les mettre au niveau des routes,
pas au niveau des composants individuels.

---

## ÉTAPE 6 — Tests (Vitest + React Testing Library)

### Installation

```bash
npm install --save-dev vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Mettre à jour `vite.config.js` pour ajouter la config Vitest :

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.js'],
    },
})
```

Créer `src/test/setup.js` :

```js
import '@testing-library/jest-dom';
```

Ajouter dans `package.json` scripts :

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:run": "vitest run"
```

### Tests à écrire — priorité haute

**A) `src/hooks/useLocalStorage.test.js`**

```js
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] ?? null,
        setItem: (key, value) => { store[key] = value; },
        clear: () => { store = {}; },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => localStorageMock.clear());

describe('useLocalStorage', () => {
    test('retourne la valeur par défaut si rien en storage', () => {
        const { result } = renderHook(() => useLocalStorage('test_key', []));
        expect(result.current[0]).toEqual([]);
    });

    test('charge la valeur existante depuis localStorage', () => {
        localStorageMock.setItem('test_key', JSON.stringify(['a', 'b']));
        const { result } = renderHook(() => useLocalStorage('test_key', []));
        expect(result.current[0]).toEqual(['a', 'b']);
    });

    test('persiste la nouvelle valeur dans localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('test_key', []));
        act(() => result.current[1](['x']));
        expect(JSON.parse(localStorageMock.getItem('test_key'))).toEqual(['x']);
    });

    test('retourne la valeur par défaut si localStorage est corrompu', () => {
        localStorageMock.setItem('test_key', 'json invalide {{');
        const { result } = renderHook(() => useLocalStorage('test_key', 'default'));
        expect(result.current[0]).toBe('default');
    });
});
```

**B) `src/hooks/useFavorites.test.js`**

```js
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../hooks/useFavorites';

const mockSnippet = { id: 'snippet_123', title: 'Test', code: 'print()' };
const mockSnippet2 = { id: 'snippet_456', title: 'Test 2', code: 'pass' };

// Même mock localStorage que ci-dessus
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] ?? null,
        setItem: (key, value) => { store[key] = value; },
        clear: () => { store = {}; },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => localStorageMock.clear());

describe('useFavorites', () => {
    test('démarre avec une liste vide', () => {
        const { result } = renderHook(() => useFavorites());
        expect(result.current.favorites).toEqual([]);
    });

    test('addFavorite ajoute un snippet', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        expect(result.current.favorites).toHaveLength(1);
        expect(result.current.favorites[0].id).toBe('snippet_123');
    });

    test('addFavorite ne duplique pas un favori existant', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        act(() => result.current.addFavorite(mockSnippet));
        expect(result.current.favorites).toHaveLength(1);
    });

    test('removeFavorite supprime le bon snippet', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        act(() => result.current.addFavorite(mockSnippet2));
        act(() => result.current.removeFavorite('snippet_123'));
        expect(result.current.favorites).toHaveLength(1);
        expect(result.current.favorites[0].id).toBe('snippet_456');
    });

    test('isFavorite retourne true pour un favori', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        expect(result.current.isFavorite('snippet_123')).toBe(true);
        expect(result.current.isFavorite('snippet_456')).toBe(false);
    });

    test('toggleFavorite ajoute si absent, retire si présent', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.toggleFavorite(mockSnippet));
        expect(result.current.isFavorite('snippet_123')).toBe(true);
        act(() => result.current.toggleFavorite(mockSnippet));
        expect(result.current.isFavorite('snippet_123')).toBe(false);
    });

    test('persiste les favoris dans localStorage', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        const stored = JSON.parse(localStorageMock.getItem('memocode_favorites'));
        expect(stored).toHaveLength(1);
        expect(stored[0].id).toBe('snippet_123');
    });
});
```

**C) `src/components/ErrorBoundary.test.jsx`**

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

// Composant qui crash volontairement
function CrashingComponent({ shouldCrash }) {
    if (shouldCrash) throw new Error('Test error');
    return <div>Contenu normal</div>;
}

// Supprimer les erreurs console attendues dans les tests
beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe('ErrorBoundary', () => {
    test('affiche les enfants normalement sans erreur', () => {
        render(
            <ErrorBoundary>
                <CrashingComponent shouldCrash={false} />
            </ErrorBoundary>
        );
        expect(screen.getByText('Contenu normal')).toBeInTheDocument();
    });

    test('affiche le fallback quand un enfant crash', () => {
        render(
            <ErrorBoundary>
                <CrashingComponent shouldCrash={true} />
            </ErrorBoundary>
        );
        expect(screen.getByText('Quelque chose s\'est mal passé')).toBeInTheDocument();
    });

    test('le bouton Réessayer reset l\'état d\'erreur', () => {
        const { rerender } = render(
            <ErrorBoundary>
                <CrashingComponent shouldCrash={true} />
            </ErrorBoundary>
        );
        fireEvent.click(screen.getByText('Réessayer'));
        rerender(
            <ErrorBoundary>
                <CrashingComponent shouldCrash={false} />
            </ErrorBoundary>
        );
        expect(screen.getByText('Contenu normal')).toBeInTheDocument();
    });
});
```

---

## ÉTAPE 7 — PWA (vite-plugin-pwa)

### Installation

```bash
npm install --save-dev vite-plugin-pwa
```

### Configuration dans `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                // Mettre en cache tous les assets statiques (JS, CSS, images)
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                // Ne PAS mettre en cache Pyodide (50+ MB) ni sql.js
                globIgnores: ['**/pyodide/**', '**/sql.js/**'],
                // Stratégie : Cache First pour les assets, Network First pour les pages
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/victorbousseau\.github\.io\/MemoCode\/.*/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'pages-cache',
                            expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 }
                        }
                    }
                ]
            },
            manifest: {
                name: 'MemoCode',
                short_name: 'MemoCode',
                description: 'Référence de snippets pour Data Analysts',
                theme_color: '#18181b',
                background_color: '#09090b',
                display: 'standalone',
                icons: [
                    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
                    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
                ]
            }
        })
    ],
    // Garder la config test de l'étape 6 si déjà ajoutée
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.js'],
    },
})
```

Créer deux icônes PNG dans `public/` : `icon-192.png` et `icon-512.png`.
Si elles n'existent pas, générer des placeholders via canvas ou copier l'icône existante.

---

## RÉSUMÉ ET ORDRE D'EXÉCUTION

| Étape | Action | Fichiers créés / modifiés | Priorité |
|-------|--------|--------------------------|----------|
| 1 | Hook useLocalStorage + refactoring tous les hooks | `src/hooks/useLocalStorage.js`, tous les hooks existants | 🔴 Critique |
| 2 | Découpage LanguageView | `SnippetSearchResults.jsx`, `SnippetGrid.jsx`, `ThemeSidebar.jsx`, `LanguageView.jsx` | 🔴 Critique |
| 3 | Découpage CourseDetail | `exerciseFiles.js`, `CourseSidebar.jsx`, `MarkdownRenderer.jsx`, `CourseDetail.jsx` | 🔴 Critique |
| 4 | React.memo | `CodeCard.jsx`, `ThemeSidebar.jsx`, `CourseSidebar.jsx`, `MarkdownRenderer.jsx` | 🟡 Haute |
| 5 | Error Boundary | `ErrorBoundary.jsx`, `App.jsx` | 🟡 Haute |
| 6 | Tests Vitest | `vite.config.js`, `package.json`, 3 fichiers de test | 🟡 Haute |
| 7 | PWA | `vite.config.js`, `public/icon-*.png` | 🟢 Normale |

## CONTRAINTES ABSOLUES

1. **Lire chaque fichier avant de le modifier** — ne jamais supposer le contenu
2. **Ne pas changer le comportement** — refactoring pur, zéro régression fonctionnelle
3. **Vérifier les imports** après chaque extraction de composant — pas de import cassé
4. **Tester le build** (`npm run build`) après les étapes 2 et 3 pour détecter les erreurs
5. **Ne pas modifier le contenu** (iaContent.js, pythonContent.js, etc.)
6. **Ne pas introduire TypeScript** — rester en JS/JSX
