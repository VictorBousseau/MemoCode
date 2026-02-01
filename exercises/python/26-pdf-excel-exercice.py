# =================================================
# Module 26 : PDFs et Spreadsheets
# Fichier d'exercice - À compléter
# =================================================
# NOTE : Ces exercices simulent openpyxl et PyPDF2
# avec des classes mock. Pas de dépendances externes.
# =================================================


# ===== Classes Mock (fournies, ne pas modifier) =====

class MockCell:
    """Simule une cellule Excel."""
    def __init__(self, valeur=None):
        self.value = valeur
        self.font_bold = False
        self.fill_color = None
        self.alignment = "left"
        self.formula = None

    def __repr__(self):
        return f"Cell({self.value})"


class MockSheet:
    """Simule une feuille Excel."""
    def __init__(self, titre="Sheet1"):
        self.title = titre
        self._data = {}  # {(row, col): MockCell}
        self.max_row = 0
        self.max_column = 0

    def cell(self, row, column, value=None):
        """Accède ou crée une cellule."""
        if value is not None:
            self._data[(row, column)] = MockCell(value)
            self.max_row = max(self.max_row, row)
            self.max_column = max(self.max_column, column)
        return self._data.get((row, column), MockCell())

    def __setitem__(self, key, value):
        """ws["A1"] = valeur"""
        col_str, row_str = "", ""
        for c in key:
            if c.isalpha():
                col_str += c
            else:
                row_str += c
        col = ord(col_str.upper()) - ord("A") + 1
        row = int(row_str)
        self.cell(row, col, value)

    def __getitem__(self, key):
        """ws["A1"]"""
        col_str, row_str = "", ""
        for c in key:
            if c.isalpha():
                col_str += c
            else:
                row_str += c
        col = ord(col_str.upper()) - ord("A") + 1
        row = int(row_str)
        return self.cell(row, col)

    def iter_rows(self, min_row=1, max_row=None, values_only=False):
        """Parcourt les lignes."""
        if max_row is None:
            max_row = self.max_row
        for row in range(min_row, max_row + 1):
            if values_only:
                yield tuple(
                    self._data.get((row, col), MockCell()).value
                    for col in range(1, self.max_column + 1)
                )
            else:
                yield tuple(
                    self._data.get((row, col), MockCell())
                    for col in range(1, self.max_column + 1)
                )

    def get_data_as_list(self):
        """Retourne toutes les données comme liste de listes."""
        result = []
        for row in range(1, self.max_row + 1):
            ligne = []
            for col in range(1, self.max_column + 1):
                cell = self._data.get((row, col), MockCell())
                ligne.append(cell.value)
            result.append(ligne)
        return result


class MockWorkbook:
    """Simule un classeur Excel."""
    def __init__(self):
        self.sheets = {}
        self.active = MockSheet("Sheet1")
        self.sheets["Sheet1"] = self.active
        self.saved_to = None

    def create_sheet(self, titre):
        """Crée une nouvelle feuille."""
        sheet = MockSheet(titre)
        self.sheets[titre] = sheet
        return sheet

    @property
    def sheetnames(self):
        return list(self.sheets.keys())

    def __getitem__(self, key):
        return self.sheets[key]

    def save(self, filename):
        self.saved_to = filename
        print(f"  [Mock] Fichier sauvegardé : {filename}")


class MockPdfPage:
    """Simule une page PDF."""
    def __init__(self, texte=""):
        self.texte = texte

    def extract_text(self):
        return self.texte


class MockPdfReader:
    """Simule un lecteur PDF."""
    def __init__(self, pages_texte):
        self.pages = [MockPdfPage(t) for t in pages_texte]
        self.metadata = {"title": "Document Mock", "author": "Python"}

    def __len__(self):
        return len(self.pages)


# ===== Fin des classes Mock =====


# Exercice 1 : Créer un rapport Excel
# --------------------------------------
# TODO: Utiliser MockWorkbook pour créer un rapport structuré

def creer_rapport_notes(etudiants):
    """
    Crée un rapport Excel de notes d'étudiants.

    etudiants est une liste de dicts :
    [{"nom": "Alice", "maths": 16, "physique": 14, "info": 18}, ...]

    Le rapport doit contenir :
    - Ligne 1 : En-têtes (Nom, Maths, Physique, Info, Moyenne, Mention)
    - Lignes suivantes : données des étudiants
    - Colonne Moyenne : moyenne des 3 notes (arrondie à 1 décimale)
    - Colonne Mention : "TB" (>=16), "B" (>=14), "AB" (>=12), "P" (>=10), "R" (<10)
    - Dernière ligne : "MOYENNES" avec la moyenne de chaque matière

    Retourne le MockWorkbook créé.

    Exemple:
        wb = creer_rapport_notes([{"nom": "Alice", "maths": 16, ...}])
    """
    # TODO: Créer le rapport
    pass


# Exercice 2 : Formules de tableur simulées
# --------------------------------------------
# TODO: Implémenter un évaluateur de formules simples

def evaluer_formule(feuille, formule):
    """
    Évalue une formule Excel simple sur une MockSheet.

    Formules supportées :
    - "=SUM(A1:A5)" → somme des cellules A1 à A5
    - "=AVERAGE(B2:B10)" → moyenne
    - "=COUNT(A1:A5)" → nombre de cellules non vides
    - "=MAX(A1:A5)" → valeur maximale
    - "=MIN(A1:A5)" → valeur minimale
    - "=A1+B1" → addition de deux cellules
    - "=A1*B1" → multiplication de deux cellules

    Retourne la valeur calculée ou None si erreur.

    Exemple:
        ws["A1"] = 10
        ws["A2"] = 20
        evaluer_formule(ws, "=SUM(A1:A2)") → 30
    """
    # TODO: Implémenter l'évaluateur
    pass


# Exercice 3 : Générer un rapport texte (simule PDF)
# -----------------------------------------------------
# TODO: Créer un rapport formaté en texte

def generer_rapport_texte(titre, sections, largeur=60):
    """
    Génère un rapport formaté en texte brut (simulation de PDF).

    titre (str) : titre du rapport
    sections (list) : liste de dicts avec :
        - "titre": titre de la section
        - "contenu": texte ou liste de lignes
        - "type": "texte", "tableau", ou "liste"
        - "donnees": (pour type "tableau") liste de dicts

    Le rapport doit inclure :
    - Bordure décorative
    - Titre centré
    - Numérotation automatique des sections
    - Tableaux formatés avec colonnes alignées
    - Numéro de page en bas

    Retourne le rapport comme une chaîne de caractères.

    Exemple:
        rapport = generer_rapport_texte("Rapport", [
            {"titre": "Introduction", "type": "texte",
             "contenu": "Bienvenue dans ce rapport."},
            {"titre": "Données", "type": "tableau",
             "donnees": [{"Nom": "Alice", "Note": 16}]}
        ])
    """
    # TODO: Générer le rapport
    pass


# Exercice 4 : Manipuler un PDF simulé
# ----------------------------------------
# TODO: Opérations sur des MockPdfReader

def extraire_texte_pdf(reader):
    """
    Extrait tout le texte d'un MockPdfReader.
    Retourne un dict avec :
    - "texte_complet": tout le texte concaténé
    - "par_page": liste du texte de chaque page
    - "nb_pages": nombre de pages
    - "nb_mots": nombre total de mots
    - "metadata": métadonnées du PDF
    """
    # TODO: Extraire le texte
    pass


def rechercher_dans_pdf(reader, terme):
    """
    Recherche un terme dans un PDF.
    Retourne une liste de dicts :
    [{"page": int, "occurrences": int, "contexte": str}, ...]

    Le contexte est un extrait de ~50 caractères autour de la première
    occurrence sur chaque page.
    """
    # TODO: Rechercher dans le PDF
    pass


def fusionner_pdfs(readers):
    """
    Fusionne plusieurs MockPdfReader en un seul.
    Retourne un nouveau MockPdfReader contenant toutes les pages.
    """
    # TODO: Fusionner les PDFs
    pass


# Exercice 5 : Pipeline de facturation
# ----------------------------------------
# TODO: Combiner Excel et rapport pour un système de facturation

def generer_facture(client, articles, numero_facture):
    """
    Génère une facture complète.

    client (dict) : {"nom": str, "adresse": str, "email": str}
    articles (list) : [{"description": str, "quantite": int,
                        "prix_unitaire": float}, ...]
    numero_facture (str) : ex: "FAC-2024-001"

    Retourne un dict avec :
    - "workbook": MockWorkbook avec les données de la facture
    - "rapport": rapport texte de la facture
    - "totaux": {
        "sous_total": float,
        "tva": float (20%),
        "total_ttc": float
      }
    """
    # TODO: Générer la facture complète
    pass


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Rapport Excel")
    print("=" * 50)

    etudiants = [
        {"nom": "Alice", "maths": 16, "physique": 14, "info": 18},
        {"nom": "Bob", "maths": 12, "physique": 10, "info": 15},
        {"nom": "Claire", "maths": 18, "physique": 17, "info": 19},
        {"nom": "David", "maths": 8, "physique": 9, "info": 11},
    ]
    wb = creer_rapport_notes(etudiants)
    if wb:
        ws = wb.active
        print("  Données du rapport :")
        for ligne in ws.get_data_as_list():
            print(f"    {ligne}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : Formules")
    print("=" * 50)

    ws = MockSheet("Test")
    for i, val in enumerate([10, 20, 30, 40, 50], 1):
        ws.cell(i, 1, val)  # A1:A5

    if evaluer_formule:
        print(f"  SUM(A1:A5) = {evaluer_formule(ws, '=SUM(A1:A5)')}")
        print(f"  AVERAGE(A1:A5) = {evaluer_formule(ws, '=AVERAGE(A1:A5)')}")
        print(f"  MAX(A1:A5) = {evaluer_formule(ws, '=MAX(A1:A5)')}")
        print(f"  COUNT(A1:A5) = {evaluer_formule(ws, '=COUNT(A1:A5)')}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : Rapport texte")
    print("=" * 50)

    rapport = generer_rapport_texte("Rapport Trimestriel", [
        {"titre": "Introduction", "type": "texte",
         "contenu": "Ce rapport présente les résultats du trimestre."},
        {"titre": "Résultats", "type": "tableau",
         "donnees": [
             {"Mois": "Janvier", "CA": "15000€", "Objectif": "12000€"},
             {"Mois": "Février", "CA": "18000€", "Objectif": "15000€"},
             {"Mois": "Mars", "CA": "22000€", "Objectif": "18000€"},
         ]},
        {"titre": "Conclusions", "type": "liste",
         "contenu": ["Objectifs dépassés", "Croissance de 20%", "Prévisions positives"]}
    ])
    if rapport:
        print(rapport)

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : PDF simulé")
    print("=" * 50)

    reader = MockPdfReader([
        "Chapitre 1 : Introduction\nCe document présente Python.",
        "Chapitre 2 : Variables\nLes variables stockent des données en Python.",
        "Chapitre 3 : Fonctions\nLes fonctions organisent le code Python."
    ])

    info = extraire_texte_pdf(reader)
    if info:
        print(f"  Pages : {info['nb_pages']}")
        print(f"  Mots : {info['nb_mots']}")

    resultats = rechercher_dans_pdf(reader, "Python")
    if resultats:
        for r in resultats:
            print(f"  Page {r['page']} : {r['occurrences']} occurrence(s)")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : Facturation")
    print("=" * 50)

    facture = generer_facture(
        client={"nom": "Entreprise ABC", "adresse": "123 Rue Python", "email": "contact@abc.com"},
        articles=[
            {"description": "Formation Python", "quantite": 2, "prix_unitaire": 1500.00},
            {"description": "Support technique", "quantite": 5, "prix_unitaire": 200.00},
            {"description": "Licence logiciel", "quantite": 1, "prix_unitaire": 499.99},
        ],
        numero_facture="FAC-2024-042"
    )
    if facture:
        print(f"  Sous-total : {facture['totaux']['sous_total']}€")
        print(f"  TVA (20%) : {facture['totaux']['tva']}€")
        print(f"  Total TTC : {facture['totaux']['total_ttc']}€")
        print(f"\n{facture['rapport']}")
