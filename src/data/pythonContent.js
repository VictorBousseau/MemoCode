const _pythonContentRaw = {
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
)

# Quand l'en-tête n'est pas la première ligne
# header=2 signifie que la 3ème ligne (index 2) contient les noms de colonnes
data_insee = pd.read_csv('./data/Export_insee.csv', sep=';', header=2)`
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
                        },
                        {
                            id: 'export_parquet',
                            title: 'Exporter en Parquet',
                            description: 'Format colonnaire optimisé pour les grands volumes de données.',
                            level: 'intermediate',
                            tags: ['parquet', 'io', 'pandas', 'big-data'],
                            code: `# Exporter en Parquet (format colonnaire performant)
# Avantages : compression efficace, lecture rapide, compatible Spark/Dask
df.to_parquet('output.parquet', index=False)

# Avec compression (gzip, snappy, brotli)
df.to_parquet('output.parquet', compression='snappy')

# Lire un fichier Parquet
df = pd.read_parquet('data.parquet')

# Lire uniquement certaines colonnes (optimisation mémoire)
df = pd.read_parquet('data.parquet', columns=['col1', 'col2'])`
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
                        },
                        {
                            id: 'display_unique_values',
                            title: 'Afficher les valeurs distinctes',
                            description: 'Lister toutes les valeurs uniques d\'une colonne.',
                            level: 'beginner',
                            tags: ['eda', 'unique', 'distinct', 'pandas'],
                            code: `# Toutes les valeurs distinctes d'une colonne (array NumPy)
print(df['colonne'].unique())

# Nombre de valeurs distinctes
print(df['colonne'].nunique())

# Valeurs distinctes avec leur fréquence (trié par fréquence)
print(df['colonne'].value_counts())

# Afficher TOUTES les valeurs distinctes (même si très nombreuses)
pd.set_option('display.max_rows', None)
print(df['colonne'].value_counts())
pd.reset_option('display.max_rows')

# En liste Python (utile pour itérer)
valeurs = df['colonne'].unique().tolist()
print(valeurs)`
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
                            id: 'merge_diff_cols',
                            title: 'Fusion (Merge) - Colonnes Différentes',
                            description: 'Jointure sur des colonnes avec des noms différents.',
                            level: 'intermediate',
                            tags: ['transformation', 'merge', 'join', 'pandas'],
                            code: `# Situation courante : Les deux tables n'ont pas le même nom de colonne pour la clé
# Ex: Table A a 'identifiant_princ_pp', Table B a 'identifiant_pp'

fusion = pd.merge(
    Souscription_individuelle_selec, 
    Interactions, 
    left_on='identifiant_princ_pp',   # Colonne dans la table de gauche
    right_on='identifiant_pp',        # Colonne dans la table de droite
    how='left'                        # Type de jointure (left, right, inner, outer)
)

# Résultat : Les deux colonnes seront présentes dans le résultat
# Vous pouvez ensuite supprimer la colonne redondante si besoin :
fusion = fusion.drop(columns=['identifiant_pp'])`
                        },
                        {
                            id: 'merge_multi_cols',
                            title: 'Fusion (Merge) - Clés Multiples',
                            description: 'Jointure sur plusieurs colonnes.',
                            level: 'intermediate',
                            tags: ['transformation', 'merge', 'join', 'pandas'],
                            code: `# Jointure sur plusieurs colonnes (Clé composite)
# Utile quand une seule colonne ne suffit pas à identifier une ligne unique

Souscription_individuelle_selec = pd.merge(
    Souscription_individuelle_selec,    # Gauche
    df_referentiel,                     # Droite (votre calendrier généré plus tôt)
    left_on=['date_creation_propo_F_date', 'departement_pp_princ'], # Clés Gauche
    right_on=['date', 'departement'],   # Clés Droite
    how='left'
)`
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
                        },
                        {
                            id: 'create_col_condition',
                            title: 'Création de Colonne (Condition)',
                            description: 'Créer une colonne booléenne basée sur une condition.',
                            level: 'beginner',
                            tags: ['transformation', 'columns', 'pandas'],
                            code: `# Création d'une nouvelle colonne 'Propo_gagné'
# Elle contiendra True si 'statut_production' vaut 'Gagné', sinon False
Souscription_individuelle_selec['Propo_gagné'] = (Souscription_individuelle_selec['statut_production'] == 'Gagné')`
                        }
                    ]
                },
                {
                    id: 'time_series_advanced',
                    title: '6. Feature Engineering Temporel',
                    description: 'Techniques avancées pour les dates.',
                    snippets: [
                        {
                            id: 'date_decomposition_basic',
                            title: 'Décomposition de Dates (Basic)',
                            description: 'Transformer une liste de dates en Année/Mois/Jour.',
                            level: 'intermediate',
                            tags: ['time-series', 'feature-engineering', 'pandas'],
                            code: `# 1. Liste de vos colonnes dates
cols_dates = ['date_creation_propo', 'date_remise_propo'] # Ajoutez vos autres dates ici

# 2. Boucle pour transformer chaque date en chiffres
for col in cols_dates:
    # On vérifie que c'est bien une date
    Souscription_individuelle_epargne[col] = pd.to_datetime(Souscription_individuelle_epargne[col], errors='coerce')
    
    # On crée de nouvelles colonnes numériques
    Souscription_individuelle_epargne[f'{col}_year'] = Souscription_individuelle_epargne[col].dt.year
    Souscription_individuelle_epargne[f'{col}_month'] = Souscription_individuelle_epargne[col].dt.month
    Souscription_individuelle_epargne[f'{col}_dayofweek'] = Souscription_individuelle_epargne[col].dt.dayofweek # 0=Lundi, 6=Dimanche
    
    # On remplit les vides (si une date manque) par -1 ou 0
    Souscription_individuelle_epargne[f'{col}_year'] = Souscription_individuelle_epargne[f'{col}_year'].fillna(-1)
    Souscription_individuelle_epargne[f'{col}_month'] = Souscription_individuelle_epargne[f'{col}_month'].fillna(-1)
    Souscription_individuelle_epargne[f'{col}_dayofweek'] = Souscription_individuelle_epargne[f'{col}_dayofweek'].fillna(-1)

# 3. IMPORTANT : On supprime les colonnes dates originales
# (L'algo plantera si on les laisse)
Souscription_individuelle_epargne = Souscription_individuelle_epargne.drop(columns=cols_dates)`
                        },
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
                        },
                        {
                            id: 'time_correlation_yoy',
                            title: 'Corrélation Année N / N-1',
                            description: 'Utiliser l\'historique de l\'année précédente comme feature.',
                            level: 'advanced',
                            tags: ['time-series', 'correlation', 'feature-engineering', 'pandas'],
                            code: `import numpy as np
import pandas as pd

# 1. Configuration
df_model = df.copy() # Votre DataFrame principal
cols_dates = ['date_creation', 'date_validation'] # Vos colonnes dates
target_col = 'target_value' # La valeur à prédire (ex: Ventes, Conversion...)
ref_year = 2024 # L'année de référence (N-1) pour construire l'historique

# === TRAITEMENT DES DATES & CYCLICITÉ ===
for col in cols_dates:
    # Conversion
    df_model[col] = pd.to_datetime(df_model[col], errors='coerce')
    
    # Encodage cyclique (Jour de l'année)
    # Permet au modèle de comprendre que le 31 déc est proche du 1er jan
    day_of_year = df_model[col].dt.dayofyear
    df_model[f'{col}_sin'] = np.sin(2 * np.pi * day_of_year / 365.25)
    df_model[f'{col}_cos'] = np.cos(2 * np.pi * day_of_year / 365.25)

# === FEATURE : DÉLAI ===
# Temps écoulé entre les deux dates
df_model['delai_jours'] = (df_model[cols_dates[1]] - df_model[cols_dates[0]]).dt.days
df_model['delai_jours'] = df_model['delai_jours'].fillna(-1)

# === CORRÉLATION SEMAINE PAR SEMAINE (HISTORIQUE) ===
# On veut associer à chaque semaine de l'année en cours, 
# la moyenne de la cible de la MÊME SEMAINE de l'année précédente.

# 1. Création des clés de jointure
df_model['semaine'] = df_model[cols_dates[0]].dt.isocalendar().week
df_model['annee'] = df_model[cols_dates[0]].dt.year

# 2. Construction du Référentiel (Année N-1 uniquement)
ref_data = df.copy()
ref_data[cols_dates[0]] = pd.to_datetime(ref_data[cols_dates[0]], errors='coerce')
ref_data['annee'] = ref_data[cols_dates[0]].dt.year
ref_data['semaine'] = ref_data[cols_dates[0]].dt.isocalendar().week

# On ne garde que l'année de référence pour avoir un historique "clos" et statique
# On fait la moyenne par semaine
history_stats = ref_data[ref_data['annee'] == ref_year].groupby('semaine')[target_col].mean().rename('target_N_minus_1')

# 3. Fusion (Merge) : On injecte l'historique dans le dataset actuel
df_model = df_model.merge(history_stats, on='semaine', how='left')

# 4. Gestion des semaines manquantes (Cold Start)
# Si une semaine n'existait pas l'an dernier, on met la moyenne globale de l'année N-1
global_mean_N_1 = ref_data[ref_data['annee'] == ref_year][target_col].mean()
df_model['target_N_minus_1'] = df_model['target_N_minus_1'].fillna(global_mean_N_1)

# === FILTRAGE TEMPOREL ===
# Exemple : On garde l'année N-1 complète + l'année N jusqu'à un cutoff
# (Pour éviter le Data Leakage si on est en train d'entraîner)
date_cutoff = df_model[cols_dates[0]].max() - pd.Timedelta(days=30)
if not df_model.empty:
    df_model = df_model[df_model[cols_dates[0]] < date_cutoff]

# Nettoyage technique
df_model = df_model.drop(columns=cols_dates + ['semaine', 'annee'], errors='ignore')

print(f"✅ Features générées : {[c for c in df_model.columns if 'sin' in c or 'cos' in c or 'target' in c]}")`
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
                },
                {
                    id: 'advanced_viz',
                    title: '5. Dashboard & Corrélations',
                    description: 'Créer des vues d\'ensemble (Subplots) et matrices.',
                    snippets: [
                        {
                            id: 'subplots_concept',
                            title: 'Grille de Graphiques (Subplots)',
                            description: 'Afficher plusieurs graphiques côte à côte.',
                            level: 'advanced',
                            tags: ['viz', 'matplotlib', 'dashboard'],
                            cells: [
                                {
                                    title: '1. Concept : plt.subplots',
                                    markdown: `### 🖼️ La Grille (Figure & Axes)
Au lieu de faire un seul \`plt.show()\`, on crée une grille.
\`fig, ax = plt.subplots(lines, cols)\` renvoie :
*   **fig** : Le cadre global (la feuille de papier).
*   **ax** : Une liste (ou matrice) de zones de dessin. On dessine sur \`ax[0]\`, \`ax[1]\`, etc.`,
                                    code: `import matplotlib.pyplot as plt
import seaborn as sns

# Créer une grille 1 ligne x 2 colonnes
fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# Graphique 1 (à gauche) -> axes[0]
sns.boxplot(data=df, x='statut_production', y='age', ax=axes[0])
axes[0].set_title("Distribution de l'Âge")

# Graphique 2 (à droite) -> axes[1]
sns.countplot(data=df, x='statut_production', ax=axes[1])
axes[1].set_title("Volume par Statut")

plt.tight_layout() # Ajuste les marges automatiquement
plt.show()`
                                },
                                {
                                    title: '2. Boucle Automatique',
                                    markdown: `### 🔄 Générer en boucle
Très puissant pour explorer 50 variables d'un coup.
On utilise \`enumerate\` pour savoir case utiliser.`,
                                    code: `cols_to_plot = ['nb_email_30j', 'nb_rdv_30j', 'nb_appels_30j']

# Grille de 1 ligne x 3 colonnes
fig, axes = plt.subplots(1, 3, figsize=(18, 5))

for idx, col in enumerate(cols_to_plot):
    # On dessine sur l'axe correspondant à l'index (0, 1, 2)
    sns.histplot(data=df, x=col, ax=axes[idx], kde=True)
    axes[idx].set_title(f"Distribution : {col}")

plt.tight_layout()
plt.show()`
                                }
                            ]
                        },
                        {
                            id: 'correlation_heatmap',
                            title: 'Matrice de Corrélation',
                            description: 'Heatmap avancée et Top Corrélations.',
                            level: 'advanced',
                            tags: ['viz', 'statistics', 'seaborn'],
                            cells: [
                                {
                                    title: '1. Calcul & Filtrage',
                                    markdown: `### 🧮 Sélectionner les Numériques
La corrélation (Pearson) ne marche que sur des chiffres. Il faut filtrer.`,
                                    code: `# Sélection semi-automatique des numériques
numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns

# Optionnel : Ajoutez manuellement d'autres colonnes spécifiques
target_cols = ['age', 'revunu_moyen', 'score_appetence']
final_cols = [c for c in numeric_cols if c in target_cols] # ou tout garder

# Calcul de la matrice (Carrée)
corr_matrix = df[numeric_cols].corr()`
                                },
                                {
                                    title: '2. Heatmap Pro',
                                    markdown: `### 🌡️ Visualisation Heatmap
Un code robuste pour une belle matrice lisible.`,
                                    code: `plt.figure(figsize=(12, 10))

# mask : Pour cacher la moitié haute (redondante)
mask = np.triu(np.ones_like(corr_matrix, dtype=bool))

sns.heatmap(
    corr_matrix,
    mask=mask,
    annot=True,       # Affiche les valeurs
    fmt=".2f",        # 2 chiffres après la virgule
    cmap='coolwarm',  # Bleu (neg) -> Rouge (pos)
    vmax=1, vmin=-1,  # Bornes fixes pour que le blanc soit bien 0
    center=0,
    square=True,
    linewidths=.5,
    cbar_kws={"shrink": .5} # Barre de légende plus petite
)
plt.title("Matrice de Corrélation")
plt.show()`
                                },
                                {
                                    title: '3. Top Corrélations',
                                    markdown: `### 🏆 Extraire le TOP 10
Lire une heatmap géante est dur. Voici comment extraire un tableau propre des paires les plus liées.`,
                                    code: `# On "déplie" la matrice (unstack) et on trie
corr_pairs = corr_matrix.unstack()
sorted_pairs = corr_pairs.sort_values(kind="quicksort", ascending=False)

# On filtre les auto-corrélations (valeur 1.0 sur la diagonale)
strong_pairs = sorted_pairs[sorted_pairs != 1.0]

# Afficher les 10 plus fortes (positives ou négatives)
print(strong_pairs.head(10))`
                                }
                            ]
                        },
                        {
                            id: 'categorical_impact',
                            title: 'Impact Business (Barplots)',
                            description: 'Analyser des taux de conversion par catégorie.',
                            level: 'advanced',
                            tags: ['viz', 'business', 'categorical'],
                            cells: [
                                {
                                    title: '1. Crosstab & Taux',
                                    markdown: `### 📊 Taux de Transformation
Comment une catégorie influence une cible binaire (ex: Vente O/N, Production O/N) ?
On utilise \`pd.crosstab\` avec \`normalize='index'\`.`,
                                    code: `# Tableau croisé : Lignes=Region, Colonnes=Vente (0/1)
# normalize='index' : Chaque ligne somme à 100%
cross = pd.crosstab(df['region'], df['vente'], normalize='index') * 100

# Plot Stacked (Empilé)
cross.plot(kind='bar', stacked=True, figsize=(10, 6), color=['tomato', 'mediumseagreen'])
plt.title("Taux de Vente par Région")
plt.ylabel("Proportion (%)")
plt.legend(title='Vente', loc='upper right')
plt.show()`
                                },
                                {
                                    title: '2. Dashboard Multi-Flags',
                                    markdown: `### 🎛️ Analyser 10 Flags d'un coup
Créer une grille de barplots pour voir l'impact de plusieurs variables binaires (Flags) sur la cible.`,
                                    code: `flags = ['flag_email', 'flag_sms', 'flag_app', 'flag_premium']
target = 'statut_vente'

# Grille automatique (2 lignes, 2 colonnes)
fig, axes = plt.subplots(2, 2, figsize=(15, 10))
fig.suptitle('Impact des Canaux sur la Vente', fontsize=16)

for idx, col in enumerate(flags):
    row, c = divmod(idx, 2) # Calcul magique des indices (ligne, col)
    
    # Crosstab rapide
    ct = pd.crosstab(df[col], df[target], normalize='index') * 100
    
    # Plot sur l'axe spécifique
    ct.plot(kind='bar', stacked=True, ax=axes[row, c], legend=False)
    axes[row, c].set_title(col)
    axes[row, c].set_xlabel('')

# Une seule légende pour tout le monde
handles, labels = axes[0,0].get_legend_handles_labels()
fig.legend(handles, labels, title='Vente', loc='upper right')
plt.tight_layout()
plt.show()`
                                }
                            ]
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

**Pourquoi est-ce indispensable ?**
1. **Zéro Fuite de Données (Data Leakage)** : Le pipeline s'assure que les transformations (ex: moyenne pour l'imputation) sont apprises *uniquement* sur le train set et appliquées aveuglément sur le test set.
2. **Reproductibilité** : Tout le processus est contenu dans un seul objet.
3. **Simplicité** : On appelle \`fit()\` et \`predict()\` une seule fois pour tout le flux.

#### 📝 En Résumé
\`\`\`text
📄 Données Brutes
       ⬇️
⚙️ Pipeline Scikit-Learn
   ├── 🧹 Preprocessing (Scaling, Encodage)
   └── 🧠 Modèle (Fit/Predict)
       ⬇️
🎯 Prédiction Finale
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
                        },
                        {
                            id: 'pca',
                            title: 'ACP (Réduction de Dimension)',
                            description: 'Analyse en Composantes Principales.',
                            level: 'advanced',
                            tags: ['ml', 'preprocessing', 'pca', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Fit & Transform',
                                    markdown: `### 📉 compresser l'information
L'ACP crée de nouvelles variables (Composantes Principales/PC) qui sont des combinaisons linéaires des variables initiales.
*   **But** : Garder le maximum de variance (information) dans un minimum de dimensions.
*   ⚠️ **StandardScaler** : **OBLIGATOIRE**. L'ACP est très sensible aux échelles (la variance dépend de l'unité).

**Paramètres \`PCA\` :**
*   \`n_components\` :
    *   **Entier (ex: 2)** : On veut exactement 2 axes (pour visualiser).
    *   **Flottant (ex: 0.95)** : On veut garder 95% de la variance totale.`,
                                    code: `from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import pandas as pd

# 1. Standardiser (Indispensable)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 2. Définir l'ACP
# On garde 2 axes pour la visualisation 2D
pca = PCA(n_components=2) 

# 3. Fit & Transform
X_pca = pca.fit_transform(X_scaled)

print(f"Forme originale : {X_scaled.shape}")
print(f"Forme réduite : {X_pca.shape}")`
                                },
                                {
                                    title: '2. Variance Expliquée (Scree Plot)',
                                    markdown: `### 📊 Combien d'axes garder ?
Le "Scree Plot" (Graphique des éboulis) montre la part d'information portée par chaque axe.
On cherche le "coude" ou on s'arrête quand on a assez d'info (ex: > 80%).`,
                                    code: `import matplotlib.pyplot as plt
import numpy as np

# Pour cet exemple, on refit une PCA complète
pca_full = PCA().fit(X_scaled)

# Variance expliquée par chaque axe
explained_var = pca_full.explained_variance_ratio_
cumulative_var = np.cumsum(explained_var)

plt.figure(figsize=(10, 5))
plt.plot(range(1, len(explained_var) + 1), cumulative_var, marker='o', linestyle='--')
plt.axhline(y=0.95, color='r', linestyle=':', label='95% Variance')
plt.xlabel('Nombre de Composantes')
plt.ylabel('Variance Cumulée')
plt.title('Scree Plot : Choisir le nombre de dimensions')
plt.legend()
plt.grid()
plt.show()`
                                },
                                {
                                    title: '3. Visualisation 2D',
                                    markdown: `### 🗺️ Projection des Individus
On projette nos données sur les 2 premiers axes (PC1 et PC2).
Si ces 2 axes capturent beaucoup de variance (ex: > 60%), la carte est fidèle à la réalité.`,
                                    code: `import seaborn as sns

# Création d'un DataFrame pour la visu
df_pca = pd.DataFrame(data=X_pca, columns=['PC1', 'PC2'])
df_pca['Target'] = y.values # On rajoute la cible pour la couleur

plt.figure(figsize=(10, 8))
sns.scatterplot(
    data=df_pca, x='PC1', y='PC2', 
    hue='Target', 
    palette='viridis', 
    alpha=0.7
)
plt.title(f"Projection ACP (Var expliquée : {sum(pca.explained_variance_ratio_):.2%})")
plt.xlabel(f"PC1 ({pca.explained_variance_ratio_[0]:.2%})")
plt.ylabel(f"PC2 ({pca.explained_variance_ratio_[1]:.2%})")
plt.show()`
                                },
                                {
                                    title: '4. Cercle des Corrélations',
                                    markdown: `### 🎡 Interprétation des Axes
Que signifient PC1 et PC2 ? On regarde la corrélation entre les variables originales et les axes.
*   **Variable proche du bord** : Bien représentée.
*   **Proche d'un axe** : Très corrélée à cet axe.
*   **Angle faible entre 2 flèches** : Variables corrélées positivement.`,
                                    code: `import numpy as np

# Coordonnées des variables (Composantes)
# shape : (n_features, n_components)
components = pca.components_.T 
features = X.columns

plt.figure(figsize=(8, 8))
plt.circle((0,0), 1, color='gray', fill=False, linestyle='--')

# Pour chaque feature, on trace une flèche
for i, feature in enumerate(features):
    x_coord = components[i, 0] # Contribution à PC1
    y_coord = components[i, 1] # Contribution à PC2
    
    plt.arrow(0, 0, x_coord, y_coord, head_width=0.05, head_length=0.05, fc='r', ec='r')
    plt.text(x_coord * 1.15, y_coord * 1.15, feature, color='r')

plt.xlim(-1.1, 1.1)
plt.ylim(-1.1, 1.1)
plt.axhline(0, color='k', linestyle='-')
plt.axvline(0, color='k', linestyle='-')
plt.title("Cercle des Corrélations")
plt.grid()
plt.show()`
                                },
                                {
                                    title: '5. Modélisation Post-ACP',
                                    markdown: `### 🚀 Pourquoi faire ça ?
Entraîner un modèle sur \`X_pca\` au lieu de \`X\` :
1.  **Vitesse** : Moins de colonnes = Calculs plus rapides.
2.  **Denoising** : On a supprimé le "bruit" (les petits axes inutiles).
3.  **Visualisation** : On peut tracer les frontières de décision en 2D !`,
                                    code: `from sklearn.linear_model import LogisticRegression

# On entraîne sur les données RÉDUITES
clf = LogisticRegression()
clf.fit(X_pca, y)

print(f"Score sur données réduites : {clf.score(X_pca, y):.3f}")

# (Optionnel) Tracer la frontière de décision en 2D...`
                                }
                            ]
                        },
                        {
                            id: 'imbalanced_data',
                            title: 'Données Déséquilibrées',
                            level: 'advanced',
                            description: 'Gérer les classes 80/20 (Poids, Resampling).',
                            tags: ['preprocessing', 'imbalanced', 'sampling'],
                            cells: [
                                {
                                    title: '1. Le Problème (80/20)',
                                    markdown: `### ⚖️ Pourquoi c'est grave ?
Si vous avez **80% de "Non"** et **20% de "Oui"** :
*   Un modèle "fainéant" peut prédire "Non" tout le temps et avoir **80% de réussite (Accuracy)**.
*   Mais il ne sert à rien ! (Rappel = 0%).

**Solution 1 : Class Weights (La plus simple)** ⚡
On dit au modèle : *"Chaque erreur sur la classe rare coûte 4 fois plus cher"*.
La plupart des modèles Scikit-Learn (\`LogisticRegression\`, \`SVM\`, \`RandomForest\`) ont un paramètre \`class_weight='balanced'\`.`,
                                    code: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# 1. Sans gestion du déséquilibre
clf_bad = LogisticRegression()
# clf_bad.fit(X, y) -> Risque de tout prédire en "Classe Majoritaire"

# 2. Avec class_weight='balanced'
# Le modèle ajuste automatiquement les pénalités
# Poids = n_samples / (n_classes * np.bincount(y))
clf_balanced = LogisticRegression(class_weight='balanced')
clf_balanced.fit(X_train, y_train)

print("-- Rapport avec Poids Équilibrés --")
# On devrait voir un meilleur Rappel (Recall) pour la classe 1
print(classification_report(y_test, clf_balanced.predict(X_test)))`
                                },
                                {
                                    title: '2. Re-sampling (Upsampling)',
                                    markdown: `### 🔄 Solution 2 : Modifier les Données
Si le modèle n'a pas de paramètre \`class_weight\` (ex: certains réseaux de neurones simples), on peut équilibrer le dataset manuellement.

**Upsampling (Sur-échantillonnage)** : On duplique les exemples de la classe rare jusqu'à atteindre 50/50.`,
                                    code: `from sklearn.utils import resample
import pandas as pd

# Supposons qu'on a un DataFrame df avec une colonne 'target'
# Séparer les classes
df_maj = df[df.target == 0]
df_min = df[df.target == 1]

# Upsampling de la classe minoritaire
df_min_upsampled = resample(
    df_min, 
    replace=True,     # On autorise la duplication
    n_samples=len(df_maj), # On vise la même taille que la classe majoritaire
    random_state=42
)

# Combiner
df_balanced = pd.concat([df_maj, df_min_upsampled])

print(f"Avant : {df.target.value_counts()}")
print(f"Après : {df_balanced.target.value_counts()}") 
# Maintenant c'est 50/50 !`
                                },
                                {
                                    title: '3. Attention à la Métrique',
                                    markdown: `### ⚠️ Le Piège de l'Accuracy
Sur des données déséquilibrées, **NE JAMAIS REGARDER L'ACCURACY SEULE**.

Regardez toujours :
1.  **F1-Score** : Moyenne harmonique (Précision & Rappel).
2.  **AUC (Area Under Curve)** : Capacité globale de distinction.
3.  **Confusion Matrix** : Pour voir les Faux Négatifs.`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'supervised_classification',
                    title: '2. Classification Supervisée',
                    subCategory: 'Machine Learning',
                    displayMode: 'list',
                    description: 'Apprendre à classer à partir d\'exemples étiquetés.',
                    snippets: [
                        {
                            id: 'logistic_regression',
                            title: 'Régression Logistique',
                            description: 'Malgré son nom, c\'est un classifieur !',
                            level: 'intermediate',
                            tags: ['ml', 'classification', 'linear', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres Complets',
                                    markdown: `### 📉 La Sigmoïde
Elle estime la probabilité $P(Y=1|X)$ via une fonction sigmoïde.
$$ P = \\frac{1}{1 + e^{-z}} $$
*   **Linéaire** : La frontière de décision est une ligne (ou un hyperplan).
*   ⚠️ **StandardScaler** : Obligatoire car la régularisation (L1/L2) dépend de l'échelle des poids.`,
                                    code: `from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

# C : Inverse de la régularisation (Plus C est petit, plus on régularise/simplifie)
# penalty : 'l2' (Ridge - defaut), 'l1' (Lasso - selection de variables), 'elasticnet'
# solver : 'liblinear' (petits datasets), 'saga' (gros datasets + elasticnet)
log_reg = make_pipeline(
    StandardScaler(),
    LogisticRegression(
        C=1.0,               # Défaut. Essayer 0.1, 0.01 pour régulariser fort
        penalty='l2',
        solver='lbfgs',      # Bon standard
        class_weight='balanced', # Si déséquilibre
        random_state=42,
        max_iter=1000        # Augmenter si le modèle ne converge pas
    )
)
log_reg.fit(X_train, y_train)`
                                },
                                {
                                    title: '2. Grid Search',
                                    code: `from sklearn.model_selection import GridSearchCV

param_grid = {
    'logisticregression__C': [0.01, 0.1, 1, 10, 100],
    'logisticregression__penalty': ['l2']
    # Note: Pour tester L1, il faut changer le solver (ex: 'liblinear' ou 'saga')
}

grid = GridSearchCV(
    log_reg,
    param_grid,
    cv=5,
    scoring='f1_macro',
    n_jobs=-1
)
grid.fit(X_train, y_train)

print(f"Meilleurs Params : {grid.best_params_}")`
                                },
                                {
                                    title: '3. Feature Importance (Coef)',
                                    markdown: `### ⚖️ Poids des Coefficients
Comme pour le Perceptron ou la Régression Linéaire, les coefficients $\\beta$ indiquent l'importance et la direction.
*   **Signe +** : Favorise la classe 1.
*   **Signe -** : Favorise la classe 0.`,
                                    code: `import pandas as pd
import matplotlib.pyplot as plt

model = grid.best_estimator_.named_steps['logisticregression']
coeffs = pd.Series(model.coef_[0], index=X_train.columns)

# Classement par amplitude absolue
importance = coeffs.abs().sort_values(ascending=False)

plt.figure(figsize=(10, 6))
coeffs.loc[importance.index].plot(kind='barh')
plt.title("Importance des Coefficients (LogReg)")
plt.axvline(x=0, color='.5')
plt.show()`
                                },
                                {
                                    title: '4. SHAP (LinearExplainer)',
                                    markdown: `### ⚡ SHAP Exact & Rapide
La Régression Logistique est compatible avec \`LinearExplainer\`.`,
                                    code: `import shap

model = grid.best_estimator_.named_steps['logisticregression']
X_train_scaled = grid.best_estimator_.named_steps['standardscaler'].transform(X_train)
X_test_scaled = grid.best_estimator_.named_steps['standardscaler'].transform(X_test)

explainer = shap.LinearExplainer(model, X_train_scaled)
shap_values = explainer.shap_values(X_test_scaled)

shap.summary_plot(shap_values, X_test_scaled, feature_names=X_test.columns)`
                                },
                                {
                                    title: '5. Probabilités',
                                    markdown: `### 🎯 Probabilités (Confiance)
Au lieu de prédire juste 0 ou 1, on veut savoir si le modèle est sûr à 51% ou à 99%.`,
                                    code: `# predict_proba renvoie une matrice (N_samples, N_classes)
# Pour une classification binaire, c'est souvent [Prob_Classe_0, Prob_Classe_1]

probs = grid.best_estimator_.predict_proba(X_test)
probs_classe_1 = probs[:, 1]

print("--- Probabilités LogReg (Classe 1) ---")
print(probs_classe_1[:5])`
                                }
                            ]
                        },
                        {
                            id: 'knn',
                            title: 'K-Nearest Neighbors (KNN)',
                            description: '"Dis-moi qui sont tes voisins..."',
                            level: 'beginner',
                            tags: ['ml', 'classification', 'neighbors', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres Complets',
                                    markdown: `### 📍 Le Voisinage
On classe un point selon la majorité de ses $k$ voisins.
*   ⚠️ **StandardScaler** : **CRITIQUE**. KNN calcule des distances. Si une variable est en "millions" et l'autre en "0-1", la distance sera faussée.`,
                                    code: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

# n_neighbors (k) : Nombre de voisins. Impair de préférence pour éviter les égalités.
# weights : 'uniform' (défaut) ou 'distance' (les voisins proches comptent plus).
# metric : 'minkowski' (défaut, euclidien si p=2), 'manhattan' (p=1).
knn_pipe = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(
        n_neighbors=5,
        weights='uniform',
        metric='minkowski',
        p=2,
        n_jobs=-1
    )
)
knn_pipe.fit(X_train, y_train)`
                                },
                                {
                                    title: '2. Grid Search',
                                    code: `from sklearn.model_selection import GridSearchCV

param_grid = {
    'kneighborsclassifier__n_neighbors': [3, 5, 7, 9, 11],
    'kneighborsclassifier__weights': ['uniform', 'distance'],
    'kneighborsclassifier__p': [1, 2] # 1=Manhattan, 2=Euclidien
}

grid = GridSearchCV(
    knn_pipe,
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)
grid.fit(X_train, y_train)

print(f"Meilleur K : {grid.best_params_}")`
                                },
                                {
                                    title: '3. Feature Importance (Permutation)',
                                    markdown: `### 🏳️ Pas de Feature Importance Native
KNN n'a pas de coefficients ou d'arbres. Il utilise *toutes* les variables pour la distance.
👉 Utilisez la **Permutation Importance** pour voir quelle variable casse le modèle si on la mélange.`,
                                    code: `from sklearn.inspection import permutation_importance

result = permutation_importance(
    grid.best_estimator_, X_test, y_test, n_repeats=10, random_state=42
)

# Voir le snippet SVM pour le code d'affichage complet (Boxplot)`
                                },
                                {
                                    title: '4. SHAP (KernelExplainer)',
                                    markdown: `### 🐢 SHAP (Très Lent)
KNN est une "boîte noire" non-linéaire pour SHAP. Il faut utiliser \`KernelExplainer\`.
*   C'est souvent trop lent sur des gros datasets. Préférez KNN comme modèle "baseline" simple.`,
                                    code: `import shap

# On utilise un résumé (kmeans) pour le background
X_summary = shap.kmeans(X_train, 10)
model_knn = grid.best_estimator_.named_steps['kneighborsclassifier']

# Fonction de prédiction proba (attention aux pipelines, il faut passer les données scalées)
# Ici on simplifie en passant le pipeline entier si compatible, sinon manuellement
explainer = shap.KernelExplainer(grid.best_estimator_.predict_proba, X_summary)

shap_values = explainer.shap_values(X_test.iloc[:50]) # Sur un petit échantillon
shap.summary_plot(shap_values[1], X_test.iloc[:50])`
                                },
                                {
                                    title: '5. Probabilités',
                                    markdown: `### 🎯 Probabilités KNN
KNN estime la probabilité comme la fraction des voisins de cette classe.
Ex: Si K=5 et qu'il y a 4 voisins "Rouge" et 1 "Bleu", Proba(Rouge) = 4/5 = 0.8.`,
                                    code: `probs = grid.best_estimator_.predict_proba(X_test)
probs_classe_1 = probs[:, 1]

print("--- Probabilités KNN (Classe 1) ---")
print(probs_classe_1[:5])`
                                }
                            ]
                        },
                        {
                            id: 'naive_bayes',
                            title: 'Naïve Bayes',
                            description: 'Probabilités & Théorème de Bayes.',
                            level: 'intermediate',
                            tags: ['ml', 'classification', 'probabilistic', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres Complets',
                                    markdown: `### 🎲 "Naïf" Pourquoi ?
Il suppose que toutes les features sont **indépendantes** entre elles (ce qui est rarement vrai, mais ça marche quand même !).
$$ P(Y|X) \\propto P(Y) \\prod P(X_i|Y) $$

**Variantes :**
*   **GaussianNB** : Pour données continues (suppose distribution normale).
*   **MultinomialNB** : Pour compteurs (ex: Bag of Words en NLP).
*   **BernoulliNB** : Pour données binaires.`,
                                    code: `from sklearn.naive_bayes import GaussianNB, MultinomialNB
from sklearn.preprocessing import PowerTransformer

# GaussianNB n'a pas vraiment d'hyperparamètres majeurs.
# var_smoothing : Ajoute de la stabilité (valeur minuscule par défaut 1e-9)
nb_model = GaussianNB(var_smoothing=1e-9)

# Astuce : GaussianNB aime les courbes en cloche.
# PowerTransformer (Yeo-Johnson) peut aider à normaliser les features "tordues".
from sklearn.pipeline import make_pipeline
pipe_nb = make_pipeline(PowerTransformer(), GaussianNB())

pipe_nb.fit(X_train, y_train)`
                                },
                                {
                                    title: '2. Grid Search',
                                    markdown: `Pour **MultinomialNB** (Texte), on tune \`alpha\` (Lissage Laplace).`,
                                    code: `import numpy as np
from sklearn.model_selection import GridSearchCV

# Exemple pour GaussianNB
param_grid = {
    'gaussiannb__var_smoothing': np.logspace(0, -9, num=10)
}

grid = GridSearchCV(pipe_nb, param_grid, cv=5)
grid.fit(X_train, y_train)`
                                },
                                {
                                    title: '3. Feature Importance',
                                    markdown: `### 🏳️ Permutation Importance
Comme KNN, pas d'importance native simple (sauf voir les moyennes par classe \`theta_\`). Utilisez Permutation Importance.`,
                                    code: `# Voir snippet SVM`
                                },
                                {
                                    title: '4. SHAP (KernelExplainer)',
                                    description: 'Agnostique.',
                                    code: `import shap
# KernelExplainer requis.
# Naive Bayes est très rapide, donc SHAP est raisonnablement rapide aussi.`
                                },
                                {
                                    title: '5. Probabilités',
                                    markdown: `### 🎯 Probabilités Naive Bayes
Naive Bayes produit des probabilités (c'est sa nature), mais elles sont souvent **extrêmes** (trop proche de 0 ou 1) car il suppose l'indépendance des features.
*   Utilisez \`CalibratedClassifierCV\` pour recaler les probas si besoin.`,
                                    code: `probs = pipe_nb.predict_proba(X_test) # ou grid.best_estimator_
probs_classe_1 = probs[:, 1]

print("--- Probabilités Naive Bayes (Classe 1) ---")
print(probs_classe_1[:5])`
                                }
                            ]
                        },
                        {
                            id: 'decision_tree',
                            title: 'Arbre de Décision',
                            description: 'Diviser pour mieux régner.',
                            level: 'intermediate',
                            tags: ['ml', 'classification', 'tree', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres Complets',
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
import pandas as pd

# class_weight='balanced' : Indispensable si vos classes sont déséquilibrées (ex: 90% vs 10%)
# ccp_alpha : Paramètre de post-élagage (pruning) pour réduire le sur-apprentissage
tree_full = DecisionTreeClassifier(
    criterion='gini',           # 'gini' ou 'entropy'
    splitter='best',            # 'best' pour le meilleur split, 'random' pour de l'aléatoire
    max_depth=None,             # Profondeur max (None = jusqu'à pureté, attention overfitting)
    min_samples_split=2,        # Minimum d'échantillons pour diviser un noeud
    min_samples_leaf=1,         # Minimum d'échantillons dans une feuille (fin de branche)
    max_features=None,          # Nombre de features à considérer pour un split ('sqrt', 'log2')
    random_state=42,            # Pour la reproductibilité
    max_leaf_nodes=None,        # Nombre maximum de feuilles
    min_impurity_decrease=0.0,  # Seuil de gain d'impureté pour splitter
    class_weight='balanced',    # Ajuste les poids inversement prop. aux fréquences des classes
    ccp_alpha=0.0               # Complexité pour le pruning (>= 0.0)
)
tree_full.fit(X_train, y_train)`
                                },
                                {
                                    title: '2. Grid Search (Optimisation)',
                                    code: `from sklearn.model_selection import GridSearchCV

# Dictionnaire des paramètres à tester
param_grid = {
    'criterion': ['gini', 'entropy'],
    'max_depth': [5, 10, 20, None],
    'min_samples_leaf': [1, 5, 10],
    'class_weight': [None, 'balanced'],
    'ccp_alpha': [0.0, 0.01, 0.1]
}

# cv=5 : Stratified K-Fold à 5 volets ( Validation Croisée )
# scoring='f1_macro' : Métrique à optimiser (ici F1 Score moyen)
grid = GridSearchCV(
    DecisionTreeClassifier(random_state=42), 
    param_grid, 
    cv=5, 
    scoring='f1_macro', 
    n_jobs=-1  # Utilise tous les coeurs du CPU
)
grid.fit(X_train, y_train)

print(f"Meilleurs paramètres : {grid.best_params_}")
print(f"Meilleur score : {grid.best_score_}")

# Récupérer le meilleur modèle ré-entraîné sur tout le train set
best_model = grid.best_estimator_`
                                },
                                {
                                    title: '3. Feature Importance (Global)',
                                    markdown: `### 📊 Feature Importance (Sklearn)
C'est une métrique **Globale**. Elle répond à la question : *"Quelles variables ont été les plus utiles pour construire l'arbre ?"*

*   **Calcul** : Somme des gains d'impureté (Gini/Entropy) apportés par la variable à chaque split, pondérée par le nombre d'échantillons.
*   ⚠️ **Biais** : Elle a tendance à favoriser les variables à forte cardinalité (beaucoup de valeurs uniques, ex: ID client) et les variables continues.`,
                                    code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# A. Depuis l'arbre standard (défini à l'étape 1)
# tree_full.feature_importances_ contient les importances
imp_standard = pd.Series(
    tree_full.feature_importances_, 
    index=X.columns
).sort_values(ascending=False)

print("--- Importance (Arbre Standard) ---")
print(imp_standard.head(5))

# B. Depuis le Grid Search (on accède au meilleur modèle via .best_estimator_)
best_model = grid.best_estimator_
importances = best_model.feature_importances_

# Création d'une Série Pandas pour manipulation facile
feat_imp = pd.Series(importances, index=X.columns).sort_values(ascending=False)

print("\\n--- Importance (Best Model GridSearch) ---")
print(feat_imp.head(10))

# Visualisation (Best Model)
plt.figure(figsize=(10, 6))
sns.barplot(x=feat_imp.head(15), y=feat_imp.head(15).index)
plt.title("Importance des Variables (Gini Importance)")
plt.show()`
                                },
                                {
                                    title: '4. SHAP Values (Local & Global)',
                                    markdown: `### 🕵️‍♂️ SHAP (SHapley Additive exPlanations)
Contrairement à la Feature Importance classique, SHAP permet une explicabilité **Locale** (Pourquoi CE client a un score de risque élevé ?).

| Feature Importance (Sklearn) | SHAP Values |
| :--- | :--- |
| **Global** uniquement (Moyenne) | **Local** (Par individu) & **Global** (Agrégation) |
| "Combien la variable est utilisée ?" | "Comment la variable pousse la prédiction (⬆️ ou ⬇️) ?" |
| Biasée vers les variables cardinales | Mathématiquement équitable (Théorie des jeux) |
| Toujours positive | Positive (pousse vers 1) ou Négative (pousse vers 0) |

> **Le Beeswarm Plot (ci-dessous)** :
> *   Chaque point est une ligne (un individu).
> *   **Couleur** : Valeur de la variable (Rouge = Élevée, Bleu = Faible).
> *   **Axe X** : Impact sur la prédiction (Droite = Augmente la proba, Gauche = Diminue).`,
                                    code: `import shap

# 1. Initialiser l'explainer (Pour les arbres : TreeExplainer)
# Accepte: Decision Trees, Random Forests, XGBoost, LightGBM...
explainer = shap.TreeExplainer(best_model)

# 2. Calculer les valeurs SHAP (c'est parfois long !)
shap_values = explainer.shap_values(X_test)

# --- Visualisation 1 : Global (Beeswarm Plot) ---
# Le graphique le plus riche : montre l'importance ET la direction de l'effet
# (Note: shap_values[1] car on regarde la classe 1, ex: Fraude/Achat)
shap.summary_plot(shap_values[1], X_test)

# --- Visualisation 2 : Global (Bar Plot) ---
# Équivalent "buxus" à feature_importances_, mais plus fiable
# shap.summary_plot(shap_values[1], X_test, plot_type="bar")

# --- Visualisation 3 : Local (Force Plot) ---
# Expliquer UNE prédiction spécifique (ex: le premier client du test set)
shap.initjs() # Nécessaire dans un notebook
shap.force_plot(
    explainer.expected_value[1], 
    shap_values[1][0,:], 
    X_test.iloc[0,:]
)`
                                },
                                {
                                    title: '5. Visualisation & Probabilités',
                                    markdown: `### 🌳 Voir l'arbre et les Scores
1. **Visualisation** : \`plot_tree\` permet de voir les règles décisions.
2. **Probabilités** : \`predict_proba\` donne le score de confiance (ex: 80% Fraude) au lieu de juste la classe (0 ou 1).`,
                                    code: `from sklearn.tree import plot_tree
import matplotlib.pyplot as plt

# 1. Visualiser l'arbre (Top 3 niveaux pour lisibilité)
plt.figure(figsize=(20, 10))
plot_tree(
    best_model, 
    max_depth=3, 
    feature_names=X_test.columns, 
    class_names=['Sain', 'Fraude'], # Adapter selon vos classes
    filled=True, 
    rounded=True, 
    fontsize=10
)
plt.title("Arbre de Décision (Top 3 Niveaux)")
plt.show()

# 2. Obtenir les Probabilités
# predict() -> [0, 1, 0...]
# predict_proba() -> [[0.9, 0.1], [0.2, 0.8]...]
probs = best_model.predict_proba(X_test)

# Probabilité d'être classe 1 (ex: Fraude)
probs_classe_1 = probs[:, 1]

print("--- Premières Probabilités ---")
print(probs_classe_1[:5])`
                                }
                            ]
                        },
                        {
                            id: 'random_forest',
                            title: 'Random Forest',
                            description: 'Forêt Aléatoire (Ensemble de Bagging).',
                            level: 'intermediate',
                            tags: ['ml', 'classification', 'forest', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres Complets',
                                    markdown: `### 🌲 La Forêt Aléatoire (Bagging)
Le principe est de créer une multitude d'arbres de décision, chacun entraîné sur une partie légèrement différente des données (**Bootstrap**). La décision finale est un vote majoritaire.

*   ✅ **Robuste** : Réduit le sur-apprentissage (variance) par rapport à un arbre seul.
*   ✅ **OOB Score** : Peut estimer son erreur sans validation croisée (grâce aux données non utilisées dans le bootstrap).`,
                                    code: `from sklearn.ensemble import RandomForestClassifier
import pandas as pd

# n_estimators=100 : Nombre d'arbres (plus = mieux, mais plus lent)
# bootstrap=True : Chaque arbre voit un échantillon différent (avec remise)
# oob_score=True : Utilise les données non-vues (Out-Of-Bag) pour valider
rf_full = RandomForestClassifier(
    n_estimators=100,        
    criterion='gini',
    max_depth=None,          # Laisser pousser les arbres (le bagging gère le sur-apprentissage)
    min_samples_split=2,
    min_samples_leaf=1,
    max_features='sqrt',     # nb features testées par split = racine carrée du total (Standard RF)
    bootstrap=True,
    oob_score=True,          # Métrique de validation "gratuite" interne
    n_jobs=-1,               # Paralléliser sur tous les coeurs CPU
    random_state=42,
    class_weight='balanced'
)
rf_full.fit(X_train, y_train)

print(f"OOB Score (Validation Interne) : {rf_full.oob_score_:.4f}")`
                                },
                                {
                                    title: '2. Grid Search (Optimisation)',
                                    description: 'Attention : le Grid Search sur RF peut être très long !',
                                    code: `from sklearn.model_selection import GridSearchCV

# Pour RF, on tune surtout le nombre d'arbres et leur profondeur
param_grid = {
    'n_estimators': [100, 200],      # Nombre d'arbres
    'max_depth': [10, 20, None],     # Profondeur max
    'min_samples_leaf': [1, 2, 4],   # Régularisation des feuilles
    'max_features': ['sqrt', 'log2'] # Diversité des arbres
}

grid = GridSearchCV(
    RandomForestClassifier(random_state=42, n_jobs=-1),
    param_grid,
    cv=3,                   # 3 folds suffisent souvent pour gagner du temps
    scoring='f1_macro',
    n_jobs=-1
)
grid.fit(X_train, y_train)

print(f"Meilleurs Params : {grid.best_params_}")
print(f"Meilleur Score : {grid.best_score_}")

best_rf = grid.best_estimator_`
                                },
                                {
                                    title: '3. Feature Importance',
                                    markdown: `### 📊 Importance et Robustesse
Avec une Random Forest, la Feature Importance est plus **fiable** que sur un arbre unique car moyennée sur des centaines d'arbres.`,
                                    code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# A. Depuis le modèle complet (Step 1)
imp_full = pd.Series(rf_full.feature_importances_, index=X.columns).sort_values(ascending=False)

# B. Depuis le meilleur modèle du Grid Search
importances = best_rf.feature_importances_
feat_imp = pd.Series(importances, index=X.columns).sort_values(ascending=False)

print("--- Top 5 Variables (Best Model) ---")
print(feat_imp.head(5))

# Visualisation
plt.figure(figsize=(10, 6))
sns.barplot(x=feat_imp.head(15), y=feat_imp.head(15).index, palette="viridis")
plt.title("Feature Importance (Random Forest - MDI)")
plt.show()`
                                },
                                {
                                    title: '4. SHAP Values (Attention Temps Calcul)',
                                    markdown: `### 🐢 SHAP & Random Forest
Calculer les valeurs SHAP exactes sur une forêt aléatoire peut être **coûteux en temps** (car il faut traverser des centaines d'arbres).
*   Astuce : Utilisez \`shap.TreeExplainer\` avec \`approximate=True\` ou sur un sous-ensemble de données si c'est trop lent.`,
                                    code: `import shap

# 1. Initialiser l'explainer
# (Gère automatiquement l'ensemble des arbres via tree_limit ou interne)
explainer = shap.TreeExplainer(best_rf)

# 2. Calculer les SHAP Values
# check_additivity=False : Parfois nécessaire pour les algo approximatifs ou complexes
shap_values = explainer.shap_values(X_test, check_additivity=False)

# --- Visualisation : Beeswarm ---
# shap_values[1] pour la classe positive
shap.summary_plot(shap_values[1], X_test)

# --- Visualisation : Force Plot (Local) ---
shap.initjs()
shap.force_plot(
    explainer.expected_value[1], 
    shap_values[1][0,:], 
    X_test.iloc[0,:]
)`
                                },
                                {
                                    title: '5. Probabilités',
                                    markdown: `### 🎯 Probabilités & Vote
Une forêt aléatoire calcule la probabilité en faisant voter tous ses arbres.
Si 80 arbres sur 100 disent "Classe 1", la probabilité est 0.8.`,
                                    code: `probs = best_rf.predict_proba(X_test)
probs_classe_1 = probs[:, 1]

print("--- Probabilités Random Forest (Classe 1) ---")
print(probs_classe_1[:5])`
                                }
                            ]
                        },
                        {
                            id: 'svm',
                            title: 'SVM (Séparateur à Vaste Marge)',
                            description: 'Maximiser la marge entre les classes.',
                            level: 'advanced',
                            tags: ['ml', 'classification', 'svm', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres Complets',
                                    markdown: `### ⚔️ L'Hyperplan & Kernels
Le SVM cherche l'hyperplan qui sépare les classes avec la plus grande **marge** possible.
*   ⚠️ **Important** : Les SVM sont très sensibles à l'échelle des données. **StandardScaler** est obligatoire avant !`,
                                    code: `from sklearn.svm import SVC
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

# C : Régularisation (C petit = Marge large/Plus d'erreurs tolérées, C grand = Marge étroite/Overfitting)
# kernel : 'linear', 'poly', 'rbf' (Radial Basis Function - le plus courant), 'sigmoid'
# gamma : Coefficient pour 'rbf'/'poly'. 'scale' (défaut) est souvent bon.
# probability=True : Nécessaire si vous voulez predict_proba() ou du SHAP précis (mais ralentit)
svm_full = make_pipeline(
    StandardScaler(),
    SVC(
        C=1.0, 
        kernel='rbf', 
        gamma='scale', 
        probability=True, 
        random_state=42,
        class_weight='balanced'
    )
)
svm_full.fit(X_train, y_train)`
                                },
                                {
                                    title: '2. Grid Search',
                                    code: `from sklearn.model_selection import GridSearchCV

# Note : On tune le SVC à l'intérieur du pipeline (d'où le "svc__" préfixe)
param_grid = {
    'svc__C': [0.1, 1, 10, 100],
    'svc__kernel': ['linear', 'rbf'],
    'svc__gamma': ['scale', 'auto', 0.1, 0.01]
}

grid = GridSearchCV(
    svm_full, 
    param_grid, 
    cv=3, 
    scoring='f1_macro', 
    n_jobs=-1
)
grid.fit(X_train, y_train)

print(f"Meilleurs Params : {grid.best_params_}")
best_svm = grid.best_estimator_`
                                },
                                {
                                    title: '3. Feature Importance (Permutation)',
                                    markdown: `### 🏳️ Feature Importance & SVM
*   **Kernel Linéaire** : On peut utiliser \`coef_\` pour voir les poids.
*   **Kernel RBF/Poly** : **Pas de feature importance native !** L'espace est transformé de manière complexe.
👉 **Solution** : Utiliser la **Permutation Importance**. On mélange une colonne et on regarde combien le score chute. Si le score chute beaucoup, la variable était importante.`,
                                    code: `from sklearn.inspection import permutation_importance
import matplotlib.pyplot as plt

# Calcul de l'importance par permutation (Modèle agnostique)
# n_repeats=10 : On mélange 10 fois chaque variable pour être sûr
perm_importance = permutation_importance(
    best_svm, X_test, y_test, n_repeats=10, random_state=42
)

# Organisation des données
sorted_idx = perm_importance.importances_mean.argsort()

plt.figure(figsize=(10, 6))
plt.boxplot(
    perm_importance.importances[sorted_idx].T,
    vert=False,
    labels=X_test.columns[sorted_idx]
)
plt.title("Permutation Importance (Test Set)")
plt.show()`
                                },
                                {
                                    title: '4. SHAP (KernelExplainer)',
                                    markdown: `### 🐢 SHAP & SVM
Le SVM n'étant pas un arbre, on doit utiliser \`KernelExplainer\`.
*   ⚠️ **Très lent** : Il doit tester des milliers de combinaisons (coalitions) de variables.
*   **Astuce** : Utilisez \`shap.kmeans(X_train, 10)\` pour résumer le background et accélérer.`,
                                    code: `import shap

# On utilise le modèle interne du pipeline (best_svm.steps[1][1] ou best_svm.named_steps['svc'])

model_svc = best_svm.named_steps['svc']

# Le KernelExplainer a besoin de données de référence pour comparer (Background)
# On prend un résumé (KMeans) ou un échantillon (sample) du train set pour aller plus vite
X_train_summary = shap.kmeans(X_train, 10) 

# Le modèle doit prédire des probabilités (probability=True)
explainer = shap.KernelExplainer(model_svc.predict_proba, X_train_summary)

# Calcul (peut être long !)
shap_values = explainer.shap_values(X_test)

# Visualisation (Classe 1)
shap.summary_plot(shap_values[1], X_test)`
                                },
                                {
                                    title: '5. Probabilités',
                                    markdown: `### 🎯 Probabilités SVM
Par défaut, le SVM ne donne qu'une distance (hyperplan).
Avec \`probability=True\`, il utilise une calibration interne (Platt Scaling) pour estimer une probabilité.`,
                                    code: `probs = best_svm.predict_proba(X_test)
probs_classe_1 = probs[:, 1]

print("--- Probabilités SVM (Classe 1) ---")
print(probs_classe_1[:5])`
                                }
                            ]
                        },
                        {
                            id: 'perceptron',
                            title: 'Perceptron',
                            description: 'L\'ancêtre des réseaux de neurones (Linéaire).',
                            level: 'intermediate',
                            tags: ['ml', 'classification', 'linear', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres Complets',
                                    markdown: `### 🧠 Le Perceptron Simple
Un classifieur linéaire simple qui apprend en ajustant ses poids erreur par erreur (SGD).
$$ f(x) = \\begin{cases} 1 & \\text{si } w \\cdot x + b > 0 \\\\ 0 & \\text{sinon} \\end{cases} $$
*   ⚠️ **Limitations** : Ne peut séparer que des problèmes *linéairement séparables* (pas de XOR). Pour des cas complexes, utilisez un **MLP (Multi-Layer Perceptron)**.`,
                                    code: `from sklearn.linear_model import Perceptron
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# penalty : 'l2' (Ridge), 'l1' (Lasso), ou 'elasticnet' pour régulariser
# alpha : force de la régularisation
# max_iter : nombre de passes sur les données
# tol : seuil d'arrêt si l'erreur ne diminue plus
perc_full = make_pipeline(
    StandardScaler(),
    Perceptron(
        penalty='l2',        
        alpha=0.0001,
        max_iter=1000,
        tol=1e-3,
        random_state=42,
        class_weight='balanced',
        eta0=1.0             # Learning rate initial
    )
)
perc_full.fit(X_train, y_train)`
                                },
                                {
                                    title: '2. Grid Search',
                                    code: `from sklearn.model_selection import GridSearchCV

param_grid = {
    'perceptron__penalty': ['l2', 'l1', 'elasticnet', None],
    'perceptron__alpha': [0.0001, 0.001, 0.01, 0.1],
    'perceptron__max_iter': [1000, 2000]
}

grid = GridSearchCV(
    perc_full,
    param_grid,
    cv=5,
    scoring='f1_macro',
    n_jobs=-1
)
grid.fit(X_train, y_train)

print(f"Meilleurs Params : {grid.best_params_}")
best_perc = grid.best_estimator_`
                                },
                                {
                                    title: '3. Feature Importance (Poids)',
                                    markdown: `### ⚖️ Poids des coefficients
Le Perceptron étant un modèle linéaire, l'importance est directement liée à la valeur absolue des coefficients (si les données sont standardisées).`,
                                    code: `import pandas as pd
import matplotlib.pyplot as plt

# Accès au modèle dans le pipeline
model = best_perc.named_steps['perceptron']

# Les coefficients sont dans model.coef_
# (Pour une classification binaire, coef_ est de forme [1, n_features])
coeffs = pd.Series(model.coef_[0], index=X_train.columns)

# Importance = Valeur absolue (magnitude de l'impact)
importance = coeffs.abs().sort_values(ascending=False)

print(importance.head(5))

# Visualisation (avec le signe pour voir la direction)
plt.figure(figsize=(10, 6))
coeffs.sort_values().plot(kind='barh')
plt.title("Poids des Coefficients (Signe = Direction)")
plt.show()`
                                },
                                {
                                    title: '4. SHAP (LinearExplainer)',
                                    markdown: `### ⚡ SHAP & Modèles Linéaires
Pour les modèles linéaires, on peut utiliser \`LinearExplainer\`.
*   C'est très rapide et exact.
*   Note : Souvent \`shap_values\` est directement proportionnel à \`coef_ * (x - mean)\`.`,
                                    code: `import shap

# Modèle linéaire + Données Standardisées
model = best_perc.named_steps['perceptron']
X_test_scaled = best_perc.named_steps['standardscaler'].transform(X_test)

# LinearExplainer est optimisé pour ces modèles
explainer = shap.LinearExplainer(model, X_train_scaled) # X_train_scaled si possible pour background

shap_values = explainer.shap_values(X_test_scaled)

# Beeswarm
shap.summary_plot(shap_values, X_test_scaled, feature_names=X_test.columns)`
                                },
                                {
                                    title: '5. Probabilités (Note)',
                                    markdown: `### ⚠️ Pas de predict_proba natif
Le Perceptron standard est un classifieur binaire strict (0 ou 1) basé sur le signe.
Il ne produit pas de probabilités fiables.
On peut regarder la **fonction de décision** (Distance à l'hyperplan).`,
                                    code: `# Pas de predict_proba() sur Perceptron standard sauf si calibré
# On regarde la distance signée (plus c'est grand, plus c'est confiant)
scores = best_perc.decision_function(X_test)

print("--- Scores de Décision (Distance) ---")
print(scores[:5])`
                                }
                            ]
                        },
                        {
                            id: 'xgboost',
                            title: 'XGBoost (Gradient Boosting)',
                            description: 'La star des compétitions Kaggle.',
                            level: 'advanced',
                            tags: ['ml', 'classification', 'boosting', 'xgboost'],
                            cells: [
                                {
                                    title: '1. Paramètres Complets',
                                    markdown: `### 🚀 eXtreme Gradient Boosting
Amélioration du Gradient Boosting (GBM). Il construit des arbres séquentiellement, chaque arbre corrigeant les erreurs des précédents.

*   ✅ **Performance** : Souvent l'état de l'art sur données tabulaires.
*   ✅ **Vitesse** : Optimisé (parallélisation, cache).
*   ✅ **Régularisation** : Intègre L1/L2 pour éviter l'overfitting.`,
                                    code: `from xgboost import XGBClassifier
import pandas as pd

# n_estimators : Nombre de boosts (arbres)
# learning_rate (eta) : Réduit l'impact de chaque arbre (éviter overfitting)
# max_depth : Profondeur des arbres (souvent faible pour le boosting, ex: 3-6)
# subsample : % de lignes utilisées pour chaque arbre
# colsample_bytree : % de colonnes utilisées pour chaque arbre
# scale_pos_weight : Pour gérer le déséquilibre de classes (sum(neg) / sum(pos))
xgb_full = XGBClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=5,
    subsample=0.8,
    colsample_bytree=0.8,
    gamma=0,                # Réduction min de perte pour partitionner
    reg_alpha=0,            # Régularisation L1
    reg_lambda=1,           # Régularisation L2
    objective='binary:logistic',
    eval_metric='logloss',
    early_stopping_rounds=50, # Arrête si le score validation ne monte plus
    n_jobs=-1,
    random_state=42,
    scale_pos_weight=1      # Augmenter si classe 1 minoritaire
)

# Important : XGBoost a besoin d'un set de validation pour l'early_stopping
xgb_full.fit(
    X_train, y_train, 
    eval_set=[(X_test, y_test)], 
    verbose=False
)`
                                },
                                {
                                    title: '2. Grid Search (Optimisation)',
                                    code: `from sklearn.model_selection import GridSearchCV

# Paramètres à tuner en priorité
param_grid = {
    'n_estimators': [100, 500],
    'learning_rate': [0.01, 0.1],
    'max_depth': [3, 5, 7],
    'subsample': [0.8, 1.0],
    'colsample_bytree': [0.8, 1.0]
}

# Note : On désactive early_stopping_rounds ici pour simplifier scikit-learn grid search
# ou on le passe dans fit_params si nécessaire via le pipeline
xgb_grid = GridSearchCV(
    XGBClassifier(random_state=42, n_jobs=-1, use_label_encoder=False, eval_metric='logloss'),
    param_grid,
    cv=3,
    scoring='f1_macro',
    n_jobs=-1
)
xgb_grid.fit(X_train, y_train)

print(f"Meilleurs Params : {xgb_grid.best_params_}")
best_xgb = xgb_grid.best_estimator_`
                                },
                                {
                                    title: '3. Feature Importance',
                                    markdown: `### 📊 Importance (Gain/Poids)
XGBoost offre plusieurs métriques d'importance.
*   **Gain** : Amélioration moyenne de la précision apportée par la feature. (La meilleure par défaut).
*   **Weight** : Nombre de fois où la feature est utilisée pour splitter.`,
                                    code: `import xgboost as xgb
import matplotlib.pyplot as plt

# A. Via l'API Plotting de XGBoost (Très pratique)
# importance_type='gain' (qualité) ou 'weight' (fréquence)
xgb.plot_importance(best_xgb, importance_type='gain', max_num_features=10, height=0.5)
plt.title("XGBoost Feature Importance (Gain)")
plt.show()

# B. Via Pandas
imp_gain = best_xgb.get_booster().get_score(importance_type='gain')
df_imp = pd.Series(imp_gain).sort_values(ascending=False)
print(df_imp.head(5))`
                                },
                                {
                                    title: '4. SHAP Values',
                                    markdown: `### ⚡ SHAP & XGBoost
XGBoost et SHAP sont parfaitement intégrés (TreeExplainer est optimisé pour XGBoost).
C'est souvent le combo gagnant pour l'interprétabilité des "Black Boxes".`,
                                    code: `import shap

# 1. Explainer
explainer = shap.TreeExplainer(best_xgb)

# 2. SHAP Values
shap_values = explainer.shap_values(X_test)

# 3. Visualisation
# Summary Plot
shap.summary_plot(shap_values, X_test)`
                                },
                                {
                                    title: '5. Visualisation & Probabilités',
                                    markdown: `### 🌳 Voir l'arbre XGBoost
XGBoost possède sa propre fonction \`plot_tree\` optimisée.`,
                                    code: `import xgboost as xgb
import matplotlib.pyplot as plt

# 1. Visualiser le premier arbre du boosting
# num_trees=0 (Le premier arbre), 1, 2...
plt.figure(figsize=(20, 10))
xgb.plot_tree(best_xgb, num_trees=0, rankdir='LR') # LR = Left-Right
plt.title("Premier Arbre du XGBoost")
plt.show()

# 2. Probabilités
probs = best_xgb.predict_proba(X_test)
probs_classe_1 = probs[:, 1]

print("--- Score de Confiance (Probabilités) ---")
print(probs_classe_1[:5])`
                                }
                            ]
                        },
                        {
                            id: 'lightgbm',
                            title: 'LightGBM (Microsoft)',
                            description: 'Plus rapide et léger que XGBoost.',
                            level: 'advanced',
                            tags: ['ml', 'classification', 'boosting', 'lightgbm'],
                            cells: [
                                {
                                    title: '1. Paramètres & Différences',
                                    markdown: `### 🍃 Leaf-wise vs Level-wise
Contrairement à XGBoost (qui grandit par niveau/profondeur), LightGBM grandit par **feuille** (Leaf-wise).
*   Il choisit la feuille qui réduit le plus la perte, quitte à faire un arbre asymétrique.
*   🚀 **Avantage** : Beaucoup plus rapide (histogram-based) et souvent plus précis.
*   ⚠️ **Risque** : Sur-apprentissage si on ne limite pas la profondeur (\`max_depth\`).`,
                                    code: `from lightgbm import LGBMClassifier
import pandas as pd

# num_leaves : Paramètre PRINCIPAL (contrôle la complexité). ~ 2^max_depth.
# max_depth : À limiter pour éviter l'overfitting (-1 = illimité).
# learning_rate : Comme XGBoost.
# min_child_samples : Minimum de data dans une feuille (pour éviter d'isoler des points uniques).
lgbm = LGBMClassifier(
    num_leaves=31,          # Standard par défaut
    max_depth=-1,
    learning_rate=0.05,
    n_estimators=1000,
    subsample=0.8,          # = bagging_fraction
    colsample_bytree=0.8,   # = feature_fraction
    random_state=42,
    n_jobs=-1,
    class_weight='balanced'
)

# Note: early_stopping_rounds est géré différemment selon version sklearn API
lgbm.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    eval_metric='logloss'
)`
                                },
                                {
                                    title: '2. Grid Search',
                                    code: `from sklearn.model_selection import GridSearchCV

# LightGBM est très sensible à num_leaves et min_child_samples
param_grid = {
    'num_leaves': [20, 31, 50],
    'max_depth': [-1, 10, 20],
    'learning_rate': [0.01, 0.05, 0.1],
    'min_child_samples': [20, 50]
}

grid = GridSearchCV(
    LGBMClassifier(random_state=42, n_jobs=-1),
    param_grid,
    cv=3,
    scoring='f1_macro'
)
grid.fit(X_train, y_train)

print(f"Meilleurs Params : {grid.best_params_}")
best_lgbm = grid.best_estimator_`
                                },
                                {
                                    title: '3. Feature Importance (Split vs Gain)',
                                    markdown: `### 📊 Split vs Gain
LightGBM distingue clairement :
*   **Split (défaut)** : Combien de fois la feature est utilisée.
*   **Gain** : Combien d'information elle apporte (souvent plus pertinent).`,
                                    code: `import lightgbm as lgb
import matplotlib.pyplot as plt

# Plot importance (par défaut split)
lgb.plot_importance(best_lgbm, importance_type='split', title='Feature Importance (Split)', max_num_features=10)
plt.show()

# Plot importance (Gain)
lgb.plot_importance(best_lgbm, importance_type='gain', title='Feature Importance (Gain)', max_num_features=10)
plt.show()`
                                },
                                {
                                    title: '4. SHAP (TreeExplainer)',
                                    markdown: `### ⚡ SHAP Optimisé
Comme XGBoost, LightGBM est compatible avec l'optimisation TreeExplainer.`,
                                    code: `import shap

explainer = shap.TreeExplainer(best_lgbm)
shap_values = explainer.shap_values(X_test)

# Attention : Pour la classification binaire, shap_values peut être une liste [class0, class1]
# ou un tableau unique selon la version. Vérifiez la shape.
if isinstance(shap_values, list):
    vals = shap_values[1]
else:
    vals = shap_values

shap.summary_plot(vals, X_test)`
                                },
                                {
                                    title: '5. Probabilités',
                                    markdown: `### 🎯 Probabilités LightGBM
Comme XGBoost, LightGBM fournit des scores de confiance très précis.`,
                                    code: `probs = best_lgbm.predict_proba(X_test)
probs_classe_1 = probs[:, 1]

print("--- Probabilités LightGBM (Classe 1) ---")
print(probs_classe_1[:5])`
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'unsupervised_classification',
                    title: '3. Classification Non Supervisée',
                    subCategory: 'Machine Learning',
                    displayMode: 'list',
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
$$ d(A, B) = 1 - \\frac{ A \\cdot B }{|| A || \\times || B ||} $$`
                        },
                        {
                            id: 'kmeans',
                            title: 'K-Means (K-Moyennes)',
                            description: 'Partitionnement itératif (Centroids).',
                            level: 'advanced',
                            tags: ['ml', 'clustering', 'kmeans', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres & Algo',
                                    markdown: `### 🎯 Trouver les Centres
L'algorithme cherche à minimiser l' **Inertie Intra-Classe** (Variance au sein des clusters).
$$ I = \\sum_{ k=1 } ^ { K } \\sum_{ x_i \\in C_k } || x_i - \\mu_k ||^ 2 $$

*   \`n_clusters\` (K) : Nombre de groupes (indispensable !).
*   \`n_init\` : Nombre de relances avec des centres différents (pour éviter les minima locaux).
*   ⚠️ **Sensible** : Aux outliers et à l'échelle (StandardScaler obligatoire).`,
                                    code: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# StandardScaler est vital pour les distances euclidiennes
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# n_init='auto' (ou 10) : Lance l'algo 10 fois et garde le meilleur résultat
kmeans = KMeans(
    n_clusters=3, 
    init='k-means++', 
    n_init=10, 
    random_state=42
)
kmeans.fit(X_scaled)

# Les labels (0, 1, 2...) pour chaque point
labels = kmeans.labels_
# Les coordonnées des centres
centers = kmeans.cluster_centers_`
                                },
                                {
                                    title: '2. Trouver K (Elbow)',
                                    markdown: `### 🦾 La Méthode du Coude (Elbow)
Comment choisir K ? On trace l'inertie en fonction de K.
On cherche le point d'inflexion (le "coude") où le gain d'inertie commence à diminuer marginalement.`,
                                    code: `import matplotlib.pyplot as plt

inertias = []
K_range = range(1, 10)

for k in K_range:
    model = KMeans(n_clusters=k, n_init=10, random_state=42)
    model.fit(X_scaled)
    inertias.append(model.inertia_)

plt.figure(figsize=(8, 5))
plt.plot(K_range, inertias, 'bo-')
plt.xlabel('Nombre de Clusters K')
plt.ylabel('Inertie (Distances au carré)')
plt.title('Méthode du Coude (Elbow Method)')
plt.show()`
                                },
                                {
                                    title: '3. Silhouette Score',
                                    markdown: `### 👤 Coefficient de Silhouette
Mesure si un point est bien dans son cluster (proche de ses voisins) et loin des autres clusters.
*   **+1** : Parfait.
*   **0** : Frontière.
*   **-1** : Mauvais cluster.`,
                                    code: `from sklearn.metrics import silhouette_score

# On calcule le score pour le K choisi (ex: 3)
score = silhouette_score(X_scaled, kmeans.labels_)
print(f"Silhouette Score (K=3) : {score:.3f}")`
                                },
                                {
                                    title: '4. Visualisation',
                                    code: `import seaborn as sns

# On projette en 2D (si on a plus de 2 features, faire une PCA avant est mieux)
# Ici on suppose X a 2 colonnes pour l'exemple simple
X_df = pd.DataFrame(X_scaled, columns=['F1', 'F2'])
X_df['Cluster'] = kmeans.labels_

plt.figure(figsize=(10, 6))
sns.scatterplot(data=X_df, x='F1', y='F2', hue='Cluster', palette='viridis')
# Afficher les centres
plt.scatter(centers[:, 0], centers[:, 1], c='red', s=200, marker='X', label='Centroids')
plt.legend()
plt.title("Visualisation K-Means")
plt.show()`
                                }
                            ]
                        },
                        {
                            id: 'cah',
                            title: 'Classification Hiérarchique (CAH)',
                            description: 'Arbre de regroupement (Dendrogramme).',
                            level: 'advanced',
                            tags: ['ml', 'clustering', 'hierarchical', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres & Linkage',
                                    markdown: `### 🌳 Agglomerative Clustering
On part de N clusters (chaque point est seul) et on fusionne les plus proches.

**Critères de Lien (Linkage) :**
*   **Ward** (Défaut) : Minimise la variance interne (Clusters compacts).
*   **Single** : Distance min (Effet chaîne / serpent).
*   **Complete** : Distance max (Clusters sphériques).`,
                                    code: `from sklearn.cluster import AgglomerativeClustering

# affinity='euclidean' (ou 'manhattan', 'cosine' si linkage!='ward')
cah = AgglomerativeClustering(
    n_clusters=3, 
    metric='euclidean', # Remplace 'affinity' dans les versions récentes
    linkage='ward'
)
labels = cah.fit_predict(X_scaled)`
                                },
                                {
                                    title: '2. Dendrogramme',
                                    markdown: `### 🧬 Le Dendrogramme
Sert à visualiser la hiérarchie et **choisir le nombre de clusters** (en coupant l'arbre horizontalement).`,
                                    code: `import scipy.cluster.hierarchy as sch
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 6))
# 'ward' minimise la variance intra-cluster
dendrogram = sch.dendrogram(sch.linkage(X_scaled, method='ward'))
plt.title('Dendrogramme')
plt.xlabel('Points')
plt.ylabel('Distance euclidienne')
plt.axhline(y=10, color='r', linestyle='--') # Exemple de ligne de coupe
plt.show()`
                                },
                                {
                                    title: '3. Clusters vs KMeans',
                                    markdown: `### 🆚 CAH vs K-Means
*   **K-Means** : Rapide, mais aléatoire (besoin de n_init) et suppose des formes sphériques.
*   **CAH** : Déterministe, pas besoin de K au départ (on le choisit après dendrogramme), mais très lent $O(N^3)$ sur gros datasets.`,
                                    code: `# Pas de code spécifique, cf visualisation précédente`
                                }
                            ]
                        },
                        {
                            id: 'dbscan',
                            title: 'DBSCAN (Densité)',
                            description: 'Idéal pour le bruit et les formes complexes.',
                            level: 'advanced',
                            tags: ['ml', 'clustering', 'dbscan', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Paramètres & Algo',
                                    markdown: `### 🪐 Density-Based Spatial Clustering
DBSCAN ne cherche pas des "boules" (comme K-Means) mais des zones de forte densité.
Il propage les clusters tant qu'il y a assez de points voisins.

*   **Avantages** :
    *   Trouve le nombre de clusters tout seul.
    *   Détecte le **Bruit** (points isolés = label -1).
    *   Gère les formes en "banane" ou "cercle dans un cercle".

**Paramètres Clés :**
*   \`eps\` (Epsilon) : Rayon de voisinage (La distance max pour être voisin).
*   \`min_samples\` : Nombre min de voisins dans ce rayon pour être un "cœur" (Core Point).`,
                                    code: `from sklearn.cluster import DBSCAN
from sklearn.neighbors import NearestNeighbors
import matplotlib.pyplot as plt

# eps est CRITIQUE. S'il est mal choisi -> Tout en bruit (-1) ou 1 seul cluster.
# min_samples : Souvent 2 * nb_features
db = DBSCAN(eps=0.5, min_samples=5)

# Adapter aux données scalées !
labels = db.fit_predict(X_scaled)

# Compter les clusters (le bruit est -1)
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise = list(labels).count(-1)

print(f"Clusters: {n_clusters}, Bruit: {n_noise}")`
                                },
                                {
                                    title: '2. Trouver Epsilon (K-Dist)',
                                    markdown: `### 📏 Méthode du K-Distance Graph
Pour trouver le bon \`eps\`, on calcule la distance au k-ième voisin pour chaque point, on trie et on cherche le "coude".
*   L'axe Y au niveau du coude donne une bonne valeur pour \`eps\`.`,
                                    code: `import numpy as np

# On prend k = min_samples
neighbors = NearestNeighbors(n_neighbors=5)
neighbors_fit = neighbors.fit(X_scaled)
distances, indices = neighbors_fit.kneighbors(X_scaled)

# On trie les distances (colonne des 5èmes voisins)
distances = np.sort(distances[:, 4], axis=0)

plt.figure(figsize=(10, 5))
plt.plot(distances)
plt.title("K-Distance Graph (Chercher le coude pour eps)")
plt.xlabel("Points triés par distance")
plt.ylabel("Epsilon (Distance au 5ème voisin)")
plt.grid()
plt.show()`
                                },
                                {
                                    title: '3. Visualisation',
                                    markdown: `### ⚫ Les Points Noirs (Bruit)
DBSCAN est génial pour nettoyer un dataset en isolant les outliers avant une modélisation supervisée.`,
                                    code: `import seaborn as sns

# On visualise (le bruit est souvent en couleur distincte ou noir)
X_df = pd.DataFrame(X_scaled, columns=['F1', 'F2'])
X_df['Cluster'] = labels

plt.figure(figsize=(10, 6))
# Palette qualitative + couleur sombre pour -1 si possible
sns.scatterplot(data=X_df, x='F1', y='F2', hue='Cluster', palette='tab10', style=(labels == -1))
plt.title(f"DBSCAN : {n_clusters} Clusters + Bruit")
plt.show()`
                                }
                            ]
                        },
                        {
                            id: 'kohonen',
                            title: 'Réseau de Kohonen (SOM)',
                            description: 'Carte Auto-Organisatrice (MiniSom).',
                            level: 'expert',
                            tags: ['ml', 'clustering', 'som', 'neural-network'],
                            cells: [
                                {
                                    title: '1. Paramètres & Concept',
                                    markdown: `### 🗺️ Self-Organizing Map (SOM)
Un réseau de neurones non supervisé qui projette des données de haute dimension sur une carte 2D (grille), en préservant la **topologie** (les voisins restent voisins).

*   **Learning Rate** : Vitesse d'adaptation (diminue avec le temps).
*   **Sigma** : Rayon d'influence (diminue avec le temps).
*   Nécessite souvent une librairie externe comme \`minisom\`.`,
                                    code: `# pip install minisom
from minisom import MiniSom

# Grille de 10x10 neurones
# input_len = nombre de features (colonnes) de X
som = MiniSom(x=10, y=10, input_len=X.shape[1], sigma=1.0, learning_rate=0.5)

# Initialisation aléatoire
som.random_weights_init(X_scaled)

# Entraînement (1000 itérations)
print("Training...")
som.train_random(X_scaled, 1000)`
                                },
                                {
                                    title: '2. Visualisation (U-Matrix)',
                                    markdown: `### 🏔️ U-Matrix (Unified Distance Matrix)
Elle représente la distance moyenne entre chaque neurone et ses voisins.
*   **Zones Claires** : Faible distance = Cluster dense (vallée).
*   **Zones Sombres** : Forte distance = Frontière entre clusters (montagne).`,
                                    code: `from pylab import bone, pcolor, colorbar, plot, show

plt.figure(figsize=(10, 10))
bone() # Fond blanc/gris
pcolor(som.distance_map().T) # U-Matrix transposée
colorbar() # Légende des distances

# On peut ajouter les points par dessus pour voir où ils tombent
# markers = ['o', 's'], colors = ['r', 'g'] (si on a des labels y pour vérifier)
plt.title('Self-Organizing Map (U-Matrix)')
show()`
                                },
                                {
                                    title: '3. Winning Node',
                                    markdown: `Chaque donnée "active" un neurone gagnant (BMU - Best Matching Unit).`,
                                    code: `# Trouver les coordonnées du neurone gagnant pour la première donnée
w_x, w_y = som.winner(X_scaled[0])
print(f"La donnée 0 est mappée sur le neurone : ({w_x}, {w_y})")`
                                }
                            ]
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
                            description: 'Visualiser les erreurs (TP et FP).',
                            level: 'advanced',
                            tags: ['ml', 'metrics', 'viz', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Comprendre la Matrice',
                                    markdown: `### 🚦 Diagonale et Erreurs
Elle compare les prédictions (Colonnes) à la réalité (Lignes).

| | **Prédit NON** (0) | **Prédit OUI** (1) |
| :--- | :--- | :--- |
| **Réel NON** (0) | **TN** (Vrai Négatif) <br> *Silence radio.* ✅ | **FP** (Faux Positif) <br> *Alarme pour rien.* 😱 |
| **Réel OUI** (1) | **FN** (Faux Négatif) <br> *Danger non détecté.* ☠️ | **TP** (Vrai Positif) <br> *Danger détecté.* ✅ |

*   **Précision** (La qualité des alarmes) : $TP / (TP + FP)$
*   **Rappel** (La quantité de dangers trouvés) : $TP / (TP + FN)$`,
                                    code: `from sklearn.metrics import ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Affiche la matrice de confusion
# Permet de voir où le modèle se trompe (Faux Positifs vs Faux Négatifs)
ConfusionMatrixDisplay.from_estimator(model, X_test, y_test, cmap='Blues')
plt.title("Matrice de Confusion")
plt.show()`
                                }
                            ]
                        },
                        {
                            id: 'roc_curve',
                            title: 'Courbe ROC & AUC',
                            description: 'Comprendre la performance binaire.',
                            level: 'advanced',
                            tags: ['ml', 'metrics', 'viz', 'sklearn'],
                            cells: [
                                {
                                    title: '1. Concept : TPR vs FPR',
                                    markdown: `### ⚖️ Le Compromis
La courbe ROC visualise le compromis entre :
*   **TPR (True Positive Rate)** : Capacité à trouver les coupables (Rappel).
*   **FPR (False Positive Rate)** : Risque d'accuser des innocents (Fausses Alarmes).

**Analogie Aéroport ✈️** :
*   **Seuil bas (Laxiste)** : On ne fouille personne. TPR=0 (On rate les armes), FPR=0 (Personne n'est embêté).
*   **Seuil haut (Parano)** : On fouille tout le monde. TPR=1 (On trouve tout), FPR=1 (Tout le monde est embêté).
*   **La Courbe** : Montre comment le modèle évolue entre ces deux extrêmes. On veut que la courbe monte vite vers le haut (TPR augmente) sans aller vers la droite (FPR reste bas).`,
                                    code: `from sklearn.metrics import RocCurveDisplay
import matplotlib.pyplot as plt

# Affiche la courbe ROC
# Le modèle doit passer par .decision_function() ou .predict_proba()
RocCurveDisplay.from_estimator(model, X_test, y_test)

# La ligne rouge représente le hasard (AUC = 0.5)
plt.plot([0, 1], [0, 1], 'r--', label='Hasard (Pile ou Face)')
plt.title("Courbe ROC : Plus c'est bombé, mieux c'est !")
plt.legend()
plt.show()`
                                },
                                {
                                    title: '2. Interprétation AUC',
                                    markdown: `### 🏅 Le Score AUC (Area Under Curve)
L'aire sous la courbe résume la performance en un seul chiffre.

| Score AUC | Interprétation |
| :--- | :--- |
| **0.5** | 🎲 **Hasard complet**. Le modèle ne sert à rien. |
| **0.6 - 0.7** | 😐 **Moyen**. Capte un signal faible. |
| **0.7 - 0.8** | 🙂 **Bon**. Standard pour des données complexes. |
| **0.8 - 0.9** | 🤩 **Excellent**. Très performant. |
| **> 0.95** | 🚨 **Suspect**. Trop beau pour être vrai ? Vérifiez le Data Leakage ! |`,
                                    code: `from sklearn.metrics import roc_auc_score

# Calcul du score brut
# Attention : on passe les PROBABILITÉS (colonne 1), pas les classes (0/1)
y_prob = model.predict_proba(X_test)[:, 1]

auc = roc_auc_score(y_test, y_prob)
print(f"Score AUC : {auc:.3f}")

if auc > 0.9:
    print("Excellent modèle (ou fuite de données ?)")
elif auc > 0.7:
    print("Bon modèle.")
else:
    print("Modèle peu performant.")`
                                }
                            ]
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
                        },
                        {
                            id: 'regression_metrics_details',
                            title: 'Métriques de Régression',
                            level: 'advanced',
                            description: 'MAE, MSE, RMSE, R2.',
                            tags: ['ml', 'metrics', 'regression'],
                            cells: [
                                {
                                    title: '1. Les Formules',
                                    markdown: `### 📉 Évaluer une prédiction continue
Contrairement à la classification (Juste/Faux), en régression on mesure la **distance** de l'erreur.

#### 1. MAE (Mean Absolute Error)
$$ MAE = \\frac{1}{n} \\sum |y_{pred} - y_{true}| $$
*   La moyenne des erreurs brutes. Facile à interpréter (ex: "Je me trompe de 50€ en moyenne").

#### 2. MSE (Mean Squared Error)
$$ MSE = \\frac{1}{n} \\sum (y_{pred} - y_{true})^2 $$
*   Pénalise fortement les grosses erreurs (car mises au carré).

#### 3. RMSE (Root Mean Squared Error)
$$ RMSE = \\sqrt{MSE} $$
*   Comme la MSE, mais ramenée à l'unité d'origine (Euros, Mètres...). C'est la métrique standard.

#### 4. $R^2$ (Coefficient de Détermination)
$$ R^2 = 1 - \\frac{SSR}{SST} $$
*   Représente la **variance expliquée** par le modèle.
*   **1** = Parfait.
*   **0** = Aussi nul que de prédire la moyenne pour tout le monde.`
                                },
                                {
                                    title: '2. Code Scikit-Learn',
                                    code: `from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

# Exemple de calcul
y_true = [100, 200, 300]
y_pred = [110, 190, 320]

mae = mean_absolute_error(y_true, y_pred)
mse = mean_squared_error(y_true, y_pred)
rmse = np.sqrt(mse) # ou squared=False dans les versions récentes de sklearn
r2 = r2_score(y_true, y_pred)

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R2   : {r2:.4f}")`
                                }
                            ]
                        },
                        {
                            id: 'bias_variance',
                            title: 'Biais vs Variance',
                            level: 'expert',
                            description: 'Le compromis fondamental du ML.',
                            tags: ['ml', 'theory', 'bias-variance'],
                            cells: [
                                {
                                    title: '1. Théorie',
                                    markdown: `### 🎯 La Cible (Underfitting vs Overfitting)

L'erreur totale d'un modèle se décompose en 3 parties :
$$ Erreur = Biais^2 + Variance + Bruit $$

#### 1. Biais (Underfitting) 🐢
Le modèle est **trop simple**. Il rate la cible.
*   *Symptôme* : Mauvais score en Train ET en Test.
*   *Solution* : Modèle plus complexe, plus de features.

#### 2. Variance (Overfitting) 🐰
Le modèle est **trop complexe**. Il apprend le bruit par cœur.
*   *Symptôme* : Excellent score en Train, mais mauvais en Test.
*   *Solution* : Simplifier le modèle, Régularisation (L1/L2), Plus de données.

#### 3. L'Optimum
On cherche le point d'équilibre où l'erreur totale (Test) est minimale.`
                                },
                                {
                                    title: '2. Learning Curve',
                                    code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import learning_curve
from sklearn.tree import DecisionTreeClassifier

# Visualiser la courbe d'apprentissage (Learning Curve)
# Permet de diagnostiquer Biais vs Variance
# (Note: X et y doivent être définis)
train_sizes, train_scores, test_scores = learning_curve(
    DecisionTreeClassifier(max_depth=5), # Essayer max_depth=1 (Biais) vs 20 (Variance)
    X, y, 
    cv=5, 
    scoring='accuracy',
    n_jobs=-1,
    train_sizes=np.linspace(0.1, 1.0, 5)
)

# Moyennes et écarts-types
train_mean = np.mean(train_scores, axis=1)
test_mean = np.mean(test_scores, axis=1)

plt.figure(figsize=(8, 5))
plt.plot(train_sizes, train_mean, 'o-', color="r", label="Score Train")
plt.plot(train_sizes, test_mean, 'o-', color="g", label="Score Validation")
plt.title("Courbe d'Apprentissage (Learning Curve)")
plt.xlabel("Taille du Dataset")
plt.ylabel("Accuracy")
plt.legend(loc="best")
plt.grid()
plt.show()`
                                }
                            ]
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
                    id: 'examples',
                    title: '10. Exemples',
                    subCategory: 'Astuces',
                    description: 'Fonctions utiles pour des tâches courantes.',
                    language: 'python',
                    snippets: [
                        {
                            language: 'python',
                            id: 'remove_accents',
                            title: 'Supprimer les Accents',
                            description: 'Supprimer les accents d\'une chaîne de caractères.',
                            level: 'intermediate',
                            tags: ['string', 'text', 'unicode'],
                            code: `import unicodedata

def remove_accents(text):
    """
    Supprime les accents d'une chaîne de caractères.
    
    Args:
        text (str): Le texte à traiter.
    
    Returns:
        str: Le texte sans accents.
    """
    # Normalise en NFD (décompose les caractères accentués)
    text_nfd = unicodedata.normalize('NFD', text)
    # Filtre les caractères de combinaison (accents)
    return ''.join(char for char in text_nfd if unicodedata.category(char) != 'Mn')

# Exemple
print(remove_accents("Éléphant"))  # "Elephant"
print(remove_accents("Café crème"))  # "Cafe creme"`
                        },
                        {
                            language: 'python',
                            id: 'remove_duplicates_preserve_order',
                            title: 'Supprimer Doublons (Ordre Préservé)',
                            description: 'Supprimer les doublons en gardant l\'ordre d\'apparition.',
                            level: 'intermediate',
                            tags: ['list', 'collections', 'duplicates'],
                            code: `def remove_duplicates_preserve_order(items):
    """
    Supprime les doublons d'une liste en préservant l'ordre.
    
    Args:
        items (list): La liste à traiter.
    
    Returns:
        list: Liste sans doublons.
    """
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

# Exemple
nombres = [1, 2, 2, 3, 1, 4, 3, 5]
print(remove_duplicates_preserve_order(nombres))  # [1, 2, 3, 4, 5]`
                        },
                        {
                            language: 'python',
                            id: 'find_common_elements',
                            title: 'Éléments Communs',
                            description: 'Trouver les éléments communs entre plusieurs listes.',
                            level: 'beginner',
                            tags: ['list', 'set', 'intersection'],
                            code: `def find_common_elements(*lists):
    """
    Trouve les éléments communs à toutes les listes.
    
    Args:
        *lists: Nombre variable de listes.
    
    Returns:
        set: Ensemble des éléments communs.
    """
    if not lists:
        return set()
    
    # Commence avec la première liste convertie en set
    common = set(lists[0])
    
    # Intersection avec chaque liste suivante
    for lst in lists[1:]:
        common &= set(lst)
    
    return common

# Exemple
liste1 = [1, 2, 3, 4, 5]
liste2 = [3, 4, 5, 6, 7]
liste3 = [4, 5, 6, 8]
print(find_common_elements(liste1, liste2, liste3))  # {4, 5}`
                        },
                        {
                            language: 'python',
                            id: 'days_between_dates',
                            title: 'Jours Entre Deux Dates',
                            description: 'Calculer le nombre de jours entre deux dates.',
                            level: 'beginner',
                            tags: ['datetime', 'dates', 'calculation'],
                            code: `from datetime import datetime

def days_between_dates(date1, date2):
    """
    Calcule le nombre de jours entre deux dates.
    
    Args:
        date1 (str ou datetime): Première date.
        date2 (str ou datetime): Deuxième date.
    
    Returns:
        int: Nombre de jours (absolu).
    """
    # Convertir en datetime si nécessaire
    if isinstance(date1, str):
        date1 = datetime.strptime(date1, "%Y-%m-%d")
    if isinstance(date2, str):
        date2 = datetime.strptime(date2, "%Y-%m-%d")
    
    return abs((date2 - date1).days)

# Exemple
print(days_between_dates("2024-01-01", "2024-12-31"))  # 365
print(days_between_dates(datetime(2024, 1, 1), datetime(2024, 1, 15)))  # 14`
                        },
                        {
                            language: 'python',
                            id: 'is_weekend',
                            title: 'Vérifier Weekend',
                            description: 'Vérifier si une date est un weekend.',
                            level: 'beginner',
                            tags: ['datetime', 'dates', 'validation'],
                            code: `from datetime import datetime

def is_weekend(date):
    """
    Vérifie si une date tombe un weekend (samedi ou dimanche).
    
    Args:
        date (str ou datetime): La date à vérifier.
    
    Returns:
        bool: True si weekend, False sinon.
    """
    if isinstance(date, str):
        date = datetime.strptime(date, "%Y-%m-%d")
    
    # weekday(): 0=Lundi, ..., 5=Samedi, 6=Dimanche
    return date.weekday() >= 5

# Exemple
print(is_weekend("2024-12-07"))  # Samedi -> True
print(is_weekend("2024-12-09"))  # Lundi -> False`
                        },
                        {
                            language: 'python',
                            id: 'get_next_business_day',
                            title: 'Prochain Jour Ouvrable',
                            description: 'Obtenir le prochain jour ouvrable (lundi-vendredi).',
                            level: 'intermediate',
                            tags: ['datetime', 'dates', 'business'],
                            code: `from datetime import datetime, timedelta

def get_next_business_day(date=None):
    """
    Obtient le prochain jour ouvrable.
    
    Args:
        date (datetime, optional): Date de départ. Par défaut aujourd'hui.
    
    Returns:
        datetime: Prochain jour ouvrable.
    """
    if date is None:
        date = datetime.now()
    
    # Ajouter 1 jour
    next_day = date + timedelta(days=1)
    
    # Si c'est samedi (5) ou dimanche (6), sauter au lundi
    while next_day.weekday() >= 5:
        next_day += timedelta(days=1)
    
    return next_day

# Exemple
vendredi = datetime(2024, 12, 6)  # Vendredi
print(get_next_business_day(vendredi))  # Lundi 2024-12-09`
                        },
                        {
                            language: 'python',
                            id: 'format_relative_time',
                            title: 'Temps Relatif',
                            description: 'Formater un temps relatif ("il y a 2 heures").',
                            level: 'intermediate',
                            tags: ['datetime', 'formatting', 'humanize'],
                            code: `from datetime import datetime, timedelta

def format_relative_time(date):
    """
    Formate une date en temps relatif.
    
    Args:
        date (datetime): La date à formater.
    
    Returns:
        str: Temps relatif (ex: "il y a 2 heures").
    """
    now = datetime.now()
    diff = now - date
    
    seconds = diff.total_seconds()
    
    if seconds < 60:
        return "à l'instant"
    elif seconds < 3600:
        minutes = int(seconds / 60)
        return f"il y a {minutes} minute{'s' if minutes > 1 else ''}"
    elif seconds < 86400:
        hours = int(seconds / 3600)
        return f"il y a {hours} heure{'s' if hours > 1 else ''}"
    elif seconds < 604800:
        days = int(seconds / 86400)
        return f"il y a {days} jour{'s' if days > 1 else ''}"
    else:
        return date.strftime("%d/%m/%Y")

# Exemple
print(format_relative_time(datetime.now() - timedelta(minutes=30)))  # "il y a 30 minutes"
print(format_relative_time(datetime.now() - timedelta(hours=3)))  # "il y a 3 heures"`
                        },
                        {
                            language: 'python',
                            id: 'is_valid_email',
                            title: 'Valider Email',
                            description: 'Valider une adresse email (regex simple).',
                            level: 'intermediate',
                            tags: ['validation', 'regex', 'email'],
                            code: `import re

def is_valid_email(email):
    """
    Valide une adresse email avec une regex simple.
    
    Args:
        email (str): L'adresse email à valider.
    
    Returns:
        bool: True si valide, False sinon.
    """
    # Regex simple pour email
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

# Exemple
print(is_valid_email("user@example.com"))  # True
print(is_valid_email("invalid.email"))  # False
print(is_valid_email("test@domain"))  # False`
                        },
                        {
                            language: 'python',
                            id: 'is_valid_phone',
                            title: 'Valider Téléphone',
                            description: 'Valider un numéro de téléphone français.',
                            level: 'intermediate',
                            tags: ['validation', 'regex', 'phone'],
                            code: `import re

def is_valid_phone(phone):
    """
    Valide un numéro de téléphone français.
    
    Args:
        phone (str): Le numéro à valider.
    
    Returns:
        bool: True si valide, False sinon.
    """
    # Regex pour numéros français (format 06/07 ou 01-05 + 8 chiffres)
    pattern = r'^0[1-7]([\\s.-]?\\d{2}){4}$'
    return re.match(pattern, phone) is not None

# Exemple
print(is_valid_phone("06 12 34 56 78"))  # True
print(is_valid_phone("01.23.45.67.89"))  # True
print(is_valid_phone("0612345678"))  # True
print(is_valid_phone("1234567890"))  # False`
                        },
                        {
                            language: 'python',
                            id: 'check_password_strength',
                            title: 'Force Mot de Passe',
                            description: 'Évaluer la force d\'un mot de passe.',
                            level: 'intermediate',
                            tags: ['validation', 'security', 'password'],
                            code: `import re

def check_password_strength(password):
    """
    Évalue la force d'un mot de passe.
    
    Args:
        password (str): Le mot de passe à évaluer.
    
    Returns:
        dict: Score et critères (longueur, majuscules, chiffres, symboles).
    """
    score = 0
    feedback = []
    
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Au moins 8 caractères requis")
    
    if re.search(r'[A-Z]', password):
        score += 1
    else:
        feedback.append("Ajouter des majuscules")
    
    if re.search(r'[a-z]', password):
        score += 1
    else:
        feedback.append("Ajouter des minuscules")
    
    if re.search(r'\\d', password):
        score += 1
    else:
        feedback.append("Ajouter des chiffres")
    
    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        score += 1
    else:
        feedback.append("Ajouter des symboles")
    
    strength = ["Très faible", "Faible", "Moyen", "Fort", "Très fort"][min(score, 4)]
    
    return {"score": score, "strength": strength, "feedback": feedback}

# Exemple
print(check_password_strength("motdepasse"))  # Faible
print(check_password_strength("MotDePasse123!"))  # Très fort`
                        },
                        {
                            language: 'python',
                            id: 'calculate_percentage',
                            title: 'Calculer Pourcentage',
                            description: 'Calculer un pourcentage avec gestion des erreurs.',
                            level: 'beginner',
                            tags: ['math', 'calculation', 'percentage'],
                            code: `def calculate_percentage(part, total, decimals=2):
    """
    Calcule un pourcentage.
    
    Args:
        part (float): La partie.
        total (float): Le total.
        decimals (int): Nombre de décimales.
    
    Returns:
        float: Le pourcentage ou 0 si total est 0.
    """
    if total == 0:
        return 0.0
    
    return round((part / total) * 100, decimals)

# Exemple
print(calculate_percentage(25, 100))  # 25.0
print(calculate_percentage(3, 7, 1))  # 42.9
print(calculate_percentage(10, 0))  # 0.0 (évite division par zéro)`
                        },
                        {
                            language: 'python',
                            id: 'round_to_nearest',
                            title: 'Arrondir au Plus Proche',
                            description: 'Arrondir à la valeur la plus proche (5, 10, etc.).',
                            level: 'beginner',
                            tags: ['math', 'rounding', 'calculation'],
                            code: `def round_to_nearest(value, base):
    """
    Arrondit une valeur au multiple le plus proche.
    
    Args:
        value (float): La valeur à arrondir.
        base (int): Le multiple (ex: 5, 10, 100).
    
    Returns:
        int: Valeur arrondie.
    """
    return int(base * round(value / base))

# Exemple
print(round_to_nearest(23, 5))  # 25
print(round_to_nearest(127, 10))  # 130
print(round_to_nearest(1234, 100))  # 1200`
                        },
                        {
                            language: 'python',
                            id: 'clamp',
                            title: 'Limiter Valeur (Clamp)',
                            description: 'Limiter une valeur entre min et max.',
                            level: 'beginner',
                            tags: ['math', 'constraint', 'range'],
                            code: `def clamp(value, min_val, max_val):
    """
    Limite une valeur entre min et max.
    
    Args:
        value: La valeur à limiter.
        min_val: Valeur minimale.
        max_val: Valeur maximale.
    
    Returns:
        La valeur limitée.
    """
    return max(min_val, min(value, max_val))

# Exemple
print(clamp(5, 0, 10))  # 5
print(clamp(-5, 0, 10))  # 0
print(clamp(15, 0, 10))  # 10`
                        },
                        {
                            language: 'python',
                            id: 'calculate_average',
                            title: 'Moyenne Sécurisée',
                            description: 'Calculer une moyenne avec gestion des erreurs.',
                            level: 'beginner',
                            tags: ['math', 'statistics', 'average'],
                            code: `def calculate_average(numbers):
    """
    Calcule la moyenne d'une liste de nombres.
    
    Args:
        numbers (list): Liste de nombres.
    
    Returns:
        float: La moyenne ou None si liste vide.
    """
    if not numbers:
        return None
    
    # Filtrer les valeurs non numériques
    valid_numbers = [n for n in numbers if isinstance(n, (int, float))]
    
    if not valid_numbers:
        return None
    
    return sum(valid_numbers) / len(valid_numbers)

# Exemple
print(calculate_average([10, 20, 30]))  # 20.0
print(calculate_average([]))  # None
print(calculate_average([5, "texte", 15]))  # 10.0 (ignore "texte")`
                        },
                        {
                            language: 'python',
                            id: 'retry_on_failure',
                            title: 'Décorateur Retry',
                            description: 'Décorateur pour réessayer une fonction en cas d\'échec.',
                            level: 'advanced',
                            tags: ['decorator', 'error-handling', 'retry'],
                            code: `import time
from functools import wraps

def retry_on_failure(max_attempts=3, delay=1):
    """
    Décorateur pour réessayer une fonction en cas d'échec.
    
    Args:
        max_attempts (int): Nombre maximum de tentatives.
        delay (int): Délai entre les tentatives (secondes).
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    print(f"Tentative {attempt}/{max_attempts} échouée: {e}")
                    
                    if attempt < max_attempts:
                        time.sleep(delay)
            
            print(f"Échec après {max_attempts} tentatives")
            raise last_exception
        
        return wrapper
    return decorator

# Exemple
@retry_on_failure(max_attempts=3, delay=2)
def fonction_instable():
    import random
    if random.random() < 0.7:
        raise ValueError("Erreur aléatoire")
    return "Succès !"

# fonction_instable()  # Réessaiera jusqu'à 3 fois`
                        },
                        {
                            language: 'python',
                            id: 'generate_random_string',
                            title: 'Chaîne Aléatoire Sécurisée',
                            description: 'Générer une chaîne aléatoire sécurisée.',
                            level: 'intermediate',
                            tags: ['random', 'security', 'string'],
                            code: `import secrets
import string

def generate_random_string(length=16, use_digits=True, use_punctuation=False):
    """
    Génère une chaîne aléatoire sécurisée.
    
    Args:
        length (int): Longueur de la chaîne.
        use_digits (bool): Inclure des chiffres.
        use_punctuation (bool): Inclure des symboles.
    
    Returns:
        str: Chaîne aléatoire.
    """
    alphabet = string.ascii_letters  # a-z, A-Z
    
    if use_digits:
        alphabet += string.digits  # 0-9
    
    if use_punctuation:
        alphabet += string.punctuation  # !@#$...
    
    return ''.join(secrets.choice(alphabet) for _ in range(length))

# Exemple
print(generate_random_string())  # "aB3xY9mK2pL7qN4t"
print(generate_random_string(8, use_punctuation=True))  # "aB3!x@9m"`
                        },
                        {
                            language: 'python',
                            id: 'celsius_to_fahrenheit',
                            title: 'Conversion Température',
                            description: 'Convertir Celsius en Fahrenheit et vice-versa.',
                            level: 'beginner',
                            tags: ['conversion', 'temperature', 'math'],
                            code: `def celsius_to_fahrenheit(celsius):
    """
    Convertit des degrés Celsius en Fahrenheit.
    
    Args:
        celsius (float): Température en Celsius.
    
    Returns:
        float: Température en Fahrenheit.
    """
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """
    Convertit des degrés Fahrenheit en Celsius.
    
    Args:
        fahrenheit (float): Température en Fahrenheit.
    
    Returns:
        float: Température en Celsius.
    """
    return (fahrenheit - 32) * 5/9

# Exemple
print(celsius_to_fahrenheit(0))  # 32.0
print(celsius_to_fahrenheit(100))  # 212.0
print(fahrenheit_to_celsius(32))  # 0.0
print(fahrenheit_to_celsius(98.6))  # 37.0`
                        }
                    ]
                },
                {
                    id: 'arrays',
                    title: '11. Tableaux (Arrays)',
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
                    title: '12. Opérations Mathématiques',
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

# 1. Mode Eager (Classique, comme Pandas)
# Charge TOUT en mémoire immédiatement.
df = pl.read_csv("data.csv") 
# ↑ Retourne directement un DataFrame

# 2. Mode Lazy (Recommandé pour gros fichiers)
# Ne charge RIEN. Crée un plan d'exécution.
# Permet de traiter des fichiers plus gros que la RAM.
q = pl.scan_csv("data.csv")
# ↑ Retourne un LazyFrame (pas encore de données en mémoire)

# IMPORTANT : q.collect() MATÉRIALISE le LazyFrame en DataFrame
# C'est SEULEMENT à ce moment que les données sont chargées en mémoire
df = q.collect()  # ← Maintenant df est un vrai DataFrame avec les données

# 💡 Bonne pratique : Enchaînez toutes vos transformations AVANT collect()
# Polars optimisera automatiquement l'ensemble des opérations
result = (
    pl.scan_csv("data.csv")
    .filter(pl.col("age") > 18)
    .select(["nom", "ville"])
    .collect()  # ← collect() toujours à la FIN
)

# Pour voir le plan d'exécution optimisé (avant collect) :
# q.explain()`
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
    S -->|Keep-Alive| B[Serveur]
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
    Client -->|Requete| FastAPI
    FastAPI -->|Check| Pydantic
    Pydantic -->|OK| Route(Fonction)
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
    participant C as Client
    participant F as FastAPI
    participant P as Pydantic
    
    C->>F: POST /items
    F->>P: Valider
    alt Invalide
        P-->>C: 422 Error
    else Valide
        P->>F: Data OK
        F-->>C: 200 OK
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
        },
        {
            id: 'bayesian_networks',
            archived: true,
            title: 'Réseaux Bayésiens',
            description: 'Modèles Graphiques Probabilistes avec pgmpy',
            categories: [
                {
                    id: 'bn_fundamentals',
                    title: '1. Fondamentaux',
                    description: 'Création de réseaux et tables de probabilités',
                    snippets: [
                        {
                            id: 'bn_install',
                            title: 'Installation de pgmpy',
                            description: 'Installer la bibliothèque pour les modèles graphiques probabilistes.',
                            level: 'beginner',
                            tags: ['pgmpy', 'installation', 'bayesian'],
                            code: `# Installation de pgmpy
# pip install pgmpy

# Imports de base
from pgmpy.models import BayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination

# Vérification de l'installation
import pgmpy
print(f"pgmpy version: {pgmpy.__version__}")`
                        },
                        {
                            id: 'bn_create_dag',
                            title: 'Créer un DAG (Graphe Orienté Acyclique)',
                            description: 'Définir la structure du réseau bayésien.',
                            level: 'intermediate',
                            tags: ['dag', 'structure', 'bayesian', 'pgmpy'],
                            markdown: `### Qu'est-ce qu'un DAG ?
Un **Directed Acyclic Graph** représente les relations causales entre variables.
- **Nœuds** = Variables aléatoires
- **Arêtes** = Relations de dépendance (Parent → Enfant)
- **Acyclique** = Pas de boucles

### Exemple : Réseau "Alarme"
\`\`\`
Cambriolage  Tremblement
     \\         /
      ↘       ↙
        Alarme
        /    \\
       ↓      ↓
    Jean     Marie
    appelle  appelle
\`\`\``,
                            code: `from pgmpy.models import BayesianNetwork

# Définition de la structure du réseau
# Format : liste de tuples (Parent, Enfant)
model = BayesianNetwork([
    ('Cambriolage', 'Alarme'),
    ('Tremblement', 'Alarme'),
    ('Alarme', 'JeanAppelle'),
    ('Alarme', 'MarieAppelle')
])

# Afficher les nœuds
print("Nœuds:", model.nodes())
# ['Cambriolage', 'Tremblement', 'Alarme', 'JeanAppelle', 'MarieAppelle']

# Afficher les arêtes
print("Arêtes:", model.edges())

# Parents d'un nœud
print("Parents de Alarme:", model.get_parents('Alarme'))
# ['Cambriolage', 'Tremblement']

# Enfants d'un nœud
print("Enfants de Alarme:", model.get_children('Alarme'))
# ['JeanAppelle', 'MarieAppelle']`
                        },
                        {
                            id: 'bn_cpd',
                            title: 'Tables de Probabilités Conditionnelles (CPT)',
                            description: 'Définir les probabilités P(Enfant | Parents).',
                            level: 'intermediate',
                            tags: ['cpd', 'cpt', 'probability', 'bayesian', 'pgmpy'],
                            markdown: `### CPT = Conditional Probability Table
Chaque nœud a une **table de probabilités conditionnelles** qui définit :
- P(Nœud | Parents) si le nœud a des parents
- P(Nœud) si c'est un nœud racine

### Structure d'une CPT
| Parent1 | Parent2 | P(Enfant=Oui) | P(Enfant=Non) |
|---------|---------|---------------|---------------|
| Oui     | Oui     | 0.95          | 0.05          |
| Oui     | Non     | 0.94          | 0.06          |
| Non     | Oui     | 0.29          | 0.71          |
| Non     | Non     | 0.001         | 0.999         |`,
                            code: `from pgmpy.factors.discrete import TabularCPD

# === CPT pour nœuds SANS parents (prior) ===
cpd_cambriolage = TabularCPD(
    variable='Cambriolage',
    variable_card=2,  # 2 états : [Non, Oui]
    values=[[0.999], [0.001]]  # P(Non)=0.999, P(Oui)=0.001
)

cpd_tremblement = TabularCPD(
    variable='Tremblement',
    variable_card=2,
    values=[[0.998], [0.002]]
)

# === CPT pour nœud AVEC parents ===
# P(Alarme | Cambriolage, Tremblement)
# Colonnes = combinaisons des parents
cpd_alarme = TabularCPD(
    variable='Alarme',
    variable_card=2,
    values=[
        # P(Alarme=Non | ...)
        [0.999, 0.71, 0.06, 0.05],
        # P(Alarme=Oui | ...)
        [0.001, 0.29, 0.94, 0.95]
    ],
    evidence=['Cambriolage', 'Tremblement'],
    evidence_card=[2, 2]
)
# Ordre des colonnes : (C=0,T=0), (C=0,T=1), (C=1,T=0), (C=1,T=1)

cpd_jean = TabularCPD(
    variable='JeanAppelle',
    variable_card=2,
    values=[[0.95, 0.10], [0.05, 0.90]],
    evidence=['Alarme'],
    evidence_card=[2]
)

cpd_marie = TabularCPD(
    variable='MarieAppelle',
    variable_card=2,
    values=[[0.99, 0.30], [0.01, 0.70]],
    evidence=['Alarme'],
    evidence_card=[2]
)

# Ajouter les CPT au modèle
model.add_cpds(cpd_cambriolage, cpd_tremblement, cpd_alarme, cpd_jean, cpd_marie)

# Vérifier la cohérence du modèle
print("Modèle valide:", model.check_model())  # True`
                        },
                        {
                            id: 'bn_view_cpd',
                            title: 'Afficher une CPT',
                            description: 'Visualiser les tables de probabilités.',
                            level: 'beginner',
                            tags: ['cpd', 'display', 'bayesian', 'pgmpy'],
                            code: `# Afficher une CPT spécifique
print(model.get_cpds('Alarme'))

# Sortie :
# +------------+---------------+---------------+---------------+---------------+
# | Cambriolage| Cambriolage_0 | Cambriolage_0 | Cambriolage_1 | Cambriolage_1 |
# | Tremblement| Tremblement_0 | Tremblement_1 | Tremblement_0 | Tremblement_1 |
# +------------+---------------+---------------+---------------+---------------+
# | Alarme_0   | 0.999         | 0.71          | 0.06          | 0.05          |
# | Alarme_1   | 0.001         | 0.29          | 0.94          | 0.95          |
# +------------+---------------+---------------+---------------+---------------+

# Afficher toutes les CPT
for cpd in model.get_cpds():
    print(f"\\n=== {cpd.variable} ===")
    print(cpd)`
                        }
                    ]
                },
                {
                    id: 'bn_inference',
                    title: '2. Inférence',
                    description: 'Calculer des probabilités conditionnelles',
                    snippets: [
                        {
                            id: 'bn_variable_elimination',
                            title: 'Inférence Exacte (Variable Elimination)',
                            description: 'Calculer P(Query | Evidence) de manière exacte.',
                            level: 'intermediate',
                            tags: ['inference', 'query', 'bayesian', 'pgmpy'],
                            markdown: `### Inférence Bayésienne
L'inférence permet de répondre à des questions du type :
- **P(Cambriolage | JeanAppelle=Oui)** : Quelle est la probabilité d'un cambriolage sachant que Jean a appelé ?
- **P(Alarme | MarieAppelle=Oui, Tremblement=Non)** : Probabilité que l'alarme sonne sachant que Marie a appelé mais qu'il n'y a pas eu de tremblement.

### Méthode : Variable Elimination
Algorithme exact qui marginalise les variables non pertinentes.`,
                            code: `from pgmpy.inference import VariableElimination

# Créer l'objet d'inférence
infer = VariableElimination(model)

# === Query simple ===
# P(Cambriolage | JeanAppelle=Oui)
result = infer.query(
    variables=['Cambriolage'],
    evidence={'JeanAppelle': 1}  # 1 = Oui
)
print(result)
# +---------------+---------------------+
# | Cambriolage   |   phi(Cambriolage)  |
# +===============+=====================+
# | Cambriolage_0 |              0.9844 |
# | Cambriolage_1 |              0.0156 |
# +---------------+---------------------+

# === Query avec plusieurs évidences ===
# P(Cambriolage | JeanAppelle=Oui, MarieAppelle=Oui)
result = infer.query(
    variables=['Cambriolage'],
    evidence={'JeanAppelle': 1, 'MarieAppelle': 1}
)
print(result)
# La probabilité de cambriolage augmente !

# === Probabilité jointe ===
# P(Cambriolage, Tremblement | Alarme=Oui)
result = infer.query(
    variables=['Cambriolage', 'Tremblement'],
    evidence={'Alarme': 1}
)
print(result)`
                        },
                        {
                            id: 'bn_map_query',
                            title: 'MAP Query (Most Probable Explanation)',
                            description: 'Trouver l\'état le plus probable des variables.',
                            level: 'advanced',
                            tags: ['map', 'mpe', 'inference', 'bayesian', 'pgmpy'],
                            code: `# MAP = Maximum A Posteriori
# Trouve l'état le plus probable des variables query

# Quel est l'état le plus probable de Cambriolage et Tremblement
# sachant que Jean ET Marie ont appelé ?
map_result = infer.map_query(
    variables=['Cambriolage', 'Tremblement'],
    evidence={'JeanAppelle': 1, 'MarieAppelle': 1}
)
print("État le plus probable:", map_result)
# {'Cambriolage': 1, 'Tremblement': 0}
# Interprétation : Probablement un cambriolage, pas un tremblement

# Sans évidence : état a priori le plus probable
prior_map = infer.map_query(variables=['Cambriolage', 'Alarme'])
print("A priori:", prior_map)
# {'Cambriolage': 0, 'Alarme': 0} - Pas de cambriolage, pas d'alarme`
                        },
                        {
                            id: 'bn_sampling',
                            title: 'Inférence Approchée (Échantillonnage)',
                            description: 'Monte Carlo sampling pour les grands réseaux.',
                            level: 'advanced',
                            tags: ['sampling', 'monte-carlo', 'bayesian', 'pgmpy'],
                            code: `from pgmpy.sampling import BayesianModelSampling

# Créer le sampler
sampler = BayesianModelSampling(model)

# === Forward Sampling ===
# Générer des échantillons selon la distribution jointe
samples = sampler.forward_sample(size=1000)
print(samples.head())
#    Cambriolage  Tremblement  Alarme  JeanAppelle  MarieAppelle
# 0            0            0       0            0             0
# 1            0            0       0            0             0
# ...

# Estimer P(Cambriolage=1)
p_cambriolage = samples['Cambriolage'].mean()
print(f"P(Cambriolage) ≈ {p_cambriolage:.4f}")

# === Rejection Sampling ===
# Échantillonnage conditionnel (garde seulement les échantillons compatibles)
samples_given = sampler.rejection_sample(
    size=1000,
    evidence=[('JeanAppelle', 1)]
)
p_camb_given_jean = samples_given['Cambriolage'].mean()
print(f"P(Cambriolage | JeanAppelle=Oui) ≈ {p_camb_given_jean:.4f}")`
                        }
                    ]
                },
                {
                    id: 'bn_learning',
                    title: '3. Apprentissage',
                    description: 'Apprendre les paramètres et la structure depuis les données',
                    snippets: [
                        {
                            id: 'bn_param_learning',
                            title: 'Apprentissage des Paramètres (MLE)',
                            description: 'Estimer les CPT à partir de données.',
                            level: 'advanced',
                            tags: ['learning', 'mle', 'parameters', 'bayesian', 'pgmpy'],
                            markdown: `### Apprentissage des Paramètres
Quand on connaît la **structure** (le DAG) mais pas les **probabilités** (CPT), on peut les estimer à partir de données.

**Méthodes :**
- **MLE** (Maximum Likelihood Estimation) : Compte les fréquences
- **Bayesian Estimation** : Ajoute des pseudo-counts (prior)`,
                            code: `import pandas as pd
from pgmpy.models import BayesianNetwork
from pgmpy.estimators import MaximumLikelihoodEstimator, BayesianEstimator

# === Données d'entraînement ===
data = pd.DataFrame({
    'Pluie':    [1, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    'Arroseur': [0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    'Mouillé':  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1]
})

# === Définir la structure (DAG connu) ===
model = BayesianNetwork([
    ('Pluie', 'Mouillé'),
    ('Arroseur', 'Mouillé')
])

# === MLE : Maximum Likelihood Estimation ===
model.fit(data, estimator=MaximumLikelihoodEstimator)
print("=== CPT apprise par MLE ===")
print(model.get_cpds('Mouillé'))

# === Bayesian Estimation (avec prior) ===
# Utile quand on a peu de données
model_bayes = BayesianNetwork([
    ('Pluie', 'Mouillé'),
    ('Arroseur', 'Mouillé')
])
model_bayes.fit(
    data, 
    estimator=BayesianEstimator,
    prior_type='BDeu',  # Prior de Bayesian Dirichlet equivalent uniform
    equivalent_sample_size=10  # Force du prior
)
print("\\n=== CPT apprise par Bayesian Estimation ===")
print(model_bayes.get_cpds('Mouillé'))`
                        },
                        {
                            id: 'bn_structure_learning',
                            title: 'Apprentissage de Structure',
                            description: 'Découvrir le DAG optimal à partir des données.',
                            level: 'advanced',
                            tags: ['learning', 'structure', 'hill-climbing', 'bayesian', 'pgmpy'],
                            markdown: `### Apprentissage de Structure
Quand on ne connaît **ni la structure ni les paramètres**, on peut apprendre les deux !

**Méthodes :**
- **Score-based** : Hill Climbing, recherche le DAG avec le meilleur score (BIC, K2)
- **Constraint-based** : PC Algorithm, utilise des tests d'indépendance`,
                            code: `import pandas as pd
from pgmpy.estimators import HillClimbSearch, BicScore, K2Score

# === Données ===
data = pd.DataFrame({
    'A': [0, 1, 1, 0, 1, 0, 1, 1, 0, 0],
    'B': [0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
    'C': [0, 1, 1, 0, 1, 1, 1, 1, 0, 1]
})

# === Hill Climbing avec score BIC ===
hc = HillClimbSearch(data)
best_model = hc.estimate(scoring_method=BicScore(data))

print("Structure découverte:")
print("Arêtes:", best_model.edges())

# === Créer le modèle complet ===
from pgmpy.models import BayesianNetwork
from pgmpy.estimators import MaximumLikelihoodEstimator

model = BayesianNetwork(best_model.edges())
model.fit(data, estimator=MaximumLikelihoodEstimator)

print("\\n=== Modèle appris ===")
for cpd in model.get_cpds():
    print(f"\\n{cpd.variable}:")
    print(cpd)`
                        },
                        {
                            id: 'bn_independence',
                            title: 'Tests d\'Indépendance (d-séparation)',
                            description: 'Vérifier les indépendances conditionnelles.',
                            level: 'advanced',
                            tags: ['d-separation', 'independence', 'bayesian', 'pgmpy'],
                            code: `# La d-séparation permet de vérifier quelles variables sont
# conditionnellement indépendantes dans le graphe

# Dans notre réseau Alarme :
# Cambriolage ⊥ Tremblement (indépendants a priori)
# Cambriolage ⊥ Tremblement | Alarme ? (depends on d-separation)

# Vérifier l'indépendance conditionnelle
from pgmpy.models import BayesianNetwork

model = BayesianNetwork([
    ('Cambriolage', 'Alarme'),
    ('Tremblement', 'Alarme'),
    ('Alarme', 'JeanAppelle'),
    ('Alarme', 'MarieAppelle')
])

# Est-ce que Cambriolage est indépendant de Tremblement ?
# (sans observation)
independencies = model.get_independencies()
print("Indépendances du modèle:")
print(independencies)

# D-séparation : X et Y sont-ils indépendants sachant Z ?
# Syntaxe: is_d_separated(X, Y, Z)
print("\\nCambriolage ⊥ Tremblement ?", 
      model.is_d_separated('Cambriolage', 'Tremblement', {}))
# True : marginalement indépendants

print("Cambriolage ⊥ Tremblement | Alarme ?", 
      model.is_d_separated('Cambriolage', 'Tremblement', {'Alarme'}))
# False : conditionnellement dépendants (explaining away)`
                        }
                    ]
                }
            ]
        }
    ]
};

export const pythonContent = {
    ..._pythonContentRaw,
    themes: _pythonContentRaw.themes.filter(t => !t.archived)
};

