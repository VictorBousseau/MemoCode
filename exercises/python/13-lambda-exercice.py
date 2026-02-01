# =================================================
# Module 13 : Lambda, Map & Filter
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Lambdas de base
# ------------------------------
# TODO: Créer des fonctions lambda pour les opérations suivantes

# a) Lambda qui retourne le carré d'un nombre
carre = None  # TODO: lambda

# b) Lambda qui vérifie si un nombre est pair
est_pair = None  # TODO: lambda

# c) Lambda qui retourne la longueur d'un mot
longueur = None  # TODO: lambda

# d) Lambda qui retourne le maximum de deux nombres
maximum = None  # TODO: lambda

# Tests
print("=== Exercice 1 : Lambdas de base ===")
# print(f"carré(5) = {carre(5)}")            # 25
# print(f"est_pair(4) = {est_pair(4)}")      # True
# print(f"est_pair(7) = {est_pair(7)}")      # False
# print(f"longueur('Python') = {longueur('Python')}")  # 6
# print(f"max(3, 7) = {maximum(3, 7)}")      # 7
print()


# Exercice 2 : map() - Transformation
# --------------------------------------
# TODO: Utiliser map() pour transformer des données

# a) Convertir une liste de températures Celsius → Fahrenheit
celsius = [0, 10, 20, 25, 30, 37, 100]
# TODO: fahrenheit = list(map(...))
fahrenheit = None

# b) Extraire les noms d'une liste de dictionnaires
personnes = [
    {"nom": "Alice", "age": 25},
    {"nom": "Bob", "age": 30},
    {"nom": "Charlie", "age": 35}
]
# TODO: noms = list(map(...))
noms = None

# c) Mettre tous les mots en majuscules
mots = ["hello", "world", "python"]
# TODO: majuscules = list(map(...))
majuscules = None

# Tests
print("=== Exercice 2 : map() ===")
# print(f"Fahrenheit : {fahrenheit}")  # [32.0, 50.0, 68.0, 77.0, 86.0, 98.6, 212.0]
# print(f"Noms : {noms}")             # ['Alice', 'Bob', 'Charlie']
# print(f"Majuscules : {majuscules}") # ['HELLO', 'WORLD', 'PYTHON']
print()


# Exercice 3 : filter() - Filtrage
# -----------------------------------
# TODO: Utiliser filter() pour sélectionner des éléments

# a) Garder uniquement les nombres positifs
nombres = [-5, 3, -1, 0, 7, -2, 8, -4, 6]
# TODO: positifs = list(filter(...))
positifs = None

# b) Garder les mots qui commencent par une voyelle
mots = ["apple", "banana", "orange", "kiwi", "avocado", "grape", "elderberry"]
# TODO: commence_par_voyelle = list(filter(...))
commence_par_voyelle = None

# c) Garder les emails valides (contiennent @ et .)
emails = ["alice@mail.com", "invalid", "bob@mail", "charlie@site.org", "", "test@.com"]
# TODO: emails_valides = list(filter(...))
emails_valides = None

# Tests
print("=== Exercice 3 : filter() ===")
# print(f"Positifs : {positifs}")              # [3, 7, 8, 6]
# print(f"Voyelle : {commence_par_voyelle}")   # ['apple', 'orange', 'avocado', 'elderberry']
# print(f"Emails valides : {emails_valides}")  # ['alice@mail.com', 'charlie@site.org']
print()


# Exercice 4 : Combiner map() et filter()
# ------------------------------------------
# TODO: Chaîner map et filter pour des transformations complexes

def noms_majeurs_majuscules(personnes):
    """
    À partir d'une liste de (nom, age), retourne les noms en
    majuscules des personnes majeures (>= 18).

    Exemple:
        [("Alice", 25), ("Bob", 16), ("Charlie", 30)]
        → ["ALICE", "CHARLIE"]
    """
    # TODO: Utiliser filter() puis map()
    pass

# Test
print("=== Exercice 4 : Combiner map et filter ===")
personnes = [("Alice", 25), ("Bob", 16), ("Charlie", 30), ("Diana", 14), ("Eve", 22)]
print(noms_majeurs_majuscules(personnes))
# Attendu: ['ALICE', 'CHARLIE', 'EVE']
print()


# Exercice 5 : reduce()
# -----------------------
from functools import reduce

# a) Calculer le produit de tous les éléments
nombres = [2, 3, 4, 5]
# TODO: produit = reduce(...)
produit = None

# b) Trouver la chaîne la plus longue
mots = ["Python", "est", "un", "langage", "fantastique"]
# TODO: plus_long = reduce(...)
plus_long = None

# c) Aplatir une liste de listes
listes = [[1, 2], [3, 4], [5, 6], [7, 8]]
# TODO: aplatie = reduce(...)
aplatie = None

# Tests
print("=== Exercice 5 : reduce() ===")
# print(f"Produit : {produit}")      # 120
# print(f"Plus long : {plus_long}")  # "fantastique"
# print(f"Aplatie : {aplatie}")      # [1, 2, 3, 4, 5, 6, 7, 8]
print()


# Exercice 6 : Pipeline complet
# --------------------------------
# TODO: Créer un pipeline de traitement de données

def pipeline_etudiants(etudiants):
    """
    Pipeline de traitement :
    1. Filtrer les étudiants avec une note >= 10
    2. Transformer en message "Nom: note/20"
    3. Trier par note décroissante

    Args:
        etudiants: Liste de dicts {"nom": str, "note": int}

    Returns:
        list: Messages triés
    """
    # TODO: Utiliser filter(), map() et sorted()
    pass

# Test
print("=== Exercice 6 : Pipeline complet ===")
etudiants = [
    {"nom": "Alice", "note": 15},
    {"nom": "Bob", "note": 8},
    {"nom": "Charlie", "note": 18},
    {"nom": "Diana", "note": 6},
    {"nom": "Eve", "note": 12},
    {"nom": "Frank", "note": 20}
]
resultat = pipeline_etudiants(etudiants)
print("Résultats :")
for r in resultat:
    print(f"  {r}")
# Attendu:
#   Frank: 20/20
#   Charlie: 18/20
#   Alice: 15/20
#   Eve: 12/20
print()


# Exercice 7 : sorted() avec lambda
# ------------------------------------
# TODO: Trier des données complexes

# a) Trier des tuples par le 2e élément
donnees = [("Python", 3), ("JavaScript", 1), ("Java", 2), ("Rust", 5), ("Go", 4)]
# TODO: par_rang = sorted(...)
par_rang = None

# b) Trier des strings par leur dernière lettre
mots = ["banana", "cherry", "apple", "date", "elderberry"]
# TODO: par_derniere = sorted(...)
par_derniere = None

# Tests
print("=== Exercice 7 : sorted() avec lambda ===")
# print(f"Par rang : {par_rang}")
# Attendu: [('JavaScript', 1), ('Java', 2), ('Python', 3), ('Go', 4), ('Rust', 5)]
# print(f"Par dernière lettre : {par_derniere}")
# Attendu: ['banana', 'apple', 'date', 'elderberry', 'cherry']
print()


# =================================================
# Bonus : Implémenter votre propre map et filter
# =================================================

def mon_map(func, iterable):
    """Réimplémentation de map()."""
    # TODO: Utiliser une boucle ou un générateur
    pass

def mon_filter(func, iterable):
    """Réimplémentation de filter()."""
    # TODO: Utiliser une boucle ou un générateur
    pass

# Tests
# print("=== Bonus : Mon map et filter ===")
# print(list(mon_map(lambda x: x * 2, [1, 2, 3])))      # [2, 4, 6]
# print(list(mon_filter(lambda x: x > 2, [1, 2, 3, 4])))  # [3, 4]
