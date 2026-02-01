# =================================================
# Module 10 : Nettoyage de Texte - SOLUTION
# =================================================

import pandas as pd

df = pd.DataFrame({
    'nom': ['  Alice  ', 'BOB', 'charlie', '  Diana Jones  '],
    'email': ['ALICE@mail.com', 'bob@MAIL.COM', 'charlie@mail', 'diana@mail.com'],
    'telephone': ['01-23-45-67-89', '0623456789', '06.23.45.67.89', '06 23 45 67 89']
})

# Exercice 1 : Nettoyage basique
df['nom_clean'] = df['nom'].str.strip()
df['email_lower'] = df['email'].str.lower()
df['nom_title'] = df['nom'].str.strip().str.title()

print("Nettoyé:\n", df)


# Exercice 2 : Supprimer les caractères
df['tel_clean'] = df['telephone'].str.replace(r'[^0-9]', '', regex=True)

print("Téléphones nettoyés:\n", df['tel_clean'])


# Exercice 3 : Validation avec regex
df['email_valide'] = df['email'].str.contains(r'@.*\.', regex=True)

print("Emails valides:\n", df[['email', 'email_valide']])


# Exercice 4 : Extraction avec regex
df['domaine'] = df['email'].str.extract(r'@(.+)')

print("Domaines:\n", df[['email', 'domaine']])
