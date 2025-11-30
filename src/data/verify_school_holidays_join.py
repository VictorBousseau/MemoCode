import pandas as pd
import io

# 1. Mock Data
# Mock Holidays Data (similar to what API returns)
csv_data = """Description;Zones;Date de début;Date de fin
Vacances de Noël;Zone A;2023-12-23;2024-01-08
Vacances de Noël;Zone B;2023-12-23;2024-01-08
Vacances de Noël;Zone C;2023-12-23;2024-01-08
Vacances d'Hiver;Zone C;2024-02-10;2024-02-26
Vacances d'Hiver;Zone A;2024-02-17;2024-03-04
Vacances d'Hiver;Zone B;2024-02-24;2024-03-11
"""
df_holidays = pd.read_csv(io.StringIO(csv_data), sep=';')

# Mock User Data (Date, Department)
user_data = {
    'date': [
        '2023-12-25', '2023-12-25', # Noël (Vacances pour tous)
        '2024-01-10', # Rentrée (Pas vacances)
        '2024-02-12', # Vacances Zone C seulement
        '2024-02-12', # Pas vacances Zone A
        '2024-02-20'  # Vacances Zone A
    ],
    'departement': [
        '75', '33', # Paris (C), Gironde (A)
        '75',
        '75', # Paris (C) -> Vacances
        '33', # Gironde (A) -> Pas vacances
        '33'  # Gironde (A) -> Vacances
    ]
}
df_user = pd.DataFrame(user_data)
df_user['date'] = pd.to_datetime(df_user['date']).dt.date

# 2. Logic Implementation

# 2.1 Pre-process Holidays
# Convert to datetime
df_holidays['start'] = pd.to_datetime(df_holidays['Date de début']).dt.date
df_holidays['end'] = pd.to_datetime(df_holidays['Date de fin']).dt.date

# Explode dates to have one row per day per zone
# This is the key step for efficient merging
holiday_dates = []
for _, row in df_holidays.iterrows():
    dates = pd.date_range(start=row['start'], end=row['end'] - pd.Timedelta(days=1), freq='D')
    for d in dates:
        holiday_dates.append({'date': d.date(), 'Zones': row['Zones'], 'vacances_nom': row['Description']})

df_holidays_exploded = pd.DataFrame(holiday_dates)

# 2.2 Map Departments to Zones
DEPARTMENTS_ZONES = {
    '33': 'Zone A',
    '75': 'Zone C'
}
df_user['Zones'] = df_user['departement'].map(DEPARTMENTS_ZONES)

# 2.3 Merge
# Left join to keep all user rows
df_merged = pd.merge(df_user, df_holidays_exploded, on=['date', 'Zones'], how='left')

# 2.4 Fill NaNs
df_merged['en_vacances'] = df_merged['vacances_nom'].notna()
df_merged['vacances_nom'] = df_merged['vacances_nom'].fillna('Non')

# 3. Verification
print("Résultat du merge :")
print(df_merged)

expected_results = [
    True, True,   # Noël
    False,        # Rentrée
    True,         # Zone C Hiver
    False,        # Zone A Hiver (pas encore)
    True          # Zone A Hiver (commencé)
]

assert df_merged['en_vacances'].tolist() == expected_results
print("\n✅ Vérification réussie !")
