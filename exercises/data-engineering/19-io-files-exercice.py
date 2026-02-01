# =================================================
# Module 19 : Lecture/Écriture de Fichiers - EXERCICES
# =================================================

import pandas as pd

# Données d'exemple
df = pd.DataFrame({
    'nom': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'ville': ['Paris', 'Lyon', 'Marseille']
})

# Exercice 1 : Écriture CSV
# ---------------------------
# TODO: Sauvegarder df en CSV sans l'index
# df.to_csv('output.csv', index=False)

# TODO: Sauvegarder avec séparateur point-virgule
# df.to_csv('output_semicolon.csv', sep=';', index=False)


# Exercice 2 : Lecture CSV avec options
# ---------------------------------------
# TODO: Lire un CSV avec des options spécifiques
# df_read = pd.read_csv('file.csv', 
#                       sep=';',
#                       encoding='utf-8',
#                       na_values=['N/A', 'missing'])


# Exercice 3 : Excel
# --------------------
# TODO: Sauvegarder en Excel
# df.to_excel('output.xlsx', sheet_name='Données', index=False)

# TODO: Lire depuis Excel (feuille spécifique)
# df_excel = pd.read_excel('file.xlsx', sheet_name='Sheet1')


# Exercice 4 : JSON
# -------------------
# TODO: Sauvegarder en JSON (format records)
json_str = None  # df.to_json(orient='records')

# TODO: Lire depuis JSON
# df_json = pd.read_json('file.json')

print("JSON:\n", json_str)


# Exercice 5 : Parquet (format optimisé)
# ----------------------------------------
# TODO: Sauvegarder en Parquet
# df.to_parquet('output.parquet')

# TODO: Lire depuis Parquet
# df_parquet = pd.read_parquet('file.parquet')

print("Exercices de lecture/écriture de fichiers")
