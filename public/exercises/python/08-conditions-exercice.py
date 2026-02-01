# =================================================
# Module 8 : Conditions (if/elif/else)
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Calculateur de mention
# ------------------------------------
# TODO: Compléter la fonction qui retourne la mention selon la note
# - >= 16 : "Très Bien"
# - >= 14 : "Bien"
# - >= 12 : "Assez Bien"
# - >= 10 : "Passable"
# - < 10 : "Ajourné"

def calculer_mention(note):
    """Retourne la mention selon la note (sur 20)."""
    # TODO: Implémenter la logique avec if/elif/else
    pass

# Tests
print("=== Exercice 1 : Calculateur de mention ===")
print(f"Note 17 : {calculer_mention(17)}")   # Attendu: "Très Bien"
print(f"Note 15 : {calculer_mention(15)}")   # Attendu: "Bien"
print(f"Note 13 : {calculer_mention(13)}")   # Attendu: "Assez Bien"
print(f"Note 10 : {calculer_mention(10)}")   # Attendu: "Passable"
print(f"Note 8 : {calculer_mention(8)}")     # Attendu: "Ajourné"
print()


# Exercice 2 : Année bissextile
# ------------------------------
# TODO: Compléter la fonction qui vérifie si une année est bissextile
# Règles :
# - Divisible par 4 : bissextile
# - SAUF si divisible par 100 : pas bissextile
# - SAUF si divisible par 400 : bissextile

def est_bissextile(annee):
    """
    Vérifie si une année est bissextile.
    Retourne True si bissextile, False sinon.
    """
    # TODO: Implémenter la logique
    # Astuce: (divisible par 4 ET non divisible par 100) OU divisible par 400
    pass

# Tests
print("=== Exercice 2 : Année bissextile ===")
print(f"2024 bissextile ? {est_bissextile(2024)}")  # Attendu: True
print(f"2023 bissextile ? {est_bissextile(2023)}")  # Attendu: False
print(f"2100 bissextile ? {est_bissextile(2100)}")  # Attendu: False (divisible par 100)
print(f"2000 bissextile ? {est_bissextile(2000)}")  # Attendu: True (divisible par 400)
print()


# Exercice 3 : Catégorie d'âge
# -----------------------------
# TODO: Compléter la fonction qui retourne la catégorie d'âge
# - < 2 : "Bébé"
# - < 12 : "Enfant"
# - < 18 : "Adolescent"
# - < 65 : "Adulte"
# - >= 65 : "Senior"

def categorie_age(age):
    """Retourne la catégorie d'âge."""
    # TODO: Implémenter avec if/elif/else
    pass

# Tests
print("=== Exercice 3 : Catégorie d'âge ===")
print(f"Âge 1 : {categorie_age(1)}")     # Attendu: "Bébé"
print(f"Âge 8 : {categorie_age(8)}")     # Attendu: "Enfant"
print(f"Âge 15 : {categorie_age(15)}")   # Attendu: "Adolescent"
print(f"Âge 35 : {categorie_age(35)}")   # Attendu: "Adulte"
print(f"Âge 70 : {categorie_age(70)}")   # Attendu: "Senior"
print()


# Exercice 4 : Calculatrice simple
# ---------------------------------
# TODO: Compléter la fonction qui effectue une opération mathématique
# Opérations supportées : "+", "-", "*", "/"
# Gérer la division par zéro !

def calculer(a, operateur, b):
    """
    Effectue une opération mathématique.
    Retourne le résultat ou un message d'erreur.
    """
    # TODO: Implémenter les 4 opérations
    # TODO: Gérer le cas de la division par zéro
    # TODO: Gérer le cas d'un opérateur inconnu
    pass

# Tests
print("=== Exercice 4 : Calculatrice ===")
print(f"10 + 5 = {calculer(10, '+', 5)}")    # Attendu: 15
print(f"10 - 5 = {calculer(10, '-', 5)}")    # Attendu: 5
print(f"10 * 5 = {calculer(10, '*', 5)}")    # Attendu: 50
print(f"10 / 5 = {calculer(10, '/', 5)}")    # Attendu: 2.0
print(f"10 / 0 = {calculer(10, '/', 0)}")    # Attendu: message d'erreur
print(f"10 ^ 5 = {calculer(10, '^', 5)}")    # Attendu: message d'erreur (opérateur inconnu)
print()


# Exercice 5 : Opérateur ternaire
# --------------------------------
# TODO: Réécrivez ces conditions en utilisant l'opérateur ternaire

def exercice_ternaire():
    """Exemples de conversion vers l'opérateur ternaire."""
    
    # Exemple 1 : Pair ou impair
    nombre = 7
    # TODO: Convertir en ternaire
    # if nombre % 2 == 0:
    #     parite = "pair"
    # else:
    #     parite = "impair"
    parite = None  # TODO: Réécrivez en une ligne
    print(f"{nombre} est {parite}")
    
    # Exemple 2 : Maximum de deux nombres
    a, b = 15, 23
    # TODO: Convertir en ternaire
    maximum = None  # TODO: Réécrivez en une ligne
    print(f"Maximum de {a} et {b} : {maximum}")
    
    # Exemple 3 : Message singulier/pluriel
    articles = 1
    # TODO: Convertir en ternaire
    # "article" si 1, "articles" sinon
    mot = None  # TODO: Réécrivez en une ligne
    print(f"Vous avez {articles} {mot}")

print("=== Exercice 5 : Opérateur ternaire ===")
exercice_ternaire()
print()


# Exercice 6 : Validation de données
# ------------------------------------
# TODO: Compléter la fonction qui valide les données d'un utilisateur
# Critères :
# - Le nom doit avoir au moins 2 caractères
# - L'email doit contenir "@" et "."
# - L'âge doit être entre 0 et 150
# Retourner une liste des erreurs trouvées

def valider_utilisateur(nom, email, age):
    """
    Valide les données d'un utilisateur.
    Retourne une liste d'erreurs (vide si tout est valide).
    """
    erreurs = []
    
    # TODO: Vérifier le nom
    
    # TODO: Vérifier l'email
    
    # TODO: Vérifier l'âge
    
    return erreurs

# Tests
print("=== Exercice 6 : Validation de données ===")
print(f"Valide : {valider_utilisateur('Alice', 'alice@email.com', 25)}")  # []
print(f"Nom court : {valider_utilisateur('A', 'a@b.c', 25)}")  # ['Nom trop court']
print(f"Email invalide : {valider_utilisateur('Bob', 'bob-email', 30)}")  # ['Email invalide']
print(f"Âge invalide : {valider_utilisateur('Charlie', 'c@d.e', -5)}")  # ['Âge invalide']
print()


# Exercice 7 : Conditions imbriquées - Éligibilité au prêt
# ---------------------------------------------------------
# TODO: Compléter la fonction qui vérifie l'éligibilité à un prêt
# Critères :
# - Doit être majeur (>= 18 ans)
# - Si majeur, vérifier le revenu (>= 25000)
# - Si revenu OK, vérifier l'absence d'incidents bancaires
# Retourner un message explicatif

def verifier_eligibilite_pret(age, revenu, a_incidents):
    """
    Vérifie l'éligibilité à un prêt bancaire.
    Retourne un message explicatif.
    """
    # TODO: Implémenter avec des conditions imbriquées
    pass

# Tests
print("=== Exercice 7 : Éligibilité au prêt ===")
print(verifier_eligibilite_pret(25, 35000, False))  # Attendu: éligible
print(verifier_eligibilite_pret(17, 35000, False))  # Attendu: trop jeune
print(verifier_eligibilite_pret(25, 20000, False))  # Attendu: revenu insuffisant
print(verifier_eligibilite_pret(25, 35000, True))   # Attendu: incidents bancaires
print()


# =================================================
# Bonus : Match-Case (Python 3.10+)
# =================================================
# TODO: Compléter la fonction qui utilise match-case pour un menu

def menu_interactif(choix):
    """
    Traite le choix d'un menu interactif.
    Utilise match-case (Python 3.10+).
    """
    # TODO: Implémenter avec match-case
    # choix "1" ou "nouveau" : "Création d'un nouveau fichier"
    # choix "2" ou "ouvrir" : "Ouverture d'un fichier"
    # choix "3" ou "sauver" : "Sauvegarde du fichier"
    # choix "4" ou "quitter" : "Au revoir !"
    # autre : "Choix non valide"
    pass

print("=== Bonus : Match-Case ===")
print(f"Choix 1 : {menu_interactif('1')}")
print(f"Choix 'ouvrir' : {menu_interactif('ouvrir')}")
print(f"Choix 'quitter' : {menu_interactif('quitter')}")
print(f"Choix invalide : {menu_interactif('xyz')}")
