export const pythonContent = {
    themes: [
        {
            id: 'pandas',
            title: 'Pandas',
            description: 'Manipulation et Analyse de Données',
            categories: [

                {
                    id: 'io',
                    title: '1. Chargement & Export',
                    description: 'Lecture et écriture de fichiers (CSV, Excel, Pickle)',
                    snippets: [
                        {
                            id: 'read_csv',
                            title: 'Lire un CSV',
                            description: 'Chargement classique et options utiles.',
                            code: `import pandas as pd

# Chargement simple
df = pd.read_csv('data.csv')

# Avec chemin relatif
df = pd.read_csv('./data/mon_fichier.csv')

# Options courantes
df = pd.read_csv('data.csv', 
    sep=';',              # Séparateur
    index_col=0,          # Colonne d'index
    parse_dates=['date']  # Parsing des dates
)`
                        },
                        {
                            id: 'read_excel',
                            title: 'Lire un Excel',
                            description: 'Chargement depuis un fichier Excel.',
                            code: `# Lire une feuille spécifique
df = pd.read_excel('data.xlsx', sheet_name='Feuille1')

# Lire toutes les feuilles (retourne un dictionnaire)
dfs = pd.read_excel('data.xlsx', sheet_name=None)`
                        },
                        {
                            id: 'export',
                            title: 'Exporter des données',
                            description: 'Sauvegarder en CSV, Excel ou Pickle.',
                            code: `# CSV (sans l'index)
df.to_csv('output.csv', index=False)

# Excel
df.to_excel('output.xlsx', sheet_name='Resultats', index=False)

# Pickle (format binaire rapide pour Python)
df.to_pickle('data.pkl')`
                        }
                    ]
                },
                {
                    id: 'exploration',
                    title: '2. Découverte (EDA)',
                    description: 'Aperçu, statistiques et analyse de distribution',
                    snippets: [
                        {
                            id: 'overview',
                            title: 'Aperçu Global',
                            description: 'Premières commandes à lancer.',
                            code: `# Début et fin
df.head()  # 5 premières lignes
df.tail()  # 5 dernières lignes

# Infos techniques (types, mémoire, non-null)
df.info()

# Dimensions (lignes, colonnes)
print(df.shape)

# Liste des colonnes (utile pour copier-coller)
print(df.columns.tolist())`
                        },
                        {
                            id: 'stats',
                            title: 'Statistiques & Valeurs',
                            description: 'Comprendre la distribution des données.',
                            code: `# Résumé statistique (numérique)
df.describe()

# Compter les occurrences (catégoriel)
df['categorie'].value_counts()

# Valeurs uniques
uniques = df['categorie'].unique()
nb_uniques = df['categorie'].nunique() # Nombre de valeurs distinctes

# Types et Mémoire
print(df.dtypes)        # Types des colonnes
print(df.memory_usage()) # Mémoire utilisée par colonne

# Statistiques spécifiques
print(df['age'].mean())     # Moyenne
print(df['age'].median())   # Médiane
print(df['age'].std())      # Écart-type (Standard Deviation)
print(df['age'].var())      # Variance
print(df['age'].min())      # Minimum
print(df['age'].max())      # Maximum
print(df['age'].quantile([0.25, 0.75])) # Quartiles`
                        }
                    ]
                },
                {
                    id: 'cleaning',
                    title: '3. Nettoyage',
                    description: 'Renommage, types, valeurs manquantes et texte',
                    snippets: [
                        {
                            id: 'rename',
                            title: 'Renommer',
                            description: 'Changer le nom des colonnes.',
                            code: `df = df.rename(columns={
    'old_name': 'new_name',
    'Date de Naissance': 'date_naissance'
})`
                        },
                        {
                            id: 'types',
                            title: 'Changer les Types',
                            description: 'Conversion explicite des types.',
                            code: `# Vers numérique
df['prix'] = pd.to_numeric(df['prix'], errors='coerce')

# Vers datetime
df['date'] = pd.to_datetime(df['date'])

# Vers catégorie (optimisation mémoire)
df['statut'] = df['statut'].astype('category')`
                        },
                        {
                            id: 'missing',
                            title: 'Valeurs Manquantes',
                            description: 'Gestion des NaN.',
                            code: `# Voir les manquants
print(df.isna().sum())

# Supprimer les lignes avec manquants
df_clean = df.dropna()

# Remplacer les manquants
df_filled = df.fillna({
    'score': 0,
    'commentaire': 'Aucun'
})

# Remplacer par la médiane (pour les numériques)
df['age'] = df['age'].fillna(df['age'].median())`
                        },
                        {
                            id: 'duplicates',
                            title: 'Doublons',
                            description: 'Gestion des lignes dupliquées.',
                            code: `# Supprimer les doublons
df = df.drop_duplicates()

# Supprimer les doublons sur une colonne spécifique
df = df.drop_duplicates(subset=['id_client'], keep='last')`
                        },
                        {
                            id: 'strings',
                            title: 'Manipulation de Texte',
                            description: 'Nettoyage via l\'accesseur .str',
                            code: `# Tout en minuscules
df['ville'] = df['ville'].str.lower()

# Contient un texte
paris_df = df[df['ville'].str.contains('paris', na=False)]

# Remplacer des caractères
df['prix'] = df['prix'].str.replace('€', '').astype(float)

# Splitter une colonne
df[['prenom', 'nom']] = df['nom_complet'].str.split(' ', expand=True)`
                        }
                    ]
                },
                {
                    id: 'subsetting',
                    title: '4. Sélection & Filtrage',
                    description: 'Query, loc, iloc et masques',
                    snippets: [
                        {
                            id: 'columns_select',
                            title: 'Sélection de Colonnes',
                            description: 'Garder uniquement ce qui est utile.',
                            code: `# Liste de colonnes
subset = df[['nom', 'age', 'ville']]

# Exclure des colonnes
df = df.drop(columns=['id_interne', 'temp'])`
                        },
                        {
                            id: 'query',
                            title: 'Filtrage avec .query()',
                            description: 'Syntaxe lisible pour filtrer.',
                            code: `# Filtrage simple
df_adultes = df.query("age >= 18")

# Conditions multiples (and / or)
# Note : on utilise "and"/"or" dans query, pas "&"/"|"
df_cible = df.query("age > 25 and (ville == 'Paris' or salaire > 50000)")

# Utiliser une variable externe avec @
min_score = 80
df_top = df.query("score >= @min_score")`
                        },
                        {
                            id: 'loc',
                            title: 'Filtrage classique (.loc)',
                            description: 'Filtrage par masque booléen.',
                            code: `# Masque booléen
mask = (df['age'] > 25) & (df['ville'] == 'Paris')
df_filtered = df.loc[mask]`
                        },
                        {
                            id: 'iloc_basics',
                            title: 'Sélection par Position (.iloc)',
                            description: 'Sélectionner par index (numéro de ligne/colonne).',
                            code: `# | Ce que tu veux faire    | Code avec iloc              |
# | ----------------------- | ----------------------------- |
# | Ligne par position      | df.iloc[i]                  |
# | Colonnes par position   | df.iloc[:, j]               |
# | Plage de lignes         | df.iloc[i:j]                |
# | Ligne x colonne         | df.iloc[i, j]               |
# | Indexer avec des listes | df.iloc[[i1, i2], [j1, j2]] |

# 1ère ligne
first_row = df.iloc[0]

# 3 premières lignes
first_three = df.iloc[:3]

# Toutes les lignes, 2ème colonne
col_2 = df.iloc[:, 1]

# Valeur précise (ligne 0, colonne 2)
val = df.iloc[0, 2]`
                        },
                        {
                            id: 'logic_regex_cheat',
                            title: 'Cheat Sheet : Logique & Regex',
                            description: 'Opérateurs de comparaison et expressions régulières.',
                            markdown: `### 🧠 Logique en Python (et Pandas)

| Opérateur | Signification | Pandas Equivalent |
| :--- | :--- | :--- |
| \`<\` | Strictement inférieur | \`lt\` |
| \`>\` | Strictement supérieur | \`gt\` |
| \`==\` | Égal à | \`eq\` |
| \`<=\` | Inférieur ou égal | \`le\` |
| \`>=\` | Supérieur ou égal | \`ge\` |
| \`!=\` | Différent de | \`ne\` |
| \`&\` | ET (Logique) | \`df[(c1) & (c2)]\` |
| \`\|\` | OU (Logique) | \`df[(c1) \| (c2)]\` |
| \`~\` | NON (Négation) | \`df[~condition]\` |
| \`^\` | XOR (Ou exclusif) | |
| \`isin\` | Appartient à la liste | \`df['col'].isin([1, 2])\` |
| \`isnull\` | Est manquant (NaN) | \`pd.isnull(obj)\` |
| \`notnull\` | N'est pas manquant | \`pd.notnull(obj)\` |

### 🔍 Regex (Expressions Régulières)

| Pattern | Signification | Exemple |
| :--- | :--- | :--- |
| \`\\.\` | Contient un point littéral | \`'file\\.txt'\` |
| \`Length$\` | Termine par "Length" | \`'Sepal Length'\` |
| \`^Sepal\` | Commence par "Sepal" | \`'Sepal Width'\` |
| \`^x[1-5]$\` | Commence par x, finit par 1-5 | \`'x1', 'x5'\` |
| \`^(?!Species$).*\` | Tout sauf "Species" | Colonnes sauf target |`
                        }
                    ]
                },
                {
                    id: 'transformation',
                    title: '5. Transformation',
                    description: 'Apply, Groupby et Pivot Tables',
                    snippets: [
                        {
                            id: 'apply',
                            title: 'Apply & Map',
                            description: 'Appliquer des fonctions personnalisées.',
                            code: `# Appliquer une fonction sur une colonne
df['nom_long'] = df['nom'].apply(len)

# Avec une lambda
df['prix_ttc'] = df['prix_ht'].apply(lambda x: x * 1.2)

# Mapper des valeurs
mapping = {'H': 'Homme', 'F': 'Femme'}
df['genre_label'] = df['genre'].map(mapping)`
                        },
                        {
                            id: 'groupby',
                            title: 'Agrégation (GroupBy)',
                            description: 'Calculs par groupes.',
                            code: `# Moyenne par groupe
df.groupby('ville')['salaire'].mean()

# Plusieurs métriques
df.groupby('ville').agg({
    'salaire': 'mean',
    'age': ['min', 'max'],
    'id': 'count'
})`
                        },
                        {
                            id: 'pivot',
                            title: 'Pivot Table',
                            description: 'Tableaux croisés dynamiques.',
                            code: `pivot = df.pivot_table(
    values='ventes',
    index='date',
    columns='region',
    aggfunc='sum',
    fill_value=0
)`
                        },
                        {
                            id: 'sorting',
                            title: 'Tri (Sort Values/Index)',
                            description: 'Ordonner les données.',
                            code: `# Trier par valeurs (Croissant)
df = df.sort_values(by='age')

# Trier par valeurs (Décroissant)
df = df.sort_values(by='salaire', ascending=False)

# Trier par plusieurs colonnes
# D'abord par Ville (A-Z), puis par Age (Décroissant)
df = df.sort_values(by=['ville', 'age'], ascending=[True, False])

# Trier par Index (remettre les lignes dans l'ordre original)
df = df.sort_index()`
                        },
                        {
                            id: 'reset_index',
                            title: 'Reset Index',
                            description: 'Réinitialiser l\'index (souvent après un filtre ou un tri).',
                            code: `# Cas d'usage classique :
# Après un filtrage, les index sont "troués" (ex: 1, 5, 8...).
# reset_index() recrée un index propre (0, 1, 2...).

# drop=True : Ne garde pas l'ancien index comme colonne (le supprime).
# inplace=True : Modifie le DataFrame directement (pas besoin de df = ...)
df.reset_index(drop=True, inplace=True)

# Sans drop=True, l'ancien index devient une colonne nommée "index".`
                        }
                    ]
                },
                {
                    id: 'combine',
                    title: '6. Combinaison',
                    description: 'Merge et Concat',
                    snippets: [
                        {
                            id: 'merge',
                            title: 'Jointures (Merge)',
                            description: 'Fusionner deux DataFrames (comme SQL JOIN).',
                            markdown: `### 🧩 Comprendre les Jointures

Imaginez deux tables : **A (Gauche)** et **B (Droite)**.

| Type | SQL Equivalent | Description | Résultat |
| :--- | :--- | :--- | :--- |
| **Inner** | \`INNER JOIN\` | Garde uniquement les clés présentes dans **les deux** tables. | Intersection (A ∩ B) |
| **Left** | \`LEFT JOIN\` | Garde **tout A**, et ajoute B là où ça matche. (NaN sinon) | Tout A + B correspondants |
| **Right** | \`RIGHT JOIN\` | Garde **tout B**, et ajoute A là où ça matche. | Tout B + A correspondants |
| **Outer** | \`FULL OUTER JOIN\` | Garde **tout**, remplit les trous avec NaN. | Union (A ∪ B) |

**Exemple Visuel :**
\`\`\`text
   adf (A)      bdf (B)
  x1  x2       x1  x3
  A   1        A   T
  B   2        B   F
  C   3        D   T
\`\`\`
`,
                            code: `import pandas as pd

# Inner Join (Défaut : intersection)
# Résultat : A (1, T), B (2, F) -> C et D sont exclus
df_inner = pd.merge(adf, bdf, on='x1', how='inner')

# Left Join (Tout A)
# Résultat : A, B, C (avec NaN pour C en x3)
df_left = pd.merge(adf, bdf, on='x1', how='left')

# Right Join (Tout B)
# Résultat : A, B, D (avec NaN pour D en x2)
df_right = pd.merge(adf, bdf, on='x1', how='right')

# Outer Join (Tout le monde)
# Résultat : A, B, C, D (avec des NaN partout où ça manque)
df_outer = pd.merge(adf, bdf, on='x1', how='outer')`
                        },
                        {
                            id: 'concat',
                            title: 'Concaténation',
                            description: 'Empiler des DataFrames.',
                            code: `# Empiler verticalement (ajout de lignes)
df_total = pd.concat([df_janvier, df_fevrier], axis=0)

# Empiler horizontalement (ajout de colonnes)
df_large = pd.concat([df_infos, df_metrics], axis=1)`
                        }
                    ]
                }
            ]
        },
        {
            id: 'visualization',
            title: 'Visualisation',
            description: 'Graphiques et EDA avec Seaborn',
            categories: [

                {
                    id: 'univariate',
                    title: '1. Analyse Univariée',
                    description: 'Distribution d\'une seule variable',
                    snippets: [
                        {
                            id: 'histplot',
                            title: 'Histogramme',
                            description: 'Distribution numérique (kde=True pour la densité).',
                            image: '/MemoCode/images/histogram.png',
                            code: `import matplotlib.pyplot as plt
import seaborn as sns

# Histogramme avec courbe de densité (KDE)
# kde=True : ajoute la courbe de densité lissée
# bins=30 : définit le nombre de barres
sns.histplot(data=df, x='colonne_numerique', kde=True, bins=30)
plt.title('Distribution de la variable numérique')
plt.show()`
                        },
                        {
                            id: 'boxplot',
                            title: 'Boxplot',
                            description: 'Détection d\'outliers et quartiles.',
                            image: '/MemoCode/images/boxplot.png',
                            code: `# Boîte à moustaches (Boxplot)
# Permet de voir la médiane, les quartiles et les outliers (points)
# x : la variable numérique à analyser
sns.boxplot(data=df, x='colonne_numerique')
plt.title('Détection des outliers')
plt.show()`
                        },
                        {
                            id: 'countplot',
                            title: 'Countplot',
                            description: 'Fréquence des catégories.',
                            image: '/MemoCode/images/countplot.png',
                            code: `# Diagramme en barres pour variables catégorielles
# Compte automatiquement le nombre d'occurrences de chaque catégorie
# order : permet de trier les barres (ici par fréquence décroissante)
sns.countplot(
    data=df, 
    x='colonne_categorie', 
    order=df['colonne_categorie'].value_counts().index
)
plt.title('Fréquence par catégorie')
plt.show()`
                        }
                    ]
                },
                {
                    id: 'bivariate',
                    title: '2. Analyse Bivariée',
                    description: 'Relations entre deux variables',
                    snippets: [
                        {
                            id: 'scatterplot',
                            title: 'Scatter Plot',
                            description: 'Relation numérique vs numérique.',
                            image: '/MemoCode/images/scatterplot.png',
                            code: `# Nuage de points (Scatter Plot)
# Idéal pour voir la corrélation entre deux variables numériques
# hue : colore les points selon une variable catégorielle
# alpha : transparence des points (utile si beaucoup de données)
sns.scatterplot(
    data=df, 
    x='col_num_1', 
    y='col_num_2', 
    hue='categorie',
    alpha=0.7
)
plt.title('Relation entre deux variables numériques')
plt.show()`
                        },
                        {
                            id: 'lineplot',
                            title: 'Line Plot',
                            description: 'Séries temporelles.',
                            image: '/MemoCode/images/lineplot.png',
                            code: `# Graphique linéaire (Line Plot)
# Parfait pour les séries temporelles ou l'évolution continue
# ci=None : désactive l'intervalle de confiance (zone ombrée) pour alléger
sns.lineplot(data=df, x='date', y='valeur', ci=None)
plt.title('Évolution temporelle')
plt.show()`
                        },
                        {
                            id: 'barplot',
                            title: 'Bar Plot',
                            description: 'Comparaison numérique par catégorie.',
                            image: '/MemoCode/images/barplot.png',
                            code: `# Bar Plot (Comparaison de moyennes)
# Affiche la moyenne (par défaut) d'une variable numérique par catégorie
# La petite barre noire au sommet est l'intervalle de confiance (erreur)
sns.barplot(data=df, x='categorie', y='valeur_numerique')
plt.title('Moyenne par catégorie')
plt.show()`
                        }
                    ]
                },
                {
                    id: 'multivariate',
                    title: '3. Multivariée & Corrélations',
                    description: 'Relations complexes',
                    snippets: [
                        {
                            id: 'heatmap',
                            title: 'Heatmap de Corrélation',
                            description: 'Matrice de corrélation.',
                            image: '/MemoCode/images/heatmap.png',
                            code: `# Heatmap de Corrélation
# 1. Calculer la matrice de corrélation
corr = df.corr()

# 2. Afficher la heatmap
# annot=True : affiche les valeurs dans les cases
# cmap='coolwarm' : dégradé bleu (négatif) -> rouge (positif)
# fmt='.2f' : formatage à 2 décimales
plt.figure(figsize=(10, 8))
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Matrice de Corrélation')
plt.show()`
                        },
                        {
                            id: 'pairplot',
                            title: 'Pairplot',
                            description: 'Vue d\'ensemble des relations.',
                            code: `# Pairplot (Grille de graphiques)
# Affiche les relations bivariées pour toutes les paires de variables
# Diagonale : distribution univariée (histogramme/KDE)
# hue : sépare les groupes par couleur
sns.pairplot(df, hue='target_variable')
plt.show()`
                        }
                    ]
                },
                {
                    id: 'quality',
                    title: '4. Qualité des Données',
                    description: 'Visualisation des manquants avec Missingno',
                    snippets: [
                        {
                            id: 'msno_matrix',
                            title: 'Matrice de Manque',
                            description: 'Localiser les données manquantes.',
                            code: `import missingno as msno

# Matrice de visualisation des manquants
# Les lignes blanches représentent les valeurs manquantes
# Utile pour voir si les manques sont corrélés entre colonnes
msno.matrix(df)
plt.show()`
                        },
                        {
                            id: 'msno_bar',
                            title: 'Barplot des Manquants',
                            description: 'Quantité de manquants par colonne.',
                            code: `# Barplot des données présentes
# Affiche le nombre de valeurs non-nulles par colonne
# Permet d'identifier rapidement les colonnes très vides
msno.bar(df)
plt.show()`
                        }
                    ]
                }
            ]
        },
        {
            id: 'ml',
            title: 'Machine Learning',
            description: 'Modélisation avec Scikit-Learn',
            categories: [
                {
                    id: 'pipelines',
                    title: '0. Pipelines & Workflow',
                    description: 'Automatiser et sécuriser le ML.',
                    snippets: [
                        {
                            id: 'pipeline_concept',
                            title: 'Comprendre les Pipelines',
                            description: 'Pourquoi utiliser un Pipeline ?',
                            markdown: `### ⛓️ Le Pipeline Scikit-Learn

Un Pipeline permet d'enchaîner séquentiellement toutes les étapes de traitement des données jusqu'au modèle final.

**Pourquoi est-ce indispensable ?**
1.  **Zéro Fuite de Données (Data Leakage)** : Le pipeline s'assure que les transformations (ex: moyenne pour l'imputation) sont apprises *uniquement* sur le train set et appliquées aveuglément sur le test set.
2.  **Reproductibilité** : Tout le processus est contenu dans un seul objet.
3.  **Simplicité** : On appelle \`fit()\` et \`predict()\` une seule fois pour tout le flux.

\`\`\`mermaid
graph LR
    %% Nodes
    A[Données Brutes] --> B(Preprocessing)
    B --> C{Modèle}
    C --> D[Prédiction]
    
    %% Subgraph
    subgraph Pipeline [Pipeline Scikit-Learn]
        direction LR
        B -- Scaling / Encodage --> C
    end
    
    %% Styles
    classDef default fill:#27272a,stroke:#52525b,stroke-width:1px,color:#f4f4f5;
    classDef input fill:#3f3f46,stroke:#71717a,color:#fff,stroke-width:2px;
    classDef output fill:#059669,stroke:#10b981,color:#fff,stroke-width:2px;
    classDef process fill:#2563eb,stroke:#3b82f6,color:#fff,stroke-width:2px;
    
    class A input;
    class D output;
    class B,C process;
    
    style Pipeline fill:none,stroke:#3b82f6,stroke-width:2px,stroke-dasharray: 5 5,color:#93c5fd
\`\`\`
`
                        },
                        {
                            id: 'make_pipeline',
                            title: 'Créer un Pipeline',
                            description: 'Exemple simple avec make_pipeline.',
                            code: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# 1. Séparer les données
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

# 2. Créer le Pipeline
# Le pipeline va d'abord mettre les données à l'échelle (StandardScaler)
# Puis entraîner le modèle (LogisticRegression)
pipe = make_pipeline(
    StandardScaler(),
    LogisticRegression()
)

# 3. Entraîner tout le flux en une ligne
pipe.fit(X_train, y_train)

# 4. Prédire (le scaling est appliqué automatiquement !)
y_pred = pipe.predict(X_test)`
                        }
                    ]
                },

                {
                    id: 'preprocessing',
                    title: '1. Préparation (Preprocessing)',
                    description: 'Split, Encodage et Scaling',
                    snippets: [
                        {
                            id: 'train_test_split',
                            title: 'Séparation Train / Test',
                            description: 'Diviser les données pour évaluer le modèle.',
                            code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split

from sklearn.model_selection import train_test_split

# X : Features (Variables explicatives)
# y : Target (Variable cible)

# stratify=y : Indispensable pour la Classification !
# Assure que la proportion des classes est conservée dans le Train et le Test.
# Ex: Si y a 10% de "Fraude", y_train et y_test auront aussi 10% de "Fraude".

X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2, 
    random_state=42,
    stratify=y  # À retirer pour une Régression
)`
                        },
                        {
                            id: 'encoding',
                            title: 'Encodage Catégoriel',
                            description: 'Transformer le texte en nombres.',
                            code: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder

# --- Exemple Avant / Après ---
# Avant : Colonne 'Couleur' -> ['Rouge', 'Bleu', 'Rouge']
# Après (OneHot) : 
#    Couleur_Bleu : [0, 1, 0]
#    Couleur_Rouge : [1, 0, 1]

# 1. Approche rapide (Pandas get_dummies)
X_encoded = pd.get_dummies(X, drop_first=True)

# 2. Approche Robuste (Scikit-Learn OneHotEncoder)
# drop='first' : Évite la colinéarité (Dummy Variable Trap)
encoder = OneHotEncoder(drop='first', sparse_output=False)
X_encoded_array = encoder.fit_transform(X[['categorie']])`
                        },
                        {
                            id: 'scaling',
                            title: 'Mise à l\'échelle (Scaling)',
                            description: 'Standardiser les variables numériques.',
                            code: `from sklearn.preprocessing import StandardScaler

# --- Exemple Avant / Après ---
# Avant : Age [20, 60], Salaire [2000, 5000] -> Échelles très différentes
# Après : Age [-1.2, 1.5], Salaire [-0.8, 1.1] -> Centré sur 0, écart-type de 1

scaler = StandardScaler()

# Fit uniquement sur le Train pour éviter la fuite de données (Data Leakage)
X_train_scaled = scaler.fit_transform(X_train)

# Transform uniquement sur le Test
X_test_scaled = scaler.transform(X_test)`
                        }
                    ]
                },
                {
                    id: 'regression_models',
                    title: '2.1 Modèles de Régression',
                    description: 'Prédire une valeur continue',
                    snippets: [
                        {
                            id: 'linear_regression',
                            title: 'Régression Linéaire',
                            description: `Type : Régression
                            Concept : Trace une ligne droite qui passe au plus près de tous les points.
                            Quand l'utiliser ?
                            - Prédire le prix d'une maison selon sa surface.
                            - Estimer le chiffre d'affaires futur.
                            Input : Variables numériques (et catégorielles encodées). Sensible aux outliers.
                            Output : Une valeur numérique continue.
                            Avantages : Simple, très interprétable, rapide.`,
                            code: `from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)`
                        },
                        {
                            id: 'ridge_lasso',
                            title: 'Régression Ridge & Lasso',
                            description: `Type : Régression (Régularisée)
                            Concept : Comme la Linéaire, mais pénalise les coefficients trop grands pour éviter le sur-apprentissage.
                            - Ridge (L2) : Réduit les coefficients (jamais à 0).
                            - Lasso (L1) : Peut mettre des coefficients à 0 (sélection de variables).
                            Quand l'utiliser ?
                            - Quand il y a beaucoup de variables (risque d'overfitting).
                            - Lasso : Pour sélectionner les variables importantes.`,
                            code: `from sklearn.linear_model import Ridge, Lasso

# alpha : Force de la régularisation (plus grand = plus de contrainte)
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)

lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)`
                        },
                        {
                            id: 'svr',
                            title: 'SVR (Support Vector Regression)',
                            description: `Type : Régression
                            Concept : Trouve un "tube" qui contient un maximum de points avec une marge d'erreur tolérée.
                            Quand l'utiliser ?
                            - Données non-linéaires (avec kernel='rbf').
                            - Petits datasets complexes.
                            Input : Scaling OBLIGATOIRE.`,
                            code: `from sklearn.svm import SVR

# kernel='rbf' : Pour capturer des relations non-linéaires
# C : Pénalité (grand C = moins d'erreur tolérée sur le train)
model = SVR(kernel='rbf', C=1.0)
model.fit(X_train_scaled, y_train) # Attention : X_train_scaled !`
                        },
                        {
                            id: 'mlp_regressor',
                            title: 'Réseau de Neurones (MLP Regressor)',
                            description: `Type : Régression (Deep Learning)
                            Concept : Couches de neurones connectés pour apprendre des relations très complexes.
                            Quand l'utiliser ?
                            - Données très complexes, non-linéaires.
                            - Beaucoup de données disponibles.
                            Input : Scaling OBLIGATOIRE.`,
                            code: `from sklearn.neural_network import MLPRegressor

# hidden_layer_sizes=(100, 50) : 2 couches cachées de 100 et 50 neurones
# max_iter=500 : Nombre d'époques d'entraînement
model = MLPRegressor(hidden_layer_sizes=(100, 50), max_iter=500, random_state=42)
model.fit(X_train_scaled, y_train)
predictions = model.predict(X_test_scaled)`
                        }
                    ]
                },
                {
                    id: 'classification_models',
                    title: '2.2 Modèles de Classification',
                    description: 'Prédire une classe / catégorie',
                    snippets: [
                        {
                            id: 'logistic_regression',
                            title: 'Régression Logistique',
                            description: `Type : Classification
                            Concept : Sépare deux groupes par une frontière linéaire (utilise une fonction sigmoïde).
                            Quand l'utiliser ?
                            - Prédire si un client va churner (Oui/Non).
                            - Détecter un email spam.
                            Input : Numériques et catégorielles encodées. Nécessite souvent un Scaling.
                            Output : Probabilité d'appartenance à une classe.
                            Avantages : Donne des probabilités bien calibrées, interprétable.`,
                            code: `from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train_scaled, y_train) # Scaling recommandé
predictions = model.predict(X_test_scaled)`
                        },
                        {
                            id: 'knn',
                            title: 'K-Nearest Neighbors (KNN)',
                            description: `Type : Classification (et Régression)
                            Concept : "Dis-moi qui sont tes voisins, je te dirai qui tu es". Regarde les k points les plus proches.
                            Quand l'utiliser ?
                            - Classification simple, intuitive.
                            - Petits datasets.
                            Input : Scaling OBLIGATOIRE (car basé sur la distance).`,
                            code: `from sklearn.neighbors import KNeighborsClassifier

# n_neighbors=5 : Nombre de voisins à considérer
model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train_scaled, y_train)
predictions = model.predict(X_test_scaled)`
                        },
                        {
                            id: 'svm',
                            title: 'SVM (Support Vector Machine)',
                            description: `Type : Classification
                            Concept : Cherche l'hyperplan qui sépare le mieux les classes avec la plus grande marge possible.
                            Quand l'utiliser ?
                            - Données complexes, haute dimension.
                            - Classification binaire ou multi-classes.
                            Input : Scaling OBLIGATOIRE.`,
                            code: `from sklearn.svm import SVC

# probability=True : Pour avoir predict_proba()
model = SVC(kernel='rbf', C=1.0, probability=True)
model.fit(X_train_scaled, y_train)
predictions = model.predict(X_test_scaled)`
                        },
                        {
                            id: 'decision_tree',
                            title: 'Arbre de Décision',
                            description: `Type : Classification & Régression
                            Concept : Série de questions (Si Age > 25 alors...) pour diviser les données.
                            Quand l'utiliser ?
                            - Besoin d'explicabilité totale (règles claires).
                            - Pas besoin de scaling.
                            Attention : Tendance au sur-apprentissage (overfitting) si trop profond.`,
                            code: `from sklearn.tree import DecisionTreeClassifier, plot_tree

# max_depth : Limite la profondeur pour éviter l'overfitting
model = DecisionTreeClassifier(max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Visualiser l'arbre (optionnel)
# plot_tree(model, filled=True)`
                        },
                        {
                            id: 'random_forest',
                            title: 'Random Forest',
                            description: `Type : Classification & Régression
                            Concept : Une forêt d'arbres de décision où chaque arbre vote pour la prédiction finale.
                            Quand l'utiliser ?
                            - Presque tout le temps ! (C'est le couteau suisse).
                            - Données complexes, non-linéaires.
                            Input : Accepte tout, peu sensible aux outliers et au scaling.
                            Output : Classe (vote majoritaire) ou Valeur (moyenne).
                            Avantages : Très performant, robuste, gère bien le sur-apprentissage.`,
                            code: `from sklearn.ensemble import RandomForestClassifier

# n_estimators=100 : Nombre d'arbres
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
predictions = model.predict(X_test)`
                        },
                        {
                            id: 'gradient_boosting',
                            title: 'Gradient Boosting (XGBoost/LGBM)',
                            description: `Type : Classification & Régression
                            Concept : Construit les arbres séquentiellement, chaque nouvel arbre corrige les erreurs du précédent.
                            Quand l'utiliser ?
                            - Compétitions Kaggle, recherche de performance pure.
                            - Données tabulaires structurées.
                            Avantages : Souvent le plus précis.`,
                            code: `from sklearn.ensemble import GradientBoostingClassifier

# Il existe aussi XGBoost, LightGBM, CatBoost (librairies externes)
model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3)
model.fit(X_train, y_train)
predictions = model.predict(X_test)`
                        },
                        {
                            id: 'mlp_classifier',
                            title: 'Réseau de Neurones (MLP Classifier)',
                            description: `Type : Classification (Deep Learning)
                            Concept : Couches de neurones connectés pour apprendre des relations très complexes.
                            Quand l'utiliser ?
                            - Données très complexes (images, sons, texte, ou tabulaire complexe).
                            - Beaucoup de données.
                            Input : Scaling OBLIGATOIRE.`,
                            code: `from sklearn.neural_network import MLPClassifier

# hidden_layer_sizes=(100, 50) : 2 couches cachées
model = MLPClassifier(hidden_layer_sizes=(100, 50), max_iter=500, random_state=42)
model.fit(X_train_scaled, y_train)
predictions = model.predict(X_test_scaled)`
                        }
                    ]
                },
                {
                    id: 'evaluation',
                    title: '3. Évaluation & Interprétabilité',
                    description: 'Métriques et Graphiques de performance',
                    snippets: [
                        {
                            id: 'metrics',
                            title: 'Métriques de Base',
                            description: 'Classification Report et Erreurs.',
                            code: `from sklearn.metrics import classification_report, mean_squared_error, r2_score

# --- Pour la Classification ---
# Affiche Précision, Rappel, F1-Score pour chaque classe
print(classification_report(y_test, predictions))

# --- Pour la Régression ---
rmse = mean_squared_error(y_test, predictions, squared=False)
r2 = r2_score(y_test, predictions)

print(f"RMSE: {rmse}") # Erreur moyenne (dans l'unité de la cible)
print(f"R2: {r2}")     # Qualité de l'ajustement (proche de 1 = parfait)`
                        },
                        {
                            id: 'confusion_matrix',
                            title: 'Matrice de Confusion',
                            description: `Type : Classification
                            Visuel : Diagonale foncée = Bonnes prédictions.`,
                            code: `from sklearn.metrics import ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Affiche la matrice de confusion
# Permet de voir où le modèle se trompe (Faux Positifs vs Faux Négatifs)
ConfusionMatrixDisplay.from_estimator(model, X_test, y_test, cmap='Blues')
plt.title("Matrice de Confusion")
plt.show()`
                        },
                        {
                            id: 'roc_curve',
                            title: 'Courbe ROC & AUC',
                            description: `Type : Classification Binaire
                            Visuel : Courbe qui doit bomber vers le coin haut-gauche.`,
                            code: `from sklearn.metrics import RocCurveDisplay

# Affiche la courbe ROC
# Plus l'AUC (Area Under Curve) est proche de 1, meilleur est le modèle
RocCurveDisplay.from_estimator(model, X_test, y_test)
plt.title("Courbe ROC")
plt.plot([0, 1], [0, 1], 'r--') # Ligne du hasard
plt.show()`
                        },
                        {
                            id: 'feature_importance',
                            title: 'Importance des Variables',
                            description: `Type : Arbres (Random Forest, XGBoost...)
                            Visuel : Quelles variables pèsent le plus ?`,
                            code: `import seaborn as sns
import pandas as pd

# Récupérer l'importance des features
importances = model.feature_importances_
feature_names = X.columns

# Créer un DataFrame pour le plot
df_imp = pd.DataFrame({'feature': feature_names, 'importance': importances})
df_imp = df_imp.sort_values('importance', ascending=False)

# Afficher le Barplot
plt.figure(figsize=(10, 6))
sns.barplot(data=df_imp, x='importance', y='feature')
plt.title("Importance des Variables (Feature Importance)")
plt.show()`
                        }
                    ]
                }
            ]
        },
        {
            id: 'python_basics',
            title: '4. Python Basics',
            description: 'Les fondamentaux du langage',
            categories: [

                {
                    id: 'std_libs',
                    title: 'Modules Standards',
                    description: 'Math, Random, Datetime, OS...',
                    snippets: [
                        {
                            id: 'math_lib',
                            title: 'Mathématiques (math)',
                            description: 'Fonctions mathématiques de base.',
                            code: `import math

# Constantes
print(math.pi)  # 3.14159...
print(math.e)   # 2.71828...

# Fonctions usuelles
print(math.sqrt(16))    # 4.0 (Racine carrée)
print(math.ceil(4.2))   # 5 (Arrondi supérieur)
print(math.floor(4.8))  # 4 (Arrondi inférieur)
print(math.factorial(5)) # 120 (5!)`
                        },
                        {
                            id: 'random_lib',
                            title: 'Aléatoire (random)',
                            description: 'Générer des nombres et choix aléatoires.',
                            code: `import random

# Fixer la graine (pour la reproductibilité)
random.seed(42)

# Nombres
print(random.random())          # Float entre 0.0 et 1.0
print(random.randint(1, 10))    # Entier entre 1 et 10 (inclus)
print(random.uniform(1.5, 5.5)) # Float entre 1.5 et 5.5

# Séquences
fruits = ["pomme", "banane", "cerise"]
print(random.choice(fruits))    # Un élément au hasard
random.shuffle(fruits)          # Mélanger la liste sur place
print(fruits)

# Échantillon (sans remise)
print(random.sample(range(100), 5))`
                        },
                        {
                            id: 'datetime_lib',
                            title: 'Dates & Heures (datetime)',
                            description: 'Manipuler le temps.',
                            code: `from datetime import datetime, timedelta

# Maintenant
now = datetime.now()
print(f"Date actuelle : {now}")

# Créer une date spécifique
dt = datetime(2023, 12, 25, 10, 30) # 25 Déc 2023 à 10h30

# Formatage (Date -> String)
print(now.strftime("%d/%m/%Y %H:%M")) # "29/11/2025 09:45"

# Parsing (String -> Date)
date_str = "2023-01-01"
date_obj = datetime.strptime(date_str, "%Y-%m-%d")

# Arithmétique (Ajouter du temps)
demain = now + timedelta(days=1)
dans_une_heure = now + timedelta(hours=1)`
                        },
                        {
                            id: 'os_sys_lib',
                            title: 'Système (os, sys)',
                            description: 'Interagir avec l\'OS et le système de fichiers.',
                            code: `import os
import sys

# --- OS (Operating System) ---
# Chemin actuel
print(os.getcwd())

# Lister les fichiers
# print(os.listdir('.'))

# Construire des chemins (Compatible Windows/Mac/Linux)
path = os.path.join("dossier", "sous_dossier", "fichier.txt")

# Vérifier si un fichier existe
if os.path.exists("data.csv"):
    print("Fichier trouvé !")

# --- SYS (System) ---
# Arguments de la ligne de commande
# print(sys.argv)

# Chemin de recherche des modules
# print(sys.path)

# Quitter le script
# sys.exit(0)`
                        },
                        {
                            id: 'collections_lib',
                            title: 'Collections Utiles',
                            description: 'Counter et defaultdict.',
                            code: `from collections import Counter, defaultdict

# --- Counter ---
# Compte les occurrences automatiquement
liste = ['a', 'b', 'a', 'c', 'b', 'a']
compteur = Counter(liste)
print(compteur) # Counter({'a': 3, 'b': 2, 'c': 1})
print(compteur.most_common(1)) # [('a', 3)]

# --- DefaultDict ---
# Dictionnaire avec valeur par défaut (évite les KeyError)
d = defaultdict(int) # Valeur par défaut : 0
d['a'] += 1
print(d['a']) # 1
print(d['z']) # 0 (créé automatiquement)`
                        }
                    ]
                },
                {
                    id: 'control_flow',
                    title: 'Contrôle de Flux',
                    description: 'Boucles et Conditions',
                    snippets: [
                        {
                            id: 'loops',
                            title: 'Boucles For & While',
                            description: 'Itérer sur des séquences ou tant qu\'une condition est vraie.',
                            code: `import math
import random
import datetime
import os
import sys

# Boucle FOR (Itération définie)
fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(f"J'aime la {fruit}")

# Avec range()
for i in range(5): # 0 à 4
    print(i)

# Boucle WHILE (Itération indéfinie)
compteur = 0
while compteur < 5:
    print(compteur)
    compteur += 1`
                        },
                        {
                            id: 'conditions',
                            title: 'Conditions (If/Elif/Else)',
                            description: 'Exécuter du code selon des critères.',
                            code: `age = 20

if age < 18:
    print("Mineur")
elif age == 18:
    print("Tout juste majeur")
else:
    print("Majeur")

# Opérateur ternaire (One-liner)
statut = "Majeur" if age >= 18 else "Mineur"`
                        },
                        {
                            id: 'break_continue',
                            title: 'Break & Continue',
                            description: 'Contrôler l\'exécution dans les boucles.',
                            code: `for i in range(10):
    if i == 3:
        continue # Passe à l'itération suivante (saute 3)
    if i == 8:
        break # Arrête complètement la boucle
    print(i)`
                        }
                    ]
                },
                {
                    id: 'functions',
                    title: 'Fonctions',
                    description: 'Définir et utiliser des blocs de code réutilisables',
                    snippets: [
                        {
                            id: 'def_function',
                            title: 'Définition (def)',
                            description: 'Créer une fonction simple avec paramètres.',
                            code: `def saluer(nom, message="Bonjour"):
    """
    Affiche un message de salutation.
    message est un paramètre optionnel (valeur par défaut).
    """
    return f"{message}, {nom} !"

print(saluer("Alice"))
print(saluer("Bob", "Salut"))`
                        },
                        {
                            id: 'args_kwargs',
                            title: 'Args & Kwargs',
                            description: 'Fonctions avec un nombre variable d\'arguments.',
                            code: `def somme_tout(*args):
    # args est un tuple
    return sum(args)

print(somme_tout(1, 2, 3, 4)) # 10

def afficher_infos(**kwargs):
    # kwargs est un dictionnaire
    for cle, valeur in kwargs.items():
        print(f"{cle}: {valeur}")

afficher_infos(nom="Alice", age=30, ville="Paris")`
                        },
                        {
                            id: 'lambda',
                            title: 'Fonctions Lambda',
                            description: 'Fonctions anonymes en une ligne.',
                            code: `# Syntaxe : lambda arguments : expression
carre = lambda x: x ** 2

print(carre(5)) # 25

# Souvent utilisé avec map() ou filter()
nombres = [1, 2, 3, 4]
pairs = list(filter(lambda x: x % 2 == 0, nombres)) # [2, 4]`
                        }
                    ]
                },
                {
                    id: 'data_structures',
                    title: 'Structures de Données',
                    description: 'Listes, Dictionnaires, Sets, Tuples',
                    snippets: [
                        {
                            id: 'lists',
                            title: 'Listes (List)',
                            description: 'Collection ordonnée et modifiable.',
                            code: `ma_liste = [1, 2, 3]

# Ajout
ma_liste.append(4) # [1, 2, 3, 4]

# Slicing (Découpage)
print(ma_liste[1:3]) # [2, 3] (Indice de début inclus, fin exclu)

# List Comprehension (Puissant !)
carres = [x**2 for x in range(5)] # [0, 1, 4, 9, 16]`
                        },
                        {
                            id: 'dicts',
                            title: 'Dictionnaires (Dict)',
                            description: 'Paires Clé-Valeur.',
                            code: `mon_dict = {"nom": "Alice", "age": 25}

# Accès sécurisé (évite l'erreur si la clé n'existe pas)
print(mon_dict.get("ville", "Inconnu"))

# Parcourir
for cle, valeur in mon_dict.items():
    print(f"{cle} -> {valeur}")`
                        },
                        {
                            id: 'sets',
                            title: 'Ensembles (Set)',
                            description: 'Collection non-ordonnée d\'éléments UNIQUES.',
                            code: `nombres = [1, 2, 2, 3, 3, 3]
uniques = set(nombres) # {1, 2, 3}

# Opérations ensemblistes
a = {1, 2, 3}
b = {3, 4, 5}

print(a.intersection(b)) # {3}
print(a.union(b)) # {1, 2, 3, 4, 5}`
                        }
                    ]
                },
                {
                    id: 'error_handling',
                    title: 'Gestion d\'Erreurs',
                    description: 'Try, Except, Finally',
                    snippets: [
                        {
                            id: 'try_except',
                            title: 'Bloc Try / Except',
                            description: 'Gérer les exceptions pour éviter que le programme plante.',
                            code: `try:
    resultat = 10 / 0
except ZeroDivisionError:
    print("Erreur : Division par zéro impossible !")
except Exception as e:
    print(f"Une autre erreur est survenue : {e}")
else:
    print("Tout s'est bien passé (si pas d'erreur)")
finally:
    print("S'exécute toujours (utile pour fermer un fichier/connexion)")`
                        }
                    ]
                }
            ]
        },
        {
            id: 'python_tips',
            title: '5. Python Tips',
            description: 'Astuces et Bonnes Pratiques',
            categories: [

                {
                    id: 'string_formatting',
                    title: 'Formatage de Chaînes (f-strings)',
                    description: 'La méthode moderne pour formater du texte.',
                    snippets: [
                        {
                            id: 'f_strings_basic',
                            title: 'Bases des f-strings',
                            description: 'Insérer des variables directement dans les chaînes.',
                            code: `from pprint import pprint

nom = "Alice"
age = 30

# Avant (vieux)
print("Bonjour " + nom + ", tu as " + str(age) + " ans.")

# Avec f-string (moderne)
print(f"Bonjour {nom}, tu as {age} ans.")`
                        },
                        {
                            id: 'f_strings_advanced',
                            title: 'Formatage Avancé',
                            description: 'Arrondis, dates, alignement.',
                            code: `prix = 19.9999
pourcentage = 0.1234

# Arrondir à 2 décimales
print(f"Prix : {prix:.2f}€") # 20.00€

# Afficher en pourcentage
print(f"Taux : {pourcentage:.1%}") # 12.3%

# Debug facile (affiche nom_variable = valeur)
x = 10
print(f"{x=}") # x=10`
                        }
                    ]
                },
                {
                    id: 'documentation',
                    title: 'Documentation',
                    description: 'Docstrings et Commentaires',
                    snippets: [
                        {
                            id: 'docstrings',
                            title: 'Docstrings ("""...""")',
                            description: 'Documenter vos fonctions pour les autres (et vous-même).',
                            code: `def calcul_complexe(x, y):
    """
    Effectue un calcul complexe entre x et y.

    Args:
        x (int): Le premier nombre.
        y (int): Le deuxième nombre.

    Returns:
        int: Le résultat du calcul.
    """
    return x * y + 10

# Accéder à la doc
help(calcul_complexe)`
                        }
                    ]
                },
                {
                    id: 'pythonic_idioms',
                    title: 'Astuces "Pythoniques"',
                    description: 'Écrire du code plus élégant et concis.',
                    snippets: [
                        {
                            id: 'unpacking',
                            title: 'Unpacking (Déballage)',
                            description: 'Assigner plusieurs variables en une ligne.',
                            code: `coords = (10, 20)
x, y = coords # x=10, y=20

# Échanger deux variables sans variable temporaire
a = 5
b = 10
a, b = b, a # a=10, b=5`
                        },
                        {
                            id: 'enumerate',
                            title: 'Enumerate',
                            description: 'Avoir l\'index ET la valeur dans une boucle.',
                            code: `fruits = ["pomme", "banane", "cerise"]

# Pas terrible :
# for i in range(len(fruits)):
#     print(i, fruits[i])

# Pythonique :
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")`
                        },
                        {
                            id: 'zip',
                            title: 'Zip',
                            description: 'Boucler sur deux listes en parallèle.',
                            code: `noms = ["Alice", "Bob"]
ages = [25, 30]

for nom, age in zip(noms, ages):
    print(f"{nom} a {age} ans")`
                        }
                    ]
                },
                {
                    id: 'jupyter_magic',
                    title: 'Jupyter & Notebooks',
                    description: 'Magics commands pour gagner du temps.',
                    snippets: [
                        {
                            id: 'timeit',
                            title: 'Mesurer le temps (%timeit)',
                            description: 'Chronometrer une ligne de code.',
                            code: `# Mesure le temps d'exécution moyen (lance la commande plusieurs fois)
%timeit [x**2 for x in range(1000)]

# Pour une cellule entière :
# %%timeit`
                        },
                        {
                            id: 'autoreload',
                            title: 'Rechargement Auto (%autoreload)',
                            description: 'Plus besoin de redémarrer le kernel quand on modifie un module externe.',
                            code: `# À mettre au début du notebook
%load_ext autoreload
%autoreload 2

import mon_module_perso
# Si vous modifiez mon_module_perso.py, les changements sont pris en compte immédiatement !`
                        }
                    ]
                }
            ]
        },
        {
            id: 'python_production',
            title: '6. Production & Engineering',
            description: 'Qualité, Tests et Performance',
            categories: [

                {
                    id: 'environment',
                    title: 'Environnement Virtuel',
                    description: 'Isoler ses projets (Indispensable !)',
                    snippets: [
                        {
                            id: 'venv',
                            title: 'Venv (Standard)',
                            description: 'Créer et activer un environnement virtuel.',
                            code: `import pytest

# 1. Créer l'environnement (dans le dossier du projet)
python -m venv .venv

# 2. Activer l'environnement
# Windows :
.venv\\Scripts\\activate
# Mac/Linux :
source .venv/bin/activate

# 3. Installer des paquets
pip install pandas

# 4. Sauvegarder les dépendances
pip freeze > requirements.txt`
                        }
                    ]
                },
                {
                    id: 'testing',
                    title: 'Tests Unitaires (Pytest)',
                    description: 'Vérifier que le code fait ce qu\'il doit faire.',
                    snippets: [
                        {
                            id: 'pytest_basic',
                            title: 'Premier Test avec Pytest',
                            description: 'Simple, lisible et puissant.',
                            code: `# fichier: test_calcul.py

def addition(a, b):
    return a + b

def test_addition():
    assert addition(2, 3) == 5
    assert addition(-1, 1) == 0

# Lancer les tests dans le terminal :
# pytest`
                        }
                    ]
                },
                {
                    id: 'optimization',
                    title: 'Optimisation & Performance',
                    description: 'Écrire du code rapide.',
                    snippets: [
                        {
                            id: 'vectorization',
                            title: 'Vectorisation vs Boucles',
                            description: 'Pourquoi il ne faut JAMAIS boucler sur un DataFrame.',
                            code: `import pandas as pd
import numpy as np

df = pd.DataFrame({'a': range(1000000), 'b': range(1000000)})

# ❌ LENT (Boucle for)
# for i in range(len(df)):
#     df.loc[i, 'c'] = df.loc[i, 'a'] + df.loc[i, 'b']

# ✅ RAPIDE (Vectorisation)
df['c'] = df['a'] + df['b']

# ✅ ENCORE PLUS RAPIDE (Numpy)
df['c'] = df['a'].values + df['b'].values`
                        }
                    ]
                }
            ]
        },
        {
            id: 'polars',
            title: 'Polars',
            description: 'DataFrame haute performance (Rust)',
            categories: [
                {
                    id: 'polars_intro',
                    title: '1. Pourquoi Polars ?',
                    description: 'Comprendre les avantages par rapport à Pandas.',
                    snippets: [
                        {
                            id: 'pl_advantages',
                            title: 'Pourquoi utiliser Polars ?',
                            description: 'Vitesse, Parallélisme et Lazy Evaluation.',
                            markdown: `🚀 **Pourquoi Polars est plus rapide ?**

1. **Écrit en Rust** : Gestion mémoire ultra-efficace et pas de GIL (Global Interpreter Lock).
2. **Parallélisation** : Utilise tous les cœurs de votre CPU par défaut (Pandas est mono-cœur).
3. **Apache Arrow** : Format mémoire colonnaire standard (zéro copie).
4. **Lazy Evaluation** : Optimise la requête AVANT de l'exécuter (comme SQL).

💡 **Mental Model : Polars vs Pandas**
*   **Pandas (Eager)** : "Fais ça, puis fais ça, puis fais ça..." (Exécution ligne par ligne)
*   **Polars (Lazy)** : "Voici ce que je veux, trouve le meilleur moyen de le faire." (Optimisation globale)`
                        }
                    ]
                },
                {
                    id: 'polars_io',
                    title: '2. Chargement & Export (I/O)',
                    description: 'Lecture optimisée (scan vs read).',
                    snippets: [
                        {
                            id: 'pl_read_scan',
                            title: 'Read vs Scan (Lazy)',
                            description: 'La différence fondamentale.',
                            code: `import polars as pl

# 1. Mode Eager (Classique, comme Pandas)
# Charge TOUT en mémoire immédiatement.
df = pl.read_csv("data.csv") 

# 2. Mode Lazy (Recommandé pour gros fichiers)
# Ne charge RIEN. Crée un plan d'exécution.
# Permet de traiter des fichiers plus gros que la RAM.
q = pl.scan_csv("data.csv")

# Pour voir le plan : q.explain()
# Pour exécuter : q.collect()`
                        },
                        {
                            id: 'pl_parquet',
                            title: 'Parquet (Format Roi)',
                            description: 'Le format natif idéal pour Polars.',
                            code: `# Lecture
df = pl.read_parquet("data.parquet")
q = pl.scan_parquet("data.parquet")

# Écriture
# Polars est extrêmement rapide pour écrire du Parquet
df.write_parquet("output.parquet", compression="snappy")`
                        }
                    ]
                },
                {
                    id: 'polars_exploration',
                    title: '3. Découverte (EDA)',
                    description: 'Inspecter les données.',
                    snippets: [
                        {
                            id: 'pl_glimpse',
                            title: 'Glimpse & Schema',
                            description: 'Aperçu dense des données.',
                            code: `# Aperçu des premières/dernières lignes
print(df.head())
print(df.tail())

# Glimpse (Inspiré de R) : Affiche type + premières valeurs de chaque colonne
print(df.glimpse())

# Schéma (Types de données)
print(df.schema)`
                        },
                        {
                            id: 'pl_describe',
                            title: 'Describe',
                            description: 'Statistiques descriptives.',
                            code: `# Statistiques sommaires
print(df.describe())

# Compter les valeurs uniques (Value Counts)
print(df["categorie"].value_counts())`
                        }
                    ]
                },
                {
                    id: 'polars_subset',
                    title: '4. Sélection & Filtrage',
                    description: 'Select, Filter et Expressions.',
                    snippets: [
                        {
                            id: 'pl_select',
                            title: 'Select (Colonnes)',
                            description: 'Choisir et transformer des colonnes.',
                            code: `# Sélection simple
df.select(["nom", "age"])

# Sélection avec Expressions (Puissant !)
# pl.col("x") est la base de tout en Polars
df.select([
    pl.col("nom"),
    pl.col("age"),
    (pl.col("salaire") * 1.2).alias("salaire_augmente"), # Calcul à la volée
    pl.col("ville").str.to_uppercase() # Manipulation de string
])

# Sélection par type
df.select(pl.col(pl.Int64))`
                        },
                        {
                            id: 'pl_filter',
                            title: 'Filter (Lignes)',
                            description: 'Filtrer les données.',
                            code: `# Filtrage simple
df.filter(pl.col("age") > 18)

# Conditions multiples (& = ET, | = OU)
df.filter(
    (pl.col("age") > 18) & 
    (pl.col("ville") == "Paris")
)

# Filtrer sur une liste (is_in)
villes_cibles = ["Paris", "Lyon"]
df.filter(pl.col("ville").is_in(villes_cibles))`
                        },
                        {
                            id: 'pl_with_columns',
                            title: 'With Columns (Ajout)',
                            description: 'Ajouter ou modifier des colonnes.',
                            code: `# Pandas : df['new'] = ...
# Polars : .with_columns()

df = df.with_columns([
    (pl.col("prix") * 0.2).alias("tva"),
    (pl.col("prix") * 1.2).alias("prix_ttc"),
    pl.lit("En stock").alias("statut") # Valeur littérale (constante)
])`
                        }
                    ]
                },
                {
                    id: 'polars_transformation',
                    title: '5. Transformation',
                    description: 'GroupBy, Agg et Sort.',
                    snippets: [
                        {
                            id: 'pl_groupby',
                            title: 'GroupBy & Agg',
                            description: 'Agrégations performantes.',
                            code: `# Syntaxe : group_by -> agg
df.group_by("ville").agg([
    pl.col("salaire").mean().alias("salaire_moyen"),
    pl.col("salaire").max().alias("salaire_max"),
    pl.len().alias("nb_habitants") # pl.len() = count
])

# Note : group_by (avec underscore) est la nouvelle syntaxe (vs groupby)`
                        },
                        {
                            id: 'pl_window',
                            title: 'Window Functions (Over)',
                            description: 'Calculs par groupe sans réduire le nombre de lignes.',
                            code: `# Ajouter la moyenne de la ville à chaque habitant
# Pandas : transform()
# Polars : .over()

df.with_columns([
    pl.col("salaire").mean().over("ville").alias("moyenne_ville")
])`
                        }
                    ]
                },
                {
                    id: 'polars_combine',
                    title: '6. Combinaison',
                    description: 'Join et Concat.',
                    snippets: [
                        {
                            id: 'pl_join',
                            title: 'Join (Jointures)',
                            description: 'Fusionner des DataFrames.',
                            code: `# Join
# how : 'inner', 'left', 'outer', 'cross', 'semi', 'anti'
df_merged = df_clients.join(df_commandes, on="client_id", how="left")

# Anti Join (Lignes de A qui ne sont PAS dans B)
# Très pratique pour trouver les "non-matchs"
df_non_trouve = df_clients.join(df_commandes, on="client_id", how="anti")`
                        },
                        {
                            id: 'pl_concat',
                            title: 'Concat',
                            description: 'Empiler des données.',
                            code: `# Vertical (Lignes)
pl.concat([df1, df2], how="vertical")

# Horizontal (Colonnes)
pl.concat([df1, df2], how="horizontal")`
                        }
                    ]
                },
                {
                    id: 'polars_advanced',
                    title: '7. Polars Avancé',
                    description: 'Lazy API, Streaming et SQL.',
                    snippets: [
                        {
                            id: 'pl_lazy_flow',
                            title: 'Le Flux Lazy Complet',
                            description: 'L\'exemple canonique d\'optimisation.',
                            code: `q = (
    pl.scan_csv("data.csv")
    .filter(pl.col("date") > "2023-01-01")
    .group_by("categorie")
    .agg(pl.col("montant").sum())
    .sort("montant", descending=True)
)

# Voir le plan optimisé
print(q.explain())

# Exécuter
df_result = q.collect()`
                        },
                        {
                            id: 'pl_streaming',
                            title: 'Streaming (Out-of-Core)',
                            description: 'Traiter des données plus grosses que la RAM.',
                            code: `# Si le dataset est trop gros pour la RAM,
# Polars peut le traiter par morceaux (chunks).

q = pl.scan_csv("big_data.csv")

# streaming=True active le moteur de streaming
df_result = q.collect(streaming=True)`
                        },
                        {
                            id: 'pl_sql',
                            title: 'SQL Context',
                            description: 'Utiliser du SQL sur des DataFrames Polars.',
                            code: `ctx = pl.SQLContext()
ctx.register("clients", df_clients)
ctx.register("ventes", df_ventes)

result = ctx.execute("""
    SELECT c.nom, SUM(v.montant) as total
    FROM clients c
    LEFT JOIN ventes v ON c.id = v.client_id
    GROUP BY c.nom
    ORDER BY total DESC
""")

print(result.collect())`
                        }
                    ]
                }
            ]
        },
        {
            id: 'skrub',
            title: 'Skrub',
            description: 'Préparation de données tabulaires (ex-DirtyCat)',
            categories: [
                {
                    id: 'skrub_intro',
                    title: '1. Introduction & Installation',
                    description: 'Pourquoi Skrub ?',
                    snippets: [
                        {
                            id: 'skrub_install',
                            title: 'Installation & Contexte',
                            description: 'Skrub facilite le preprocessing pour le Machine Learning.',
                            markdown: `### 🧼 Skrub (ex-DirtyCat)

Développé par l'équipe de **scikit-learn**, Skrub est conçu pour combler le fossé entre les données brutes (bases de données, CSV sales) et les modèles de Machine Learning.

**💡 Pourquoi l'utiliser ? Quelle est la plus-value ?**
Contrairement à un preprocessing manuel fastidieux (nettoyer les chaînes, gérer les dates, encoder les catégories une par une), Skrub **automatise** ces tâches ingrates.
*   **Gain de temps** : Il détecte automatiquement les types de données.
*   **Performance** : Il transforme les "mauvaises" catégories (fautes de frappe, variantes comme "Paris" vs "paris") en informations utiles grâce à des encodeurs flous.
*   **Simplicité** : Il s'intègre directement dans vos Pipelines scikit-learn.

\`\`\`bash
pip install skrub
\`\`\`
`
                        }
                    ]
                },
                {
                    id: 'skrub_reporting',
                    title: '2. Reporting Interactif',
                    description: 'Comprendre ses données en une ligne.',
                    snippets: [
                        {
                            id: 'table_report',
                            title: 'TableReport',
                            description: 'Génère un rapport HTML interactif complet.',
                            code: `from skrub import TableReport
import pandas as pd

# Affiche un rapport interactif directement dans le notebook
# - Détection automatique des types
# - Histogrammes et distributions
# - Valeurs manquantes et corrélations
TableReport(df)`
                        }
                    ]
                },
                {
                    id: 'skrub_preprocessing',
                    title: '3. Preprocessing Automatique',
                    description: 'Le tout-en-un : TableVectorizer.',
                    snippets: [
                        {
                            id: 'table_vectorizer',
                            title: 'TableVectorizer',
                            description: 'Transforme tout un DataFrame en nombres pour le ML.',
                            code: `from skrub import TableVectorizer
from sklearn.pipeline import make_pipeline
from sklearn.ensemble import RandomForestClassifier

# TableVectorizer remplace ColumnTransformer + OneHotEncoder + StandardScaler
# Il détecte les types et applique la meilleure transformation :
# - Dates -> Année, Mois, Jour...
# - Catégories -> OneHot ou GapEncoder (si beaucoup de catégories)
# - Nombres -> Pas de changement (ou scaling)

pipeline = make_pipeline(
    TableVectorizer(),
    RandomForestClassifier()
)

pipeline.fit(X_train, y_train)`
                        }
                    ]
                },
                {
                    id: 'skrub_encoders',
                    title: '4. Encoders Avancés',
                    description: 'Gérer les catégories "sales" (Dirty Categories).',
                    snippets: [
                        {
                            id: 'minhash_encoder',
                            title: 'MinHashEncoder',
                            description: 'Pour les catégories avec beaucoup de valeurs uniques ou des fautes.',
                            code: `from skrub import MinHashEncoder

# Idéal pour : Noms, Adresses, Descriptions courtes
# Transforme les chaînes en vecteurs basés sur les n-grams.
# Résistant aux fautes de frappe ("Paris" vs "Pariis").

encoder = MinHashEncoder(n_components=30)
X_encoded = encoder.fit_transform(X[['ville']])`
                        },
                        {
                            id: 'gap_encoder',
                            title: 'GapEncoder',
                            description: 'Topic Modeling pour colonnes textuelles.',
                            code: `from skrub import GapEncoder

# Trouve des "sujets" latents dans le texte.
# Utile pour des descriptions de produits, commentaires...
# Interprétable : on peut voir les mots-clés de chaque topic.

encoder = GapEncoder(n_components=10)
X_topics = encoder.fit_transform(X[['description']])`
                        }
                    ]
                },
                {
                    id: 'skrub_joins',
                    title: '5. Jointures Floues & Agrégations',
                    description: 'Assembler des tables complexes.',
                    snippets: [
                        {
                            id: 'joiner',
                            title: 'Joiner (Fuzzy Join)',
                            description: 'Joindre deux tables même si les clés ne correspondent pas exactement.',
                            code: `from skrub import Joiner

# Jointure floue (basée sur la similarité de texte)
# Ex: Joindre "Coca-Cola" avec "Coca Cola Inc."
joiner = Joiner(
    aux_table=df_info_entreprises, 
    main_key='nom_entreprise', 
    aux_key='nom_societe',
    match_score=0.8 # Seuil de similarité
)

df_enrichi = joiner.fit_transform(df_main)`
                        },
                        {
                            id: 'aggregator',
                            title: 'Aggregator',
                            description: 'Agréger une table secondaire avant jointure.',
                            code: `from skrub import Aggregator

# Résume une table liée (ex: commandes) pour la joindre à la table principale (ex: clients)
# Calcule automatiquement : min, max, sum, mean... pour les colonnes numériques
agg = Aggregator(
    main_key='client_id', 
    cols_to_summarize=['montant', 'date']
)

df_resumed = agg.fit_transform(df_commandes)`
                        }
                    ]
                },
                {
                    id: 'skrub_cheat',
                    title: 'Récapitulatif',
                    description: 'Les fonctions clés de Skrub.',
                    snippets: [
                        {
                            id: 'skrub_cheat_sheet',
                            title: 'Cheat Sheet',
                            description: 'Tableau récapitulatif des fonctions.',
                            markdown: `### 🛠️ Fonctions Clés de Skrub

| Fonction | Usage Principal | Réel Avantage 🚀 | Scikit-Learn Equivalent |
| :--- | :--- | :--- | :--- |
| \`TableReport\` | Audit rapide (HTML) | **Vision immédiate** des problèmes (types, manques). | \`df.describe()\` |
| \`TableVectorizer\` | Preprocessing Auto | **Gère tout** (dates, catégories, nombres) sans config. | \`ColumnTransformer\` |
| \`MinHashEncoder\` | Catégories sales | **Tolère les fautes** de frappe et variantes. | \`OneHotEncoder\` |
| \`GapEncoder\` | Topics (Texte court) | **Interprétable** (donne les mots-clés des sujets). | \`NMF\` |
| \`Joiner\` | Jointure floue | **Joint sans clé exacte** (ex: "Apple" = "Apple Inc"). | - |
| \`Aggregator\` | Agrégation relationnelle | **Crée des features** auto depuis une table liée. | \`groupby()\` |
`
                        }
                    ]
                }
            ]
        },
        {
            id: 'numpy',
            title: 'Numpy',
            description: 'Calcul Numérique & Matriciel',
            categories: [

                {
                    id: 'arrays',
                    title: 'Tableaux (Arrays)',
                    description: 'Création et manipulation.',
                    snippets: [
                        {
                            id: 'create_array',
                            title: 'Création',
                            description: 'Différentes façons de créer des arrays.',
                            code: `import numpy as np

# À partir d'une liste
arr = np.array([1, 2, 3])

# Zéros et Uns
zeros = np.zeros((3, 3)) # Matrice 3x3 de 0
ones = np.ones((2, 4))   # Matrice 2x4 de 1

# Séquences
range_arr = np.arange(0, 10, 2) # [0, 2, 4, 6, 8]
linspace_arr = np.linspace(0, 1, 5) # 5 points entre 0 et 1`
                        },
                        {
                            id: 'reshape',
                            title: 'Dimensions & Reshape',
                            description: 'Changer la forme des données.',
                            code: `arr = np.arange(12) # [0..11]

# Changer en matrice 3x4
mat = arr.reshape(3, 4)

# Aplatir (Flatten)
flat = mat.flatten()`
                        }
                    ]
                },
                {
                    id: 'math_ops',
                    title: 'Opérations Mathématiques',
                    description: 'Calculs vectorisés.',
                    snippets: [
                        {
                            id: 'basic_math',
                            title: 'Calculs de base',
                            description: 'Opérations élément par élément.',
                            code: `a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

print(a + b) # [11, 22, 33]
print(a * 2) # [2, 4, 6]
print(a ** 2) # [1, 4, 9]`
                        },
                        {
                            id: 'stats_np',
                            title: 'Statistiques',
                            description: 'Moyenne, écart-type, etc.',
                            code: `arr = np.array([1, 2, 3, 4, 5])

print(np.mean(arr))  # Moyenne
print(np.std(arr))   # Écart-type
print(np.median(arr)) # Médiane
print(np.max(arr))    # Maximum`
                        }
                    ]
                }
            ]
        },
        {
            id: 'statsmodels',
            title: 'Statsmodels',
            description: 'Modélisation Statistique',
            categories: [

                {
                    id: 'regression_sm',
                    title: 'Régression (OLS)',
                    description: 'Moindres Carrés Ordinaires.',
                    snippets: [
                        {
                            id: 'ols_formula',
                            title: 'OLS (Formule)',
                            description: 'Syntaxe style R (plus simple).',
                            code: `import statsmodels.api as sm
import statsmodels.formula.api as smf

# Fit du modèle (y ~ x1 + x2)
model = smf.ols('ventes ~ pub_tv + pub_radio', data=df).fit()

# Résumé complet (R-squared, p-values...)
print(model.summary())`
                        },
                        {
                            id: 'ols_arrays',
                            title: 'OLS (Arrays)',
                            description: 'Avec X et y (comme Scikit-Learn).',
                            code: `# Il faut ajouter une constante (intercept) manuellement !
X = sm.add_constant(X)

model = sm.OLS(y, X).fit()
print(model.summary())`
                        }
                    ]
                }
            ]
        },
        {
            id: 'streamlit',
            title: 'Streamlit',
            description: 'Applications Web Data',
            categories: [

                {
                    id: 'st_basics',
                    title: 'Éléments de Base',
                    description: 'Titres, textes et données.',
                    snippets: [
                        {
                            id: 'st_text',
                            title: 'Texte & Titres',
                            description: 'Structurer la page.',
                            code: `import streamlit as st

st.title("Mon Application Data")
st.header("Une section importante")
st.subheader("Une sous-section")
st.text("Du texte brut.")
st.markdown("**Du markdown** avec du *style*.")`
                        },
                        {
                            id: 'st_data',
                            title: 'Afficher des Données',
                            description: 'DataFrames et Métriques.',
                            code: `# DataFrame interactif
st.dataframe(df)

# Table statique
st.table(df.head())

# Métrique (KPI)
st.metric(label="Chiffre d'Affaires", value="50k€", delta="+5%")`
                        }
                    ]
                },
                {
                    id: 'st_widgets',
                    title: 'Widgets Interactifs',
                    description: 'Boutons, Sliders, Inputs.',
                    snippets: [
                        {
                            id: 'st_input',
                            title: 'Entrées Utilisateur',
                            description: 'Récupérer des valeurs.',
                            code: `nom = st.text_input("Votre nom")
age = st.number_input("Votre âge", min_value=0, max_value=120)

if st.button("Valider"):
    st.write(f"Bonjour {nom} !")`
                        },
                        {
                            id: 'st_sidebar',
                            title: 'Sidebar',
                            description: 'Barre latérale pour les filtres.',
                            code: `with st.sidebar:
    st.header("Filtres")
    ville = st.selectbox("Choisir une ville", ["Paris", "Lyon", "Marseille"])
    
st.write(f"Ville sélectionnée : {ville}")`
                        }
                    ]
                }
            ]
        }
    ]
};
