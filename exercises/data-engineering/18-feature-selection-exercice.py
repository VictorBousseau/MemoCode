# =================================================
# Module 18 : Feature Selection - EXERCICES
# =================================================

import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'feature_a': np.random.randn(100),
    'feature_b': np.random.randn(100),
    'feature_c': np.random.randn(100) * 0.001,  # Très faible variance
    'feature_d': [1] * 100,  # Variance nulle
    'target': np.random.randint(0, 2, 100)
})

# Exercice 1 : Supprimer les features à faible variance
# -------------------------------------------------------
# TODO: Identifier les colonnes avec variance < 0.01
variances = None  # df.var()
low_variance_cols = None

print("Variances:\n", variances)
print("Colonnes à faible variance:", low_variance_cols)


# Exercice 2 : Corrélation avec la target
# -----------------------------------------
# TODO: Calculer la corrélation de chaque feature avec 'target'
correlations = None  # df.corr()['target']

print("Corrélations avec target:\n", correlations)


# Exercice 3 : Feature Selection avec sklearn
# ---------------------------------------------
from sklearn.feature_selection import VarianceThreshold, SelectKBest, f_classif

X = df[['feature_a', 'feature_b', 'feature_c', 'feature_d']]
y = df['target']

# TODO: Utiliser VarianceThreshold pour filtrer
selector = VarianceThreshold(threshold=0.01)
X_filtered = None  # selector.fit_transform(X)

print("Features après VarianceThreshold:", X_filtered.shape if X_filtered is not None else None)


# Exercice 4 : SelectKBest
# --------------------------
# TODO: Sélectionner les 2 meilleures features
selector_kbest = SelectKBest(f_classif, k=2)
X_best = None

print("2 meilleures features:", X_best.shape if X_best is not None else None)
