# =================================================
# Module 13 : Détection des Outliers - EXERCICES
# =================================================

import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'salaire': [35000, 42000, 38000, 45000, 150000, 41000, 39000, 200000, 43000, 37000],
    'age': [25, 32, 28, 45, 35, 130, 29, 33, 27, 31],  # 130 est une erreur
    'score': [85, 90, 78, 92, 88, 95, 82, 89, 91, 87]
})

print("DataFrame:\n", df)

# Exercice 1 : Détection par IQR
# --------------------------------
# TODO: Calculer Q1, Q3, IQR pour 'salaire'
Q1 = None
Q3 = None
IQR = None

# TODO: Définir les bornes (Q1 - 1.5*IQR, Q3 + 1.5*IQR)
borne_inf = None
borne_sup = None

# TODO: Identifier les outliers
outliers_salaire = None

print(f"Bornes: [{borne_inf}, {borne_sup}]")
print("Outliers salaire:\n", outliers_salaire)


# Exercice 2 : Détection par Z-score
# ------------------------------------
# TODO: Calculer le z-score pour chaque salaire
z_scores = None  # (x - mean) / std

# TODO: Identifier les valeurs avec |z-score| > 2
outliers_zscore = None

print("Z-scores:\n", z_scores)


# Exercice 3 : Traitement des outliers
# --------------------------------------
df_clean = df.copy()

# TODO: Remplacer les outliers de salaire par la médiane
mediane_salaire = None
# df_clean.loc[condition, 'salaire'] = mediane_salaire

# TODO: Capper l'âge à un max de 100
# df_clean['age'] = df_clean['age'].clip(upper=100)

print("Data nettoyée:\n", df_clean)
