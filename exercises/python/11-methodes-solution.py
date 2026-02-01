# =================================================
# Module 11 : Méthodes d'Objets
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Manipulation de strings
# --------------------------------------
def formater_nom(nom):
    """Formate un nom : supprime les espaces, met en format Titre."""
    return nom.strip().title()

# Tests
print("=== Exercice 1 : Formater un nom ===")
print(f"'{formater_nom('  jean-pierre DUPONT  ')}'")  # "Jean-Pierre Dupont"
print(f"'{formater_nom('ALICE')}'")                    # "Alice"
print(f"'{formater_nom('  bob  ')}'")                  # "Bob"
print()


# Exercice 2 : Compter les mots
# --------------------------------
def compter_mots(texte):
    """Compte la fréquence de chaque mot dans un texte."""
    # Nettoyer la ponctuation
    for char in ".,;:!?()\"'":
        texte = texte.replace(char, "")

    mots = texte.lower().split()

    frequences = {}
    for mot in mots:
        frequences[mot] = frequences.get(mot, 0) + 1

    return frequences

# Version alternative avec setdefault
def compter_mots_v2(texte):
    for char in ".,;:!?()\"'":
        texte = texte.replace(char, "")

    mots = texte.lower().split()
    freq = {}
    for mot in mots:
        freq.setdefault(mot, 0)
        freq[mot] += 1
    return freq

# Test
print("=== Exercice 2 : Compter les mots ===")
texte = "Python est génial. Python est simple. Python est puissant."
resultat = compter_mots(texte)
print(f"Fréquences : {resultat}")
print()


# Exercice 3 : Opérations sur une liste
# ----------------------------------------
def manipuler_liste(liste):
    """Effectue une série d'opérations sur une copie de la liste."""
    resultat = liste.copy()     # Copie pour ne pas modifier l'original
    resultat.append(100)        # 1. Ajouter 100 à la fin
    resultat.insert(0, 0)       # 2. Insérer 0 au début
    resultat.sort()             # 3. Trier en ordre croissant
    resultat.pop(0)             # 4. Supprimer la plus petite valeur (index 0 après tri)
    resultat.reverse()          # 5. Inverser la liste
    return resultat

# Test
print("=== Exercice 3 : Opérations sur une liste ===")
original = [5, 3, 8, 1, 9]
resultat = manipuler_liste(original)
print(f"Original : {original}")    # [5, 3, 8, 1, 9]
print(f"Résultat : {resultat}")    # [100, 9, 8, 5, 3]
print()


# Exercice 4 : Gestion d'un répertoire (dictionnaire)
# ----------------------------------------------------
def creer_repertoire(noms, numeros):
    """Crée un répertoire à partir de deux listes."""
    return dict(zip(noms, numeros))

def ajouter_contact(repertoire, nom, numero):
    """Ajoute un contact s'il n'existe pas déjà."""
    repertoire.setdefault(nom, numero)

# Version alternative
def ajouter_contact_v2(repertoire, nom, numero):
    if nom not in repertoire:
        repertoire[nom] = numero

def rechercher_contact(repertoire, nom):
    """Recherche un contact, retourne le numéro ou 'Non trouvé'."""
    return repertoire.get(nom, "Non trouvé")

def supprimer_contact(repertoire, nom):
    """Supprime un contact s'il existe, retourne True/False."""
    return repertoire.pop(nom, None) is not None

# Tests
print("=== Exercice 4 : Répertoire téléphonique ===")
noms = ["Alice", "Bob", "Charlie"]
numeros = ["0612345678", "0698765432", "0611223344"]

rep = creer_repertoire(noms, numeros)
print(f"Répertoire : {rep}")

ajouter_contact(rep, "Diana", "0699887766")
print(f"Après ajout : {rep}")

print(f"Recherche Alice : {rechercher_contact(rep, 'Alice')}")
print(f"Recherche Eve : {rechercher_contact(rep, 'Eve')}")

supprimer_contact(rep, "Bob")
print(f"Après suppression : {rep}")
print()


# Exercice 5 : Opérations ensemblistes
# --------------------------------------
def analyser_listes(liste1, liste2):
    """Compare deux listes avec des opérations ensemblistes."""
    set1 = set(liste1)
    set2 = set(liste2)

    return {
        "communs": set1 & set2,            # Intersection
        "uniquement_1": set1 - set2,       # Différence
        "uniquement_2": set2 - set1,       # Différence
        "tous": set1 | set2                # Union
    }

# Test
print("=== Exercice 5 : Opérations ensemblistes ===")
langages1 = ["Python", "JavaScript", "Java", "C++"]
langages2 = ["Python", "Rust", "Go", "JavaScript"]
resultat = analyser_listes(langages1, langages2)
print(f"Communs : {resultat['communs']}")
print(f"Uniquement 1 : {resultat['uniquement_1']}")
print(f"Uniquement 2 : {resultat['uniquement_2']}")
print(f"Tous : {resultat['tous']}")
print()


# Exercice 6 : Chaîne de méthodes (method chaining)
# ---------------------------------------------------
def nettoyer_csv(ligne_csv):
    """Nettoie une ligne CSV brute."""
    valeurs = ligne_csv.strip().replace(";", ",").split(",")
    return [v.strip() for v in valeurs if v.strip()]

# Tests
print("=== Exercice 6 : Nettoyage CSV ===")
print(nettoyer_csv("  Alice ; 25 ; Paris  "))         # ['Alice', '25', 'Paris']
print(nettoyer_csv("Bob, 30, , Lyon"))                 # ['Bob', '30', 'Lyon']
print(nettoyer_csv("  Charlie , 35 , Marseille , "))   # ['Charlie', '35', 'Marseille']
print()


# =================================================
# Bonus : Analyse de texte avancée
# =================================================
def top_mots(texte, n=3):
    """Retourne les n mots les plus fréquents dans un texte."""
    # Nettoyer et découper
    for char in ".,;:!?()\"'":
        texte = texte.replace(char, "")

    mots = texte.lower().split()

    # Compter les fréquences
    freq = {}
    for mot in mots:
        freq[mot] = freq.get(mot, 0) + 1

    # Trier par fréquence décroissante et retourner les n premiers
    return sorted(freq.items(), key=lambda x: x[1], reverse=True)[:n]

print("=== Bonus : Top mots ===")
texte = "le chat mange le poisson le chat dort le poisson nage"
print(top_mots(texte, 3))
# [('le', 4), ('chat', 2), ('poisson', 2)]
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. MÉTHODES DE STRINGS (immuables → retournent une nouvelle string)
   .upper(), .lower(), .title(), .strip()
   .split(sep), .join(seq), .replace(old, new)
   .find(sub), .count(sub), .startswith(s), .endswith(s)
   .isdigit(), .isalpha(), .isalnum()

2. MÉTHODES DE LISTES (mutables → modifient en place)
   .append(x), .insert(i, x), .extend(seq)
   .pop(i), .remove(x), .clear()
   .sort(key=, reverse=), .reverse(), .copy()
   .index(x), .count(x)

3. MÉTHODES DE DICTIONNAIRES
   .get(key, default), .keys(), .values(), .items()
   .update(d), .pop(key), .setdefault(key, value)

4. MÉTHODES DE SETS
   .union(s) ou |, .intersection(s) ou &
   .difference(s) ou -, .symmetric_difference(s) ou ^
   .add(x), .discard(x), .remove(x)
""")
