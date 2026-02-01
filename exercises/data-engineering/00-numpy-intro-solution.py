# =================================================
# Module 0 : Introduction à NumPy - SOLUTION
# Fichier corrigé
# =================================================

import numpy as np

# Exercice 1 : Création d'arrays
# --------------------------------
arr_1d = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
matrice_zeros = np.zeros((3, 3))
matrice_id = np.eye(4)

print("Array 1D:", arr_1d)
print("Matrice de zéros:\n", matrice_zeros)
print("Matrice identité:\n", matrice_id)


# Exercice 2 : Propriétés des arrays
# -----------------------------------
arr_2d = np.random.random((4, 5))

print(f"Shape: {arr_2d.shape}")
print(f"Dimensions: {arr_2d.ndim}")
print(f"Taille totale: {arr_2d.size}")
print(f"Type de données: {arr_2d.dtype}")


# Exercice 3 : Séquences numériques
# ----------------------------------
arr_arange = np.arange(0, 20, 2)
arr_linspace = np.linspace(0, 1, 10)

print("arange:", arr_arange)
# [0 2 4 6 8 10 12 14 16 18]
print("linspace:", arr_linspace)
# [0. 0.11 0.22 0.33 0.44 0.56 0.67 0.78 0.89 1.]


# Exercice 4 : Opérations vectorisées
# ------------------------------------
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

somme = a + b
produit = a * b
carre = a ** 2

print(f"Somme: {somme}")       # [11 22 33 44]
print(f"Produit: {produit}")   # [10 40 90 160]
print(f"Carré de a: {carre}")  # [1 4 9 16]


# =================================================
# Bonus : Génération reproductible
# =================================================
np.random.seed(42)
nombres = np.random.random(5)
print("Nombres reproductibles:", nombres)
# Toujours les mêmes valeurs grâce au seed !
