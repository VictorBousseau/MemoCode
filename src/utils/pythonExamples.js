// Python code examples for the playground

export const pythonExamples = {
    hello_world: {
        title: 'Hello World',
        code: `# Premier programme Python
print("Hello, World!")
print("Bienvenue dans le Playground Python!")`,
        description: 'Programme basique avec print()'
    },

    pandas_basics: {
        title: 'Pandas - Créer un DataFrame',
        code: `import pandas as pd

# Créer un DataFrame
df = pd.DataFrame({
    'nom': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'ville': ['Paris', 'Lyon', 'Marseille']
})

print(df)
print("\\nNombre de lignes:", len(df))`,
        description: 'Créer et afficher un DataFrame pandas'
    },

    pandas_filter: {
        title: 'Pandas - Filtrer des données',
        code: `import pandas as pd

# Créer des données
df = pd.DataFrame({
    'nom': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'salaire': [50000, 60000, 75000, 55000]
})

# Filtrer les personnes de plus de 28 ans
df_filtre = df[df['age'] > 28]

print("Données complètes:")
print(df)
print("\\nPersonnes de plus de 28 ans:")
print(df_filtre)`,
        description: 'Filtrer un DataFrame avec des conditions'
    },

    pandas_groupby: {
        title: 'Pandas - GroupBy et Agrégation',
        code: `import pandas as pd

# Créer des données de ventes
df = pd.DataFrame({
    'produit': ['A', 'B', 'A', 'B', 'A', 'B'],
    'region': ['Nord', 'Nord', 'Sud', 'Sud', 'Est', 'Est'],
    'ventes': [100, 150, 120, 180, 90, 200]
})

print("Données:")
print(df)

# Grouper par produit et calculer la somme
print("\\nVentes totales par produit:")
print(df.groupby('produit')['ventes'].sum())

# Grouper par région et calculer la moyenne
print("\\nVentes moyennes par région:")
print(df.groupby('region')['ventes'].mean())`,
        description: 'Utiliser groupby() pour agréger des données'
    },

    pandas_stats: {
        title: 'Pandas - Statistiques descriptives',
        code: `import pandas as pd
import numpy as np

# Créer des données
df = pd.DataFrame({
    'score': [85, 92, 78, 95, 88, 76, 90, 82],
    'temps': [45, 38, 52, 35, 42, 55, 40, 48]
})

print("Données:")
print(df)

print("\\nStatistiques descriptives:")
print(df.describe())

print("\\nMoyenne des scores:", df['score'].mean())
print("Médiane des temps:", df['temps'].median())
print("Écart-type des scores:", df['score'].std())`,
        description: 'Calculer des statistiques sur un DataFrame'
    },

    numpy_array: {
        title: 'NumPy - Tableaux et opérations',
        code: `import numpy as np

# Créer des tableaux
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.array([10, 20, 30, 40, 50])

print("Tableau 1:", arr1)
print("Tableau 2:", arr2)

# Opérations
print("\\nAddition:", arr1 + arr2)
print("Multiplication:", arr1 * arr2)
print("Carré:", arr1 ** 2)

# Statistiques
print("\\nMoyenne:", arr1.mean())
print("Somme:", arr1.sum())
print("Maximum:", arr1.max())`,
        description: 'Créer et manipuler des tableaux NumPy'
    },

    list_comprehension: {
        title: 'List Comprehension',
        code: `# Créer une liste de carrés
carres = [x**2 for x in range(1, 11)]
print("Carrés de 1 à 10:", carres)

# Filtrer les nombres pairs
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
pairs = [x for x in nombres if x % 2 == 0]
print("\\nNombres pairs:", pairs)

# Transformer des chaînes
mots = ['python', 'pandas', 'numpy']
majuscules = [mot.upper() for mot in mots]
print("\\nEn majuscules:", majuscules)`,
        description: 'Utiliser les list comprehensions'
    },

    functions: {
        title: 'Fonctions Python',
        code: `# Définir une fonction
def calculer_moyenne(notes):
    """Calcule la moyenne d'une liste de notes"""
    return sum(notes) / len(notes)

def afficher_resultat(nom, moyenne):
    """Affiche le résultat avec mention"""
    if moyenne >= 16:
        mention = "Très bien"
    elif moyenne >= 14:
        mention = "Bien"
    elif moyenne >= 12:
        mention = "Assez bien"
    else:
        mention = "Passable"
    
    print(f"{nom}: {moyenne:.2f}/20 - {mention}")

# Utiliser les fonctions
notes_alice = [15, 17, 14, 16]
notes_bob = [12, 13, 11, 14]

afficher_resultat("Alice", calculer_moyenne(notes_alice))
afficher_resultat("Bob", calculer_moyenne(notes_bob))`,
        description: 'Créer et utiliser des fonctions'
    }
};

// Get example by key
export function getPythonExample(key) {
    return pythonExamples[key] || pythonExamples.hello_world;
}

// Get all example keys and titles
export function getPythonExamplesList() {
    return Object.entries(pythonExamples).map(([key, example]) => ({
        key,
        title: example.title,
        description: example.description
    }));
}
