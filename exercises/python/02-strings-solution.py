# =================================================
# Module 2 : Chaînes de Caractères (Strings)
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Manipulation de base
# ----------------------------------
phrase = "python est génial"
resultat = phrase.title()
print(f"Résultat: {resultat}")
# Résultat: Python Est Génial


# Exercice 2 : Extraction d'email
# --------------------------------
email = "utilisateur@example.com"

parties = email.split("@")
nom_utilisateur = parties[0]
domaine = parties[1]

print(f"Utilisateur: {nom_utilisateur}")
print(f"Domaine: {domaine}")
# Utilisateur: utilisateur
# Domaine: example.com


# Exercice 3 : Formatage avec f-strings
# --------------------------------------
nom = "Jean Dupont"
poste = "Développeur Python"
entreprise = "TechCorp"
telephone = "0612345678"

# Formater le téléphone
tel_formate = f"{telephone[:2]} {telephone[2:4]} {telephone[4:6]} {telephone[6:8]} {telephone[8:]}"

print("================================")
print(f"Nom: {nom}")
print(f"Poste: {poste}")
print(f"Entreprise: {entreprise}")
print(f"Tél: {tel_formate}")
print("================================")


# Exercice 4 : Slicing
# ---------------------
texte = "Programmation Python"

python = texte[-6:]        # "Python"
inverse = texte[::-1]      # "nohtyP noitammargorP"
un_sur_deux = texte[::2]   # "Pormaio yhn"

print(f"Python: {python}")
print(f"Inversé: {inverse}")
print(f"Un sur deux: {un_sur_deux}")


# Exercice 5 : Nettoyage de données
# ----------------------------------
donnees_sales = "   JEAN-PIERRE   MARTIN   "

nom_propre = donnees_sales.strip().title()

print(f"Nom nettoyé: '{nom_propre}'")
# Résultat: 'Jean-Pierre   Martin'

# Alternative avec remplacement des espaces multiples
import re
nom_propre_v2 = re.sub(r'\s+', ' ', donnees_sales.strip().title())
print(f"Nom nettoyé v2: '{nom_propre_v2}'")
# Résultat: 'Jean-Pierre Martin'


# =================================================
# Bonus : Validateur de mot de passe
# =================================================
mot_de_passe = "Python123"

longueur_ok = len(mot_de_passe) >= 8
contient_chiffre = any(c.isdigit() for c in mot_de_passe)

print(f"Longueur OK: {longueur_ok}")          # True
print(f"Contient chiffre: {contient_chiffre}") # True

# Version complète avec fonction
def valider_mot_de_passe(mdp):
    if len(mdp) < 8:
        return False, "Trop court (minimum 8 caractères)"
    if not any(c.isdigit() for c in mdp):
        return False, "Doit contenir au moins un chiffre"
    if not any(c.isupper() for c in mdp):
        return False, "Doit contenir au moins une majuscule"
    return True, "Mot de passe valide !"

valide, message = valider_mot_de_passe(mot_de_passe)
print(f"\n{message}")
