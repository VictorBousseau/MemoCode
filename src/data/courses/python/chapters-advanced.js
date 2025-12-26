// Chapter content for Python course - PART 2: Functions, POO, Advanced
// Modules 11-22

export const pythonChaptersAdvanced = {
    '11-methodes': `
# Module 11 : Méthodes d'Objets

En Python, tout est un objet. Chaque type a des méthodes intégrées.

## Découvrir les Méthodes

\`\`\`python
# Voir toutes les méthodes d'un type
print(dir(str))
print(dir(list))

# Obtenir de l'aide
help(str.split)
\`\`\`

## Méthodes de Strings

\`\`\`python
texte = "hello world"

# Casse
texte.upper()      # "HELLO WORLD"
texte.lower()      # "hello world"
texte.title()      # "Hello World"
texte.capitalize() # "Hello world"

# Recherche
texte.find("world")    # 6
texte.count("l")       # 3
texte.startswith("he") # True
texte.endswith("ld")   # True

# Modification
texte.replace("world", "python")
texte.strip()      # Supprime espaces
texte.split(" ")   # ['hello', 'world']
"-".join(["a", "b", "c"])  # "a-b-c"
\`\`\`

## Méthodes de Listes

\`\`\`python
liste = [1, 2, 3]

liste.append(4)     # Ajoute à la fin
liste.insert(0, 0)  # Insère à l'index
liste.extend([5,6]) # Ajoute plusieurs
liste.pop()         # Retire et retourne le dernier
liste.remove(2)     # Retire par valeur
liste.index(3)      # Trouve l'index
liste.count(1)      # Compte les occurrences
liste.sort()        # Trie en place
liste.reverse()     # Inverse en place
liste.copy()        # Copie superficielle
\`\`\`

## Méthodes de Dictionnaires

\`\`\`python
d = {"a": 1, "b": 2}

d.keys()           # dict_keys(['a', 'b'])
d.values()         # dict_values([1, 2])
d.items()          # dict_items([('a', 1), ('b', 2)])
d.get("a")         # 1
d.get("c", 0)      # 0 (défaut)
d.pop("a")         # Retire et retourne
d.update({"c": 3}) # Fusionne
\`\`\`
`,

    '12-fonctions': `
# Module 12 : Fonctions

## Définition de Base

\`\`\`python
def saluer(nom):
    """Fonction qui salue une personne."""
    return f"Bonjour, {nom}!"

# Appel
message = saluer("Alice")
print(message)
\`\`\`

## return vs print

\`\`\`python
def avec_return(x):
    return x * 2

def avec_print(x):
    print(x * 2)

resultat = avec_return(5)  # resultat = 10
resultat = avec_print(5)   # Affiche 10, resultat = None
\`\`\`

## Arguments

\`\`\`python
# Arguments positionnels
def addition(a, b):
    return a + b

# Arguments par défaut
def saluer(nom, message="Bonjour"):
    return f"{message}, {nom}!"

saluer("Alice")           # "Bonjour, Alice!"
saluer("Bob", "Salut")    # "Salut, Bob!"

# Arguments nommés (keyword)
saluer(message="Hello", nom="Charlie")
\`\`\`

## *args et **kwargs

\`\`\`python
# *args - nombre variable d'arguments positionnels
def somme(*args):
    return sum(args)

print(somme(1, 2, 3, 4, 5))  # 15

# **kwargs - nombre variable d'arguments nommés
def afficher_infos(**kwargs):
    for cle, valeur in kwargs.items():
        print(f"{cle}: {valeur}")

afficher_infos(nom="Alice", age=25, ville="Paris")

# Combiné
def fonction_complete(*args, **kwargs):
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")
\`\`\`

## Retourner Plusieurs Valeurs

\`\`\`python
def min_max(liste):
    return min(liste), max(liste)

mi, ma = min_max([3, 1, 4, 1, 5])
print(f"Min: {mi}, Max: {ma}")
\`\`\`

## Docstrings

\`\`\`python
def calculer_aire(rayon):
    """
    Calcule l'aire d'un cercle.
    
    Args:
        rayon (float): Le rayon du cercle
        
    Returns:
        float: L'aire du cercle
        
    Examples:
        >>> calculer_aire(5)
        78.53975
    """
    import math
    return math.pi * rayon ** 2

# Accéder à la docstring
print(calculer_aire.__doc__)
\`\`\`

## Exercices 🎯

\`\`\`python
# Factorielle récursive
def factorielle(n):
    if n <= 1:
        return 1
    return n * factorielle(n - 1)

# Palindrome
def est_palindrome(texte):
    texte = texte.lower().replace(" ", "")
    return texte == texte[::-1]

# FizzBuzz avec fonction
def fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    return str(n)
\`\`\`
`,

    '13-lambda': `
# Module 13 : Lambda, Map & Filter

## Fonctions Lambda

> Fonctions anonymes sur une seule ligne.

\`\`\`python
# Fonction normale
def carre(x):
    return x ** 2

# Équivalent lambda
carre = lambda x: x ** 2

# Utilisation directe
print((lambda x: x ** 2)(5))  # 25
\`\`\`

## map()

Applique une fonction à chaque élément.

\`\`\`python
nombres = [1, 2, 3, 4, 5]

# Avec lambda
carres = list(map(lambda x: x**2, nombres))
# [1, 4, 9, 16, 25]

# Conversion de types
strings = ["1", "2", "3"]
entiers = list(map(int, strings))
# [1, 2, 3]
\`\`\`

## filter()

Filtre selon une condition.

\`\`\`python
nombres = range(1, 21)

# Garder les pairs
pairs = list(filter(lambda x: x % 2 == 0, nombres))
# [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Garder les longueurs > 3
mots = ["je", "suis", "un", "programmeur"]
longs = list(filter(lambda m: len(m) > 3, mots))
# ["suis", "programmeur"]
\`\`\`

## reduce()

Réduit à une seule valeur.

\`\`\`python
from functools import reduce

nombres = [1, 2, 3, 4, 5]

# Somme
total = reduce(lambda acc, x: acc + x, nombres)
# 15

# Produit
produit = reduce(lambda acc, x: acc * x, nombres)
# 120

# Maximum
maximum = reduce(lambda a, b: a if a > b else b, nombres)
# 5
\`\`\`

## Combiner map, filter, reduce

\`\`\`python
nombres = range(1, 11)

# Pipeline: pairs → carrés → somme
resultat = reduce(
    lambda acc, x: acc + x,
    map(
        lambda x: x ** 2,
        filter(lambda x: x % 2 == 0, nombres)
    )
)
# 220 (4 + 16 + 36 + 64 + 100)
\`\`\`
`,

    '14-scope': `
# Module 14 : Portée (Scope) & Closures

## Règle LEGB

Python cherche les variables dans cet ordre :
- **L**ocal : dans la fonction actuelle
- **E**nclosing : dans les fonctions englobantes
- **G**lobal : au niveau du module
- **B**uilt-in : fonctions Python (print, len, etc.)

\`\`\`python
x = "global"

def externe():
    x = "enclosed"
    
    def interne():
        x = "local"
        print(x)  # "local"
    
    interne()
    print(x)  # "enclosed"

externe()
print(x)  # "global"
\`\`\`

## Mots-clés global et nonlocal

\`\`\`python
compteur = 0

def incrementer():
    global compteur
    compteur += 1

incrementer()
print(compteur)  # 1

def externe():
    x = 0
    
    def interne():
        nonlocal x
        x += 1
    
    interne()
    print(x)  # 1
\`\`\`

## Closures

Une closure est une fonction qui "capture" des variables de son environnement.

\`\`\`python
def creer_multiplicateur(n):
    def multiplier(x):
        return x * n  # n est capturé
    return multiplier

double = creer_multiplicateur(2)
triple = creer_multiplicateur(3)

print(double(5))  # 10
print(triple(5))  # 15
\`\`\`

### Exemple pratique : Compteur

\`\`\`python
def creer_compteur():
    compte = 0
    
    def incrementer():
        nonlocal compte
        compte += 1
        return compte
    
    return incrementer

compteur = creer_compteur()
print(compteur())  # 1
print(compteur())  # 2
print(compteur())  # 3
\`\`\`
`,

    '15-poo-bases': `
# Module 15 : POO - Classes & Objets

## Pourquoi la POO ?

- **Encapsulation** : regrouper données et comportements
- **Réutilisabilité** : créer des objets similaires
- **Modélisation** : représenter le monde réel

## Classes et Instances

\`\`\`python
class Chien:
    # Attribut de classe (partagé)
    espece = "Canis familiaris"
    
    # Constructeur
    def __init__(self, nom, age):
        # Attributs d'instance
        self.nom = nom
        self.age = age
    
    # Méthode d'instance
    def aboyer(self):
        return f"{self.nom} dit: Woof!"
    
    def anniversaire(self):
        self.age += 1

# Créer des instances
rex = Chien("Rex", 3)
max = Chien("Max", 5)

print(rex.nom)        # "Rex"
print(rex.aboyer())   # "Rex dit: Woof!"
print(Chien.espece)   # "Canis familiaris"
\`\`\`

## Attributs

\`\`\`python
class Cercle:
    # Attribut de classe
    pi = 3.14159
    
    def __init__(self, rayon):
        # Attribut d'instance
        self.rayon = rayon
    
    def aire(self):
        return Cercle.pi * self.rayon ** 2

c = Cercle(5)
print(c.rayon)  # 5
print(c.aire()) # 78.53975
\`\`\`

## self

\`self\` représente l'instance actuelle. Obligatoire comme premier paramètre.

\`\`\`python
class Personne:
    def __init__(self, nom):
        self.nom = nom
    
    def se_presenter(self):
        return f"Je suis {self.nom}"

alice = Personne("Alice")
# Python transforme se_presenter() en se_presenter(alice)
\`\`\`

## Exercices 🎯

\`\`\`python
class CompteBancaire:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde
    
    def deposer(self, montant):
        self.solde += montant
        return f"Nouveau solde: {self.solde}€"
    
    def retirer(self, montant):
        if montant > self.solde:
            return "Solde insuffisant"
        self.solde -= montant
        return f"Nouveau solde: {self.solde}€"

compte = CompteBancaire("Alice", 1000)
print(compte.deposer(500))   # 1500€
print(compte.retirer(200))   # 1300€
\`\`\`
`,

    '16-poo-avancee': `
# Module 16 : POO Avancée

## Héritage

\`\`\`python
class Animal:
    def __init__(self, nom):
        self.nom = nom
    
    def parler(self):
        raise NotImplementedError("Méthode abstraite")

class Chien(Animal):
    def parler(self):
        return f"{self.nom} dit: Woof!"

class Chat(Animal):
    def parler(self):
        return f"{self.nom} dit: Miaou!"

rex = Chien("Rex")
felix = Chat("Félix")
print(rex.parler())    # "Rex dit: Woof!"
print(felix.parler())  # "Félix dit: Miaou!"
\`\`\`

## super()

\`\`\`python
class Vehicule:
    def __init__(self, marque, modele):
        self.marque = marque
        self.modele = modele

class Voiture(Vehicule):
    def __init__(self, marque, modele, nb_portes):
        super().__init__(marque, modele)
        self.nb_portes = nb_portes

ma_voiture = Voiture("Tesla", "Model 3", 4)
\`\`\`

## Méthodes Spéciales (Dunder Methods)

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    # Représentation string
    def __str__(self):
        return f"Point({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"
    
    # Addition
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
    
    # Égalité
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    # Longueur (pour len())
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

p1 = Point(3, 4)
p2 = Point(1, 2)
print(p1)           # Point(3, 4)
print(p1 + p2)      # Point(4, 6)
print(p1 == p2)     # False
print(len(p1))      # 5
\`\`\`

## @classmethod et @staticmethod

\`\`\`python
class Date:
    def __init__(self, jour, mois, annee):
        self.jour = jour
        self.mois = mois
        self.annee = annee
    
    @classmethod
    def depuis_string(cls, date_str):
        jour, mois, annee = map(int, date_str.split('-'))
        return cls(jour, mois, annee)
    
    @staticmethod
    def est_bissextile(annee):
        return annee % 4 == 0 and (annee % 100 != 0 or annee % 400 == 0)

# Usage
d = Date.depuis_string("25-12-2024")
print(Date.est_bissextile(2024))  # True
\`\`\`
`,

    '17-modules': `
# Module 17 : Modules et Packages

## Importer des Modules

\`\`\`python
# Import complet
import math
print(math.pi)
print(math.sqrt(16))

# Import avec alias
import numpy as np

# Import spécifique
from math import pi, sqrt
print(pi)

# Import tout (déconseillé)
from math import *
\`\`\`

## Créer son Propre Module

\`\`\`python
# mon_module.py
def saluer(nom):
    return f"Bonjour, {nom}!"

PI = 3.14159

# Utilisation
import mon_module
print(mon_module.saluer("Alice"))
\`\`\`

## if __name__ == "__main__"

\`\`\`python
# calculatrice.py
def addition(a, b):
    return a + b

def soustraction(a, b):
    return a - b

if __name__ == "__main__":
    # Code exécuté uniquement si le fichier est lancé directement
    print(addition(5, 3))
    print(soustraction(5, 3))
\`\`\`

## Packages

\`\`\`
mon_package/
    __init__.py
    module1.py
    module2.py
    sous_package/
        __init__.py
        module3.py
\`\`\`

\`\`\`python
from mon_package import module1
from mon_package.sous_package import module3
\`\`\`

## pip et requirements.txt

\`\`\`bash
# Installer un package
pip install pandas

# Voir les packages installés
pip list

# Créer requirements.txt
pip freeze > requirements.txt

# Installer depuis requirements.txt
pip install -r requirements.txt
\`\`\`
`,

    '18-erreurs': `
# Module 18 : Gestion des Erreurs

## Types d'Erreurs

\`\`\`python
# SyntaxError - Erreur de syntaxe
# if True print("Hello")  # Manque les :

# TypeError - Mauvais type
# "2" + 2

# ValueError - Mauvaise valeur
# int("hello")

# KeyError - Clé inexistante
# {"a": 1}["b"]

# IndexError - Index hors limites
# [1, 2, 3][10]

# ZeroDivisionError
# 1 / 0
\`\`\`

## try/except

\`\`\`python
try:
    resultat = 10 / 0
except ZeroDivisionError:
    print("Impossible de diviser par zéro!")

# Capturer plusieurs exceptions
try:
    valeur = int(input("Entrez un nombre: "))
    resultat = 10 / valeur
except ValueError:
    print("Ce n'est pas un nombre!")
except ZeroDivisionError:
    print("Pas de division par zéro!")
except Exception as e:
    print(f"Erreur inattendue: {e}")
\`\`\`

## else et finally

\`\`\`python
try:
    fichier = open("data.txt")
    contenu = fichier.read()
except FileNotFoundError:
    print("Fichier non trouvé")
else:
    # Exécuté si pas d'exception
    print(f"Contenu: {contenu}")
finally:
    # Toujours exécuté
    fichier.close()
\`\`\`

## raise - Lever une Exception

\`\`\`python
def diviser(a, b):
    if b == 0:
        raise ValueError("Le diviseur ne peut pas être zéro")
    return a / b

try:
    diviser(10, 0)
except ValueError as e:
    print(e)
\`\`\`

## Exceptions Personnalisées

\`\`\`python
class SoldeInsuffisantError(Exception):
    def __init__(self, solde, montant):
        self.solde = solde
        self.montant = montant
        super().__init__(f"Solde insuffisant: {solde}€ < {montant}€")

def retirer(compte, montant):
    if montant > compte["solde"]:
        raise SoldeInsuffisantError(compte["solde"], montant)
    compte["solde"] -= montant

try:
    compte = {"solde": 100}
    retirer(compte, 150)
except SoldeInsuffisantError as e:
    print(e)
\`\`\`
`,

    '19-decorateurs': `
# Module 19 : Décorateurs

Les décorateurs modifient le comportement d'une fonction.

## Concept de Base

\`\`\`python
# Les fonctions sont des objets
def saluer():
    return "Hello!"

# On peut les passer en argument
def executer(func):
    return func()

print(executer(saluer))  # "Hello!"
\`\`\`

## Créer un Décorateur

\`\`\`python
def mon_decorateur(func):
    def wrapper():
        print("Avant la fonction")
        result = func()
        print("Après la fonction")
        return result
    return wrapper

@mon_decorateur
def dire_bonjour():
    print("Bonjour!")

dire_bonjour()
# Avant la fonction
# Bonjour!
# Après la fonction
\`\`\`

## Décorateur avec Arguments

\`\`\`python
from functools import wraps

def logger(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Appel de {func.__name__} avec {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"Résultat: {result}")
        return result
    return wrapper

@logger
def addition(a, b):
    return a + b

addition(3, 5)
\`\`\`

## Timer Decorator

\`\`\`python
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} a pris {end - start:.4f} secondes")
        return result
    return wrapper

@timer
def fonction_lente():
    time.sleep(1)
    return "Terminé"
\`\`\`

## Décorateurs Built-in

\`\`\`python
class Personne:
    def __init__(self, nom, age):
        self._nom = nom
        self._age = age
    
    @property
    def nom(self):
        return self._nom
    
    @nom.setter
    def nom(self, valeur):
        self._nom = valeur
    
    @staticmethod
    def espece():
        return "Homo sapiens"
    
    @classmethod
    def depuis_naissance(cls, nom, annee_naissance):
        age = 2024 - annee_naissance
        return cls(nom, age)
\`\`\`
`,

    '20-generateurs': `
# Module 20 : Générateurs & Itérateurs

## Itérateurs

\`\`\`python
# Créer un itérateur
liste = [1, 2, 3]
it = iter(liste)

print(next(it))  # 1
print(next(it))  # 2
print(next(it))  # 3
# next(it)  # StopIteration
\`\`\`

## Générateurs avec yield

\`\`\`python
def compteur(max):
    n = 0
    while n < max:
        yield n
        n += 1

gen = compteur(5)
print(next(gen))  # 0
print(next(gen))  # 1

# Ou en boucle
for n in compteur(5):
    print(n)
\`\`\`

## Générateur Fibonacci

\`\`\`python
def fibonacci(limite):
    a, b = 0, 1
    while a < limite:
        yield a
        a, b = b, a + b

for n in fibonacci(100):
    print(n)
# 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
\`\`\`

## Generator Expressions

\`\`\`python
# List comprehension (crée une liste)
liste = [x**2 for x in range(1000000)]  # Utilise beaucoup de mémoire

# Generator expression (calcule à la demande)
gen = (x**2 for x in range(1000000))  # Presque pas de mémoire

# Utilisation
for valeur in gen:
    print(valeur)
\`\`\`

## Avantages des Générateurs

1. **Mémoire efficiente** : valeurs calculées à la demande
2. **Pipelines** : chaîner les générateurs
3. **Fichiers volumineux** : traiter ligne par ligne

\`\`\`python
def lire_gros_fichier(chemin):
    with open(chemin, 'r') as f:
        for ligne in f:
            yield ligne.strip()

# Traite une ligne à la fois
for ligne in lire_gros_fichier("data.txt"):
    process(ligne)
\`\`\`
`,

    '21-modules-avances': `
# Module 21 : Modules Avancés Python

## Collections

\`\`\`python
from collections import Counter, defaultdict, namedtuple, deque

# Counter - Compter les éléments
texte = "abracadabra"
compte = Counter(texte)
print(compte)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
print(compte.most_common(2))  # [('a', 5), ('b', 2)]

# defaultdict - Valeur par défaut
d = defaultdict(list)
d["fruits"].append("pomme")

# namedtuple - Tuple nommé
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)

# deque - File à double entrée
d = deque([1, 2, 3])
d.appendleft(0)
d.append(4)
d.popleft()
\`\`\`

## Datetime

\`\`\`python
from datetime import datetime, timedelta, date

# Date actuelle
maintenant = datetime.now()
print(maintenant)  # 2024-12-26 15:30:00

# Créer une date
d = datetime(2024, 12, 25, 10, 30)

# Formatage
print(d.strftime("%d/%m/%Y"))  # 25/12/2024
print(d.strftime("%A %B %Y"))  # Wednesday December 2024

# Parser une date
d = datetime.strptime("25/12/2024", "%d/%m/%Y")

# Calcul de durée
diff = timedelta(days=7)
semaine_prochaine = maintenant + diff
\`\`\`

## Math et Random

\`\`\`python
import math
import random

# Math
print(math.pi)         # 3.14159...
print(math.sqrt(16))   # 4.0
print(math.ceil(4.2))  # 5
print(math.floor(4.8)) # 4

# Random
print(random.random())           # Float entre 0 et 1
print(random.randint(1, 10))     # Entier entre 1 et 10
print(random.choice([1, 2, 3]))  # Choix aléatoire
random.shuffle(liste)            # Mélanger en place
print(random.sample(liste, 3))   # Échantillon
\`\`\`

## Python Debugger (pdb)

\`\`\`python
import pdb

def fonction_buggee(x):
    y = x * 2
    breakpoint()  # ou pdb.set_trace()
    z = y + 10
    return z

# Commandes pdb:
# n (next) - ligne suivante
# s (step) - entrer dans la fonction
# c (continue) - continuer jusqu'au prochain breakpoint
# p variable - print variable
# l (list) - afficher le code autour
# q (quit) - quitter
\`\`\`
`,

    '22-regex': `
# Module 22 : Expressions Régulières (Regex)

## Module re

\`\`\`python
import re

texte = "Mon email est test@example.com"

# Rechercher
match = re.search(r'\\w+@\\w+\\.\\w+', texte)
if match:
    print(match.group())  # test@example.com
\`\`\`

## Patterns de Base

| Pattern | Description |
|---------|-------------|
| \`.\` | N'importe quel caractère |
| \`\\d\` | Chiffre [0-9] |
| \`\\w\` | Alphanumérique [a-zA-Z0-9_] |
| \`\\s\` | Espace, tab, newline |
| \`\\D\`, \`\\W\`, \`\\S\` | Négations |
| \`^\` | Début de chaîne |
| \`$\` | Fin de chaîne |

## Quantificateurs

| Pattern | Description |
|---------|-------------|
| \`*\` | 0 ou plus |
| \`+\` | 1 ou plus |
| \`?\` | 0 ou 1 |
| \`{n}\` | Exactement n |
| \`{n,m}\` | Entre n et m |

\`\`\`python
# Exemples
re.findall(r'\\d+', "J'ai 25 ans et 3 chats")  # ['25', '3']
re.findall(r'\\w+', "Hello World!")  # ['Hello', 'World']
\`\`\`

## Fonctions re

\`\`\`python
import re

texte = "Python est génial. Python est puissant."

# search - première occurrence
match = re.search(r'Python', texte)

# findall - toutes les occurrences
tous = re.findall(r'Python', texte)  # ['Python', 'Python']

# sub - remplacer
nouveau = re.sub(r'Python', 'JavaScript', texte)

# split - découper
parties = re.split(r'\\. ', texte)  # ['Python est génial', 'Python est puissant.']

# compile - pattern réutilisable
pattern = re.compile(r'\\d{3}-\\d{3}-\\d{4}')
\`\`\`

## Groupes

\`\`\`python
# Groupes de capture
pattern = r'(\\d{2})/(\\d{2})/(\\d{4})'
match = re.search(pattern, "Date: 25/12/2024")
print(match.group(0))  # 25/12/2024 (tout)
print(match.group(1))  # 25 (jour)
print(match.group(2))  # 12 (mois)
print(match.group(3))  # 2024 (année)

# Groupes nommés
pattern = r'(?P<jour>\\d{2})/(?P<mois>\\d{2})/(?P<annee>\\d{4})'
match = re.search(pattern, "25/12/2024")
print(match.group('jour'))  # 25
\`\`\`

## Validation Email

\`\`\`python
def valider_email(email):
    pattern = r'^[\\w.-]+@[\\w.-]+\\.\\w+$'
    return bool(re.match(pattern, email))

print(valider_email("test@example.com"))   # True
print(valider_email("invalid-email"))      # False
\`\`\`
`
};

export const getAdvancedChapterContent = (chapterId) => {
    return pythonChaptersAdvanced[chapterId] || null;
};
