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

Les **chaînes de caractères** (strings) sont omniprésentes en programmation. Elles représentent du **texte** : noms d'utilisateurs, messages, URLs, fichiers, logs... Maîtriser les strings est indispensable pour tout développeur Python.

---

## 🧠 Concept Fondamental : Les Strings sont des Séquences

En Python, une string est une **séquence ordonnée de caractères**. Chaque caractère a une position (index) et on peut accéder individuellement à chacun d'eux.

\`\`\`
     Index positif:    0   1   2   3   4   5
                     ┌───┬───┬───┬───┬───┬───┐
       "Python"  →   │ P │ y │ t │ h │ o │ n │
                     └───┴───┴───┴───┴───┴───┘
     Index négatif:   -6  -5  -4  -3  -2  -1
\`\`\`

### Cas d'Usage Concrets

| Situation | Exemple |
|-----------|---------|
| 👤 **Noms d'utilisateur** | \`"alice_dev"\` |
| 📧 **Emails** | \`"alice@example.com"\` |
| 📝 **Messages** | \`"Bienvenue sur notre site !"\` |
| 🔗 **URLs** | \`"https://api.example.com/data"\` |
| 📁 **Chemins de fichiers** | \`"/home/user/document.txt"\` |
| 🔑 **Mots de passe hashés** | \`"a1b2c3d4e5f6..."\` |

> 💡 **À retenir** : En Python, tout texte entre guillemets est une string, même un seul caractère comme \`"a"\` ou un texte vide \`""\`.

---

## 📦 Création de Strings

Python offre plusieurs façons de créer des strings. Chacune a son utilité.

### Guillemets simples ou doubles

Les deux sont **équivalents**. Utilisez l'un ou l'autre selon le contenu de votre texte.

\`\`\`python
# Les deux sont identiques
simple = 'Hello, World!'
double = "Hello, World!"

# Astuce : mélanger pour éviter l'échappement
phrase1 = "L'informatique est fascinante"     # ' dans des "..."
phrase2 = 'Il a dit "Bonjour" en entrant'     # " dans des '...'
\`\`\`

### Strings multilignes

Les **triple guillemets** permettent d'écrire du texte sur plusieurs lignes, idéal pour les longs textes ou la documentation.

\`\`\`python
description = """Ceci est un texte
qui s'étend sur
plusieurs lignes."""

# Souvent utilisé pour les docstrings
def ma_fonction():
    """
    Cette fonction fait quelque chose d'utile.
    Elle prend en compte X et Y.
    """
    pass
\`\`\`

### Caractères spéciaux (séquences d'échappement)

Certains caractères ne peuvent pas être tapés directement. On utilise le **backslash** (\`\\\\\`) pour les représenter.

| Séquence | Signification | Exemple |
|----------|---------------|---------|
| \`\\\\n\` | Nouvelle ligne | \`"Ligne 1\\\\nLigne 2"\` |
| \`\\\\t\` | Tabulation | \`"Col1\\\\tCol2"\` |
| \`\\\\\\\\\` | Backslash | \`"C:\\\\\\\\Users"\` |
| \`\\\\"\` | Guillemet dans un string | \`"Il a dit \\\\"oui\\\\""\` |

\`\`\`python
# Nouvelle ligne
print("Ligne 1\\nLigne 2")
# Affiche :
# Ligne 1
# Ligne 2

# Tabulation (alignement en colonnes)
print("Nom\\tAge\\tVille")
print("Alice\\t25\\tParis")
\`\`\`

> 💡 **Astuce** : Utilisez les **raw strings** (préfixe \`r\`) pour ignorer les séquences d'échappement. C'est utile pour les chemins Windows ou les expressions régulières :
> \`\`\`python
> chemin = r"C:\\Users\\Alice\\Documents"  # Le \\n n'est PAS interprété
> \`\`\`

---

## 🔍 Indexation et Slicing

L'**indexation** permet d'accéder à un caractère précis. Le **slicing** (découpage) permet d'extraire une portion de la string.

### Indexation : accéder à un caractère

\`\`\`python
texte = "Python"

# Index positif (de gauche à droite, commence à 0)
print(texte[0])   # 'P' (premier caractère)
print(texte[3])   # 'h' (quatrième caractère)

# Index négatif (de droite à gauche, commence à -1)
print(texte[-1])  # 'n' (dernier caractère)
print(texte[-2])  # 'o' (avant-dernier)
\`\`\`

> ⚠️ **Attention** : Un index hors limites provoque une erreur \`IndexError\` !
> \`\`\`python
> texte = "Python"
> # print(texte[10])  # IndexError: string index out of range
> \`\`\`

### Slicing : extraire une sous-chaîne

La syntaxe est \`[start:end:step]\` ou \`start\` est **inclus** et \`end\` est **exclu**.

\`\`\`python
texte = "Python"

# [start:end] - De start (inclus) à end (exclu)
print(texte[0:3])   # 'Pyt' (index 0, 1, 2)
print(texte[2:5])   # 'tho' (index 2, 3, 4)

# Raccourcis : omission de start ou end
print(texte[:3])    # 'Pyt' (du début jusqu'à l'index 3)
print(texte[3:])    # 'hon' (de l'index 3 jusqu'à la fin)
print(texte[:])     # 'Python' (copie complète)

# Avec un pas (step)
print(texte[::2])   # 'Pto' (un caractère sur deux)
print(texte[1::2])  # 'yhn' (un sur deux, en partant de l'index 1)

# Inverser une string
print(texte[::-1])  # 'nohtyP' (astuce classique !)
\`\`\`

> 💡 **Astuce mnémotechnique** : Pensez aux index comme les positions **entre** les caractères, pas sur les caractères eux-mêmes.

---

## 🔒 Immutabilité des Strings

C'est un concept **crucial** : les strings Python sont **immuables** (immutable). Une fois créée, une string ne peut **jamais être modifiée en place**.

\`\`\`python
texte = "Hello"

# ❌ IMPOSSIBLE - provoque une erreur
# texte[0] = "h"  # TypeError: 'str' does not support item assignment

# ✅ Solution : créer une NOUVELLE string
texte = "h" + texte[1:]  # "hello"
# Ou utiliser replace()
texte = "Hello".replace("H", "h")  # "hello"
\`\`\`

**Pourquoi c'est important ?** Chaque opération sur une string (concaténation, remplacement, etc.) crée un **nouvel objet** en mémoire. Pour beaucoup de modifications, utilisez plutôt une **liste** puis joignez à la fin.

\`\`\`python
# ❌ LENT : crée une nouvelle string à chaque itération
resultat = ""
for i in range(1000):
    resultat += str(i)  # 1000 nouvelles strings créées !

# ✅ RAPIDE : utiliser une liste puis join()
morceaux = []
for i in range(1000):
    morceaux.append(str(i))
resultat = "".join(morceaux)  # Une seule string créée
\`\`\`

---

## 🛠️ Méthodes de Strings

Python offre une riche collection de méthodes pour manipuler les strings. Elles retournent toujours une **nouvelle string** (car les strings sont immuables).

### Changer la casse

\`\`\`python
texte = "hello World"

print(texte.upper())       # "HELLO WORLD" - tout en majuscules
print(texte.lower())       # "hello world" - tout en minuscules
print(texte.title())       # "Hello World" - première lettre de chaque mot
print(texte.capitalize())  # "Hello world" - première lettre seulement
print(texte.swapcase())    # "HELLO wORLD" - inverse la casse
\`\`\`

> 💡 **Cas d'usage** : \`.lower()\` est essentiel pour les **comparaisons insensibles à la casse** (emails, recherche, etc.)

### Nettoyer une string

Les espaces parasites sont un problème courant, surtout avec les saisies utilisateur.

\`\`\`python
texte = "  Hello, World!  "

print(texte.strip())      # "Hello, World!" - supprime les espaces des deux côtés
print(texte.lstrip())     # "Hello, World!  " - supprime à gauche uniquement
print(texte.rstrip())     # "  Hello, World!" - supprime à droite uniquement

# Supprimer des caractères spécifiques
url = "///page/accueil///"
print(url.strip("/"))     # "page/accueil"
\`\`\`

### Rechercher dans une string

\`\`\`python
texte = "Bonjour Python, bienvenue en Python !"

# Trouver la position d'une sous-chaîne
print(texte.find("Python"))      # 8 (première occurrence)
print(texte.rfind("Python"))     # 31 (dernière occurrence)
print(texte.find("Java"))        # -1 (non trouvé)

# Compter les occurrences
print(texte.count("Python"))     # 2

# Vérifier le contenu
print(texte.startswith("Bonjour"))  # True
print(texte.endswith("!"))          # True

# L'opérateur 'in' pour vérifier la présence
print("Python" in texte)            # True
print("Java" not in texte)          # True
\`\`\`

> 📝 **Différence \`find()\` vs \`index()\`** : \`.find()\` retourne \`-1\` si non trouvé, \`.index()\` lève une erreur \`ValueError\`.

### Remplacer du texte

\`\`\`python
texte = "Hello World"

# Remplacer une sous-chaîne
print(texte.replace("World", "Python"))  # "Hello Python"

# Remplacer toutes les occurrences
phrase = "le chat et le chien et le poisson"
print(phrase.replace("le", "un"))  # "un chat et un chien et un poisson"

# Limiter le nombre de remplacements
print(phrase.replace("le", "un", 1))  # "un chat et le chien et le poisson"
\`\`\`

### Découper et joindre

Ces deux opérations sont **complémentaires** et extrêmement utiles.

\`\`\`python
# split() : String → Liste
csv_line = "Alice,25,Paris,alice@email.com"
champs = csv_line.split(",")
print(champs)  # ['Alice', '25', 'Paris', 'alice@email.com']

# Découper par espaces (par défaut)
phrase = "Python est   génial"
mots = phrase.split()  # Gère les espaces multiples !
print(mots)  # ['Python', 'est', 'génial']

# join() : Liste → String
mots = ['Python', 'est', 'génial']
phrase = " ".join(mots)
print(phrase)  # "Python est génial"

# Joindre avec un séparateur
chemin = "/".join(["home", "user", "documents"])
print(chemin)  # "home/user/documents"
\`\`\`

> 💡 **Pattern courant** : \`split()\` + transformation + \`join()\` pour transformer du texte efficacement.

### Vérifier le type de contenu

\`\`\`python
# Vérifier si la string contient uniquement...
print("123".isdigit())     # True - que des chiffres
print("abc".isalpha())     # True - que des lettres
print("abc123".isalnum())  # True - lettres et chiffres
print("   ".isspace())     # True - que des espaces
print("Hello".isupper())   # False - pas tout en majuscules
print("hello".islower())   # True - tout en minuscules
\`\`\`

---

## 📝 Formatage de Strings

Le formatage permet d'**insérer des valeurs** dans un texte. C'est essentiel pour créer des messages dynamiques, des rapports, des logs...

### F-Strings (Python 3.6+) - La méthode moderne

Les **f-strings** sont la façon la plus lisible et la plus rapide de formater du texte en Python.

\`\`\`python
nom = "Alice"
age = 25

# Insertion simple de variables
print(f"Je m'appelle {nom} et j'ai {age} ans")

# Expressions Python dans les accolades
print(f"Dans 10 ans, j'aurai {age + 10} ans")
print(f"Mon nom en majuscules : {nom.upper()}")
print(f"2 + 3 = {2 + 3}")
\`\`\`

### Formatage avancé des nombres

\`\`\`python
prix = 19.99
pourcentage = 0.8567
grand_nombre = 1234567

# Décimales
print(f"Prix: {prix:.2f} euros")        # "Prix: 19.99 euros"
print(f"Arrondi: {prix:.0f} euros")     # "Arrondi: 20 euros"

# Pourcentage
print(f"Taux: {pourcentage:.1%}")       # "Taux: 85.7%"

# Séparateur de milliers
print(f"Population: {grand_nombre:,}")  # "Population: 1,234,567"
print(f"Montant: {grand_nombre:_.2f}")  # "Montant: 1_234_567.00"
\`\`\`

### Alignement et remplissage

Utile pour créer des tableaux ou des affichages formatés.

\`\`\`python
# Alignement dans un espace de 15 caractères
print(f"{'gauche':<15}|")   # "gauche         |" (aligné à gauche)
print(f"{'droite':>15}|")   # "         droite|" (aligné à droite)
print(f"{'centre':^15}|")   # "    centre     |" (centré)

# Avec un caractère de remplissage
print(f"{'titre':=^30}")    # "============titre============="
print(f"{'42':0>5}")        # "00042" (padding avec des zéros)
\`\`\`

### Méthode .format() (alternative)

Moins concise que les f-strings, mais encore utilisée dans certains contextes (traductions, templates).

\`\`\`python
# Avec positions
print("Je m'appelle {} et j'ai {} ans".format(nom, age))

# Avec indices
print("{0} a {1} ans. {0} habite à Paris".format(nom, age))

# Avec noms
print("{n} a {a} ans".format(n=nom, a=age))
\`\`\`

> 💡 **Recommandation** : Utilisez les **f-strings** dans la majorité des cas. Elles sont plus lisibles, plus rapides, et plus modernes.

---

## 🔗 Concaténation et Répétition

### Concaténation (+)

\`\`\`python
prenom = "Alice"
nom = "Dupont"

# Concaténation simple
nom_complet = prenom + " " + nom
print(nom_complet)  # "Alice Dupont"

# ⚠️ On ne peut concaténer que des strings entre elles
age = 25
# print("Age: " + age)         # ❌ TypeError !
print("Age: " + str(age))      # ✅ "Age: 25"
print(f"Age: {age}")           # ✅ Plus simple avec f-string
\`\`\`

### Répétition (*)

\`\`\`python
# Répéter une string
tirets = "-" * 40
print(tirets)  # "----------------------------------------"

# Utile pour la mise en forme
print("=" * 30)
print("   TITRE DU PROGRAMME   ")
print("=" * 30)
\`\`\`

---

## 📋 Récapitulatif des Méthodes

| Catégorie | Méthodes principales |
|-----------|---------------------|
| **Casse** | \`.upper()\`, \`.lower()\`, \`.title()\`, \`.capitalize()\` |
| **Nettoyage** | \`.strip()\`, \`.lstrip()\`, \`.rstrip()\` |
| **Recherche** | \`.find()\`, \`.index()\`, \`.count()\`, \`in\` |
| **Remplacement** | \`.replace()\` |
| **Découpage** | \`.split()\`, \`.join()\` |
| **Vérification** | \`.startswith()\`, \`.endswith()\`, \`.isdigit()\`, \`.isalpha()\` |
| **Formatage** | f-strings, \`.format()\` |

---

## Exercices 🎯

### Exercice 1 : Manipulation de casse
\`\`\`python
phrase = "python est génial"
# Transformer en "Python Est Génial"
print(phrase.title())  # "Python Est Génial"
\`\`\`

### Exercice 2 : Extraction de domaine
\`\`\`python
email = "utilisateur@example.com"
# Extraire le domaine
domaine = email.split("@")[1]
print(domaine)  # "example.com"
\`\`\`

### Exercice 3 : Inverser un mot
\`\`\`python
mot = "Python"
inverse = mot[::-1]
print(inverse)  # "nohtyP"
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/02-strings-exercice.py\`
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

Les opérateurs de comparaison sont la **base de toute logique** en programmation. Ils permettent à votre programme de **prendre des décisions** en évaluant des conditions. Sans eux, impossible de faire des \`if\`, des \`while\`, ou de filtrer des données !

---

## 🧠 Pourquoi les Comparaisons sont Essentielles ?

Imaginez un programme qui doit :
- Vérifier si un utilisateur est **majeur** → \`age >= 18\`
- Filtrer les produits **en stock** → \`quantite > 0\`
- Valider un **mot de passe** → \`mot_de_passe == mot_de_passe_confirme\`
- Vérifier si un email est **dans la liste noire** → \`email in liste_noire\`

Toutes ces opérations reposent sur les **comparaisons** !

### Ce qu'une comparaison retourne

Une comparaison retourne **toujours** un booléen : \`True\` ou \`False\`.

\`\`\`python
resultat = 5 > 3
print(resultat)       # True
print(type(resultat)) # <class 'bool'>
\`\`\`

---

## ⚖️ Opérateurs de Comparaison

Ces opérateurs comparent deux valeurs et retournent \`True\` ou \`False\`.

| Opérateur | Description | Exemple | Résultat |
|-----------|-------------|---------|----------|
| \`==\` | Égal à | \`5 == 5\` | \`True\` |
| \`!=\` | Différent de | \`5 != 3\` | \`True\` |
| \`<\` | Strictement inférieur | \`3 < 5\` | \`True\` |
| \`>\` | Strictement supérieur | \`5 > 3\` | \`True\` |
| \`<=\` | Inférieur ou égal | \`5 <= 5\` | \`True\` |
| \`>=\` | Supérieur ou égal | \`5 >= 3\` | \`True\` |

### Exemples pratiques

\`\`\`python
age = 25
salaire = 35000
note = 15

# Comparaisons simples
print(age == 25)       # True - L'âge est-il exactement 25 ?
print(age != 30)       # True - L'âge est-il différent de 30 ?
print(salaire > 30000) # True - Le salaire dépasse-t-il 30000 ?
print(note < 10)       # False - La note est-elle inférieure à 10 ?
print(note >= 10)      # True - La note est-elle au moins 10 ?
\`\`\`

### Comparaison de chaînes de caractères

Les strings sont comparées **lexicographiquement** (ordre alphabétique basé sur les codes ASCII/Unicode).

\`\`\`python
# Ordre alphabétique
print("apple" < "banana")   # True (a vient avant b)
print("cat" > "car")        # True (t vient après r)
print("Python" == "python") # False (P ≠ p, sensible à la casse !)

# Attention aux majuscules !
print("A" < "a")            # True (majuscules viennent avant en ASCII)
print(ord("A"))             # 65
print(ord("a"))             # 97
\`\`\`

> 💡 **Astuce** : Pour comparer sans tenir compte de la casse :
> \`\`\`python
> "Python".lower() == "python".lower()  # True
> \`\`\`

---

## 🔗 Enchaînement de Comparaisons

Python permet d'**enchaîner les comparaisons** de façon naturelle, comme en mathématiques !

\`\`\`python
age = 25

# Au lieu de écrire :
print(age >= 18 and age <= 65)  # True

# Python permet d'écrire directement :
print(18 <= age <= 65)          # True - Plus lisible !

# Autres exemples d'enchaînement
x = 10
print(1 < x < 20)      # True (x est entre 1 et 20)
print(5 <= x <= 15)    # True (x est entre 5 et 15 inclus)
print(0 < x < 5)       # False (x n'est pas entre 0 et 5)

# Triple enchaînement
a, b, c = 1, 2, 3
print(a < b < c)       # True (ordre croissant)
\`\`\`

> ⚠️ **C'est une spécificité de Python !** En JavaScript ou Java, \`1 < x < 20\` ne fonctionne pas comme attendu.

---

## 🧮 Opérateurs Logiques : and, or, not

Les opérateurs logiques permettent de **combiner plusieurs conditions**.

### Table de vérité

| A | B | A and B | A or B | not A |
|---|---|---------|--------|-------|
| True | True | **True** | True | False |
| True | False | False | **True** | False |
| False | True | False | **True** | True |
| False | False | False | False | **True** |

### \`and\` - ET logique

Retourne \`True\` **seulement si les deux conditions sont vraies**.

\`\`\`python
age = 25
a_permis = True

# Les deux conditions doivent être vraies
peut_conduire = age >= 18 and a_permis
print(peut_conduire)  # True

# Exemple pratique : validation de formulaire
email = "user@example.com"
password = "secret123"

est_valide = len(email) > 0 and len(password) >= 8
print(f"Formulaire valide: {est_valide}")  # True
\`\`\`

### \`or\` - OU logique

Retourne \`True\` **si au moins une condition est vraie**.

\`\`\`python
jour = "samedi"

# Au moins une condition doit être vraie
est_weekend = jour == "samedi" or jour == "dimanche"
print(est_weekend)  # True

# Exemple : vérifier les droits d'accès
est_admin = False
est_moderateur = True

peut_supprimer = est_admin or est_moderateur
print(f"Peut supprimer: {peut_supprimer}")  # True
\`\`\`

### \`not\` - Négation

**Inverse** la valeur d'un booléen.

\`\`\`python
est_connecte = True

print(not est_connecte)      # False
print(not False)             # True

# Exemple pratique
utilisateur_banni = False

if not utilisateur_banni:
    print("Accès autorisé")  # S'exécute car not False = True
\`\`\`

### Combinaisons complexes

\`\`\`python
age = 25
est_etudiant = True
revenu = 15000

# Priorité : not > and > or
# Utilisez des parenthèses pour clarifier !

# Éligible à une réduction ?
eligible = (age < 26 and est_etudiant) or (revenu < 20000)
print(f"Éligible: {eligible}")  # True
\`\`\`

> 💡 **Bonne pratique** : Utilisez **toujours des parenthèses** pour les expressions complexes !

---

## 🔍 Évaluation Court-circuit (Short-circuit)

Python utilise l'**évaluation paresseuse** : il s'arrête dès qu'il connaît le résultat.

\`\`\`python
# Avec 'and' : si le premier est False, le second n'est pas évalué
False and print("Je ne serai jamais affiché")

# Avec 'or' : si le premier est True, le second n'est pas évalué
True or print("Je ne serai jamais affiché")
\`\`\`

### Application pratique : éviter les erreurs

\`\`\`python
liste = []

# ❌ ERREUR si la liste est vide !
# if liste[0] > 10:  # IndexError !

# ✅ Sécurisé grâce au court-circuit
if len(liste) > 0 and liste[0] > 10:
    print("Premier élément supérieur à 10")
# Si len(liste) == 0, Python ne vérifie PAS liste[0]

# Autre exemple : éviter la division par zéro
diviseur = 0
if diviseur != 0 and 100 / diviseur > 10:
    print("Résultat valide")
\`\`\`

---

## 📦 Opérateurs d'Appartenance : in, not in

Ces opérateurs vérifient si un élément **appartient** à une séquence.

\`\`\`python
# Dans une liste
fruits = ["pomme", "banane", "cerise"]
print("banane" in fruits)      # True
print("orange" in fruits)      # False
print("orange" not in fruits)  # True

# Dans une chaîne de caractères
texte = "Bonjour Python"
print("Python" in texte)       # True
print("python" in texte)       # False (sensible à la casse)
print("java" not in texte)     # True

# Dans un dictionnaire (vérifie les CLÉS, pas les valeurs !)
utilisateur = {"nom": "Alice", "age": 25}
print("nom" in utilisateur)    # True (clé existe)
print("Alice" in utilisateur)  # False (c'est une valeur, pas une clé)
print(25 in utilisateur.values())  # True (vérifier dans les valeurs)

# Dans un set (très rapide : O(1))
numeros_valides = {1, 2, 3, 4, 5}
print(3 in numeros_valides)    # True
print(10 in numeros_valides)   # False
\`\`\`

### Cas d'usage pratiques

\`\`\`python
# Validation d'entrée utilisateur
choix_valides = ["oui", "non", "peut-être"]
reponse = "oui"

if reponse.lower() in choix_valides:
    print("Choix valide")

# Filtrer une liste noire
mots_interdits = {"spam", "pub", "arnaque"}
commentaire = "Super produit spam gratuit"

mots_du_commentaire = commentaire.lower().split()
for mot in mots_du_commentaire:
    if mot in mots_interdits:
        print(f"Mot interdit détecté: {mot}")
\`\`\`

---

## 🆔 Opérateurs d'Identité : is, is not

Ces opérateurs vérifient si deux variables pointent vers **le même objet en mémoire**.

### Différence entre \`==\` et \`is\`

\`\`\`
┌────────────────────────────────────────────────────┐
│   ==  compare les VALEURS                          │
│   is  compare les IDENTITÉS (même objet mémoire)   │
└────────────────────────────────────────────────────┘
\`\`\`

\`\`\`python
# Deux listes avec les mêmes valeurs
a = [1, 2, 3]
b = [1, 2, 3]
c = a  # c pointe vers le même objet que a

# Comparaison de valeurs (==)
print(a == b)  # True - mêmes valeurs
print(a == c)  # True - mêmes valeurs

# Comparaison d'identité (is)
print(a is b)  # False - objets différents en mémoire !
print(a is c)  # True - même objet en mémoire

# Preuve avec id()
print(f"id(a) = {id(a)}")
print(f"id(b) = {id(b)}")  # Différent de id(a)
print(f"id(c) = {id(c)}")  # Égal à id(a)
\`\`\`

### Le cas spécial de \`None\`

\`None\` est un **singleton** : il n'existe qu'un seul objet \`None\` en Python.

\`\`\`python
resultat = None

# ✅ CORRECT : utiliser 'is' avec None
if resultat is None:
    print("Pas de résultat")

if resultat is not None:
    print("Résultat disponible")

# ⚠️ DÉCONSEILLÉ : utiliser '==' avec None
if resultat == None:  # Fonctionne mais pas idiomatique
    print("Pas de résultat")
\`\`\`

> 💡 **Règle d'or** : Toujours utiliser \`is None\` ou \`is not None\`, jamais \`== None\`.

---

## 🔢 Valeurs "Truthy" et "Falsy"

En Python, toute valeur peut être évaluée comme \`True\` ou \`False\` dans un contexte booléen.

### Valeurs "Falsy" (évaluées comme False)

\`\`\`python
# Toutes ces valeurs sont "Falsy"
print(bool(False))     # False
print(bool(None))      # False
print(bool(0))         # False
print(bool(0.0))       # False
print(bool(""))        # False (string vide)
print(bool([]))        # False (liste vide)
print(bool({}))        # False (dict vide)
print(bool(set()))     # False (set vide)
\`\`\`

### Valeurs "Truthy" (évaluées comme True)

\`\`\`python
# Toutes ces valeurs sont "Truthy"
print(bool(True))      # True
print(bool(1))         # True (tout entier non-zéro)
print(bool(-1))        # True
print(bool("hello"))   # True (string non-vide)
print(bool([1, 2]))    # True (liste non-vide)
print(bool({"a": 1}))  # True (dict non-vide)
\`\`\`

### Application pratique

\`\`\`python
liste = []

# ❌ Façon verbeuse
if len(liste) > 0:
    print("Liste non vide")

# ✅ Façon Pythonique
if liste:
    print("Liste non vide")

# Vérifier si une string n'est pas vide
nom = "Alice"
if nom:
    print(f"Bonjour {nom}")

# Valeur par défaut avec 'or'
utilisateur = ""
nom_affiche = utilisateur or "Anonyme"
print(nom_affiche)  # "Anonyme"
\`\`\`

---

## 📋 Récapitulatif : Priorité des Opérateurs

Du plus prioritaire au moins prioritaire :

| Priorité | Opérateur | Description |
|----------|-----------|-------------|
| 1 | \`()\` | Parenthèses |
| 2 | \`**\` | Puissance |
| 3 | \`+x\`, \`-x\`, \`~x\` | Unaires |
| 4 | \`*\`, \`/\`, \`//\`, \`%\` | Multiplication, division |
| 5 | \`+\`, \`-\` | Addition, soustraction |
| 6 | \`<\`, \`<=\`, \`>\`, \`>=\`, \`==\`, \`!=\`, \`is\`, \`in\` | Comparaisons |
| 7 | \`not\` | Négation logique |
| 8 | \`and\` | ET logique |
| 9 | \`or\` | OU logique |

---

## Exercices 🎯

### Exercice 1 : Vérifier une plage
\`\`\`python
def dans_plage(n, min_val, max_val):
    """Vérifie si n est entre min_val et max_val (inclus)."""
    return min_val <= n <= max_val

print(dans_plage(5, 1, 10))   # True
print(dans_plage(15, 1, 10))  # False
\`\`\`

### Exercice 2 : Validation d'accès
\`\`\`python
def peut_acceder(age, est_membre, a_invitation):
    """Accès si majeur ET (membre OU invitation)."""
    return age >= 18 and (est_membre or a_invitation)

print(peut_acceder(25, True, False))   # True
print(peut_acceder(16, True, True))    # False (mineur)
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/07-comparaisons-exercice.py\`
`,
    '08-conditions': `
# Module 8 : Conditions (if/elif/else)

Les **structures conditionnelles** permettent à votre programme de prendre des **décisions** et d'exécuter différentes actions selon les circonstances. C'est ce qui rend vos programmes **intelligents** et **interactifs** !

---

## 🧠 Pourquoi les Conditions sont Essentielles ?

Sans conditions, un programme exécuterait toujours les **mêmes instructions** dans le même ordre. Avec les conditions, vous pouvez :

- Afficher un message différent selon l'heure de la journée
- Valider les données saisies par l'utilisateur
- Gérer les erreurs et les cas particuliers
- Créer des menus et des options
- Implémenter la logique métier de vos applications

### Schéma Mental : Le Carrefour

\`\`\`
                    [Condition]
                        │
              ┌─────────┴─────────┐
              │                   │
         [True]               [False]
              │                   │
    ┌─────────▼─────────┐ ┌──────▼──────┐
    │ Bloc d'instructions│ │Bloc alternatif│
    │    (si vrai)       │ │  (si faux)   │
    └───────────────────┘ └──────────────┘
\`\`\`

---

## 📝 La Structure if Simple

La structure \`if\` la plus basique exécute un bloc de code **seulement si** la condition est vraie.

\`\`\`python
age = 18

if age >= 18:
    print("Vous êtes majeur")
    print("Vous pouvez voter")

# Le code continue ici, que la condition soit vraie ou fausse
print("Fin du programme")
\`\`\`

### Points importants

1. **Les deux-points (:)** sont obligatoires après la condition
2. **L'indentation** définit le bloc de code (généralement 4 espaces)
3. Si la condition est **False**, le bloc est simplement ignoré

\`\`\`python
temperature = 15

if temperature < 0:
    print("Il gèle !")  # Ne s'affiche PAS car 15 >= 0

print("Bonne journée !")  # S'affiche toujours
\`\`\`

---

## 🔀 La Structure if/else

Ajoutez \`else\` pour définir ce qui se passe quand la condition est **fausse**.

\`\`\`python
age = 16

if age >= 18:
    print("Vous êtes majeur")
else:
    print("Vous êtes mineur")
\`\`\`

### Exemple : Parité d'un nombre

\`\`\`python
nombre = 7

if nombre % 2 == 0:
    print(f"{nombre} est pair")
else:
    print(f"{nombre} est impair")
# Résultat : "7 est impair"
\`\`\`

### Exemple : Validation de connexion

\`\`\`python
mot_de_passe_correct = "secret123"
saisie = input("Entrez le mot de passe : ")

if saisie == mot_de_passe_correct:
    print("Connexion réussie !")
    print("Bienvenue dans votre espace")
else:
    print("Mot de passe incorrect !")
    print("Veuillez réessayer")
\`\`\`

---

## 🔄 La Structure if/elif/else

Quand vous avez **plus de deux cas**, utilisez \`elif\` (contraction de "else if").

\`\`\`python
note = 15

if note >= 16:
    mention = "Très Bien"
elif note >= 14:
    mention = "Bien"
elif note >= 12:
    mention = "Assez Bien"
elif note >= 10:
    mention = "Passable"
else:
    mention = "Ajourné"

print(f"Mention : {mention}")
# Résultat : "Mention : Bien"
\`\`\`

### Comment ça fonctionne ?

1. Python évalue les conditions **de haut en bas**
2. Dès qu'une condition est **True**, il exécute ce bloc et **sort** de la structure
3. Si **aucune** condition n'est True, il exécute le bloc \`else\`

\`\`\`
note = 15
       │
       ▼
[note >= 16 ?] ─ Non ──┐
       │               │
      Oui              ▼
       │         [note >= 14 ?] ─ Non ──┐
       ▼               │               │
  "Très Bien"         Oui              ▼
                       │          [note >= 12 ?] ...
                       ▼
                    "Bien" ◄── Résultat
\`\`\`

### Exemple : Catégorie d'âge

\`\`\`python
age = 35

if age < 2:
    categorie = "Bébé"
elif age < 12:
    categorie = "Enfant"
elif age < 18:
    categorie = "Adolescent"
elif age < 65:
    categorie = "Adulte"
else:
    categorie = "Senior"

print(f"Catégorie : {categorie}")  # "Adulte"
\`\`\`

### Exemple : Calculatrice simple

\`\`\`python
a = 10
b = 3
operation = "+"

if operation == "+":
    resultat = a + b
elif operation == "-":
    resultat = a - b
elif operation == "*":
    resultat = a * b
elif operation == "/":
    if b != 0:  # Vérifier la division par zéro
        resultat = a / b
    else:
        resultat = "Erreur : division par zéro"
else:
    resultat = "Opération non reconnue"

print(f"{a} {operation} {b} = {resultat}")
\`\`\`

---

## 🏠 Conditions Imbriquées

Vous pouvez placer des conditions **à l'intérieur** d'autres conditions pour des logiques plus complexes.

\`\`\`python
age = 25
revenu = 30000
a_garantie = True

if age >= 18:
    print("Majeur - éligible en principe")
    
    if revenu >= 25000:
        print("Revenu suffisant")
        
        if a_garantie:
            print("✅ Prêt accordé !")
        else:
            print("❌ Garantie requise")
    else:
        print("❌ Revenu insuffisant")
else:
    print("❌ Mineur - non éligible")
\`\`\`

### Attention à la complexité !

Les conditions imbriquées peuvent devenir **difficiles à lire**. Préférez parfois combiner les conditions :

\`\`\`python
# ❌ Imbrication excessive
if condition1:
    if condition2:
        if condition3:
            faire_quelque_chose()

# ✅ Combinaison plus lisible
if condition1 and condition2 and condition3:
    faire_quelque_chose()
\`\`\`

---

## ⚡ L'Opérateur Ternaire

Python offre une syntaxe concise pour les conditions simples : l'**expression conditionnelle** (ou opérateur ternaire).

### Syntaxe

\`\`\`python
valeur_si_vrai if condition else valeur_si_faux
\`\`\`

### Exemples

\`\`\`python
age = 20

# Forme classique
if age >= 18:
    statut = "Majeur"
else:
    statut = "Mineur"

# Forme ternaire (équivalent)
statut = "Majeur" if age >= 18 else "Mineur"
\`\`\`

\`\`\`python
# Trouver le maximum de deux nombres
a, b = 10, 20
maximum = a if a > b else b
print(f"Maximum : {maximum}")  # 20

# Valeur absolue
nombre = -5
absolu = nombre if nombre >= 0 else -nombre
print(f"Valeur absolue : {absolu}")  # 5

# Message conditionnel
articles = 3
message = "article" if articles == 1 else "articles"
print(f"Vous avez {articles} {message}")  # "Vous avez 3 articles"
\`\`\`

### Quand utiliser le ternaire ?

✅ **Utilisez-le pour** :
- Des assignations simples
- Des expressions courtes et lisibles

❌ **Évitez-le pour** :
- Des conditions complexes
- Des blocs avec plusieurs instructions

\`\`\`python
# ✅ Simple et lisible
resultat = "pair" if n % 2 == 0 else "impair"

# ❌ Trop complexe - utilisez if/else classique
# resultat = "A" if n > 90 else "B" if n > 80 else "C" if n > 70 else "D"
\`\`\`

---

## 🎯 Match-Case (Python 3.10+)

Python 3.10 a introduit le **pattern matching** avec \`match/case\`, similaire au \`switch\` d'autres langages.

### Syntaxe de base

\`\`\`python
commande = "start"

match commande:
    case "start":
        print("Démarrage du programme...")
    case "stop":
        print("Arrêt du programme...")
    case "pause":
        print("Mise en pause...")
    case _:  # Cas par défaut (underscore = wildcard)
        print("Commande inconnue")
\`\`\`

### Plusieurs valeurs avec \`|\`

\`\`\`python
jour = "samedi"

match jour:
    case "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi":
        print("C'est un jour de semaine")
    case "samedi" | "dimanche":
        print("C'est le weekend !")
    case _:
        print("Jour invalide")
\`\`\`

### Pattern matching avec déstructuration

\`\`\`python
point = (3, 4)

match point:
    case (0, 0):
        print("Origine")
    case (0, y):
        print(f"Sur l'axe Y à y={y}")
    case (x, 0):
        print(f"Sur l'axe X à x={x}")
    case (x, y):
        print(f"Point à ({x}, {y})")
\`\`\`

### Avec des conditions (guards)

\`\`\`python
age = 25

match age:
    case n if n < 0:
        print("Âge invalide")
    case n if n < 18:
        print("Mineur")
    case n if n < 65:
        print("Adulte")
    case _:
        print("Senior")
\`\`\`

---

## 📋 Bonnes Pratiques

### 1. Gardez les conditions simples

\`\`\`python
# ❌ Trop complexe
if (age >= 18 and age <= 65) and (revenu > 20000 or a_garantie) and not est_interdit:
    accorder_pret()

# ✅ Utilisez des variables intermédiaires
est_adulte_actif = 18 <= age <= 65
est_solvable = revenu > 20000 or a_garantie
est_eligible = est_adulte_actif and est_solvable and not est_interdit

if est_eligible:
    accorder_pret()
\`\`\`

### 2. Évitez les comparaisons inutiles avec les booléens

\`\`\`python
est_actif = True

# ❌ Redondant
if est_actif == True:
    print("Actif")

# ✅ Direct et Pythonique
if est_actif:
    print("Actif")

# ❌ Redondant
if est_actif == False:
    print("Inactif")

# ✅ Utilisez not
if not est_actif:
    print("Inactif")
\`\`\`

### 3. Utilisez les valeurs truthy/falsy

\`\`\`python
liste = [1, 2, 3]

# ❌ Verbeux
if len(liste) > 0:
    print("Liste non vide")

# ✅ Pythonique
if liste:
    print("Liste non vide")
\`\`\`

### 4. Retournez tôt (early return)

\`\`\`python
# ❌ Imbrication profonde
def traiter_utilisateur(user):
    if user is not None:
        if user.est_actif:
            if user.a_permission:
                # traitement...
                return resultat

# ✅ Retours anticipés
def traiter_utilisateur(user):
    if user is None:
        return None
    if not user.est_actif:
        return "Utilisateur inactif"
    if not user.a_permission:
        return "Permission refusée"
    
    # traitement...
    return resultat
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Calculateur de mention
\`\`\`python
def calculer_mention(note):
    """Retourne la mention selon la note (sur 20)."""
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

print(calculer_mention(17))  # "Très Bien"
print(calculer_mention(13))  # "Assez Bien"
\`\`\`

### Exercice 2 : Année bissextile
\`\`\`python
def est_bissextile(annee):
    """
    Vérifie si une année est bissextile.
    Règle : divisible par 4, sauf les siècles qui doivent être divisibles par 400.
    """
    return (annee % 4 == 0 and annee % 100 != 0) or (annee % 400 == 0)

print(est_bissextile(2024))  # True
print(est_bissextile(2100))  # False
print(est_bissextile(2000))  # True
\`\`\`

### Exercice 3 : Calculatrice avec match-case
\`\`\`python
def calculer(a, op, b):
    """Calculatrice simple avec match-case."""
    match op:
        case "+":
            return a + b
        case "-":
            return a - b
        case "*":
            return a * b
        case "/":
            return a / b if b != 0 else "Erreur"
        case _:
            return "Opération inconnue"
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/08-conditions-exercice.py\`
`,

    '09-boucles': `
# Module 9 : Boucles (for/while)

Les **boucles** permettent de **répéter des instructions** plusieurs fois. C'est l'un des concepts les plus puissants de la programmation : au lieu d'écrire 100 fois la même chose, vous écrivez une boucle qui le fait pour vous !

---

## 🧠 Pourquoi les Boucles sont Essentielles ?

Sans boucles, pour afficher les nombres de 1 à 100, vous devriez écrire :
\`\`\`python
print(1)
print(2)
print(3)
# ... 97 lignes plus tard ...
print(100)
\`\`\`

Avec une boucle, c'est **2 lignes** :
\`\`\`python
for i in range(1, 101):
    print(i)
\`\`\`

### Cas d'usage courants

| Situation | Type de boucle |
|-----------|---------------|
| Parcourir une liste d'éléments | \`for\` |
| Répéter n fois | \`for\` avec \`range()\` |
| Continuer tant qu'une condition est vraie | \`while\` |
| Lire un fichier ligne par ligne | \`for\` |
| Attendre une entrée utilisateur valide | \`while\` |
| Traiter tous les éléments d'un dictionnaire | \`for\` |

---

## 🔄 La Boucle for

La boucle \`for\` est idéale pour **parcourir des séquences** (listes, strings, dictionnaires, etc.) ou répéter un nombre défini de fois.

### Parcourir une liste

\`\`\`python
fruits = ["pomme", "banane", "cerise", "datte"]

for fruit in fruits:
    print(f"J'aime les {fruit}s")

# Résultat :
# J'aime les pommes
# J'aime les bananes
# J'aime les cerises
# J'aime les dattes
\`\`\`

### Parcourir une chaîne de caractères

\`\`\`python
mot = "Python"

for lettre in mot:
    print(lettre)

# Affiche : P y t h o n (une lettre par ligne)
\`\`\`

### La fonction range()

\`range()\` génère une séquence de nombres. C'est **indispensable** pour répéter des actions un nombre précis de fois.

\`\`\`python
# range(stop) : de 0 à stop-1
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(start, stop) : de start à stop-1
for i in range(2, 7):
    print(i)  # 2, 3, 4, 5, 6

# range(start, stop, step) : avec un pas
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8 (nombres pairs)

# Comptage à rebours
for i in range(10, 0, -1):
    print(i)  # 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
\`\`\`

### Schéma mental de range()

\`\`\`
range(5)        → [0, 1, 2, 3, 4]       # start=0 par défaut
range(2, 7)     → [2, 3, 4, 5, 6]       # stop exclusif !
range(0, 10, 2) → [0, 2, 4, 6, 8]       # step=2
range(5, 0, -1) → [5, 4, 3, 2, 1]       # comptage décroissant
\`\`\`

> ⚠️ **Attention** : Le paramètre \`stop\` est **exclusif** (jamais inclus) !

---

## 🔢 enumerate() : Index + Valeur

Souvent, vous avez besoin de l'**index** ET de la **valeur**. Utilisez \`enumerate()\` !

\`\`\`python
fruits = ["pomme", "banane", "cerise"]

# ❌ Façon moins élégante
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# ✅ Façon Pythonique avec enumerate()
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Résultat :
# 0: pomme
# 1: banane
# 2: cerise
\`\`\`

### Commencer à un index différent

\`\`\`python
# Numéroter à partir de 1
for numero, fruit in enumerate(fruits, start=1):
    print(f"{numero}. {fruit}")

# Résultat :
# 1. pomme
# 2. banane
# 3. cerise
\`\`\`

---

## 🔗 zip() : Parcourir Plusieurs Listes

\`zip()\` permet de parcourir **plusieurs listes en parallèle**.

\`\`\`python
noms = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
villes = ["Paris", "Lyon", "Marseille"]

for nom, age, ville in zip(noms, ages, villes):
    print(f"{nom}, {age} ans, habite à {ville}")

# Résultat :
# Alice, 25 ans, habite à Paris
# Bob, 30 ans, habite à Lyon
# Charlie, 35 ans, habite à Marseille
\`\`\`

### Attention à la longueur !

\`zip()\` s'arrête à la **liste la plus courte** :

\`\`\`python
a = [1, 2, 3, 4, 5]
b = ["a", "b", "c"]

for x, y in zip(a, b):
    print(x, y)
# 1 a
# 2 b
# 3 c
# (4 et 5 sont ignorés car b est plus court)
\`\`\`

---

## ⏳ La Boucle while

La boucle \`while\` répète tant qu'une **condition est vraie**. Utilisez-la quand vous ne savez pas à l'avance combien d'itérations sont nécessaires.

### Syntaxe de base

\`\`\`python
compteur = 0

while compteur < 5:
    print(f"Compteur : {compteur}")
    compteur += 1  # N'OUBLIEZ JAMAIS d'incrémenter !

print("Fin de la boucle")
\`\`\`

> ⚠️ **DANGER** : Sans la ligne \`compteur += 1\`, vous auriez une **boucle infinie** !

### Exemple : Validation d'entrée utilisateur

\`\`\`python
while True:
    reponse = input("Entrez 'oui' ou 'non' : ").lower()
    
    if reponse in ["oui", "non"]:
        break  # Sortir de la boucle si valide
    
    print("Réponse invalide, réessayez.")

print(f"Vous avez répondu : {reponse}")
\`\`\`

### Exemple : Deviner un nombre

\`\`\`python
import random

nombre_secret = random.randint(1, 100)
tentatives = 0

while True:
    tentatives += 1
    essai = int(input("Devinez le nombre (1-100) : "))
    
    if essai < nombre_secret:
        print("Trop petit !")
    elif essai > nombre_secret:
        print("Trop grand !")
    else:
        print(f"Bravo ! Trouvé en {tentatives} tentatives !")
        break
\`\`\`

---

## 🛑 break, continue et pass

Ces mots-clés permettent de **contrôler le flux** à l'intérieur des boucles.

### break : Sortir de la boucle

\`break\` **interrompt immédiatement** la boucle et passe à la suite du code.

\`\`\`python
# Chercher un élément
nombres = [1, 5, 3, 9, 2, 8, 4]

for n in nombres:
    if n == 9:
        print("9 trouvé !")
        break  # On sort dès qu'on trouve
    print(f"Vérifié : {n}")

# Résultat :
# Vérifié : 1
# Vérifié : 5
# Vérifié : 3
# 9 trouvé !
\`\`\`

### continue : Passer à l'itération suivante

\`continue\` **saute le reste** du bloc et passe à l'itération suivante.

\`\`\`python
# Afficher seulement les nombres impairs
for i in range(10):
    if i % 2 == 0:
        continue  # Ignorer les pairs
    print(i)

# Résultat : 1, 3, 5, 7, 9
\`\`\`

### pass : Ne rien faire (placeholder)

\`pass\` est un **placeholder** qui ne fait rien. Utile pour définir des structures vides.

\`\`\`python
for i in range(5):
    pass  # TODO: implémenter plus tard

# Ou pour des fonctions vides
def fonction_a_implementer():
    pass
\`\`\`

### Schéma récapitulatif

\`\`\`
for element in sequence:
    if condition1:
        break      # ← Sort de la boucle immédiatement
    if condition2:
        continue   # ← Passe à l'élément suivant
    # Code normal exécuté si pas de break/continue
\`\`\`

---

## 🔚 La Clause else sur les Boucles

Particularité de Python : vous pouvez ajouter un \`else\` à une boucle ! Le bloc \`else\` s'exécute **si la boucle se termine normalement** (sans \`break\`).

\`\`\`python
# Chercher un nombre pair
nombres = [1, 3, 5, 7, 9]

for n in nombres:
    if n % 2 == 0:
        print(f"Nombre pair trouvé : {n}")
        break
else:
    # Exécuté seulement si on n'a pas fait de break
    print("Aucun nombre pair trouvé")

# Résultat : "Aucun nombre pair trouvé"
\`\`\`

### Exemple : Vérifier si un nombre est premier

\`\`\`python
def est_premier(n):
    if n < 2:
        return False
    
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False  # Diviseur trouvé
    
    return True  # Pas de diviseur trouvé

# Version avec else
def est_premier_v2(n):
    if n < 2:
        return False
    
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            break
    else:
        return True  # Pas de break = pas de diviseur
    
    return False

print(est_premier(17))  # True
print(est_premier(15))  # False
\`\`\`

---

## 🔁 Boucles Imbriquées

Vous pouvez mettre une boucle **à l'intérieur** d'une autre boucle.

### Exemple : Table de multiplication

\`\`\`python
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i} x {j} = {i*j:2}", end="   ")
    print()  # Nouvelle ligne après chaque ligne de la table

# Résultat :
# 1 x 1 =  1   1 x 2 =  2   1 x 3 =  3   1 x 4 =  4   1 x 5 =  5   
# 2 x 1 =  2   2 x 2 =  4   2 x 3 =  6   2 x 4 =  8   2 x 5 = 10   
# ...
\`\`\`

### Exemple : Parcourir une matrice

\`\`\`python
matrice = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for ligne in matrice:
    for element in ligne:
        print(element, end=" ")
    print()

# Avec les indices
for i, ligne in enumerate(matrice):
    for j, element in enumerate(ligne):
        print(f"[{i},{j}]={element}", end=" ")
    print()
\`\`\`

---

## 📋 Comparaison for vs while

| Critère | for | while |
|---------|-----|-------|
| Nombre d'itérations | **Connu** | **Inconnu** |
| Cas d'usage | Parcourir une séquence | Attendre une condition |
| Risque de boucle infinie | Faible | **Élevé** |
| Syntaxe | Plus simple | Plus flexible |

\`\`\`python
# Préférez for quand vous parcourez une séquence
for item in liste:
    traiter(item)

# Utilisez while quand vous attendez une condition
while not condition_remplie:
    attendre()
\`\`\`

---

## 🎯 Bonnes Pratiques

### 1. Évitez de modifier une liste pendant l'itération

\`\`\`python
# ❌ DANGER : modifier pendant l'itération
nombres = [1, 2, 3, 4, 5]
for n in nombres:
    if n % 2 == 0:
        nombres.remove(n)  # Bug ! Certains éléments seront sautés

# ✅ Créer une nouvelle liste
nombres = [1, 2, 3, 4, 5]
nombres = [n for n in nombres if n % 2 != 0]  # Garde les impairs
\`\`\`

### 2. Utilisez des noms de variables explicites

\`\`\`python
# ❌ Noms génériques
for i in items:
    for j in i:
        print(j)

# ✅ Noms explicites
for utilisateur in utilisateurs:
    for commande in utilisateur.commandes:
        print(commande)
\`\`\`

### 3. Préférez les compréhensions de liste quand c'est simple

\`\`\`python
# ❌ Boucle pour créer une liste
carres = []
for x in range(10):
    carres.append(x ** 2)

# ✅ List comprehension
carres = [x ** 2 for x in range(10)]
\`\`\`

---

## Exercices 🎯

### Exercice 1 : Table de multiplication
\`\`\`python
def table_multiplication(n):
    """Affiche la table de multiplication de n."""
    for i in range(1, 11):
        print(f"{n} x {i} = {n * i}")

table_multiplication(7)
\`\`\`

### Exercice 2 : FizzBuzz
\`\`\`python
# Le classique des entretiens techniques !
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

### Exercice 3 : Somme des éléments
\`\`\`python
def somme_liste(liste):
    """Calcule la somme d'une liste sans utiliser sum()."""
    total = 0
    for element in liste:
        total += element
    return total

print(somme_liste([1, 2, 3, 4, 5]))  # 15
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/09-boucles-exercice.py\`
`,

    '10-fonctions-utiles': `
# Module 10 : Fonctions Built-in Utiles

Python dispose de nombreuses **fonctions intégrées** (built-in) accessibles sans import. Ce sont vos outils de base pour manipuler, transformer et analyser des données efficacement.

---

## 🧠 Pourquoi les Fonctions Built-in ?

Au lieu de réinventer la roue, Python fournit des fonctions optimisées pour les tâches courantes :

| Catégorie | Fonctions | Usage |
|-----------|-----------|-------|
| 📊 **Agrégation** | \`sum()\`, \`min()\`, \`max()\`, \`len()\` | Résumer des données |
| 🔄 **Transformation** | \`map()\`, \`filter()\`, \`sorted()\`, \`reversed()\` | Transformer des collections |
| ✅ **Vérification** | \`any()\`, \`all()\`, \`isinstance()\` | Valider des conditions |
| 🔢 **Conversion** | \`int()\`, \`float()\`, \`str()\`, \`list()\`, \`tuple()\` | Changer de type |
| 🔗 **Itération** | \`enumerate()\`, \`zip()\`, \`range()\` | Parcourir des séquences |
| 📋 **Introspection** | \`type()\`, \`dir()\`, \`help()\`, \`id()\` | Inspecter des objets |

> 💡 Pour voir toutes les fonctions built-in : \`print(dir(__builtins__))\`

---

## 📊 Fonctions d'Agrégation : min(), max(), sum(), len()

Ces fonctions résument une collection en une seule valeur.

\`\`\`python
nombres = [3, 1, 4, 1, 5, 9, 2, 6]

print(min(nombres))      # 1
print(max(nombres))      # 9
print(sum(nombres))      # 31
print(len(nombres))      # 8

# Moyenne
moyenne = sum(nombres) / len(nombres)
print(f"Moyenne : {moyenne:.2f}")  # 3.88
\`\`\`

### Le paramètre \`key\` (min et max)

Le paramètre \`key\` permet de personnaliser le critère de comparaison.

\`\`\`python
# Plus long mot
mots = ["python", "est", "un", "langage", "génial"]
print(max(mots, key=len))  # "langage"
print(min(mots, key=len))  # "un"

# Personne la plus jeune
personnes = [
    {"nom": "Alice", "age": 30},
    {"nom": "Bob", "age": 25},
    {"nom": "Charlie", "age": 35}
]
plus_jeune = min(personnes, key=lambda p: p["age"])
print(plus_jeune["nom"])  # "Bob"

# Min/Max avec plusieurs arguments (pas une liste)
print(min(5, 3, 8, 1))  # 1
print(max(5, 3, 8, 1))  # 8
\`\`\`

### Le paramètre \`default\` (min et max)

\`\`\`python
# Éviter une erreur sur une séquence vide
liste_vide = []
# min(liste_vide)  # ❌ ValueError !
print(min(liste_vide, default=0))  # 0

# sum() avec valeur initiale
print(sum([1, 2, 3], start=10))  # 16 (10 + 1 + 2 + 3)
\`\`\`

---

## 🔄 sorted() et reversed()

### sorted() : Tri sans modification

\`sorted()\` retourne une **nouvelle liste triée** sans modifier l'originale.

\`\`\`python
nombres = [3, 1, 4, 1, 5, 9, 2, 6]

# Tri croissant
trie = sorted(nombres)
print(trie)     # [1, 1, 2, 3, 4, 5, 6, 9]
print(nombres)  # [3, 1, 4, 1, 5, 9, 2, 6] → Inchangée !

# Tri décroissant
trie_desc = sorted(nombres, reverse=True)
print(trie_desc)  # [9, 6, 5, 4, 3, 2, 1, 1]
\`\`\`

### Tri personnalisé avec \`key\`

\`\`\`python
# Trier des mots par longueur
mots = ["banane", "pomme", "kiwi", "cerise"]
par_longueur = sorted(mots, key=len)
print(par_longueur)  # ['kiwi', 'pomme', 'banane', 'cerise']

# Trier sans tenir compte de la casse
noms = ["alice", "Charlie", "Bob", "david"]
par_alpha = sorted(noms, key=str.lower)
print(par_alpha)  # ['alice', 'Bob', 'Charlie', 'david']

# Trier des tuples par le 2ème élément
etudiants = [("Alice", 15), ("Bob", 18), ("Charlie", 12)]
par_note = sorted(etudiants, key=lambda e: e[1], reverse=True)
print(par_note)  # [('Bob', 18), ('Alice', 15), ('Charlie', 12)]
\`\`\`

> ⚠️ **\`sorted()\` vs \`.sort()\`** : \`sorted()\` retourne une nouvelle liste, \`.sort()\` modifie la liste en place et retourne \`None\`.

### reversed() : Inverser sans modifier

\`\`\`python
nombres = [1, 2, 3, 4, 5]

# reversed() retourne un itérateur
inv = list(reversed(nombres))
print(inv)      # [5, 4, 3, 2, 1]
print(nombres)  # [1, 2, 3, 4, 5] → Inchangée !

# Utile dans une boucle
for n in reversed(nombres):
    print(n, end=" ")  # 5 4 3 2 1
\`\`\`

---

## ✅ any() et all()

Ces fonctions vérifient des conditions sur une collection entière.

\`\`\`
any()  → True si AU MOINS UN élément est True
all()  → True si TOUS les éléments sont True
\`\`\`

\`\`\`python
notes = [15, 12, 8, 18, 14]

# Tous au-dessus de 10 ?
print(all(n >= 10 for n in notes))  # False (8 < 10)

# Au moins un au-dessus de 16 ?
print(any(n > 16 for n in notes))   # True (18 > 16)
\`\`\`

### Cas d'usage pratiques

\`\`\`python
# Vérifier qu'un mot de passe est valide
mot_de_passe = "Secret123!"

a_majuscule = any(c.isupper() for c in mot_de_passe)
a_chiffre = any(c.isdigit() for c in mot_de_passe)
longueur_ok = len(mot_de_passe) >= 8

mdp_valide = all([a_majuscule, a_chiffre, longueur_ok])
print(f"Mot de passe valide : {mdp_valide}")  # True

# Vérifier si une liste est triée
def est_triee(liste):
    return all(liste[i] <= liste[i+1] for i in range(len(liste)-1))

print(est_triee([1, 2, 3, 4]))    # True
print(est_triee([1, 3, 2, 4]))    # False
\`\`\`

### Cas limites

\`\`\`python
# Sur une liste vide
print(any([]))  # False (aucun élément True)
print(all([]))  # True  (aucun élément False → "vacuously true")
\`\`\`

---

## 🔢 Fonctions de Conversion de Types

\`\`\`python
# int() - Convertir en entier
print(int("42"))       # 42
print(int(3.99))       # 3 (tronque, ne pas confondre avec round)
print(int("1010", 2))  # 10 (binaire → décimal)
print(int("ff", 16))   # 255 (hexadécimal → décimal)

# float() - Convertir en flottant
print(float("3.14"))   # 3.14
print(float(42))       # 42.0

# str() - Convertir en chaîne
print(str(42))         # "42"
print(str(3.14))       # "3.14"
print(str([1, 2, 3]))  # "[1, 2, 3]"

# bool() - Convertir en booléen
print(bool(0))         # False
print(bool(42))        # True
print(bool(""))        # False
print(bool("hello"))   # True

# list(), tuple(), set(), dict()
print(list("hello"))          # ['h', 'e', 'l', 'l', 'o']
print(tuple([1, 2, 3]))      # (1, 2, 3)
print(set([1, 2, 2, 3, 3]))  # {1, 2, 3}
print(dict([("a", 1), ("b", 2)]))  # {'a': 1, 'b': 2}
\`\`\`

---

## 🔗 enumerate() et zip()

### enumerate() : Index + Valeur

\`\`\`python
fruits = ["pomme", "banane", "cerise"]

# Obtenir l'index et la valeur
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Commencer à un index différent
for num, fruit in enumerate(fruits, start=1):
    print(f"{num}. {fruit}")
\`\`\`

### zip() : Parcourir en parallèle

\`\`\`python
noms = ["Alice", "Bob", "Charlie"]
notes = [15, 18, 12]

# Combiner deux listes
for nom, note in zip(noms, notes):
    print(f"{nom} : {note}/20")

# Créer un dictionnaire avec zip
bulletin = dict(zip(noms, notes))
print(bulletin)  # {'Alice': 15, 'Bob': 18, 'Charlie': 12}

# Dézipper avec *
paires = [(1, "a"), (2, "b"), (3, "c")]
nombres, lettres = zip(*paires)
print(nombres)  # (1, 2, 3)
print(lettres)  # ('a', 'b', 'c')
\`\`\`

---

## 📋 Fonctions d'Introspection

\`\`\`python
x = [1, 2, 3]

# type() - Connaître le type
print(type(x))           # <class 'list'>
print(type(42))          # <class 'int'>

# isinstance() - Vérifier le type (préféré à type())
print(isinstance(x, list))       # True
print(isinstance(42, (int, float)))  # True (vérifie plusieurs types)

# id() - Adresse mémoire de l'objet
print(id(x))  # Ex: 140234567890

# dir() - Lister les attributs et méthodes
print(dir(str))  # Liste toutes les méthodes de str

# help() - Documentation
# help(len)  # Affiche l'aide de la fonction len
\`\`\`

---

## 🎯 Fonctions Utilitaires

\`\`\`python
# abs() - Valeur absolue
print(abs(-42))     # 42
print(abs(3.14))    # 3.14

# round() - Arrondir
print(round(3.14159, 2))  # 3.14
print(round(2.5))          # 2 (arrondi bancaire !)
print(round(3.5))          # 4

# pow() - Puissance
print(pow(2, 10))      # 1024
print(pow(2, 10, 100)) # 24 (2^10 % 100, modular exponentiation)

# divmod() - Division entière + reste
quotient, reste = divmod(17, 5)
print(f"17 ÷ 5 = {quotient} reste {reste}")  # 3 reste 2

# input() - Entrée utilisateur
# nom = input("Votre nom : ")

# print() - Affichage avancé
print("A", "B", "C", sep=" - ")     # A - B - C
print("Loading", end="...")          # Loading... (pas de retour à la ligne)
\`\`\`

---

## 📋 Récapitulatif Rapide

| Fonction | Description | Exemple |
|----------|-------------|---------|
| \`len()\` | Longueur | \`len([1,2,3])\` → \`3\` |
| \`sum()\` | Somme | \`sum([1,2,3])\` → \`6\` |
| \`min()\` | Minimum | \`min(3,1,2)\` → \`1\` |
| \`max()\` | Maximum | \`max(3,1,2)\` → \`3\` |
| \`sorted()\` | Tri (nouvelle liste) | \`sorted([3,1,2])\` → \`[1,2,3]\` |
| \`reversed()\` | Inversé (itérateur) | \`list(reversed([1,2,3]))\` → \`[3,2,1]\` |
| \`any()\` | Au moins un True | \`any([F,T,F])\` → \`True\` |
| \`all()\` | Tous True | \`all([T,T,F])\` → \`False\` |
| \`abs()\` | Valeur absolue | \`abs(-5)\` → \`5\` |
| \`round()\` | Arrondi | \`round(3.14)\` → \`3\` |
| \`enumerate()\` | Index + valeur | Boucles indexées |
| \`zip()\` | Parcours parallèle | Combiner des listes |
| \`isinstance()\` | Vérifier le type | \`isinstance(5, int)\` → \`True\` |

---

## Exercices 🎯

### Exercice 1 : Statistiques d'une liste
\`\`\`python
def statistiques(nombres):
    """Retourne min, max, somme et moyenne d'une liste."""
    return {
        "min": min(nombres),
        "max": max(nombres),
        "somme": sum(nombres),
        "moyenne": round(sum(nombres) / len(nombres), 2)
    }

stats = statistiques([15, 8, 22, 10, 18])
print(stats)  # {'min': 8, 'max': 22, 'somme': 73, 'moyenne': 14.6}
\`\`\`

### Exercice 2 : Pipeline de données
\`\`\`python
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filtrer pairs → Élever au carré → Somme
resultat = sum(map(lambda x: x**2, filter(lambda x: x % 2 == 0, nombres)))
print(resultat)  # 220 (4 + 16 + 36 + 64 + 100)
\`\`\`

### Exercice 3 : Validation de données
\`\`\`python
def valider_notes(notes):
    """Vérifie que toutes les notes sont entre 0 et 20."""
    return all(0 <= n <= 20 for n in notes)

print(valider_notes([15, 12, 18]))   # True
print(valider_notes([15, -2, 18]))   # False
\`\`\`

> 📁 **Fichier d'exercices** : \`exercises/python/10-fonctions-utiles-exercice.py\`
`
};

// Import advanced chapters
import { pythonChaptersAdvanced, getAdvancedChapterContent } from './chapters-advanced.js';

// Merge all chapters
const allChapters = { ...pythonChapters, ...pythonChaptersAdvanced };

export const getChapterContent = (chapterId) => {
    return allChapters[chapterId] || null;
};
