# =================================================
# Module 7 : Opérateurs de Comparaison
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Vérifier si un nombre est dans une plage
# -----------------------------------------------------
# TODO: Compléter la fonction pour vérifier si n est entre min_val et max_val (inclus)
# Utilisez l'enchaînement de comparaisons Python !

def dans_plage(n, min_val, max_val):
    """Vérifie si n est entre min_val et max_val (inclus)."""
    # TODO: Retourner True si min_val <= n <= max_val
    pass

# Tests
print("=== Exercice 1 : Vérifier une plage ===")
print(f"5 dans [1, 10]: {dans_plage(5, 1, 10)}")      # Attendu: True
print(f"15 dans [1, 10]: {dans_plage(15, 1, 10)}")    # Attendu: False
print(f"1 dans [1, 10]: {dans_plage(1, 1, 10)}")      # Attendu: True (bord inclus)
print(f"10 dans [1, 10]: {dans_plage(10, 1, 10)}")    # Attendu: True (bord inclus)
print()


# Exercice 2 : Validation d'accès à un site
# ------------------------------------------
# TODO: Compléter la fonction qui vérifie si un utilisateur peut accéder au site
# Règles : L'utilisateur doit être majeur (>= 18 ans) ET (être membre OU avoir une invitation)

def peut_acceder(age, est_membre, a_invitation):
    """
    Vérifie si l'utilisateur peut accéder au site.
    Accès autorisé si : majeur ET (membre OU invitation)
    """
    # TODO: Implémenter la logique d'accès
    pass

# Tests
print("=== Exercice 2 : Validation d'accès ===")
print(f"25 ans, membre, sans invitation: {peut_acceder(25, True, False)}")    # Attendu: True
print(f"25 ans, non-membre, avec invitation: {peut_acceder(25, False, True)}")  # Attendu: True
print(f"16 ans, membre, avec invitation: {peut_acceder(16, True, True)}")     # Attendu: False
print(f"25 ans, non-membre, sans invitation: {peut_acceder(25, False, False)}")  # Attendu: False
print()


# Exercice 3 : Classifier un nombre
# ----------------------------------
# TODO: Compléter la fonction qui classifie un nombre
# Retourne "positif", "négatif" ou "zéro"

def classifier_nombre(n):
    """Classifie un nombre comme positif, négatif ou zéro."""
    # TODO: Utiliser des comparaisons pour classifier le nombre
    pass

# Tests
print("=== Exercice 3 : Classifier un nombre ===")
print(f"Classifier 42: {classifier_nombre(42)}")      # Attendu: "positif"
print(f"Classifier -7: {classifier_nombre(-7)}")      # Attendu: "négatif"
print(f"Classifier 0: {classifier_nombre(0)}")        # Attendu: "zéro"
print()


# Exercice 4 : Vérifier un mot de passe
# --------------------------------------
# TODO: Compléter la fonction qui valide un mot de passe
# Critères : 
# - Au moins 8 caractères
# - Contient au moins un chiffre (utiliser any() avec str.isdigit())
# - Contient au moins une lettre (utiliser any() avec str.isalpha())

def valider_mot_de_passe(mot_de_passe):
    """
    Valide un mot de passe selon plusieurs critères.
    Retourne True si tous les critères sont remplis.
    """
    # TODO: Vérifier la longueur minimale
    longueur_ok = None
    
    # TODO: Vérifier la présence d'au moins un chiffre
    # Astuce: any(char.isdigit() for char in mot_de_passe)
    contient_chiffre = None
    
    # TODO: Vérifier la présence d'au moins une lettre
    contient_lettre = None
    
    # TODO: Retourner True si TOUS les critères sont OK
    pass

# Tests
print("=== Exercice 4 : Valider un mot de passe ===")
print(f"'Secret123': {valider_mot_de_passe('Secret123')}")  # Attendu: True
print(f"'abc': {valider_mot_de_passe('abc')}")              # Attendu: False (trop court)
print(f"'12345678': {valider_mot_de_passe('12345678')}")    # Attendu: False (pas de lettre)
print(f"'password': {valider_mot_de_passe('password')}")    # Attendu: False (pas de chiffre)
print()


# Exercice 5 : Vérifier l'appartenance à une liste
# -------------------------------------------------
# TODO: Compléter la fonction qui vérifie si un fruit est dans la liste des fruits tropicaux

def est_fruit_tropical(fruit):
    """Vérifie si le fruit est un fruit tropical (insensible à la casse)."""
    fruits_tropicaux = ["mangue", "ananas", "papaye", "banane", "noix de coco", "fruit de la passion"]
    
    # TODO: Vérifier si le fruit (en minuscules) est dans la liste
    # Astuce: utiliser .lower() pour la comparaison insensible à la casse
    pass

# Tests
print("=== Exercice 5 : Fruits tropicaux ===")
print(f"'Mangue' est tropical: {est_fruit_tropical('Mangue')}")    # Attendu: True
print(f"'ANANAS' est tropical: {est_fruit_tropical('ANANAS')}")    # Attendu: True
print(f"'pomme' est tropical: {est_fruit_tropical('pomme')}")      # Attendu: False
print(f"'Banane' est tropical: {est_fruit_tropical('Banane')}")    # Attendu: True
print()


# Exercice 6 : Comparaison d'identité vs égalité
# -----------------------------------------------
# TODO: Compléter pour démontrer la différence entre == et is

def comparer_listes():
    """Démontre la différence entre == et is."""
    liste_a = [1, 2, 3]
    liste_b = [1, 2, 3]
    liste_c = liste_a
    
    # TODO: Compléter les comparaisons
    print("liste_a = [1, 2, 3]")
    print("liste_b = [1, 2, 3]")
    print("liste_c = liste_a")
    print()
    
    # Comparaison de valeurs
    a_egal_b = None  # TODO: liste_a == liste_b
    a_egal_c = None  # TODO: liste_a == liste_c
    
    # Comparaison d'identité
    a_is_b = None    # TODO: liste_a is liste_b
    a_is_c = None    # TODO: liste_a is liste_c
    
    print(f"liste_a == liste_b: {a_egal_b}")  # Attendu: True
    print(f"liste_a == liste_c: {a_egal_c}")  # Attendu: True
    print(f"liste_a is liste_b: {a_is_b}")    # Attendu: False
    print(f"liste_a is liste_c: {a_is_c}")    # Attendu: True

print("=== Exercice 6 : Identité vs Égalité ===")
comparer_listes()
print()


# Exercice 7 : Vérifier None correctement
# ----------------------------------------
# TODO: Compléter la fonction qui traite une valeur optionnelle

def traiter_valeur(valeur):
    """
    Traite une valeur qui peut être None.
    Retourne "Pas de valeur" si None, sinon retourne la valeur doublée.
    """
    # TODO: Utiliser 'is None' pour vérifier si la valeur est None
    # TODO: Si None, retourner "Pas de valeur"
    # TODO: Sinon, retourner valeur * 2
    pass

# Tests
print("=== Exercice 7 : Traiter None ===")
print(f"traiter_valeur(None): {traiter_valeur(None)}")     # Attendu: "Pas de valeur"
print(f"traiter_valeur(5): {traiter_valeur(5)}")           # Attendu: 10
print(f"traiter_valeur('ab'): {traiter_valeur('ab')}")     # Attendu: "abab"
print()


# =================================================
# Bonus : Système de tarification
# =================================================
# TODO: Créer une fonction qui calcule le prix d'un billet selon plusieurs critères
# Règles de réduction :
# - Enfant (< 12 ans) : 50% de réduction
# - Senior (>= 65 ans) : 30% de réduction
# - Étudiant (avec carte) : 20% de réduction
# - Les réductions ne sont PAS cumulables, on applique la meilleure

def calculer_prix_billet(prix_base, age, est_etudiant=False):
    """
    Calcule le prix d'un billet avec les réductions applicables.
    Retourne le prix après la meilleure réduction applicable.
    """
    # TODO: Implémenter la logique de tarification
    # Astuce: calculer toutes les réductions possibles et prendre la meilleure
    pass

# Tests
print("=== Bonus : Système de tarification ===")
prix_base = 100
print(f"Prix de base: {prix_base}€")
print(f"Adulte 30 ans: {calculer_prix_billet(prix_base, 30)}€")           # Attendu: 100
print(f"Enfant 8 ans: {calculer_prix_billet(prix_base, 8)}€")             # Attendu: 50
print(f"Senior 70 ans: {calculer_prix_billet(prix_base, 70)}€")           # Attendu: 70
print(f"Étudiant 22 ans: {calculer_prix_billet(prix_base, 22, True)}€")   # Attendu: 80
print(f"Étudiant senior 66 ans: {calculer_prix_billet(prix_base, 66, True)}€")  # Attendu: 70 (senior > étudiant)
