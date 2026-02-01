# =================================================
# Module 3 : Broadcasting et Reshape - EXERCICES
# =================================================

import numpy as np

# Exercice 1 : Broadcasting basique
# -----------------------------------
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# TODO: Ajouter 10 à tous les éléments (broadcasting scalaire)
arr_plus_10 = None

# TODO: Ajouter [100, 200, 300] à chaque ligne
vecteur = np.array([100, 200, 300])
arr_plus_vecteur = None

print("Original:\n", arr)
print("+ 10:\n", arr_plus_10)
print("+ vecteur:\n", arr_plus_vecteur)


# Exercice 2 : Normalisation avec broadcasting
# ----------------------------------------------
data = np.array([
    [10, 100, 1000],
    [20, 200, 2000],
    [30, 300, 3000]
])

# TODO: Centrer les données (soustraire la moyenne de chaque colonne)
moyennes = data.mean(axis=0)
data_centree = None

# TODO: Normaliser (min-max scaling) chaque colonne entre 0 et 1
mins = data.min(axis=0)
maxs = data.max(axis=0)
data_normalisee = None

print("Moyennes colonnes:", moyennes)
print("Data centrée:\n", data_centree)
print("Data normalisée:\n", data_normalisee)


# Exercice 3 : Reshape
# ---------------------
arr_flat = np.arange(24)

# TODO: Transformer en matrice 4x6
mat_4x6 = None

# TODO: Transformer en matrice 6x4
mat_6x4 = None

# TODO: Transformer en tenseur 3D de shape (2, 3, 4)
tenseur = None

print(f"4x6 shape: {mat_4x6.shape if mat_4x6 is not None else 'None'}")
print(f"6x4 shape: {mat_6x4.shape if mat_6x4 is not None else 'None'}")
print(f"Tenseur shape: {tenseur.shape if tenseur is not None else 'None'}")


# Exercice 4 : Vstack et Hstack
# ------------------------------
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# TODO: Empiler verticalement
vertical = None

# TODO: Empiler horizontalement
horizontal = None

print("Vertical:\n", vertical)
print("Horizontal:\n", horizontal)


# =================================================
# Bonus : Aplatir et transposer
# =================================================
mat = np.array([[1, 2, 3], [4, 5, 6]])

# TODO: Aplatir la matrice
aplati = None

# TODO: Transposer la matrice
transpose = None

print(f"Aplati: {aplati}")
print(f"Transposé:\n{transpose}")
