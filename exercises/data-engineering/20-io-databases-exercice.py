# =================================================
# Module 20 : Connexion aux Bases de Données - EXERCICES
# =================================================

import pandas as pd

# Note: Ces exercices nécessitent une base de données configurée
# Exemples avec SQLite (intégré à Python)

import sqlite3

# Créer une base de données SQLite en mémoire
conn = sqlite3.connect(':memory:')

# Données d'exemple
df = pd.DataFrame({
    'id': [1, 2, 3],
    'nom': ['Alice', 'Bob', 'Charlie'],
    'departement': ['IT', 'RH', 'IT']
})

# Exercice 1 : Écrire dans une base de données
# -----------------------------------------------
# TODO: Sauvegarder df dans une table 'employes'
# df.to_sql('employes', conn, if_exists='replace', index=False)


# Exercice 2 : Lire depuis une base de données
# -----------------------------------------------
# TODO: Lire toute la table
# df_read = pd.read_sql('SELECT * FROM employes', conn)

# TODO: Lire avec une condition
# df_it = pd.read_sql("SELECT * FROM employes WHERE departement = 'IT'", conn)


# Exercice 3 : Requêtes complexes
# ---------------------------------
# TODO: Compter par département
query = """
    SELECT departement, COUNT(*) as nb_employes
    FROM employes
    GROUP BY departement
"""
# df_count = pd.read_sql(query, conn)


# Exercice 4 : Paramètres de requête
# ------------------------------------
# TODO: Requête avec paramètre
dept = 'IT'
# df_param = pd.read_sql(
#     "SELECT * FROM employes WHERE departement = ?", 
#     conn, 
#     params=[dept]
# )

print("Exercices de connexion BDD")
conn.close()
