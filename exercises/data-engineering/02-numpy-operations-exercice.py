# =================================================
# Module 2 : Opérations et Agrégations - EXERCICES
# =================================================

import numpy as np

# Exercice 1 : Statistiques de base
# ----------------------------------
ventes = np.array([150, 230, 180, 320, 95, 410, 280, 175, 390, 210])

# TODO: Calculer la moyenne des ventes
moyenne = None

# TODO: Calculer l'écart-type
ecart_type = None

# TODO: Trouver le min et le max
minimum = None
maximum = None

# TODO: Trouver l'indice du jour avec le plus de ventes
indice_max = None

print(f"Moyenne: {moyenne}")
print(f"Écart-type: {ecart_type}")
print(f"Min: {minimum}, Max: {maximum}")
print(f"Jour avec max ventes (index): {indice_max}")


# Exercice 2 : Agrégation par axe
# --------------------------------
# Notes de 4 étudiants sur 3 matières
notes = np.array([
    [15, 12, 14],  # Étudiant 1
    [18, 16, 17],  # Étudiant 2
    [10, 11, 9],   # Étudiant 3
    [14, 15, 13]   # Étudiant 4
])

# TODO: Calculer la moyenne de chaque étudiant (moyenne par ligne)
moyennes_etudiants = None

# TODO: Calculer la moyenne de chaque matière (moyenne par colonne)
moyennes_matieres = None

print(f"Moyennes par étudiant: {moyennes_etudiants}")
print(f"Moyennes par matière: {moyennes_matieres}")


# Exercice 3 : Opérations conditionnelles
# ----------------------------------------
temperatures = np.array([22, 28, 31, 25, 35, 29, 18, 33, 27, 24])

# TODO: Compter les jours où T > 30
jours_chauds = None

# TODO: Remplacer les T > 30 par 30 (capping)
temp_capped = None

# TODO: Utiliser np.where pour créer un array "Chaud"/"Normal"
categories = None

print(f"Nombre de jours chauds: {jours_chauds}")
print(f"Températures cappées: {temp_capped}")
print(f"Catégories: {categories}")


# =================================================
# Bonus : Percentiles
# =================================================
# TODO: Calculer Q1, médiane, Q3 des ventes
q1 = None
mediane = None
q3 = None

print(f"Q1: {q1}, Médiane: {mediane}, Q3: {q3}")
