# =================================================
# Module 14 : Validation de Données - EXERCICES
# =================================================

import pandas as pd
import numpy as np

df = pd.DataFrame({
    'email': ['alice@mail.com', 'bob_invalid', 'charlie@test.org', 'diana@'],
    'age': [25, -5, 150, 30],
    'telephone': ['0612345678', '06 12 34 56 78', '612345678', '+33612345678'],
    'code_postal': ['75001', '7500', '75002', 'ABCDE']
})

# Exercice 1 : Validation d'email
# ---------------------------------
# TODO: Vérifier que l'email contient @ et un .
df['email_valide'] = None  # str.contains avec regex

print("Validation email:\n", df[['email', 'email_valide']])


# Exercice 2 : Validation de plage numérique
# --------------------------------------------
# TODO: Vérifier que l'âge est entre 0 et 120
df['age_valide'] = None  # between()

print("Validation age:\n", df[['age', 'age_valide']])


# Exercice 3 : Validation de format
# -----------------------------------
# TODO: Vérifier que le code postal est 5 chiffres
df['cp_valide'] = None  # str.match avec regex r'^\d{5}$'

print("Validation CP:\n", df[['code_postal', 'cp_valide']])


# Exercice 4 : Rapport de qualité
# ---------------------------------
# TODO: Calculer le % de valeurs valides par colonne
rapport = {
    'email': None,
    'age': None,
    'code_postal': None
}

print("Rapport qualité:", rapport)
