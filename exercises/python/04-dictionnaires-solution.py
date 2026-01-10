# =================================================
# Module 4 : Dictionnaires
# SOLUTION - Fichier corrigé
# =================================================

# Exercice 1 : Créer un profil utilisateur
# ------------------------------------------
profil = {
    "nom": "Alice",
    "age": 25,
    "ville": "Paris",
    "email": "alice@example.com"
}

print(f"Nom: {profil['nom']}")
print(f"Email: {profil['email']}")
# Résultat:
# Nom: Alice
# Email: alice@example.com


# Exercice 2 : Compter les lettres
# ---------------------------------
def compter_lettres(texte):
    compteur = {}
    for lettre in texte.lower():
        if lettre.isalpha():  # Ignorer les espaces et ponctuation
            # Utilise get() pour récupérer la valeur actuelle ou 0 si absent
            compteur[lettre] = compteur.get(lettre, 0) + 1
    return compteur

texte_test = "Bonjour Python"
resultat = compter_lettres(texte_test)
print(f"Lettres dans '{texte_test}': {resultat}")
# Résultat: {'b': 1, 'o': 2, 'n': 2, 'j': 1, 'u': 1, 'r': 1, 'p': 1, 'y': 1, 't': 1, 'h': 1}


# Exercice 3 : Fusionner deux dictionnaires
# ------------------------------------------
dict1 = {"a": 1, "b": 2, "c": 3}
dict2 = {"c": 30, "d": 4, "e": 5}

# Méthode 1 : avec update()
fusion = dict1.copy()  # Copier d'abord pour ne pas modifier l'original
fusion.update(dict2)
print(f"Fusion (update): {fusion}")

# Méthode 2 : avec l'opérateur | (Python 3.9+)
fusion = dict1 | dict2
print(f"Fusion (|): {fusion}")

# Méthode 3 : avec unpacking
fusion = {**dict1, **dict2}
print(f"Fusion (unpacking): {fusion}")
# Résultat: {'a': 1, 'b': 2, 'c': 30, 'd': 4, 'e': 5}


# Exercice 4 : Mini-annuaire téléphonique
# ----------------------------------------
annuaire = {}

def ajouter_contact(nom, telephone):
    """Ajoute un contact à l'annuaire."""
    annuaire[nom] = telephone
    print(f"✓ Contact '{nom}' ajouté")

def chercher_contact(nom):
    """Recherche un contact par nom. Retourne 'Non trouvé' si absent."""
    return annuaire.get(nom, "Non trouvé")

def supprimer_contact(nom):
    """Supprime un contact de l'annuaire."""
    if nom in annuaire:
        del annuaire[nom]
        print(f"✓ Contact '{nom}' supprimé")
    else:
        print(f"✗ Contact '{nom}' non trouvé")

# Tests
ajouter_contact("Alice", "0601020304")
ajouter_contact("Bob", "0605060708")
print(f"Téléphone d'Alice: {chercher_contact('Alice')}")
# Résultat: 0601020304
print(f"Téléphone de Charlie: {chercher_contact('Charlie')}")
# Résultat: Non trouvé
supprimer_contact("Alice")
print(f"Après suppression: {annuaire}")
# Résultat: {'Bob': '0605060708'}


# Exercice 5 : Accès sécurisé avec get()
# ---------------------------------------
config = {
    "debug": True,
    "port": 8080,
    "host": "localhost"
}

# Récupérer 'port' (qui existe)
port = config.get("port")  # 8080

# Récupérer 'timeout' avec une valeur par défaut de 30
timeout = config.get("timeout", 30)  # 30 (car 'timeout' n'existe pas)

print(f"Port: {port}")
print(f"Timeout: {timeout}")


# =================================================
# Bonus : Système de notes
# =================================================
etudiants = {
    "Alice": {"maths": 15, "python": 18, "anglais": 14},
    "Bob": {"maths": 12, "python": 16, "anglais": 17},
}

# Calculer et afficher la moyenne de chaque étudiant
for nom, notes in etudiants.items():
    moyenne = sum(notes.values()) / len(notes)
    print(f"{nom}: moyenne = {moyenne:.2f}/20")

# Résultat:
# Alice: moyenne = 15.67/20
# Bob: moyenne = 15.00/20

# Bonus : Trouver la meilleure note de chaque étudiant
for nom, notes in etudiants.items():
    meilleure_matiere = max(notes, key=notes.get)
    print(f"{nom}: meilleure note en {meilleure_matiere} ({notes[meilleure_matiere]}/20)")
