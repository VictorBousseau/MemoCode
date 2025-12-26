# =================================================
# Module 1 : Variables et Types de Données
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Calculer l'aire d'un cercle
# -----------------------------------------
rayon = 5
PI = 3.14159
aire = PI * rayon ** 2

print(f"L'aire du cercle est {aire}")
# Résultat: L'aire du cercle est 78.53975


# Exercice 2 : Conversion Celsius → Fahrenheit
# ---------------------------------------------
celsius = 25
fahrenheit = (celsius * 9/5) + 32

print(f"{celsius}°C = {fahrenheit}°F")
# Résultat: 25°C = 77.0°F


# Exercice 3 : Informations personnelles
# ---------------------------------------
nom = "Alice"
age = 25
taille = 1.68
est_etudiant = True

print(f"Je m'appelle {nom}")
print(f"J'ai {age} ans")
print(f"Je mesure {taille}m")
print(f"Étudiant: {est_etudiant}")


# Exercice 4 : Conversion de types
# ---------------------------------
texte = "42"
decimal = 3.7

nombre = int(texte)    # Convertit "42" en 42
entier = int(decimal)  # Convertit 3.7 en 3 (tronque le décimal)

print(f"'{texte}' converti en int: {nombre} (type: {type(nombre)})")
print(f"{decimal} converti en int: {entier} (type: {type(entier)})")


# =================================================
# Bonus : Calculatrice simple
# =================================================
a = 17
b = 5

print(f"Somme: {a} + {b} = {a + b}")           # 22
print(f"Différence: {a} - {b} = {a - b}")      # 12
print(f"Produit: {a} * {b} = {a * b}")         # 85
print(f"Quotient: {a} / {b} = {a / b}")        # 3.4
print(f"Reste: {a} % {b} = {a % b}")           # 2
print(f"Puissance: {a} ** {b} = {a ** b}")     # 1419857
