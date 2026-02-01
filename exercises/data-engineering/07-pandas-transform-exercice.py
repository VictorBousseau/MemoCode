# =================================================
# Module 7 : Transformations - EXERCICES
# =================================================

import pandas as pd

df = pd.DataFrame({
    'Produit': ['Laptop', 'Phone', 'Tablet', 'Watch'],
    'Prix_HT': [1000, 800, 450, 200],
    'Quantite': [5, 10, 8, 20],
    'Categorie': ['Informatique', 'Telephonie', 'Informatique', 'Accessoires']
})

# Exercice 1 : Créer des colonnes
# ---------------------------------
# TODO: Créer une colonne 'Total_HT' = Prix_HT * Quantite
df['Total_HT'] = None

# TODO: Créer une colonne 'TVA' = Total_HT * 0.20
df['TVA'] = None

# TODO: Créer une colonne 'Total_TTC' = Total_HT + TVA
df['Total_TTC'] = None

print("Avec calculs:\n", df)


# Exercice 2 : Apply avec lambda
# --------------------------------
# TODO: Créer une colonne 'Gamme' qui vaut:
#   - "Premium" si Prix_HT >= 800
#   - "Standard" sinon
df['Gamme'] = None  # Utiliser apply avec lambda

print("Avec Gamme:\n", df)


# Exercice 3 : Map pour remplacer
# ---------------------------------
# TODO: Créer un mapping des catégories vers des codes
# Informatique -> 'INFO', Telephonie -> 'TEL', Accessoires -> 'ACC'
mapping = None
df['Code_Cat'] = None

print("Avec codes:\n", df)


# Exercice 4 : Renommer et réordonner
# -------------------------------------
# TODO: Renommer 'Prix_HT' en 'Prix_Unitaire'
df = None  # Utiliser rename()

# TODO: Réordonner: Produit, Categorie, Prix_Unitaire, Quantite, Total_TTC
df = None  # Réordonner les colonnes

print("Réordonné:\n", df)
