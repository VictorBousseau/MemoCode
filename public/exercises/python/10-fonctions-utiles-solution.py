# =================================================
# Module 10 : Fonctions Built-in Utiles
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Statistiques de base
# -----------------------------------
def statistiques(nombres):
    """
    Retourne un dictionnaire avec min, max, somme et moyenne d'une liste.
    """
    return {
        "min": min(nombres),
        "max": max(nombres),
        "somme": sum(nombres),
        "moyenne": round(sum(nombres) / len(nombres), 2)
    }

# Tests
print("=== Exercice 1 : Statistiques de base ===")
stats = statistiques([15, 8, 22, 10, 18])
print(f"Stats : {stats}")
# {'min': 8, 'max': 22, 'somme': 73, 'moyenne': 14.6}

stats2 = statistiques([100])
print(f"Stats (un seul) : {stats2}")
# {'min': 100, 'max': 100, 'somme': 100, 'moyenne': 100.0}
print()


# Exercice 2 : Tri personnalisé
# ------------------------------
def trier_par_cle(liste_dicts, cle, inverse=False):
    """Trie une liste de dictionnaires par une clé donnée."""
    return sorted(liste_dicts, key=lambda d: d[cle], reverse=inverse)

# Tests
print("=== Exercice 2 : Tri personnalisé ===")
personnes = [
    {"nom": "Charlie", "age": 35},
    {"nom": "Alice", "age": 25},
    {"nom": "Bob", "age": 30},
]

par_nom = trier_par_cle(personnes, "nom")
print(f"Par nom : {[p['nom'] for p in par_nom]}")
# ['Alice', 'Bob', 'Charlie']

par_age_desc = trier_par_cle(personnes, "age", inverse=True)
print(f"Par âge (desc) : {[p['nom'] for p in par_age_desc]}")
# ['Charlie', 'Bob', 'Alice']
print()


# Exercice 3 : Validation avec any() et all()
# ---------------------------------------------
def mot_de_passe_valide(mdp):
    """Vérifie qu'un mot de passe est valide."""
    conditions = [
        len(mdp) >= 8,                          # Au moins 8 caractères
        any(c.isupper() for c in mdp),           # Au moins une majuscule
        any(c.islower() for c in mdp),           # Au moins une minuscule
        any(c.isdigit() for c in mdp),           # Au moins un chiffre
    ]
    return all(conditions)

# Version alternative plus concise
def mot_de_passe_valide_v2(mdp):
    return all([
        len(mdp) >= 8,
        any(c.isupper() for c in mdp),
        any(c.islower() for c in mdp),
        any(c.isdigit() for c in mdp),
    ])

# Tests
print("=== Exercice 3 : Validation mot de passe ===")
print(f"'Secret123' valide : {mot_de_passe_valide('Secret123')}")      # True
print(f"'secret123' valide : {mot_de_passe_valide('secret123')}")      # False
print(f"'SECRET123' valide : {mot_de_passe_valide('SECRET123')}")      # False
print(f"'Abcdefgh' valide : {mot_de_passe_valide('Abcdefgh')}")       # False
print(f"'Abc1' valide : {mot_de_passe_valide('Abc1')}")               # False
print()


# Exercice 4 : Fonctions de conversion
# --------------------------------------
def convertir_notes(notes_str):
    """Convertit une chaîne de notes en liste d'entiers, ignore les invalides."""
    parties = notes_str.split(",")
    notes = []
    for partie in parties:
        partie = partie.strip()
        if partie.isdigit():
            notes.append(int(partie))
    return notes

# Version avec list comprehension
def convertir_notes_v2(notes_str):
    return [int(p.strip()) for p in notes_str.split(",") if p.strip().isdigit()]

# Tests
print("=== Exercice 4 : Conversion de notes ===")
notes = convertir_notes("15, 12, abc, 18, , 8")
print(f"Notes converties : {notes}")           # [15, 12, 18, 8]

notes2 = convertir_notes("20, 15, 10")
print(f"Notes simples : {notes2}")             # [20, 15, 10]
print()


# Exercice 5 : Combiner enumerate() et zip()
# -------------------------------------------
def creer_bulletin(noms_matieres, notes):
    """Crée un bulletin scolaire formaté."""
    lignes = []
    for num, (matiere, note) in enumerate(zip(noms_matieres, notes), start=1):
        lignes.append(f"{num}. {matiere} : {note}/20")
    return "\n".join(lignes)

# Version avec list comprehension
def creer_bulletin_v2(noms_matieres, notes):
    return "\n".join(
        f"{num}. {matiere} : {note}/20"
        for num, (matiere, note) in enumerate(zip(noms_matieres, notes), start=1)
    )

# Tests
print("=== Exercice 5 : Bulletin scolaire ===")
matieres = ["Maths", "Français", "Anglais", "Physique"]
notes = [15, 12, 18, 14]
bulletin = creer_bulletin(matieres, notes)
print(bulletin)
print()


# Exercice 6 : Analyse de texte avec built-ins
# -----------------------------------------------
def analyser_texte(texte):
    """Analyse un texte et retourne des statistiques."""
    mots = texte.split()
    return {
        "nb_mots": len(mots),
        "mot_plus_long": max(mots, key=len),
        "mot_plus_court": min(mots, key=len),
        "longueur_moyenne": round(sum(len(m) for m in mots) / len(mots), 1),
        "mots_tries": sorted(mots, key=len, reverse=True)
    }

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
def pipeline_notes(notes):
    """Pipeline : filtrer valides → trier desc → top 3."""
    valides = list(filter(lambda n: 0 <= n <= 20, notes))
    triees = sorted(valides, reverse=True)
    return triees[:3]

# Version avec list comprehension
def pipeline_notes_v2(notes):
    return sorted([n for n in notes if 0 <= n <= 20], reverse=True)[:3]

# Tests
print("=== Exercice 7 : Pipeline de données ===")
notes = [15, -2, 22, 8, 18, 25, 12, 14, 20, -5]
top3 = pipeline_notes(notes)
print(f"Top 3 : {top3}")  # [20, 18, 15]
print()


# =================================================
# Bonus : Dézipper et rezipper
# =================================================
def separer_donnees(liste_tuples):
    """Sépare une liste de tuples en listes individuelles."""
    colonnes = zip(*liste_tuples)
    return [list(col) for col in colonnes]

# Version alternative
def separer_donnees_v2(liste_tuples):
    noms, ages = zip(*liste_tuples)
    return list(noms), list(ages)

# Test
print("=== Bonus : Dézipper ===")
donnees = [("Alice", 25), ("Bob", 30), ("Charlie", 35)]
noms, ages = separer_donnees(donnees)
print(f"Noms : {noms}")   # ['Alice', 'Bob', 'Charlie']
print(f"Âges : {ages}")   # [25, 30, 35]
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. AGRÉGATION
   min(lst), max(lst), sum(lst), len(lst)
   → Avec key= pour personnaliser le critère

2. TRI
   sorted(lst) → nouvelle liste triée
   sorted(lst, key=func, reverse=True)
   list.sort() → tri en place

3. VÉRIFICATION
   any(condition for x in lst) → au moins un True
   all(condition for x in lst) → tous True

4. CONVERSION
   int(), float(), str(), bool()
   list(), tuple(), set(), dict()

5. ITÉRATION
   enumerate(lst, start=0) → index + valeur
   zip(lst1, lst2) → parcours parallèle
   zip(*liste_tuples) → dézipper

6. INTROSPECTION
   type(x), isinstance(x, type)
   dir(obj), help(func), id(obj)
""")
