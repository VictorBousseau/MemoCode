# =================================================
# Module 19 : Lecture/Écriture de Fichiers - SOLUTION
# =================================================

import pandas as pd

df = pd.DataFrame({
    'nom': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'ville': ['Paris', 'Lyon', 'Marseille']
})

# Exercice 1 : Écriture CSV
df.to_csv('output.csv', index=False)
df.to_csv('output_semicolon.csv', sep=';', index=False)


# Exercice 2 : Lecture CSV avec options
# df_read = pd.read_csv('output.csv', 
#                       sep=',',
#                       encoding='utf-8',
#                       na_values=['N/A', 'missing'])


# Exercice 3 : Excel
# df.to_excel('output.xlsx', sheet_name='Données', index=False)
# df_excel = pd.read_excel('output.xlsx', sheet_name='Données')


# Exercice 4 : JSON
json_str = df.to_json(orient='records', force_ascii=False)
print("JSON:\n", json_str)

# df_json = pd.read_json(json_str)


# Exercice 5 : Parquet
# df.to_parquet('output.parquet')
# df_parquet = pd.read_parquet('output.parquet')

print("Fichiers créés: output.csv, output_semicolon.csv")
