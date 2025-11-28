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
                            image: '/MemoCode/images/histogram.png',
                            code: `# Histogramme avec courbe de densité (KDE)
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
                    id: 'preprocessing',
                    title: '1. Préparation (Preprocessing)',
                    description: 'Split, Encodage et Scaling',
                    snippets: [
                        {
                            id: 'train_test_split',
                            title: 'Séparation Train / Test',
                            description: 'Diviser les données pour évaluer le modèle.',
                            code: `from sklearn.model_selection import train_test_split

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
                    id: 'control_flow',
                    title: 'Contrôle de Flux',
                    description: 'Boucles et Conditions',
                    snippets: [
                        {
                            id: 'loops',
                            title: 'Boucles For & While',
                            description: 'Itérer sur des séquences ou tant qu\'une condition est vraie.',
                            code: `# Boucle FOR (Itération définie)
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
                            code: `nom = "Alice"
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
                }
            ]
        }
    ]
};
