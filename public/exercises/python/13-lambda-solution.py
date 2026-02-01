# =================================================
# Module 13 : Lambda, Map & Filter
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Lambdas de base
# ------------------------------
carre = lambda x: x ** 2
est_pair = lambda n: n % 2 == 0
longueur = lambda mot: len(mot)
maximum = lambda a, b: a if a > b else b

# Tests
print("=== Exercice 1 : Lambdas de base ===")
print(f"carré(5) = {carre(5)}")            # 25
print(f"est_pair(4) = {est_pair(4)}")      # True
print(f"est_pair(7) = {est_pair(7)}")      # False
print(f"longueur('Python') = {longueur('Python')}")  # 6
print(f"max(3, 7) = {maximum(3, 7)}")      # 7
print()


# Exercice 2 : map() - Transformation
# --------------------------------------

# a) Celsius → Fahrenheit
celsius = [0, 10, 20, 25, 30, 37, 100]
fahrenheit = list(map(lambda c: round(c * 9/5 + 32, 1), celsius))

# b) Extraire les noms
personnes = [
    {"nom": "Alice", "age": 25},
    {"nom": "Bob", "age": 30},
    {"nom": "Charlie", "age": 35}
]
noms = list(map(lambda p: p["nom"], personnes))

# c) Majuscules
mots = ["hello", "world", "python"]
majuscules = list(map(str.upper, mots))  # On peut passer la méthode directement

# Tests
print("=== Exercice 2 : map() ===")
print(f"Fahrenheit : {fahrenheit}")
print(f"Noms : {noms}")
print(f"Majuscules : {majuscules}")
print()


# Exercice 3 : filter() - Filtrage
# -----------------------------------

# a) Nombres positifs
nombres = [-5, 3, -1, 0, 7, -2, 8, -4, 6]
positifs = list(filter(lambda x: x > 0, nombres))

# b) Mots commençant par une voyelle
mots = ["apple", "banana", "orange", "kiwi", "avocado", "grape", "elderberry"]
commence_par_voyelle = list(filter(lambda m: m[0].lower() in "aeiou", mots))

# c) Emails valides
emails = ["alice@mail.com", "invalid", "bob@mail", "charlie@site.org", "", "test@.com"]
emails_valides = list(filter(lambda e: e and "@" in e and "." in e.split("@")[-1], emails))

# Tests
print("=== Exercice 3 : filter() ===")
print(f"Positifs : {positifs}")
print(f"Voyelle : {commence_par_voyelle}")
print(f"Emails valides : {emails_valides}")
print()


# Exercice 4 : Combiner map() et filter()
# ------------------------------------------
def noms_majeurs_majuscules(personnes):
    """Retourne les noms en majuscules des personnes majeures."""
    return list(map(
        lambda p: p[0].upper(),
        filter(lambda p: p[1] >= 18, personnes)
    ))

# Version avec list comprehension (plus Pythonique)
def noms_majeurs_majuscules_v2(personnes):
    return [nom.upper() for nom, age in personnes if age >= 18]

# Test
print("=== Exercice 4 : Combiner map et filter ===")
personnes = [("Alice", 25), ("Bob", 16), ("Charlie", 30), ("Diana", 14), ("Eve", 22)]
print(noms_majeurs_majuscules(personnes))
# ['ALICE', 'CHARLIE', 'EVE']
print()


# Exercice 5 : reduce()
# -----------------------
from functools import reduce

# a) Produit
nombres = [2, 3, 4, 5]
produit = reduce(lambda acc, x: acc * x, nombres)

# b) Chaîne la plus longue
mots = ["Python", "est", "un", "langage", "fantastique"]
plus_long = reduce(lambda a, b: a if len(a) > len(b) else b, mots)

# c) Aplatir
listes = [[1, 2], [3, 4], [5, 6], [7, 8]]
aplatie = reduce(lambda acc, x: acc + x, listes)

# Tests
print("=== Exercice 5 : reduce() ===")
print(f"Produit : {produit}")      # 120
print(f"Plus long : {plus_long}")  # "fantastique"
print(f"Aplatie : {aplatie}")      # [1, 2, 3, 4, 5, 6, 7, 8]
print()


# Exercice 6 : Pipeline complet
# --------------------------------
def pipeline_etudiants(etudiants):
    """Pipeline : filtrer >= 10 → formater → trier par note desc."""
    # 1. Filtrer les réussites
    reussis = filter(lambda e: e["note"] >= 10, etudiants)

    # 2. Trier par note décroissante
    tries = sorted(reussis, key=lambda e: e["note"], reverse=True)

    # 3. Formater en messages
    messages = list(map(lambda e: f"{e['nom']}: {e['note']}/20", tries))

    return messages

# Version avec list comprehension
def pipeline_etudiants_v2(etudiants):
    reussis = [e for e in etudiants if e["note"] >= 10]
    reussis.sort(key=lambda e: e["note"], reverse=True)
    return [f"{e['nom']}: {e['note']}/20" for e in reussis]

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
print()


# Exercice 7 : sorted() avec lambda
# ------------------------------------

# a) Trier par le 2e élément
donnees = [("Python", 3), ("JavaScript", 1), ("Java", 2), ("Rust", 5), ("Go", 4)]
par_rang = sorted(donnees, key=lambda x: x[1])

# b) Trier par la dernière lettre
mots = ["banana", "cherry", "apple", "date", "elderberry"]
par_derniere = sorted(mots, key=lambda m: m[-1])

# Tests
print("=== Exercice 7 : sorted() avec lambda ===")
print(f"Par rang : {par_rang}")
print(f"Par dernière lettre : {par_derniere}")
print()


# =================================================
# Bonus : Implémenter votre propre map et filter
# =================================================
def mon_map(func, iterable):
    """Réimplémentation de map()."""
    for item in iterable:
        yield func(item)

def mon_filter(func, iterable):
    """Réimplémentation de filter()."""
    for item in iterable:
        if func(item):
            yield item

# Versions avec list comprehension
def mon_map_v2(func, iterable):
    return [func(item) for item in iterable]

def mon_filter_v2(func, iterable):
    return [item for item in iterable if func(item)]

# Tests
print("=== Bonus : Mon map et filter ===")
print(list(mon_map(lambda x: x * 2, [1, 2, 3])))        # [2, 4, 6]
print(list(mon_filter(lambda x: x > 2, [1, 2, 3, 4])))  # [3, 4]
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. LAMBDA
   lambda params: expression
   → Fonction anonyme sur une seule ligne
   → Utilisée principalement comme argument de map/filter/sorted

2. MAP
   map(fonction, iterable)
   → Applique la fonction à chaque élément
   → Retourne un itérateur (utiliser list() pour convertir)

3. FILTER
   filter(fonction, iterable)
   → Garde les éléments où fonction retourne True
   → filter(None, lst) → supprime les valeurs falsy

4. REDUCE
   from functools import reduce
   reduce(fonction, iterable, valeur_initiale)
   → Accumule les éléments en une seule valeur

5. SORTED avec KEY
   sorted(lst, key=lambda x: critere)
   → Tri personnalisé sans modifier l'original

6. COMPRÉHENSION vs FONCTIONNEL
   [f(x) for x in lst]          ↔  list(map(f, lst))
   [x for x in lst if cond(x)]  ↔  list(filter(cond, lst))
   → Les compréhensions sont souvent plus lisibles en Python
""")
