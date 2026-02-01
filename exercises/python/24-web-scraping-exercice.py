# =================================================
# Module 24 : Web Scraping
# Fichier d'exercice - À compléter
# =================================================
# NOTE : Ces exercices simulent le web scraping avec du HTML
# en chaînes de caractères (pas de requêtes réseau nécessaires).
# =================================================


# Exercice 1 : Parser du HTML simple
# ------------------------------------
# TODO: Extraire les informations d'articles depuis du HTML

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


def extraire_articles(html):
    """
    Extrait les articles d'un HTML de blog.
    Retourne une liste de dicts avec les clés :
    - "id": l'attribut data-id (string)
    - "titre": le texte du h2
    - "auteur": le texte du span.auteur
    - "date": le texte du span.date
    - "resume": le texte du p.resume
    - "lien": la valeur href du lien

    Indice : utiliser str.split(), str.find(), le slicing
    pour parser le HTML manuellement.

    Exemple de retour :
        [{"id": "1", "titre": "Introduction à Python", ...}, ...]
    """
    # TODO: Parser le HTML et extraire les informations
    pass


def filtrer_articles_par_auteur(articles, auteur):
    """
    Filtre une liste d'articles par nom d'auteur.
    La recherche est insensible à la casse.

    Exemple:
        filtrer_articles_par_auteur(articles, "alice")
        → [{"id": "1", "titre": "Introduction à Python", ...}]
    """
    # TODO: Filtrer les articles
    pass


# Exercice 2 : Extraire un tableau HTML
# ----------------------------------------
# TODO: Transformer un tableau HTML en données structurées

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


def parser_tableau(html):
    """
    Parse un tableau HTML et retourne une liste de dictionnaires.
    Les clés sont les en-têtes du tableau.
    Les valeurs numériques (Prix, Quantité) doivent être converties
    en float/int respectivement.

    Exemple de retour :
        [{"Produit": "Laptop Pro", "Prix": 1299.99, "Quantité": 45, "Catégorie": "Informatique"}, ...]
    """
    # TODO: Parser le tableau HTML
    pass


def calculer_statistiques_ventes(donnees):
    """
    Calcule des statistiques à partir des données du tableau.
    Retourne un dict avec :
    - "total_produits": nombre de produits
    - "prix_moyen": prix moyen (arrondi à 2 décimales)
    - "quantite_totale": somme des quantités
    - "chiffre_affaires": somme de (prix * quantité) pour chaque produit
    - "par_categorie": dict {catégorie: nombre_de_produits}

    Exemple:
        calculer_statistiques_ventes(donnees)
        → {"total_produits": 6, "prix_moyen": 358.16, ...}
    """
    # TODO: Calculer les statistiques
    pass


# Exercice 3 : Simuler une requête HTTP
# ----------------------------------------
# TODO: Créer un mock de réponse HTTP et l'utiliser

class MockResponse:
    """
    Simule un objet Response de la bibliothèque requests.
    Attributs :
    - status_code (int)
    - text (str) : contenu HTML
    - headers (dict)
    - url (str)
    - ok (bool) : True si status_code entre 200 et 299

    Méthodes :
    - json() : parse self.text comme JSON (si possible)
    - raise_for_status() : lève une Exception si status_code >= 400
    """

    def __init__(self, status_code, text="", headers=None, url=""):
        # TODO: Initialiser les attributs
        pass

    @property
    def ok(self):
        # TODO: Retourner True si le code est entre 200 et 299
        pass

    def json(self):
        # TODO: Parser self.text comme JSON
        # Lever une ValueError si le parsing échoue
        pass

    def raise_for_status(self):
        # TODO: Lever une Exception si status_code >= 400
        pass


def mock_get(url, timeout=10):
    """
    Simule requests.get() en retournant des MockResponse
    selon l'URL demandée.

    URLs supportées :
    - "https://api.example.com/produits" → 200, JSON avec liste de produits
    - "https://example.com/page" → 200, HTML simple
    - "https://example.com/interdit" → 403, "Accès interdit"
    - "https://example.com/introuvable" → 404, "Page non trouvée"
    - Toute autre URL → 500, "Erreur serveur"
    """
    # TODO: Implémenter le mock
    pass


# Exercice 4 : Nettoyer des données scrapées
# ---------------------------------------------
# TODO: Fonctions utilitaires pour le nettoyage de données web

def nettoyer_texte(texte):
    """
    Nettoie du texte extrait du web :
    - Supprime les espaces en début/fin
    - Remplace les multiples espaces par un seul
    - Supprime les retours à la ligne superflus
    - Remplace les entités HTML courantes (&amp; → &, &lt; → <, etc.)

    Exemple:
        nettoyer_texte("  Hello   &amp;  World  \\n\\n  ")
        → "Hello & World"
    """
    # TODO: Implémenter le nettoyage
    pass


def extraire_prix(texte):
    """
    Extrait un prix numérique d'une chaîne de caractères.
    Gère les formats : "1299.99€", "1 299,99 €", "$29.99", "29,99 EUR"

    Retourne un float ou None si aucun prix trouvé.

    Exemples:
        extraire_prix("1299.99€") → 1299.99
        extraire_prix("1 299,99 €") → 1299.99
        extraire_prix("$29.99") → 29.99
        extraire_prix("gratuit") → None
    """
    # TODO: Extraire et convertir le prix
    pass


def extraire_liens(html, base_url=""):
    """
    Extrait tous les liens (<a href="...">) d'un HTML.
    Si base_url est fourni, les URLs relatives sont converties en absolues.

    Retourne une liste de dicts : [{"texte": ..., "url": ...}, ...]

    Exemple:
        extraire_liens('<a href="/page">Lien</a>', "https://example.com")
        → [{"texte": "Lien", "url": "https://example.com/page"}]
    """
    # TODO: Parser les liens
    pass


# Exercice 5 : Pipeline de scraping complet
# --------------------------------------------
# TODO: Combiner toutes les fonctions dans un pipeline

def pipeline_scraping(html, config):
    """
    Exécute un pipeline de scraping complet.

    config est un dict avec :
    - "type": "articles" ou "tableau"
    - "filtres": dict de filtres à appliquer (optionnel)
      - Pour articles: {"auteur": "...", "date_apres": "YYYY-MM-DD"}
      - Pour tableau: {"categorie": "...", "prix_max": float}
    - "tri": {"cle": str, "reverse": bool} (optionnel)
    - "limite": int (optionnel)

    Étapes :
    1. Parser le HTML selon le type
    2. Appliquer les filtres
    3. Trier les résultats
    4. Limiter le nombre de résultats

    Retourne un dict avec :
    - "donnees": liste des résultats
    - "total": nombre total avant filtrage
    - "filtre": nombre après filtrage
    """
    # TODO: Implémenter le pipeline
    pass


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Parser du HTML")
    print("=" * 50)

    articles = extraire_articles(HTML_ARTICLES)
    if articles:
        for a in articles:
            print(f"  [{a.get('id')}] {a.get('titre')} - {a.get('auteur')}")

        filtres = filtrer_articles_par_auteur(articles, "alice")
        print(f"\n  Articles d'Alice : {len(filtres) if filtres else 0}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : Tableau HTML")
    print("=" * 50)

    donnees = parser_tableau(HTML_TABLEAU)
    if donnees:
        for d in donnees:
            print(f"  {d.get('Produit')} : {d.get('Prix')}€ x{d.get('Quantité')}")

        stats = calculer_statistiques_ventes(donnees)
        if stats:
            print(f"\n  Total produits : {stats.get('total_produits')}")
            print(f"  Prix moyen : {stats.get('prix_moyen')}€")
            print(f"  CA total : {stats.get('chiffre_affaires')}€")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : MockResponse")
    print("=" * 50)

    resp = mock_get("https://api.example.com/produits")
    if resp:
        print(f"  Status : {resp.status_code}")
        print(f"  OK : {resp.ok}")

    resp_404 = mock_get("https://example.com/introuvable")
    if resp_404:
        print(f"  404 Status : {resp_404.status_code}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : Nettoyage")
    print("=" * 50)

    print(f"  nettoyer: '{nettoyer_texte('  Hello   &amp;  World  ')}'")
    print(f"  prix: {extraire_prix('1 299,99 €')}")
    print(f"  prix: {extraire_prix('$29.99')}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : Pipeline")
    print("=" * 50)

    resultat = pipeline_scraping(HTML_TABLEAU, {
        "type": "tableau",
        "filtres": {"categorie": "Accessoires"},
        "tri": {"cle": "Prix", "reverse": False},
        "limite": 3
    })
    if resultat:
        print(f"  Total: {resultat.get('total')}, Filtré: {resultat.get('filtre')}")
        for d in resultat.get("donnees", []):
            print(f"    {d.get('Produit')} : {d.get('Prix')}€")
