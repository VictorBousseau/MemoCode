// Chapter content for Python course
// Each chapter has its content in markdown format

export const pythonChapters = {
    '00-environnement': `
# Module 0 : Environnement Professionnel

## Pourquoi Python ?

Python est devenu **le langage incontournable** en 2025 pour :
- 📊 **Data Science** et analyse de données
- 🤖 **Machine Learning** et Intelligence Artificielle
- 🌐 **Développement Web** (Django, Flask)
- ⚙️ **Automatisation** et scripts système

Sa philosophie : **lisibilité et simplicité**. Le code Python se lit presque comme de l'anglais.

## Installation avec Anaconda

> ⚠️ **Important** : N'installez pas Python "nu". Utilisez Anaconda ou Miniconda.

### Pourquoi Anaconda ?

1. **Pré-installe** des centaines de bibliothèques (Pandas, NumPy, Jupyter)
2. **Environnements virtuels** isolés par projet
3. **Évite les conflits** de versions

### Installation

1. Téléchargez [Anaconda](https://www.anaconda.com/download) ou [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
2. Suivez l'installation par défaut
3. Ouvrez **Anaconda Prompt** (Windows) ou **Terminal** (Mac/Linux)
4. Vérifiez avec :

\`\`\`bash
python --version
# Python 3.10.x ou supérieur
\`\`\`

## Choix de l'IDE

| IDE | Utilisation | Quand l'utiliser |
|-----|-------------|------------------|
| **VS Code** | Scripts .py | Développement de code propre |
| **Jupyter Notebook** | Notebooks .ipynb | Exploration de données |
| **PyCharm** | Gros projets | Projets complexes |

### Recommandation

- **Débutez avec VS Code** pour apprendre la logique pure
- **Passez à Jupyter** quand vous attaquerez l'analyse de données

## Premier Programme

Créez un fichier \`hello.py\` et écrivez :

\`\`\`python
print("Hello, World!")
print("Bienvenue dans le cours Python !")
\`\`\`

Exécutez dans le terminal :

\`\`\`bash
python hello.py
\`\`\`

## Exercice

📝 **Créez** un fichier \`00-setup.py\` qui :
1. Affiche "Hello, World!"
2. Affiche votre nom
3. Affiche la version de Python avec \`import sys; print(sys.version)\`
`,

    '01-variables': `
# Module 1 : Variables et Mémoire

## Qu'est-ce qu'une Variable ?

> 💡 **Concept clé** : En Python, une variable n'est pas une "boîte" qui contient une valeur. C'est une **étiquette** (pointeur) qui pointe vers un objet en mémoire.

\`\`\`python
nom = "Alice"  # nom pointe vers l'objet "Alice"
age = 25       # age pointe vers l'objet 25
\`\`\`

## Types de Données Primitifs

| Type | Description | Exemple |
|------|-------------|---------|
| \`int\` | Entier | \`42\`, \`-7\`, \`1000000\` |
| \`float\` | Décimal | \`3.14\`, \`-0.5\`, \`2.0\` |
| \`str\` | Chaîne de caractères | \`"Hello"\`, \`'Python'\` |
| \`bool\` | Booléen | \`True\`, \`False\` |

\`\`\`python
# Exemples
entier = 42
decimal = 3.14159
texte = "Bonjour le monde"
actif = True

# Vérifier le type
print(type(entier))   # <class 'int'>
print(type(texte))    # <class 'str'>
\`\`\`

## Conventions de Nommage

Python utilise le **snake_case** :

\`\`\`python
# ✅ Bon
nom_utilisateur = "Alice"
age_en_annees = 25
est_connecte = True

# ❌ Mauvais
NomUtilisateur = "Alice"  # CamelCase (pour les classes)
nomutilisateur = "Alice"  # Illisible
\`\`\`

## Conversion de Types

\`\`\`python
# String vers Int
age_str = "25"
age_int = int(age_str)  # 25

# Int vers String
nombre = 42
texte = str(nombre)  # "42"

# String vers Float
prix = float("19.99")  # 19.99
\`\`\`

## F-Strings (Formatage Moderne)

Depuis Python 3.6, utilisez les **f-strings** :

\`\`\`python
nom = "Alice"
age = 25

# ✅ Moderne (f-string)
message = f"Je m'appelle {nom} et j'ai {age} ans"

# ❌ Ancien (à éviter)
message = "Je m'appelle " + nom + " et j'ai " + str(age) + " ans"
\`\`\`

> 💡 Les f-strings permettent aussi des expressions :
> \`\`\`python
> print(f"Dans 10 ans, j'aurai {age + 10} ans")
> \`\`\`

## Exercices

### Exercice 1 : Aire d'un Rectangle

📝 Créez \`01-variables.py\` :
\`\`\`python
# Calculer l'aire d'un rectangle
longueur = 5
largeur = 3
aire = longueur * largeur
print(f"L'aire du rectangle est {aire} m²")
\`\`\`

### Exercice 2 : Conversion Température

📝 Créez \`01-conversion.py\` qui convertit Celsius en Fahrenheit :
\`\`\`python
celsius = 25
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}°C = {fahrenheit}°F")
\`\`\`
`,

    '02-operateurs': `
# Module 2 : Opérateurs

## Opérateurs Arithmétiques

| Opérateur | Description | Exemple | Résultat |
|-----------|-------------|---------|----------|
| \`+\` | Addition | \`5 + 3\` | \`8\` |
| \`-\` | Soustraction | \`5 - 3\` | \`2\` |
| \`*\` | Multiplication | \`5 * 3\` | \`15\` |
| \`/\` | Division | \`5 / 2\` | \`2.5\` |
| \`//\` | Division entière | \`5 // 2\` | \`2\` |
| \`%\` | Modulo (reste) | \`5 % 2\` | \`1\` |
| \`**\` | Puissance | \`2 ** 3\` | \`8\` |

\`\`\`python
a = 10
b = 3

print(f"Division: {a / b}")      # 3.333...
print(f"Division entière: {a // b}")  # 3
print(f"Reste: {a % b}")         # 1
print(f"Puissance: {a ** 2}")    # 100
\`\`\`

## Opérateurs de Comparaison

| Opérateur | Description | Exemple | Résultat |
|-----------|-------------|---------|----------|
| \`==\` | Égal à | \`5 == 5\` | \`True\` |
| \`!=\` | Différent de | \`5 != 3\` | \`True\` |
| \`<\` | Inférieur à | \`3 < 5\` | \`True\` |
| \`>\` | Supérieur à | \`5 > 3\` | \`True\` |
| \`<=\` | Inférieur ou égal | \`5 <= 5\` | \`True\` |
| \`>=\` | Supérieur ou égal | \`5 >= 3\` | \`True\` |

## Opérateurs Logiques

\`\`\`python
a = True
b = False

print(a and b)  # False (ET logique)
print(a or b)   # True (OU logique)
print(not a)    # False (NON logique)
\`\`\`

## Opérateurs d'Affectation

\`\`\`python
x = 10

x += 5   # x = x + 5  → 15
x -= 3   # x = x - 3  → 12
x *= 2   # x = x * 2  → 24
x /= 4   # x = x / 4  → 6.0
\`\`\`

## Exercice : Mini Calculatrice

📝 Créez \`02-calculatrice.py\` :
\`\`\`python
a = 15
b = 4

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
\`\`\`
`
};

export const getChapterContent = (chapterId) => {
    return pythonChapters[chapterId] || null;
};
