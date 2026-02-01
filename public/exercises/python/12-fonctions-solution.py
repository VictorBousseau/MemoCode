# =================================================
# Module 12 : Fonctions (définition, *args, **kwargs)
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Fonction basique avec return
# -------------------------------------------
def calculer_imc(poids, taille):
    """Calcule l'Indice de Masse Corporelle."""
    return round(poids / taille ** 2, 1)

# Tests
print("=== Exercice 1 : Calcul IMC ===")
print(f"IMC (70kg, 1.75m) : {calculer_imc(70, 1.75)}")    # 22.9
print(f"IMC (85kg, 1.80m) : {calculer_imc(85, 1.80)}")    # 26.2
print(f"IMC (55kg, 1.60m) : {calculer_imc(55, 1.60)}")    # 21.5
print()


# Exercice 2 : Fonction avec valeur par défaut
# -----------------------------------------------
def formater_prix(montant, devise="€", decimales=2):
    """Formate un prix avec devise et décimales."""
    montant_arrondi = round(montant, decimales)
    if decimales == 0:
        return f"{int(montant_arrondi)} {devise}"
    return f"{montant_arrondi:.{decimales}f} {devise}"

# Tests
print("=== Exercice 2 : Formater un prix ===")
print(formater_prix(29.9))              # "29.90 €"
print(formater_prix(29.9, "$"))         # "29.90 $"
print(formater_prix(29.9, "€", 0))     # "30 €"
print(formater_prix(1234.567, "£", 1)) # "1234.6 £"
print()


# Exercice 3 : Fonction avec *args
# ----------------------------------
def moyenne(*notes):
    """Calcule la moyenne d'un nombre variable de notes."""
    if not notes:
        return 0
    return sum(notes) / len(notes)

# Tests
print("=== Exercice 3 : Moyenne avec *args ===")
print(f"Moyenne de 15, 12, 18 : {moyenne(15, 12, 18)}")       # 15.0
print(f"Moyenne de 10, 20 : {moyenne(10, 20)}")                # 15.0
print(f"Moyenne vide : {moyenne()}")                            # 0
print(f"Moyenne de 20 : {moyenne(20)}")                         # 20.0
print()


# Exercice 4 : Fonction avec **kwargs
# -------------------------------------
def creer_profil(nom, age, **kwargs):
    """Crée un dictionnaire de profil utilisateur."""
    profil = {"nom": nom, "age": age}
    profil.update(kwargs)
    return profil

# Version alternative
def creer_profil_v2(nom, age, **kwargs):
    return {"nom": nom, "age": age, **kwargs}

# Tests
print("=== Exercice 4 : Profil avec **kwargs ===")
p1 = creer_profil("Alice", 25)
print(f"Profil 1 : {p1}")

p2 = creer_profil("Bob", 30, ville="Paris", role="admin", email="bob@mail.com")
print(f"Profil 2 : {p2}")
print()


# Exercice 5 : Retourner plusieurs valeurs
# -------------------------------------------
def analyser_nombres(nombres):
    """Analyse une liste de nombres."""
    positifs = [n for n in nombres if n > 0]
    negatifs = [n for n in nombres if n < 0]
    nb_zeros = nombres.count(0)
    return positifs, negatifs, nb_zeros

# Version avec boucle
def analyser_nombres_v2(nombres):
    positifs = []
    negatifs = []
    nb_zeros = 0

    for n in nombres:
        if n > 0:
            positifs.append(n)
        elif n < 0:
            negatifs.append(n)
        else:
            nb_zeros += 1

    return positifs, negatifs, nb_zeros

# Tests
print("=== Exercice 5 : Retourner plusieurs valeurs ===")
nombres = [5, -3, 0, 8, -1, 0, 3, -7, 0]
positifs, negatifs, nb_zeros = analyser_nombres(nombres)
print(f"Positifs : {positifs}")     # [5, 8, 3]
print(f"Négatifs : {negatifs}")     # [-3, -1, -7]
print(f"Zéros : {nb_zeros}")       # 3
print()


# Exercice 6 : Fonction récursive
# ---------------------------------
def recherche_dichotomique(liste_triee, cible, debut=0, fin=None):
    """Recherche un élément dans une liste triée par dichotomie."""
    if fin is None:
        fin = len(liste_triee) - 1

    # Cas de base : élément non trouvé
    if debut > fin:
        return -1

    milieu = (debut + fin) // 2

    if liste_triee[milieu] == cible:
        return milieu
    elif liste_triee[milieu] < cible:
        return recherche_dichotomique(liste_triee, cible, milieu + 1, fin)
    else:
        return recherche_dichotomique(liste_triee, cible, debut, milieu - 1)

# Tests
print("=== Exercice 6 : Recherche dichotomique ===")
liste = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(f"Index de 23 : {recherche_dichotomique(liste, 23)}")   # 5
print(f"Index de 2 : {recherche_dichotomique(liste, 2)}")     # 0
print(f"Index de 91 : {recherche_dichotomique(liste, 91)}")   # 9
print(f"Index de 50 : {recherche_dichotomique(liste, 50)}")   # -1
print()


# Exercice 7 : Combiner *args et **kwargs
# ------------------------------------------
def formater_message(template, *args, **kwargs):
    """Formate un message avec des arguments positionnels et nommés."""
    return template.format(*args, **kwargs)

# Tests
print("=== Exercice 7 : Formatage flexible ===")
print(formater_message("Bonjour {} !", "Alice"))
print(formater_message("{} + {} = {}", 2, 3, 5))
print(formater_message("{nom} a {age} ans", nom="Bob", age=30))
print()


# =================================================
# Bonus : Décorateur simple
# =================================================
def compter_appels(fonction):
    """Compte le nombre d'appels d'une fonction."""
    compteur = [0]  # Liste mutable pour contourner le scope

    def wrapper(*args, **kwargs):
        compteur[0] += 1
        print(f"Appel #{compteur[0]} de {fonction.__name__}")
        return fonction(*args, **kwargs)

    return wrapper

@compter_appels
def dire_bonjour(nom):
    return f"Bonjour {nom} !"

print("=== Bonus : Compteur d'appels ===")
print(dire_bonjour("Alice"))  # Appel #1 + "Bonjour Alice !"
print(dire_bonjour("Bob"))    # Appel #2 + "Bonjour Bob !"
print(dire_bonjour("Charlie"))  # Appel #3 + "Bonjour Charlie !"
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. DÉFINITION
   def nom(param1, param2):
       '''Docstring'''
       return resultat

2. RETURN vs PRINT
   - return : retourne une valeur (réutilisable)
   - print : affiche du texte (retourne None)

3. ARGUMENTS PAR DÉFAUT
   def f(a, b=10, c="hello"):
   ⚠️ Ne jamais utiliser un mutable comme défaut !

4. *args et **kwargs
   *args → tuple d'arguments positionnels variables
   **kwargs → dict d'arguments nommés variables
   Ordre : positionnels, défauts, *args, **kwargs

5. RETOURNER PLUSIEURS VALEURS
   return a, b, c  → retourne un tuple
   x, y, z = fonction()  → déstructuration

6. RÉCURSIVITÉ
   - Toujours définir un cas de base
   - L'appel récursif doit converger vers le cas de base

7. FONCTIONS COMME OBJETS
   - Stocker dans une variable
   - Passer en argument
   - Retourner depuis une fonction
""")
