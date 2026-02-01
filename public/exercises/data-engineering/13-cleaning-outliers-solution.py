# =================================================
# Module 13 : Détection des Outliers - SOLUTION
# =================================================

import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'salaire': [35000, 42000, 38000, 45000, 150000, 41000, 39000, 200000, 43000, 37000],
    'age': [25, 32, 28, 45, 35, 130, 29, 33, 27, 31],
    'score': [85, 90, 78, 92, 88, 95, 82, 89, 91, 87]
})

# Exercice 1 : Détection par IQR
Q1 = df['salaire'].quantile(0.25)
Q3 = df['salaire'].quantile(0.75)
IQR = Q3 - Q1

borne_inf = Q1 - 1.5 * IQR
borne_sup = Q3 + 1.5 * IQR

outliers_salaire = df[(df['salaire'] < borne_inf) | (df['salaire'] > borne_sup)]

print(f"Bornes: [{borne_inf}, {borne_sup}]")
print("Outliers salaire:\n", outliers_salaire)


# Exercice 2 : Détection par Z-score
mean = df['salaire'].mean()
std = df['salaire'].std()
z_scores = (df['salaire'] - mean) / std

outliers_zscore = df[np.abs(z_scores) > 2]

print("Z-scores:\n", z_scores)


# Exercice 3 : Traitement des outliers
df_clean = df.copy()

mediane_salaire = df_clean['salaire'].median()
mask = (df_clean['salaire'] < borne_inf) | (df_clean['salaire'] > borne_sup)
df_clean.loc[mask, 'salaire'] = mediane_salaire

df_clean['age'] = df_clean['age'].clip(upper=100)

print("Data nettoyée:\n", df_clean)
