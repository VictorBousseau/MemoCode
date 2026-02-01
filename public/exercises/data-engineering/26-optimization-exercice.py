# =================================================
# Module 26 : Optimisation et Performance - EXERCICES
# =================================================

import pandas as pd
import numpy as np

# Créer un grand DataFrame pour les tests de performance
np.random.seed(42)
n = 100000
df = pd.DataFrame({
    'id': range(n),
    'value': np.random.randn(n),
    'category': np.random.choice(['A', 'B', 'C', 'D'], n),
    'date': pd.date_range('2020-01-01', periods=n, freq='min')
})

# Exercice 1 : Types de données optimisés
# -----------------------------------------
print("Mémoire avant:", df.memory_usage(deep=True).sum() / 1024**2, "MB")

# TODO: Convertir 'category' en type 'category'
df['category'] = None  # astype('category')

# TODO: Convertir les floats en float32 si possible
df['value'] = None  # astype('float32')

print("Mémoire après:", df.memory_usage(deep=True).sum() / 1024**2, "MB")


# Exercice 2 : Éviter les boucles (vectorisation)
# -------------------------------------------------
# Mauvaise pratique:
# result = []
# for i in range(len(df)):
#     result.append(df.iloc[i]['value'] * 2)

# TODO: Utiliser la vectorisation
df['value_double'] = None  # df['value'] * 2


# Exercice 3 : Chunking pour gros fichiers
# ------------------------------------------
# TODO: Lire un fichier CSV par morceaux
# for chunk in pd.read_csv('big_file.csv', chunksize=10000):
#     process(chunk)


# Exercice 4 : Query pour le filtrage
# -------------------------------------
# TODO: Utiliser query() au lieu de filtrage classique
# df_filtered = df.query('value > 0 and category == "A"')


# Exercice 5 : eval() pour les calculs complexes
# ------------------------------------------------
# TODO: Utiliser eval pour des calculs multi-colonnes
# df.eval('new_col = value * 2 + id', inplace=True)

print("Exercices d'optimisation de performance")
