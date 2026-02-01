# =================================================
# Module 17 : Modules et Packages
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Créer un module utilitaire
# -------------------------------------------
def inverser_string(texte):
    """Inverse une chaîne de caractères."""
    return texte[::-1]


def compter_voyelles(texte):
    """Compte le nombre de voyelles dans un texte."""
    voyelles = "aeiouyàéèêëïîôù"
    return sum(1 for c in texte.lower() if c in voyelles)


def est_palindrome(texte):
    """Vérifie si un texte est un palindrome."""
    texte_clean = texte.lower().replace(" ", "")
    return texte_clean == texte_clean[::-1]


def formater_nom(prenom, nom, style="normal"):
    """Formate un nom complet selon un style."""
    if style == "normal":
        return f"{prenom.capitalize()} {nom.capitalize()}"
    elif style == "formel":
        return f"{nom.upper()}, {prenom.capitalize()}"
    elif style == "initiales":
        return f"{prenom[0].upper()}.{nom[0].upper()}."
    else:
        raise ValueError(f"Style inconnu : {style}")

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
import os
from pathlib import Path
from collections import Counter
import json

def analyser_texte(texte):
    """Analyse un texte et retourne des statistiques."""
    mots = texte.lower().split()
    compteur = Counter(mots)

    return {
        "nb_mots": len(mots),
        "nb_caracteres": sum(len(c) for c in texte if not c.isspace()),
        "nb_lignes": len(texte.splitlines()),
        "mots_frequents": compteur.most_common(5),
        "mots_uniques": len(compteur),
    }


def sauvegarder_json(data, chemin):
    """Sauvegarde un dictionnaire en JSON."""
    with open(chemin, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def charger_json(chemin):
    """Charge un fichier JSON. Retourne None si absent."""
    p = Path(chemin)
    if not p.exists():
        return None
    with open(chemin, "r", encoding="utf-8") as f:
        return json.load(f)

# Tests
print("=== Exercice 2 : Bibliothèque standard ===")
texte_exemple = """Python est un langage de programmation.
Python est utilisé pour le data science.
Python est aussi utilisé pour le web.
Le langage Python est très populaire."""

stats = analyser_texte(texte_exemple)
print(f"Mots : {stats['nb_mots']}")
print(f"Caractères : {stats['nb_caracteres']}")
print(f"Lignes : {stats['nb_lignes']}")
print(f"Mots fréquents : {stats['mots_frequents']}")
print(f"Mots uniques : {stats['mots_uniques']}")
print()


# Exercice 3 : Simuler un package avec des fonctions
# ------------------------------------------------------

# --- Conversions de température ---
def celsius_vers_fahrenheit(c):
    """Convertit Celsius en Fahrenheit."""
    return c * 9 / 5 + 32

def fahrenheit_vers_celsius(f):
    """Convertit Fahrenheit en Celsius."""
    return (f - 32) * 5 / 9

def celsius_vers_kelvin(c):
    """Convertit Celsius en Kelvin."""
    return c + 273.15

# --- Conversions de distance ---
def km_vers_miles(km):
    """Convertit kilomètres en miles."""
    return km * 0.621371

def miles_vers_km(miles):
    """Convertit miles en kilomètres."""
    return miles * 1.60934

# --- Conversions de poids ---
def kg_vers_livres(kg):
    """Convertit kilogrammes en livres."""
    return kg * 2.20462

def livres_vers_kg(livres):
    """Convertit livres en kilogrammes."""
    return livres * 0.453592

# --- Fonction de conversion générique ---
def convertir(valeur, de_unite, vers_unite):
    """Conversion générique entre unités."""
    conversions = {
        ("C", "F"): celsius_vers_fahrenheit,
        ("F", "C"): fahrenheit_vers_celsius,
        ("C", "K"): celsius_vers_kelvin,
        ("km", "miles"): km_vers_miles,
        ("miles", "km"): miles_vers_km,
        ("kg", "livres"): kg_vers_livres,
        ("livres", "kg"): livres_vers_kg,
    }

    cle = (de_unite, vers_unite)
    if cle not in conversions:
        raise ValueError(f"Conversion {de_unite} → {vers_unite} non supportée")
    return conversions[cle](valeur)

# Tests
print("=== Exercice 3 : Conversions d'unités ===")
print(f"100°C = {celsius_vers_fahrenheit(100):.1f}°F")     # 212.0°F
print(f"72°F = {fahrenheit_vers_celsius(72):.1f}°C")       # 22.2°C
print(f"0°C = {celsius_vers_kelvin(0):.2f}K")              # 273.15K
print(f"10 km = {km_vers_miles(10):.2f} miles")             # 6.21 miles
print(f"26.2 miles = {miles_vers_km(26.2):.2f} km")         # 42.16 km
print(f"75 kg = {kg_vers_livres(75):.2f} livres")           # 165.35 livres

print(f"\nConversion générique:")
print(f"100°C → {convertir(100, 'C', 'F'):.1f}°F")         # 212.0°F
print(f"42 km → {convertir(42, 'km', 'miles'):.2f} miles")  # 26.10 miles
print()


# Exercice 4 : Système d'import simulé
# -----------------------------------------
class ModuleRegistry:
    """Simule un registre de modules avec chargement à la demande."""

    def __init__(self):
        self._modules = {}

    def register(self, nom, module_dict):
        """Enregistre un module."""
        self._modules[nom] = module_dict

    def get(self, nom):
        """Retourne le module s'il existe, None sinon."""
        return self._modules.get(nom)

    def list_modules(self):
        """Retourne la liste des noms de modules enregistrés."""
        return list(self._modules.keys())

    def call(self, nom_module, nom_fonction, *args):
        """Appelle une fonction d'un module enregistré."""
        module = self._modules.get(nom_module)
        if module is None:
            raise ImportError(f"Module '{nom_module}' non trouvé")

        fonction = module.get(nom_fonction)
        if fonction is None:
            raise AttributeError(
                f"Le module '{nom_module}' n'a pas de fonction '{nom_fonction}'"
            )

        return fonction(*args)

# Tests
print("=== Exercice 4 : Registre de modules ===")
registry = ModuleRegistry()

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

# Test d'erreur
try:
    registry.call("math", "inexistant", 1)
except AttributeError as e:
    print(f"Erreur attendue : {e}")
print()


# Exercice 5 : Script avec __name__ == "__main__"
# ---------------------------------------------------
def compter_mots(texte):
    """Compte les mots dans un texte."""
    return len(texte.split())

def mot_le_plus_long(texte):
    """Trouve le mot le plus long dans un texte."""
    mots = texte.split()
    if not mots:
        return ""
    return max(mots, key=len)

def frequence_mots(texte):
    """Retourne un Counter des fréquences de mots."""
    return Counter(texte.lower().split())

def resume_texte(texte):
    """Affiche un résumé complet du texte."""
    nb = compter_mots(texte)
    plus_long = mot_le_plus_long(texte)
    freq = frequence_mots(texte)
    top3 = freq.most_common(3)

    print(f"📊 Résumé du texte")
    print(f"   Nombre de mots : {nb}")
    print(f"   Mot le plus long : '{plus_long}' ({len(plus_long)} lettres)")
    print(f"   Top 3 des mots :")
    for mot, count in top3:
        print(f"     - '{mot}' : {count} fois")

if __name__ == "__main__":
    print("=== Exercice 5 : Script autonome ===")
    texte = """Python est un langage de programmation populaire.
    Python est utilisé en data science et en intelligence artificielle.
    Le langage Python est facile à apprendre et très puissant."""

    resume_texte(texte)
    print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. IMPORTER DES MODULES
   import math                → math.sqrt(16)
   import numpy as np         → np.array([1, 2])
   from math import pi, sqrt  → pi, sqrt(16)
   from math import *         → ❌ À éviter

2. CRÉER UN MODULE
   Tout fichier .py est un module
   Les fonctions/classes définies dedans sont importables

3. __name__ == "__main__"
   Exécution directe : __name__ = "__main__"
   Import : __name__ = nom_du_module
   → Protège le code de test

4. PACKAGES
   Dossier avec __init__.py
   from package.module import fonction
   Imports relatifs avec . et ..

5. BIBLIOTHÈQUE STANDARD
   os, sys, json, math, random, datetime,
   pathlib, collections, re, functools, itertools

6. PIP ET REQUIREMENTS
   pip install package
   pip freeze > requirements.txt
   pip install -r requirements.txt
""")
