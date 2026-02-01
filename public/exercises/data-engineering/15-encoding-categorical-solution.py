# =================================================
# Module 15 : Encodage Catégoriel - SOLUTION
# =================================================

import pandas as pd
import numpy as np

df = pd.DataFrame({
    'couleur': ['rouge', 'bleu', 'vert', 'rouge', 'bleu'],
    'taille': ['S', 'M', 'L', 'XL', 'M'],
    'ville': ['Paris', 'Lyon', 'Marseille', 'Paris', 'Lyon']
})

# Exercice 1 : Label Encoding
taille_map = {'S': 0, 'M': 1, 'L': 2, 'XL': 3}
df['taille_encoded'] = df['taille'].map(taille_map)
print("Label Encoding:\n", df[['taille', 'taille_encoded']])


# Exercice 2 : One-Hot Encoding
couleur_dummies = pd.get_dummies(df['couleur'])
print("One-Hot Encoding:\n", couleur_dummies)


# Exercice 3 : One-Hot avec préfixe
ville_encoded = pd.get_dummies(df['ville'], prefix='ville')
print("One-Hot avec préfixe:\n", ville_encoded)


# Exercice 4 : Intégration au DataFrame
df_encoded = pd.concat([df, pd.get_dummies(df['couleur'], prefix='couleur')], axis=1)
df_encoded = df_encoded.drop('couleur', axis=1)
print("DataFrame encodé:\n", df_encoded)
