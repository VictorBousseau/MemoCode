# =================================================
# Module 9 : Boucles (for/while)
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Table de multiplication
# -------------------------------------
# TODO: Compléter la fonction qui affiche la table de multiplication d'un nombre

def table_multiplication(n):
    """Affiche la table de multiplication de n (de 1 à 10)."""
    # TODO: Utiliser une boucle for avec range()
    pass

# Test
print("=== Exercice 1 : Table de multiplication ===")
table_multiplication(7)
# Attendu :
# 7 x 1 = 7
# 7 x 2 = 14
# ...
# 7 x 10 = 70
print()


# Exercice 2 : Somme des éléments
# --------------------------------
# TODO: Compléter la fonction qui calcule la somme d'une liste SANS utiliser sum()

def somme_liste(liste):
    """Calcule la somme des éléments d'une liste."""
    # TODO: Parcourir la liste et accumuler la somme
    pass

# Tests
print("=== Exercice 2 : Somme des éléments ===")
print(f"Somme de [1, 2, 3, 4, 5] : {somme_liste([1, 2, 3, 4, 5])}")      # Attendu: 15
print(f"Somme de [10, 20, 30] : {somme_liste([10, 20, 30])}")            # Attendu: 60
print(f"Somme de [] : {somme_liste([])}")                                 # Attendu: 0
print()


# Exercice 3 : Compter les voyelles
# ----------------------------------
# TODO: Compléter la fonction qui compte les voyelles dans un texte

def compter_voyelles(texte):
    """Compte le nombre de voyelles dans un texte."""
    voyelles = "aeiouAEIOU"
    # TODO: Parcourir le texte et compter les voyelles
    # Astuce: utiliser 'in' pour vérifier si un caractère est une voyelle
    pass

# Tests
print("=== Exercice 3 : Compter les voyelles ===")
print(f"Voyelles dans 'Bonjour' : {compter_voyelles('Bonjour')}")        # Attendu: 3
print(f"Voyelles dans 'Python' : {compter_voyelles('Python')}")          # Attendu: 1
print(f"Voyelles dans 'AEIOU' : {compter_voyelles('AEIOU')}")            # Attendu: 5
print()


# Exercice 4 : FizzBuzz
# ----------------------
# TODO: Implémenter le classique FizzBuzz
# Règles :
# - Si divisible par 3 : afficher "Fizz"
# - Si divisible par 5 : afficher "Buzz"
# - Si divisible par 3 ET 5 : afficher "FizzBuzz"
# - Sinon : afficher le nombre

def fizzbuzz(n):
    """
    Affiche FizzBuzz de 1 à n.
    """
    # TODO: Implémenter avec une boucle for
    pass

# Test
print("=== Exercice 4 : FizzBuzz (1-20) ===")
fizzbuzz(20)
print()


# Exercice 5 : Trouver le maximum
# --------------------------------
# TODO: Trouver le maximum d'une liste SANS utiliser max()

def trouver_max(liste):
    """Trouve le maximum d'une liste."""
    if not liste:
        return None
    
    # TODO: Parcourir la liste et trouver le maximum
    # Astuce: initialiser avec le premier élément
    pass

# Tests
print("=== Exercice 5 : Trouver le maximum ===")
print(f"Max de [3, 1, 4, 1, 5, 9, 2, 6] : {trouver_max([3, 1, 4, 1, 5, 9, 2, 6])}")  # Attendu: 9
print(f"Max de [-5, -2, -8] : {trouver_max([-5, -2, -8])}")                            # Attendu: -2
print(f"Max de [42] : {trouver_max([42])}")                                            # Attendu: 42
print()


# Exercice 6 : Parcours avec enumerate()
# ---------------------------------------
# TODO: Afficher chaque élément avec son index en utilisant enumerate()

def afficher_avec_index(liste):
    """Affiche chaque élément avec son index (commençant à 1)."""
    # TODO: Utiliser enumerate() avec start=1
    pass

# Test
print("=== Exercice 6 : Parcours avec enumerate() ===")
afficher_avec_index(["Python", "JavaScript", "Java", "C++"])
# Attendu :
# 1. Python
# 2. JavaScript
# 3. Java
# 4. C++
print()


# Exercice 7 : Combiner deux listes avec zip()
# ---------------------------------------------
# TODO: Créer un dictionnaire à partir de deux listes

def creer_dictionnaire(cles, valeurs):
    """
    Crée un dictionnaire à partir de deux listes.
    cles = ["a", "b", "c"]
    valeurs = [1, 2, 3]
    → {"a": 1, "b": 2, "c": 3}
    """
    # TODO: Utiliser zip() pour parcourir les deux listes
    pass

# Tests
print("=== Exercice 7 : Combiner avec zip() ===")
cles = ["nom", "age", "ville"]
valeurs = ["Alice", 25, "Paris"]
resultat = creer_dictionnaire(cles, valeurs)
print(f"Dictionnaire : {resultat}")  # Attendu: {'nom': 'Alice', 'age': 25, 'ville': 'Paris'}
print()


# Exercice 8 : Validation d'entrée avec while
# --------------------------------------------
# TODO: Demander un nombre entre 1 et 10 jusqu'à obtenir une réponse valide
# (Simulé avec une liste de réponses pour les tests)

def valider_nombre(reponses_simulees):
    """
    Simule une validation d'entrée utilisateur.
    reponses_simulees = liste des réponses à traiter.
    Retourne le premier nombre valide (entre 1 et 10).
    """
    # TODO: Parcourir les réponses et retourner le premier nombre valide
    # TODO: Afficher "Invalide" pour chaque réponse hors de la plage
    pass

# Test
print("=== Exercice 8 : Validation avec while ===")
reponses = ["0", "15", "abc", "7"]
resultat = valider_nombre(reponses)
print(f"Nombre valide trouvé : {resultat}")  # Attendu: 7
print()


# Exercice 9 : Recherche avec break
# ----------------------------------
# TODO: Chercher un élément et retourner son index (ou -1 si non trouvé)

def chercher_element(liste, cible):
    """
    Cherche un élément dans une liste.
    Retourne l'index si trouvé, -1 sinon.
    """
    # TODO: Parcourir avec enumerate() et utiliser break
    pass

# Tests
print("=== Exercice 9 : Recherche avec break ===")
nombres = [10, 20, 30, 40, 50]
print(f"Index de 30 : {chercher_element(nombres, 30)}")    # Attendu: 2
print(f"Index de 99 : {chercher_element(nombres, 99)}")    # Attendu: -1
print(f"Index de 10 : {chercher_element(nombres, 10)}")    # Attendu: 0
print()


# Exercice 10 : Filtrer avec continue
# ------------------------------------
# TODO: Afficher seulement les nombres positifs d'une liste

def afficher_positifs(liste):
    """Affiche seulement les nombres positifs."""
    # TODO: Utiliser continue pour ignorer les négatifs et zéros
    pass

# Test
print("=== Exercice 10 : Filtrer avec continue ===")
nombres = [-5, 3, -1, 0, 7, -2, 8]
afficher_positifs(nombres)  # Attendu: 3, 7, 8 (chacun sur une ligne)
print()


# =================================================
# Bonus : Nombres premiers
# =================================================
# TODO: Trouver tous les nombres premiers jusqu'à n

def nombres_premiers(n):
    """
    Retourne la liste des nombres premiers de 2 à n.
    Un nombre premier n'est divisible que par 1 et lui-même.
    """
    # TODO: Utiliser des boucles imbriquées
    # Astuce: utiliser else sur la boucle interne
    pass

print("=== Bonus : Nombres premiers ===")
print(f"Premiers jusqu'à 30 : {nombres_premiers(30)}")
# Attendu: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]


# =================================================
# Bonus 2 : Triangle de Pascal
# =================================================
# TODO: Afficher les n premières lignes du triangle de Pascal

def triangle_pascal(n):
    """
    Affiche les n premières lignes du triangle de Pascal.
    Chaque nombre est la somme des deux nombres au-dessus.
    
    n=5 :
        1
       1 1
      1 2 1
     1 3 3 1
    1 4 6 4 1
    """
    # TODO: Implémenter avec des boucles imbriquées
    pass

print("\n=== Bonus 2 : Triangle de Pascal ===")
triangle_pascal(6)
