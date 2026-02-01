# =================================================
# Module 24 : Web Scraping
# SOLUTION - Fichier corrigé
# =================================================
# NOTE : Ces exercices simulent le web scraping avec du HTML
# en chaînes de caractères (pas de requêtes réseau nécessaires).
# =================================================

import json
import re


# Données HTML partagées
HTML_ARTICLES = """
<div class="blog">
  <article class="post" data-id="1">
    <h2 class="titre">Introduction à Python</h2>
    <span class="auteur">Alice Martin</span>
    <span class="date">2024-01-15</span>
    <p class="resume">Découvrez les bases du langage Python.</p>
    <a class="lien" href="/article/python-intro">Lire la suite</a>
  </article>
  <article class="post" data-id="2">
    <h2 class="titre">Web Scraping Avancé</h2>
    <span class="auteur">Bob Dupont</span>
    <span class="date">2024-02-20</span>
    <p class="resume">Techniques avancées de scraping en Python.</p>
    <a class="lien" href="/article/scraping-avance">Lire la suite</a>
  </article>
  <article class="post" data-id="3">
    <h2 class="titre">Machine Learning 101</h2>
    <span class="auteur">Claire Leroy</span>
    <span class="date">2024-03-10</span>
    <p class="resume">Premiers pas avec le machine learning.</p>
    <a class="lien" href="/article/ml-101">Lire la suite</a>
  </article>
</div>
"""

HTML_TABLEAU = """
<table id="ventes">
  <thead>
    <tr><th>Produit</th><th>Prix</th><th>Quantité</th><th>Catégorie</th></tr>
  </thead>
  <tbody>
    <tr><td>Laptop Pro</td><td>1299.99</td><td>45</td><td>Informatique</td></tr>
    <tr><td>Souris Sans Fil</td><td>29.99</td><td>230</td><td>Accessoires</td></tr>
    <tr><td>Écran 4K</td><td>549.00</td><td>78</td><td>Informatique</td></tr>
    <tr><td>Clavier Mécanique</td><td>89.99</td><td>156</td><td>Accessoires</td></tr>
    <tr><td>Webcam HD</td><td>69.99</td><td>92</td><td>Accessoires</td></tr>
    <tr><td>SSD 1To</td><td>109.99</td><td>340</td><td>Stockage</td></tr>
  </tbody>
</table>
"""


# Exercice 1 : Parser du HTML simple
# ------------------------------------
def extraire_articles(html):
    """Extrait les articles d'un HTML de blog."""
    articles = []
    blocs = html.split('<article class="post"')

    for bloc in blocs[1:]:  # Ignorer le premier split (avant le premier article)
        article = {}

        # ID
        match_id = re.search(r'data-id="(\d+)"', bloc)
        article["id"] = match_id.group(1) if match_id else ""

        # Titre
        match_titre = re.search(r'<h2 class="titre">(.*?)</h2>', bloc)
        article["titre"] = match_titre.group(1) if match_titre else ""

        # Auteur
        match_auteur = re.search(r'<span class="auteur">(.*?)</span>', bloc)
        article["auteur"] = match_auteur.group(1) if match_auteur else ""

        # Date
        match_date = re.search(r'<span class="date">(.*?)</span>', bloc)
        article["date"] = match_date.group(1) if match_date else ""

        # Résumé
        match_resume = re.search(r'<p class="resume">(.*?)</p>', bloc)
        article["resume"] = match_resume.group(1) if match_resume else ""

        # Lien
        match_lien = re.search(r'href="(.*?)"', bloc)
        article["lien"] = match_lien.group(1) if match_lien else ""

        articles.append(article)

    return articles


def filtrer_articles_par_auteur(articles, auteur):
    """Filtre une liste d'articles par nom d'auteur (insensible à la casse)."""
    return [a for a in articles if auteur.lower() in a["auteur"].lower()]


# Exercice 2 : Extraire un tableau HTML
# ----------------------------------------
def parser_tableau(html):
    """Parse un tableau HTML et retourne une liste de dictionnaires."""
    # Extraire les en-têtes
    headers = re.findall(r'<th>(.*?)</th>', html)

    # Extraire les lignes de données
    donnees = []
    lignes = re.findall(r'<tr><td>(.*?)</td></tr>', html.replace('\n', ''))

    # Alternative plus robuste : trouver chaque <tr> du tbody
    tbody = html.split('<tbody>')[1].split('</tbody>')[0]
    lignes_html = re.findall(r'<tr>(.*?)</tr>', tbody.replace('\n', ''))

    for ligne in lignes_html:
        cellules = re.findall(r'<td>(.*?)</td>', ligne)
        if len(cellules) == len(headers):
            ligne_dict = {}
            for i, header in enumerate(headers):
                valeur = cellules[i]
                # Conversion des types
                if header == "Prix":
                    valeur = float(valeur)
                elif header == "Quantité":
                    valeur = int(valeur)
                ligne_dict[header] = valeur
            donnees.append(ligne_dict)

    return donnees


def calculer_statistiques_ventes(donnees):
    """Calcule des statistiques à partir des données du tableau."""
    if not donnees:
        return {}

    prix = [d["Prix"] for d in donnees]
    quantites = [d["Quantité"] for d in donnees]

    # Chiffre d'affaires par produit
    ca_total = sum(d["Prix"] * d["Quantité"] for d in donnees)

    # Par catégorie
    par_categorie = {}
    for d in donnees:
        cat = d["Catégorie"]
        par_categorie[cat] = par_categorie.get(cat, 0) + 1

    return {
        "total_produits": len(donnees),
        "prix_moyen": round(sum(prix) / len(prix), 2),
        "quantite_totale": sum(quantites),
        "chiffre_affaires": round(ca_total, 2),
        "par_categorie": par_categorie
    }


# Exercice 3 : Simuler une requête HTTP
# ----------------------------------------
class MockResponse:
    """Simule un objet Response de la bibliothèque requests."""

    def __init__(self, status_code, text="", headers=None, url=""):
        self.status_code = status_code
        self.text = text
        self.headers = headers or {}
        self.url = url

    @property
    def ok(self):
        return 200 <= self.status_code < 300

    def json(self):
        try:
            return json.loads(self.text)
        except (json.JSONDecodeError, TypeError):
            raise ValueError(f"Impossible de parser le JSON : {self.text[:50]}")

    def raise_for_status(self):
        if self.status_code >= 400:
            raise Exception(f"HTTP Error {self.status_code} pour {self.url}")


def mock_get(url, timeout=10):
    """Simule requests.get() en retournant des MockResponse."""
    if url == "https://api.example.com/produits":
        data = json.dumps([
            {"id": 1, "nom": "Laptop", "prix": 999.99},
            {"id": 2, "nom": "Souris", "prix": 29.99},
            {"id": 3, "nom": "Clavier", "prix": 79.99}
        ])
        return MockResponse(200, data, {"Content-Type": "application/json"}, url)
    elif url == "https://example.com/page":
        html = "<html><body><h1>Bienvenue</h1></body></html>"
        return MockResponse(200, html, {"Content-Type": "text/html"}, url)
    elif url == "https://example.com/interdit":
        return MockResponse(403, "Accès interdit", {}, url)
    elif url == "https://example.com/introuvable":
        return MockResponse(404, "Page non trouvée", {}, url)
    else:
        return MockResponse(500, "Erreur serveur", {}, url)


# Exercice 4 : Nettoyer des données scrapées
# ---------------------------------------------
def nettoyer_texte(texte):
    """Nettoie du texte extrait du web."""
    if not texte:
        return ""

    # Remplacer les entités HTML
    entites = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'",
        "&nbsp;": " ",
    }
    for entite, remplacement in entites.items():
        texte = texte.replace(entite, remplacement)

    # Supprimer les retours à la ligne superflus
    texte = re.sub(r'\n+', ' ', texte)

    # Remplacer les multiples espaces
    texte = re.sub(r'\s+', ' ', texte)

    # Supprimer les espaces en début/fin
    return texte.strip()


def extraire_prix(texte):
    """Extrait un prix numérique d'une chaîne de caractères."""
    if not texte:
        return None

    # Supprimer les symboles de devise et espaces
    texte = texte.strip()
    texte = texte.replace("€", "").replace("$", "").replace("EUR", "")
    texte = texte.strip()

    # Supprimer les espaces dans les nombres (1 299 → 1299)
    texte = texte.replace(" ", "")

    # Gérer le format français (virgule comme séparateur décimal)
    if "," in texte and "." not in texte:
        texte = texte.replace(",", ".")
    elif "," in texte and "." in texte:
        # Format 1.299,99 → 1299.99
        texte = texte.replace(".", "").replace(",", ".")

    try:
        return float(texte)
    except ValueError:
        return None


def extraire_liens(html, base_url=""):
    """Extrait tous les liens d'un HTML."""
    liens = []
    pattern = r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>'

    for match in re.finditer(pattern, html, re.DOTALL):
        url = match.group(1).strip()
        texte = re.sub(r'<[^>]+>', '', match.group(2)).strip()

        # Convertir les URLs relatives en absolues
        if base_url and url.startswith("/"):
            url = base_url.rstrip("/") + url

        liens.append({"texte": texte, "url": url})

    return liens


# Exercice 5 : Pipeline de scraping complet
# --------------------------------------------
def pipeline_scraping(html, config):
    """Exécute un pipeline de scraping complet."""
    type_data = config.get("type", "tableau")
    filtres = config.get("filtres", {})
    tri = config.get("tri", None)
    limite = config.get("limite", None)

    # 1. Parser selon le type
    if type_data == "articles":
        donnees = extraire_articles(html)
    elif type_data == "tableau":
        donnees = parser_tableau(html)
    else:
        return {"donnees": [], "total": 0, "filtre": 0}

    total = len(donnees)

    # 2. Appliquer les filtres
    if filtres:
        if type_data == "articles":
            if "auteur" in filtres:
                donnees = filtrer_articles_par_auteur(donnees, filtres["auteur"])
            if "date_apres" in filtres:
                donnees = [a for a in donnees if a.get("date", "") >= filtres["date_apres"]]
        elif type_data == "tableau":
            if "categorie" in filtres:
                donnees = [d for d in donnees if d.get("Catégorie") == filtres["categorie"]]
            if "prix_max" in filtres:
                donnees = [d for d in donnees if d.get("Prix", 0) <= filtres["prix_max"]]

    filtre_count = len(donnees)

    # 3. Trier
    if tri and "cle" in tri:
        cle = tri["cle"]
        reverse = tri.get("reverse", False)
        donnees = sorted(donnees, key=lambda x: x.get(cle, 0), reverse=reverse)

    # 4. Limiter
    if limite and limite > 0:
        donnees = donnees[:limite]

    return {
        "donnees": donnees,
        "total": total,
        "filtre": filtre_count
    }


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Parser du HTML")
    print("=" * 50)

    articles = extraire_articles(HTML_ARTICLES)
    for a in articles:
        print(f"  [{a['id']}] {a['titre']} - {a['auteur']} ({a['date']})")

    filtres = filtrer_articles_par_auteur(articles, "alice")
    print(f"\n  Articles d'Alice : {len(filtres)}")
    for a in filtres:
        print(f"    → {a['titre']}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : Tableau HTML")
    print("=" * 50)

    donnees = parser_tableau(HTML_TABLEAU)
    for d in donnees:
        print(f"  {d['Produit']} : {d['Prix']}€ x{d['Quantité']} ({d['Catégorie']})")

    stats = calculer_statistiques_ventes(donnees)
    print(f"\n  Total produits : {stats['total_produits']}")
    print(f"  Prix moyen : {stats['prix_moyen']}€")
    print(f"  Quantité totale : {stats['quantite_totale']}")
    print(f"  CA total : {stats['chiffre_affaires']}€")
    print(f"  Par catégorie : {stats['par_categorie']}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : MockResponse")
    print("=" * 50)

    resp = mock_get("https://api.example.com/produits")
    print(f"  Status : {resp.status_code}, OK : {resp.ok}")
    print(f"  JSON : {resp.json()}")

    resp_404 = mock_get("https://example.com/introuvable")
    print(f"  404 Status : {resp_404.status_code}, OK : {resp_404.ok}")
    try:
        resp_404.raise_for_status()
    except Exception as e:
        print(f"  Exception : {e}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : Nettoyage")
    print("=" * 50)

    print(f"  nettoyer: '{nettoyer_texte('  Hello   &amp;  World  ')}'")
    print(f"  prix 1299.99€: {extraire_prix('1299.99€')}")
    print(f"  prix 1 299,99 €: {extraire_prix('1 299,99 €')}")
    print(f"  prix $29.99: {extraire_prix('$29.99')}")
    print(f"  prix gratuit: {extraire_prix('gratuit')}")

    liens = extraire_liens(
        '<a href="/page1">Lien 1</a> <a href="https://other.com">Lien 2</a>',
        "https://example.com"
    )
    print(f"  Liens : {liens}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : Pipeline")
    print("=" * 50)

    resultat = pipeline_scraping(HTML_TABLEAU, {
        "type": "tableau",
        "filtres": {"categorie": "Accessoires"},
        "tri": {"cle": "Prix", "reverse": False},
        "limite": 3
    })
    print(f"  Total: {resultat['total']}, Filtré: {resultat['filtre']}")
    for d in resultat["donnees"]:
        print(f"    {d['Produit']} : {d['Prix']}€")

    resultat2 = pipeline_scraping(HTML_ARTICLES, {
        "type": "articles",
        "filtres": {"date_apres": "2024-02-01"},
        "tri": {"cle": "date", "reverse": True}
    })
    print(f"\n  Articles après 2024-02-01 : {resultat2['filtre']}")
    for a in resultat2["donnees"]:
        print(f"    {a['titre']} ({a['date']})")
