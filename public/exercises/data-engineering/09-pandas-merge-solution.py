# =================================================
# Module 9 : Jointures et Concaténation - SOLUTION
# =================================================

import pandas as pd

clients = pd.DataFrame({
    'client_id': [1, 2, 3, 4],
    'nom': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'ville': ['Paris', 'Lyon', 'Paris', 'Marseille']
})

commandes = pd.DataFrame({
    'commande_id': [101, 102, 103, 104, 105],
    'client_id': [1, 2, 1, 3, 5],
    'montant': [150, 200, 75, 320, 180]
})

# Exercice 1 : Inner Join
inner = pd.merge(clients, commandes, on='client_id')
print("Inner join:\n", inner)


# Exercice 2 : Left Join
left = pd.merge(clients, commandes, on='client_id', how='left')
print("Left join:\n", left)


# Exercice 3 : Outer Join
outer = pd.merge(clients, commandes, on='client_id', how='outer')
print("Outer join:\n", outer)


# Exercice 4 : Concat
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})

vertical = pd.concat([df1, df2], ignore_index=True)
horizontal = pd.concat([df1, df2], axis=1)

print("Vertical:\n", vertical)
print("Horizontal:\n", horizontal)
