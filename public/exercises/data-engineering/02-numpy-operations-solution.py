# =================================================
# Module 2 : Opérations et Agrégations - SOLUTION
# =================================================

import numpy as np

# Exercice 1 : Statistiques de base
ventes = np.array([150, 230, 180, 320, 95, 410, 280, 175, 390, 210])

moyenne = np.mean(ventes)        # 244.0
ecart_type = np.std(ventes)      # 96.36
minimum = np.min(ventes)         # 95
maximum = np.max(ventes)         # 410
indice_max = np.argmax(ventes)   # 5

print(f"Moyenne: {moyenne}")
print(f"Écart-type: {ecart_type}")
print(f"Min: {minimum}, Max: {maximum}")
print(f"Jour avec max ventes (index): {indice_max}")


# Exercice 2 : Agrégation par axe
notes = np.array([
    [15, 12, 14],
    [18, 16, 17],
    [10, 11, 9],
    [14, 15, 13]
])

moyennes_etudiants = np.mean(notes, axis=1)  # [13.67, 17.0, 10.0, 14.0]
moyennes_matieres = np.mean(notes, axis=0)   # [14.25, 13.5, 13.25]

print(f"Moyennes par étudiant: {moyennes_etudiants}")
print(f"Moyennes par matière: {moyennes_matieres}")


# Exercice 3 : Opérations conditionnelles
temperatures = np.array([22, 28, 31, 25, 35, 29, 18, 33, 27, 24])

jours_chauds = np.sum(temperatures > 30)  # 3
temp_capped = np.clip(temperatures, None, 30)  # ou np.where(temperatures > 30, 30, temperatures)
categories = np.where(temperatures > 30, "Chaud", "Normal")

print(f"Nombre de jours chauds: {jours_chauds}")
print(f"Températures cappées: {temp_capped}")
print(f"Catégories: {categories}")


# Bonus : Percentiles
q1 = np.percentile(ventes, 25)      # 176.25
mediane = np.percentile(ventes, 50) # 220.0
q3 = np.percentile(ventes, 75)      # 300.0

print(f"Q1: {q1}, Médiane: {mediane}, Q3: {q3}")
