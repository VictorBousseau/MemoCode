# =================================================
# Module 4 : Dictionnaires
# Fichier d'exercice - À compléter
# =================================================

# Exercice 1 : Créer un profil utilisateur
# ------------------------------------------
# TODO: Créer un dictionnaire 'profil' avec les clés suivantes:
#   - "nom" : "Alice"
#   - "age" : 25
#   - "ville" : "Paris"
#   - "email" : "alice@example.com"
# TODO: Afficher le nom et l'email avec des f-strings

profil = None  # TODO: Créer le dictionnaire

print(f"Nom: {profil}")  # TODO: Accéder à la clé 'nom'
print(f"Email: {profil}")  # TODO: Accéder à la clé 'email'


# Exercice 2 : Compter les lettres
# ---------------------------------
# TODO: Compléter la fonction pour compter les occurrences de chaque lettre
# Exemple: "hello" → {'h': 1, 'e': 1, 'l': 2, 'o': 1}

def compter_lettres(texte):
    compteur = {}
    for lettre in texte.lower():
        if lettre.isalpha():  # Ignorer les espaces et ponctuation
            # TODO: Incrémenter le compteur pour cette lettre
            # Astuce: utiliser compteur.get(lettre, 0)
            pass
    return compteur

texte_test = "Bonjour Python"
resultat = compter_lettres(texte_test)
print(f"Lettres dans '{texte_test}': {resultat}")


# Exercice 3 : Fusionner deux dictionnaires
# ------------------------------------------
# TODO: Fusionner dict1 et dict2 dans un nouveau dictionnaire 'fusion'
# Les valeurs de dict2 doivent écraser celles de dict1 si conflit

dict1 = {"a": 1, "b": 2, "c": 3}
dict2 = {"c": 30, "d": 4, "e": 5}

fusion = None  # TODO: Fusionner les deux dictionnaires
# Astuce: utiliser la méthode .update() ou l'opérateur |

print(f"Fusion: {fusion}")
# Résultat attendu: {'a': 1, 'b': 2, 'c': 30, 'd': 4, 'e': 5}


# Exercice 4 : Mini-annuaire téléphonique
# ----------------------------------------
# TODO: Implémenter les fonctions pour gérer un annuaire

annuaire = {}

def ajouter_contact(nom, telephone):
    """Ajoute un contact à l'annuaire."""
    # TODO: Ajouter le contact au dictionnaire
    pass

def chercher_contact(nom):
    """Recherche un contact par nom. Retourne 'Non trouvé' si absent."""
    # TODO: Utiliser .get() pour chercher le contact
    pass

def supprimer_contact(nom):
    """Supprime un contact de l'annuaire."""
    # TODO: Supprimer le contact s'il existe
    pass

# Tests
ajouter_contact("Alice", "0601020304")
ajouter_contact("Bob", "0605060708")
print(f"Téléphone d'Alice: {chercher_contact('Alice')}")
print(f"Téléphone de Charlie: {chercher_contact('Charlie')}")
supprimer_contact("Alice")
print(f"Après suppression: {annuaire}")


# Exercice 5 : Accès sécurisé avec get()
# ---------------------------------------
# TODO: Utiliser .get() pour accéder aux valeurs sans erreur

config = {
    "debug": True,
    "port": 8080,
    "host": "localhost"
}

# TODO: Récupérer 'port' (qui existe)
port = None

# TODO: Récupérer 'timeout' avec une valeur par défaut de 30
timeout = None

print(f"Port: {port}")
print(f"Timeout: {timeout}")


# =================================================
# Bonus : Système de notes
# =================================================
# TODO: Créer un dictionnaire imbriqué pour stocker les notes
# Chaque étudiant a plusieurs matières avec une note

etudiants = {
    "Alice": None,  # TODO: {"maths": 15, "python": 18, "anglais": 14}
    "Bob": None,    # TODO: {"maths": 12, "python": 16, "anglais": 17}
}

# TODO: Calculer et afficher la moyenne de chaque étudiant
# Astuce: utiliser .values() pour obtenir les notes
