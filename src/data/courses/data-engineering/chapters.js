// Chapter content for Data Engineering course - PART 1: NumPy & Pandas Basics
// Modules 00-09

export const dataEngineeringChapters = {
    '00-numpy-intro': `
# Module 0 : Introduction à NumPy

NumPy (Numerical Python) est la **bibliothèque fondamentale** pour le calcul scientifique en Python. Elle fournit des tableaux multidimensionnels performants et des outils pour les manipuler.

> 🧠 **Pourquoi NumPy ?** Les listes Python sont flexibles mais lentes pour les calculs numériques. NumPy utilise des tableaux homogènes stockés de manière contiguë en mémoire, permettant des opérations **50-100x plus rapides**.

---

## 📦 Installation et Import

\`\`\`python
# Installation
# pip install numpy

# Import standard (convention universelle)
import numpy as np
\`\`\`

> ⚠️ **Convention** : Utilisez TOUJOURS \`np\` comme alias. C'est une convention universelle que tout le monde reconnaît.

---

## 🔢 Création d'Arrays

### À partir de listes Python

\`\`\`python
import numpy as np

# Array 1D (vecteur)
arr = np.array([1, 2, 3, 4, 5])
print(arr)        # [1 2 3 4 5]
print(type(arr))  # <class 'numpy.ndarray'>

# Array 2D (matrice)
matrice = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
print(matrice)
# [[1 2 3]
#  [4 5 6]
#  [7 8 9]]

# Array 3D (tenseur)
tenseur = np.array([
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
])
print(tenseur.shape)  # (2, 2, 2)
\`\`\`

### Fonctions de création rapide

\`\`\`python
# Tableaux de zéros
zeros = np.zeros((3, 4))      # Matrice 3x4 de zéros
print(zeros)

# Tableaux de uns
ones = np.ones((2, 3))        # Matrice 2x3 de uns

# Tableau rempli d'une valeur
filled = np.full((2, 2), 7)   # Matrice 2x2 remplie de 7

# Matrice identité
identity = np.eye(4)          # Matrice identité 4x4

# Tableau vide (non initialisé - valeurs aléatoires)
empty = np.empty((2, 3))      # ⚠️ Contenu imprévisible !
\`\`\`

> 💡 **Astuce** : \`np.zeros\` et \`np.ones\` sont idéaux pour initialiser des tableaux avant de les remplir avec des calculs.

### Séquences numériques

\`\`\`python
# Équivalent de range() mais retourne un array
arr = np.arange(0, 10, 2)     # [0 2 4 6 8]

# N valeurs espacées régulièrement
arr = np.linspace(0, 1, 5)    # [0.   0.25 0.5  0.75 1.  ]

# Échelle logarithmique
arr = np.logspace(0, 3, 4)    # [1. 10. 100. 1000.]
\`\`\`

### Tableaux aléatoires

\`\`\`python
# Nombres aléatoires entre 0 et 1
rand = np.random.random((3, 3))

# Entiers aléatoires
randint = np.random.randint(0, 100, size=(5,))  # 5 entiers entre 0 et 99

# Distribution normale (moyenne=0, écart-type=1)
normal = np.random.randn(1000)

# Seed pour reproductibilité
np.random.seed(42)
arr = np.random.random(5)  # Toujours les mêmes valeurs !
\`\`\`

> 💡 **Reproductibilité** : Utilisez \`np.random.seed()\` au début de vos scripts pour des résultats reproductibles.

---

## 📊 Propriétés des Arrays

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])

# Dimensions
print(arr.ndim)      # 2 (nombre de dimensions)
print(arr.shape)     # (2, 3) - 2 lignes, 3 colonnes
print(arr.size)      # 6 - nombre total d'éléments

# Type de données
print(arr.dtype)     # int64 (ou int32 selon le système)

# Mémoire
print(arr.itemsize)  # 8 bytes par élément
print(arr.nbytes)    # 48 bytes au total
\`\`\`

### Types de données (dtypes)

\`\`\`python
# Spécifier le type à la création
arr_float = np.array([1, 2, 3], dtype=np.float64)
arr_int = np.array([1.5, 2.7], dtype=np.int32)  # Tronque : [1, 2]
arr_bool = np.array([0, 1, 2], dtype=bool)      # [False, True, True]

# Types courants
# np.int32, np.int64    - Entiers
# np.float32, np.float64 - Flottants
# np.bool_              - Booléens
# np.complex64          - Complexes

# Conversion de type
arr = np.array([1, 2, 3])
arr_float = arr.astype(np.float64)
\`\`\`

> ⚠️ **Performance** : \`float32\` utilise 2x moins de mémoire que \`float64\`. Pour le ML, \`float32\` suffit souvent.

---

## ⚡ Opérations Vectorisées

C'est LE point fort de NumPy : les opérations s'appliquent élément par élément sans boucle !

\`\`\`python
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

# Opérations arithmétiques
print(a + b)     # [11 22 33 44]
print(a * b)     # [10 40 90 160]
print(a ** 2)    # [1 4 9 16]
print(b / a)     # [10. 10. 10. 10.]

# Comparaisons (retournent des arrays booléens)
print(a > 2)     # [False False  True  True]
print(a == 2)    # [False  True False False]

# Opérations avec scalaires
print(a + 10)    # [11 12 13 14]
print(a * 2)     # [2 4 6 8]
\`\`\`

### Comparaison avec les listes Python

\`\`\`python
import time

# Liste Python
liste = list(range(1_000_000))
start = time.time()
result = [x ** 2 for x in liste]
print(f"Liste: {time.time() - start:.4f}s")

# NumPy
arr = np.arange(1_000_000)
start = time.time()
result = arr ** 2
print(f"NumPy: {time.time() - start:.4f}s")

# NumPy est typiquement 50-100x plus rapide !
\`\`\`

---

## 📋 Résumé

| Fonction | Description |
|----------|-------------|
| \`np.array()\` | Créer un array depuis une liste |
| \`np.zeros()\`, \`np.ones()\` | Arrays de 0 ou 1 |
| \`np.arange()\` | Séquence (comme range) |
| \`np.linspace()\` | N valeurs espacées |
| \`np.random.random()\` | Valeurs aléatoires |
| \`.shape\`, \`.dtype\`, \`.ndim\` | Propriétés de l'array |

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/00-numpy-intro-exercice.py\`
`,

    '01-numpy-indexing': `
# Module 1 : Indexation et Slicing NumPy

L'indexation NumPy est **beaucoup plus puissante** que celle des listes Python. Elle permet d'extraire, modifier et filtrer des données de manière très flexible.

---

## 🎯 Indexation de Base

### Arrays 1D

\`\`\`python
import numpy as np

arr = np.array([10, 20, 30, 40, 50])

# Indexation positive (depuis le début)
print(arr[0])     # 10
print(arr[2])     # 30

# Indexation négative (depuis la fin)
print(arr[-1])    # 50
print(arr[-2])    # 40
\`\`\`

### Arrays 2D

\`\`\`python
matrice = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

# Accès à un élément : [ligne, colonne]
print(matrice[0, 0])   # 1 (coin supérieur gauche)
print(matrice[1, 2])   # 6 (ligne 1, colonne 2)
print(matrice[-1, -1]) # 9 (coin inférieur droit)

# Accès à une ligne entière
print(matrice[0])      # [1 2 3]
print(matrice[1])      # [4 5 6]

# Accès à une colonne entière
print(matrice[:, 0])   # [1 4 7] (première colonne)
print(matrice[:, -1])  # [3 6 9] (dernière colonne)
\`\`\`

> 💡 **Syntaxe** : \`arr[ligne, colonne]\` est équivalent à \`arr[ligne][colonne]\` mais plus efficace.

---

## ✂️ Slicing (Tranches)

### Syntaxe : \`start:stop:step\`

\`\`\`python
arr = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# Tranches basiques
print(arr[2:5])     # [2 3 4] (indices 2, 3, 4)
print(arr[:3])      # [0 1 2] (du début à 3 exclu)
print(arr[7:])      # [7 8 9] (de 7 à la fin)

# Avec un pas
print(arr[::2])     # [0 2 4 6 8] (tous les 2)
print(arr[1::2])    # [1 3 5 7 9] (impairs)
print(arr[::-1])    # [9 8 7 ... 0] (inversé)
\`\`\`

### Slicing 2D

\`\`\`python
matrice = np.array([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
])

# Sous-matrice
print(matrice[0:2, 1:3])
# [[2 3]
#  [6 7]]

# Premières 2 lignes, toutes colonnes
print(matrice[:2, :])
# [[1 2 3 4]
#  [5 6 7 8]]

# Toutes lignes, colonnes paires
print(matrice[:, ::2])
# [[1 3]
#  [5 7]
#  [9 11]]
\`\`\`

> ⚠️ **Vues vs Copies** : Le slicing crée une **vue**, pas une copie ! Modifier la vue modifie l'original.

\`\`\`python
arr = np.array([1, 2, 3, 4, 5])
vue = arr[1:4]
vue[0] = 999
print(arr)  # [1 999 3 4 5] - L'original est modifié !

# Pour créer une copie indépendante
copie = arr[1:4].copy()
\`\`\`

---

## 🎭 Indexation Booléenne (Masques)

C'est l'une des fonctionnalités les plus puissantes de NumPy !

\`\`\`python
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Créer un masque booléen
masque = arr > 5
print(masque)  # [False False False False False  True  True  True  True  True]

# Appliquer le masque pour filtrer
print(arr[masque])       # [6 7 8 9 10]
print(arr[arr > 5])      # [6 7 8 9 10] (forme compacte)

# Conditions multiples
print(arr[(arr > 3) & (arr < 8)])   # [4 5 6 7] (ET logique)
print(arr[(arr < 3) | (arr > 8)])   # [1 2 9 10] (OU logique)
print(arr[~(arr > 5)])              # [1 2 3 4 5] (NON logique)
\`\`\`

> ⚠️ **Opérateurs** : Utilisez \`&\`, \`|\`, \`~\` (pas \`and\`, \`or\`, \`not\`) et mettez des parenthèses autour de chaque condition !

### Exemple pratique : Filtrage de données

\`\`\`python
# Données de ventes
ventes = np.array([150, 230, 180, 320, 95, 410, 280])
jours = np.array(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'])

# Jours avec ventes > 200
bons_jours = jours[ventes > 200]
print(bons_jours)  # ['Mar' 'Jeu' 'Sam' 'Dim']

# Moyenne des bonnes ventes
print(np.mean(ventes[ventes > 200]))  # 310.0
\`\`\`

---

## 📍 Indexation par Tableau (Fancy Indexing)

\`\`\`python
arr = np.array([10, 20, 30, 40, 50])

# Sélectionner plusieurs indices spécifiques
indices = [0, 2, 4]
print(arr[indices])  # [10 30 50]

# Réordonner
print(arr[[4, 2, 0]])  # [50 30 10]

# Avec des arrays 2D
matrice = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

# Sélectionner des éléments spécifiques
lignes = [0, 1, 2]
colonnes = [2, 1, 0]
print(matrice[lignes, colonnes])  # [3 5 7] (diagonale inverse)
\`\`\`

---

## 🔄 Modification avec Indexation

\`\`\`python
arr = np.array([1, 2, 3, 4, 5])

# Modifier un élément
arr[0] = 999
print(arr)  # [999 2 3 4 5]

# Modifier une tranche
arr[1:3] = [100, 200]
print(arr)  # [999 100 200 4 5]

# Modifier avec un masque
arr = np.array([1, 2, 3, 4, 5])
arr[arr > 3] = 0
print(arr)  # [1 2 3 0 0]

# Modifier avec une opération
arr = np.array([1, 2, 3, 4, 5])
arr[arr > 3] *= 10
print(arr)  # [1 2 3 40 50]
\`\`\`

---

## 📋 Résumé

| Type | Syntaxe | Exemple |
|------|---------|---------|
| Index simple | \`arr[i]\` | \`arr[0]\` → Premier élément |
| Index 2D | \`arr[i, j]\` | \`arr[1, 2]\` → Ligne 1, Col 2 |
| Slice | \`arr[start:stop:step]\` | \`arr[::2]\` → Pairs |
| Masque booléen | \`arr[condition]\` | \`arr[arr > 5]\` |
| Fancy indexing | \`arr[[i, j, k]]\` | \`arr[[0, 2, 4]]\` |

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/01-numpy-indexing-exercice.py\`
`,

    '02-numpy-operations': `
# Module 2 : Opérations et Agrégations NumPy

NumPy offre une vaste collection de fonctions mathématiques optimisées. Ce module couvre les opérations les plus utilisées en Data Engineering.

---

## ➕ Opérations Mathématiques de Base

### Arithmétique élémentaire

\`\`\`python
import numpy as np

a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

# Opérations élément par élément
print(a + b)      # [11 22 33 44]
print(a - b)      # [-9 -18 -27 -36]
print(a * b)      # [10 40 90 160]
print(a / b)      # [0.1 0.1 0.1 0.1]
print(a ** 2)     # [1 4 9 16]
print(np.sqrt(a)) # [1. 1.41 1.73 2.]
\`\`\`

### Fonctions mathématiques universelles (ufuncs)

\`\`\`python
arr = np.array([1, 4, 9, 16, 25])

# Racines et puissances
print(np.sqrt(arr))    # Racine carrée
print(np.power(arr, 3)) # Puissance 3
print(np.exp(arr))     # Exponentielle

# Logarithmes
print(np.log(arr))     # Log naturel
print(np.log10(arr))   # Log base 10
print(np.log2(arr))    # Log base 2

# Trigonométrie
angles = np.array([0, np.pi/4, np.pi/2, np.pi])
print(np.sin(angles))
print(np.cos(angles))

# Arrondi
decimaux = np.array([1.2, 2.5, 3.7, 4.9])
print(np.round(decimaux))  # [1. 2. 4. 5.]
print(np.floor(decimaux))  # [1. 2. 3. 4.]
print(np.ceil(decimaux))   # [2. 3. 4. 5.]
\`\`\`

---

## 📊 Fonctions d'Agrégation

Les agrégations résument un array en une seule valeur (ou moins de valeurs).

### Statistiques de base

\`\`\`python
arr = np.array([12, 45, 23, 67, 34, 89, 56])

# Somme et produit
print(np.sum(arr))       # 326
print(np.prod(arr))      # 2,717,745,600

# Min et max
print(np.min(arr))       # 12
print(np.max(arr))       # 89
print(np.argmin(arr))    # 0 (indice du min)
print(np.argmax(arr))    # 5 (indice du max)

# Moyenne, médiane, écart-type
print(np.mean(arr))      # 46.57
print(np.median(arr))    # 45.0
print(np.std(arr))       # 24.72
print(np.var(arr))       # 611.1 (variance)

# Percentiles
print(np.percentile(arr, 25))  # Q1
print(np.percentile(arr, 50))  # Médiane
print(np.percentile(arr, 75))  # Q3
\`\`\`

> 💡 **Différence std / var** : L'écart-type (\`std\`) est la racine carrée de la variance (\`var\`). L'écart-type est dans la même unité que les données.

### Agrégation par axe (2D)

\`\`\`python
matrice = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

# Sans axe : agrège TOUT
print(np.sum(matrice))         # 45

# axis=0 : agrège les LIGNES (↓ verticalement)
print(np.sum(matrice, axis=0)) # [12 15 18]

# axis=1 : agrège les COLONNES (→ horizontalement)
print(np.sum(matrice, axis=1)) # [6 15 24]
\`\`\`

> 🧠 **Mnémotechnique** : \`axis=0\` "écrase" la dimension 0 (les lignes). \`axis=1\` "écrase" la dimension 1 (les colonnes).

\`\`\`python
# Exemple pratique : notes d'étudiants
#         Math  Phys  Chimie
notes = np.array([
    [15, 12, 14],   # Étudiant 1
    [18, 16, 17],   # Étudiant 2
    [10, 11, 9],    # Étudiant 3
])

# Moyenne par étudiant (sur les matières)
print(np.mean(notes, axis=1))  # [13.67 17. 10.]

# Moyenne par matière (sur les étudiants)
print(np.mean(notes, axis=0))  # [14.33 13. 13.33]
\`\`\`

---

## 🔗 Opérations de Comparaison et Logiques

\`\`\`python
arr = np.array([1, 2, 3, 4, 5])

# Comparaisons (retournent des arrays booléens)
print(arr > 3)       # [False False False  True  True]
print(arr == 3)      # [False False  True False False]

# Fonctions de test
print(np.any(arr > 4))   # True (au moins un > 4)
print(np.all(arr > 0))   # True (tous > 0)

# Compter les éléments True
print(np.sum(arr > 2))   # 3 (trois éléments > 2)

# np.where : condition ternaire vectorisée
result = np.where(arr > 2, "grand", "petit")
print(result)  # ['petit' 'petit' 'grand' 'grand' 'grand']

# np.where avec valeurs numériques
result = np.where(arr > 2, arr * 10, arr)
print(result)  # [1 2 30 40 50]
\`\`\`

---

## 🧮 Algèbre Linéaire

\`\`\`python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Produit matriciel
print(np.dot(A, B))      # Ou A @ B
# [[19 22]
#  [43 50]]

# Transposée
print(A.T)
# [[1 3]
#  [2 4]]

# Déterminant
print(np.linalg.det(A))  # -2.0

# Inverse
print(np.linalg.inv(A))
# [[-2.   1. ]
#  [ 1.5 -0.5]]

# Valeurs propres
eigenvalues, eigenvectors = np.linalg.eig(A)
print(eigenvalues)
\`\`\`

---

## 📋 Résumé

| Catégorie | Fonctions |
|-----------|-----------|
| Arithmétique | \`+\`, \`-\`, \`*\`, \`/\`, \`**\`, \`np.sqrt()\` |
| Statistiques | \`np.mean()\`, \`np.median()\`, \`np.std()\` |
| Min/Max | \`np.min()\`, \`np.max()\`, \`np.argmin()\` |
| Logique | \`np.any()\`, \`np.all()\`, \`np.where()\` |
| Algèbre | \`np.dot()\`, \`@\`, \`np.linalg.inv()\` |

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/02-numpy-operations-exercice.py\`
`,

    '03-numpy-advanced': `
# Module 3 : Broadcasting et Reshape

Ce module couvre deux concepts essentiels pour manipuler efficacement les arrays NumPy : le **broadcasting** (diffusion) et les opérations de **reshape** (redimensionnement).

---

## 📡 Broadcasting

Le broadcasting permet d'effectuer des opérations entre arrays de **tailles différentes** sans avoir à les dupliquer explicitement.

### Concept de base

\`\`\`python
import numpy as np

# Sans broadcasting (naïf)
arr = np.array([1, 2, 3, 4])
# Pour ajouter 10 à chaque élément, on pourrait faire :
# arr + np.array([10, 10, 10, 10])  # Mauvais !

# Avec broadcasting
arr + 10  # NumPy "diffuse" 10 sur tous les éléments
# [11 12 13 14]
\`\`\`

> 🧠 **Principe** : NumPy étend automatiquement le plus petit array pour qu'il corresponde au plus grand, quand c'est mathématiquement cohérent.

### Règles du broadcasting

\`\`\`python
# Règle 1 : Dimensions ajoutées à gauche si nécessaire
a = np.array([1, 2, 3])        # Shape (3,)
b = np.array([[10], [20]])     # Shape (2, 1)
# a devient (1, 3) puis (2, 3) par broadcasting
# b devient (2, 3) par broadcasting
print((a + b).shape)           # (2, 3)
print(a + b)
# [[11 12 13]
#  [21 22 23]]

# Règle 2 : Dimensions de taille 1 s'étendent
a = np.ones((3, 4))            # Shape (3, 4)
b = np.array([1, 2, 3, 4])     # Shape (4,) → (1, 4) → (3, 4)
print((a * b).shape)           # (3, 4)
\`\`\`

### Exemples pratiques

\`\`\`python
# Centrer des données (soustraire la moyenne de chaque colonne)
data = np.array([
    [10, 20, 30],
    [15, 25, 35],
    [12, 22, 32]
])
moyennes = data.mean(axis=0)   # [12.33 22.33 32.33]
data_centree = data - moyennes  # Broadcasting !
print(data_centree)
# [[-2.33 -2.33 -2.33]
#  [ 2.67  2.67  2.67]
#  [-0.33 -0.33 -0.33]]

# Normaliser (min-max scaling)
data_norm = (data - data.min(axis=0)) / (data.max(axis=0) - data.min(axis=0))
\`\`\`

> 💡 **Astuce ML** : Le broadcasting est essentiel pour normaliser, standardiser, ou appliquer des transformations colonne par colonne.

---

## 🔄 Reshape et Manipulation de Forme

### Reshape

\`\`\`python
arr = np.arange(12)  # [0 1 2 ... 11]

# Transformer en matrice 3x4
mat = arr.reshape(3, 4)
print(mat)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]

# Reshape avec -1 (calcul automatique d'une dimension)
mat = arr.reshape(4, -1)  # 4 lignes, colonnes calculées
print(mat.shape)  # (4, 3)

mat = arr.reshape(-1, 6)  # Colonnes fixées, lignes calculées
print(mat.shape)  # (2, 6)
\`\`\`

> ⚠️ **Attention** : Le reshape doit conserver le nombre total d'éléments. \`12 = 3*4 = 4*3 = 2*6 = 1*12\`

### Aplatir (flatten/ravel)

\`\`\`python
mat = np.array([[1, 2, 3], [4, 5, 6]])

# flatten() : retourne une COPIE aplatie
flat = mat.flatten()
print(flat)  # [1 2 3 4 5 6]

# ravel() : retourne une VUE aplatie (plus efficace)
rav = mat.ravel()
print(rav)   # [1 2 3 4 5 6]
\`\`\`

### Transposition

\`\`\`python
mat = np.array([[1, 2, 3], [4, 5, 6]])  # Shape (2, 3)

# Transposée
print(mat.T)
# [[1 4]
#  [2 5]
#  [3 6]]
print(mat.T.shape)  # (3, 2)

# Pour les arrays 1D, T ne fait rien !
arr = np.array([1, 2, 3])
print(arr.T.shape)  # (3,) - pas de changement

# Pour créer un vrai vecteur colonne
col = arr.reshape(-1, 1)  # Shape (3, 1)
print(col)
# [[1]
#  [2]
#  [3]]
\`\`\`

### Ajouter/Supprimer des dimensions

\`\`\`python
arr = np.array([1, 2, 3])  # Shape (3,)

# Ajouter une dimension
row = arr[np.newaxis, :]   # Shape (1, 3) - vecteur ligne
col = arr[:, np.newaxis]   # Shape (3, 1) - vecteur colonne

# Équivalent avec expand_dims
row = np.expand_dims(arr, axis=0)  # Shape (1, 3)
col = np.expand_dims(arr, axis=1)  # Shape (3, 1)

# Supprimer les dimensions de taille 1
mat = np.array([[[1, 2, 3]]])  # Shape (1, 1, 3)
squeezed = np.squeeze(mat)     # Shape (3,)
\`\`\`

---

## 🔗 Concaténation et Stack

\`\`\`python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# Concaténation verticale (empiler les lignes)
vert = np.vstack([a, b])
# ou np.concatenate([a, b], axis=0)
print(vert)
# [[1 2]
#  [3 4]
#  [5 6]
#  [7 8]]

# Concaténation horizontale (empiler les colonnes)
horiz = np.hstack([a, b])
# ou np.concatenate([a, b], axis=1)
print(horiz)
# [[1 2 5 6]
#  [3 4 7 8]]

# Stack : crée une NOUVELLE dimension
stacked = np.stack([a, b])
print(stacked.shape)  # (2, 2, 2)
\`\`\`

---

## ✂️ Splitting

\`\`\`python
arr = np.arange(12).reshape(4, 3)

# Split en 2 parties égales (lignes)
parts = np.vsplit(arr, 2)
print(len(parts))  # 2

# Split en indices spécifiques
parts = np.vsplit(arr, [1, 3])  # Split après lignes 1 et 3
# Donne 3 parties : [:1], [1:3], [3:]

# Split horizontal
parts = np.hsplit(arr, 3)  # Split en 3 colonnes
\`\`\`

---

## 📋 Résumé

| Opération | Fonction | Exemple |
|-----------|----------|---------|
| Redimensionner | \`reshape()\` | \`arr.reshape(3, 4)\` |
| Aplatir | \`flatten()\`, \`ravel()\` | \`mat.flatten()\` |
| Transposer | \`.T\` | \`mat.T\` |
| Ajouter dim | \`np.newaxis\`, \`expand_dims()\` | \`arr[:, np.newaxis]\` |
| Empiler | \`vstack()\`, \`hstack()\`, \`stack()\` | \`np.vstack([a, b])\` |
| Séparer | \`vsplit()\`, \`hsplit()\` | \`np.vsplit(arr, 2)\` |

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/03-numpy-advanced-exercice.py\`
`,

    '04-pandas-intro': `
# Module 4 : Introduction à Pandas

Pandas est LA bibliothèque Python pour la manipulation de données tabulaires. Elle offre des structures de données puissantes (\`Series\`, \`DataFrame\`) et des outils pour charger, nettoyer, et analyser des données.

> 🧠 **Pandas + NumPy** : Pandas est construit sur NumPy. Un DataFrame est essentiellement un tableau 2D avec des labels pour les lignes et colonnes.

---

## 📦 Installation et Import

\`\`\`python
# Installation
# pip install pandas

# Import standard
import pandas as pd
import numpy as np
\`\`\`

> ⚠️ **Convention** : Utilisez TOUJOURS \`pd\` comme alias pour pandas.

---

## 📊 Series : Le Vecteur Labellisé

Une \`Series\` est comme un array 1D avec un **index** (labels).

\`\`\`python
# Création depuis une liste
s = pd.Series([10, 20, 30, 40])
print(s)
# 0    10
# 1    20
# 2    30
# 3    40
# dtype: int64

# Avec un index personnalisé
ventes = pd.Series([150, 230, 180], index=['Lundi', 'Mardi', 'Mercredi'])
print(ventes)
# Lundi       150
# Mardi       230
# Mercredi    180
# dtype: int64

# Accès par index
print(ventes['Mardi'])     # 230
print(ventes[['Lundi', 'Mercredi']])  # Plusieurs éléments

# Depuis un dictionnaire
data = {'a': 100, 'b': 200, 'c': 300}
s = pd.Series(data)
print(s)
\`\`\`

---

## 📋 DataFrame : La Table

Un \`DataFrame\` est une table 2D avec des **colonnes nommées** et un **index**.

### Création

\`\`\`python
# Depuis un dictionnaire
data = {
    'Nom': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Ville': ['Paris', 'Lyon', 'Marseille']
}
df = pd.DataFrame(data)
print(df)
#       Nom  Age      Ville
# 0    Alice   25      Paris
# 1      Bob   30       Lyon
# 2  Charlie   35  Marseille

# Avec un index personnalisé
df = pd.DataFrame(data, index=['emp1', 'emp2', 'emp3'])
print(df)
#          Nom  Age      Ville
# emp1    Alice   25      Paris
# emp2      Bob   30       Lyon
# emp3  Charlie   35  Marseille

# Depuis une liste de dictionnaires
records = [
    {'Nom': 'Alice', 'Age': 25},
    {'Nom': 'Bob', 'Age': 30, 'Ville': 'Lyon'}  # Valeurs manquantes possibles
]
df = pd.DataFrame(records)
\`\`\`

---

## 📁 Lecture de Fichiers

### CSV

\`\`\`python
# Lecture basique
df = pd.read_csv('data.csv')

# Options courantes
df = pd.read_csv('data.csv',
    sep=';',              # Séparateur (point-virgule)
    encoding='utf-8',     # Encodage
    header=0,             # Ligne d'en-tête (0 = première)
    index_col='id',       # Colonne comme index
    usecols=['col1', 'col2'],  # Colonnes à charger
    nrows=1000,           # Limiter le nombre de lignes
    na_values=['N/A', 'null'],  # Valeurs considérées comme NaN
    parse_dates=['date']   # Parser comme dates
)

# Écriture
df.to_csv('output.csv', index=False)
\`\`\`

### Excel

\`\`\`python
# Nécessite openpyxl ou xlrd
# pip install openpyxl

df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# Écriture
df.to_excel('output.xlsx', index=False, sheet_name='Données')
\`\`\`

### JSON

\`\`\`python
df = pd.read_json('data.json')
df.to_json('output.json', orient='records')
\`\`\`

> 💡 **Astuce** : Pour de gros fichiers CSV, utilisez \`chunksize\` pour lire par morceaux.

---

## 🔍 Exploration Rapide

\`\`\`python
# Aperçu des données
print(df.head())       # 5 premières lignes
print(df.tail(3))      # 3 dernières lignes
print(df.sample(10))   # 10 lignes aléatoires

# Informations générales
print(df.info())       # Types, valeurs non-nulles, mémoire
print(df.describe())   # Statistiques descriptives

# Dimensions
print(df.shape)        # (n_lignes, n_colonnes)
print(len(df))         # Nombre de lignes

# Colonnes et index
print(df.columns)      # Noms des colonnes
print(df.index)        # Index
print(df.dtypes)       # Types de chaque colonne
\`\`\`

### Exemple de sortie \`df.info()\`

\`\`\`
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 1000 entries, 0 to 999
Data columns (total 5 columns):
 #   Column  Non-Null Count  Dtype  
---  ------  --------------  -----  
 0   id      1000 non-null   int64  
 1   name    998 non-null    object 
 2   age     1000 non-null   int64  
 3   salary  950 non-null    float64
 4   date    1000 non-null   datetime64[ns]
dtypes: datetime64[ns](1), float64(1), int64(2), object(1)
memory usage: 39.2+ KB
\`\`\`

---

## 📊 Types de Données Pandas

| dtype | Description | Exemple |
|-------|-------------|---------|
| \`int64\` | Entiers | 1, 42, -10 |
| \`float64\` | Flottants | 3.14, -2.5 |
| \`object\` | Texte (string) | "Alice", "Paris" |
| \`bool\` | Booléen | True, False |
| \`datetime64\` | Dates/heures | 2024-01-15 |
| \`category\` | Catégories | "M"/"F" (économise mémoire) |

\`\`\`python
# Vérifier les types
print(df.dtypes)

# Convertir un type
df['age'] = df['age'].astype(int)
df['city'] = df['city'].astype('category')
\`\`\`

---

## 📋 Résumé

| Opération | Code |
|-----------|------|
| Créer DataFrame | \`pd.DataFrame(data)\` |
| Lire CSV | \`pd.read_csv('file.csv')\` |
| Lire Excel | \`pd.read_excel('file.xlsx')\` |
| Aperçu | \`df.head()\`, \`df.tail()\` |
| Infos | \`df.info()\`, \`df.describe()\` |
| Dimensions | \`df.shape\`, \`len(df)\` |

> 📁 **Fichier d'exercices** : \`exercises/data-engineering/04-pandas-intro-exercice.py\`
`
};

export const getDataEngineeringChapterContent = (chapterId) => {
    return dataEngineeringChapters[chapterId] || null;
};
