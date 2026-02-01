# =================================================
# Module 16 : Scaling & Normalisation - EXERCICES
# =================================================

import pandas as pd
import numpy as np

df = pd.DataFrame({
    'age': [25, 32, 45, 28, 55],
    'salaire': [30000, 45000, 80000, 35000, 120000],
    'score': [75, 82, 95, 78, 88]
})

# Exercice 1 : Min-Max Scaling (0-1)
# ------------------------------------
# TODO: Normaliser 'salaire' entre 0 et 1
# Formule: (x - min) / (max - min)
df['salaire_minmax'] = None

print("Min-Max Scaling:\n", df[['salaire', 'salaire_minmax']])


# Exercice 2 : Standardisation (Z-score)
# ----------------------------------------
# TODO: Standardiser 'age' (moyenne=0, écart-type=1)
# Formule: (x - mean) / std
df['age_zscore'] = None

print("Standardisation:\n", df[['age', 'age_zscore']])


# Exercice 3 : Scaling avec sklearn
# -----------------------------------
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# TODO: Utiliser MinMaxScaler sur 'score'
scaler = MinMaxScaler()
df['score_scaled'] = None  # scaler.fit_transform()

print("Sklearn Scaling:\n", df[['score', 'score_scaled']])


# Exercice 4 : Scaling multi-colonnes
# -------------------------------------
# TODO: Appliquer StandardScaler sur toutes les colonnes numériques originales
colonnes_num = ['age', 'salaire', 'score']
scaler = StandardScaler()
df_scaled = None  # DataFrame avec colonnes scalées

print("Multi-colonnes scalées:\n", df_scaled)
