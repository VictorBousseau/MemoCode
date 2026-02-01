# =================================================
# Module 0 : Introduction à NumPy - EXERCICES
# Fichier d'exercice - À compléter
# =================================================

import numpy as np

# Exercice 1 : Création d'arrays
# --------------------------------
# TODO: Créer un array 1D contenant les nombres de 1 à 10
# TODO: Créer une matrice 3x3 remplie de zéros
# TODO: Créer une matrice identité 4x4

arr_1d = None          # TODO: Remplacer par np.array([...])
matrice_zeros = None   # TODO: Remplacer par np.zeros(...)
matrice_id = None      # TODO: Remplacer par np.eye(...)

print("Array 1D:", arr_1d)
print("Matrice de zéros:\n", matrice_zeros)
print("Matrice identité:\n", matrice_id)


# Exercice 2 : Propriétés des arrays
# -----------------------------------
# TODO: Créer un array 2D de shape (4, 5) avec des valeurs aléatoires
# TODO: Afficher: shape, ndim, size, dtype

arr_2d = None  # TODO: Utiliser np.random.random(...)

print(f"Shape: ???")
print(f"Dimensions: ???")
print(f"Taille totale: ???")
print(f"Type de données: ???")


# Exercice 3 : Séquences numériques
# ----------------------------------
# TODO: Créer un array de 0 à 20 (exclus) avec un pas de 2
# TODO: Créer un array de 10 valeurs espacées uniformément entre 0 et 1

arr_arange = None     # TODO: Utiliser np.arange(...)
arr_linspace = None   # TODO: Utiliser np.linspace(...)

print("arange:", arr_arange)
print("linspace:", arr_linspace)


# Exercice 4 : Opérations vectorisées
# ------------------------------------
# TODO: Créer deux arrays a = [1, 2, 3, 4] et b = [10, 20, 30, 40]
# TODO: Calculer la somme, le produit, et a au carré

a = None  # TODO
b = None  # TODO

somme = None     # TODO: a + b
produit = None   # TODO: a * b
carre = None     # TODO: a ** 2

print(f"Somme: {somme}")
print(f"Produit: {produit}")
print(f"Carré de a: {carre}")


# =================================================
# Bonus : Génération reproductible
# =================================================
# TODO: Utiliser np.random.seed(42) pour générer 
#       5 nombres aléatoires reproductibles

# TODO: Compléter
