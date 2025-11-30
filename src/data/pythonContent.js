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
                            level: 'beginner',
                            tags: ['csv', 'io', 'pandas'],
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
                            level: 'beginner',
                            tags: ['excel', 'io', 'pandas'],
                            code: `# Lire une feuille spécifique
df = pd.read_excel('data.xlsx', sheet_name='Feuille1')

# Lire toutes les feuilles (retourne un dictionnaire)
dfs = pd.read_excel('data.xlsx', sheet_name=None)`
                        },
                        {
                            id: 'export',
                            title: 'Exporter des données',
                            description: 'Sauvegarder en CSV, Excel ou Pickle.',
                            level: 'beginner',
                            tags: ['csv', 'excel', 'pickle', 'io', 'pandas'],
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
                            level: 'beginner',
                            tags: ['eda', 'exploration', 'pandas'],
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
                            level: 'beginner',
                            tags: ['eda', 'statistics', 'pandas'],
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
                            level: 'intermediate',
                            tags: ['cleaning', 'columns', 'pandas'],
                            code: `df = df.rename(columns={
    'old_name': 'new_name',
    'Date de Naissance': 'date_naissance'
})`
                        },
                        {
                            id: 'types',
                            title: 'Changer les Types',
                            description: 'Conversion explicite des types.',
                            level: 'intermediate',
                            tags: ['cleaning', 'types', 'conversion', 'pandas'],
                            code: `# Vers numérique
df['prix'] = pd.to_numeric(df['prix'], errors='coerce')

# Vers datetime
df['date'] = pd.to_datetime(df['date'])

# Vers catégorie (optimisation mémoire)
df['statut'] = df['statut'].astype('category')

# Vers texte (string/object)
df['nom'] = df['nom'].astype(str)`
                        },
                        {
                            id: 'missing',
                            title: 'Valeurs Manquantes',
                            description: 'Gestion des NaN.',
                            level: 'intermediate',
                            tags: ['cleaning', 'nan'],
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
                            tags: ['cleaning', 'duplicates', 'pandas'],
                            code: `# Supprimer les doublons
df = df.drop_duplicates()

# Supprimer les doublons sur une colonne spécifique
df = df.drop_duplicates(subset=['id_client'], keep='last')`
                        },
                        {
                            id: 'strings',
                            title: 'Manipulation de Texte',
                            description: 'Nettoyage via l\'accesseur .str',
                            tags: ['cleaning', 'text', 'string', 'pandas'],
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
                            tags: ['subsetting', 'columns', 'pandas'],
                            code: `# Liste de colonnes
subset = df[['nom', 'age', 'ville']]

# Exclure des colonnes
df = df.drop(columns=['id_interne', 'temp'])`
                        },
                        {
                            id: 'query',
                            title: 'Filtrage avec .query()',
                            description: 'Syntaxe lisible pour filtrer.',
                            level: 'intermediate',
                            tags: ['subsetting', 'filter', 'query', 'pandas'],
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
                            level: 'intermediate',
                            tags: ['subsetting', 'filter', 'loc', 'pandas'],
                            code: `# Masque booléen
mask = (df['age'] > 25) & (df['ville'] == 'Paris')
df_filtered = df.loc[mask]`
                        },
                        {
                            id: 'iloc_basics',
                            title: 'Sélection par Position (.iloc)',
                            description: 'Sélectionner par index (numéro de ligne/colonne).',
                            tags: ['subsetting', 'iloc', 'pandas'],
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
                            tags: ['logic', 'regex', 'pandas'],
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
                            level: 'intermediate',
                            tags: ['transformation', 'apply', 'map', 'pandas'],
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
                            level: 'intermediate',
                            tags: ['transformation', 'groupby', 'aggregation', 'pandas'],
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
                            level: 'intermediate',
                            tags: ['transformation', 'pivot', 'pandas'],
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
                            title: 'Tri (Sort)',
                            description: 'Trier les données.',
                            level: 'beginner',
                            tags: ['transformation', 'sort', 'pandas'],
                            code: `# Trier par plusieurs colonnes
# D'abord par Ville (A-Z), puis par Age (Décroissant)
df = df.sort_values(by = ['ville', 'age'], ascending = [True, False])

# Trier par Index(remettre les lignes dans l'ordre original)
                                df = df.sort_index()`
                        },
                        {
                            id: 'reset_index',
                            title: 'Reset Index',
                            description: 'Réinitialiser l\'index (souvent après un filtre ou un tri).',
                            tags: ['transformation', 'index', 'pandas'],
                            code: `# Cas d'usage classique :
# Après un filtrage, les index sont "troués" (ex: 1, 5, 8...).
# reset_index() recrée un index propre(0, 1, 2...).

# drop = True : Ne garde pas l'ancien index comme colonne (le supprime).
# inplace = True : Modifie le DataFrame directement(pas besoin de df = ...)
df.reset_index(drop = True, inplace = True)

# Sans drop = True, l'ancien index devient une colonne nommée "index".`
                        }
                    ]
                },
                {
                    id: 'time_series_advanced',
                    title: 'Feature Engineering Temporel',
                    description: 'Techniques avancées pour les dates.',
                    snippets: [
                        {
                            id: 'date_feature_engineering_advanced',
                            title: 'Feature Engineering Temporel Avancé',
                            description: 'Créer des features puissantes pour le Machine Learning.',
                            level: 'advanced',
                            tags: ['time-series', 'feature-engineering', 'pandas'],
                            markdown: `### 1. La Cyclicité (Sin/Cos)
**Problème** : Pour un modèle, Décembre (12) est loin de Janvier (1).
**Solution** : On projette le temps sur un cercle avec Sinus et Cosinus.

#### 2. La Mémoire (Lags & Rolling)
Pour prédire le futur, le passé récent est souvent le meilleur indicateur.
*   **Lag** : "Combien j'ai vendu hier ?"
*   **Rolling** : "Moyenne des 7 derniers jours ?"

#### 3. L'Ancienneté (Time Deltas)
Le temps écoulé depuis un événement clé (ex: ouverture de compte, dernière promo) est souvent un facteur décisif.`,
                            code: `import pandas as pd
import numpy as np

# --- 1. Création d'un Dataset Exemple (Série Temporelle) ---
# On simule 1 an de ventes quotidiennes
dates = pd.date_range(start = '2024-01-01', periods = 365, freq = 'D')
df = pd.DataFrame({
            'date': dates,
            'ventes': np.random.randint(50, 200, size = 365) # Ventes aléatoires
        })

print("--- Données Brutes ---")
print(df.head())

# --- 2. Encodage Cyclique(Sin/ Cos) ---
# Indispensable pour capturer la saisonnalité(Hiver -> Printemps -> ...)
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek

def encode_cyclical(df, col, max_val):
    # On normalise entre 0 et 2pi, puis on prend sin et cos
    df[col + '_sin'] = np.sin(2 * np.pi * df[col] / max_val)
    df[col + '_cos'] = np.cos(2 * np.pi * df[col] / max_val)
    return df

# Mois: Cycle de 12
df = encode_cyclical(df, 'month', 12)
# Jour de la semaine: Cycle de 7(0 = Lundi, 6 = Dimanche)
df = encode_cyclical(df, 'day_of_week', 7)

# -- - 3. Lags(Décalages Temporels)-- -
# "La valeur d'hier aide à prédire aujourd'hui"
# Attention: Cela crée des NaN au début(qu'il faudra gérer)
df['ventes_lag_1'] = df['ventes'].shift(1) # Ventes de la veille(J - 1)
df['ventes_lag_7'] = df['ventes'].shift(7) # Ventes de la semaine dernière(J - 7)

# -- - 4. Fenêtres Glissantes(Rolling Windows)-- -
# Capter la tendance locale(lisser le bruit)
# Moyenne mobile sur 7 jours
df['ventes_rolling_mean_7'] = df['ventes'].rolling(window = 7).mean()
# Écart - type sur 7 jours(Volatilité)
df['ventes_rolling_std_7'] = df['ventes'].rolling(window = 7).std()

# -- - 5. Temps Écoulé(Time Deltas)-- -
# Utile pour modéliser l'usure, l'ancienneté, ou l'effet "depuis le dernier événement"
# Ex: Jours depuis le début de l'année (Tendance globale)
ref_date = pd.Timestamp('2024-01-01')
df['jours_depuis_debut'] = (df['date'] - ref_date).dt.days

# -- - 6. Nettoyage Final-- -
# Les Lags et Rolling créent des NaN au début.
# Option A : Supprimer les lignes(on perd les 7 premiers jours)
df_clean = df.dropna()

# Option B : Remplir(ex: avec 0 ou la moyenne), mais attention au Data Leakage!
# df_clean = df.fillna(0)

print("\\n--- Dataset Enrichi (Feature Engineering) ---")
cols_to_show = ['date', 'month_sin', 'month_cos', 'ventes', 'ventes_lag_1', 'ventes_rolling_mean_7']
print(df_clean[cols_to_show].tail())`
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
                            level: 'intermediate',
                            tags: ['viz', 'seaborn', 'matplotlib'],
                            image: '/MemoCode/images/histogram.png',
                            code: `import matplotlib.pyplot as plt
import seaborn as sns

# Histogramme avec courbe de densité(KDE)
# kde = True : ajoute la courbe de densité lissée
# bins = 30 : définit le nombre de barres
sns.histplot(data = df, x = 'colonne_numerique', kde = True, bins = 30)
plt.title('Distribution de la variable numérique')
plt.show()`
                        },
                        {
                            id: 'boxplot',
                            title: 'Boxplot',
                            description: 'Détection d\'outliers et quartiles.',
                            level: 'intermediate',
                            tags: ['viz', 'seaborn', 'outliers'],
                            image: '/MemoCode/images/boxplot.png',
                            code: `# Boîte à moustaches(Boxplot)
# Permet de voir la médiane, les quartiles et les outliers(points)
# x: la variable numérique à analyser
sns.boxplot(data = df, x = 'colonne_numerique')
plt.title('Détection des outliers')
plt.show()`
                        },
                        {
                            id: 'countplot',
                            title: 'Countplot',
                            description: 'Fréquence des catégories.',
                            level: 'beginner',
                            tags: ['viz', 'seaborn', 'categorical'],
                            image: '/MemoCode/images/countplot.png',
                            code: `# Diagramme en barres pour variables catégorielles
# Compte automatiquement le nombre d'occurrences de chaque catégorie
# order: permet de trier les barres(ici par fréquence décroissante)
sns.countplot(
                                data = df,
                                x = 'colonne_categorie',
                                order = df['colonne_categorie'].value_counts().index
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
                            id: 'boxplot_bivariate',
                            title: 'Boxplot Bivarié',
                            description: 'Distribution d\'une variable numérique par catégorie.',
                            level: 'intermediate',
                            tags: ['viz', 'seaborn', 'bivariate'],
                            image: '/MemoCode/images/boxplot.png',
                            code: `# Boxplot Bivarié
# x: Variable Catégorielle(Groupes)
# y: Variable Numérique(Mesure)
sns.boxplot(data = df, x = 'categorie', y = 'montant')
plt.title('Distribution du Montant par Catégorie')
plt.show()`
                        },
                        {
                            id: 'scatterplot',
                            title: 'Scatter Plot',
                            description: 'Relation numérique vs numérique.',
                            level: 'intermediate',
                            tags: ['viz', 'seaborn', 'correlation'],
                            image: '/MemoCode/images/scatterplot.png',
                            code: `# Nuage de points(Scatter Plot)
# Idéal pour voir la corrélation entre deux variables numériques
# hue: colore les points selon une variable catégorielle
# alpha: transparence des points(utile si beaucoup de données)
sns.scatterplot(
                                data = df,
                                x = 'col_num_1',
                                y = 'col_num_2',
                                hue = 'categorie',
                                alpha = 0.7
                            )
plt.title('Relation entre deux variables numériques')
plt.show()`
                        },
                        {
                            id: 'lineplot',
                            title: 'Line Plot',
                            description: 'Séries temporelles.',
                            level: 'beginner',
                            tags: ['viz', 'seaborn', 'time-series'],
                            image: '/MemoCode/images/lineplot.png',
                            code: `# Graphique linéaire(Line Plot)
# Parfait pour les séries temporelles ou l'évolution continue
# ci = None : désactive l'intervalle de confiance (zone ombrée) pour alléger
sns.lineplot(data = df, x = 'date', y = 'valeur', ci = None)
plt.title('Évolution temporelle')
plt.show()`
                        },
                        {
                            id: 'barplot',
                            title: 'Bar Plot',
                            description: 'Comparaison numérique par catégorie.',
                            level: 'beginner',
                            tags: ['viz', 'seaborn', 'comparison'],
                            image: '/MemoCode/images/barplot.png',
                            code: `# Bar Plot(Comparaison de moyennes)
# Affiche la moyenne(par défaut) d'une variable numérique par catégorie
# La petite barre noire au sommet est l'intervalle de confiance (erreur)
sns.barplot(data = df, x = 'categorie', y = 'valeur_numerique')
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
                            level: 'advanced',
                            tags: ['viz', 'seaborn', 'correlation', 'heatmap'],
                            image: '/MemoCode/images/heatmap.png',
                            code: `# Heatmap de Corrélation
# 1. Calculer la matrice de corrélation
corr = df.corr()

# 2. Afficher la heatmap
# annot = True : affiche les valeurs dans les cases
# cmap = 'coolwarm' : dégradé bleu(négatif) -> rouge(positif)
# fmt = '.2f' : formatage à 2 décimales
plt.figure(figsize = (10, 8))
sns.heatmap(corr, annot = True, cmap = 'coolwarm', fmt = '.2f')
plt.title('Matrice de Corrélation')
plt.show()`
                        },
                        {
                            id: 'pairplot',
                            title: 'Pairplot',
                            description: 'Vue d\'ensemble des relations.',
                            level: 'advanced',
                            tags: ['viz', 'seaborn', 'multivariate'],
                            code: `# Pairplot(Grille de graphiques)
# Affiche les relations bivariées pour toutes les paires de variables
# Diagonale: distribution univariée(histogramme / KDE)
# hue: sépare les groupes par couleur
sns.pairplot(df, hue = 'target_variable')
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
                            tags: ['viz', 'missingno', 'quality'],
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
                            tags: ['viz', 'missingno', 'quality'],
                            code: `# Barplot des données présentes
# Affiche le nombre de valeurs non - nulles par colonne
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
            title: 'Modélisation & AI',
            description: 'Machine Learning, Stats et Deep Learning.',
            categories: [
                {
                    id: 'pipelines',
                    title: '0. Pipelines & Workflow',
                    subCategory: 'Machine Learning',
                    description: 'Automatiser et sécuriser le ML.',
                    snippets: [
                        {
                            id: 'pipeline_concept',
                            title: 'Comprendre les Pipelines',
                            description: 'Pourquoi utiliser un Pipeline ?',
                            tags: ['ml', 'pipeline', 'concept'],
                            markdown: `### ⛓️ Le Pipeline Scikit - Learn

Un Pipeline permet d'enchaîner séquentiellement toutes les étapes de traitement des données jusqu'au modèle final.

** Pourquoi est - ce indispensable ?**
                    1. ** Zéro Fuite de Données(Data Leakage) ** : Le pipeline s'assure que les transformations (ex: moyenne pour l'imputation) sont apprises * uniquement * sur le train set et appliquées aveuglément sur le test set.
2. ** Reproductibilité ** : Tout le processus est contenu dans un seul objet.
3. ** Simplicité ** : On appelle \`fit()\` et \`predict()\` une seule fois pour tout le flux.

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
                            level: 'advanced',
                            tags: ['ml', 'pipeline', 'sklearn'],
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
                    subCategory: 'Machine Learning',
                    description: 'Split, Encodage et Scaling',
                    snippets: [
                        {
                            id: 'train_test_split',
                            title: 'Séparation Train / Test',
                            description: 'Diviser les données pour évaluer le modèle.',
                            level: 'intermediate',
                            tags: ['ml', 'preprocessing', 'sklearn'],
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
                            level: 'intermediate',
                            tags: ['ml', 'preprocessing', 'encoding', 'sklearn'],
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
                            level: 'intermediate',
                            tags: ['ml', 'preprocessing', 'scaling', 'sklearn'],
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
                    id: 'supervised_classification',
                    title: '2. Classification Supervisée',
                    subCategory: 'Machine Learning',
                    description: 'Apprendre à classer à partir d\'exemples étiquetés.',
                    snippets: [
                        {
                            id: 'lda_qda_logistic',
                            title: 'Discriminante & Logistique',
                            description: 'Approches probabilistes.',
                            level: 'intermediate',
                            tags: ['ml', 'classification', 'linear', 'sklearn'],
                            markdown: `### 📐 Formules & Concepts

**1. Régression Logistique**
Modélise la probabilité d'appartenance à la classe 1 via une sigmoïde.
$$ P(Y=1|X) = \\frac{1}{1 + e^{-(\\beta_0 + \\beta_1 X)}} $$
*   **Frontière** : Linéaire.

**2. Analyse Discriminante Linéaire (LDA)**
Suppose que les classes suivent une loi Normale avec la **même covariance** (homoscédasticité).
*   **Frontière** : Linéaire.
*   **Projection** : Maximise la séparation entre les classes tout en minimisant la variance interne.

**3. Analyse Discriminante Quadratique (QDA)**
Comme la LDA, mais chaque classe a sa **propre covariance** (hétéroscédasticité).
*   **Frontière** : Quadratique (Courbe).

---
*   📍 **Situation** : Classification binaire ou multi-classes simple. LDA/QDA si les hypothèses de normalité sont respectées.
*   ✅ **Qualité** : Probabilités bien calibrées, interprétable, rapide.
*   ❌ **Défaut** : Hypothèses statistiques fortes (linéarité, normalité).`,
                            code: `from sklearn.linear_model import LogisticRegression
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis, QuadraticDiscriminantAnalysis

# 1. Logistique (Le standard)
log_reg = LogisticRegression()
log_reg.fit(X_train, y_train)

# 2. LDA (Si on suppose même variance)
lda = LinearDiscriminantAnalysis()
lda.fit(X_train, y_train)

# 3. QDA (Si variances différentes)
qda = QuadraticDiscriminantAnalysis()
qda.fit(X_train, y_train)`
                        },
                        {
                            id: 'decision_tree',
                            title: 'Arbre de Décision',
                            description: 'Diviser pour mieux régner.',
                            level: 'intermediate',
                            tags: ['ml', 'classification', 'tree', 'sklearn'],
                            markdown: `### 🌳 Critères de Split

L'arbre cherche la question qui sépare le mieux les données en minimisant l'impureté.

**1. Indice de Gini (Défaut)**
Mesure la probabilité de mal classer un élément choisi au hasard.
$$ Gini = 1 - \\sum_{i=1}^{C} p_i^2 $$
*   0 = Pur (tous les éléments sont de la même classe).

**2. Entropie (Théorie de l'information)**
Mesure le désordre.
$$ Entropie = - \\sum_{i=1}^{C} p_i \\log_2(p_i) $$

---
*   📍 **Situation** : Besoin de règles claires ("Si Age > 25 alors...").
*   ✅ **Qualité** : Explicabilité totale, pas besoin de scaling, gère mix numérique/catégoriel.
*   ❌ **Défaut** : Instable (change si les données changent un peu), sur-apprentissage facile.`,
                            code: `from sklearn.tree import DecisionTreeClassifier

# criterion='gini' (ou 'entropy')
# max_depth=5 : Limite la profondeur pour éviter le sur-apprentissage
tree = DecisionTreeClassifier(criterion='gini', max_depth=5)
tree.fit(X_train, y_train)`
                        },
                        {
                            id: 'svm',
                            title: 'SVM (Séparateur à Vaste Marge)',
                            description: 'Maximiser la marge entre les classes.',
                            level: 'advanced',
                            tags: ['ml', 'classification', 'svm', 'sklearn'],
                            markdown: `### ⚔️ L'Hyperplan
Le SVM cherche la ligne (ou plan) qui sépare le mieux les classes avec la plus grande marge.
\`\`\`mermaid
graph LR
    subgraph Classe A
    A1((A))
    A2((A))
    end
    subgraph Classe B
    B1((B))
    B2((B))
    end
    A2 --- Marge --- B1
    style Marge stroke-dasharray: 5 5
\`\`\`

### 🛣️ Le Concept

Le SVM cherche l'hyperplan qui sépare les classes avec la plus grande **marge** possible (la "rue" la plus large).

**Les Noyaux (Kernels)**
Si les données ne sont pas séparables linéairement, on les projette dans une dimension supérieure ("Kernel Trick").
*   **Linéaire** : $$ K(x, x') = x \\cdot x' $$
*   **Polynomial** : $$ K(x, x') = (\\gamma x \\cdot x' + r)^d $$
*   **RBF (Radial Basis Function)** : Le plus utilisé.
    $$ K(x, x') = e^{-\\gamma ||x - x'||^2} $$

---
*   📍 **Situation** : Données complexes, haute dimension, pas trop de bruit.
*   ✅ **Qualité** : Très performant en haute dimension, robuste si bien paramétré.
*   ❌ **Défaut** : Lent sur grands datasets, sensible au bruit, "Boîte noire".`,
                            code: `from sklearn.svm import SVC

# C : Pénalité (Grand C = Marge étroite, risque d'overfitting / Petit C = Marge large)
# kernel='rbf' : Pour les frontières non-linéaires
svm = SVC(kernel='rbf', C=1.0)
svm.fit(X_train_scaled, y_train) # SCALING OBLIGATOIRE !`
                        },
                        {
                            id: 'perceptron',
                            title: 'Perceptron',
                            description: 'L\'ancêtre des réseaux de neurones.',
                            level: 'intermediate',
                            tags: ['ml', 'classification', 'linear', 'sklearn'],
                            markdown: `### 🧠 Neurone Artificiel Simple

Le Perceptron est un classifieur linéaire simple.
$$ f(x) = \\begin{cases} 1 & \\text{si } w \\cdot x + b > 0 \\\\ 0 & \\text{sinon} \\end{cases} $$

Il met à jour ses poids $w$ uniquement quand il se trompe.

---
*   📍 **Situation** : Historique ou problèmes linéairement séparables très simples.
*   ✅ **Qualité** : Simple, base du Deep Learning.
*   ❌ **Défaut** : Ne converge pas si les données ne sont pas linéairement séparables.`,
                            code: `from sklearn.linear_model import Perceptron

perc = Perceptron(tol=1e-3, random_state=0)
perc.fit(X_train_scaled, y_train)`
                        }
                    ]
                },
                {
                    id: 'unsupervised_classification',
                    title: '3. Classification Non Supervisée',
                    subCategory: 'Machine Learning',
                    description: 'Regrouper des données sans étiquettes (Clustering).',
                    snippets: [
                        {
                            id: 'distances',
                            title: '📏 Les Distances',
                            description: 'Fondamental pour le Clustering.',
                            level: 'intermediate',
                            tags: ['ml', 'unsupervised', 'distance'],
                            markdown: `### 📐 Formules des Distances

La notion de "proximité" dépend de la distance choisie. Soit deux points $A(x_1, ..., x_n)$ et $B(y_1, ..., y_n)$.

**1. Distance Euclidienne (L2)**
La ligne droite (vol d'oiseau).
$$ d(A, B) = \\sqrt{\\sum (x_i - y_i)^2} $$

**2. Distance de Manhattan (L1)**
Déplacement en grille (comme un taxi dans New York).
$$ d(A, B) = \\sum |x_i - y_i| $$

**3. Distance de Minkowski**
Généralisation des deux précédentes (paramètre $p$).
$$ d(A, B) = (\\sum |x_i - y_i|^p)^{1/p} $$

**4. Distance de Chebyshev (L∞)**
La plus grande différence sur une seule dimension.
$$ d(A, B) = \\max_i |x_i - y_i| $$

**5. Distance Cosinus**
Mesure l'angle (indépendant de la magnitude). Utilisé en NLP.
$$ d(A, B) = 1 - \\frac{A \\cdot B}{||A|| \\times ||B||} $$`
                        },
                        {
                            id: 'kmeans_clouds',
                            title: 'K-Moyennes & Nuées Dynamiques',
                            description: 'Partitionnement itératif.',
                            level: 'advanced',
                            tags: ['ml', 'clustering', 'kmeans', 'sklearn'],
                            markdown: `### 🎯 K-Means

L'algorithme cherche à minimiser l'**Inertie Intra-Classe** (Variance au sein des clusters).
$$ I = \\sum_{k=1}^{K} \\sum_{x_i \\in C_k} ||x_i - \\mu_k||^2 $$

**Paramètres Clés :**
*   \`n_clusters\` (K) : Nombre de groupes (à définir a priori).
*   \`init\` : Méthode d'initialisation ('k-means++' pour optimiser le départ).

**Nuées Dynamiques** : C'est une généralisation du K-Means qui permet d'utiliser d'autres noyaux que la moyenne (ex: K-Medoids).

---
*   📍 **Situation** : Gros volumes de données, on connait le nombre de clusters (ou on l'estime).
*   ✅ **Qualité** : Rapide, scalable.
*   ❌ **Défaut** : Sensible à l'initialisation, suppose des clusters sphériques, nécessite K.`,
                            code: `from sklearn.cluster import KMeans

# 1. Définir le modèle
kmeans = KMeans(n_clusters=3, init='k-means++', random_state=42)

# 2. Entraîner (Pas de y !)
kmeans.fit(X_scaled)

# 3. Récupérer les labels et les centres
labels = kmeans.labels_
centres = kmeans.cluster_centers_`
                        },
                        {
                            id: 'cah',
                            title: 'Classification Hiérarchique (CAH)',
                            description: 'Arbre de regroupement (Dendrogramme).',
                            level: 'advanced',
                            tags: ['ml', 'clustering', 'hierarchical', 'sklearn'],
                            image: '/MemoCode/images/dendrogram.png',
                            markdown: `### 🌳 Le Dendrogramme
Visualisation de la hiérarchie des clusters.
\`\`\`mermaid
graph TD
    A[Données] --> B[Cluster 1]
    A --> C[Cluster 2]
    B --> D[Point 1]
    B --> E[Point 2]
    C --> F[Point 3]
    C --> G[Cluster 3]
    G --> H[Point 4]
    G --> I[Point 5]
\`\`\`

### 🌳 Agglomerative Clustering

On part de N clusters (chaque point est seul) et on fusionne les plus proches itérativement.

**Critères de Lien (Linkage) :**
Comment calculer la distance entre deux clusters A et B ?
*   **Ward** (Défaut) : Minimise l'augmentation de la variance interne. (Clusters compacts).
*   **Single** (Saut minimum) : Distance entre les deux points les plus proches. (Effet chaîne).
*   **Complete** (Saut maximum) : Distance entre les deux points les plus éloignés.

---
*   📍 **Situation** : Petits datasets, besoin de visualiser la hiérarchie (Dendrogramme).
*   ✅ **Qualité** : Pas besoin de choisir K au départ, visuel riche.
*   ❌ **Défaut** : Très lent sur gros volumes (complexité cubique ou quadratique).`,
                            code: `from sklearn.cluster import AgglomerativeClustering
import scipy.cluster.hierarchy as sch
import matplotlib.pyplot as plt

# 1. Dendrogramme (Pour choisir le nombre de clusters)
plt.figure(figsize=(10, 7))
dendrogram = sch.dendrogram(sch.linkage(X_scaled, method='ward'))
plt.show()

# 2. Modèle
cah = AgglomerativeClustering(n_clusters=3, linkage='ward')
labels = cah.fit_predict(X_scaled)`
                        },
                        {
                            id: 'kohonen',
                            title: 'Réseau de Kohonen (SOM)',
                            description: 'Carte Auto-Organisatrice.',
                            level: 'advanced',
                            tags: ['ml', 'clustering', 'som'],
                            markdown: `### 🗺️ Self-Organizing Map (SOM)

Un réseau de neurones non supervisé qui projette des données de haute dimension sur une carte 2D (grille de neurones), en préservant la **topologie** (les voisins restent voisins).

**Concept :**
Chaque neurone de la grille a un vecteur de poids. Le neurone le plus proche de la donnée d'entrée (Best Matching Unit) est "tiré" vers elle, entraînant ses voisins avec lui.

---
*   📍 **Situation** : Visualisation de données complexes en 2D, réduction de dimension non-linéaire.
*   ✅ **Qualité** : Préservation de la topologie, visualisation puissante.
*   ❌ **Défaut** : Lent à entraîner, difficile à paramétrer.`,
                            code: `# Nécessite une librairie externe comme 'minisom' ou 'sklearn-som'
# pip install minisom
from minisom import MiniSom

# Grille 6x6, input_len = nb features
som = MiniSom(x=6, y=6, input_len=X_scaled.shape[1], sigma=1.0, learning_rate=0.5)
som.random_weights_init(X_scaled)
som.train_random(X_scaled, 100) # 100 itérations`
                        }
                    ]
                },
                {
                    id: 'math_reference',
                    title: '4. Rappel Mathématiques',
                    subCategory: 'Machine Learning',
                    description: 'Exemples concrets de calculs (Gini, Entropie, Distances).',
                    snippets: [
                        {
                            id: 'variable_types',
                            title: 'Types de Variables',
                            description: 'Quali vs Quanti, Discret vs Continu.',
                            level: 'beginner',
                            tags: ['ml', 'math', 'types'],
                            markdown: `### 📊 Classification des Variables

#### 1. Quantitative (Numérique)
On peut faire des calculs dessus (Moyenne, Somme).
*   **Continue** : Peut prendre une infinité de valeurs (ex: Taille, Prix, Température).
*   **Discrète** : Valeurs dénombrables, souvent des entiers (ex: Nombre d'enfants, Nombre de clics).

#### 2. Qualitative (Catégorielle)
Décrit une caractéristique. Pas de calcul mathématique direct.
*   **Nominale** : Pas d'ordre naturel (ex: Couleur, Ville, Sexe).
*   **Ordinale** : Il existe un ordre hiérarchique (ex: Satisfaction [Faible, Moyen, Fort], Niveau d'étude).`
                        },
                        {
                            id: 'gini_entropy_calc',
                            title: 'Gini vs Entropie',
                            description: 'Calcul détaillé sur un exemple simple.',
                            level: 'advanced',
                            tags: ['ml', 'math', 'entropy'],
                            markdown: `### 🧮 Exemple Concret

Imaginons un noeud de l'arbre contenant **5 billes** :
*   🔴 **3 Rouges**
*   🔵 **2 Bleues**

Probabilités :
$$ p_{rouge} = \\frac{3}{5} = 0.6, \\quad p_{bleu} = \\frac{2}{5} = 0.4 $$

#### 1. Indice de Gini
$$
\\begin{aligned}
Gini &= 1 - (p_{rouge}^2 + p_{bleu}^2) \\\\
&= 1 - (0.6^2 + 0.4^2) \\\\
&= 1 - (0.36 + 0.16) \\\\
&= 1 - 0.52 = \\mathbf{0.48}
\\end{aligned}
$$

#### 2. Entropie (Shannon)
$$
\\begin{aligned}
E &= - (p_{rouge} \\log_2(p_{rouge}) + p_{bleu} \\log_2(p_{bleu})) \\\\
&= - (0.6 \\times -0.737 + 0.4 \\times -1.322) \\\\
&= - (-0.442 - 0.529) \\\\
&= \\mathbf{0.971}
\\end{aligned}
$$

> **Note** : L'entropie est plus sensible au "désordre" que Gini, mais le calcul de log est plus coûteux.`
                        },
                        {
                            id: 'distance_calc',
                            title: 'Calcul de Distances',
                            description: 'Euclidienne vs Manhattan.',
                            level: 'intermediate',
                            tags: ['ml', 'math', 'distance'],
                            markdown: `### 📏 Exemple Concret

Soit deux points dans un plan 2D :
*   **A (1, 2)**
*   **B (4, 6)**

#### 1. Distance Euclidienne (Vol d'oiseau)
$$
\\begin{aligned}
d(A, B) &= \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2} \\\\
&= \\sqrt{(4 - 1)^2 + (6 - 2)^2} \\\\
&= \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = \\mathbf{5}
\\end{aligned}
$$

#### 2. Distance de Manhattan (Taxi)
$$
\\begin{aligned}
d(A, B) &= |x_B - x_A| + |y_B - y_A| \\\\
&= |4 - 1| + |6 - 2| \\\\
&= 3 + 4 = \\mathbf{7}
\\end{aligned}
$$`
                        },
                        {
                            id: 'normalization_standardization',
                            title: 'Normalisation vs Standardisation',
                            description: 'Mise à l\'échelle des données.',
                            level: 'intermediate',
                            tags: ['ml', 'math', 'scaling'],
                            markdown: `### 📏 Pourquoi mettre à l'échelle ?

Certains algorithmes (SVM, K-Means, KNN) sont sensibles aux ordres de grandeur.

#### 1. Normalisation (Min-Max Scaling)
Ramène les valeurs entre **0 et 1**.
$$ X_{norm} = \\frac{X - X_{min}}{X_{max} - X_{min}} $$
*   📍 **Utile quand** : On veut des bornes fixes (ex: image pixel 0-255).
*   ⚠️ **Sensible** aux outliers (valeurs extrêmes).

#### 2. Standardisation (Z-Score)
Centre les données sur **0** avec un écart-type de **1**.
$$ Z = \\frac{X - \\mu}{\\sigma} $$
*   📍 **Utile quand** : La distribution est Gaussienne (Normale).
*   ✅ **Plus robuste** aux outliers.`
                        },
                        {
                            id: 'classification_metrics',
                            title: 'Métriques de Classification',
                            description: 'Précision, Rappel & F1-Score.',
                            level: 'intermediate',
                            tags: ['ml', 'metrics', 'classification'],
                            markdown: `### 🎯 Au-delà de l'Accuracy

Dans un problème déséquilibré (ex: 99% de non-malades), l'accuracy ne suffit pas.

#### 1. Précision (Precision)
"Quand je prédis POSITIF, ai-je raison ?"
$$ Précision = \\frac{TP}{TP + FP} $$
*   📍 **Maximiser si** : Le coût d'un Faux Positif est élevé (ex: Spam - on ne veut pas jeter un bon mail).

#### 2. Rappel (Recall)
"Ai-je trouvé TOUS les POSITIFS ?"
$$ Rappel = \\frac{TP}{TP + FN} $$
*   📍 **Maximiser si** : Le coût d'un Faux Négatif est critique (ex: **Cancer** - on préfère une fausse alerte qu'un malade non détecté).

#### 3. F1-Score (Moyenne Harmonique)
Le compromis entre Précision et Rappel.
$$ F1 = 2 \\times \\frac{Précision \\times Rappel}{Précision + Rappel} $$
*   📍 **Utile quand** : On cherche un équilibre.`
                        },
                        {
                            id: 'gradient_descent',
                            title: 'Descente de Gradient',
                            description: 'Le moteur de l\'apprentissage.',
                            level: 'advanced',
                            tags: ['ml', 'math', 'optimization'],
                            markdown: `### 📉 L'Algorithme d'Optimisation

Imaginez descendre une montagne dans le brouillard pour trouver la vallée la plus basse.

**La Formule de Mise à Jour :**
On corrige les poids $w$ dans la direction opposée à la pente (le gradient $\\nabla J$).

$$ w_{nouveau} = w_{ancien} - \\eta \\cdot \\nabla J(w) $$

*   $w$ : Les poids du modèle.
*   $\\eta$ (Eta) : **Learning Rate** (Vitesse d'apprentissage - la taille du pas).
*   $\\nabla J(w)$ : Le Gradient de l'erreur (la pente).`
                        },
                        {
                            id: 'bayes_theorem',
                            title: 'Théorème de Bayes',
                            description: 'Probabilités Conditionnelles.',
                            level: 'advanced',
                            tags: ['ml', 'math', 'probability'],
                            markdown: `### 🎲 La Base du Naive Bayes

Comment mettre à jour nos croyances avec de nouvelles preuves ?

$$ P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)} $$

*   $P(A|B)$ : Probabilité de A sachant B (**Postérieure**).
*   $P(B|A)$ : Vraisemblance (Likelihood).
*   $P(A)$ : Probabilité de A (**Priori**).
*   $P(B)$ : Probabilité de la preuve (Evidence).`
                        }
                    ]
                },
                {
                    id: 'evaluation',
                    title: '5. Évaluation & Interprétabilité',
                    subCategory: 'Machine Learning',
                    description: 'Métriques et Graphiques de performance',
                    snippets: [
                        {
                            id: 'metrics',
                            title: 'Métriques de Base',
                            description: 'Classification Report et Erreurs.',
                            level: 'advanced',
                            tags: ['ml', 'metrics', 'sklearn'],
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
                            level: 'advanced',
                            tags: ['ml', 'metrics', 'viz', 'sklearn'],
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
                            level: 'advanced',
                            tags: ['ml', 'metrics', 'viz', 'sklearn'],
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
                            level: 'advanced',
                            description: `Type : Arbres (Random Forest, XGBoost...)
                            Visuel : Quelles variables pèsent le plus ?`,
                            tags: ['ml', 'metrics', 'viz', 'sklearn'],
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
                },
                {
                    id: 'regression_sm',
                    title: '6. Régression (OLS)',
                    subCategory: 'Statistiques',
                    description: 'Moindres Carrés Ordinaires.',
                    snippets: [
                        {
                            id: 'ols_formula',
                            title: 'OLS (Formule)',
                            description: 'Syntaxe style R (plus simple).',
                            level: 'intermediate',
                            tags: ['ml', 'regression', 'statsmodels'],
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
                            level: 'intermediate',
                            tags: ['ml', 'regression', 'statsmodels'],
                            code: `# Il faut ajouter une constante (intercept) manuellement !
X = sm.add_constant(X)

model = sm.OLS(y, X).fit()
print(model.summary())`
                        }
                    ]
                },
                {
                    id: 'tensorflow_unified',
                    title: '7. TensorFlow',
                    description: 'Réseaux de neurones profonds (Deep Learning).',
                    snippets: [
                        {
                            id: 'dl_intro',
                            title: 'Deep Learning vs ML Classique',
                            subCategory: '5.1 Concepts & Tenseurs',
                            description: 'Quand utiliser le Deep Learning ?',
                            level: 'advanced',
                            tags: ['dl', 'concept', 'tensorflow'],
                            markdown: `🧠 **Deep Learning (Réseaux de Neurones)**
Contrairement au Machine Learning classique (Random Forest, XGBoost) qui sature avec beaucoup de données, le Deep Learning excelle sur les **données non structurées** (Images, Texte, Son) et les très gros volumes de données.

**Le concept clé :**
Le réseau apprend ses propres "features" (caractéristiques) couche par couche, du plus simple au plus abstrait.`
                        },
                        {
                            id: 'tensors',
                            title: 'Les Tenseurs',
                            subCategory: '5.1 Concepts & Tenseurs',
                            description: 'La brique de base de TensorFlow.',
                            level: 'advanced',
                            tags: ['dl', 'tensors', 'tensorflow'],
                            markdown: `📦 **Qu'est-ce un Tenseur ?**
C'est une généralisation des matrices à N dimensions.
*   **Scalaire** (0D) : Un nombre seul (ex: \`5\`)
*   **Vecteur** (1D) : Une liste (ex: \`[1, 2, 3]\`)
*   **Matrice** (2D) : Un tableau (ex: une image noir & blanc)
*   **Tenseur 3D** : Un cube (ex: une image couleur RGB)
*   **Tenseur 4D** : Un lot d'images (Batch)

En TensorFlow, les données circulent sous forme de tenseurs entre les couches du réseau.`
                        },
                        {
                            id: 'sequential',
                            title: 'L\'Architecture (Sequential)',
                            subCategory: '5.2 Workflow Keras',
                            description: 'Empiler des couches comme des Lego.',
                            level: 'advanced',
                            tags: ['dl', 'keras', 'model', 'tensorflow'],
                            code: `import tensorflow as tf
from tensorflow.keras import layers, models

# Création d'un modèle vide
model = models.Sequential()

# Ajout de couches (Layers)
# Dense = Couche entièrement connectée (chaque neurone est relié à tous les précédents)
model.add(layers.Dense(64, activation='relu', input_shape=(10,))) # 10 features en entrée
model.add(layers.Dense(32, activation='relu'))
model.add(layers.Dense(1, activation='linear')) # Sortie (1 valeur pour une régression)`
                        },
                        {
                            id: 'activation',
                            title: 'Fonctions d\'Activation',
                            subCategory: '5.2 Workflow Keras',
                            description: 'Donner de la non-linéarité au modèle.',
                            level: 'advanced',
                            tags: ['dl', 'keras', 'activation', 'tensorflow'],
                            markdown: `⚡ **Pourquoi une fonction d'activation ?**
Sans elles, un réseau de neurones ne serait qu'une grosse régression linéaire. Elles permettent d'apprendre des motifs complexes.

*   **ReLU** (\`relu\`) : La plus utilisée dans les couches cachées. Rapide et efficace.
*   **Sigmoid** (\`sigmoid\`) : Pour la sortie d'une classification binaire (0 ou 1).
*   **Softmax** (\`softmax\`) : Pour la sortie d'une classification multi-classes (probabilités).
*   **Linear** (\`linear\`) : Pour la sortie d'une régression (valeur continue).`
                        },
                        {
                            id: 'compile',
                            title: 'Compilation',
                            subCategory: '5.2 Workflow Keras',
                            description: 'Définir comment le modèle apprend.',
                            level: 'advanced',
                            tags: ['dl', 'keras', 'compile', 'tensorflow'],
                            code: `model.compile(
    optimizer='adam',      # L'algorithme d'optimisation (Adam est le standard actuel)
    loss='mse',            # La fonction de perte (MSE pour régression, Crossentropy pour classification)
    metrics=['mae']        # Métriques à suivre (Mean Absolute Error)
)`
                        },
                        {
                            id: 'fit',
                            title: 'Entraîner le modèle (Fit)',
                            subCategory: '5.3 Entraînement',
                            description: 'Epochs et Batch Size.',
                            level: 'advanced',
                            tags: ['dl', 'keras', 'training', 'tensorflow'],
                            code: `history = model.fit(
    X_train, y_train,
    epochs=50,             # Nombre de fois que le modèle voit TOUTES les données
    batch_size=32,         # Nombre d'exemples traités avant de mettre à jour les poids
    validation_split=0.2,  # 20% des données gardées pour valider pendant l'entraînement
    verbose=1
)`
                        },
                        {
                            id: 'overfitting',
                            title: 'Éviter le Sur-apprentissage',
                            subCategory: '5.3 Entraînement',
                            description: 'Early Stopping et Dropout.',
                            level: 'advanced',
                            tags: ['dl', 'keras', 'regularization', 'tensorflow'],
                            code: `from tensorflow.keras.callbacks import EarlyStopping

# Arrêter si la validation ne s'améliore plus après 5 epochs
early_stop = EarlyStopping(monitor='val_loss', patience=5)

model.fit(
    X_train, y_train,
    epochs=100,
    callbacks=[early_stop]
)`
                        },
                        {
                            id: 'full_regression',
                            title: 'Régression (Prix Immo)',
                            subCategory: '5.4 Exemple Complet',
                            description: 'Prédire une valeur continue.',
                            level: 'advanced',
                            tags: ['dl', 'keras', 'regression', 'tensorflow'],
                            code: `import tensorflow as tf
from tensorflow.keras import layers, models

# 1. Architecture
model = models.Sequential([
    layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    layers.Dense(32, activation='relu'),
    layers.Dense(1) # Pas d'activation pour une régression (ou linear)
])

# 2. Compilation
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# 3. Entraînement
history = model.fit(X_train, y_train, epochs=50, validation_split=0.2)

# 4. Prédiction
predictions = model.predict(X_test)`
                        }
                    ]
                },
                {
                    id: 'pytorch',
                    title: '8. PyTorch',
                    description: 'Deep Learning flexible et dynamique.',
                    snippets: [
                        {
                            id: 'torch_tensors',
                            title: 'Tenseurs & GPU',
                            subCategory: 'Bases',
                            description: 'Création et déplacement sur GPU.',
                            level: 'advanced',
                            tags: ['dl', 'pytorch', 'tensors', 'gpu'],
                            code: `import torch

# 1. Création
x = torch.tensor([[1, 2], [3, 4]])
y = torch.rand(2, 2) # Aléatoire

# 2. Opérations (Comme Numpy)
z = x + y
print(z)

# 3. GPU (CUDA)
if torch.cuda.is_available():
    device = torch.device("cuda")
    x_gpu = x.to(device) # Déplacer vers le GPU
    print("Sur GPU !")`
                        },
                        {
                            id: 'torch_autograd',
                            title: 'Autograd (Gradients)',
                            subCategory: 'Bases',
                            description: 'Différentiation automatique.',
                            level: 'advanced',
                            tags: ['dl', 'pytorch', 'autograd'],
                            code: `# requires_grad=True : PyTorch va suivre toutes les opérations sur ce tenseur
w = torch.tensor([1.0], requires_grad=True)
b = torch.tensor([2.0], requires_grad=True)
x = torch.tensor([3.0])

# Forward pass
y = w * x + b

# Backward pass (Calcul des gradients)
y.backward()

# Gradients (dy/dw = x = 3)
print(w.grad) # tensor([3.])`
                        },
                        {
                            id: 'torch_model',
                            title: 'Modèle (nn.Module)',
                            subCategory: 'Workflow',
                            description: 'Définir une architecture.',
                            level: 'advanced',
                            tags: ['dl', 'pytorch', 'model', 'class'],
                            code: `import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        # Définition des couches
        self.fc1 = nn.Linear(10, 5) # 10 entrées -> 5 cachés
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(5, 1)  # 5 cachés -> 1 sortie

    def forward(self, x):
        # Définition du passage des données
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

model = SimpleNet()`
                        },
                        {
                            id: 'torch_training',
                            title: 'Boucle d\'Entraînement',
                            subCategory: 'Workflow',
                            description: 'Le coeur de PyTorch.',
                            level: 'advanced',
                            tags: ['dl', 'pytorch', 'training', 'loop'],
                            code: `import torch.optim as optim

# 1. Setup
criterion = nn.MSELoss() # Fonction de perte
optimizer = optim.Adam(model.parameters(), lr=0.01)

# 2. Boucle
for epoch in range(100):
    # A. Remise à zéro des gradients
    optimizer.zero_grad()
    
    # B. Forward (Prédiction)
    outputs = model(X_train_tensor)
    
    # C. Loss (Erreur)
    loss = criterion(outputs, y_train_tensor)
    
    # D. Backward (Calcul des gradients)
    loss.backward()
    
    # E. Update (Mise à jour des poids)
    optimizer.step()
    
    if epoch % 10 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item()}")`
                        }
                    ]
                }
            ]
        },
        {
            id: 'python_basics',
            title: 'Langage & Outils',
            description: 'Les fondamentaux, astuces et calcul numérique.',
            categories: [
                {
                    id: 'std_libs',
                    title: '1. Modules Standards',
                    subCategory: 'Bases',
                    description: 'Math, Random, Datetime, OS...',
                    snippets: [
                        {
                            id: 'math_lib',
                            title: 'Mathématiques (math)',
                            description: 'Fonctions mathématiques de base.',
                            level: 'beginner',
                            tags: ['basics', 'math', 'stdlib'],
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
                            level: 'beginner',
                            tags: ['basics', 'random', 'stdlib'],
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
                            level: 'beginner',
                            tags: ['basics', 'datetime', 'stdlib'],
                            code: `from datetime import datetime, date, timedelta

# 1. Création
now = datetime.now()
today = date.today()
print(f"Maintenant : {now}")
print(f"Aujourd'hui : {today}")

dt = datetime(2023, 12, 25, 10, 30) # Noël

# 2. Accès aux composants
print(f"Année : {now.year}, Mois : {now.month}, Jour : {now.day}")

# 3. Formatage (Date -> String)
print(now.strftime("%d/%m/%Y %H:%M")) # "25/12/2023 10:30"

# 4. Parsing (String -> Date)
date_obj = datetime.strptime("2023-01-01", "%Y-%m-%d")

# 5. Arithmétique (timedelta)
demain = now + timedelta(days=1)
diff = datetime(2024, 1, 1) - datetime(2023, 1, 1)
print(f"Jours de différence : {diff.days}")`
                        },
                        {
                            id: 'dateutil_lib',
                            title: 'Calculs Avancés (dateutil)',
                            description: 'Gérer les mois et années (relativedelta).',
                            level: 'intermediate',
                            tags: ['basics', 'datetime', 'dateutil'],
                            markdown: `### 🚀 Pourquoi dateutil ?
\`timedelta\` ne gère pas les **mois** ni les **années** car leur durée varie (28-31 jours, 365-366 jours).
Pour cela, on utilise \`dateutil.relativedelta\`.

\`\`\`bash
pip install python-dateutil
\`\`\``,
                            code: `from datetime import datetime
from dateutil.relativedelta import relativedelta

now = datetime.now()

# 1. Ajouter des mois ou des années
next_month = now + relativedelta(months = 1)
print(f"Mois prochain : {next_month}")

# 2. Aller au dernier jour du mois
end_of_month = now + relativedelta(day = 31)
print(f"Fin du mois : {end_of_month}")

# 3. Calculer l'âge précis
birth_date = datetime(1990, 5, 15)
age = relativedelta(now, birth_date)
print(f"Âge : {age.years} ans, {age.months} mois et {age.days} jours")`
                        },
                        {
                            id: 'os_sys_lib',
                            title: 'Système (os, sys)',
                            description: 'Interagir avec l\'OS et le système de fichiers.',
                            level: 'beginner',
                            tags: ['basics', 'os', 'sys', 'stdlib'],
                            code: `import os
import sys

# --- OS(Operating System)-- -
# Chemin actuel
print(os.getcwd())

# Lister les fichiers
# print(os.listdir('.'))

# Construire des chemins(Compatible Windows/ Mac / Linux)
        path = os.path.join("dossier", "sous_dossier", "fichier.txt")

# Vérifier si un fichier existe
if os.path.exists("data.csv"):
    print("Fichier trouvé !")

# --- SYS(System)-- -
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
                            level: 'intermediate',
                            tags: ['basics', 'collections', 'stdlib'],
                            code: `from collections import Counter, defaultdict

# --- Counter-- -
# Compte les occurrences automatiquement
liste =['a', 'b', 'a', 'c', 'b', 'a']
compteur = Counter(liste)
print(compteur) # Counter({ 'a': 3, 'b': 2, 'c': 1 })
print(compteur.most_common(1)) # [('a', 3)]

# --- DefaultDict-- -
# Dictionnaire avec valeur par défaut(évite les KeyError)
d = defaultdict(int) # Valeur par défaut: 0
d['a'] += 1
print(d['a']) # 1
print(d['z']) # 0(créé automatiquement)`
                        }
                    ]
                },
                {
                    id: 'control_flow',
                    title: '2. Contrôle de Flux',
                    subCategory: 'Bases',
                    description: 'Boucles et Conditions',
                    snippets: [
                        {
                            id: 'loops',
                            title: 'Boucles For & While',
                            description: 'Itérer sur des séquences ou tant qu\'une condition est vraie.',
                            level: 'beginner',
                            tags: ['basics', 'control-flow', 'loops'],
                            code: `import math
import random
import datetime
import os
import sys

# Boucle FOR(Itération définie)
fruits =["pomme", "banane", "cerise"]
for fruit in fruits:
    print(f"J'aime la {fruit}")

# Avec range()
for i in range(5): # 0 à 4
    print(i)

# Boucle WHILE(Itération indéfinie)
compteur = 0
while compteur < 5:
    print(compteur)
    compteur += 1`
                        },
                        {
                            id: 'conditions',
                            title: 'Conditions (If/Elif/Else)',
                            description: 'Exécuter du code selon des critères.',
                            level: 'beginner',
                            tags: ['basics', 'control-flow', 'conditions'],
                            code: `age = 20

if age < 18:
    print("Mineur")
elif age == 18:
    print("Tout juste majeur")
else:
print("Majeur")

# Opérateur ternaire(One - liner)
statut = "Majeur" if age >= 18 else "Mineur"`
                        },
                        {
                            id: 'break_continue',
                            title: 'Break & Continue',
                            description: 'Contrôler l\'exécution dans les boucles.',
                            level: 'intermediate',
                            tags: ['basics', 'control-flow', 'loops'],
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
                    title: '3. Fonctions',
                    subCategory: 'Bases',
                    description: 'Définir et utiliser des blocs de code réutilisables',
                    snippets: [
                        {
                            id: 'def_function',
                            title: 'Définition (def)',
                            description: 'Créer une fonction simple avec paramètres.',
                            level: 'beginner',
                            tags: ['basics', 'functions', 'syntax'],
                            code: `def saluer(nom, message = "Bonjour"):
"""
    Affiche un message de salutation.
    message est un paramètre optionnel(valeur par défaut).
    """
return f"{message}, {nom} !"

print(saluer("Alice"))
print(saluer("Bob", "Salut"))`
                        },
                        {
                            id: 'args_kwargs',
                            title: 'Args & Kwargs',
                            description: 'Fonctions avec un nombre variable d\'arguments.',
                            level: 'intermediate',
                            tags: ['basics', 'functions', 'arguments'],
                            code: `def somme_tout(* args):
    # args est un tuple
return sum(args)

print(somme_tout(1, 2, 3, 4)) # 10

def afficher_infos(** kwargs):
    # kwargs est un dictionnaire
for cle, valeur in kwargs.items():
    print(f"{cle}: {valeur}")

afficher_infos(nom = "Alice", age = 30, ville = "Paris")`
                        },
                        {
                            id: 'lambda',
                            title: 'Fonctions Lambda',
                            description: 'Fonctions anonymes en une ligne.',
                            level: 'intermediate',
                            tags: ['basics', 'functions', 'lambda'],
                            code: `# Syntaxe: lambda arguments: expression
carre = lambda x: x ** 2

print(carre(5)) # 25

# Souvent utilisé avec map() ou filter()
nombres = [1, 2, 3, 4]
pairs = list(filter(lambda x: x % 2 == 0, nombres)) #[2, 4]`
                        }
                    ]
                },
                {
                    id: 'data_structures',
                    title: '4. Structures de Données',
                    subCategory: 'Bases',
                    description: 'Listes, Dictionnaires, Sets, Tuples',
                    snippets: [
                        {
                            id: 'lists',
                            title: 'Listes (List)',
                            description: 'Collection ordonnée et modifiable.',
                            level: 'beginner',
                            tags: ['basics', 'data-structures', 'list'],
                            code: `ma_liste = [1, 2, 3]

# Ajout
ma_liste.append(4) #[1, 2, 3, 4]

# Slicing(Découpage)
print(ma_liste[1: 3]) #[2, 3](Indice de début inclus, fin exclu)

# List Comprehension(Puissant!)
carres = [x ** 2 for x in range(5)] #[0, 1, 4, 9, 16]`
                        },
                        {
                            id: 'dicts',
                            title: 'Dictionnaires (Dict)',
                            description: 'Paires Clé-Valeur.',
                            level: 'beginner',
                            tags: ['basics', 'data-structures', 'dict'],
                            code: `mon_dict = { "nom": "Alice", "age": 25 }

# Accès sécurisé(évite l'erreur si la clé n'existe pas)
print(mon_dict.get("ville", "Inconnu"))

# Parcourir
for cle, valeur in mon_dict.items():
    print(f"{cle} -> {valeur}")`
                        },
                        {
                            id: 'sets',
                            title: 'Ensembles (Set)',
                            description: 'Collection non-ordonnée d\'éléments UNIQUES.',
                            level: 'intermediate',
                            tags: ['basics', 'data-structures', 'set'],
                            code: `nombres = [1, 2, 2, 3, 3, 3]
uniques = set(nombres) # { 1, 2, 3 }

# Opérations ensemblistes
a = { 1, 2, 3}
b = { 3, 4, 5}

print(a.intersection(b)) # { 3 }
print(a.union(b)) # { 1, 2, 3, 4, 5 } `
                        }
                    ]
                },
                {
                    id: 'error_handling',
                    title: '5. Gestion d\'Erreurs',
                    subCategory: 'Bases',
                    description: 'Try, Except, Finally',
                    snippets: [
                        {
                            id: 'try_except',
                            title: 'Bloc Try / Except',
                            description: 'Gérer les exceptions pour éviter que le programme plante.',
                            level: 'beginner',
                            tags: ['basics', 'error-handling', 'exceptions'],
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
                },
                {
                    id: 'string_formatting',
                    title: '6. Formatage de Chaînes (f-strings)',
                    subCategory: 'Astuces',
                    description: 'La méthode moderne pour formater du texte.',
                    snippets: [
                        {
                            id: 'f_strings_basic',
                            title: 'Bases des f-strings',
                            description: 'Insérer des variables directement dans les chaînes.',
                            level: 'beginner',
                            tags: ['basics', 'string', 'formatting'],
                            code: `from pprint import pprint

nom = "Alice"
age = 30

# Avant(vieux)
print("Bonjour " + nom + ", tu as " + str(age) + " ans.")

# Avec f - string(moderne)
print(f"Bonjour {nom}, tu as {age} ans.")`
                        },
                        {
                            id: 'f_strings_advanced',
                            title: 'Formatage Avancé',
                            description: 'Arrondis, dates, alignement.',
                            level: 'intermediate',
                            tags: ['basics', 'string', 'formatting'],
                            code: `prix = 19.9999
pourcentage = 0.1234

# Arrondir à 2 décimales
print(f"Prix : {prix:.2f}€") # 20.00€

# Afficher en pourcentage
print(f"Taux : {pourcentage:.1%}") # 12.3 %

# Debug facile(affiche nom_variable = valeur)
x = 10
print(f"{x=}") # x = 10`
                        }
                    ]
                },
                {
                    id: 'documentation',
                    title: '7. Documentation',
                    subCategory: 'Astuces',
                    description: 'Docstrings et Commentaires',
                    snippets: [
                        {
                            id: 'docstrings',
                            title: 'Docstrings ("""...""")',
                            description: 'Documenter vos fonctions pour les autres (et vous-même).',
                            level: 'beginner',
                            tags: ['basics', 'documentation', 'comments'],
                            code: `def calcul_complexe(x, y):
"""
    Effectue un calcul complexe entre x et y.

    Args:
x(int): Le premier nombre.
    y(int): Le deuxième nombre.

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
                    title: '8. Astuces "Pythoniques"',
                    subCategory: 'Astuces',
                    description: 'Écrire du code plus élégant et concis.',
                    snippets: [
                        {
                            id: 'unpacking',
                            title: 'Unpacking (Déballage)',
                            description: 'Assigner plusieurs variables en une ligne.',
                            level: 'beginner',
                            tags: ['basics', 'pythonic', 'syntax'],
                            code: `coords = (10, 20)
x, y = coords # x = 10, y = 20

# Échanger deux variables sans variable temporaire
a = 5
b = 10
a, b = b, a # a = 10, b = 5`
                        },
                        {
                            id: 'enumerate',
                            title: 'Enumerate',
                            description: 'Avoir l\'index ET la valeur dans une boucle.',
                            level: 'beginner',
                            tags: ['basics', 'pythonic', 'loops'],
                            code: `fruits = ["pomme", "banane", "cerise"]

# Pas terrible:
# for i in range(len(fruits)):
#     print(i, fruits[i])

# Pythonique:
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")`
                        },
                        {
                            id: 'zip',
                            title: 'Zip',
                            description: 'Boucler sur deux listes en parallèle.',
                            level: 'beginner',
                            tags: ['basics', 'pythonic', 'loops'],
                            code: `noms = ["Alice", "Bob"]
ages = [25, 30]

for nom, age in zip(noms, ages):
    print(f"{nom} a {age} ans")`
                        }
                    ]
                },
                {
                    id: 'jupyter_magic',
                    title: '9. Jupyter & Notebooks',
                    subCategory: 'Astuces',
                    description: 'Magics commands pour gagner du temps.',
                    snippets: [
                        {
                            id: 'timeit',
                            title: 'Mesurer le temps (%timeit)',
                            description: 'Chronometrer une ligne de code.',
                            level: 'intermediate',
                            tags: ['tools', 'jupyter', 'performance'],
                            code: `# Mesure le temps d'exécution moyen (lance la commande plusieurs fois)
    % timeit[x ** 2 for x in range(1000)]

# Pour une cellule entière:
# %% timeit`
                        },
                        {
                            id: 'autoreload',
                            title: 'Rechargement Auto (%autoreload)',
                            description: 'Plus besoin de redémarrer le kernel quand on modifie un module externe.',
                            level: 'intermediate',
                            tags: ['tools', 'jupyter', 'productivity'],
                            code: `# À mettre au début du notebook
    % load_ext autoreload
        % autoreload 2

import mon_module_perso
# Si vous modifiez mon_module_perso.py, les changements sont pris en compte immédiatement!`
                        }
                    ]
                },
                {
                    id: 'arrays',
                    title: '10. Tableaux (Arrays)',
                    subCategory: 'Calcul Numérique',
                    description: 'Création et manipulation.',
                    snippets: [
                        {
                            id: 'create_array',
                            title: 'Création',
                            description: 'Différentes façons de créer des arrays.',
                            level: 'beginner',
                            tags: ['numpy', 'array', 'creation'],
                            code: `import numpy as np

# À partir d'une liste
arr = np.array([1, 2, 3])

# Zéros et Uns
zeros = np.zeros((3, 3)) # Matrice 3x3 de 0
ones = np.ones((2, 4))   # Matrice 2x4 de 1

# Séquences
range_arr = np.arange(0, 10, 2) #[0, 2, 4, 6, 8]
linspace_arr = np.linspace(0, 1, 5) # 5 points entre 0 et 1`
                        },
                        {
                            id: 'reshape',
                            title: 'Dimensions & Reshape',
                            description: 'Changer la forme des données.',
                            level: 'beginner',
                            tags: ['numpy', 'array', 'manipulation'],
                            code: `arr = np.arange(12) #[0..11]

# Changer en matrice 3x4
mat = arr.reshape(3, 4)

# Aplatir(Flatten)
flat = mat.flatten()`
                        }
                    ]
                },
                {
                    id: 'math_ops',
                    title: '11. Opérations Mathématiques',
                    subCategory: 'Calcul Numérique',
                    description: 'Calculs vectorisés.',
                    snippets: [
                        {
                            id: 'basic_math',
                            title: 'Calculs de base',
                            description: 'Opérations élément par élément.',
                            level: 'beginner',
                            tags: ['numpy', 'math', 'operations'],
                            code: `a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

print(a + b) #[11, 22, 33]
print(a * 2) #[2, 4, 6]
print(a ** 2) #[1, 4, 9]`
                        },
                        {
                            id: 'stats_np',
                            title: 'Statistiques',
                            description: 'Moyenne, écart-type, etc.',
                            level: 'beginner',
                            tags: ['numpy', 'statistics', 'math'],
                            code: `arr = np.array([1, 2, 3, 4, 5])

print(np.mean(arr))  # Moyenne
print(np.std(arr))   # Écart - type
print(np.median(arr)) # Médiane
print(np.max(arr))    # Maximum`
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
                            level: 'intermediate',
                            tags: ['polars', 'concept', 'performance'],
                            markdown: `🚀 **Pourquoi Polars est plus rapide ?**

1. **Écrit en Rust** : Gestion mémoire ultra-efficace et pas de GIL (Global Interpreter Lock).
2. **Parallélisation** : Utilise tous les cœurs de votre CPU par défaut (Pandas est mono-cœur).
3. **Apache Arrow** : Format mémoire colonnaire standard (zéro copie).
4. **Lazy Evaluation** : Optimise la requête AVANT de l'exécuter (comme SQL).

💡 **Mental Model: Polars vs Pandas**
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
                            level: 'intermediate',
                            tags: ['polars', 'io', 'lazy'],
                            code: `import polars as pl

# 1. Mode Eager(Classique, comme Pandas)
# Charge TOUT en mémoire immédiatement.
    df = pl.read_csv("data.csv") 

# 2. Mode Lazy(Recommandé pour gros fichiers)
# Ne charge RIEN.Crée un plan d'exécution.
# Permet de traiter des fichiers plus gros que la RAM.
    q = pl.scan_csv("data.csv")

# Pour voir le plan: q.explain()
# Pour exécuter: q.collect()`
                        },
                        {
                            id: 'pl_parquet',
                            title: 'Parquet (Format Roi)',
                            description: 'Le format natif idéal pour Polars.',
                            level: 'intermediate',
                            tags: ['polars', 'io', 'parquet'],
                            code: `# Lecture
df = pl.read_parquet("data.parquet")
q = pl.scan_parquet("data.parquet")

# Écriture
# Polars est extrêmement rapide pour écrire du Parquet
df.write_parquet("output.parquet", compression = "snappy")`
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
                            level: 'intermediate',
                            tags: ['polars', 'eda', 'exploration'],
                            code: `# Aperçu des premières / dernières lignes
print(df.head())
print(df.tail())

# Glimpse(Inspiré de R) : Affiche type + premières valeurs de chaque colonne
print(df.glimpse())

# Schéma(Types de données)
print(df.schema)`
                        },
                        {
                            id: 'pl_describe',
                            title: 'Describe',
                            description: 'Statistiques descriptives.',
                            level: 'intermediate',
                            tags: ['polars', 'eda', 'statistics'],
                            code: `# Statistiques sommaires
print(df.describe())

# Compter les valeurs uniques(Value Counts)
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
                            level: 'intermediate',
                            tags: ['polars', 'subsetting', 'columns'],
                            code: `# Sélection simple
df.select(["nom", "age"])

# Sélection avec Expressions(Puissant!)
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
                            level: 'intermediate',
                            tags: ['polars', 'subsetting', 'filter'],
                            code: `# Filtrage simple
df.filter(pl.col("age") > 18)

# Conditions multiples(& = ET, | = OU)
df.filter(
    (pl.col("age") > 18) &
    (pl.col("ville") == "Paris")
)

# Filtrer sur une liste(is_in)
villes_cibles = ["Paris", "Lyon"]
df.filter(pl.col("ville").is_in(villes_cibles))`
                        },
                        {
                            id: 'pl_with_columns',
                            title: 'With Columns (Ajout)',
                            description: 'Ajouter ou modifier des colonnes.',
                            level: 'intermediate',
                            tags: ['polars', 'transformation', 'columns'],
                            code: `# Pandas: df['new'] = ...
# Polars: .with_columns()

df = df.with_columns([
    (pl.col("prix") * 0.2).alias("tva"),
    (pl.col("prix") * 1.2).alias("prix_ttc"),
    pl.lit("En stock").alias("statut") # Valeur littérale(constante)
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
                            level: 'intermediate',
                            tags: ['polars', 'transformation', 'groupby'],
                            code: `# Syntaxe: group_by -> agg
df.group_by("ville").agg([
    pl.col("salaire").mean().alias("salaire_moyen"),
    pl.col("salaire").max().alias("salaire_max"),
    pl.len().alias("nb_habitants") # pl.len() = count
])

# Note: group_by(avec underscore) est la nouvelle syntaxe(vs groupby)`
                        },
                        {
                            id: 'pl_window',
                            title: 'Window Functions (Over)',
                            description: 'Calculs par groupe sans réduire le nombre de lignes.',
                            level: 'intermediate',
                            tags: ['polars', 'transformation', 'window'],
                            code: `# Ajouter la moyenne de la ville à chaque habitant
# Pandas: transform()
# Polars: .over()

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
                            level: 'intermediate',
                            tags: ['polars', 'combine', 'join'],
                            code: `# Join
# how: 'inner', 'left', 'outer', 'cross', 'semi', 'anti'
df_merged = df_clients.join(df_commandes, on = "client_id", how = "left")

# Anti Join(Lignes de A qui ne sont PAS dans B)
# Très pratique pour trouver les "non-matchs"
df_non_trouve = df_clients.join(df_commandes, on = "client_id", how = "anti")`
                        },
                        {
                            id: 'pl_concat',
                            title: 'Concat',
                            description: 'Empiler des données.',
                            level: 'intermediate',
                            tags: ['polars', 'combine', 'concat'],
                            code: `# Vertical(Lignes)
pl.concat([df1, df2], how = "vertical")

# Horizontal(Colonnes)
pl.concat([df1, df2], how = "horizontal")`
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
                            level: 'advanced',
                            tags: ['polars', 'advanced', 'lazy'],
                            code: `q = (
    pl.scan_csv("data.csv")
        .filter(pl.col("date") > "2023-01-01")
        .group_by("categorie")
        .agg(pl.col("montant").sum())
        .sort("montant", descending = True)
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
                            level: 'advanced',
                            tags: ['polars', 'advanced', 'streaming'],
                            code: `# Si le dataset est trop gros pour la RAM,
# Polars peut le traiter par morceaux(chunks).

    q = pl.scan_csv("big_data.csv")

# streaming = True active le moteur de streaming
df_result = q.collect(streaming = True)`
                        },
                        {
                            id: 'pl_sql',
                            title: 'SQL Context',
                            description: 'Utiliser du SQL sur des DataFrames Polars.',
                            level: 'advanced',
                            tags: ['polars', 'advanced', 'sql'],
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
                            level: 'intermediate',
                            tags: ['skrub', 'install', 'concept'],
                            markdown: `### 🧼 Skrub (ex - DirtyCat)

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
                            level: 'intermediate',
                            tags: ['skrub', 'eda', 'report'],
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
                            level: 'intermediate',
                            tags: ['skrub', 'preprocessing', 'sklearn'],
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
                            level: 'advanced',
                            tags: ['skrub', 'encoding', 'text'],
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
                            level: 'advanced',
                            tags: ['skrub', 'encoding', 'topics'],
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
                            level: 'advanced',
                            tags: ['skrub', 'join', 'fuzzy'],
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
                            level: 'advanced',
                            tags: ['skrub', 'aggregation', 'relational'],
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
                            level: 'intermediate',
                            tags: ['skrub', 'cheatsheet', 'summary'],
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
            id: 'engineering',
            title: 'Engineering & Web',
            description: 'Production, APIs et Qualité de Code.',
            categories: [
                {
                    id: 'environment',
                    title: '1. Environnement Virtuel',
                    description: 'Isoler ses projets (Indispensable !)',
                    snippets: [
                        {
                            id: 'venv',
                            title: 'Venv (Standard)',
                            description: 'Créer et activer un environnement virtuel.',
                            level: 'intermediate',
                            tags: ['engineering', 'env', 'venv'],
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
                    title: '2. Tests Unitaires (Pytest)',
                    description: 'Vérifier que le code fait ce qu\'il doit faire.',
                    snippets: [
                        {
                            id: 'pytest_basic',
                            title: 'Premier Test avec Pytest',
                            description: 'Simple, lisible et puissant.',
                            level: 'intermediate',
                            tags: ['engineering', 'testing', 'pytest'],
                            code: `# fichier: test_calcul.py

def addition(a, b):
    return a + b

def test_addition():
    assert addition(2, 3) == 5
    assert addition(-1, 1) == 0

# Lancer les tests dans le terminal :
# pytest`
                        },
                        {
                            id: 'pytest_fixtures',
                            title: 'Fixtures (Setup/Teardown)',
                            description: 'Préparer des données avant chaque test.',
                            level: 'intermediate',
                            tags: ['engineering', 'testing', 'pytest'],
                            code: `import pytest

@pytest.fixture
def sample_data():
    # Setup : Ce code s'exécute avant le test
    data = {"id": 1, "name": "Test"}
    return data

def test_data_name(sample_data):
    # Le test reçoit le résultat de la fixture
    assert sample_data["name"] == "Test"`
                        },
                        {
                            id: 'pytest_parametrize',
                            title: 'Parametrize (Le Super-Pouvoir)',
                            description: 'Tester 10 cas sans copier-coller 10 fois le code.',
                            level: 'intermediate',
                            tags: ['engineering', 'testing', 'pytest'],
                            markdown: `### 💡 Pourquoi Parametrize ?
Sans parametrize, pour tester une fonction qui classe les âges, vous feriez :
\`\`\`python
def test_enfant(): assert classer_age(10) == "Enfant"
def test_adulte(): assert classer_age(30) == "Adulte"
def test_senior(): assert classer_age(70) == "Senior"
\`\`\`
C'est répétitif et difficile à maintenir. Avec \`@pytest.mark.parametrize\`, vous définissez une **liste de cas** et Pytest génère les tests pour vous.`,
                            code: `import pytest

def classer_age(age):
    if age < 18: return "Enfant"
    elif age < 65: return "Adulte"
    else: return "Senior"

# On définit nos cas de test : (Entrée, Sortie Attendue)
@pytest.mark.parametrize("age_input, expected_label", [
    (10, "Enfant"),  # Cas 1
    (30, "Adulte"),  # Cas 2
    (70, "Senior"),  # Cas 3
    (17, "Enfant"),  # Cas Limite
    (18, "Adulte"),  # Cas Limite
])
def test_classer_age(age_input, expected_label):
    # Ce test sera lancé 5 fois avec des valeurs différentes
    assert classer_age(age_input) == expected_label`
                        }
                    ]
                },
                {
                    id: 'logging',
                    title: '3. Logging (vs Print)',
                    description: 'Pourquoi Print est dangereux en production.',
                    snippets: [
                        {
                            id: 'logging_vs_print',
                            title: 'Avant/Après : Print vs Log',
                            description: 'Comparaison directe.',
                            level: 'intermediate',
                            tags: ['engineering', 'logging', 'best-practices'],
                            markdown: `### ❌ AVANT (Print)
\`\`\`python
print("Début du traitement") 
# Problème : On ne sait pas QUAND ça s'est passé, ni si c'est grave.
# Si le script tourne la nuit, ce message est perdu dans la console.
\`\`\`

### ✅ APRÈS (Logging)
\`\`\`python
logging.info("Début du traitement")
# Résultat dans le fichier : "2023-10-27 14:00:01 - INFO - Début du traitement"
# Avantages :
# 1. Horodatage automatique (Timestamp)
# 2. Niveau de gravité (INFO, ERROR...)
# 3. Persistance (écrit dans un fichier)
\`\`\``
                        },
                        {
                            id: 'logging_practice',
                            title: 'Mise en place Complète',
                            description: 'Le code prêt à l\'emploi.',
                            level: 'intermediate',
                            tags: ['engineering', 'logging', 'implementation'],
                            code: `import logging

# 1. Configuration (À faire une seule fois au début)
logging.basicConfig(
    filename='mon_app.log',       # Fichier de sortie
    level=logging.INFO,           # Niveau minimum (DEBUG < INFO < WARNING < ERROR)
    format='%(asctime)s - %(levelname)s - %(message)s' # Format : Date - Niveau - Message
)

def division(a, b):
    logging.info(f"Tentative de division : {a} / {b}")
    try:
        result = a / b
        logging.info(f"Succès : {result}")
        return result
    except ZeroDivisionError:
        logging.error("Erreur : Division par zéro détectée !")
        return None

# Test
division(10, 2) # Écrira INFO dans le fichier
division(5, 0)  # Écrira ERROR dans le fichier`
                        }
                    ]
                },
                {
                    id: 'optimization',
                    title: '4. Optimisation & Performance',
                    description: 'Écrire du code rapide.',
                    snippets: [
                        {
                            id: 'vectorization',
                            title: 'Vectorisation vs Boucles',
                            description: 'Pourquoi il ne faut JAMAIS boucler sur un DataFrame.',
                            level: 'intermediate',
                            tags: ['engineering', 'performance', 'optimization'],
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
                },

                {
                    id: 'api_web',
                    title: '5. APIs & Web',
                    description: 'Interagir avec le web (Requests, FastAPI).',
                    snippets: [
                        {
                            id: 'requests_basic',
                            title: 'Requêtes HTTP (Requests)',
                            description: 'GET et POST simples.',
                            level: 'intermediate',
                            tags: ['web', 'requests', 'http'],
                            markdown: `### 🚀 Introduction
\`requests\` est la librairie standard *de facto* pour faire des appels HTTP en Python. Elle est conçue pour être simple et lisible ("for Humans").

**Quand l'utiliser ?**
*   Scripts d'automatisation / Scraping simple.
*   Consommer des APIs REST.
*   Télécharger des fichiers.

**✅ Avantages**
*   API très intuitive.
*   Gestion automatique de l'encodage.

**❌ Inconvénients**
*   Synchrone (bloquant) : Pas idéal pour des milliers de requêtes simultanées (voir \`aiohttp\` ou \`httpx\`).

\`\`\`mermaid
sequenceDiagram
    participant Client (Python)
    participant Serveur (API)
    Client->>Serveur: GET /users/octocat
    Serveur-->>Client: 200 OK (JSON)
\`\`\``,
                            code: `import requests

# --- GET (Récupérer) ---
response = requests.get('https://api.github.com/users/octocat')

if response.status_code == 200:
    data = response.json() # Convertir JSON -> Dict Python
    print(f"User: {data['login']}")
else:
    print("Erreur !")

# --- POST (Envoyer) ---
payload = {'key': 'value'}
r = requests.post('https://httpbin.org/post', json=payload)
print(r.json())`
                        },
                        {
                            id: 'requests_session',
                            title: 'Requests Session (Le Navigateur)',
                            description: 'Garder la connexion et les cookies.',
                            level: 'intermediate',
                            tags: ['web', 'requests', 'http'],
                            markdown: `### 🧠 Pourquoi une Session ?
Par défaut, \`requests.get()\` ouvre une nouvelle connexion TCP à chaque appel. C'est lent (handshake TLS, etc.).
Une \`Session\` garde la connexion ouverte (Connection Pooling).

**✅ Best Practices**
1.  **Toujours** utiliser une session si vous faites plusieurs appels au même domaine.
2.  Définir des **Timeouts** pour ne pas bloquer votre script indéfiniment.
    \`\`\`python
    s.get(url, timeout=5) # 5 secondes max
    \`\`\`

\`\`\`mermaid
graph LR
    A[Script] -->|Requete 1| S{Session}
    A -->|Requete 2| S
    S -->|Connexion Persistante| B[Serveur]
\`\`\``,
                            code: `import requests

# Création de la session (Ouverture du navigateur)
with requests.Session() as s:
    # 1. Configuration Commune (ex: Token d'authentification)
    # Ces headers seront envoyés pour TOUTES les requêtes de la session
    s.headers.update({'Authorization': 'Bearer MON_SUPER_TOKEN'})
    
    # 2. Premier appel (ex: Login ou Récupération profil)
    # La connexion TCP est ouverte et gardée au chaud (Keep-Alive)
    r1 = s.get('https://api.example.com/me')
    
    # 3. Deuxième appel
    # Plus rapide car on réutilise la même connexion !`
                        },
                        {
                            id: 'fastapi_basic',
                            title: 'API avec FastAPI (GET)',
                            description: 'Créer une API moderne et rapide.',
                            level: 'intermediate',
                            tags: ['web', 'fastapi', 'api'],
                            markdown: `### ⚡ Pourquoi FastAPI ?
FastAPI est devenu le standard moderne pour les APIs Python, remplaçant souvent Flask.

**✅ Points Forts**
1.  **Performance** : Basé sur Starlette et Pydantic, il est très rapide (proche de NodeJS/Go).
2.  **Asynchrone** : Support natif de \`async\` / \`await\`.
3.  **Documentation Auto** : Génère automatiquement Swagger UI (\`/docs\`) et ReDoc.

**🆚 Comparaison**
*   **Flask** : Micro-framework, simple mais plus lent et moins "batteries included" pour les APIs modernes.
*   **Django** : Grosse usine à gaz, parfait pour des sites complets (Monolithe), moins pour des micro-services.

\`\`\`mermaid
graph LR
    Client -->|Requete HTTP| FastAPI
    FastAPI -->|Validation| Pydantic
    Pydantic -->|Données propres| Route(Fonction)
    Route -->|JSON| Client
\`\`\``,
                            code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

# Lancer le serveur :
# uvicorn main:app --reload`
                        },
                        {
                            id: 'fastapi_post',
                            title: 'API avec FastAPI (POST)',
                            description: 'Recevoir des données validées (Pydantic).',
                            level: 'intermediate',
                            tags: ['web', 'fastapi', 'api', 'pydantic'],
                            markdown: `### 🛡️ Validation avec Pydantic
Le gros avantage de FastAPI est l'intégration de Pydantic.
Vous définissez la **forme** de vos données (le Schéma), et FastAPI s'occupe de :
1.  Lire le JSON du corps de la requête.
2.  Convertir les types (ex: "30" -> 30).
3.  Valider les données (ex: email valide).
4.  Renvoyer une erreur 422 propre si c'est invalide.

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant FastAPI
    participant Pydantic
    
    Client->>FastAPI: POST /items (JSON)
    FastAPI->>Pydantic: Valider le JSON
    alt Invalide
        Pydantic-->>Client: 422 Unprocessable Entity
    else Valide
        Pydantic->>FastAPI: Objet Python typé
        FastAPI->>Client: 200 OK
    end
\`\`\``,
                            code: `from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None

@app.post("/items/")
def create_item(item: Item):
    # item est déjà validé et converti en objet Python !
    return {"item_name": item.name, "item_price": item.price}`
                        }
                    ]
                },
                {
                    id: 'data_quality',
                    title: '6. Qualité des Données (Pydantic)',
                    description: 'Validation de données robuste.',
                    snippets: [
                        {
                            id: 'why_pydantic',
                            title: 'Pourquoi Pydantic ?',
                            description: 'Comparaison : Code manuel vs Pydantic.',
                            level: 'intermediate',
                            tags: ['data-quality', 'pydantic', 'validation'],
                            markdown: `### ❌ Sans Pydantic (Validation Manuelle)
C'est verbeux, fragile et difficile à maintenir.
\`\`\`python
def process_user(data):
    if not isinstance(data, dict):
        raise ValueError("Data must be a dict")
    
    if 'id' not in data or not isinstance(data['id'], int):
        raise ValueError("ID invalide")
        
    # Et ainsi de suite pour chaque champ...
    # Gestion des types (str "30" -> int 30) à faire à la main.
\`\`\`

### ✅ Avec Pydantic
Déclaratif, typé, et conversion automatique (parsing).
\`\`\`python
class User(BaseModel):
    id: int
    name: str
    age: int # Convertira "30" en 30 automatiquement
\`\`\``
                        },
                        {
                            id: 'pydantic_io',
                            title: 'Entrée / Sortie (La Douane)',
                            description: 'Nettoyage automatique des données sales.',
                            level: 'intermediate',
                            tags: ['data-quality', 'pydantic', 'validation'],
                            markdown: `### 🧼 Le Concept
Pydantic agit comme un **douanier** à l'entrée de votre code.
1.  **Entrée** : Données en vrac (JSON, API, Excel) souvent mal typées (tout est string).
2.  **Traitement** : Pydantic valide ET convertit (Cast).
3.  **Sortie** : Un objet Python propre et typé.`,
                            code: `from pydantic import BaseModel, EmailStr, ValidationError

# 1. Le Modèle (Le Douanier)
class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool = True # Valeur par défaut

# 2. Données "Sales" (Entrée)
# Notez : 'id' est un str, 'is_active' est manquant
input_data = {
    "id": "123", 
    "name": "Alice",
    "email": "alice@example.com"
}

try:
    # 3. Nettoyage & Validation
    user = User(**input_data)
    
    # 4. Données Propres (Sortie)
    print(f"ID (int): {user.id} - Type: {type(user.id)}") 
    # -> ID (int): 123 - Type: <class 'int'>
    
    print(user.model_dump())
    # -> {'id': 123, 'name': 'Alice', 'email': 'alice@example.com', 'is_active': True}

except ValidationError as e:
    print("Douane : Données refusées !")
    print(e)`
                        }
                    ]
                }
            ]
        }
    ]
};
