# =================================================
# Module 20 : Générateurs
# SOLUTION - Fichier corrigé
# =================================================

import itertools

# Exercice 1 : Générateur avec yield
# --------------------------------------
def compteur(debut, fin):
    """Générateur qui produit les nombres de debut à fin (inclus)."""
    courant = debut
    while courant <= fin:
        yield courant
        courant += 1


def fibonacci_gen(n):
    """Générateur qui produit les n premiers nombres de Fibonacci."""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b


def lire_par_blocs(texte, taille_bloc=3):
    """Générateur qui découpe un texte en blocs de taille fixe."""
    for i in range(0, len(texte), taille_bloc):
        yield texte[i:i + taille_bloc]


# Tests
print("=== Exercice 1 : Générateur avec yield ===")
print(f"compteur(1, 5) : {list(compteur(1, 5))}")
print(f"fibonacci_gen(8) : {list(fibonacci_gen(8))}")
print(f"lire_par_blocs('ABCDEFGH', 3) : {list(lire_par_blocs('ABCDEFGH', 3))}")
print()


# Exercice 2 : Expressions génératrices
# -----------------------------------------
def somme_carres_gen(n):
    """Calcule la somme des carrés de 1 à n avec une expression génératrice."""
    return sum(x**2 for x in range(1, n + 1))


def mots_longs(phrase, longueur_min=5):
    """Retourne les mots longs en majuscules via expression génératrice."""
    return list(
        mot.upper()
        for mot in phrase.split()
        if len(mot) >= longueur_min
    )


def aplatir(listes):
    """Générateur qui aplatit une liste de listes."""
    for sous_liste in listes:
        for element in sous_liste:
            yield element


# Tests
print("=== Exercice 2 : Expressions génératrices ===")
print(f"somme_carres_gen(4) : {somme_carres_gen(4)}")  # 30
print(f"somme_carres_gen(10) : {somme_carres_gen(10)}")  # 385
print(f"mots_longs('Le petit chat mange beaucoup') : {mots_longs('Le petit chat mange beaucoup')}")
print(f"aplatir([[1,2],[3],[4,5,6]]) : {list(aplatir([[1, 2], [3], [4, 5, 6]]))}")
print()


# Exercice 3 : itertools
# -------------------------
def grouper_par_parite(nombres):
    """Groupe les nombres par parité avec itertools.groupby."""
    resultat = {"pair": [], "impair": []}
    tri = sorted(nombres, key=lambda x: x % 2)
    for cle, groupe in itertools.groupby(tri, key=lambda x: x % 2):
        label = "pair" if cle == 0 else "impair"
        resultat[label] = list(groupe)
    return resultat


def combinaisons_equipes(joueurs, taille=2):
    """Génère toutes les combinaisons d'équipes."""
    return list(itertools.combinations(joueurs, taille))


def produit_cartesien(couleurs, tailles):
    """Génère le produit cartésien de couleurs et tailles."""
    return list(itertools.product(couleurs, tailles))


# Tests
print("=== Exercice 3 : itertools ===")
print(f"Grouper par parité : {grouper_par_parite([1, 2, 3, 4, 5, 6])}")
print(f"Combinaisons : {combinaisons_equipes(['Alice', 'Bob', 'Charlie'], 2)}")
print(f"Produit cartésien : {produit_cartesien(['rouge', 'bleu'], ['S', 'M'])}")
print()


# Exercice 4 : Pipeline de générateurs
# ----------------------------------------
def lire_lignes(texte):
    """Générateur qui produit chaque ligne d'un texte multiligne."""
    for ligne in texte.split("\n"):
        yield ligne


def filtrer_commentaires(lignes):
    """Générateur qui filtre les lignes vides et les commentaires."""
    for ligne in lignes:
        ligne_strip = ligne.strip()
        if ligne_strip and not ligne_strip.startswith("#"):
            yield ligne_strip


def parser_csv(lignes, separateur=","):
    """Générateur qui parse chaque ligne CSV en liste de valeurs."""
    for ligne in lignes:
        yield ligne.split(separateur)


# Tests
print("=== Exercice 4 : Pipeline de générateurs ===")
texte_csv = """# Fichier de données
nom,age,ville

Alice,25,Paris
Bob,30,Lyon
# fin du fichier
Charlie,28,Marseille"""

lignes = lire_lignes(texte_csv)
lignes_propres = filtrer_commentaires(lignes)
donnees = list(parser_csv(lignes_propres))
print(f"Données parsées : {donnees}")
print()


# Exercice 5 : Cas pratique — Générateur infini
# -------------------------------------------------
def nombres_premiers():
    """Générateur infini qui produit les nombres premiers."""
    n = 2
    while True:
        est_premier = True
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                est_premier = False
                break
        if est_premier:
            yield n
        n += 1


def prendre(generateur, n):
    """Prend les n premiers éléments d'un générateur."""
    return list(itertools.islice(generateur, n))


# Tests
print("=== Exercice 5 : Générateur infini ===")
gen = nombres_premiers()
premiers = prendre(gen, 10)
print(f"10 premiers nombres premiers : {premiers}")

resultat = prendre(fibonacci_gen(20), 7)
print(f"7 premiers Fibonacci : {resultat}")
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. YIELD
   def mon_generateur():
       yield valeur      # Produit une valeur et suspend
   # Chaque appel à next() reprend après le dernier yield

2. EXPRESSION GÉNÉRATRICE
   gen = (x**2 for x in range(10))   # Pas de liste en mémoire
   sum(x**2 for x in range(10))      # Directement dans sum()

3. ITERTOOLS
   itertools.chain(a, b)         → Concaténer des itérables
   itertools.groupby(data, key)  → Grouper par clé
   itertools.combinations(l, n)  → Combinaisons
   itertools.product(a, b)       → Produit cartésien
   itertools.islice(gen, n)      → Prendre n éléments

4. PIPELINE
   Chaîner des générateurs = traitement paresseux (lazy)
   lignes = lire(fichier)
   propres = filtrer(lignes)
   donnees = parser(propres)    # Rien n'est calculé tant qu'on n'itère pas

5. AVANTAGES
   ✅ Mémoire constante (pas de liste complète)
   ✅ Évaluation paresseuse (calcul à la demande)
   ✅ Composable (pipeline)
   ✅ Peut représenter des séquences infinies
""")
