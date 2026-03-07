# Prompt Claude Code — Refonte iaContent.js (v3)

## CONTEXTE

Tu travailles sur le fichier `iaContent.js` du site MémoCode (victorbousseau.github.io/MemoCode).
Ce fichier exporte `iaContent` avec une propriété `themes` : un tableau d'objets suivant ce schéma exact :

```js
{
  id: string,
  title: string,
  description: string,
  categories: [
    {
      id: string,
      title: string,
      description: string,
      snippets: [
        {
          id: string,
          title: string,
          description: string,
          level: 'beginner' | 'intermediate' | 'advanced',
          tags: string[],
          markdown?: string,   // texte explicatif rendu en HTML
          code?: string        // bloc de code (copier/coller)
          // un snippet peut avoir les deux, ou seulement l'un des deux
        }
      ]
    }
  ]
}
```

**AVANT DE TOUCHER UNE SEULE LIGNE :**
1. Lire `iaContent.js` en entier
2. Lire le fichier HTML principal pour comprendre comment `markdown` et `code` sont rendus
3. Identifier les patterns d'id existants (snake_case, préfixe par thème)
4. Ne modifier aucun autre fichier que `iaContent.js`

---

## MODIFICATIONS À EFFECTUER

### MOD-1 : SUPPRIMER le thème `ia_news` (Actualités IA)

Supprimer entièrement l'objet `{ id: 'ia_news', ... }` du tableau `themes`.

---

### MOD-2 : REMPLACER le thème `ia_tools` par "Claude Code en pratique"

Remplacer l'objet `{ id: 'ia_tools', ... }` par le nouveau thème ci-dessous.
Ne pas modifier les autres thèmes.

```js
{
  id: 'ia_claudecode',
  title: 'Claude Code en pratique',
  description: 'CLAUDE.md, Skills, Hooks, Slash Commands — configurer Claude Code pour un projet réel.',
  categories: [

    // ── 2.1 Anatomie d'un projet ──────────────────────────────────────────
    {
      id: 'claudecode_anatomie',
      title: '2.1 Anatomie d\'un projet Claude Code',
      description: 'Les fichiers de configuration et leur rôle dans un projet.',
      snippets: [
        {
          id: 'structure_projet',
          title: 'Structure complète d\'un projet',
          description: 'Chaque fichier a un rôle précis — rien n\'est obligatoire sauf CLAUDE.md.',
          level: 'beginner',
          tags: ['claudecode', 'setup', 'projet', 'structure'],
          markdown: `## 🗂️ Anatomie d'un projet Claude Code

\`\`\`
mon-projet/
├── CLAUDE.md                ← 🧠 Mémoire persistante (chargée à chaque session)
├── CLAUDE.local.md          ← 👤 Préférences perso, jamais commitées (.gitignored auto)
├── .mcp.json                ← 🔌 Config MCP du projet (partagée avec l'équipe)
│
└── .claude/
    ├── settings.json        ← ⚙️  Hooks, permissions, config Claude Code
    ├── settings.local.json  ← 🔒 Overrides perso (.gitignored)
    │
    ├── skills/              ← ⚡ Instructions on-demand (chargées seulement si pertinent)
    │   └── mon-skill/
    │       ├── SKILL.md
    │       └── ressources/
    │
    ├── commands/            ← 🎯 Slash commands personnalisés (/ma-commande)
    │   └── review.md
    │
    └── agents/              ← 🤖 Sous-agents spécialisés
        └── reviewer.md
\`\`\`

**Règle :** Commencer avec \`CLAUDE.md\` uniquement. Ajouter les autres éléments au fur et à mesure des vrais points de friction.

| Fichier | Obligatoire ? | Commité ? |
|---------|--------------|-----------|
| \`CLAUDE.md\` | ✅ Recommandé fortement | Oui (partagé équipe) |
| \`CLAUDE.local.md\` | Non | Non (auto-gitignored) |
| \`.claude/settings.json\` | Non | Oui |
| \`.claude/skills/\` | Non | Oui |
| \`.mcp.json\` | Non | Oui |`
        }
      ]
    },

    // ── 2.2 CLAUDE.md ─────────────────────────────────────────────────────
    {
      id: 'claudecode_claudemd',
      title: '2.2 CLAUDE.md — la mémoire du projet',
      description: 'Le fichier que Claude lit avant chaque session. Son briefing projet.',
      snippets: [
        {
          id: 'claudemd_concept',
          title: 'Pourquoi CLAUDE.md change tout',
          description: 'Sans lui, chaque session repart de zéro.',
          level: 'beginner',
          tags: ['claudecode', 'claudemd', 'memoire', 'session'],
          markdown: `## 🧠 CLAUDE.md — le briefing permanent

**Sans CLAUDE.md :**
Chaque session repart de zéro. Tu répètes "mon projet utilise Python 3.11, les tests sont dans \`/tests\`, lance \`pytest\`..." à chaque fois. Claude improvise les commandes, se trompe sur la structure.

**Avec CLAUDE.md :**
Claude connaît ton projet dès le premier message. Il utilise les bonnes commandes, respecte tes conventions. Ton *way of working* est documenté une fois pour toutes.

**Mécanisme :**
- Chargé automatiquement dans le contexte au démarrage de chaque session
- Survit au \`/compact\` (rechargé depuis le disque)
- Lu en cascade : \`.claude/CLAUDE.md\` → \`CLAUDE.md\` racine → \`~/CLAUDE.md\` (global)
- Traité comme une partie du system prompt — **très haute priorité** vs tes messages

> ⚠️ **Limite recommandée : < 200 lignes.** Au-delà, la qualité de suivi des instructions baisse.`
        },
        {
          id: 'claudemd_structure',
          title: 'Structure d\'un CLAUDE.md efficace',
          description: 'Les sections essentielles et ce qu\'il faut y mettre.',
          level: 'beginner',
          tags: ['claudecode', 'claudemd', 'template', 'structure'],
          code: `# [Nom du projet]
[1-2 phrases : ce que fait le projet, la techno principale]

## Commandes essentielles
- \`npm run dev\`    → Serveur de dev (port 3000)
- \`npm test\`       → Tests Jest
- \`npm run lint\`   → ESLint
- \`npm run build\`  → Build production

## Architecture
- \`/src/components/\` → Composants React réutilisables
- \`/src/api/\`        → Appels API et hooks de données
- \`/tests/\`          → Tests unitaires

## Conventions de code
- TypeScript strict, pas de \`any\`
- Named exports uniquement
- CSS : Tailwind uniquement

## Règles importantes
- Ne jamais modifier \`src/auth/\` sans validation explicite
- Variables d'env dans \`.env.local\` (jamais commitées)
- Migrations DB : \`npm run db:migrate\`

## Contexte métier
[Ce que Claude doit savoir sur le domaine pour éviter les erreurs]

## @imports
@docs/architecture.md
@docs/api-conventions.md`
        },
        {
          id: 'claudemd_data',
          title: 'CLAUDE.md pour un projet Data / Power BI',
          description: 'Exemple concret adapté à un contexte analytique.',
          level: 'beginner',
          tags: ['claudecode', 'claudemd', 'powerbi', 'data', 'exemple'],
          code: `# Analyse Portefeuille — Power BI

Tableau de bord de suivi de la sinistralité par région et produit.
Stack : Power BI Desktop, Python (pandas, sqlalchemy), SQL Server.

## Commandes
- \`python scripts/refresh_data.py\`  → Rafraîchit les données depuis SQL Server
- \`pytest tests/\`                   → Tests du pipeline de données

## Structure
- \`/reports/\`  → Fichiers .pbix Power BI
- \`/scripts/\`  → Scripts Python de préparation des données
- \`/data/\`     → Données de test (jamais de données réelles)

## Modèle de données
Tables : Portefeuille, Calendrier, Produits, Régions
Relation active    : Portefeuille[DateEffet]   → Calendrier[Date]
Relation inactive  : Portefeuille[DateCloture] → Calendrier[Date] (→ USERELATIONSHIP)

## Conventions DAX
- Mesures préfixées : [KPI_TauxSinistralite], [CALC_MargeNette]
- DIVIDE() obligatoire sur toutes les divisions
- VAR/RETURN systématique pour les mesures > 3 lignes
- Commentaire obligatoire avant chaque mesure complexe

## Règles
- Ne jamais modifier les tables de faits directement
- Toute nouvelle mesure testée sur /data/test_dataset.xlsx`
        },
        {
          id: 'claudemd_init',
          title: 'Générer un CLAUDE.md avec /init',
          description: 'Laisser Claude analyser le projet et générer un premier draft.',
          level: 'beginner',
          tags: ['claudecode', 'claudemd', 'init', 'commande'],
          markdown: `💡 **\`/init\` scanne ton projet** (package.json, requirements.txt, structure de dossiers) et génère un CLAUDE.md draft.

**À faire après le /init :**
- Supprimer les sections inutiles (contexte précieux = context window)
- Corriger les commandes si mal détectées
- Ajouter le contexte métier (Claude ne peut pas le deviner)
- Viser < 200 lignes au total

**Astuce :** La touche \`#\` pendant une session ajoute rapidement une instruction au CLAUDE.md sans quitter le chat.`,
          code: `# Dans le dossier racine du projet
cd mon-projet/
claude

# Dans la session Claude Code, taper :
/init

# Claude génère un CLAUDE.md draft à réviser`
        },
        {
          id: 'claudemd_local',
          title: 'CLAUDE.local.md — préférences perso',
          description: 'Le CLAUDE.md qui reste sur ta machine, jamais commité.',
          level: 'beginner',
          tags: ['claudecode', 'claudemd', 'local', 'gitignore', 'perso'],
          markdown: `💡 **\`CLAUDE.local.md\`** est automatiquement ajouté au \`.gitignore\` par Claude Code.

**À mettre dedans :**
- Tes préférences de style de réponse
- Tes chemins locaux spécifiques à ta machine
- Des instructions que tu ne veux pas imposer à toute l'équipe`,
          code: `# CLAUDE.local.md — exemple

## Style de réponse
- Toujours répondre en français
- Explications concises, pas de blabla introductif
- Si tu n'es pas sûr d'un choix, dis-le clairement

## Environnement local
- Python virtualenv : .venv/ (pas conda)
- Éditeur : VS Code (commande : \`code .\`)

## Préférences
- Toujours proposer un test après une modification de code`
        }
      ]
    },

    // ── 2.3 Skills ────────────────────────────────────────────────────────
    {
      id: 'claudecode_skills',
      title: '2.3 Les Skills',
      description: 'Instructions on-demand pour tâches complexes et répétitives.',
      snippets: [
        {
          id: 'skills_concept',
          title: 'Skills vs CLAUDE.md — quelle différence ?',
          description: 'Comprendre quand utiliser l\'un ou l\'autre.',
          level: 'intermediate',
          tags: ['claudecode', 'skills', 'concept', 'extensibilite'],
          markdown: `## ⚡ Skills — instructions on-demand

| | CLAUDE.md | Skill |
|---|---|---|
| **Chargement** | Toujours, dès le démarrage | Seulement si la tâche correspond |
| **Portée** | Tout le projet | Une tâche spécifique |
| **Contenu** | Instructions globales, commandes | Workflow détaillé + ressources |
| **Idéal pour** | Conventions, architecture | Rapports, workflows, formats précis |

**Cas d'usage idéaux pour un Skill :**
- Générer un type de document spécifique (rapport mensuel, présentation...)
- Appliquer des conventions très spécifiques (nomenclature DAX, style de code)
- Tâches avec ressources associées (templates Word, scripts Python)
- Workflows complexes en plusieurs étapes

**Mécanisme :** Claude lit la \`description\` de chaque Skill et décide automatiquement lequel activer selon la tâche demandée.`
        },
        {
          id: 'skills_structure',
          title: 'Structure d\'un Skill',
          description: 'Un dossier + un SKILL.md avec frontmatter YAML.',
          level: 'intermediate',
          tags: ['claudecode', 'skills', 'skillmd', 'frontmatter', 'yaml'],
          markdown: `💡 **Le nom du dossier = nom du skill. Le fichier doit s'appeler exactement \`SKILL.md\`** (case-sensitive).

**Portées :**
- \`.claude/skills/\` → skills du projet (committés, partagés avec l'équipe)
- \`~/.claude/skills/\` → skills globaux (tous tes projets, ta machine uniquement)`,
          code: `# Structure dans le projet
.claude/
└── skills/
    └── rapport-sinistralite/    ← nom du skill
        ├── SKILL.md             ← obligatoire, case-sensitive
        ├── analyse.py           ← scripts optionnels
        └── templates/
            └── rapport.docx     ← ressources optionnelles

# Contenu de SKILL.md
---
name: rapport-sinistralite
description: >
  Génère un rapport Word mensuel de sinistralité.
  Utiliser quand l'utilisateur demande un rapport, un bilan mensuel,
  ou une synthèse. Mots-clés : rapport, bilan, synthèse, Word, .docx
allowed-tools: Read, Write, Bash
---

# Skill : Rapport de Sinistralité

## Quand utiliser ce skill
- L'utilisateur demande un rapport mensuel ou une synthèse
- Mentionne "bilan", "Word", ".docx"

## Étapes
1. Lire les données depuis \`/data/export_mensuel.csv\`
2. Calculer les KPIs : taux de sinistralité, marge nette, évolution M-1
3. Utiliser le template \`/templates/rapport.docx\` comme base
4. Générer dans \`/output/rapport_[MOIS].docx\`

## Pièges à éviter
- Ne pas arrondir les taux avant le tableau final
- Toujours indiquer l'unité (%, €, nb contrats)`
        },
        {
          id: 'skills_install',
          title: 'Créer et installer un Skill',
          description: 'Trois façons de mettre en place un Skill dans son projet.',
          level: 'intermediate',
          tags: ['claudecode', 'skills', 'installation', 'creation'],
          code: `# Option 1 — Créer manuellement
mkdir -p .claude/skills/mon-skill
touch .claude/skills/mon-skill/SKILL.md
# → Éditer le SKILL.md avec le frontmatter et les instructions

# Option 2 — Demander à Claude Code de le créer
# Dans une session Claude Code :
# "Crée un skill pour générer des rapports Word de sinistralité mensuelle.
#  Le skill doit utiliser le template dans /templates/rapport.docx"
# Claude crée le dossier et le SKILL.md automatiquement

# Option 3 — Depuis awesome-claude-code (communauté)
# github.com/hesreallyhim/awesome-claude-code
cp -r /path/to/skill-repo/pdf-skill .claude/skills/pdf

# Vérifier que le skill est détecté (dans Claude Code) :
# /skills   ou   "liste tes skills disponibles"`
        }
      ]
    },

    // ── 2.4 Hooks ─────────────────────────────────────────────────────────
    {
      id: 'claudecode_hooks',
      title: '2.4 Hooks & Automatisation',
      description: 'Scripts déclenchés automatiquement à des moments clés du cycle de vie.',
      snippets: [
        {
          id: 'hooks_concept',
          title: 'Qu\'est-ce qu\'un Hook ?',
          description: 'Automatiser des actions déterministes sans dépendre du LLM.',
          level: 'intermediate',
          tags: ['claudecode', 'hooks', 'automation', 'settings'],
          markdown: `## 🪝 Hooks — contrôle déterministe

Contrairement aux instructions dans \`CLAUDE.md\` (que Claude peut ignorer), les hooks sont **déterministes** — ils s'exécutent toujours.

**Événements disponibles :**

| Événement | Déclenchement |
|-----------|--------------|
| \`UserPromptSubmit\` | Avant que Claude traite ton message |
| \`PreToolUse\` | Avant qu'un outil s'exécute (écriture, bash...) |
| \`PostToolUse\` | Après l'exécution d'un outil |
| \`Stop\` | Quand Claude a fini de répondre |
| \`SessionStart\` | Au démarrage de chaque session |

**Cas d'usage classiques :**
- ✅ Formatter les fichiers après modification (Prettier, Black)
- ✅ Lancer les tests après une modif de code
- 🔒 Bloquer les modifications sur la branche \`main\`
- 🔔 Envoyer une notification quand Claude a besoin de toi`
        },
        {
          id: 'hooks_config',
          title: 'Configurer des hooks dans settings.json',
          description: 'Exemples concrets de hooks prêts à l\'emploi.',
          level: 'intermediate',
          tags: ['claudecode', 'hooks', 'settings', 'json', 'configuration'],
          code: `// .claude/settings.json
{
  "hooks": {

    // ✅ Auto-formatter Python après chaque modification
    "PostToolUse": [
      {
        "matcher": "Write(*.py)",
        "hooks": [{ "type": "command", "command": "python -m black $CLAUDE_FILE_PATHS" }]
      },
      // ✅ Lancer les tests si un fichier de test est modifié
      {
        "matcher": "Write(*test*.py)",
        "hooks": [{ "type": "command", "command": "pytest $CLAUDE_FILE_PATHS -v" }]
      }
    ],

    // 🔒 Bloquer les modifications sur main
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "[ \\"$(git branch --show-current)\\" != \\"main\\" ] || { echo '{\\"block\\": true, \\"message\\": \\"Modification de main interdite\\"}' >&2; exit 2; }"
        }]
      }
    ],

    // 🔔 Notification macOS quand Claude a fini
    "Stop": [
      {
        "hooks": [{
          "type": "command",
          "command": "osascript -e 'display notification \\"Claude a terminé\\" with title \\"Claude Code\\"'"
        }]
      }
    ]
  },

  // Permissions : ce que Claude peut / ne peut pas faire
  "permissions": {
    "allow": ["Read", "Write", "Bash(git *)"],
    "deny":  ["Read(.env)", "Write(production.*)"]
  }
}`
        },
        {
          id: 'hooks_exitcodes',
          title: 'Codes de sortie — contrôler le comportement',
          description: 'Comment un hook communique avec Claude Code.',
          level: 'advanced',
          tags: ['claudecode', 'hooks', 'exitcode', 'controle', 'bash'],
          markdown: `💡 **3 façons pour un hook de répondre à Claude Code :**`,
          code: `# Exit 0  → Action autorisée, on continue
exit 0

# Exit 2  → Action BLOQUÉE, Claude reçoit le message stderr
echo "Raison du blocage" >&2
exit 2

# Exit 0 + JSON stdout → Contrôle structuré avancé
echo '{"decision": "block", "reason": "Fichier en production"}'
exit 0

# ─────────────────────────────────────────────────
# Exemple complet : bloquer la suppression de .env
# ─────────────────────────────────────────────────
#!/bin/bash
if echo "$CLAUDE_TOOL_INPUT" | grep -q "rm.*\\.env"; then
  echo "Suppression de .env interdite" >&2
  exit 2
fi
exit 0`
        }
      ]
    },

    // ── 2.5 Slash Commands ────────────────────────────────────────────────
    {
      id: 'claudecode_commands',
      title: '2.5 Slash Commands personnalisées',
      description: 'Transformer une séquence d\'instructions en une seule commande.',
      snippets: [
        {
          id: 'commands_concept',
          title: 'Slash Commands vs Skills — quoi utiliser ?',
          description: 'Les slash commands se déclenchent manuellement, les skills automatiquement.',
          level: 'intermediate',
          tags: ['claudecode', 'slashcommands', 'commands', 'concept'],
          markdown: `## 🎯 Slash Commands

Un fichier \`.md\` dans \`.claude/commands/\` → invoqué avec \`/nom-du-fichier\`

| | Slash Command | Skill |
|---|---|---|
| **Déclenchement** | Manuel (\`/ma-commande\`) | Automatique (matching sémantique) |
| **Idéal pour** | Workflows à la demande | Tâches récurrentes détectées |
| **Exemple** | \`/review\`, \`/onboard\`, \`/deploy\` | Génération de rapport, format de code |

**Portées :**
- \`.claude/commands/\` → commands du projet (committées, partagées)
- \`~/.claude/commands/\` → commands globales (toutes tes sessions)`
        },
        {
          id: 'commands_create',
          title: 'Créer ses propres slash commands',
          description: 'Exemples de commands prêtes à l\'emploi.',
          level: 'intermediate',
          tags: ['claudecode', 'slashcommands', 'creation', 'exemple'],
          code: `# Créer le dossier
mkdir -p .claude/commands

# Command de review de code
cat > .claude/commands/review.md << 'EOF'
Effectue une review du code modifié dans cette session.

Vérifie dans cet ordre :
1. Sécurité : injections, variables non sanitisées, secrets hardcodés
2. Performance : requêtes N+1, boucles inutiles, imports inutilisés
3. Conventions : respect du style défini dans CLAUDE.md
4. Tests : les modifications sont-elles couvertes ?

Format :
- ✅ OK  /  ⚠️ Attention  /  ❌ Problème
- Maximum 3 points par catégorie
EOF

# Command avec argument ($ARGUMENTS)
cat > .claude/commands/explain.md << 'EOF'
Explique le fichier ou la fonction suivante de façon pédagogique,
en supposant que le lecteur est data analyst (pas développeur senior) :

$ARGUMENTS
EOF

# Utilisation dans Claude Code :
# /review
# /explain src/utils/calculate_rate.py`
        }
      ]
    },

    // ── 2.6 MCP dans Claude Code ──────────────────────────────────────────
    {
      id: 'claudecode_mcp',
      title: '2.6 MCP — Connecter des outils externes',
      description: 'Donner à Claude Code accès à GitHub, SQL, fichiers, et plus.',
      snippets: [
        {
          id: 'mcp_claudecode',
          title: 'Connecter un MCP server à Claude Code',
          description: 'Via CLI ou .mcp.json pour partager la config avec l\'équipe.',
          level: 'intermediate',
          tags: ['claudecode', 'mcp', 'outils', 'github', 'sql'],
          markdown: `💡 **Deux façons de configurer un MCP :**
- **CLI** → rapide pour tester
- **\`.mcp.json\`** → commité dans git, partagé avec l'équipe`,
          code: `# Méthode 1 — CLI (rapide)
claude mcp add github -- npx -y @modelcontextprotocol/server-github
claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mabase
claude mcp list  # Vérifier

# Méthode 2 — .mcp.json (recommandé pour une équipe)
# À la racine du projet, crée .mcp.json :
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "\${DATABASE_URL}"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}

# ⚠️ Ne jamais mettre de tokens en dur dans .mcp.json (fichier commité !)
# Utiliser des variables d'environnement : \${NOM_VARIABLE}`
        }
      ]
    }
  ]
}
```

---

### MOD-3 : ENRICHIR le thème `ia_patterns` — catégorie `basic_patterns`

Dans le thème `ia_patterns`, catégorie `basic_patterns` (id: `'basic_patterns'`), **ajouter** ces snippets après les 2 existants (`chatbot_pattern` et `tool_use_pattern`). Ne pas modifier les snippets existants.

```js
// ── Snippet à ajouter 1 ───────────────────────────────────────────────
{
  id: 'rag_code_pattern',
  title: 'RAG basique — pipeline complet en Python',
  description: 'Indexation + retrieval + génération en ~50 lignes.',
  level: 'advanced',
  tags: ['ia', 'rag', 'pattern', 'python', 'embeddings', 'vectorstore'],
  markdown: `💡 **Pipeline RAG en 3 étapes :**
1. **Indexation** : découper les docs → embeddings → stocker
2. **Retrieval** : embedding de la question → trouver les K passages proches
3. **Génération** : injecter les passages dans le prompt → Claude répond

Ce snippet utilise \`chromadb\` (vectorstore local, zéro config) et le modèle d'embedding d'Anthropic.`,
  code: `from anthropic import Anthropic
import chromadb
from chromadb.utils import embedding_functions

client = Anthropic()
chroma = chromadb.Client()

# Fonction d'embedding (utilise sentence-transformers en local)
ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)
collection = chroma.create_collection("docs", embedding_function=ef)

# ─── ÉTAPE 1 : Indexation ─────────────────────────────────────────────
documents = [
    "Le taux de sinistralité mesure le rapport Sinistres/Primes. Un taux > 100% indique un déficit.",
    "La région Nord affiche un taux de sinistralité de 87% en 2024, en hausse de 5 points vs 2023.",
    "Les contrats Santé représentent 60% du portefeuille, avec un taux moyen de 72%.",
]

collection.add(
    documents=documents,
    ids=[f"doc_{i}" for i in range(len(documents))]
)

# ─── ÉTAPE 2 : Retrieval ──────────────────────────────────────────────
def retrieve(question: str, k: int = 2) -> list[str]:
    results = collection.query(query_texts=[question], n_results=k)
    return results["documents"][0]

# ─── ÉTAPE 3 : Génération ─────────────────────────────────────────────
def rag(question: str) -> str:
    passages = retrieve(question)
    context = "\\n".join(f"- {p}" for p in passages)

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        messages=[{
            "role": "user",
            "content": f"""Réponds à la question en te basant UNIQUEMENT sur le contexte fourni.
Si la réponse n'est pas dans le contexte, dis-le explicitement.

<context>
{context}
</context>

<question>{question}</question>"""
        }]
    )
    return response.content[0].text

# Test
print(rag("Quel est le taux de sinistralité de la région Nord ?"))`
},

// ── Snippet à ajouter 2 ───────────────────────────────────────────────
{
  id: 'react_agent_pattern',
  title: 'Agent ReAct — boucle Reason + Act complète',
  description: 'Un agent qui planifie, appelle des outils et boucle jusqu\'à l\'objectif.',
  level: 'advanced',
  tags: ['ia', 'agent', 'react', 'pattern', 'python', 'tool-use'],
  markdown: `💡 **Pattern ReAct (Reason + Act) :**
L'agent boucle : \`Thought → Action → Observation → Thought → ...\` jusqu'à avoir la réponse finale.
Claude décide lui-même quand s'arrêter (\`stop_reason == "end_turn"\`).`,
  code: `from anthropic import Anthropic
import json

client = Anthropic()

# ─── Outils disponibles ───────────────────────────────────────────────
tools = [
    {
        "name": "get_region_data",
        "description": "Récupère les données de sinistralité d'une région.",
        "input_schema": {
            "type": "object",
            "properties": {
                "region": {"type": "string", "description": "Nom de la région"}
            },
            "required": ["region"]
        }
    },
    {
        "name": "calculate_risk_score",
        "description": "Calcule un score de risque composite (0-100) pour une région.",
        "input_schema": {
            "type": "object",
            "properties": {
                "taux_sp": {"type": "number"},
                "evolution": {"type": "number", "description": "Variation vs N-1 en points"}
            },
            "required": ["taux_sp", "evolution"]
        }
    }
]

# ─── Implémentations des outils ───────────────────────────────────────
def get_region_data(region: str) -> dict:
    # Simulé — en production : requête SQL ou API
    data = {
        "Nord": {"taux_sp": 0.87, "evolution": +0.05, "nb_contrats": 1240},
        "Sud":  {"taux_sp": 0.62, "evolution": -0.03, "nb_contrats": 890},
    }
    return data.get(region, {"error": f"Région {region} inconnue"})

def calculate_risk_score(taux_sp: float, evolution: float) -> dict:
    score = min(100, int(taux_sp * 80 + evolution * 100))
    niveau = "Élevé" if score > 70 else "Moyen" if score > 40 else "Faible"
    return {"score": score, "niveau": niveau}

def run_tool(name: str, inputs: dict) -> str:
    if name == "get_region_data":
        return json.dumps(get_region_data(**inputs))
    if name == "calculate_risk_score":
        return json.dumps(calculate_risk_score(**inputs))
    return json.dumps({"error": "Outil inconnu"})

# ─── Boucle ReAct ─────────────────────────────────────────────────────
def react_agent(question: str) -> str:
    messages = [{"role": "user", "content": question}]

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            tools=tools,
            messages=messages
        )

        # Ajouter la réponse à l'historique
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn":
            # Claude a fini — extraire le texte final
            return next(b.text for b in response.content if hasattr(b, "text"))

        if response.stop_reason == "tool_use":
            # Exécuter tous les outils demandés
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = run_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    })
            messages.append({"role": "user", "content": tool_results})

# Test
print(react_agent("Analyse le risque des régions Nord et Sud, et recommande sur laquelle concentrer les efforts."))`
},

// ── Snippet à ajouter 3 ───────────────────────────────────────────────
{
  id: 'parallel_agents_pattern',
  title: 'Agents parallèles — traiter plusieurs tâches simultanément',
  description: 'Lancer plusieurs appels Claude en parallèle avec asyncio.',
  level: 'advanced',
  tags: ['ia', 'agent', 'pattern', 'python', 'async', 'parallele'],
  markdown: `💡 **Quand paralléliser ?**
Quand tu as N tâches indépendantes. Au lieu d'attendre chaque réponse séquentiellement (N × latence), tu les lances toutes en même temps (1 × latence max).

**Exemple :** analyser 5 régions → 5× plus rapide qu'en séquentiel.`,
  code: `import asyncio
import anthropic

client = anthropic.AsyncAnthropic()

async def analyser_region(region: str, taux: float) -> dict:
    """Analyse une région de façon autonome."""
    response = await client.messages.create(
        model="claude-haiku-4-5-20251001",   # Haiku : rapide et économique pour les tâches simples
        max_tokens=256,
        messages=[{
            "role": "user",
            "content": f"Région {region}, taux de sinistralité {taux:.0%}. "
                       f"En 2 phrases : évaluation du risque et recommandation."
        }]
    )
    return {"region": region, "analyse": response.content[0].text}

async def analyser_toutes_regions():
    regions = [
        ("Nord", 0.87), ("Sud", 0.62),
        ("Est", 0.43),  ("Ouest", 0.91), ("Centre", 0.55)
    ]

    # Lancer toutes les analyses en parallèle
    taches = [analyser_region(r, t) for r, t in regions]
    resultats = await asyncio.gather(*taches)

    for r in resultats:
        print(f"[{r['region']}] {r['analyse']}\\n")

asyncio.run(analyser_toutes_regions())`
},

// ── Snippet à ajouter 4 ───────────────────────────────────────────────
{
  id: 'human_in_loop_pattern',
  title: 'Human-in-the-Loop — validation avant actions irréversibles',
  description: 'Insérer un checkpoint humain avant les actions à fort impact.',
  level: 'advanced',
  tags: ['ia', 'agent', 'pattern', 'python', 'hitl', 'validation'],
  markdown: `💡 **Principe :** L'agent s'arrête et demande une validation humaine avant d'exécuter une action irréversible (suppression, envoi d'email, écriture en base...).

**Règle :** Plus l'action est irréversible, plus le checkpoint est nécessaire.`,
  code: `from anthropic import Anthropic

client = Anthropic()

# Actions qui nécessitent une validation humaine
ACTIONS_SENSIBLES = ["delete", "send_email", "update_database", "deploy"]

def demander_validation(action: str, details: dict) -> bool:
    """Affiche un résumé de l'action et demande confirmation."""
    print(f"\\n⚠️  ACTION SENSIBLE DÉTECTÉE")
    print(f"   Action  : {action}")
    print(f"   Détails : {details}")
    reponse = input("   Confirmer ? (o/N) : ").strip().lower()
    return reponse == "o"

def executer_action(action: str, params: dict) -> str:
    """Exécute l'action après validation."""
    if action in ACTIONS_SENSIBLES:
        if not demander_validation(action, params):
            return f"Action '{action}' annulée par l'utilisateur."

    # Exécution réelle ici
    return f"Action '{action}' exécutée avec succès. Params: {params}"

# Intégration dans une boucle agentique
tools = [{
    "name": "executer_action",
    "description": "Exécute une action sur le système (certaines nécessitent validation).",
    "input_schema": {
        "type": "object",
        "properties": {
            "action": {"type": "string", "enum": ACTIONS_SENSIBLES + ["read", "calculate"]},
            "params": {"type": "object"}
        },
        "required": ["action", "params"]
    }
}]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "Supprime les contrats expirés depuis plus de 2 ans."}]
)

if response.stop_reason == "tool_use":
    for block in response.content:
        if block.type == "tool_use":
            resultat = executer_action(block.input["action"], block.input["params"])
            print(resultat)`
}
```

---

### MOD-4 : REMPLACER les templates statiques (5.5) par un Prompt Builder interactif

Dans le thème `ia_prompting`, catégorie `templates_prompting` (id: `'templates_prompting'`), **remplacer les 3 snippets existants** (`template_analyse`, `template_code`, `template_debug`) par ces nouveaux snippets.

> **Note importante :** Ces snippets utilisent le champ `markdown` avec du HTML interactif. Vérifie d'abord comment le renderer du site gère le HTML dans `markdown` — s'il échappe le HTML, utilise le champ `code` classique à la place et adapte en conséquence.

```js
{
  id: 'template_analyse',
  title: 'Template — Analyse de données',
  description: 'Template XML complet pour toute demande d\'analyse. Remplace les {{VARIABLES}} par tes valeurs.',
  level: 'beginner',
  tags: ['ia', 'template', 'analyse', 'donnees', 'xml', 'prompting'],
  code: `<role>
Tu es un expert en analyse de données dans le secteur de l'assurance.
Tu privilégies les réponses concises avec des chiffres précis.
</role>

<context>
{{DESCRIPTION_DATASET}}
Colonnes disponibles : {{COLONNES}}
Période analysée : {{PERIODE}}
</context>

<task>
{{QUESTION_ANALYSE}}
</task>

<constraints>
- Réponds en français
- Inclure les chiffres clés avec leur unité
- Signaler si des données semblent aberrantes
- Maximum {{NB_LIGNES}} lignes de réponse
</constraints>

<o>
1. Réponse directe (1 phrase)
2. Chiffres clés (bullet points)
3. Observation notable (si applicable)
</o>

<!-- VARIABLES À REMPLACER :
  {{DESCRIPTION_DATASET}} → ex: "Table Portefeuille avec 5000 contrats actifs"
  {{COLONNES}}            → ex: "ID_Contrat, Region, Cotisation, Sinistre, Produit"
  {{PERIODE}}             → ex: "Janvier–Juin 2024"
  {{QUESTION_ANALYSE}}    → ex: "Quelles sont les 3 régions avec le plus fort taux de sinistralité ?"
  {{NB_LIGNES}}           → ex: "10"
-->`
},
{
  id: 'template_code',
  title: 'Template — Génération de code',
  description: 'Template pour obtenir du code propre, commenté et fonctionnel.',
  level: 'beginner',
  tags: ['ia', 'template', 'code', 'developpement', 'xml', 'prompting'],
  code: `<role>
Tu es un développeur {{LANGAGE}} senior.
Tu écris du code propre, commenté, et tu expliques tes choix.
</role>

<context>
Projet : {{DESCRIPTION_PROJET}}
Environnement : {{ENV}}
Contraintes techniques : {{CONTRAINTES_TECH}}
</context>

<task>
Écris le code pour : {{DESCRIPTION_TACHE}}
</task>

<examples>
{{EXEMPLE_INPUT_OUTPUT}}
</examples>

<constraints>
- Commenter les lignes non évidentes
- Gérer les cas d'erreur (try/except, IFERROR...)
- Bibliothèques autorisées uniquement : {{LIBS_AUTORISEES}}
</constraints>

<o>
1. Code complet dans un bloc \`\`\`{{LANGAGE}}
2. Explication en 3 points : ce que fait le code / les choix techniques / les limites
</o>

<!-- VARIABLES À REMPLACER :
  {{LANGAGE}}             → ex: "Python", "DAX", "SQL"
  {{DESCRIPTION_PROJET}}  → ex: "Pipeline de données Power BI"
  {{ENV}}                 → ex: "Python 3.11, pandas 2.0, SQLAlchemy"
  {{CONTRAINTES_TECH}}    → ex: "Pas d'appel API externe, doit tourner offline"
  {{DESCRIPTION_TACHE}}   → ex: "Calculer le taux de sinistralité glissant sur 12 mois"
  {{EXEMPLE_INPUT_OUTPUT}} → ex: "Input: df avec col Sinistre, Cotisation / Output: col TauxSP"
  {{LIBS_AUTORISEES}}     → ex: "pandas, numpy, sqlalchemy"
-->`
},
{
  id: 'template_debug',
  title: 'Template — Débogage',
  description: 'Fournir le contexte d\'erreur correctement pour un diagnostic fiable.',
  level: 'intermediate',
  tags: ['ia', 'template', 'debug', 'erreur', 'xml', 'prompting'],
  code: `<role>
Tu es expert en débogage {{LANGAGE_OUTIL}}.
Tu identifies la cause racine, pas seulement le symptôme.
</role>

<context>
Outil/Langage : {{OUTIL}}
Objectif du code : {{CE_QUE_CA_DEVRAIT_FAIRE}}
</context>

<bug>
Comportement observé  : {{CE_QUI_SE_PASSE}}
Comportement attendu  : {{CE_QUI_DEVRAIT_SE_PASSER}}
Message d'erreur      : {{MESSAGE_ERREUR}}
</bug>

<code>
{{CODE_PROBLEMATIQUE}}
</code>

<context_supplementaire>
Tentatives précédentes : {{TENTATIVES_PRECEDENTES}}
Conditions de déclenchement : {{QUAND_CA_ARRIVE}}
</context_supplementaire>

<task>
Identifie la cause de ce bug et propose un correctif.
</task>

<o>
1. Cause identifiée (1-2 phrases)
2. Code corrigé
3. Explication du correctif
4. Comment éviter ce bug à l'avenir
</o>

<!-- VARIABLES À REMPLACER :
  {{LANGAGE_OUTIL}}         → ex: "Python / pandas", "DAX / Power BI"
  {{CE_QUE_CA_DEVRAIT_FAIRE}} → ex: "Calculer un taux de sinistralité par région"
  {{CE_QUI_SE_PASSE}}       → ex: "Retourne toujours 0 pour la région Est"
  {{CE_QUI_DEVRAIT_SE_PASSER}} → ex: "Retourner le taux calculé : Sinistre/Cotisation"
  {{MESSAGE_ERREUR}}        → ex: "DivisionByZero" ou "None" si pas de message
  {{CODE_PROBLEMATIQUE}}    → coller le code ici
  {{TENTATIVES_PRECEDENTES}} → ex: "Vérifié que la colonne n'est pas nulle"
  {{QUAND_CA_ARRIVE}}       → ex: "Uniquement quand la région n'a pas de cotisation ce mois"
-->`
},
{
  id: 'template_claudemd',
  title: 'Template — CLAUDE.md universel',
  description: 'Template de départ pour n\'importe quel projet avec Claude Code.',
  level: 'beginner',
  tags: ['ia', 'template', 'claudemd', 'claudecode', 'projet'],
  code: `# {{NOM_PROJET}}
{{DESCRIPTION_1_PHRASE}}
Stack : {{TECHNOLOGIES_PRINCIPALES}}

## Commandes
- \`{{CMD_DEV}}\`    → Serveur de développement
- \`{{CMD_TEST}}\`   → Lancer les tests
- \`{{CMD_LINT}}\`   → Vérification du style
- \`{{CMD_BUILD}}\`  → Build production

## Structure
- \`{{DOSSIER_1}}/\` → {{ROLE_DOSSIER_1}}
- \`{{DOSSIER_2}}/\` → {{ROLE_DOSSIER_2}}
- \`{{DOSSIER_3}}/\` → {{ROLE_DOSSIER_3}}

## Conventions
- {{CONVENTION_1}}
- {{CONVENTION_2}}
- {{CONVENTION_3}}

## Règles importantes
- {{REGLE_CRITIQUE_1}}
- {{REGLE_CRITIQUE_2}}

## Contexte métier
{{DOMAINE_ET_VOCABULAIRE_CLE}}

<!-- VARIABLES À REMPLACER :
  {{NOM_PROJET}}                → ex: "Tableau de bord Sinistralité"
  {{DESCRIPTION_1_PHRASE}}      → ex: "Suivi mensuel de la sinistralité par région"
  {{TECHNOLOGIES_PRINCIPALES}}  → ex: "Power BI, Python 3.11, SQL Server"
  {{CMD_DEV}}                   → ex: "python app.py" ou "npm run dev"
  {{CMD_TEST}}                  → ex: "pytest tests/" ou "npm test"
  {{CONVENTION_1}}              → ex: "Mesures DAX préfixées par domaine : KPI_, CALC_"
  {{REGLE_CRITIQUE_1}}          → ex: "Ne jamais modifier les tables de faits directement"
  {{DOMAINE_ET_VOCABULAIRE_CLE}} → ex: "Taux S/P = Sinistres/Primes. Déficitaire si > 100%"
-->`
}
```

---

## RÉSUMÉ DES MODIFICATIONS

| Action | Cible | Détail |
|--------|-------|--------|
| ❌ Supprimer | `ia_news` | Thème entier supprimé |
| 🔄 Remplacer | `ia_tools` → `ia_claudecode` | Nouveau thème "Claude Code en pratique" : 6 catégories, ~20 snippets |
| ➕ Ajouter | `ia_patterns` > `basic_patterns` | 4 nouveaux snippets : RAG code, ReAct, Parallel Agents, Human-in-the-Loop |
| 🔄 Remplacer | `ia_prompting` > `templates_prompting` | 3 templates enrichis + 1 nouveau (CLAUDE.md) |

**Structure finale des thèmes :**
```
1. ia_concepts     — Concepts & Fondamentaux       (inchangé)
2. ia_claudecode   — Claude Code en pratique        (nouveau)
3. ia_patterns     — Patterns & Architectures       (enrichi)
4. ia_prompting    — Techniques de Prompting        (templates améliorés)
```

## CONTRAINTES ABSOLUES

1. Lire le fichier `iaContent.js` **en entier** avant d'écrire quoi que ce soit
2. Respecter **exactement** le schéma de données existant (id, title, description, level, tags, markdown, code)
3. Les ids doivent être **uniques** dans tout le fichier — vérifier avant d'ajouter
4. **Ne pas toucher** aux thèmes `ia_concepts` et `ia_prompting` (sauf la catégorie `templates_prompting`)
5. Contenu en **français**, noms de fichiers/variables/commandes en anglais
6. Tester la validité JS du fichier final (pas de virgules manquantes, pas de backticks non échappés)
