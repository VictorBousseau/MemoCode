# =================================================
# Module 10 : Nettoyage de Texte - EXERCICES
# =================================================

import pandas as pd

df = pd.DataFrame({
    'nom': ['  Alice  ', 'BOB', 'charlie', '  Diana Jones  '],
    'email': ['ALICE@mail.com', 'bob@MAIL.COM', 'charlie@mail', 'diana@mail.com'],
    'telephone': ['01-23-45-67-89', '0623456789', '06.23.45.67.89', '06 23 45 67 89']
})

# Exercice 1 : Nettoyage basique
# --------------------------------
# TODO: Supprimer les espaces en début/fin
df['nom_clean'] = None

# TODO: Mettre en minuscules
df['email_lower'] = None

# TODO: Mettre en Title Case (première lettre majuscule)
df['nom_title'] = None

print("Nettoyé:\n", df)


# Exercice 2 : Supprimer les caractères
# ---------------------------------------
# TODO: Supprimer tous les caractères non-numériques des téléphones
df['tel_clean'] = None  # Utiliser str.replace() avec regex

print("Téléphones nettoyés:\n", df['tel_clean'])


# Exercice 3 : Validation avec regex
# ------------------------------------
# TODO: Vérifier si l'email contient un @ suivi d'un .
df['email_valide'] = None  # Utiliser str.contains() avec pattern

print("Emails valides:\n", df[['email', 'email_valide']])


# Exercice 4 : Extraction avec regex
# ------------------------------------
# TODO: Extraire le domaine de l'email (après @)
df['domaine'] = None  # Utiliser str.extract()

print("Domaines:\n", df[['email', 'domaine']])
