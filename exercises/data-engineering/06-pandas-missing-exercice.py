# =================================================
# Module 6 : Valeurs Manquantes - EXERCICES
# =================================================

import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Nom': ['Alice', 'Bob', None, 'Diana', 'Eve'],
    'Age': [25, np.nan, 28, 45, 23],
    'Salaire': [45000, 52000, np.nan, 65000, np.nan],
    'Ville': ['Paris', 'Lyon', 'Paris', None, 'Lyon']
})

print("DataFrame original:")
print(df)

# Exercice 1 : Détecter les valeurs manquantes
# ----------------------------------------------
# TODO: Créer un masque booléen des valeurs manquantes
masque = None

# TODO: Compter les valeurs manquantes par colonne
count_na = None

# TODO: Calculer le pourcentage de valeurs manquantes par colonne
pct_na = None

print("Masque NaN:\n", masque)
print("Count NaN:\n", count_na)
print("% NaN:\n", pct_na)


# Exercice 2 : Supprimer les valeurs manquantes
# -----------------------------------------------
# TODO: Supprimer les lignes avec au moins un NaN
df_dropna = None

# TODO: Supprimer les lignes où Salaire est NaN
df_dropna_salaire = None

print("Après dropna:\n", df_dropna)


# Exercice 3 : Remplir les valeurs manquantes
# ---------------------------------------------
df_filled = df.copy()

# TODO: Remplir les Ages manquants par la médiane
df_filled['Age'] = None

# TODO: Remplir les Salaires manquants par la moyenne
df_filled['Salaire'] = None

# TODO: Remplir les Villes manquantes par "Inconnue"
df_filled['Ville'] = None

print("Après remplissage:\n", df_filled)


# Exercice 4 : Forward/Backward fill
# ------------------------------------
series = pd.Series([1, np.nan, np.nan, 4, 5, np.nan])

# TODO: Remplir avec la valeur précédente (forward fill)
ffill = None

# TODO: Remplir avec la valeur suivante (backward fill)
bfill = None

print("Original:", series.tolist())
print("Forward fill:", ffill.tolist() if ffill is not None else None)
print("Backward fill:", bfill.tolist() if bfill is not None else None)
