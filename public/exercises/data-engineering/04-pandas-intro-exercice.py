# =================================================
# Module 4 : Introduction à Pandas - EXERCICES
# =================================================

import pandas as pd
import numpy as np

# Exercice 1 : Création de DataFrame
# ------------------------------------
# TODO: Créer un DataFrame avec les colonnes suivantes:
#   - Produit: ["Laptop", "Phone", "Tablet", "Watch"]
#   - Prix: [1200, 800, 450, 350]
#   - Stock: [15, 50, 30, 100]

data = None  # TODO: Créer le dictionnaire
df = None    # TODO: Créer le DataFrame

print("DataFrame créé:")
print(df)


# Exercice 2 : Exploration de données
# -------------------------------------
# Utilisez le DataFrame ci-dessous
employes = pd.DataFrame({
    'Nom': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Département': ['IT', 'RH', 'IT', 'Finance', 'RH'],
    'Salaire': [55000, 48000, 62000, 58000, 45000],
    'Ancienneté': [3, 5, 7, 4, 2]
})

# TODO: Afficher les 3 premières lignes
head_3 = None

# TODO: Afficher les infos du DataFrame (shape, dtypes)
print("Shape:", None)
print("Types:\n", None)

# TODO: Afficher les statistiques descriptives
stats = None

print("Premières lignes:\n", head_3)
print("Statistiques:\n", stats)


# Exercice 3 : Accès aux colonnes
# ---------------------------------
# TODO: Extraire la colonne 'Salaire' (comme Series)
salaires = None

# TODO: Extraire les colonnes 'Nom' et 'Salaire' (comme DataFrame)
nom_salaire = None

# TODO: Ajouter une colonne 'Salaire_Mensuel' (salaire / 12)
employes['Salaire_Mensuel'] = None

print("Salaires:\n", salaires)
print("Nom et Salaire:\n", nom_salaire)
print("Avec salaire mensuel:\n", employes)


# Exercice 4 : Lecture/Écriture CSV
# -----------------------------------
# TODO: Sauvegarder le DataFrame employes dans 'employes.csv'
# (sans l'index)

# TODO: Relire le fichier CSV dans un nouveau DataFrame
# employes_from_csv = None

print("Exercice CSV: créez et lisez le fichier")


# =================================================
# Bonus : Series avec index personnalisé
# =================================================
# TODO: Créer une Series avec les ventes par jour
# Index: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
# Valeurs: [150, 200, 180, 220, 250]

ventes = None  # TODO

print("Ventes par jour:\n", ventes)
