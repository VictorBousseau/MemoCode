# =================================================
# Module 18 : Feature Selection - SOLUTION
# =================================================

import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'feature_a': np.random.randn(100),
    'feature_b': np.random.randn(100),
    'feature_c': np.random.randn(100) * 0.001,
    'feature_d': [1] * 100,
    'target': np.random.randint(0, 2, 100)
})

# Exercice 1 : Supprimer les features à faible variance
variances = df.var()
low_variance_cols = variances[variances < 0.01].index.tolist()
print("Variances:\n", variances)
print("Colonnes à faible variance:", low_variance_cols)


# Exercice 2 : Corrélation avec la target
correlations = df.corr()['target'].drop('target')
print("Corrélations avec target:\n", correlations)


# Exercice 3 : Feature Selection avec sklearn
from sklearn.feature_selection import VarianceThreshold, SelectKBest, f_classif

X = df[['feature_a', 'feature_b', 'feature_c', 'feature_d']]
y = df['target']

selector = VarianceThreshold(threshold=0.01)
X_filtered = selector.fit_transform(X)
print("Features après VarianceThreshold:", X_filtered.shape)


# Exercice 4 : SelectKBest
selector_kbest = SelectKBest(f_classif, k=2)
X_best = selector_kbest.fit_transform(X, y)
print("2 meilleures features:", X_best.shape)
