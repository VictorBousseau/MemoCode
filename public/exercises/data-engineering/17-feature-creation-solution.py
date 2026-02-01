# =================================================
# Module 17 : Feature Creation - SOLUTION
# =================================================

import pandas as pd
import numpy as np

df = pd.DataFrame({
    'date_naissance': pd.to_datetime(['1990-05-15', '1985-08-20', '2000-01-10', '1978-12-03']),
    'date_commande': pd.to_datetime(['2024-01-15', '2024-01-15', '2024-01-15', '2024-01-15']),
    'prix': [100, 250, 75, 500],
    'quantite': [2, 1, 5, 1],
    'prenom': ['Jean-Pierre', 'Marie', 'Bob', 'Anne-Sophie']
})

# Exercice 1 : Features temporelles
df['age'] = (df['date_commande'] - df['date_naissance']).dt.days / 365.25
df['age'] = df['age'].astype(int)
print("Âge:\n", df[['date_naissance', 'age']])


# Exercice 2 : Features calculées
df['montant_total'] = df['prix'] * df['quantite']
df['categorie_prix'] = pd.cut(df['prix'], bins=[0, 100, 300, 1000], labels=['low', 'medium', 'high'])
print("Features calculées:\n", df[['prix', 'quantite', 'montant_total', 'categorie_prix']])


# Exercice 3 : Features textuelles
df['longueur_prenom'] = df['prenom'].str.len()
df['prenom_compose'] = df['prenom'].str.contains('-')
print("Features textuelles:\n", df[['prenom', 'longueur_prenom', 'prenom_compose']])


# Exercice 4 : Binning
df['tranche_age'] = pd.cut(df['age'], bins=[0, 30, 45, 100], labels=['18-30', '31-45', '46+'])
print("Tranches d'âge:\n", df[['age', 'tranche_age']])
