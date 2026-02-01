# =================================================
# Module 10 : Fonctions Built-in Utiles
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Statistiques de base
# -----------------------------------
# TODO: Compléter la fonction qui retourne les statistiques d'une liste

def statistiques(nombres):
    """
    Retourne un dictionnaire avec min, max, somme et moyenne d'une liste.
    La moyenne doit être arrondie à 2 décimales.
    """
    # TODO: Utiliser min(), max(), sum(), len() et round()
    pass

# Tests
print("=== Exercice 1 : Statistiques de base ===")
stats = statistiques([15, 8, 22, 10, 18])
print(f"Stats : {stats}")
# Attendu: {'min': 8, 'max': 22, 'somme': 73, 'moyenne': 14.6}

stats2 = statistiques([100])
print(f"Stats (un seul) : {stats2}")
# Attendu: {'min': 100, 'max': 100, 'somme': 100, 'moyenne': 100.0}
print()


# Exercice 2 : Tri personnalisé
# ------------------------------
# TODO: Trier une liste de dictionnaires selon différents critères

def trier_par_cle(liste_dicts, cle, inverse=False):
    """
    Trie une liste de dictionnaires par une clé donnée.

    Args:
        liste_dicts: Liste de dictionnaires
        cle: La clé de tri (ex: "nom", "age")
        inverse: Si True, tri décroissant
    """
    # TODO: Utiliser sorted() avec le paramètre key
    pass

# Tests
print("=== Exercice 2 : Tri personnalisé ===")
personnes = [
    {"nom": "Charlie", "age": 35},
    {"nom": "Alice", "age": 25},
    {"nom": "Bob", "age": 30},
]

par_nom = trier_par_cle(personnes, "nom")
print(f"Par nom : {[p['nom'] for p in par_nom]}")
# Attendu: ['Alice', 'Bob', 'Charlie']

par_age_desc = trier_par_cle(personnes, "age", inverse=True)
print(f"Par âge (desc) : {[p['nom'] for p in par_age_desc]}")
# Attendu: ['Charlie', 'Bob', 'Alice']
print()


# Exercice 3 : Validation avec any() et all()
# ---------------------------------------------
# TODO: Créer des fonctions de validation

def mot_de_passe_valide(mdp):
    """
    Vérifie qu'un mot de passe est valide :
    - Au moins 8 caractères
    - Au moins une majuscule
    - Au moins une minuscule
    - Au moins un chiffre
    """
    # TODO: Utiliser all() et any() avec des expressions génératrices
    pass

# Tests
print("=== Exercice 3 : Validation mot de passe ===")
print(f"'Secret123' valide : {mot_de_passe_valide('Secret123')}")      # True
print(f"'secret123' valide : {mot_de_passe_valide('secret123')}")      # False (pas de majuscule)
print(f"'SECRET123' valide : {mot_de_passe_valide('SECRET123')}")      # False (pas de minuscule)
print(f"'Abcdefgh' valide : {mot_de_passe_valide('Abcdefgh')}")       # False (pas de chiffre)
print(f"'Abc1' valide : {mot_de_passe_valide('Abc1')}")               # False (trop court)
print()


# Exercice 4 : Fonctions de conversion
# --------------------------------------
# TODO: Convertir des données entre différents formats

def convertir_notes(notes_str):
    """
    Convertit une chaîne de notes séparées par des virgules en liste d'entiers.
    Ignore les valeurs non numériques.

    Exemple: "15, 12, abc, 18, , 8" → [15, 12, 18, 8]
    """
    # TODO: Utiliser split(), strip(), isdigit() et map() ou list comprehension
    pass

# Tests
print("=== Exercice 4 : Conversion de notes ===")
notes = convertir_notes("15, 12, abc, 18, , 8")
print(f"Notes converties : {notes}")           # Attendu: [15, 12, 18, 8]

notes2 = convertir_notes("20, 15, 10")
print(f"Notes simples : {notes2}")             # Attendu: [20, 15, 10]
print()


# Exercice 5 : Combiner enumerate() et zip()
# -------------------------------------------
# TODO: Créer un bulletin scolaire formaté

def creer_bulletin(noms_matieres, notes):
    """
    Crée un bulletin scolaire formaté.

    Args:
        noms_matieres: Liste des noms de matières
        notes: Liste des notes correspondantes

    Returns:
        str: Bulletin formaté avec numérotation
    """
    # TODO: Utiliser enumerate() et zip() pour créer le bulletin
    # Format attendu:
    # 1. Maths : 15/20
    # 2. Français : 12/20
    # ...
    pass

# Tests
print("=== Exercice 5 : Bulletin scolaire ===")
matieres = ["Maths", "Français", "Anglais", "Physique"]
notes = [15, 12, 18, 14]
bulletin = creer_bulletin(matieres, notes)
print(bulletin)
# Attendu:
# 1. Maths : 15/20
# 2. Français : 12/20
# 3. Anglais : 18/20
# 4. Physique : 14/20
print()


# Exercice 6 : Analyse de texte avec built-ins
# -----------------------------------------------
# TODO: Analyser un texte avec les fonctions built-in

def analyser_texte(texte):
    """
    Analyse un texte et retourne des statistiques.

    Returns:
        dict avec:
        - nb_mots: nombre de mots
        - mot_plus_long: le mot le plus long
        - mot_plus_court: le mot le plus court
        - longueur_moyenne: longueur moyenne des mots (arrondie à 1 décimale)
        - mots_tries: liste des mots triés par longueur décroissante
    """
    # TODO: Utiliser len(), max(), min(), sorted(), sum(), round()
    pass

# Test
print("=== Exercice 6 : Analyse de texte ===")
texte = "Python est un langage de programmation puissant"
resultat = analyser_texte(texte)
print(f"Nombre de mots : {resultat['nb_mots']}")           # 7
print(f"Mot le plus long : {resultat['mot_plus_long']}")    # "programmation"
print(f"Mot le plus court : {resultat['mot_plus_court']}")  # "un" ou "de"
print(f"Longueur moyenne : {resultat['longueur_moyenne']}")  # 6.4
print(f"Triés par longueur : {resultat['mots_tries']}")
print()


# Exercice 7 : Pipeline de données
# ----------------------------------
# TODO: Chaîner des opérations sur des données

def pipeline_notes(notes):
    """
    Pipeline de traitement de notes :
    1. Filtrer les notes valides (entre 0 et 20)
    2. Trier en ordre décroissant
    3. Retourner les 3 meilleures notes

    Utiliser filter(), sorted() et le slicing.
    """
    # TODO: Implémenter le pipeline
    pass

# Tests
print("=== Exercice 7 : Pipeline de données ===")
notes = [15, -2, 22, 8, 18, 25, 12, 14, 20, -5]
top3 = pipeline_notes(notes)
print(f"Top 3 : {top3}")  # Attendu: [20, 18, 15]
print()


# =================================================
# Bonus : Dézipper et rezipper
# =================================================
# TODO: Utiliser zip() et * pour séparer et recombiner des données

def separer_donnees(liste_tuples):
    """
    Sépare une liste de tuples en listes individuelles.

    Exemple: [(1, 'a'), (2, 'b'), (3, 'c')]
    → ([1, 2, 3], ['a', 'b', 'c'])
    """
    # TODO: Utiliser zip(*...) pour dézipper
    pass

# Test
print("=== Bonus : Dézipper ===")
donnees = [("Alice", 25), ("Bob", 30), ("Charlie", 35)]
noms, ages = separer_donnees(donnees)
print(f"Noms : {noms}")   # Attendu: ['Alice', 'Bob', 'Charlie']
print(f"Âges : {ages}")   # Attendu: [25, 30, 35]
