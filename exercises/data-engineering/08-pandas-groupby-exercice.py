# =================================================
# Module 8 : GroupBy et Agrégations - EXERCICES
# =================================================

import pandas as pd

ventes = pd.DataFrame({
    'Region': ['Nord', 'Sud', 'Nord', 'Est', 'Sud', 'Nord', 'Est', 'Sud'],
    'Produit': ['A', 'A', 'B', 'A', 'B', 'A', 'B', 'A'],
    'Vendeur': ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob', 'Charlie', 'Alice', 'Charlie'],
    'Montant': [150, 200, 180, 220, 170, 190, 210, 160]
})

# Exercice 1 : GroupBy simple
# -----------------------------
# TODO: Calculer le total des ventes par région
ventes_par_region = None

# TODO: Calculer la moyenne des ventes par produit
moyenne_par_produit = None

print("Ventes par région:\n", ventes_par_region)
print("Moyenne par produit:\n", moyenne_par_produit)


# Exercice 2 : Agrégations multiples
# ------------------------------------
# TODO: Pour chaque région, calculer: somme, moyenne, count
stats_region = None  # Utiliser .agg(['sum', 'mean', 'count'])

print("Stats par région:\n", stats_region)


# Exercice 3 : GroupBy sur plusieurs colonnes
# ---------------------------------------------
# TODO: Calculer le total des ventes par (Région, Produit)
ventes_region_produit = None

print("Par région et produit:\n", ventes_region_produit)


# Exercice 4 : Pivot Table
# --------------------------
# TODO: Créer un tableau croisé: Régions en lignes, Produits en colonnes
# Valeurs = somme des montants
pivot = None

print("Pivot table:\n", pivot)
