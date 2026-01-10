# =================================================
# Module 5 : Tuples et Sets
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Unpacking de coordonnées
# --------------------------------------
point = (3, 4)

# Unpacking : extraire les valeurs dans des variables
x, y = point

# Calculer la distance avec le théorème de Pythagore
distance = (x ** 2 + y ** 2) ** 0.5

print(f"Point: {point}")
print(f"x = {x}, y = {y}")
print(f"Distance à l'origine: {distance}")
# Résultat: Distance à l'origine: 5.0


# Exercice 2 : Retourner plusieurs valeurs
# -----------------------------------------
def statistiques(nombres):
    """Retourne (minimum, maximum, moyenne) d'une liste."""
    if not nombres:
        return None, None, None
    
    minimum = min(nombres)
    maximum = max(nombres)
    moyenne = sum(nombres) / len(nombres)
    
    return minimum, maximum, moyenne

# Test
valeurs = [23, 45, 12, 67, 34, 89, 5]
mini, maxi, moy = statistiques(valeurs)
print(f"Min: {mini}, Max: {maxi}, Moyenne: {moy:.2f}")
# Résultat: Min: 5, Max: 89, Moyenne: 39.29


# Exercice 3 : Échange de variables
# -----------------------------------
a = 10
b = 20
print(f"Avant: a = {a}, b = {b}")

# L'unpacking permet d'échanger en une ligne !
a, b = b, a

print(f"Après: a = {a}, b = {b}")
# Résultat: Après: a = 20, b = 10


# Exercice 4 : Dédupliquer une liste
# ------------------------------------
nombres_avec_doublons = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]

# Méthode 1 : Conversion en set puis en liste (ordre non garanti)
nombres_uniques = list(set(nombres_avec_doublons))

# Méthode 2 : Préserver l'ordre avec dict.fromkeys() (Python 3.7+)
nombres_uniques_ordonnees = list(dict.fromkeys(nombres_avec_doublons))

print(f"Avec doublons: {nombres_avec_doublons}")
print(f"Sans doublons: {nombres_uniques}")
print(f"Sans doublons (ordonné): {nombres_uniques_ordonnees}")
# Résultat: [1, 2, 3, 4, 5]


# Exercice 5 : Éléments communs entre deux listes
# ------------------------------------------------
liste_a = [1, 2, 3, 4, 5, 6]
liste_b = [4, 5, 6, 7, 8, 9]

# Intersection : éléments dans les deux
communs = set(liste_a) & set(liste_b)
# Alternative: set(liste_a).intersection(set(liste_b))

# Différence : éléments uniquement dans A
uniques_a = set(liste_a) - set(liste_b)

# Différence : éléments uniquement dans B
uniques_b = set(liste_b) - set(liste_a)

# Union : tous les éléments
tous = set(liste_a) | set(liste_b)

print(f"Éléments communs: {communs}")      # {4, 5, 6}
print(f"Uniques à A: {uniques_a}")         # {1, 2, 3}
print(f"Uniques à B: {uniques_b}")         # {7, 8, 9}
print(f"Tous les éléments: {tous}")        # {1, 2, 3, 4, 5, 6, 7, 8, 9}


# =================================================
# Bonus : Tuple comme clé de dictionnaire
# =================================================
# Les tuples sont hashables, donc utilisables comme clés !

villes = {
    (48.8566, 2.3522): "Paris",
    (51.5074, -0.1278): "Londres",
    (40.7128, -74.0060): "New York",
    (35.6762, 139.6503): "Tokyo"
}

# Rechercher une ville par ses coordonnées
coords_paris = (48.8566, 2.3522)
print(f"Ville à {coords_paris}: {villes[coords_paris]}")
# Résultat: Paris

# Parcourir toutes les villes
print("\n📍 Toutes les villes:")
for coords, ville in villes.items():
    lat, lon = coords
    print(f"  {ville}: latitude={lat}, longitude={lon}")


# Bonus supplémentaire : Named Tuples pour plus de lisibilité
from collections import namedtuple

Coordonnees = namedtuple('Coordonnees', ['latitude', 'longitude'])

point_paris = Coordonnees(48.8566, 2.3522)
print(f"\nNamed tuple: {point_paris}")
print(f"Latitude: {point_paris.latitude}")
print(f"Longitude: {point_paris.longitude}")
