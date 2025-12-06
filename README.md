# 📚 MemoCode

> **Votre bibliothèque personnelle de snippets de code pour la Data Science et le développement**

MemoCode est une application web interactive conçue pour centraliser, organiser et réviser vos connaissances en programmation. Elle propose des fiches de code prêtes à l'emploi avec des explications théoriques, des exemples pratiques et des visualisations.

## 🎯 Objectifs

- **Centraliser** les connaissances en Python, SQL, DAX et autres langages
- **Faciliter la révision** avec des snippets organisés par thème et niveau de difficulté
- **Visualiser les concepts** grâce aux diagrammes Mermaid et aux formules mathématiques (KaTeX)
- **Personnaliser l'apprentissage** avec système de favoris, notes personnelles et priorités

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| 📂 **Multi-langages** | Python (Pandas, ML, Visualisation), SQL, DAX, NoSQL |
| 🔍 **Recherche avancée** | Recherche par mots-clés, tags et filtres de difficulté |
| ⭐ **Favoris** | Marquez vos snippets préférés pour un accès rapide |
| 📝 **Notes personnelles** | Ajoutez vos propres annotations |
| 🎯 **Système de priorité** | Organisez par importance avec drag & drop |
| 📊 **Diagrammes Mermaid** | Visualisations de flux et concepts |
| 🧮 **Formules LaTeX** | Support des formules mathématiques avec KaTeX |
| 🌙 **Mode sombre/clair** | Interface adaptative |

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- npm ou yarn

### Étapes

```bash
# Cloner le repository
git clone https://github.com/VictorBousseau/MemoCode.git
cd MemoCode

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📦 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run deploy` | Déploie sur GitHub Pages |

## 🛠️ Technologies utilisées

- **React 19** - Framework UI
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS 4** - Styling utility-first
- **Framer Motion** - Animations fluides
- **Mermaid** - Diagrammes dynamiques
- **KaTeX** - Rendu de formules mathématiques
- **React Syntax Highlighter** - Coloration syntaxique

## 📁 Structure du projet

```
MemoCode/
├── src/
│   ├── components/     # Composants React (CodeCard, MermaidDiagram...)
│   ├── data/           # Contenu des snippets (pythonContent.js, sqlContent.js...)
│   ├── hooks/          # Custom hooks (useTheme, useStats...)
│   └── utils/          # Utilitaires
├── public/             # Assets statiques
└── dist/               # Build de production
```

## 🌐 Déploiement

L'application est déployée sur GitHub Pages :
```bash
npm run deploy
```

## 📄 Licence

Ce projet est personnel et à usage éducatif.

---

**Auteur** : Victor Bousseau  
**Lien** : [https://victorbousseau.github.io/MemoCode](https://victorbousseau.github.io/MemoCode)
