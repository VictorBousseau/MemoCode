# =================================================
# Module 11 : Méthodes d'Objets
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Manipulation de strings
# --------------------------------------
# TODO: Créer une fonction qui nettoie et formate un nom

def formater_nom(nom):
    """
    Formate un nom : supprime les espaces, met en format Titre.

    Exemple: "  jean-pierre DUPONT  " → "Jean-Pierre Dupont"
    """
    # TODO: Utiliser strip() et title()
    pass

# Tests
print("=== Exercice 1 : Formater un nom ===")
print(f"'{formater_nom('  jean-pierre DUPONT  ')}'")  # "Jean-Pierre Dupont"
print(f"'{formater_nom('ALICE')}'")                    # "Alice"
print(f"'{formater_nom('  bob  ')}'")                  # "Bob"
print()


# Exercice 2 : Compter les mots
# --------------------------------
# TODO: Compter la fréquence de chaque mot dans un texte

def compter_mots(texte):
    """
    Compte la fréquence de chaque mot dans un texte.
    Les mots sont en minuscules, la ponctuation est ignorée.

    Retourne un dictionnaire {mot: nombre}.
    """
    # TODO: Utiliser lower(), split(), strip()
    # TODO: Nettoyer la ponctuation avec replace()
    pass

# Test
print("=== Exercice 2 : Compter les mots ===")
texte = "Python est génial. Python est simple. Python est puissant."
resultat = compter_mots(texte)
print(f"Fréquences : {resultat}")
# Attendu: {'python': 3, 'est': 3, 'génial': 1, 'simple': 1, 'puissant': 1}
print()


# Exercice 3 : Opérations sur une liste
# ----------------------------------------
# TODO: Effectuer une série d'opérations sur une liste

def manipuler_liste(liste):
    """
    Effectue les opérations suivantes sur une copie de la liste :
    1. Ajouter 100 à la fin
    2. Insérer 0 au début
    3. Trier en ordre croissant
    4. Supprimer la plus petite valeur
    5. Inverser la liste

    Retourne la liste modifiée.
    """
    # TODO: Utiliser copy(), append(), insert(), sort(), pop(0), reverse()
    pass

# Test
print("=== Exercice 3 : Opérations sur une liste ===")
original = [5, 3, 8, 1, 9]
resultat = manipuler_liste(original)
print(f"Original : {original}")    # [5, 3, 8, 1, 9] (non modifié)
print(f"Résultat : {resultat}")    # [100, 9, 8, 5, 3]
print()


# Exercice 4 : Gestion d'un répertoire (dictionnaire)
# ----------------------------------------------------
# TODO: Créer un répertoire téléphonique avec des méthodes de dict

def creer_repertoire(noms, numeros):
    """
    Crée un répertoire à partir de deux listes.
    """
    # TODO: Utiliser zip() et dict()
    pass

def ajouter_contact(repertoire, nom, numero):
    """Ajoute un contact s'il n'existe pas déjà."""
    # TODO: Utiliser setdefault() ou vérifier avec 'in'
    pass

def rechercher_contact(repertoire, nom):
    """Recherche un contact, retourne le numéro ou 'Non trouvé'."""
    # TODO: Utiliser get() avec une valeur par défaut
    pass

def supprimer_contact(repertoire, nom):
    """Supprime un contact s'il existe, retourne True/False."""
    # TODO: Utiliser pop() avec une valeur par défaut
    pass

# Tests
print("=== Exercice 4 : Répertoire téléphonique ===")
noms = ["Alice", "Bob", "Charlie"]
numeros = ["0612345678", "0698765432", "0611223344"]

rep = creer_repertoire(noms, numeros)
print(f"Répertoire : {rep}")

ajouter_contact(rep, "Diana", "0699887766")
print(f"Après ajout : {rep}")

print(f"Recherche Alice : {rechercher_contact(rep, 'Alice')}")      # "0612345678"
print(f"Recherche Eve : {rechercher_contact(rep, 'Eve')}")          # "Non trouvé"

supprimer_contact(rep, "Bob")
print(f"Après suppression : {rep}")
print()


# Exercice 5 : Opérations ensemblistes
# --------------------------------------
# TODO: Trouver les éléments communs et uniques entre deux listes

def analyser_listes(liste1, liste2):
    """
    Compare deux listes et retourne :
    - communs: éléments présents dans les deux
    - uniquement_1: éléments uniquement dans liste1
    - uniquement_2: éléments uniquement dans liste2
    - tous: tous les éléments uniques combinés
    """
    # TODO: Convertir en sets et utiliser les opérations ensemblistes
    # intersection (&), difference (-), union (|)
    pass

# Test
print("=== Exercice 5 : Opérations ensemblistes ===")
langages1 = ["Python", "JavaScript", "Java", "C++"]
langages2 = ["Python", "Rust", "Go", "JavaScript"]
resultat = analyser_listes(langages1, langages2)
print(f"Communs : {resultat['communs']}")           # {'Python', 'JavaScript'}
print(f"Uniquement 1 : {resultat['uniquement_1']}") # {'Java', 'C++'}
print(f"Uniquement 2 : {resultat['uniquement_2']}") # {'Rust', 'Go'}
print(f"Tous : {resultat['tous']}")
print()


# Exercice 6 : Chaîne de méthodes (method chaining)
# ---------------------------------------------------
# TODO: Nettoyer des données CSV brutes

def nettoyer_csv(ligne_csv):
    """
    Nettoie une ligne CSV brute :
    1. Supprime les espaces au début et à la fin
    2. Remplace les points-virgules par des virgules
    3. Sépare par les virgules
    4. Supprime les espaces de chaque valeur
    5. Filtre les valeurs vides

    Retourne une liste de valeurs propres.
    """
    # TODO: Chaîner strip(), replace(), split() et list comprehension
    pass

# Tests
print("=== Exercice 6 : Nettoyage CSV ===")
print(nettoyer_csv("  Alice ; 25 ; Paris  "))         # ['Alice', '25', 'Paris']
print(nettoyer_csv("Bob, 30, , Lyon"))                 # ['Bob', '30', 'Lyon']
print(nettoyer_csv("  Charlie , 35 , Marseille , "))   # ['Charlie', '35', 'Marseille']
print()


# =================================================
# Bonus : Analyse de texte avancée
# =================================================
# TODO: Analyser un texte pour trouver les mots les plus fréquents

def top_mots(texte, n=3):
    """
    Retourne les n mots les plus fréquents dans un texte.

    Retourne une liste de tuples (mot, fréquence) triée par fréquence décroissante.
    """
    # TODO: Combiner les méthodes de string, dict et sorted()
    pass

print("=== Bonus : Top mots ===")
texte = "le chat mange le poisson le chat dort le poisson nage"
print(top_mots(texte, 3))
# Attendu: [('le', 4), ('chat', 2), ('poisson', 2)]
