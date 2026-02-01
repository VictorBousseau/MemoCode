# =================================================
# Module 28 : GUIs avec Tkinter
# SOLUTION - Fichier corrigé
# =================================================
# NOTE : Ces exercices simulent la programmation GUI
# avec des structures de données. Pas besoin de Tkinter.
# =================================================

import re
from datetime import date


# Exercice 1 : Arbre de widgets
# --------------------------------
class Widget:
    """Représente un widget GUI."""

    _counter = 0

    def __init__(self, widget_type, props=None, widget_id=None):
        Widget._counter += 1
        self.type = widget_type
        self.props = props or {}
        self.children = []
        self.parent = None
        self.id = widget_id or f"widget_{Widget._counter}"

    def add_child(self, widget):
        widget.parent = self
        self.children.append(widget)
        return widget

    def find_by_id(self, widget_id):
        if self.id == widget_id:
            return self
        for child in self.children:
            result = child.find_by_id(widget_id)
            if result:
                return result
        return None

    def find_by_type(self, widget_type):
        results = []
        if self.type == widget_type:
            results.append(self)
        for child in self.children:
            results.extend(child.find_by_type(widget_type))
        return results

    def to_dict(self):
        return {
            "type": self.type,
            "id": self.id,
            "props": self.props,
            "children": [child.to_dict() for child in self.children]
        }

    def __repr__(self):
        return f"Widget({self.type}, id='{self.id}', children={len(self.children)})"


def creer_interface_formulaire():
    """Crée un arbre de widgets représentant un formulaire d'inscription."""
    window = Widget("Window", {"title": "Inscription", "geometry": "400x350"}, "window")

    # Header
    header = Widget("Frame", {"bg": "#f0f0f0"}, "header")
    header.add_child(Widget("Label", {"text": "Formulaire d'inscription", "font": ("Arial", 16, "bold")}, "titre"))
    window.add_child(header)

    # Form
    form = Widget("Frame", {"padx": 20, "pady": 10}, "form")
    form.add_child(Widget("Label", {"text": "Nom :"}, "lbl_nom"))
    form.add_child(Widget("Entry", {"width": 30}, "entry_nom"))
    form.add_child(Widget("Label", {"text": "Email :"}, "lbl_email"))
    form.add_child(Widget("Entry", {"width": 30}, "entry_email"))
    form.add_child(Widget("Label", {"text": "Mot de passe :"}, "lbl_mdp"))
    form.add_child(Widget("Entry", {"width": 30, "show": "*"}, "entry_mdp"))
    window.add_child(form)

    # Buttons
    buttons = Widget("Frame", {"pady": 10}, "buttons")
    buttons.add_child(Widget("Button", {"text": "Valider", "bg": "#4CAF50", "fg": "white"}, "btn_valider"))
    buttons.add_child(Widget("Button", {"text": "Annuler", "bg": "#f44336", "fg": "white"}, "btn_annuler"))
    window.add_child(buttons)

    return window


# Exercice 2 : Layout Grid calculé
# ------------------------------------
class GridLayout:
    """Simule le gestionnaire de géométrie grid()."""

    def __init__(self):
        self.cells = {}        # {(row, col): widget_id}
        self.spans = {}        # {widget_id: {"rowspan": int, "colspan": int}}
        self.padding = {}      # {widget_id: {"padx": int, "pady": int}}

    def place(self, widget_id, row, col, rowspan=1, colspan=1, padx=0, pady=0):
        for r in range(row, row + rowspan):
            for c in range(col, col + colspan):
                self.cells[(r, c)] = widget_id
        self.spans[widget_id] = {"rowspan": rowspan, "colspan": colspan}
        self.padding[widget_id] = {"padx": padx, "pady": pady}

    def remove(self, widget_id):
        to_remove = [pos for pos, wid in self.cells.items() if wid == widget_id]
        for pos in to_remove:
            del self.cells[pos]
        self.spans.pop(widget_id, None)
        self.padding.pop(widget_id, None)

    def get_widget_at(self, row, col):
        return self.cells.get((row, col))

    def get_bounds(self):
        if not self.cells:
            return (0, 0)
        max_row = max(r for r, c in self.cells.keys()) + 1
        max_col = max(c for r, c in self.cells.keys()) + 1
        return (max_row, max_col)

    def render(self, col_width=15, row_height=3):
        if not self.cells:
            return "(grille vide)"

        max_rows, max_cols = self.get_bounds()
        lines = []

        for row in range(max_rows):
            # Separator line
            sep = "+"
            for col in range(max_cols):
                sep += "-" * col_width + "+"
            lines.append(sep)

            # Content lines
            for line_idx in range(row_height):
                row_str = "|"
                for col in range(max_cols):
                    widget_id = self.cells.get((row, col), "")
                    # Only show the label on the middle line
                    if line_idx == row_height // 2 and widget_id:
                        # Check if this is the first cell of a spanned widget
                        is_first = True
                        if col > 0 and self.cells.get((row, col - 1)) == widget_id:
                            is_first = False

                        if is_first:
                            span = self.spans.get(widget_id, {"colspan": 1})
                            total_width = col_width * span["colspan"] + (span["colspan"] - 1)
                            label = widget_id[:total_width - 2]
                            cell = label.center(total_width)
                        else:
                            cell = " " * col_width
                    else:
                        cell = " " * col_width

                    row_str += cell + "|"
                lines.append(row_str)

        # Bottom separator
        sep = "+"
        for col in range(max_cols):
            sep += "-" * col_width + "+"
        lines.append(sep)

        return "\n".join(lines)


# Exercice 3 : EventManager (Pattern Observer)
# -----------------------------------------------
class EventManager:
    """Gère les événements d'une interface GUI."""

    def __init__(self):
        self.handlers = {}
        self.event_log = []

    def bind(self, event, callback):
        if event not in self.handlers:
            self.handlers[event] = []
        self.handlers[event].append(callback)

    def unbind(self, event, callback=None):
        if event not in self.handlers:
            return
        if callback is None:
            del self.handlers[event]
        else:
            self.handlers[event] = [h for h in self.handlers[event] if h != callback]

    def trigger(self, event, **kwargs):
        self.event_log.append({
            "event": event,
            "data": kwargs,
            "date": str(date.today())
        })

        if event not in self.handlers:
            return 0

        count = 0
        for callback in self.handlers[event]:
            try:
                callback(**kwargs)
                count += 1
            except Exception as e:
                self.event_log[-1]["error"] = str(e)

        return count

    def get_log(self, event=None):
        if event:
            return [entry for entry in self.event_log if entry["event"] == event]
        return self.event_log


# Exercice 4 : Formulaire avec validation
# -------------------------------------------
class FormValidator:
    """Valide les données d'un formulaire."""

    def __init__(self):
        self.rules = {}
        self.errors = {}

    def add_rule(self, field, *rules):
        if field not in self.rules:
            self.rules[field] = []
        self.rules[field].extend(rules)

    def validate(self, data):
        self.errors = {}
        clean_data = {}

        for field, rules in self.rules.items():
            value = str(data.get(field, "")).strip()
            clean_data[field] = value
            field_errors = []

            for rule in rules:
                if rule == "required":
                    if not value:
                        field_errors.append(f"{field} est obligatoire")

                elif rule == "email":
                    if value and not re.match(r'^[^@]+@[^@]+\.[^@]+$', value):
                        field_errors.append(f"{field} n'est pas un email valide")

                elif rule == "numeric":
                    if value:
                        try:
                            float(value)
                        except ValueError:
                            field_errors.append(f"{field} doit être numérique")

                elif rule.startswith("min_length:"):
                    min_len = int(rule.split(":")[1])
                    if value and len(value) < min_len:
                        field_errors.append(f"{field} doit avoir au moins {min_len} caractères")

                elif rule.startswith("max_length:"):
                    max_len = int(rule.split(":")[1])
                    if value and len(value) > max_len:
                        field_errors.append(f"{field} ne doit pas dépasser {max_len} caractères")

                elif rule.startswith("min:"):
                    min_val = float(rule.split(":")[1])
                    try:
                        if value and float(value) < min_val:
                            field_errors.append(f"{field} doit être >= {min_val}")
                    except ValueError:
                        pass

                elif rule.startswith("max:"):
                    max_val = float(rule.split(":")[1])
                    try:
                        if value and float(value) > max_val:
                            field_errors.append(f"{field} doit être <= {max_val}")
                    except ValueError:
                        pass

                elif rule.startswith("pattern:"):
                    pattern = rule.split(":", 1)[1]
                    if value and not re.match(pattern, value):
                        field_errors.append(f"{field} ne correspond pas au format attendu")

                elif rule.startswith("match:"):
                    other_field = rule.split(":")[1]
                    other_value = str(data.get(other_field, "")).strip()
                    if value and value != other_value:
                        field_errors.append(f"{field} doit correspondre à {other_field}")

            if field_errors:
                self.errors[field] = field_errors

        return {
            "valid": len(self.errors) == 0,
            "errors": self.errors,
            "clean_data": clean_data
        }

    def get_error_summary(self):
        if not self.errors:
            return "Aucune erreur"
        lines = ["Erreurs de validation :"]
        for field, errs in self.errors.items():
            for err in errs:
                lines.append(f"  - {err}")
        return "\n".join(lines)


# Exercice 5 : Modèle de données TODO
# ----------------------------------------
class TodoItem:
    """Représente un élément TODO."""

    _counter = 0

    def __init__(self, titre, description="", priorite="moyenne", tags=None):
        TodoItem._counter += 1
        self.id = TodoItem._counter
        self.titre = titre
        self.description = description
        self.priorite = priorite
        self.complete = False
        self.tags = set(tags) if tags else set()
        self.date_creation = str(date.today())

    def __repr__(self):
        status = "✓" if self.complete else "○"
        return f"[{status}] #{self.id} {self.titre} ({self.priorite})"


class TodoModel:
    """Modèle de données pour gérer les TODOs."""

    PRIORITE_ORDRE = {"haute": 0, "moyenne": 1, "basse": 2}

    def __init__(self):
        self.items = {}
        self.listeners = []

    def add(self, titre, description="", priorite="moyenne", tags=None):
        item = TodoItem(titre, description, priorite, tags)
        self.items[item.id] = item
        self._notify("add", item)
        return item

    def remove(self, item_id):
        if item_id in self.items:
            item = self.items.pop(item_id)
            self._notify("remove", item)
            return True
        return False

    def toggle(self, item_id):
        if item_id in self.items:
            self.items[item_id].complete = not self.items[item_id].complete
            self._notify("toggle", self.items[item_id])
            return True
        return False

    def update(self, item_id, **kwargs):
        if item_id not in self.items:
            return False
        item = self.items[item_id]
        for key, value in kwargs.items():
            if hasattr(item, key) and key != "id":
                if key == "tags" and isinstance(value, (list, set)):
                    item.tags = set(value)
                else:
                    setattr(item, key, value)
        self._notify("update", item)
        return True

    def get(self, item_id):
        return self.items.get(item_id)

    def get_all(self, filtre=None, tri=None):
        results = list(self.items.values())

        if filtre:
            if "complete" in filtre:
                results = [i for i in results if i.complete == filtre["complete"]]
            if "priorite" in filtre:
                results = [i for i in results if i.priorite == filtre["priorite"]]
            if "tag" in filtre:
                results = [i for i in results if filtre["tag"] in i.tags]
            if "recherche" in filtre:
                terme = filtre["recherche"].lower()
                results = [i for i in results
                           if terme in i.titre.lower() or terme in i.description.lower()]

        if tri:
            if tri == "priorite":
                results.sort(key=lambda i: self.PRIORITE_ORDRE.get(i.priorite, 1))
            elif tri == "date":
                results.sort(key=lambda i: i.date_creation)
            elif tri == "titre":
                results.sort(key=lambda i: i.titre.lower())

        return results

    def on_change(self, callback):
        self.listeners.append(callback)

    def _notify(self, action, item):
        for listener in self.listeners:
            try:
                listener(action, item)
            except Exception:
                pass

    def stats(self):
        items = list(self.items.values())
        if not items:
            return {
                "total": 0, "completes": 0, "en_cours": 0,
                "par_priorite": {}, "tags_populaires": []
            }

        completes = sum(1 for i in items if i.complete)

        par_priorite = {}
        for item in items:
            par_priorite[item.priorite] = par_priorite.get(item.priorite, 0) + 1

        tag_counts = {}
        for item in items:
            for tag in item.tags:
                tag_counts[tag] = tag_counts.get(tag, 0) + 1
        tags_populaires = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)

        return {
            "total": len(items),
            "completes": completes,
            "en_cours": len(items) - completes,
            "par_priorite": par_priorite,
            "tags_populaires": tags_populaires
        }


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Arbre de widgets")
    print("=" * 50)

    # Reset counter
    Widget._counter = 0
    formulaire = creer_interface_formulaire()
    print(f"  Racine : {formulaire}")
    print(f"  Enfants directs : {len(formulaire.children)}")

    buttons = formulaire.find_by_type("Button")
    print(f"  Boutons : {[b.id for b in buttons]}")

    entries = formulaire.find_by_type("Entry")
    print(f"  Entries : {[e.id for e in entries]}")

    entry_nom = formulaire.find_by_id("entry_nom")
    print(f"  Entry nom : {entry_nom}")
    print(f"  Props : {entry_nom.props}")

    # Sérialisation
    arbre = formulaire.to_dict()
    print(f"  Dict keys : {arbre.keys()}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : GridLayout")
    print("=" * 50)

    grid = GridLayout()
    grid.place("Label_Nom", 0, 0)
    grid.place("Entry_Nom", 0, 1, colspan=2)
    grid.place("Label_Email", 1, 0)
    grid.place("Entry_Email", 1, 1, colspan=2)
    grid.place("Btn_OK", 2, 0)
    grid.place("Btn_Cancel", 2, 2)

    bounds = grid.get_bounds()
    print(f"  Grille : {bounds[0]} lignes x {bounds[1]} colonnes")
    print(f"  Widget à (0,1) : {grid.get_widget_at(0, 1)}")
    print(f"  Widget à (2,1) : {grid.get_widget_at(2, 1)}")

    print(grid.render())

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : EventManager")
    print("=" * 50)

    events = EventManager()
    resultats = []

    events.bind("<Click>", lambda **kw: resultats.append(f"Click at {kw.get('x')},{kw.get('y')}"))
    events.bind("<Click>", lambda **kw: resultats.append(f"Click on {kw.get('widget')}"))
    events.bind("<KeyPress>", lambda **kw: resultats.append(f"Key: {kw.get('key')}"))

    n1 = events.trigger("<Click>", x=100, y=200, widget="btn1")
    n2 = events.trigger("<KeyPress>", key="Enter")
    n3 = events.trigger("<Click>", x=50, y=75, widget="btn2")
    n4 = events.trigger("<Unknown>")

    print(f"  Callbacks appelés : {n1}, {n2}, {n3}, {n4}")
    print(f"  Résultats : {resultats}")
    print(f"  Log total : {len(events.get_log())} événements")
    print(f"  Log Click : {len(events.get_log('<Click>'))} événements")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : Validation")
    print("=" * 50)

    validator = FormValidator()
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
    print(f"  Test valide : {result['valid']}")
    print(f"  Données nettoyées : {result['clean_data']}")

    # Test invalide
    result2 = validator.validate({
        "nom": "",
        "email": "pas_un_email",
        "age": "15",
        "password": "abc",
        "password_confirm": "xyz"
    })
    print(f"\n  Test invalide : {result2['valid']}")
    print(validator.get_error_summary())

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : TodoModel")
    print("=" * 50)

    TodoItem._counter = 0
    model = TodoModel()
    changes = []
    model.on_change(lambda action, item: changes.append(f"{action}: {item}"))

    t1 = model.add("Apprendre Python", priorite="haute", tags={"python", "cours"})
    t2 = model.add("Faire les courses", priorite="basse", tags={"perso"})
    t3 = model.add("Projet web", description="Créer un site", priorite="haute", tags={"web", "python"})
    t4 = model.add("Lire un livre", priorite="moyenne", tags={"perso", "lecture"})

    print(f"  Tous : {model.get_all()}")

    # Compléter
    model.toggle(t1.id)
    print(f"  Après toggle : {model.get(t1.id)}")

    # Filtrer
    hautes = model.get_all(filtre={"priorite": "haute"})
    print(f"  Haute priorité : {hautes}")

    python_items = model.get_all(filtre={"tag": "python"})
    print(f"  Tag python : {python_items}")

    en_cours = model.get_all(filtre={"complete": False}, tri="priorite")
    print(f"  En cours (triés) : {en_cours}")

    # Stats
    stats = model.stats()
    print(f"\n  Stats :")
    print(f"    Total : {stats['total']}")
    print(f"    Complétés : {stats['completes']}")
    print(f"    En cours : {stats['en_cours']}")
    print(f"    Par priorité : {stats['par_priorite']}")
    print(f"    Tags populaires : {stats['tags_populaires']}")

    print(f"\n  Changements notifiés : {len(changes)}")
    for c in changes:
        print(f"    → {c}")
