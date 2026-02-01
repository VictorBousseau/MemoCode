# =================================================
# Module 14 : Validation de Données - SOLUTION
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
df['email_valide'] = df['email'].str.contains(r'^[^@]+@[^@]+\.[^@]+$', regex=True, na=False)
print("Validation email:\n", df[['email', 'email_valide']])


# Exercice 2 : Validation de plage numérique
df['age_valide'] = df['age'].between(0, 120)
print("Validation age:\n", df[['age', 'age_valide']])


# Exercice 3 : Validation de format
df['cp_valide'] = df['code_postal'].str.match(r'^\d{5}$', na=False)
print("Validation CP:\n", df[['code_postal', 'cp_valide']])


# Exercice 4 : Rapport de qualité
rapport = {
    'email': df['email_valide'].mean() * 100,
    'age': df['age_valide'].mean() * 100,
    'code_postal': df['cp_valide'].mean() * 100
}

print("Rapport qualité:", rapport)
