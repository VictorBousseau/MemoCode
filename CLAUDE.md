# CLAUDE.md

Ce fichier fournit des directives à Claude Code (claude.ai/code) lors de son travail sur ce dépôt.

## Vue d'ensemble du projet

MemoCode est une application web éducative en français pour parcourir, organiser et étudier des extraits de code (snippets) et des cours structurés. Elle couvre Python, SQL, Git, PySpark, DAX, Power Query (M), NoSQL/MongoDB, R et Excel. Le contenu est principalement en français.

## Commandes

- `npm run dev` — Lancer le serveur de développement (http://localhost:5173)
- `npm run build` — Construire pour la production
- `npm run preview` — Prévisualiser la version de production
- `npm run lint` — Vérification ESLint
- `npm run deploy` — Build + déploiement sur GitHub Pages

## Stack Technique

- **React 19** avec **React Router v7** (basename `/MemoCode/`)
- **Vite 7** (chemin de base `/MemoCode/` pour GitHub Pages)
- **Tailwind CSS 4** (via le plugin `@tailwindcss/vite`)
- **Supabase** — Auth, rôles, permissions (variables d'env : `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- **EmailJS** — Widget de feedback (variables d'env : `VITE_EMAILJS_*`)
- **Pyodide** — Exécution Python dans le navigateur
- **sql.js** — Exécution SQL dans le navigateur
- **Monaco Editor** — Aire de jeu pour le code (playground)
- **Mermaid** — Diagrammes (chargement par morceaux manuel dans la config Vite)
- **KaTeX** — Rendu mathématique LaTeX
- Aucun framework de test n'est configuré.

## Architecture

### Flux d'entrée

`index.html` → `src/main.jsx` (enveloppé dans `AuthProvider`) → `src/App.jsx` (React Router)

### Routage (src/App.jsx)

- `/` — Bibliothèque de snippets publique (composant `PublicApp`)
- `/login`, `/signup` — Pages d'authentification
- `/learn/*` — Zone d'apprentissage protégée (quiz, flashcards, playground, cours) enveloppée dans `LearningLayout` + `ConditionalAccess`
- `/courses/:courseId/:chapterId` — Pages de détail des cours
- `/profile` — Profil utilisateur (protégé)
- `/admin` — Tableau de bord administrateur (réservé aux admins)

Garde-fous des routes : `ProtectedRoute`, `AdminRoute`, `ConditionalAccess`.

### Gestion de l'état

- **AuthContext** (`src/context/AuthContext.jsx`) — Authentification utilisateur, rôles, RBAC via Supabase
- **NavigationContext** (`src/context/NavigationContext.jsx`) — État de la navigation entre les vues
- **Hooks personnalisés** (`src/hooks/`) — Tous utilisent localStorage pour la persistance :
  - `useFavorites`, `useHistory`, `useNotes`, `useStats`, `useUserData` — Données utilisateur
  - `useTagFilter` — Filtrage hiérarchique par tags (modes AND/OR)
  - `useTheme` — Mode sombre/clair
  - `usePyodide`, `useSqlJs` — Exécution de code dans le navigateur
  - `useQuizProgress`, `useFlashcards` — Fonctionnalités d'apprentissage

### Modèle de données du contenu

Le contenu des snippets se trouve dans les fichiers `src/data/{language}Content.js`. Structure :

```
themes[] → categories[] → snippets[]
```

Chaque snippet : `{ id, title, description, level, tags, code }`.

Le contenu des cours est dans `src/data/courses/` :
- `index.js` — Registre des cours (objet `COURSES` avec métadonnées, chapitres, parties)
- `python/chapters.js`, `python/chapters-advanced.js` — Contenu des chapitres (chaînes de caractères Markdown)
- `bayesian-networks/chapters.js`, `mongodb/chapters.js` — Autres cours
- Fichiers d'exercices dans `public/exercises/python/`

La hiérarchie des tags est définie dans `src/data/tagHierarchy.js`. Les données de quiz sont dans `src/data/quizData.js`.

### Composants clés

- `PublicApp` — Vue publique de haut niveau, gère la sélection de langue, fusionne tout le contenu pour la vue d'ensemble (overview)
- `LanguageView` — Affiche les snippets pour une langue avec recherche/filtrage/favoris/notes
- `CodeCard` — Carte de snippet individuelle (copie, favori, note, priorité par glisser-déposer)
- `CourseDetail` — Affiche les chapitres de cours en Markdown avec téléchargement d'exercices et suivi de progression
- `Layout` / `LearningLayout` — Mises en page avec `UnifiedSidebar`
- `MermaidDiagram` — Rendu de diagrammes Mermaid
- `CodePlayground` — Éditeur de code interactif avec exécution Pyodide/sql.js

### Design (Theming)

Les variables CSS pour les thèmes sombre/clair sont définies dans `src/index.css`. Bascule de thème via le hook `useTheme`.

## Configuration de l'environnement

Copiez `.env.example` vers `.env` et remplissez les identifiants Supabase et EmailJS. L'application fonctionne partiellement sans eux (navigation dans les snippets publics), mais les fonctionnalités d'authentification et de feedback nécessitent des clés valides.
