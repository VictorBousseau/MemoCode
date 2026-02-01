# =================================================
# Module 9 : Jointures et Concaténation - EXERCICES
# =================================================

import pandas as pd

clients = pd.DataFrame({
    'client_id': [1, 2, 3, 4],
    'nom': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'ville': ['Paris', 'Lyon', 'Paris', 'Marseille']
})

commandes = pd.DataFrame({
    'commande_id': [101, 102, 103, 104, 105],
    'client_id': [1, 2, 1, 3, 5],  # Note: client 5 n'existe pas
    'montant': [150, 200, 75, 320, 180]
})

# Exercice 1 : Inner Join
# -------------------------
# TODO: Joindre clients et commandes (inner join)
inner = None

print("Inner join:\n", inner)


# Exercice 2 : Left Join
# ------------------------
# TODO: Left join pour garder tous les clients
left = None

print("Left join:\n", left)


# Exercice 3 : Outer Join
# -------------------------
# TODO: Outer join pour garder toutes les données
outer = None

print("Outer join:\n", outer)


# Exercice 4 : Concat
# --------------------
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})

# TODO: Empiler verticalement avec réindexation
vertical = None

# TODO: Empiler horizontalement
horizontal = None

print("Vertical:\n", vertical)
print("Horizontal:\n", horizontal)
