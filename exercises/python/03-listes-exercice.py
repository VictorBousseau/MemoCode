# =================================================
# Module 3 : Listes
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Création et manipulation
# --------------------------------------
# TODO: Créer une liste de 5 fruits
fruits = []  # TODO: Ajouter 5 fruits

# TODO: Ajouter "kiwi" à la fin
# TODO: Insérer "mangue" en position 2
# TODO: Supprimer le premier fruit

print(f"Fruits: {fruits}")


# Exercice 2 : Slicing
# ---------------------
nombres = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# TODO: Extraire les 3 premiers éléments
premiers = None

# TODO: Extraire les 3 derniers éléments
derniers = None

# TODO: Extraire les éléments pairs (indices 0, 2, 4...)
pairs = None

# TODO: Inverser la liste
inverse = None

print(f"3 premiers: {premiers}")
print(f"3 derniers: {derniers}")
print(f"Indices pairs: {pairs}")
print(f"Inversé: {inverse}")


# Exercice 3 : List Comprehensions
# ---------------------------------
# TODO: Créer une liste des carrés de 1 à 10 avec list comprehension
carres = None  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# TODO: Créer une liste des nombres pairs de 1 à 20
pairs = None  # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# TODO: Créer une liste avec "pair"/"impair" pour 1 à 5
parite = None  # ["impair", "pair", "impair", "pair", "impair"]

print(f"Carrés: {carres}")
print(f"Pairs: {pairs}")
print(f"Parité: {parite}")


# Exercice 4 : Statistiques
# --------------------------
notes = [85, 90, 78, 92, 88, 76, 95, 89]

# TODO: Calculer la moyenne
moyenne = None

# TODO: Trouver la note min et max
note_min = None
note_max = None

# TODO: Compter combien de notes >= 85
nb_bonnes_notes = None

print(f"Moyenne: {moyenne}")
print(f"Min: {note_min}, Max: {note_max}")
print(f"Notes >= 85: {nb_bonnes_notes}")


# Exercice 5 : Matrice
# ---------------------
# TODO: Créer une matrice 3x3
matrice = [
    # TODO: Ligne 1
    # TODO: Ligne 2
    # TODO: Ligne 3
]

# TODO: Accéder à l'élément en ligne 2, colonne 3
element = None

# TODO: Aplatir la matrice en une seule liste
aplatie = None

print(f"Élément [1][2]: {element}")
print(f"Aplatie: {aplatie}")


# =================================================
# Bonus : Dédoublonner une liste
# =================================================
# TODO: Supprimer les doublons en gardant l'ordre
avec_doublons = [1, 3, 2, 1, 5, 3, 4, 2, 1]

sans_doublons = None  # Devrait être [1, 3, 2, 5, 4]

print(f"Sans doublons: {sans_doublons}")
