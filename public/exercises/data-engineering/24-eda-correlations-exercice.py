# =================================================
# Module 24 : EDA Corrélations - EXERCICES
# =================================================

import pandas as pd
import numpy as np

np.random.seed(42)
n = 100
df = pd.DataFrame({
    'age': np.random.randint(20, 60, n),
    'experience': np.random.randint(0, 30, n),
    'salaire': np.random.normal(45000, 15000, n),
    'heures_travail': np.random.normal(40, 5, n)
})
# Créer une corrélation artificielle
df['salaire'] = df['salaire'] + df['experience'] * 1000

# Exercice 1 : Matrice de corrélation
# -------------------------------------
# TODO: Calculer la matrice de corrélation
correlation_matrix = None  # df.corr()

print("Matrice de corrélation:\n", correlation_matrix)


# Exercice 2 : Corrélations fortes
# ----------------------------------
# TODO: Identifier les paires avec corrélation > 0.5
# Indice: utiliser np.triu pour éviter les doublons
fortes_correlations = None

print("Corrélations fortes:", fortes_correlations)


# Exercice 3 : Heatmap de corrélation
# -------------------------------------
import matplotlib.pyplot as plt
# import seaborn as sns

# TODO: Créer une heatmap de la matrice de corrélation
# plt.figure(figsize=(10, 8))
# sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
# plt.title('Matrice de corrélation')
# plt.show()


# Exercice 4 : Corrélation de Spearman
# --------------------------------------
# TODO: Calculer la corrélation de Spearman (pour relations non-linéaires)
spearman_corr = None  # df.corr(method='spearman')

print("Corrélation de Spearman:\n", spearman_corr)
