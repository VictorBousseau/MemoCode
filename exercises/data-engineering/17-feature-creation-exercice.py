# =================================================
# Module 17 : Feature Creation - EXERCICES
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
# -----------------------------------
# TODO: Calculer l'âge à partir de date_naissance
df['age'] = None  # (date_commande - date_naissance).dt.days / 365

print("Âge:\n", df[['date_naissance', 'age']])


# Exercice 2 : Features calculées
# ---------------------------------
# TODO: Calculer le montant total (prix * quantite)
df['montant_total'] = None

# TODO: Créer une catégorie de prix (low/medium/high)
df['categorie_prix'] = None  # pd.cut()

print("Features calculées:\n", df[['prix', 'quantite', 'montant_total', 'categorie_prix']])


# Exercice 3 : Features textuelles
# ----------------------------------
# TODO: Extraire la longueur du prénom
df['longueur_prenom'] = None

# TODO: Vérifier si le prénom est composé (contient '-')
df['prenom_compose'] = None

print("Features textuelles:\n", df[['prenom', 'longueur_prenom', 'prenom_compose']])


# Exercice 4 : Binning
# ----------------------
# TODO: Créer des tranches d'âge (18-30, 31-45, 46+)
df['tranche_age'] = None  # pd.cut avec bins et labels

print("Tranches d'âge:\n", df[['age', 'tranche_age']])
