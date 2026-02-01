# =================================================
# Module 8 : Conditions (if/elif/else)
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Calculateur de mention
# ------------------------------------
def calculer_mention(note):
    """Retourne la mention selon la note (sur 20)."""
    if note >= 16:
        return "Très Bien"
    elif note >= 14:
        return "Bien"
    elif note >= 12:
        return "Assez Bien"
    elif note >= 10:
        return "Passable"
    else:
        return "Ajourné"

# Tests
print("=== Exercice 1 : Calculateur de mention ===")
print(f"Note 17 : {calculer_mention(17)}")   # "Très Bien"
print(f"Note 15 : {calculer_mention(15)}")   # "Bien"
print(f"Note 13 : {calculer_mention(13)}")   # "Assez Bien"
print(f"Note 10 : {calculer_mention(10)}")   # "Passable"
print(f"Note 8 : {calculer_mention(8)}")     # "Ajourné"
print()


# Exercice 2 : Année bissextile
# ------------------------------
def est_bissextile(annee):
    """
    Vérifie si une année est bissextile.
    Retourne True si bissextile, False sinon.
    
    Règles :
    - Divisible par 4 : bissextile
    - SAUF si divisible par 100 : pas bissextile
    - SAUF si divisible par 400 : bissextile
    """
    # Formule : (div par 4 ET non div par 100) OU div par 400
    return (annee % 4 == 0 and annee % 100 != 0) or (annee % 400 == 0)

# Tests
print("=== Exercice 2 : Année bissextile ===")
print(f"2024 bissextile ? {est_bissextile(2024)}")  # True
print(f"2023 bissextile ? {est_bissextile(2023)}")  # False
print(f"2100 bissextile ? {est_bissextile(2100)}")  # False
print(f"2000 bissextile ? {est_bissextile(2000)}")  # True
print()


# Exercice 3 : Catégorie d'âge
# -----------------------------
def categorie_age(age):
    """Retourne la catégorie d'âge."""
    if age < 2:
        return "Bébé"
    elif age < 12:
        return "Enfant"
    elif age < 18:
        return "Adolescent"
    elif age < 65:
        return "Adulte"
    else:
        return "Senior"

# Tests
print("=== Exercice 3 : Catégorie d'âge ===")
print(f"Âge 1 : {categorie_age(1)}")     # "Bébé"
print(f"Âge 8 : {categorie_age(8)}")     # "Enfant"
print(f"Âge 15 : {categorie_age(15)}")   # "Adolescent"
print(f"Âge 35 : {categorie_age(35)}")   # "Adulte"
print(f"Âge 70 : {categorie_age(70)}")   # "Senior"
print()


# Exercice 4 : Calculatrice simple
# ---------------------------------
def calculer(a, operateur, b):
    """
    Effectue une opération mathématique.
    Retourne le résultat ou un message d'erreur.
    """
    if operateur == "+":
        return a + b
    elif operateur == "-":
        return a - b
    elif operateur == "*":
        return a * b
    elif operateur == "/":
        if b == 0:
            return "Erreur : division par zéro"
        return a / b
    else:
        return f"Erreur : opérateur '{operateur}' non reconnu"

# Tests
print("=== Exercice 4 : Calculatrice ===")
print(f"10 + 5 = {calculer(10, '+', 5)}")    # 15
print(f"10 - 5 = {calculer(10, '-', 5)}")    # 5
print(f"10 * 5 = {calculer(10, '*', 5)}")    # 50
print(f"10 / 5 = {calculer(10, '/', 5)}")    # 2.0
print(f"10 / 0 = {calculer(10, '/', 0)}")    # Erreur
print(f"10 ^ 5 = {calculer(10, '^', 5)}")    # Erreur
print()


# Exercice 5 : Opérateur ternaire
# --------------------------------
def exercice_ternaire():
    """Exemples de conversion vers l'opérateur ternaire."""
    
    # Exemple 1 : Pair ou impair
    nombre = 7
    parite = "pair" if nombre % 2 == 0 else "impair"
    print(f"{nombre} est {parite}")  # "7 est impair"
    
    # Exemple 2 : Maximum de deux nombres
    a, b = 15, 23
    maximum = a if a > b else b
    print(f"Maximum de {a} et {b} : {maximum}")  # 23
    
    # Exemple 3 : Message singulier/pluriel
    articles = 1
    mot = "article" if articles == 1 else "articles"
    print(f"Vous avez {articles} {mot}")  # "1 article"

print("=== Exercice 5 : Opérateur ternaire ===")
exercice_ternaire()
print()


# Exercice 6 : Validation de données
# ------------------------------------
def valider_utilisateur(nom, email, age):
    """
    Valide les données d'un utilisateur.
    Retourne une liste d'erreurs (vide si tout est valide).
    """
    erreurs = []
    
    # Vérifier le nom (au moins 2 caractères)
    if len(nom) < 2:
        erreurs.append("Nom trop court")
    
    # Vérifier l'email (doit contenir @ et .)
    if "@" not in email or "." not in email:
        erreurs.append("Email invalide")
    
    # Vérifier l'âge (entre 0 et 150)
    if age < 0 or age > 150:
        erreurs.append("Âge invalide")
    
    return erreurs

# Tests
print("=== Exercice 6 : Validation de données ===")
print(f"Valide : {valider_utilisateur('Alice', 'alice@email.com', 25)}")
print(f"Nom court : {valider_utilisateur('A', 'a@b.c', 25)}")
print(f"Email invalide : {valider_utilisateur('Bob', 'bob-email', 30)}")
print(f"Âge invalide : {valider_utilisateur('Charlie', 'c@d.e', -5)}")
print()


# Exercice 7 : Conditions imbriquées - Éligibilité au prêt
# ---------------------------------------------------------
def verifier_eligibilite_pret(age, revenu, a_incidents):
    """
    Vérifie l'éligibilité à un prêt bancaire.
    Retourne un message explicatif.
    """
    # Vérification par étapes avec conditions imbriquées
    if age < 18:
        return "Refusé : vous devez être majeur (>= 18 ans)"
    else:
        if revenu < 25000:
            return "Refusé : revenu insuffisant (minimum 25000€)"
        else:
            if a_incidents:
                return "Refusé : incidents bancaires détectés"
            else:
                return "Félicitations ! Vous êtes éligible au prêt"

# Version alternative plus lisible avec early return
def verifier_eligibilite_pret_v2(age, revenu, a_incidents):
    """Version avec early return (plus lisible)."""
    if age < 18:
        return "Refusé : vous devez être majeur (>= 18 ans)"
    if revenu < 25000:
        return "Refusé : revenu insuffisant (minimum 25000€)"
    if a_incidents:
        return "Refusé : incidents bancaires détectés"
    return "Félicitations ! Vous êtes éligible au prêt"

# Tests
print("=== Exercice 7 : Éligibilité au prêt ===")
print(verifier_eligibilite_pret(25, 35000, False))  # Éligible
print(verifier_eligibilite_pret(17, 35000, False))  # Trop jeune
print(verifier_eligibilite_pret(25, 20000, False))  # Revenu insuffisant
print(verifier_eligibilite_pret(25, 35000, True))   # Incidents
print()


# =================================================
# Bonus : Match-Case (Python 3.10+)
# =================================================
def menu_interactif(choix):
    """
    Traite le choix d'un menu interactif.
    Utilise match-case (Python 3.10+).
    """
    match choix:
        case "1" | "nouveau":
            return "Création d'un nouveau fichier"
        case "2" | "ouvrir":
            return "Ouverture d'un fichier"
        case "3" | "sauver":
            return "Sauvegarde du fichier"
        case "4" | "quitter":
            return "Au revoir !"
        case _:
            return "Choix non valide"

print("=== Bonus : Match-Case ===")
print(f"Choix 1 : {menu_interactif('1')}")
print(f"Choix 'ouvrir' : {menu_interactif('ouvrir')}")
print(f"Choix 'quitter' : {menu_interactif('quitter')}")
print(f"Choix invalide : {menu_interactif('xyz')}")
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. STRUCTURE if SIMPLE
   if condition:
       # bloc si vrai

2. STRUCTURE if/else
   if condition:
       # bloc si vrai
   else:
       # bloc si faux

3. STRUCTURE if/elif/else
   if condition1:
       # bloc 1
   elif condition2:
       # bloc 2
   else:
       # bloc par défaut

4. OPÉRATEUR TERNAIRE
   valeur = vrai_si_true if condition else vrai_si_false

5. MATCH-CASE (Python 3.10+)
   match variable:
       case valeur1:
           # action 1
       case valeur2 | valeur3:
           # action 2-3
       case _:
           # défaut

6. BONNES PRATIQUES
   - Garder les conditions simples
   - Utiliser des variables intermédiaires
   - Éviter 'if x == True', préférer 'if x'
   - Utiliser early return pour réduire l'imbrication
""")
