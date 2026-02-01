# =================================================
# Module 26 : PDFs et Spreadsheets
# SOLUTION - Fichier corrigé
# =================================================

import re


# ===== Classes Mock (identiques à l'exercice) =====

class MockCell:
    def __init__(self, valeur=None):
        self.value = valeur
        self.font_bold = False
        self.fill_color = None
        self.alignment = "left"
        self.formula = None

    def __repr__(self):
        return f"Cell({self.value})"


class MockSheet:
    def __init__(self, titre="Sheet1"):
        self.title = titre
        self._data = {}
        self.max_row = 0
        self.max_column = 0

    def cell(self, row, column, value=None):
        if value is not None:
            self._data[(row, column)] = MockCell(value)
            self.max_row = max(self.max_row, row)
            self.max_column = max(self.max_column, column)
        return self._data.get((row, column), MockCell())

    def __setitem__(self, key, value):
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
        result = []
        for row in range(1, self.max_row + 1):
            ligne = []
            for col in range(1, self.max_column + 1):
                cell = self._data.get((row, col), MockCell())
                ligne.append(cell.value)
            result.append(ligne)
        return result


class MockWorkbook:
    def __init__(self):
        self.sheets = {}
        self.active = MockSheet("Sheet1")
        self.sheets["Sheet1"] = self.active
        self.saved_to = None

    def create_sheet(self, titre):
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
    def __init__(self, texte=""):
        self.texte = texte

    def extract_text(self):
        return self.texte


class MockPdfReader:
    def __init__(self, pages_texte):
        self.pages = [MockPdfPage(t) for t in pages_texte]
        self.metadata = {"title": "Document Mock", "author": "Python"}

    def __len__(self):
        return len(self.pages)


# ===== Solutions =====


# Exercice 1 : Créer un rapport Excel
# --------------------------------------
def creer_rapport_notes(etudiants):
    """Crée un rapport Excel de notes d'étudiants."""
    wb = MockWorkbook()
    ws = wb.active
    ws.title = "Notes"

    # En-têtes
    headers = ["Nom", "Maths", "Physique", "Info", "Moyenne", "Mention"]
    for col, header in enumerate(headers, 1):
        ws.cell(row=1, column=col, value=header)

    # Données
    for i, etudiant in enumerate(etudiants, start=2):
        ws.cell(row=i, column=1, value=etudiant["nom"])
        ws.cell(row=i, column=2, value=etudiant["maths"])
        ws.cell(row=i, column=3, value=etudiant["physique"])
        ws.cell(row=i, column=4, value=etudiant["info"])

        # Moyenne
        moyenne = round(
            (etudiant["maths"] + etudiant["physique"] + etudiant["info"]) / 3, 1
        )
        ws.cell(row=i, column=5, value=moyenne)

        # Mention
        if moyenne >= 16:
            mention = "TB"
        elif moyenne >= 14:
            mention = "B"
        elif moyenne >= 12:
            mention = "AB"
        elif moyenne >= 10:
            mention = "P"
        else:
            mention = "R"
        ws.cell(row=i, column=6, value=mention)

    # Ligne de moyennes
    derniere_ligne = len(etudiants) + 2
    ws.cell(row=derniere_ligne, column=1, value="MOYENNES")

    for col_idx, matiere in enumerate(["maths", "physique", "info"], start=2):
        moy = round(sum(e[matiere] for e in etudiants) / len(etudiants), 1)
        ws.cell(row=derniere_ligne, column=col_idx, value=moy)

    # Moyenne générale
    toutes_moyennes = []
    for i in range(2, len(etudiants) + 2):
        toutes_moyennes.append(ws.cell(i, 5).value)
    ws.cell(row=derniere_ligne, column=5,
            value=round(sum(toutes_moyennes) / len(toutes_moyennes), 1))

    return wb


# Exercice 2 : Formules de tableur simulées
# --------------------------------------------
def _parse_cell_ref(ref):
    """Convertit une référence comme 'A1' en (row, col)."""
    col_str, row_str = "", ""
    for c in ref.strip():
        if c.isalpha():
            col_str += c
        else:
            row_str += c
    col = ord(col_str.upper()) - ord("A") + 1
    row = int(row_str)
    return row, col


def _get_range_values(feuille, plage):
    """Extrait les valeurs d'une plage comme 'A1:A5'."""
    debut, fin = plage.split(":")
    row1, col1 = _parse_cell_ref(debut)
    row2, col2 = _parse_cell_ref(fin)

    valeurs = []
    for r in range(row1, row2 + 1):
        for c in range(col1, col2 + 1):
            cell = feuille.cell(r, c)
            if cell.value is not None:
                valeurs.append(cell.value)
    return valeurs


def evaluer_formule(feuille, formule):
    """Évalue une formule Excel simple sur une MockSheet."""
    if not formule or not formule.startswith("="):
        return None

    formule = formule[1:]  # Enlever le =

    # Fonctions de plage : SUM, AVERAGE, COUNT, MAX, MIN
    match = re.match(r'(SUM|AVERAGE|COUNT|MAX|MIN)\((.+)\)', formule, re.IGNORECASE)
    if match:
        func = match.group(1).upper()
        plage = match.group(2)
        valeurs = _get_range_values(feuille, plage)
        nums = [v for v in valeurs if isinstance(v, (int, float))]

        if not nums:
            return 0

        if func == "SUM":
            return sum(nums)
        elif func == "AVERAGE":
            return round(sum(nums) / len(nums), 2)
        elif func == "COUNT":
            return len(valeurs)
        elif func == "MAX":
            return max(nums)
        elif func == "MIN":
            return min(nums)

    # Opérations simples : A1+B1, A1*B1
    match = re.match(r'([A-Z]+\d+)\s*([+\-*/])\s*([A-Z]+\d+)', formule, re.IGNORECASE)
    if match:
        ref1, op, ref2 = match.groups()
        r1, c1 = _parse_cell_ref(ref1)
        r2, c2 = _parse_cell_ref(ref2)
        v1 = feuille.cell(r1, c1).value or 0
        v2 = feuille.cell(r2, c2).value or 0

        if op == "+":
            return v1 + v2
        elif op == "-":
            return v1 - v2
        elif op == "*":
            return v1 * v2
        elif op == "/" and v2 != 0:
            return v1 / v2

    return None


# Exercice 3 : Générer un rapport texte
# ----------------------------------------
def generer_rapport_texte(titre, sections, largeur=60):
    """Génère un rapport formaté en texte brut."""
    lignes = []

    # Bordure du haut
    lignes.append("=" * largeur)
    lignes.append(titre.center(largeur))
    lignes.append("=" * largeur)
    lignes.append("")

    for i, section in enumerate(sections, 1):
        # Titre de section
        lignes.append(f"{i}. {section['titre']}")
        lignes.append("-" * largeur)

        type_section = section.get("type", "texte")

        if type_section == "texte":
            contenu = section.get("contenu", "")
            if isinstance(contenu, list):
                for ligne in contenu:
                    lignes.append(f"  {ligne}")
            else:
                # Couper en lignes de largeur raisonnable
                mots = contenu.split()
                ligne_courante = " "
                for mot in mots:
                    if len(ligne_courante) + len(mot) + 1 > largeur - 2:
                        lignes.append(ligne_courante)
                        ligne_courante = "  " + mot
                    else:
                        ligne_courante += " " + mot
                if ligne_courante.strip():
                    lignes.append(ligne_courante)

        elif type_section == "tableau":
            donnees = section.get("donnees", [])
            if donnees:
                # Calculer les largeurs de colonnes
                cles = list(donnees[0].keys())
                largeurs = {cle: len(cle) for cle in cles}
                for d in donnees:
                    for cle in cles:
                        largeurs[cle] = max(largeurs[cle], len(str(d.get(cle, ""))))

                # En-tête
                header = "  | ".join(
                    str(cle).ljust(largeurs[cle]) for cle in cles
                )
                lignes.append(f"  {header}")
                sep = "  " + "+".join("-" * (largeurs[cle] + 2) for cle in cles)
                lignes.append(sep)

                # Données
                for d in donnees:
                    row = "  | ".join(
                        str(d.get(cle, "")).ljust(largeurs[cle]) for cle in cles
                    )
                    lignes.append(f"  {row}")

        elif type_section == "liste":
            contenu = section.get("contenu", [])
            for item in contenu:
                lignes.append(f"  • {item}")

        lignes.append("")

    # Pied de page
    lignes.append("-" * largeur)
    lignes.append("Page 1/1".center(largeur))
    lignes.append("=" * largeur)

    return "\n".join(lignes)


# Exercice 4 : Manipuler un PDF simulé
# ----------------------------------------
def extraire_texte_pdf(reader):
    """Extrait tout le texte d'un MockPdfReader."""
    par_page = [page.extract_text() for page in reader.pages]
    texte_complet = "\n".join(par_page)
    mots = texte_complet.split()

    return {
        "texte_complet": texte_complet,
        "par_page": par_page,
        "nb_pages": len(reader.pages),
        "nb_mots": len(mots),
        "metadata": reader.metadata
    }


def rechercher_dans_pdf(reader, terme):
    """Recherche un terme dans un PDF."""
    resultats = []

    for i, page in enumerate(reader.pages):
        texte = page.extract_text()
        terme_lower = terme.lower()
        texte_lower = texte.lower()

        occurrences = texte_lower.count(terme_lower)
        if occurrences > 0:
            # Trouver le contexte de la première occurrence
            pos = texte_lower.find(terme_lower)
            debut = max(0, pos - 25)
            fin = min(len(texte), pos + len(terme) + 25)
            contexte = texte[debut:fin].replace("\n", " ")
            if debut > 0:
                contexte = "..." + contexte
            if fin < len(texte):
                contexte = contexte + "..."

            resultats.append({
                "page": i + 1,
                "occurrences": occurrences,
                "contexte": contexte
            })

    return resultats


def fusionner_pdfs(readers):
    """Fusionne plusieurs MockPdfReader en un seul."""
    toutes_pages = []
    for reader in readers:
        for page in reader.pages:
            toutes_pages.append(page.extract_text())
    return MockPdfReader(toutes_pages)


# Exercice 5 : Pipeline de facturation
# ----------------------------------------
def generer_facture(client, articles, numero_facture):
    """Génère une facture complète."""
    # Calculs
    sous_total = sum(a["quantite"] * a["prix_unitaire"] for a in articles)
    tva = round(sous_total * 0.20, 2)
    total_ttc = round(sous_total + tva, 2)

    # Workbook Excel
    wb = MockWorkbook()
    ws = wb.active
    ws.title = "Facture"

    # En-tête facture
    ws.cell(1, 1, f"FACTURE {numero_facture}")
    ws.cell(2, 1, f"Client : {client['nom']}")
    ws.cell(3, 1, f"Adresse : {client['adresse']}")
    ws.cell(4, 1, f"Email : {client['email']}")

    # En-têtes colonnes
    headers = ["Description", "Quantité", "Prix Unitaire", "Total"]
    for col, h in enumerate(headers, 1):
        ws.cell(6, col, h)

    # Articles
    for i, article in enumerate(articles, 7):
        ws.cell(i, 1, article["description"])
        ws.cell(i, 2, article["quantite"])
        ws.cell(i, 3, article["prix_unitaire"])
        ws.cell(i, 4, round(article["quantite"] * article["prix_unitaire"], 2))

    # Totaux
    ligne_totaux = len(articles) + 8
    ws.cell(ligne_totaux, 3, "Sous-total HT")
    ws.cell(ligne_totaux, 4, round(sous_total, 2))
    ws.cell(ligne_totaux + 1, 3, "TVA (20%)")
    ws.cell(ligne_totaux + 1, 4, tva)
    ws.cell(ligne_totaux + 2, 3, "TOTAL TTC")
    ws.cell(ligne_totaux + 2, 4, total_ttc)

    # Rapport texte
    sections = [
        {
            "titre": "Informations Client",
            "type": "texte",
            "contenu": f"Nom: {client['nom']}\n  Adresse: {client['adresse']}\n  Email: {client['email']}"
        },
        {
            "titre": "Détail des Articles",
            "type": "tableau",
            "donnees": [
                {
                    "Description": a["description"],
                    "Qté": str(a["quantite"]),
                    "P.U.": f"{a['prix_unitaire']:.2f}€",
                    "Total": f"{a['quantite'] * a['prix_unitaire']:.2f}€"
                }
                for a in articles
            ]
        },
        {
            "titre": "Totaux",
            "type": "liste",
            "contenu": [
                f"Sous-total HT : {sous_total:.2f}€",
                f"TVA (20%) : {tva:.2f}€",
                f"Total TTC : {total_ttc:.2f}€"
            ]
        }
    ]

    rapport = generer_rapport_texte(f"FACTURE {numero_facture}", sections)

    return {
        "workbook": wb,
        "rapport": rapport,
        "totaux": {
            "sous_total": round(sous_total, 2),
            "tva": tva,
            "total_ttc": total_ttc
        }
    }


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
    ws = wb.active
    print("  Données du rapport :")
    for ligne in ws.get_data_as_list():
        print(f"    {ligne}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : Formules")
    print("=" * 50)

    ws = MockSheet("Test")
    for i, val in enumerate([10, 20, 30, 40, 50], 1):
        ws.cell(i, 1, val)
    ws.cell(1, 2, 5)
    ws.cell(2, 2, 3)

    print(f"  SUM(A1:A5) = {evaluer_formule(ws, '=SUM(A1:A5)')}")
    print(f"  AVERAGE(A1:A5) = {evaluer_formule(ws, '=AVERAGE(A1:A5)')}")
    print(f"  MAX(A1:A5) = {evaluer_formule(ws, '=MAX(A1:A5)')}")
    print(f"  MIN(A1:A5) = {evaluer_formule(ws, '=MIN(A1:A5)')}")
    print(f"  COUNT(A1:A5) = {evaluer_formule(ws, '=COUNT(A1:A5)')}")
    print(f"  A1+B1 = {evaluer_formule(ws, '=A1+B1')}")
    print(f"  A1*B1 = {evaluer_formule(ws, '=A1*B1')}")

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
    print(f"  Pages : {info['nb_pages']}")
    print(f"  Mots : {info['nb_mots']}")
    print(f"  Metadata : {info['metadata']}")

    resultats = rechercher_dans_pdf(reader, "Python")
    for r in resultats:
        print(f"  Page {r['page']} : {r['occurrences']} occ. | {r['contexte']}")

    # Test fusion
    reader2 = MockPdfReader(["Page bonus\nContenu supplémentaire."])
    fusionne = fusionner_pdfs([reader, reader2])
    print(f"  PDF fusionné : {len(fusionne.pages)} pages")

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
    print(f"  Sous-total : {facture['totaux']['sous_total']}€")
    print(f"  TVA (20%) : {facture['totaux']['tva']}€")
    print(f"  Total TTC : {facture['totaux']['total_ttc']}€")
    print(f"\n{facture['rapport']}")
