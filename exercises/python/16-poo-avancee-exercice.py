# =================================================
# Module 16 : POO Avancée
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Héritage - Système d'employés
# ---------------------------------------------
# TODO: Créer une hiérarchie Employe → Manager → Directeur

class Employe:
    """
    Classe de base pour un employé.

    Attributs:
        nom (str): Nom de l'employé
        salaire (float): Salaire annuel

    Méthodes:
        presenter() → str: Présentation de l'employé
        salaire_mensuel() → float: Salaire divisé par 12
    """

    def __init__(self, nom, salaire):
        # TODO: Stocker nom et salaire
        pass

    def presenter(self):
        """Retourne 'Nom, salaire: X€'."""
        # TODO: Retourner la présentation
        pass

    def salaire_mensuel(self):
        """Retourne le salaire mensuel (annuel / 12), arrondi à 2 décimales."""
        # TODO: Calculer et retourner
        pass


class Manager(Employe):
    """
    Un manager est un employé qui gère une équipe.

    Attributs supplémentaires:
        equipe (list): Liste d'objets Employe

    Méthodes supplémentaires:
        ajouter_employe(employe) → None: Ajoute un employé à l'équipe
        taille_equipe() → int: Retourne la taille de l'équipe
        presenter() → str: Override avec info sur l'équipe
    """

    def __init__(self, nom, salaire):
        # TODO: Appeler super().__init__ et initialiser equipe
        pass

    def ajouter_employe(self, employe):
        """Ajoute un employé à l'équipe."""
        # TODO: Ajouter l'employé à la liste
        pass

    def taille_equipe(self):
        """Retourne le nombre d'employés dans l'équipe."""
        # TODO: Retourner la taille de la liste
        pass

    def presenter(self):
        """Retourne la présentation avec la taille de l'équipe."""
        # TODO: Utiliser super().presenter() + info équipe
        pass


class Directeur(Manager):
    """
    Un directeur est un manager avec un budget départemental.

    Attributs supplémentaires:
        departement (str): Nom du département
        budget (float): Budget annuel du département

    Méthodes supplémentaires:
        presenter() → str: Override avec info département
    """

    def __init__(self, nom, salaire, departement, budget):
        # TODO: Appeler super().__init__ et stocker departement et budget
        pass

    def presenter(self):
        """Retourne la présentation complète."""
        # TODO: Utiliser super().presenter() + département et budget
        pass

# Tests
print("=== Exercice 1 : Héritage - Employés ===")
alice = Employe("Alice", 36000)
bob = Manager("Bob", 48000)
charlie = Directeur("Charlie", 72000, "Tech", 500000)

bob.ajouter_employe(alice)
print(alice.presenter())     # "Alice, salaire: 36000€"
print(f"Mensuel: {alice.salaire_mensuel()}€")   # 3000.0€
print(bob.presenter())       # "Bob, salaire: 48000€, équipe de 1 personne(s)"
print(charlie.presenter())   # "Charlie, ..., département: Tech, budget: 500000€"

# Vérifier l'héritage
print(f"Bob est un Employe ? {isinstance(bob, Employe)}")         # True
print(f"Charlie est un Manager ? {isinstance(charlie, Manager)}") # True
print()


# Exercice 2 : Dunder Methods - Classe Fraction
# -------------------------------------------------
# TODO: Créer une classe Fraction avec opérateurs mathématiques

class Fraction:
    """
    Représente une fraction avec numérateur et dénominateur.

    Méthodes spéciales à implémenter:
        __str__: Affichage "num/den"
        __repr__: Représentation "Fraction(num, den)"
        __add__: Addition de fractions
        __sub__: Soustraction de fractions
        __mul__: Multiplication de fractions
        __eq__: Égalité de fractions (produit en croix)
        __float__: Conversion en float
        __lt__: Comparaison inférieur
    """

    def __init__(self, num, den):
        # TODO: Vérifier que den != 0, stocker num et den
        pass

    def simplifier(self):
        """Retourne une nouvelle Fraction simplifiée."""
        # TODO: Trouver le PGCD et diviser num et den
        # Astuce: from math import gcd
        pass

    def __str__(self):
        """Affichage lisible: 'num/den'."""
        # TODO
        pass

    def __repr__(self):
        """Représentation technique: 'Fraction(num, den)'."""
        # TODO
        pass

    def __add__(self, other):
        """Addition: f1 + f2."""
        # TODO: (a/b) + (c/d) = (a*d + c*b) / (b*d)
        pass

    def __sub__(self, other):
        """Soustraction: f1 - f2."""
        # TODO: (a/b) - (c/d) = (a*d - c*b) / (b*d)
        pass

    def __mul__(self, other):
        """Multiplication: f1 * f2."""
        # TODO: (a/b) * (c/d) = (a*c) / (b*d)
        pass

    def __eq__(self, other):
        """Égalité: f1 == f2 (produit en croix)."""
        # TODO: a/b == c/d si a*d == c*b
        pass

    def __lt__(self, other):
        """Inférieur: f1 < f2."""
        # TODO: Comparer les valeurs en float
        pass

    def __float__(self):
        """Conversion en float."""
        # TODO: Retourner num / den
        pass

# Tests
print("=== Exercice 2 : Dunder Methods - Fraction ===")
f1 = Fraction(1, 2)
f2 = Fraction(1, 3)
print(f"f1 = {f1}")                    # Attendu: 1/2
print(f"f2 = {f2}")                    # Attendu: 1/3
print(f"f1 + f2 = {f1 + f2}")          # Attendu: 5/6
print(f"f1 - f2 = {f1 - f2}")          # Attendu: 1/6
print(f"f1 * f2 = {f1 * f2}")          # Attendu: 1/6
print(f"f1 == Fraction(2, 4) : {f1 == Fraction(2, 4)}")  # Attendu: True
print(f"f2 < f1 : {f2 < f1}")          # Attendu: True
print(f"float(f1) = {float(f1)}")      # Attendu: 0.5
f3 = Fraction(6, 8)
print(f"{f3} simplifié = {f3.simplifier()}")  # Attendu: 3/4
print()


# Exercice 3 : @property - Classe Produit
# -------------------------------------------
# TODO: Créer une classe Produit avec propriétés et validation

class Produit:
    """
    Représente un produit en vente.

    Propriétés (@property):
        prix → float: Prix avec validation (> 0)
        stock → int: Stock avec validation (>= 0)
        disponible → bool: True si stock > 0 (lecture seule)
        prix_ttc → float: Prix TTC avec TVA 20% (lecture seule)
    """

    tva = 0.20  # TVA à 20%

    def __init__(self, nom, prix, stock):
        self.nom = nom
        # TODO: Utiliser les setters (self.prix = ...) pour la validation
        pass

    @property
    def prix(self):
        """Getter pour le prix."""
        # TODO
        pass

    @prix.setter
    def prix(self, valeur):
        """Setter pour le prix (doit être > 0)."""
        # TODO: Lever ValueError si prix <= 0
        pass

    @property
    def stock(self):
        """Getter pour le stock."""
        # TODO
        pass

    @stock.setter
    def stock(self, valeur):
        """Setter pour le stock (doit être >= 0)."""
        # TODO: Lever ValueError si stock < 0
        pass

    @property
    def disponible(self):
        """Retourne True si le produit est en stock (lecture seule)."""
        # TODO
        pass

    @property
    def prix_ttc(self):
        """Retourne le prix TTC (lecture seule)."""
        # TODO: Calculer prix * (1 + tva)
        pass

    def vendre(self, quantite=1):
        """Vend une quantité du produit."""
        # TODO: Vérifier le stock suffisant, décrémenter, retourner message
        pass

# Tests
print("=== Exercice 3 : @property - Produit ===")
p = Produit("Clavier", 49.99, 10)
print(f"{p.nom} : {p.prix}€ HT, {p.prix_ttc:.2f}€ TTC")  # 49.99€ HT, 59.99€ TTC
print(f"Disponible : {p.disponible}")   # True
print(f"Stock : {p.stock}")             # 10
print(p.vendre(3))                       # Message de vente
print(f"Stock : {p.stock}")             # 7

# Tests de validation
try:
    p.prix = -10
except ValueError as e:
    print(f"Erreur prix : {e}")         # Attendu: erreur

try:
    p.stock = -5
except ValueError as e:
    print(f"Erreur stock : {e}")        # Attendu: erreur
print()


# Exercice 4 : Composition - Système de cours
# -----------------------------------------------
# TODO: Modéliser un système de cours avec composition

class Lecon:
    """
    Représente une leçon dans un cours.

    Attributs:
        titre (str): Titre de la leçon
        duree_minutes (int): Durée en minutes
        completee (bool): Statut de complétion
    """

    def __init__(self, titre, duree_minutes):
        # TODO: Stocker les attributs, completee = False par défaut
        pass

    def completer(self):
        """Marque la leçon comme complétée."""
        # TODO
        pass

    def __str__(self):
        """Retourne '[✓] Titre (Xmin)' ou '[ ] Titre (Xmin)'."""
        # TODO
        pass


class Cours:
    """
    Représente un cours composé de leçons (composition).

    Attributs:
        titre (str): Titre du cours
        instructeur (str): Nom de l'instructeur
        lecons (list): Liste d'objets Lecon

    Méthodes:
        ajouter_lecon(lecon) → None
        progression() → float: Pourcentage de leçons complétées
        duree_totale() → int: Durée totale en minutes
        prochaine_lecon() → Lecon ou None: Première leçon non complétée
        afficher() → None: Affiche le cours complet
    """

    def __init__(self, titre, instructeur):
        # TODO: Stocker titre, instructeur, et initialiser lecons vide
        pass

    def ajouter_lecon(self, lecon):
        """Ajoute une leçon au cours."""
        # TODO
        pass

    def progression(self):
        """Retourne le pourcentage de leçons complétées."""
        # TODO: Calculer le pourcentage
        pass

    def duree_totale(self):
        """Retourne la durée totale en minutes."""
        # TODO: Sommer les durées
        pass

    def prochaine_lecon(self):
        """Retourne la première leçon non complétée, ou None."""
        # TODO: Parcourir et trouver la première non complétée
        pass

    def afficher(self):
        """Affiche le cours avec toutes les leçons et la progression."""
        # TODO: Afficher titre, instructeur, progression, et chaque leçon
        pass

# Tests
print("=== Exercice 4 : Composition - Cours ===")
cours = Cours("Python POO", "Victor")
cours.ajouter_lecon(Lecon("Classes et Objets", 45))
cours.ajouter_lecon(Lecon("Héritage", 35))
cours.ajouter_lecon(Lecon("Dunder Methods", 40))
cours.ajouter_lecon(Lecon("Composition", 30))

cours.afficher()
# Attendu:
# 📚 Python POO (par Victor)
# Progression : 0.0%
# [ ] Classes et Objets (45min)
# ...

cours.lecons[0].completer()
cours.lecons[1].completer()
print(f"\nProgression : {cours.progression():.1f}%")  # 50.0%
prochaine = cours.prochaine_lecon()
if prochaine:
    print(f"Prochaine leçon : {prochaine}")  # [ ] Dunder Methods (40min)
print()


# Exercice 5 : Classe abstraite + polymorphisme
# -------------------------------------------------
# TODO: Créer un système de formes géométriques avec ABC

from abc import ABC, abstractmethod
import math

class Forme(ABC):
    """
    Classe abstraite pour les formes géométriques.

    Méthodes abstraites (à implémenter dans les sous-classes):
        aire() → float
        perimetre() → float

    Méthode concrète:
        decrire() → str: Utilise aire() et perimetre()
    """

    @abstractmethod
    def aire(self):
        pass

    @abstractmethod
    def perimetre(self):
        pass

    def decrire(self):
        """Retourne une description avec le nom, l'aire et le périmètre."""
        nom = self.__class__.__name__
        return f"{nom} : aire={self.aire():.2f}, périmètre={self.perimetre():.2f}"


class Carre(Forme):
    """Carré défini par son côté."""

    def __init__(self, cote):
        # TODO
        pass

    def aire(self):
        # TODO
        pass

    def perimetre(self):
        # TODO
        pass


class CercleGeo(Forme):
    """Cercle défini par son rayon."""

    def __init__(self, rayon):
        # TODO
        pass

    def aire(self):
        # TODO: Utiliser math.pi
        pass

    def perimetre(self):
        # TODO: Utiliser math.pi
        pass


class TriangleEquilateral(Forme):
    """Triangle équilatéral défini par son côté."""

    def __init__(self, cote):
        # TODO
        pass

    def aire(self):
        # TODO: Formule = (côté² × √3) / 4
        pass

    def perimetre(self):
        # TODO: 3 × côté
        pass

# Tests
print("=== Exercice 5 : Formes abstraites ===")
formes = [Carre(5), CercleGeo(3), TriangleEquilateral(6)]

for forme in formes:
    print(forme.decrire())
# Attendu:
# Carre : aire=25.00, périmètre=20.00
# CercleGeo : aire=28.27, périmètre=18.85
# TriangleEquilateral : aire=15.59, périmètre=18.00

# Calculer l'aire totale (polymorphisme)
aire_totale = sum(f.aire() for f in formes)
print(f"\nAire totale : {aire_totale:.2f}")

# Tester qu'on ne peut pas instancier Forme
try:
    f = Forme()
except TypeError as e:
    print(f"Erreur attendue : {e}")
print()
