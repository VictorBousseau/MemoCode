// Chapter content for Python course - PART 1: Fundamentals
// Each chapter has its content in markdown format

export const pythonChapters = {
    '00-environnement': `
# Module 0 : Environnement Professionnel

## Pourquoi Python en 2025 ?

Python est le langage **#1 mondial** pour :

| Domaine | Outils |
|---------|--------|
| 📊 Data Science | Pandas, NumPy, Jupyter |
| 🤖 Machine Learning | TensorFlow, PyTorch, Scikit-Learn |
| 🌐 Web Backend | Django, Flask, FastAPI |
| ⚙️ Automatisation | Scripts système, bots |
| 🎮 Développement | Jeux, applications |

Sa philosophie : **The Zen of Python** - lisibilité et simplicité.

## Installation avec Anaconda

> ⚠️ **Important** : N'installez jamais Python "nu". Utilisez Anaconda.

### Pourquoi Anaconda ?

1. **Pré-installe** des centaines de bibliothèques
2. **Environnements virtuels** isolés
3. **Évite les conflits** de versions

### Étapes d'installation

1. Téléchargez [Anaconda](https://www.anaconda.com/download)
2. Installation par défaut
3. Ouvrez **Anaconda Prompt** (Windows) ou **Terminal**
4. Vérifiez :

\`\`\`bash
python --version
# Python 3.10.x ou supérieur

conda --version
# conda 23.x.x
\`\`\`

## Environnements Virtuels

\`\`\`bash
# Créer un environnement
conda create -n monprojet python=3.10

# Activer l'environnement
conda activate monprojet

# Désactiver
conda deactivate

# Lister les environnements
conda env list
\`\`\`

## Choix de l'IDE

| IDE | Type | Quand l'utiliser |
|-----|------|------------------|
| **VS Code** | Éditeur | Scripts .py, projets |
| **Jupyter Lab** | Notebook | Exploration de données |
| **PyCharm** | IDE complet | Gros projets |

### Recommandation

Commencez avec **VS Code** + extension Python, puis utilisez **Jupyter** pour l'analyse de données.

## Premier Programme

Créez \`hello.py\` :

\`\`\`python
# Mon premier programme Python
print("Hello, World!")
print("Bienvenue dans le cours Python !")

# Afficher la version de Python
import sys
print(f"Python {sys.version}")
\`\`\`

Exécution :

\`\`\`bash
python hello.py
\`\`\`

## Exercice 🎯

Créez un fichier \`00-setup.py\` qui affiche :
1. "Hello, World!"
2. Votre nom
3. La version de Python
`,

    '01-variables': `
# Module 1 : Variables et Types de Données

Les **variables** sont le fondement de tout programme. Elles permettent de **stocker des données** pour les utiliser plus tard. Dans ce module, vous apprendrez comment Python gère les variables en mémoire et les différents types de données disponibles.

---

## 🧠 Concept Fondamental : Variables comme Références

En Python, contrairement à d'autres langages, une variable **n'est pas une boîte** qui contient une valeur. C'est plutôt une **étiquette** (ou un pointeur) qui pointe vers un objet stocké en mémoire.

**Pourquoi c'est important ?** Cela affecte la façon dont les données sont copiées et modifiées. Comprendre ce concept vous évitera beaucoup de bugs !

### Schéma Mental

\`\`\`
Variable "a"  ──────►  [ Objet 10 en mémoire ]
                               ▲
Variable "b"  ─────────────────┘
\`\`\`

Quand vous faites \`b = a\`, les deux variables pointent vers **le même objet** :

\`\`\`python
a = 10
b = a      # b pointe vers le même objet que a

print(id(a))  # Adresse mémoire: 140234567890
print(id(b))  # Même adresse: 140234567890 !
\`\`\`

> 💡 **À retenir** : \`id()\` retourne l'adresse mémoire d'un objet. Deux variables avec le même \`id()\` pointent vers le même objet.

---

## 📦 Types de Données Primitifs

Python dispose de **4 types primitifs** principaux. Chaque type a ses propres caractéristiques et usages.

### 1. Entiers (int) - Nombres sans virgule

Les entiers sont des **nombres entiers** positifs ou négatifs, **sans limite de taille** en Python ! C'est une différence majeure avec d'autres langages comme Java ou C.

**Cas d'usage typiques** : compteurs, indices, identifiants, âges, quantités...

\`\`\`python
age = 25
population = 7_900_000_000  # Les _ améliorent la lisibilité
temperature = -15
annee = 2024

# Python gère automatiquement les très grands nombres !
grand_nombre = 10**100  # Un "googol" - 1 suivi de 100 zéros
\`\`\`

> 📝 **Astuce pro** : Utilisez des **underscores** (\`_\`) pour séparer les milliers. Python les ignore mais c'est bien plus lisible !

### 2. Décimaux (float) - Nombres à virgule

Les floats permettent de représenter des **nombres décimaux**. Ils sont essentiels pour les calculs nécessitant de la précision.

**Cas d'usage typiques** : prix, mesures physiques, coordonnées, pourcentages...

\`\`\`python
prix = 19.99
pi = 3.14159
taille = 1.75

# Notation scientifique pour très grands/petits nombres
distance = 1.496e8   # 1.496 × 10⁸
\`\`\`

> ⚠️ **Attention à la précision !** Les floats ne sont pas toujours exacts à cause de leur représentation en binaire :

\`\`\`python
print(0.1 + 0.2)  # Affiche 0.30000000000000004, pas 0.3 !
\`\`\`

**Pour les calculs financiers**, utilisez plutôt le module \`decimal\` qui garantit la précision.

### 3. Booléens (bool) - Vrai ou Faux

Les booléens ne peuvent avoir que **deux valeurs** : \`True\` ou \`False\`. Ils sont la base de toute **logique conditionnelle**.

**Cas d'usage typiques** : conditions, états (actif/inactif), validations, drapeaux...

\`\`\`python
est_majeur = True
a_paye = False

# Les comparaisons retournent des booléens
print(5 > 3)    # True  (5 est plus grand que 3)
print(5 == 3)   # False (5 n'égale pas 3)
print(5 != 3)   # True  (5 est différent de 3)
\`\`\`

> 💡 **En coulisses** : \`True\` équivaut à \`1\` et \`False\` à \`0\`. C'est pourquoi \`True + True\` donne \`2\` !

### 4. Vérifier le type d'une variable

Python offre deux fonctions pour inspecter les types :
- **\`type()\`** : retourne le type exact
- **\`isinstance()\`** : vérifie si c'est un type spécifique

\`\`\`python
# type() retourne la classe de l'objet
print(type(25))       # <class 'int'>
print(type(3.14))     # <class 'float'>
print(type("hello"))  # <class 'str'>
print(type(True))     # <class 'bool'>

# isinstance() retourne True/False
print(isinstance(25, int))  # True
\`\`\`

---

## ➗ Opérations Arithmétiques

Python offre tous les opérateurs mathématiques standards. Voici les plus importants à connaître :

| Opérateur | Nom | Exemple | Résultat |
|-----------|-----|---------|----------|
| \`+\` | Addition | \`5 + 3\` | \`8\` |
| \`-\` | Soustraction | \`5 - 3\` | \`2\` |
| \`*\` | Multiplication | \`5 * 3\` | \`15\` |
| \`/\` | Division | \`5 / 2\` | \`2.5\` |
| \`//\` | Division entière | \`5 // 2\` | \`2\` |
| \`%\` | Modulo (reste) | \`5 % 2\` | \`1\` |
| \`**\` | Puissance | \`2 ** 3\` | \`8\` |

### Différence entre / et //

C'est une subtilité **très importante** en Python :
- **\`/\`** (division normale) retourne **toujours un float**
- **\`//\`** (division entière) retourne **uniquement la partie entière**

\`\`\`python
print(10 / 3)   # 3.333... (float)
print(10 // 3)  # 3 (partie décimale ignorée)
print(10 / 2)   # 5.0 (float même si résultat entier !)
\`\`\`

### Le modulo (%) - Le reste de la division

L'opérateur **modulo** est extrêmement utile pour :
- Vérifier si un nombre est **pair ou impair**
- Créer des **cycles** (ex: les jours de la semaine)
- Valider des **numéros** (ex: vérification IBAN)

\`\`\`python
print(17 % 5)  # 2 (car 17 = 5×3 + 2)

# Astuce : vérifier si pair/impair
nombre = 42
est_pair = (nombre % 2 == 0)  # True si pair
\`\`\`

---

## 🔄 Conversion de Types (Casting)

Parfois, vous devez **convertir** une donnée d'un type à un autre. C'est ce qu'on appelle le **casting**.

### Schéma des conversions possibles

\`\`\`
    str("42")         int(42)
         │                │
         ▼                ▼
   ┌──────────┐    ┌──────────┐
   │   "42"   │◄───│    42    │
   │  (str)   │    │  (int)   │
   └──────────┘    └────┬─────┘
         ▲              │
         │         float(42)
    str(3.14)           ▼
         │        ┌──────────┐
         └────────│   42.0   │
                  │  (float) │
                  └──────────┘
\`\`\`

\`\`\`python
# String → Integer
age_texte = "25"
age = int(age_texte)  # 25 (maintenant un int)

# Integer → String  
nombre = 42
texte = str(nombre)   # "42" (maintenant un string)

# String → Float
prix_texte = "19.99"
prix = float(prix_texte)  # 19.99

# Float → Integer (⚠️ TRONQUE, n'arrondit pas !)
decimal = 3.9
entier = int(decimal)  # 3 (pas 4 !)
\`\`\`

> ⚠️ **Piège courant** : \`int(3.9)\` donne \`3\`, pas \`4\`. Pour arrondir, utilisez \`round(3.9)\` qui donne \`4\`.

---

## 📝 Conventions de Nommage

Suivre les conventions rend votre code **lisible** et **professionnel**. En Python, on utilise principalement le **snake_case**.

| Style | Usage | Exemple |
|-------|-------|---------|
| **snake_case** | Variables, fonctions | \`nom_utilisateur\` |
| **UPPER_SNAKE** | Constantes | \`TAUX_TVA\` |
| **PascalCase** | Classes | \`CompteBancaire\` |

\`\`\`python
# ✅ BON - snake_case pour les variables
nom_utilisateur = "Alice"
age_en_annees = 25
est_connecte = True
TAUX_TVA = 0.20  # Constante en MAJUSCULES

# ❌ MAUVAIS - À éviter
NomUtilisateur = "Alice"  # Réservé aux classes
x = 25                     # Pas explicite !
data = [1, 2, 3]           # Trop vague
\`\`\`

> 💡 **Conseil** : Un bon nom de variable **décrit son contenu**. Préférez \`temperature_celsius\` à \`t\` ou \`temp\`.

## Exercices 🎯

### Exercice 1 : Variables
\`\`\`python
# Calculer l'aire d'un cercle
rayon = 5
PI = 3.14159
aire = PI * rayon ** 2
print(f"Aire du cercle: {aire}")
\`\`\`

### Exercice 2 : Conversion
\`\`\`python
# Celsius → Fahrenheit
celsius = 25
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}°C = {fahrenheit}°F")
\`\`\`
`,

    '02-strings': `
# Module 2 : Chaînes de Caractères (Strings)

## Création de Strings

\`\`\`python
# Guillemets simples ou doubles
simple = 'Hello, World!'
double = "Hello, World!"

# Multiligne avec triple guillemets
multi = '''Ceci est
un texte
sur plusieurs lignes'''

# Caractères spéciaux
nouvelle_ligne = "Ligne 1\\nLigne 2"
tabulation = "Col1\\tCol2"
guillemet = "Il a dit \\"Bonjour\\""
\`\`\`

## Indexation et Slicing

\`\`\`python
texte = "Python"
#        012345  (index positif)
#       -6-5-4-3-2-1  (index négatif)

# Indexation
print(texte[0])   # 'P' (premier caractère)
print(texte[-1])  # 'n' (dernier caractère)

# Slicing [start:end:step]
print(texte[0:3])   # 'Pyt' (index 0, 1, 2)
print(texte[3:])    # 'hon' (à partir de l'index 3)
print(texte[:3])    # 'Pyt' (jusqu'à l'index 3)
print(texte[::2])   # 'Pto' (un caractère sur deux)
print(texte[::-1])  # 'nohtyP' (inversé)
\`\`\`

## Immutabilité

> ⚠️ Les strings sont **immuables** - on ne peut pas les modifier après création.

\`\`\`python
texte = "Hello"
# texte[0] = "h"  # ❌ ERREUR !

# Il faut créer une nouvelle string
texte = "h" + texte[1:]  # "hello"
\`\`\`

## Méthodes de Strings

\`\`\`python
texte = "  Hello, World!  "

# Casse
print(texte.upper())      # "  HELLO, WORLD!  "
print(texte.lower())      # "  hello, world!  "
print(texte.title())      # "  Hello, World!  "
print(texte.capitalize()) # "  hello, world!  "

# Nettoyage
print(texte.strip())      # "Hello, World!" (enlève espaces)
print(texte.lstrip())     # "Hello, World!  "
print(texte.rstrip())     # "  Hello, World!"

# Recherche
print(texte.find("World"))     # 9 (index de début)
print(texte.count("l"))        # 3
print("Hello" in texte)        # True

# Remplacement
print(texte.replace("World", "Python"))  # "  Hello, Python!  "

# Découpage et jonction
mots = "a,b,c".split(",")      # ['a', 'b', 'c']
joint = "-".join(['a', 'b'])   # "a-b"
\`\`\`

## Formatage de Strings

### F-Strings (Moderne ✅)

\`\`\`python
nom = "Alice"
age = 25

# F-string basique
print(f"Je m'appelle {nom} et j'ai {age} ans")

# Expressions dans les accolades
print(f"Dans 10 ans: {age + 10} ans")

# Formatage de nombres
prix = 19.99
print(f"Prix: {prix:.2f} €")      # "Prix: 19.99 €"
print(f"Grand: {1000000:,}")      # "Grand: 1,000,000"
print(f"Pourcent: {0.85:.1%}")    # "Pourcent: 85.0%"

# Alignement
print(f"{'gauche':<10}|")   # "gauche    |"
print(f"{'droite':>10}|")   # "    droite|"
print(f"{'centre':^10}|")   # "  centre  |"
\`\`\`

### Méthode .format() (Ancien)

\`\`\`python
print("Je m'appelle {} et j'ai {} ans".format(nom, age))
print("Je m'appelle {0} et j'ai {1} ans".format(nom, age))
print("Je m'appelle {n} et j'ai {a} ans".format(n=nom, a=age))
\`\`\`

## Exercices 🎯

\`\`\`python
# Exercice 1 : Manipulation
phrase = "python est génial"
# Transformer en "Python Est Génial"
print(phrase.title())

# Exercice 2 : Extraction
email = "utilisateur@example.com"
# Extraire le domaine
domaine = email.split("@")[1]
print(domaine)  # "example.com"
\`\`\`
`,

    '03-listes': `
# Module 3 : Listes

Les listes sont des **séquences ordonnées et mutables** d'éléments. C'est la structure de données **la plus utilisée** en Python car elle est à la fois flexible et puissante.

---

## 🧠 Pourquoi Utiliser des Listes ?

Imaginez que vous devez gérer **plusieurs données similaires**. Sans liste, vous devriez créer une variable pour chaque élément :

\`\`\`python
# ❌ SANS LISTE - Cauchemar à maintenir !
note1 = 15
note2 = 18
note3 = 12
note4 = 20
# Et si vous avez 100 notes ?

# ✅ AVEC LISTE - Simple et flexible !
notes = [15, 18, 12, 20]
# Facilement extensible à 100, 1000 notes...
\`\`\`

### Schéma Mental

\`\`\`
      Index:    0        1        2        3
              ┌────┬────┬────┬────┐
   Liste  →   │ 15 │ 18 │ 12 │ 20 │
              └────┴────┴────┴────┘
              
   Accès:  notes[0] = 15
           notes[-1] = 20 (dernier élément)
\`\`\`

### Cas d'Usage Concrets

| Situation | Exemple de liste |
|-----------|------------------|
| 📋 **Todo list** | \`["Faire courses", "Appeler maman", "Coder"]\` |
| 📊 **Notes d'étudiants** | \`[15, 18, 12, 20, 14]\` |
| 🛒 **Panier d'achat** | \`["Pommes", "Pain", "Lait"]\` |
| 📁 **Fichiers à traiter** | \`["data1.csv", "data2.csv", "data3.csv"]\` |
| 👥 **Utilisateurs connectés** | \`["alice", "bob", "charlie"]\` |
| 🎮 **Scores de jeu** | \`[1500, 2300, 1800, 3200]\` |

> 💡 **Règle d'or** : Utilisez une liste dès que vous avez **plusieurs éléments du même type** à gérer ensemble.

---

## 📦 Création de Listes

\`\`\`python
# Liste vide
vide = []
vide = list()

# Liste avec éléments
nombres = [1, 2, 3, 4, 5]
mixte = [1, "hello", 3.14, True]  # Types mixtes possibles

# Liste de listes (matrice 2D)
matrice = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
\`\`\`

## Indexation et Slicing

\`\`\`python
fruits = ["pomme", "banane", "cerise", "datte"]
#           0         1         2        3
#          -4        -3        -2       -1

print(fruits[0])      # "pomme"
print(fruits[-1])     # "datte"
print(fruits[1:3])    # ["banane", "cerise"]
print(fruits[::-1])   # Liste inversée

# Accès matrice
print(matrice[1][2])  # 6 (ligne 1, colonne 2)
\`\`\`

## Modifier une Liste

\`\`\`python
fruits = ["pomme", "banane", "cerise"]

# Modification
fruits[0] = "ananas"

# Ajout
fruits.append("datte")          # À la fin
fruits.insert(1, "kiwi")        # À l'index 1
fruits.extend(["figue", "raisin"])  # Ajouter plusieurs

# Suppression
fruits.remove("banane")         # Par valeur
del fruits[0]                   # Par index
dernier = fruits.pop()          # Retire et retourne le dernier
premier = fruits.pop(0)         # Retire et retourne l'index 0

# Vider
fruits.clear()
\`\`\`

## Méthodes Utiles

\`\`\`python
nombres = [3, 1, 4, 1, 5, 9, 2, 6]

# Tri
nombres.sort()              # Tri en place
nombres.sort(reverse=True)  # Tri décroissant
triee = sorted(nombres)     # Nouvelle liste triée

# Inversion
nombres.reverse()

# Recherche
print(nombres.index(4))   # Index de la première occurrence
print(nombres.count(1))   # Nombre d'occurrences
print(4 in nombres)       # True/False

# Longueur
print(len(nombres))

# Min/Max/Sum
print(min(nombres))
print(max(nombres))
print(sum(nombres))
\`\`\`

## List Comprehensions

> 💡 Syntaxe élégante pour créer des listes.

\`\`\`python
# Traditionnel
carres = []
for x in range(10):
    carres.append(x ** 2)

# List Comprehension
carres = [x ** 2 for x in range(10)]

# Avec condition
pairs = [x for x in range(20) if x % 2 == 0]

# Avec expression conditionnelle
parite = ["pair" if x % 2 == 0 else "impair" for x in range(5)]

# Imbriqué
matrice_aplatie = [x for ligne in matrice for x in ligne]
\`\`\`

## Copie de Listes

> ⚠️ Attention aux références !

\`\`\`python
original = [1, 2, [3, 4]]

# Copie superficielle (shallow copy)
copie1 = original.copy()
copie2 = original[:]
copie3 = list(original)

# Copie profonde (deep copy)
import copy
copie_profonde = copy.deepcopy(original)

# Problème avec copie superficielle
original[2][0] = 999
print(copie1[2][0])          # 999 ! (modifié aussi)
print(copie_profonde[2][0])  # 3 (indépendant)
\`\`\`

## Exercices 🎯

\`\`\`python
# Exercice 1 : Filtrer les pairs
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
pairs = [n for n in nombres if n % 2 == 0]
print(pairs)  # [2, 4, 6, 8, 10]

# Exercice 2 : Calculer la moyenne
def moyenne(liste):
    return sum(liste) / len(liste)

print(moyenne([85, 90, 78, 92, 88]))  # 86.6
\`\`\`
`,

    '04-dictionnaires': `
# Module 4 : Dictionnaires

Les dictionnaires sont l'une des structures de données **les plus puissantes** de Python. Ils stockent des paires **clé-valeur** et permettent un accès ultra-rapide (O(1)) à n'importe quelle valeur via sa clé.

---

## 🧠 Pourquoi Utiliser un Dictionnaire ?

### Le Problème avec les Listes

Avec une liste, pour trouver une information, vous devez **connaître sa position** (index). C'est peu pratique pour des données structurées :

\`\`\`python
# ❌ AVEC LISTE - Confus et fragile !
utilisateur = ["Alice", 25, "alice@email.com", "Paris"]
# Qu'est-ce que utilisateur[2] ?
# Si on ajoute un champ, tous les index changent !

# ✅ AVEC DICTIONNAIRE - Clair et robuste !
utilisateur = {
    "nom": "Alice",
    "age": 25,
    "email": "alice@email.com",
    "ville": "Paris"
}
# utilisateur["email"] → toujours explicite !
\`\`\`

### Schéma Mental : L'Annuaire Téléphonique

Un dictionnaire fonctionne comme un **annuaire** : vous cherchez par le nom (la clé) et vous obtenez le numéro (la valeur).

\`\`\`
┌─────────────────────────────────────┐
│           DICTIONNAIRE              │
├──────────────┬──────────────────────┤
│     CLÉ      │       VALEUR         │
├──────────────┼──────────────────────┤
│    "nom"     │      "Alice"         │
│    "age"     │        25            │
│   "ville"    │      "Paris"         │
└──────────────┴──────────────────────┘
\`\`\`

### Avantages du Dictionnaire

| Liste | Dictionnaire |
|-------|--------------|
| Accès par **position** (index) | Accès par **nom** (clé) |
| Ordre implicite (0, 1, 2...) | Noms explicites |
| Recherche lente O(n) | Recherche instantanée O(1) |
| Pour données **homogènes** | Pour données **structurées** |

### Cas d'Usage Concrets

| Situation | Exemple |
|-----------|---------|
| 👤 **Profil utilisateur** | \`{"nom": "Alice", "age": 25, "email": "..."}\` |
| ⚙️ **Configuration app** | \`{"debug": True, "port": 8080, "theme": "dark"}\` |
| 🔢 **Compteur de mots** | \`{"le": 5, "chat": 3, "et": 2}\` |
| 📊 **Mapping codes** | \`{"FR": "France", "DE": "Allemagne"}\` |
| 🗃️ **Cache/Mémoire** | \`{url: contenu_page for pages}\` |
| 📝 **Réponse API** | Données JSON converties en dict |

> 💡 **Règle d'or** : Utilisez un dictionnaire quand vous avez besoin d'**associer des informations** (nom → valeur) ou de **regrouper des propriétés** liées.

---

## 📦 Création de Dictionnaires

### Syntaxe de base

\`\`\`python
# Dictionnaire vide
vide = {}
vide = dict()

# Avec des données (syntaxe recommandée)
personne = {
    "nom": "Alice",
    "age": 25,
    "ville": "Paris"
}

# Avec dict() et arguments nommés
personne = dict(nom="Alice", age=25, ville="Paris")

# À partir d'une liste de tuples
items = [("a", 1), ("b", 2), ("c", 3)]
d = dict(items)  # {"a": 1, "b": 2, "c": 3}
\`\`\`

> 💡 **Règles sur les clés** : Les clés doivent être **immutables** (str, int, tuple). Les listes ne peuvent PAS être des clés !

---

## 🔑 Accès aux Valeurs

### Deux méthodes d'accès

\`\`\`python
personne = {"nom": "Alice", "age": 25}

# Méthode 1 : Accès direct avec []
print(personne["nom"])     # "Alice"
# ⚠️ ATTENTION : KeyError si la clé n'existe pas !
# print(personne["email"])  # KeyError !

# Méthode 2 : Avec get() - RECOMMANDÉ
print(personne.get("age"))           # 25
print(personne.get("email"))         # None (pas d'erreur !)
print(personne.get("email", "N/A"))  # "N/A" (valeur par défaut)
\`\`\`

### Vérifier l'existence d'une clé

\`\`\`python
personne = {"nom": "Alice", "age": 25}

# Avec l'opérateur 'in'
if "nom" in personne:
    print("La clé 'nom' existe")

if "email" not in personne:
    print("Pas d'email enregistré")
\`\`\`

> 📝 **Bonne pratique** : Utilisez toujours \`.get()\` quand vous n'êtes pas sûr que la clé existe !

---

## ✏️ Modification d'un Dictionnaire

\`\`\`python
personne = {"nom": "Alice", "age": 25}

# Ajouter ou modifier une valeur
personne["email"] = "alice@example.com"  # Ajoute
personne["age"] = 26                      # Modifie

# Mise à jour multiple avec update()
personne.update({
    "ville": "Lyon",
    "profession": "Développeuse"
})

# setdefault - ajoute SEULEMENT si la clé n'existe pas
personne.setdefault("pays", "France")  # Ajoute
personne.setdefault("nom", "Bob")      # Ne fait rien (nom existe déjà)
\`\`\`

### Suppression d'éléments

\`\`\`python
personne = {"nom": "Alice", "age": 25, "ville": "Paris"}

# del - Supprime par clé
del personne["ville"]

# pop() - Supprime ET retourne la valeur
age = personne.pop("age")  # age = 25, clé supprimée

# pop() avec valeur par défaut (évite KeyError)
email = personne.pop("email", "Pas d'email")

# popitem() - Supprime le dernier élément ajouté
cle, valeur = personne.popitem()

# clear() - Vide le dictionnaire
personne.clear()  # {}
\`\`\`

---

## 🔄 Parcourir un Dictionnaire

\`\`\`python
personne = {"nom": "Alice", "age": 25, "ville": "Paris"}

# ✅ Parcourir les clés (par défaut)
for cle in personne:  # ou personne.keys()
    print(cle)

# ✅ Parcourir les valeurs
for valeur in personne.values():
    print(valeur)

# ✅ Parcourir clés ET valeurs (RECOMMANDÉ)
for cle, valeur in personne.items():
    print(f"{cle}: {valeur}")
\`\`\`

---

## 🗃️ Dictionnaires Imbriqués

Les dictionnaires peuvent contenir d'autres dictionnaires, créant des structures complexes.

\`\`\`python
utilisateurs = {
    "user1": {
        "nom": "Alice",
        "scores": [95, 87, 92],
        "actif": True
    },
    "user2": {
        "nom": "Bob",
        "scores": [78, 85, 90],
        "actif": False
    }
}

# Accès aux données imbriquées
print(utilisateurs["user1"]["nom"])        # "Alice"
print(utilisateurs["user1"]["scores"][0])  # 95

# Modifier une valeur imbriquée
utilisateurs["user1"]["actif"] = False
\`\`\`

---

## 🎯 Dict Comprehensions

Syntaxe élégante pour créer des dictionnaires en une ligne.

\`\`\`python
# Créer un dictionnaire de carrés
carres = {x: x**2 for x in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Avec condition (filtrer les pairs)
pairs = {k: v for k, v in carres.items() if v % 2 == 0}
# {2: 4, 4: 16}

# Inverser clés et valeurs
inverse = {v: k for k, v in carres.items()}
# {1: 1, 4: 2, 9: 3, 16: 4, 25: 5}

# Transformer une liste en dictionnaire
fruits = ["pomme", "banane", "cerise"]
longueurs = {fruit: len(fruit) for fruit in fruits}
# {"pomme": 5, "banane": 6, "cerise": 6}
\`\`\`

---

## 📋 Cas d'Usage Courants

| Cas d'usage | Exemple |
|-------------|---------|
| Configuration | \`{"debug": True, "port": 8080}\` |
| Cache | \`{url: contenu for url in pages}\` |
| Comptage | \`{"a": 3, "b": 1, "c": 2}\` |
| Mapping | \`{"lundi": 1, "mardi": 2, ...}\` |
| Base de données simple | \`{id: user for users}\` |

---

## Exercices 🎯

### Exercice 1 : Compter les mots
\`\`\`python
texte = "le chat et le chien et le chat"
mots = texte.split()
compteur = {}
for mot in mots:
    compteur[mot] = compteur.get(mot, 0) + 1
print(compteur)  # {'le': 3, 'chat': 2, 'et': 2, 'chien': 1}
\`\`\`

### Exercice 2 : Mini-annuaire
\`\`\`python
annuaire = {}

def ajouter_contact(nom, telephone):
    annuaire[nom] = telephone

def chercher(nom):
    return annuaire.get(nom, "Non trouvé")

ajouter_contact("Alice", "0601020304")
print(chercher("Alice"))  # "0601020304"
print(chercher("Bob"))    # "Non trouvé"
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/04-dictionnaires-exercice.py\`
`,

    '05-tuples-sets': `
# Module 5 : Tuples et Sets

Ce module couvre deux structures de données essentielles : les **tuples** (séquences immuables) et les **sets** (ensembles d'éléments uniques). Chacune a des cas d'usage bien spécifiques.

---

## 🔒 Tuples : Séquences Immuables

Un tuple est comme une liste, mais **immuable** : une fois créé, on ne peut plus le modifier. C'est parfait pour des données qui ne doivent pas changer.

### Schéma Mental

\`\`\`
TUPLE                          LISTE
┌───┬───┬───┬───┐              ┌───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │   🔒 Verrou  │ 1 │ 2 │ 3 │ 4 │   ✏️ Modifiable
└───┴───┴───┴───┘              └───┴───┴───┴───┘
  Création unique               Ajout/Suppression/Modification
\`\`\`

### Création de Tuples

\`\`\`python
# Tuple vide
vide = ()
vide = tuple()

# Avec éléments
coords = (10, 20)
personne = ("Alice", 25, "Paris")

# Sans parenthèses (packing implicite)
point = 3, 4  # Crée aussi un tuple !

# ⚠️ PIÈGE : Tuple d'un seul élément
un_element = (42,)  # ✅ Tuple (virgule obligatoire !)
pas_tuple = (42)    # ❌ C'est juste l'entier 42

print(type(un_element))  # <class 'tuple'>
print(type(pas_tuple))   # <class 'int'>
\`\`\`

> 💡 **Règle d'or** : Un tuple d'un seul élément nécessite une virgule : \`(valeur,)\`

---

## 📦 Unpacking : La Magie des Tuples

L'**unpacking** permet d'extraire les valeurs d'un tuple dans plusieurs variables en une seule ligne.

\`\`\`python
# Unpacking basique
coords = (10, 20)
x, y = coords  # x = 10, y = 20

# Unpacking d'une séquence
personne = ("Alice", 25, "Paris")
nom, age, ville = personne

# Unpacking avec * (rest operator)
nombres = (1, 2, 3, 4, 5)
premier, *reste = nombres
# premier = 1, reste = [2, 3, 4, 5]

*debut, dernier = nombres
# debut = [1, 2, 3, 4], dernier = 5

premier, *milieu, dernier = nombres
# premier = 1, milieu = [2, 3, 4], dernier = 5
\`\`\`

### L'Échange de Variables (Astuce Python)

\`\`\`python
a = 10
b = 20

# En une seule ligne !
a, b = b, a

print(a)  # 20
print(b)  # 10
\`\`\`

---

## 🔄 Retourner Plusieurs Valeurs

Les fonctions Python peuvent retourner plusieurs valeurs grâce aux tuples.

\`\`\`python
def min_max(liste):
    """Retourne le minimum et maximum d'une liste."""
    return min(liste), max(liste)  # Retourne un tuple

# Unpacking du résultat
mini, maxi = min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(f"Min: {mini}, Max: {maxi}")  # Min: 1, Max: 9

# Ou récupérer le tuple entier
resultat = min_max([3, 1, 4, 1, 5])
print(resultat)        # (1, 5)
print(resultat[0])     # 1 (minimum)
\`\`\`

---

## 📊 Tuple vs Liste : Comparaison

| Critère | Tuple | Liste |
|---------|-------|-------|
| Mutabilité | 🔒 Immuable | ✏️ Mutable |
| Mémoire | Plus léger | Plus lourd |
| Hashable | ✅ Oui (clé de dict) | ❌ Non |
| Cas d'usage | Données fixes | Données variables |
| Performance | Plus rapide | Plus lent |

\`\`\`python
# Un tuple peut être une clé de dictionnaire !
positions = {
    (0, 0): "origine",
    (1, 0): "droite",
    (0, 1): "haut"
}
print(positions[(0, 0)])  # "origine"

# Une liste ne peut PAS être une clé
# positions[[0, 0]] = "erreur"  # TypeError !
\`\`\`

---

## 🎯 Sets : Ensembles d'Éléments Uniques

Un **set** est une collection **non ordonnée** d'éléments **uniques**. Idéal pour éliminer les doublons et tester l'appartenance.

### Création de Sets

\`\`\`python
# Set vide
vide = set()  # ⚠️ Pas {} qui crée un dict vide !

# Avec éléments
fruits = {"pomme", "banane", "cerise"}

# À partir d'une liste (DÉDOUBLONNE automatiquement)
nombres = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = set(nombres)  # {1, 2, 3, 4}
print(f"Avant: {len(nombres)} éléments → Après: {len(unique)} uniques")
\`\`\`

---

## ⚡ Opérations sur les Sets

Les sets supportent les **opérations ensemblistes** mathématiques.

\`\`\`python
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# 🔍 Test d'appartenance (très rapide : O(1))
print(3 in a)  # True
print(9 in a)  # False
\`\`\`

### Diagramme de Venn

\`\`\`
         A             B
     ┌───────┐     ┌───────┐
     │ 1 2 3 │     │ 6 7 8 │
     │   ┌───┼─────┼───┐   │
     │   │ 4 │     │ 5 │   │
     └───┴───┘     └───┴───┘
         Intersection: {4, 5}
\`\`\`

\`\`\`python
# Union (tous les éléments)
print(a | b)   # {1, 2, 3, 4, 5, 6, 7, 8}
print(a.union(b))

# Intersection (éléments communs)
print(a & b)   # {4, 5}
print(a.intersection(b))

# Différence (dans a mais PAS dans b)
print(a - b)   # {1, 2, 3}
print(a.difference(b))

# Différence symétrique (dans l'un OU l'autre, pas les deux)
print(a ^ b)   # {1, 2, 3, 6, 7, 8}
print(a.symmetric_difference(b))
\`\`\`

---

## ✏️ Modification de Sets

\`\`\`python
s = {1, 2, 3}

# Ajouter un élément
s.add(4)  # {1, 2, 3, 4}

# Ajouter plusieurs éléments
s.update([5, 6, 7])  # {1, 2, 3, 4, 5, 6, 7}

# Supprimer un élément
s.remove(7)    # ⚠️ Erreur si absent !
s.discard(10)  # ✅ Pas d'erreur si absent

# Retirer un élément aléatoire
element = s.pop()

# Vider le set
s.clear()  # set()
\`\`\`

---

## 📋 Cas d'Usage Courants

| Cas d'usage | Exemple |
|-------------|---------|
| Dédoublonner | \`list(set(ma_liste))\` |
| Éléments communs | \`set(a) & set(b)\` |
| Test d'appartenance rapide | \`if x in mon_set\` |
| Éliminer les doublons d'emails | \`unique_emails = set(emails)\` |
| Vérifier les permissions | \`user_perms & required_perms\` |

---

## Exercices 🎯

### Exercice 1 : Dédoublonner une liste
\`\`\`python
liste = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = list(set(liste))
print(unique)  # [1, 2, 3, 4] (ordre non garanti)

# Pour préserver l'ordre (Python 3.7+)
unique_ordonne = list(dict.fromkeys(liste))
print(unique_ordonne)  # [1, 2, 3, 4]
\`\`\`

### Exercice 2 : Éléments communs entre deux listes
\`\`\`python
liste1 = [1, 2, 3, 4, 5]
liste2 = [4, 5, 6, 7, 8]
communs = set(liste1) & set(liste2)
print(communs)  # {4, 5}
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/05-tuples-sets-exercice.py\`
`,

    '06-fichiers': `
# Module 6 : Fichiers I/O

La manipulation de fichiers est essentielle pour sauvegarder des données, lire des configurations, ou traiter des logs. Python offre une API simple et puissante avec le **context manager**.

---

## 🔑 Concept Clé : Le Context Manager (with)

Le context manager \`with\` garantit que le fichier sera **toujours fermé**, même en cas d'erreur.

\`\`\`python
# ✅ BONNE PRATIQUE : avec context manager
with open("fichier.txt", "r") as f:
    contenu = f.read()
# Le fichier est automatiquement fermé ici !

# ❌ À ÉVITER : méthode manuelle
f = open("fichier.txt", "r")
contenu = f.read()
f.close()  # Oubli facile = fuite de ressources !
\`\`\`

> 💡 **Pourquoi c'est important ?** Un fichier non fermé peut :
> - Bloquer d'autres programmes
> - Corrompre les données
> - Consommer de la mémoire inutilement

---

## 📖 Modes d'Ouverture

| Mode | Description | Crée le fichier ? |
|------|-------------|-------------------|
| \`r\` | Lecture seule (défaut) | ❌ Erreur si absent |
| \`w\` | Écriture (écrase tout) | ✅ Si absent |
| \`a\` | Ajout à la fin (append) | ✅ Si absent |
| \`r+\` | Lecture + écriture | ❌ Erreur si absent |
| \`x\` | Création exclusive | ❌ Erreur si existe |
| \`rb\` / \`wb\` | Mode binaire | - |

\`\`\`python
# Lecture seule
with open("config.txt", "r") as f:
    pass

# Écriture (EFFACE le contenu existant !)
with open("output.txt", "w") as f:
    pass

# Ajout à la fin (préserve le contenu)
with open("log.txt", "a") as f:
    pass
\`\`\`

---

## 📚 Lecture de Fichiers

### Différentes méthodes de lecture

\`\`\`python
with open("fichier.txt", "r", encoding="utf-8") as f:
    # 1. Lire tout d'un coup (petits fichiers)
    contenu = f.read()
    
    # 2. Lire une seule ligne
    f.seek(0)  # Revenir au début
    premiere_ligne = f.readline()
    
    # 3. Lire toutes les lignes comme liste
    f.seek(0)
    lignes = f.readlines()  # ["ligne1\\n", "ligne2\\n", ...]
\`\`\`

### Itération efficace (gros fichiers)

Pour les gros fichiers, itérer ligne par ligne est **beaucoup plus efficace** en mémoire :

\`\`\`python
# ✅ Efficace : une ligne à la fois en mémoire
with open("gros_fichier.log", "r") as f:
    for ligne in f:
        print(ligne.strip())  # .strip() enlève \\n

# ❌ Risqué : tout en mémoire d'un coup
with open("gros_fichier.log", "r") as f:
    lignes = f.readlines()  # Peut crasher si fichier énorme!
\`\`\`

---

## ✏️ Écriture de Fichiers

\`\`\`python
# Écrire du texte (écrase le contenu existant)
with open("sortie.txt", "w", encoding="utf-8") as f:
    f.write("Première ligne\\n")
    f.write("Deuxième ligne\\n")

# Ajouter à la fin d'un fichier existant
with open("log.txt", "a", encoding="utf-8") as f:
    f.write("[INFO] Nouvelle entrée\\n")

# Écrire plusieurs lignes d'un coup
lignes = ["Ligne 1\\n", "Ligne 2\\n", "Ligne 3\\n"]
with open("sortie.txt", "w") as f:
    f.writelines(lignes)
\`\`\`

> ⚠️ **Attention** : \`write()\` n'ajoute pas automatiquement \`\\n\`. Vous devez le faire vous-même !

---

## 🌍 Encodage : UTF-8

Toujours spécifier l'encodage pour éviter les problèmes avec les accents et caractères spéciaux.

\`\`\`python
# ✅ Toujours spécifier l'encodage
with open("fichier.txt", "r", encoding="utf-8") as f:
    contenu = f.read()

# ❌ Sans encodage = problèmes possibles
with open("fichier.txt", "r") as f:  # Encodage par défaut du système
    contenu = f.read()  # Peut échouer avec des accents !
\`\`\`

---

## 📁 Fichiers JSON

JSON est le format standard pour échanger des données structurées.

\`\`\`python
import json

# Données Python
utilisateur = {
    "nom": "Alice",
    "age": 25,
    "hobbies": ["lecture", "musique"],
    "actif": True
}

# ÉCRIRE en JSON
with open("user.json", "w", encoding="utf-8") as f:
    json.dump(utilisateur, f, indent=2, ensure_ascii=False)

# LIRE du JSON
with open("user.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(data["nom"])  # "Alice"
\`\`\`

### JSON vers/depuis string

\`\`\`python
# Python → String JSON
json_str = json.dumps(utilisateur, indent=2)
print(json_str)

# String JSON → Python
data = json.loads('{"nom": "Bob", "age": 30}')
print(data["nom"])  # "Bob"
\`\`\`

---

## 🗂️ Gestion des Chemins

Le module \`os\` permet de manipuler les chemins de fichiers de manière portable.

\`\`\`python
import os

# Répertoire de travail actuel
print(os.getcwd())

# Vérifier si un fichier/dossier existe
print(os.path.exists("config.json"))  # True/False
print(os.path.isfile("config.json"))  # Est-ce un fichier ?
print(os.path.isdir("data/"))         # Est-ce un dossier ?

# Construire un chemin (portable Windows/Linux)
chemin = os.path.join("data", "users", "alice.json")
# → "data/users/alice.json" ou "data\\\\users\\\\alice.json"

# Lister les fichiers d'un dossier
fichiers = os.listdir(".")
print(fichiers)

# Obtenir le nom de fichier et l'extension
nom, ext = os.path.splitext("rapport.pdf")
print(nom)  # "rapport"
print(ext)  # ".pdf"
\`\`\`

---

## ⚠️ Gestion des Erreurs

\`\`\`python
try:
    with open("fichier_inexistant.txt", "r") as f:
        contenu = f.read()
except FileNotFoundError:
    print("Le fichier n'existe pas !")
except PermissionError:
    print("Pas les droits pour lire ce fichier !")
except Exception as e:
    print(f"Erreur inattendue : {e}")
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Compter les lignes
\`\`\`python
def compter_lignes(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        return len(f.readlines())

print(compter_lignes("mon_fichier.txt"))
\`\`\`

### Exercice 2 : Sauvegarder un dictionnaire en JSON
\`\`\`python
import json

def sauvegarder(data, chemin):
    with open(chemin, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def charger(chemin):
    with open(chemin, "r", encoding="utf-8") as f:
        return json.load(f)

# Usage
config = {"debug": True, "version": "1.0"}
sauvegarder(config, "config.json")
config_lu = charger("config.json")
print(config_lu)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/06-fichiers-exercice.py\`
`,

    '07-comparaisons': `
# Module 7 : Opérateurs de Comparaison

## Opérateurs de Comparaison

| Opérateur | Description | Exemple |
|-----------|-------------|---------|
| \`==\` | Égal | \`5 == 5\` → \`True\` |
| \`!=\` | Différent | \`5 != 3\` → \`True\` |
| \`<\` | Inférieur | \`3 < 5\` → \`True\` |
| \`>\` | Supérieur | \`5 > 3\` → \`True\` |
| \`<=\` | Inférieur ou égal | \`5 <= 5\` → \`True\` |
| \`>=\` | Supérieur ou égal | \`5 >= 3\` → \`True\` |

\`\`\`python
x = 10

print(x == 10)   # True
print(x != 5)    # True
print(x > 5)     # True
print(x < 20)    # True

# Enchaînement
print(1 < x < 20)    # True (équivalent à 1 < x and x < 20)
print(5 <= x <= 15)  # True
\`\`\`

## Opérateurs Logiques

\`\`\`python
a = True
b = False

print(a and b)  # False (ET)
print(a or b)   # True (OU)
print(not a)    # False (NON)

# Combinaisons
x = 10
print(x > 5 and x < 20)   # True
print(x < 5 or x > 8)     # True
print(not (x == 10))      # False
\`\`\`

## Opérateurs d'Appartenance

\`\`\`python
liste = [1, 2, 3, 4, 5]
texte = "Hello, World!"

print(3 in liste)          # True
print(6 in liste)          # False
print(6 not in liste)      # True
print("World" in texte)    # True
print("hello" in texte)    # False (case-sensitive)
\`\`\`

## Opérateurs d'Identité

\`\`\`python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

# == compare les valeurs
print(a == b)   # True

# is compare l'identité (même objet en mémoire)
print(a is b)   # False (objets différents)
print(a is c)   # True (même objet)

# None doit être comparé avec is
x = None
print(x is None)      # ✅ Correct
print(x == None)      # ⚠️ Fonctionne mais déconseillé
\`\`\`

## Exercices 🎯

\`\`\`python
# Exercice : Vérifier si un nombre est dans une plage
def dans_plage(n, min_val, max_val):
    return min_val <= n <= max_val

print(dans_plage(5, 1, 10))   # True
print(dans_plage(15, 1, 10))  # False
\`\`\`
`,

    '08-conditions': `
# Module 8 : Conditions (if/elif/else)

## Structure if

\`\`\`python
age = 18

if age >= 18:
    print("Vous êtes majeur")
\`\`\`

## if/else

\`\`\`python
age = 16

if age >= 18:
    print("Majeur")
else:
    print("Mineur")
\`\`\`

## if/elif/else

\`\`\`python
note = 75

if note >= 90:
    mention = "Excellent"
elif note >= 80:
    mention = "Très bien"
elif note >= 70:
    mention = "Bien"
elif note >= 60:
    mention = "Passable"
else:
    mention = "Insuffisant"

print(f"Mention: {mention}")
\`\`\`

## Conditions Imbriquées

\`\`\`python
age = 25
revenu = 30000

if age >= 18:
    if revenu >= 25000:
        print("Éligible au prêt")
    else:
        print("Revenu insuffisant")
else:
    print("Trop jeune")
\`\`\`

## Opérateur Ternaire

\`\`\`python
age = 20

# Syntaxe: valeur_si_vrai if condition else valeur_si_faux
statut = "Majeur" if age >= 18 else "Mineur"

# Équivalent à:
if age >= 18:
    statut = "Majeur"
else:
    statut = "Mineur"
\`\`\`

## Match-Case (Python 3.10+)

\`\`\`python
commande = "start"

match commande:
    case "start":
        print("Démarrage...")
    case "stop":
        print("Arrêt...")
    case "pause" | "suspend":  # Plusieurs valeurs
        print("Pause...")
    case _:  # Cas par défaut
        print("Commande inconnue")
\`\`\`

## Exercices 🎯

\`\`\`python
# Exercice 1 : Calculateur de mention
def calculer_mention(note):
    if note >= 16:
        return "Très Bien"
    elif note >= 14:
        return "Bien"
    elif note >= 12:
        return "Assez Bien"
    elif note >= 10:
        return "Passable"
    else:
        return "Ajourné"

# Exercice 2 : Année bissextile
def est_bissextile(annee):
    return (annee % 4 == 0 and annee % 100 != 0) or (annee % 400 == 0)
\`\`\`
`,

    '09-boucles': `
# Module 9 : Boucles (for/while)

## Boucle for

\`\`\`python
# Itérer sur une liste
fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(fruit)

# Itérer sur une string
for lettre in "Python":
    print(lettre)

# range()
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8):       # 2, 3, 4, 5, 6, 7
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8
    print(i)
\`\`\`

## enumerate() et zip()

\`\`\`python
fruits = ["pomme", "banane", "cerise"]

# enumerate - index + valeur
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# enumerate avec start
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# zip - itérer sur plusieurs listes
noms = ["Alice", "Bob"]
ages = [25, 30]

for nom, age in zip(noms, ages):
    print(f"{nom} a {age} ans")
\`\`\`

## Boucle while

\`\`\`python
compteur = 0

while compteur < 5:
    print(compteur)
    compteur += 1

# Boucle infinie
while True:
    reponse = input("Continuer ? (o/n): ")
    if reponse == "n":
        break
\`\`\`

## break, continue, pass

\`\`\`python
# break - sortir de la boucle
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - passer à l'itération suivante
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9

# pass - ne rien faire (placeholder)
for i in range(5):
    pass  # À implémenter plus tard
\`\`\`

## Clause else sur les boucles

\`\`\`python
# else s'exécute si la boucle n'a pas été interrompue par break
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print(f"{n} = {x} * {n//x}")
            break
    else:
        # Exécuté si pas de break
        print(f"{n} est premier")
\`\`\`

## Exercices 🎯

\`\`\`python
# Exercice 1 : Table de multiplication
def table_multiplication(n):
    for i in range(1, 11):
        print(f"{n} x {i} = {n * i}")

# Exercice 2 : Fizz Buzz
for i in range(1, 101):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
\`\`\`
`,

    '10-fonctions-utiles': `
# Module 10 : Fonctions Built-in Utiles

## map()

Applique une fonction à chaque élément.

\`\`\`python
nombres = [1, 2, 3, 4, 5]

# Avec fonction
def carre(x):
    return x ** 2

carres = list(map(carre, nombres))
# [1, 4, 9, 16, 25]

# Avec lambda
carres = list(map(lambda x: x**2, nombres))

# Plusieurs listes
a = [1, 2, 3]
b = [10, 20, 30]
sommes = list(map(lambda x, y: x + y, a, b))
# [11, 22, 33]
\`\`\`

## filter()

Filtre les éléments selon une condition.

\`\`\`python
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Garder les pairs
pairs = list(filter(lambda x: x % 2 == 0, nombres))
# [2, 4, 6, 8, 10]

# Garder les positifs
valeurs = [-2, -1, 0, 1, 2]
positifs = list(filter(lambda x: x > 0, valeurs))
# [1, 2]
\`\`\`

## sorted() et reversed()

\`\`\`python
nombres = [3, 1, 4, 1, 5, 9, 2, 6]

# Tri
trie = sorted(nombres)              # Croissant
trie_desc = sorted(nombres, reverse=True)  # Décroissant

# Tri personnalisé
mots = ["banane", "pomme", "kiwi"]
par_longueur = sorted(mots, key=len)

# Inversé
inv = list(reversed(nombres))
\`\`\`

## any() et all()

\`\`\`python
valeurs = [True, True, False]

print(any(valeurs))  # True (au moins un True)
print(all(valeurs))  # False (pas tous True)

# Utilisation pratique
nombres = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nombres))  # True (tous pairs)

ages = [18, 25, 16, 30]
print(any(age < 18 for age in ages))  # True (au moins un mineur)
\`\`\`

## min(), max(), sum()

\`\`\`python
nombres = [3, 1, 4, 1, 5, 9]

print(min(nombres))      # 1
print(max(nombres))      # 9
print(sum(nombres))      # 23

# Avec clé personnalisée
mots = ["python", "est", "génial"]
print(max(mots, key=len))  # "python"

# Moyenne
moyenne = sum(nombres) / len(nombres)
\`\`\`

## Exercices 🎯

\`\`\`python
# Exercice : Pipeline de transformations
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filtrer pairs → Élever au carré → Somme
resultat = sum(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nombres)))
print(resultat)  # 220 (4 + 16 + 36 + 64 + 100)
\`\`\`
`
};

// Import advanced chapters
import { pythonChaptersAdvanced, getAdvancedChapterContent } from './chapters-advanced.js';

// Merge all chapters
const allChapters = { ...pythonChapters, ...pythonChaptersAdvanced };

export const getChapterContent = (chapterId) => {
    return allChapters[chapterId] || null;
};
