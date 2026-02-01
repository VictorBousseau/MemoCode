---
description: Vérifier et tester la structure globale des cours
---

# Workflow de vérification complète des cours

Ce workflow vérifie la qualité, la cohérence et l'intégrité complète des cours dans l'application MemoCode :
- ✅ Structure des données et métadonnées
- ✅ Contenu markdown des chapitres (explications)
- ✅ Exemples de code dans les explications
- ✅ Exercices et solutions (fichiers .py)
- ✅ Téléchargeabilité des fichiers

---

## 1. Vérification de la structure des données

### 1.1 Vérifier l'index principal des cours
```bash
cat src/data/courses/index.js
```

**Points à vérifier :**
- Tous les cours sont bien définis dans l'objet `COURSES`
- Chaque cours a les propriétés requises : `id`, `title`, `description`, `icon`, `color`, `duration`, `level`, `parts`, `chapters`
- Les IDs des parties (`parts`) correspondent aux modules listés dans `modules`
- Chaque chapitre a : `id`, `title`, `duration`, `part`
- Les `part` des chapitres correspondent aux titres définis dans `parts`

### 1.2 Vérifier les fichiers de chapitres pour chaque cours
```bash
# Python
ls src/data/courses/python/

# Bayesian
ls src/data/courses/bayesian/

# MongoDB
ls src/data/courses/mongodb/
```

**Points à vérifier :**
- Chaque cours a un fichier `chapters.js` ou équivalent
- Les cours avec beaucoup de contenu ont des fichiers séparés (ex: `chapters-advanced.js`)

---

## 2. Vérification de l'intégrité des chapitres

### 2.1 Vérifier que tous les chapitres déclarés existent

**Script de vérification :**
```bash
node -e "
const { COURSES } = require('./src/data/courses/index.js');

Object.entries(COURSES).forEach(([courseId, course]) => {
  console.log(\`\\n📚 Vérification du cours: \${course.title}\`);
  console.log(\`   Total chapitres déclarés: \${course.chapters.length}\`);
  
  const declaredModules = new Set();
  course.parts.forEach(part => {
    part.modules.forEach(mod => declaredModules.add(mod));
  });
  
  const chapterIds = course.chapters.map(ch => ch.id.split('-')[0]);
  const missingModules = [];
  
  chapterIds.forEach(id => {
    if (!declaredModules.has(id)) {
      missingModules.push(id);
    }
  });
  
  if (missingModules.length > 0) {
    console.log(\`   ⚠️  Modules manquants dans parts: \${missingModules.join(', ')}\`);
  } else {
    console.log(\`   ✅ Tous les modules sont déclarés\`);
  }
  
  const unusedParts = [];
  course.chapters.forEach(ch => {
    const fullPartTitle = course.parts.find(p => p.title.includes(ch.part))?.title;
    if (!fullPartTitle) {
      unusedParts.push(ch.part);
    }
  });
  
  if (unusedParts.length > 0) {
    console.log(\`   ⚠️  Parties non trouvées: \${[...new Set(unusedParts)].join(', ')}\`);
  } else {
    console.log(\`   ✅ Toutes les parties sont valides\`);
  }
});
console.log('\\n✨ Vérification terminée\\n');
"
```

### 2.2 Vérifier l'export des fichiers de chapitres

**Python :**
```bash
node -e "
try {
  const chapters = require('./src/data/courses/python/chapters.js');
  const advanced = require('./src/data/courses/python/chapters-advanced.js');
  console.log('✅ Python - chapters.js: ' + Object.keys(chapters).length + ' exports');
  console.log('✅ Python - chapters-advanced.js: ' + Object.keys(advanced).length + ' exports');
} catch(e) {
  console.error('❌ Erreur Python:', e.message);
}
"
```

**Bayesian :**
```bash
node -e "
try {
  const chapters = require('./src/data/courses/bayesian/chapters.js');
  console.log('✅ Bayesian - chapters.js: ' + Object.keys(chapters).length + ' exports');
} catch(e) {
  console.error('❌ Erreur Bayesian:', e.message);
}
"
```

**MongoDB :**
```bash
node -e "
try {
  const chapters = require('./src/data/courses/mongodb/chapters.js');
  console.log('✅ MongoDB - chapters.js: ' + Object.keys(chapters).length + ' exports');
} catch(e) {
  console.error('❌ Erreur MongoDB:', e.message);
}
"
```

---

## 3. Vérification du CONTENU des chapitres (Markdown + Code)

### 3.1 Vérifier que chaque chapitre a du contenu markdown

**Script de vérification approfondie :**
```bash
node -e "
const { COURSES } = require('./src/data/courses/index.js');

const getPythonContent = (id) => {
  try {
    const ch = require('./src/data/courses/python/chapters.js');
    const adv = require('./src/data/courses/python/chapters-advanced.js');
    return ch.pythonChapters?.[id] || adv.pythonChaptersAdvanced?.[id] || null;
  } catch { return null; }
};

const getBayesianContent = (id) => {
  try {
    const ch = require('./src/data/courses/bayesian/chapters.js');
    return ch.bayesianChapters?.[id] || null;
  } catch { return null; }
};

const getMongodbContent = (id) => {
  try {
    const ch = require('./src/data/courses/mongodb/chapters.js');
    return ch.mongodbChapters?.[id] || null;
  } catch { return null; }
};

const getContentFunction = {
  'python': getPythonContent,
  'bayesian': getBayesianContent,
  'mongodb': getMongodbContent
};

let totalChapters = 0;
let chaptersWithContent = 0;
let chaptersWithoutContent = [];

Object.entries(COURSES).forEach(([courseId, course]) => {
  console.log(\`\\n📚 \${course.title}\`);
  console.log('='.repeat(50));
  
  const getContent = getContentFunction[courseId];
  
  course.chapters.forEach((chapter) => {
    totalChapters++;
    const content = getContent(chapter.id);
    
    if (!content || content.trim().length === 0) {
      console.log(\`  ❌ \${chapter.id}: VIDE ou MANQUANT\`);
      chaptersWithoutContent.push(\`\${courseId}/\${chapter.id}\`);
    } else {
      const minLength = 500;
      if (content.length < minLength) {
        console.log(\`  ⚠️  \${chapter.id}: Contenu court (\${content.length} chars)\`);
      } else {
        console.log(\`  ✅ \${chapter.id}: \${content.length} caractères\`);
        chaptersWithContent++;
      }
    }
  });
});

console.log(\`\\n📊 RÉSUMÉ:\`);
console.log(\`   Total chapitres: \${totalChapters}\`);
console.log(\`   Avec contenu complet: \${chaptersWithContent}\`);
console.log(\`   Sans contenu: \${chaptersWithoutContent.length}\`);
if (chaptersWithoutContent.length > 0) {
  console.log(\`\\n⚠️  Chapitres sans contenu:\`);
  chaptersWithoutContent.forEach(ch => console.log(\`     - \${ch}\`));
}
"
```

### 3.2 Vérifier les EXEMPLES DE CODE dans le contenu

Les chapitres doivent contenir des exemples de code (blocs \`\`\`code\`\`\`).

**Script de vérification :**
```bash
node -e "
const { COURSES } = require('./src/data/courses/index.js');

const getPythonContent = (id) => {
  try {
    const ch = require('./src/data/courses/python/chapters.js');
    const adv = require('./src/data/courses/python/chapters-advanced.js');
    return ch.pythonChapters?.[id] || adv.pythonChaptersAdvanced?.[id] || null;
  } catch { return null; }
};

const getBayesianContent = (id) => {
  try {
    const ch = require('./src/data/courses/bayesian/chapters.js');
    return ch.bayesianChapters?.[id] || null;
  } catch { return null; }
};

const getMongodbContent = (id) => {
  try {
    const ch = require('./src/data/courses/mongodb/chapters.js');
    return ch.mongodbChapters?.[id] || null;
  } catch { return null; }
};

const getContentFunction = {
  'python': getPythonContent,
  'bayesian': getBayesianContent,
  'mongodb': getMongodbContent
};

console.log('\\n🔍 Vérification des exemples de CODE dans les chapitres\\n');

Object.entries(COURSES).forEach(([courseId, course]) => {
  console.log(\`\\n📚 \${course.title}\`);
  console.log('='.repeat(50));
  
  const getContent = getContentFunction[courseId];
  
  course.chapters.forEach((chapter) => {
    const content = getContent(chapter.id);
    
    if (content) {
      const codeBlocks = (content.match(/\\\`\\\`\\\`/g) || []).length / 2;
      const inlineCode = (content.match(/\\\`[^\\\`]+\\\`/g) || []).length;
      
      if (codeBlocks === 0) {
        console.log(\`  ⚠️  \${chapter.id}: AUCUN bloc de code\`);
      } else {
        console.log(\`  ✅ \${chapter.id}: \${codeBlocks} blocs de code, \${inlineCode} code inline\`);
      }
    }
  });
});
"
```

### 3.3 Vérifier la qualité du formatage Markdown

**Points à vérifier manuellement (ouvrir quelques chapitres) :**
- Les titres (# ## ###) sont bien hiérarchisés
- Les listes à puces ou numérotées sont correctes
- Les tableaux markdown sont bien formés
- Les blockquotes (>) sont utilisés pour les notes importantes
- Pas de HTML inutile dans le markdown

---

## 4. Vérification des EXERCICES et SOLUTIONS

### 4.1 Lister tous les fichiers d'exercices et solutions
```bash
ls public/exercises/python/
```

**Points à vérifier :**
- Pour chaque module, il y a 2 fichiers : `XX-nom-exercice.py` et `XX-nom-solution.py`

### 4.2 Vérifier la correspondance exercices ↔ solutions

**Script de vérification :**
```bash
node -e "
const fs = require('fs');
const path = require('path');

console.log('\\n📝 Vérification Exercices ↔ Solutions\\n');

const exercisesDir = path.join(process.cwd(), 'public', 'exercises', 'python');
const files = fs.readdirSync(exercisesDir);

const modules = new Map();
files.forEach(file => {
  const match = file.match(/^(\\d+)-([\\w-]+)-(exercice|solution)\\.py\$/);
  if (match) {
    const [, num, name, type] = match;
    const moduleId = \`\${num}-\${name}\`;
    if (!modules.has(moduleId)) {
      modules.set(moduleId, { exercice: false, solution: false });
    }
    modules.get(moduleId)[type] = true;
  }
});

console.log(\`Total modules avec fichiers: \${modules.size}\\n\`);

let complete = 0;
let incomplete = 0;

modules.forEach((files, moduleId) => {
  if (files.exercice && files.solution) {
    console.log(\`  ✅ \${moduleId}: Exercice + Solution\`);
    complete++;
  } else if (files.exercice && !files.solution) {
    console.log(\`  ⚠️  \${moduleId}: Exercice UNIQUEMENT (manque solution)\`);
    incomplete++;
  } else if (!files.exercice && files.solution) {
    console.log(\`  ⚠️  \${moduleId}: Solution UNIQUEMENT (manque exercice)\`);
    incomplete++;
  }
});

console.log(\`\\n📊 Résumé:\`);
console.log(\`   Modules complets: \${complete}\`);
console.log(\`   Modules incomplets: \${incomplete}\`);
"
```

### 4.3 Vérifier la SYNTAXE Python des exercices

**Test automatique de syntaxe :**
```bash
# Vérifier la syntaxe de tous les fichiers Python
python -m py_compile public/exercises/python/*.py
```

Si aucune erreur n'apparaît, tous les fichiers sont syntaxiquement corrects.

### 4.4 Vérifier la qualité des exercices (TODO, longueur)

**Script de vérification :**
```bash
node -e "
const fs = require('fs');
const path = require('path');

const exercisesDir = path.join(process.cwd(), 'public', 'exercises', 'python');
const files = fs.readdirSync(exercisesDir).filter(f => f.endsWith('-exercice.py'));

console.log('\\n📏 Vérification de la qualité des exercices\\n');

files.forEach(file => {
  const filepath = path.join(exercisesDir, file);
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split('\\n').length;
  const todoCount = (content.match(/TODO/g) || []).length;
  
  console.log(\`  📄 \${file}:\`);
  console.log(\`     - \${lines} lignes\`);
  console.log(\`     - \${todoCount} TODO\`);
  
  if (lines < 20) {
    console.log(\`     ⚠️  Fichier très court\`);
  }
  if (todoCount === 0) {
    console.log(\`     ⚠️  Aucun TODO trouvé\`);
  }
});
"
```

---

## 5. Vérification de la TÉLÉCHARGEABILITÉ

### 5.1 Vérifier la configuration dans CourseDetail.jsx

**Vérifier que :**
```bash
cat src/components/CourseDetail.jsx | grep -A 20 "EXERCISE_FILES"
```

**Points à vérifier :**
- La constante `EXERCISE_FILES` contient tous les modules avec exercices
- Les chemins vers les fichiers sont corrects (`public/exercises/python/...`)
- Les boutons de téléchargement ont l'attribut `download`

### 5.2 Vérifier l'accessibilité des fichiers

**Test d'accès :**
```bash
# Vérifier que le dossier public/exercises existe
ls -la public/exercises/python/ | head -n 10
```

**Points à vérifier :**
- Les fichiers sont bien dans `public/exercises/python/`
- Les noms de fichiers correspondent exactement à ceux définis dans `EXERCISE_FILES`

---

## 6. Vérification des COMPOSANTS React

### 6.1 Vérifier le composant CoursesPage
```bash
cat src/components/CoursesPage.jsx | grep -A 5 "import.*courses"
```

**Points à vérifier :**
- Le composant importe `COURSES` ou `getAllCourses()`
- La liste des cours est bien affichée
- Les liens vers les détails sont corrects

### 6.2 Vérifier le composant CourseDetail
```bash
cat src/components/CourseDetail.jsx | grep -A 10 "import.*chapters"
```

**Points à vérifier :**
- Le composant charge bien le contenu des chapitres
- Les imports dynamiques fonctionnent pour tous les cours
- La section de téléchargement des exercices s'affiche

---

## 7. Tests de NAVIGATION et d'AFFICHAGE

### 7.1 Lancer le serveur de développement
// turbo
```bash
npm run dev
```

### 7.2 Tests manuels dans le navigateur

Une fois le serveur lancé, vérifier :

#### **Python** (`/courses/python`)
- [ ] Le titre et la description s'affichent
- [ ] Les 7 parties sont visibles dans la sidebar
- [ ] Les 29 modules sont listés
- [ ] Cliquer sur Module 1 → Le contenu markdown s'affiche
- [ ] Le contenu contient des blocs de code
- [ ] Descendre jusqu'à "Fichiers d'exercices" → La section s'affiche
- [ ] Cliquer sur "Exercice (TODO)" → Le fichier se télécharge
- [ ] Cliquer sur "Solution" → Le fichier se télécharge
- [ ] Ouvrir les fichiers téléchargés → Ils sont corrects

#### **Bayesian** (`/courses/bayesian`)
- [ ] Le cours s'affiche avec 9 modules
- [ ] Le contenu des chapitres existe
- [ ] Pas d'erreur dans la console

#### **MongoDB** (`/courses/mongodb`)
- [ ] Le cours s'affiche avec 9 modules
- [ ] Le contenu des chapitres existe
- [ ] Pas d'erreur dans la console

#### **Navigation générale**
- [ ] Passage d'un chapitre à l'autre fonctionne
- [ ] Retour vers la liste des cours fonctionne
- [ ] Pas d'erreur 404
- [ ] Console navigateur sans erreurs

---

## 8. Vérification LINT

### 8.1 Lancer ESLint sur les fichiers de cours
```bash
npx eslint src/data/courses/**/*.js --max-warnings=0
```

**Points à vérifier :**
- Pas d'erreurs de syntaxe
- Pas d'imports inutilisés
- Respect des conventions

---

## 9. RAPPORT DE VÉRIFICATION

À la fin du workflow, générer un rapport :

```
📊 RAPPORT DE VÉRIFICATION DES COURS
=====================================

✅ Structure des données
   - Index principal: OK
   - Fichiers de chapitres: OK

✅ Contenu des chapitres
   - Python: 29/29 chapitres avec contenu
   - Bayesian: 9/9 chapitres avec contenu
   - MongoDB: 9/9 chapitres avec contenu
   - Exemples de code: Présents dans tous les chapitres

✅ Exercices et solutions
   - Python: 14/14 modules avec exercice + solution
   - Syntaxe Python: OK (aucune erreur)
   - TODO présents: OK

✅ Téléchargeabilité
   - Configuration CourseDetail: OK
   - Fichiers accessibles: OK
   - Tests de téléchargement: OK

✅ Composants React
   - CoursesPage: OK
   - CourseDetail: OK

✅ Navigation: OK
   - Aucune erreur 404
   - Console propre

✅ Lint: OK

🎯 CONCLUSION: Tout est OK ✅
```

---

## Notes
- Ce workflow doit être exécuté après chaque modification majeure
- Les tests manuels (section 7) peuvent être automatisés si nécessaire
- En cas d'erreur, consulter les logs détaillés de chaque étape
