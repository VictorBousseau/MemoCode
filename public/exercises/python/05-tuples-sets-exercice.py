# =================================================
# Module 5 : Tuples et Sets
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Unpacking de coordonnées
# --------------------------------------
# TODO: Créer un tuple 'point' avec les coordonnées (3, 4)
# TODO: Utiliser l'unpacking pour extraire x et y
# TODO: Calculer la distance à l'origine (√(x² + y²))

point = None  # TODO: Créer le tuple (3, 4)

# TODO: Extraire x et y par unpacking
x = None
y = None

# TODO: Calculer la distance (utiliser ** 0.5 pour la racine carrée)
distance = None

print(f"Point: {point}")
print(f"x = {x}, y = {y}")
print(f"Distance à l'origine: {distance}")


# Exercice 2 : Retourner plusieurs valeurs
# -----------------------------------------
# TODO: Compléter la fonction qui retourne min, max et moyenne d'une liste

def statistiques(nombres):
    """Retourne (minimum, maximum, moyenne) d'une liste."""
    if not nombres:
        return None, None, None
    
    # TODO: Calculer min, max et moyenne
    minimum = None  # Astuce: utiliser min()
    maximum = None  # Astuce: utiliser max()
    moyenne = None  # Astuce: sum() / len()
    
    return minimum, maximum, moyenne

# Test
valeurs = [23, 45, 12, 67, 34, 89, 5]
mini, maxi, moy = statistiques(valeurs)
print(f"Min: {mini}, Max: {maxi}, Moyenne: {moy:.2f}")


# Exercice 3 : Échange de variables
# -----------------------------------
# TODO: Échanger les valeurs de a et b en une seule ligne

a = 10
b = 20
print(f"Avant: a = {a}, b = {b}")

# TODO: Échanger a et b (utiliser l'unpacking de tuples)
# a, b = ???

print(f"Après: a = {a}, b = {b}")


# Exercice 4 : Dédupliquer une liste
# ------------------------------------
# TODO: Utiliser un set pour supprimer les doublons

nombres_avec_doublons = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]

# TODO: Créer une liste sans doublons (ordre non garanti)
nombres_uniques = None  # Astuce: list(set(...))

# TODO: Créer une liste sans doublons en préservant l'ordre
nombres_uniques_ordonnees = None  # Astuce: utiliser dict.fromkeys()

print(f"Avec doublons: {nombres_avec_doublons}")
print(f"Sans doublons: {nombres_uniques}")
print(f"Sans doublons (ordonné): {nombres_uniques_ordonnees}")


# Exercice 5 : Éléments communs entre deux listes
# ------------------------------------------------
# TODO: Trouver les éléments communs et uniques

liste_a = [1, 2, 3, 4, 5, 6]
liste_b = [4, 5, 6, 7, 8, 9]

# TODO: Éléments présents dans les deux listes
communs = None  # Astuce: set(liste_a) & set(liste_b)

# TODO: Éléments uniquement dans liste_a
uniques_a = None  # Astuce: set(liste_a) - set(liste_b)

# TODO: Éléments uniquement dans liste_b
uniques_b = None

# TODO: Tous les éléments (union)
tous = None  # Astuce: set(liste_a) | set(liste_b)

print(f"Éléments communs: {communs}")
print(f"Uniques à A: {uniques_a}")
print(f"Uniques à B: {uniques_b}")
print(f"Tous les éléments: {tous}")


# =================================================
# Bonus : Tuple comme clé de dictionnaire
# =================================================
# Les tuples sont hashables, donc utilisables comme clés !

# TODO: Créer un dictionnaire où les clés sont des coordonnées (tuples)
# et les valeurs sont les noms des villes

villes = None  # TODO: {(48.8566, 2.3522): "Paris", (51.5074, -0.1278): "Londres", ...}

# TODO: Afficher la ville située aux coordonnées (48.8566, 2.3522)
# print(villes[(48.8566, 2.3522)])
