# =================================================
# Module 15 : POO - Classes & Objets
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Classe Rectangle
# --------------------------------
class Rectangle:
    """Représente un rectangle géométrique."""

    def __init__(self, longueur, largeur):
        self.longueur = longueur
        self.largeur = largeur

    def aire(self):
        """Retourne l'aire du rectangle."""
        return self.longueur * self.largeur

    def perimetre(self):
        """Retourne le périmètre du rectangle."""
        return 2 * (self.longueur + self.largeur)

    def est_carre(self):
        """Retourne True si le rectangle est un carré."""
        return self.longueur == self.largeur

    def redimensionner(self, facteur):
        """Multiplie longueur et largeur par le facteur donné."""
        self.longueur *= facteur
        self.largeur *= facteur

# Tests
print("=== Exercice 1 : Rectangle ===")
r = Rectangle(5, 3)
print(f"Aire : {r.aire()}")                # 15
print(f"Périmètre : {r.perimetre()}")      # 16
print(f"Carré ? {r.est_carre()}")          # False
r.redimensionner(2)
print(f"Aire après ×2 : {r.aire()}")       # 60
carre = Rectangle(4, 4)
print(f"Carré ? {carre.est_carre()}")      # True
print()


# Exercice 2 : Classe Etudiant
# --------------------------------
class Etudiant:
    """Représente un étudiant avec ses notes."""

    def __init__(self, nom, prenom):
        self.nom = nom
        self.prenom = prenom
        self.notes = []

    def ajouter_note(self, note):
        """Ajoute une note si elle est entre 0 et 20."""
        if 0 <= note <= 20:
            self.notes.append(note)

    def moyenne(self):
        """Calcule et retourne la moyenne des notes."""
        if not self.notes:
            return 0
        return sum(self.notes) / len(self.notes)

    def meilleure_note(self):
        """Retourne la meilleure note, ou None si pas de notes."""
        if not self.notes:
            return None
        return max(self.notes)

    def est_admis(self):
        """Retourne True si la moyenne est >= 10."""
        return self.moyenne() >= 10

    def mention(self):
        """Retourne la mention selon la moyenne."""
        moy = self.moyenne()
        if moy >= 16:
            return "Très Bien"
        elif moy >= 14:
            return "Bien"
        elif moy >= 12:
            return "Assez Bien"
        elif moy >= 10:
            return "Passable"
        return "Ajourné"

# Tests
print("=== Exercice 2 : Etudiant ===")
e = Etudiant("Dupont", "Alice")
e.ajouter_note(15)
e.ajouter_note(12)
e.ajouter_note(18)
e.ajouter_note(14)
e.ajouter_note(-5)       # Ignoré
e.ajouter_note(25)       # Ignoré
print(f"Nombre de notes : {len(e.notes)}")     # 4
print(f"Moyenne : {e.moyenne():.1f}")          # 14.8
print(f"Meilleure note : {e.meilleure_note()}")  # 18
print(f"Admis ? {e.est_admis()}")              # True
print(f"Mention : {e.mention()}")              # Bien
print()


# Exercice 3 : Classe CompteBancaire
# -------------------------------------
class CompteBancaire:
    """Gère un compte bancaire avec un historique de transactions."""

    taux_interet = 0.02
    nombre_comptes = 0

    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self._solde = solde
        self._historique = []
        CompteBancaire.nombre_comptes += 1

    def deposer(self, montant):
        """Dépose un montant positif."""
        if montant <= 0:
            return "Le montant doit être positif"
        self._solde += montant
        self._historique.append(f"+{montant}€")
        return f"Dépôt de {montant}€. Nouveau solde : {self._solde}€"

    def retirer(self, montant):
        """Retire un montant si le solde est suffisant."""
        if montant <= 0:
            return "Le montant doit être positif"
        if montant > self._solde:
            return f"Solde insuffisant ({self._solde}€)"
        self._solde -= montant
        self._historique.append(f"-{montant}€")
        return f"Retrait de {montant}€. Nouveau solde : {self._solde}€"

    def get_solde(self):
        """Retourne le solde actuel."""
        return self._solde

    def appliquer_interets(self):
        """Applique les intérêts annuels au solde."""
        interets = self._solde * CompteBancaire.taux_interet
        self._solde += interets
        self._historique.append(f"+{interets:.2f}€ (intérêts)")
        return f"Intérêts : +{interets:.2f}€"

    def afficher_historique(self):
        """Affiche toutes les opérations."""
        print(f"--- Historique de {self.titulaire} ---")
        for operation in self._historique:
            print(f"  {operation}")
        print(f"  Solde actuel : {self._solde}€")

# Tests
print("=== Exercice 3 : CompteBancaire ===")
compte = CompteBancaire("Alice", 1000)
print(compte.deposer(500))              # Dépôt de 500€. Nouveau solde : 1500€
print(compte.retirer(200))              # Retrait de 200€. Nouveau solde : 1300€
print(compte.retirer(5000))             # Solde insuffisant (1300€)
print(compte.appliquer_interets())      # Intérêts : +26.00€
print(f"Solde : {compte.get_solde()}")  # 1326.0
compte.afficher_historique()
print()


# Exercice 4 : Classe Inventaire
# ---------------------------------
class Inventaire:
    """Gère un inventaire de produits."""

    def __init__(self):
        self.produits = {}

    def ajouter(self, nom, quantite, prix):
        """Ajoute un produit à l'inventaire."""
        self.produits[nom] = {"quantite": quantite, "prix": prix}

    def supprimer(self, nom):
        """Supprime un produit de l'inventaire."""
        if nom in self.produits:
            del self.produits[nom]
            return f"'{nom}' supprimé"
        return f"'{nom}' non trouvé"

    def valeur_totale(self):
        """Calcule la valeur totale du stock."""
        return sum(p["quantite"] * p["prix"] for p in self.produits.values())

    def produit_le_plus_cher(self):
        """Retourne le nom du produit avec le prix unitaire le plus élevé."""
        if not self.produits:
            return None
        return max(self.produits, key=lambda n: self.produits[n]["prix"])

    def produits_en_rupture(self, seuil=5):
        """Retourne la liste des produits dont la quantité est <= seuil."""
        return [nom for nom, info in self.produits.items() if info["quantite"] <= seuil]

    def rapport(self):
        """Affiche un rapport complet de l'inventaire."""
        print("=" * 50)
        print(f"{'Produit':<15} {'Qté':>5} {'Prix':>10} {'Total':>12}")
        print("-" * 50)
        for nom, info in self.produits.items():
            total = info["quantite"] * info["prix"]
            print(f"{nom:<15} {info['quantite']:>5} {info['prix']:>10.2f}€ {total:>11.2f}€")
        print("-" * 50)
        print(f"{'Valeur totale':<15} {'':>5} {'':>10} {self.valeur_totale():>11.2f}€")
        print("=" * 50)

# Tests
print("=== Exercice 4 : Inventaire ===")
inv = Inventaire()
inv.ajouter("Clavier", 10, 49.99)
inv.ajouter("Souris", 25, 29.99)
inv.ajouter("Écran", 3, 299.99)
inv.ajouter("Câble USB", 2, 9.99)
print(f"Valeur totale : {inv.valeur_totale():.2f}€")   # 2669.55€
print(f"Plus cher : {inv.produit_le_plus_cher()}")      # Écran
print(f"En rupture : {inv.produits_en_rupture()}")      # ['Écran', 'Câble USB']
inv.rapport()
print()


# Exercice 5 : Classe Playlist
# -------------------------------
class Chanson:
    """Représente une chanson."""

    def __init__(self, titre, artiste, duree):
        self.titre = titre
        self.artiste = artiste
        self.duree = duree

    def duree_formatee(self):
        """Retourne la durée au format 'M:SS'."""
        minutes = self.duree // 60
        secondes = self.duree % 60
        return f"{minutes}:{secondes:02d}"


class Playlist:
    """Gère une liste de chansons."""

    def __init__(self, nom):
        self.nom = nom
        self.chansons = []

    def ajouter(self, chanson):
        """Ajoute une chanson à la playlist."""
        self.chansons.append(chanson)

    def duree_totale(self):
        """Retourne la durée totale formatée."""
        total = sum(c.duree for c in self.chansons)
        heures = total // 3600
        minutes = (total % 3600) // 60
        secondes = total % 60
        if heures > 0:
            return f"{heures}:{minutes:02d}:{secondes:02d}"
        return f"{minutes}:{secondes:02d}"

    def rechercher(self, terme):
        """Recherche un terme dans les titres et artistes."""
        terme = terme.lower()
        return [
            c for c in self.chansons
            if terme in c.titre.lower() or terme in c.artiste.lower()
        ]

    def afficher(self):
        """Affiche la playlist avec numérotation."""
        print(f"🎵 {self.nom} ({len(self.chansons)} chansons)")
        for i, c in enumerate(self.chansons, 1):
            print(f"  {i}. {c.titre} - {c.artiste} ({c.duree_formatee()})")
        print(f"  Durée totale : {self.duree_totale()}")

# Tests
print("=== Exercice 5 : Playlist ===")
pl = Playlist("Ma Playlist")
pl.ajouter(Chanson("Bohemian Rhapsody", "Queen", 354))
pl.ajouter(Chanson("Imagine", "John Lennon", 183))
pl.ajouter(Chanson("Hotel California", "Eagles", 391))
pl.ajouter(Chanson("We Will Rock You", "Queen", 122))
pl.afficher()
print(f"\nDurée totale : {pl.duree_totale()}")  # 17:30
resultats = pl.rechercher("queen")
print(f"Résultats pour 'queen' : {len(resultats)} chanson(s)")
for c in resultats:
    print(f"  - {c.titre}")
print()


# =================================================
# Résumé des concepts clés
# =================================================
print("=" * 50)
print("RÉSUMÉ DES CONCEPTS CLÉS")
print("=" * 50)
print("""
1. CLASSE ET OBJET
   class MaClasse:          ← Plan de construction
   objet = MaClasse()       ← Instance concrète

2. __init__ ET self
   def __init__(self, param):
       self.attribut = param  ← Stocke dans l'instance

3. ATTRIBUTS DE CLASSE vs D'INSTANCE
   class Ex:
       partage = 0           ← Attribut de classe (partagé)
       def __init__(self):
           self.propre = 0   ← Attribut d'instance (propre)

4. MÉTHODES D'INSTANCE
   def methode(self, ...):  ← Premier param = self
       self.attribut ...     ← Accès aux attributs

5. CONVENTIONS DE NOMMAGE
   PascalCase → classes
   snake_case → attributs, méthodes
   _protege  → usage interne (convention)
   __prive   → name mangling

6. INTROSPECTION
   type(obj)         → type de l'objet
   isinstance(obj, Classe) → vérification d'instance
   vars(obj)         → attributs d'instance
   hasattr(obj, 'x') → vérifier un attribut
""")
