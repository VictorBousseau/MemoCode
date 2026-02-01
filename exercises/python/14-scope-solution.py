# =================================================
# Module 14 : Scope & Closures
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Comprendre la portée LEGB
# -----------------------------------------
x = "global"

def exercice1_a():
    x = "local"
    print(f"1a: {x}")  # "local" (L - Local)

def exercice1_b():
    print(f"1b: {x}")  # "global" (G - Global, pas de L ni E)

def exercice1_c():
    x = "enclosing"
    def interne():
        print(f"1c: {x}")  # "enclosing" (E - Enclosing)
    interne()

def exercice1_d():
    x = "enclosing"
    def interne():
        x = "local"
        print(f"1d: {x}")  # "local" (L - Local)
    interne()
    print(f"1d-ext: {x}")  # "enclosing" (la variable locale de interne n'affecte pas)

print("=== Exercice 1 : Comprendre LEGB ===")
exercice1_a()    # "local"
exercice1_b()    # "global"
exercice1_c()    # "enclosing"
exercice1_d()    # "local" puis "enclosing"
print(f"1-global: {x}")  # "global" (rien n'a modifié la variable globale)
print()


# Exercice 2 : global et nonlocal
# ---------------------------------
score = 0

def ajouter_points(points):
    """Ajoute des points au score global."""
    global score
    score += points

def creer_score():
    """Crée un système de score avec nonlocal."""
    total = 0

    def ajouter(points):
        nonlocal total
        total += points

    def obtenir():
        return total

    return ajouter, obtenir

# Tests
print("=== Exercice 2 : global et nonlocal ===")
ajouter_points(10)
ajouter_points(20)
print(f"Score global : {score}")  # 30

ajouter, obtenir = creer_score()
ajouter(5)
ajouter(10)
ajouter(3)
print(f"Score local : {obtenir()}")  # 18
print()


# Exercice 3 : Créer une factory de fonctions (Closure)
# -------------------------------------------------------
def creer_puissance(n):
    """Retourne une fonction qui élève à la puissance n."""
    def puissance(x):
        return x ** n
    return puissance

# Tests
print("=== Exercice 3 : Factory de puissances ===")
carre = creer_puissance(2)
cube = creer_puissance(3)
quart = creer_puissance(4)
print(f"5² = {carre(5)}")    # 25
print(f"3³ = {cube(3)}")     # 27
print(f"2⁴ = {quart(2)}")   # 16
print()


# Exercice 4 : Closure avec état - Compteur avancé
# ---------------------------------------------------
def creer_compteur_avance(debut=0, pas=1):
    """Crée un compteur avancé avec plusieurs opérations."""
    valeur = debut
    valeur_initiale = debut

    def incrementer():
        nonlocal valeur
        valeur += pas
        return valeur

    def decrementer():
        nonlocal valeur
        valeur -= pas
        return valeur

    def obtenir():
        return valeur

    def reinitialiser():
        nonlocal valeur
        valeur = valeur_initiale

    return {
        "incrementer": incrementer,
        "decrementer": decrementer,
        "obtenir": obtenir,
        "reinitialiser": reinitialiser
    }

# Tests
print("=== Exercice 4 : Compteur avancé ===")
compteur = creer_compteur_avance(0, 5)
print(compteur["incrementer"]())    # 5
print(compteur["incrementer"]())    # 10
print(compteur["incrementer"]())    # 15
print(compteur["decrementer"]())    # 10
print(compteur["obtenir"]())        # 10
compteur["reinitialiser"]()
print(compteur["obtenir"]())        # 0
print()


# Exercice 5 : Closure - Mémoïsation simple
# --------------------------------------------
def memoiser(func):
    """Retourne une version mémoïsée de la fonction."""
    cache = {}

    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]

    return wrapper

# Tests
print("=== Exercice 5 : Mémoïsation ===")

@memoiser
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55
print(fibonacci(30))  # 832040
print(fibonacci(50))  # 12586269025 (instantané grâce au cache)
print()


# Exercice 6 : Piège de la closure dans une boucle
# ---------------------------------------------------
print("=== Exercice 6 : Piège de la boucle ===")

# ❌ Version bugguée
multiplicateurs_bug = []
for i in range(1, 6):
    multiplicateurs_bug.append(lambda x: x * i)

print("Version bugguée :")
for m in multiplicateurs_bug:
    print(f"  m(10) = {m(10)}")  # Tous 50

# ✅ Solution 1 : Paramètre par défaut
multiplicateurs_ok = []
for i in range(1, 6):
    multiplicateurs_ok.append(lambda x, facteur=i: x * facteur)

print("Version corrigée (paramètre par défaut) :")
for m in multiplicateurs_ok:
    print(f"  m(10) = {m(10)}")  # 10, 20, 30, 40, 50

# ✅ Solution 2 : Utiliser une factory
def creer_multiplicateur(facteur):
    return lambda x: x * facteur

multiplicateurs_ok2 = [creer_multiplicateur(i) for i in range(1, 6)]

print("Version corrigée (factory) :")
for m in multiplicateurs_ok2:
    print(f"  m(10) = {m(10)}")  # 10, 20, 30, 40, 50
print()


# Exercice 7 : Closure - Validateur configurable
# -------------------------------------------------
def creer_validateur(min_val=None, max_val=None, type_attendu=None):
    """Crée une fonction de validation configurable."""
    def valider(valeur):
        # Vérifier le type
        if type_attendu is not None and not isinstance(valeur, type_attendu):
            return False

        # Vérifier le minimum
        if min_val is not None and valeur < min_val:
            return False

        # Vérifier le maximum
        if max_val is not None and valeur > max_val:
            return False

        return True

    return valider

# Tests
print("=== Exercice 7 : Validateur configurable ===")
valider_age = creer_validateur(min_val=0, max_val=150, type_attendu=int)
print(f"25 valide : {valider_age(25)}")       # True
print(f"-5 valide : {valider_age(-5)}")       # False
print(f"200 valide : {valider_age(200)}")     # False
print(f"'25' valide : {valider_age('25')}")   # False

valider_note = creer_validateur(min_val=0, max_val=20)
print(f"15 valide : {valider_note(15)}")      # True
print(f"25 valide : {valider_note(25)}")      # False
print()


# =================================================
# Bonus : Compte bancaire avec closures
# =================================================
def creer_compte(titulaire, solde_initial=0):
    """Crée un compte bancaire avec des closures."""
    solde = solde_initial
    operations = []

    def deposer(montant):
        nonlocal solde
        if montant <= 0:
            print("Le montant doit être positif")
            return
        solde += montant
        operations.append(f"+{montant}€")
        print(f"Dépôt de {montant}€. Nouveau solde : {solde}€")

    def retirer(montant):
        nonlocal solde
        if montant <= 0:
            print("Le montant doit être positif")
            return
        if montant > solde:
            print(f"Solde insuffisant ({solde}€ < {montant}€)")
            return
        solde -= montant
        operations.append(f"-{montant}€")
        print(f"Retrait de {montant}€. Nouveau solde : {solde}€")

    def obtenir_solde():
        return solde

    def obtenir_historique():
        return f"Compte de {titulaire} : {operations}"

    return {
        "deposer": deposer,
        "retirer": retirer,
        "solde": obtenir_solde,
        "historique": obtenir_historique
    }

# Test
print("=== Bonus : Compte bancaire ===")
compte = creer_compte("Alice", 1000)
print(f"Solde initial : {compte['solde']()}€")
compte["deposer"](500)
compte["retirer"](200)
compte["retirer"](2000)
print(f"Solde final : {compte['solde']()}€")
print(compte["historique"]())
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. RÈGLE LEGB
   Python cherche les variables dans cet ordre :
   L (Local) → E (Enclosing) → G (Global) → B (Built-in)

2. GLOBAL
   global var  → Modifie une variable au niveau du module
   ⚠️ À éviter ! Préférer paramètres et return

3. NONLOCAL
   nonlocal var  → Modifie une variable de la fonction parente
   Indispensable pour les closures avec état

4. CLOSURES
   - Fonction interne qui capture les variables de la fonction externe
   - La variable est "mémorisée" même après la fin de la fonction externe
   - Utilisées pour : factories, compteurs, loggers, cache

5. PIÈGE DE LA BOUCLE
   ❌ lambda: variable  → capture la référence (dernière valeur)
   ✅ lambda x=variable  → capture la valeur au moment de la création

6. CAS D'USAGE DES CLOSURES
   - Factory de fonctions (creer_multiplicateur, creer_puissance)
   - État encapsulé (compteur, accumulateur)
   - Configuration (logger, validateur)
   - Mémoïsation (cache de résultats)
""")
