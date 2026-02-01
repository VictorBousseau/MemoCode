# =================================================
# Module 16 : POO Avancée
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Héritage - Système d'employés
# ---------------------------------------------
class Employe:
    """Classe de base pour un employé."""

    def __init__(self, nom, salaire):
        self.nom = nom
        self.salaire = salaire

    def presenter(self):
        """Retourne la présentation de l'employé."""
        return f"{self.nom}, salaire: {self.salaire}€"

    def salaire_mensuel(self):
        """Retourne le salaire mensuel."""
        return round(self.salaire / 12, 2)


class Manager(Employe):
    """Un manager est un employé qui gère une équipe."""

    def __init__(self, nom, salaire):
        super().__init__(nom, salaire)
        self.equipe = []

    def ajouter_employe(self, employe):
        """Ajoute un employé à l'équipe."""
        self.equipe.append(employe)

    def taille_equipe(self):
        """Retourne le nombre d'employés dans l'équipe."""
        return len(self.equipe)

    def presenter(self):
        """Retourne la présentation avec la taille de l'équipe."""
        base = super().presenter()
        return f"{base}, équipe de {self.taille_equipe()} personne(s)"


class Directeur(Manager):
    """Un directeur est un manager avec un budget départemental."""

    def __init__(self, nom, salaire, departement, budget):
        super().__init__(nom, salaire)
        self.departement = departement
        self.budget = budget

    def presenter(self):
        """Retourne la présentation complète."""
        base = super().presenter()
        return f"{base}, département: {self.departement}, budget: {self.budget}€"

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

print(f"Bob est un Employe ? {isinstance(bob, Employe)}")         # True
print(f"Charlie est un Manager ? {isinstance(charlie, Manager)}") # True
print()


# Exercice 2 : Dunder Methods - Classe Fraction
# -------------------------------------------------
from math import gcd

class Fraction:
    """Représente une fraction avec opérateurs mathématiques."""

    def __init__(self, num, den):
        if den == 0:
            raise ValueError("Le dénominateur ne peut pas être zéro")
        self.num = num
        self.den = den

    def simplifier(self):
        """Retourne une nouvelle Fraction simplifiée."""
        diviseur = gcd(abs(self.num), abs(self.den))
        return Fraction(self.num // diviseur, self.den // diviseur)

    def __str__(self):
        """Affichage lisible."""
        return f"{self.num}/{self.den}"

    def __repr__(self):
        """Représentation technique."""
        return f"Fraction({self.num}, {self.den})"

    def __add__(self, other):
        """Addition de fractions."""
        num = self.num * other.den + other.num * self.den
        den = self.den * other.den
        return Fraction(num, den).simplifier()

    def __sub__(self, other):
        """Soustraction de fractions."""
        num = self.num * other.den - other.num * self.den
        den = self.den * other.den
        return Fraction(num, den).simplifier()

    def __mul__(self, other):
        """Multiplication de fractions."""
        num = self.num * other.num
        den = self.den * other.den
        return Fraction(num, den).simplifier()

    def __eq__(self, other):
        """Égalité par produit en croix."""
        return self.num * other.den == other.num * self.den

    def __lt__(self, other):
        """Inférieur (comparaison des valeurs)."""
        return float(self) < float(other)

    def __float__(self):
        """Conversion en float."""
        return self.num / self.den

# Tests
print("=== Exercice 2 : Dunder Methods - Fraction ===")
f1 = Fraction(1, 2)
f2 = Fraction(1, 3)
print(f"f1 = {f1}")                    # 1/2
print(f"f2 = {f2}")                    # 1/3
print(f"f1 + f2 = {f1 + f2}")          # 5/6
print(f"f1 - f2 = {f1 - f2}")          # 1/6
print(f"f1 * f2 = {f1 * f2}")          # 1/6
print(f"f1 == Fraction(2, 4) : {f1 == Fraction(2, 4)}")  # True
print(f"f2 < f1 : {f2 < f1}")          # True
print(f"float(f1) = {float(f1)}")      # 0.5
f3 = Fraction(6, 8)
print(f"{f3} simplifié = {f3.simplifier()}")  # 3/4
print()


# Exercice 3 : @property - Classe Produit
# -------------------------------------------
class Produit:
    """Représente un produit en vente avec validation."""

    tva = 0.20

    def __init__(self, nom, prix, stock):
        self.nom = nom
        self.prix = prix      # Utilise le setter
        self.stock = stock    # Utilise le setter

    @property
    def prix(self):
        """Getter pour le prix."""
        return self._prix

    @prix.setter
    def prix(self, valeur):
        """Setter pour le prix avec validation."""
        if valeur <= 0:
            raise ValueError(f"Le prix doit être positif (reçu: {valeur})")
        self._prix = valeur

    @property
    def stock(self):
        """Getter pour le stock."""
        return self._stock

    @stock.setter
    def stock(self, valeur):
        """Setter pour le stock avec validation."""
        if valeur < 0:
            raise ValueError(f"Le stock ne peut pas être négatif (reçu: {valeur})")
        self._stock = valeur

    @property
    def disponible(self):
        """Retourne True si le produit est en stock."""
        return self._stock > 0

    @property
    def prix_ttc(self):
        """Retourne le prix TTC."""
        return self._prix * (1 + Produit.tva)

    def vendre(self, quantite=1):
        """Vend une quantité du produit."""
        if quantite > self._stock:
            return f"Stock insuffisant ({self._stock} restant(s))"
        self._stock -= quantite
        return f"{quantite}x {self.nom} vendu(s). Stock restant : {self._stock}"

# Tests
print("=== Exercice 3 : @property - Produit ===")
p = Produit("Clavier", 49.99, 10)
print(f"{p.nom} : {p.prix}€ HT, {p.prix_ttc:.2f}€ TTC")  # 49.99€ HT, 59.99€ TTC
print(f"Disponible : {p.disponible}")   # True
print(f"Stock : {p.stock}")             # 10
print(p.vendre(3))                       # 3x Clavier vendu(s). Stock restant : 7
print(f"Stock : {p.stock}")             # 7

try:
    p.prix = -10
except ValueError as e:
    print(f"Erreur prix : {e}")

try:
    p.stock = -5
except ValueError as e:
    print(f"Erreur stock : {e}")
print()


# Exercice 4 : Composition - Système de cours
# -----------------------------------------------
class Lecon:
    """Représente une leçon dans un cours."""

    def __init__(self, titre, duree_minutes):
        self.titre = titre
        self.duree_minutes = duree_minutes
        self.completee = False

    def completer(self):
        """Marque la leçon comme complétée."""
        self.completee = True

    def __str__(self):
        statut = "✓" if self.completee else " "
        return f"[{statut}] {self.titre} ({self.duree_minutes}min)"


class Cours:
    """Représente un cours composé de leçons."""

    def __init__(self, titre, instructeur):
        self.titre = titre
        self.instructeur = instructeur
        self.lecons = []

    def ajouter_lecon(self, lecon):
        """Ajoute une leçon au cours."""
        self.lecons.append(lecon)

    def progression(self):
        """Retourne le pourcentage de leçons complétées."""
        if not self.lecons:
            return 0.0
        completees = sum(1 for l in self.lecons if l.completee)
        return (completees / len(self.lecons)) * 100

    def duree_totale(self):
        """Retourne la durée totale en minutes."""
        return sum(l.duree_minutes for l in self.lecons)

    def prochaine_lecon(self):
        """Retourne la première leçon non complétée, ou None."""
        for lecon in self.lecons:
            if not lecon.completee:
                return lecon
        return None

    def afficher(self):
        """Affiche le cours avec toutes les leçons et la progression."""
        print(f"📚 {self.titre} (par {self.instructeur})")
        print(f"   Progression : {self.progression():.1f}% | Durée : {self.duree_totale()}min")
        for lecon in self.lecons:
            print(f"   {lecon}")

# Tests
print("=== Exercice 4 : Composition - Cours ===")
cours = Cours("Python POO", "Victor")
cours.ajouter_lecon(Lecon("Classes et Objets", 45))
cours.ajouter_lecon(Lecon("Héritage", 35))
cours.ajouter_lecon(Lecon("Dunder Methods", 40))
cours.ajouter_lecon(Lecon("Composition", 30))

cours.afficher()

cours.lecons[0].completer()
cours.lecons[1].completer()
print(f"\nProgression : {cours.progression():.1f}%")  # 50.0%
prochaine = cours.prochaine_lecon()
if prochaine:
    print(f"Prochaine leçon : {prochaine}")  # [ ] Dunder Methods (40min)
print()


# Exercice 5 : Classe abstraite + polymorphisme
# -------------------------------------------------
from abc import ABC, abstractmethod
import math

class Forme(ABC):
    """Classe abstraite pour les formes géométriques."""

    @abstractmethod
    def aire(self):
        pass

    @abstractmethod
    def perimetre(self):
        pass

    def decrire(self):
        nom = self.__class__.__name__
        return f"{nom} : aire={self.aire():.2f}, périmètre={self.perimetre():.2f}"


class Carre(Forme):
    """Carré défini par son côté."""

    def __init__(self, cote):
        self.cote = cote

    def aire(self):
        return self.cote ** 2

    def perimetre(self):
        return 4 * self.cote


class CercleGeo(Forme):
    """Cercle défini par son rayon."""

    def __init__(self, rayon):
        self.rayon = rayon

    def aire(self):
        return math.pi * self.rayon ** 2

    def perimetre(self):
        return 2 * math.pi * self.rayon


class TriangleEquilateral(Forme):
    """Triangle équilatéral défini par son côté."""

    def __init__(self, cote):
        self.cote = cote

    def aire(self):
        return (self.cote ** 2 * math.sqrt(3)) / 4

    def perimetre(self):
        return 3 * self.cote

# Tests
print("=== Exercice 5 : Formes abstraites ===")
formes = [Carre(5), CercleGeo(3), TriangleEquilateral(6)]

for forme in formes:
    print(forme.decrire())

aire_totale = sum(f.aire() for f in formes)
print(f"\nAire totale : {aire_totale:.2f}")

try:
    f = Forme()
except TypeError as e:
    print(f"Erreur attendue : {e}")
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. HÉRITAGE
   class Fille(Mere):     ← Hérite de Mere
       def __init__(self, ...):
           super().__init__(...)  ← Appel au parent

2. POLYMORPHISME
   Même méthode, comportements différents
   → Permet du code générique (boucle sur des objets variés)

3. DUNDER METHODS
   __str__  → print(obj), str(obj)
   __repr__ → repr(obj), console
   __add__  → obj1 + obj2
   __eq__   → obj1 == obj2
   __len__  → len(obj)
   __lt__   → obj1 < obj2

4. @PROPERTY
   @property          → Getter (lecture)
   @attr.setter       → Setter (écriture + validation)
   Propriété calculée → Lecture seule sans setter

5. TYPES DE MÉTHODES
   def methode(self):       → Instance (accès à self)
   @classmethod cls:        → Classe (constructeurs alternatifs)
   @staticmethod:           → Statique (utilitaires)

6. COMPOSITION vs HÉRITAGE
   Héritage   → "est un" (Chien est un Animal)
   Composition → "a un"  (Voiture a un Moteur)
   Préférer composition quand possible

7. CLASSES ABSTRAITES (ABC)
   from abc import ABC, abstractmethod
   → Force les sous-classes à implémenter certaines méthodes
   → Ne peut pas être instanciée directement
""")
