# =================================================
# Module 15 : Encodage Catégoriel - EXERCICES
# =================================================

import pandas as pd
import numpy as np

df = pd.DataFrame({
    'couleur': ['rouge', 'bleu', 'vert', 'rouge', 'bleu'],
    'taille': ['S', 'M', 'L', 'XL', 'M'],
    'ville': ['Paris', 'Lyon', 'Marseille', 'Paris', 'Lyon']
})

# Exercice 1 : Label Encoding
# -----------------------------
# TODO: Encoder 'taille' en numérique ordonné (S=0, M=1, L=2, XL=3)
taille_map = {'S': 0, 'M': 1, 'L': 2, 'XL': 3}
df['taille_encoded'] = None  # map()

print("Label Encoding:\n", df[['taille', 'taille_encoded']])


# Exercice 2 : One-Hot Encoding
# -------------------------------
# TODO: Créer des colonnes binaires pour 'couleur'
couleur_dummies = None  # pd.get_dummies()

print("One-Hot Encoding:\n", couleur_dummies)


# Exercice 3 : One-Hot avec préfixe
# -----------------------------------
# TODO: One-Hot sur 'ville' avec préfixe 'ville_'
ville_encoded = None  # pd.get_dummies(prefix='ville')

print("One-Hot avec préfixe:\n", ville_encoded)


# Exercice 4 : Intégration au DataFrame
# ---------------------------------------
# TODO: Ajouter les dummies au df original et supprimer la colonne originale
df_encoded = None
# Utiliser pd.concat() et drop()

print("DataFrame encodé:\n", df_encoded)
