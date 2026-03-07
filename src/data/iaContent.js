export const iaContent = {
    themes: [

        // ─────────────────────────────────────────────────────────────────────
        // THÈME 1 — Concepts & Fondamentaux
        // ─────────────────────────────────────────────────────────────────────
        {
            id: 'ia_concepts',
            title: 'Concepts & Fondamentaux',
            description: 'LLM, RAG, AI Agents, MCP — les 4 architectures fondamentales.',
            categories: [
                {
                    id: 'llm_concept',
                    title: '1.1 LLM — Large Language Model',
                    description: 'Un réseau de neurones qui comprend et génère du texte.',
                    snippets: [
                        {
                            id: 'llm_schema',
                            title: 'Architecture LLM',
                            description: 'Flux fondamental : User → Prompt → LLM → Answer.',
                            level: 'beginner',
                            tags: ['ia', 'llm', 'concept', 'architecture'],
                            markdown: `## 🧠 LLM — Large Language Model

**Définition :** Un réseau de neurones entraîné sur d'immenses corpus de texte, capable de comprendre et de générer du langage naturel.

\`\`\`mermaid
flowchart LR
    U([👤 User])
    P([📝 Prompt])
    L([⚙️ LLM])
    A([💬 Answer])
    U --> P --> L --> A
    style U fill:#e8d5f5,stroke:#c9a8e8,color:#6b3fa0
    style P fill:#d4eaf7,stroke:#9fc8e8,color:#2a6496
    style L fill:#c8f0d8,stroke:#8dd4aa,color:#1a6b3a
    style A fill:#ffd5d5,stroke:#f0a0a0,color:#8b2a2a
\`\`\`

**Points clés :**
- Le LLM **prédit le token suivant** le plus probable — il ne "raisonne" pas au sens humain
- Il est **stateless** : sans mémoire entre les conversations (sauf si fournie dans le prompt)
- La qualité de la réponse dépend directement de la qualité du prompt *(GIGO : Garbage In, Garbage Out)*
- **Modèles principaux :** Claude (Anthropic), GPT-4o (OpenAI), Gemini (Google), Llama (Meta)

**Paramètres clés de l'API :**
| Paramètre | Rôle | Valeur typique |
|-----------|------|----------------|
| \`temperature\` | Créativité de la réponse | 0 = déterministe, 1 = créatif |
| \`max_tokens\` | Longueur max de la réponse | 1024 à 8192 |
| \`top_p\` | Échantillonnage du vocabulaire | 0.9 par défaut |`
                        }
                    ]
                },
                {
                    id: 'rag_concept',
                    title: '1.2 RAG — Retrieval-Augmented Generation',
                    description: 'Connecter le LLM à une base de connaissances externe.',
                    snippets: [
                        {
                            id: 'rag_schema',
                            title: 'Architecture RAG',
                            description: 'LLM enrichi d\'un contexte issu d\'une base vectorielle.',
                            level: 'intermediate',
                            tags: ['ia', 'rag', 'concept', 'architecture', 'vectorstore'],
                            markdown: `## 📚 RAG — Retrieval-Augmented Generation

**Problème résolu :** Les LLMs ont une date de coupure de connaissance et ne connaissent pas vos données internes.

**Solution RAG :** Avant de répondre, on récupère (*retrieval*) les passages pertinents d'une base de documents et on les injecte dans le prompt.

\`\`\`mermaid
flowchart LR
    U([👤 User])
    P([📝 Prompt])
    L([⚙️ LLM])
    A([💬 Answer])
    DB[(🗄️ Vectorstore)]
    C([📚 Context])
    U --> P --> L --> A
    DB --> C --> L
    style U fill:#e8d5f5,stroke:#c9a8e8,color:#6b3fa0
    style P fill:#d4eaf7,stroke:#9fc8e8,color:#2a6496
    style L fill:#c8f0d8,stroke:#8dd4aa,color:#1a6b3a
    style A fill:#ffd5d5,stroke:#f0a0a0,color:#8b2a2a
    style DB fill:#f5e6d3,stroke:#e0c4a0,color:#7a4f2e
    style C fill:#f5e6d3,stroke:#e0c4a0,color:#7a4f2e
\`\`\`

**Les 3 étapes du pipeline RAG :**
1. **Indexation** : Découpage des documents → Embeddings → Stockage dans un vectorstore
2. **Retrieval** : La question de l'utilisateur est transformée en embedding → recherche des K passages les plus proches
3. **Generation** : Les passages récupérés sont injectés dans le prompt → le LLM génère une réponse contextuelle

**Outils populaires :** LangChain, LlamaIndex, ChromaDB, Pinecone, FAISS`
                        }
                    ]
                },
                {
                    id: 'agent_concept',
                    title: '1.3 AI Agent',
                    description: 'Un LLM qui peut planifier et utiliser des outils de manière autonome.',
                    snippets: [
                        {
                            id: 'agent_schema',
                            title: 'Architecture AI Agent',
                            description: 'LLM + Planning + Tools + Memory = Agent autonome.',
                            level: 'intermediate',
                            tags: ['ia', 'agent', 'concept', 'architecture', 'tools'],
                            markdown: `## 🤖 AI Agent

**Définition :** Un système où un LLM décide quels outils utiliser, dans quel ordre, pour accomplir une tâche complexe. Il boucle (Plan → Act → Observe) jusqu'à l'objectif atteint.

\`\`\`mermaid
flowchart LR
    U([👤 User])
    P([📝 Prompt])
    L([⚙️ LLM])
    A([💬 Answer])
    PL([🧠 Planning])
    T1([🔍 Search])
    T2([💻 Code])
    T3([📁 Files])
    M[(💾 Memory)]
    U --> P --> L --> A
    L <--> PL
    T1 --> L
    T2 --> L
    T3 --> L
    M --> L
    style U fill:#e8d5f5,stroke:#c9a8e8,color:#6b3fa0
    style P fill:#d4eaf7,stroke:#9fc8e8,color:#2a6496
    style L fill:#c8f0d8,stroke:#8dd4aa,color:#1a6b3a
    style A fill:#ffd5d5,stroke:#f0a0a0,color:#8b2a2a
    style PL fill:#d4eaf7,stroke:#9fc8e8,color:#2a6496
    style T1 fill:#fff3c4,stroke:#e8d880,color:#7a5800
    style T2 fill:#fff3c4,stroke:#e8d880,color:#7a5800
    style T3 fill:#fff3c4,stroke:#e8d880,color:#7a5800
    style M fill:#f5e6d3,stroke:#e0c4a0,color:#7a4f2e
\`\`\`

**Les 4 composants d'un agent :**
| Composant | Rôle |
|-----------|------|
| **LLM** | Cerveau — prend les décisions |
| **Tools** | Actions exécutables (recherche web, code, API...) |
| **Memory** | Contexte persistant entre les étapes |
| **Planning** | Décomposition de la tâche en sous-étapes |

**Loop ReAct (Reason + Act) :**
Thought → Action → Observation → Thought → ... → Final Answer`
                        }
                    ]
                },
                {
                    id: 'mcp_concept',
                    title: '1.4 MCP — Model Context Protocol',
                    description: 'Le protocole standard pour connecter les LLMs à n\'importe quel outil.',
                    snippets: [
                        {
                            id: 'mcp_schema',
                            title: 'Architecture MCP',
                            description: 'Une API unifiée pour connecter les LLMs à GitHub, Slack, fichiers locaux...',
                            level: 'intermediate',
                            tags: ['ia', 'mcp', 'concept', 'architecture', 'protocol'],
                            markdown: `## 🔌 MCP — Model Context Protocol

**Problème résolu :** Chaque outil (GitHub, Slack, base de données...) nécessitait une intégration personnalisée. MCP standardise cette connexion.

**Analogie :** MCP est aux LLMs ce que USB-C est aux appareils électroniques — une interface universelle.

\`\`\`mermaid
flowchart TD
    APP([🖥️ App — Cursor / Claude Desktop])
    APP -->|Unified API| MCP([🔌 Model Context Protocol])
    MCP -->|API| GH([⚙️ GitHub])
    MCP -->|API| SL([💬 Slack])
    MCP -->|API| FS([📁 Local FS])
    style APP fill:#e8d5f5,stroke:#c9a8e8,color:#6b3fa0
    style MCP fill:#d4eaf7,stroke:#9fc8e8,color:#2a6496
    style GH fill:#fff3c4,stroke:#e8d880,color:#7a5800
    style SL fill:#fff3c4,stroke:#e8d880,color:#7a5800
    style FS fill:#fff3c4,stroke:#e8d880,color:#7a5800
\`\`\`

**Avantages MCP :**
- **Une seule intégration** : l'app n'a besoin que d'implémenter MCP côté client
- **Écosystème partagé** : les serveurs MCP sont réutilisables par n'importe quelle app compatible
- **Sécurité** : contrôle fin des permissions par serveur

**MCP dans l'écosystème Anthropic :** Lancé par Anthropic en novembre 2024, adopté rapidement par Cursor, Zed, et d'autres IDEs.`
                        }
                    ]
                }
            ]
        },

        // ─────────────────────────────────────────────────────────────────────
        // THÈME 2 — Claude Code en pratique
        // ─────────────────────────────────────────────────────────────────────
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
        },

        // ─────────────────────────────────────────────────────────────────────
        // THÈME 3 — Patterns & Architectures
        // ─────────────────────────────────────────────────────────────────────
        {
            id: 'ia_patterns',
            title: 'Patterns & Architectures',
            description: 'Chatbot, RAG, agent avec outils — les patterns récurrents.',
            categories: [
                {
                    id: 'basic_patterns',
                    title: '3.1 Patterns fondamentaux',
                    description: 'Chatbot avec historique, tool use, RAG basique.',
                    snippets: [
                        {
                            id: 'chatbot_pattern',
                            title: 'Chatbot avec historique de conversation',
                            description: 'Maintenir le contexte sur plusieurs échanges.',
                            level: 'intermediate',
                            tags: ['ia', 'chatbot', 'pattern', 'python'],
                            markdown: `💡 **Mémoire de conversation**
Claude est **stateless** : il ne se souvient pas des échanges précédents. Pour simuler une mémoire, il faut envoyer tout l'historique à chaque appel. Le tableau \`messages\` s'allonge à chaque tour.`,
                            code: `from anthropic import Anthropic

client = Anthropic()
conversation_history = []

def chat(user_message):
    conversation_history.append({
        "role": "user",
        "content": user_message
    })

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system="Tu es un assistant expert en data science.",
        messages=conversation_history
    )

    assistant_message = response.content[0].text
    conversation_history.append({
        "role": "assistant",
        "content": assistant_message
    })

    return assistant_message

# Exemple
print(chat("Qu'est-ce que le taux de sinistralité ?"))
print(chat("Comment le calculer en DAX ?"))  # Se souvient de la question précédente`
                        },
                        {
                            id: 'tool_use_pattern',
                            title: 'Tool Use — Connecter Claude à des fonctions',
                            description: 'Permettre à Claude d\'appeler des fonctions Python.',
                            level: 'advanced',
                            tags: ['ia', 'tool-use', 'agent', 'pattern', 'python'],
                            markdown: `💡 **Tool Use (Function Calling)**
Claude peut décider d'appeler un outil (fonction Python) quand c'est nécessaire pour répondre. Le flow est :
1. On décrit les outils disponibles
2. Claude appelle un outil avec les bons arguments
3. On exécute la fonction côté Python et on renvoie le résultat
4. Claude formule la réponse finale`,
                            code: `from anthropic import Anthropic
import json

client = Anthropic()

# Définition de l'outil
tools = [{
    "name": "calculer_ratio_sp",
    "description": "Calcule le ratio Sinistres/Primes pour une région donnée.",
    "input_schema": {
        "type": "object",
        "properties": {
            "region": {"type": "string", "description": "Nom de la région"},
            "sinistres": {"type": "number"},
            "primes": {"type": "number"}
        },
        "required": ["region", "sinistres", "primes"]
    }
}]

# Fonction Python associée
def calculer_ratio_sp(region, sinistres, primes):
    ratio = sinistres / primes if primes > 0 else 0
    return {"region": region, "ratio_sp": round(ratio, 4), "statut": "déficitaire" if ratio > 1 else "rentable"}

# Appel avec tool use
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "Calcule le ratio S/P pour la région Nord : 850 000€ de sinistres, 1 200 000€ de primes."}]
)

# Exécuter l'outil si Claude le demande
if response.stop_reason == "tool_use":
    tool_call = response.content[1]
    result = calculer_ratio_sp(**tool_call.input)
    print(f"Résultat outil : {result}")`
                        },
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
                    ]
                }
            ]
        },

        // ─────────────────────────────────────────────────────────────────────
        // THÈME 4 — Techniques de Prompting (addendum complet)
        // ─────────────────────────────────────────────────────────────────────
        {
            id: 'ia_prompting',
            title: 'Techniques de Prompting',
            description: 'Anatomie, hiérarchie, techniques avancées, outils officiels et templates.',
            categories: [

                // ── 5.1 Anatomie d'un bon prompt ──────────────────────────
                {
                    id: 'anatomie_prompt',
                    title: '5.1 Anatomie d\'un bon prompt',
                    description: 'Les 6 composants d\'un prompt efficace + XML Tagging Anthropic.',
                    snippets: [
                        {
                            id: 'prompt_components',
                            title: 'Les 6 composants d\'un prompt efficace',
                            description: 'Ce que doit contenir un prompt pour obtenir des résultats fiables.',
                            level: 'beginner',
                            tags: ['ia', 'prompting', 'structure', 'fondamentaux'],
                            markdown: `## 📐 Anatomie d'un prompt — 6 composants

\`\`\`
┌─────────────────────────────────────────────────────┐  🎭 RÔLE (optionnel mais puissant)
│  Tu es un expert en analyse de données Power BI.    │  Définir qui est le modèle
│  Tu travailles dans le secteur de l'assurance.      │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  📋 CONTEXTE (fortement recommandé)
│  J'ai une table Portefeuille avec les colonnes :    │  Donner les informations
│  Cotisation, Sinistre, Region, DateContrat           │  nécessaires
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  🎯 TÂCHE (obligatoire)
│  Écris une mesure DAX qui calcule le taux de        │  L'instruction principale,
│  sinistralité par région pour l'année en cours.     │  claire et précise
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  💡 EXEMPLES (optionnel mais puissant)
│  Exemple attendu :                                   │  Montrer le format voulu
│  Taux = DIVIDE(SUM([Sinistre]), SUM([Cotisation]))   │  (few-shot)
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  ⚙️ CONTRAINTES (optionnel)
│  - Utilise DIVIDE pour éviter les erreurs           │  Format, longueur, style,
│  - Ajoute un commentaire explicatif                 │  limites
│  - Réponds en français uniquement                   │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  📄 FORMAT DE SORTIE (recommandé)
│  Réponds avec : le code DAX dans un bloc \`\`\`dax,   │  Spécifier la structure
│  suivi d'une explication en 3 bullet points max.   │  de la réponse
└─────────────────────────────────────────────────────┘
\`\`\`

**Règle de priorité :**

| Priorité | Composant | Toujours nécessaire ? |
|----------|-----------|----------------------|
| ✅ Obligatoire | **Tâche** | Oui |
| ✅ Recommandé | **Contexte** | Presque toujours |
| ✅ Recommandé | **Format de sortie** | Souvent |
| ⚡ Optionnel | **Rôle** | Si le style compte |
| ⚡ Optionnel | **Exemples** | Si le format est précis |
| ⚡ Optionnel | **Contraintes** | Si les limites comptent |

> **"Test du collègue" (Anthropic)** : Montre ton prompt à un collègue. S'il est confus, l'IA le sera aussi.`
                        },
                        {
                            id: 'xml_tagging',
                            title: 'Le XML Tagging — la signature Anthropic',
                            description: 'Structurer ses prompts avec des balises XML pour plus de précision.',
                            level: 'intermediate',
                            tags: ['ia', 'prompting', 'xml', 'anthropic', 'structure'],
                            markdown: `💡 **Pourquoi le XML ?**
Claude a été entraîné avec des prompts contenant des balises XML. Utiliser des tags améliore la précision, réduit les ambiguïtés, et facilite l'extraction programmatique des outputs.

**Balises courantes (conventions Anthropic) :**
\`\`\`
<context>     → informations de fond
<task>        → l'instruction principale
<example>     → exemples few-shot
<document>    → documents fournis en contexte (RAG)
<thinking>    → demander au modèle de raisonner avant de répondre
<answer>      → délimiter la réponse finale
<constraints> → règles et restrictions
<output>      → spécifier le format de sortie
\`\`\`

> **Règle :** Les noms de tags sont libres, ce qui compte c'est la cohérence.`,
                            code: `<!-- ✅ Prompt structuré avec XML -->
<context>
Tu es expert Power BI dans une mutuelle d'assurance.
Table disponible : Portefeuille (ID_Contrat, Region, Cotisation, Sinistre)
</context>

<task>
Calcule le taux de sinistralité global et par région.
</task>

<constraints>
- Utilise DIVIDE() pour sécuriser les divisions
- Noms de mesures en français
- Ajoute une ligne de commentaire avant chaque mesure
</constraints>

<output>
Format : blocs de code DAX séparés, un par mesure.
</output>`
                        }
                    ]
                },

                // ── 5.2 La hiérarchie Anthropic ───────────────────────────
                {
                    id: 'hierarchie_anthropic',
                    title: '5.2 La hiérarchie Anthropic (5 niveaux)',
                    description: 'Les 5 leviers de qualité d\'un prompt, du plus au moins impactant.',
                    snippets: [
                        {
                            id: 'pyramide_niveaux',
                            title: 'La pyramide des 5 niveaux',
                            description: 'Commencer par la base — ajouter les niveaux si nécessaire.',
                            level: 'intermediate',
                            tags: ['ia', 'prompting', 'hierarchie', 'anthropic'],
                            markdown: `## 🏔️ Pyramide des 5 niveaux (Anthropic)

\`\`\`
                    ▲
                   /5\\          Niveau 5 — TECHNIQUES AVANCÉES
                  /───\\         CoT, Prefill, Extended Thinking
                 /  4  \\
                / STRUCT\\       Niveau 4 — STRUCTURE
               /─────────\\     XML tags, sections formatées
              /     3     \\
             /    RÔLE     \\    Niveau 3 — RÔLE
            /───────────────\\  Assigner une identité au modèle
           /        2        \\
          /     EXEMPLES      \\ Niveau 2 — EXEMPLES
         /─────────────────────\\ Few-shot, montrer le format attendu
        /            1          \\
       /  CLARTÉ & INSTRUCTIONS  \\ Niveau 1 (BASE) — La fondation
      /─────────────────────────── \\
\`\`\`

> **Règle d'or :** Ne jamais sauter à un niveau supérieur si la base n'est pas solide.
> 80% des problèmes viennent du niveau 1 (clarté insuffisante).

| Niveau | Technique | Impact |
|--------|-----------|--------|
| 1 | Clarté & instructions directes | ⭐⭐⭐⭐⭐ |
| 2 | Exemples (few-shot) | ⭐⭐⭐⭐ |
| 3 | Role prompting | ⭐⭐⭐ |
| 4 | Structure (XML tags) | ⭐⭐⭐ |
| 5 | CoT, Prefill, Extended Thinking | ⭐⭐ (selon le cas) |`
                        },
                        {
                            id: 'niveau1_clarte',
                            title: 'Niveau 1 — Clarté & Instructions directes',
                            description: 'La fondation. 80% des problèmes viennent d\'ici.',
                            level: 'beginner',
                            tags: ['ia', 'prompting', 'clarte', 'fondamentaux'],
                            markdown: `💡 **Règles de clarté :**
- **1 tâche = 1 prompt** (ne pas mélanger plusieurs objectifs)
- Spécifier le **format de sortie** avant la tâche
- Donner les contraintes en **positif** ("fais X") plutôt qu'en négatif ("ne fais pas Y")
- Si la tâche a des étapes, les **numéroter**`,
                            code: `# ❌ VAGUE
"Analyse mes données"

# ✅ CLAIR
"Lis le tableau ci-joint. Identifie les 3 régions avec le plus fort
taux de sinistralité (Sinistre/Cotisation). Classe-les du plus élevé
au plus bas. Réponds en 3 bullet points, chiffres inclus."`
                        },
                        {
                            id: 'niveau2_fewshot',
                            title: 'Niveau 2 — Few-shot (exemples)',
                            description: 'Montrer 1 à 3 exemples multiplie la qualité des outputs.',
                            level: 'beginner',
                            tags: ['ia', 'prompting', 'fewshot', 'exemples'],
                            code: `<task>
Classe chaque région selon son niveau de risque :
Élevé (> 80%), Moyen (50-80%), Faible (< 50%).
</task>

<examples>
  <example>
    <input>Région: Nord, Taux: 87%</input>
    <output>Nord — 🔴 Élevé</output>
  </example>
  <example>
    <input>Région: Sud, Taux: 62%</input>
    <output>Sud — 🟡 Moyen</output>
  </example>
</examples>

<input>
Région: Est, Taux: 43%
Région: Ouest, Taux: 91%
</input>`
                        },
                        {
                            id: 'niveau3_role',
                            title: 'Niveau 3 — Role Prompting',
                            description: 'Assigner une identité au modèle change le style et la profondeur.',
                            level: 'beginner',
                            tags: ['ia', 'prompting', 'role', 'persona'],
                            markdown: `💡 **Le role prompting fonctionne UNIQUEMENT si la clarté et les exemples sont déjà en place.**
C'est une erreur courante de commencer par là.`,
                            code: `# ❌ Trop générique
"Tu es un assistant utile"

# ✓ Domaine précis
"Tu es un expert en Power BI"

# ✓✓ Domaine + industrie
"Tu es un expert en Power BI dans le secteur de l'assurance"

# ✓✓✓ Domaine + industrie + style (optimal)
"Tu es un expert en Power BI dans une mutuelle.
Tu expliques toujours avec des exemples DAX concrets
et évites le jargon technique superflu."`
                        }
                    ]
                },

                // ── 5.3 Techniques avancées ───────────────────────────────
                {
                    id: 'techniques_avancees',
                    title: '5.3 Techniques avancées',
                    description: 'Prefilling, Extended Thinking, Prompt Chaining.',
                    snippets: [
                        {
                            id: 'prefilling',
                            title: 'Prefilling — guider le début de la réponse',
                            description: 'Forcer Claude à commencer sa réponse par ce que tu veux.',
                            level: 'advanced',
                            tags: ['ia', 'prompting', 'prefill', 'controle', 'anthropic'],
                            markdown: `💡 **Le prefilling** = pré-remplir le premier token de la réponse de l'assistant.
Anthropic-specific : utilisable via l'API avec le paramètre \`assistant\` dans les messages.

**Cas d'usage :**
- Forcer la réponse en JSON : préfill avec \`{\`
- Sauter le préambule : préfill avec la réponse directe
- Maintenir un persona : préfill avec \`[Expert DAX]\`
- Forcer une structure : préfill avec \`## Analyse\\n\``,
                            code: `from anthropic import Anthropic

client = Anthropic()

# Prefill : forcer une réponse JSON sans préambule
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Analyse ce taux de sinistralité : 87%"},
        {"role": "assistant", "content": "{"}  # ← Prefill : force le JSON
    ]
)
# Claude continuera directement avec le JSON, sans préambule`
                        },
                        {
                            id: 'extended_thinking',
                            title: 'Extended Thinking — laisser Claude réfléchir',
                            description: 'Activer le mode réflexion étendue pour les tâches complexes.',
                            level: 'advanced',
                            tags: ['ia', 'prompting', 'thinking', 'raisonnement', 'anthropic'],
                            markdown: `💡 **Disponible depuis Claude 3.7 Sonnet (février 2025).**

**Quand l'activer :**
- Problèmes mathématiques ou logiques multi-étapes
- Analyse de code complexe avec plusieurs fichiers
- Décisions avec de nombreux critères à pondérer
- Debugging de pipeline DAX/Python non évident

**Quand NE PAS l'activer :**
- Tâches simples (rédaction, résumé, classification)
- Réponses rapides nécessaires
- Budget de tokens limité`,
                            code: `from anthropic import Anthropic

client = Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,    # Doit être > budget_tokens
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # Tokens de réflexion alloués
    },
    messages=[{
        "role": "user",
        "content": "Analyse ce pipeline DAX complexe et identifie pourquoi le total ne correspond pas à la somme des lignes..."
    }]
)

# response.content[0] = bloc "thinking" (raisonnement interne)
# response.content[1] = bloc "text" (réponse finale)
thinking_content = response.content[0].thinking
final_answer = response.content[1].text`
                        },
                        {
                            id: 'prompt_chaining',
                            title: 'Prompt Chaining — découper les tâches complexes',
                            description: 'Enchaîner plusieurs prompts pour les tâches en plusieurs étapes.',
                            level: 'advanced',
                            tags: ['ia', 'prompting', 'chaining', 'pipeline', 'python'],
                            markdown: `💡 **Une erreur courante : mettre TOUT dans un seul prompt géant.**

**Avantages du chaining :**
- Meilleure qualité sur chaque étape
- Plus facile à déboguer (tu sais à quelle étape ça coince)
- Possibilité d'insérer une validation humaine entre les étapes
- Réutilisabilité des étapes individuelles`,
                            code: `import anthropic
client = anthropic.Anthropic()

data_raw = "Region: Nord 87%, Sud 62%, Est 43%, Ouest 91%"

# Étape 1 : Extraction (modèle rapide)
step1 = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=500,
    messages=[{"role": "user",
               "content": f"Extrais les données en JSON structuré : {data_raw}"}]
)
data_json = step1.content[0].text

# Étape 2 : Analyse (utilise l'output de l'étape 1)
step2 = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1000,
    messages=[{"role": "user",
               "content": f"Analyse ces données et identifie les anomalies :\n{data_json}"}]
)
analysis = step2.content[0].text

# Étape 3 : Rapport (utilise l'output de l'étape 2)
step3 = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2000,
    messages=[{"role": "user",
               "content": f"Rédige un rapport exécutif en 5 bullet points :\n{analysis}"}]
)
print(step3.content[0].text)`
                        }
                    ]
                },

                // ── 5.4 Outils officiels Anthropic ────────────────────────
                {
                    id: 'outils_anthropic',
                    title: '5.4 Outils officiels Anthropic',
                    description: 'Prompt Generator et Prompt Improver dans la console développeur.',
                    snippets: [
                        {
                            id: 'prompt_generator',
                            title: 'Prompt Generator — console.anthropic.com',
                            description: 'Décrire ce que tu veux → obtenir un prompt production-ready en 30 secondes.',
                            level: 'beginner',
                            tags: ['ia', 'anthropic', 'outils', 'console', 'promptgenerator'],
                            markdown: `💡 **Comment l'utiliser :**
1. Aller sur [console.anthropic.com](https://console.anthropic.com)
2. Onglet **"Prompts"** → **"Generate Prompt"**
3. Décrire la tâche : *"Analyser un rapport de sinistres et extraire les 3 KPIs clés"*
4. Optionnel : spécifier les variables (ex: \`{{RAPPORT}}\`, \`{{PERIODE}}\`)
5. Claude génère le prompt — tu peux l'éditer directement

**Ce qu'il fait automatiquement :**
- Ajoute un rôle approprié
- Structure avec XML tags
- Identifie les variables dynamiques → les met en \`{{HANDLEBARS}}\`
- Ajoute des exemples si pertinent
- Spécifie le format de sortie

> **Résultat mesuré :** ~80% moins de temps de prompting selon Anthropic.`
                        },
                        {
                            id: 'prompt_improver',
                            title: 'Prompt Improver — améliorer un prompt existant',
                            description: 'Coller ton prompt existant → obtenir une version optimisée.',
                            level: 'beginner',
                            tags: ['ia', 'anthropic', 'outils', 'console', 'promptimprover'],
                            markdown: `💡 **Différence avec le Generator :** le Improver CONSERVE tes variables existantes et améliore la structure sans changer ton intent.

**Cas d'usage :**
- Tu as un prompt qui marche "à peu près" — tu veux l'optimiser
- Tu veux voir comment Anthropic structurerait ton prompt
- Tu prépares un prompt pour la production (vs. usage ponctuel)

**Outil complémentaire — onglet "Evaluate" dans la console :**
- Tester ton prompt sur plusieurs exemples en parallèle
- Comparer 2 versions de prompt côte à côte
- Générer des cas de test automatiquement avec Claude`
                        }
                    ]
                },

                // ── 5.5 Templates réutilisables ───────────────────────────
                {
                    id: 'templates_prompting',
                    title: '5.5 Templates réutilisables',
                    description: 'Templates prêts à l\'emploi pour l\'analyse, le code et le débogage.',
                    snippets: [
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
1. Code complet dans un bloc \\\`\\\`\\\`{{LANGAGE}}
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
- \\\`{{CMD_DEV}}\\\`    → Serveur de développement
- \\\`{{CMD_TEST}}\\\`   → Lancer les tests
- \\\`{{CMD_LINT}}\\\`   → Vérification du style
- \\\`{{CMD_BUILD}}\\\`  → Build production

## Structure
- \\\`{{DOSSIER_1}}/\\\` → {{ROLE_DOSSIER_1}}
- \\\`{{DOSSIER_2}}/\\\` → {{ROLE_DOSSIER_2}}
- \\\`{{DOSSIER_3}}/\\\` → {{ROLE_DOSSIER_3}}

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
                    ]
                }
            ]
        }
    ]
};
