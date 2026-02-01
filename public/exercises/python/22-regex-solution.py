# =================================================
# Module 22 : Expressions Régulières (Regex)
# SOLUTION - Fichier corrigé
# =================================================

import re

# Exercice 1 : Patterns de base
# ---------------------------------
def trouver_nombres(texte):
    """Trouve tous les nombres entiers dans un texte."""
    return re.findall(r"\d+", texte)


def trouver_mots_majuscules(texte):
    """Trouve tous les mots entièrement en majuscules (2+ lettres)."""
    return re.findall(r"\b[A-Z]{2,}\b", texte)


def commence_par_voyelle(mots):
    """Filtre les mots qui commencent par une voyelle."""
    return [mot for mot in mots if re.match(r"[aeiou]", mot, re.IGNORECASE)]


# Tests
print("=== Exercice 1 : Patterns de base ===")
print(f"Nombres : {trouver_nombres('J ai 3 chats, 12 poissons et 1 chien')}")
print(f"Majuscules : {trouver_mots_majuscules('Le HTML et le CSS sont SUPER utiles')}")
print(f"Voyelles : {commence_par_voyelle(['alice', 'Bob', 'Eve', 'oscar', 'Tom'])}")
print()


# Exercice 2 : Groupes de capture
# -----------------------------------
def extraire_emails(texte):
    """Extrait les emails en tuples (utilisateur, domaine)."""
    return re.findall(r"([\w.+-]+)@([\w.-]+\.\w+)", texte)


def extraire_dates(texte):
    """Extrait les dates JJ/MM/AAAA en tuples (jour, mois, année)."""
    return re.findall(r"(\d{2})/(\d{2})/(\d{4})", texte)


def parser_url(url):
    """Parse une URL et retourne ses composants."""
    match = re.match(
        r"(?P<protocole>https?)://(?P<domaine>[\w.-]+)(?P<chemin>/\S*)?",
        url
    )
    if match:
        return {
            "protocole": match.group("protocole"),
            "domaine": match.group("domaine"),
            "chemin": match.group("chemin") or "/",
        }
    return None


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
def censurer_emails(texte):
    """Remplace les emails par [EMAIL MASQUÉ]."""
    return re.sub(r"[\w.+-]+@[\w.-]+\.\w+", "[EMAIL MASQUÉ]", texte)


def formater_numeros(texte):
    """Reformate les numéros de téléphone français en XX.XX.XX.XX.XX."""
    def reformater(match):
        chiffres = re.sub(r"\s", "", match.group(0))
        return ".".join(chiffres[i:i+2] for i in range(0, 10, 2))

    return re.sub(r"0[1-9](?:\s?\d{2}){4}", reformater, texte)


def convertir_markdown_gras(texte):
    """Convertit **texte** en <b>texte</b>."""
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", texte)


# Tests
print("=== Exercice 3 : Recherche et remplacement ===")
print(censurer_emails("Contactez alice@mail.com ou bob@test.fr"))
print(formater_numeros("Appelez le 0612345678 ou le 06 12 34 56 78"))
print(convertir_markdown_gras("C'est **très** important et **urgent**"))
print()


# Exercice 4 : Validation
# ---------------------------
def valider_mot_de_passe(mdp):
    """Valide un mot de passe selon plusieurs règles."""
    if len(mdp) < 8:
        return (False, "Au moins 8 caractères")
    if not re.search(r"[A-Z]", mdp):
        return (False, "Au moins une majuscule")
    if not re.search(r"[a-z]", mdp):
        return (False, "Au moins une minuscule")
    if not re.search(r"\d", mdp):
        return (False, "Au moins un chiffre")
    if not re.search(r"[!@#$%^&*]", mdp):
        return (False, "Au moins un caractère spécial (!@#$%^&*)")
    return (True, "Mot de passe valide")


def valider_code_postal(code):
    """Valide un code postal français."""
    return bool(re.fullmatch(r"(0[1-9]|[1-8]\d|9[0-5]|97[1-6]|98[4-9])\d{3}", code))


def valider_plaque(plaque):
    """Valide une plaque d'immatriculation française (AA-123-AA)."""
    return bool(re.fullmatch(r"[A-Z]{2}-\d{3}-[A-Z]{2}", plaque))


# Tests
print("=== Exercice 4 : Validation ===")
mots_de_passe = ["Abc123!x", "abc", "ABCDEFGH", "abcdefgh1", "Abcdefg1"]
for mdp in mots_de_passe:
    valide, msg = valider_mot_de_passe(mdp)
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
def nettoyer_texte(texte):
    """Nettoie un texte brut avec plusieurs transformations regex."""
    # 1. Supprimer les balises HTML
    texte = re.sub(r"<[^>]+>", "", texte)

    # 2. Remplacer les URLs par [LIEN]
    texte = re.sub(r"https?://[\w./\-?&=#]+", "[LIEN]", texte)

    # 3. Remplacer les espaces multiples par un seul
    texte = re.sub(r"[ \t]+", " ", texte)

    # 4. Supprimer les espaces en début/fin de chaque ligne
    texte = re.sub(r"^ +| +$", "", texte, flags=re.MULTILINE)

    # 5. Normaliser la ponctuation (espace avant !, ?, ;, :)
    texte = re.sub(r"\s+([!?;:])", r" \1", texte)

    # 6. Supprimer les lignes vides multiples
    texte = re.sub(r"\n{3,}", "\n\n", texte)

    return texte.strip()


# Tests
print("=== Exercice 5 : Nettoyeur de texte ===")
texte_brut = """
<h1>Bienvenue</h1>
<p>Visitez   https://www.example.com   pour plus d'infos  !</p>
<p>Ou contactez   alice@mail.com  .  Merci  !</p>
"""
resultat = nettoyer_texte(texte_brut)
print(f"Résultat :\n{resultat}")
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print(r"""
1. FONCTIONS PRINCIPALES
   re.search(pattern, text)     → Premier match (ou None)
   re.match(pattern, text)      → Match au début seulement
   re.fullmatch(pattern, text)  → Match complet
   re.findall(pattern, text)    → Liste de tous les matches
   re.sub(pattern, repl, text)  → Remplacement

2. MÉTACARACTÈRES
   .     → N'importe quel caractère
   \d    → Chiffre [0-9]
   \w    → Alphanumérique [a-zA-Z0-9_]
   \s    → Espace blanc
   \b    → Frontière de mot

3. QUANTIFICATEURS
   *     → 0 ou plus
   +     → 1 ou plus
   ?     → 0 ou 1
   {n}   → Exactement n
   {n,m} → Entre n et m

4. GROUPES
   (abc)         → Groupe de capture
   (?P<nom>abc)  → Groupe nommé
   (?:abc)       → Groupe non capturant
   \1            → Référence arrière

5. FLAGS
   re.IGNORECASE (re.I)  → Insensible à la casse
   re.MULTILINE (re.M)   → ^ et $ sur chaque ligne
   re.DOTALL (re.S)      → . matche aussi \n

6. BONNES PRATIQUES
   ✅ Utiliser les raw strings r"..."
   ✅ Tester sur regex101.com
   ✅ Préférer les patterns spécifiques
   ✅ Compiler avec re.compile() si utilisé souvent
   ❌ Éviter le backtracking catastrophique
""")
