# =================================================
# Module 23 : Fichiers ZIP
# SOLUTION - Fichier corrigé
# =================================================

import zipfile
import os
import io
import shutil
from datetime import datetime

# Exercice 1 : Lire un fichier ZIP
# ------------------------------------
def lister_contenu_zip(chemin_zip):
    """Liste le contenu d'un fichier ZIP avec les infos de chaque fichier."""
    resultats = []
    with zipfile.ZipFile(chemin_zip, "r") as zf:
        for info in zf.infolist():
            resultats.append({
                "nom": info.filename,
                "taille": info.file_size,
                "compresse": info.compress_size,
            })
    return resultats


def lire_fichier_dans_zip(chemin_zip, nom_fichier, encodage="utf-8"):
    """Lit un fichier texte dans un ZIP sans l'extraire."""
    try:
        with zipfile.ZipFile(chemin_zip, "r") as zf:
            contenu = zf.read(nom_fichier)
            return (contenu.decode(encodage), None)
    except KeyError:
        return (None, f"Fichier '{nom_fichier}' introuvable dans l'archive")
    except zipfile.BadZipFile:
        return (None, "Archive ZIP invalide ou corrompue")


# Créer un ZIP de test
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
for fichier in contenu:
    print(f"  {fichier['nom']} ({fichier['taille']} octets)")

texte, erreur = lire_fichier_dans_zip("test_exercice.zip", "readme.txt")
print(f"\nContenu de readme.txt : {texte}")

_, erreur = lire_fichier_dans_zip("test_exercice.zip", "inexistant.txt")
print(f"Fichier absent : {erreur}")
print()


# Exercice 2 : Créer un fichier ZIP
# --------------------------------------
def creer_archive_textes(fichier_zip, fichiers_dict):
    """Crée un ZIP contenant des fichiers texte."""
    with zipfile.ZipFile(fichier_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for nom, contenu in fichiers_dict.items():
            zf.writestr(nom, contenu)
    return len(fichiers_dict)


def ajouter_a_zip(fichier_zip, nom_fichier, contenu):
    """Ajoute un fichier à un ZIP existant."""
    try:
        with zipfile.ZipFile(fichier_zip, "a") as zf:
            zf.writestr(nom_fichier, contenu)
        return True
    except Exception:
        return False


# Tests
print("=== Exercice 2 : Créer un fichier ZIP ===")
fichiers = {
    "rapport.txt": "Rapport annuel 2024\n" * 50,
    "notes.txt": "Notes de réunion\n" * 30,
    "todo.txt": "- Tâche 1\n- Tâche 2\n- Tâche 3",
}

nb = creer_archive_textes("mon_archive.zip", fichiers)
print(f"Fichiers ajoutés : {nb}")
ajouter_a_zip("mon_archive.zip", "extra.txt", "Fichier ajouté après coup")

with zipfile.ZipFile("mon_archive.zip", "r") as zf:
    print(f"Contenu final : {zf.namelist()}")
print()


# Exercice 3 : Extraire un ZIP
# --------------------------------
def extraire_zip(chemin_zip, destination, extensions=None):
    """Extrait un ZIP avec filtrage optionnel par extension."""
    os.makedirs(destination, exist_ok=True)
    fichiers_extraits = []

    with zipfile.ZipFile(chemin_zip, "r") as zf:
        for nom in zf.namelist():
            if extensions is not None:
                _, ext = os.path.splitext(nom)
                if ext.lower() not in extensions:
                    continue
            zf.extract(nom, destination)
            fichiers_extraits.append(nom)

    return fichiers_extraits


def extraire_securise(chemin_zip, destination):
    """Extrait un ZIP en vérifiant les chemins dangereux."""
    os.makedirs(destination, exist_ok=True)
    fichiers_extraits = []
    dest_reelle = os.path.realpath(destination)

    with zipfile.ZipFile(chemin_zip, "r") as zf:
        for nom in zf.namelist():
            chemin_final = os.path.realpath(os.path.join(destination, nom))
            if not chemin_final.startswith(dest_reelle):
                raise ValueError(f"Chemin suspect détecté : {nom}")

        zf.extractall(destination)
        fichiers_extraits = zf.namelist()

    return fichiers_extraits


# Tests
print("=== Exercice 3 : Extraire un ZIP ===")
fichiers_extraits = extraire_zip("test_exercice.zip", "extraction_test/", extensions=[".py"])
print(f"Fichiers .py extraits : {fichiers_extraits}")

fichiers_secure = extraire_securise("test_exercice.zip", "extraction_securisee/")
print(f"Extraction sécurisée : {fichiers_secure}")
print()


# Exercice 4 : Manipulation avancée
# -------------------------------------
def comparer_zips(zip1_chemin, zip2_chemin):
    """Compare deux fichiers ZIP."""
    with zipfile.ZipFile(zip1_chemin, "r") as z1:
        fichiers1 = set(z1.namelist())
    with zipfile.ZipFile(zip2_chemin, "r") as z2:
        fichiers2 = set(z2.namelist())

    return {
        "communs": sorted(fichiers1 & fichiers2),
        "uniquement_zip1": sorted(fichiers1 - fichiers2),
        "uniquement_zip2": sorted(fichiers2 - fichiers1),
    }


def statistiques_zip(chemin_zip):
    """Calcule des statistiques sur un fichier ZIP."""
    nb_fichiers = 0
    taille_totale = 0
    taille_compressee = 0
    extensions = {}

    with zipfile.ZipFile(chemin_zip, "r") as zf:
        for info in zf.infolist():
            if not info.filename.endswith("/"):  # Ignorer les dossiers
                nb_fichiers += 1
                taille_totale += info.file_size
                taille_compressee += info.compress_size
                _, ext = os.path.splitext(info.filename)
                ext = ext if ext else "(sans ext)"
                extensions[ext] = extensions.get(ext, 0) + 1

    taux = (1 - taille_compressee / taille_totale) * 100 if taille_totale > 0 else 0

    return {
        "nb_fichiers": nb_fichiers,
        "taille_totale": taille_totale,
        "taille_compressee": taille_compressee,
        "taux_compression": taux,
        "extensions": extensions,
    }


# Créer un deuxième ZIP pour la comparaison
with zipfile.ZipFile("test_exercice2.zip", "w") as zf:
    zf.writestr("readme.txt", "README différent")
    zf.writestr("data/config.json", '{"version": "2.0"}')
    zf.writestr("nouveau.txt", "Nouveau fichier")

# Tests
print("=== Exercice 4 : Manipulation avancée ===")
comparaison = comparer_zips("test_exercice.zip", "test_exercice2.zip")
print(f"Communs : {comparaison['communs']}")
print(f"Uniquement ZIP1 : {comparaison['uniquement_zip1']}")
print(f"Uniquement ZIP2 : {comparaison['uniquement_zip2']}")

stats = statistiques_zip("test_exercice.zip")
print(f"\nStats : {stats['nb_fichiers']} fichiers")
print(f"  Taille : {stats['taille_totale']} → {stats['taille_compressee']} octets")
print(f"  Compression : {stats['taux_compression']:.1f}%")
print(f"  Extensions : {stats['extensions']}")
print()


# Exercice 5 : Cas pratique — Gestionnaire de backups
# -------------------------------------------------------
def creer_backup(fichiers_dict, dossier_backup="backups"):
    """Crée une sauvegarde datée."""
    os.makedirs(dossier_backup, exist_ok=True)
    date = datetime.now().strftime("%Y%m%d_%H%M%S")
    chemin_zip = os.path.join(dossier_backup, f"backup_{date}.zip")

    with zipfile.ZipFile(chemin_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for chemin, contenu in fichiers_dict.items():
            zf.writestr(chemin, contenu)

    taille = os.path.getsize(chemin_zip)
    print(f"  Backup : {len(fichiers_dict)} fichiers → {chemin_zip} ({taille} octets)")
    return chemin_zip


def restaurer_backup(chemin_zip, destination):
    """Restaure un backup."""
    os.makedirs(destination, exist_ok=True)

    with zipfile.ZipFile(chemin_zip, "r") as zf:
        zf.extractall(destination)
        fichiers = [f for f in zf.namelist() if not f.endswith("/")]

    for f in fichiers:
        print(f"  Restauré : {f}")
    return len(fichiers)


# Tests
print("=== Exercice 5 : Gestionnaire de backups ===")
fichiers_projet = {
    "src/main.py": "print('Hello')\n",
    "src/utils.py": "def helper():\n    return 42\n",
    "config.json": '{"debug": true}\n',
    "README.md": "# Mon Projet\n\nDescription ici.\n",
}

chemin_backup = creer_backup(fichiers_projet)
nb = restaurer_backup(chemin_backup, "restauration_test/")
print(f"Fichiers restaurés : {nb}")

# Nettoyage
for f in ["test_exercice.zip", "test_exercice2.zip", "mon_archive.zip"]:
    if os.path.exists(f):
        os.remove(f)
for d in ["extraction_test", "extraction_securisee", "restauration_test", "backups"]:
    if os.path.exists(d):
        shutil.rmtree(d)
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. OUVRIR UN ZIP
   with zipfile.ZipFile("archive.zip", "r") as zf:
       zf.namelist()     # Liste des fichiers
       zf.infolist()     # Infos détaillées
       zf.read("f.txt")  # Lire sans extraire (bytes)

2. CRÉER UN ZIP
   with zipfile.ZipFile("out.zip", "w", zipfile.ZIP_DEFLATED) as zf:
       zf.write("fichier.txt")                    # Fichier existant
       zf.write("fichier.txt", arcname="f.txt")   # Renommer
       zf.writestr("new.txt", "contenu")           # Contenu direct

3. EXTRAIRE
   zf.extractall("dossier/")          # Tout extraire
   zf.extract("fichier.txt", "dest/") # Un seul fichier

4. MODES
   "r" → Lecture | "w" → Écriture | "a" → Ajout

5. SÉCURITÉ (ZipSlip)
   Toujours vérifier que les chemins extraits
   restent dans le dossier de destination :
   os.path.realpath(os.path.join(dest, nom))

6. SHUTIL (alternative simple)
   shutil.make_archive("nom", "zip", "dossier/")
   shutil.unpack_archive("archive.zip", "dest/")
""")
