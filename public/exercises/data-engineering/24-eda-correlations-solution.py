# =================================================
# Module 24 : EDA Corrélations - SOLUTION
# =================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
n = 100
df = pd.DataFrame({
    'age': np.random.randint(20, 60, n),
    'experience': np.random.randint(0, 30, n),
    'salaire': np.random.normal(45000, 15000, n),
    'heures_travail': np.random.normal(40, 5, n)
})
df['salaire'] = df['salaire'] + df['experience'] * 1000

# Exercice 1 : Matrice de corrélation
correlation_matrix = df.corr()
print("Matrice de corrélation:\n", correlation_matrix)


# Exercice 2 : Corrélations fortes
mask = np.triu(np.ones_like(correlation_matrix, dtype=bool), k=1)
fortes = correlation_matrix.where(mask)
fortes_correlations = fortes[fortes.abs() > 0.5].stack()
print("Corrélations fortes:\n", fortes_correlations)


# Exercice 3 : Heatmap de corrélation
plt.figure(figsize=(10, 8))
plt.imshow(correlation_matrix, cmap='coolwarm', aspect='auto')
plt.colorbar()
plt.xticks(range(len(correlation_matrix.columns)), correlation_matrix.columns, rotation=45)
plt.yticks(range(len(correlation_matrix.columns)), correlation_matrix.columns)
plt.title('Matrice de corrélation')
plt.tight_layout()
plt.savefig('heatmap_correlation.png')
plt.close()


# Exercice 4 : Corrélation de Spearman
spearman_corr = df.corr(method='spearman')
print("Corrélation de Spearman:\n", spearman_corr)
