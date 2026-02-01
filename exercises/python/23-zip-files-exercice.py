# =================================================
# Module 23 : Fichiers ZIP
# Fichier d'exercice - À compléter
# =================================================

import zipfile
import os
import io

# Exercice 1 : Lire un fichier ZIP
# ------------------------------------
# TODO: Explorer le contenu d'un ZIP

def lister_contenu_zip(chemin_zip):
    """
    Liste le contenu d'un fichier ZIP avec les infos de chaque fichier.
    Retourne une liste de dicts avec les clés :
    - "nom": nom du fichier
    - "taille": taille originale en octets
    - "compresse": taille compressée en octets

    Exemple:
        lister_contenu_zip("archive.zip")
        → [{"nom": "fichier.txt", "taille": 1024, "compresse": 512}, ...]
    """
    # TODO: Utiliser ZipFile et infolist()
    pass


def lire_fichier_dans_zip(chemin_zip, nom_fichier, encodage="utf-8"):
    """
    Lit le contenu d'un fichier texte à l'intérieur d'un ZIP
    sans l'extraire sur le disque.

    Retourne (contenu, erreur).

    Exemple:
        lire_fichier_dans_zip("archive.zip", "notes.txt")
        → ("Contenu du fichier", None)
    """
    # TODO: Utiliser zf.read() et décoder
    # TODO: Gérer KeyError (fichier absent) et zipfile.BadZipFile
    pass


# Créer un ZIP de test pour les exercices
def creer_zip_test():
    """Crée un fichier ZIP de test avec plusieurs fichiers."""
    with zipfile.ZipFile("test_exercice.zip", "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("readme.txt", "Ceci est un fichier README de test.")
        zf.writestr("data/config.json", '{"version": "1.0", "debug": false}')
        zf.writestr("data/notes.txt", "Note 1: Python\nNote 2: ZIP\nNote 3: Modules")
        zf.writestr("src/main.py", "print('Hello World')")
        zf.writestr("src/utils.py", "def helper():\n    pass")

creer_zip_test()

# Tests
print("=== Exercice 1 : Lire un fichier ZIP ===")
contenu = lister_contenu_zip("test_exercice.zip")
if contenu is not None:
    for fichier in contenu:
        print(f"  {fichier['nom']} ({fichier['taille']} octets)")
else:
    print("TODO: Implémenter lister_contenu_zip")

texte, erreur = lire_fichier_dans_zip("test_exercice.zip", "readme.txt") or (None, "TODO")
if texte is not None:
    print(f"\nContenu de readme.txt : {texte}")
else:
    print(f"\nErreur : {erreur}")

_, erreur = lire_fichier_dans_zip("test_exercice.zip", "inexistant.txt") or (None, "TODO")
print(f"Fichier absent : {erreur}")
print()


# Exercice 2 : Créer un fichier ZIP
# --------------------------------------
# TODO: Créer des archives ZIP avec différentes options

def creer_archive_textes(fichier_zip, fichiers_dict):
    """
    Crée un ZIP contenant des fichiers texte.
    fichiers_dict: {"nom_fichier": "contenu", ...}

    Retourne le nombre de fichiers ajoutés.

    Exemple:
        creer_archive_textes("docs.zip", {
            "hello.txt": "Bonjour !",
            "info.txt": "Version 1.0"
        })
        → 2
    """
    # TODO: Utiliser ZipFile en mode écriture avec writestr()
    pass


def ajouter_a_zip(fichier_zip, nom_fichier, contenu):
    """
    Ajoute un fichier à un ZIP existant (mode append).
    Retourne True si ajouté avec succès, False sinon.

    Exemple:
        ajouter_a_zip("docs.zip", "nouveau.txt", "Nouveau contenu")
        → True
    """
    # TODO: Utiliser ZipFile en mode "a" (append)
    pass


# Tests
print("=== Exercice 2 : Créer un fichier ZIP ===")
fichiers = {
    "rapport.txt": "Rapport annuel 2024\n" * 50,
    "notes.txt": "Notes de réunion\n" * 30,
    "todo.txt": "- Tâche 1\n- Tâche 2\n- Tâche 3",
}

nb = creer_archive_textes("mon_archive.zip", fichiers)
if nb is not None:
    print(f"Fichiers ajoutés : {nb}")
    ajouter_a_zip("mon_archive.zip", "extra.txt", "Fichier ajouté après coup")
    # Vérifier
    with zipfile.ZipFile("mon_archive.zip", "r") as zf:
        print(f"Contenu final : {zf.namelist()}")
else:
    print("TODO: Implémenter creer_archive_textes")
print()


# Exercice 3 : Extraire un ZIP
# --------------------------------
# TODO: Extraire des fichiers avec vérification de sécurité

def extraire_zip(chemin_zip, destination, extensions=None):
    """
    Extrait un ZIP dans un dossier de destination.
    Si extensions est fourni, n'extrait que les fichiers avec ces extensions.

    Retourne la liste des fichiers extraits.

    Exemple:
        extraire_zip("archive.zip", "sortie/", extensions=[".py", ".txt"])
        → ["readme.txt", "src/main.py"]
    """
    # TODO: Utiliser extractall() ou extract() avec filtrage
    # TODO: Créer le dossier de destination si nécessaire
    pass


def extraire_securise(chemin_zip, destination):
    """
    Extrait un ZIP en vérifiant les chemins dangereux (ZipSlip).
    Lève ValueError si un chemin suspect est détecté.

    Retourne la liste des fichiers extraits.
    """
    # TODO: Vérifier que chaque fichier reste dans le dossier destination
    # TODO: Utiliser os.path.realpath() pour résoudre les chemins
    pass


# Tests
print("=== Exercice 3 : Extraire un ZIP ===")
fichiers_extraits = extraire_zip("test_exercice.zip", "extraction_test/", extensions=[".py"])
if fichiers_extraits is not None:
    print(f"Fichiers .py extraits : {fichiers_extraits}")
else:
    print("TODO: Implémenter extraire_zip")

fichiers_secure = extraire_securise("test_exercice.zip", "extraction_securisee/")
if fichiers_secure is not None:
    print(f"Extraction sécurisée : {fichiers_secure}")
else:
    print("TODO: Implémenter extraire_securise")
print()


# Exercice 4 : Manipulation avancée
# -------------------------------------
# TODO: Opérations avancées sur les fichiers ZIP

def comparer_zips(zip1_chemin, zip2_chemin):
    """
    Compare deux fichiers ZIP.
    Retourne un dict:
    {
        "communs": [fichiers dans les deux],
        "uniquement_zip1": [fichiers seulement dans zip1],
        "uniquement_zip2": [fichiers seulement dans zip2],
    }

    Exemple:
        comparer_zips("a.zip", "b.zip")
        → {"communs": ["readme.txt"], "uniquement_zip1": [...], "uniquement_zip2": [...]}
    """
    # TODO: Comparer les namelist() des deux ZIPs
    pass


def statistiques_zip(chemin_zip):
    """
    Calcule des statistiques sur un fichier ZIP.
    Retourne un dict:
    {
        "nb_fichiers": int,
        "taille_totale": int (octets originaux),
        "taille_compressee": int (octets compressés),
        "taux_compression": float (pourcentage),
        "extensions": {"ext": count, ...}
    }
    """
    # TODO: Parcourir infolist() et calculer les stats
    pass


# Créer un deuxième ZIP pour la comparaison
with zipfile.ZipFile("test_exercice2.zip", "w") as zf:
    zf.writestr("readme.txt", "README différent")
    zf.writestr("data/config.json", '{"version": "2.0"}')
    zf.writestr("nouveau.txt", "Nouveau fichier")

# Tests
print("=== Exercice 4 : Manipulation avancée ===")
comparaison = comparer_zips("test_exercice.zip", "test_exercice2.zip")
if comparaison is not None:
    print(f"Communs : {comparaison['communs']}")
    print(f"Uniquement ZIP1 : {comparaison['uniquement_zip1']}")
    print(f"Uniquement ZIP2 : {comparaison['uniquement_zip2']}")
else:
    print("TODO: Implémenter comparer_zips")

stats = statistiques_zip("test_exercice.zip")
if stats is not None:
    print(f"\nStats : {stats['nb_fichiers']} fichiers")
    print(f"  Taille : {stats['taille_totale']} → {stats['taille_compressee']} octets")
    print(f"  Compression : {stats['taux_compression']:.1f}%")
    print(f"  Extensions : {stats['extensions']}")
else:
    print("TODO: Implémenter statistiques_zip")
print()


# Exercice 5 : Cas pratique — Gestionnaire de backups
# -------------------------------------------------------
# TODO: Créer un système de backup complet

def creer_backup(fichiers_dict, dossier_backup="backups"):
    """
    Crée une sauvegarde datée à partir d'un dict de fichiers.
    Le nom du ZIP inclut la date : backup_YYYYMMDD_HHMMSS.zip

    Args:
        fichiers_dict: {"chemin/fichier": "contenu", ...}
        dossier_backup: dossier où créer les backups

    Retourne le chemin du fichier ZIP créé.
    """
    # TODO: Créer le dossier si nécessaire
    # TODO: Générer un nom avec la date
    # TODO: Créer le ZIP avec compression
    pass


def restaurer_backup(chemin_zip, destination):
    """
    Restaure un backup (extrait le ZIP dans destination).
    Affiche un résumé des fichiers restaurés.

    Retourne le nombre de fichiers restaurés.
    """
    # TODO: Extraire et compter les fichiers
    pass


# Tests
print("=== Exercice 5 : Gestionnaire de backups ===")
fichiers_projet = {
    "src/main.py": "print('Hello')\n",
    "src/utils.py": "def helper():\n    return 42\n",
    "config.json": '{"debug": true}\n',
    "README.md": "# Mon Projet\n\nDescription ici.\n",
}

chemin_backup = creer_backup(fichiers_projet)
if chemin_backup is not None:
    print(f"Backup créé : {chemin_backup}")

    nb = restaurer_backup(chemin_backup, "restauration_test/")
    print(f"Fichiers restaurés : {nb}")
else:
    print("TODO: Implémenter creer_backup")

# Nettoyage des fichiers temporaires
for f in ["test_exercice.zip", "test_exercice2.zip", "mon_archive.zip"]:
    if os.path.exists(f):
        os.remove(f)
for d in ["extraction_test", "extraction_securisee", "restauration_test", "backups"]:
    if os.path.exists(d):
        import shutil
        shutil.rmtree(d)
print()
