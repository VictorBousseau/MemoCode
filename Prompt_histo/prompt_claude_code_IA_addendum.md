# ADDENDUM au prompt principal — 2 ajouts majeurs

Ce fichier complète `prompt_claude_code_IA.md`.
Il ajoute : (A) les instructions visuelles pour les schémas, (B) un nouveau sous-onglet "Techniques de Prompting".

---

## A — INSTRUCTIONS VISUELLES POUR TOUS LES SCHÉMAS

### Style de référence (d'après l'image fournie)

Tous les schémas du site doivent suivre ce style visuel précis :

```
PALETTE
- Fond des schémas    : blanc ou gris très clair (#f8f8f8)
- Boîtes utilisateur  : violet/lilas pastel (#e8d5f5, texte #6b3fa0)
- Boîtes neutres      : bleu clair (#d4eaf7, texte #2a6496)
- Boîtes LLM/IA       : vert menthe (#c8f0d8, texte #1a6b3a)
- Boîtes réponse      : rose/saumon clair (#ffd5d5, texte #8b2a2a)
- Boîtes outils       : jaune/crème (#fff3c4, texte #7a5800)
- Boîtes mémoire      : beige/sable (#f5e6d3, texte #7a4f2e)
- Flèches             : gris foncé (#555), épaisseur 1.5px, pointe de flèche simple
- Bordures boîtes     : 1px solid, couleur légèrement plus foncée que le fond
- Border-radius       : 20px (très arrondi, style "pill" pour les labels)
- Police              : monospace ou sans-serif propre, taille 13-14px
- Ombre boîtes        : légère (box-shadow: 2px 2px 6px rgba(0,0,0,0.08))

STRUCTURE GÉNÉRALE
- Chaque concept = un bloc délimité par une bordure pointillée (#bbb, border: 1.5px dashed)
- Padding interne : 20px
- Les blocs sont empilés VERTICALEMENT (pas horizontalement)
- À droite de chaque bloc : label en gros texte gras (style titre) + définition courte
  → Le label est dans un badge jaune vif (#FFE500) avec texte noir, border-radius 8px, padding 8px 16px
- Largeur totale recommandée : 600-700px max

SCHÉMA 1 — LLM (section 1.1)
Structure : User → Prompt → LLM → Answer (horizontal dans le bloc)
Label droit : "LLM" en gras + "A neural network that understands and generates text"

SCHÉMA 2 — RAG (section 1.2)
Structure : même que LLM MAIS avec ajout d'une base de données sous le flux
User → Prompt → LLM → Answer
         ↑
    [DB icône] → Context
Label droit : "RAG" en gras + définition

SCHÉMA 3 — AI Agent (section 1.3)
Structure : User → Prompt → LLM → Answer
                      ↕ (bidirectionnel)
                   Planning (haut, tirets)
                      ↕
                   Tools (bas : icônes outils)
           + Context (gauche, base de données)
           + Memory (bas-gauche, icône cerveau/puce)
Label droit : "AI Agent" en gras + définition

SCHÉMA 4 — MCP (section 1.4)
Structure verticale :
   [App (Cursor / Claude Desktop)]
          ↓ Unified API
   [Model Context Protocol]
    ↙        ↓        ↘
[GitHub]  [Slack]  [Local FS]
  Unique API sous chaque flèche
Label droit : "MCP" en gras + définition

Ces 4 schémas doivent être regroupés dans UNE SEULE section visuelle "Vue d'ensemble"
en haut du sous-onglet 1.1, avant les cards individuelles.
Ils sont empilés verticalement comme dans l'image de référence.
```

### Code HTML/CSS de base pour les boîtes

```html
<!-- Template boîte concept -->
<div class="schema-wrapper">
  <!-- Bloc gauche : le schéma -->
  <div class="schema-block" style="border: 1.5px dashed #bbb; border-radius: 12px; padding: 20px; background: #fff;">
    <!-- Contenu du flux (User, Prompt, LLM, Answer...) -->
    <div style="display: flex; align-items: center; gap: 12px;">
      <span class="node node-user">User</span>
      <span class="arrow">→</span>
      <span class="node node-neutral">Prompt</span>
      <span class="arrow">→</span>
      <span class="node node-llm">⚙ LLM</span>
      <span class="arrow">→</span>
      <span class="node node-answer">Answer</span>
    </div>
  </div>
  <!-- Bloc droit : label + définition -->
  <div class="schema-label">
    <span class="concept-badge">LLM</span>
    <p>A neural network that understands and generates human-like text.</p>
  </div>
</div>

<style>
.node { padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; }
.node-user    { background: #e8d5f5; color: #6b3fa0; border: 1px solid #c9a8e8; }
.node-neutral { background: #d4eaf7; color: #2a6496; border: 1px solid #9fc8e8; }
.node-llm     { background: #c8f0d8; color: #1a6b3a; border: 1px solid #8dd4aa; }
.node-answer  { background: #ffd5d5; color: #8b2a2a; border: 1px solid #f0a0a0; }
.node-tool    { background: #fff3c4; color: #7a5800; border: 1px solid #e8d880; }
.node-memory  { background: #f5e6d3; color: #7a4f2e; border: 1px solid #e0c4a0; }
.arrow { color: #555; font-size: 16px; }
.concept-badge { background: #FFE500; color: #000; font-size: 24px; font-weight: 900;
                 padding: 6px 16px; border-radius: 8px; display: inline-block; }
</style>
```

---

## B — NOUVEAU SOUS-ONGLET : "Techniques de Prompting"

Ajouter ce 5ème sous-onglet dans l'onglet "IA & Agents" :

```
IA & Agents
├── 1. Concepts & Fondamentaux
├── 2. Outils & Setup
├── 3. Patterns & Architectures
├── 4. Actualités IA
└── 5. Techniques de Prompting   ← NOUVEAU
```

Sidebar du sous-onglet 5 :
- 5.1 Anatomie d'un bon prompt
- 5.2 La hiérarchie Anthropic (5 niveaux)
- 5.3 Techniques avancées
- 5.4 Outils officiels Anthropic
- 5.5 Templates réutilisables

---

### 5.1 — Anatomie d'un bon prompt

**SCHÉMA INTERACTIF à créer** — le plus important de cette section :

Un prompt décomposé visuellement en blocs colorés annotés.
Chaque composant est une "couche" empilée verticalement, avec une couleur et un label.

```
┌─────────────────────────────────────────────────────┐  ← Bloc 1 : RÔLE (fond violet)
│  Tu es un expert en analyse de données Power BI.    │  Label : "🎭 Rôle"
│  Tu travailles dans le secteur de l'assurance.      │  "Définir qui est le modèle"
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  ← Bloc 2 : CONTEXTE (fond bleu)
│  <contexte>                                          │  Label : "📋 Contexte"
│  J'ai une table Portefeuille avec les colonnes :    │  "Donner les informations
│  Cotisation, Sinistre, Region, DateContrat          │   nécessaires"
│  </contexte>                                         │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  ← Bloc 3 : TÂCHE (fond vert)
│  <tâche>                                             │  Label : "🎯 Tâche"
│  Écris une mesure DAX qui calcule le taux de        │  "L'instruction principale,
│  sinistralité par région pour l'année en cours.     │   claire et précise"
│  </tâche>                                            │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  ← Bloc 4 : EXEMPLES (fond jaune)
│  <exemple>                                           │  Label : "💡 Exemples (few-shot)"
│  Exemple attendu :                                   │  "Montrer le format voulu"
│  Taux Sinistralité = DIVIDE(SUM([Sinistre]),...)    │
│  </exemple>                                          │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  ← Bloc 5 : CONTRAINTES (fond orange)
│  <contraintes>                                       │  Label : "⚙️ Contraintes"
│  - Utilise DIVIDE pour éviter les erreurs           │  "Format, longueur, style,
│  - Ajoute un commentaire explicatif                 │   limites"
│  - Réponds en français uniquement                   │
│  </contraintes>                                      │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐  ← Bloc 6 : FORMAT (fond rose)
│  Réponds avec : le code DAX dans un bloc ```dax,   │  Label : "📄 Format de sortie"
│  suivi d'une explication en 3 bullet points max.   │  "Spécifier la structure
│                                                      │   de la réponse"
└─────────────────────────────────────────────────────┘
```

Implémentation : SVG ou HTML/CSS pur. Les blocs sont cliquables — au clic,
un tooltip/popover apparaît avec une explication détaillée du composant.

---

**Card : "Les 6 composants d'un prompt efficace"**
Badge: Débutant | Tags: #prompting #structure #fondamentaux
Sous-titre: "Ce que doit contenir un prompt pour obtenir des résultats fiables."
Bloc 💡:
```
Tous les composants ne sont pas toujours nécessaires.
Règle : commencer simple, ajouter des composants si les résultats sont insuffisants.

OBLIGATOIRE (toujours) :
✅ Tâche — ce que tu veux que le modèle fasse (1 phrase claire)

FORTEMENT RECOMMANDÉ :
✅ Contexte — les informations nécessaires pour accomplir la tâche
✅ Format de sortie — comment tu veux la réponse (longueur, structure, langue)

OPTIONNEL MAIS PUISSANT :
⚡ Rôle — qui doit être le modèle ("tu es expert en...")
⚡ Exemples — 1 à 3 exemples du résultat attendu (few-shot)
⚡ Contraintes — ce qu'il ne faut PAS faire

"Test du collègue" (Anthropic) :
→ Montre ton prompt à un collègue. S'il est confus, l'IA le sera aussi.
→ Si ton collègue comprend l'objectif et le format attendu : le prompt est bon.
```

**Card : "Le XML Tagging — la signature Anthropic"**
Badge: Intermédiaire | Tags: #prompting #xml #anthropic #structure
Sous-titre: "Structurer ses prompts avec des balises XML pour plus de précision."
Bloc 💡:
```
Claude a été entraîné avec des prompts contenant des balises XML.
Utiliser des tags améliore la précision, réduit les ambiguïtés,
et facilite l'extraction programmatique des outputs.

Balises courantes (conventions Anthropic) :
<context>     → informations de fond
<task>        → l'instruction principale
<example>     → exemples few-shot
<document>    → documents fournis en contexte (RAG)
<thinking>    → demander au modèle de raisonner avant de répondre
<answer>      → délimiter la réponse finale
<constraints> → règles et restrictions
<output>      → spécifier le format de sortie

Règle : les noms de tags sont libres, ce qui compte c'est la cohérence.
```
Bloc code :
```xml
<!-- ✅ Prompt structuré avec XML -->
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
</output>
```

---

### 5.2 — La hiérarchie Anthropic (5 niveaux)

**SCHÉMA à créer — Pyramide à 5 niveaux :**

```
                    ▲
                   ╱ ╲          Niveau 5
                  ╱ 5  ╲        RÔLE
                 ╱───────╲      "Agis comme..."
                ╱    4    ╲     Niveau 4
               ╱ STRUCTURE  ╲   XML tags, sections
              ╱─────────────╲
             ╱       3       ╲  Niveau 3
            ╱     RÔLE        ╲ Assigner une identité
           ╱───────────────────╲
          ╱          2          ╲ Niveau 2
         ╱       EXEMPLES        ╲ Few-shot, montrer
        ╱───────────────────────── ╲
       ╱              1              ╲ Niveau 1 (BASE)
      ╱    CLARTÉ & INSTRUCTIONS      ╲ La fondation
     ╱─────────────────────────────────╲

Commencer par la base — ajouter les niveaux si nécessaire.
```

Note : d'après le guide Anthropic officiel, les niveaux par impact croissant sont :
1. Clarté & instructions directes (le plus impactant, souvent négligé)
2. Exemples (few-shot)
3. Rôle (role prompting)
4. Structure (XML tags, formatage)
5. Techniques avancées (CoT, prefill...)

**Card : "Niveau 1 — Clarté & Instructions directes"**
Badge: Débutant | Tags: #prompting #clarté #base
Sous-titre: "La fondation. 80% des problèmes viennent d'ici."
Bloc code :
```
❌ VAGUE
"Analyse mes données"

✅ CLAIR
"Lis le tableau CSV ci-joint. Identifie les 3 régions avec le plus fort
taux de sinistralité (Sinistre/Cotisation). Classe-les du plus élevé au
plus bas. Réponds en 3 bullet points, chiffres inclus."

Règles de clarté :
→ 1 tâche = 1 prompt (ne pas mélanger plusieurs objectifs)
→ Spécifier le format de sortie AVANT la tâche
→ Donner les contraintes en positif ("fais X") plutôt qu'en négatif ("ne fais pas Y")
→ Si la tâche a des étapes, les numéroter
```

**Card : "Niveau 2 — Few-shot (exemples)"**
Badge: Débutant | Tags: #prompting #fewshot #exemples
Sous-titre: "Montrer 1 à 3 exemples multiplie la qualité des outputs."
Bloc code :
```xml
<task>
Classe chaque région selon son niveau de risque en 3 catégories :
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
</input>
```

**Card : "Niveau 3 — Role Prompting"**
Badge: Débutant | Tags: #prompting #role #persona
Sous-titre: "Assigner une identité au modèle change le style et la profondeur."
Bloc 💡:
```
Le role prompting fonctionne UNIQUEMENT si la clarté et les exemples sont déjà en place.
C'est une erreur courante de commencer par là.

Niveaux de spécificité (du moins au plus efficace) :
❌ "Tu es un assistant utile"           (trop générique)
✓  "Tu es un expert en Power BI"        (domaine)
✓✓ "Tu es un expert en Power BI        (domaine + industrie)
    dans le secteur de l'assurance"
✓✓✓ "Tu es un expert en Power BI       (domaine + industrie + contrainte)
    dans une mutuelle. Tu expliques
    toujours avec des exemples DAX
    concrets et évites le jargon."
```

---

### 5.3 — Techniques avancées

**Card : "Prefilling — guider le début de la réponse"**
Badge: Avancé | Tags: #prompting #prefill #contrôle
Sous-titre: "Forcer Claude à commencer sa réponse par ce que tu veux."
Bloc 💡:
```
Le prefilling = pré-remplir le premier token de la réponse de l'assistant.
Anthropic-specific : utilisable via l'API avec le paramètre "assistant" dans les messages.

Cas d'usage :
→ Forcer la réponse en JSON : préfill avec "{"
→ Sauter le préambule : préfill avec la réponse directe
→ Maintenir un persona : préfill avec "[Expert DAX]"
→ Forcer une structure : préfill avec "## Analyse\n"
```
Bloc code :
```python
# API Anthropic — prefilling via le rôle "assistant"
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Analyse ce taux de sinistralité : 87%"},
        {"role": "assistant", "content": "{"}  # ← Prefill : force le JSON
    ]
)
# Claude continuera directement le JSON, sans préambule
```

**Card : "Extended Thinking — laisser Claude réfléchir"**
Badge: Avancé | Tags: #prompting #thinking #raisonnement #claude37
Sous-titre: "Activer le mode réflexion étendue pour les tâches complexes."
Bloc 💡:
```
Disponible depuis Claude 3.7 Sonnet (février 2025).
Le modèle "réfléchit" en interne (tokens de pensée non facturés dans certains plans)
avant de répondre — améliore significativement les tâches de raisonnement complexe.

Quand l'activer :
→ Problèmes mathématiques ou logiques multi-étapes
→ Analyse de code complexe avec plusieurs fichiers
→ Décisions avec de nombreux critères à pondérer
→ Debugging de pipeline DAX/Python non évident

Quand NE PAS l'activer :
→ Tâches simples (rédaction, résumé, classification)
→ Réponses rapides nécessaires
→ Budget de tokens limité
```
Bloc code :
```python
# Activer Extended Thinking via l'API
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,  # Doit être > budget_tokens
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # Tokens de réflexion alloués
    },
    messages=[{
        "role": "user",
        "content": "Analyse ce pipeline DAX complexe et identifie pourquoi le total ne correspond pas..."
    }]
)
# response.content[0] = bloc "thinking" (raisonnement interne)
# response.content[1] = bloc "text" (réponse finale)
```

**Card : "Prompt Chaining — découper les tâches complexes"**
Badge: Avancé | Tags: #prompting #chaining #pipeline
Sous-titre: "Enchaîner plusieurs prompts pour les tâches en plusieurs étapes."
Bloc 💡:
```
Une erreur courante : mettre TOUT dans un seul prompt géant.
Le prompt chaining = décomposer en étapes, où l'output de l'étape N est l'input de N+1.

Avantages :
→ Meilleure qualité sur chaque étape
→ Plus facile à debugger (tu sais à quelle étape ça coince)
→ Possibilité d'insérer une validation humaine entre les étapes
→ Réutilisabilité des étapes individuelles
```
Bloc code :
```python
# Exemple : pipeline d'analyse en 3 étapes
import anthropic
client = anthropic.Anthropic()

# Étape 1 : Extraction
data_raw = "Region: Nord 87%, Sud 62%, Est 43%, Ouest 91%"
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
```

---

### 5.4 — Outils officiels Anthropic

**Card : "Prompt Generator — console.anthropic.com"**
Badge: Débutant | Tags: #outils #anthropic #console #promptgenerator
Sous-titre: "Décrire ce que tu veux → obtenir un prompt production-ready en 30 secondes."
Bloc 💡:
```
Lancé par Anthropic dans leur console développeur.
Tu décris ta tâche en langage naturel → Claude génère un prompt structuré
avec XML tags, variables {{HANDLEBARS}}, et best practices intégrées.

Comment l'utiliser :
1. Aller sur console.anthropic.com
2. Onglet "Prompts" → "Generate Prompt"
3. Décrire la tâche : "Analyser un rapport de sinistres et extraire les 3 KPIs clés"
4. Optionnel : spécifier les variables que tu veux (ex: {{RAPPORT}}, {{PERIODE}})
5. Claude génère le prompt — tu peux l'éditer directement

Ce qu'il fait automatiquement :
→ Ajoute un rôle approprié
→ Structure avec XML tags
→ Identifie les variables dynamiques → les met en {{HANDLEBARS}}
→ Ajoute des exemples si pertinent
→ Spécifie le format de sortie

Résultat moyen : 80% moins de temps de prompting selon Anthropic.
```

**Card : "Prompt Improver — améliorer un prompt existant"**
Badge: Débutant | Tags: #outils #anthropic #console #promptimprover
Sous-titre: "Coller ton prompt existant → obtenir une version optimisée."
Bloc 💡:
```
Disponible dans la même console (console.anthropic.com).
Différence avec le Generator : il CONSERVE tes variables existantes
et améliore la structure sans changer ton intent.

Cas d'usage :
→ Tu as un prompt qui marche "à peu près" — tu veux l'optimiser
→ Tu veux voir comment Anthropic structurerait ton prompt
→ Tu prépares un prompt pour la production (vs. usage ponctuel)

Outil complémentaire : l'onglet "Evaluate" dans la console
→ Tester ton prompt sur plusieurs exemples en parallèle
→ Comparer 2 versions de prompt côte à côte
→ Générer des cas de test automatiquement avec Claude
```

---

### 5.5 — Templates réutilisables

**Card : "Template — Analyse de données"**
Badge: Débutant | Tags: #template #analyse #données
Sous-titre: "Template prêt à l'emploi pour toute demande d'analyse."
Bloc code :
```xml
<role>
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
</output>
```

**Card : "Template — Génération de code"**
Badge: Débutant | Tags: #template #code #développement
Sous-titre: "Template pour obtenir du code propre, commenté et fonctionnel."
Bloc code :
```xml
<role>
Tu es un développeur {{LANGAGE}} senior.
Tu écris du code propre, commenté, et tu expliques tes choix.
</role>

<context>
Projet : {{DESCRIPTION_PROJET}}
Environnement : {{ENV}} (Python 3.11 / Power BI Desktop / etc.)
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
1. Code complet dans un bloc ```{{LANGAGE}}
2. Explication en 3 points : ce que fait le code, les choix techniques, les limites
</output>
```

**Card : "Template — Débogage"**
Badge: Intermédiaire | Tags: #template #debug #erreur
Sous-titre: "Fournir le contexte d'erreur correctement pour un diagnostic fiable."
Bloc code :
```xml
<role>
Tu es expert en débogage {{LANGAGE/OUTIL}}.
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
</output>
```

---

## C — MISE À JOUR DE LA TIMELINE (section 4)

Ajouter ces 2 entrées supplémentaires liées au prompting :

```
2024
├── Mai 2024 | Anthropic | "Prompt Generator dans la Console" | #outil
│   Génération automatique de prompts production-ready via la console développeur.
│   Réduction du temps de prompting de 80% selon les early adopters.

2025
├── Fév. 2025 | Anthropic | "Extended Thinking (Claude 3.7)" | #modèle #prompting
│   Mode de réflexion étendue — le modèle "pense" avant de répondre.
│   Amélioration majeure sur les tâches de raisonnement et de code complexe.
```

---

## D — RAPPEL DES CONTRAINTES GLOBALES

Ces contraintes s'ajoutent à celles du prompt principal :

1. Le sous-onglet "Techniques de Prompting" utilise le même design system que les autres
2. Le schéma "Anatomie d'un prompt" doit être **interactif** (tooltip au clic/hover)
3. La pyramide des 5 niveaux doit être un SVG animé (les niveaux s'illuminent au hover)
4. Les templates sont dans des blocs de code copiables (bouton "Copier" comme pour les snippets DAX)
5. Les 4 schémas LLM/RAG/Agent/MCP groupés en "Vue d'ensemble" sont SVG/HTML pur,
   style fidèle à l'image de référence fournie (boîtes pastels arrondies, fond blanc,
   labels jaunes en gras à droite, bordures pointillées par concept)
