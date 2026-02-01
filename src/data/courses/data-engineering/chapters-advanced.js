// Chapter content for Data Engineering course - PART 2: Advanced
// Modules 05-27

export const dataEngineeringChaptersAdvanced = {
    '05-pandas-selection': `
# Module 5 : Sélection et Filtrage

Maîtriser \`.loc\`, \`.iloc\` et le filtrage conditionnel est **essentiel** pour manipuler efficacement les DataFrames.

---

## 🎯 Indexation avec loc et iloc

### iloc : Indexation par Position (entiers)

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'Nom': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'Ville': ['Paris', 'Lyon', 'Marseille', 'Bordeaux']
})

# Sélection d'une ligne
print(df.iloc[0])        # Première ligne (Series)

# Sélection de plusieurs lignes
print(df.iloc[0:2])      # Lignes 0 et 1

# Ligne et colonne
print(df.iloc[0, 1])     # Ligne 0, Colonne 1 → 25

# Plage de lignes et colonnes
print(df.iloc[0:2, 0:2]) # 2 premières lignes, 2 premières colonnes
\`\`\`

### loc : Indexation par Label

\`\`\`python
df.index = ['emp1', 'emp2', 'emp3', 'emp4']

# Par label d'index
print(df.loc['emp1'])              # Ligne avec index 'emp1'

# Par label de colonne
print(df.loc['emp1', 'Nom'])       # 'Alice'

# Plusieurs labels
print(df.loc[['emp1', 'emp3'], ['Nom', 'Age']])
\`\`\`

> 💡 **Différence clé** : \`iloc\` = positions numériques, \`loc\` = labels/noms.

---

## 🔍 Filtrage Conditionnel

\`\`\`python
df = pd.DataFrame({
    'Nom': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'Salaire': [45000, 55000, 60000, 48000]
})

# Condition simple
print(df[df['Age'] > 28])

# Conditions multiples (& pour ET, | pour OU)
print(df[(df['Age'] > 25) & (df['Salaire'] > 50000)])

# Négation
print(df[~(df['Nom'] == 'Bob')])

# isin() pour plusieurs valeurs
print(df[df['Nom'].isin(['Alice', 'Diana'])])

# between() pour plages
print(df[df['Age'].between(25, 30)])
\`\`\`

### Méthode query() (plus lisible)

\`\`\`python
# Équivalent de df[(df['Age'] > 25) & (df['Salaire'] > 50000)]
print(df.query('Age > 25 and Salaire > 50000'))

# Avec des variables
seuil = 50000
print(df.query('Salaire > @seuil'))
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/05-pandas-selection-exercice.py\`
`,

    '06-pandas-missing': `
# Module 6 : Valeurs Manquantes

Les données réelles contiennent **presque toujours** des valeurs manquantes. Ce module couvre les techniques pour les détecter et les traiter.

---

## 🔍 Détecter les Valeurs Manquantes

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'A': [1, 2, np.nan, 4],
    'B': ['x', None, 'z', 'w'],
    'C': [1.0, 2.0, 3.0, np.nan]
})

# Détecter les NaN
print(df.isna())         # Masque booléen
print(df.isnull())       # Synonyme

# Compter les valeurs manquantes
print(df.isna().sum())          # Par colonne
print(df.isna().sum().sum())    # Total

# Pourcentage de valeurs manquantes
print(df.isna().mean() * 100)
\`\`\`

> 🧠 **NaN vs None** : Pandas normalise tout en \`NaN\` (Not a Number). \`None\`, \`np.nan\`, \`pd.NA\` sont tous convertis.

---

## 🗑️ Supprimer les Valeurs Manquantes

\`\`\`python
# Supprimer les lignes avec AU MOINS un NaN
df_clean = df.dropna()

# Supprimer les lignes où TOUTES les valeurs sont NaN
df_clean = df.dropna(how='all')

# Supprimer si NaN dans colonnes spécifiques
df_clean = df.dropna(subset=['A', 'B'])

# Garder lignes avec au moins N valeurs non-nulles
df_clean = df.dropna(thresh=2)
\`\`\`

---

## 🔄 Remplacer les Valeurs Manquantes

\`\`\`python
# Par une valeur fixe
df['A'] = df['A'].fillna(0)

# Par la moyenne/médiane
df['A'] = df['A'].fillna(df['A'].mean())

# Par la valeur précédente (forward fill)
df['A'] = df['A'].ffill()

# Par la valeur suivante (backward fill)
df['A'] = df['A'].bfill()

# Interpolation linéaire
df['A'] = df['A'].interpolate()
\`\`\`

> ⚠️ **Piège** : Ne remplacez pas aveuglément par la moyenne ! Analysez d'abord pourquoi les données manquent.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/06-pandas-missing-exercice.py\`
`,

    '07-pandas-transform': `
# Module 7 : Transformations

Créer de nouvelles colonnes, appliquer des fonctions, et transformer vos données.

---

## ➕ Création de Colonnes

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'prix_ht': [100, 200, 150],
    'quantite': [2, 1, 3]
})

# Opération simple
df['total_ht'] = df['prix_ht'] * df['quantite']

# TVA à 20%
df['tva'] = df['total_ht'] * 0.20
df['total_ttc'] = df['total_ht'] + df['tva']

print(df)
\`\`\`

---

## 🔄 Apply, Map, Applymap

\`\`\`python
# apply() : appliquer une fonction à une colonne ou ligne
df['categorie'] = df['prix_ht'].apply(lambda x: 'Cher' if x > 150 else 'Abordable')

# map() : pour remplacer des valeurs (Series uniquement)
mapping = {'Cher': 1, 'Abordable': 0}
df['cat_num'] = df['categorie'].map(mapping)

# Fonction personnalisée
def calculer_remise(row):
    if row['quantite'] >= 3:
        return row['total_ht'] * 0.10
    return 0

df['remise'] = df.apply(calculer_remise, axis=1)
\`\`\`

> 💡 **Performance** : Préférez les opérations vectorisées (\`df['col'] * 2\`) à \`apply()\` quand c'est possible.

---

## 🔀 Renommer et Réordonner

\`\`\`python
# Renommer des colonnes
df = df.rename(columns={'prix_ht': 'prix_unitaire', 'total_ttc': 'prix_final'})

# Réordonner les colonnes
df = df[['quantite', 'prix_unitaire', 'prix_final']]

# Supprimer une colonne
df = df.drop(columns=['tva'])
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/07-pandas-transform-exercice.py\`
`,

    '08-pandas-groupby': `
# Module 8 : GroupBy et Agrégations

GroupBy est l'outil fondamental pour analyser des données par catégorie.

---

## 📊 GroupBy Basique

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'Departement': ['Ventes', 'Ventes', 'IT', 'IT', 'RH'],
    'Employe': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Salaire': [45000, 50000, 60000, 55000, 48000]
})

# Grouper et agréger
print(df.groupby('Departement')['Salaire'].mean())
# Departement
# IT        57500
# RH        48000
# Ventes    47500

# Plusieurs agrégations
print(df.groupby('Departement')['Salaire'].agg(['mean', 'min', 'max', 'count']))
\`\`\`

---

## 🔧 Agrégations Avancées

\`\`\`python
# agg() avec dictionnaire
result = df.groupby('Departement').agg({
    'Salaire': ['mean', 'sum'],
    'Employe': 'count'
})

# Nommer les colonnes résultantes
result = df.groupby('Departement').agg(
    salaire_moyen=('Salaire', 'mean'),
    nb_employes=('Employe', 'count')
)
\`\`\`

---

## 📋 Pivot Tables

\`\`\`python
# Tableau croisé dynamique
df = pd.DataFrame({
    'Region': ['Nord', 'Nord', 'Sud', 'Sud'],
    'Produit': ['A', 'B', 'A', 'B'],
    'Ventes': [100, 150, 200, 120]
})

pivot = df.pivot_table(
    values='Ventes',
    index='Region',
    columns='Produit',
    aggfunc='sum'
)
print(pivot)
#          A    B
# Region
# Nord   100  150
# Sud    200  120
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/08-pandas-groupby-exercice.py\`
`,

    '09-pandas-merge': `
# Module 9 : Jointures et Concaténation

Combiner plusieurs DataFrames est une opération essentielle en Data Engineering.

---

## 🔗 Merge (Jointures SQL-like)

\`\`\`python
import pandas as pd

clients = pd.DataFrame({
    'client_id': [1, 2, 3],
    'nom': ['Alice', 'Bob', 'Charlie']
})

commandes = pd.DataFrame({
    'commande_id': [101, 102, 103],
    'client_id': [1, 2, 1],
    'montant': [150, 200, 75]
})

# Inner join (par défaut)
result = pd.merge(clients, commandes, on='client_id')

# Left join (garder tous les clients)
result = pd.merge(clients, commandes, on='client_id', how='left')

# Noms de colonnes différents
result = pd.merge(clients, commandes, 
                  left_on='client_id', 
                  right_on='client_id')
\`\`\`

---

## 📚 Concat (Empiler)

\`\`\`python
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})

# Empiler verticalement (lignes)
result = pd.concat([df1, df2], ignore_index=True)

# Empiler horizontalement (colonnes)
result = pd.concat([df1, df2], axis=1)
\`\`\`

> ⚠️ **ignore_index** : Utilisez \`ignore_index=True\` pour réindexer le résultat (0, 1, 2...).

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/09-pandas-merge-exercice.py\`
`,

    '10-cleaning-text': `
# Module 10 : Nettoyage de Texte

Le texte est souvent la source de données la plus "sale". Ce module couvre les techniques essentielles.

---

## 🧹 Opérations String de Base

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'nom': ['  Alice  ', 'BOB', 'charlie', '  Diana Jones  ']
})

# Supprimer les espaces
df['nom_clean'] = df['nom'].str.strip()

# Casse
df['nom_lower'] = df['nom'].str.lower()
df['nom_upper'] = df['nom'].str.upper()
df['nom_title'] = df['nom'].str.title()

# Remplacer
df['nom'] = df['nom'].str.replace('BOB', 'Robert')
\`\`\`

---

## 🔍 Regex avec Pandas

\`\`\`python
# Extraire avec regex
df['prenom'] = df['nom'].str.extract(r'(\\w+)')

# Contient un pattern
df[df['nom'].str.contains(r'\\d+', regex=True)]  # Contient des chiffres

# Valider un format email
df['email_valide'] = df['email'].str.match(r'^[\\w.-]+@[\\w.-]+\\.\\w+$')
\`\`\`

> 💡 **Astuce** : Utilisez \`na=False\` dans \`contains()\` pour éviter les erreurs avec les NaN.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/10-cleaning-text-exercice.py\`
`,

    '11-cleaning-dates': `
# Module 11 : Manipulation de Dates

Les dates sont complexes mais essentielles. Pandas offre des outils puissants pour les gérer.

---

## 📅 Conversion en Datetime

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'date_str': ['2024-01-15', '2024/02/20', '15-03-2024']
})

# Conversion automatique
df['date'] = pd.to_datetime(df['date_str'])

# Format spécifique
df['date'] = pd.to_datetime(df['date_str'], format='%d-%m-%Y')

# Erreurs : 'coerce' → NaT pour les invalides
df['date'] = pd.to_datetime(df['date_str'], errors='coerce')
\`\`\`

---

## 🔧 Extraction de Composants

\`\`\`python
df['annee'] = df['date'].dt.year
df['mois'] = df['date'].dt.month
df['jour'] = df['date'].dt.day
df['jour_semaine'] = df['date'].dt.dayofweek  # 0=Lundi
df['nom_jour'] = df['date'].dt.day_name()
df['trimestre'] = df['date'].dt.quarter
\`\`\`

---

## ⏱️ Calculs Temporels

\`\`\`python
# Différence entre dates
df['duree'] = df['date_fin'] - df['date_debut']
df['jours'] = df['duree'].dt.days

# Ajouter/Soustraire du temps
df['date_plus_30j'] = df['date'] + pd.Timedelta(days=30)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/11-cleaning-dates-exercice.py\`
`,

    '12-cleaning-duplicates': `
# Module 12 : Doublons et Dédoublonnage

Les doublons peuvent fausser vos analyses. Apprenez à les détecter et traiter.

---

## 🔍 Détecter les Doublons

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'id': [1, 2, 2, 3],
    'nom': ['Alice', 'Bob', 'Bob', 'Charlie']
})

# Lignes dupliquées (toutes colonnes)
print(df.duplicated())            # Masque booléen
print(df[df.duplicated()])        # Voir les doublons
print(df.duplicated().sum())      # Compter

# Sur colonnes spécifiques
print(df.duplicated(subset=['id']))
\`\`\`

---

## 🗑️ Supprimer les Doublons

\`\`\`python
# Garder la première occurrence
df_unique = df.drop_duplicates()

# Garder la dernière occurrence
df_unique = df.drop_duplicates(keep='last')

# Sur colonnes spécifiques
df_unique = df.drop_duplicates(subset=['id'])

# Supprimer TOUS les doublons (pas de "first" ou "last")
df_unique = df.drop_duplicates(keep=False)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/12-cleaning-duplicates-exercice.py\`
`,

    '13-cleaning-outliers': `
# Module 13 : Valeurs Aberrantes

Les outliers peuvent fortement impacter vos modèles. Apprenez à les identifier et traiter.

---

## 🔍 Détection

### Méthode IQR (Interquartile Range)

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({'valeur': [10, 12, 14, 15, 100, 11, 13]})

Q1 = df['valeur'].quantile(0.25)
Q3 = df['valeur'].quantile(0.75)
IQR = Q3 - Q1

borne_inf = Q1 - 1.5 * IQR
borne_sup = Q3 + 1.5 * IQR

outliers = df[(df['valeur'] < borne_inf) | (df['valeur'] > borne_sup)]
print(outliers)
\`\`\`

### Méthode Z-Score

\`\`\`python
from scipy import stats

z_scores = np.abs(stats.zscore(df['valeur']))
outliers = df[z_scores > 3]  # Plus de 3 écarts-types
\`\`\`

---

## 🔧 Traitement

\`\`\`python
# Supprimer
df_clean = df[(df['valeur'] >= borne_inf) & (df['valeur'] <= borne_sup)]

# Clipper (ramener aux bornes)
df['valeur_clipped'] = df['valeur'].clip(lower=borne_inf, upper=borne_sup)

# Remplacer par NaN puis imputer
df.loc[(df['valeur'] < borne_inf) | (df['valeur'] > borne_sup), 'valeur'] = np.nan
df['valeur'] = df['valeur'].fillna(df['valeur'].median())
\`\`\`

> ⚠️ **Attention** : Ne supprimez pas les outliers aveuglément ! Ils peuvent être des données valides et importantes.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/13-cleaning-outliers-exercice.py\`
`,

    '14-cleaning-validation': `
# Module 14 : Validation de Données

Valider vos données garantit leur qualité avant analyse ou modélisation.

---

## ✅ Assertions et Vérifications

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'age': [25, 30, -5, 150],
    'email': ['a@b.com', 'invalid', 'c@d.org', None]
})

# Vérifier les contraintes
assert df['age'].min() >= 0, "Ages négatifs détectés !"
assert df['age'].max() <= 120, "Ages trop élevés détectés !"

# Vérifier les valeurs nulles
assert df['email'].notna().all(), "Emails manquants !"
\`\`\`

---

## 🔧 Nettoyage avec Contraintes

\`\`\`python
# Corriger les valeurs hors plage
df.loc[df['age'] < 0, 'age'] = np.nan
df.loc[df['age'] > 120, 'age'] = np.nan

# Valider le format email
email_pattern = r'^[\\w.-]+@[\\w.-]+\\.\\w+$'
df['email_valide'] = df['email'].str.match(email_pattern, na=False)

# Filtrer les lignes valides
df_valid = df[df['email_valide']]
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/14-cleaning-validation-exercice.py\`
`,

    '15-encoding-categorical': `
# Module 15 : Encodage Catégoriel

Le Machine Learning nécessite des données numériques. Ce module couvre les techniques d'encodage.

---

## 🏷️ Label Encoding

\`\`\`python
from sklearn.preprocessing import LabelEncoder

df = pd.DataFrame({'couleur': ['rouge', 'bleu', 'vert', 'rouge']})

le = LabelEncoder()
df['couleur_encoded'] = le.fit_transform(df['couleur'])
# rouge=2, bleu=0, vert=1 (ordre alphabétique)
\`\`\`

> ⚠️ **Attention** : Label Encoding crée un ordre implicite (0 < 1 < 2). À utiliser uniquement pour les variables ordinales.

---

## 🔲 One-Hot Encoding

\`\`\`python
# Avec Pandas
df_encoded = pd.get_dummies(df, columns=['couleur'], prefix='color')

# Avec scikit-learn
from sklearn.preprocessing import OneHotEncoder

ohe = OneHotEncoder(sparse_output=False)
encoded = ohe.fit_transform(df[['couleur']])
\`\`\`

> 💡 **Quand utiliser quoi ?**
> - **One-Hot** : Variables nominales (pas d'ordre)
> - **Label** : Variables ordinales (ordre naturel)

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/15-encoding-categorical-exercice.py\`
`,

    '16-scaling-normalization': `
# Module 16 : Scaling et Normalisation

Mettre les features à la même échelle est crucial pour de nombreux algorithmes ML.

---

## 📏 StandardScaler (Z-score)

\`\`\`python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
df['age_scaled'] = scaler.fit_transform(df[['age']])
# Moyenne = 0, Écart-type = 1
\`\`\`

---

## 📐 MinMaxScaler

\`\`\`python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
df['age_scaled'] = scaler.fit_transform(df[['age']])
# Valeurs entre 0 et 1
\`\`\`

---

## 🔧 Quand Utiliser Quoi ?

| Scaler | Utilisation |
|--------|-------------|
| StandardScaler | Distribution normale, pas d'outliers |
| MinMaxScaler | Bornes connues, réseaux de neurones |
| RobustScaler | Données avec outliers |

> ⚠️ **Important** : Toujours faire fit() sur le train, transform() sur le test !

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/16-scaling-normalization-exercice.py\`
`,

    '17-feature-creation': `
# Module 17 : Création de Features

Le Feature Engineering est souvent ce qui fait la différence en ML.

---

## 🔢 Features Numériques

\`\`\`python
# Binning (discrétisation)
df['age_groupe'] = pd.cut(df['age'], bins=[0, 18, 35, 50, 100], 
                          labels=['Jeune', 'Adulte', 'Senior', 'Aîné'])

# Interactions
df['prix_par_m2'] = df['prix'] / df['surface']

# Transformations
df['log_salaire'] = np.log1p(df['salaire'])  # log(1+x) pour éviter log(0)
df['salaire_squared'] = df['salaire'] ** 2
\`\`\`

---

## 📅 Features Temporelles

\`\`\`python
# Composants de date
df['mois'] = df['date'].dt.month
df['jour_semaine'] = df['date'].dt.dayofweek
df['weekend'] = df['jour_semaine'].isin([5, 6]).astype(int)

# Cycliques (pour capturer la périodicité)
df['mois_sin'] = np.sin(2 * np.pi * df['mois'] / 12)
df['mois_cos'] = np.cos(2 * np.pi * df['mois'] / 12)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/17-feature-creation-exercice.py\`
`,

    '18-feature-selection': `
# Module 18 : Sélection de Features

Trop de features peut nuire au modèle (curse of dimensionality). Apprenez à sélectionner les meilleures.

---

## 📊 Analyse de Corrélation

\`\`\`python
# Matrice de corrélation
corr_matrix = df.corr()

# Corrélation avec la cible
target_corr = corr_matrix['target'].abs().sort_values(ascending=False)

# Supprimer les features très corrélées entre elles
high_corr = corr_matrix.abs() > 0.9
\`\`\`

---

## 🎯 Importance des Features

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier()
rf.fit(X, y)

# Importance
importances = pd.Series(rf.feature_importances_, index=X.columns)
top_features = importances.nlargest(10)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/18-feature-selection-exercice.py\`
`,

    '19-io-files': `
# Module 19 : Fichiers (CSV, Excel, JSON, Parquet)

Maîtriser les I/O est essentiel pour un Data Engineer.

---

## 📄 CSV

\`\`\`python
# Lecture avec options
df = pd.read_csv('data.csv', sep=';', encoding='utf-8', 
                 parse_dates=['date'], na_values=['N/A'])

# Écriture
df.to_csv('output.csv', index=False, encoding='utf-8')
\`\`\`

---

## 📊 Excel

\`\`\`python
# Lecture
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# Écriture multi-feuilles
with pd.ExcelWriter('output.xlsx') as writer:
    df1.to_excel(writer, sheet_name='Données')
    df2.to_excel(writer, sheet_name='Résumé')
\`\`\`

---

## 🗂️ Parquet (Performance)

\`\`\`python
# Lecture (très rapide pour gros fichiers)
df = pd.read_parquet('data.parquet')

# Écriture
df.to_parquet('output.parquet', compression='snappy')
\`\`\`

> 💡 **Parquet** : Format binaire columnar. 5-10x plus rapide et 2-5x plus compact que CSV.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/19-io-files-exercice.py\`
`,

    '20-io-databases': `
# Module 20 : Bases de Données SQL

Connecter Pandas à vos bases de données.

---

## 🔌 SQLite

\`\`\`python
import sqlite3

conn = sqlite3.connect('database.db')

# Lire depuis SQL
df = pd.read_sql('SELECT * FROM users WHERE age > 25', conn)

# Écrire dans SQL
df.to_sql('users_copy', conn, if_exists='replace', index=False)

conn.close()
\`\`\`

---

## 🐘 PostgreSQL

\`\`\`python
from sqlalchemy import create_engine

engine = create_engine('postgresql://user:password@localhost:5432/mydb')

df = pd.read_sql('SELECT * FROM orders', engine)
df.to_sql('orders_backup', engine, if_exists='append', index=False)
\`\`\`

> ⚠️ **Sécurité** : Ne codez JAMAIS les mots de passe en dur. Utilisez des variables d'environnement.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/20-io-databases-exercice.py\`
`,

    '21-io-apis': `
# Module 21 : APIs et Web

Récupérer des données depuis des APIs REST.

---

## 🌐 Requêtes API

\`\`\`python
import requests

# GET simple
response = requests.get('https://api.example.com/data')
data = response.json()

# Vers DataFrame
df = pd.DataFrame(data['results'])

# Avec authentification
headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.get('https://api.example.com/data', headers=headers)
\`\`\`

---

## 📄 JSON vers DataFrame

\`\`\`python
# JSON imbriqué
data = {
    'users': [
        {'name': 'Alice', 'address': {'city': 'Paris'}},
        {'name': 'Bob', 'address': {'city': 'Lyon'}}
    ]
}

# Normaliser les données imbriquées
df = pd.json_normalize(data['users'])
print(df.columns)  # ['name', 'address.city']
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/21-io-apis-exercice.py\`
`,

    '22-eda-statistics': `
# Module 22 : Statistiques Descriptives

L'EDA commence par comprendre vos données numériquement.

---

## 📊 Statistiques de Base

\`\`\`python
# Résumé complet
print(df.describe())

# Statistiques spécifiques
print(df['colonne'].mean())     # Moyenne
print(df['colonne'].median())   # Médiane
print(df['colonne'].mode())     # Mode
print(df['colonne'].std())      # Écart-type
print(df['colonne'].var())      # Variance
print(df['colonne'].skew())     # Asymétrie
print(df['colonne'].kurt())     # Aplatissement
\`\`\`

---

## 📈 Distribution

\`\`\`python
# Fréquences
print(df['categorie'].value_counts())
print(df['categorie'].value_counts(normalize=True))  # Pourcentages

# Quantiles
print(df['valeur'].quantile([0.25, 0.5, 0.75]))
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/22-eda-statistics-exercice.py\`
`,

    '23-eda-visualization': `
# Module 23 : Visualisation avec Matplotlib/Seaborn

Visualiser pour comprendre vos données.

---

## 📊 Matplotlib Basics

\`\`\`python
import matplotlib.pyplot as plt

# Histogramme
plt.hist(df['age'], bins=20)
plt.xlabel('Age')
plt.ylabel('Fréquence')
plt.title('Distribution des âges')
plt.show()

# Scatter plot
plt.scatter(df['x'], df['y'], alpha=0.5)
plt.show()
\`\`\`

---

## 🎨 Seaborn (Plus élégant)

\`\`\`python
import seaborn as sns

# Distribution
sns.histplot(df['age'], kde=True)

# Boxplot par catégorie
sns.boxplot(x='departement', y='salaire', data=df)

# Heatmap de corrélation
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
\`\`\`

> 💡 **Seaborn** : Plus beau par défaut, intégration Pandas native.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/23-eda-visualization-exercice.py\`
`,

    '24-eda-correlations': `
# Module 24 : Corrélations et Relations

Comprendre les relations entre vos variables.

---

## 🔗 Corrélation de Pearson

\`\`\`python
# Entre deux colonnes
corr = df['col1'].corr(df['col2'])

# Matrice complète
corr_matrix = df.corr()

# Visualiser
import seaborn as sns
sns.heatmap(corr_matrix, annot=True, cmap='RdBu_r', center=0)
\`\`\`

---

## 📈 Pairplot

\`\`\`python
# Relations entre toutes les variables
sns.pairplot(df, hue='target', diag_kind='kde')
\`\`\`

> ⚠️ **Corrélation ≠ Causalité** : Une corrélation forte ne prouve pas une relation de cause à effet.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/24-eda-correlations-exercice.py\`
`,

    '25-pipelines-sklearn': `
# Module 25 : Pipelines scikit-learn

Automatiser votre workflow de préparation de données.

---

## 🔧 Pipeline Basique

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

X_transformed = pipeline.fit_transform(X_train)
X_test_transformed = pipeline.transform(X_test)
\`\`\`

---

## 🔀 ColumnTransformer

\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

preprocessor = ColumnTransformer([
    ('num', StandardScaler(), ['age', 'salaire']),
    ('cat', OneHotEncoder(), ['ville', 'categorie'])
])

X_processed = preprocessor.fit_transform(X)
\`\`\`

> 💡 **Avantage** : Pas de data leakage, reproductible, sauvegardable avec joblib.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/25-pipelines-sklearn-exercice.py\`
`,

    '26-optimization': `
# Module 26 : Optimisation et Performance

Traiter de gros volumes de données efficacement.

---

## ⚡ Vectorisation

\`\`\`python
# ❌ Lent : boucle for
for i in range(len(df)):
    df.loc[i, 'new'] = df.loc[i, 'old'] * 2

# ✅ Rapide : vectorisé
df['new'] = df['old'] * 2
\`\`\`

---

## 🧠 Types Optimaux

\`\`\`python
# Réduire la mémoire
df['int_col'] = df['int_col'].astype('int32')  # Au lieu de int64
df['cat_col'] = df['cat_col'].astype('category')  # Catégories
\`\`\`

---

## 📦 Chunks pour Gros Fichiers

\`\`\`python
# Lire par morceaux
for chunk in pd.read_csv('huge_file.csv', chunksize=100000):
    process(chunk)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/26-optimization-exercice.py\`
`,

    '27-best-practices': `
# Module 27 : Bonnes Pratiques

Écrire du code Data Engineering professionnel.

---

## 📝 Documentation

\`\`\`python
def clean_data(df: pd.DataFrame, columns: list) -> pd.DataFrame:
    """
    Nettoie un DataFrame en supprimant les doublons et les valeurs nulles.
    
    Args:
        df: DataFrame à nettoyer
        columns: Colonnes à vérifier pour les doublons
        
    Returns:
        DataFrame nettoyé
    """
    return df.drop_duplicates(subset=columns).dropna()
\`\`\`

---

## 🔒 Validation

\`\`\`python
def validate_dataframe(df):
    assert not df.empty, "DataFrame vide !"
    assert df.columns.is_unique, "Colonnes dupliquées !"
    return True
\`\`\`

---

## 📁 Structure de Projet

\`\`\`
project/
├── data/
│   ├── raw/           # Données brutes (ne jamais modifier)
│   ├── processed/     # Données nettoyées
│   └── features/      # Features engineered
├── notebooks/         # EDA, prototypage
├── src/
│   ├── cleaning.py    # Fonctions de nettoyage
│   ├── features.py    # Feature engineering
│   └── pipeline.py    # Pipelines complets
└── requirements.txt
\`\`\`

> 💡 **Règle d'or** : Les données brutes sont **immuables**. Toute transformation crée un nouveau fichier.

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/27-best-practices-exercice.py\`
`
};

export const getDataEngineeringAdvancedChapterContent = (chapterId) => {
    return dataEngineeringChaptersAdvanced[chapterId] || null;
};
