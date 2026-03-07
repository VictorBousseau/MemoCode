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
        // THÈME 2 — Outils & Setup
        // ─────────────────────────────────────────────────────────────────────
        {
            id: 'ia_tools',
            title: 'Outils & Setup',
            description: 'SDK Anthropic, configuration, premier appel API.',
            categories: [
                {
                    id: 'sdk_setup',
                    title: '2.1 SDK Anthropic — Installation & Config',
                    description: 'Installer et configurer le SDK Python Anthropic.',
                    snippets: [
                        {
                            id: 'install_sdk',
                            title: 'Installation & Variables d\'environnement',
                            description: 'Installer le SDK et configurer la clé API.',
                            level: 'beginner',
                            tags: ['ia', 'anthropic', 'sdk', 'setup', 'python'],
                            markdown: `💡 **Ne jamais committer sa clé API.**
Stocker \`ANTHROPIC_API_KEY\` dans un fichier \`.env\` et l'ajouter à \`.gitignore\`.`,
                            code: `# Installation
pip install anthropic

# .env
ANTHROPIC_API_KEY=sk-ant-...

# Chargement dans Python
import os
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()
client = Anthropic()  # Lit ANTHROPIC_API_KEY depuis l'env automatiquement`
                        },
                        {
                            id: 'first_api_call',
                            title: 'Premier appel API',
                            description: 'Structure minimale d\'un appel à Claude.',
                            level: 'beginner',
                            tags: ['ia', 'anthropic', 'sdk', 'api', 'python'],
                            markdown: `💡 **Structure du message :**
- \`role: "user"\` → message de l'utilisateur
- \`role: "assistant"\` → historique de conversation
- \`system\` → instructions permanentes (personnalité, format, contraintes)`,
                            code: `from anthropic import Anthropic

client = Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="Tu es un expert en analyse de données. Tu réponds en français.",
    messages=[
        {"role": "user", "content": "Explique la différence entre SUM et SUMX en DAX."}
    ]
)

print(response.content[0].text)`
                        },
                        {
                            id: 'streaming',
                            title: 'Streaming de la réponse',
                            description: 'Afficher la réponse token par token.',
                            level: 'intermediate',
                            tags: ['ia', 'anthropic', 'sdk', 'streaming', 'python'],
                            markdown: `💡 **Quand utiliser le streaming ?**
Pour les interfaces utilisateur où l'attente est longue — le streaming affiche chaque token dès qu'il est généré, donnant une sensation de réponse instantanée.`,
                            code: `from anthropic import Anthropic

client = Anthropic()

with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Écris un rapport en 5 points."}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)`
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
                        }
                    ]
                }
            ]
        },

        // ─────────────────────────────────────────────────────────────────────
        // THÈME 4 — Actualités IA
        // ─────────────────────────────────────────────────────────────────────
        {
            id: 'ia_news',
            title: 'Actualités IA',
            description: 'Timeline des avancées majeures — modèles, outils, protocoles.',
            categories: [
                {
                    id: 'timeline_2024',
                    title: '4.1 Timeline 2024',
                    description: 'Les événements marquants de 2024.',
                    snippets: [
                        {
                            id: 'news_claude_3',
                            title: 'Mars 2024 — Claude 3 (Opus, Sonnet, Haiku)',
                            description: 'Anthropic lance la famille Claude 3 avec 3 niveaux de puissance.',
                            level: 'beginner',
                            tags: ['ia', 'anthropic', 'claude', 'actualite', '2024'],
                            markdown: `### 🚀 Mars 2024 — Famille Claude 3

**Anthropic** lance la famille **Claude 3** avec 3 modèles :

| Modèle | Positionnement | Usage |
|--------|----------------|-------|
| **Claude 3 Opus** | Plus puissant | Tâches complexes, analyse |
| **Claude 3 Sonnet** | Équilibre perf/prix | Usage quotidien, production |
| **Claude 3 Haiku** | Plus rapide/économique | Classification, résumé |

**Capacité vision** : les 3 modèles analysent des images (graphiques, schémas, documents scannés).

**Benchmark** : Claude 3 Opus surpasse GPT-4 sur la majorité des benchmarks académiques au lancement.`
                        },
                        {
                            id: 'news_prompt_generator',
                            title: 'Mai 2024 — Prompt Generator dans la Console',
                            description: 'Anthropic lance la génération automatique de prompts production-ready.',
                            level: 'beginner',
                            tags: ['ia', 'anthropic', 'outil', 'prompting', 'actualite', '2024'],
                            markdown: `### 🛠️ Mai 2024 — Prompt Generator (console.anthropic.com)

**Anthropic** intègre un générateur de prompts directement dans la console développeur.

**Ce qu'il fait :**
- Tu décris ta tâche en langage naturel
- Claude génère un prompt structuré avec XML tags, variables \`{{HANDLEBARS}}\` et best practices

**Impact mesuré :** Réduction du temps de prompting de ~80% selon les early adopters.

**Accès :** [console.anthropic.com](https://console.anthropic.com) → onglet Prompts → Generate Prompt`
                        },
                        {
                            id: 'news_mcp_launch',
                            title: 'Nov. 2024 — Lancement du Model Context Protocol',
                            description: 'Anthropic open-source MCP, adopté rapidement par l\'écosystème.',
                            level: 'intermediate',
                            tags: ['ia', 'anthropic', 'mcp', 'protocol', 'actualite', '2024'],
                            markdown: `### 🔌 Novembre 2024 — Model Context Protocol (MCP)

**Anthropic** publie en open-source le **MCP**, un protocole standardisé pour connecter les LLMs à des outils externes.

**Adoption rapide :**
- **Cursor IDE** — intégration MCP quelques semaines après le lancement
- **Zed** — support natif
- **Claude Desktop** — serveurs MCP configurables en JSON

**Disponible sur :** [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)`
                        }
                    ]
                },
                {
                    id: 'timeline_2025',
                    title: '4.2 Timeline 2025',
                    description: 'Les événements marquants de 2025.',
                    snippets: [
                        {
                            id: 'news_extended_thinking',
                            title: 'Fév. 2025 — Extended Thinking (Claude 3.7)',
                            description: 'Le modèle "pense" avant de répondre — amélioration majeure sur le raisonnement.',
                            level: 'intermediate',
                            tags: ['ia', 'anthropic', 'claude', 'thinking', 'raisonnement', 'actualite', '2025'],
                            markdown: `### 🧠 Février 2025 — Extended Thinking (Claude 3.7 Sonnet)

**Claude 3.7 Sonnet** introduit le mode **Extended Thinking** : le modèle génère des tokens de réflexion internes avant de répondre.

**Amélioration mesurée :**
- +10 points sur SWE-bench (benchmarks de code)
- Performances majeures en mathématiques et raisonnement logique

**Token de pensée :** visible dans la réponse API via \`response.content[0].type == "thinking"\`

**Paramètre API :**
\`\`\`python
thinking={"type": "enabled", "budget_tokens": 10000}
\`\`\`

**Disponible sur :** Claude.ai Pro, API Anthropic`
                        },
                        {
                            id: 'news_claude_4',
                            title: 'Juin 2025 — Famille Claude 4 (Opus 4, Sonnet 4)',
                            description: 'Nouvelle génération de modèles avec capacités agents renforcées.',
                            level: 'beginner',
                            tags: ['ia', 'anthropic', 'claude', 'actualite', '2025'],
                            markdown: `### 🚀 Juin 2025 — Famille Claude 4

**Anthropic** lance **Claude Opus 4** et **Claude Sonnet 4**, avec des améliorations majeures pour les agents autonomes :

| Modèle | Points forts |
|--------|-------------|
| **Claude Opus 4** | Raisonnement de pointe, tâches longues et complexes |
| **Claude Sonnet 4** | Meilleur équilibre performance/coût de l'écosystème |
| **Claude Haiku 4.5** | Ultra-rapide, idéal pour la production haute fréquence |

**Innovations :**
- Meilleure gestion des tâches multi-étapes (agents)
- Fenêtre de contexte étendue
- Réduction des hallucinations sur les tâches factuelles`
                        }
                    ]
                }
            ]
        },

        // ─────────────────────────────────────────────────────────────────────
        // THÈME 5 — Techniques de Prompting (addendum complet)
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
                            description: 'Template prêt à l\'emploi pour toute demande d\'analyse.',
                            level: 'beginner',
                            tags: ['ia', 'template', 'analyse', 'donnees', 'prompting'],
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

<output>
Structure attendue :
1. Réponse directe (1 phrase)
2. Chiffres clés (bullet points)
3. Observation notable (si applicable)
</output>`
                        },
                        {
                            id: 'template_code',
                            title: 'Template — Génération de code',
                            description: 'Template pour obtenir du code propre, commenté et fonctionnel.',
                            level: 'beginner',
                            tags: ['ia', 'template', 'code', 'developpement', 'prompting'],
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
- Ajouter des commentaires sur les lignes non évidentes
- Gérer les cas d'erreur (try/except, IFERROR...)
- Pas de bibliothèques externes sauf : {{LIBS_AUTORISEES}}
</constraints>

<output>
1. Code complet dans un bloc de code {{LANGAGE}}
2. Explication en 3 points : ce que fait le code, les choix techniques, les limites
</output>`
                        },
                        {
                            id: 'template_debug',
                            title: 'Template — Débogage',
                            description: 'Fournir le contexte d\'erreur correctement pour un diagnostic fiable.',
                            level: 'intermediate',
                            tags: ['ia', 'template', 'debug', 'erreur', 'prompting'],
                            code: `<role>
Tu es expert en débogage {{LANGAGE_OUTIL}}.
Tu identifies la cause racine, pas seulement le symptôme.
</role>

<context>
Outil/Langage : {{OUTIL}}
Objectif du code : {{CE_QUE_CA_DEVRAIT_FAIRE}}
</context>

<bug>
Comportement observé : {{CE_QUI_SE_PASSE}}
Comportement attendu : {{CE_QUI_DEVRAIT_SE_PASSER}}
Message d'erreur (si applicable) :
{{MESSAGE_ERREUR}}
</bug>

<code>
{{CODE_PROBLEMATIQUE}}
</code>

<context_supplementaire>
Ce qui a été essayé : {{TENTATIVES_PRECEDENTES}}
Quand ça arrive : {{CONDITIONS_DE_DECLENCHEMENT}}
</context_supplementaire>

<task>
Identifie la cause de ce bug et propose un correctif.
</task>

<output>
1. Cause identifiée (1-2 phrases)
2. Code corrigé
3. Explication du correctif
4. Comment éviter ce bug à l'avenir
</output>`
                        }
                    ]
                }
            ]
        }
    ]
};
