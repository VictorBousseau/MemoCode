# =================================================
# Module 11 : Nettoyage des Dates - SOLUTION
# =================================================

import pandas as pd
import numpy as np

df = pd.DataFrame({
    'date_str': ['2024-01-15', '15/01/2024', 'January 15, 2024', '2024/01/15'],
    'timestamp': ['2024-01-15 14:30:00', '2024-01-15T14:30:00', '15-01-2024 14:30', None],
    'year': [2024, 2023, 2022, 2021],
    'month': [1, 6, 12, 3],
    'day': [15, 20, 25, 10]
})

# Exercice 1 : Conversion en datetime
df['date_parsed'] = pd.to_datetime(df['date_str'], errors='coerce', dayfirst=False)
print("Dates parsées:\n", df[['date_str', 'date_parsed']])


# Exercice 2 : Extraction de composants
df['annee'] = df['date_parsed'].dt.year
df['mois'] = df['date_parsed'].dt.month
df['jour_semaine'] = df['date_parsed'].dt.day_name()
print("Composants:\n", df[['date_parsed', 'annee', 'mois', 'jour_semaine']])


# Exercice 3 : Créer une date depuis des colonnes
df['date_combinee'] = pd.to_datetime(df[['year', 'month', 'day']])
print("Date combinée:\n", df['date_combinee'])


# Exercice 4 : Calculs avec dates
dates = pd.DataFrame({
    'debut': pd.to_datetime(['2024-01-01', '2024-03-15', '2024-06-01']),
    'fin': pd.to_datetime(['2024-01-31', '2024-04-15', '2024-06-30'])
})

dates['duree_jours'] = (dates['fin'] - dates['debut']).dt.days
dates['debut_plus_30'] = dates['debut'] + pd.Timedelta(days=30)
print("Calculs dates:\n", dates)
