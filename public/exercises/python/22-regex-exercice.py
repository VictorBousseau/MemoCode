# =================================================
# Module 22 : Expressions Régulières (Regex)
# Fichier d'exercice - À compléter
# =================================================

import re

# Exercice 1 : Patterns de base
# ---------------------------------
# TODO: Créer des fonctions de recherche avec des regex simples

def trouver_nombres(texte):
    """
    Trouve tous les nombres (entiers) dans un texte.

    Exemple:
        trouver_nombres("J'ai 3 chats et 12 poissons")
        → ["3", "12"]
    """
    # TODO: Utiliser re.findall() avec le pattern \\d+
    pass


def trouver_mots_majuscules(texte):
    """
    Trouve tous les mots entièrement en majuscules (2+ lettres).

    Exemple:
        trouver_mots_majuscules("Le HTML et le CSS sont SUPER")
        → ["HTML", "CSS", "SUPER"]
    """
    # TODO: Utiliser re.findall() avec [A-Z]{2,}
    pass


def commence_par_voyelle(mots):
    """
    Filtre les mots qui commencent par une voyelle (insensible à la casse).

    Exemple:
        commence_par_voyelle(["alice", "Bob", "Eve", "oscar", "Tom"])
        → ["alice", "Eve", "oscar"]
    """
    # TODO: Utiliser re.match() avec [aeiouAEIOU]
    pass


# Tests
print("=== Exercice 1 : Patterns de base ===")
print(f"Nombres : {trouver_nombres('J ai 3 chats, 12 poissons et 1 chien')}")
print(f"Majuscules : {trouver_mots_majuscules('Le HTML et le CSS sont SUPER utiles')}")
print(f"Voyelles : {commence_par_voyelle(['alice', 'Bob', 'Eve', 'oscar', 'Tom'])}")
print()


# Exercice 2 : Groupes de capture
# -----------------------------------
# TODO: Extraire des données structurées avec des groupes

def extraire_emails(texte):
    """
    Extrait toutes les adresses email d'un texte.
    Retourne une liste de tuples (utilisateur, domaine).

    Exemple:
        extraire_emails("Contact: alice@mail.com ou bob@test.fr")
        → [("alice", "mail.com"), ("bob", "test.fr")]
    """
    # TODO: Utiliser re.findall() avec des groupes (user)@(domain)
    pass


def extraire_dates(texte):
    """
    Extrait les dates au format JJ/MM/AAAA d'un texte.
    Retourne une liste de tuples (jour, mois, annee).

    Exemple:
        extraire_dates("Né le 15/03/1990, diplômé le 20/06/2015")
        → [("15", "03", "1990"), ("20", "06", "2015")]
    """
    # TODO: Utiliser re.findall() avec des groupes pour jour, mois, année
    pass


def parser_url(url):
    """
    Parse une URL et retourne ses composants.
    Retourne un dict: {"protocole", "domaine", "chemin"}

    Exemple:
        parser_url("https://www.example.com/page/index.html")
        → {"protocole": "https", "domaine": "www.example.com", "chemin": "/page/index.html"}
    """
    # TODO: Utiliser re.match() avec des groupes nommés (?P<nom>...)
    pass


# Tests
print("=== Exercice 2 : Groupes de capture ===")
texte_emails = "Envoyez à alice@mail.com ou bob.dupont@entreprise.fr pour info"
print(f"Emails : {extraire_emails(texte_emails)}")

texte_dates = "Né le 15/03/1990, marié le 20/06/2015, enfant le 01/12/2020"
print(f"Dates : {extraire_dates(texte_dates)}")

url = "https://www.example.com/page/index.html"
print(f"URL : {parser_url(url)}")
print()


# Exercice 3 : Recherche et remplacement
# ------------------------------------------
# TODO: Utiliser re.sub() pour transformer du texte

def censurer_emails(texte):
    """
    Remplace les adresses email par [EMAIL MASQUÉ].

    Exemple:
        censurer_emails("Contactez alice@mail.com")
        → "Contactez [EMAIL MASQUÉ]"
    """
    # TODO: Utiliser re.sub()
    pass


def formater_numeros(texte):
    """
    Reformate les numéros de téléphone français.
    Transforme "0612345678" ou "06 12 34 56 78" en "06.12.34.56.78".

    Exemple:
        formater_numeros("Appelez le 0612345678 ou le 06 12 34 56 78")
        → "Appelez le 06.12.34.56.78 ou le 06.12.34.56.78"
    """
    # TODO: Utiliser re.sub() avec une fonction de remplacement
    pass


def convertir_markdown_gras(texte):
    """
    Convertit le markdown gras **texte** en HTML <b>texte</b>.

    Exemple:
        convertir_markdown_gras("C'est **très** important")
        → "C'est <b>très</b> important"
    """
    # TODO: Utiliser re.sub() avec un groupe de capture
    pass


# Tests
print("=== Exercice 3 : Recherche et remplacement ===")
print(censurer_emails("Contactez alice@mail.com ou bob@test.fr"))
print(formater_numeros("Appelez le 0612345678 ou le 06 12 34 56 78"))
print(convertir_markdown_gras("C'est **très** important et **urgent**"))
print()


# Exercice 4 : Validation
# ---------------------------
# TODO: Créer des fonctions de validation avec regex

def valider_mot_de_passe(mdp):
    """
    Valide un mot de passe selon ces règles :
    - Au moins 8 caractères
    - Au moins une majuscule
    - Au moins une minuscule
    - Au moins un chiffre
    - Au moins un caractère spécial (!@#$%^&*)

    Retourne (bool, str) : (valide, message)

    Exemple:
        valider_mot_de_passe("Abc123!x")  → (True, "Mot de passe valide")
        valider_mot_de_passe("abc")       → (False, "Au moins 8 caractères")
    """
    # TODO: Vérifier chaque règle avec re.search()
    pass


def valider_code_postal(code):
    """
    Valide un code postal français (5 chiffres, commence par 01-95 ou 97-98).

    Exemple:
        valider_code_postal("75001")  → True
        valider_code_postal("00123")  → False
    """
    # TODO: Utiliser re.fullmatch()
    pass


def valider_plaque(plaque):
    """
    Valide une plaque d'immatriculation française (format AA-123-AA).

    Exemple:
        valider_plaque("AB-123-CD")  → True
        valider_plaque("123-AB-CD")  → False
    """
    # TODO: Utiliser re.fullmatch() avec le bon pattern
    pass


# Tests
print("=== Exercice 4 : Validation ===")
mots_de_passe = ["Abc123!x", "abc", "ABCDEFGH", "abcdefgh1", "Abcdefg1"]
for mdp in mots_de_passe:
    valide, msg = valider_mot_de_passe(mdp) if valider_mot_de_passe(mdp) else (None, "TODO")
    print(f"  '{mdp}' → {msg}")

codes = ["75001", "97400", "00123", "7500", "123456"]
for code in codes:
    print(f"  Code postal '{code}' : {valider_code_postal(code)}")

plaques = ["AB-123-CD", "AA-000-ZZ", "123-AB-CD", "AB-12-CD"]
for plaque in plaques:
    print(f"  Plaque '{plaque}' : {valider_plaque(plaque)}")
print()


# Exercice 5 : Cas pratique — Nettoyeur de texte
# --------------------------------------------------
# TODO: Créer un nettoyeur de texte complet

def nettoyer_texte(texte):
    """
    Nettoie un texte brut :
    1. Supprimer les balises HTML
    2. Remplacer les espaces multiples par un seul espace
    3. Supprimer les espaces en début/fin de ligne
    4. Remplacer les URLs par [LIEN]
    5. Normaliser la ponctuation (espace avant !, ?, ;, :)

    Retourne le texte nettoyé.

    Exemple:
        nettoyer_texte("<p>Visitez  https://example.com  !</p>")
        → "Visitez [LIEN] !"
    """
    # TODO: Appliquer les transformations dans l'ordre
    pass


# Tests
print("=== Exercice 5 : Nettoyeur de texte ===")
texte_brut = """
<h1>Bienvenue</h1>
<p>Visitez   https://www.example.com   pour plus d'infos  !</p>
<p>Ou contactez   alice@mail.com  .  Merci  !</p>
"""
resultat = nettoyer_texte(texte_brut)
if resultat is not None:
    print(f"Résultat :\n{resultat}")
else:
    print("TODO: Implémenter nettoyer_texte")
print()
