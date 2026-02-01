# =================================================
# Module 7 : Opérateurs de Comparaison
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Vérifier si un nombre est dans une plage
# -----------------------------------------------------
def dans_plage(n, min_val, max_val):
    """Vérifie si n est entre min_val et max_val (inclus)."""
    # Utilisation de l'enchaînement de comparaisons Python
    return min_val <= n <= max_val

# Tests
print("=== Exercice 1 : Vérifier une plage ===")
print(f"5 dans [1, 10]: {dans_plage(5, 1, 10)}")      # True
print(f"15 dans [1, 10]: {dans_plage(15, 1, 10)}")    # False
print(f"1 dans [1, 10]: {dans_plage(1, 1, 10)}")      # True (bord inclus)
print(f"10 dans [1, 10]: {dans_plage(10, 1, 10)}")    # True (bord inclus)
print()


# Exercice 2 : Validation d'accès à un site
# ------------------------------------------
def peut_acceder(age, est_membre, a_invitation):
    """
    Vérifie si l'utilisateur peut accéder au site.
    Accès autorisé si : majeur ET (membre OU invitation)
    """
    # Combinaison de and et or avec parenthèses pour clarifier la priorité
    return age >= 18 and (est_membre or a_invitation)

# Tests
print("=== Exercice 2 : Validation d'accès ===")
print(f"25 ans, membre, sans invitation: {peut_acceder(25, True, False)}")    # True
print(f"25 ans, non-membre, avec invitation: {peut_acceder(25, False, True)}")  # True
print(f"16 ans, membre, avec invitation: {peut_acceder(16, True, True)}")     # False
print(f"25 ans, non-membre, sans invitation: {peut_acceder(25, False, False)}")  # False
print()


# Exercice 3 : Classifier un nombre
# ----------------------------------
def classifier_nombre(n):
    """Classifie un nombre comme positif, négatif ou zéro."""
    if n > 0:
        return "positif"
    elif n < 0:
        return "négatif"
    else:
        return "zéro"

# Tests
print("=== Exercice 3 : Classifier un nombre ===")
print(f"Classifier 42: {classifier_nombre(42)}")      # "positif"
print(f"Classifier -7: {classifier_nombre(-7)}")      # "négatif"
print(f"Classifier 0: {classifier_nombre(0)}")        # "zéro"
print()


# Exercice 4 : Vérifier un mot de passe
# --------------------------------------
def valider_mot_de_passe(mot_de_passe):
    """
    Valide un mot de passe selon plusieurs critères.
    Retourne True si tous les critères sont remplis.
    """
    # Vérifier la longueur minimale (8 caractères)
    longueur_ok = len(mot_de_passe) >= 8
    
    # Vérifier la présence d'au moins un chiffre
    contient_chiffre = any(char.isdigit() for char in mot_de_passe)
    
    # Vérifier la présence d'au moins une lettre
    contient_lettre = any(char.isalpha() for char in mot_de_passe)
    
    # Tous les critères doivent être remplis
    return longueur_ok and contient_chiffre and contient_lettre

# Tests
print("=== Exercice 4 : Valider un mot de passe ===")
print(f"'Secret123': {valider_mot_de_passe('Secret123')}")  # True
print(f"'abc': {valider_mot_de_passe('abc')}")              # False (trop court)
print(f"'12345678': {valider_mot_de_passe('12345678')}")    # False (pas de lettre)
print(f"'password': {valider_mot_de_passe('password')}")    # False (pas de chiffre)
print()


# Exercice 5 : Vérifier l'appartenance à une liste
# -------------------------------------------------
def est_fruit_tropical(fruit):
    """Vérifie si le fruit est un fruit tropical (insensible à la casse)."""
    fruits_tropicaux = ["mangue", "ananas", "papaye", "banane", "noix de coco", "fruit de la passion"]
    
    # Convertir en minuscules pour une comparaison insensible à la casse
    return fruit.lower() in fruits_tropicaux

# Tests
print("=== Exercice 5 : Fruits tropicaux ===")
print(f"'Mangue' est tropical: {est_fruit_tropical('Mangue')}")    # True
print(f"'ANANAS' est tropical: {est_fruit_tropical('ANANAS')}")    # True
print(f"'pomme' est tropical: {est_fruit_tropical('pomme')}")      # False
print(f"'Banane' est tropical: {est_fruit_tropical('Banane')}")    # True
print()


# Exercice 6 : Comparaison d'identité vs égalité
# -----------------------------------------------
def comparer_listes():
    """Démontre la différence entre == et is."""
    liste_a = [1, 2, 3]
    liste_b = [1, 2, 3]
    liste_c = liste_a  # liste_c pointe vers le même objet que liste_a
    
    print("liste_a = [1, 2, 3]")
    print("liste_b = [1, 2, 3]")
    print("liste_c = liste_a")
    print()
    
    # Comparaison de valeurs (==) : compare le contenu
    a_egal_b = liste_a == liste_b  # True - mêmes valeurs
    a_egal_c = liste_a == liste_c  # True - mêmes valeurs
    
    # Comparaison d'identité (is) : compare les adresses mémoire
    a_is_b = liste_a is liste_b    # False - objets différents
    a_is_c = liste_a is liste_c    # True - même objet
    
    print(f"liste_a == liste_b: {a_egal_b}")  # True (mêmes valeurs)
    print(f"liste_a == liste_c: {a_egal_c}")  # True (mêmes valeurs)
    print(f"liste_a is liste_b: {a_is_b}")    # False (objets différents)
    print(f"liste_a is liste_c: {a_is_c}")    # True (même objet)
    
    # Bonus : afficher les id pour prouver
    print()
    print(f"id(liste_a): {id(liste_a)}")
    print(f"id(liste_b): {id(liste_b)}")  # Différent de liste_a
    print(f"id(liste_c): {id(liste_c)}")  # Identique à liste_a

print("=== Exercice 6 : Identité vs Égalité ===")
comparer_listes()
print()


# Exercice 7 : Vérifier None correctement
# ----------------------------------------
def traiter_valeur(valeur):
    """
    Traite une valeur qui peut être None.
    Retourne "Pas de valeur" si None, sinon retourne la valeur doublée.
    """
    # Toujours utiliser 'is None' pour vérifier None
    if valeur is None:
        return "Pas de valeur"
    else:
        return valeur * 2

# Tests
print("=== Exercice 7 : Traiter None ===")
print(f"traiter_valeur(None): {traiter_valeur(None)}")     # "Pas de valeur"
print(f"traiter_valeur(5): {traiter_valeur(5)}")           # 10
print(f"traiter_valeur('ab'): {traiter_valeur('ab')}")     # "abab"
print()


# =================================================
# Bonus : Système de tarification
# =================================================
def calculer_prix_billet(prix_base, age, est_etudiant=False):
    """
    Calcule le prix d'un billet avec les réductions applicables.
    Retourne le prix après la meilleure réduction applicable.
    
    Réductions :
    - Enfant (< 12 ans) : 50%
    - Senior (>= 65 ans) : 30%
    - Étudiant (avec carte) : 20%
    Les réductions ne sont PAS cumulables.
    """
    # Calculer toutes les réductions possibles
    reductions = [0]  # Au minimum 0% de réduction
    
    # Réduction enfant
    if age < 12:
        reductions.append(50)
    
    # Réduction senior
    if age >= 65:
        reductions.append(30)
    
    # Réduction étudiant
    if est_etudiant:
        reductions.append(20)
    
    # Prendre la meilleure réduction (la plus élevée)
    meilleure_reduction = max(reductions)
    
    # Calculer le prix final
    prix_final = prix_base * (1 - meilleure_reduction / 100)
    
    return prix_final

# Tests
print("=== Bonus : Système de tarification ===")
prix_base = 100
print(f"Prix de base: {prix_base}€")
print(f"Adulte 30 ans: {calculer_prix_billet(prix_base, 30)}€")           # 100
print(f"Enfant 8 ans: {calculer_prix_billet(prix_base, 8)}€")             # 50
print(f"Senior 70 ans: {calculer_prix_billet(prix_base, 70)}€")           # 70
print(f"Étudiant 22 ans: {calculer_prix_billet(prix_base, 22, True)}€")   # 80
print(f"Étudiant senior 66 ans: {calculer_prix_billet(prix_base, 66, True)}€")  # 70 (senior > étudiant)


# =================================================
# Résumé des concepts clés
# =================================================
print("\n" + "=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. OPÉRATEURS DE COMPARAISON
   ==, !=, <, >, <=, >= retournent True ou False

2. ENCHAÎNEMENT DE COMPARAISONS
   Python permet : 1 < x < 10 au lieu de 1 < x and x < 10

3. OPÉRATEURS LOGIQUES
   - and : True si les DEUX conditions sont True
   - or : True si AU MOINS UNE condition est True
   - not : inverse la valeur booléenne
   - Priorité : not > and > or

4. OPÉRATEURS D'APPARTENANCE
   - in : vérifie si un élément est dans une séquence
   - not in : vérifie l'absence

5. OPÉRATEURS D'IDENTITÉ
   - == compare les VALEURS
   - is compare les IDENTITÉS (même objet mémoire)
   - Toujours utiliser 'is None' pour vérifier None

6. VALEURS TRUTHY/FALSY
   - Falsy : False, None, 0, "", [], {}, set()
   - Truthy : tout le reste
""")
