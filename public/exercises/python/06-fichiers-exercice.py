# =================================================
# Module 6 : Fichiers I/O
# Fichier d'exercice - À compléter
# =================================================

# Note: Ces exercices créent des fichiers temporaires.
# Assurez-vous d'avoir les permissions d'écriture.

import os
import json

# Exercice 1 : Lire un fichier texte
# ------------------------------------
# TODO: Compléter la fonction pour lire le contenu d'un fichier

def lire_fichier(chemin):
    """Lit et retourne le contenu d'un fichier texte."""
    # TODO: Ouvrir le fichier en mode lecture avec encodage UTF-8
    # TODO: Lire et retourner le contenu
    # TODO: Gérer l'erreur si le fichier n'existe pas
    pass

# Test (créons d'abord un fichier test)
with open("test_lecture.txt", "w", encoding="utf-8") as f:
    f.write("Bonjour, ceci est un test!\nLigne 2\nLigne 3")

contenu = lire_fichier("test_lecture.txt")
print(f"Contenu du fichier:\n{contenu}")


# Exercice 2 : Écrire des lignes dans un fichier
# ------------------------------------------------
# TODO: Compléter la fonction pour écrire une liste de lignes

def ecrire_lignes(chemin, lignes):
    """Écrit une liste de lignes dans un fichier."""
    # TODO: Ouvrir le fichier en mode écriture
    # TODO: Écrire chaque ligne avec un saut de ligne
    pass

lignes_test = ["Première ligne", "Deuxième ligne", "Troisième ligne"]
ecrire_lignes("test_ecriture.txt", lignes_test)
print("Fichier écrit avec succès!")


# Exercice 3 : Compter les lignes d'un fichier
# ----------------------------------------------
# TODO: Compléter la fonction pour compter les lignes

def compter_lignes(chemin):
    """Compte le nombre de lignes dans un fichier."""
    # TODO: Ouvrir le fichier
    # TODO: Compter les lignes
    # TODO: Retourner le compte
    pass

nombre_lignes = compter_lignes("test_ecriture.txt")
print(f"Nombre de lignes: {nombre_lignes}")


# Exercice 4 : Ajouter du texte à un fichier existant
# -----------------------------------------------------
# TODO: Compléter la fonction pour ajouter du texte à la fin

def ajouter_ligne(chemin, texte):
    """Ajoute une ligne à la fin d'un fichier existant."""
    # TODO: Ouvrir le fichier en mode append ('a')
    # TODO: Écrire le texte avec un saut de ligne
    pass

ajouter_ligne("test_ecriture.txt", "Ligne ajoutée!")
print("Ligne ajoutée avec succès!")


# Exercice 5 : Sauvegarder et charger des données JSON
# ------------------------------------------------------
# TODO: Compléter les fonctions pour sauvegarder/charger du JSON

def sauvegarder_json(data, chemin):
    """Sauvegarde des données Python en fichier JSON."""
    # TODO: Ouvrir le fichier en écriture
    # TODO: Utiliser json.dump() avec indent=2 pour la lisibilité
    pass

def charger_json(chemin):
    """Charge des données depuis un fichier JSON."""
    # TODO: Ouvrir le fichier en lecture
    # TODO: Utiliser json.load() pour lire les données
    # TODO: Retourner les données
    pass

# Données à sauvegarder
utilisateur = {
    "nom": "Alice",
    "age": 25,
    "hobbies": ["lecture", "programmation", "musique"],
    "actif": True
}

sauvegarder_json(utilisateur, "utilisateur.json")
print("Données sauvegardées!")

# Charger les données
utilisateur_charge = charger_json("utilisateur.json")
print(f"Données chargées: {utilisateur_charge}")


# =================================================
# Bonus : Logger avec horodatage
# =================================================
# TODO: Créer un système de log qui ajoute des messages avec date/heure

from datetime import datetime

def log_message(chemin, message):
    """Ajoute un message horodaté au fichier de log."""
    # TODO: Obtenir la date/heure actuelle avec datetime.now()
    # TODO: Formater: "[YYYY-MM-DD HH:MM:SS] message"
    # TODO: Ajouter au fichier (mode append)
    pass

# Tests
log_message("app.log", "Application démarrée")
log_message("app.log", "Utilisateur connecté")
log_message("app.log", "Opération terminée")

print("\nContenu du log:")
# TODO: Lire et afficher le contenu du fichier app.log


# Nettoyage des fichiers de test (optionnel)
# for f in ["test_lecture.txt", "test_ecriture.txt", "utilisateur.json", "app.log"]:
#     if os.path.exists(f):
#         os.remove(f)
