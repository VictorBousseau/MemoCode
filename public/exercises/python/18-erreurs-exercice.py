# =================================================
# Module 18 : Gestion des Erreurs
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Conversion sécurisée
# -------------------------------------
# TODO: Créer des fonctions de conversion robustes

def convertir_en_nombre(valeur):
    """
    Convertit une valeur en nombre (int ou float).
    Retourne None si la conversion est impossible.

    Exemples:
        convertir_en_nombre("42")    → 42 (int)
        convertir_en_nombre("3.14")  → 3.14 (float)
        convertir_en_nombre("hello") → None
        convertir_en_nombre("")      → None
    """
    # TODO: Essayer int() d'abord, puis float(), retourner None si les deux échouent
    pass


def diviser_securise(a, b):
    """
    Divise a par b de manière sécurisée.
    Retourne un tuple (résultat, erreur).

    Exemples:
        diviser_securise(10, 3)   → (3.333..., None)
        diviser_securise(10, 0)   → (None, "Division par zéro")
        diviser_securise("a", 2)  → (None, "Types invalides")
    """
    # TODO: Gérer ZeroDivisionError et TypeError
    pass


def saisie_nombre(message, min_val=None, max_val=None):
    """
    Simule une saisie utilisateur avec validation.
    (Au lieu de input(), on passe la valeur comme paramètre pour les tests)

    Args:
        message (str): Message à afficher (non utilisé dans les tests)
        min_val (float): Valeur minimale autorisée (None = pas de minimum)
        max_val (float): Valeur maximale autorisée (None = pas de maximum)

    Returns:
        float ou None: Le nombre validé, ou None si invalide
    """
    # TODO: Convertir, vérifier les bornes, retourner le nombre ou None
    pass

# Tests
print("=== Exercice 1 : Conversion sécurisée ===")
print(f"'42' → {convertir_en_nombre('42')}")        # 42
print(f"'3.14' → {convertir_en_nombre('3.14')}")    # 3.14
print(f"'hello' → {convertir_en_nombre('hello')}")  # None
print(f"'' → {convertir_en_nombre('')}")             # None

resultat, erreur = diviser_securise(10, 3)
print(f"\n10 / 3 = {resultat:.2f}")                  # 3.33
resultat, erreur = diviser_securise(10, 0)
print(f"10 / 0 → erreur: {erreur}")                  # Division par zéro
resultat, erreur = diviser_securise("a", 2)
print(f"'a' / 2 → erreur: {erreur}")                 # Types invalides
print()


# Exercice 2 : Lecture sécurisée de fichier
# -------------------------------------------
# TODO: Créer des fonctions robustes pour lire des fichiers

import json

def lire_fichier(chemin, encodage="utf-8"):
    """
    Lit le contenu d'un fichier texte.
    Gère les erreurs: fichier absent, permission, encodage.

    Returns:
        tuple: (contenu, erreur)
        - Si succès: (contenu_str, None)
        - Si échec: (None, message_erreur)
    """
    # TODO: Gérer FileNotFoundError, PermissionError, UnicodeDecodeError
    pass


def charger_config(chemin, defaut=None):
    """
    Charge un fichier de configuration JSON.
    Retourne les valeurs par défaut si le fichier est absent ou invalide.

    Args:
        chemin (str): Chemin vers le fichier JSON
        defaut (dict): Valeurs par défaut (défaut: {})

    Returns:
        dict: Configuration chargée ou valeurs par défaut
    """
    # TODO: Gérer FileNotFoundError, json.JSONDecodeError, PermissionError
    pass


def lire_csv_simple(chemin, separateur=","):
    """
    Lit un fichier CSV simple et retourne une liste de dictionnaires.
    La première ligne contient les en-têtes.

    Returns:
        tuple: (donnees, erreur)
        - Si succès: ([{col: val, ...}, ...], None)
        - Si échec: ([], message_erreur)
    """
    # TODO: Lire le fichier, parser les en-têtes et les lignes
    # TODO: Gérer les erreurs (fichier absent, format invalide)
    pass

# Tests
print("=== Exercice 2 : Lecture de fichiers ===")
contenu, erreur = lire_fichier("fichier_inexistant.txt")
print(f"Fichier inexistant → erreur: {erreur}")

config = charger_config("config_inexistant.json", {"debug": False, "version": "1.0"})
print(f"Config par défaut : {config}")
print()


# Exercice 3 : Exceptions personnalisées
# ------------------------------------------
# TODO: Créer un système de validation avec exceptions personnalisées

class ValidationError(Exception):
    """Classe de base pour les erreurs de validation."""

    def __init__(self, champ, valeur, message):
        self.champ = champ
        self.valeur = valeur
        # TODO: Appeler super().__init__() avec un message formaté
        pass


class NoteInvalideError(ValidationError):
    """
    Levée quand une note est invalide.

    Exemples:
        NoteInvalideError("math", -5, "doit être >= 0")
        NoteInvalideError("math", 25, "doit être <= 20")
    """
    # TODO: Hériter de ValidationError
    pass


class EmailInvalideError(ValidationError):
    """
    Levée quand un email est invalide.

    Exemples:
        EmailInvalideError("email", "abc", "doit contenir @")
    """
    # TODO: Hériter de ValidationError
    pass


class AgeInvalideError(ValidationError):
    """
    Levée quand un âge est invalide.

    Exemples:
        AgeInvalideError("age", -5, "doit être positif")
    """
    # TODO: Hériter de ValidationError
    pass


def valider_note(note):
    """
    Valide une note (entre 0 et 20, nombre).
    Lève NoteInvalideError si invalide.
    """
    # TODO: Vérifier le type et les bornes
    pass


def valider_email(email):
    """
    Valide un email (doit contenir @ et .).
    Lève EmailInvalideError si invalide.
    """
    # TODO: Vérifier le format minimal
    pass


def valider_age(age):
    """
    Valide un âge (entier entre 0 et 150).
    Lève AgeInvalideError si invalide.
    """
    # TODO: Vérifier le type et les bornes
    pass


def creer_etudiant(nom, age, email, notes):
    """
    Crée un profil étudiant avec validation complète.
    Retourne un dict ou lève une exception.

    Returns:
        dict: {"nom": str, "age": int, "email": str, "notes": list, "moyenne": float}
    """
    # TODO: Valider age, email, et chaque note
    # TODO: Calculer la moyenne
    pass

# Tests
print("=== Exercice 3 : Exceptions personnalisées ===")

# Test des validations individuelles
tests_notes = [15, "abc", -5, 25, 18]
for note in tests_notes:
    try:
        valider_note(note)
        print(f"  Note {note} : ✅ valide")
    except NoteInvalideError as e:
        print(f"  Note {note} : ❌ {e}")

tests_emails = ["alice@mail.com", "invalide", "", "bob@test.fr"]
for email in tests_emails:
    try:
        valider_email(email)
        print(f"  Email '{email}' : ✅ valide")
    except EmailInvalideError as e:
        print(f"  Email '{email}' : ❌ {e}")

# Test de création d'étudiant
print("\nCréation d'étudiants:")
try:
    etudiant = creer_etudiant("Alice", 20, "alice@mail.com", [15, 12, 18])
    print(f"  ✅ {etudiant}")
except ValidationError as e:
    print(f"  ❌ {e}")

try:
    etudiant = creer_etudiant("Bob", -5, "bob@mail.com", [15])
    print(f"  ✅ {etudiant}")
except ValidationError as e:
    print(f"  ❌ {e}")

try:
    etudiant = creer_etudiant("Charlie", 22, "invalide", [15])
    print(f"  ✅ {etudiant}")
except ValidationError as e:
    print(f"  ❌ {e}")
print()


# Exercice 4 : Gestionnaire de ressources
# -------------------------------------------
# TODO: Créer un gestionnaire de connexions simulé avec try/finally

class ConnexionSimulee:
    """
    Simule une connexion à une base de données.

    Méthodes:
        connecter() → None: Ouvre la connexion
        deconnecter() → None: Ferme la connexion
        executer(requete) → str: Exécute une requête (peut échouer)
        est_connectee() → bool: Vérifie si la connexion est active
    """

    def __init__(self, nom):
        self.nom = nom
        self._connectee = False
        self._requetes_executees = 0

    def connecter(self):
        """Ouvre la connexion."""
        # TODO: Mettre _connectee à True et afficher un message
        pass

    def deconnecter(self):
        """Ferme la connexion."""
        # TODO: Mettre _connectee à False et afficher un message avec le nombre de requêtes
        pass

    def executer(self, requete):
        """
        Exécute une requête SQL simulée.
        Lève RuntimeError si non connecté.
        Lève ValueError si la requête contient "DROP" (simulation d'erreur).
        """
        # TODO: Vérifier que la connexion est active
        # TODO: Simuler une erreur si "DROP" dans la requête
        # TODO: Incrémenter le compteur et retourner un résultat simulé
        pass

    def est_connectee(self):
        """Retourne True si la connexion est active."""
        # TODO
        pass


def executer_requetes(connexion, requetes):
    """
    Exécute une liste de requêtes avec gestion des erreurs.
    La connexion est TOUJOURS fermée à la fin (finally).

    Retourne un dict:
        {"reussies": [...], "echouees": [{"requete": str, "erreur": str}, ...]}
    """
    # TODO: Connecter, exécuter chaque requête avec try/except
    # TODO: Collecter les résultats (réussies et échouées)
    # TODO: TOUJOURS fermer la connexion dans finally
    pass

# Tests
print("=== Exercice 4 : Gestionnaire de connexion ===")
conn = ConnexionSimulee("TestDB")

requetes = [
    "SELECT * FROM users",
    "INSERT INTO users VALUES ('Alice', 25)",
    "DROP TABLE users",  # Devrait échouer
    "SELECT COUNT(*) FROM users",
    "UPDATE users SET age = 26",
]

resultats = executer_requetes(conn, requetes)
if resultats:
    print(f"\nRéussies : {len(resultats['reussies'])}")
    print(f"Échouées : {len(resultats['echouees'])}")
    for echec in resultats['echouees']:
        print(f"  ❌ '{echec['requete']}' → {echec['erreur']}")
    print(f"Connexion active ? {conn.est_connectee()}")  # False (fermée par finally)
print()


# Exercice 5 : EAFP vs LBYL
# -----------------------------
# TODO: Réécrire des fonctions du style LBYL vers EAFP

def obtenir_valeur_lbyl(dictionnaire, cle, sous_cle=None):
    """
    Style LBYL (Look Before You Leap) — Vérifie d'abord.
    Récupère une valeur dans un dictionnaire (potentiellement imbriqué).
    """
    if sous_cle is not None:
        if cle in dictionnaire:
            if isinstance(dictionnaire[cle], dict):
                if sous_cle in dictionnaire[cle]:
                    return dictionnaire[cle][sous_cle]
        return None
    else:
        if cle in dictionnaire:
            return dictionnaire[cle]
        return None


def obtenir_valeur_eafp(dictionnaire, cle, sous_cle=None):
    """
    Style EAFP (Easier to Ask Forgiveness) — Essaie d'abord.
    Même fonctionnalité, mais en style Pythonique.
    """
    # TODO: Utiliser try/except au lieu de vérifications multiples
    pass


def acceder_liste_lbyl(liste, index):
    """
    Style LBYL : vérifie l'index avant d'accéder.
    """
    if isinstance(liste, list) and isinstance(index, int):
        if -len(liste) <= index < len(liste):
            return liste[index]
    return None


def acceder_liste_eafp(liste, index):
    """
    Style EAFP : essaie d'accéder directement.
    """
    # TODO: Utiliser try/except
    pass

# Tests
print("=== Exercice 5 : EAFP vs LBYL ===")
config = {
    "database": {"host": "localhost", "port": 5432},
    "debug": True,
}

# Les deux approches doivent donner les mêmes résultats
print("LBYL:")
print(f"  database.host = {obtenir_valeur_lbyl(config, 'database', 'host')}")  # localhost
print(f"  database.user = {obtenir_valeur_lbyl(config, 'database', 'user')}")  # None
print(f"  debug = {obtenir_valeur_lbyl(config, 'debug')}")                     # True
print(f"  missing = {obtenir_valeur_lbyl(config, 'missing')}")                 # None

print("EAFP:")
print(f"  database.host = {obtenir_valeur_eafp(config, 'database', 'host')}")  # localhost
print(f"  database.user = {obtenir_valeur_eafp(config, 'database', 'user')}")  # None
print(f"  debug = {obtenir_valeur_eafp(config, 'debug')}")                     # True
print(f"  missing = {obtenir_valeur_eafp(config, 'missing')}")                 # None

ma_liste = [10, 20, 30]
print(f"\nLBYL: liste[1] = {acceder_liste_lbyl(ma_liste, 1)}")   # 20
print(f"LBYL: liste[10] = {acceder_liste_lbyl(ma_liste, 10)}")  # None
print(f"EAFP: liste[1] = {acceder_liste_eafp(ma_liste, 1)}")    # 20
print(f"EAFP: liste[10] = {acceder_liste_eafp(ma_liste, 10)}")  # None
print()
