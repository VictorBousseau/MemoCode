# =================================================
# Module 26 : Optimisation et Performance - SOLUTION
# =================================================

import pandas as pd
import numpy as np

np.random.seed(42)
n = 100000
df = pd.DataFrame({
    'id': range(n),
    'value': np.random.randn(n),
    'category': np.random.choice(['A', 'B', 'C', 'D'], n),
    'date': pd.date_range('2020-01-01', periods=n, freq='min')
})

# Exercice 1 : Types de données optimisés
print("Mémoire avant:", df.memory_usage(deep=True).sum() / 1024**2, "MB")

df['category'] = df['category'].astype('category')
df['value'] = df['value'].astype('float32')

print("Mémoire après:", df.memory_usage(deep=True).sum() / 1024**2, "MB")


# Exercice 2 : Vectorisation
df['value_double'] = df['value'] * 2
print("Vectorisation appliquée")


# Exercice 3 : Chunking
# for chunk in pd.read_csv('big_file.csv', chunksize=10000):
#     processed = chunk[chunk['value'] > 0]
#     results.append(processed)
# df_final = pd.concat(results)


# Exercice 4 : Query
df_filtered = df.query('value > 0 and category == "A"')
print("Filtré avec query:", len(df_filtered), "lignes")


# Exercice 5 : eval()
df.eval('new_col = value * 2 + id', inplace=True)
print("Nouvelle colonne créée avec eval")
