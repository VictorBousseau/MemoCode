# =================================================
# Module 3 : Listes
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Création et manipulation
# --------------------------------------
fruits = ["pomme", "banane", "orange", "fraise", "cerise"]
fruits.append("kiwi")
fruits.insert(2, "mangue")
fruits.pop(0)  # ou fruits.remove("pomme")

print(f"Fruits: {fruits}")
# ['banane', 'mangue', 'orange', 'fraise', 'cerise', 'kiwi']


# Exercice 2 : Slicing
# ---------------------
nombres = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

premiers = nombres[:3]      # [0, 1, 2]
derniers = nombres[-3:]     # [7, 8, 9]
pairs = nombres[::2]        # [0, 2, 4, 6, 8]
inverse = nombres[::-1]     # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

print(f"3 premiers: {premiers}")
print(f"3 derniers: {derniers}")
print(f"Indices pairs: {pairs}")
print(f"Inversé: {inverse}")


# Exercice 3 : List Comprehensions
# ---------------------------------
carres = [x**2 for x in range(1, 11)]
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

pairs_liste = [x for x in range(1, 21) if x % 2 == 0]
# [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

parite = ["pair" if x % 2 == 0 else "impair" for x in range(1, 6)]
# ['impair', 'pair', 'impair', 'pair', 'impair']

print(f"Carrés: {carres}")
print(f"Pairs: {pairs_liste}")
print(f"Parité: {parite}")


# Exercice 4 : Statistiques
# --------------------------
notes = [85, 90, 78, 92, 88, 76, 95, 89]

moyenne = sum(notes) / len(notes)  # 86.625
note_min = min(notes)              # 76
note_max = max(notes)              # 95
nb_bonnes_notes = len([n for n in notes if n >= 85])  # 5

print(f"Moyenne: {moyenne}")
print(f"Min: {note_min}, Max: {note_max}")
print(f"Notes >= 85: {nb_bonnes_notes}")


# Exercice 5 : Matrice
# ---------------------
matrice = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

element = matrice[1][2]  # 6 (ligne 2, colonne 3)
aplatie = [x for ligne in matrice for x in ligne]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(f"Élément [1][2]: {element}")
print(f"Aplatie: {aplatie}")


# =================================================
# Bonus : Dédoublonner une liste
# =================================================
avec_doublons = [1, 3, 2, 1, 5, 3, 4, 2, 1]

# Méthode 1: Avec dict.fromkeys (garde l'ordre)
sans_doublons = list(dict.fromkeys(avec_doublons))

# Méthode 2: Avec boucle
# sans_doublons = []
# for x in avec_doublons:
#     if x not in sans_doublons:
#         sans_doublons.append(x)

print(f"Sans doublons: {sans_doublons}")
# [1, 3, 2, 5, 4]
