# =================================================
# Module 17 : Modules et Packages
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Créer un module utilitaire
# -------------------------------------------
# TODO: Créer des fonctions utilitaires pour manipuler du texte

def inverser_string(texte):
    """
    Inverse une chaîne de caractères.

    Exemples:
        inverser_string("Python") → "nohtyP"
        inverser_string("Hello")  → "olleH"
    """
    # TODO: Utiliser le slicing [::-1]
    pass


def compter_voyelles(texte):
    """
    Compte le nombre de voyelles dans un texte (y compris accentuées).

    Exemples:
        compter_voyelles("Bonjour") → 3
        compter_voyelles("Python")  → 1
    """
    # TODO: Compter les caractères qui sont dans "aeiouyàéèêëïîôù"
    pass


def est_palindrome(texte):
    """
    Vérifie si un texte est un palindrome (ignore casse et espaces).

    Exemples:
        est_palindrome("kayak")  → True
        est_palindrome("Été")    → False
    """
    # TODO: Nettoyer le texte puis comparer avec son inverse
    pass


def formater_nom(prenom, nom, style="normal"):
    """
    Formate un nom complet selon un style.

    Styles:
        "normal"   → "Prénom Nom"
        "formel"   → "NOM, Prénom"
        "initiales" → "P.N."

    Exemples:
        formater_nom("alice", "dupont")              → "Alice Dupont"
        formater_nom("alice", "dupont", "formel")    → "DUPONT, Alice"
        formater_nom("alice", "dupont", "initiales") → "A.D."
    """
    # TODO: Implémenter les 3 styles
    pass

# Tests
print("=== Exercice 1 : Fonctions utilitaires ===")
print(f"Inverser 'Python' : {inverser_string('Python')}")       # "nohtyP"
print(f"Voyelles dans 'Bonjour' : {compter_voyelles('Bonjour')}")  # 3
print(f"Voyelles dans 'Python' : {compter_voyelles('Python')}")    # 1
print(f"'kayak' palindrome ? {est_palindrome('kayak')}")           # True
print(f"'hello' palindrome ? {est_palindrome('hello')}")           # False
print(f"Nom normal : {formater_nom('alice', 'dupont')}")           # "Alice Dupont"
print(f"Nom formel : {formater_nom('alice', 'dupont', 'formel')}") # "DUPONT, Alice"
print(f"Initiales : {formater_nom('alice', 'dupont', 'initiales')}") # "A.D."
print()


# Exercice 2 : Utiliser la bibliothèque standard
# --------------------------------------------------
# TODO: Utiliser os, pathlib, collections et json

import os
from pathlib import Path
from collections import Counter
import json

def analyser_texte(texte):
    """
    Analyse un texte et retourne des statistiques.

    Retourne un dict avec:
        - nb_mots: nombre de mots
        - nb_caracteres: nombre de caractères (sans espaces)
        - nb_lignes: nombre de lignes
        - mots_frequents: les 5 mots les plus fréquents [(mot, count), ...]
        - mots_uniques: nombre de mots uniques
    """
    # TODO: Utiliser Counter pour les fréquences
    # TODO: Utiliser split(), splitlines(), len()
    pass


def sauvegarder_json(data, chemin):
    """
    Sauvegarde un dictionnaire en JSON avec indentation.
    Utilise ensure_ascii=False pour les accents.
    """
    # TODO: Ouvrir le fichier en écriture et utiliser json.dump()
    pass


def charger_json(chemin):
    """
    Charge un fichier JSON et retourne les données.
    Retourne None si le fichier n'existe pas.
    """
    # TODO: Vérifier si le fichier existe avec Path, puis charger
    pass

# Tests
print("=== Exercice 2 : Bibliothèque standard ===")
texte_exemple = """Python est un langage de programmation.
Python est utilisé pour le data science.
Python est aussi utilisé pour le web.
Le langage Python est très populaire."""

stats = analyser_texte(texte_exemple)
if stats:
    print(f"Mots : {stats['nb_mots']}")
    print(f"Caractères : {stats['nb_caracteres']}")
    print(f"Lignes : {stats['nb_lignes']}")
    print(f"Mots fréquents : {stats['mots_frequents']}")
    print(f"Mots uniques : {stats['mots_uniques']}")
print()


# Exercice 3 : Simuler un package avec des fonctions
# ------------------------------------------------------
# TODO: Créer un système de conversion d'unités organisé par thème

# En pratique, chaque section serait dans un fichier séparé.
# Ici, on simule la structure d'un package dans un seul fichier.

# --- Conversions de température ---
def celsius_vers_fahrenheit(c):
    """Convertit Celsius en Fahrenheit."""
    # TODO: F = C × 9/5 + 32
    pass

def fahrenheit_vers_celsius(f):
    """Convertit Fahrenheit en Celsius."""
    # TODO: C = (F - 32) × 5/9
    pass

def celsius_vers_kelvin(c):
    """Convertit Celsius en Kelvin."""
    # TODO: K = C + 273.15
    pass

# --- Conversions de distance ---
def km_vers_miles(km):
    """Convertit kilomètres en miles."""
    # TODO: 1 km = 0.621371 miles
    pass

def miles_vers_km(miles):
    """Convertit miles en kilomètres."""
    # TODO: 1 mile = 1.60934 km
    pass

# --- Conversions de poids ---
def kg_vers_livres(kg):
    """Convertit kilogrammes en livres."""
    # TODO: 1 kg = 2.20462 livres
    pass

def livres_vers_kg(livres):
    """Convertit livres en kilogrammes."""
    # TODO: 1 livre = 0.453592 kg
    pass

# --- Fonction de conversion générique ---
def convertir(valeur, de_unite, vers_unite):
    """
    Conversion générique entre unités.

    Unités supportées:
        Température: "C", "F", "K"
        Distance: "km", "miles"
        Poids: "kg", "livres"

    Exemples:
        convertir(100, "C", "F")     → 212.0
        convertir(10, "km", "miles") → 6.21371
    """
    # TODO: Utiliser un dictionnaire de fonctions de conversion
    # Astuce: conversions = { ("C", "F"): celsius_vers_fahrenheit, ... }
    pass

# Tests
print("=== Exercice 3 : Conversions d'unités ===")
print(f"100°C = {celsius_vers_fahrenheit(100):.1f}°F")     # 212.0°F
print(f"72°F = {fahrenheit_vers_celsius(72):.1f}°C")       # 22.2°C
print(f"0°C = {celsius_vers_kelvin(0):.2f}K")              # 273.15K
print(f"10 km = {km_vers_miles(10):.2f} miles")             # 6.21 miles
print(f"26.2 miles = {miles_vers_km(26.2):.2f} km")         # 42.16 km
print(f"75 kg = {kg_vers_livres(75):.2f} livres")           # 165.35 livres

if convertir:
    print(f"\nConversion générique:")
    print(f"100°C → {convertir(100, 'C', 'F'):.1f}°F")     # 212.0°F
    print(f"42 km → {convertir(42, 'km', 'miles'):.2f} miles")  # 26.10 miles
print()


# Exercice 4 : Système d'import simulé
# -----------------------------------------
# TODO: Simuler un registre de "modules" chargés dynamiquement

class ModuleRegistry:
    """
    Simule un registre de modules avec chargement à la demande.

    Méthodes:
        register(nom, module_dict) → None: Enregistre un module
        get(nom) → dict ou None: Récupère un module
        list_modules() → list: Liste des modules enregistrés
        call(nom, fonction, *args) → résultat: Appelle une fonction d'un module
    """

    def __init__(self):
        # TODO: Initialiser un dictionnaire vide de modules
        pass

    def register(self, nom, module_dict):
        """
        Enregistre un module (dictionnaire de fonctions).

        Exemple:
            registry.register("math", {"add": lambda a, b: a + b})
        """
        # TODO
        pass

    def get(self, nom):
        """Retourne le module s'il existe, None sinon."""
        # TODO
        pass

    def list_modules(self):
        """Retourne la liste des noms de modules enregistrés."""
        # TODO
        pass

    def call(self, nom_module, nom_fonction, *args):
        """
        Appelle une fonction d'un module enregistré.
        Lève une erreur si le module ou la fonction n'existe pas.
        """
        # TODO: Vérifier que le module et la fonction existent
        # TODO: Appeler la fonction avec les arguments
        pass

# Tests
print("=== Exercice 4 : Registre de modules ===")
registry = ModuleRegistry()

# Enregistrer des "modules"
registry.register("math", {
    "add": lambda a, b: a + b,
    "multiply": lambda a, b: a * b,
    "square": lambda x: x ** 2,
})

registry.register("string", {
    "upper": lambda s: s.upper(),
    "reverse": lambda s: s[::-1],
    "length": lambda s: len(s),
})

print(f"Modules : {registry.list_modules()}")  # ['math', 'string']
print(f"3 + 4 = {registry.call('math', 'add', 3, 4)}")      # 7
print(f"5² = {registry.call('math', 'square', 5)}")          # 25
print(f"upper('hello') = {registry.call('string', 'upper', 'hello')}")  # HELLO
print()


# Exercice 5 : Script avec __name__ == "__main__"
# ---------------------------------------------------
# TODO: Créer un script qui fonctionne à la fois comme module et comme programme

def compter_mots(texte):
    """Compte les mots dans un texte."""
    # TODO: Utiliser split()
    pass

def mot_le_plus_long(texte):
    """Trouve le mot le plus long dans un texte."""
    # TODO: Utiliser max() avec key=len
    pass

def frequence_mots(texte):
    """Retourne un Counter des fréquences de mots."""
    # TODO: Utiliser Counter
    pass

def resume_texte(texte):
    """
    Affiche un résumé complet du texte:
    - Nombre de mots
    - Mot le plus long
    - Top 3 des mots les plus fréquents
    """
    # TODO: Combiner les fonctions précédentes
    pass

# Ce bloc ne s'exécute QUE si le fichier est lancé directement
if __name__ == "__main__":
    print("=== Exercice 5 : Script autonome ===")
    texte = """Python est un langage de programmation populaire.
    Python est utilisé en data science et en intelligence artificielle.
    Le langage Python est facile à apprendre et très puissant."""

    resume_texte(texte)
