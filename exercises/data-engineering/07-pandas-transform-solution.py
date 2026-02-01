# =================================================
# Module 7 : Transformations - SOLUTION
# =================================================

import pandas as pd

df = pd.DataFrame({
    'Produit': ['Laptop', 'Phone', 'Tablet', 'Watch'],
    'Prix_HT': [1000, 800, 450, 200],
    'Quantite': [5, 10, 8, 20],
    'Categorie': ['Informatique', 'Telephonie', 'Informatique', 'Accessoires']
})

# Exercice 1 : Créer des colonnes
df['Total_HT'] = df['Prix_HT'] * df['Quantite']
df['TVA'] = df['Total_HT'] * 0.20
df['Total_TTC'] = df['Total_HT'] + df['TVA']

print("Avec calculs:\n", df)


# Exercice 2 : Apply avec lambda
df['Gamme'] = df['Prix_HT'].apply(lambda x: "Premium" if x >= 800 else "Standard")

print("Avec Gamme:\n", df)


# Exercice 3 : Map pour remplacer
mapping = {'Informatique': 'INFO', 'Telephonie': 'TEL', 'Accessoires': 'ACC'}
df['Code_Cat'] = df['Categorie'].map(mapping)

print("Avec codes:\n", df)


# Exercice 4 : Renommer et réordonner
df = df.rename(columns={'Prix_HT': 'Prix_Unitaire'})
df = df[['Produit', 'Categorie', 'Prix_Unitaire', 'Quantite', 'Total_TTC']]

print("Réordonné:\n", df)
