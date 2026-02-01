# =================================================
# Module 25 : Manipulation d'Images
# Fichier d'exercice - À compléter
# =================================================
# NOTE : Ces exercices simulent la manipulation d'images
# avec des grilles de pixels (listes 2D). Pas besoin de Pillow.
# =================================================


# Exercice 1 : Représentation d'images comme grilles de pixels
# ---------------------------------------------------------------
# TODO: Créer et manipuler des images comme listes 2D

def creer_image(largeur, hauteur, couleur=(0, 0, 0)):
    """
    Crée une image (liste 2D de tuples RGB).

    Chaque pixel est un tuple (R, G, B) avec des valeurs 0-255.
    L'image est une liste de lignes, chaque ligne est une liste de pixels.

    Exemple:
        creer_image(3, 2, (255, 0, 0))
        → [[(255,0,0), (255,0,0), (255,0,0)],
           [(255,0,0), (255,0,0), (255,0,0)]]
    """
    # TODO: Créer la grille de pixels
    pass


def get_pixel(image, x, y):
    """
    Retourne le pixel aux coordonnées (x, y).
    x = colonne, y = ligne (0-indexed).
    Retourne None si hors limites.

    Exemple:
        get_pixel(img, 0, 0) → (255, 0, 0)
    """
    # TODO: Retourner le pixel
    pass


def set_pixel(image, x, y, couleur):
    """
    Modifie le pixel aux coordonnées (x, y).
    Retourne True si succès, False si hors limites.
    """
    # TODO: Modifier le pixel
    pass


def dessiner_rectangle(image, x1, y1, x2, y2, couleur):
    """
    Dessine un rectangle rempli sur l'image.
    (x1, y1) = coin supérieur gauche
    (x2, y2) = coin inférieur droit

    Exemple:
        img = creer_image(10, 10, (255, 255, 255))
        dessiner_rectangle(img, 2, 2, 7, 5, (255, 0, 0))
    """
    # TODO: Dessiner le rectangle
    pass


def afficher_image(image):
    """
    Affiche une image en ASCII art.
    Chaque pixel est représenté par un caractère selon sa luminosité :
    - Très clair (>200) : ' ' (espace)
    - Clair (>150) : '.'
    - Moyen (>100) : 'o'
    - Sombre (>50) : '#'
    - Très sombre : '@'

    La luminosité = (R + G + B) / 3
    """
    # TODO: Afficher l'image en ASCII
    pass


# Exercice 2 : Redimensionnement naïf
# --------------------------------------
# TODO: Implémenter un redimensionnement par échantillonnage

def redimensionner(image, nouvelle_largeur, nouvelle_hauteur):
    """
    Redimensionne une image par plus proche voisin (nearest neighbor).

    Pour chaque pixel (nx, ny) de la nouvelle image :
    - Calculer les coordonnées source : sx = nx * ancien_w / nouveau_w
    - Prendre le pixel le plus proche : (int(sx), int(sy))

    Exemple:
        img = creer_image(4, 4, (255, 0, 0))
        img_small = redimensionner(img, 2, 2)  # 2x2 pixels
    """
    # TODO: Implémenter le redimensionnement
    pass


def creer_thumbnail(image, taille_max):
    """
    Crée un thumbnail qui tient dans taille_max x taille_max
    en gardant les proportions.

    Exemple:
        img = creer_image(800, 600)
        thumb = creer_thumbnail(img, 200)
        # → image 200x150 (proportions gardées)
    """
    # TODO: Calculer la taille et redimensionner
    pass


# Exercice 3 : Filtres d'image (convolution simplifiée)
# -------------------------------------------------------
# TODO: Appliquer des filtres sur les pixels

def convertir_niveaux_gris(image):
    """
    Convertit une image RGB en niveaux de gris.
    Formule : gris = int(0.299 * R + 0.587 * G + 0.114 * B)

    Retourne une nouvelle image où chaque pixel est (gris, gris, gris).

    Exemple:
        pixel_rouge = (255, 0, 0)
        → gris = int(0.299 * 255) = 76
        → (76, 76, 76)
    """
    # TODO: Convertir en niveaux de gris
    pass


def ajuster_luminosite(image, facteur):
    """
    Ajuste la luminosité d'une image.
    facteur > 1.0 = plus clair, facteur < 1.0 = plus sombre.
    Les valeurs sont clampées entre 0 et 255.

    Exemple:
        img_claire = ajuster_luminosite(img, 1.5)  # 50% plus clair
    """
    # TODO: Ajuster la luminosité
    pass


def inverser_couleurs(image):
    """
    Inverse les couleurs d'une image (négatif).
    Nouveau pixel = (255 - R, 255 - G, 255 - B)
    """
    # TODO: Inverser les couleurs
    pass


def appliquer_filtre_moyennage(image, rayon=1):
    """
    Applique un filtre de moyennage (flou) sur l'image.
    Pour chaque pixel, la nouvelle valeur est la moyenne des pixels
    dans un carré de côté (2*rayon + 1) centré sur le pixel.

    Les pixels hors limites sont ignorés.

    Exemple avec rayon=1 :
        Le pixel (x, y) devient la moyenne des 9 pixels
        de (x-1,y-1) à (x+1,y+1)
    """
    # TODO: Appliquer le filtre de moyennage
    pass


# Exercice 4 : Histogramme de couleurs
# ---------------------------------------
# TODO: Analyser la distribution des couleurs

def histogramme_rgb(image):
    """
    Calcule l'histogramme RGB d'une image.
    Retourne un dict avec 3 clés ("R", "G", "B"),
    chacune contenant une liste de 256 valeurs
    (nombre de pixels ayant cette intensité).

    Exemple:
        hist = histogramme_rgb(img)
        hist["R"][255]  # Nombre de pixels avec R=255
    """
    # TODO: Calculer l'histogramme
    pass


def couleur_dominante(image):
    """
    Trouve la couleur dominante d'une image.
    Calcule la moyenne de chaque canal (R, G, B).

    Retourne un tuple (R_moy, G_moy, B_moy) arrondi à l'entier.

    Exemple:
        couleur_dominante(img_rouge) → (255, 0, 0)
    """
    # TODO: Calculer la couleur dominante
    pass


def afficher_histogramme_ascii(histogramme, canal="R", largeur=50):
    """
    Affiche un histogramme simplifié en ASCII.
    Regroupe les 256 valeurs en 8 intervalles (0-31, 32-63, ..., 224-255).
    Affiche une barre horizontale proportionnelle au nombre de pixels.

    Exemple de sortie :
        R Channel:
        0-31   : ████████████
        32-63  : ████
        ...
    """
    # TODO: Afficher l'histogramme
    pass


# Exercice 5 : Pipeline de traitement d'images
# ------------------------------------------------
# TODO: Combiner les opérations dans un pipeline

def pipeline_image(image, operations):
    """
    Applique une série d'opérations sur une image.

    operations est une liste de dicts, chacun avec :
    - "action": nom de l'opération
    - Paramètres spécifiques à l'opération

    Actions supportées :
    - {"action": "redimensionner", "largeur": int, "hauteur": int}
    - {"action": "niveaux_gris"}
    - {"action": "luminosite", "facteur": float}
    - {"action": "inverser"}
    - {"action": "flou", "rayon": int}
    - {"action": "rectangle", "x1": int, "y1": int, "x2": int, "y2": int, "couleur": tuple}

    Retourne l'image transformée et un log des opérations effectuées.
    """
    # TODO: Implémenter le pipeline
    pass


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Grille de pixels")
    print("=" * 50)

    img = creer_image(10, 8, (255, 255, 255))
    if img:
        dessiner_rectangle(img, 2, 1, 7, 6, (0, 0, 200))
        dessiner_rectangle(img, 4, 3, 5, 4, (255, 255, 0))
        print("  Image avec rectangles :")
        afficher_image(img)

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : Redimensionnement")
    print("=" * 50)

    img = creer_image(8, 6, (100, 150, 200))
    if img:
        dessiner_rectangle(img, 1, 1, 6, 4, (255, 0, 0))
        small = redimensionner(img, 4, 3)
        if small:
            print(f"  Original : {len(img[0])}x{len(img)}")
            print(f"  Réduit : {len(small[0])}x{len(small)}")

        thumb = creer_thumbnail(img, 4)
        if thumb:
            print(f"  Thumbnail : {len(thumb[0])}x{len(thumb)}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : Filtres")
    print("=" * 50)

    img = creer_image(6, 6, (200, 100, 50))
    if img:
        dessiner_rectangle(img, 1, 1, 4, 4, (50, 200, 100))

        gris = convertir_niveaux_gris(img)
        if gris:
            print("  Niveaux de gris :")
            afficher_image(gris)

        claire = ajuster_luminosite(img, 1.5)
        if claire:
            print("  Plus clair :")
            afficher_image(claire)

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : Histogramme")
    print("=" * 50)

    img = creer_image(5, 5, (200, 50, 100))
    if img:
        dessiner_rectangle(img, 1, 1, 3, 3, (100, 200, 50))
        dominant = couleur_dominante(img)
        if dominant:
            print(f"  Couleur dominante : {dominant}")

        hist = histogramme_rgb(img)
        if hist:
            afficher_histogramme_ascii(hist, "R")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : Pipeline")
    print("=" * 50)

    img = creer_image(10, 10, (200, 200, 200))
    if img:
        result = pipeline_image(img, [
            {"action": "rectangle", "x1": 2, "y1": 2, "x2": 7, "y2": 7, "couleur": (255, 0, 0)},
            {"action": "luminosite", "facteur": 0.8},
            {"action": "redimensionner", "largeur": 5, "hauteur": 5}
        ])
        if result:
            image_result, log = result
            print(f"  Opérations : {log}")
            print(f"  Taille finale : {len(image_result[0])}x{len(image_result)}")
            afficher_image(image_result)
