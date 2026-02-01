# =================================================
# Module 21 : Modules Avancés de la Bibliothèque Standard
# SOLUTION - Fichier corrigé
# =================================================

from collections import Counter, defaultdict, namedtuple, deque
import itertools
from datetime import datetime, timedelta, date
from functools import reduce, partial, lru_cache

# Exercice 1 : collections
# ---------------------------
def compter_mots(texte):
    """Compte les occurrences de chaque mot. Retourne le top 3."""
    compteur = Counter(texte.lower().split())
    return compteur.most_common(3)


def grouper_par_categorie(produits):
    """Groupe les produits par catégorie."""
    groupes = defaultdict(list)
    for nom, categorie, prix in produits:
        groupes[categorie].append(nom)
    return dict(groupes)


def creer_point(x, y, z=0):
    """Crée un point 3D avec namedtuple."""
    Point = namedtuple("Point", ["x", "y", "z"])
    return Point(x, y, z)


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
print(f"Point : x={point.x}, y={point.y}, z={point.z}")
print()


# Exercice 2 : itertools avancé
# ---------------------------------
def fenetre_glissante(iterable, taille):
    """Crée une fenêtre glissante sur un itérable."""
    it = iter(iterable)
    fenetre = deque(itertools.islice(it, taille), maxlen=taille)
    if len(fenetre) == taille:
        yield tuple(fenetre)
    for element in it:
        fenetre.append(element)
        yield tuple(fenetre)


def regrouper_consecutifs(iterable):
    """Regroupe les éléments consécutifs identiques."""
    return [(cle, sum(1 for _ in groupe))
            for cle, groupe in itertools.groupby(iterable)]


def permutations_uniques(elements):
    """Retourne les permutations uniques."""
    return sorted(set(itertools.permutations(elements)))


# Tests
print("=== Exercice 2 : itertools avancé ===")
print(f"Fenêtre glissante : {list(fenetre_glissante([1, 2, 3, 4, 5], 3))}")
print(f"Grouper consécutifs : {regrouper_consecutifs('AAABBBCCDA')}")
print(f"Permutations uniques : {permutations_uniques([1, 1, 2])}")
print()


# Exercice 3 : datetime
# -------------------------
def jours_entre(date1_str, date2_str, format_date="%d/%m/%Y"):
    """Calcule le nombre de jours entre deux dates."""
    d1 = datetime.strptime(date1_str, format_date)
    d2 = datetime.strptime(date2_str, format_date)
    return abs((d2 - d1).days)


def prochain_jour_semaine(jour_cible):
    """Retourne la date du prochain jour de la semaine donné."""
    aujourd_hui = date.today()
    jours_restants = (jour_cible - aujourd_hui.weekday()) % 7
    if jours_restants == 0:
        jours_restants = 7
    return aujourd_hui + timedelta(days=jours_restants)


def formater_duree(secondes):
    """Formate une durée en secondes en 'Xh Ym Zs'."""
    heures = secondes // 3600
    minutes = (secondes % 3600) // 60
    secs = secondes % 60
    return f"{heures}h {minutes}m {secs}s"


# Tests
print("=== Exercice 3 : datetime ===")
print(f"Jours entre 01/01/2024 et 15/01/2024 : {jours_entre('01/01/2024', '15/01/2024')}")
print(f"Prochain lundi : {prochain_jour_semaine(0)}")
print(f"Formater 3661s : {formater_duree(3661)}")
print(f"Formater 90s : {formater_duree(90)}")
print()


# Exercice 4 : functools
# -------------------------
def produit_liste(nombres):
    """Calcule le produit de tous les nombres avec reduce."""
    return reduce(lambda a, b: a * b, nombres)


def creer_puissance(exposant):
    """Crée une fonction puissance avec partial."""
    return partial(pow, exp=exposant)


# Note: partial avec pow nécessite un keyword argument
# Alternative plus simple :
def creer_puissance(exposant):
    """Crée une fonction puissance."""
    return lambda base: pow(base, exposant)


def fibonacci_cache(n):
    """Calcule Fibonacci avec lru_cache."""
    @lru_cache(maxsize=None)
    def fib(k):
        if k < 2:
            return k
        return fib(k - 1) + fib(k - 2)
    return fib(n)


# Tests
print("=== Exercice 4 : functools ===")
print(f"Produit de [1,2,3,4] : {produit_liste([1, 2, 3, 4])}")
print(f"Produit de [2,3,5] : {produit_liste([2, 3, 5])}")

puissance_carre = creer_puissance(2)
puissance_cube = creer_puissance(3)
print(f"5² = {puissance_carre(5)}")
print(f"3³ = {puissance_cube(3)}")

print(f"fibonacci_cache(10) : {fibonacci_cache(10)}")
print(f"fibonacci_cache(30) : {fibonacci_cache(30)}")
print()


# Exercice 5 : Cas pratique — Analyse de données
# --------------------------------------------------
def analyser_ventes(ventes):
    """Analyse une liste de ventes avec les modules de la stdlib."""
    # Total des ventes
    total = sum(v["quantite"] * v["prix"] for v in ventes)

    # Produit le plus vendu en quantité
    compteur_produits = Counter()
    for v in ventes:
        compteur_produits[v["produit"]] += v["quantite"]
    produit_top = compteur_produits.most_common(1)[0][0]

    # Panier moyen
    panier_moyen = total / len(ventes) if ventes else 0

    # Ventes par mois
    ventes_par_mois = defaultdict(float)
    for v in ventes:
        dt = datetime.strptime(v["date"], "%d/%m/%Y")
        mois = dt.strftime("%Y-%m")
        ventes_par_mois[mois] += v["quantite"] * v["prix"]

    return {
        "total_ventes": total,
        "produit_top": produit_top,
        "panier_moyen": panier_moyen,
        "ventes_par_mois": dict(ventes_par_mois),
    }


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
print(f"Total ventes : {resultat['total_ventes']:.2f} €")
print(f"Produit top : {resultat['produit_top']}")
print(f"Panier moyen : {resultat['panier_moyen']:.2f} €")
print(f"Par mois : {resultat['ventes_par_mois']}")
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. COLLECTIONS
   Counter("aabbc")            → Counter({'a': 2, 'b': 2, 'c': 1})
   defaultdict(list)           → Pas de KeyError, valeur par défaut
   namedtuple("Point", "x y") → Tuple nommé (immutable)
   deque([1, 2, 3])           → File double-ended efficace

2. ITERTOOLS
   chain(a, b)              → Concaténer
   groupby(data, key)       → Grouper
   combinations(l, n)       → Combinaisons sans répétition
   permutations(l)          → Permutations
   product(a, b)            → Produit cartésien
   islice(gen, n)           → Prendre n éléments

3. DATETIME
   datetime.now()                     → Date/heure actuelle
   datetime.strptime(s, fmt)          → Parser une chaîne
   dt.strftime(fmt)                   → Formater en chaîne
   timedelta(days=7, hours=3)         → Durée
   (d2 - d1).days                     → Différence en jours

4. FUNCTOOLS
   reduce(func, iterable)             → Réduction (fold)
   partial(func, arg)                 → Application partielle
   @lru_cache(maxsize=128)            → Cache automatique
   @wraps(func)                       → Préserver les métadonnées

5. BONNES PRATIQUES
   ✅ Utiliser Counter au lieu de boucles de comptage
   ✅ defaultdict évite les if/else pour initialiser
   ✅ namedtuple pour les données structurées immutables
   ✅ lru_cache pour les fonctions pures récursives
""")
