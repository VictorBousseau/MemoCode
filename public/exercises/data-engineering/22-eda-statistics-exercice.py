# =================================================
# Module 22 : EDA Statistiques - EXERCICES
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
# ----------------------------------------
# TODO: Afficher les statistiques de base
stats = None  # df.describe()

print("Statistiques descriptives:\n", stats)


# Exercice 2 : Statistiques par groupe
# --------------------------------------
# TODO: Calculer la moyenne de salaire par département
salaire_par_dept = None  # groupby + mean

print("Salaire moyen par département:\n", salaire_par_dept)


# Exercice 3 : Distribution
# ---------------------------
# TODO: Calculer les quantiles (25%, 50%, 75%)
quantiles = None  # df['salaire'].quantile([0.25, 0.5, 0.75])

# TODO: Calculer l'écart interquartile (IQR)
iqr = None

print("Quantiles:\n", quantiles)
print("IQR:", iqr)


# Exercice 4 : Valeurs uniques et comptages
# -------------------------------------------
# TODO: Compter les valeurs par département
comptage = None  # value_counts()

# TODO: Obtenir les valeurs uniques
valeurs_uniques = None  # unique()

print("Comptage:\n", comptage)


# Exercice 5 : Info sur les données
# -----------------------------------
# TODO: Afficher les types et valeurs manquantes
# df.info()
# df.isnull().sum()

print("Types:\n", df.dtypes)
