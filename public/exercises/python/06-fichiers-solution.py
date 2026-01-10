# =================================================
# Module 6 : Fichiers I/O
# SOLUTION - Fichier corrigé
# =================================================

import os
import json
from datetime import datetime

# Exercice 1 : Lire un fichier texte
# ------------------------------------
def lire_fichier(chemin):
    """Lit et retourne le contenu d'un fichier texte."""
    try:
        with open(chemin, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return f"Erreur: Le fichier '{chemin}' n'existe pas"

# Créer un fichier test
with open("test_lecture.txt", "w", encoding="utf-8") as f:
    f.write("Bonjour, ceci est un test!\nLigne 2\nLigne 3")

contenu = lire_fichier("test_lecture.txt")
print(f"Contenu du fichier:\n{contenu}")
# Résultat:
# Bonjour, ceci est un test!
# Ligne 2
# Ligne 3


# Exercice 2 : Écrire des lignes dans un fichier
# ------------------------------------------------
def ecrire_lignes(chemin, lignes):
    """Écrit une liste de lignes dans un fichier."""
    with open(chemin, "w", encoding="utf-8") as f:
        for ligne in lignes:
            f.write(ligne + "\n")
    # Alternative: f.writelines([ligne + "\n" for ligne in lignes])

lignes_test = ["Première ligne", "Deuxième ligne", "Troisième ligne"]
ecrire_lignes("test_ecriture.txt", lignes_test)
print("✓ Fichier écrit avec succès!")


# Exercice 3 : Compter les lignes d'un fichier
# ----------------------------------------------
def compter_lignes(chemin):
    """Compte le nombre de lignes dans un fichier."""
    with open(chemin, "r", encoding="utf-8") as f:
        # Méthode 1: readlines()
        return len(f.readlines())
    
    # Méthode 2 (économe en mémoire pour gros fichiers):
    # with open(chemin, "r", encoding="utf-8") as f:
    #     return sum(1 for _ in f)

nombre_lignes = compter_lignes("test_ecriture.txt")
print(f"Nombre de lignes: {nombre_lignes}")
# Résultat: 3


# Exercice 4 : Ajouter du texte à un fichier existant
# -----------------------------------------------------
def ajouter_ligne(chemin, texte):
    """Ajoute une ligne à la fin d'un fichier existant."""
    with open(chemin, "a", encoding="utf-8") as f:  # 'a' = append
        f.write(texte + "\n")

ajouter_ligne("test_ecriture.txt", "Ligne ajoutée!")
print("✓ Ligne ajoutée avec succès!")

# Vérification
print(f"Nouveau nombre de lignes: {compter_lignes('test_ecriture.txt')}")
# Résultat: 4


# Exercice 5 : Sauvegarder et charger des données JSON
# ------------------------------------------------------
def sauvegarder_json(data, chemin):
    """Sauvegarde des données Python en fichier JSON."""
    with open(chemin, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        # ensure_ascii=False permet les caractères accentués

def charger_json(chemin):
    """Charge des données depuis un fichier JSON."""
    try:
        with open(chemin, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return None

# Données à sauvegarder
utilisateur = {
    "nom": "Alice",
    "age": 25,
    "hobbies": ["lecture", "programmation", "musique"],
    "actif": True
}

sauvegarder_json(utilisateur, "utilisateur.json")
print("✓ Données sauvegardées!")

# Charger les données
utilisateur_charge = charger_json("utilisateur.json")
print(f"Données chargées: {utilisateur_charge}")
print(f"Nom: {utilisateur_charge['nom']}")
print(f"Hobbies: {', '.join(utilisateur_charge['hobbies'])}")


# =================================================
# Bonus : Logger avec horodatage
# =================================================
def log_message(chemin, message):
    """Ajoute un message horodaté au fichier de log."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ligne_log = f"[{timestamp}] {message}\n"
    with open(chemin, "a", encoding="utf-8") as f:
        f.write(ligne_log)

# Tests
log_message("app.log", "Application démarrée")
log_message("app.log", "Utilisateur connecté")
log_message("app.log", "Opération terminée")

print("\n📋 Contenu du log:")
print(lire_fichier("app.log"))
# Résultat:
# [2024-01-15 10:30:45] Application démarrée
# [2024-01-15 10:30:45] Utilisateur connecté
# [2024-01-15 10:30:45] Opération terminée


# =================================================
# Bonus 2 : Gestionnaire de configuration
# =================================================
class ConfigManager:
    """Classe pour gérer la configuration de l'application."""
    
    def __init__(self, chemin="config.json"):
        self.chemin = chemin
        self.config = self._charger()
    
    def _charger(self):
        """Charge la config ou retourne des valeurs par défaut."""
        if os.path.exists(self.chemin):
            return charger_json(self.chemin)
        return {"debug": False, "theme": "dark", "langue": "fr"}
    
    def sauvegarder(self):
        """Sauvegarde la configuration."""
        sauvegarder_json(self.config, self.chemin)
    
    def get(self, cle, defaut=None):
        """Récupère une valeur de configuration."""
        return self.config.get(cle, defaut)
    
    def set(self, cle, valeur):
        """Définit une valeur et sauvegarde."""
        self.config[cle] = valeur
        self.sauvegarder()

# Exemple d'utilisation
config = ConfigManager()
print(f"\nThème actuel: {config.get('theme')}")
config.set('debug', True)
print(f"Debug activé: {config.get('debug')}")


# Nettoyage des fichiers de test
print("\n🧹 Nettoyage des fichiers de test...")
for f in ["test_lecture.txt", "test_ecriture.txt", "utilisateur.json", "app.log", "config.json"]:
    if os.path.exists(f):
        os.remove(f)
        print(f"  ✓ {f} supprimé")
