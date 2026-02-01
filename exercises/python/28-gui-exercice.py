# =================================================
# Module 28 : GUIs avec Tkinter
# Fichier d'exercice - À compléter
# =================================================
# NOTE : Ces exercices simulent la programmation GUI
# avec des structures de données. Pas besoin de Tkinter.
# =================================================


# Exercice 1 : Arbre de widgets
# --------------------------------
# TODO: Représenter une interface GUI comme un arbre de widgets

class Widget:
    """
    Représente un widget GUI.

    Attributs :
    - type (str) : type du widget ("Window", "Frame", "Label", "Button", "Entry", "Text", "Listbox")
    - props (dict) : propriétés du widget (text, width, height, bg, fg, font, etc.)
    - children (list) : liste de widgets enfants
    - parent (Widget ou None) : widget parent
    - id (str) : identifiant unique

    Méthodes :
    - add_child(widget) : ajoute un widget enfant
    - find_by_id(id) : cherche un widget par son ID dans tout l'arbre
    - find_by_type(type) : retourne tous les widgets d'un type donné
    - to_dict() : sérialise l'arbre en dict (récursif)
    - __repr__() : représentation lisible
    """

    _counter = 0

    def __init__(self, widget_type, props=None, widget_id=None):
        # TODO: Initialiser le widget
        pass

    def add_child(self, widget):
        """Ajoute un widget enfant et définit son parent."""
        # TODO: Ajouter l'enfant
        pass

    def find_by_id(self, widget_id):
        """Cherche un widget par ID dans tout l'arbre."""
        # TODO: Recherche récursive
        pass

    def find_by_type(self, widget_type):
        """Retourne tous les widgets d'un type donné."""
        # TODO: Recherche récursive
        pass

    def to_dict(self):
        """Sérialise l'arbre en dictionnaire."""
        # TODO: Sérialiser
        pass

    def __repr__(self):
        return f"Widget({self.type}, id='{self.id}', children={len(self.children)})"


def creer_interface_formulaire():
    """
    Crée un arbre de widgets représentant un formulaire d'inscription.

    Structure attendue :
    Window "Inscription"
    ├── Frame "header"
    │   └── Label "titre" (text="Formulaire d'inscription")
    ├── Frame "form"
    │   ├── Label "lbl_nom" (text="Nom :")
    │   ├── Entry "entry_nom" (width=30)
    │   ├── Label "lbl_email" (text="Email :")
    │   ├── Entry "entry_email" (width=30)
    │   ├── Label "lbl_mdp" (text="Mot de passe :")
    │   └── Entry "entry_mdp" (width=30, show="*")
    └── Frame "buttons"
        ├── Button "btn_valider" (text="Valider", bg="#4CAF50")
        └── Button "btn_annuler" (text="Annuler", bg="#f44336")

    Retourne le widget Window racine.
    """
    # TODO: Créer l'arbre de widgets
    pass


# Exercice 2 : Layout Grid calculé
# ------------------------------------
# TODO: Simuler le gestionnaire de géométrie grid()

class GridLayout:
    """
    Simule le gestionnaire de géométrie grid() de Tkinter.

    Attributs :
    - cells : dict {(row, col): widget_id}
    - spans : dict {widget_id: {"rowspan": int, "colspan": int}}
    - row_heights : dict {row: int} (hauteur en caractères)
    - col_widths : dict {col: int} (largeur en caractères)
    - padding : dict {widget_id: {"padx": int, "pady": int}}

    Méthodes :
    - place(widget_id, row, col, rowspan=1, colspan=1, padx=0, pady=0)
    - remove(widget_id)
    - get_widget_at(row, col)
    - get_bounds() → (max_rows, max_cols)
    - render() → représentation ASCII de la grille
    """

    def __init__(self):
        # TODO: Initialiser
        pass

    def place(self, widget_id, row, col, rowspan=1, colspan=1, padx=0, pady=0):
        """Place un widget dans la grille."""
        # TODO: Placer le widget
        pass

    def remove(self, widget_id):
        """Retire un widget de la grille."""
        # TODO: Retirer le widget
        pass

    def get_widget_at(self, row, col):
        """Retourne l'ID du widget à la position donnée."""
        # TODO: Chercher le widget
        pass

    def get_bounds(self):
        """Retourne (max_rows, max_cols) de la grille."""
        # TODO: Calculer les limites
        pass

    def render(self, col_width=15, row_height=3):
        """
        Retourne une représentation ASCII de la grille.

        Chaque cellule fait col_width caractères de large et
        row_height lignes de haut. Les widgets sont centrés
        dans leurs cellules.

        Exemple :
        +---------------+---------------+
        |               |               |
        |   Label Nom   |  Entry Nom    |
        |               |               |
        +---------------+---------------+
        """
        # TODO: Rendre la grille en ASCII
        pass


# Exercice 3 : EventManager (Pattern Observer)
# -----------------------------------------------
# TODO: Implémenter un système d'événements

class EventManager:
    """
    Gère les événements d'une interface GUI (pattern Observer).

    Attributs :
    - handlers : dict {event_name: [list of callbacks]}
    - event_log : list des événements déclenchés

    Méthodes :
    - bind(event, callback) : lier un callback à un événement
    - unbind(event, callback=None) : délier (tous si callback=None)
    - trigger(event, **kwargs) : déclencher un événement
    - get_log() : retourner le journal d'événements

    Événements standard :
    - "<Click>", "<DoubleClick>", "<KeyPress>", "<Enter>",
      "<Leave>", "<FocusIn>", "<FocusOut>"
    """

    def __init__(self):
        # TODO: Initialiser
        pass

    def bind(self, event, callback):
        """Lie un callback à un événement."""
        # TODO: Ajouter le handler
        pass

    def unbind(self, event, callback=None):
        """Délie un callback. Si callback=None, délie tous les handlers."""
        # TODO: Retirer le(s) handler(s)
        pass

    def trigger(self, event, **kwargs):
        """
        Déclenche un événement et appelle tous les callbacks.
        kwargs contient les données de l'événement (ex: x, y, key, widget).
        Retourne le nombre de callbacks appelés.
        """
        # TODO: Déclencher l'événement
        pass

    def get_log(self, event=None):
        """Retourne le journal, filtré par événement si spécifié."""
        # TODO: Retourner le log
        pass


# Exercice 4 : Formulaire avec validation
# -------------------------------------------
# TODO: Système de validation de formulaire

class FormValidator:
    """
    Valide les données d'un formulaire.

    Règles de validation supportées :
    - "required" : champ non vide
    - "email" : format email valide
    - "min_length:N" : longueur minimale N
    - "max_length:N" : longueur maximale N
    - "numeric" : valeur numérique
    - "min:N" : valeur minimale N (numérique)
    - "max:N" : valeur maximale N (numérique)
    - "pattern:REGEX" : correspondance avec une regex
    - "match:FIELD" : doit correspondre à un autre champ

    Attributs :
    - rules : dict {field_name: [list of rules]}
    - errors : dict {field_name: [list of error messages]}
    """

    def __init__(self):
        # TODO: Initialiser
        pass

    def add_rule(self, field, *rules):
        """
        Ajoute des règles de validation pour un champ.

        Exemple:
            validator.add_rule("email", "required", "email")
            validator.add_rule("password", "required", "min_length:8")
        """
        # TODO: Ajouter les règles
        pass

    def validate(self, data):
        """
        Valide un dict de données selon les règles définies.

        data : dict {field_name: value}

        Retourne un dict :
        - "valid": bool
        - "errors": dict {field_name: [messages d'erreur]}
        - "clean_data": dict des données nettoyées (strip, etc.)
        """
        # TODO: Valider les données
        pass

    def get_error_summary(self):
        """Retourne un résumé des erreurs sous forme de string."""
        # TODO: Formater les erreurs
        pass


# Exercice 5 : Modèle de données TODO
# ----------------------------------------
# TODO: Modèle de données pour une application TODO list

class TodoItem:
    """
    Représente un élément TODO.

    Attributs :
    - id (int) : identifiant unique auto-incrémenté
    - titre (str)
    - description (str)
    - priorite (str) : "haute", "moyenne", "basse"
    - complete (bool)
    - tags (set)
    - date_creation (str) : format "YYYY-MM-DD"
    """

    _counter = 0

    def __init__(self, titre, description="", priorite="moyenne", tags=None):
        # TODO: Initialiser
        pass

    def __repr__(self):
        status = "✓" if self.complete else "○"
        return f"[{status}] #{self.id} {self.titre} ({self.priorite})"


class TodoModel:
    """
    Modèle de données pour gérer les TODOs.

    Attributs :
    - items : dict {id: TodoItem}
    - listeners : list de callbacks appelés lors de modifications

    Méthodes :
    - add(titre, ...) → TodoItem
    - remove(id) → bool
    - toggle(id) → bool
    - update(id, **kwargs) → bool
    - get(id) → TodoItem
    - get_all(filtre=None, tri=None) → list
    - on_change(callback) : ajouter un listener
    - stats() → dict
    """

    def __init__(self):
        # TODO: Initialiser
        pass

    def add(self, titre, description="", priorite="moyenne", tags=None):
        """Ajoute un TODO et notifie les listeners."""
        # TODO: Ajouter
        pass

    def remove(self, item_id):
        """Supprime un TODO."""
        # TODO: Supprimer
        pass

    def toggle(self, item_id):
        """Bascule l'état complete d'un TODO."""
        # TODO: Basculer
        pass

    def update(self, item_id, **kwargs):
        """Met à jour les propriétés d'un TODO."""
        # TODO: Mettre à jour
        pass

    def get(self, item_id):
        """Retourne un TODO par son ID."""
        # TODO: Retourner
        pass

    def get_all(self, filtre=None, tri=None):
        """
        Retourne les TODOs filtrés et triés.

        filtre (dict) : critères de filtrage
            - "complete": bool
            - "priorite": str
            - "tag": str
            - "recherche": str (cherche dans titre + description)

        tri (str) : critère de tri
            - "priorite" (haute > moyenne > basse)
            - "date"
            - "titre"
        """
        # TODO: Filtrer et trier
        pass

    def on_change(self, callback):
        """Ajoute un listener de changements."""
        # TODO: Ajouter le listener
        pass

    def _notify(self, action, item):
        """Notifie les listeners d'un changement."""
        # TODO: Notifier
        pass

    def stats(self):
        """
        Retourne des statistiques :
        - "total": nombre total
        - "completes": nombre complétés
        - "en_cours": nombre non complétés
        - "par_priorite": dict {priorité: count}
        - "tags_populaires": list de (tag, count) triés par count desc
        """
        # TODO: Calculer les stats
        pass


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Arbre de widgets")
    print("=" * 50)

    formulaire = creer_interface_formulaire()
    if formulaire:
        print(f"  Racine : {formulaire}")
        buttons = formulaire.find_by_type("Button")
        print(f"  Boutons trouvés : {len(buttons) if buttons else 0}")
        entry = formulaire.find_by_id("entry_nom")
        print(f"  Entry nom : {entry}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : GridLayout")
    print("=" * 50)

    grid = GridLayout()
    if grid:
        grid.place("Label_Nom", 0, 0)
        grid.place("Entry_Nom", 0, 1, colspan=2)
        grid.place("Label_Email", 1, 0)
        grid.place("Entry_Email", 1, 1, colspan=2)
        grid.place("Btn_OK", 2, 0)
        grid.place("Btn_Cancel", 2, 2)

        bounds = grid.get_bounds()
        if bounds:
            print(f"  Grille : {bounds[0]} lignes x {bounds[1]} colonnes")

        rendered = grid.render()
        if rendered:
            print(rendered)

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : EventManager")
    print("=" * 50)

    events = EventManager()
    if events:
        resultats = []

        events.bind("<Click>", lambda **kw: resultats.append(f"Click at {kw.get('x')},{kw.get('y')}"))
        events.bind("<KeyPress>", lambda **kw: resultats.append(f"Key: {kw.get('key')}"))

        events.trigger("<Click>", x=100, y=200, widget="btn1")
        events.trigger("<KeyPress>", key="Enter")
        events.trigger("<Click>", x=50, y=75, widget="btn2")

        print(f"  Résultats : {resultats}")
        log = events.get_log()
        print(f"  Log : {len(log) if log else 0} événements")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : Validation")
    print("=" * 50)

    validator = FormValidator()
    if validator:
        validator.add_rule("nom", "required", "min_length:2", "max_length:50")
        validator.add_rule("email", "required", "email")
        validator.add_rule("age", "required", "numeric", "min:18", "max:120")
        validator.add_rule("password", "required", "min_length:8")
        validator.add_rule("password_confirm", "required", "match:password")

        # Test valide
        result = validator.validate({
            "nom": "Alice Martin",
            "email": "alice@test.com",
            "age": "25",
            "password": "secret123",
            "password_confirm": "secret123"
        })
        if result:
            print(f"  Valide : {result['valid']}")

        # Test invalide
        result2 = validator.validate({
            "nom": "",
            "email": "pas_un_email",
            "age": "15",
            "password": "abc",
            "password_confirm": "xyz"
        })
        if result2:
            print(f"  Invalide : {result2['valid']}")
            for field, errs in result2.get("errors", {}).items():
                print(f"    {field} : {errs}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : TodoModel")
    print("=" * 50)

    model = TodoModel()
    if model:
        changes = []
        model.on_change(lambda action, item: changes.append(f"{action}: {item}"))

        model.add("Apprendre Python", priorite="haute", tags={"python", "cours"})
        model.add("Faire les courses", priorite="basse", tags={"perso"})
        model.add("Projet web", description="Créer un site", priorite="haute", tags={"web", "python"})
        model.add("Lire un livre", priorite="moyenne", tags={"perso", "lecture"})

        # Compléter un TODO
        items = model.get_all()
        if items:
            model.toggle(items[0].id)

        # Filtrer
        hautes = model.get_all(filtre={"priorite": "haute"})
        print(f"  Haute priorité : {len(hautes) if hautes else 0}")

        python_items = model.get_all(filtre={"tag": "python"})
        print(f"  Tag python : {len(python_items) if python_items else 0}")

        # Stats
        stats = model.stats()
        if stats:
            print(f"  Stats : {stats}")

        print(f"  Changements notifiés : {len(changes)}")
