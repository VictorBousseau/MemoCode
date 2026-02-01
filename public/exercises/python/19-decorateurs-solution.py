# =================================================
# Module 19 : Décorateurs
# SOLUTION - Fichier corrigé
# =================================================

import functools
import time

# Exercice 1 : Décorateur simple
# ---------------------------------
def mon_decorateur(func):
    """Décorateur qui affiche un message avant et après l'appel."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("Avant l'appel")
        resultat = func(*args, **kwargs)
        print("Après l'appel")
        return resultat
    return wrapper


@mon_decorateur
def dire_bonjour():
    """Dit bonjour."""
    print("Bonjour !")


@mon_decorateur
def addition(a, b):
    """Retourne la somme de a et b."""
    return a + b


# Tests
print("=== Exercice 1 : Décorateur simple ===")
dire_bonjour()
print()
resultat = addition(3, 5)
print(f"Résultat : {resultat}")
print()


# Exercice 2 : Décorateur avec paramètres
# -------------------------------------------
def repeter(n):
    """Décorateur paramétré qui exécute la fonction n fois."""
    def decorateur(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            resultat = None
            for _ in range(n):
                resultat = func(*args, **kwargs)
            return resultat
        return wrapper
    return decorateur


def chronometrer(func):
    """Décorateur qui mesure le temps d'exécution."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        debut = time.time()
        resultat = func(*args, **kwargs)
        duree = time.time() - debut
        print(f"{func.__name__} exécutée en {duree:.4f}s")
        return resultat
    return wrapper


# Tests
print("=== Exercice 2 : Décorateur avec paramètres ===")

@repeter(3)
def saluer(nom):
    print(f"Salut {nom} !")

saluer("Alice")
print()

@chronometrer
def calcul_long():
    return sum(range(1_000_000))

calcul_long()
print()


# Exercice 3 : Décorateur de classe
# -------------------------------------
def verifier_types(*types_attendus):
    """Décorateur qui vérifie les types des arguments."""
    def decorateur(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for i, (arg, type_attendu) in enumerate(zip(args, types_attendus)):
                if not isinstance(arg, type_attendu):
                    raise TypeError(
                        f"Argument {i} : attendu {type_attendu.__name__}, "
                        f"reçu {type(arg).__name__}"
                    )
            return func(*args, **kwargs)
        return wrapper
    return decorateur


def singleton(cls):
    """Décorateur de classe qui garantit une seule instance."""
    instances = {}

    @functools.wraps(cls)
    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return wrapper


# Tests
print("=== Exercice 3 : Décorateur de types ===")

@verifier_types(str, int)
def creer_utilisateur(nom, age):
    return {"nom": nom, "age": age}

print(creer_utilisateur("Alice", 25))
try:
    creer_utilisateur("Alice", "25")
except TypeError as e:
    print(f"TypeError : {e}")

print()

@singleton
class Config:
    def __init__(self):
        self.debug = False

c1 = Config()
c2 = Config()
print(f"Même instance ? {c1 is c2}")  # True
print()


# Exercice 4 : Chaînage de décorateurs
# ----------------------------------------
def en_majuscules(func):
    """Décorateur qui convertit le résultat en majuscules."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        resultat = func(*args, **kwargs)
        if isinstance(resultat, str):
            return resultat.upper()
        return resultat
    return wrapper


def entourer(symbole="*"):
    """Décorateur paramétré qui entoure le résultat avec un symbole."""
    def decorateur(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            resultat = func(*args, **kwargs)
            if isinstance(resultat, str):
                return f"{symbole * 3} {resultat} {symbole * 3}"
            return resultat
        return wrapper
    return decorateur


def journaliser(func):
    """Décorateur qui affiche les arguments et le résultat."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_str = ", ".join(
            [repr(a) for a in args] +
            [f"{k}={v!r}" for k, v in kwargs.items()]
        )
        print(f"[LOG] {func.__name__}({args_str})")
        resultat = func(*args, **kwargs)
        print(f"[LOG] {func.__name__} → {resultat}")
        return resultat
    return wrapper


# Tests
print("=== Exercice 4 : Chaînage ===")

@en_majuscules
@entourer("=")
def titre():
    return "Python"

print(titre())  # === PYTHON ===

@journaliser
def multiplier(a, b):
    return a * b

multiplier(4, 5)
print()


# Exercice 5 : Cas pratique — Cache (memoize)
# -----------------------------------------------
def memoize(func):
    """Décorateur de mise en cache des résultats."""
    cache = {}

    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper


# Tests
print("=== Exercice 5 : Cache (memoize) ===")

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

debut = time.time()
resultat = fibonacci(30)
duree = time.time() - debut
print(f"fibonacci(30) = {resultat} (en {duree:.4f}s)")

debut = time.time()
resultat = fibonacci(30)
duree = time.time() - debut
print(f"fibonacci(30) = {resultat} (cache: {duree:.6f}s)")
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. DÉCORATEUR SIMPLE
   def mon_deco(func):
       @functools.wraps(func)
       def wrapper(*args, **kwargs):
           # avant
           resultat = func(*args, **kwargs)
           # après
           return resultat
       return wrapper

2. DÉCORATEUR PARAMÉTRÉ
   def repeter(n):
       def decorateur(func):
           @functools.wraps(func)
           def wrapper(*args, **kwargs):
               ...
           return wrapper
       return decorateur

3. DÉCORATEUR DE CLASSE
   def singleton(cls):
       instances = {}
       def wrapper(*args, **kwargs):
           if cls not in instances:
               instances[cls] = cls(*args, **kwargs)
           return instances[cls]
       return wrapper

4. CHAÎNAGE
   @deco1       # Appliqué en dernier (sur le résultat de deco2)
   @deco2       # Appliqué en premier (sur la fonction)
   def func():
       ...

5. functools.wraps
   Préserve __name__, __doc__ de la fonction originale
   Toujours l'utiliser dans vos décorateurs !
""")
