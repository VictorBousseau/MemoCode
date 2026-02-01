# =================================================
# Module 12 : Gestion des Doublons - EXERCICES
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
# ------------------------------------
# TODO: Trouver les lignes en double (toutes colonnes)
doublons_complets = None  # df.duplicated()

# TODO: Trouver les doublons basés sur 'id' uniquement
doublons_id = None  # df.duplicated(subset=['id'])

print("Doublons complets:", doublons_complets)
print("Doublons id:", doublons_id)


# Exercice 2 : Supprimer les doublons
# -------------------------------------
# TODO: Supprimer les doublons exacts (toutes colonnes)
df_unique = None

# TODO: Garder la première occurrence par 'id'
df_first = None  # keep='first'

# TODO: Garder la dernière occurrence par 'id'
df_last = None  # keep='last'

print("Sans doublons exacts:\n", df_unique)
print("Première par id:\n", df_first)


# Exercice 3 : Agrégation des doublons
# --------------------------------------
# TODO: Pour chaque id, garder le score le plus élevé
df_max_score = None  # groupby + max ou idxmax

print("Score max par id:\n", df_max_score)
