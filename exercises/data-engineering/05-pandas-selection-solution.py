# =================================================
# Module 5 : Sélection et Filtrage - SOLUTION
# =================================================

import pandas as pd

df = pd.DataFrame({
    'Nom': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'],
    'Age': [25, 32, 28, 45, 23, 38],
    'Ville': ['Paris', 'Lyon', 'Paris', 'Marseille', 'Lyon', 'Paris'],
    'Salaire': [45000, 52000, 48000, 65000, 42000, 58000]
})

# Exercice 1 : loc et iloc
ligne_2 = df.iloc[2]
nom_salaire = df[['Nom', 'Salaire']]
subset = df.iloc[:3, :2]

print("Ligne 2:", ligne_2)
print("Nom et Salaire:\n", nom_salaire)


# Exercice 2 : Filtrage
plus_30 = df[df['Age'] > 30]
paris_riches = df[(df['Ville'] == 'Paris') & (df['Salaire'] > 47000)]
lyon_marseille = df[df['Ville'].isin(['Lyon', 'Marseille'])]

print("Plus de 30 ans:\n", plus_30)
print("Paris riches:\n", paris_riches)


# Exercice 3 : Méthode query()
resultat_query = df.query('Age > 25 and Salaire > 50000')

print("Query result:\n", resultat_query)


# Exercice 4 : isin() et between()
villes = df[df['Ville'].isin(['Paris', 'Lyon'])]
age_range = df[df['Age'].between(25, 35)]

print("Paris ou Lyon:\n", villes)
print("Age 25-35:\n", age_range)
