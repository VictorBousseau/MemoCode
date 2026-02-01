# =================================================
# Module 8 : GroupBy et Agrégations - SOLUTION
# =================================================

import pandas as pd

ventes = pd.DataFrame({
    'Region': ['Nord', 'Sud', 'Nord', 'Est', 'Sud', 'Nord', 'Est', 'Sud'],
    'Produit': ['A', 'A', 'B', 'A', 'B', 'A', 'B', 'A'],
    'Vendeur': ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob', 'Charlie', 'Alice', 'Charlie'],
    'Montant': [150, 200, 180, 220, 170, 190, 210, 160]
})

# Exercice 1 : GroupBy simple
ventes_par_region = ventes.groupby('Region')['Montant'].sum()
moyenne_par_produit = ventes.groupby('Produit')['Montant'].mean()

print("Ventes par région:\n", ventes_par_region)
print("Moyenne par produit:\n", moyenne_par_produit)


# Exercice 2 : Agrégations multiples
stats_region = ventes.groupby('Region')['Montant'].agg(['sum', 'mean', 'count'])

print("Stats par région:\n", stats_region)


# Exercice 3 : GroupBy sur plusieurs colonnes
ventes_region_produit = ventes.groupby(['Region', 'Produit'])['Montant'].sum()

print("Par région et produit:\n", ventes_region_produit)


# Exercice 4 : Pivot Table
pivot = ventes.pivot_table(
    values='Montant',
    index='Region',
    columns='Produit',
    aggfunc='sum'
)

print("Pivot table:\n", pivot)
