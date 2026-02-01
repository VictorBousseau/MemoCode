# =================================================
# Module 22 : EDA Statistiques - SOLUTION
# =================================================

import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'age': np.random.randint(18, 65, 100),
    'salaire': np.random.normal(45000, 15000, 100).astype(int),
    'experience': np.random.randint(0, 30, 100),
    'departement': np.random.choice(['IT', 'RH', 'Finance', 'Marketing'], 100)
})

# Exercice 1 : Statistiques descriptives
stats = df.describe()
print("Statistiques descriptives:\n", stats)


# Exercice 2 : Statistiques par groupe
salaire_par_dept = df.groupby('departement')['salaire'].mean()
print("Salaire moyen par département:\n", salaire_par_dept)


# Exercice 3 : Distribution
quantiles = df['salaire'].quantile([0.25, 0.5, 0.75])
iqr = quantiles[0.75] - quantiles[0.25]
print("Quantiles:\n", quantiles)
print("IQR:", iqr)


# Exercice 4 : Valeurs uniques et comptages
comptage = df['departement'].value_counts()
valeurs_uniques = df['departement'].unique()
print("Comptage:\n", comptage)


# Exercice 5 : Info sur les données
print("Types:\n", df.dtypes)
print("Valeurs manquantes:\n", df.isnull().sum())
