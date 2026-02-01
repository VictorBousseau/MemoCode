# =================================================
# Module 9 : Boucles (for/while)
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Table de multiplication
# -------------------------------------
def table_multiplication(n):
    """Affiche la table de multiplication de n (de 1 à 10)."""
    for i in range(1, 11):
        print(f"{n} x {i} = {n * i}")

# Test
print("=== Exercice 1 : Table de multiplication ===")
table_multiplication(7)
print()


# Exercice 2 : Somme des éléments
# --------------------------------
def somme_liste(liste):
    """Calcule la somme des éléments d'une liste."""
    total = 0
    for element in liste:
        total += element
    return total

# Tests
print("=== Exercice 2 : Somme des éléments ===")
print(f"Somme de [1, 2, 3, 4, 5] : {somme_liste([1, 2, 3, 4, 5])}")      # 15
print(f"Somme de [10, 20, 30] : {somme_liste([10, 20, 30])}")            # 60
print(f"Somme de [] : {somme_liste([])}")                                 # 0
print()


# Exercice 3 : Compter les voyelles
# ----------------------------------
def compter_voyelles(texte):
    """Compte le nombre de voyelles dans un texte."""
    voyelles = "aeiouAEIOU"
    compteur = 0
    
    for caractere in texte:
        if caractere in voyelles:
            compteur += 1
    
    return compteur

# Version alternative avec sum() et expression génératrice
def compter_voyelles_v2(texte):
    voyelles = "aeiouAEIOU"
    return sum(1 for c in texte if c in voyelles)

# Tests
print("=== Exercice 3 : Compter les voyelles ===")
print(f"Voyelles dans 'Bonjour' : {compter_voyelles('Bonjour')}")        # 3
print(f"Voyelles dans 'Python' : {compter_voyelles('Python')}")          # 1
print(f"Voyelles dans 'AEIOU' : {compter_voyelles('AEIOU')}")            # 5
print()


# Exercice 4 : FizzBuzz
# ----------------------
def fizzbuzz(n):
    """
    Affiche FizzBuzz de 1 à n.
    - Divisible par 3 et 5 : FizzBuzz
    - Divisible par 3 : Fizz
    - Divisible par 5 : Buzz
    - Sinon : le nombre
    """
    for i in range(1, n + 1):
        if i % 15 == 0:  # Divisible par 3 ET 5
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

# Test
print("=== Exercice 4 : FizzBuzz (1-20) ===")
fizzbuzz(20)
print()


# Exercice 5 : Trouver le maximum
# --------------------------------
def trouver_max(liste):
    """Trouve le maximum d'une liste."""
    if not liste:
        return None
    
    maximum = liste[0]  # Initialiser avec le premier élément
    
    for element in liste[1:]:  # Parcourir le reste
        if element > maximum:
            maximum = element
    
    return maximum

# Version alternative
def trouver_max_v2(liste):
    if not liste:
        return None
    
    maximum = liste[0]
    for element in liste:
        maximum = element if element > maximum else maximum
    return maximum

# Tests
print("=== Exercice 5 : Trouver le maximum ===")
print(f"Max de [3, 1, 4, 1, 5, 9, 2, 6] : {trouver_max([3, 1, 4, 1, 5, 9, 2, 6])}")  # 9
print(f"Max de [-5, -2, -8] : {trouver_max([-5, -2, -8])}")                            # -2
print(f"Max de [42] : {trouver_max([42])}")                                            # 42
print()


# Exercice 6 : Parcours avec enumerate()
# ---------------------------------------
def afficher_avec_index(liste):
    """Affiche chaque élément avec son index (commençant à 1)."""
    for index, element in enumerate(liste, start=1):
        print(f"{index}. {element}")

# Test
print("=== Exercice 6 : Parcours avec enumerate() ===")
afficher_avec_index(["Python", "JavaScript", "Java", "C++"])
print()


# Exercice 7 : Combiner deux listes avec zip()
# ---------------------------------------------
def creer_dictionnaire(cles, valeurs):
    """
    Crée un dictionnaire à partir de deux listes.
    """
    resultat = {}
    for cle, valeur in zip(cles, valeurs):
        resultat[cle] = valeur
    return resultat

# Version alternative avec dict comprehension
def creer_dictionnaire_v2(cles, valeurs):
    return {cle: valeur for cle, valeur in zip(cles, valeurs)}

# Version la plus simple avec dict()
def creer_dictionnaire_v3(cles, valeurs):
    return dict(zip(cles, valeurs))

# Tests
print("=== Exercice 7 : Combiner avec zip() ===")
cles = ["nom", "age", "ville"]
valeurs = ["Alice", 25, "Paris"]
resultat = creer_dictionnaire(cles, valeurs)
print(f"Dictionnaire : {resultat}")
print()


# Exercice 8 : Validation d'entrée avec while
# --------------------------------------------
def valider_nombre(reponses_simulees):
    """
    Simule une validation d'entrée utilisateur.
    """
    for reponse in reponses_simulees:
        try:
            nombre = int(reponse)
            if 1 <= nombre <= 10:
                return nombre
            else:
                print(f"'{reponse}' : Invalide (hors de la plage 1-10)")
        except ValueError:
            print(f"'{reponse}' : Invalide (pas un nombre)")
    
    return None  # Aucune réponse valide

# Test
print("=== Exercice 8 : Validation avec while ===")
reponses = ["0", "15", "abc", "7"]
resultat = valider_nombre(reponses)
print(f"Nombre valide trouvé : {resultat}")
print()


# Exercice 9 : Recherche avec break
# ----------------------------------
def chercher_element(liste, cible):
    """
    Cherche un élément dans une liste.
    Retourne l'index si trouvé, -1 sinon.
    """
    for index, element in enumerate(liste):
        if element == cible:
            return index  # Trouvé, on sort avec l'index
    
    return -1  # Non trouvé

# Version avec break et else
def chercher_element_v2(liste, cible):
    for index, element in enumerate(liste):
        if element == cible:
            break
    else:
        return -1
    return index

# Tests
print("=== Exercice 9 : Recherche avec break ===")
nombres = [10, 20, 30, 40, 50]
print(f"Index de 30 : {chercher_element(nombres, 30)}")    # 2
print(f"Index de 99 : {chercher_element(nombres, 99)}")    # -1
print(f"Index de 10 : {chercher_element(nombres, 10)}")    # 0
print()


# Exercice 10 : Filtrer avec continue
# ------------------------------------
def afficher_positifs(liste):
    """Affiche seulement les nombres positifs."""
    for nombre in liste:
        if nombre <= 0:
            continue  # Ignorer les négatifs et zéros
        print(nombre)

# Test
print("=== Exercice 10 : Filtrer avec continue ===")
nombres = [-5, 3, -1, 0, 7, -2, 8]
afficher_positifs(nombres)
print()


# =================================================
# Bonus : Nombres premiers
# =================================================
def nombres_premiers(n):
    """
    Retourne la liste des nombres premiers de 2 à n.
    """
    premiers = []
    
    for nombre in range(2, n + 1):
        # Vérifier si nombre est premier
        for diviseur in range(2, int(nombre**0.5) + 1):
            if nombre % diviseur == 0:
                break  # Pas premier, sortir de la boucle interne
        else:
            # Le else s'exécute si pas de break = nombre premier
            premiers.append(nombre)
    
    return premiers

# Version optimisée avec le crible d'Ératosthène
def nombres_premiers_crible(n):
    """Version optimisée avec le crible d'Ératosthène."""
    if n < 2:
        return []
    
    # Initialiser : tous les nombres sont potentiellement premiers
    est_premier = [True] * (n + 1)
    est_premier[0] = est_premier[1] = False
    
    # Marquer les multiples comme non premiers
    for i in range(2, int(n**0.5) + 1):
        if est_premier[i]:
            for multiple in range(i*i, n + 1, i):
                est_premier[multiple] = False
    
    return [i for i in range(n + 1) if est_premier[i]]

print("=== Bonus : Nombres premiers ===")
print(f"Premiers jusqu'à 30 : {nombres_premiers(30)}")
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
print()


# =================================================
# Bonus 2 : Triangle de Pascal
# =================================================
def triangle_pascal(n):
    """
    Affiche les n premières lignes du triangle de Pascal.
    """
    if n <= 0:
        return
    
    triangle = []
    
    for i in range(n):
        # Créer une nouvelle ligne
        ligne = [1]  # Premier élément toujours 1
        
        if i > 0:
            ligne_precedente = triangle[i - 1]
            # Calculer les éléments du milieu
            for j in range(len(ligne_precedente) - 1):
                ligne.append(ligne_precedente[j] + ligne_precedente[j + 1])
            ligne.append(1)  # Dernier élément toujours 1
        
        triangle.append(ligne)
    
    # Afficher avec alignement
    largeur_max = len(" ".join(map(str, triangle[-1])))
    
    for ligne in triangle:
        contenu = " ".join(map(str, ligne))
        print(contenu.center(largeur_max))

print("=== Bonus 2 : Triangle de Pascal ===")
triangle_pascal(6)
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. BOUCLE for
   for element in sequence:
       # traitement
   
   - Parcourir une liste, string, dict, etc.
   - Utiliser range(start, stop, step) pour les compteurs

2. enumerate() - Index + Valeur
   for index, element in enumerate(liste, start=0):
       print(index, element)

3. zip() - Parcourir plusieurs listes
   for a, b in zip(liste1, liste2):
       print(a, b)

4. BOUCLE while
   while condition:
       # répéter tant que condition est True
   
   - Attention aux boucles infinies !
   - Toujours s'assurer que la condition finira par être False

5. CONTRÔLE DE FLUX
   - break : sortir immédiatement de la boucle
   - continue : passer à l'itération suivante
   - pass : ne rien faire (placeholder)

6. CLAUSE else SUR LES BOUCLES
   for/while ...:
       ...
   else:
       # exécuté si pas de break

7. BONNES PRATIQUES
   - Ne pas modifier une liste pendant l'itération
   - Utiliser des noms de variables explicites
   - Préférer les list comprehensions quand c'est simple
   - for pour nombre d'itérations connu
   - while pour condition de sortie
""")
