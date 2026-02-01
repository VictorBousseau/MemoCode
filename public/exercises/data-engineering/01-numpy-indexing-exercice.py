# =================================================
# Module 1 : Indexation et Slicing - EXERCICES
# =================================================

import numpy as np

# Exercice 1 : Indexation basique
# --------------------------------
arr = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

# TODO: Extraire le premier élément
premier = None

# TODO: Extraire le dernier élément (utiliser indexation négative)
dernier = None

# TODO: Extraire le 5ème élément (index 4)
cinquieme = None

print(f"Premier: {premier}, Dernier: {dernier}, 5ème: {cinquieme}")


# Exercice 2 : Slicing
# ---------------------
# TODO: Extraire les 3 premiers éléments
trois_premiers = None

# TODO: Extraire les éléments d'index 2 à 5 (inclus)
milieu = None

# TODO: Extraire tous les éléments pairs (indices 0, 2, 4, ...)
pairs = None

# TODO: Inverser l'array
inverse = None

print(f"3 premiers: {trois_premiers}")
print(f"Milieu: {milieu}")
print(f"Pairs: {pairs}")
print(f"Inversé: {inverse}")


# Exercice 3 : Indexation 2D
# ---------------------------
matrice = np.array([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
])

# TODO: Extraire l'élément ligne 1, colonne 2
element = None

# TODO: Extraire la deuxième ligne entière
ligne = None

# TODO: Extraire la troisième colonne
colonne = None

# TODO: Extraire la sous-matrice 2x2 en haut à gauche
sous_matrice = None

print(f"Element [1,2]: {element}")
print(f"Ligne 1: {ligne}")
print(f"Colonne 2: {colonne}")
print(f"Sous-matrice:\n{sous_matrice}")


# Exercice 4 : Masques booléens
# ------------------------------
notes = np.array([12, 15, 8, 18, 6, 14, 16, 9, 11, 17])

# TODO: Trouver les notes >= 10 (admis)
admis = None

# TODO: Trouver les notes >= 16 (mentions)
mentions = None

# TODO: Compter le nombre d'admis
nb_admis = None

print(f"Notes des admis: {admis}")
print(f"Notes avec mention: {mentions}")
print(f"Nombre d'admis: {nb_admis}")


# =================================================
# Bonus : Modifier avec un masque
# =================================================
# TODO: Remplacer toutes les notes < 10 par 10 (rattrapage)
notes_rattrapees = notes.copy()
# TODO: Appliquer le masque

print(f"Notes après rattrapage: {notes_rattrapees}")
