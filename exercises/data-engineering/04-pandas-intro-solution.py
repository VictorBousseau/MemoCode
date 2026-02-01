# =================================================
# Module 4 : Introduction à Pandas - SOLUTION
# =================================================

import pandas as pd
import numpy as np

# Exercice 1 : Création de DataFrame
data = {
    'Produit': ['Laptop', 'Phone', 'Tablet', 'Watch'],
    'Prix': [1200, 800, 450, 350],
    'Stock': [15, 50, 30, 100]
}
df = pd.DataFrame(data)

print("DataFrame créé:")
print(df)


# Exercice 2 : Exploration de données
employes = pd.DataFrame({
    'Nom': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Département': ['IT', 'RH', 'IT', 'Finance', 'RH'],
    'Salaire': [55000, 48000, 62000, 58000, 45000],
    'Ancienneté': [3, 5, 7, 4, 2]
})

head_3 = employes.head(3)
print("Shape:", employes.shape)
print("Types:\n", employes.dtypes)

stats = employes.describe()

print("Premières lignes:\n", head_3)
print("Statistiques:\n", stats)


# Exercice 3 : Accès aux colonnes
salaires = employes['Salaire']
nom_salaire = employes[['Nom', 'Salaire']]
employes['Salaire_Mensuel'] = employes['Salaire'] / 12

print("Salaires:\n", salaires)
print("Nom et Salaire:\n", nom_salaire)
print("Avec salaire mensuel:\n", employes)


# Exercice 4 : Lecture/Écriture CSV
employes.to_csv('employes.csv', index=False)
employes_from_csv = pd.read_csv('employes.csv')
print("Fichier CSV créé et relu avec succès!")


# Bonus : Series avec index personnalisé
ventes = pd.Series(
    [150, 200, 180, 220, 250],
    index=['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
)

print("Ventes par jour:\n", ventes)
