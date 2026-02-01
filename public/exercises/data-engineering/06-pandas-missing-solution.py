# =================================================
# Module 6 : Valeurs Manquantes - SOLUTION
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
masque = df.isna()
count_na = df.isna().sum()
pct_na = df.isna().mean() * 100

print("Masque NaN:\n", masque)
print("Count NaN:\n", count_na)
print("% NaN:\n", pct_na)


# Exercice 2 : Supprimer les valeurs manquantes
df_dropna = df.dropna()
df_dropna_salaire = df.dropna(subset=['Salaire'])

print("Après dropna:\n", df_dropna)


# Exercice 3 : Remplir les valeurs manquantes
df_filled = df.copy()
df_filled['Age'] = df_filled['Age'].fillna(df_filled['Age'].median())
df_filled['Salaire'] = df_filled['Salaire'].fillna(df_filled['Salaire'].mean())
df_filled['Ville'] = df_filled['Ville'].fillna("Inconnue")

print("Après remplissage:\n", df_filled)


# Exercice 4 : Forward/Backward fill
series = pd.Series([1, np.nan, np.nan, 4, 5, np.nan])
ffill = series.ffill()
bfill = series.bfill()

print("Original:", series.tolist())
print("Forward fill:", ffill.tolist())
print("Backward fill:", bfill.tolist())
