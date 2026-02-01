# =================================================
# Module 1 : Indexation et Slicing - SOLUTION
# =================================================

import numpy as np

# Exercice 1 : Indexation basique
arr = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

premier = arr[0]      # 10
dernier = arr[-1]     # 100
cinquieme = arr[4]    # 50

print(f"Premier: {premier}, Dernier: {dernier}, 5ème: {cinquieme}")


# Exercice 2 : Slicing
trois_premiers = arr[:3]      # [10 20 30]
milieu = arr[2:6]             # [30 40 50 60]
pairs = arr[::2]              # [10 30 50 70 90]
inverse = arr[::-1]           # [100 90 80 ... 10]

print(f"3 premiers: {trois_premiers}")
print(f"Milieu: {milieu}")
print(f"Pairs: {pairs}")
print(f"Inversé: {inverse}")


# Exercice 3 : Indexation 2D
matrice = np.array([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
])

element = matrice[1, 2]       # 7
ligne = matrice[1]            # [5 6 7 8]
colonne = matrice[:, 2]       # [3 7 11]
sous_matrice = matrice[:2, :2]  # [[1 2] [5 6]]

print(f"Element [1,2]: {element}")
print(f"Ligne 1: {ligne}")
print(f"Colonne 2: {colonne}")
print(f"Sous-matrice:\n{sous_matrice}")


# Exercice 4 : Masques booléens
notes = np.array([12, 15, 8, 18, 6, 14, 16, 9, 11, 17])

admis = notes[notes >= 10]
mentions = notes[notes >= 16]
nb_admis = np.sum(notes >= 10)

print(f"Notes des admis: {admis}")       # [12 15 18 14 16 11 17]
print(f"Notes avec mention: {mentions}") # [18 16 17]
print(f"Nombre d'admis: {nb_admis}")     # 7


# Bonus : Modifier avec un masque
notes_rattrapees = notes.copy()
notes_rattrapees[notes_rattrapees < 10] = 10

print(f"Notes après rattrapage: {notes_rattrapees}")
# [12 15 10 18 10 14 16 10 11 17]
