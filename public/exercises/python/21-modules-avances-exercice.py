# =================================================
# Module 21 : Modules Avancés de la Bibliothèque Standard
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : collections
# ---------------------------
# TODO: Utiliser les structures du module collections

from collections import Counter, defaultdict, namedtuple, deque

def compter_mots(texte):
    """
    Compte les occurrences de chaque mot dans un texte.
    Retourne les 3 mots les plus fréquents.

    Exemple:
        compter_mots("le chat le chien le chat")
        → [("le", 3), ("chat", 2), ("chien", 1)]
    """
    # TODO: Utiliser Counter et sa méthode most_common()
    pass


def grouper_par_categorie(produits):
    """
    Groupe une liste de produits par catégorie.
    Chaque produit est un tuple (nom, catégorie, prix).

    Retourne un dict: {catégorie: [noms...]}

    Exemple:
        produits = [("pomme", "fruit", 1.5), ("carotte", "légume", 0.8)]
        → {"fruit": ["pomme"], "légume": ["carotte"]}
    """
    # TODO: Utiliser defaultdict(list)
    pass


def creer_point(x, y, z=0):
    """
    Crée un point 3D en utilisant namedtuple.
    Retourne un namedtuple Point avec les champs x, y, z.

    Exemple:
        p = creer_point(1, 2, 3)
        p.x → 1, p.y → 2, p.z → 3
    """
    # TODO: Définir Point = namedtuple("Point", ["x", "y", "z"])
    pass


# Tests
print("=== Exercice 1 : collections ===")
texte = "le chat mange le poisson le chat dort le chien joue"
print(f"Top 3 mots : {compter_mots(texte)}")

produits = [
    ("pomme", "fruit", 1.5), ("carotte", "légume", 0.8),
    ("banane", "fruit", 1.2), ("tomate", "légume", 2.0),
    ("orange", "fruit", 1.8),
]
print(f"Par catégorie : {grouper_par_categorie(produits)}")

point = creer_point(3, 4, 5)
if point is not None:
    print(f"Point : x={point.x}, y={point.y}, z={point.z}")
else:
    print("TODO: Implémenter creer_point")
print()


# Exercice 2 : itertools avancé
# ---------------------------------
# TODO: Utiliser itertools pour des opérations avancées

import itertools

def fenetre_glissante(iterable, taille):
    """
    Crée une fenêtre glissante sur un itérable.

    Exemple:
        list(fenetre_glissante([1, 2, 3, 4, 5], 3))
        → [(1, 2, 3), (2, 3, 4), (3, 4, 5)]
    """
    # TODO: Utiliser itertools.islice et zip
    pass


def regrouper_consecutifs(iterable):
    """
    Regroupe les éléments consécutifs identiques.

    Exemple:
        regrouper_consecutifs("AAABBBCCDA")
        → [("A", 3), ("B", 3), ("C", 2), ("D", 1), ("A", 1)]
    """
    # TODO: Utiliser itertools.groupby
    pass


def permutations_uniques(elements):
    """
    Retourne les permutations uniques (sans doublons).

    Exemple:
        permutations_uniques([1, 1, 2])
        → [(1, 1, 2), (1, 2, 1), (2, 1, 1)]
    """
    # TODO: Utiliser itertools.permutations et un set pour dédupliquer
    pass


# Tests
print("=== Exercice 2 : itertools avancé ===")
print(f"Fenêtre glissante : {list(fenetre_glissante([1, 2, 3, 4, 5], 3))}")
print(f"Grouper consécutifs : {regrouper_consecutifs('AAABBBCCDA')}")
print(f"Permutations uniques : {permutations_uniques([1, 1, 2])}")
print()


# Exercice 3 : datetime
# -------------------------
# TODO: Manipuler des dates et heures

from datetime import datetime, timedelta, date

def jours_entre(date1_str, date2_str, format_date="%d/%m/%Y"):
    """
    Calcule le nombre de jours entre deux dates (chaînes).

    Exemple:
        jours_entre("01/01/2024", "15/01/2024")  → 14
    """
    # TODO: Utiliser datetime.strptime() et la soustraction
    pass


def prochain_jour_semaine(jour_cible):
    """
    Retourne la date du prochain jour de la semaine donné.
    jour_cible: 0=lundi, 1=mardi, ..., 6=dimanche

    Exemple:
        # Si on est mercredi 15 jan
        prochain_jour_semaine(0)  → date du prochain lundi
    """
    # TODO: Calculer la différence en jours
    pass


def formater_duree(secondes):
    """
    Formate une durée en secondes en "Xh Ym Zs".

    Exemple:
        formater_duree(3661)  → "1h 1m 1s"
        formater_duree(90)    → "0h 1m 30s"
    """
    # TODO: Utiliser timedelta ou des divisions entières
    pass


# Tests
print("=== Exercice 3 : datetime ===")
print(f"Jours entre 01/01/2024 et 15/01/2024 : {jours_entre('01/01/2024', '15/01/2024')}")
print(f"Prochain lundi : {prochain_jour_semaine(0)}")
print(f"Formater 3661s : {formater_duree(3661)}")
print(f"Formater 90s : {formater_duree(90)}")
print()


# Exercice 4 : functools
# -------------------------
# TODO: Utiliser functools pour la programmation fonctionnelle

from functools import reduce, partial, lru_cache

def produit_liste(nombres):
    """
    Calcule le produit de tous les nombres d'une liste.
    Utilise functools.reduce.

    Exemple:
        produit_liste([1, 2, 3, 4])  → 24
    """
    # TODO: Utiliser reduce avec une fonction lambda
    pass


def creer_puissance(exposant):
    """
    Crée une fonction qui élève un nombre à une puissance fixe.
    Utilise functools.partial.

    Exemple:
        carre = creer_puissance(2)
        carre(5)  → 25
        cube = creer_puissance(3)
        cube(3)   → 27
    """
    # TODO: Utiliser partial avec pow
    pass


def fibonacci_cache(n):
    """
    Calcule le n-ième nombre de Fibonacci avec cache (lru_cache).
    Utilise le décorateur @lru_cache.

    Exemple:
        fibonacci_cache(10)  → 55
        fibonacci_cache(30)  → 832040
    """
    # TODO: Implémenter avec @lru_cache
    # Note: Comme c'est dans une fonction, utilisez une fonction interne
    pass


# Tests
print("=== Exercice 4 : functools ===")
print(f"Produit de [1,2,3,4] : {produit_liste([1, 2, 3, 4])}")
print(f"Produit de [2,3,5] : {produit_liste([2, 3, 5])}")

puissance_carre = creer_puissance(2)
puissance_cube = creer_puissance(3)
if puissance_carre is not None:
    print(f"5² = {puissance_carre(5)}")
    print(f"3³ = {puissance_cube(3)}")
else:
    print("TODO: Implémenter creer_puissance")

print(f"fibonacci_cache(10) : {fibonacci_cache(10)}")
print(f"fibonacci_cache(30) : {fibonacci_cache(30)}")
print()


# Exercice 5 : Cas pratique — Analyse de données
# --------------------------------------------------
# TODO: Combiner plusieurs modules pour analyser des données

def analyser_ventes(ventes):
    """
    Analyse une liste de ventes.
    Chaque vente est un dict: {"produit": str, "quantite": int, "prix": float, "date": str}

    Retourne un dict:
    {
        "total_ventes": float,
        "produit_top": str (le plus vendu en quantité),
        "panier_moyen": float,
        "ventes_par_mois": {mois: total...}
    }

    Exemple:
        ventes = [
            {"produit": "A", "quantite": 5, "prix": 10.0, "date": "15/01/2024"},
            {"produit": "B", "quantite": 3, "prix": 20.0, "date": "20/01/2024"},
        ]
    """
    # TODO: Utiliser Counter pour les quantités
    # TODO: Utiliser defaultdict pour grouper par mois
    # TODO: Calculer le total et la moyenne
    pass


# Tests
print("=== Exercice 5 : Analyse de données ===")
ventes = [
    {"produit": "Widget A", "quantite": 10, "prix": 15.0, "date": "15/01/2024"},
    {"produit": "Widget B", "quantite": 5, "prix": 25.0, "date": "20/01/2024"},
    {"produit": "Widget A", "quantite": 8, "prix": 15.0, "date": "10/02/2024"},
    {"produit": "Widget C", "quantite": 3, "prix": 50.0, "date": "15/02/2024"},
    {"produit": "Widget B", "quantite": 7, "prix": 25.0, "date": "05/03/2024"},
    {"produit": "Widget A", "quantite": 12, "prix": 15.0, "date": "20/03/2024"},
]

resultat = analyser_ventes(ventes)
if resultat is not None:
    print(f"Total ventes : {resultat['total_ventes']:.2f} €")
    print(f"Produit top : {resultat['produit_top']}")
    print(f"Panier moyen : {resultat['panier_moyen']:.2f} €")
    print(f"Par mois : {resultat['ventes_par_mois']}")
else:
    print("TODO: Implémenter analyser_ventes")
print()
