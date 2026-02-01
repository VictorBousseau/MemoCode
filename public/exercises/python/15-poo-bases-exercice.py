# =================================================
# Module 15 : POO - Classes & Objets
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Classe Rectangle
# --------------------------------
# TODO: Créer une classe Rectangle avec longueur et largeur

class Rectangle:
    """
    Représente un rectangle géométrique.

    Attributs:
        longueur (float): La longueur du rectangle
        largeur (float): La largeur du rectangle

    Méthodes:
        aire() → float: Calcule l'aire
        perimetre() → float: Calcule le périmètre
        est_carre() → bool: Vérifie si c'est un carré
        redimensionner(facteur) → None: Multiplie les dimensions par un facteur
    """

    def __init__(self, longueur, largeur):
        # TODO: Stocker longueur et largeur comme attributs d'instance
        pass

    def aire(self):
        """Retourne l'aire du rectangle (longueur × largeur)."""
        # TODO: Calculer et retourner l'aire
        pass

    def perimetre(self):
        """Retourne le périmètre du rectangle (2 × (longueur + largeur))."""
        # TODO: Calculer et retourner le périmètre
        pass

    def est_carre(self):
        """Retourne True si le rectangle est un carré."""
        # TODO: Vérifier si longueur == largeur
        pass

    def redimensionner(self, facteur):
        """Multiplie longueur et largeur par le facteur donné."""
        # TODO: Modifier les dimensions
        pass

# Tests
print("=== Exercice 1 : Rectangle ===")
r = Rectangle(5, 3)
print(f"Aire : {r.aire()}")                # Attendu: 15
print(f"Périmètre : {r.perimetre()}")      # Attendu: 16
print(f"Carré ? {r.est_carre()}")          # Attendu: False
r.redimensionner(2)
print(f"Aire après ×2 : {r.aire()}")       # Attendu: 60
carre = Rectangle(4, 4)
print(f"Carré ? {carre.est_carre()}")      # Attendu: True
print()


# Exercice 2 : Classe Etudiant
# --------------------------------
# TODO: Créer une classe Etudiant qui gère des notes

class Etudiant:
    """
    Représente un étudiant avec ses notes.

    Attributs:
        nom (str): Nom de l'étudiant
        prenom (str): Prénom de l'étudiant
        notes (list): Liste des notes (initialement vide)

    Méthodes:
        ajouter_note(note) → None: Ajoute une note (entre 0 et 20)
        moyenne() → float: Calcule la moyenne des notes
        meilleure_note() → float: Retourne la meilleure note
        est_admis() → bool: True si moyenne >= 10
        mention() → str: Retourne la mention selon la moyenne
    """

    def __init__(self, nom, prenom):
        # TODO: Stocker nom, prenom et initialiser une liste de notes vide
        pass

    def ajouter_note(self, note):
        """Ajoute une note si elle est entre 0 et 20."""
        # TODO: Vérifier que 0 <= note <= 20, puis ajouter à la liste
        pass

    def moyenne(self):
        """Calcule et retourne la moyenne des notes. Retourne 0 si aucune note."""
        # TODO: Calculer la moyenne avec sum() et len()
        pass

    def meilleure_note(self):
        """Retourne la meilleure note, ou None si pas de notes."""
        # TODO: Utiliser max()
        pass

    def est_admis(self):
        """Retourne True si la moyenne est >= 10."""
        # TODO: Comparer la moyenne à 10
        pass

    def mention(self):
        """
        Retourne la mention selon la moyenne :
        >= 16 : "Très Bien"
        >= 14 : "Bien"
        >= 12 : "Assez Bien"
        >= 10 : "Passable"
        < 10  : "Ajourné"
        """
        # TODO: Utiliser des if/elif pour déterminer la mention
        pass

# Tests
print("=== Exercice 2 : Etudiant ===")
e = Etudiant("Dupont", "Alice")
e.ajouter_note(15)
e.ajouter_note(12)
e.ajouter_note(18)
e.ajouter_note(14)
e.ajouter_note(-5)       # Doit être ignoré (< 0)
e.ajouter_note(25)       # Doit être ignoré (> 20)
print(f"Nombre de notes : {len(e.notes)}")     # Attendu: 4
print(f"Moyenne : {e.moyenne():.1f}")          # Attendu: 14.8
print(f"Meilleure note : {e.meilleure_note()}")  # Attendu: 18
print(f"Admis ? {e.est_admis()}")              # Attendu: True
print(f"Mention : {e.mention()}")              # Attendu: Bien
print()


# Exercice 3 : Classe CompteBancaire
# -------------------------------------
# TODO: Créer une classe CompteBancaire avec historique

class CompteBancaire:
    """
    Gère un compte bancaire avec un historique de transactions.

    Attributs de classe:
        taux_interet (float): Taux d'intérêt annuel (0.02 = 2%)
        nombre_comptes (int): Compteur de comptes créés

    Attributs d'instance:
        titulaire (str): Nom du titulaire
        _solde (float): Solde du compte (protégé)
        _historique (list): Liste des opérations

    Méthodes:
        deposer(montant) → str: Dépose un montant
        retirer(montant) → str: Retire un montant si solde suffisant
        get_solde() → float: Retourne le solde
        appliquer_interets() → str: Applique les intérêts annuels
        afficher_historique() → None: Affiche l'historique
    """

    # TODO: Définir les attributs de classe (taux_interet = 0.02, nombre_comptes = 0)

    def __init__(self, titulaire, solde=0):
        # TODO: Stocker titulaire, _solde, _historique (liste vide)
        # TODO: Incrémenter nombre_comptes
        pass

    def deposer(self, montant):
        """Dépose un montant positif et enregistre l'opération."""
        # TODO: Vérifier que montant > 0, mettre à jour le solde et l'historique
        pass

    def retirer(self, montant):
        """Retire un montant si le solde est suffisant."""
        # TODO: Vérifier montant > 0 et solde suffisant
        pass

    def get_solde(self):
        """Retourne le solde actuel."""
        # TODO: Retourner _solde
        pass

    def appliquer_interets(self):
        """Applique les intérêts annuels au solde."""
        # TODO: Calculer intérêts = solde × taux, ajouter au solde et à l'historique
        pass

    def afficher_historique(self):
        """Affiche toutes les opérations."""
        # TODO: Parcourir et afficher l'historique
        pass

# Tests
print("=== Exercice 3 : CompteBancaire ===")
compte = CompteBancaire("Alice", 1000)
print(compte.deposer(500))              # Attendu: "Dépôt de 500€. Nouveau solde : 1500€"
print(compte.retirer(200))              # Attendu: "Retrait de 200€. Nouveau solde : 1300€"
print(compte.retirer(5000))             # Attendu: message d'erreur solde insuffisant
print(compte.appliquer_interets())      # Attendu: "Intérêts : +26.00€"
print(f"Solde : {compte.get_solde()}")  # Attendu: 1326.0
compte.afficher_historique()
print()


# Exercice 4 : Classe Inventaire
# ---------------------------------
# TODO: Créer une classe qui gère un inventaire de produits

class Inventaire:
    """
    Gère un inventaire de produits.

    Attributs:
        produits (dict): Dictionnaire {nom: {"quantite": int, "prix": float}}

    Méthodes:
        ajouter(nom, quantite, prix) → None: Ajoute un produit
        supprimer(nom) → str: Supprime un produit
        valeur_totale() → float: Calcule la valeur totale du stock
        produit_le_plus_cher() → str: Retourne le nom du produit le plus cher
        produits_en_rupture(seuil=5) → list: Liste des produits sous le seuil
        rapport() → None: Affiche un rapport complet
    """

    def __init__(self):
        # TODO: Initialiser un dictionnaire vide
        pass

    def ajouter(self, nom, quantite, prix):
        """Ajoute un produit à l'inventaire."""
        # TODO: Stocker le produit dans le dictionnaire
        pass

    def supprimer(self, nom):
        """Supprime un produit de l'inventaire."""
        # TODO: Supprimer le produit s'il existe, sinon message d'erreur
        pass

    def valeur_totale(self):
        """Calcule la valeur totale du stock (quantité × prix pour chaque produit)."""
        # TODO: Utiliser sum() avec une compréhension
        pass

    def produit_le_plus_cher(self):
        """Retourne le nom du produit avec le prix unitaire le plus élevé."""
        # TODO: Utiliser max() avec key=
        pass

    def produits_en_rupture(self, seuil=5):
        """Retourne la liste des produits dont la quantité est <= seuil."""
        # TODO: Filtrer les produits sous le seuil
        pass

    def rapport(self):
        """Affiche un rapport complet de l'inventaire."""
        # TODO: Afficher chaque produit avec quantité, prix, et sous-total
        pass

# Tests
print("=== Exercice 4 : Inventaire ===")
inv = Inventaire()
inv.ajouter("Clavier", 10, 49.99)
inv.ajouter("Souris", 25, 29.99)
inv.ajouter("Écran", 3, 299.99)
inv.ajouter("Câble USB", 2, 9.99)
print(f"Valeur totale : {inv.valeur_totale():.2f}€")   # Attendu: ~2669.55€
print(f"Plus cher : {inv.produit_le_plus_cher()}")      # Attendu: Écran
print(f"En rupture : {inv.produits_en_rupture()}")      # Attendu: ['Écran', 'Câble USB']
inv.rapport()
print()


# Exercice 5 : Classe Playlist
# -------------------------------
# TODO: Créer une classe qui gère une playlist musicale

class Chanson:
    """
    Représente une chanson.

    Attributs:
        titre (str): Titre de la chanson
        artiste (str): Nom de l'artiste
        duree (int): Durée en secondes
    """

    def __init__(self, titre, artiste, duree):
        # TODO: Stocker les attributs
        pass

    def duree_formatee(self):
        """Retourne la durée au format 'M:SS' (ex: '3:45')."""
        # TODO: Convertir les secondes en minutes:secondes
        pass

class Playlist:
    """
    Gère une liste de chansons.

    Attributs:
        nom (str): Nom de la playlist
        chansons (list): Liste d'objets Chanson

    Méthodes:
        ajouter(chanson) → None: Ajoute une chanson
        duree_totale() → str: Durée totale formatée
        rechercher(terme) → list: Cherche dans titres et artistes
        afficher() → None: Affiche la playlist
    """

    def __init__(self, nom):
        # TODO: Stocker le nom et initialiser une liste vide de chansons
        pass

    def ajouter(self, chanson):
        """Ajoute une chanson à la playlist."""
        # TODO: Ajouter la chanson à la liste
        pass

    def duree_totale(self):
        """Retourne la durée totale au format 'H:MM:SS' ou 'M:SS'."""
        # TODO: Calculer la somme des durées et formater
        pass

    def rechercher(self, terme):
        """Recherche un terme dans les titres et artistes (insensible à la casse)."""
        # TODO: Filtrer les chansons dont le titre ou l'artiste contient le terme
        pass

    def afficher(self):
        """Affiche la playlist avec numérotation."""
        # TODO: Afficher chaque chanson avec son numéro
        pass

# Tests
print("=== Exercice 5 : Playlist ===")
pl = Playlist("Ma Playlist")
pl.ajouter(Chanson("Bohemian Rhapsody", "Queen", 354))
pl.ajouter(Chanson("Imagine", "John Lennon", 183))
pl.ajouter(Chanson("Hotel California", "Eagles", 391))
pl.ajouter(Chanson("We Will Rock You", "Queen", 122))
pl.afficher()
# Attendu:
# 🎵 Ma Playlist (4 chansons)
# 1. Bohemian Rhapsody - Queen (5:54)
# 2. Imagine - John Lennon (3:03)
# ...
print(f"Durée totale : {pl.duree_totale()}")
resultats = pl.rechercher("queen")
print(f"Résultats pour 'queen' : {len(resultats)} chanson(s)")
print()
