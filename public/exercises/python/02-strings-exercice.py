# =================================================
# Module 2 : Chaînes de Caractères (Strings)
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Manipulation de base
# ----------------------------------
# TODO: Transformer la phrase en "Python Est Génial"
phrase = "python est génial"

resultat = None  # TODO: Utiliser la bonne méthode de string
print(f"Résultat: {resultat}")


# Exercice 2 : Extraction d'email
# --------------------------------
# TODO: Extraire le nom d'utilisateur et le domaine de l'email
email = "utilisateur@example.com"

# TODO: Utiliser split() pour séparer à l'@
nom_utilisateur = None
domaine = None

print(f"Utilisateur: {nom_utilisateur}")
print(f"Domaine: {domaine}")


# Exercice 3 : Formatage avec f-strings
# --------------------------------------
# TODO: Créer une carte de visite formatée
nom = "Jean Dupont"
poste = "Développeur Python"
entreprise = "TechCorp"
telephone = "0612345678"

# TODO: Afficher une carte de visite bien formatée
# Format souhaité:
# ================================
# Nom: Jean Dupont
# Poste: Développeur Python
# Entreprise: TechCorp
# Tél: 06 12 34 56 78
# ================================

print("================================")
# TODO: Compléter l'affichage
print("================================")


# Exercice 4 : Slicing
# ---------------------
texte = "Programmation Python"

# TODO: Extraire "Python" (les 6 derniers caractères)
python = None

# TODO: Inverser le texte complet
inverse = None

# TODO: Extraire un caractère sur deux
un_sur_deux = None

print(f"Python: {python}")
print(f"Inversé: {inverse}")
print(f"Un sur deux: {un_sur_deux}")


# Exercice 5 : Nettoyage de données
# ----------------------------------
# TODO: Nettoyer et normaliser ces données
donnees_sales = "   JEAN-PIERRE   MARTIN   "

# TODO: Enlever les espaces au début/fin
# TODO: Mettre en format Titre (première lettre majuscule)
nom_propre = None

print(f"Nom nettoyé: '{nom_propre}'")


# =================================================
# Bonus : Validateur de mot de passe
# =================================================
# TODO: Vérifier si un mot de passe est valide
# Critères:
#   - Au moins 8 caractères
#   - Contient au moins un chiffre

mot_de_passe = "Python123"

# TODO: Compléter les vérifications
longueur_ok = None  # len() >= 8
contient_chiffre = None  # any(c.isdigit() for c in mot_de_passe)

print(f"Longueur OK: {longueur_ok}")
print(f"Contient chiffre: {contient_chiffre}")
