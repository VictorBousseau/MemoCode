# =================================================
# Module 19 : Décorateurs
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Décorateur simple
# ---------------------------------
# TODO: Créer un décorateur qui affiche un message avant et après l'appel

def mon_decorateur(func):
    """
    Décorateur qui affiche "Avant l'appel" puis "Après l'appel"
    autour de l'exécution de la fonction décorée.

    Exemple:
        @mon_decorateur
        def dire_bonjour():
            print("Bonjour !")

        dire_bonjour()
        # Avant l'appel
        # Bonjour !
        # Après l'appel
    """
    # TODO: Définir une fonction wrapper qui affiche les messages
    # TODO: Utiliser functools.wraps pour préserver les métadonnées
    pass


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
if mon_decorateur is not None:
    dire_bonjour()
    print()
    resultat = addition(3, 5)
    print(f"Résultat : {resultat}")
else:
    print("TODO: Implémenter mon_decorateur")
print()


# Exercice 2 : Décorateur avec paramètres
# -------------------------------------------
# TODO: Créer un décorateur qui répète l'appel N fois

def repeter(n):
    """
    Décorateur paramétré qui exécute la fonction n fois.

    Exemple:
        @repeter(3)
        def saluer(nom):
            print(f"Salut {nom} !")

        saluer("Alice")
        # Salut Alice !
        # Salut Alice !
        # Salut Alice !
    """
    # TODO: Retourner un décorateur qui appelle la fonction n fois
    pass


def chronometrer(func):
    """
    Décorateur qui mesure le temps d'exécution d'une fonction.
    Affiche le temps en secondes après l'appel.

    Exemple:
        @chronometrer
        def calcul():
            sum(range(1000000))

        calcul()  # calcul exécutée en 0.0234s
    """
    # TODO: Utiliser time.time() pour mesurer la durée
    pass


# Tests
print("=== Exercice 2 : Décorateur avec paramètres ===")
if repeter is not None and repeter(2) is not None:
    @repeter(3)
    def saluer(nom):
        print(f"Salut {nom} !")

    saluer("Alice")
else:
    print("TODO: Implémenter repeter")

print()

if chronometrer is not None:
    @chronometrer
    def calcul_long():
        return sum(range(1_000_000))

    calcul_long()
else:
    print("TODO: Implémenter chronometrer")
print()


# Exercice 3 : Décorateur de classe
# -------------------------------------
# TODO: Créer un décorateur qui vérifie les types des arguments

def verifier_types(*types_attendus):
    """
    Décorateur qui vérifie les types des arguments positionnels.
    Lève TypeError si un argument n'a pas le bon type.

    Exemple:
        @verifier_types(str, int)
        def creer_utilisateur(nom, age):
            return {"nom": nom, "age": age}

        creer_utilisateur("Alice", 25)   # OK
        creer_utilisateur("Alice", "25") # TypeError
    """
    # TODO: Comparer chaque argument avec le type attendu
    pass


def singleton(cls):
    """
    Décorateur de classe qui garantit qu'une seule instance existe.

    Exemple:
        @singleton
        class Config:
            def __init__(self):
                self.debug = False

        c1 = Config()
        c2 = Config()
        print(c1 is c2)  # True
    """
    # TODO: Stocker l'instance unique et la retourner à chaque appel
    pass


# Tests
print("=== Exercice 3 : Décorateur de types ===")
if verifier_types is not None and verifier_types(str) is not None:
    @verifier_types(str, int)
    def creer_utilisateur(nom, age):
        return {"nom": nom, "age": age}

    print(creer_utilisateur("Alice", 25))
    try:
        creer_utilisateur("Alice", "25")
    except TypeError as e:
        print(f"TypeError : {e}")
else:
    print("TODO: Implémenter verifier_types")

print()
if singleton is not None:
    @singleton
    class Config:
        def __init__(self):
            self.debug = False

    c1 = Config()
    c2 = Config()
    print(f"Même instance ? {c1 is c2}")  # True
else:
    print("TODO: Implémenter singleton")
print()


# Exercice 4 : Chaînage de décorateurs
# ----------------------------------------
# TODO: Créer des décorateurs composables

def en_majuscules(func):
    """
    Décorateur qui convertit le résultat (string) en majuscules.

    Exemple:
        @en_majuscules
        def salut():
            return "bonjour"
        salut()  # "BONJOUR"
    """
    # TODO
    pass


def entourer(symbole="*"):
    """
    Décorateur paramétré qui entoure le résultat (string) avec un symbole.

    Exemple:
        @entourer("=")
        def titre():
            return "Python"
        titre()  # "=== Python ==="
    """
    # TODO
    pass


def journaliser(func):
    """
    Décorateur qui affiche les arguments et le résultat d'une fonction.

    Exemple:
        @journaliser
        def add(a, b):
            return a + b
        add(2, 3)
        # [LOG] add(2, 3)
        # [LOG] add → 5
    """
    # TODO
    pass


# Tests
print("=== Exercice 4 : Chaînage ===")
if en_majuscules is not None and entourer is not None and entourer("*") is not None:
    @en_majuscules
    @entourer("=")
    def titre():
        return "Python"

    print(titre())  # "=== PYTHON ===" ou "=== Python ===" selon l'ordre
else:
    print("TODO: Implémenter en_majuscules et entourer")

if journaliser is not None:
    @journaliser
    def multiplier(a, b):
        return a * b

    multiplier(4, 5)
else:
    print("TODO: Implémenter journaliser")
print()


# Exercice 5 : Cas pratique — Cache (memoize)
# -----------------------------------------------
# TODO: Créer un décorateur de mise en cache

def memoize(func):
    """
    Décorateur qui met en cache les résultats d'une fonction.
    Si la fonction est appelée avec les mêmes arguments, retourne
    le résultat en cache au lieu de recalculer.

    Exemple:
        @memoize
        def fibonacci(n):
            if n < 2:
                return n
            return fibonacci(n - 1) + fibonacci(n - 2)

        fibonacci(30)  # Rapide grâce au cache
    """
    # TODO: Utiliser un dictionnaire pour stocker les résultats
    # TODO: La clé du cache est le tuple des arguments
    pass


# Tests
print("=== Exercice 5 : Cache (memoize) ===")
if memoize is not None:
    @memoize
    def fibonacci(n):
        if n < 2:
            return n
        return fibonacci(n - 1) + fibonacci(n - 2)

    import time
    debut = time.time()
    resultat = fibonacci(30)
    duree = time.time() - debut
    print(f"fibonacci(30) = {resultat} (en {duree:.4f}s)")

    # Deuxième appel (devrait être instantané)
    debut = time.time()
    resultat = fibonacci(30)
    duree = time.time() - debut
    print(f"fibonacci(30) = {resultat} (cache: {duree:.6f}s)")
else:
    print("TODO: Implémenter memoize")
print()
