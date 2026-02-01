# =================================================
# Module 16 : Scaling & Normalisation - SOLUTION
# =================================================

import pandas as pd
import numpy as np

df = pd.DataFrame({
    'age': [25, 32, 45, 28, 55],
    'salaire': [30000, 45000, 80000, 35000, 120000],
    'score': [75, 82, 95, 78, 88]
})

# Exercice 1 : Min-Max Scaling (0-1)
min_val = df['salaire'].min()
max_val = df['salaire'].max()
df['salaire_minmax'] = (df['salaire'] - min_val) / (max_val - min_val)
print("Min-Max Scaling:\n", df[['salaire', 'salaire_minmax']])


# Exercice 2 : Standardisation (Z-score)
mean = df['age'].mean()
std = df['age'].std()
df['age_zscore'] = (df['age'] - mean) / std
print("Standardisation:\n", df[['age', 'age_zscore']])


# Exercice 3 : Scaling avec sklearn
from sklearn.preprocessing import MinMaxScaler, StandardScaler

scaler = MinMaxScaler()
df['score_scaled'] = scaler.fit_transform(df[['score']])
print("Sklearn Scaling:\n", df[['score', 'score_scaled']])


# Exercice 4 : Scaling multi-colonnes
colonnes_num = ['age', 'salaire', 'score']
scaler = StandardScaler()
df_scaled = pd.DataFrame(
    scaler.fit_transform(df[colonnes_num]),
    columns=[f'{c}_scaled' for c in colonnes_num]
)
print("Multi-colonnes scalées:\n", df_scaled)
