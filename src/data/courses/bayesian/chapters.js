// Chapter content for Bayesian Networks course
// Each chapter has its content in markdown format

export const bayesianChapters = {
    '01-introduction': `
# Module 1 : Introduction aux Réseaux Bayésiens

## Qu'est-ce qu'un Réseau Bayésien ?

Un **Réseau Bayésien** (RB) est un modèle graphique probabiliste qui représente un ensemble de variables aléatoires et leurs **dépendances conditionnelles** via un graphe orienté acyclique (DAG).

### Pourquoi les utiliser ?

| Avantage | Description |
|----------|-------------|
| 🎯 **Modélisation causale** | Représente les relations cause-effet |
| 🔍 **Raisonnement bidirectionnel** | Diagnostic ET prédiction |
| 📊 **Gestion de l'incertitude** | Probabilités plutôt que certitudes |
| 🧩 **Interprétabilité** | Structure explicite et compréhensible |

### Applications concrètes

- **Médecine** : Diagnostic médical (ex: aide au diagnostic COVID)
- **Finance** : Évaluation des risques de crédit
- **Industrie** : Maintenance prédictive
- **Marketing** : Segmentation client, propension à l'achat

## Historique

- **1988** : Judea Pearl formalise les réseaux bayésiens
- **1990s** : Développement des algorithmes d'inférence efficaces
- **2000s** : Applications industrielles massives
- **2011** : Prix Turing pour Judea Pearl

## Exemple introductif : Le réseau "Alarme"

Imaginons un système d'alarme domestique :
- L'alarme peut se déclencher suite à un **cambriolage** OU un **tremblement de terre**
- Si l'alarme sonne, **Jean** et **Marie** (voisins) peuvent appeler

\`\`\`
    Cambriolage     Tremblement
         \\           /
          ↘         ↙
            Alarme
           /       \\
          ↓         ↓
       Jean       Marie
      appelle    appelle
\`\`\`

### Questions que le RB peut résoudre :

1. **Prédiction** : Si un cambriolage se produit, quelle est la probabilité que Jean appelle ?
2. **Diagnostic** : Si Jean appelle, quelle est la probabilité qu'il y ait eu un cambriolage ?
3. **Explaining away** : Si Jean appelle ET qu'il y a un tremblement, la probabilité de cambriolage diminue !

## Composants d'un Réseau Bayésien

### 1. Structure (Graphe)
- **Nœuds** = Variables aléatoires
- **Arêtes** = Dépendances directes (Parent → Enfant)
- **DAG** = Directed Acyclic Graph (pas de cycles)

### 2. Paramètres (CPT)
- Chaque nœud a une **Table de Probabilité Conditionnelle** (CPT)
- P(Nœud | Parents) pour les nœuds avec parents
- P(Nœud) pour les nœuds racines

## Installation de pgmpy

\`\`\`python
# Installation
pip install pgmpy

# Imports de base
from pgmpy.models import BayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination
\`\`\`

## Exercice 🎯

**Réflexion** : Pensez à un problème de votre domaine qui pourrait être modélisé par un réseau bayésien. Identifiez :
1. Les variables importantes
2. Les relations de dépendance entre elles
3. Quelles questions d'inférence vous aimeriez poser
`,

    '02-probabilites': `
# Module 2 : Rappels de Probabilités

## Probabilités de Base

### Définitions fondamentales

| Concept | Définition | Notation |
|---------|------------|----------|
| **Probabilité marginale** | P d'un événement seul | P(A) |
| **Probabilité jointe** | P de plusieurs événements ensemble | P(A, B) |
| **Probabilité conditionnelle** | P d'un événement sachant un autre | P(A | B) |

### Règle de Bayes

La formule fondamentale qui permet d'inverser les conditionnelles :

\`\`\`
P(A | B) = P(B | A) × P(A) / P(B)
\`\`\`

- **P(A | B)** : Posterior (ce qu'on cherche)
- **P(B | A)** : Vraisemblance (likelihood)
- **P(A)** : Prior (croyance a priori)
- **P(B)** : Evidence (normalisation)

### Exemple concret

> Si 1% de la population a une maladie, et un test détecte 90% des malades (sensibilité) mais donne 5% de faux positifs...
> **Quelle est la probabilité d'être malade si le test est positif ?**

\`\`\`python
# Données
P_maladie = 0.01  # Prior
P_positif_si_malade = 0.90  # Sensibilité
P_positif_si_sain = 0.05  # Faux positifs

# Calcul de P(positif) - loi totale
P_positif = P_positif_si_malade * P_maladie + P_positif_si_sain * (1 - P_maladie)

# Bayes
P_malade_si_positif = (P_positif_si_malade * P_maladie) / P_positif
print(f"P(malade | positif) = {P_malade_si_positif:.2%}")
# Résultat : environ 15% ! (bien plus bas qu'attendu)
\`\`\`

## Indépendance

### Indépendance marginale

Deux variables A et B sont **indépendantes** si :

\`\`\`
P(A, B) = P(A) × P(B)
\`\`\`

ou de façon équivalente :

\`\`\`
P(A | B) = P(A)
\`\`\`

### Indépendance conditionnelle

A et B sont **conditionnellement indépendantes** sachant C si :

\`\`\`
P(A, B | C) = P(A | C) × P(B | C)
\`\`\`

> 💡 C'est le concept **clé** des réseaux bayésiens !

## Règle de la chaîne (Chain Rule)

Pour calculer une probabilité jointe :

\`\`\`
P(A, B, C) = P(A) × P(B | A) × P(C | A, B)
\`\`\`

Plus généralement pour n variables :

\`\`\`
P(X₁, X₂, ..., Xₙ) = ∏ P(Xᵢ | X₁, ..., Xᵢ₋₁)
\`\`\`

### Simplification grâce aux RB

Dans un réseau bayésien, grâce aux indépendances conditionnelles :

\`\`\`
P(X₁, ..., Xₙ) = ∏ P(Xᵢ | Parents(Xᵢ))
\`\`\`

C'est beaucoup plus simple ! Au lieu de conditionner sur TOUTES les variables précédentes, on conditionne uniquement sur les **parents directs**.

## Exercice 🎯

Calculez P(Alarme = Oui) dans le réseau suivant :
- P(Cambriolage) = 0.001
- P(Tremblement) = 0.002
- P(Alarme | Camb=O, Trem=O) = 0.95
- P(Alarme | Camb=O, Trem=N) = 0.94
- P(Alarme | Camb=N, Trem=O) = 0.29
- P(Alarme | Camb=N, Trem=N) = 0.001
`,

    '03-independance': `
# Module 3 : Indépendance Conditionnelle et d-Séparation

## Pourquoi l'indépendance conditionnelle ?

L'indépendance conditionnelle est le **fondement théorique** des réseaux bayésiens. Elle permet de :
1. **Simplifier** les calculs de probabilités
2. **Réduire** le nombre de paramètres à estimer
3. **Encoder** les connaissances causales

## Les 3 Structures de Base

### 1. Chaîne (Chain)

\`\`\`
A → B → C
\`\`\`

- **A et C sont-ils indépendants ?** Non, A influence C via B
- **A et C sont-ils indépendants sachant B ?** OUI !

> Si on connaît B, A n'apporte plus d'information sur C.

**Exemple** : Fumer → Cancer → Toux
- Si on sait qu'il y a un cancer, savoir si la personne fume n'aide pas à prédire la toux.

### 2. Cause Commune (Fork / Common Cause)

\`\`\`
A ← B → C
\`\`\`

- **A et C indépendants ?** Non, ils ont une cause commune B
- **A et C indépendants sachant B ?** OUI !

> Observer B "bloque" la corrélation entre A et C.

**Exemple** : Température → Glace + Température → Noyades
- Glaces et noyades sont corrélées (été), mais sachant la température, ils deviennent indépendants.

### 3. V-Structure (Collider / Explaining Away)

\`\`\`
A → B ← C
\`\`\`

- **A et C indépendants ?** OUI ! (pas de lien direct)
- **A et C indépendants sachant B ?** NON !

> C'est contre-intuitif : observer B **crée** une dépendance entre A et C !

**Exemple** : Cambriolage → Alarme ← Tremblement
- Cambriolage et Tremblement sont indépendants a priori
- Mais si l'alarme sonne, et qu'on sait qu'il y a un tremblement, ça "explique" l'alarme et **réduit** la probabilité de cambriolage !

## D-Séparation

La **d-séparation** est l'algorithme qui détermine si deux variables sont conditionnellement indépendantes dans un DAG.

### Règles

Deux nœuds X et Y sont **d-séparés** par un ensemble Z si TOUT chemin entre X et Y est "bloqué".

Un chemin est bloqué si :
1. Il contient une **chaîne** A → B → C ou **fork** A ← B → C où B ∈ Z
2. Il contient un **collider** A → B ← C où B ∉ Z et aucun descendant de B n'est dans Z

### Exemple avec pgmpy

\`\`\`python
from pgmpy.models import BayesianNetwork

model = BayesianNetwork([
    ('Cambriolage', 'Alarme'),
    ('Tremblement', 'Alarme'),
    ('Alarme', 'JeanAppelle'),
    ('Alarme', 'MarieAppelle')
])

# Cambriolage ⊥ Tremblement ? (sans observation)
print(model.is_d_separated('Cambriolage', 'Tremblement', {}))
# True : marginalement indépendants

# Cambriolage ⊥ Tremblement | Alarme ?
print(model.is_d_separated('Cambriolage', 'Tremblement', {'Alarme'}))
# False : conditionnellement dépendants (explaining away)

# JeanAppelle ⊥ MarieAppelle | Alarme ?
print(model.is_d_separated('JeanAppelle', 'MarieAppelle', {'Alarme'}))
# True : conditionnellement indépendants
\`\`\`

## Markov Blanket

Le **Markov Blanket** d'un nœud X est l'ensemble minimal de nœuds qui rend X indépendant de tous les autres.

\`\`\`
Markov Blanket(X) = Parents(X) ∪ Enfants(X) ∪ Co-Parents(X)
\`\`\`

> Connaissant le Markov Blanket, on peut ignorer tout le reste du réseau pour X !

## Exercice 🎯

Dans le réseau :
\`\`\`
A → B → D
      ↑
C ────┘
\`\`\`

1. A et C sont-ils d-séparés par {} ?
2. A et C sont-ils d-séparés par {B} ?
3. A et D sont-ils d-séparés par {B} ?
`,

    '04-dag': `
# Module 4 : Graphes Orientés Acycliques (DAG)

## Définition formelle

Un **DAG** (Directed Acyclic Graph) est un graphe où :
- Les arêtes sont **orientées** (flèches)
- Il n'existe **aucun cycle** (impossible de revenir à un nœud en suivant les flèches)

### Terminologie

| Terme | Définition |
|-------|------------|
| **Parent** | Nœud avec une flèche vers X |
| **Enfant** | Nœud vers lequel X a une flèche |
| **Ancêtre** | Parent, ou parent de parent, etc. |
| **Descendant** | Enfant, ou enfant d'enfant, etc. |
| **Racine** | Nœud sans parent |
| **Feuille** | Nœud sans enfant |

## Construction d'un DAG avec pgmpy

\`\`\`python
from pgmpy.models import BayesianNetwork

# Définir les arêtes : liste de tuples (parent, enfant)
model = BayesianNetwork([
    ('Pluie', 'Herbe_Mouillée'),
    ('Arroseur', 'Herbe_Mouillée'),
    ('Pluie', 'Arroseur')  # La pluie influence l'usage de l'arroseur
])

# Visualiser la structure
print("Nœuds:", list(model.nodes()))
print("Arêtes:", list(model.edges()))

# Requêtes sur la structure
print("Parents de Herbe_Mouillée:", model.get_parents('Herbe_Mouillée'))
print("Enfants de Pluie:", model.get_children('Pluie'))
\`\`\`

## Visualisation graphique

\`\`\`python
import networkx as nx
import matplotlib.pyplot as plt

# Créer le graphe NetworkX à partir du modèle
G = nx.DiGraph(model.edges())

# Dessiner
pos = nx.spring_layout(G, seed=42)
nx.draw(G, pos, with_labels=True, 
        node_color='lightblue', 
        node_size=2000,
        font_size=10,
        arrows=True,
        arrowsize=20)
plt.title("Structure du Réseau Bayésien")
plt.show()
\`\`\`

## Sémantique causale

Dans un RB, les arêtes représentent souvent des **relations causales** :
- Parent → Enfant signifie "le parent cause (ou influence) l'enfant"

### Attention !
- Corrélation ≠ Causalité
- Le DAG encode des **hypothèses** causales
- Ces hypothèses doivent être validées par des experts du domaine

## Propriétés importantes

### Ordre topologique

Un DAG peut toujours être ordonné de façon **topologique** :
Chaque nœud apparaît après tous ses parents.

\`\`\`python
import networkx as nx

# Obtenir un ordre topologique
order = list(nx.topological_sort(G))
print("Ordre topologique:", order)
# Ex: ['Pluie', 'Arroseur', 'Herbe_Mouillée']
\`\`\`

### Factorisation

Le DAG définit une **factorisation** de la distribution jointe :

\`\`\`
P(X₁, ..., Xₙ) = ∏ P(Xᵢ | Parents(Xᵢ))
\`\`\`

## Bonnes pratiques de modélisation

1. **Commencez par les causes** (nœuds racines)
2. **Évitez les cycles** (physiquement impossibles dans un DAG)
3. **Validez avec des experts** du domaine
4. **Testez les indépendances** implicites du modèle

## Exercice 🎯

Modélisez le scénario suivant en DAG :
- Le niveau d'études influence le salaire
- Le salaire influence le quartier de résidence
- Le quartier influence la qualité de l'école des enfants
- Le niveau d'études des parents influence aussi directement les résultats scolaires des enfants
`,

    '05-cpt': `
# Module 5 : Tables de Probabilités Conditionnelles (CPT)

## Définition

Une **CPT** (Conditional Probability Table) définit la distribution de probabilité d'un nœud **étant donné ses parents**.

- Pour un nœud **racine** : P(X) - distribution marginale
- Pour un nœud avec **parents** : P(X | Parents)

## Structure d'une CPT

### Nœud sans parent

\`\`\`python
from pgmpy.factors.discrete import TabularCPD

# P(Pluie) - 2 états : [Non, Oui]
cpd_pluie = TabularCPD(
    variable='Pluie',
    variable_card=2,  # Nombre d'états
    values=[[0.8], [0.2]]  # P(Non)=0.8, P(Oui)=0.2
)
print(cpd_pluie)
\`\`\`

Sortie :
\`\`\`
+----------+-----+
| Pluie(0) | 0.8 |
+----------+-----+
| Pluie(1) | 0.2 |
+----------+-----+
\`\`\`

### Nœud avec un parent

\`\`\`python
# P(Herbe_Mouillée | Pluie)
cpd_herbe = TabularCPD(
    variable='Herbe_Mouillée',
    variable_card=2,
    values=[
        [0.9, 0.1],  # P(Sec | Pluie=Non), P(Sec | Pluie=Oui)
        [0.1, 0.9]   # P(Mouillé | ...)
    ],
    evidence=['Pluie'],
    evidence_card=[2]
)
\`\`\`

### Nœud avec plusieurs parents

\`\`\`python
# P(Herbe_Mouillée | Pluie, Arroseur)
# Les colonnes suivent l'ordre binaire des parents
cpd_herbe = TabularCPD(
    variable='Herbe_Mouillée',
    variable_card=2,
    values=[
        # Pluie:       0    0    1    1
        # Arroseur:    0    1    0    1
        [0.95, 0.10, 0.10, 0.01],  # P(Sec | ...)
        [0.05, 0.90, 0.90, 0.99]   # P(Mouillé | ...)
    ],
    evidence=['Pluie', 'Arroseur'],
    evidence_card=[2, 2]
)
\`\`\`

> ⚠️ **Ordre des colonnes** : L'ordre suit la convention "little-endian". Le premier parent varie le plus lentement.

## Validation du modèle

\`\`\`python
# Ajouter toutes les CPT au modèle
model.add_cpds(cpd_pluie, cpd_arroseur, cpd_herbe)

# Vérifier la cohérence
if model.check_model():
    print("✅ Modèle valide !")
else:
    print("❌ Erreur dans le modèle")
\`\`\`

## Nombre de paramètres

Le nombre de paramètres dans une CPT dépend de :
- **|X|** : nombre d'états du nœud
- **|Parents|** : nombre de combinaisons des états des parents

\`\`\`
Paramètres(CPT) = (|X| - 1) × ∏|Parent_i|
\`\`\`

### Exemple
- X a 3 états
- 2 parents avec 2 et 4 états

Paramètres = (3-1) × 2 × 4 = **16 paramètres**

## Représentation alternative : Noisy-OR

Pour éviter l'explosion des paramètres avec beaucoup de parents, on peut utiliser des modèles paramétriques comme **Noisy-OR**.

\`\`\`python
# Concept : chaque parent cause indépendamment l'effet avec une probabilité p_i
# P(Effet=Non | Parents) = ∏(1 - p_i) pour chaque parent_i actif
\`\`\`

## Exercice 🎯

Créez les CPT pour le réseau suivant :
- **Fièvre** : P(Oui) = 0.05
- **Grippe** : P(Oui | Fièvre=Oui) = 0.6, P(Oui | Fièvre=Non) = 0.01
- **Fatigue** : dépend de Fièvre ET Grippe

Définissez des valeurs réalistes pour P(Fatigue | Fièvre, Grippe).
`,

    '06-inference-exacte': `
# Module 6 : Inférence Exacte

## Qu'est-ce que l'inférence ?

L'**inférence** est le calcul de probabilités conditionnelles dans un réseau bayésien :

\`\`\`
P(Query | Evidence)
\`\`\`

- **Query** : Variables dont on veut la distribution
- **Evidence** : Variables observées (connues)

## Types de requêtes

| Type | Question | Exemple |
|------|----------|---------|
| **Marginale** | P(X) | Probabilité a priori d'un cambriolage |
| **Conditionnelle** | P(X \| E) | P(Cambriolage \| Alarme=Oui) |
| **MAP** | argmax P(X \| E) | L'état le plus probable |
| **MPE** | argmax P(X₁,...,Xₙ \| E) | La configuration complète la plus probable |

## Variable Elimination

L'algorithme **Variable Elimination** calcule P(Q | E) de manière exacte.

### Principe
1. Fixer les variables observées
2. Éliminer les variables cachées une par une
3. Multiplier les facteurs et marginaliser

### Implémentation avec pgmpy

\`\`\`python
from pgmpy.inference import VariableElimination

# Créer l'objet d'inférence
infer = VariableElimination(model)

# Query simple : P(Cambriolage | JeanAppelle=Oui)
result = infer.query(
    variables=['Cambriolage'],
    evidence={'JeanAppelle': 1}
)
print(result)
\`\`\`

### Query avec plusieurs variables

\`\`\`python
# P(Cambriolage, Tremblement | Alarme=Oui)
result = infer.query(
    variables=['Cambriolage', 'Tremblement'],
    evidence={'Alarme': 1}
)
print(result)
\`\`\`

## MAP Query (Maximum A Posteriori)

Trouve l'état le plus probable des variables query.

\`\`\`python
# Quel est l'état le plus probable ?
map_result = infer.map_query(
    variables=['Cambriolage', 'Tremblement'],
    evidence={'JeanAppelle': 1, 'MarieAppelle': 1}
)
print("État le plus probable:", map_result)
# {'Cambriolage': 1, 'Tremblement': 0}
\`\`\`

## Complexité

La complexité de Variable Elimination dépend de la **treewidth** du graphe.

| Treewidth | Complexité | Praticable ? |
|-----------|------------|--------------|
| Petit (< 15) | O(n × d^w) | ✅ Rapide |
| Grand (> 30) | Exponentiel | ❌ Impraticable |

> Pour les grands réseaux, on utilise l'inférence approchée (Module 7).

## Belief Propagation

Pour les **arbres** (graphes sans cycles), l'algorithme **Belief Propagation** est optimal.

\`\`\`python
from pgmpy.inference import BeliefPropagation

bp = BeliefPropagation(model)
bp.calibrate()  # Pré-calcul des messages

result = bp.query(['Cambriolage'], evidence={'JeanAppelle': 1})
\`\`\`

## Exercice 🎯

Dans le réseau Alarme :
1. Calculez P(Cambriolage | Alarme=Oui)
2. Calculez P(Cambriolage | JeanAppelle=Oui, MarieAppelle=Oui)
3. Comparez les résultats et expliquez la différence
`,

    '07-inference-approchee': `
# Module 7 : Inférence Approchée (Sampling)

## Pourquoi l'inférence approchée ?

L'inférence exacte devient **impraticable** pour :
- Les réseaux très grands
- Les réseaux avec beaucoup de connexions (treewidth élevée)

L'inférence approchée utilise des **échantillons** pour estimer les probabilités.

## Forward Sampling

Génère des échantillons selon la distribution jointe du modèle.

\`\`\`python
from pgmpy.sampling import BayesianModelSampling

sampler = BayesianModelSampling(model)

# Générer 1000 échantillons
samples = sampler.forward_sample(size=1000)
print(samples.head())
\`\`\`

### Estimer des probabilités

\`\`\`python
# Estimer P(Alarme=1)
p_alarme = samples['Alarme'].mean()
print(f"P(Alarme) ≈ {p_alarme:.4f}")

# Estimer P(Cambriolage=1, Alarme=1)
p_joint = ((samples['Cambriolage'] == 1) & (samples['Alarme'] == 1)).mean()
print(f"P(Cambriolage, Alarme) ≈ {p_joint:.4f}")
\`\`\`

## Rejection Sampling

Pour estimer P(Q | E), on génère des échantillons et on **rejette** ceux incompatibles avec E.

\`\`\`python
# P(Cambriolage | JeanAppelle=1)
samples_given = sampler.rejection_sample(
    size=1000,
    evidence=[('JeanAppelle', 1)]
)

p_camb_given = samples_given['Cambriolage'].mean()
print(f"P(Cambriolage | JeanAppelle) ≈ {p_camb_given:.4f}")
\`\`\`

### ⚠️ Problème du Rejection Sampling

Si l'évidence est **rare**, presque tous les échantillons sont rejetés !

Exemple : Si P(JeanAppelle=1) = 0.01, il faudrait générer ~100 échantillons pour en garder 1.

## Likelihood Weighting

Solution au problème de rejet : on **force** l'évidence et on **pondère** les échantillons.

\`\`\`python
samples_weighted = sampler.likelihood_weighted_sample(
    size=1000,
    evidence=[('JeanAppelle', 1)]
)

# Les échantillons ont un poids proportionnel à P(evidence | parents)
print(samples_weighted[['Cambriolage', '_weight']].head(10))
\`\`\`

## Gibbs Sampling (MCMC)

Méthode itérative qui explore l'espace des états.

\`\`\`python
from pgmpy.sampling import GibbsSampling

gibbs = GibbsSampling(model)
samples = gibbs.sample(size=1000)
\`\`\`

### Principe
1. Initialiser toutes les variables
2. Pour chaque variable (sauf evidence) :
   - Échantillonner selon P(X | Markov_Blanket(X))
3. Répéter

### Burn-in

Les premiers échantillons sont biaisés par l'initialisation. On les ignore.

\`\`\`python
samples = gibbs.sample(size=1000)
samples_clean = samples.iloc[200:]  # Ignorer les 200 premiers (burn-in)
\`\`\`

## Comparaison des méthodes

| Méthode | Avantages | Inconvénients |
|---------|-----------|---------------|
| **Forward** | Simple, rapide | Pas de conditionnement |
| **Rejection** | Simple | Inefficace si évidence rare |
| **Likelihood** | Évite le rejet | Variance peut être élevée |
| **Gibbs** | Efficace, flexible | Convergence lente possible |

## Exercice 🎯

1. Utilisez Forward Sampling pour estimer P(Alarme)
2. Utilisez Rejection Sampling pour estimer P(Cambriolage | Alarme=1)
3. Comparez avec les valeurs exactes (Variable Elimination)
`,

    '08-apprentissage-params': `
# Module 8 : Apprentissage des Paramètres

## Contexte

On connaît la **structure** (le DAG) mais pas les **paramètres** (CPT).
On veut les **estimer à partir de données**.

## Maximum Likelihood Estimation (MLE)

Le MLE estime les paramètres en **comptant les fréquences** dans les données.

\`\`\`python
import pandas as pd
from pgmpy.models import BayesianNetwork
from pgmpy.estimators import MaximumLikelihoodEstimator

# Données d'entraînement
data = pd.DataFrame({
    'Pluie':    [1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
    'Arroseur': [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1],
    'Mouillé':  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1]
})

# Définir la structure
model = BayesianNetwork([
    ('Pluie', 'Mouillé'),
    ('Arroseur', 'Mouillé')
])

# Estimer les paramètres par MLE
model.fit(data, estimator=MaximumLikelihoodEstimator)

# Afficher les CPT apprises
for cpd in model.get_cpds():
    print(f"\\n=== {cpd.variable} ===")
    print(cpd)
\`\`\`

### Formule MLE

\`\`\`
P(X=x | Parents=p) = N(X=x, Parents=p) / N(Parents=p)
\`\`\`

## Problème : Données manquantes

Si certaines combinaisons n'apparaissent pas dans les données, le MLE donne P=0 !

\`\`\`python
# Exemple : aucun cas où Pluie=1 et Arroseur=1
# → P(Mouillé | Pluie=1, Arroseur=1) = indéfini !
\`\`\`

## Bayesian Estimation

Solution : ajouter des **pseudo-observations** (prior).

\`\`\`python
from pgmpy.estimators import BayesianEstimator

model_bayes = BayesianNetwork([
    ('Pluie', 'Mouillé'),
    ('Arroseur', 'Mouillé')
])

model_bayes.fit(
    data,
    estimator=BayesianEstimator,
    prior_type='BDeu',  # Prior uniforme
    equivalent_sample_size=5  # Force du prior
)

print(model_bayes.get_cpds('Mouillé'))
\`\`\`

### Types de priors

| Prior | Description |
|-------|-------------|
| **BDeu** | Bayesian Dirichlet equivalent uniform |
| **K2** | Prior non-informatif |
| **Dirichlet** | Prior personnalisé |

### Effet du prior

\`\`\`
P(X=x | Parents=p) = (N(X=x, p) + α) / (N(p) + α × |X|)
\`\`\`

- **α** petit : Données dominent (proche MLE)
- **α** grand : Prior domine (lissage fort)

## Données incomplètes (Missing Data)

Si certaines valeurs sont manquantes (NaN), on utilise l'algorithme **EM** (Expectation-Maximization).

\`\`\`python
from pgmpy.estimators import ExpectationMaximization

# Données avec valeurs manquantes
data_missing = data.copy()
data_missing.loc[0, 'Pluie'] = None
data_missing.loc[3, 'Mouillé'] = None

em = ExpectationMaximization(model, data_missing)
model_em = em.get_parameters()
\`\`\`

## Validation

Après l'apprentissage, validez sur des données de test.

\`\`\`python
from sklearn.model_selection import train_test_split

train, test = train_test_split(data, test_size=0.2)

model.fit(train, estimator=MaximumLikelihoodEstimator)

# Évaluer la log-vraisemblance sur le test
# (métriques spécifiques aux RB)
\`\`\`

## Exercice 🎯

1. Créez un dataset de 100 échantillons pour le réseau Pluie/Arroseur/Mouillé
2. Apprenez les paramètres par MLE
3. Comparez avec les "vraies" probabilités utilisées pour générer les données
`,

    '09-apprentissage-structure': `
# Module 9 : Apprentissage de Structure

## Contexte

On ne connaît **ni la structure ni les paramètres**.
On veut découvrir le DAG optimal à partir des données.

## Approches

### 1. Score-based (Recherche)

Explore l'espace des DAGs possibles et cherche celui avec le meilleur **score**.

### 2. Constraint-based (Tests)

Utilise des **tests d'indépendance** statistiques pour découvrir les arêtes.

## Hill Climbing (Score-based)

Algorithme glouton qui améliore itérativement le DAG.

\`\`\`python
import pandas as pd
from pgmpy.estimators import HillClimbSearch, BicScore

# Données
data = pd.DataFrame({
    'A': [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
    'B': [0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    'C': [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1]
})

# Hill Climbing avec score BIC
hc = HillClimbSearch(data)
best_dag = hc.estimate(scoring_method=BicScore(data))

print("Structure découverte:")
print("Arêtes:", list(best_dag.edges()))
\`\`\`

### Opérations de modification

1. **Ajouter** une arête
2. **Supprimer** une arête
3. **Inverser** une arête

À chaque étape, on choisit l'opération qui **améliore le score**.

## Scores

| Score | Description |
|-------|-------------|
| **BIC** | Bayesian Information Criterion (pénalise la complexité) |
| **K2** | Score de Cooper & Herskovits |
| **BDeu** | Bayesian Dirichlet equivalent uniform |

\`\`\`python
from pgmpy.estimators import K2Score

# Comparer les scores
bic = BicScore(data)
k2 = K2Score(data)

print("Score BIC:", bic.score(best_dag))
print("Score K2:", k2.score(best_dag))
\`\`\`

## PC Algorithm (Constraint-based)

Découvre les arêtes via des tests d'indépendance conditionnelle.

\`\`\`python
from pgmpy.estimators import PC

pc = PC(data)
model = pc.estimate(
    significance_level=0.05,  # Niveau de confiance
    variant='stable'
)

print("Structure (PC):", list(model.edges()))
\`\`\`

### Étapes du PC
1. Commencer avec un graphe **complet** (toutes les arêtes)
2. Pour chaque paire, tester l'indépendance marginale
3. Pour chaque paire, tester l'indépendance conditionnelle
4. Orienter les arêtes (règles de v-structures)

## Combinaison : MMHC

**Max-Min Hill Climbing** combine les deux approches :
1. PC pour identifier les arêtes candidates
2. Hill Climbing pour l'optimisation finale

\`\`\`python
from pgmpy.estimators import MmhcEstimator

mmhc = MmhcEstimator(data)
model = mmhc.estimate()
print("Structure (MMHC):", list(model.edges()))
\`\`\`

## Construire le modèle complet

\`\`\`python
from pgmpy.models import BayesianNetwork
from pgmpy.estimators import MaximumLikelihoodEstimator

# 1. Apprendre la structure
hc = HillClimbSearch(data)
best_dag = hc.estimate(scoring_method=BicScore(data))

# 2. Créer le modèle
model = BayesianNetwork(best_dag.edges())

# 3. Apprendre les paramètres
model.fit(data, estimator=MaximumLikelihoodEstimator)

# 4. Utiliser le modèle
from pgmpy.inference import VariableElimination
infer = VariableElimination(model)
result = infer.query(['C'], evidence={'A': 1})
print(result)
\`\`\`

## Évaluation

### Metrics structurelles

\`\`\`python
# Comparer avec le vrai DAG (si connu)
true_edges = {('A', 'B'), ('B', 'C')}
learned_edges = set(best_dag.edges())

TP = len(true_edges & learned_edges)  # Vrais positifs
FP = len(learned_edges - true_edges)  # Faux positifs
FN = len(true_edges - learned_edges)  # Faux négatifs

precision = TP / (TP + FP) if (TP + FP) > 0 else 0
recall = TP / (TP + FN) if (TP + FN) > 0 else 0
print(f"Précision: {precision:.2%}, Rappel: {recall:.2%}")
\`\`\`

## Exercice 🎯

1. Générez des données à partir d'un RB connu (A → B → C)
2. Utilisez Hill Climbing pour retrouver la structure
3. Comparez la structure apprise avec la vraie
`
};

export const getChapterContent = (chapterId) => {
    return bayesianChapters[chapterId] || null;
};
