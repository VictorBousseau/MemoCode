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
print(df.shape)`
                        },
                        {
                            id: 'stats',
                            title: 'Statistiques & Valeurs',
                            description: 'Comprendre la distribution des données.',
                            code: `# Résumé statistique (numérique)
df.describe()

# Compter les occurrences (catégoriel)
# Indispensable pour comprendre une colonne
df['categorie'].value_counts()

# Valeurs uniques
uniques = df['categorie'].unique()
nb_uniques = df['categorie'].nunique()`
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
})`
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
                            code: `# Inner Join (par défaut)
df_merged = pd.merge(df_clients, df_commandes, on='client_id')

# Left Join
df_merged = pd.merge(df_clients, df_commandes, 
    on='client_id', 
    how='left'
)`
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
                            code: `sns.histplot(data=df, x='colonne_numerique', kde=True)
plt.show()`
                        },
                        {
                            id: 'boxplot',
                            title: 'Boxplot',
                            description: 'Détection d\'outliers et quartiles.',
                            code: `sns.boxplot(data=df, x='colonne_numerique')
plt.show()`
                        },
                        {
                            id: 'countplot',
                            title: 'Countplot',
                            description: 'Fréquence des catégories.',
                            code: `sns.countplot(data=df, x='colonne_categorie')
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
                            code: `sns.scatterplot(
    data=df, 
    x='col_num_1', 
    y='col_num_2', 
    hue='categorie'
)
plt.show()`
                        },
                        {
                            id: 'lineplot',
                            title: 'Line Plot',
                            description: 'Séries temporelles.',
                            code: `sns.lineplot(data=df, x='date', y='valeur')
plt.show()`
                        },
                        {
                            id: 'barplot',
                            title: 'Bar Plot',
                            description: 'Comparaison numérique par catégorie.',
                            code: `sns.barplot(data=df, x='categorie', y='valeur')
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
                            code: `corr = df.corr()
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.show()`
                        },
                        {
                            id: 'pairplot',
                            title: 'Pairplot',
                            description: 'Vue d\'ensemble des relations.',
                            code: `sns.pairplot(df, hue='target')
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
msno.matrix(df)
plt.show()`
                        },
                        {
                            id: 'msno_bar',
                            title: 'Barplot des Manquants',
                            description: 'Quantité de manquants par colonne.',
                            code: `msno.bar(df)
plt.show()`
                        }
                    ]
                }
            ]
        },
        {
            id: 'ml',
            title: 'Machine Learning',
            description: 'Scikit-learn (Bientôt)',
            categories: [
                {
                    id: 'basics',
                    title: 'Bientôt disponible',
                    description: 'Contenu en cours de rédaction',
                    snippets: []
                }
            ]
        }
    ]
};
