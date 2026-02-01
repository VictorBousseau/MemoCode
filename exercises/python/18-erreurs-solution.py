# =================================================
# Module 18 : Gestion des Erreurs
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Conversion sécurisée
# -------------------------------------
def convertir_en_nombre(valeur):
    """Convertit une valeur en int ou float. Retourne None si impossible."""
    try:
        return int(valeur)
    except (ValueError, TypeError):
        try:
            return float(valeur)
        except (ValueError, TypeError):
            return None


def diviser_securise(a, b):
    """Divise a par b de manière sécurisée. Retourne (résultat, erreur)."""
    try:
        resultat = a / b
        return (resultat, None)
    except ZeroDivisionError:
        return (None, "Division par zéro")
    except TypeError:
        return (None, "Types invalides")


def saisie_nombre(valeur, min_val=None, max_val=None):
    """Valide une saisie numérique avec bornes optionnelles."""
    nombre = convertir_en_nombre(valeur)
    if nombre is None:
        return None
    if min_val is not None and nombre < min_val:
        return None
    if max_val is not None and nombre > max_val:
        return None
    return nombre

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
import json

def lire_fichier(chemin, encodage="utf-8"):
    """Lit le contenu d'un fichier texte. Retourne (contenu, erreur)."""
    try:
        with open(chemin, "r", encoding=encodage) as f:
            contenu = f.read()
        return (contenu, None)
    except FileNotFoundError:
        return (None, f"Fichier '{chemin}' introuvable")
    except PermissionError:
        return (None, f"Permission refusée pour '{chemin}'")
    except UnicodeDecodeError:
        return (None, f"Erreur d'encodage pour '{chemin}' (essayez un autre encodage)")


def charger_config(chemin, defaut=None):
    """Charge un fichier JSON. Retourne les valeurs par défaut si erreur."""
    if defaut is None:
        defaut = {}
    try:
        with open(chemin, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"⚠️ '{chemin}' non trouvé, utilisation des valeurs par défaut")
        return defaut
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON invalide dans '{chemin}': {e}")
        return defaut
    except PermissionError:
        print(f"⚠️ Permission refusée pour '{chemin}'")
        return defaut


def lire_csv_simple(chemin, separateur=","):
    """Lit un fichier CSV simple et retourne une liste de dicts."""
    try:
        with open(chemin, "r", encoding="utf-8") as f:
            lignes = f.readlines()

        if len(lignes) < 2:
            return ([], "Fichier vide ou sans données")

        en_tetes = lignes[0].strip().split(separateur)
        donnees = []

        for i, ligne in enumerate(lignes[1:], 2):
            valeurs = ligne.strip().split(separateur)
            if len(valeurs) != len(en_tetes):
                print(f"⚠️ Ligne {i} ignorée (mauvais nombre de colonnes)")
                continue
            donnees.append(dict(zip(en_tetes, valeurs)))

        return (donnees, None)

    except FileNotFoundError:
        return ([], f"Fichier '{chemin}' introuvable")
    except Exception as e:
        return ([], f"Erreur inattendue : {e}")

# Tests
print("=== Exercice 2 : Lecture de fichiers ===")
contenu, erreur = lire_fichier("fichier_inexistant.txt")
print(f"Fichier inexistant → erreur: {erreur}")

config = charger_config("config_inexistant.json", {"debug": False, "version": "1.0"})
print(f"Config par défaut : {config}")
print()


# Exercice 3 : Exceptions personnalisées
# ------------------------------------------
class ValidationError(Exception):
    """Classe de base pour les erreurs de validation."""

    def __init__(self, champ, valeur, message):
        self.champ = champ
        self.valeur = valeur
        super().__init__(f"[{champ}] Valeur '{valeur}' invalide : {message}")


class NoteInvalideError(ValidationError):
    """Levée quand une note est invalide."""

    def __init__(self, note, message):
        super().__init__("note", note, message)


class EmailInvalideError(ValidationError):
    """Levée quand un email est invalide."""

    def __init__(self, email, message):
        super().__init__("email", email, message)


class AgeInvalideError(ValidationError):
    """Levée quand un âge est invalide."""

    def __init__(self, age, message):
        super().__init__("age", age, message)


def valider_note(note):
    """Valide une note (entre 0 et 20, nombre)."""
    if not isinstance(note, (int, float)):
        raise NoteInvalideError(note, "doit être un nombre")
    if note < 0:
        raise NoteInvalideError(note, "doit être >= 0")
    if note > 20:
        raise NoteInvalideError(note, "doit être <= 20")


def valider_email(email):
    """Valide un email (doit contenir @ et .)."""
    if not isinstance(email, str) or not email.strip():
        raise EmailInvalideError(email, "doit être une chaîne non vide")
    if "@" not in email:
        raise EmailInvalideError(email, "doit contenir @")
    if "." not in email.split("@")[-1]:
        raise EmailInvalideError(email, "doit contenir un domaine valide (avec .)")


def valider_age(age):
    """Valide un âge (entier entre 0 et 150)."""
    if not isinstance(age, int):
        raise AgeInvalideError(age, "doit être un entier")
    if age < 0:
        raise AgeInvalideError(age, "doit être positif")
    if age > 150:
        raise AgeInvalideError(age, "ne peut pas dépasser 150")


def creer_etudiant(nom, age, email, notes):
    """Crée un profil étudiant avec validation complète."""
    valider_age(age)
    valider_email(email)

    notes_valides = []
    for note in notes:
        valider_note(note)
        notes_valides.append(note)

    moyenne = sum(notes_valides) / len(notes_valides) if notes_valides else 0

    return {
        "nom": nom,
        "age": age,
        "email": email,
        "notes": notes_valides,
        "moyenne": round(moyenne, 2),
    }

# Tests
print("=== Exercice 3 : Exceptions personnalisées ===")

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
class ConnexionSimulee:
    """Simule une connexion à une base de données."""

    def __init__(self, nom):
        self.nom = nom
        self._connectee = False
        self._requetes_executees = 0

    def connecter(self):
        """Ouvre la connexion."""
        self._connectee = True
        print(f"  🔌 Connexion à '{self.nom}' ouverte")

    def deconnecter(self):
        """Ferme la connexion."""
        self._connectee = False
        print(f"  🔒 Connexion à '{self.nom}' fermée ({self._requetes_executees} requêtes exécutées)")

    def executer(self, requete):
        """Exécute une requête SQL simulée."""
        if not self._connectee:
            raise RuntimeError("Non connecté à la base de données")
        if "DROP" in requete.upper():
            raise ValueError(f"Requête dangereuse bloquée : {requete}")
        self._requetes_executees += 1
        return f"OK ({self._requetes_executees} lignes affectées)"

    def est_connectee(self):
        """Retourne True si la connexion est active."""
        return self._connectee


def executer_requetes(connexion, requetes):
    """Exécute une liste de requêtes avec gestion des erreurs."""
    resultats = {"reussies": [], "echouees": []}

    try:
        connexion.connecter()

        for requete in requetes:
            try:
                resultat = connexion.executer(requete)
                resultats["reussies"].append({"requete": requete, "resultat": resultat})
            except (ValueError, RuntimeError) as e:
                resultats["echouees"].append({"requete": requete, "erreur": str(e)})

    except Exception as e:
        print(f"  ❌ Erreur fatale : {e}")

    finally:
        connexion.deconnecter()

    return resultats

# Tests
print("=== Exercice 4 : Gestionnaire de connexion ===")
conn = ConnexionSimulee("TestDB")

requetes = [
    "SELECT * FROM users",
    "INSERT INTO users VALUES ('Alice', 25)",
    "DROP TABLE users",
    "SELECT COUNT(*) FROM users",
    "UPDATE users SET age = 26",
]

resultats = executer_requetes(conn, requetes)
print(f"\nRéussies : {len(resultats['reussies'])}")
print(f"Échouées : {len(resultats['echouees'])}")
for echec in resultats['echouees']:
    print(f"  ❌ '{echec['requete']}' → {echec['erreur']}")
print(f"Connexion active ? {conn.est_connectee()}")  # False
print()


# Exercice 5 : EAFP vs LBYL
# -----------------------------
def obtenir_valeur_lbyl(dictionnaire, cle, sous_cle=None):
    """Style LBYL — Vérifie d'abord."""
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
    """Style EAFP — Essaie d'abord."""
    try:
        if sous_cle is not None:
            return dictionnaire[cle][sous_cle]
        return dictionnaire[cle]
    except (KeyError, TypeError):
        return None


def acceder_liste_lbyl(liste, index):
    """Style LBYL : vérifie l'index avant d'accéder."""
    if isinstance(liste, list) and isinstance(index, int):
        if -len(liste) <= index < len(liste):
            return liste[index]
    return None


def acceder_liste_eafp(liste, index):
    """Style EAFP : essaie d'accéder directement."""
    try:
        return liste[index]
    except (IndexError, TypeError):
        return None

# Tests
print("=== Exercice 5 : EAFP vs LBYL ===")
config = {
    "database": {"host": "localhost", "port": 5432},
    "debug": True,
}

print("LBYL:")
print(f"  database.host = {obtenir_valeur_lbyl(config, 'database', 'host')}")
print(f"  database.user = {obtenir_valeur_lbyl(config, 'database', 'user')}")
print(f"  debug = {obtenir_valeur_lbyl(config, 'debug')}")
print(f"  missing = {obtenir_valeur_lbyl(config, 'missing')}")

print("EAFP:")
print(f"  database.host = {obtenir_valeur_eafp(config, 'database', 'host')}")
print(f"  database.user = {obtenir_valeur_eafp(config, 'database', 'user')}")
print(f"  debug = {obtenir_valeur_eafp(config, 'debug')}")
print(f"  missing = {obtenir_valeur_eafp(config, 'missing')}")

ma_liste = [10, 20, 30]
print(f"\nLBYL: liste[1] = {acceder_liste_lbyl(ma_liste, 1)}")
print(f"LBYL: liste[10] = {acceder_liste_lbyl(ma_liste, 10)}")
print(f"EAFP: liste[1] = {acceder_liste_eafp(ma_liste, 1)}")
print(f"EAFP: liste[10] = {acceder_liste_eafp(ma_liste, 10)}")
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. TRY / EXCEPT
   try:
       code_risque()
   except TypeError as e:
       gerer_erreur(e)

2. ELSE ET FINALLY
   else    → exécuté si PAS d'exception
   finally → TOUJOURS exécuté (nettoyage)

3. RAISE
   raise ValueError("message")  → Lever une exception
   raise                        → Re-lever l'exception courante

4. EXCEPTIONS PERSONNALISÉES
   class MonError(Exception):
       def __init__(self, ...):
           super().__init__(message)

5. HIÉRARCHIE D'EXCEPTIONS
   AppError (base)
   ├── ValidationError
   │   ├── NoteInvalideError
   │   └── EmailInvalideError
   └── ...

6. EAFP vs LBYL
   LBYL : if key in dict: dict[key]     → Non Pythonique
   EAFP : try: dict[key] except KeyError → ✅ Pythonique

7. BONNES PRATIQUES
   ✅ Capturer des exceptions spécifiques
   ✅ Garder le try le plus court possible
   ✅ Utiliser else pour le code de succès
   ✅ Utiliser finally pour le nettoyage
   ❌ except: pass (avale les erreurs)
   ❌ except Exception (trop large)
""")
