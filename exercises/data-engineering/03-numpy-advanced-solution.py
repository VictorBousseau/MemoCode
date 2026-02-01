# =================================================
# Module 3 : Broadcasting et Reshape - SOLUTION
# =================================================

import numpy as np

# Exercice 1 : Broadcasting basique
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
arr_plus_10 = arr + 10
vecteur = np.array([100, 200, 300])
arr_plus_vecteur = arr + vecteur

print("Original:\n", arr)
print("+ 10:\n", arr_plus_10)
print("+ vecteur:\n", arr_plus_vecteur)


# Exercice 2 : Normalisation avec broadcasting
data = np.array([
    [10, 100, 1000],
    [20, 200, 2000],
    [30, 300, 3000]
])

moyennes = data.mean(axis=0)
data_centree = data - moyennes

mins = data.min(axis=0)
maxs = data.max(axis=0)
data_normalisee = (data - mins) / (maxs - mins)

print("Moyennes colonnes:", moyennes)
print("Data centrée:\n", data_centree)
print("Data normalisée:\n", data_normalisee)


# Exercice 3 : Reshape
arr_flat = np.arange(24)

mat_4x6 = arr_flat.reshape(4, 6)
mat_6x4 = arr_flat.reshape(6, 4)
tenseur = arr_flat.reshape(2, 3, 4)

print(f"4x6 shape: {mat_4x6.shape}")
print(f"6x4 shape: {mat_6x4.shape}")
print(f"Tenseur shape: {tenseur.shape}")


# Exercice 4 : Vstack et Hstack
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

vertical = np.vstack([a, b])
horizontal = np.hstack([a, b])

print("Vertical:\n", vertical)
print("Horizontal:\n", horizontal)


# Bonus : Aplatir et transposer
mat = np.array([[1, 2, 3], [4, 5, 6]])
aplati = mat.flatten()
transpose = mat.T

print(f"Aplati: {aplati}")
print(f"Transposé:\n{transpose}")
