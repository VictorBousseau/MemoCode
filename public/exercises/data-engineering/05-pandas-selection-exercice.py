# =================================================
# Module 5 : Sélection et Filtrage - EXERCICES
# =================================================

import pandas as pd

df = pd.DataFrame({
    'Nom': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'],
    'Age': [25, 32, 28, 45, 23, 38],
    'Ville': ['Paris', 'Lyon', 'Paris', 'Marseille', 'Lyon', 'Paris'],
    'Salaire': [45000, 52000, 48000, 65000, 42000, 58000]
})

# Exercice 1 : loc et iloc
# --------------------------
# TODO: Sélectionner la ligne d'index 2 avec iloc
ligne_2 = None

# TODO: Sélectionner les colonnes 'Nom' et 'Salaire' pour toutes les lignes
nom_salaire = None

# TODO: Sélectionner les 3 premières lignes et les 2 premières colonnes
subset = None

print("Ligne 2:", ligne_2)
print("Nom et Salaire:\n", nom_salaire)


# Exercice 2 : Filtrage
# ----------------------
# TODO: Filtrer les employés de plus de 30 ans
plus_30 = None

# TODO: Filtrer les employés de Paris avec salaire > 47000
paris_riches = None

# TODO: Filtrer les employés de Lyon OU Marseille
lyon_marseille = None

print("Plus de 30 ans:\n", plus_30)
print("Paris riches:\n", paris_riches)


# Exercice 3 : Méthode query()
# -----------------------------
# TODO: Utiliser query() pour trouver Age > 25 et Salaire > 50000
resultat_query = None

print("Query result:\n", resultat_query)


# Exercice 4 : isin() et between()
# ---------------------------------
# TODO: Filtrer les employés dont la ville est dans ['Paris', 'Lyon']
villes = None

# TODO: Filtrer les employés avec âge entre 25 et 35
age_range = None

print("Paris ou Lyon:\n", villes)
print("Age 25-35:\n", age_range)
