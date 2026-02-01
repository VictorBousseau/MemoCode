# =================================================
# Module 12 : Fonctions (définition, *args, **kwargs)
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Fonction basique avec return
# -------------------------------------------
# TODO: Créer une fonction qui calcule l'IMC

def calculer_imc(poids, taille):
    """
    Calcule l'Indice de Masse Corporelle.

    Args:
        poids (float): Poids en kg
        taille (float): Taille en mètres

    Returns:
        float: IMC arrondi à 1 décimale
    """
    # TODO: Calculer poids / taille² et arrondir
    pass

# Tests
print("=== Exercice 1 : Calcul IMC ===")
print(f"IMC (70kg, 1.75m) : {calculer_imc(70, 1.75)}")    # Attendu: 22.9
print(f"IMC (85kg, 1.80m) : {calculer_imc(85, 1.80)}")    # Attendu: 26.2
print(f"IMC (55kg, 1.60m) : {calculer_imc(55, 1.60)}")    # Attendu: 21.5
print()


# Exercice 2 : Fonction avec valeur par défaut
# -----------------------------------------------
# TODO: Créer une fonction qui formate un prix

def formater_prix(montant, devise="€", decimales=2):
    """
    Formate un prix avec devise et décimales.

    Exemples:
        formater_prix(29.9)           → "29.90 €"
        formater_prix(29.9, "$")      → "29.90 $"
        formater_prix(29.9, "€", 0)   → "30 €"
    """
    # TODO: Utiliser round() et f-string avec formatage
    pass

# Tests
print("=== Exercice 2 : Formater un prix ===")
print(formater_prix(29.9))              # "29.90 €"
print(formater_prix(29.9, "$"))         # "29.90 $"
print(formater_prix(29.9, "€", 0))     # "30 €"
print(formater_prix(1234.567, "£", 1)) # "1234.6 £"
print()


# Exercice 3 : Fonction avec *args
# ----------------------------------
# TODO: Créer une fonction qui calcule la moyenne

def moyenne(*notes):
    """
    Calcule la moyenne d'un nombre variable de notes.
    Retourne 0 si aucune note n'est fournie.
    """
    # TODO: Utiliser sum() et len() sur args
    pass

# Tests
print("=== Exercice 3 : Moyenne avec *args ===")
print(f"Moyenne de 15, 12, 18 : {moyenne(15, 12, 18)}")       # 15.0
print(f"Moyenne de 10, 20 : {moyenne(10, 20)}")                # 15.0
print(f"Moyenne vide : {moyenne()}")                            # 0
print(f"Moyenne de 20 : {moyenne(20)}")                         # 20.0
print()


# Exercice 4 : Fonction avec **kwargs
# -------------------------------------
# TODO: Créer un constructeur de profil utilisateur

def creer_profil(nom, age, **kwargs):
    """
    Crée un dictionnaire de profil utilisateur.

    Args:
        nom (str): Nom obligatoire
        age (int): Âge obligatoire
        **kwargs: Informations supplémentaires optionnelles

    Returns:
        dict: Profil complet
    """
    # TODO: Créer un dict avec nom et age, puis ajouter les kwargs
    pass

# Tests
print("=== Exercice 4 : Profil avec **kwargs ===")
p1 = creer_profil("Alice", 25)
print(f"Profil 1 : {p1}")
# Attendu: {'nom': 'Alice', 'age': 25}

p2 = creer_profil("Bob", 30, ville="Paris", role="admin", email="bob@mail.com")
print(f"Profil 2 : {p2}")
# Attendu: {'nom': 'Bob', 'age': 30, 'ville': 'Paris', 'role': 'admin', 'email': 'bob@mail.com'}
print()


# Exercice 5 : Retourner plusieurs valeurs
# -------------------------------------------
# TODO: Créer une fonction qui analyse une liste de nombres

def analyser_nombres(nombres):
    """
    Analyse une liste de nombres et retourne :
    - positifs: liste des nombres positifs
    - negatifs: liste des nombres négatifs
    - zeros: nombre de zéros
    """
    # TODO: Parcourir la liste et séparer les nombres
    # TODO: Retourner un tuple de 3 valeurs
    pass

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
# TODO: Implémenter une recherche dichotomique récursive

def recherche_dichotomique(liste_triee, cible, debut=0, fin=None):
    """
    Recherche un élément dans une liste triée par dichotomie.

    Returns:
        int: L'index de l'élément, ou -1 si non trouvé.
    """
    # TODO: Initialiser fin si None
    # TODO: Cas de base : début > fin → retourner -1
    # TODO: Calculer le milieu
    # TODO: Comparer et appeler récursivement
    pass

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
# TODO: Créer une fonction de formatage flexible

def formater_message(template, *args, **kwargs):
    """
    Formate un message avec des arguments positionnels et nommés.

    Exemples:
        formater_message("Bonjour {} !", "Alice")
        → "Bonjour Alice !"

        formater_message("{nom} a {age} ans", nom="Bob", age=30)
        → "Bob a 30 ans"
    """
    # TODO: Utiliser format() avec *args et **kwargs
    pass

# Tests
print("=== Exercice 7 : Formatage flexible ===")
print(formater_message("Bonjour {} !", "Alice"))
# "Bonjour Alice !"

print(formater_message("{} + {} = {}", 2, 3, 5))
# "2 + 3 = 5"

print(formater_message("{nom} a {age} ans", nom="Bob", age=30))
# "Bob a 30 ans"
print()


# =================================================
# Bonus : Décorateur simple (avant-goût du module 19)
# =================================================
# TODO: Créer une fonction qui compte les appels d'une autre fonction

def compter_appels(fonction):
    """
    Prend une fonction en argument et retourne une version
    qui compte le nombre de fois qu'elle est appelée.
    """
    # TODO: Utiliser une closure pour compter les appels
    # Astuce: utiliser une liste [0] comme compteur mutable
    pass

# Test
# @compter_appels
# def dire_bonjour(nom):
#     return f"Bonjour {nom} !"
#
# print(dire_bonjour("Alice"))  # "Bonjour Alice !" + affiche "Appel #1"
# print(dire_bonjour("Bob"))    # "Bonjour Bob !" + affiche "Appel #2"
