# =================================================
# Module 25 : Manipulation d'Images
# SOLUTION - Fichier corrigé
# =================================================
# NOTE : Ces exercices simulent la manipulation d'images
# avec des grilles de pixels (listes 2D). Pas besoin de Pillow.
# =================================================


# Exercice 1 : Représentation d'images comme grilles de pixels
# ---------------------------------------------------------------
def creer_image(largeur, hauteur, couleur=(0, 0, 0)):
    """Crée une image (liste 2D de tuples RGB)."""
    return [[couleur for _ in range(largeur)] for _ in range(hauteur)]


def get_pixel(image, x, y):
    """Retourne le pixel aux coordonnées (x, y)."""
    if not image:
        return None
    hauteur = len(image)
    largeur = len(image[0])
    if 0 <= x < largeur and 0 <= y < hauteur:
        return image[y][x]
    return None


def set_pixel(image, x, y, couleur):
    """Modifie le pixel aux coordonnées (x, y)."""
    if not image:
        return False
    hauteur = len(image)
    largeur = len(image[0])
    if 0 <= x < largeur and 0 <= y < hauteur:
        image[y][x] = couleur
        return True
    return False


def dessiner_rectangle(image, x1, y1, x2, y2, couleur):
    """Dessine un rectangle rempli sur l'image."""
    if not image:
        return
    hauteur = len(image)
    largeur = len(image[0])
    for y in range(max(0, y1), min(hauteur, y2 + 1)):
        for x in range(max(0, x1), min(largeur, x2 + 1)):
            image[y][x] = couleur


def afficher_image(image):
    """Affiche une image en ASCII art."""
    if not image:
        return
    for ligne in image:
        row = ""
        for pixel in ligne:
            luminosite = sum(pixel) / 3
            if luminosite > 200:
                row += " "
            elif luminosite > 150:
                row += "."
            elif luminosite > 100:
                row += "o"
            elif luminosite > 50:
                row += "#"
            else:
                row += "@"
        print(f"    {row}")


# Exercice 2 : Redimensionnement naïf
# --------------------------------------
def redimensionner(image, nouvelle_largeur, nouvelle_hauteur):
    """Redimensionne une image par plus proche voisin."""
    if not image:
        return None
    ancien_h = len(image)
    ancien_w = len(image[0])

    nouvelle_image = []
    for ny in range(nouvelle_hauteur):
        ligne = []
        for nx in range(nouvelle_largeur):
            # Coordonnées source
            sx = int(nx * ancien_w / nouvelle_largeur)
            sy = int(ny * ancien_h / nouvelle_hauteur)
            # Clamper
            sx = min(sx, ancien_w - 1)
            sy = min(sy, ancien_h - 1)
            ligne.append(image[sy][sx])
        nouvelle_image.append(ligne)

    return nouvelle_image


def creer_thumbnail(image, taille_max):
    """Crée un thumbnail en gardant les proportions."""
    if not image:
        return None
    hauteur = len(image)
    largeur = len(image[0])

    ratio = min(taille_max / largeur, taille_max / hauteur)
    if ratio >= 1:
        return [ligne[:] for ligne in image]  # Copie

    nouvelle_largeur = max(1, int(largeur * ratio))
    nouvelle_hauteur = max(1, int(hauteur * ratio))

    return redimensionner(image, nouvelle_largeur, nouvelle_hauteur)


# Exercice 3 : Filtres d'image
# -------------------------------------------------------
def convertir_niveaux_gris(image):
    """Convertit une image RGB en niveaux de gris."""
    if not image:
        return None
    nouvelle = []
    for ligne in image:
        nouvelle_ligne = []
        for r, g, b in ligne:
            gris = int(0.299 * r + 0.587 * g + 0.114 * b)
            gris = max(0, min(255, gris))
            nouvelle_ligne.append((gris, gris, gris))
        nouvelle.append(nouvelle_ligne)
    return nouvelle


def ajuster_luminosite(image, facteur):
    """Ajuste la luminosité d'une image."""
    if not image:
        return None
    nouvelle = []
    for ligne in image:
        nouvelle_ligne = []
        for r, g, b in ligne:
            nr = max(0, min(255, int(r * facteur)))
            ng = max(0, min(255, int(g * facteur)))
            nb = max(0, min(255, int(b * facteur)))
            nouvelle_ligne.append((nr, ng, nb))
        nouvelle.append(nouvelle_ligne)
    return nouvelle


def inverser_couleurs(image):
    """Inverse les couleurs d'une image (négatif)."""
    if not image:
        return None
    return [[(255 - r, 255 - g, 255 - b) for r, g, b in ligne] for ligne in image]


def appliquer_filtre_moyennage(image, rayon=1):
    """Applique un filtre de moyennage (flou)."""
    if not image:
        return None
    hauteur = len(image)
    largeur = len(image[0])
    nouvelle = []

    for y in range(hauteur):
        nouvelle_ligne = []
        for x in range(largeur):
            total_r, total_g, total_b = 0, 0, 0
            compte = 0
            for dy in range(-rayon, rayon + 1):
                for dx in range(-rayon, rayon + 1):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < hauteur and 0 <= nx < largeur:
                        r, g, b = image[ny][nx]
                        total_r += r
                        total_g += g
                        total_b += b
                        compte += 1
            nouvelle_ligne.append((
                total_r // compte,
                total_g // compte,
                total_b // compte
            ))
        nouvelle.append(nouvelle_ligne)

    return nouvelle


# Exercice 4 : Histogramme de couleurs
# ---------------------------------------
def histogramme_rgb(image):
    """Calcule l'histogramme RGB d'une image."""
    if not image:
        return None
    hist = {"R": [0] * 256, "G": [0] * 256, "B": [0] * 256}

    for ligne in image:
        for r, g, b in ligne:
            hist["R"][r] += 1
            hist["G"][g] += 1
            hist["B"][b] += 1

    return hist


def couleur_dominante(image):
    """Trouve la couleur dominante d'une image."""
    if not image:
        return None
    total_r, total_g, total_b = 0, 0, 0
    total_pixels = 0

    for ligne in image:
        for r, g, b in ligne:
            total_r += r
            total_g += g
            total_b += b
            total_pixels += 1

    if total_pixels == 0:
        return (0, 0, 0)

    return (
        round(total_r / total_pixels),
        round(total_g / total_pixels),
        round(total_b / total_pixels)
    )


def afficher_histogramme_ascii(histogramme, canal="R", largeur=50):
    """Affiche un histogramme simplifié en ASCII."""
    if not histogramme or canal not in histogramme:
        return

    print(f"    Canal {canal} :")
    valeurs = histogramme[canal]

    # Regrouper en 8 intervalles
    intervalles = []
    for i in range(8):
        debut = i * 32
        fin = min((i + 1) * 32, 256)
        total = sum(valeurs[debut:fin])
        intervalles.append((f"{debut}-{fin-1}", total))

    # Trouver le max pour normaliser
    max_val = max(v for _, v in intervalles) if intervalles else 1
    if max_val == 0:
        max_val = 1

    for label, valeur in intervalles:
        nb_barres = int(valeur / max_val * largeur)
        barre = "█" * nb_barres
        print(f"    {label:>7} : {barre} ({valeur})")


# Exercice 5 : Pipeline de traitement d'images
# ------------------------------------------------
def pipeline_image(image, operations):
    """Applique une série d'opérations sur une image."""
    if not image:
        return None, []

    # Copie profonde de l'image
    resultat = [ligne[:] for ligne in image]
    log = []

    for op in operations:
        action = op.get("action")

        if action == "redimensionner":
            resultat = redimensionner(resultat, op["largeur"], op["hauteur"])
            log.append(f"Redimensionné à {op['largeur']}x{op['hauteur']}")

        elif action == "niveaux_gris":
            resultat = convertir_niveaux_gris(resultat)
            log.append("Converti en niveaux de gris")

        elif action == "luminosite":
            resultat = ajuster_luminosite(resultat, op["facteur"])
            log.append(f"Luminosité ajustée (facteur={op['facteur']})")

        elif action == "inverser":
            resultat = inverser_couleurs(resultat)
            log.append("Couleurs inversées")

        elif action == "flou":
            resultat = appliquer_filtre_moyennage(resultat, op.get("rayon", 1))
            log.append(f"Flou appliqué (rayon={op.get('rayon', 1)})")

        elif action == "rectangle":
            dessiner_rectangle(
                resultat,
                op["x1"], op["y1"], op["x2"], op["y2"],
                op["couleur"]
            )
            log.append(f"Rectangle ({op['x1']},{op['y1']})-({op['x2']},{op['y2']})")

        else:
            log.append(f"Action inconnue : {action}")

    return resultat, log


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Grille de pixels")
    print("=" * 50)

    img = creer_image(10, 8, (255, 255, 255))
    dessiner_rectangle(img, 2, 1, 7, 6, (0, 0, 200))
    dessiner_rectangle(img, 4, 3, 5, 4, (255, 255, 0))
    print("  Image avec rectangles :")
    afficher_image(img)

    print(f"\n  Pixel (0,0) : {get_pixel(img, 0, 0)}")
    print(f"  Pixel (3,2) : {get_pixel(img, 3, 2)}")
    print(f"  Pixel (4,3) : {get_pixel(img, 4, 3)}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : Redimensionnement")
    print("=" * 50)

    img = creer_image(8, 6, (100, 150, 200))
    dessiner_rectangle(img, 1, 1, 6, 4, (255, 0, 0))
    print("  Original :")
    afficher_image(img)

    small = redimensionner(img, 4, 3)
    print(f"\n  Réduit ({len(small[0])}x{len(small)}) :")
    afficher_image(small)

    thumb = creer_thumbnail(img, 4)
    print(f"\n  Thumbnail ({len(thumb[0])}x{len(thumb)}) :")
    afficher_image(thumb)

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : Filtres")
    print("=" * 50)

    img = creer_image(8, 6, (200, 100, 50))
    dessiner_rectangle(img, 2, 1, 5, 4, (50, 200, 100))
    print("  Original :")
    afficher_image(img)

    gris = convertir_niveaux_gris(img)
    print("\n  Niveaux de gris :")
    afficher_image(gris)

    claire = ajuster_luminosite(img, 1.5)
    print("\n  Plus clair (x1.5) :")
    afficher_image(claire)

    inverse = inverser_couleurs(img)
    print("\n  Inversé :")
    afficher_image(inverse)

    flou = appliquer_filtre_moyennage(img, 1)
    print("\n  Flou (rayon=1) :")
    afficher_image(flou)

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : Histogramme")
    print("=" * 50)

    img = creer_image(5, 5, (200, 50, 100))
    dessiner_rectangle(img, 1, 1, 3, 3, (100, 200, 50))
    dominant = couleur_dominante(img)
    print(f"  Couleur dominante : {dominant}")

    hist = histogramme_rgb(img)
    afficher_histogramme_ascii(hist, "R")
    afficher_histogramme_ascii(hist, "G")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : Pipeline")
    print("=" * 50)

    img = creer_image(10, 10, (200, 200, 200))
    image_result, log = pipeline_image(img, [
        {"action": "rectangle", "x1": 2, "y1": 2, "x2": 7, "y2": 7, "couleur": (255, 0, 0)},
        {"action": "luminosite", "facteur": 0.8},
        {"action": "redimensionner", "largeur": 5, "hauteur": 5}
    ])
    print(f"  Opérations effectuées :")
    for l in log:
        print(f"    → {l}")
    print(f"  Taille finale : {len(image_result[0])}x{len(image_result)}")
    print("  Résultat :")
    afficher_image(image_result)
