# =================================================
# Module 12 : Gestion des Doublons - SOLUTION
# =================================================

import pandas as pd

df = pd.DataFrame({
    'id': [1, 2, 2, 3, 3, 3, 4],
    'nom': ['Alice', 'Bob', 'Bob', 'Charlie', 'Charlie', 'Charlie', 'Diana'],
    'email': ['alice@mail.com', 'bob@mail.com', 'bob@mail.com', 
              'charlie@mail.com', 'charlie@gmail.com', 'charlie@mail.com', 'diana@mail.com'],
    'score': [85, 90, 90, 75, 80, 75, 95]
})

print("DataFrame original:\n", df)

# Exercice 1 : Détecter les doublons
doublons_complets = df.duplicated()
doublons_id = df.duplicated(subset=['id'])

print("Doublons complets:", doublons_complets.tolist())
print("Doublons id:", doublons_id.tolist())


# Exercice 2 : Supprimer les doublons
df_unique = df.drop_duplicates()
df_first = df.drop_duplicates(subset=['id'], keep='first')
df_last = df.drop_duplicates(subset=['id'], keep='last')

print("Sans doublons exacts:\n", df_unique)
print("Première par id:\n", df_first)


# Exercice 3 : Agrégation des doublons
idx = df.groupby('id')['score'].idxmax()
df_max_score = df.loc[idx]

print("Score max par id:\n", df_max_score)
