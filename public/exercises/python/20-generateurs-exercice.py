# =================================================
# Module 20 : Générateurs
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Générateur avec yield
# --------------------------------------
# TODO: Créer des générateurs simples

def compteur(debut, fin):
    """
    Générateur qui produit les nombres de debut à fin (inclus).

    Exemple:
        list(compteur(1, 5))  → [1, 2, 3, 4, 5]
    """
    # TODO: Utiliser yield pour produire chaque nombre
    pass


def fibonacci_gen(n):
    """
    Générateur qui produit les n premiers nombres de Fibonacci.

    Exemple:
        list(fibonacci_gen(8))  → [0, 1, 1, 2, 3, 5, 8, 13]
    """
    # TODO: Utiliser yield avec deux variables a, b
    pass


def lire_par_blocs(texte, taille_bloc=3):
    """
    Générateur qui découpe un texte en blocs de taille fixe.

    Exemple:
        list(lire_par_blocs("ABCDEFGH", 3))  → ["ABC", "DEF", "GH"]
    """
    # TODO: Utiliser yield avec un slice
    pass


# Tests
print("=== Exercice 1 : Générateur avec yield ===")
print(f"compteur(1, 5) : {list(compteur(1, 5))}")
print(f"fibonacci_gen(8) : {list(fibonacci_gen(8))}")
print(f"lire_par_blocs('ABCDEFGH', 3) : {list(lire_par_blocs('ABCDEFGH', 3))}")
print()


# Exercice 2 : Expressions génératrices
# -----------------------------------------
# TODO: Réécrire des list comprehensions en expressions génératrices

def somme_carres_gen(n):
    """
    Calcule la somme des carrés de 1 à n en utilisant
    une expression génératrice (pas de liste en mémoire).

    Exemple:
        somme_carres_gen(4)  → 1 + 4 + 9 + 16 = 30
    """
    # TODO: Utiliser sum() avec une expression génératrice (x**2 for x in ...)
    pass


def mots_longs(phrase, longueur_min=5):
    """
    Retourne une liste des mots de la phrase ayant au moins
    longueur_min caractères, en majuscules.
    Utiliser une expression génératrice.

    Exemple:
        mots_longs("Le petit chat mange beaucoup")  → ["PETIT", "MANGE", "BEAUCOUP"]
    """
    # TODO: Utiliser une expression génératrice avec filtrage
    pass


def aplatir(listes):
    """
    Générateur qui aplatit une liste de listes.

    Exemple:
        list(aplatir([[1, 2], [3], [4, 5, 6]]))  → [1, 2, 3, 4, 5, 6]
    """
    # TODO: Utiliser yield dans une double boucle
    pass


# Tests
print("=== Exercice 2 : Expressions génératrices ===")
print(f"somme_carres_gen(4) : {somme_carres_gen(4)}")  # 30
print(f"somme_carres_gen(10) : {somme_carres_gen(10)}")  # 385
print(f"mots_longs('Le petit chat mange beaucoup') : {mots_longs('Le petit chat mange beaucoup')}")
print(f"aplatir([[1,2],[3],[4,5,6]]) : {list(aplatir([[1, 2], [3], [4, 5, 6]]))}")
print()


# Exercice 3 : itertools
# -------------------------
# TODO: Utiliser les fonctions du module itertools

import itertools

def grouper_par_parite(nombres):
    """
    Groupe les nombres par parité en utilisant itertools.groupby.
    Les nombres doivent être triés avant le groupement.

    Retourne un dict: {"pair": [...], "impair": [...]}

    Exemple:
        grouper_par_parite([1, 2, 3, 4, 5, 6])
        → {"pair": [2, 4, 6], "impair": [1, 3, 5]}
    """
    # TODO: Trier, puis utiliser itertools.groupby avec une clé de parité
    pass


def combinaisons_equipes(joueurs, taille=2):
    """
    Génère toutes les combinaisons possibles d'équipes.
    Utilise itertools.combinations.

    Exemple:
        combinaisons_equipes(["A", "B", "C"], 2)
        → [("A", "B"), ("A", "C"), ("B", "C")]
    """
    # TODO: Utiliser itertools.combinations
    pass


def produit_cartesien(couleurs, tailles):
    """
    Génère le produit cartésien de couleurs et tailles.
    Utilise itertools.product.

    Exemple:
        produit_cartesien(["rouge", "bleu"], ["S", "M"])
        → [("rouge", "S"), ("rouge", "M"), ("bleu", "S"), ("bleu", "M")]
    """
    # TODO: Utiliser itertools.product
    pass


# Tests
print("=== Exercice 3 : itertools ===")
print(f"Grouper par parité : {grouper_par_parite([1, 2, 3, 4, 5, 6])}")
print(f"Combinaisons : {combinaisons_equipes(['Alice', 'Bob', 'Charlie'], 2)}")
print(f"Produit cartésien : {produit_cartesien(['rouge', 'bleu'], ['S', 'M'])}")
print()


# Exercice 4 : Pipeline de générateurs
# ----------------------------------------
# TODO: Chaîner des générateurs pour traiter des données

def lire_lignes(texte):
    """
    Générateur qui produit chaque ligne d'un texte multiligne.

    Exemple:
        list(lire_lignes("a\\nb\\nc"))  → ["a", "b", "c"]
    """
    # TODO: Utiliser yield pour chaque ligne (split sur \\n)
    pass


def filtrer_commentaires(lignes):
    """
    Générateur qui filtre les lignes vides et les commentaires (#).

    Exemple:
        list(filtrer_commentaires(["# titre", "", "donnée", "# fin"]))
        → ["donnée"]
    """
    # TODO: yield les lignes non vides et ne commençant pas par #
    pass


def parser_csv(lignes, separateur=","):
    """
    Générateur qui parse chaque ligne CSV en liste de valeurs.

    Exemple:
        list(parser_csv(["a,b,c", "1,2,3"]))
        → [["a", "b", "c"], ["1", "2", "3"]]
    """
    # TODO: yield le résultat de split() pour chaque ligne
    pass


# Tests
print("=== Exercice 4 : Pipeline de générateurs ===")
texte_csv = """# Fichier de données
nom,age,ville

Alice,25,Paris
Bob,30,Lyon
# fin du fichier
Charlie,28,Marseille"""

# Pipeline : lire → filtrer → parser
lignes = lire_lignes(texte_csv)
lignes_propres = filtrer_commentaires(lignes)
donnees = list(parser_csv(lignes_propres))
print(f"Données parsées : {donnees}")
print()


# Exercice 5 : Cas pratique — Générateur infini
# -------------------------------------------------
# TODO: Créer un générateur infini avec contrôle

def nombres_premiers():
    """
    Générateur infini qui produit les nombres premiers.
    Utilise le crible d'Ératosthène de manière paresseuse.

    Exemple:
        gen = nombres_premiers()
        [next(gen) for _ in range(5)]  → [2, 3, 5, 7, 11]
    """
    # TODO: Tester chaque nombre >= 2 pour voir s'il est premier
    # TODO: Un nombre est premier s'il n'est divisible par aucun nombre
    #       de 2 à sa racine carrée
    pass


def prendre(generateur, n):
    """
    Prend les n premiers éléments d'un générateur (comme itertools.islice).

    Exemple:
        prendre(compteur(1, 100), 5)  → [1, 2, 3, 4, 5]
    """
    # TODO: Utiliser next() dans une boucle ou itertools.islice
    pass


# Tests
print("=== Exercice 5 : Générateur infini ===")
if nombres_premiers is not None:
    gen = nombres_premiers()
    if gen is not None:
        premiers = prendre(gen, 10)
        print(f"10 premiers nombres premiers : {premiers}")
    else:
        print("TODO: Implémenter nombres_premiers")
else:
    print("TODO: Implémenter nombres_premiers")

if prendre is not None:
    resultat = prendre(fibonacci_gen(20), 7)
    print(f"7 premiers Fibonacci : {resultat}")
else:
    print("TODO: Implémenter prendre")
print()
