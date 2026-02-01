# =================================================
# Module 20 : Connexion aux Bases de Données - SOLUTION
# =================================================

import pandas as pd
import sqlite3

conn = sqlite3.connect(':memory:')

df = pd.DataFrame({
    'id': [1, 2, 3],
    'nom': ['Alice', 'Bob', 'Charlie'],
    'departement': ['IT', 'RH', 'IT']
})

# Exercice 1 : Écrire dans une base de données
df.to_sql('employes', conn, if_exists='replace', index=False)
print("Table 'employes' créée")


# Exercice 2 : Lire depuis une base de données
df_read = pd.read_sql('SELECT * FROM employes', conn)
print("Lecture complète:\n", df_read)

df_it = pd.read_sql("SELECT * FROM employes WHERE departement = 'IT'", conn)
print("Département IT:\n", df_it)


# Exercice 3 : Requêtes complexes
query = """
    SELECT departement, COUNT(*) as nb_employes
    FROM employes
    GROUP BY departement
"""
df_count = pd.read_sql(query, conn)
print("Comptage par département:\n", df_count)


# Exercice 4 : Paramètres de requête
dept = 'IT'
df_param = pd.read_sql(
    "SELECT * FROM employes WHERE departement = ?", 
    conn, 
    params=[dept]
)
print("Avec paramètre:\n", df_param)

conn.close()
