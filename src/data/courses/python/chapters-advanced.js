// Chapter content for Python course - PART 2: Functions, POO, Advanced
// Modules 11-22

export const pythonChaptersAdvanced = {
    '11-methodes': `
# Module 11 : Méthodes d'Objets

En Python, **tout est un objet**. Chaque type de données (string, list, dict, etc.) possède des **méthodes intégrées** qui permettent de manipuler les données sans écrire de fonctions supplémentaires.

---

## 🧠 Concept : Objets et Méthodes

Une **méthode** est une fonction attachée à un objet. On l'appelle avec la notation pointée : \`objet.methode()\`.

\`\`\`python
texte = "hello"
print(texte.upper())  # "HELLO"
#       ▲       ▲
#     objet   méthode
\`\`\`

### Découvrir les méthodes d'un type

\`\`\`python
# Voir toutes les méthodes d'un type
print(dir(str))    # Méthodes des strings
print(dir(list))   # Méthodes des listes
print(dir(dict))   # Méthodes des dictionnaires

# Obtenir l'aide sur une méthode
help(str.split)
help(list.sort)
\`\`\`

> 💡 **Astuce** : Les méthodes commençant par \`__\` sont des méthodes spéciales (dunder methods). Ignorez-les pour l'instant.

---

## 📝 Méthodes de Strings

Les strings sont **immuables** : chaque méthode retourne une **nouvelle string** sans modifier l'originale.

### Changement de casse

\`\`\`python
texte = "hello World PYTHON"

print(texte.upper())       # "HELLO WORLD PYTHON"
print(texte.lower())       # "hello world python"
print(texte.title())       # "Hello World Python"
print(texte.capitalize())  # "Hello world python"
print(texte.swapcase())    # "HELLO wORLD python"
\`\`\`

### Recherche et vérification

\`\`\`python
texte = "Bonjour Python, bienvenue en Python !"

# Trouver la position
print(texte.find("Python"))      # 8 (première occurrence)
print(texte.rfind("Python"))     # 31 (dernière occurrence)
print(texte.find("Java"))        # -1 (non trouvé)

# index() est similaire mais lève une erreur si non trouvé
# texte.index("Java")  # ❌ ValueError !

# Compter les occurrences
print(texte.count("Python"))     # 2
print(texte.count("o"))          # 3

# Vérifier le début/fin
print(texte.startswith("Bon"))   # True
print(texte.endswith("!"))       # True

# Vérifier le contenu
print("123".isdigit())     # True (que des chiffres)
print("abc".isalpha())     # True (que des lettres)
print("abc123".isalnum())  # True (lettres et chiffres)
print("   ".isspace())     # True (que des espaces)
print("Hello".istitle())   # True (format titre)
\`\`\`

### Modification et formatage

\`\`\`python
# Remplacement
texte = "Je code en Java"
print(texte.replace("Java", "Python"))  # "Je code en Python"

# Suppression des espaces
texte = "   Hello World   "
print(texte.strip())    # "Hello World"
print(texte.lstrip())   # "Hello World   "
print(texte.rstrip())   # "   Hello World"

# Séparation et jointure
phrase = "Python est génial"
mots = phrase.split(" ")     # ['Python', 'est', 'génial']
print("-".join(mots))        # "Python-est-génial"

# Avec séparateur personnalisé
csv = "Alice,25,Paris"
donnees = csv.split(",")     # ['Alice', '25', 'Paris']

# Alignement
print("Python".center(20, "-"))  # "-------Python-------"
print("Python".ljust(20, "."))   # "Python.............."
print("Python".rjust(20, "."))   # "..............Python"
print("42".zfill(5))             # "00042"
\`\`\`

### Tableau récapitulatif des méthodes String

| Méthode | Description | Exemple | Résultat |
|---------|-------------|---------|----------|
| \`.upper()\` | Majuscules | \`"hi".upper()\` | \`"HI"\` |
| \`.lower()\` | Minuscules | \`"HI".lower()\` | \`"hi"\` |
| \`.title()\` | Titre | \`"hello world".title()\` | \`"Hello World"\` |
| \`.strip()\` | Suppr. espaces | \`" hi ".strip()\` | \`"hi"\` |
| \`.split()\` | Découper | \`"a-b".split("-")\` | \`['a', 'b']\` |
| \`.join()\` | Joindre | \`"-".join(['a','b'])\` | \`"a-b"\` |
| \`.replace()\` | Remplacer | \`"ab".replace("a","x")\` | \`"xb"\` |
| \`.find()\` | Position | \`"hello".find("l")\` | \`2\` |
| \`.count()\` | Compter | \`"hello".count("l")\` | \`2\` |
| \`.startswith()\` | Commence par | \`"hi".startswith("h")\` | \`True\` |

---

## 📋 Méthodes de Listes

Les listes sont **mutables** : la plupart des méthodes modifient la liste **en place** et retournent \`None\`.

### Ajout d'éléments

\`\`\`python
fruits = ["pomme", "banane"]

# Ajouter un élément à la fin
fruits.append("cerise")
print(fruits)  # ['pomme', 'banane', 'cerise']

# Insérer à un index précis
fruits.insert(1, "kiwi")
print(fruits)  # ['pomme', 'kiwi', 'banane', 'cerise']

# Ajouter plusieurs éléments
fruits.extend(["datte", "figue"])
print(fruits)  # ['pomme', 'kiwi', 'banane', 'cerise', 'datte', 'figue']
\`\`\`

> ⚠️ **Attention** : \`append()\` ajoute **un seul élément**, \`extend()\` ajoute **chaque élément** de la séquence.
> \`\`\`python
> liste = [1, 2]
> liste.append([3, 4])  # [1, 2, [3, 4]] ← liste imbriquée !
> liste = [1, 2]
> liste.extend([3, 4])  # [1, 2, 3, 4] ← éléments ajoutés
> \`\`\`

### Suppression d'éléments

\`\`\`python
fruits = ["pomme", "banane", "cerise", "banane", "datte"]

# Retirer et retourner le dernier élément
dernier = fruits.pop()
print(dernier)  # "datte"

# Retirer par index
deuxieme = fruits.pop(1)
print(deuxieme)  # "banane"

# Retirer par valeur (première occurrence)
fruits.remove("banane")
print(fruits)  # ['pomme', 'cerise']

# Vider la liste
fruits.clear()
print(fruits)  # []
\`\`\`

### Recherche et comptage

\`\`\`python
nombres = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

# Trouver l'index d'un élément
print(nombres.index(5))      # 4 (première occurrence)
# nombres.index(99)  # ❌ ValueError si non trouvé !

# Compter les occurrences
print(nombres.count(1))      # 2
print(nombres.count(5))      # 2
\`\`\`

### Tri et inversion

\`\`\`python
nombres = [3, 1, 4, 1, 5, 9]

# Trier en place (modifie la liste)
nombres.sort()
print(nombres)  # [1, 1, 3, 4, 5, 9]

# Tri décroissant
nombres.sort(reverse=True)
print(nombres)  # [9, 5, 4, 3, 1, 1]

# Tri avec critère personnalisé
mots = ["banane", "pomme", "kiwi"]
mots.sort(key=len)
print(mots)  # ['kiwi', 'pomme', 'banane']

# Inverser en place
nombres = [1, 2, 3, 4, 5]
nombres.reverse()
print(nombres)  # [5, 4, 3, 2, 1]

# Copie superficielle
original = [1, 2, 3]
copie = original.copy()
copie.append(4)
print(original)  # [1, 2, 3] → non affecté
\`\`\`

### Tableau récapitulatif des méthodes Liste

| Méthode | Description | Modifie en place ? |
|---------|-------------|--------------------|
| \`.append(x)\` | Ajoute x à la fin | Oui |
| \`.insert(i, x)\` | Insère x à l'index i | Oui |
| \`.extend(seq)\` | Ajoute les éléments de seq | Oui |
| \`.pop(i)\` | Retire et retourne l'élément i | Oui |
| \`.remove(x)\` | Retire la première occurrence de x | Oui |
| \`.clear()\` | Vide la liste | Oui |
| \`.index(x)\` | Retourne l'index de x | Non |
| \`.count(x)\` | Compte les occurrences de x | Non |
| \`.sort()\` | Trie la liste | Oui |
| \`.reverse()\` | Inverse la liste | Oui |
| \`.copy()\` | Retourne une copie | Non |

---

## 📖 Méthodes de Dictionnaires

### Accès aux données

\`\`\`python
utilisateur = {"nom": "Alice", "age": 30, "ville": "Paris"}

# Obtenir les clés, valeurs, paires
print(utilisateur.keys())    # dict_keys(['nom', 'age', 'ville'])
print(utilisateur.values())  # dict_values(['Alice', 30, 'Paris'])
print(utilisateur.items())   # dict_items([('nom', 'Alice'), ('age', 30), ('ville', 'Paris')])

# Accès sécurisé avec get() (évite KeyError)
print(utilisateur.get("nom"))           # "Alice"
print(utilisateur.get("email"))         # None (clé absente)
print(utilisateur.get("email", "N/A"))  # "N/A" (valeur par défaut)

# Accès classique (lève KeyError si absent)
# print(utilisateur["email"])  # ❌ KeyError !
\`\`\`

### Modification

\`\`\`python
d = {"a": 1, "b": 2}

# Mettre à jour / fusionner
d.update({"b": 20, "c": 3})
print(d)  # {'a': 1, 'b': 20, 'c': 3}

# setdefault : ajoute SEULEMENT si la clé n'existe pas
d.setdefault("d", 4)  # Ajoute d: 4
d.setdefault("a", 99) # Ne change rien car "a" existe
print(d)  # {'a': 1, 'b': 20, 'c': 3, 'd': 4}

# Retirer un élément
valeur = d.pop("c")
print(valeur)  # 3
print(d)       # {'a': 1, 'b': 20, 'd': 4}

# pop() avec valeur par défaut (évite KeyError)
valeur = d.pop("z", "absent")
print(valeur)  # "absent"

# Retirer le dernier élément inséré
cle, val = d.popitem()
print(f"{cle}: {val}")  # "d: 4"

# Vider le dictionnaire
d.clear()
\`\`\`

### Tableau récapitulatif des méthodes Dict

| Méthode | Description | Exemple |
|---------|-------------|---------|
| \`.get(k, def)\` | Accès sécurisé | \`d.get("x", 0)\` |
| \`.keys()\` | Toutes les clés | \`d.keys()\` |
| \`.values()\` | Toutes les valeurs | \`d.values()\` |
| \`.items()\` | Paires (clé, valeur) | \`d.items()\` |
| \`.update(d2)\` | Fusionner | \`d.update({"x": 1})\` |
| \`.pop(k)\` | Retirer par clé | \`d.pop("x")\` |
| \`.setdefault(k, v)\` | Ajouter si absent | \`d.setdefault("x", 0)\` |

---

## 🔢 Méthodes de Sets

\`\`\`python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# Opérations ensemblistes
print(a.union(b))          # {1, 2, 3, 4, 5, 6}  (ou a | b)
print(a.intersection(b))   # {3, 4}               (ou a & b)
print(a.difference(b))     # {1, 2}               (ou a - b)
print(a.symmetric_difference(b))  # {1, 2, 5, 6}  (ou a ^ b)

# Vérifications
print(a.issubset({1,2,3,4,5}))   # True (a ⊆ ?)
print(a.issuperset({1,2}))       # True (a ⊇ ?)
print(a.isdisjoint({7,8}))       # True (aucun élément commun)

# Modification
a.add(5)
a.discard(99)  # Pas d'erreur si absent
# a.remove(99)  # ❌ KeyError si absent
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Nettoyage de texte
\`\`\`python
def nettoyer(texte):
    """Nettoie un texte : strip, lowercase, remplace espaces multiples."""
    texte = texte.strip().lower()
    while "  " in texte:
        texte = texte.replace("  ", " ")
    return texte

print(nettoyer("  Hello   WORLD  "))  # "hello world"
\`\`\`

### Exercice 2 : Statistiques d'une liste
\`\`\`python
notes = [15, 12, 18, 8, 14, 16, 11, 9, 17, 13]
notes_copy = notes.copy()
notes_copy.sort()
print(f"Triées : {notes_copy}")
print(f"Min : {notes_copy[0]}, Max : {notes_copy[-1]}")
print(f"Occurrences de 15 : {notes.count(15)}")
print(f"Index du 18 : {notes.index(18)}")
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/11-methodes-exercice.py\`
`,

    '12-fonctions': `
# Module 12 : Fonctions

Les **fonctions** sont des blocs de code réutilisables qui accomplissent une tâche précise. Elles sont le pilier de la programmation structurée et vous permettent d'organiser votre code de manière claire et maintenable.

---

## 🧠 Pourquoi les Fonctions ?

Sans fonctions, vous devriez copier-coller le même code partout :

\`\`\`python
# ❌ SANS FONCTION - Répétition
print(f"Bonjour Alice ! Bienvenue.")
print(f"Bonjour Bob ! Bienvenue.")
print(f"Bonjour Charlie ! Bienvenue.")

# ✅ AVEC FONCTION - Réutilisable
def saluer(nom):
    print(f"Bonjour {nom} ! Bienvenue.")

saluer("Alice")
saluer("Bob")
saluer("Charlie")
\`\`\`

### Avantages des fonctions

| Avantage | Description |
|----------|-------------|
| **Réutilisabilité** | Écrire une fois, utiliser partout |
| **Lisibilité** | Code organisé en blocs logiques |
| **Maintenabilité** | Modifier à un seul endroit |
| **Testabilité** | Tester chaque fonction indépendamment |
| **Abstraction** | Cacher la complexité derrière un nom clair |

---

## 📝 Définition de Base

\`\`\`python
def nom_de_la_fonction(parametre1, parametre2):
    """Docstring : description de la fonction."""
    # Corps de la fonction
    resultat = parametre1 + parametre2
    return resultat

# Appel de la fonction
r = nom_de_la_fonction(5, 3)
print(r)  # 8
\`\`\`

### Schéma mental

\`\`\`
def saluer(nom):           ← Définition (les paramètres sont des "slots")
    return f"Bonjour {nom}"
         │
         ▼
saluer("Alice")            ← Appel (les arguments remplissent les slots)
         │
         ▼
"Bonjour Alice"            ← Valeur retournée
\`\`\`

### Fonction sans paramètre

\`\`\`python
def dire_bonjour():
    print("Bonjour !")

dire_bonjour()  # "Bonjour !"
\`\`\`

### Fonction sans return

\`\`\`python
def afficher_cadre(texte):
    largeur = len(texte) + 4
    print("+" + "-" * (largeur - 2) + "+")
    print(f"| {texte} |")
    print("+" + "-" * (largeur - 2) + "+")

afficher_cadre("Python")
# +--------+
# | Python |
# +--------+
\`\`\`

> 💡 Une fonction sans \`return\` retourne implicitement \`None\`.

---

## ↩️ return vs print

> ℹ️ **Concept clé** : \`return\` renvoie une valeur réutilisable, \`print\` affiche à l'écran sans retourner de valeur.

C'est une confusion **très courante** chez les débutants :

\`\`\`python
def avec_return(x):
    return x * 2      # Retourne la valeur → réutilisable

def avec_print(x):
    print(x * 2)       # Affiche, mais ne retourne rien

# Différence fondamentale
a = avec_return(5)    # a = 10 → on peut réutiliser la valeur
b = avec_print(5)     # Affiche 10, mais b = None !

# avec_return permet de chaîner
resultat = avec_return(5) + avec_return(3)  # 10 + 6 = 16

# avec_print ne le permet PAS
# resultat = avec_print(5) + avec_print(3)  # ❌ TypeError: None + None
\`\`\`

> ⚠️ **Règle d'or** : Utilisez \`return\` pour les calculs et \`print\` pour l'affichage. Ne mélangez pas les deux responsabilités dans une même fonction.

### Retourner plusieurs valeurs

Python permet de retourner un **tuple** de valeurs :

\`\`\`python
def min_max(liste):
    return min(liste), max(liste)

# Déstructuration du tuple
mi, ma = min_max([3, 1, 4, 1, 5])
print(f"Min: {mi}, Max: {ma}")  # Min: 1, Max: 5

# Retourner un dictionnaire pour plus de clarté
def statistiques(liste):
    return {
        "min": min(liste),
        "max": max(liste),
        "moyenne": sum(liste) / len(liste)
    }

stats = statistiques([10, 20, 30])
print(stats["moyenne"])  # 20.0
\`\`\`

---

## 📦 Arguments et Paramètres

### Arguments positionnels

L'ordre compte !

\`\`\`python
def presenter(nom, age, ville):
    return f"{nom}, {age} ans, habite à {ville}"

print(presenter("Alice", 25, "Paris"))
# "Alice, 25 ans, habite à Paris"

# ❌ Mauvais ordre → résultat incorrect
print(presenter(25, "Paris", "Alice"))
# "25, Paris ans, habite à Alice"
\`\`\`

### Arguments par défaut

Définissez des valeurs par défaut pour les paramètres optionnels.

\`\`\`python
def saluer(nom, message="Bonjour", ponctuation="!"):
    return f"{message}, {nom}{ponctuation}"

# Utiliser les valeurs par défaut
print(saluer("Alice"))                    # "Bonjour, Alice!"

# Surcharger un ou plusieurs paramètres
print(saluer("Bob", "Salut"))             # "Salut, Bob!"
print(saluer("Charlie", "Hello", "."))    # "Hello, Charlie."
\`\`\`

> ⚠️ **Piège classique** : N'utilisez JAMAIS un objet mutable (liste, dict) comme valeur par défaut !
> 
> **Pourquoi ?** Les valeurs par défaut sont créées **une seule fois** lors de la définition de la fonction, et partagées entre tous les appels.
> 
> \`\`\`python
> # ❌ DANGER : la liste est partagée entre les appels !
> def ajouter(element, liste=[]):
>     liste.append(element)
>     return liste
>
> print(ajouter(1))  # [1]
> print(ajouter(2))  # [1, 2] ← Surprise ! Même liste !
>
> # ✅ Utilisez None à la place
> def ajouter(element, liste=None):
>     if liste is None:
>         liste = []  # Nouvelle liste à chaque appel
>     liste.append(element)
>     return liste
> \`\`\`

### Arguments nommés (keyword)

Vous pouvez passer les arguments par nom, dans n'importe quel ordre.

\`\`\`python
def creer_profil(nom, age, ville, role="utilisateur"):
    return {"nom": nom, "age": age, "ville": ville, "role": role}

# Par position
creer_profil("Alice", 25, "Paris")

# Par nom (plus lisible pour beaucoup de paramètres)
creer_profil(
    ville="Lyon",
    nom="Bob",
    age=30,
    role="admin"
)
\`\`\`

---

## 📦 *args et **kwargs

### *args : Arguments positionnels variables

\`*args\` collecte les arguments positionnels supplémentaires dans un **tuple**.

\`\`\`python
def somme(*args):
    """Additionne un nombre variable d'arguments."""
    print(f"args = {args}")  # C'est un tuple
    return sum(args)

print(somme(1, 2))           # args = (1, 2) → 3
print(somme(1, 2, 3, 4, 5))  # args = (1, 2, 3, 4, 5) → 15
print(somme())                # args = () → 0
\`\`\`

### **kwargs : Arguments nommés variables

\`**kwargs\` collecte les arguments nommés supplémentaires dans un **dictionnaire**.

\`\`\`python
def afficher_infos(**kwargs):
    """Affiche des informations sous forme clé: valeur."""
    print(f"kwargs = {kwargs}")  # C'est un dict
    for cle, valeur in kwargs.items():
        print(f"  {cle}: {valeur}")

afficher_infos(nom="Alice", age=25, ville="Paris")
# kwargs = {'nom': 'Alice', 'age': 25, 'ville': 'Paris'}
#   nom: Alice
#   age: 25
#   ville: Paris
\`\`\`

### Combiner tous les types d'arguments

L'ordre des paramètres doit être respecté :

\`\`\`
def fonction(positionnels, defaut=valeur, *args, **kwargs):
             ▲                ▲              ▲        ▲
             │                │              │        │
         Obligatoires    Optionnels     Tuple      Dict
\`\`\`

\`\`\`python
def fonction_complete(a, b, c=10, *args, **kwargs):
    print(f"a={a}, b={b}, c={c}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

fonction_complete(1, 2, 3, 4, 5, x=10, y=20)
# a=1, b=2, c=3
# args=(4, 5)
# kwargs={'x': 10, 'y': 20}
\`\`\`

### Unpacking avec * et **

\`\`\`python
def addition(a, b, c):
    return a + b + c

# Unpacking d'une liste avec *
nombres = [1, 2, 3]
print(addition(*nombres))  # 6

# Unpacking d'un dict avec **
params = {"a": 1, "b": 2, "c": 3}
print(addition(**params))  # 6
\`\`\`

---

## 📖 Docstrings

Les docstrings documentent vos fonctions. Elles sont accessibles avec \`help()\` et les IDEs les affichent automatiquement.

\`\`\`python
def calculer_imc(poids, taille):
    """
    Calcule l'Indice de Masse Corporelle (IMC).

    Args:
        poids (float): Le poids en kilogrammes.
        taille (float): La taille en mètres.

    Returns:
        float: L'IMC calculé.

    Raises:
        ValueError: Si le poids ou la taille est négatif.

    Examples:
        >>> calculer_imc(70, 1.75)
        22.86
    """
    if poids <= 0 or taille <= 0:
        raise ValueError("Poids et taille doivent être positifs")
    return round(poids / taille ** 2, 2)

# Accéder à la documentation
print(calculer_imc.__doc__)
help(calculer_imc)
\`\`\`

---

## 🔄 Fonctions comme Objets

> 🧠 **Concept avancé** : En Python, les fonctions sont des **objets de première classe**. Cela signifie qu'on peut les manipuler comme n'importe quelle autre valeur (stocker, passer en argument, retourner).

En Python, les fonctions sont des **objets de première classe** : on peut les stocker, les passer en argument, et les retourner.

\`\`\`python
# Stocker dans une variable
def carre(x):
    return x ** 2

f = carre           # f pointe vers la même fonction
print(f(5))         # 25

# Passer en argument
def appliquer(fonction, valeur):
    return fonction(valeur)

print(appliquer(carre, 4))  # 16
print(appliquer(abs, -7))   # 7

# Stocker dans une liste
operations = [carre, abs, len]
print(operations[0](3))  # 9
\`\`\`

---

## 🔁 Récursivité

Une fonction peut **s'appeler elle-même**. C'est la récursivité.

\`\`\`python
def factorielle(n):
    """Calcule n! de manière récursive."""
    if n <= 1:         # Cas de base (condition d'arrêt)
        return 1
    return n * factorielle(n - 1)  # Appel récursif

print(factorielle(5))  # 120 (5 × 4 × 3 × 2 × 1)
\`\`\`

\`\`\`
factorielle(5)
= 5 * factorielle(4)
= 5 * 4 * factorielle(3)
= 5 * 4 * 3 * factorielle(2)
= 5 * 4 * 3 * 2 * factorielle(1)
= 5 * 4 * 3 * 2 * 1
= 120
\`\`\`

> ⚠️ **Attention** : Toujours définir un **cas de base** pour éviter une récursion infinie (\`RecursionError\`).

---

## Exercices 🎯

### Exercice 1 : Palindrome
\`\`\`python
def est_palindrome(texte):
    """Vérifie si un texte est un palindrome."""
    texte = texte.lower().replace(" ", "")
    return texte == texte[::-1]

print(est_palindrome("kayak"))        # True
print(est_palindrome("Été"))          # False
print(est_palindrome("Elu par cette crapule"))  # True
\`\`\`

### Exercice 2 : Calculatrice flexible
\`\`\`python
def calculatrice(a, b, operation="+"):
    """Effectue une opération entre deux nombres."""
    operations = {
        "+": a + b,
        "-": a - b,
        "*": a * b,
        "/": a / b if b != 0 else "Erreur"
    }
    return operations.get(operation, "Opération inconnue")

print(calculatrice(10, 3))         # 13
print(calculatrice(10, 3, "*"))    # 30
\`\`\`

### Exercice 3 : Fonction avec *args
\`\`\`python
def moyenne(*notes):
    """Calcule la moyenne d'un nombre variable de notes."""
    if not notes:
        return 0
    return sum(notes) / len(notes)

print(moyenne(15, 12, 18))       # 15.0
print(moyenne(10, 20))            # 15.0
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/12-fonctions-exercice.py\`
`,

    '13-lambda': `
# Module 13 : Lambda, Map & Filter

Ce module couvre les outils de **programmation fonctionnelle** en Python : les fonctions anonymes (\`lambda\`) et les fonctions d'ordre supérieur (\`map\`, \`filter\`, \`reduce\`) qui permettent de transformer des données de manière élégante et concise.

---

## 🧠 Programmation Fonctionnelle en Python

La programmation fonctionnelle repose sur des **fonctions pures** et le **traitement de données** sans effets de bord :

| Concept | Description | Python |
|---------|-------------|--------|
| **Fonctions anonymes** | Fonctions sans nom, sur une ligne | \`lambda\` |
| **Transformation** | Appliquer une fonction à chaque élément | \`map()\` |
| **Filtrage** | Garder les éléments qui respectent une condition | \`filter()\` |
| **Réduction** | Combiner tous les éléments en une seule valeur | \`reduce()\` |
| **Compréhensions** | Syntaxe Pythonique alternative | \`[x for x in ...]\` |

---

## ⚡ Fonctions Lambda

Une **lambda** est une fonction **anonyme** (sans nom) définie sur une seule ligne.

### Syntaxe

\`\`\`
lambda paramètres: expression
\`\`\`

### Comparaison avec une fonction classique

\`\`\`python
# Fonction classique
def carre(x):
    return x ** 2

# Équivalent en lambda
carre_lambda = lambda x: x ** 2

# Les deux font la même chose
print(carre(5))        # 25
print(carre_lambda(5)) # 25
\`\`\`

### Exemples de lambdas

\`\`\`python
# Un paramètre
double = lambda x: x * 2
print(double(5))  # 10

# Plusieurs paramètres
addition = lambda a, b: a + b
print(addition(3, 4))  # 7

# Avec condition (ternaire)
parite = lambda n: "pair" if n % 2 == 0 else "impair"
print(parite(7))  # "impair"

# Utilisation directe (sans stocker)
print((lambda x: x ** 2)(5))  # 25
\`\`\`

### Quand utiliser les lambdas ?

\`\`\`python
# ✅ BON : comme argument d'une fonction d'ordre supérieur
personnes = [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
tri = sorted(personnes, key=lambda p: p[1])
print(tri)  # [('Bob', 25), ('Alice', 30), ('Charlie', 35)]

# ❌ MAUVAIS : stocker dans une variable (utilisez def)
# carre = lambda x: x ** 2  → Préférez: def carre(x): return x ** 2
\`\`\`

> 💡 **Règle** : Si votre lambda a besoin d'un nom, utilisez plutôt \`def\`. Les lambdas sont conçues pour être **utilisées en place**, pas stockées.

---

## 🔄 map() : Transformer chaque élément

\`map()\` applique une fonction à **chaque élément** d'un itérable et retourne un itérateur.

### Syntaxe

\`\`\`
map(fonction, iterable)
map(fonction, iterable1, iterable2, ...)
\`\`\`

### Exemples

\`\`\`python
nombres = [1, 2, 3, 4, 5]

# Avec lambda
carres = list(map(lambda x: x ** 2, nombres))
print(carres)  # [1, 4, 9, 16, 25]

# Avec une fonction nommée
def celsius_vers_fahrenheit(c):
    return (c * 9/5) + 32

temperatures_c = [0, 20, 37, 100]
temperatures_f = list(map(celsius_vers_fahrenheit, temperatures_c))
print(temperatures_f)  # [32.0, 68.0, 98.6, 212.0]

# Conversion de types
strings = ["1", "2", "3", "4"]
entiers = list(map(int, strings))
print(entiers)  # [1, 2, 3, 4]
\`\`\`

### map() avec plusieurs itérables

\`\`\`python
a = [1, 2, 3]
b = [10, 20, 30]

# Additionner deux listes élément par élément
sommes = list(map(lambda x, y: x + y, a, b))
print(sommes)  # [11, 22, 33]

# Formater des données
noms = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
profils = list(map(lambda n, a: f"{n} ({a} ans)", noms, ages))
print(profils)  # ['Alice (25 ans)', 'Bob (30 ans)', 'Charlie (35 ans)']
\`\`\`

### map() vs List Comprehension

\`\`\`python
nombres = [1, 2, 3, 4, 5]

# map()
carres_map = list(map(lambda x: x ** 2, nombres))

# List comprehension (souvent préféré en Python)
carres_comp = [x ** 2 for x in nombres]

# Les deux donnent le même résultat : [1, 4, 9, 16, 25]
\`\`\`

> 💡 En Python, les **list comprehensions** sont souvent préférées à \`map()\` car plus lisibles. \`map()\` est utile avec des fonctions existantes comme \`int\`, \`str\`, \`len\`.

---

## 🔍 filter() : Garder selon une condition

\`filter()\` garde uniquement les éléments pour lesquels la fonction retourne \`True\`.

### Syntaxe

\`\`\`
filter(fonction, iterable)
\`\`\`

### Exemples

\`\`\`python
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Garder les nombres pairs
pairs = list(filter(lambda x: x % 2 == 0, nombres))
print(pairs)  # [2, 4, 6, 8, 10]

# Garder les mots longs
mots = ["je", "suis", "un", "programmeur", "Python"]
longs = list(filter(lambda m: len(m) > 3, mots))
print(longs)  # ['suis', 'programmeur', 'Python']

# Filtrer les valeurs None ou falsy
donnees = [0, 1, "", "hello", None, 42, [], [1, 2]]
valides = list(filter(None, donnees))
print(valides)  # [1, 'hello', 42, [1, 2]]
\`\`\`

### filter() vs List Comprehension

\`\`\`python
nombres = range(1, 21)

# filter()
pairs_filter = list(filter(lambda x: x % 2 == 0, nombres))

# List comprehension (plus lisible)
pairs_comp = [x for x in nombres if x % 2 == 0]

# Les deux donnent : [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
\`\`\`

### Cas d'usage pratiques

\`\`\`python
# Filtrer des données invalides
emails = ["alice@mail.com", "", "bob@mail.com", None, "charlie@mail.com"]
emails_valides = list(filter(lambda e: e and "@" in e, emails))
print(emails_valides)  # ['alice@mail.com', 'bob@mail.com', 'charlie@mail.com']

# Filtrer des étudiants qui ont la moyenne
etudiants = [
    {"nom": "Alice", "note": 15},
    {"nom": "Bob", "note": 8},
    {"nom": "Charlie", "note": 12},
    {"nom": "Diana", "note": 6}
]
reussis = list(filter(lambda e: e["note"] >= 10, etudiants))
print([e["nom"] for e in reussis])  # ['Alice', 'Charlie']
\`\`\`

---

## 📉 reduce() : Réduire à une valeur

\`reduce()\` applique une fonction **cumulativement** aux éléments pour les réduire à une seule valeur. Elle est dans le module \`functools\`.

### Syntaxe

\`\`\`python
from functools import reduce
reduce(fonction, iterable, valeur_initiale)
\`\`\`

### Schéma mental

\`\`\`
reduce(lambda acc, x: acc + x, [1, 2, 3, 4])

Étape 1: acc=1,   x=2  → 1 + 2 = 3
Étape 2: acc=3,   x=3  → 3 + 3 = 6
Étape 3: acc=6,   x=4  → 6 + 4 = 10
                                    ▲
                              Résultat final
\`\`\`

### Exemples

\`\`\`python
from functools import reduce

nombres = [1, 2, 3, 4, 5]

# Somme (équivalent de sum())
total = reduce(lambda acc, x: acc + x, nombres)
print(total)  # 15

# Produit (factorielle)
produit = reduce(lambda acc, x: acc * x, nombres)
print(produit)  # 120

# Maximum (équivalent de max())
maximum = reduce(lambda a, b: a if a > b else b, nombres)
print(maximum)  # 5

# Avec valeur initiale
total = reduce(lambda acc, x: acc + x, nombres, 100)
print(total)  # 115 (100 + 1 + 2 + 3 + 4 + 5)

# Aplatir une liste de listes
listes = [[1, 2], [3, 4], [5, 6]]
aplatie = reduce(lambda acc, x: acc + x, listes)
print(aplatie)  # [1, 2, 3, 4, 5, 6]
\`\`\`

---

## 🔗 Combiner map, filter, reduce

La puissance de ces fonctions est de les **combiner en pipeline** :

\`\`\`python
from functools import reduce

nombres = range(1, 11)  # 1 à 10

# Pipeline : pairs → carrés → somme
resultat = reduce(
    lambda acc, x: acc + x,       # 3. Somme
    map(
        lambda x: x ** 2,          # 2. Carré
        filter(
            lambda x: x % 2 == 0,  # 1. Filtrer pairs
            nombres
        )
    )
)
print(resultat)  # 220 (4 + 16 + 36 + 64 + 100)
\`\`\`

### Équivalent avec compréhension (plus Pythonique)

\`\`\`python
# Plus lisible en Python
resultat = sum(x ** 2 for x in range(1, 11) if x % 2 == 0)
print(resultat)  # 220
\`\`\`

---

## 📋 Comparaison : Fonctionnel vs Compréhension

| Tâche | Fonctionnel | Compréhension |
|-------|-------------|---------------|
| Transformer | \`list(map(f, lst))\` | \`[f(x) for x in lst]\` |
| Filtrer | \`list(filter(f, lst))\` | \`[x for x in lst if f(x)]\` |
| Transformer + Filtrer | \`list(map(f, filter(g, lst)))\` | \`[f(x) for x in lst if g(x)]\` |
| Réduire | \`reduce(f, lst)\` | Pas d'équivalent direct |

> 💡 **Conseil** : Utilisez les compréhensions pour la lisibilité, \`map/filter\` quand vous passez des fonctions existantes, et \`reduce\` quand vous devez accumuler.

---

## Exercices 🎯

### Exercice 1 : Transformer des données
\`\`\`python
# Convertir des températures Celsius → Fahrenheit
celsius = [0, 10, 20, 30, 40]
fahrenheit = list(map(lambda c: round(c * 9/5 + 32, 1), celsius))
print(fahrenheit)  # [32.0, 50.0, 68.0, 86.0, 104.0]
\`\`\`

### Exercice 2 : Filtrer et transformer
\`\`\`python
# Noms en majuscules des personnes majeures
personnes = [("Alice", 25), ("Bob", 16), ("Charlie", 30), ("Diana", 14)]
majeurs = list(map(
    lambda p: p[0].upper(),
    filter(lambda p: p[1] >= 18, personnes)
))
print(majeurs)  # ['ALICE', 'CHARLIE']
\`\`\`

### Exercice 3 : Pipeline complet
\`\`\`python
from functools import reduce

# Calculer le produit des nombres impairs d'une liste
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9]
produit_impairs = reduce(
    lambda acc, x: acc * x,
    filter(lambda x: x % 2 != 0, nombres)
)
print(produit_impairs)  # 945 (1 * 3 * 5 * 7 * 9)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/13-lambda-exercice.py\`
`,

    '14-scope': `
# Module 14 : Portée (Scope) & Closures

Comprendre la **portée des variables** est essentiel pour écrire du code Python correct et éviter des bugs subtils. Ce module couvre la règle LEGB, les mots-clés \`global\` et \`nonlocal\`, et le concept puissant de **closures**.

---

## 🧠 Qu'est-ce que la Portée (Scope) ?

La **portée** d'une variable détermine **où elle est accessible** dans votre code. Une variable créée dans une fonction n'est pas accessible en dehors.

\`\`\`python
def ma_fonction():
    x = 10  # Variable locale
    print(x)

ma_fonction()   # 10
# print(x)      # ❌ NameError: name 'x' is not defined
\`\`\`

### Pourquoi c'est important ?

\`\`\`python
# Deux variables "x" différentes dans des portées différentes
x = "global"

def modifier():
    x = "local"     # Crée une NOUVELLE variable locale
    print(f"Dans la fonction : {x}")

modifier()             # "Dans la fonction : local"
print(f"En dehors : {x}")  # "En dehors : global" → pas modifié !
\`\`\`

---

## 📐 La Règle LEGB

Python cherche les variables dans **4 niveaux de portée**, dans cet ordre :

\`\`\`
┌─────────────────────────────────────────┐
│  B - Built-in (print, len, range, ...)  │
│  ┌───────────────────────────────────┐  │
│  │  G - Global (niveau du fichier)   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  E - Enclosing (fonction    │  │  │
│  │  │      englobante)            │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │  L - Local (fonction  │  │  │  │
│  │  │  │      actuelle)        │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Python cherche d'abord en L, puis E, puis G, puis B.
\`\`\`

### Exemple complet

\`\`\`python
x = "global"           # G - Global

def externe():
    x = "enclosing"    # E - Enclosing

    def interne():
        x = "local"    # L - Local
        print(x)       # → "local" (trouvé en L)

    interne()
    print(x)           # → "enclosing" (trouvé en E)

externe()
print(x)               # → "global" (trouvé en G)
\`\`\`

### Démonstration sans variables locales

\`\`\`python
x = "global"

def externe():
    x = "enclosing"

    def interne():
        # Pas de x local → Python cherche en E
        print(x)       # → "enclosing"

    interne()

externe()
\`\`\`

\`\`\`python
x = "global"

def externe():
    # Pas de x en E → Python cherche en G
    def interne():
        print(x)       # → "global"

    interne()

externe()
\`\`\`

### Built-in (B)

\`\`\`python
# print, len, range, etc. sont dans la portée Built-in
print(len([1, 2, 3]))  # Python trouve len dans B

# ⚠️ Ne jamais écraser un built-in !
# list = [1, 2, 3]  # ❌ Écrase la fonction list() !
# print(list("hello"))  # ❌ TypeError !
\`\`\`

---

## 🌐 Le mot-clé \`global\`

Par défaut, une assignation dans une fonction crée une **variable locale**. Pour modifier une variable **globale**, utilisez \`global\`.

\`\`\`python
compteur = 0

def incrementer():
    global compteur    # Indique qu'on utilise la variable globale
    compteur += 1

incrementer()
incrementer()
incrementer()
print(compteur)  # 3
\`\`\`

### Sans \`global\` → erreur

\`\`\`python
compteur = 0

def incrementer():
    # compteur += 1
    # ❌ UnboundLocalError: local variable 'compteur'
    #    referenced before assignment
    pass
\`\`\`

> ⚠️ **Bonne pratique** : Évitez \`global\` autant que possible. Préférez passer des valeurs en paramètres et retourner des résultats.

\`\`\`python
# ❌ Avec global (déconseillé)
total = 0
def ajouter(n):
    global total
    total += n

# ✅ Sans global (recommandé)
def ajouter(total, n):
    return total + n

total = 0
total = ajouter(total, 5)
total = ajouter(total, 3)
print(total)  # 8
\`\`\`

---

## 🔗 Le mot-clé \`nonlocal\`

\`nonlocal\` permet de modifier une variable de la **portée englobante** (E), utile dans les fonctions imbriquées.

\`\`\`python
def externe():
    x = 10

    def interne():
        nonlocal x     # Modifie le x de externe()
        x += 5
        print(f"Interne : x = {x}")

    interne()
    print(f"Externe : x = {x}")

externe()
# Interne : x = 15
# Externe : x = 15  → La variable a été modifiée !
\`\`\`

### Différence entre \`global\` et \`nonlocal\`

| Mot-clé | Cible | Usage |
|---------|-------|-------|
| \`global\` | Variable au niveau du **module** (G) | Modifier une variable globale |
| \`nonlocal\` | Variable de la **fonction parente** (E) | Modifier une variable englobante |

\`\`\`python
x = "global"

def externe():
    x = "enclosing"

    def avec_nonlocal():
        nonlocal x
        x = "modifié par nonlocal"

    def avec_global():
        global x
        x = "modifié par global"

    avec_nonlocal()
    print(f"Après nonlocal : {x}")  # "modifié par nonlocal"

    avec_global()
    print(f"Après global (enclosing) : {x}")  # "modifié par nonlocal"

externe()
print(f"Global : {x}")  # "modifié par global"
\`\`\`

---

## 🔒 Closures

Une **closure** est une fonction interne qui **capture et mémorise** les variables de sa fonction englobante, même après que celle-ci ait terminé son exécution.

### Concept

\`\`\`python
def creer_salutation(message):
    # 'message' est capturé par la closure
    def saluer(nom):
        return f"{message}, {nom} !"
    return saluer

# La fonction externe a terminé, mais 'message' est capturé
bonjour = creer_salutation("Bonjour")
hello = creer_salutation("Hello")

print(bonjour("Alice"))  # "Bonjour, Alice !"
print(hello("Bob"))      # "Hello, Bob !"
\`\`\`

### Schéma mental

\`\`\`
creer_salutation("Bonjour")
        │
        ▼
    ┌──────────────────────────┐
    │ message = "Bonjour"      │  ← Variable capturée
    │                          │
    │ def saluer(nom):         │  ← Fonction retournée
    │     return message + nom │
    └──────────────────────────┘
        │
        ▼
    bonjour = saluer   ← La closure "se souvient" de message
    bonjour("Alice")   → "Bonjour, Alice !"
\`\`\`

### Exemple : Multiplicateur

\`\`\`python
def creer_multiplicateur(facteur):
    def multiplier(x):
        return x * facteur  # facteur est capturé
    return multiplier

double = creer_multiplicateur(2)
triple = creer_multiplicateur(3)

print(double(5))   # 10
print(triple(5))   # 15
print(double(10))  # 20

# Vérifier les variables capturées
print(double.__closure__[0].cell_contents)  # 2
\`\`\`

### Exemple : Compteur avec état

\`\`\`python
def creer_compteur(debut=0):
    compte = debut

    def incrementer():
        nonlocal compte
        compte += 1
        return compte

    def obtenir():
        return compte

    def reinitialiser():
        nonlocal compte
        compte = debut

    # Retourner plusieurs fonctions
    return incrementer, obtenir, reinitialiser

inc, get, reset = creer_compteur(0)

print(inc())   # 1
print(inc())   # 2
print(inc())   # 3
print(get())   # 3
reset()
print(get())   # 0
\`\`\`

### Exemple : Logger configurable

\`\`\`python
def creer_logger(prefixe):
    def logger(message):
        print(f"[{prefixe}] {message}")
    return logger

info = creer_logger("INFO")
erreur = creer_logger("ERROR")
debug = creer_logger("DEBUG")

info("Application démarrée")     # [INFO] Application démarrée
erreur("Fichier non trouvé")     # [ERROR] Fichier non trouvé
debug("Variable x = 42")         # [DEBUG] Variable x = 42
\`\`\`

---

## ⚠️ Piège classique : Closure dans une boucle

\`\`\`python
# ❌ Piège : toutes les fonctions capturent la MÊME variable i
fonctions = []
for i in range(5):
    fonctions.append(lambda: i)

print([f() for f in fonctions])  # [4, 4, 4, 4, 4] ← Surprise !

# ✅ Solution : capturer la valeur avec un paramètre par défaut
fonctions = []
for i in range(5):
    fonctions.append(lambda x=i: x)  # x=i "fige" la valeur

print([f() for f in fonctions])  # [0, 1, 2, 3, 4] ← Correct !
\`\`\`

---

## 📋 Récapitulatif

| Concept | Description | Quand l'utiliser |
|---------|-------------|------------------|
| **LEGB** | Ordre de recherche des variables | Comprendre la résolution |
| **\`global\`** | Accéder à une variable du module | Rarement (éviter si possible) |
| **\`nonlocal\`** | Accéder à une variable englobante | Dans les closures |
| **Closure** | Fonction qui capture son environnement | Fonctions configurables, factories |

---

## Exercices 🎯

### Exercice 1 : Comprendre LEGB
\`\`\`python
x = 10

def f():
    x = 20
    def g():
        x = 30
        print(x)  # Que vaut x ?
    g()
    print(x)      # Et ici ?

f()
print(x)          # Et là ?
# Réponses : 30, 20, 10
\`\`\`

### Exercice 2 : Factory de puissances
\`\`\`python
def creer_puissance(n):
    """Crée une fonction qui élève à la puissance n."""
    def puissance(x):
        return x ** n
    return puissance

carre = creer_puissance(2)
cube = creer_puissance(3)

print(carre(5))  # 25
print(cube(3))   # 27
\`\`\`

### Exercice 3 : Accumulateur
\`\`\`python
def creer_accumulateur():
    """Crée un accumulateur qui additionne les valeurs successives."""
    total = 0

    def ajouter(n):
        nonlocal total
        total += n
        return total

    return ajouter

acc = creer_accumulateur()
print(acc(5))   # 5
print(acc(10))  # 15
print(acc(3))   # 18
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/14-scope-exercice.py\`
`,

    '15-poo-bases': `
# Module 15 : POO - Classes & Objets

La **Programmation Orientée Objet** (POO) est un paradigme de programmation qui permet de structurer son code en regroupant des **données** et des **comportements** dans des entités appelées **objets**. C'est le paradigme dominant dans le développement logiciel moderne, et Python est un langage **entièrement orienté objet** : tout y est un objet (même les entiers, les fonctions et les modules).

---

## 🧠 Pourquoi la POO ?

Jusqu'ici, vous avez programmé en style **procédural** : des fonctions qui transforment des données. La POO propose une autre approche.

### Comparaison des paradigmes

| Paradigme | Principe | Exemple Python |
|-----------|----------|----------------|
| **Procédural** | Séquence d'instructions et fonctions | \`def calculer_aire(rayon): ...\` |
| **Fonctionnel** | Fonctions pures, pas d'effets de bord | \`map(lambda x: x**2, liste)\` |
| **Orienté Objet** | Objets qui contiennent données + comportements | \`cercle.aire()\` |

### Les 4 piliers de la POO

| Pilier | Description | Analogie |
|--------|-------------|----------|
| **Encapsulation** | Regrouper données et méthodes, cacher les détails internes | Une voiture : on tourne le volant sans connaître la mécanique |
| **Abstraction** | Exposer uniquement l'essentiel, masquer la complexité | Une télécommande : des boutons simples pour un système complexe |
| **Héritage** | Créer de nouvelles classes à partir de classes existantes | Un chat **est un** animal (partage des caractéristiques) |
| **Polymorphisme** | Même interface, comportements différents | \`parler()\` → le chien aboie, le chat miaule |

> 💡 **L'héritage et le polymorphisme** seront approfondis dans le Module 16. Ce module se concentre sur l'**encapsulation** et l'**abstraction**.

---

## 📦 Classes et Objets : Le Concept

### Le Schéma Mental

Une **classe** est un **plan de construction** (un moule). Un **objet** (ou **instance**) est une **réalisation concrète** de ce plan.

\`\`\`
    CLASSE (Plan)                    OBJETS (Instances)
┌─────────────────────┐
│     Chien           │         rex = Chien("Rex", 3)
│                     │         ┌──────────────────┐
│  Attributs:         │    ──►  │ nom = "Rex"      │
│    - nom            │         │ age = 3          │
│    - age            │         └──────────────────┘
│                     │
│  Méthodes:          │         medor = Chien("Médor", 5)
│    - aboyer()       │         ┌──────────────────┐
│    - anniversaire() │    ──►  │ nom = "Médor"    │
│                     │         │ age = 5          │
└─────────────────────┘         └──────────────────┘
      UN seul plan          PLUSIEURS objets indépendants
\`\`\`

> 💡 **À retenir** : La classe définit **quels** attributs et méthodes un objet possède. Chaque instance a ses **propres valeurs** pour ces attributs.

---

## 🔨 Créer sa Première Classe

### Syntaxe de base

\`\`\`python
class Chien:
    """Représente un chien avec un nom et un âge."""

    # Le constructeur : appelé automatiquement à la création
    def __init__(self, nom, age):
        self.nom = nom    # Attribut d'instance
        self.age = age    # Attribut d'instance

    # Méthode d'instance
    def aboyer(self):
        return f"{self.nom} dit : Woof !"

    def anniversaire(self):
        self.age += 1
        return f"{self.nom} a maintenant {self.age} ans !"
\`\`\`

### Créer et utiliser des objets

\`\`\`python
# Créer des instances (appelle __init__ automatiquement)
rex = Chien("Rex", 3)
medor = Chien("Médor", 5)

# Accéder aux attributs
print(rex.nom)     # "Rex"
print(medor.age)   # 5

# Appeler des méthodes
print(rex.aboyer())         # "Rex dit : Woof !"
print(medor.anniversaire()) # "Médor a maintenant 6 ans !"

# Chaque objet est indépendant
print(rex.age)    # 3 (non affecté par l'anniversaire de Médor)
print(medor.age)  # 6
\`\`\`

### Ce qui se passe en mémoire

\`\`\`
Quand on écrit : rex = Chien("Rex", 3)

1. Python crée un objet vide en mémoire
2. Python appelle __init__(objet_vide, "Rex", 3)
3. self.nom = "Rex"  →  l'objet reçoit l'attribut nom
4. self.age = 3      →  l'objet reçoit l'attribut age
5. L'objet est retourné et assigné à la variable rex
\`\`\`

---

## 🔑 Comprendre \`self\`

\`self\` est le paramètre le plus important en POO Python. Il représente **l'instance sur laquelle la méthode est appelée**.

\`\`\`python
class Personne:
    def __init__(self, nom, age):
        self.nom = nom    # Stocke "nom" dans l'instance
        self.age = age

    def se_presenter(self):
        return f"Je suis {self.nom}, j'ai {self.age} ans"

alice = Personne("Alice", 30)
bob = Personne("Bob", 25)

# Quand on écrit :
alice.se_presenter()

# Python transforme en :
Personne.se_presenter(alice)
# self = alice, donc self.nom = "Alice"
\`\`\`

### Pourquoi \`self\` est obligatoire ?

\`\`\`python
class Mauvais:
    def __init__(self, valeur):
        valeur = valeur  # ❌ Variable locale ! Perdue après __init__

    def afficher(self):
        print(valeur)    # ❌ NameError : valeur n'existe pas

class Bon:
    def __init__(self, valeur):
        self.valeur = valeur  # ✅ Stocké dans l'instance

    def afficher(self):
        print(self.valeur)    # ✅ Accède à l'attribut de l'instance
\`\`\`

> ⚠️ **Erreur fréquente** : Oublier \`self.\` devant un attribut dans \`__init__\`. Sans \`self.\`, la variable est locale et disparaît à la fin de \`__init__\`.

---

## 📊 Attributs de Classe vs Attributs d'Instance

Il existe deux types d'attributs, et les confondre est une erreur courante.

### Les deux types

\`\`\`python
class Employe:
    # ATTRIBUT DE CLASSE : partagé par TOUTES les instances
    entreprise = "TechCorp"
    nombre_employes = 0

    def __init__(self, nom, salaire):
        # ATTRIBUTS D'INSTANCE : propres à CHAQUE instance
        self.nom = nom
        self.salaire = salaire

        # Modifier l'attribut de classe via la classe
        Employe.nombre_employes += 1

# Création d'instances
alice = Employe("Alice", 45000)
bob = Employe("Bob", 50000)

# Attribut de classe : identique pour tous
print(alice.entreprise)       # "TechCorp"
print(bob.entreprise)         # "TechCorp"
print(Employe.entreprise)     # "TechCorp"

# Attribut d'instance : propre à chacun
print(alice.nom)     # "Alice"
print(bob.nom)       # "Bob"

# Le compteur est partagé
print(Employe.nombre_employes)  # 2
\`\`\`

### Schéma en mémoire

\`\`\`
Classe Employe
┌──────────────────────────┐
│ entreprise = "TechCorp"  │ ◄── Partagé
│ nombre_employes = 2      │ ◄── Partagé
└──────────┬───────────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
 Instance 1    Instance 2
┌───────────┐ ┌───────────┐
│nom="Alice"│ │nom="Bob"  │
│sal=45000  │ │sal=50000  │
└───────────┘ └───────────┘
   Propre        Propre
\`\`\`

### Comparaison

| Caractéristique | Attribut de classe | Attribut d'instance |
|-----------------|-------------------|---------------------|
| **Définition** | Dans le corps de la classe | Dans \`__init__\` avec \`self.\` |
| **Portée** | Partagé par toutes les instances | Propre à chaque instance |
| **Accès** | \`Classe.attr\` ou \`instance.attr\` | \`instance.attr\` uniquement |
| **Usage typique** | Constantes, compteurs, config | Données spécifiques à l'objet |

> ⚠️ **Piège classique** : Si vous modifiez un attribut de classe via une instance (\`alice.entreprise = "Autre"\`), Python crée un **nouvel attribut d'instance** qui masque l'attribut de classe. Utilisez toujours \`Classe.attribut\` pour modifier un attribut de classe.

---

## ⚙️ Méthodes d'Instance

Les méthodes sont des **fonctions définies dans une classe**. Les méthodes d'instance prennent toujours \`self\` comme premier paramètre.

\`\`\`python
class Cercle:
    """Représente un cercle géométrique."""

    pi = 3.14159  # Attribut de classe (constante)

    def __init__(self, rayon):
        self.rayon = rayon

    def aire(self):
        """Calcule l'aire du cercle."""
        return Cercle.pi * self.rayon ** 2

    def perimetre(self):
        """Calcule le périmètre du cercle."""
        return 2 * Cercle.pi * self.rayon

    def redimensionner(self, facteur):
        """Modifie le rayon par un facteur multiplicatif."""
        self.rayon *= facteur

    def contient(self, autre_cercle):
        """Vérifie si ce cercle contient un autre cercle."""
        return self.rayon > autre_cercle.rayon

# Utilisation
c1 = Cercle(5)
c2 = Cercle(3)

print(f"Aire : {c1.aire():.2f}")         # Aire : 78.54
print(f"Périmètre : {c1.perimetre():.2f}") # Périmètre : 31.42
print(f"c1 contient c2 : {c1.contient(c2)}")  # True

c1.redimensionner(2)
print(f"Nouveau rayon : {c1.rayon}")  # 10
\`\`\`

---

## 🔍 Introspection : Examiner un Objet

Python offre plusieurs outils pour inspecter des objets, très utiles pour le débogage.

\`\`\`python
class Voiture:
    def __init__(self, marque, modele, annee):
        self.marque = marque
        self.modele = modele
        self.annee = annee

ma_voiture = Voiture("Peugeot", "308", 2023)

# type() : quel est le type ?
print(type(ma_voiture))  # <class '__main__.Voiture'>

# isinstance() : est-ce une instance de cette classe ?
print(isinstance(ma_voiture, Voiture))  # True
print(isinstance(ma_voiture, str))      # False

# hasattr() : l'objet a-t-il cet attribut ?
print(hasattr(ma_voiture, 'marque'))    # True
print(hasattr(ma_voiture, 'couleur'))   # False

# getattr() : obtenir un attribut (avec valeur par défaut)
print(getattr(ma_voiture, 'marque'))            # "Peugeot"
print(getattr(ma_voiture, 'couleur', 'Gris'))   # "Gris" (défaut)

# vars() : voir tous les attributs d'instance
print(vars(ma_voiture))
# {'marque': 'Peugeot', 'modele': '308', 'annee': 2023}

# dir() : voir TOUT (attributs + méthodes + hérités)
print([m for m in dir(ma_voiture) if not m.startswith('_')])
# ['annee', 'marque', 'modele']
\`\`\`

> 💡 **Astuce** : \`vars(objet)\` est très pratique pour le débogage. Il retourne un dictionnaire de tous les attributs d'instance.

---

## 📝 Bonnes Pratiques

### Conventions de nommage

\`\`\`python
# ✅ Noms de classes : PascalCase (CamelCase avec majuscule)
class CompteBancaire:
    pass

class JoueurDeFootball:
    pass

# ✅ Noms d'attributs et méthodes : snake_case
class Etudiant:
    def __init__(self, nom_complet, numero_etudiant):
        self.nom_complet = nom_complet
        self.numero_etudiant = numero_etudiant

    def calculer_moyenne(self):
        pass

# ❌ À éviter
class compte_bancaire:    # Pas de snake_case pour les classes
    pass

class CB:                 # Trop abrégé
    pass
\`\`\`

### Attributs "privés" (convention)

\`\`\`python
class CompteBancaire:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire    # Public
        self._solde = solde           # "Protégé" (convention : ne pas accéder directement)
        self.__pin = "1234"           # "Privé" (name mangling : _CompteBancaire__pin)

    def get_solde(self):
        return self._solde

compte = CompteBancaire("Alice", 1000)
print(compte.titulaire)    # ✅ OK - attribut public
print(compte._solde)       # ⚠️ Fonctionne mais déconseillé
# print(compte.__pin)      # ❌ AttributeError
print(compte._CompteBancaire__pin)  # ⚠️ Fonctionne (name mangling) mais à éviter
\`\`\`

| Préfixe | Convention | Signification |
|---------|------------|---------------|
| \`nom\` | Public | Accès libre |
| \`_nom\` | Protégé | Usage interne (convention, pas appliqué) |
| \`__nom\` | Privé | Name mangling (renommé en \`_Classe__nom\`) |
| \`__nom__\` | Spécial | Méthodes magiques Python (ne pas inventer) |

> 💡 En Python, la convention "privé" est basée sur la **confiance** entre développeurs, pas sur des restrictions strictes comme en Java. L'underscore \`_\` est un signal : "ne touche pas à ça de l'extérieur".

---

## 🏗️ Exemple Complet : Classe CompteBancaire

Voici un exemple concret qui rassemble tous les concepts vus dans ce module.

\`\`\`python
class CompteBancaire:
    """Gère un compte bancaire avec dépôts et retraits."""

    # Attribut de classe
    taux_interet = 0.02  # 2%
    nombre_comptes = 0

    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self._solde = solde
        self._historique = []
        CompteBancaire.nombre_comptes += 1

    def deposer(self, montant):
        """Dépose un montant sur le compte."""
        if montant <= 0:
            return "Le montant doit être positif"
        self._solde += montant
        self._historique.append(f"+{montant}€")
        return f"Dépôt de {montant}€. Nouveau solde : {self._solde}€"

    def retirer(self, montant):
        """Retire un montant du compte."""
        if montant <= 0:
            return "Le montant doit être positif"
        if montant > self._solde:
            return f"Solde insuffisant ({self._solde}€)"
        self._solde -= montant
        self._historique.append(f"-{montant}€")
        return f"Retrait de {montant}€. Nouveau solde : {self._solde}€"

    def appliquer_interets(self):
        """Applique les intérêts annuels."""
        interets = self._solde * CompteBancaire.taux_interet
        self._solde += interets
        self._historique.append(f"+{interets:.2f}€ (intérêts)")
        return f"Intérêts : +{interets:.2f}€"

    def afficher_historique(self):
        """Affiche l'historique des transactions."""
        print(f"--- Historique de {self.titulaire} ---")
        for operation in self._historique:
            print(f"  {operation}")
        print(f"  Solde actuel : {self._solde}€")

    def get_solde(self):
        return self._solde

# Utilisation
compte = CompteBancaire("Alice", 1000)
print(compte.deposer(500))        # Dépôt de 500€. Nouveau solde : 1500€
print(compte.retirer(200))        # Retrait de 200€. Nouveau solde : 1300€
print(compte.appliquer_interets()) # Intérêts : +26.00€
compte.afficher_historique()
# --- Historique de Alice ---
#   +500€
#   -200€
#   +26.00€ (intérêts)
#   Solde actuel : 1326.0€
\`\`\`

---

## ⚡ "Tout est Objet" en Python

Pour bien comprendre la POO en Python, il faut réaliser que vous utilisez déjà des objets depuis le début du cours.

\`\`\`python
# Les strings sont des objets de la classe str
texte = "hello"
print(type(texte))        # <class 'str'>
print(texte.upper())      # "HELLO" → méthode d'instance
print(texte.count("l"))   # 2

# Les listes sont des objets de la classe list
ma_liste = [3, 1, 2]
print(type(ma_liste))     # <class 'list'>
ma_liste.sort()           # Méthode qui modifie l'objet
ma_liste.append(4)        # Méthode qui modifie l'objet

# Même les entiers sont des objets !
nombre = 42
print(type(nombre))       # <class 'int'>
print(nombre.bit_length()) # 6 (nombre de bits)

# Les fonctions aussi !
def saluer():
    pass
print(type(saluer))       # <class 'function'>
\`\`\`

> 💡 **Conclusion** : Quand vous écrivez \`"hello".upper()\`, vous appelez la méthode \`upper()\` de l'objet \`"hello"\` qui est une instance de la classe \`str\`. La POO, vous la pratiquez déjà !

---

## Exercices 🎯

### Exercice 1 : Classe Rectangle
\`\`\`python
class Rectangle:
    def __init__(self, longueur, largeur):
        self.longueur = longueur
        self.largeur = largeur

    def aire(self):
        return self.longueur * self.largeur

    def perimetre(self):
        return 2 * (self.longueur + self.largeur)

    def est_carre(self):
        return self.longueur == self.largeur

r = Rectangle(5, 3)
print(f"Aire : {r.aire()}")          # 15
print(f"Périmètre : {r.perimetre()}")  # 16
print(f"Carré ? {r.est_carre()}")     # False
\`\`\`

### Exercice 2 : Classe Etudiant avec moyenne
\`\`\`python
class Etudiant:
    def __init__(self, nom, prenom):
        self.nom = nom
        self.prenom = prenom
        self.notes = []

    def ajouter_note(self, note):
        if 0 <= note <= 20:
            self.notes.append(note)

    def moyenne(self):
        if not self.notes:
            return 0
        return sum(self.notes) / len(self.notes)

    def mention(self):
        moy = self.moyenne()
        if moy >= 16: return "Très Bien"
        if moy >= 14: return "Bien"
        if moy >= 12: return "Assez Bien"
        if moy >= 10: return "Passable"
        return "Ajourné"

e = Etudiant("Dupont", "Alice")
e.ajouter_note(15)
e.ajouter_note(12)
e.ajouter_note(18)
print(f"Moyenne : {e.moyenne():.1f}")  # 15.0
print(f"Mention : {e.mention()}")      # Bien
\`\`\`

### Exercice 3 : Classe Inventaire
\`\`\`python
class Inventaire:
    def __init__(self):
        self.produits = {}

    def ajouter(self, nom, quantite, prix):
        self.produits[nom] = {"quantite": quantite, "prix": prix}

    def valeur_totale(self):
        return sum(p["quantite"] * p["prix"] for p in self.produits.values())

    def produit_le_plus_cher(self):
        if not self.produits:
            return None
        return max(self.produits, key=lambda n: self.produits[n]["prix"])

inv = Inventaire()
inv.ajouter("Clavier", 10, 49.99)
inv.ajouter("Souris", 25, 29.99)
inv.ajouter("Écran", 5, 299.99)
print(f"Valeur totale : {inv.valeur_totale():.2f}€")  # 2749.60€
print(f"Plus cher : {inv.produit_le_plus_cher()}")     # Écran
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/15-poo-bases-exercice.py\`
`,

    '16-poo-avancee': `
# Module 16 : POO Avancée

Ce module approfondit la Programmation Orientée Objet avec les concepts avancés : **héritage**, **polymorphisme**, **méthodes spéciales**, **propriétés** et **composition**. Ces outils vous permettront de concevoir des architectures de code robustes et maintenables.

---

## 🧬 Héritage : Réutiliser et Spécialiser

L'**héritage** permet de créer une nouvelle classe (**classe fille**) à partir d'une classe existante (**classe mère**). La classe fille **hérite** de tous les attributs et méthodes de la classe mère, et peut en ajouter ou en modifier.

### Schéma de l'héritage

\`\`\`
        Animal (classe mère / parent)
        ┌─────────────────────────┐
        │ nom                     │
        │ age                     │
        │ manger()                │
        │ dormir()                │
        └────────┬────────────────┘
                 │ hérite de
        ┌────────┴────────┐
        ▼                 ▼
    Chien              Chat
┌────────────┐   ┌────────────┐
│ race       │   │ interieur  │
│ aboyer()   │   │ ronronner()│
│ manger() ● │   │ manger() ● │
└────────────┘   └────────────┘
● = méthode redéfinie (override)
\`\`\`

### Syntaxe de l'héritage

\`\`\`python
class Animal:
    """Classe mère pour tous les animaux."""

    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def manger(self):
        return f"{self.nom} mange"

    def dormir(self):
        return f"{self.nom} dort"

    def se_presenter(self):
        return f"{self.nom}, {self.age} ans"


class Chien(Animal):  # Chien HÉRITE de Animal
    """Un chien est un animal avec une race."""

    def __init__(self, nom, age, race):
        super().__init__(nom, age)  # Appelle __init__ de Animal
        self.race = race            # Attribut spécifique à Chien

    def aboyer(self):
        return f"{self.nom} dit : Woof !"

    # Override (redéfinition) de la méthode manger
    def manger(self):
        return f"{self.nom} croque ses croquettes"


class Chat(Animal):
    """Un chat est un animal qui peut être d'intérieur."""

    def __init__(self, nom, age, interieur=True):
        super().__init__(nom, age)
        self.interieur = interieur

    def ronronner(self):
        return f"{self.nom} ronronne..."

    def manger(self):
        return f"{self.nom} déguste ses pâtées"


# Utilisation
rex = Chien("Rex", 3, "Berger Allemand")
minou = Chat("Minou", 5)

# Méthodes héritées (de Animal)
print(rex.dormir())         # "Rex dort"
print(minou.se_presenter()) # "Minou, 5 ans"

# Méthodes propres
print(rex.aboyer())         # "Rex dit : Woof !"
print(minou.ronronner())    # "Minou ronronne..."

# Méthodes redéfinies (override)
print(rex.manger())         # "Rex croque ses croquettes"
print(minou.manger())       # "Minou déguste ses pâtées"

# Attributs spécifiques
print(rex.race)         # "Berger Allemand"
print(minou.interieur)  # True
\`\`\`

---

## 🔗 super() : Appeler la Classe Mère

\`super()\` permet d'appeler les méthodes de la classe mère depuis la classe fille. C'est essentiel dans le constructeur pour initialiser les attributs hérités.

\`\`\`python
class Vehicule:
    def __init__(self, marque, modele, annee):
        self.marque = marque
        self.modele = modele
        self.annee = annee

    def description(self):
        return f"{self.marque} {self.modele} ({self.annee})"


class Voiture(Vehicule):
    def __init__(self, marque, modele, annee, nb_portes):
        # super() appelle Vehicule.__init__()
        super().__init__(marque, modele, annee)
        self.nb_portes = nb_portes

    def description(self):
        # Réutiliser la méthode du parent + ajouter des infos
        base = super().description()
        return f"{base} - {self.nb_portes} portes"


class VoitureElectrique(Voiture):
    def __init__(self, marque, modele, annee, nb_portes, autonomie_km):
        super().__init__(marque, modele, annee, nb_portes)
        self.autonomie_km = autonomie_km

    def description(self):
        base = super().description()
        return f"{base} - {self.autonomie_km}km d'autonomie"


# Chaîne d'héritage : VoitureElectrique → Voiture → Vehicule
tesla = VoitureElectrique("Tesla", "Model 3", 2024, 4, 510)
print(tesla.description())
# "Tesla Model 3 (2024) - 4 portes - 510km d'autonomie"
\`\`\`

> 💡 **Bonne pratique** : Toujours appeler \`super().__init__()\` dans le constructeur d'une classe fille, sinon les attributs de la classe mère ne seront pas initialisés.

---

## 🎭 Polymorphisme

Le **polymorphisme** signifie "plusieurs formes". En POO, c'est la capacité d'objets de classes différentes à répondre à la **même interface** (même nom de méthode) avec des **comportements différents**.

\`\`\`python
class Forme:
    def aire(self):
        raise NotImplementedError("Les sous-classes doivent implémenter aire()")

    def decrire(self):
        return f"{self.__class__.__name__} d'aire {self.aire():.2f}"

class Carre(Forme):
    def __init__(self, cote):
        self.cote = cote

    def aire(self):
        return self.cote ** 2

class Cercle(Forme):
    def __init__(self, rayon):
        self.rayon = rayon

    def aire(self):
        return 3.14159 * self.rayon ** 2

class Triangle(Forme):
    def __init__(self, base, hauteur):
        self.base = base
        self.hauteur = hauteur

    def aire(self):
        return 0.5 * self.base * self.hauteur


# Le polymorphisme en action
formes = [Carre(5), Cercle(3), Triangle(4, 6)]

for forme in formes:
    # Même appel, comportement différent
    print(forme.decrire())

# Carre d'aire 25.00
# Cercle d'aire 28.27
# Triangle d'aire 12.00
\`\`\`

### Pourquoi c'est puissant ?

\`\`\`python
# On peut écrire des fonctions qui acceptent N'IMPORTE quelle forme
def aire_totale(formes):
    """Fonctionne avec toute classe qui a une méthode aire()."""
    return sum(f.aire() for f in formes)

print(f"Aire totale : {aire_totale(formes):.2f}")  # 65.27
\`\`\`

> 💡 Le polymorphisme permet d'écrire du code **générique** qui fonctionne avec n'importe quel objet tant qu'il respecte l'interface attendue. C'est le principe du **Duck Typing** en Python : "Si ça marche comme un canard et que ça fait coin-coin, alors c'est un canard."

---

## 🔍 Vérifier l'héritage

\`\`\`python
rex = Chien("Rex", 3, "Labrador")

# isinstance() : vérifie l'instance ET les classes parentes
print(isinstance(rex, Chien))    # True
print(isinstance(rex, Animal))   # True  ← rex est AUSSI un Animal
print(isinstance(rex, Chat))     # False

# issubclass() : vérifie la hiérarchie de classes
print(issubclass(Chien, Animal))  # True
print(issubclass(Chat, Animal))   # True
print(issubclass(Chien, Chat))    # False

# MRO (Method Resolution Order) : ordre de recherche des méthodes
print(Chien.__mro__)
# (<class 'Chien'>, <class 'Animal'>, <class 'object'>)
\`\`\`

### Héritage multiple

Python supporte l'héritage multiple (une classe peut hériter de plusieurs classes). C'est puissant mais à utiliser avec précaution.

\`\`\`python
class Volant:
    def voler(self):
        return f"{self.nom} vole"

class Nageant:
    def nager(self):
        return f"{self.nom} nage"

class Canard(Animal, Volant, Nageant):
    def __init__(self, nom, age):
        super().__init__(nom, age)

    def cancaner(self):
        return f"{self.nom} fait : Coin coin !"

donald = Canard("Donald", 2)
print(donald.voler())    # "Donald vole"
print(donald.nager())    # "Donald nage"
print(donald.dormir())   # "Donald dort" (hérité de Animal)
print(donald.cancaner()) # "Donald fait : Coin coin !"

# Ordre de résolution
print(Canard.__mro__)
# (Canard, Animal, Volant, Nageant, object)
\`\`\`

> ⚠️ **Attention** : L'héritage multiple peut créer le **problème du diamant** (deux classes parentes qui héritent de la même classe). Python le gère via le MRO (algorithme C3), mais préférez la **composition** quand c'est possible (voir fin du module).

---

## ✨ Méthodes Spéciales (Dunder Methods)

Les méthodes spéciales (ou **dunder methods**, pour "double underscore") permettent de personnaliser le comportement de vos objets avec les opérateurs et fonctions Python natives.

### Les plus courantes

| Méthode | Déclenchée par | Exemple |
|---------|----------------|---------|
| \`__init__(self, ...)\` | Création : \`Classe()\` | Constructeur |
| \`__str__(self)\` | \`str(obj)\`, \`print(obj)\` | Affichage lisible |
| \`__repr__(self)\` | \`repr(obj)\`, console | Affichage technique |
| \`__len__(self)\` | \`len(obj)\` | Taille de l'objet |
| \`__eq__(self, other)\` | \`obj == other\` | Égalité |
| \`__lt__(self, other)\` | \`obj < other\` | Inférieur à |
| \`__add__(self, other)\` | \`obj + other\` | Addition |
| \`__contains__(self, item)\` | \`item in obj\` | Appartenance |
| \`__getitem__(self, key)\` | \`obj[key]\` | Accès par index |
| \`__iter__(self)\` | \`for x in obj\` | Itération |
| \`__call__(self, ...)\` | \`obj()\` | Appel comme fonction |

### Exemple complet : Classe Vecteur

\`\`\`python
class Vecteur:
    """Vecteur 2D avec opérations mathématiques."""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Affichage lisible (pour l'utilisateur)
    def __str__(self):
        return f"Vecteur({self.x}, {self.y})"

    # Affichage technique (pour le développeur)
    def __repr__(self):
        return f"Vecteur({self.x!r}, {self.y!r})"

    # Addition : v1 + v2
    def __add__(self, other):
        return Vecteur(self.x + other.x, self.y + other.y)

    # Soustraction : v1 - v2
    def __sub__(self, other):
        return Vecteur(self.x - other.x, self.y - other.y)

    # Multiplication scalaire : v * 3
    def __mul__(self, scalaire):
        return Vecteur(self.x * scalaire, self.y * scalaire)

    # Égalité : v1 == v2
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    # Valeur absolue / norme : abs(v)
    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    # Longueur (dimension)
    def __len__(self):
        return 2  # Un vecteur 2D a toujours 2 composantes

    # Accès par index : v[0], v[1]
    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        raise IndexError("Un vecteur 2D n'a que 2 composantes")

    # Itération : for composante in v
    def __iter__(self):
        yield self.x
        yield self.y

    # Booléen : bool(v) → False si vecteur nul
    def __bool__(self):
        return self.x != 0 or self.y != 0


# Utilisation naturelle grâce aux dunder methods
v1 = Vecteur(3, 4)
v2 = Vecteur(1, 2)

print(v1)              # Vecteur(3, 4)     → __str__
print(v1 + v2)         # Vecteur(4, 6)     → __add__
print(v1 - v2)         # Vecteur(2, 2)     → __sub__
print(v1 * 3)          # Vecteur(9, 12)    → __mul__
print(v1 == v2)        # False             → __eq__
print(abs(v1))         # 5.0               → __abs__
print(v1[0])           # 3                 → __getitem__
print(list(v1))        # [3, 4]            → __iter__
\`\`\`

### __str__ vs __repr__

\`\`\`python
class Produit:
    def __init__(self, nom, prix):
        self.nom = nom
        self.prix = prix

    def __str__(self):
        return f"{self.nom} - {self.prix}€"  # Pour l'utilisateur

    def __repr__(self):
        return f"Produit('{self.nom}', {self.prix})"  # Pour le développeur

p = Produit("Clavier", 49.99)
print(str(p))    # "Clavier - 49.99€"
print(repr(p))   # "Produit('Clavier', 49.99)"
print(p)         # "Clavier - 49.99€" (print utilise __str__)

# Dans une liste, Python utilise __repr__
print([p])       # [Produit('Clavier', 49.99)]
\`\`\`

> 💡 **Règle** : Implémentez toujours \`__repr__\` en priorité. Si \`__str__\` n'est pas défini, Python utilise \`__repr__\` à la place. L'idéal : \`__repr__\` retourne une chaîne qui permettrait de recréer l'objet (\`eval(repr(obj))\`).

---

## 🏠 @property : Getters et Setters Pythoniques

Les **propriétés** permettent d'accéder à des attributs comme s'ils étaient simples, tout en contrôlant l'accès en lecture et écriture. C'est la manière Pythonique de faire des getters/setters.

\`\`\`python
class Temperature:
    """Gère une température avec validation et conversion."""

    def __init__(self, celsius):
        self._celsius = celsius  # Utilise le setter via @property

    @property
    def celsius(self):
        """Getter : accès en lecture."""
        return self._celsius

    @celsius.setter
    def celsius(self, valeur):
        """Setter : contrôle en écriture."""
        if valeur < -273.15:
            raise ValueError("Température en dessous du zéro absolu !")
        self._celsius = valeur

    @property
    def fahrenheit(self):
        """Propriété calculée (en lecture seule)."""
        return self._celsius * 9/5 + 32

    @property
    def kelvin(self):
        """Propriété calculée (en lecture seule)."""
        return self._celsius + 273.15


# Utilisation : on accède comme un simple attribut
t = Temperature(25)

# Lecture (getter)
print(t.celsius)      # 25
print(t.fahrenheit)   # 77.0
print(t.kelvin)       # 298.15

# Écriture (setter avec validation)
t.celsius = 100
print(t.fahrenheit)   # 212.0

# Validation en action
# t.celsius = -300    # ❌ ValueError: Température en dessous du zéro absolu !
\`\`\`

### Avant / Après @property

\`\`\`python
# ❌ Style Java (non Pythonique)
class PersonneJava:
    def __init__(self, nom):
        self.__nom = nom

    def get_nom(self):
        return self.__nom

    def set_nom(self, nom):
        self.__nom = nom

p = PersonneJava("Alice")
print(p.get_nom())       # Lourd
p.set_nom("Bob")         # Lourd


# ✅ Style Python (avec @property)
class PersonnePython:
    def __init__(self, nom):
        self._nom = nom

    @property
    def nom(self):
        return self._nom

    @nom.setter
    def nom(self, valeur):
        if not valeur.strip():
            raise ValueError("Le nom ne peut pas être vide")
        self._nom = valeur

p = PersonnePython("Alice")
print(p.nom)        # Simple et naturel
p.nom = "Bob"       # Simple et naturel
\`\`\`

> 💡 **Conseil** : Commencez avec des attributs publics simples. Ajoutez \`@property\` uniquement si vous avez besoin de validation, de calcul ou de contrôle d'accès. C'est l'un des avantages de la syntaxe : vous pouvez ajouter un \`@property\` sans modifier le code qui utilise la classe.

---

## 🏭 @classmethod et @staticmethod

Python offre trois types de méthodes dans une classe.

### Comparaison

| Type | Décorateur | Premier param | Accès à | Usage |
|------|-----------|---------------|---------|-------|
| **Instance** | (aucun) | \`self\` | Instance + Classe | Manipuler l'objet |
| **Classe** | \`@classmethod\` | \`cls\` | Classe uniquement | Constructeurs alternatifs |
| **Statique** | \`@staticmethod\` | (aucun) | Rien | Fonctions utilitaires |

### Exemple détaillé

\`\`\`python
class Date:
    """Représente une date avec différentes méthodes de création."""

    def __init__(self, jour, mois, annee):
        self.jour = jour
        self.mois = mois
        self.annee = annee

    # Méthode d'INSTANCE : accède à self
    def formater(self):
        return f"{self.jour:02d}/{self.mois:02d}/{self.annee}"

    # Méthode de CLASSE : accède à cls (la classe elle-même)
    @classmethod
    def depuis_string(cls, date_str):
        """Constructeur alternatif depuis une chaîne 'JJ-MM-AAAA'."""
        jour, mois, annee = map(int, date_str.split('-'))
        return cls(jour, mois, annee)  # cls = Date (ou une sous-classe !)

    @classmethod
    def aujourdhui(cls):
        """Constructeur alternatif pour la date du jour."""
        from datetime import date
        d = date.today()
        return cls(d.day, d.month, d.year)

    # Méthode STATIQUE : ni self ni cls
    @staticmethod
    def est_bissextile(annee):
        """Vérifie si une année est bissextile."""
        return annee % 4 == 0 and (annee % 100 != 0 or annee % 400 == 0)

    @staticmethod
    def jours_dans_mois(mois, annee):
        """Retourne le nombre de jours dans un mois."""
        jours = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if mois == 2 and Date.est_bissextile(annee):
            return 29
        return jours[mois - 1]

    def __str__(self):
        return self.formater()


# Différentes façons de créer une Date
d1 = Date(25, 12, 2024)                    # Constructeur normal
d2 = Date.depuis_string("14-07-2024")      # @classmethod
d3 = Date.aujourdhui()                      # @classmethod

print(d1)  # 25/12/2024
print(d2)  # 14/07/2024
print(d3)  # (date du jour)

# Méthode statique : pas besoin d'instance
print(Date.est_bissextile(2024))    # True
print(Date.jours_dans_mois(2, 2024)) # 29
\`\`\`

> 💡 **Quand utiliser quoi ?**
> - \`@classmethod\` : principalement pour des **constructeurs alternatifs** (\`depuis_string\`, \`depuis_json\`, \`depuis_csv\`...). Utilisez \`cls()\` au lieu de \`Date()\` pour que l'héritage fonctionne.
> - \`@staticmethod\` : pour des **fonctions utilitaires** liées à la classe mais qui n'ont besoin ni de l'instance ni de la classe.

---

## 🧩 Composition vs Héritage

La **composition** est une alternative à l'héritage où un objet **contient** d'autres objets au lieu d'en hériter. La règle : utiliser l'héritage pour la relation **"est un"**, la composition pour **"a un"**.

\`\`\`
HÉRITAGE : "est un"              COMPOSITION : "a un"
─────────────────                ─────────────────────
Chien est un Animal              Voiture a un Moteur
Chat est un Animal               Voiture a des Roues
VoitureElec est une Voiture      Maison a des Pièces
\`\`\`

### Exemple avec composition

\`\`\`python
class Moteur:
    def __init__(self, puissance, carburant):
        self.puissance = puissance
        self.carburant = carburant
        self.demarre = False

    def demarrer(self):
        self.demarre = True
        return f"Moteur {self.puissance}ch démarré"

    def arreter(self):
        self.demarre = False
        return "Moteur arrêté"


class GPS:
    def __init__(self):
        self.destination = None

    def naviguer(self, destination):
        self.destination = destination
        return f"Navigation vers {destination}"


class Voiture:
    """La voiture CONTIENT un moteur et un GPS (composition)."""

    def __init__(self, marque, puissance):
        self.marque = marque
        self.moteur = Moteur(puissance, "essence")  # A un moteur
        self.gps = GPS()                              # A un GPS

    def demarrer(self):
        return f"{self.marque} : {self.moteur.demarrer()}"

    def aller_a(self, destination):
        if not self.moteur.demarre:
            return "Démarrez d'abord la voiture !"
        return self.gps.naviguer(destination)


ma_voiture = Voiture("Peugeot", 130)
print(ma_voiture.demarrer())          # "Peugeot : Moteur 130ch démarré"
print(ma_voiture.aller_a("Paris"))    # "Navigation vers Paris"
\`\`\`

### Quand choisir quoi ?

| Critère | Héritage | Composition |
|---------|----------|-------------|
| **Relation** | "est un" (is-a) | "a un" (has-a) |
| **Couplage** | Fort (lié à la classe mère) | Faible (composants interchangeables) |
| **Flexibilité** | Moins flexible | Plus flexible |
| **Exemple** | \`Chien(Animal)\` | \`Voiture(moteur=Moteur())\` |

> 💡 **Règle d'or** : Préférez la composition à l'héritage quand c'est possible. L'héritage crée un couplage fort. Posez-vous la question : "X **est-il vraiment un** Y, ou X **a-t-il** un Y ?"

---

## 🏛️ Classes Abstraites (ABC)

Les **classes abstraites** définissent une interface que les sous-classes **doivent** implémenter. Elles ne peuvent pas être instanciées directement.

\`\`\`python
from abc import ABC, abstractmethod

class Forme(ABC):
    """Classe abstraite : ne peut pas être instanciée."""

    @abstractmethod
    def aire(self):
        """Chaque forme DOIT implémenter aire()."""
        pass

    @abstractmethod
    def perimetre(self):
        """Chaque forme DOIT implémenter perimetre()."""
        pass

    # Méthode concrète (non abstraite) : héritée telle quelle
    def decrire(self):
        return f"{self.__class__.__name__} : aire={self.aire():.2f}, périmètre={self.perimetre():.2f}"


class Rectangle(Forme):
    def __init__(self, longueur, largeur):
        self.longueur = longueur
        self.largeur = largeur

    def aire(self):
        return self.longueur * self.largeur

    def perimetre(self):
        return 2 * (self.longueur + self.largeur)


class Cercle(Forme):
    def __init__(self, rayon):
        self.rayon = rayon

    def aire(self):
        return 3.14159 * self.rayon ** 2

    def perimetre(self):
        return 2 * 3.14159 * self.rayon


# Forme() → ❌ TypeError: Can't instantiate abstract class
# f = Forme()

r = Rectangle(5, 3)
c = Cercle(4)
print(r.decrire())  # "Rectangle : aire=15.00, périmètre=16.00"
print(c.decrire())  # "Cercle : aire=50.27, périmètre=25.13"
\`\`\`

> 💡 Les classes abstraites servent de **contrat** : elles garantissent que toute sous-classe implémente les méthodes requises. Si vous oubliez d'implémenter une méthode abstraite, Python lèvera une \`TypeError\` dès la création de l'instance.

---

## 📋 Résumé : Quand Utiliser Quoi

| Concept | Quand l'utiliser |
|---------|-----------------|
| **Héritage simple** | Relation claire "est un" avec spécialisation |
| **super()** | Toujours dans \`__init__\` d'une classe fille |
| **Polymorphisme** | Même interface pour des comportements différents |
| **Dunder methods** | Intégration avec les opérateurs Python (\`+\`, \`==\`, \`len\`...) |
| **@property** | Validation d'attributs, propriétés calculées |
| **@classmethod** | Constructeurs alternatifs |
| **@staticmethod** | Fonctions utilitaires liées à la classe |
| **Composition** | Relation "a un", plus de flexibilité |
| **Classes abstraites** | Définir une interface obligatoire |

---

## Exercices 🎯

### Exercice 1 : Héritage simple
\`\`\`python
class Employe:
    def __init__(self, nom, salaire):
        self.nom = nom
        self.salaire = salaire

    def presenter(self):
        return f"{self.nom}, salaire: {self.salaire}€"

class Manager(Employe):
    def __init__(self, nom, salaire, equipe=None):
        super().__init__(nom, salaire)
        self.equipe = equipe or []

    def ajouter_employe(self, employe):
        self.equipe.append(employe)

    def presenter(self):
        base = super().presenter()
        return f"{base}, équipe de {len(self.equipe)} personne(s)"

alice = Employe("Alice", 35000)
bob = Manager("Bob", 50000)
bob.ajouter_employe(alice)
print(bob.presenter())  # "Bob, salaire: 50000€, équipe de 1 personne(s)"
\`\`\`

### Exercice 2 : Dunder methods
\`\`\`python
class Fraction:
    def __init__(self, num, den):
        if den == 0:
            raise ValueError("Dénominateur nul")
        self.num = num
        self.den = den

    def __str__(self):
        return f"{self.num}/{self.den}"

    def __add__(self, other):
        num = self.num * other.den + other.num * self.den
        den = self.den * other.den
        return Fraction(num, den)

    def __eq__(self, other):
        return self.num * other.den == other.num * self.den

f1 = Fraction(1, 2)
f2 = Fraction(1, 3)
print(f1 + f2)      # 5/6
print(f1 == Fraction(2, 4))  # True
\`\`\`

### Exercice 3 : Composition
\`\`\`python
class Adresse:
    def __init__(self, rue, ville, code_postal):
        self.rue = rue
        self.ville = ville
        self.code_postal = code_postal

    def __str__(self):
        return f"{self.rue}, {self.code_postal} {self.ville}"

class Personne:
    def __init__(self, nom, adresse):
        self.nom = nom
        self.adresse = adresse  # Composition

    def __str__(self):
        return f"{self.nom} - {self.adresse}"

adr = Adresse("10 rue Python", "Paris", "75001")
p = Personne("Alice", adr)
print(p)  # "Alice - 10 rue Python, 75001 Paris"
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/16-poo-avancee-exercice.py\`
`,

    '17-modules': `
# Module 17 : Modules et Packages

En Python, un **module** est simplement un fichier \`.py\` contenant du code réutilisable (fonctions, classes, variables). Un **package** est un dossier contenant plusieurs modules. Ce système de modularité est au cœur de la puissance de Python : au lieu de tout réécrire, vous **importez** du code existant — le vôtre ou celui de la communauté.

---

## 🧠 Pourquoi les Modules ?

Sans modules, tout votre code serait dans un seul fichier. Les modules résolvent ce problème :

| Problème | Solution avec les modules |
|----------|--------------------------|
| Fichier de 5000 lignes illisible | Découper en fichiers thématiques |
| Copier-coller de fonctions entre projets | Importer depuis un module réutilisable |
| Réinventer la roue | Utiliser les 400+ modules de la bibliothèque standard |
| Manque de bibliothèques spécialisées | Installer des packages tiers via \`pip\` |

### L'écosystème Python

\`\`\`
┌─────────────────────────────────────────────────┐
│              Votre Code Python                  │
│              (vos fichiers .py)                 │
├─────────────────────────────────────────────────┤
│         Bibliothèque Standard Python            │
│  (math, os, json, datetime, re, collections...) │
│          ≈ 400 modules — installés par défaut   │
├─────────────────────────────────────────────────┤
│          Packages Tiers (PyPI)                  │
│  (pandas, numpy, flask, requests, django...)    │
│       ≈ 500 000 packages — via pip install      │
└─────────────────────────────────────────────────┘
\`\`\`

---

## 📦 Importer des Modules

Python offre plusieurs façons d'importer du code. Chacune a ses avantages.

### Les 4 syntaxes d'import

\`\`\`python
# 1. Import complet — Le plus sûr
import math
print(math.pi)          # 3.14159...
print(math.sqrt(16))    # 4.0

# 2. Import avec alias — Pour les noms longs
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
# Conventions standard que tout le monde connaît

# 3. Import spécifique — Importer uniquement ce qu'on utilise
from math import pi, sqrt, ceil
print(pi)       # 3.14159... (pas besoin de math.pi)
print(sqrt(16)) # 4.0

# 4. Import tout — ⚠️ À ÉVITER
from math import *
# Importe TOUT dans votre espace de noms
# Risque de collision de noms !
\`\`\`

### Comparaison des syntaxes

| Syntaxe | Avantage | Inconvénient | Recommandation |
|---------|----------|--------------|----------------|
| \`import math\` | Clair, pas de collision | Préfixe \`math.\` à chaque appel | ✅ Préféré |
| \`import numpy as np\` | Concis, convention standard | Alias à connaître | ✅ Standard pour les gros packages |
| \`from math import pi\` | Pas de préfixe | Peut masquer des noms locaux | ✅ OK pour quelques noms |
| \`from math import *\` | Pratique en apparence | Pollution de l'espace de noms | ❌ À éviter |

> ⚠️ **Pourquoi éviter \`from module import *\` ?** Si deux modules définissent une fonction \`open()\`, la dernière importée écrase la première. Vous ne savez plus d'où vient chaque fonction.

### Où Python cherche-t-il les modules ?

\`\`\`python
import sys

# Python cherche les modules dans cet ordre :
for chemin in sys.path:
    print(chemin)

# 1. Le dossier du script en cours
# 2. Les dossiers de PYTHONPATH (variable d'environnement)
# 3. Les dossiers de la bibliothèque standard
# 4. Les dossiers de site-packages (pip)
\`\`\`

> 💡 **Astuce** : Si votre import échoue avec \`ModuleNotFoundError\`, vérifiez que le fichier est dans un des dossiers de \`sys.path\`, ou ajoutez le dossier avec \`sys.path.append("chemin")\`.

---

## 🔨 Créer ses Propres Modules

Un module Python est simplement un fichier \`.py\`. Toute fonction, classe ou variable définie dedans est importable.

### Module simple

\`\`\`python
# ──── fichier: outils_math.py ────
"""Module d'outils mathématiques personnalisés."""

PI = 3.14159
E = 2.71828

def aire_cercle(rayon):
    """Calcule l'aire d'un cercle."""
    return PI * rayon ** 2

def aire_rectangle(longueur, largeur):
    """Calcule l'aire d'un rectangle."""
    return longueur * largeur

def factorielle(n):
    """Calcule n! de manière itérative."""
    resultat = 1
    for i in range(2, n + 1):
        resultat *= i
    return resultat
\`\`\`

\`\`\`python
# ──── fichier: main.py ────

# Import complet
import outils_math
print(outils_math.aire_cercle(5))     # 78.53975
print(outils_math.factorielle(5))     # 120

# Import spécifique
from outils_math import aire_cercle, PI
print(aire_cercle(3))  # 28.27431
print(PI)              # 3.14159
\`\`\`

### Que se passe-t-il lors d'un import ?

\`\`\`
import outils_math

1. Python CHERCHE le fichier outils_math.py
2. Python EXÉCUTE le fichier de haut en bas
3. Python crée un objet "module" avec tout ce qui est défini
4. La variable outils_math pointe vers cet objet

⚠️ Le fichier est exécuté UNE SEULE FOIS,
   même si vous l'importez plusieurs fois !
\`\`\`

> ⚠️ **Attention** : Puisque le module est exécuté à l'import, tout code au "top level" (hors fonctions/classes) sera exécuté. Si vous avez des \`print()\` de test dans votre module, ils s'afficheront lors de l'import !

---

## 🛡️ \`if __name__ == "__main__"\`

C'est l'un des idiomes les plus importants de Python. Il permet de distinguer si un fichier est **exécuté directement** ou **importé comme module**.

### Le problème

\`\`\`python
# ──── fichier: calculatrice.py ────
def addition(a, b):
    return a + b

def soustraction(a, b):
    return a - b

# Code de test
print(addition(5, 3))       # 8
print(soustraction(10, 4))  # 6
\`\`\`

\`\`\`python
# ──── fichier: main.py ────
import calculatrice  # ❌ Affiche "8" et "6" à l'import !
\`\`\`

### La solution

\`\`\`python
# ──── fichier: calculatrice.py ────
def addition(a, b):
    return a + b

def soustraction(a, b):
    return a - b

# Ce bloc ne s'exécute QUE si le fichier est lancé directement
if __name__ == "__main__":
    # Tests
    print(addition(5, 3))       # 8
    print(soustraction(10, 4))  # 6
    print("Tests réussis !")
\`\`\`

\`\`\`python
# ──── fichier: main.py ────
import calculatrice  # ✅ Rien ne s'affiche !
print(calculatrice.addition(2, 3))  # 5
\`\`\`

### Comment ça marche ?

\`\`\`python
# Python attribue automatiquement la variable __name__

# Si le fichier est exécuté directement :
#   python calculatrice.py  →  __name__ = "__main__"

# Si le fichier est importé :
#   import calculatrice      →  __name__ = "calculatrice"

print(__name__)  # Affiche le nom du contexte d'exécution
\`\`\`

\`\`\`
┌──────────────────────────────┐
│   python calculatrice.py     │
│                              │
│   __name__ = "__main__"      │
│   → Le bloc if s'exécute ✅  │
└──────────────────────────────┘

┌──────────────────────────────┐
│   import calculatrice        │
│   (depuis un autre fichier)  │
│                              │
│   __name__ = "calculatrice"  │
│   → Le bloc if est ignoré ❌ │
└──────────────────────────────┘
\`\`\`

> 💡 **Règle** : Mettez **toujours** votre code de test et d'exécution dans un bloc \`if __name__ == "__main__"\`. C'est une bonne pratique universelle.

---

## 📁 Packages : Organiser les Modules

Un **package** est un dossier contenant des modules Python et un fichier spécial \`__init__.py\`.

### Structure d'un package

\`\`\`
mon_projet/
├── main.py                    # Point d'entrée
├── utils/                     # Package "utils"
│   ├── __init__.py            # Marque le dossier comme package
│   ├── math_utils.py          # Module de fonctions math
│   ├── string_utils.py        # Module de fonctions string
│   └── validation/            # Sous-package
│       ├── __init__.py
│       └── validators.py
└── models/                    # Package "models"
    ├── __init__.py
    └── user.py
\`\`\`

### Le fichier \`__init__.py\`

\`\`\`python
# ──── utils/__init__.py ────
# Peut être vide (marque simplement le dossier comme package)
# OU peut définir ce qui est importé par défaut

# Rendre certaines fonctions accessibles directement
from .math_utils import aire_cercle
from .string_utils import nettoyer_texte

# Définir __all__ pour contrôler "from utils import *"
__all__ = ['math_utils', 'string_utils']
\`\`\`

### Importer depuis un package

\`\`\`python
# Import d'un module du package
from utils import math_utils
print(math_utils.aire_cercle(5))

# Import d'une fonction spécifique
from utils.math_utils import aire_cercle
print(aire_cercle(5))

# Import depuis un sous-package
from utils.validation.validators import valider_email

# Si __init__.py exporte les fonctions
from utils import aire_cercle  # Grâce à __init__.py
\`\`\`

### Imports relatifs (à l'intérieur d'un package)

\`\`\`python
# ──── utils/string_utils.py ────

# Import relatif : le point "." signifie "même package"
from .math_utils import PI       # Depuis le même package
from .validation import validators  # Depuis un sous-package

# ".." signifie "package parent"
# from ..models import user  # Remonter d'un niveau
\`\`\`

| Syntaxe | Signification |
|---------|---------------|
| \`from . import module\` | Depuis le même package |
| \`from .module import func\` | Depuis un module du même package |
| \`from .. import module\` | Depuis le package parent |
| \`from ..autre import func\` | Depuis un autre sous-package du parent |

> 💡 **Conseil** : Les imports relatifs (\`.\` et \`..\`) ne fonctionnent que dans les packages. Si vous exécutez un fichier directement (\`python fichier.py\`), utilisez des imports absolus.

---

## 📚 La Bibliothèque Standard

Python inclut plus de 400 modules dans sa **bibliothèque standard** (pas besoin de \`pip install\`). Voici les plus utiles.

### Modules les plus courants

| Module | Usage | Exemple |
|--------|-------|---------|
| \`os\` | Système de fichiers, chemins | \`os.path.exists("f.txt")\` |
| \`sys\` | Paramètres système, arguments | \`sys.argv\`, \`sys.path\` |
| \`json\` | Lire/écrire du JSON | \`json.load(f)\`, \`json.dump(data, f)\` |
| \`math\` | Fonctions mathématiques | \`math.sqrt()\`, \`math.pi\` |
| \`random\` | Nombres aléatoires | \`random.randint(1, 10)\` |
| \`datetime\` | Dates et heures | \`datetime.now()\` |
| \`re\` | Expressions régulières | \`re.findall(r"\\d+", texte)\` |
| \`collections\` | Structures avancées | \`Counter\`, \`defaultdict\` |
| \`pathlib\` | Chemins modernes | \`Path("dossier") / "fichier.txt"\` |
| \`csv\` | Fichiers CSV | \`csv.reader(f)\` |
| \`copy\` | Copies profondes/superficielles | \`copy.deepcopy(obj)\` |
| \`functools\` | Outils fonctionnels | \`reduce\`, \`lru_cache\` |
| \`itertools\` | Itérateurs avancés | \`chain\`, \`product\`, \`combinations\` |
| \`typing\` | Annotations de types | \`List[int]\`, \`Dict[str, Any]\` |

### Exemples pratiques

\`\`\`python
# pathlib : chemins de fichiers modernes (alternative à os.path)
from pathlib import Path

dossier = Path("data")
fichier = dossier / "rapport.csv"  # data/rapport.csv
print(fichier.exists())            # True/False
print(fichier.suffix)              # ".csv"
print(fichier.stem)                # "rapport"

# Lister tous les fichiers .py
for f in Path(".").glob("**/*.py"):
    print(f)

# itertools : combinaisons et permutations
from itertools import combinations, product

# Toutes les paires possibles
equipes = ["Alice", "Bob", "Charlie"]
for paire in combinations(equipes, 2):
    print(paire)
# ('Alice', 'Bob'), ('Alice', 'Charlie'), ('Bob', 'Charlie')

# copy : copie profonde vs superficielle
import copy

original = {"a": [1, 2, 3], "b": {"x": 10}}
copie_sup = copy.copy(original)       # Copie superficielle
copie_prof = copy.deepcopy(original)  # Copie profonde

original["a"].append(4)
print(copie_sup["a"])   # [1, 2, 3, 4] ← Affecté ! (même référence)
print(copie_prof["a"])  # [1, 2, 3]    ← Non affecté (copie indépendante)
\`\`\`

---

## 📥 pip : Le Gestionnaire de Packages

\`pip\` permet d'installer des packages tiers depuis **PyPI** (Python Package Index), le dépôt officiel qui contient plus de 500 000 packages.

### Commandes essentielles

\`\`\`bash
# Installer un package
pip install pandas
pip install numpy==1.26.0        # Version spécifique
pip install "requests>=2.28"     # Version minimale

# Installer plusieurs packages
pip install pandas numpy matplotlib

# Mettre à jour un package
pip install --upgrade pandas

# Désinstaller
pip uninstall pandas

# Voir les packages installés
pip list

# Voir les détails d'un package
pip show pandas
\`\`\`

### requirements.txt : Figer les dépendances

\`\`\`bash
# Générer la liste de TOUTES les dépendances installées
pip freeze > requirements.txt

# Le fichier contient :
# numpy==1.26.0
# pandas==2.1.4
# requests==2.31.0

# Installer toutes les dépendances d'un projet
pip install -r requirements.txt
\`\`\`

### Écrire un requirements.txt manuellement

\`\`\`
# requirements.txt
# Dépendances du projet

pandas>=2.0
numpy>=1.24
matplotlib>=3.7
requests>=2.28
scikit-learn~=1.3.0    # Compatible avec 1.3.x
\`\`\`

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| \`==\` | Version exacte | \`pandas==2.1.4\` |
| \`>=\` | Version minimale | \`pandas>=2.0\` |
| \`<=\` | Version maximale | \`pandas<=2.2\` |
| \`~=\` | Compatible (même majeur.mineur) | \`pandas~=2.1\` → 2.1.x |
| \`!=\` | Exclure une version | \`pandas!=2.0.0\` |

---

## 🏗️ Structurer un Vrai Projet

### Structure recommandée

\`\`\`
mon_projet/
├── README.md                  # Documentation
├── requirements.txt           # Dépendances
├── setup.py                   # Configuration du package (pour distribution)
├── .gitignore                 # Fichiers à ignorer
├── mon_projet/                # Code source (même nom que le projet)
│   ├── __init__.py
│   ├── main.py                # Point d'entrée
│   ├── config.py              # Configuration
│   ├── models/                # Classes métier
│   │   ├── __init__.py
│   │   └── user.py
│   └── utils/                 # Utilitaires
│       ├── __init__.py
│       └── helpers.py
├── tests/                     # Tests unitaires
│   ├── __init__.py
│   ├── test_models.py
│   └── test_utils.py
└── data/                      # Données
    └── config.json
\`\`\`

### Exemple concret de projet modulaire

\`\`\`python
# ──── mon_projet/config.py ────
"""Configuration globale du projet."""

VERSION = "1.0.0"
NOM_APP = "MonApp"
DEBUG = True
\`\`\`

\`\`\`python
# ──── mon_projet/models/user.py ────
"""Modèle utilisateur."""

class User:
    def __init__(self, nom, email):
        self.nom = nom
        self.email = email

    def __str__(self):
        return f"{self.nom} <{self.email}>"
\`\`\`

\`\`\`python
# ──── mon_projet/utils/helpers.py ────
"""Fonctions utilitaires."""

import re

def valider_email(email):
    """Vérifie le format d'un email."""
    pattern = r'^[\\w.-]+@[\\w.-]+\\.\\w+$'
    return bool(re.match(pattern, email))
\`\`\`

\`\`\`python
# ──── mon_projet/main.py ────
"""Point d'entrée de l'application."""

from .config import VERSION, NOM_APP
from .models.user import User
from .utils.helpers import valider_email

def main():
    print(f"{NOM_APP} v{VERSION}")

    email = "alice@example.com"
    if valider_email(email):
        user = User("Alice", email)
        print(f"Utilisateur créé : {user}")
    else:
        print("Email invalide")

if __name__ == "__main__":
    main()
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Créer un module utilitaire
\`\`\`python
# outils.py
def inverser_string(texte):
    return texte[::-1]

def compter_voyelles(texte):
    return sum(1 for c in texte.lower() if c in "aeiouyàéèêëïîôù")

def est_palindrome(texte):
    texte_clean = texte.lower().replace(" ", "")
    return texte_clean == texte_clean[::-1]

if __name__ == "__main__":
    print(inverser_string("Python"))      # "nohtyP"
    print(compter_voyelles("Bonjour"))    # 3
    print(est_palindrome("kayak"))        # True
\`\`\`

### Exercice 2 : Utiliser la bibliothèque standard
\`\`\`python
from pathlib import Path
from collections import Counter
import json

# Compter les extensions de fichiers dans un dossier
def analyser_dossier(chemin):
    extensions = Counter()
    for fichier in Path(chemin).rglob("*"):
        if fichier.is_file():
            extensions[fichier.suffix] += 1
    return dict(extensions.most_common())

# Sauvegarder en JSON
resultat = analyser_dossier(".")
with open("analyse.json", "w") as f:
    json.dump(resultat, f, indent=2)
print(resultat)
\`\`\`

### Exercice 3 : Package structuré
\`\`\`python
# Structure :
# calculatrice/
#   __init__.py
#   operations.py
#   conversions.py

# ──── calculatrice/operations.py ────
def addition(a, b): return a + b
def soustraction(a, b): return a - b
def multiplication(a, b): return a * b
def division(a, b):
    if b == 0:
        raise ValueError("Division par zéro")
    return a / b

# ──── calculatrice/__init__.py ────
from .operations import addition, soustraction, multiplication, division

# ──── main.py ────
from calculatrice import addition, division
print(addition(10, 5))   # 15
print(division(10, 3))   # 3.333...
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/17-modules-exercice.py\`
`,

    '18-erreurs': `
# Module 18 : Gestion des Erreurs

Les erreurs sont **inévitables** en programmation : un fichier manquant, une saisie utilisateur invalide, une connexion réseau coupée... La **gestion des exceptions** en Python permet de prévoir ces situations et d'y réagir proprement, au lieu de laisser le programme planter brutalement. C'est une compétence essentielle pour écrire du code **robuste** et **professionnel**.

---

## 🧠 Erreurs vs Exceptions

En Python, il existe deux grandes catégories de problèmes :

| Type | Quand ? | Récupérable ? | Exemple |
|------|---------|---------------|---------|
| **SyntaxError** | À la lecture du code (avant exécution) | ❌ Non — il faut corriger le code | \`if True print("x")\` |
| **Exception** | Pendant l'exécution | ✅ Oui — avec \`try/except\` | \`1 / 0\`, \`int("abc")\` |

> 💡 Les **SyntaxError** ne peuvent pas être capturées par \`try/except\` car le code ne peut même pas être exécuté. Les **exceptions** surviennent pendant l'exécution d'un code syntaxiquement correct.

---

## 📋 Les Exceptions les Plus Courantes

Python possède une hiérarchie d'exceptions intégrées. Voici celles que vous rencontrerez le plus souvent.

### Tableau de référence

| Exception | Cause | Exemple |
|-----------|-------|---------|
| \`TypeError\` | Opération sur un type incompatible | \`"2" + 2\` |
| \`ValueError\` | Bonne type, mauvaise valeur | \`int("hello")\` |
| \`KeyError\` | Clé inexistante dans un dict | \`{"a": 1}["b"]\` |
| \`IndexError\` | Index hors limites | \`[1, 2, 3][10]\` |
| \`NameError\` | Variable non définie | \`print(x)\` sans définir \`x\` |
| \`AttributeError\` | Attribut/méthode inexistant | \`"hello".pouet()\` |
| \`ZeroDivisionError\` | Division par zéro | \`1 / 0\` |
| \`FileNotFoundError\` | Fichier inexistant | \`open("inexistant.txt")\` |
| \`ImportError\` | Module introuvable | \`import module_inexistant\` |
| \`StopIteration\` | Fin d'un itérateur | \`next(iter([]))\` |
| \`OverflowError\` | Résultat numérique trop grand | \`math.exp(1000)\` |
| \`PermissionError\` | Accès refusé à un fichier | Écrire dans un fichier protégé |
| \`RecursionError\` | Trop de récursions | Fonction récursive sans cas de base |

### Exemples commentés

\`\`\`python
# TypeError — Opération impossible entre ces types
# "age: " + 25                # ❌ str + int
"age: " + str(25)             # ✅ str + str

# ValueError — Le type est bon mais la valeur non
# int("hello")                # ❌ "hello" n'est pas convertible en int
int("42")                     # ✅

# KeyError — Clé absente du dictionnaire
config = {"host": "localhost"}
# config["port"]              # ❌ KeyError
config.get("port", 8080)      # ✅ Retourne 8080 par défaut

# IndexError — Index hors de la liste
fruits = ["pomme", "banane"]
# fruits[5]                   # ❌ IndexError
fruits[-1]                    # ✅ "banane" (dernier élément)

# AttributeError — Méthode inexistante
nombre = 42
# nombre.upper()              # ❌ Les int n'ont pas de méthode upper()
str(nombre).upper()           # ✅ Convertir d'abord

# NameError — Variable non définie
# print(resultat)             # ❌ resultat n'existe pas encore
resultat = 42
print(resultat)               # ✅
\`\`\`

---

## 🛡️ try / except : Capturer les Exceptions

La structure \`try/except\` permet d'**essayer** du code risqué et de **réagir** si une erreur survient, sans que le programme ne plante.

### Syntaxe de base

\`\`\`python
try:
    # Code qui PEUT échouer
    resultat = 10 / 0
except ZeroDivisionError:
    # Ce qui se passe SI l'erreur survient
    print("Impossible de diviser par zéro !")
    resultat = 0

print(f"Résultat : {resultat}")  # Résultat : 0
# Le programme continue normalement !
\`\`\`

### Capturer le message d'erreur avec \`as\`

\`\`\`python
try:
    nombre = int("hello")
except ValueError as e:
    print(f"Erreur : {e}")
    # Erreur : invalid literal for int() with base 10: 'hello'
\`\`\`

### Capturer plusieurs types d'exceptions

\`\`\`python
def convertir_et_diviser(texte, diviseur):
    try:
        nombre = int(texte)
        resultat = nombre / diviseur
        return resultat
    except ValueError:
        print(f"'{texte}' n'est pas un nombre valide")
    except ZeroDivisionError:
        print("Le diviseur ne peut pas être zéro")
    except TypeError:
        print("Types d'arguments invalides")
    return None

print(convertir_et_diviser("42", 2))    # 21.0
print(convertir_et_diviser("hello", 2)) # Message ValueError → None
print(convertir_et_diviser("42", 0))    # Message ZeroDivision → None
\`\`\`

### Capturer plusieurs exceptions ensemble

\`\`\`python
try:
    # Code risqué
    valeur = int(input("Nombre : "))
except (ValueError, TypeError) as e:
    # Même traitement pour les deux types
    print(f"Entrée invalide : {e}")
\`\`\`

### Capturer toute exception (avec précaution)

\`\`\`python
try:
    # Code risqué
    resultat = operation_complexe()
except Exception as e:
    # Capture TOUTE exception (sauf SystemExit, KeyboardInterrupt)
    print(f"Erreur inattendue : {type(e).__name__}: {e}")
\`\`\`

> ⚠️ **Attention** : Évitez le \`except\` nu (sans type d'exception) ou \`except Exception\` en production. Capturez toujours les exceptions **spécifiques** que vous attendez. Un \`except\` trop large peut masquer des bugs !

\`\`\`python
# ❌ MAUVAIS : masque tous les bugs
try:
    resultat = ma_fonction()
except:
    pass  # On ignore TOUT, même les vrais bugs !

# ✅ BON : on sait exactement ce qu'on gère
try:
    resultat = ma_fonction()
except ValueError as e:
    print(f"Valeur invalide : {e}")
except FileNotFoundError:
    print("Fichier manquant")
\`\`\`

---

## 🔄 try / except / else / finally

La structure complète offre un contrôle fin sur le flux d'exécution.

### Schéma du flux

\`\`\`
try:
    │ Code risqué
    ├── Si EXCEPTION ──► except: Gérer l'erreur
    │                         │
    └── Si PAS d'exception ──► else: Code de succès
                                    │
                              finally: TOUJOURS exécuté
                                (nettoyage, fermeture...)
\`\`\`

### Les 4 blocs expliqués

| Bloc | Quand s'exécute-t-il ? | Usage |
|------|----------------------|-------|
| \`try\` | Toujours (code à tester) | Code risqué |
| \`except\` | Seulement si une exception survient | Gérer l'erreur |
| \`else\` | Seulement si **aucune** exception | Code de succès |
| \`finally\` | **Toujours**, même après return ou exception | Nettoyage (fermer fichiers, connexions) |

### Exemple complet

\`\`\`python
def lire_fichier_json(chemin):
    """Lit un fichier JSON avec gestion complète des erreurs."""
    import json

    try:
        fichier = open(chemin, "r", encoding="utf-8")
        contenu = fichier.read()
        data = json.loads(contenu)

    except FileNotFoundError:
        print(f"❌ Fichier '{chemin}' introuvable")
        return None

    except json.JSONDecodeError as e:
        print(f"❌ JSON invalide dans '{chemin}' : {e}")
        return None

    except PermissionError:
        print(f"❌ Permission refusée pour '{chemin}'")
        return None

    else:
        # Exécuté UNIQUEMENT si tout s'est bien passé
        print(f"✅ Fichier '{chemin}' lu avec succès ({len(data)} éléments)")
        return data

    finally:
        # TOUJOURS exécuté — nettoyage
        try:
            fichier.close()
            print("🔒 Fichier fermé")
        except NameError:
            pass  # fichier n'existe pas si FileNotFoundError
\`\`\`

### Pourquoi \`else\` est utile ?

\`\`\`python
# ❌ SANS else : le code de succès est dans le try
#    → Si ce code lève une exception, elle serait capturée par erreur
try:
    valeur = int(texte)
    resultat = traiter(valeur)  # Si ça plante, on capture par erreur !
except ValueError:
    print("Pas un nombre")

# ✅ AVEC else : seul int() est dans le try
try:
    valeur = int(texte)
except ValueError:
    print("Pas un nombre")
else:
    resultat = traiter(valeur)  # Si ça plante, l'exception remonte normalement
\`\`\`

> 💡 **Règle** : Mettez dans \`try\` **uniquement** le code qui peut échouer. Le code qui dépend du succès va dans \`else\`. Le nettoyage va dans \`finally\`.

---

## 🚀 raise : Lever une Exception

\`raise\` permet de **déclencher volontairement** une exception. C'est essentiel pour signaler des situations anormales dans vos propres fonctions.

### Syntaxe

\`\`\`python
# Lever une exception avec un message
raise ValueError("Le prix ne peut pas être négatif")

# Lever une exception sans message
raise TypeError

# Re-lever l'exception actuelle (dans un except)
raise
\`\`\`

### Validation des entrées

\`\`\`python
def creer_utilisateur(nom, age, email):
    """Crée un utilisateur avec validation stricte."""

    if not isinstance(nom, str) or not nom.strip():
        raise ValueError("Le nom doit être une chaîne non vide")

    if not isinstance(age, int) or age < 0:
        raise ValueError(f"L'âge doit être un entier positif (reçu: {age})")

    if age > 150:
        raise ValueError(f"Âge improbable : {age}")

    if "@" not in email:
        raise ValueError(f"Email invalide : {email}")

    return {"nom": nom.strip(), "age": age, "email": email}


# Utilisation
try:
    user = creer_utilisateur("Alice", 25, "alice@mail.com")
    print(f"Créé : {user}")
except ValueError as e:
    print(f"Erreur de validation : {e}")
\`\`\`

### Re-lever une exception (re-raise)

Parfois, vous voulez **loguer** une erreur puis la laisser remonter.

\`\`\`python
def traiter_donnees(data):
    try:
        resultat = data["valeur"] / data["diviseur"]
        return resultat
    except (KeyError, ZeroDivisionError) as e:
        print(f"⚠️ Erreur lors du traitement : {e}")
        raise  # Re-lève l'exception ORIGINALE (avec sa traceback)

# L'appelant devra aussi gérer l'erreur
try:
    traiter_donnees({"valeur": 10, "diviseur": 0})
except ZeroDivisionError:
    print("Le traitement a échoué")
\`\`\`

---

## 🏗️ Exceptions Personnalisées

Pour des applications complexes, créer vos propres exceptions rend le code plus lisible et la gestion d'erreurs plus précise.

### Créer une exception personnalisée

\`\`\`python
class AppError(Exception):
    """Classe de base pour les exceptions de l'application."""
    pass

class SoldeInsuffisantError(AppError):
    """Levée quand un retrait dépasse le solde disponible."""

    def __init__(self, solde, montant):
        self.solde = solde
        self.montant = montant
        self.deficit = montant - solde
        super().__init__(
            f"Solde insuffisant : {solde}€ disponible, "
            f"{montant}€ demandé (manque {self.deficit}€)"
        )

class CompteInactifError(AppError):
    """Levée quand on tente d'opérer sur un compte inactif."""

    def __init__(self, titulaire):
        self.titulaire = titulaire
        super().__init__(f"Le compte de {titulaire} est inactif")
\`\`\`

### Utilisation dans une classe

\`\`\`python
class CompteBancaire:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde
        self.actif = True

    def retirer(self, montant):
        if not self.actif:
            raise CompteInactifError(self.titulaire)
        if montant > self.solde:
            raise SoldeInsuffisantError(self.solde, montant)
        self.solde -= montant
        return self.solde

    def desactiver(self):
        self.actif = False


# Gestion fine des erreurs
compte = CompteBancaire("Alice", 100)

try:
    compte.retirer(500)
except SoldeInsuffisantError as e:
    print(f"❌ {e}")
    print(f"   Il manque {e.deficit}€")
    # ❌ Solde insuffisant : 100€ disponible, 500€ demandé (manque 400€)
    #    Il manque 400€

compte.desactiver()
try:
    compte.retirer(10)
except CompteInactifError as e:
    print(f"❌ {e}")
    # ❌ Le compte de Alice est inactif
\`\`\`

### Hiérarchie d'exceptions

\`\`\`
Exception (built-in Python)
└── AppError (base de notre application)
    ├── SoldeInsuffisantError
    ├── CompteInactifError
    ├── ValidationError
    │   ├── EmailInvalideError
    │   └── AgeInvalideError
    └── ...
\`\`\`

\`\`\`python
# Capturer par catégorie grâce à la hiérarchie
try:
    operation_bancaire()
except SoldeInsuffisantError:
    print("Problème de solde spécifique")
except AppError:
    print("Autre erreur applicative")  # Attrape tout AppError non capturé avant
except Exception:
    print("Erreur système inattendue")
\`\`\`

> 💡 **Conseil** : Créez une exception de base pour votre application (\`AppError\`), puis dérivez-en des exceptions spécifiques. Ainsi, vous pouvez capturer \`AppError\` pour gérer toutes les erreurs applicatives d'un coup.

---

## 🧰 Bonnes Pratiques

### Les règles d'or

\`\`\`python
# 1. Capturez des exceptions SPÉCIFIQUES
# ❌
try:
    data = charger_fichier()
except:
    pass

# ✅
try:
    data = charger_fichier()
except FileNotFoundError:
    data = {}
except json.JSONDecodeError:
    print("Fichier corrompu")
    data = {}


# 2. N'utilisez JAMAIS except: pass en production
# ❌ Avale silencieusement TOUTES les erreurs
try:
    traiter()
except:
    pass

# ✅ Au minimum, loguez l'erreur
try:
    traiter()
except Exception as e:
    print(f"Erreur ignorée : {e}")  # Ou logger.error(...)


# 3. Gardez le bloc try le plus COURT possible
# ❌ Trop de code dans le try
try:
    fichier = ouvrir(chemin)
    contenu = lire(fichier)
    data = parser(contenu)
    resultat = transformer(data)
    sauvegarder(resultat)
except Exception:
    print("Quelque chose a échoué")  # Quoi exactement ?

# ✅ Cibler le code risqué
try:
    fichier = ouvrir(chemin)
except FileNotFoundError:
    print(f"Fichier {chemin} introuvable")
else:
    contenu = lire(fichier)
    data = parser(contenu)
    resultat = transformer(data)
    sauvegarder(resultat)


# 4. Préférez EAFP à LBYL (style Python)
# LBYL = "Look Before You Leap" (vérifier avant d'agir)
# ❌ Style non Pythonique
if os.path.exists(chemin):
    with open(chemin) as f:
        data = f.read()
else:
    data = ""

# EAFP = "Easier to Ask Forgiveness than Permission"
# ✅ Style Pythonique
try:
    with open(chemin) as f:
        data = f.read()
except FileNotFoundError:
    data = ""
\`\`\`

### EAFP vs LBYL

| Style | Principe | Pythonique ? |
|-------|----------|-------------|
| **LBYL** | Vérifier d'abord, agir ensuite | Non (risque de race condition) |
| **EAFP** | Agir d'abord, gérer l'erreur si elle survient | ✅ Oui — idiome Python |

> 💡 **EAFP** (Easier to Ask Forgiveness than Permission) est le style **idiomatique** en Python. Il est souvent plus rapide car dans le cas normal (pas d'erreur), il n'y a pas de vérification supplémentaire.

---

## 📝 Context Managers et Exceptions

Le \`with\` statement (context manager) est la meilleure façon de gérer les ressources qui doivent être fermées.

\`\`\`python
# ✅ Le context manager garantit la fermeture, même en cas d'exception
with open("data.txt", "r") as f:
    contenu = f.read()
# f.close() est appelé automatiquement, même si une exception survient

# Combiné avec try/except
try:
    with open("config.json", "r") as f:
        config = json.load(f)
except FileNotFoundError:
    config = {"debug": False, "version": "1.0"}
    print("⚠️ Fichier de config absent, utilisation des valeurs par défaut")
except json.JSONDecodeError:
    config = {"debug": False, "version": "1.0"}
    print("⚠️ Fichier de config corrompu")
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Conversion sécurisée
\`\`\`python
def convertir_en_nombre(valeur):
    """Convertit une valeur en int ou float, retourne None si impossible."""
    try:
        return int(valeur)
    except ValueError:
        try:
            return float(valeur)
        except ValueError:
            return None

print(convertir_en_nombre("42"))      # 42 (int)
print(convertir_en_nombre("3.14"))    # 3.14 (float)
print(convertir_en_nombre("hello"))   # None
\`\`\`

### Exercice 2 : Lecture sécurisée de fichier JSON
\`\`\`python
import json

def charger_config(chemin, defaut=None):
    """Charge un fichier JSON avec gestion d'erreurs complète."""
    if defaut is None:
        defaut = {}
    try:
        with open(chemin, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"⚠️ '{chemin}' non trouvé, utilisation des valeurs par défaut")
        return defaut
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON invalide dans '{chemin}': {e}")
        return defaut
    except PermissionError:
        print(f"⚠️ Permission refusée pour '{chemin}'")
        return defaut

config = charger_config("app_config.json", {"debug": False})
\`\`\`

### Exercice 3 : Exception personnalisée
\`\`\`python
class NoteInvalideError(Exception):
    def __init__(self, note, raison):
        self.note = note
        self.raison = raison
        super().__init__(f"Note invalide ({note}) : {raison}")

def ajouter_note(notes, note):
    if not isinstance(note, (int, float)):
        raise NoteInvalideError(note, "doit être un nombre")
    if note < 0:
        raise NoteInvalideError(note, "ne peut pas être négative")
    if note > 20:
        raise NoteInvalideError(note, "ne peut pas dépasser 20")
    notes.append(note)

notes = []
for n in [15, "abc", -3, 22, 18]:
    try:
        ajouter_note(notes, n)
    except NoteInvalideError as e:
        print(f"❌ {e}")

print(f"Notes valides : {notes}")  # [15, 18]
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/18-erreurs-exercice.py\`
`,

    '19-decorateurs': `
# Module 19 : Décorateurs

Les **décorateurs** sont l'un des outils les plus puissants et élégants de Python. Un décorateur est une fonction qui **modifie le comportement d'une autre fonction** sans toucher à son code source. Ils sont omniprésents dans les frameworks Python (Flask, Django, FastAPI) et permettent de factoriser du code transversal : logging, validation, cache, authentification...

---

## 🧠 Prérequis : Les Fonctions sont des Objets

Pour comprendre les décorateurs, il faut d'abord accepter qu'en Python, **les fonctions sont des objets comme les autres**. On peut les stocker dans des variables, les passer en argument et les retourner depuis d'autres fonctions.

\`\`\`python
# 1. Stocker une fonction dans une variable
def saluer():
    return "Bonjour !"

ma_fonction = saluer    # Pas de () ! On stocke la RÉFÉRENCE
print(ma_fonction())    # "Bonjour !"
print(type(ma_fonction))  # <class 'function'>

# 2. Passer une fonction en argument
def executer(func):
    return func()

print(executer(saluer))  # "Bonjour !"

# 3. Retourner une fonction depuis une fonction
def creer_multiplieur(facteur):
    def multiplier(x):
        return x * facteur
    return multiplier  # Retourne la FONCTION (pas le résultat)

double = creer_multiplieur(2)
triple = creer_multiplieur(3)
print(double(5))   # 10
print(triple(5))   # 15
\`\`\`

> 💡 La capacité de retourner une fonction depuis une fonction est le fondement des décorateurs. C'est aussi le principe des **closures** (Module 14).

---

## 🎁 Qu'est-ce qu'un Décorateur ?

Un décorateur est une fonction qui :
1. **Prend** une fonction en argument
2. **Crée** une fonction wrapper qui ajoute du comportement
3. **Retourne** la fonction wrapper

### Schéma mental

\`\`\`
SANS décorateur :               AVEC décorateur :

saluer() ─────► "Bonjour !"     saluer() ──► wrapper() ──► saluer() ──► "Bonjour !"
                                               │                              │
                                          Avant l'appel              Après l'appel
                                          (code ajouté)              (code ajouté)
\`\`\`

### Premier décorateur

\`\`\`python
def mon_decorateur(func):
    """Décorateur qui ajoute un message avant et après l'appel."""
    def wrapper():
        print("⏳ Avant l'appel...")
        resultat = func()          # Appel de la fonction originale
        print("✅ Après l'appel !")
        return resultat
    return wrapper

# Application manuelle (sans @)
def dire_bonjour():
    print("Bonjour !")

dire_bonjour = mon_decorateur(dire_bonjour)
dire_bonjour()
# ⏳ Avant l'appel...
# Bonjour !
# ✅ Après l'appel !
\`\`\`

### La syntaxe \`@\` (sucre syntaxique)

\`\`\`python
# Avec @ — Exactement équivalent au code ci-dessus
@mon_decorateur
def dire_bonjour():
    print("Bonjour !")

dire_bonjour()
# ⏳ Avant l'appel...
# Bonjour !
# ✅ Après l'appel !
\`\`\`

\`\`\`
@mon_decorateur          est identique à :
def dire_bonjour():      dire_bonjour = mon_decorateur(dire_bonjour)
    ...
\`\`\`

---

## ⚙️ Décorateur Universel avec \`*args\` et \`**kwargs\`

Le décorateur précédent ne fonctionne qu'avec des fonctions **sans argument**. Pour décorer n'importe quelle fonction, le wrapper doit accepter tous les arguments possibles.

\`\`\`python
from functools import wraps

def logger(func):
    """Logue chaque appel avec les arguments et le résultat."""
    @wraps(func)  # Préserve le nom et la docstring de func
    def wrapper(*args, **kwargs):
        print(f"📞 Appel : {func.__name__}({args}, {kwargs})")
        resultat = func(*args, **kwargs)
        print(f"📤 Retour : {resultat}")
        return resultat
    return wrapper

@logger
def addition(a, b):
    """Additionne deux nombres."""
    return a + b

@logger
def saluer(nom, enthousiaste=False):
    """Salue une personne."""
    msg = f"Bonjour {nom} !"
    return msg.upper() if enthousiaste else msg

addition(3, 5)
# 📞 Appel : addition((3, 5), {})
# 📤 Retour : 8

saluer("Alice", enthousiaste=True)
# 📞 Appel : saluer(('Alice',), {'enthousiaste': True})
# 📤 Retour : BONJOUR ALICE !
\`\`\`

### Pourquoi \`@wraps(func)\` ?

\`\`\`python
# SANS @wraps : le wrapper masque la fonction originale
def decorateur_sans_wraps(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@decorateur_sans_wraps
def ma_fonction():
    """Ma docstring."""
    pass

print(ma_fonction.__name__)  # "wrapper" ❌ (devrait être "ma_fonction")
print(ma_fonction.__doc__)   # None ❌ (devrait être "Ma docstring.")

# AVEC @wraps : le nom et la docstring sont préservés
print(addition.__name__)  # "addition" ✅
print(addition.__doc__)   # "Additionne deux nombres." ✅
\`\`\`

> ⚠️ **Toujours utiliser \`@wraps(func)\`** dans vos décorateurs. Sans cela, le débogage devient difficile car les fonctions décorées perdent leur identité.

---

## 🔧 Décorateurs Utiles en Pratique

### Timer : Mesurer le temps d'exécution

\`\`\`python
import time
from functools import wraps

def timer(func):
    """Mesure et affiche le temps d'exécution."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        debut = time.time()
        resultat = func(*args, **kwargs)
        duree = time.time() - debut
        print(f"⏱️ {func.__name__} : {duree:.4f}s")
        return resultat
    return wrapper

@timer
def calcul_lourd():
    return sum(i ** 2 for i in range(1_000_000))

calcul_lourd()  # ⏱️ calcul_lourd : 0.1234s
\`\`\`

### Cache : Mémoïsation manuelle

\`\`\`python
def cache(func):
    """Met en cache les résultats (mémoïsation)."""
    memo = {}
    @wraps(func)
    def wrapper(*args):
        if args not in memo:
            memo[args] = func(*args)
            print(f"💾 Calculé : {func.__name__}{args}")
        else:
            print(f"⚡ Cache : {func.__name__}{args}")
        return memo[args]
    return wrapper

@cache
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55 — Les appels récursifs sont mis en cache
\`\`\`

> 💡 Python fournit un cache intégré : \`@functools.lru_cache\` qui fait la même chose en mieux.

### Retry : Réessayer en cas d'erreur

\`\`\`python
def retry(max_tentatives=3):
    """Réessaie une fonction jusqu'à max_tentatives fois."""
    def decorateur(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for tentative in range(1, max_tentatives + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"⚠️ Tentative {tentative}/{max_tentatives} échouée : {e}")
                    if tentative == max_tentatives:
                        raise
        return wrapper
    return decorateur

@retry(max_tentatives=3)
def operation_instable():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Serveur indisponible")
    return "Succès !"
\`\`\`

---

## 🏗️ Décorateur avec Paramètres

Pour passer des arguments à un décorateur, on ajoute un **niveau d'imbrication supplémentaire**.

\`\`\`
Sans paramètres :              Avec paramètres :

@logger                        @repeat(3)
def func():                    def func():
    ...                            ...

logger(func)                   repeat(3)(func)
└── 2 niveaux                  └── 3 niveaux
\`\`\`

\`\`\`python
def repeat(n):
    """Décorateur qui répète l'appel n fois."""
    def decorateur(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            resultats = []
            for i in range(n):
                resultats.append(func(*args, **kwargs))
            return resultats
        return wrapper
    return decorateur

@repeat(3)
def lancer_de():
    import random
    return random.randint(1, 6)

print(lancer_de())  # [4, 2, 6] (3 lancers)
\`\`\`

### Validation des types

\`\`\`python
def valider_types(*types_attendus):
    """Vérifie les types des arguments d'une fonction."""
    def decorateur(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for arg, type_attendu in zip(args, types_attendus):
                if not isinstance(arg, type_attendu):
                    raise TypeError(
                        f"{func.__name__}() : attendu {type_attendu.__name__}, "
                        f"reçu {type(arg).__name__}"
                    )
            return func(*args, **kwargs)
        return wrapper
    return decorateur

@valider_types(str, int)
def creer_utilisateur(nom, age):
    return {"nom": nom, "age": age}

print(creer_utilisateur("Alice", 25))  # ✅ {'nom': 'Alice', 'age': 25}
# creer_utilisateur("Alice", "25")     # ❌ TypeError
\`\`\`

---

## 📚 Décorateurs Built-in de Python

Python fournit plusieurs décorateurs intégrés très utiles.

| Décorateur | Module | Usage |
|-----------|--------|-------|
| \`@property\` | Built-in | Getters/setters (Module 16) |
| \`@staticmethod\` | Built-in | Méthode sans accès à self/cls |
| \`@classmethod\` | Built-in | Méthode de classe avec cls |
| \`@functools.wraps\` | functools | Préserver les métadonnées |
| \`@functools.lru_cache\` | functools | Cache automatique (mémoïsation) |
| \`@functools.total_ordering\` | functools | Générer tous les opérateurs de comparaison |
| \`@abc.abstractmethod\` | abc | Méthode abstraite (Module 16) |
| \`@dataclasses.dataclass\` | dataclasses | Générer \`__init__\`, \`__repr__\`, \`__eq__\` |

### \`@functools.lru_cache\` : Cache intégré

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # Instantané ! (sans cache : des heures)
print(fibonacci.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=128, currsize=101)
\`\`\`

### \`@dataclass\` : Classes de données automatiques

\`\`\`python
from dataclasses import dataclass

@dataclass
class Produit:
    nom: str
    prix: float
    stock: int = 0

# Python génère automatiquement :
# __init__, __repr__, __eq__
p1 = Produit("Clavier", 49.99, 10)
p2 = Produit("Clavier", 49.99, 10)
print(p1)           # Produit(nom='Clavier', prix=49.99, stock=10)
print(p1 == p2)     # True (comparaison par valeur)
\`\`\`

---

## 🔗 Empiler Plusieurs Décorateurs

On peut appliquer plusieurs décorateurs à une même fonction. Ils s'exécutent de **bas en haut** (le plus proche de la fonction est appliqué en premier).

\`\`\`python
@timer
@logger
def calculer(x, y):
    return x ** y

# Équivalent à : calculer = timer(logger(calculer))
# Exécution : timer → logger → calculer → logger → timer

calculer(2, 10)
# 📞 Appel : calculer((2, 10), {})
# 📤 Retour : 1024
# ⏱️ calculer : 0.0001s
\`\`\`

\`\`\`
Ordre d'application :     Ordre d'exécution :
@timer          (3)       timer.wrapper()     (1er)
@logger         (2)         logger.wrapper()  (2ème)
def calculer(): (1)           calculer()      (3ème)
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Décorateur compteur d'appels
\`\`\`python
from functools import wraps

def compter_appels(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.appels += 1
        print(f"📊 {func.__name__} : appel #{wrapper.appels}")
        return func(*args, **kwargs)
    wrapper.appels = 0
    return wrapper

@compter_appels
def saluer(nom):
    return f"Bonjour {nom} !"

saluer("Alice")  # 📊 saluer : appel #1
saluer("Bob")    # 📊 saluer : appel #2
print(f"Total : {saluer.appels} appels")  # 2
\`\`\`

### Exercice 2 : Décorateur avec paramètre
\`\`\`python
def limiter_valeur(min_val, max_val):
    def decorateur(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            resultat = func(*args, **kwargs)
            return max(min_val, min(max_val, resultat))
        return wrapper
    return decorateur

@limiter_valeur(0, 100)
def note_sur_100(points, total):
    return (points / total) * 100

print(note_sur_100(15, 20))   # 75.0
print(note_sur_100(25, 20))   # 100 (limité)
print(note_sur_100(-5, 20))   # 0 (limité)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/19-decorateurs-exercice.py\`
`,

    '20-generateurs': `
# Module 20 : Générateurs & Itérateurs

Les **générateurs** permettent de produire des séquences de valeurs **à la demande** (lazily), sans tout stocker en mémoire. C'est l'un des concepts les plus puissants de Python pour traiter de grandes quantités de données de manière efficace. Comprendre les itérateurs et les générateurs vous permettra de maîtriser le fonctionnement interne des boucles \`for\`.

---

## 🧠 Le Protocole d'Itération

En Python, la boucle \`for\` ne fonctionne pas avec des indices comme en C. Elle utilise le **protocole d'itération** : deux méthodes spéciales \`__iter__()\` et \`__next__()\`.

### Ce qui se passe dans une boucle for

\`\`\`python
# Quand vous écrivez :
for x in [10, 20, 30]:
    print(x)

# Python fait en réalité :
it = iter([10, 20, 30])     # Appelle __iter__() → obtient un itérateur
print(next(it))              # Appelle __next__() → 10
print(next(it))              # Appelle __next__() → 20
print(next(it))              # Appelle __next__() → 30
# next(it)                   # Appelle __next__() → StopIteration !
#                              La boucle for attrape cette exception et s'arrête
\`\`\`

### Schéma

\`\`\`
for x in iterable:
    ...

     ┌──────────────────────────────┐
     │  1. it = iter(iterable)      │
     │  2. Boucle :                 │
     │     x = next(it)  ────► Valeur → exécuter le corps
     │     x = next(it)  ────► Valeur → exécuter le corps
     │     x = next(it)  ────► StopIteration → FIN
     └──────────────────────────────┘
\`\`\`

### Itérateur manuel

\`\`\`python
# Tout objet itérable (list, str, dict, set, file...) supporte iter()
texte = "ABC"
it = iter(texte)

print(next(it))  # 'A'
print(next(it))  # 'B'
print(next(it))  # 'C'
# next(it)       # ❌ StopIteration

# Chaque appel à iter() crée un NOUVEL itérateur
it2 = iter(texte)
print(next(it2))  # 'A' (repart du début)
\`\`\`

> 💡 **Itérable** vs **Itérateur** : un itérable est un objet sur lequel on peut appeler \`iter()\` (liste, string...). Un itérateur est l'objet retourné par \`iter()\`, qui possède la méthode \`__next__()\`. Un itérateur est lui-même itérable.

---

## ⚡ Générateurs avec \`yield\`

Un **générateur** est une fonction spéciale qui utilise le mot-clé \`yield\` au lieu de \`return\`. Chaque appel à \`next()\` exécute le code jusqu'au prochain \`yield\`, puis **met la fonction en pause**.

### Comparaison return vs yield

\`\`\`python
# Avec return : calcule et retourne TOUT d'un coup
def carres_liste(n):
    resultat = []
    for i in range(n):
        resultat.append(i ** 2)
    return resultat  # Toute la liste en mémoire

# Avec yield : produit les valeurs UNE PAR UNE
def carres_generateur(n):
    for i in range(n):
        yield i ** 2  # Produit une valeur, puis pause

# Utilisation identique
for x in carres_liste(5):
    print(x)       # 0, 1, 4, 9, 16

for x in carres_generateur(5):
    print(x)       # 0, 1, 4, 9, 16
\`\`\`

### Ce qui se passe dans un générateur

\`\`\`python
def compteur(max_val):
    print("Début")
    n = 0
    while n < max_val:
        print(f"  Avant yield {n}")
        yield n                      # ⏸️ Pause ici
        print(f"  Après yield {n}")
        n += 1
    print("Fin")

gen = compteur(3)
# Rien ne s'exécute encore !

print(next(gen))
# Début
#   Avant yield 0
# 0                  ← valeur retournée par yield

print(next(gen))
#   Après yield 0    ← reprend EXACTEMENT où on s'était arrêté
#   Avant yield 1
# 1

print(next(gen))
#   Après yield 1
#   Avant yield 2
# 2

# next(gen)
#   Après yield 2
# Fin
# ❌ StopIteration
\`\`\`

\`\`\`
yield met la fonction en PAUSE :

    ┌──────────────────┐
    │ code avant yield │
    │      yield n     │ ◄── Pause ici, retourne n
    │ code après yield │ ◄── Reprend ici au prochain next()
    │      yield n+1   │ ◄── Pause ici, retourne n+1
    │      ...         │
    └──────────────────┘
\`\`\`

---

## 💾 Mémoire : Liste vs Générateur

C'est l'avantage principal des générateurs : ils ne stockent **qu'une seule valeur à la fois** en mémoire.

\`\`\`python
import sys

# Liste : TOUT en mémoire
liste = [x ** 2 for x in range(1_000_000)]
print(sys.getsizeof(liste))  # ≈ 8 448 728 octets (8 Mo)

# Générateur : quasi rien en mémoire
gen = (x ** 2 for x in range(1_000_000))
print(sys.getsizeof(gen))    # ≈ 200 octets !
\`\`\`

| Critère | Liste | Générateur |
|---------|-------|------------|
| **Mémoire** | Stocke tout | Une valeur à la fois |
| **Accès** | Par index \`liste[i]\` | Séquentiel uniquement |
| **Réutilisable** | Oui, autant de fois | Non, épuisé après un parcours |
| **Taille** | \`len(liste)\` | Pas de \`len()\` |
| **Cas d'usage** | Petites collections, accès aléatoire | Grandes données, flux continus |

---

## 🔄 Generator Expressions

Les **generator expressions** sont aux générateurs ce que les list comprehensions sont aux listes. Même syntaxe, mais avec des **parenthèses** au lieu de crochets.

\`\`\`python
# List comprehension → crée une liste complète
carres_liste = [x ** 2 for x in range(10)]

# Generator expression → crée un générateur (lazy)
carres_gen = (x ** 2 for x in range(10))

print(type(carres_liste))  # <class 'list'>
print(type(carres_gen))    # <class 'generator'>

# Utilisation avec des fonctions qui acceptent un itérable
nombres = range(1, 11)

# Les parenthèses du générateur et de la fonction se confondent
print(sum(x ** 2 for x in nombres))  # 385
print(max(x ** 2 for x in nombres))  # 100
print(any(x > 5 for x in nombres))   # True
print(all(x > 0 for x in nombres))   # True
\`\`\`

> 💡 **Conseil** : Utilisez les generator expressions avec \`sum()\`, \`max()\`, \`min()\`, \`any()\`, \`all()\`, \`"".join()\`... C'est à la fois élégant et efficace en mémoire.

---

## 🔗 Pipelines de Générateurs

Les générateurs se **chaînent** naturellement pour créer des pipelines de traitement de données, comme des tuyaux connectés.

\`\`\`python
def lire_lignes(chemin):
    """Étape 1 : Lire le fichier ligne par ligne."""
    with open(chemin, 'r', encoding='utf-8') as f:
        for ligne in f:
            yield ligne.strip()

def filtrer_commentaires(lignes):
    """Étape 2 : Ignorer les lignes de commentaire."""
    for ligne in lignes:
        if not ligne.startswith('#') and ligne:
            yield ligne

def extraire_nombres(lignes):
    """Étape 3 : Extraire les nombres de chaque ligne."""
    for ligne in lignes:
        try:
            yield float(ligne)
        except ValueError:
            pass

# Pipeline : chaîner les générateurs
# lignes = lire_lignes("data.txt")
# sans_commentaires = filtrer_commentaires(lignes)
# nombres = extraire_nombres(sans_commentaires)
# total = sum(nombres)

# Ou en une ligne :
# total = sum(extraire_nombres(filtrer_commentaires(lire_lignes("data.txt"))))
\`\`\`

\`\`\`
Pipeline de générateurs :

fichier ──► lire_lignes ──► filtrer ──► extraire ──► sum()
              yield            yield       yield

Chaque étape traite UNE valeur à la fois.
Aucune liste intermédiaire n'est créée !
\`\`\`

---

## 🏗️ Exemples Pratiques

### Fibonacci infini

\`\`\`python
def fibonacci():
    """Générateur INFINI de nombres de Fibonacci."""
    a, b = 0, 1
    while True:     # Boucle infinie — mais yield met en pause
        yield a
        a, b = b, a + b

# Prendre les 10 premiers
from itertools import islice
print(list(islice(fibonacci(), 10)))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Fibonacci < 100
for n in fibonacci():
    if n >= 100:
        break
    print(n, end=" ")
# 0 1 1 2 3 5 8 13 21 34 55 89
\`\`\`

### Traitement de gros fichiers CSV

\`\`\`python
def lire_csv(chemin, separateur=","):
    """Lit un CSV et yield chaque ligne comme dict."""
    with open(chemin, 'r', encoding='utf-8') as f:
        en_tetes = f.readline().strip().split(separateur)
        for ligne in f:
            valeurs = ligne.strip().split(separateur)
            yield dict(zip(en_tetes, valeurs))

# Traiter un fichier de 10 Go sans tout charger
# for ligne in lire_csv("enorme_fichier.csv"):
#     if float(ligne["montant"]) > 1000:
#         traiter(ligne)
\`\`\`

### Le module itertools

\`\`\`python
from itertools import count, cycle, repeat, chain, islice

# count : compteur infini
for i in islice(count(10, 5), 4):
    print(i, end=" ")    # 10 15 20 25

# cycle : boucler sur un itérable indéfiniment
couleurs = cycle(["rouge", "vert", "bleu"])
for _ in range(7):
    print(next(couleurs), end=" ")
# rouge vert bleu rouge vert bleu rouge

# chain : concaténer des itérables
for x in chain([1, 2], [3, 4], [5]):
    print(x, end=" ")    # 1 2 3 4 5
\`\`\`

---

## ⚠️ Pièges Courants

\`\`\`python
# 1. Un générateur est ÉPUISÉ après un parcours
gen = (x for x in range(3))
print(list(gen))  # [0, 1, 2]
print(list(gen))  # [] ← Vide ! Le générateur est épuisé

# 2. Pas d'accès par index
gen = (x for x in range(10))
# gen[5]  # ❌ TypeError

# 3. Pas de len()
gen = (x for x in range(10))
# len(gen)  # ❌ TypeError
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Générateur de nombres pairs
\`\`\`python
def pairs(limite):
    for n in range(0, limite, 2):
        yield n

print(list(pairs(10)))  # [0, 2, 4, 6, 8]
print(sum(pairs(100)))  # 2450
\`\`\`

### Exercice 2 : Pipeline de traitement
\`\`\`python
def normaliser(textes):
    for t in textes:
        yield t.strip().lower()

def filtrer_vides(textes):
    for t in textes:
        if t:
            yield t

def compter_mots(textes):
    for t in textes:
        yield len(t.split())

donnees = ["  Hello World  ", "", "  Python EST Super  ", " ", "Fin"]
pipeline = compter_mots(filtrer_vides(normaliser(donnees)))
print(list(pipeline))  # [2, 3, 1]
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/20-generateurs-exercice.py\`
`,

    '21-modules-avances': `
# Module 21 : Modules Avancés Python

La bibliothèque standard de Python contient des modules extrêmement puissants qui vont bien au-delà des bases. Ce module couvre les outils avancés que tout développeur Python devrait connaître : **collections** spécialisées, **itertools** pour les itérations avancées, **datetime** pour les dates, et bien plus.

---

## 📦 collections : Structures de Données Spécialisées

Le module \`collections\` fournit des alternatives aux types intégrés (\`dict\`, \`list\`, \`tuple\`) avec des fonctionnalités supplémentaires.

### Counter : Compter les éléments

\`\`\`python
from collections import Counter

# Compter les caractères
texte = "abracadabra"
compteur = Counter(texte)
print(compteur)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})

# Les N plus fréquents
print(compteur.most_common(3))  # [('a', 5), ('b', 2), ('r', 2)]

# Compter les mots
mots = "le chat le chien le chat un chien".split()
freq = Counter(mots)
print(freq)  # Counter({'le': 3, 'chat': 2, 'chien': 2, 'un': 1})

# Opérations ensemblistes entre Counter
c1 = Counter("aabbb")
c2 = Counter("aabcc")
print(c1 + c2)   # Counter({'a': 4, 'b': 3, 'c': 2})
print(c1 - c2)   # Counter({'b': 3})  (seuls les positifs)
print(c1 & c2)   # Counter({'a': 2})  (minimum commun)

# Utilisation pratique : analyse de texte
phrase = "Python est un langage. Python est populaire. Python est puissant."
mots_freq = Counter(phrase.lower().split())
for mot, nb in mots_freq.most_common(5):
    print(f"  '{mot}' : {nb} fois")
\`\`\`

### defaultdict : Dictionnaire avec valeur par défaut

\`\`\`python
from collections import defaultdict

# Problème avec un dict normal
d = {}
# d["fruits"].append("pomme")  # ❌ KeyError !

# Solution avec defaultdict
d = defaultdict(list)
d["fruits"].append("pomme")
d["fruits"].append("banane")
d["légumes"].append("carotte")
print(dict(d))
# {'fruits': ['pomme', 'banane'], 'légumes': ['carotte']}

# Grouper des éléments par catégorie
etudiants = [
    ("Alice", "Math"), ("Bob", "Info"),
    ("Charlie", "Math"), ("Diana", "Info"), ("Eve", "Math")
]

par_matiere = defaultdict(list)
for nom, matiere in etudiants:
    par_matiere[matiere].append(nom)

print(dict(par_matiere))
# {'Math': ['Alice', 'Charlie', 'Eve'], 'Info': ['Bob', 'Diana']}

# Compter avec defaultdict(int)
compteur = defaultdict(int)
for mot in "hello world hello python hello".split():
    compteur[mot] += 1
print(dict(compteur))  # {'hello': 3, 'world': 1, 'python': 1}
\`\`\`

### namedtuple : Tuples Nommés

\`\`\`python
from collections import namedtuple

# Créer un type de tuple nommé
Point = namedtuple("Point", ["x", "y"])
Couleur = namedtuple("Couleur", "rouge vert bleu")  # String aussi

p = Point(3, 4)
c = Couleur(255, 128, 0)

# Accès par nom ET par index
print(p.x, p.y)         # 3 4
print(p[0], p[1])       # 3 4
print(c.rouge, c.vert)  # 255 128

# Immutables comme les tuples
# p.x = 10  # ❌ AttributeError

# Conversion en dict
print(p._asdict())  # {'x': 3, 'y': 4}

# Utilisation pratique : données structurées
Etudiant = namedtuple("Etudiant", ["nom", "age", "note"])
etudiants = [
    Etudiant("Alice", 20, 15.5),
    Etudiant("Bob", 22, 12.0),
    Etudiant("Charlie", 21, 18.0),
]
meilleur = max(etudiants, key=lambda e: e.note)
print(f"Meilleur : {meilleur.nom} ({meilleur.note}/20)")
\`\`\`

### deque : File à Double Entrée

\`\`\`python
from collections import deque

# deque vs list pour les ajouts/suppressions en début
d = deque([1, 2, 3, 4, 5])

d.appendleft(0)    # Ajout à gauche  → O(1) (vs O(n) pour list)
d.append(6)         # Ajout à droite  → O(1)
d.popleft()         # Retrait à gauche → O(1) (vs O(n) pour list)
d.pop()             # Retrait à droite → O(1)
print(d)            # deque([1, 2, 3, 4, 5])

# Rotation
d.rotate(2)         # Décaler vers la droite
print(d)            # deque([4, 5, 1, 2, 3])

# deque de taille fixe (historique des N derniers)
historique = deque(maxlen=3)
for page in ["accueil", "produits", "panier", "paiement", "confirmation"]:
    historique.append(page)
print(list(historique))  # ['panier', 'paiement', 'confirmation']
\`\`\`

| Structure | Ajout début | Ajout fin | Retrait début | Retrait fin |
|-----------|------------|-----------|---------------|-------------|
| \`list\` | O(n) 🐢 | O(1) | O(n) 🐢 | O(1) |
| \`deque\` | O(1) ⚡ | O(1) | O(1) ⚡ | O(1) |

---

## 🔄 itertools : Itérations Avancées

Le module \`itertools\` fournit des outils efficaces pour créer des itérateurs complexes.

### Itérateurs infinis

\`\`\`python
from itertools import count, cycle, repeat, islice

# count : compteur infini
for i in islice(count(10, 5), 5):
    print(i, end=" ")       # 10 15 20 25 30

# cycle : répéter un itérable indéfiniment
couleurs = cycle(["🔴", "🟢", "🔵"])
for _ in range(7):
    print(next(couleurs), end=" ")
# 🔴 🟢 🔵 🔴 🟢 🔵 🔴

# repeat : répéter une valeur
print(list(repeat("⭐", 5)))  # ['⭐', '⭐', '⭐', '⭐', '⭐']
\`\`\`

### Combinatoire

\`\`\`python
from itertools import permutations, combinations, product

# permutations : tous les arrangements possibles
print(list(permutations("ABC", 2)))
# [('A','B'), ('A','C'), ('B','A'), ('B','C'), ('C','A'), ('C','B')]

# combinations : toutes les combinaisons (sans ordre)
equipes = ["Alice", "Bob", "Charlie", "Diana"]
for paire in combinations(equipes, 2):
    print(f"  {paire[0]} + {paire[1]}")
# Alice + Bob, Alice + Charlie, ..., Charlie + Diana

# product : produit cartésien
tailles = ["S", "M", "L"]
couleurs_prod = ["Noir", "Blanc"]
for t, c in product(tailles, couleurs_prod):
    print(f"  {t}-{c}", end="")
# S-Noir S-Blanc M-Noir M-Blanc L-Noir L-Blanc
\`\`\`

### Chaînage et regroupement

\`\`\`python
from itertools import chain, groupby

# chain : concaténer des itérables
liste1 = [1, 2, 3]
liste2 = [4, 5, 6]
liste3 = [7, 8]
print(list(chain(liste1, liste2, liste3)))  # [1, 2, 3, 4, 5, 6, 7, 8]

# groupby : grouper des éléments consécutifs (les données doivent être triées)
donnees = [
    ("Math", "Alice"), ("Math", "Bob"),
    ("Info", "Charlie"), ("Info", "Diana"),
    ("Math", "Eve"),
]
donnees.sort(key=lambda x: x[0])  # Trier d'abord !

for matiere, groupe in groupby(donnees, key=lambda x: x[0]):
    noms = [nom for _, nom in groupe]
    print(f"  {matiere} : {noms}")
# Info : ['Charlie', 'Diana']
# Math : ['Alice', 'Bob', 'Eve']
\`\`\`

---

## 📅 datetime : Dates et Heures

\`\`\`python
from datetime import datetime, date, time, timedelta

# Date et heure actuelles
maintenant = datetime.now()
print(maintenant)             # 2025-01-31 14:30:00.123456
print(date.today())           # 2025-01-31

# Créer une date/heure
noel = datetime(2025, 12, 25, 0, 0, 0)
anniversaire = date(1995, 6, 15)
\`\`\`

### Formatage et parsing

\`\`\`python
d = datetime(2025, 12, 25, 14, 30)

# Formatage : datetime → string
print(d.strftime("%d/%m/%Y"))          # 25/12/2025
print(d.strftime("%A %d %B %Y"))       # Thursday 25 December 2025
print(d.strftime("%d/%m/%Y à %H:%M"))  # 25/12/2025 à 14:30

# Parsing : string → datetime
d2 = datetime.strptime("25/12/2025", "%d/%m/%Y")
d3 = datetime.strptime("2025-12-25 14:30", "%Y-%m-%d %H:%M")
\`\`\`

### Codes de formatage

| Code | Signification | Exemple |
|------|---------------|---------|
| \`%d\` | Jour (01-31) | 25 |
| \`%m\` | Mois (01-12) | 12 |
| \`%Y\` | Année (4 chiffres) | 2025 |
| \`%H\` | Heure (00-23) | 14 |
| \`%M\` | Minute (00-59) | 30 |
| \`%S\` | Seconde (00-59) | 00 |
| \`%A\` | Jour de la semaine | Thursday |
| \`%B\` | Nom du mois | December |
| \`%j\` | Jour de l'année (001-366) | 359 |

### Calculs de durées

\`\`\`python
from datetime import datetime, timedelta

maintenant = datetime.now()

# Ajouter/soustraire des durées
demain = maintenant + timedelta(days=1)
semaine_prochaine = maintenant + timedelta(weeks=1)
dans_2h30 = maintenant + timedelta(hours=2, minutes=30)
il_y_a_90_jours = maintenant - timedelta(days=90)

# Différence entre deux dates
naissance = datetime(1995, 6, 15)
age = maintenant - naissance
print(f"Âge : {age.days} jours ({age.days // 365} ans)")

# Comparer des dates
noel = datetime(2025, 12, 25)
if maintenant < noel:
    jours_restants = (noel - maintenant).days
    print(f"Noël dans {jours_restants} jours")
\`\`\`

---

## 🎲 random : Génération Aléatoire

\`\`\`python
import random

# Nombres aléatoires
print(random.random())            # Float entre 0.0 et 1.0
print(random.uniform(1.5, 9.5))   # Float entre 1.5 et 9.5
print(random.randint(1, 10))      # Entier entre 1 et 10 (inclus)
print(random.randrange(0, 100, 5)) # Multiple de 5 entre 0 et 99

# Choix dans une séquence
fruits = ["pomme", "banane", "cerise", "datte"]
print(random.choice(fruits))       # Un élément au hasard
print(random.choices(fruits, k=3)) # 3 éléments (avec remise)
print(random.sample(fruits, 2))    # 2 éléments (sans remise)

# Mélanger en place
cartes = list(range(1, 14))
random.shuffle(cartes)
print(cartes)  # [7, 3, 11, ...]

# Reproductibilité avec seed
random.seed(42)
print(random.randint(1, 100))  # Toujours le même résultat : 82
random.seed(42)
print(random.randint(1, 100))  # Encore : 82
\`\`\`

> 💡 **\`random.seed()\`** fixe la séquence aléatoire. Utile pour les tests et la reproductibilité. Ne **jamais** utiliser \`random\` pour la cryptographie — utilisez \`secrets\` à la place.

---

## 🔧 Autres Modules Utiles

### math : Fonctions mathématiques

\`\`\`python
import math

print(math.pi)           # 3.141592653589793
print(math.e)            # 2.718281828459045
print(math.sqrt(16))     # 4.0
print(math.ceil(4.2))    # 5   (arrondi supérieur)
print(math.floor(4.8))   # 4   (arrondi inférieur)
print(math.log(100, 10)) # 2.0 (log base 10)
print(math.factorial(5)) # 120
print(math.gcd(12, 8))   # 4   (PGCD)
print(math.isclose(0.1 + 0.2, 0.3))  # True (comparaison de flottants)
\`\`\`

### pdb : Le Débogueur Python

\`\`\`python
def fonction_buggee(donnees):
    total = 0
    for item in donnees:
        breakpoint()         # ⏸️ Le programme s'arrête ici
        total += item["valeur"]
    return total

# Commandes pdb :
# n (next)     → ligne suivante
# s (step)     → entrer dans une fonction
# c (continue) → continuer jusqu'au prochain breakpoint
# p variable   → afficher la valeur d'une variable
# pp variable  → pretty-print (affichage formaté)
# l (list)     → afficher le code autour
# w (where)    → afficher la pile d'appels
# q (quit)     → quitter le débogueur
\`\`\`

> 💡 Depuis Python 3.7, utilisez \`breakpoint()\` au lieu de \`import pdb; pdb.set_trace()\`. C'est plus court et configurable.

---

## Exercices 🎯

### Exercice 1 : Analyse de texte avec Counter
\`\`\`python
from collections import Counter

def analyser_texte(texte):
    mots = texte.lower().split()
    compteur = Counter(mots)
    return {
        "total_mots": len(mots),
        "mots_uniques": len(compteur),
        "top_5": compteur.most_common(5),
    }

texte = "Python est un langage Python est populaire le langage Python"
print(analyser_texte(texte))
\`\`\`

### Exercice 2 : Grouper avec defaultdict
\`\`\`python
from collections import defaultdict

def grouper_par_longueur(mots):
    groupes = defaultdict(list)
    for mot in mots:
        groupes[len(mot)].append(mot)
    return dict(groupes)

mots = ["chat", "chien", "rat", "souris", "âne", "boa"]
print(grouper_par_longueur(mots))
# {4: ['chat'], 5: ['chien'], 3: ['rat', 'âne', 'boa'], 6: ['souris']}
\`\`\`

### Exercice 3 : Calcul d'âge avec datetime
\`\`\`python
from datetime import datetime

def calculer_age(date_naissance_str):
    naissance = datetime.strptime(date_naissance_str, "%d/%m/%Y")
    aujourdhui = datetime.now()
    age = aujourdhui.year - naissance.year
    if (aujourdhui.month, aujourdhui.day) < (naissance.month, naissance.day):
        age -= 1
    return age

print(f"Âge : {calculer_age('15/06/1995')} ans")
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/21-modules-avances-exercice.py\`
`,

    '22-regex': `
# Module 22 : Expressions Régulières (Regex)

Les **expressions régulières** (ou **regex**) sont un langage de recherche de motifs dans du texte. Elles permettent de trouver, extraire, valider et remplacer des chaînes complexes en quelques lignes de code. C'est un outil incontournable pour le traitement de texte, l'extraction de données et la validation d'entrées utilisateur.

---

## 🧠 Qu'est-ce qu'une Regex ?

Une regex est un **motif** (pattern) qui décrit un ensemble de chaînes. Par exemple, le motif \`\\d{2}/\\d{2}/\\d{4}\` décrit toutes les dates au format \`JJ/MM/AAAA\`.

\`\`\`python
import re

texte = "Née le 15/06/1995, diplômée le 20/09/2020"

# Trouver TOUTES les dates dans le texte
dates = re.findall(r'\\d{2}/\\d{2}/\\d{4}', texte)
print(dates)  # ['15/06/1995', '20/09/2020']
\`\`\`

> 💡 **Le préfixe \`r\`** : Utilisez toujours \`r"..."\` (raw string) pour les regex. Cela évite les conflits avec les séquences d'échappement Python (\`\\n\`, \`\\t\`...).

---

## 📋 Référence : Caractères Spéciaux

### Métacaractères

| Pattern | Description | Exemple | Match |
|---------|-------------|---------|-------|
| \`.\` | N'importe quel caractère (sauf \\n) | \`a.c\` | "abc", "a1c", "a c" |
| \`\\d\` | Un chiffre [0-9] | \`\\d\\d\` | "42", "09" |
| \`\\D\` | Pas un chiffre | \`\\D+\` | "abc", "!@#" |
| \`\\w\` | Alphanumérique [a-zA-Z0-9_] | \`\\w+\` | "hello", "var_1" |
| \`\\W\` | Non-alphanumérique | \`\\W+\` | " !? " |
| \`\\s\` | Espace blanc (espace, tab, \\n) | \`\\s+\` | " ", "\\t\\n" |
| \`\\S\` | Non-espace | \`\\S+\` | "hello" |
| \`\\b\` | Frontière de mot | \`\\bchat\\b\` | "chat" mais pas "chaton" |

### Quantificateurs

| Pattern | Description | Exemple | Match |
|---------|-------------|---------|-------|
| \`*\` | 0 ou plus (glouton) | \`ab*c\` | "ac", "abc", "abbc" |
| \`+\` | 1 ou plus (glouton) | \`ab+c\` | "abc", "abbc" (pas "ac") |
| \`?\` | 0 ou 1 (optionnel) | \`colou?r\` | "color", "colour" |
| \`{n}\` | Exactement n | \`\\d{4}\` | "2024" |
| \`{n,m}\` | Entre n et m | \`\\d{2,4}\` | "42", "123", "2024" |
| \`{n,}\` | Au moins n | \`\\d{3,}\` | "123", "12345" |
| \`*?\` | 0 ou plus (non-glouton) | \`<.*?>\` | Premier tag uniquement |

### Ancres et classes

| Pattern | Description | Exemple |
|---------|-------------|---------|
| \`^\` | Début de chaîne | \`^Bonjour\` |
| \`$\` | Fin de chaîne | \`\\.py$\` |
| \`[abc]\` | Un caractère parmi a, b, c | \`[aeiou]\` (voyelles) |
| \`[^abc]\` | Tout sauf a, b, c | \`[^0-9]\` (pas un chiffre) |
| \`[a-z]\` | Plage de caractères | \`[a-zA-Z]\` (toute lettre) |
| \`(a|b)\` | a OU b | \`(chat|chien)\` |

---

## 🔧 Fonctions du Module \`re\`

### Les 6 fonctions principales

\`\`\`python
import re

texte = "Alice a 25 ans. Bob a 30 ans. Charlie a 22 ans."
\`\`\`

| Fonction | Usage | Retourne |
|----------|-------|----------|
| \`re.search()\` | Première occurrence | Match object ou None |
| \`re.match()\` | Match au DÉBUT uniquement | Match object ou None |
| \`re.findall()\` | Toutes les occurrences | Liste de strings |
| \`re.finditer()\` | Toutes les occurrences | Itérateur de Match objects |
| \`re.sub()\` | Chercher et remplacer | Nouvelle string |
| \`re.split()\` | Découper selon un motif | Liste de strings |

### Exemples détaillés

\`\`\`python
import re

texte = "Alice a 25 ans. Bob a 30 ans. Charlie a 22 ans."

# search : première occurrence
match = re.search(r'\\d+', texte)
if match:
    print(match.group())   # "25"
    print(match.start())   # 10 (position de début)
    print(match.end())     # 12 (position de fin)
    print(match.span())    # (10, 12)

# match : UNIQUEMENT au début de la chaîne
print(re.match(r'\\d+', texte))       # None (ne commence pas par un chiffre)
print(re.match(r'Alice', texte))      # <Match object> ✅

# findall : toutes les occurrences (retourne une liste)
ages = re.findall(r'\\d+', texte)
print(ages)  # ['25', '30', '22']

# finditer : itérateur de Match objects (plus d'infos que findall)
for match in re.finditer(r'(\\w+) a (\\d+) ans', texte):
    print(f"  {match.group(1)} → {match.group(2)} ans")
# Alice → 25 ans
# Bob → 30 ans
# Charlie → 22 ans

# sub : chercher et remplacer
nouveau = re.sub(r'\\d+', 'XX', texte)
print(nouveau)  # "Alice a XX ans. Bob a XX ans. Charlie a XX ans."

# sub avec fonction
def incrementer(match):
    return str(int(match.group()) + 1)

print(re.sub(r'\\d+', incrementer, texte))
# "Alice a 26 ans. Bob a 31 ans. Charlie a 23 ans."

# split : découper
parties = re.split(r'\\.\\s*', texte)
print(parties)  # ['Alice a 25 ans', 'Bob a 30 ans', 'Charlie a 22 ans', '']
\`\`\`

### \`re.compile()\` : Pattern réutilisable

\`\`\`python
# Compiler le pattern une seule fois (plus performant en boucle)
pattern_email = re.compile(r'[\\w.-]+@[\\w.-]+\\.\\w+')
pattern_date = re.compile(r'\\d{2}/\\d{2}/\\d{4}')

textes = [
    "Contactez alice@mail.com avant le 15/03/2025",
    "Info : bob@company.fr - Deadline 01/06/2025",
]

for texte in textes:
    emails = pattern_email.findall(texte)
    dates = pattern_date.findall(texte)
    print(f"  Emails: {emails}, Dates: {dates}")
\`\`\`

> 💡 Utilisez \`re.compile()\` quand vous réutilisez le même pattern dans une boucle. Pour une utilisation unique, les fonctions directes (\`re.search()\`...) suffisent.

---

## 🎯 Groupes de Capture

Les **parenthèses** dans une regex créent des groupes qui permettent d'extraire des sous-parties du match.

### Groupes numérotés

\`\`\`python
# Pattern avec groupes
pattern = r'(\\w+)@(\\w+)\\.(\\w+)'
match = re.search(pattern, "Contact: alice@example.com")

print(match.group(0))  # "alice@example.com" (le match complet)
print(match.group(1))  # "alice"              (1er groupe)
print(match.group(2))  # "example"            (2ème groupe)
print(match.group(3))  # "com"                (3ème groupe)
print(match.groups())  # ('alice', 'example', 'com')
\`\`\`

### Groupes nommés \`(?P<nom>...)\`

\`\`\`python
pattern = r'(?P<jour>\\d{2})/(?P<mois>\\d{2})/(?P<annee>\\d{4})'
match = re.search(pattern, "Date : 25/12/2024")

print(match.group('jour'))   # "25"
print(match.group('mois'))   # "12"
print(match.group('annee'))  # "2024"
print(match.groupdict())     # {'jour': '25', 'mois': '12', 'annee': '2024'}
\`\`\`

### findall avec groupes

\`\`\`python
# Quand findall rencontre des groupes, il retourne les GROUPES
texte = "Alice(25), Bob(30), Charlie(22)"

# Sans groupe : retourne le match complet
print(re.findall(r'\\w+\\(\\d+\\)', texte))
# ['Alice(25)', 'Bob(30)', 'Charlie(22)']

# Avec groupes : retourne les contenus des groupes
print(re.findall(r'(\\w+)\\((\\d+)\\)', texte))
# [('Alice', '25'), ('Bob', '30'), ('Charlie', '22')]
\`\`\`

---

## 🛠️ Cas d'Usage Pratiques

### Validation de données

\`\`\`python
import re

def valider_email(email):
    pattern = r'^[\\w.-]+@[\\w.-]+\\.\\w{2,}$'
    return bool(re.match(pattern, email))

def valider_telephone_fr(tel):
    pattern = r'^(0[1-9])([\\.\\s-]?\\d{2}){4}$'
    return bool(re.match(pattern, tel))

def valider_mot_de_passe(mdp):
    """Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre."""
    if len(mdp) < 8:
        return False
    if not re.search(r'[A-Z]', mdp):
        return False
    if not re.search(r'[a-z]', mdp):
        return False
    if not re.search(r'\\d', mdp):
        return False
    return True

print(valider_email("alice@example.com"))    # True
print(valider_email("invalide"))              # False
print(valider_telephone_fr("06 12 34 56 78")) # True
print(valider_mot_de_passe("MonPass1"))       # True
print(valider_mot_de_passe("faible"))         # False
\`\`\`

### Extraction de données

\`\`\`python
texte_log = """
[2025-01-15 08:30:12] ERROR: Connection refused (port 5432)
[2025-01-15 08:31:45] INFO: Server started (port 8080)
[2025-01-15 08:32:00] WARNING: High memory usage (85%)
[2025-01-15 08:35:22] ERROR: Timeout after 30s
"""

# Extraire les erreurs avec date et message
pattern = r'\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\] (ERROR|WARNING): (.+)'
for match in re.finditer(pattern, texte_log):
    date, niveau, message = match.groups()
    print(f"  [{niveau}] {date} → {message}")
\`\`\`

### Nettoyage de texte

\`\`\`python
def nettoyer_texte(texte):
    texte = re.sub(r'<[^>]+>', '', texte)       # Supprimer les tags HTML
    texte = re.sub(r'\\s+', ' ', texte)           # Espaces multiples → un seul
    texte = re.sub(r'[^\\w\\s.,!?-]', '', texte)  # Garder uniquement ponctuation de base
    return texte.strip()

html = "<p>Bonjour  <b>monde</b> !  </p>"
print(nettoyer_texte(html))  # "Bonjour monde !"
\`\`\`

---

## ⚠️ Glouton vs Non-Glouton

Par défaut, les quantificateurs (\`*\`, \`+\`, \`?\`) sont **gloutons** : ils capturent le maximum possible. Ajoutez \`?\` pour les rendre **non-gloutons** (minimum possible).

\`\`\`python
html = "<b>Gras</b> et <i>italique</i>"

# Glouton (par défaut) : capture le maximum
print(re.findall(r'<.*>', html))
# ['<b>Gras</b> et <i>italique</i>']  ← Tout d'un bloc !

# Non-glouton (avec ?) : capture le minimum
print(re.findall(r'<.*?>', html))
# ['<b>', '</b>', '<i>', '</i>']  ← Chaque tag séparément
\`\`\`

---

## 🏳️ Flags (Options)

\`\`\`python
# re.IGNORECASE (re.I) : insensible à la casse
re.findall(r'python', "Python PYTHON python", re.IGNORECASE)
# ['Python', 'PYTHON', 'python']

# re.MULTILINE (re.M) : ^ et $ matchent début/fin de CHAQUE ligne
texte = "ligne 1\\nligne 2\\nligne 3"
re.findall(r'^ligne \\d', texte, re.MULTILINE)
# ['ligne 1', 'ligne 2', 'ligne 3']

# re.DOTALL (re.S) : . matche aussi \\n
re.findall(r'<p>.*?</p>', "<p>texte\\nsur deux lignes</p>", re.DOTALL)
# ['<p>texte\\nsur deux lignes</p>']

# Combiner les flags
re.findall(r'pattern', texte, re.IGNORECASE | re.MULTILINE)
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Extraire des données
\`\`\`python
import re

texte = "Produits : Clavier(49.99€), Souris(29.99€), Écran(299.99€)"
pattern = r'(\\w+)\\((\\d+\\.\\d+)€\\)'
produits = re.findall(pattern, texte)
for nom, prix in produits:
    print(f"  {nom} : {prix}€")
\`\`\`

### Exercice 2 : Valider un format
\`\`\`python
def valider_code_postal(cp):
    return bool(re.match(r'^\\d{5}$', cp))

def valider_plaque(plaque):
    return bool(re.match(r'^[A-Z]{2}-\\d{3}-[A-Z]{2}$', plaque))

print(valider_code_postal("75001"))   # True
print(valider_plaque("AB-123-CD"))    # True
print(valider_plaque("ab-123-cd"))    # False
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/22-regex-exercice.py\`
`,

    '23-zip-files': `
# Module 23 : Fichiers ZIP

Python fournit le module \`zipfile\` dans sa bibliothèque standard pour créer, lire et manipuler des archives ZIP. Combiné avec les modules \`os\` et \`shutil\`, il permet d'automatiser la compression et l'archivage de fichiers — une tâche courante en administration système, sauvegarde de données et traitement par lots.

---

## 🧠 Pourquoi les Fichiers ZIP ?

| Cas d'usage | Description |
|-------------|-------------|
| **Sauvegarde** | Archiver des dossiers de projets |
| **Distribution** | Emballer des fichiers pour les partager |
| **Transfert** | Réduire la taille des données à envoyer |
| **Automatisation** | Scripts de backup ou de déploiement |
| **Data Science** | Extraire des données de datasets compressés |

---

## 📦 Lire un Fichier ZIP

\`\`\`python
import zipfile

# Ouvrir un ZIP en lecture
with zipfile.ZipFile("archive.zip", "r") as zf:
    # Lister les fichiers contenus
    print(zf.namelist())
    # ['dossier/', 'dossier/fichier1.txt', 'dossier/fichier2.py']

    # Informations sur chaque fichier
    for info in zf.infolist():
        print(f"  {info.filename}")
        print(f"    Taille : {info.file_size} octets")
        print(f"    Compressé : {info.compress_size} octets")
        print(f"    Date : {info.date_time}")

    # Lire le contenu d'un fichier SANS extraire
    contenu = zf.read("dossier/fichier1.txt")
    print(contenu.decode("utf-8"))
\`\`\`

---

## ✏️ Créer un Fichier ZIP

\`\`\`python
import zipfile

# Créer un nouveau ZIP
with zipfile.ZipFile("mon_archive.zip", "w", zipfile.ZIP_DEFLATED) as zf:
    # Ajouter des fichiers individuels
    zf.write("rapport.pdf")
    zf.write("data.csv")

    # Ajouter avec un nom différent dans l'archive
    zf.write("config_local.json", arcname="config.json")

    # Écrire du contenu directement (sans fichier source)
    zf.writestr("notes.txt", "Ceci est un texte créé à la volée")
\`\`\`

### Modes d'ouverture

| Mode | Description |
|------|-------------|
| \`"r"\` | Lecture (défaut) |
| \`"w"\` | Écriture (écrase si existe) |
| \`"a"\` | Ajout (append à un ZIP existant) |

### Types de compression

| Constante | Description |
|-----------|-------------|
| \`zipfile.ZIP_STORED\` | Pas de compression (stockage uniquement) |
| \`zipfile.ZIP_DEFLATED\` | Compression standard (le plus courant) |
| \`zipfile.ZIP_BZIP2\` | Meilleure compression, plus lent |
| \`zipfile.ZIP_LZMA\` | Compression maximale, le plus lent |

---

## 📂 Extraire un ZIP

\`\`\`python
import zipfile

with zipfile.ZipFile("archive.zip", "r") as zf:
    # Extraire TOUT dans un dossier
    zf.extractall("dossier_destination/")

    # Extraire UN SEUL fichier
    zf.extract("rapport.pdf", "dossier_destination/")
\`\`\`

> ⚠️ **Sécurité** : Méfiez-vous des archives contenant des chemins absolus ou \`../\` (ZipSlip attack). Utilisez toujours un dossier de destination et vérifiez les noms de fichiers.

\`\`\`python
import zipfile
import os

def extraire_securise(chemin_zip, destination):
    """Extrait un ZIP en vérifiant les chemins dangereux."""
    with zipfile.ZipFile(chemin_zip, "r") as zf:
        for nom in zf.namelist():
            chemin_final = os.path.realpath(
                os.path.join(destination, nom)
            )
            # Vérifier que le chemin reste dans le dossier destination
            if not chemin_final.startswith(os.path.realpath(destination)):
                raise ValueError(f"Chemin suspect : {nom}")
        zf.extractall(destination)
    print(f"✅ Extrait dans {destination}")
\`\`\`

---

## 🗂️ Archiver un Dossier Complet

\`\`\`python
import zipfile
import os

def zipper_dossier(dossier_source, fichier_zip):
    """Compresse un dossier entier en ZIP."""
    with zipfile.ZipFile(fichier_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for racine, dossiers, fichiers in os.walk(dossier_source):
            for fichier in fichiers:
                chemin_complet = os.path.join(racine, fichier)
                # arcname = chemin relatif dans le ZIP
                arcname = os.path.relpath(chemin_complet, dossier_source)
                zf.write(chemin_complet, arcname)
                print(f"  ✅ {arcname}")

    taille = os.path.getsize(fichier_zip)
    print(f"\\n📦 Archive créée : {fichier_zip} ({taille:,} octets)")

# Usage
# zipper_dossier("mon_projet/", "mon_projet_backup.zip")
\`\`\`

### Alternative rapide avec shutil

\`\`\`python
import shutil

# Créer une archive en UNE ligne
shutil.make_archive("backup", "zip", "mon_dossier/")
# Crée backup.zip contenant tout mon_dossier/

# Extraire une archive
shutil.unpack_archive("backup.zip", "dossier_destination/")
\`\`\`

> 💡 \`shutil.make_archive()\` est plus simple pour les cas basiques. Utilisez \`zipfile\` quand vous avez besoin de plus de contrôle (filtrage de fichiers, mots de passe, etc.).

---

## 🔍 Cas d'Usage Pratiques

### Script de sauvegarde automatique

\`\`\`python
import zipfile
import os
from datetime import datetime

def backup(dossiers, destination="backups"):
    """Crée une sauvegarde datée de plusieurs dossiers."""
    os.makedirs(destination, exist_ok=True)
    date = datetime.now().strftime("%Y%m%d_%H%M%S")
    nom_zip = os.path.join(destination, f"backup_{date}.zip")

    nb_fichiers = 0
    with zipfile.ZipFile(nom_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for dossier in dossiers:
            for racine, _, fichiers in os.walk(dossier):
                for fichier in fichiers:
                    chemin = os.path.join(racine, fichier)
                    zf.write(chemin)
                    nb_fichiers += 1

    taille_mo = os.path.getsize(nom_zip) / (1024 * 1024)
    print(f"💾 Backup : {nb_fichiers} fichiers → {nom_zip} ({taille_mo:.1f} Mo)")
    return nom_zip

# Usage
# backup(["src/", "data/", "config/"])
\`\`\`

### Lire un CSV compressé

\`\`\`python
import zipfile
import csv
import io

def lire_csv_depuis_zip(chemin_zip, nom_csv):
    """Lit un fichier CSV directement depuis un ZIP."""
    with zipfile.ZipFile(chemin_zip, "r") as zf:
        with zf.open(nom_csv) as f:
            lecteur = csv.DictReader(io.TextIOWrapper(f, encoding="utf-8"))
            return list(lecteur)

# Usage
# donnees = lire_csv_depuis_zip("dataset.zip", "data.csv")
# print(f"{len(donnees)} lignes chargées")
\`\`\`

### Filtrer les fichiers à archiver

\`\`\`python
import zipfile
import os

def zipper_par_extension(dossier, fichier_zip, extensions):
    """Archive uniquement les fichiers avec certaines extensions."""
    extensions = set(ext.lower() for ext in extensions)

    with zipfile.ZipFile(fichier_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for racine, _, fichiers in os.walk(dossier):
            for fichier in fichiers:
                _, ext = os.path.splitext(fichier)
                if ext.lower() in extensions:
                    chemin = os.path.join(racine, fichier)
                    arcname = os.path.relpath(chemin, dossier)
                    zf.write(chemin, arcname)

# Archiver uniquement les fichiers Python et JSON
# zipper_par_extension("mon_projet/", "code.zip", [".py", ".json"])
\`\`\`

---

## 📋 Résumé des Fonctions

| Fonction | Description |
|----------|-------------|
| \`ZipFile(path, mode)\` | Ouvrir/créer un ZIP |
| \`zf.namelist()\` | Liste des fichiers contenus |
| \`zf.infolist()\` | Infos détaillées sur chaque fichier |
| \`zf.read(name)\` | Lire le contenu d'un fichier (bytes) |
| \`zf.write(path, arcname)\` | Ajouter un fichier |
| \`zf.writestr(name, data)\` | Écrire des données directement |
| \`zf.extract(name, path)\` | Extraire un fichier |
| \`zf.extractall(path)\` | Extraire tout |
| \`shutil.make_archive()\` | Archiver un dossier (simple) |
| \`shutil.unpack_archive()\` | Extraire une archive (simple) |

---

## Exercices 🎯

### Exercice 1 : Créer et lire un ZIP
\`\`\`python
import zipfile

# Créer un ZIP avec du contenu texte
with zipfile.ZipFile("test.zip", "w") as zf:
    zf.writestr("hello.txt", "Bonjour le monde !")
    zf.writestr("data/info.txt", "Fichier dans un sous-dossier")

# Lire et afficher le contenu
with zipfile.ZipFile("test.zip", "r") as zf:
    for nom in zf.namelist():
        contenu = zf.read(nom).decode("utf-8")
        print(f"{nom} : {contenu}")
\`\`\`

### Exercice 2 : Archiver un dossier
\`\`\`python
import shutil

# Méthode simple
shutil.make_archive("archive_projet", "zip", "mon_projet/")
print("Archive créée !")
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/23-zip-files-exercice.py\`
`,
    '24-web-scraping': `
# Module 24 : Web Scraping

Le **web scraping** consiste à extraire automatiquement des données depuis des pages web. Python, grâce à ses bibliothèques \`requests\` et \`BeautifulSoup\`, est le langage de référence pour cette tâche.

---

## 🧠 Comprendre le Web

### Le protocole HTTP

Quand vous visitez un site, votre navigateur envoie une **requête HTTP** au serveur, qui renvoie une **réponse**.

| Élément | Description |
|---------|------------|
| **URL** | Adresse de la ressource |
| **Méthode** | GET (lire), POST (envoyer), PUT, DELETE |
| **Headers** | Métadonnées (User-Agent, Content-Type, etc.) |
| **Body** | Données envoyées (POST uniquement) |
| **Status Code** | 200 (OK), 404 (Not Found), 403 (Forbidden), 500 (Server Error) |

### Codes de statut courants

\`\`\`python
# Familles de codes HTTP
# 2xx → Succès
# 200 OK — Requête réussie
# 201 Created — Ressource créée

# 3xx → Redirection
# 301 Moved Permanently
# 302 Found (redirection temporaire)

# 4xx → Erreur client
# 400 Bad Request
# 403 Forbidden
# 404 Not Found

# 5xx → Erreur serveur
# 500 Internal Server Error
# 503 Service Unavailable
\`\`\`

### Structure HTML

\`\`\`html
<html>
  <head><title>Ma Page</title></head>
  <body>
    <h1 class="titre">Bienvenue</h1>
    <div id="contenu">
      <p>Paragraphe 1</p>
      <a href="https://example.com">Un lien</a>
      <ul>
        <li>Élément 1</li>
        <li>Élément 2</li>
      </ul>
    </div>
  </body>
</html>
\`\`\`

Les éléments importants :
- **Tags** : \`<h1>\`, \`<p>\`, \`<a>\`, \`<div>\`, \`<ul>\`, \`<li>\`
- **Attributs** : \`class\`, \`id\`, \`href\`, \`src\`
- **Hiérarchie** : parent → enfant → petit-enfant

---

## 📦 Installation et Imports

\`\`\`python
# Installation
# pip install requests beautifulsoup4

# Imports
import requests
from bs4 import BeautifulSoup
\`\`\`

---

## 📋 Requêtes HTTP avec requests

### Requête GET simple

\`\`\`python
import requests

# Récupérer une page
response = requests.get("https://example.com")

# Vérifier le statut
print(response.status_code)   # 200
print(response.ok)            # True (si 2xx)

# Contenu
print(response.text)          # HTML brut (string)
print(response.content)       # Bytes bruts
print(response.encoding)      # 'utf-8'
\`\`\`

### Headers et paramètres

\`\`\`python
# Headers personnalisés (simuler un navigateur)
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}
response = requests.get("https://example.com", headers=headers)

# Paramètres d'URL (?q=python&page=1)
params = {"q": "python", "page": 1}
response = requests.get("https://api.example.com/search", params=params)
print(response.url)  # https://api.example.com/search?q=python&page=1
\`\`\`

### Requêtes POST

\`\`\`python
# Envoyer des données
data = {"username": "admin", "password": "secret"}
response = requests.post("https://example.com/login", data=data)

# Envoyer du JSON
import json
payload = {"name": "Alice", "age": 30}
response = requests.post("https://api.example.com/users",
                         json=payload)

# Réponse JSON
resultat = response.json()  # Parse automatiquement
\`\`\`

### Timeout et gestion d'erreurs

\`\`\`python
import requests

try:
    response = requests.get("https://example.com", timeout=5)
    response.raise_for_status()  # Lève une exception si erreur HTTP
    print("Succès !")
except requests.exceptions.Timeout:
    print("Timeout : le serveur ne répond pas")
except requests.exceptions.HTTPError as e:
    print(f"Erreur HTTP : {e}")
except requests.exceptions.ConnectionError:
    print("Impossible de se connecter")
except requests.exceptions.RequestException as e:
    print(f"Erreur : {e}")
\`\`\`

---

## 🔍 Parser le HTML avec BeautifulSoup

### Créer un objet soup

\`\`\`python
from bs4 import BeautifulSoup

html = """
<html>
<body>
  <h1 class="titre">Produits</h1>
  <div id="liste">
    <div class="produit">
      <span class="nom">Laptop</span>
      <span class="prix">999€</span>
    </div>
    <div class="produit">
      <span class="nom">Souris</span>
      <span class="prix">29€</span>
    </div>
  </div>
</body>
</html>
"""

soup = BeautifulSoup(html, "html.parser")
\`\`\`

### Naviguer dans l'arbre

\`\`\`python
# Trouver UN élément (le premier)
titre = soup.find("h1")
print(titre.text)              # "Produits"
print(titre.get("class"))     # ["titre"]
print(titre["class"])         # ["titre"]

# Trouver TOUS les éléments
produits = soup.find_all("div", class_="produit")
print(len(produits))           # 2

# Par ID
liste = soup.find(id="liste")
print(liste)
\`\`\`

### Sélecteurs CSS

\`\`\`python
# select() utilise les sélecteurs CSS (retourne une liste)
noms = soup.select(".produit .nom")
for nom in noms:
    print(nom.text)
# "Laptop"
# "Souris"

# select_one() retourne le premier résultat
premier_prix = soup.select_one(".produit .prix")
print(premier_prix.text)  # "999€"

# Sélecteurs courants
soup.select("div")            # Par tag
soup.select(".classe")        # Par classe
soup.select("#id")            # Par ID
soup.select("div.produit")    # Tag + classe
soup.select("div > span")     # Enfant direct
soup.select("a[href]")        # Attribut présent
\`\`\`

### Extraire des données

\`\`\`python
# Texte
element = soup.find("h1")
print(element.text)           # Texte sans tags
print(element.get_text())     # Identique
print(element.string)         # Texte direct (None si enfants)

# Attributs
lien = soup.find("a")
if lien:
    print(lien.get("href"))       # URL du lien
    print(lien.get("class", []))  # Classe (avec défaut)
    print(lien.attrs)             # Tous les attributs (dict)

# Naviguer dans la hiérarchie
div = soup.find("div", class_="produit")
enfants = div.find_all("span")
for e in enfants:
    print(e.text)
\`\`\`

---

## 🏗️ Exemples Pratiques

### Extraire tous les liens d'une page

\`\`\`python
html = """
<nav>
  <a href="https://example.com/accueil">Accueil</a>
  <a href="https://example.com/produits">Produits</a>
  <a href="https://example.com/contact">Contact</a>
  <a href="/page-interne">Page Interne</a>
</nav>
"""

soup = BeautifulSoup(html, "html.parser")

liens = []
for a in soup.find_all("a", href=True):
    liens.append({
        "texte": a.text.strip(),
        "url": a["href"]
    })

for lien in liens:
    print(f"{lien['texte']} → {lien['url']}")
# Accueil → https://example.com/accueil
# Produits → https://example.com/produits
# Contact → https://example.com/contact
# Page Interne → /page-interne
\`\`\`

### Parser un tableau HTML

\`\`\`python
html_tableau = """
<table>
  <thead>
    <tr><th>Nom</th><th>Prix</th><th>Stock</th></tr>
  </thead>
  <tbody>
    <tr><td>Laptop</td><td>999</td><td>15</td></tr>
    <tr><td>Souris</td><td>29</td><td>150</td></tr>
    <tr><td>Clavier</td><td>79</td><td>85</td></tr>
  </tbody>
</table>
"""

soup = BeautifulSoup(html_tableau, "html.parser")

# En-têtes
headers = [th.text for th in soup.find_all("th")]
print(headers)  # ['Nom', 'Prix', 'Stock']

# Données
donnees = []
for ligne in soup.find("tbody").find_all("tr"):
    cellules = [td.text for td in ligne.find_all("td")]
    donnees.append(dict(zip(headers, cellules)))

for produit in donnees:
    print(produit)
# {'Nom': 'Laptop', 'Prix': '999', 'Stock': '15'}
# {'Nom': 'Souris', 'Prix': '29', 'Stock': '150'}
# {'Nom': 'Clavier', 'Prix': '79', 'Stock': '85'}
\`\`\`

### Scraper une liste de produits

\`\`\`python
html_produits = """
<div class="catalogue">
  <div class="produit" data-id="1">
    <h3 class="nom">Ordinateur Portable</h3>
    <p class="description">Laptop performant 16Go RAM</p>
    <span class="prix">1299.99€</span>
    <span class="note">4.5/5</span>
  </div>
  <div class="produit" data-id="2">
    <h3 class="nom">Écran 27 pouces</h3>
    <p class="description">Écran 4K HDR</p>
    <span class="prix">449.00€</span>
    <span class="note">4.8/5</span>
  </div>
  <div class="produit" data-id="3">
    <h3 class="nom">Clavier Mécanique</h3>
    <p class="description">Switches Cherry MX Blue</p>
    <span class="prix">129.50€</span>
    <span class="note">4.2/5</span>
  </div>
</div>
"""

soup = BeautifulSoup(html_produits, "html.parser")

produits = []
for div in soup.find_all("div", class_="produit"):
    produit = {
        "id": div.get("data-id"),
        "nom": div.find("h3", class_="nom").text,
        "description": div.find("p", class_="description").text,
        "prix": float(div.find("span", class_="prix").text.replace("€", "")),
        "note": float(div.find("span", class_="note").text.replace("/5", ""))
    }
    produits.append(produit)

# Trier par prix
produits_tries = sorted(produits, key=lambda p: p["prix"])
for p in produits_tries:
    print(f"{p['nom']} : {p['prix']}€ (note: {p['note']}/5)")
# Clavier Mécanique : 129.5€ (note: 4.2/5)
# Écran 27 pouces : 449.0€ (note: 4.8/5)
# Ordinateur Portable : 1299.99€ (note: 4.5/5)
\`\`\`

---

## ⚠️ Bonnes Pratiques et Éthique

### robots.txt

\`\`\`python
# Toujours vérifier robots.txt avant de scraper
# https://example.com/robots.txt

# Exemple de robots.txt :
# User-agent: *
# Disallow: /admin/
# Disallow: /private/
# Allow: /public/
# Crawl-delay: 10

# Respecter les directives !
\`\`\`

### Rate limiting

\`\`\`python
import time

urls = ["https://example.com/page1", "https://example.com/page2"]

for url in urls:
    # response = requests.get(url)
    # traiter(response)
    time.sleep(1)  # Attendre 1 seconde entre chaque requête
    print(f"Traitement de {url}")
\`\`\`

### Règles d'or du scraping

| Règle | Description |
|-------|------------|
| **robots.txt** | Toujours vérifier et respecter |
| **Rate limiting** | Ne pas surcharger le serveur (1-2 req/sec max) |
| **User-Agent** | S'identifier honnêtement |
| **Conditions d'utilisation** | Lire les CGU du site |
| **Données personnelles** | Ne jamais scraper de données privées |
| **API disponible ?** | Préférer l'API officielle si elle existe |
| **Cache** | Sauvegarder les pages pour éviter les requêtes répétées |

---

## 📋 Résumé

| Concept | Code | Description |
|---------|------|------------|
| **Requête GET** | \`requests.get(url)\` | Récupérer une page |
| **Requête POST** | \`requests.post(url, data=...)\` | Envoyer des données |
| **Status** | \`response.status_code\` | Code HTTP |
| **Parser HTML** | \`BeautifulSoup(html, "html.parser")\` | Créer le soup |
| **Trouver un** | \`soup.find("tag", class_="...")\` | Premier élément |
| **Trouver tous** | \`soup.find_all("tag")\` | Liste d'éléments |
| **Sélecteur CSS** | \`soup.select(".classe > tag")\` | Sélection CSS |
| **Texte** | \`element.text\` / \`.get_text()\` | Extraire le texte |
| **Attribut** | \`element.get("href")\` | Extraire un attribut |
| **Timeout** | \`requests.get(url, timeout=5)\` | Limiter l'attente |

---

## Exercices 🎯

### Exercice 1 : Parser une page HTML
\`\`\`python
# Extraire les titres et liens d'un HTML donné
html = """
<div class="articles">
  <article>
    <h2><a href="/article/1">Introduction à Python</a></h2>
    <span class="date">2024-01-15</span>
  </article>
  <article>
    <h2><a href="/article/2">Web Scraping Avancé</a></h2>
    <span class="date">2024-02-20</span>
  </article>
</div>
"""
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, "html.parser")

articles = []
for article in soup.find_all("article"):
    lien = article.find("a")
    date = article.find("span", class_="date")
    articles.append({
        "titre": lien.text,
        "url": lien["href"],
        "date": date.text
    })
print(articles)
\`\`\`

### Exercice 2 : Extraire un tableau
\`\`\`python
# Transformer un tableau HTML en liste de dictionnaires
html = """
<table>
  <tr><th>Ville</th><th>Population</th><th>Pays</th></tr>
  <tr><td>Paris</td><td>2161000</td><td>France</td></tr>
  <tr><td>Londres</td><td>8982000</td><td>Royaume-Uni</td></tr>
  <tr><td>Berlin</td><td>3645000</td><td>Allemagne</td></tr>
</table>
"""
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, "html.parser")

lignes = soup.find_all("tr")
headers = [th.text for th in lignes[0].find_all("th")]
donnees = []
for ligne in lignes[1:]:
    valeurs = [td.text for td in ligne.find_all("td")]
    donnees.append(dict(zip(headers, valeurs)))
print(donnees)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/24-web-scraping-exercice.py\`
`,
    '25-images': `
# Module 25 : Manipulation d'Images

Python avec la bibliothèque **Pillow** (PIL) permet de manipuler des images : redimensionner, appliquer des filtres, dessiner, créer des compositions. Essentiel pour l'automatisation de tâches graphiques.

---

## 🧠 Concepts d'Images Numériques

### Pixels et couleurs

\`\`\`python
# Une image numérique = grille de pixels
# Chaque pixel = une couleur

# Mode RGB (Rouge, Vert, Bleu)
rouge = (255, 0, 0)
vert = (0, 255, 0)
bleu = (0, 0, 255)
blanc = (255, 255, 255)
noir = (0, 0, 0)

# Mode RGBA (avec transparence Alpha)
semi_transparent = (255, 0, 0, 128)  # Rouge semi-transparent

# Mode L (niveaux de gris)
gris_clair = 200    # 0=noir, 255=blanc
\`\`\`

### Formats d'images

| Format | Extension | Caractéristiques |
|--------|-----------|-----------------|
| **JPEG** | .jpg, .jpeg | Compressé avec perte, photos |
| **PNG** | .png | Sans perte, transparence |
| **GIF** | .gif | Animation, 256 couleurs max |
| **BMP** | .bmp | Non compressé, volumineux |
| **TIFF** | .tiff | Haute qualité, impression |
| **WebP** | .webp | Moderne, bonne compression |

---

## 📦 Installation et Premiers Pas

\`\`\`python
# Installation
# pip install Pillow

from PIL import Image

# Ouvrir une image
img = Image.open("photo.jpg")

# Informations de base
print(img.size)     # (largeur, hauteur) ex: (1920, 1080)
print(img.mode)     # 'RGB', 'RGBA', 'L', etc.
print(img.format)   # 'JPEG', 'PNG', etc.

# Afficher (ouvre le visualiseur par défaut)
img.show()

# Sauvegarder
img.save("copie.jpg")
img.save("copie.png")        # Conversion de format
img.save("copie.jpg", quality=85)  # Qualité JPEG (1-100)
\`\`\`

---

## 📐 Redimensionner et Transformer

### Redimensionner

\`\`\`python
from PIL import Image

img = Image.open("photo.jpg")

# Redimensionner (taille exacte)
img_redim = img.resize((800, 600))
img_redim.save("photo_800x600.jpg")

# Thumbnail (garde les proportions, tient dans la boîte)
img_thumb = img.copy()
img_thumb.thumbnail((200, 200))
img_thumb.save("thumbnail.jpg")
print(img_thumb.size)  # Ex: (200, 112) - proportions gardées
\`\`\`

### Rotation et retournement

\`\`\`python
# Rotation
img_90 = img.rotate(90)                    # 90° anti-horaire
img_45 = img.rotate(45, expand=True)       # 45° avec expansion
img_rot = img.rotate(30, fillcolor="white") # Fond blanc

# Retournement (miroir)
from PIL import ImageOps
img_miroir_h = ImageOps.mirror(img)   # Miroir horizontal
img_miroir_v = ImageOps.flip(img)     # Miroir vertical

# Transposition
img_t = img.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
img_t = img.transpose(Image.Transpose.ROTATE_90)
\`\`\`

### Recadrage (crop)

\`\`\`python
# Crop : (gauche, haut, droite, bas)
# Coordonnées en pixels depuis le coin supérieur gauche

img = Image.open("photo.jpg")
largeur, hauteur = img.size

# Recadrer le quart supérieur gauche
quart = img.crop((0, 0, largeur // 2, hauteur // 2))
quart.save("quart.jpg")

# Recadrer le centre
marge_x = largeur // 4
marge_y = hauteur // 4
centre = img.crop((marge_x, marge_y,
                   largeur - marge_x, hauteur - marge_y))
centre.save("centre.jpg")
\`\`\`

---

## 🎨 Filtres et Améliorations

### Filtres prédéfinis

\`\`\`python
from PIL import Image, ImageFilter

img = Image.open("photo.jpg")

# Flou
img_flou = img.filter(ImageFilter.BLUR)
img_flou_gauss = img.filter(ImageFilter.GaussianBlur(radius=5))

# Netteté
img_nette = img.filter(ImageFilter.SHARPEN)

# Contours
img_contours = img.filter(ImageFilter.FIND_EDGES)
img_contours2 = img.filter(ImageFilter.CONTOUR)

# Relief
img_relief = img.filter(ImageFilter.EMBOSS)

# Détail
img_detail = img.filter(ImageFilter.DETAIL)
\`\`\`

### Améliorations (ImageEnhance)

\`\`\`python
from PIL import ImageEnhance

img = Image.open("photo.jpg")

# Luminosité (1.0 = original, > 1 = plus clair)
enhancer = ImageEnhance.Brightness(img)
img_claire = enhancer.enhance(1.5)   # 50% plus clair
img_sombre = enhancer.enhance(0.5)   # 50% plus sombre

# Contraste
enhancer = ImageEnhance.Contrast(img)
img_contraste = enhancer.enhance(2.0)  # Double le contraste

# Saturation
enhancer = ImageEnhance.Color(img)
img_saturee = enhancer.enhance(1.5)    # Plus colorée
img_grise = enhancer.enhance(0.0)       # Noir et blanc

# Netteté
enhancer = ImageEnhance.Sharpness(img)
img_nette = enhancer.enhance(2.0)
\`\`\`

---

## ✏️ Dessiner sur les Images

\`\`\`python
from PIL import Image, ImageDraw, ImageFont

# Créer une image vide
img = Image.new("RGB", (400, 300), "white")
draw = ImageDraw.Draw(img)

# Rectangle
draw.rectangle([50, 50, 200, 150], fill="blue", outline="black", width=2)

# Ellipse (cercle si carré inscrit)
draw.ellipse([250, 50, 370, 170], fill="red", outline="black", width=2)

# Ligne
draw.line([(50, 200), (370, 200)], fill="green", width=3)

# Polygone
draw.polygon([(200, 180), (150, 280), (250, 280)], fill="yellow", outline="black")

# Texte
draw.text((100, 10), "Hello Pillow!", fill="black")

# Texte avec police personnalisée
try:
    font = ImageFont.truetype("arial.ttf", size=24)
    draw.text((100, 260), "Texte stylé", fill="purple", font=font)
except IOError:
    draw.text((100, 260), "Texte par défaut", fill="purple")

img.save("dessin.png")
\`\`\`

---

## 🏗️ Cas Pratiques

### Créer des thumbnails en batch

\`\`\`python
from PIL import Image
import os

def creer_thumbnails(dossier_source, dossier_dest, taille=(200, 200)):
    """Crée des thumbnails pour toutes les images d'un dossier."""
    os.makedirs(dossier_dest, exist_ok=True)

    extensions = {".jpg", ".jpeg", ".png", ".bmp", ".gif"}

    for fichier in os.listdir(dossier_source):
        ext = os.path.splitext(fichier)[1].lower()
        if ext in extensions:
            chemin = os.path.join(dossier_source, fichier)
            img = Image.open(chemin)
            img.thumbnail(taille)

            nom_thumb = f"thumb_{fichier}"
            chemin_dest = os.path.join(dossier_dest, nom_thumb)
            img.save(chemin_dest)
            print(f"Thumbnail créé : {nom_thumb}")

# creer_thumbnails("photos/", "thumbnails/")
\`\`\`

### Créer un collage

\`\`\`python
from PIL import Image

def creer_collage(images_paths, colonnes=3, taille_case=(200, 200)):
    """Crée un collage à partir d'une liste d'images."""
    nb_images = len(images_paths)
    lignes = (nb_images + colonnes - 1) // colonnes

    largeur_totale = colonnes * taille_case[0]
    hauteur_totale = lignes * taille_case[1]

    collage = Image.new("RGB", (largeur_totale, hauteur_totale), "white")

    for i, chemin in enumerate(images_paths):
        img = Image.open(chemin)
        img.thumbnail(taille_case)

        x = (i % colonnes) * taille_case[0]
        y = (i // colonnes) * taille_case[1]
        collage.paste(img, (x, y))

    return collage

# collage = creer_collage(["img1.jpg", "img2.jpg", "img3.jpg"])
# collage.save("collage.jpg")
\`\`\`

### Ajouter un watermark

\`\`\`python
from PIL import Image, ImageDraw, ImageFont

def ajouter_watermark(chemin_image, texte, opacite=128):
    """Ajoute un watermark semi-transparent sur une image."""
    img = Image.open(chemin_image).convert("RGBA")
    largeur, hauteur = img.size

    # Créer un calque transparent
    watermark = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(watermark)

    # Police
    try:
        font = ImageFont.truetype("arial.ttf", size=36)
    except IOError:
        font = ImageFont.load_default()

    # Position (centre)
    bbox = draw.textbbox((0, 0), texte, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (largeur - text_w) // 2
    y = (hauteur - text_h) // 2

    # Dessiner le texte semi-transparent
    draw.text((x, y), texte, fill=(255, 255, 255, opacite), font=font)

    # Fusionner
    resultat = Image.alpha_composite(img, watermark)
    return resultat.convert("RGB")

# img = ajouter_watermark("photo.jpg", "© MonSite")
# img.save("photo_watermark.jpg")
\`\`\`

---

## 📋 Résumé

| Action | Code | Description |
|--------|------|------------|
| **Ouvrir** | \`Image.open("file.jpg")\` | Charger une image |
| **Sauvegarder** | \`img.save("file.png")\` | Enregistrer (conversion auto) |
| **Taille** | \`img.size\` | Tuple (largeur, hauteur) |
| **Redimensionner** | \`img.resize((w, h))\` | Taille exacte |
| **Thumbnail** | \`img.thumbnail((w, h))\` | Garde les proportions |
| **Rotation** | \`img.rotate(angle)\` | Rotation anti-horaire |
| **Recadrage** | \`img.crop((l, h, r, b))\` | Découper une zone |
| **Filtre** | \`img.filter(ImageFilter.BLUR)\` | Appliquer un filtre |
| **Luminosité** | \`ImageEnhance.Brightness(img)\` | Ajuster la luminosité |
| **Dessiner** | \`ImageDraw.Draw(img)\` | Dessiner sur l'image |
| **Nouvelle image** | \`Image.new("RGB", (w, h))\` | Créer une image vide |

---

## Exercices 🎯

### Exercice 1 : Transformations de base
\`\`\`python
from PIL import Image

# Ouvrir une image, la redimensionner, appliquer une rotation, sauvegarder
img = Image.open("paysage.jpg")
print(f"Taille originale : {img.size}")

# Redimensionner à 50%
nouvelle_taille = (img.size[0] // 2, img.size[1] // 2)
img_redim = img.resize(nouvelle_taille)

# Rotation de 90°
img_rot = img_redim.rotate(90, expand=True)

img_rot.save("paysage_transforme.jpg")
print(f"Taille finale : {img_rot.size}")
\`\`\`

### Exercice 2 : Créer une image avec dessin
\`\`\`python
from PIL import Image, ImageDraw

# Créer un drapeau français
largeur, hauteur = 300, 200
drapeau = Image.new("RGB", (largeur, hauteur))
draw = ImageDraw.Draw(drapeau)

# Trois bandes verticales
tiers = largeur // 3
draw.rectangle([0, 0, tiers, hauteur], fill="blue")
draw.rectangle([tiers, 0, 2 * tiers, hauteur], fill="white")
draw.rectangle([2 * tiers, 0, largeur, hauteur], fill="red")

drapeau.save("drapeau_france.png")
print("Drapeau créé !")
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/25-images-exercice.py\`
`,
    '26-pdf-excel': `
# Module 26 : PDFs et Spreadsheets

Python excelle dans l'**automatisation documentaire** : lire et écrire des fichiers Excel, manipuler des PDFs, générer des rapports. Ces compétences sont essentielles pour tout data analyst ou développeur.

---

## 📊 Excel avec openpyxl

### Installation et imports

\`\`\`python
# pip install openpyxl

from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.chart import BarChart, Reference
\`\`\`

### Créer un fichier Excel

\`\`\`python
from openpyxl import Workbook

# Créer un classeur
wb = Workbook()
ws = wb.active              # Feuille active par défaut
ws.title = "Ventes"         # Renommer la feuille

# Écrire des données
ws["A1"] = "Produit"
ws["B1"] = "Quantité"
ws["C1"] = "Prix unitaire"
ws["D1"] = "Total"

# Données ligne par ligne
donnees = [
    ("Laptop", 5, 999.99),
    ("Souris", 50, 29.99),
    ("Clavier", 30, 79.99),
    ("Écran", 10, 449.00),
]

for i, (produit, qte, prix) in enumerate(donnees, start=2):
    ws[f"A{i}"] = produit
    ws[f"B{i}"] = qte
    ws[f"C{i}"] = prix
    ws[f"D{i}"] = f"=B{i}*C{i}"    # Formule Excel !

# Sauvegarder
wb.save("ventes.xlsx")
print("Fichier créé !")
\`\`\`

### Lire un fichier Excel

\`\`\`python
from openpyxl import load_workbook

wb = load_workbook("ventes.xlsx")

# Lister les feuilles
print(wb.sheetnames)  # ['Ventes']

ws = wb["Ventes"]

# Lire une cellule
print(ws["A1"].value)  # "Produit"

# Dimensions
print(ws.max_row)       # 5
print(ws.max_column)    # 4

# Parcourir les lignes
for row in ws.iter_rows(min_row=2, values_only=True):
    print(row)  # ('Laptop', 5, 999.99, '=B2*C2')

# Parcourir une colonne
for cell in ws["A"]:
    print(cell.value)
\`\`\`

### Styles et mise en forme

\`\`\`python
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side

# Police
ws["A1"].font = Font(name="Arial", size=14, bold=True, color="FFFFFF")

# Remplissage (fond)
ws["A1"].fill = PatternFill(start_color="4472C4", fill_type="solid")

# Alignement
ws["A1"].alignment = Alignment(horizontal="center", vertical="center")

# Bordures
bordure = Border(
    left=Side(style="thin"),
    right=Side(style="thin"),
    top=Side(style="thin"),
    bottom=Side(style="thin")
)
ws["A1"].border = bordure

# Appliquer aux en-têtes
for col in range(1, 5):
    cell = ws.cell(row=1, column=col)
    cell.font = Font(bold=True, color="FFFFFF")
    cell.fill = PatternFill(start_color="4472C4", fill_type="solid")
    cell.alignment = Alignment(horizontal="center")

# Largeur des colonnes
ws.column_dimensions["A"].width = 20
ws.column_dimensions["B"].width = 15

wb.save("ventes_stylees.xlsx")
\`\`\`

### Manipuler les feuilles

\`\`\`python
wb = Workbook()

# Créer des feuilles
ws1 = wb.active
ws1.title = "Janvier"
ws2 = wb.create_sheet("Février")
ws3 = wb.create_sheet("Mars", 0)     # Position 0 (début)

# Copier une feuille
ws4 = wb.copy_worksheet(ws1)
ws4.title = "Copie_Janvier"

# Supprimer une feuille
del wb["Copie_Janvier"]

# Parcourir les feuilles
for nom in wb.sheetnames:
    print(nom)

wb.save("multi_feuilles.xlsx")
\`\`\`

---

## 📄 PDFs avec PyPDF2

### Installation et imports

\`\`\`python
# pip install PyPDF2

from PyPDF2 import PdfReader, PdfWriter, PdfMerger
\`\`\`

### Lire un PDF

\`\`\`python
from PyPDF2 import PdfReader

reader = PdfReader("document.pdf")

# Nombre de pages
print(len(reader.pages))  # Ex: 10

# Lire une page
page = reader.pages[0]     # Première page
texte = page.extract_text()
print(texte)

# Lire toutes les pages
texte_complet = ""
for page in reader.pages:
    texte_complet += page.extract_text() + "\\n"

# Métadonnées
meta = reader.metadata
if meta:
    print(f"Titre : {meta.title}")
    print(f"Auteur : {meta.author}")
    print(f"Créateur : {meta.creator}")
\`\`\`

### Fusionner des PDFs

\`\`\`python
from PyPDF2 import PdfMerger

merger = PdfMerger()

# Ajouter des fichiers
merger.append("document1.pdf")
merger.append("document2.pdf")
merger.append("document3.pdf")

# Ajouter des pages spécifiques
merger.append("grand_document.pdf", pages=(0, 5))  # Pages 0 à 4

# Sauvegarder
merger.write("document_fusionne.pdf")
merger.close()
print("PDFs fusionnés !")
\`\`\`

### Découper un PDF

\`\`\`python
from PyPDF2 import PdfReader, PdfWriter

reader = PdfReader("document.pdf")

# Extraire les pages 2 à 5
writer = PdfWriter()
for i in range(1, 5):  # Pages 1, 2, 3, 4 (index 0-based)
    writer.add_page(reader.pages[i])

with open("extrait.pdf", "wb") as f:
    writer.write(f)

# Séparer chaque page en fichier individuel
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f"page_{i+1}.pdf", "wb") as f:
        writer.write(f)
    print(f"Page {i+1} extraite")
\`\`\`

### Ajouter un filigrane

\`\`\`python
from PyPDF2 import PdfReader, PdfWriter

# Le filigrane est un PDF d'une seule page
reader = PdfReader("document.pdf")
watermark_reader = PdfReader("filigrane.pdf")
watermark_page = watermark_reader.pages[0]

writer = PdfWriter()

for page in reader.pages:
    page.merge_page(watermark_page)  # Superposer le filigrane
    writer.add_page(page)

with open("document_filigrane.pdf", "wb") as f:
    writer.write(f)
\`\`\`

---

## 📝 Créer des PDFs avec reportlab

\`\`\`python
# pip install reportlab (optionnel)

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

# Créer un PDF
c = canvas.Canvas("rapport.pdf", pagesize=A4)
largeur, hauteur = A4

# Ajouter du texte
c.setFont("Helvetica-Bold", 24)
c.drawString(100, hauteur - 100, "Mon Rapport")

c.setFont("Helvetica", 12)
c.drawString(100, hauteur - 150, "Généré automatiquement avec Python")

# Ajouter un tableau simple
y = hauteur - 200
c.setFont("Helvetica-Bold", 10)
c.drawString(100, y, "Produit")
c.drawString(250, y, "Quantité")
c.drawString(350, y, "Prix")

donnees = [("Laptop", "5", "999€"), ("Souris", "50", "29€")]
c.setFont("Helvetica", 10)
for produit, qte, prix in donnees:
    y -= 20
    c.drawString(100, y, produit)
    c.drawString(250, y, qte)
    c.drawString(350, y, prix)

c.save()
print("PDF créé !")
\`\`\`

---

## 🏗️ Cas Pratique : Pipeline Données → Rapport

\`\`\`python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

def generer_rapport_ventes(donnees, fichier_sortie):
    """Génère un rapport Excel formaté à partir de données."""
    wb = Workbook()
    ws = wb.active
    ws.title = "Rapport des ventes"

    # En-têtes
    headers = ["Mois", "Produit", "Quantité", "CA", "Marge"]
    for col, header in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col, value=header)
        cell.font = Font(bold=True, color="FFFFFF", size=12)
        cell.fill = PatternFill(start_color="2F5496", fill_type="solid")
        cell.alignment = Alignment(horizontal="center")

    # Données
    for i, ligne in enumerate(donnees, start=2):
        for j, valeur in enumerate(ligne, start=1):
            ws.cell(row=i, column=j, value=valeur)

    # Formule de total
    derniere_ligne = len(donnees) + 2
    ws.cell(row=derniere_ligne, column=1, value="TOTAL")
    ws.cell(row=derniere_ligne, column=3,
            value=f"=SUM(C2:C{derniere_ligne-1})")
    ws.cell(row=derniere_ligne, column=4,
            value=f"=SUM(D2:D{derniere_ligne-1})")

    # Ligne de total en gras
    for col in range(1, 6):
        ws.cell(row=derniere_ligne, column=col).font = Font(bold=True)

    # Ajuster la largeur
    for col_letter in ["A", "B", "C", "D", "E"]:
        ws.column_dimensions[col_letter].width = 18

    wb.save(fichier_sortie)
    print(f"Rapport sauvegardé : {fichier_sortie}")

# Utilisation
donnees = [
    ("Janvier", "Laptop", 15, 14999.85, 3749.96),
    ("Janvier", "Souris", 80, 2399.20, 959.68),
    ("Février", "Laptop", 22, 21999.78, 5499.95),
    ("Février", "Souris", 95, 2849.05, 1139.62),
]
# generer_rapport_ventes(donnees, "rapport_ventes.xlsx")
\`\`\`

---

## 📋 Résumé

| Action | Bibliothèque | Code |
|--------|-------------|------|
| **Créer Excel** | openpyxl | \`Workbook()\` |
| **Lire Excel** | openpyxl | \`load_workbook("f.xlsx")\` |
| **Écrire cellule** | openpyxl | \`ws["A1"] = valeur\` |
| **Formule** | openpyxl | \`ws["A1"] = "=SUM(B1:B10)"\` |
| **Style** | openpyxl | \`Font(), PatternFill(), Alignment()\` |
| **Lire PDF** | PyPDF2 | \`PdfReader("f.pdf")\` |
| **Texte PDF** | PyPDF2 | \`page.extract_text()\` |
| **Fusionner PDFs** | PyPDF2 | \`PdfMerger().append()\` |
| **Découper PDF** | PyPDF2 | \`PdfWriter().add_page()\` |
| **Créer PDF** | reportlab | \`canvas.Canvas("f.pdf")\` |

---

## Exercices 🎯

### Exercice 1 : Créer un rapport Excel
\`\`\`python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill

wb = Workbook()
ws = wb.active
ws.title = "Notes"

# En-têtes
for col, header in enumerate(["Étudiant", "Maths", "Physique", "Moyenne"], 1):
    cell = ws.cell(row=1, column=col, value=header)
    cell.font = Font(bold=True)

# Données
etudiants = [("Alice", 16, 14), ("Bob", 12, 15), ("Claire", 18, 17)]
for i, (nom, maths, physique) in enumerate(etudiants, 2):
    ws.cell(row=i, column=1, value=nom)
    ws.cell(row=i, column=2, value=maths)
    ws.cell(row=i, column=3, value=physique)
    ws.cell(row=i, column=4, value=f"=AVERAGE(B{i}:C{i})")

wb.save("notes.xlsx")
print("Rapport créé !")
\`\`\`

### Exercice 2 : Extraire du texte d'un PDF
\`\`\`python
from PyPDF2 import PdfReader

def resume_pdf(chemin):
    """Extrait et résume le contenu d'un PDF."""
    reader = PdfReader(chemin)
    texte = ""
    for page in reader.pages:
        texte += page.extract_text() + "\\n"

    # Stats
    mots = texte.split()
    print(f"Pages : {len(reader.pages)}")
    print(f"Mots : {len(mots)}")
    print(f"Premiers 200 caractères :\\n{texte[:200]}")
    return texte

# resume_pdf("document.pdf")
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/26-pdf-excel-exercice.py\`
`,
    '27-email': `
# Module 27 : Email avec Python

Python permet d'**envoyer** et de **lire** des emails automatiquement grâce aux modules \`smtplib\`, \`imaplib\` et \`email\`. Idéal pour les notifications, rapports automatiques et alertes système.

---

## 🧠 Comprendre le Protocole Email

### Comment fonctionne l'email

\`\`\`
Expéditeur → Client SMTP → Serveur SMTP → ... → Serveur IMAP/POP → Client destinataire
\`\`\`

| Protocole | Rôle | Port |
|-----------|------|------|
| **SMTP** | Envoi d'emails | 587 (TLS) / 465 (SSL) |
| **IMAP** | Lecture d'emails (synchronisé) | 993 (SSL) |
| **POP3** | Téléchargement d'emails | 995 (SSL) |

### Serveurs SMTP courants

| Fournisseur | Serveur SMTP | Port |
|-------------|-------------|------|
| **Gmail** | smtp.gmail.com | 587 |
| **Outlook** | smtp.office365.com | 587 |
| **Yahoo** | smtp.mail.yahoo.com | 587 |

> ⚠️ Gmail nécessite un **App Password** (mot de passe d'application) et non votre mot de passe principal.

---

## 📤 Envoyer des Emails avec smtplib

### Email simple (texte brut)

\`\`\`python
import smtplib
from email.mime.text import MIMEText

def envoyer_email_simple(destinataire, sujet, message):
    """Envoie un email en texte brut."""
    # Créer le message
    msg = MIMEText(message)
    msg["Subject"] = sujet
    msg["From"] = "votre_email@gmail.com"
    msg["To"] = destinataire

    # Connexion et envoi
    with smtplib.SMTP("smtp.gmail.com", 587) as serveur:
        serveur.starttls()                          # Chiffrement TLS
        serveur.login("votre_email@gmail.com",
                       "votre_app_password")        # App Password
        serveur.send_message(msg)

    print(f"Email envoyé à {destinataire}")

# envoyer_email_simple(
#     "ami@example.com",
#     "Test Python",
#     "Ceci est un email envoyé depuis Python !"
# )
\`\`\`

### Étapes de connexion SMTP

\`\`\`python
import smtplib

# 1. Se connecter au serveur
serveur = smtplib.SMTP("smtp.gmail.com", 587)

# 2. Saluer le serveur
serveur.ehlo()

# 3. Démarrer le chiffrement
serveur.starttls()

# 4. S'authentifier
serveur.login("email@gmail.com", "app_password")

# 5. Envoyer le message
# serveur.send_message(msg)

# 6. Fermer la connexion
serveur.quit()

# OU utiliser le context manager (recommandé) :
with smtplib.SMTP("smtp.gmail.com", 587) as serveur:
    serveur.starttls()
    serveur.login("email@gmail.com", "app_password")
    # serveur.send_message(msg)
\`\`\`

---

## 📧 Construire des Messages

### Email HTML

\`\`\`python
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def envoyer_email_html(destinataire, sujet, html_content):
    """Envoie un email en HTML."""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = sujet
    msg["From"] = "votre_email@gmail.com"
    msg["To"] = destinataire

    # Version texte (fallback)
    texte = "Votre client email ne supporte pas le HTML."
    partie_texte = MIMEText(texte, "plain")

    # Version HTML
    partie_html = MIMEText(html_content, "html")

    # Ajouter les deux versions (le client choisira)
    msg.attach(partie_texte)
    msg.attach(partie_html)

    return msg

# Exemple HTML
html = """
<html>
<body>
  <h1 style="color: #2F5496;">Rapport Quotidien</h1>
  <p>Bonjour,</p>
  <table border="1" cellpadding="5">
    <tr><th>Métrique</th><th>Valeur</th></tr>
    <tr><td>Ventes</td><td>1 250 €</td></tr>
    <tr><td>Visiteurs</td><td>3 400</td></tr>
  </table>
  <p>Cordialement,<br>L'équipe automatisation</p>
</body>
</html>
"""

# msg = envoyer_email_html("dest@example.com", "Rapport", html)
\`\`\`

### Email à plusieurs destinataires

\`\`\`python
from email.mime.text import MIMEText

msg = MIMEText("Contenu de l'email")
msg["Subject"] = "Annonce importante"
msg["From"] = "admin@example.com"
msg["To"] = "alice@example.com, bob@example.com"
msg["Cc"] = "manager@example.com"
msg["Bcc"] = "archive@example.com"

# Tous les destinataires pour l'envoi
tous_dest = [
    "alice@example.com",
    "bob@example.com",
    "manager@example.com",
    "archive@example.com"
]

# with smtplib.SMTP(...) as serveur:
#     serveur.send_message(msg)
\`\`\`

---

## 📎 Pièces Jointes

\`\`\`python
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

def envoyer_avec_piece_jointe(destinataire, sujet, corps, fichiers):
    """Envoie un email avec des pièces jointes."""
    msg = MIMEMultipart()
    msg["Subject"] = sujet
    msg["From"] = "votre_email@gmail.com"
    msg["To"] = destinataire

    # Corps du message
    msg.attach(MIMEText(corps, "plain"))

    # Pièces jointes
    for chemin_fichier in fichiers:
        if os.path.exists(chemin_fichier):
            with open(chemin_fichier, "rb") as f:
                piece = MIMEBase("application", "octet-stream")
                piece.set_payload(f.read())
            encoders.encode_base64(piece)

            nom_fichier = os.path.basename(chemin_fichier)
            piece.add_header(
                "Content-Disposition",
                f"attachment; filename={nom_fichier}"
            )
            msg.attach(piece)
            print(f"Pièce jointe ajoutée : {nom_fichier}")

    return msg

# msg = envoyer_avec_piece_jointe(
#     "dest@example.com",
#     "Rapport avec données",
#     "Veuillez trouver ci-joint le rapport.",
#     ["rapport.xlsx", "graphique.png"]
# )
\`\`\`

---

## 📥 Lire des Emails avec imaplib

\`\`\`python
import imaplib
import email
from email.header import decode_header

def lire_emails(n=5):
    """Lit les n derniers emails de la boîte de réception."""
    # Connexion
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login("votre_email@gmail.com", "app_password")

    # Sélectionner la boîte
    mail.select("inbox")

    # Rechercher les emails
    status, messages = mail.search(None, "ALL")
    email_ids = messages[0].split()

    # Prendre les n derniers
    derniers = email_ids[-n:]

    for eid in reversed(derniers):
        status, msg_data = mail.fetch(eid, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])

        # Décoder le sujet
        sujet, encoding = decode_header(msg["Subject"])[0]
        if isinstance(sujet, bytes):
            sujet = sujet.decode(encoding or "utf-8")

        # Expéditeur
        expediteur = msg.get("From")
        date = msg.get("Date")

        print(f"De: {expediteur}")
        print(f"Sujet: {sujet}")
        print(f"Date: {date}")

        # Corps du message
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    corps = part.get_payload(decode=True)
                    print(f"Corps: {corps.decode()[:200]}...")
                    break
        else:
            corps = msg.get_payload(decode=True)
            print(f"Corps: {corps.decode()[:200]}...")

        print("-" * 50)

    mail.logout()

# lire_emails(5)
\`\`\`

### Rechercher des emails

\`\`\`python
import imaplib

mail = imaplib.IMAP4_SSL("imap.gmail.com")
mail.login("email@gmail.com", "app_password")
mail.select("inbox")

# Critères de recherche
status, msgs = mail.search(None, 'FROM "alice@example.com"')
status, msgs = mail.search(None, 'SUBJECT "rapport"')
status, msgs = mail.search(None, 'SINCE "01-Jan-2024"')
status, msgs = mail.search(None, 'UNSEEN')  # Non lus
status, msgs = mail.search(None,
    '(FROM "alice@example.com" SUBJECT "rapport")')

mail.logout()
\`\`\`

---

## ⚠️ Sécurité et Bonnes Pratiques

### Ne jamais hardcoder les identifiants

\`\`\`python
import os

# ❌ MAUVAIS — Ne jamais faire ça
# password = "mon_mot_de_passe"

# ✅ BON — Variables d'environnement
email_user = os.environ.get("EMAIL_USER")
email_pass = os.environ.get("EMAIL_PASS")

# ✅ BON — Fichier .env (avec python-dotenv)
# pip install python-dotenv
from dotenv import load_dotenv
load_dotenv()

email_user = os.getenv("EMAIL_USER")
email_pass = os.getenv("EMAIL_PASS")
\`\`\`

### Checklist de sécurité

| Règle | Description |
|-------|------------|
| **App Password** | Utiliser un mot de passe d'application, pas le principal |
| **Variables d'env** | Stocker les identifiants dans l'environnement |
| **.gitignore** | Ne jamais commiter .env ou credentials |
| **TLS/SSL** | Toujours utiliser \`starttls()\` ou SSL |
| **Rate limiting** | Ne pas envoyer trop d'emails (risque de blocage) |
| **Validation** | Valider les adresses email avant envoi |
| **Désabonnement** | Inclure un lien de désabonnement (emails marketing) |

---

## 📋 Résumé

| Action | Module | Code |
|--------|--------|------|
| **Connexion SMTP** | smtplib | \`smtplib.SMTP("smtp.gmail.com", 587)\` |
| **TLS** | smtplib | \`serveur.starttls()\` |
| **Login** | smtplib | \`serveur.login(user, pass)\` |
| **Envoyer** | smtplib | \`serveur.send_message(msg)\` |
| **Message texte** | email | \`MIMEText("contenu")\` |
| **Message HTML** | email | \`MIMEText(html, "html")\` |
| **Pièce jointe** | email | \`MIMEBase() + encode_base64()\` |
| **Lire emails** | imaplib | \`IMAP4_SSL("imap.gmail.com")\` |
| **Rechercher** | imaplib | \`mail.search(None, critère)\` |
| **Variables d'env** | os | \`os.environ.get("KEY")\` |

---

## Exercices 🎯

### Exercice 1 : Construire un email
\`\`\`python
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Créer un email HTML avec un tableau de données
msg = MIMEMultipart("alternative")
msg["Subject"] = "Rapport Hebdomadaire"
msg["From"] = "rapport@entreprise.com"
msg["To"] = "equipe@entreprise.com"

html = """
<html><body>
<h2>Résumé de la semaine</h2>
<ul>
  <li>Tickets résolus : 42</li>
  <li>Nouveaux clients : 7</li>
  <li>CA : 15 230 €</li>
</ul>
</body></html>
"""
msg.attach(MIMEText(html, "html"))
print(f"Email prêt : {msg['Subject']}")
\`\`\`

### Exercice 2 : Parser un email brut
\`\`\`python
import email
from email.header import decode_header

raw_email = """From: alice@example.com
To: bob@example.com
Subject: Reunion demain
Date: Mon, 15 Jan 2024 10:30:00 +0100
Content-Type: text/plain; charset=utf-8

Bonjour Bob,

N'oublie pas la reunion demain a 14h.
Salle B203.

Cordialement,
Alice
"""

msg = email.message_from_string(raw_email)
print(f"De: {msg['From']}")
print(f"Sujet: {msg['Subject']}")
print(f"Corps: {msg.get_payload()}")
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/27-email-exercice.py\`
`,
    '28-gui': `
# Module 28 : GUIs avec Tkinter

**Tkinter** est la bibliothèque standard de Python pour créer des **interfaces graphiques** (GUI). Incluse dans Python, elle ne nécessite aucune installation supplémentaire.

---

## 🧠 Architecture d'une Application GUI

### Programmation événementielle

Contrairement à un script séquentiel, une application GUI fonctionne en **boucle d'événements** :

\`\`\`
1. Créer la fenêtre et les widgets
2. Placer les widgets (layout)
3. Lier les événements aux fonctions (callbacks)
4. Démarrer la boucle d'événements (mainloop)
   → L'application attend les actions de l'utilisateur
   → Quand un événement arrive → exécuter le callback
   → Retourner en attente
\`\`\`

### Structure de base

\`\`\`python
import tkinter as tk

# 1. Créer la fenêtre principale
root = tk.Tk()
root.title("Mon Application")
root.geometry("400x300")        # Largeur x Hauteur

# 2. Ajouter des widgets
label = tk.Label(root, text="Bienvenue !")
label.pack()

# 3. Démarrer la boucle d'événements
root.mainloop()
\`\`\`

---

## 🪟 Fenêtre Principale et Widgets de Base

### Configuration de la fenêtre

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.title("Mon App")
root.geometry("600x400")          # Taille initiale
root.minsize(400, 300)            # Taille minimale
root.maxsize(800, 600)            # Taille maximale
root.resizable(True, True)        # Redimensionnable (x, y)
root.configure(bg="#f0f0f0")      # Couleur de fond

# Icône (optionnel)
# root.iconbitmap("icon.ico")

root.mainloop()
\`\`\`

### Label — Afficher du texte

\`\`\`python
import tkinter as tk

root = tk.Tk()

# Label simple
label1 = tk.Label(root, text="Hello World !")
label1.pack()

# Label stylé
label2 = tk.Label(root,
    text="Texte stylé",
    font=("Arial", 18, "bold"),
    fg="white",                   # Couleur du texte
    bg="#2F5496",                  # Couleur de fond
    padx=20,                      # Padding horizontal
    pady=10,                      # Padding vertical
    relief="raised",              # Bordure (flat, raised, sunken, groove, ridge)
    width=20                      # Largeur en caractères
)
label2.pack(pady=10)

# Label avec variable dynamique
texte_var = tk.StringVar(value="Texte initial")
label3 = tk.Label(root, textvariable=texte_var, font=("Arial", 14))
label3.pack()

# Modifier le texte plus tard
texte_var.set("Texte modifié !")

root.mainloop()
\`\`\`

### Button — Boutons d'action

\`\`\`python
import tkinter as tk

root = tk.Tk()

compteur = 0

def incrementer():
    global compteur
    compteur += 1
    label.config(text=f"Compteur : {compteur}")

def quitter():
    root.destroy()

label = tk.Label(root, text="Compteur : 0", font=("Arial", 16))
label.pack(pady=20)

# Bouton avec command
btn = tk.Button(root,
    text="Cliquer !",
    command=incrementer,
    font=("Arial", 12),
    bg="#4CAF50",
    fg="white",
    padx=20,
    pady=5,
    cursor="hand2"               # Curseur au survol
)
btn.pack(pady=5)

btn_quit = tk.Button(root, text="Quitter", command=quitter,
                     bg="#f44336", fg="white")
btn_quit.pack(pady=5)

root.mainloop()
\`\`\`

### Entry — Champ de saisie

\`\`\`python
import tkinter as tk

root = tk.Tk()

def afficher():
    texte = entry.get()
    label.config(text=f"Vous avez saisi : {texte}")
    entry.delete(0, tk.END)      # Effacer le champ

label = tk.Label(root, text="Saisissez quelque chose :", font=("Arial", 12))
label.pack(pady=10)

entry = tk.Entry(root,
    font=("Arial", 14),
    width=30,
    justify="center"
)
entry.pack(pady=5)
entry.focus()                     # Focus automatique

# Entry mot de passe
entry_mdp = tk.Entry(root, show="*")
entry_mdp.pack(pady=5)

btn = tk.Button(root, text="Valider", command=afficher)
btn.pack(pady=10)

root.mainloop()
\`\`\`

### Text — Zone de texte multiligne

\`\`\`python
import tkinter as tk

root = tk.Tk()

def obtenir_texte():
    contenu = text.get("1.0", tk.END)  # Ligne 1, caractère 0 → fin
    print(contenu)

text = tk.Text(root,
    width=50,                    # Largeur en caractères
    height=10,                   # Hauteur en lignes
    font=("Courier", 12),
    wrap="word"                  # Retour à la ligne par mot
)
text.pack(padx=10, pady=10)

# Insérer du texte
text.insert("1.0", "Tapez votre texte ici...\\n")
text.insert(tk.END, "Deuxième ligne.\\n")

btn = tk.Button(root, text="Obtenir le texte", command=obtenir_texte)
btn.pack(pady=5)

root.mainloop()
\`\`\`

---

## 📐 Gestionnaires de Géométrie

### pack() — Empilage simple

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.geometry("300x200")

# pack() empile les widgets
tk.Label(root, text="Haut", bg="red", fg="white").pack(side="top", fill="x")
tk.Label(root, text="Bas", bg="blue", fg="white").pack(side="bottom", fill="x")
tk.Label(root, text="Gauche", bg="green", fg="white").pack(side="left", fill="y")
tk.Label(root, text="Droite", bg="orange").pack(side="right", fill="y")

# Options de pack :
# side = "top" | "bottom" | "left" | "right"
# fill = "x" | "y" | "both" | "none"
# expand = True (prendre l'espace disponible)
# padx, pady = marge extérieure
# ipadx, ipady = marge intérieure

root.mainloop()
\`\`\`

### grid() — Grille (le plus utilisé)

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.title("Formulaire")

# grid() place les widgets en lignes/colonnes
tk.Label(root, text="Nom :").grid(row=0, column=0, sticky="e", padx=5, pady=5)
tk.Entry(root, width=30).grid(row=0, column=1, padx=5, pady=5)

tk.Label(root, text="Email :").grid(row=1, column=0, sticky="e", padx=5, pady=5)
tk.Entry(root, width=30).grid(row=1, column=1, padx=5, pady=5)

tk.Label(root, text="Message :").grid(row=2, column=0, sticky="ne", padx=5, pady=5)
tk.Text(root, width=30, height=5).grid(row=2, column=1, padx=5, pady=5)

# Bouton sur 2 colonnes
tk.Button(root, text="Envoyer").grid(row=3, column=0, columnspan=2, pady=10)

# Options de grid :
# row, column = position
# rowspan, columnspan = fusion de cellules
# sticky = "n" | "s" | "e" | "w" | "ns" | "ew" | "nsew" (ancrage)
# padx, pady = marge

root.mainloop()
\`\`\`

### place() — Positionnement absolu

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.geometry("400x300")

# place() : coordonnées exactes ou relatives
tk.Label(root, text="Absolu", bg="red", fg="white").place(x=50, y=50)
tk.Label(root, text="Relatif", bg="blue", fg="white").place(relx=0.5, rely=0.5, anchor="center")

# Options de place :
# x, y = pixels absolus
# relx, rely = 0.0 à 1.0 (proportionnel)
# anchor = "center" | "n" | "ne" | "e" | "se" | etc.
# width, height = taille en pixels
# relwidth, relheight = taille proportionnelle

root.mainloop()
\`\`\`

---

## 🎛️ Widgets Avancés

### Listbox — Liste de sélection

\`\`\`python
import tkinter as tk

root = tk.Tk()

def selection():
    indices = listbox.curselection()
    for i in indices:
        print(listbox.get(i))

listbox = tk.Listbox(root,
    selectmode="multiple",        # "single", "browse", "multiple", "extended"
    height=6,
    font=("Arial", 12)
)
listbox.pack(pady=10)

# Ajouter des éléments
langages = ["Python", "JavaScript", "Java", "C++", "Go", "Rust"]
for lang in langages:
    listbox.insert(tk.END, lang)

tk.Button(root, text="Afficher sélection", command=selection).pack()

root.mainloop()
\`\`\`

### Combobox — Liste déroulante

\`\`\`python
import tkinter as tk
from tkinter import ttk

root = tk.Tk()

def choix_fait(event):
    print(f"Choisi : {combo.get()}")

combo = ttk.Combobox(root,
    values=["Python", "JavaScript", "Java", "C++"],
    state="readonly",              # Empêche la saisie libre
    font=("Arial", 12),
    width=20
)
combo.set("Choisir un langage")    # Valeur par défaut
combo.pack(pady=20)
combo.bind("<<ComboboxSelected>>", choix_fait)

root.mainloop()
\`\`\`

### Checkbutton et Scale

\`\`\`python
import tkinter as tk

root = tk.Tk()

# Checkbutton
var_check = tk.BooleanVar()
check = tk.Checkbutton(root,
    text="Activer les notifications",
    variable=var_check,
    command=lambda: print(f"Notifications: {var_check.get()}")
)
check.pack(pady=10)

# Scale (curseur)
var_scale = tk.IntVar(value=50)
scale = tk.Scale(root,
    from_=0,
    to=100,
    orient="horizontal",
    variable=var_scale,
    label="Volume",
    length=300
)
scale.pack(pady=10)

root.mainloop()
\`\`\`

### Canvas — Dessin

\`\`\`python
import tkinter as tk

root = tk.Tk()

canvas = tk.Canvas(root, width=400, height=300, bg="white")
canvas.pack()

# Dessiner des formes
canvas.create_rectangle(50, 50, 150, 100, fill="blue", outline="black")
canvas.create_oval(200, 50, 350, 150, fill="red")
canvas.create_line(50, 200, 350, 200, fill="green", width=3)
canvas.create_text(200, 250, text="Canvas !", font=("Arial", 20))

# Polygone
canvas.create_polygon(100, 150, 50, 250, 150, 250,
                       fill="yellow", outline="black")

root.mainloop()
\`\`\`

---

## 📋 Gestion des Événements

### Avec command=

\`\`\`python
import tkinter as tk

root = tk.Tk()

# command= pour les boutons
def action():
    print("Bouton cliqué !")

tk.Button(root, text="Cliquer", command=action).pack()

# Lambda pour passer des arguments
def saluer(nom):
    print(f"Bonjour {nom} !")

tk.Button(root, text="Saluer Alice",
          command=lambda: saluer("Alice")).pack()
tk.Button(root, text="Saluer Bob",
          command=lambda: saluer("Bob")).pack()

root.mainloop()
\`\`\`

### Avec bind() — Événements clavier/souris

\`\`\`python
import tkinter as tk

root = tk.Tk()
root.geometry("400x300")

label = tk.Label(root, text="Interagissez !", font=("Arial", 16))
label.pack(expand=True)

# Événements souris
def clic(event):
    label.config(text=f"Clic à ({event.x}, {event.y})")

def survol(event):
    label.config(text=f"Souris à ({event.x}, {event.y})")

root.bind("<Button-1>", clic)           # Clic gauche
root.bind("<Button-3>", lambda e:       # Clic droit
    label.config(text="Clic droit !"))
root.bind("<Motion>", survol)            # Mouvement souris

# Événements clavier
root.bind("<Return>", lambda e:
    label.config(text="Entrée pressée !"))
root.bind("<Escape>", lambda e: root.destroy())
root.bind("<Key>", lambda e:
    label.config(text=f"Touche : {e.keysym}"))

# Combinaisons
root.bind("<Control-s>", lambda e:
    label.config(text="Ctrl+S : Sauvegarde !"))
root.bind("<Control-q>", lambda e: root.destroy())

root.mainloop()
\`\`\`

### Événements courants

| Événement | Description |
|-----------|------------|
| \`<Button-1>\` | Clic gauche |
| \`<Button-3>\` | Clic droit |
| \`<Double-Button-1>\` | Double-clic |
| \`<Motion>\` | Mouvement souris |
| \`<Enter>\` | Souris entre dans le widget |
| \`<Leave>\` | Souris quitte le widget |
| \`<Key>\` | N'importe quelle touche |
| \`<Return>\` | Touche Entrée |
| \`<Escape>\` | Touche Échap |
| \`<Control-s>\` | Ctrl + S |
| \`<FocusIn>\` | Widget reçoit le focus |
| \`<Configure>\` | Widget redimensionné |

---

## 🗂️ Menus et Dialogues

### Barre de menus

\`\`\`python
import tkinter as tk
from tkinter import messagebox

root = tk.Tk()
root.title("App avec menu")

# Créer la barre de menus
menubar = tk.Menu(root)

# Menu Fichier
menu_fichier = tk.Menu(menubar, tearoff=0)
menu_fichier.add_command(label="Nouveau", command=lambda: print("Nouveau"))
menu_fichier.add_command(label="Ouvrir", command=lambda: print("Ouvrir"))
menu_fichier.add_command(label="Sauvegarder", command=lambda: print("Sauver"))
menu_fichier.add_separator()
menu_fichier.add_command(label="Quitter", command=root.destroy)
menubar.add_cascade(label="Fichier", menu=menu_fichier)

# Menu Aide
menu_aide = tk.Menu(menubar, tearoff=0)
menu_aide.add_command(label="À propos",
    command=lambda: messagebox.showinfo("À propos", "Mon App v1.0"))
menubar.add_cascade(label="Aide", menu=menu_aide)

root.config(menu=menubar)
root.mainloop()
\`\`\`

### Boîtes de dialogue

\`\`\`python
from tkinter import messagebox, filedialog, simpledialog
import tkinter as tk

root = tk.Tk()

# Messagebox
def dialog_info():
    messagebox.showinfo("Info", "Opération réussie !")

def dialog_erreur():
    messagebox.showerror("Erreur", "Une erreur est survenue.")

def dialog_question():
    reponse = messagebox.askyesno("Question", "Voulez-vous continuer ?")
    print(f"Réponse : {reponse}")    # True ou False

# File dialog
def ouvrir_fichier():
    chemin = filedialog.askopenfilename(
        title="Ouvrir un fichier",
        filetypes=[("Fichiers Python", "*.py"),
                   ("Tous les fichiers", "*.*")]
    )
    if chemin:
        print(f"Fichier sélectionné : {chemin}")

def sauver_fichier():
    chemin = filedialog.asksaveasfilename(
        defaultextension=".txt",
        filetypes=[("Fichiers texte", "*.txt")]
    )
    if chemin:
        print(f"Sauvegarder dans : {chemin}")

# Simple dialog
def demander_nom():
    nom = simpledialog.askstring("Nom", "Entrez votre nom :")
    if nom:
        print(f"Nom : {nom}")

tk.Button(root, text="Info", command=dialog_info).pack(pady=2)
tk.Button(root, text="Erreur", command=dialog_erreur).pack(pady=2)
tk.Button(root, text="Question", command=dialog_question).pack(pady=2)
tk.Button(root, text="Ouvrir fichier", command=ouvrir_fichier).pack(pady=2)
tk.Button(root, text="Sauver fichier", command=sauver_fichier).pack(pady=2)
tk.Button(root, text="Demander nom", command=demander_nom).pack(pady=2)

root.mainloop()
\`\`\`

---

## 🏗️ Exemple Complet : Application de Notes

\`\`\`python
import tkinter as tk
from tkinter import messagebox, filedialog
import json
import os

class AppNotes:
    def __init__(self, root):
        self.root = root
        self.root.title("Mes Notes")
        self.root.geometry("600x500")
        self.fichier_notes = "notes.json"
        self.notes = self.charger_notes()

        self.creer_menu()
        self.creer_interface()
        self.rafraichir_liste()

    def creer_menu(self):
        menubar = tk.Menu(self.root)

        menu_fichier = tk.Menu(menubar, tearoff=0)
        menu_fichier.add_command(label="Exporter", command=self.exporter)
        menu_fichier.add_separator()
        menu_fichier.add_command(label="Quitter", command=self.root.destroy)
        menubar.add_cascade(label="Fichier", menu=menu_fichier)

        self.root.config(menu=menubar)

    def creer_interface(self):
        # Frame du haut : saisie
        frame_haut = tk.Frame(self.root, padx=10, pady=10)
        frame_haut.pack(fill="x")

        tk.Label(frame_haut, text="Titre :", font=("Arial", 11)).grid(
            row=0, column=0, sticky="w")
        self.entry_titre = tk.Entry(frame_haut, width=50, font=("Arial", 11))
        self.entry_titre.grid(row=0, column=1, padx=5)

        tk.Label(frame_haut, text="Contenu :", font=("Arial", 11)).grid(
            row=1, column=0, sticky="nw", pady=5)
        self.text_contenu = tk.Text(frame_haut, width=50, height=5,
                                     font=("Arial", 11))
        self.text_contenu.grid(row=1, column=1, padx=5, pady=5)

        # Boutons
        frame_btns = tk.Frame(frame_haut)
        frame_btns.grid(row=2, column=1, sticky="e")
        tk.Button(frame_btns, text="Ajouter", command=self.ajouter_note,
                  bg="#4CAF50", fg="white").pack(side="left", padx=2)
        tk.Button(frame_btns, text="Supprimer", command=self.supprimer_note,
                  bg="#f44336", fg="white").pack(side="left", padx=2)

        # Frame du bas : liste des notes
        frame_bas = tk.Frame(self.root, padx=10, pady=10)
        frame_bas.pack(fill="both", expand=True)

        tk.Label(frame_bas, text="Notes :", font=("Arial", 12, "bold")).pack(
            anchor="w")
        self.listbox = tk.Listbox(frame_bas, font=("Arial", 11))
        self.listbox.pack(fill="both", expand=True)
        self.listbox.bind("<<ListboxSelect>>", self.afficher_note)

    def charger_notes(self):
        if os.path.exists(self.fichier_notes):
            with open(self.fichier_notes, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    def sauver_notes(self):
        with open(self.fichier_notes, "w", encoding="utf-8") as f:
            json.dump(self.notes, f, ensure_ascii=False, indent=2)

    def rafraichir_liste(self):
        self.listbox.delete(0, tk.END)
        for note in self.notes:
            self.listbox.insert(tk.END, note["titre"])

    def ajouter_note(self):
        titre = self.entry_titre.get().strip()
        contenu = self.text_contenu.get("1.0", tk.END).strip()
        if not titre:
            messagebox.showwarning("Attention", "Le titre est obligatoire.")
            return
        self.notes.append({"titre": titre, "contenu": contenu})
        self.sauver_notes()
        self.rafraichir_liste()
        self.entry_titre.delete(0, tk.END)
        self.text_contenu.delete("1.0", tk.END)

    def supprimer_note(self):
        selection = self.listbox.curselection()
        if not selection:
            messagebox.showinfo("Info", "Sélectionnez une note à supprimer.")
            return
        if messagebox.askyesno("Confirmer", "Supprimer cette note ?"):
            del self.notes[selection[0]]
            self.sauver_notes()
            self.rafraichir_liste()

    def afficher_note(self, event):
        selection = self.listbox.curselection()
        if selection:
            note = self.notes[selection[0]]
            self.entry_titre.delete(0, tk.END)
            self.entry_titre.insert(0, note["titre"])
            self.text_contenu.delete("1.0", tk.END)
            self.text_contenu.insert("1.0", note["contenu"])

    def exporter(self):
        chemin = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("Fichiers texte", "*.txt")]
        )
        if chemin:
            with open(chemin, "w", encoding="utf-8") as f:
                for note in self.notes:
                    f.write(f"=== {note['titre']} ===\\n")
                    f.write(f"{note['contenu']}\\n\\n")
            messagebox.showinfo("Export", "Notes exportées avec succès !")

# root = tk.Tk()
# app = AppNotes(root)
# root.mainloop()
\`\`\`

---

## 📋 Résumé

| Widget | Code | Description |
|--------|------|------------|
| **Fenêtre** | \`tk.Tk()\` | Fenêtre principale |
| **Label** | \`tk.Label(root, text="...")\` | Afficher du texte |
| **Button** | \`tk.Button(root, command=fn)\` | Bouton d'action |
| **Entry** | \`tk.Entry(root)\` | Champ de saisie |
| **Text** | \`tk.Text(root)\` | Zone multiligne |
| **Listbox** | \`tk.Listbox(root)\` | Liste de sélection |
| **Canvas** | \`tk.Canvas(root)\` | Zone de dessin |
| **Menu** | \`tk.Menu(root)\` | Barre de menus |
| **pack()** | \`widget.pack(side="top")\` | Layout par empilement |
| **grid()** | \`widget.grid(row=0, col=0)\` | Layout en grille |
| **bind()** | \`widget.bind("<Event>", fn)\` | Lier un événement |
| **messagebox** | \`messagebox.showinfo(...)\` | Boîte de dialogue |

---

## Exercices 🎯

### Exercice 1 : Interface de calculatrice
\`\`\`python
import tkinter as tk

root = tk.Tk()
root.title("Calculatrice Simple")

# Variable pour l'affichage
var_display = tk.StringVar(value="0")
label = tk.Label(root, textvariable=var_display, font=("Arial", 24),
                 anchor="e", bg="white", relief="sunken", padx=10)
label.grid(row=0, column=0, columnspan=4, sticky="ew", padx=5, pady=5)

# Créer les boutons
boutons = [
    ("7", 1, 0), ("8", 1, 1), ("9", 1, 2), ("/", 1, 3),
    ("4", 2, 0), ("5", 2, 1), ("6", 2, 2), ("*", 2, 3),
    ("1", 3, 0), ("2", 3, 1), ("3", 3, 2), ("-", 3, 3),
    ("0", 4, 0), (".", 4, 1), ("=", 4, 2), ("+", 4, 3),
]

for (texte, ligne, col) in boutons:
    tk.Button(root, text=texte, font=("Arial", 14), width=5,
              command=lambda t=texte: print(f"Bouton: {t}")
    ).grid(row=ligne, column=col, padx=2, pady=2)

root.mainloop()
\`\`\`

### Exercice 2 : Formulaire d'inscription
\`\`\`python
import tkinter as tk
from tkinter import ttk, messagebox

root = tk.Tk()
root.title("Inscription")

# Champs
tk.Label(root, text="Nom :").grid(row=0, column=0, sticky="e", padx=5, pady=5)
entry_nom = tk.Entry(root, width=25)
entry_nom.grid(row=0, column=1, padx=5, pady=5)

tk.Label(root, text="Email :").grid(row=1, column=0, sticky="e", padx=5, pady=5)
entry_email = tk.Entry(root, width=25)
entry_email.grid(row=1, column=1, padx=5, pady=5)

tk.Label(root, text="Niveau :").grid(row=2, column=0, sticky="e", padx=5, pady=5)
combo_niveau = ttk.Combobox(root, values=["Débutant", "Intermédiaire", "Avancé"],
                            state="readonly", width=22)
combo_niveau.grid(row=2, column=1, padx=5, pady=5)

var_newsletter = tk.BooleanVar()
tk.Checkbutton(root, text="S'abonner à la newsletter",
               variable=var_newsletter).grid(row=3, column=1, sticky="w", padx=5)

def valider():
    nom = entry_nom.get().strip()
    email = entry_email.get().strip()
    if not nom or not email:
        messagebox.showwarning("Attention", "Tous les champs sont requis.")
        return
    if "@" not in email:
        messagebox.showerror("Erreur", "Email invalide.")
        return
    messagebox.showinfo("Succès",
        f"Inscription réussie !\\nNom: {nom}\\nEmail: {email}")

tk.Button(root, text="S'inscrire", command=valider,
          bg="#4CAF50", fg="white").grid(row=4, column=1, pady=10)

root.mainloop()
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/28-gui-exercice.py\`
`
};

export const getAdvancedChapterContent = (chapterId) => {
    return pythonChaptersAdvanced[chapterId] || null;
};
