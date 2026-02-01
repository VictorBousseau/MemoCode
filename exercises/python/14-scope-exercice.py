# =================================================
# Module 14 : Scope & Closures
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Comprendre la portée LEGB
# -----------------------------------------
# TODO: Prédire la sortie de chaque print AVANT d'exécuter

x = "global"

def exercice1_a():
    x = "local"
    print(f"1a: {x}")  # Que vaut x ?

def exercice1_b():
    print(f"1b: {x}")  # Que vaut x ?

def exercice1_c():
    x = "enclosing"
    def interne():
        print(f"1c: {x}")  # Que vaut x ?
    interne()

def exercice1_d():
    x = "enclosing"
    def interne():
        x = "local"
        print(f"1d: {x}")  # Que vaut x ?
    interne()
    print(f"1d-ext: {x}")  # Et ici ?

print("=== Exercice 1 : Comprendre LEGB ===")
exercice1_a()    # Attendu: ?
exercice1_b()    # Attendu: ?
exercice1_c()    # Attendu: ?
exercice1_d()    # Attendu: ?
print(f"1-global: {x}")  # Attendu: ?
print()


# Exercice 2 : global et nonlocal
# ---------------------------------
# TODO: Corriger le code pour qu'il fonctionne correctement

score = 0

def ajouter_points(points):
    """Ajoute des points au score global."""
    # TODO: Le code ci-dessous provoque une erreur. Corrigez-le.
    # score += points
    pass

def creer_score():
    """Crée un système de score avec nonlocal."""
    total = 0

    def ajouter(points):
        """Ajoute des points au total."""
        # TODO: Modifier total en utilisant nonlocal
        # total += points
        pass

    def obtenir():
        """Retourne le total actuel."""
        return total

    return ajouter, obtenir

# Tests
print("=== Exercice 2 : global et nonlocal ===")
ajouter_points(10)
ajouter_points(20)
print(f"Score global : {score}")  # Attendu: 30

ajouter, obtenir = creer_score()
ajouter(5)
ajouter(10)
ajouter(3)
print(f"Score local : {obtenir()}")  # Attendu: 18
print()


# Exercice 3 : Créer une factory de fonctions (Closure)
# -------------------------------------------------------
# TODO: Créer une factory qui génère des fonctions de calcul

def creer_puissance(n):
    """
    Retourne une fonction qui élève un nombre à la puissance n.

    Exemple:
        carre = creer_puissance(2)
        carre(5) → 25

        cube = creer_puissance(3)
        cube(3) → 27
    """
    # TODO: Créer et retourner une closure
    pass

# Tests
print("=== Exercice 3 : Factory de puissances ===")
# carre = creer_puissance(2)
# cube = creer_puissance(3)
# quart = creer_puissance(4)
# print(f"5² = {carre(5)}")    # 25
# print(f"3³ = {cube(3)}")     # 27
# print(f"2⁴ = {quart(2)}")   # 16
print()


# Exercice 4 : Closure avec état - Compteur avancé
# ---------------------------------------------------
# TODO: Créer un compteur avec plus de fonctionnalités

def creer_compteur_avance(debut=0, pas=1):
    """
    Crée un compteur avancé avec les opérations :
    - incrementer() : ajoute 'pas' au compteur, retourne la nouvelle valeur
    - decrementer() : retire 'pas' au compteur, retourne la nouvelle valeur
    - obtenir() : retourne la valeur actuelle
    - reinitialiser() : remet le compteur à la valeur de début

    Retourne un dictionnaire de fonctions.
    """
    # TODO: Implémenter avec nonlocal
    pass

# Tests
print("=== Exercice 4 : Compteur avancé ===")
# compteur = creer_compteur_avance(0, 5)
# print(compteur["incrementer"]())    # 5
# print(compteur["incrementer"]())    # 10
# print(compteur["incrementer"]())    # 15
# print(compteur["decrementer"]())    # 10
# print(compteur["obtenir"]())        # 10
# compteur["reinitialiser"]()
# print(compteur["obtenir"]())        # 0
print()


# Exercice 5 : Closure - Mémoïsation simple
# --------------------------------------------
# TODO: Créer une closure qui mémorise les résultats d'une fonction

def memoiser(func):
    """
    Retourne une version mémoïsée de la fonction.
    Les résultats sont stockés dans un cache (dictionnaire).
    Si la fonction est appelée avec les mêmes arguments,
    le résultat est retourné directement depuis le cache.
    """
    # TODO: Créer un cache et une closure qui le vérifie
    pass

# Tests
print("=== Exercice 5 : Mémoïsation ===")
# @memoiser
# def fibonacci(n):
#     if n <= 1:
#         return n
#     return fibonacci(n - 1) + fibonacci(n - 2)
#
# print(fibonacci(10))  # 55
# print(fibonacci(30))  # 832040 (rapide grâce au cache)
print()


# Exercice 6 : Piège de la closure dans une boucle
# ---------------------------------------------------
# TODO: Corriger le code suivant

print("=== Exercice 6 : Piège de la boucle ===")

# ❌ Version bugguée
multiplicateurs_bug = []
for i in range(1, 6):
    multiplicateurs_bug.append(lambda x: x * i)

print("Version bugguée :")
for m in multiplicateurs_bug:
    print(f"  m(10) = {m(10)}")  # Tous affichent 50 !

# TODO: Corriger pour que chaque fonction multiplie par le bon facteur
# multiplicateurs_ok = []
# for i in range(1, 6):
#     # TODO: Corriger le lambda
#     multiplicateurs_ok.append(...)
#
# print("Version corrigée :")
# for m in multiplicateurs_ok:
#     print(f"  m(10) = {m(10)}")  # 10, 20, 30, 40, 50
print()


# Exercice 7 : Closure - Validateur configurable
# -------------------------------------------------
# TODO: Créer une factory de fonctions de validation

def creer_validateur(min_val=None, max_val=None, type_attendu=None):
    """
    Crée une fonction de validation configurable.

    Args:
        min_val: Valeur minimale (optionnel)
        max_val: Valeur maximale (optionnel)
        type_attendu: Type attendu (optionnel)

    Exemple:
        valider_age = creer_validateur(min_val=0, max_val=150, type_attendu=int)
        valider_age(25)   → True
        valider_age(-5)   → False
        valider_age("25") → False
    """
    # TODO: Retourner une closure qui valide selon les critères
    pass

# Tests
print("=== Exercice 7 : Validateur configurable ===")
# valider_age = creer_validateur(min_val=0, max_val=150, type_attendu=int)
# print(f"25 valide : {valider_age(25)}")       # True
# print(f"-5 valide : {valider_age(-5)}")       # False
# print(f"200 valide : {valider_age(200)}")     # False
# print(f"'25' valide : {valider_age('25')}")   # False
#
# valider_note = creer_validateur(min_val=0, max_val=20)
# print(f"15 valide : {valider_note(15)}")      # True
# print(f"25 valide : {valider_note(25)}")      # False
print()


# =================================================
# Bonus : Closure comme alternative à une classe simple
# =================================================
# TODO: Implémenter un compte bancaire avec des closures

def creer_compte(titulaire, solde_initial=0):
    """
    Crée un compte bancaire avec des closures.

    Retourne un dictionnaire avec les opérations :
    - deposer(montant) : dépose de l'argent
    - retirer(montant) : retire de l'argent (si solde suffisant)
    - solde() : retourne le solde actuel
    - historique() : retourne l'historique des opérations
    """
    # TODO: Implémenter avec nonlocal
    pass

# Test
print("=== Bonus : Compte bancaire ===")
# compte = creer_compte("Alice", 1000)
# print(compte["solde"]())           # 1000
# compte["deposer"](500)
# print(compte["solde"]())           # 1500
# compte["retirer"](200)
# print(compte["solde"]())           # 1300
# compte["retirer"](2000)            # "Solde insuffisant"
# print(compte["solde"]())           # 1300
# print(compte["historique"]())
