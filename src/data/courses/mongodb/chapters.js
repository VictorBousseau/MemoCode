// Chapter content for MongoDB Aggregation course
// Each chapter has its content in markdown format

export const mongodbChapters = {
    '01-introduction': `
# Module 1 : Introduction à MongoDB

## Qu'est-ce que MongoDB ?

MongoDB est une base de données **NoSQL orientée document** qui stocke les données en format **BSON** (Binary JSON).

### Différences SQL vs MongoDB

| Concept SQL | Équivalent MongoDB |
|-------------|-------------------|
| Base de données | Base de données |
| Table | Collection |
| Ligne | Document |
| Colonne | Champ |
| JOIN | \`$lookup\` / Embedded documents |
| PRIMARY KEY | \`_id\` (automatique) |

### Pourquoi MongoDB ?

| Avantage | Description |
|----------|-------------|
| 🚀 **Flexible** | Pas de schéma fixe |
| 📦 **Documents imbriqués** | Pas toujours besoin de jointures |
| ⚡ **Rapide** | Index performants |
| 📊 **Scalable** | Sharding horizontal |

## Structure de la Base de Données

Pour ce cours, nous utilisons une base "Gymnases et Sportifs" :

\`\`\`
Sportifs : {
    IdSportif, Nom, Prenom, Sexe, Age,
    Sports: { Jouer: [...], Entrainer: [...], Arbitrer: [...] },
    IdSportifConseiller
}

Gymnases : {
    IdGymnase, NomGymnase, Adresse, Ville, Surface,
    Seances: [{ IdSeance, Libelle, Jour, Horaire, Duree, IdSportifEntraineur }]
}
\`\`\`

## Les Deux Méthodes de Requête

| Méthode | Usage | Équivalent SQL |
|---------|-------|----------------|
| \`db.collection.find()\` | Requêtes simples | SELECT simple |
| \`db.collection.aggregate()\` | Requêtes complexes | SELECT avec GROUP BY, JOIN |

### Quand utiliser quoi ?

- **find()** : Filtrage, projection, tri simples
- **aggregate()** : Calculs, regroupements, jointures, transformations

## Exercice 🎯

Réfléchissez à la différence entre ces deux structures :

**SQL (3 tables)**
\`\`\`
Sportifs(id, nom, age)
Sports(id, libelle)
Pratique(sportif_id, sport_id)
\`\`\`

**MongoDB (1 collection)**
\`\`\`json
{
    "_id": 1,
    "Nom": "Alice",
    "Age": 25,
    "Sports": { "Jouer": ["Tennis", "Natation"] }
}
\`\`\`

Quels sont les avantages et inconvénients de chaque approche ?
`,

    '02-find-basics': `
# Module 2 : Requêtes avec find()

## Syntaxe Générale

\`\`\`javascript
db.collection.find(
    { /* filtre */ },      // Conditions de sélection (WHERE en SQL)
    { /* projection */ }   // Champs à afficher (SELECT en SQL)
)
\`\`\`

## Opérateurs de Comparaison

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| \`$eq\` | Égal à | \`{ "Age": { "$eq": 25 } }\` ou \`{ "Age": 25 }\` |
| \`$ne\` | Différent de | \`{ "Age": { "$ne": 25 } }\` |
| \`$gt\` | Supérieur à | \`{ "Age": { "$gt": 25 } }\` |
| \`$gte\` | Supérieur ou égal | \`{ "Age": { "$gte": 25 } }\` |
| \`$lt\` | Inférieur à | \`{ "Age": { "$lt": 25 } }\` |
| \`$lte\` | Inférieur ou égal | \`{ "Age": { "$lte": 25 } }\` |
| \`$in\` | Dans une liste | \`{ "Ville": { "$in": ["Paris", "Lyon"] } }\` |
| \`$nin\` | Pas dans une liste | \`{ "Ville": { "$nin": ["Paris", "Lyon"] } }\` |

## Projection

\`\`\`javascript
{
    "_id": 0,           // 0 = masquer, 1 = afficher
    "Nom": 1,
    "Age": 1
}
\`\`\`

> ⚠️ **Important** : Par défaut, \`_id\` est **toujours affiché**. Il faut explicitement le masquer avec \`"_id": 0\`.

## Exemples Pratiques

### Sportifs entre 20 et 30 ans
\`\`\`javascript
db.Sportifs.find(
    { "Age": { "$gte": 20, "$lte": 30 } },
    { "_id": 0, "IdSportif": 1, "Nom": 1, "Prenom": 1 }
)
\`\`\`

### Gymnases de Villetaneuse ou Sarcelles > 400 m²
\`\`\`javascript
db.Gymnases.find(
    {
        "Ville": { "$in": ["VILLETANEUSE", "SARCELLES"] },
        "Surface": { "$gt": 400 }
    },
    { "_id": 0, "NomGymnase": 1, "Ville": 1, "Surface": 1 }
)
\`\`\`

## Modificateurs de Résultat

\`\`\`javascript
db.collection.find({...})
    .sort({ "Age": -1, "Nom": 1 })  // Tri (-1 = DESC, 1 = ASC)
    .limit(5)                        // Limiter à 5 résultats
    .skip(10)                        // Sauter 10 résultats
\`\`\`

## Exercice 🎯

Écrivez une requête pour trouver :
1. Tous les sportifs de plus de 30 ans, triés par nom
2. Les 5 plus grands gymnases de "STAINS"
`,

    '03-operators': `
# Module 3 : Opérateurs Logiques et de Champs

## Opérateurs Logiques

| Opérateur | Signification | Syntaxe |
|-----------|---------------|---------|
| \`$and\` | ET logique | \`{ "$and": [{ cond1 }, { cond2 }] }\` |
| \`$or\` | OU logique | \`{ "$or": [{ cond1 }, { cond2 }] }\` |
| \`$not\` | Négation | \`{ "champ": { "$not": { condition } } }\` |
| \`$nor\` | NI...NI | \`{ "$nor": [{ cond1 }, { cond2 }] }\` |

### Le $and implicite

Quand vous mettez plusieurs conditions au même niveau, MongoDB applique un \`$and\` implicite :

\`\`\`javascript
// Ces deux requêtes sont équivalentes :
db.Sportifs.find({ "Age": { "$gte": 20 }, "Sexe": "M" })
db.Sportifs.find({ "$and": [{ "Age": { "$gte": 20 } }, { "Sexe": "M" }] })
\`\`\`

### Exemple $or

\`\`\`javascript
// Sportifs qui jouent au hand OU au basket
db.Sportifs.find({
    "$or": [
        { "Sports.Jouer": "Hand ball" },
        { "Sports.Jouer": "Basket ball" }
    ]
})
\`\`\`

## Opérateurs sur les Champs

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| \`$exists\` | Le champ existe-t-il ? | \`{ "Sports": { "$exists": true } }\` |
| \`$type\` | Type du champ | \`{ "Age": { "$type": "int" } }\` |
| \`$regex\` | Expression régulière | \`{ "Nom": { "$regex": "^A" } }\` |

### Exemple $exists

\`\`\`javascript
// Sportifs qui ne pratiquent aucun sport
db.Sportifs.find(
    { "Sports": { "$exists": false } },
    { "_id": 0, "Nom": 1 }
)

// Sportifs sans conseiller
db.Sportifs.find({ "IdSportifConseiller": { "$exists": false } })
\`\`\`

### Exemple $regex

\`\`\`javascript
// Noms qui commencent par "K"
db.Sportifs.find({ "Nom": { "$regex": "^K", "$options": "i" } })
// $options: "i" = insensible à la casse
\`\`\`

## Exercice 🎯

Écrivez une requête pour :
1. Sportifs qui jouent au Hand **OU** qui entraînent du Basket
2. Personnages dont le nom contient "ERV" (insensible à la casse)
`,

    '04-arrays': `
# Module 4 : Opérations sur les Tableaux

## Requêtes sur les Tableaux

MongoDB recherche **automatiquement** dans les tableaux :

\`\`\`javascript
// Si Sports.Jouer = ["Hand ball", "Tennis"], cette requête fonctionne :
db.Sportifs.find({ "Sports.Jouer": "Hand ball" })
\`\`\`

## Opérateurs de Tableau

| Opérateur | Description | Exemple |
|-----------|-------------|---------|
| \`$all\` | Contient TOUS les éléments | \`{ "Sports.Jouer": { "$all": ["Tennis", "Golf"] } }\` |
| \`$size\` | Taille exacte du tableau | \`{ "Sports.Jouer": { "$size": 2 } }\` |
| \`$elemMatch\` | Au moins un élément correspond | Voir ci-dessous |

## Le Piège des Conditions Multiples

### ❌ Problème

\`\`\`javascript
// Hockey peut être Lundi, et Horaire > 15 peut être Mardi !
// Cette requête ne garantit PAS que les deux sont SUR LA MÊME séance
db.Gymnases.find({
    "Seances.Libelle": "Hockey",
    "Seances.Horaire": { "$gt": 15 }
})
\`\`\`

### ✅ Solution : $elemMatch

\`\`\`javascript
// Les deux conditions s'appliquent à LA MÊME séance
db.Gymnases.find({
    "Seances": { "$elemMatch": {
        "Libelle": "Hockey",
        "Horaire": { "$gt": 15 }
    }}
})
\`\`\`

## Opérateur $all

\`\`\`javascript
// Sportifs qui entraînent Hand ET Basket
db.Sportifs.find({
    "Sports.Entrainer": { "$all": ["Hand ball", "Basket ball"] }
})
\`\`\`

> ⚠️ **Piège fréquent** : Ne pas écrire \`{ "Sports.Entrainer": "Hand ball", "Sports.Entrainer": "Basket ball" }\` car en JSON, la 2ème clé **écrase** la 1ère !

## Exercice 🎯

1. Trouvez les sportifs qui pratiquent exactement 3 sports
2. Trouvez les gymnases avec une séance de Volley le mardi matin (avant 12h)
`,

    '05-aggregate-basics': `
# Module 5 : Pipeline d'Agrégation

## Concept du Pipeline

Le pipeline d'agrégation est une **séquence d'étapes** où chaque étape transforme les documents :

\`\`\`javascript
db.collection.aggregate([
    { $stage1: { ... } },
    { $stage2: { ... } },
    { $stage3: { ... } }
])
\`\`\`

Les documents passent d'une étape à l'autre comme dans un **pipeline Unix** :

\`\`\`
Documents → $match → $project → $group → $sort → Résultat
\`\`\`

## Étapes Principales

| Étape | Description | Équivalent SQL |
|-------|-------------|----------------|
| \`$match\` | Filtrer les documents | \`WHERE\` |
| \`$project\` | Sélectionner/transformer les champs | \`SELECT\` |
| \`$group\` | Regrouper et agréger | \`GROUP BY\` |
| \`$sort\` | Trier les résultats | \`ORDER BY\` |
| \`$limit\` | Limiter le nombre de résultats | \`LIMIT\` |
| \`$skip\` | Ignorer les N premiers résultats | \`OFFSET\` |

## $match - Filtrage

Filtre les documents selon des critères. **Toujours placer \`$match\` en début de pipeline** pour optimiser les performances.

\`\`\`javascript
db.Gymnases.aggregate([
    { "$match": { "Ville": "STAINS", "Surface": { "$gt": 400 } } }
])
\`\`\`

## $project - Projection et Transformation

Sélectionne, renomme ou crée des champs :

\`\`\`javascript
db.Gymnases.aggregate([
    { "$project": {
        "_id": 0,
        "nom": "$NomGymnase",           // Renommage
        "ville": "$Ville",
        "surface_m2": "$Surface"
    }}
])
\`\`\`

### Fonctions de Transformation

| Fonction | Description | Exemple |
|----------|-------------|---------|
| \`$toLower\` | Minuscules | \`{ "$toLower": "$Jour" }\` |
| \`$toUpper\` | Majuscules | \`{ "$toUpper": "$Nom" }\` |
| \`$concat\` | Concaténer | \`{ "$concat": ["$Nom", " ", "$Prenom"] }\` |
| \`$size\` | Taille tableau | \`{ "$size": "$Sports.Jouer" }\` |

## $group - Regroupement

\`\`\`javascript
db.Sportifs.aggregate([
    { "$group": {
        "_id": "$Sexe",                    // Clé de regroupement
        "nb": { "$sum": 1 },               // Compter
        "ageMoyen": { "$avg": "$Age" }     // Moyenne
    }}
])
\`\`\`

### Opérateurs d'Agrégation

| Opérateur | Description |
|-----------|-------------|
| \`$sum\` | Somme ou comptage (\`$sum: 1\`) |
| \`$avg\` | Moyenne |
| \`$min\` | Valeur minimum |
| \`$max\` | Valeur maximum |

> 💡 Utilisez \`"_id": null\` pour regrouper **tous** les documents (comme \`COUNT(*)\` sans \`GROUP BY\`).

## Exercice 🎯

Écrivez un pipeline pour :
1. Calculer l'âge moyen par sexe
2. Compter le nombre de gymnases par ville
`,

    '06-unwind': `
# Module 6 : $unwind - Éclater les Tableaux

## Concept

\`$unwind\` transforme un document contenant un tableau en **plusieurs documents** (un par élément).

## Visualisation

### Avant $unwind (1 document)

\`\`\`json
{
  "NomGymnase": "Palais des Sports",
  "Ville": "Stains",
  "Seances": [
    { "Jour": "Lundi", "Libelle": "Hockey", "Horaire": 10 },
    { "Jour": "Mardi", "Libelle": "Basket", "Horaire": 14 },
    { "Jour": "Mercredi", "Libelle": "Volley", "Horaire": 16 }
  ]
}
\`\`\`

### Après \`{ "$unwind": "$Seances" }\` (3 documents)

\`\`\`json
{ "NomGymnase": "Palais des Sports", "Ville": "Stains", 
  "Seances": { "Jour": "Lundi", "Libelle": "Hockey", "Horaire": 10 } }

{ "NomGymnase": "Palais des Sports", "Ville": "Stains", 
  "Seances": { "Jour": "Mardi", "Libelle": "Basket", "Horaire": 14 } }

{ "NomGymnase": "Palais des Sports", "Ville": "Stains", 
  "Seances": { "Jour": "Mercredi", "Libelle": "Volley", "Horaire": 16 } }
\`\`\`

## ⚠️ Attention

- \`$unwind\` **multiplie** le nombre de documents
- Placez \`$match\` **AVANT** pour réduire le volume
- Après \`$unwind\`, accédez aux champs avec \`$Seances.Jour\` (plus de tableau)

## Exemples Pratiques

### Compter les séances par jour

\`\`\`javascript
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$group": {
        "_id": { "$toLower": "$Seances.Jour" },
        "nbSeances": { "$sum": 1 }
    }},
    { "$sort": { "nbSeances": -1 } }
])
\`\`\`

### Filtrer PUIS éclater (plus performant)

\`\`\`javascript
db.Gymnases.aggregate([
    { "$match": { "Ville": "MONTMORENCY" } },  // 1. Filtre d'abord !
    { "$unwind": "$Seances" },                 // 2. Puis éclate
    { "$match": { "Seances.Libelle": "Hand ball" } },
    { "$project": {
        "_id": 0,
        "Gymnase": "$NomGymnase",
        "Jour": "$Seances.Jour",
        "Horaire": "$Seances.Horaire"
    }}
])
\`\`\`

### Gymnases avec >15 séances le mercredi

\`\`\`javascript
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": { "Seances.Jour": { "$in": ["mercredi", "Mercredi"] } } },
    { "$group": {
        "_id": { "nom": "$NomGymnase", "ville": "$Ville" },
        "nbMercredi": { "$sum": 1 }
    }},
    { "$match": { "nbMercredi": { "$gte": 15 } } },  // = HAVING en SQL
    { "$sort": { "nbMercredi": -1 } }
])
\`\`\`

## Exercice 🎯

1. Comptez le nombre de sports arbitrés par sportif
2. Listez les horaires min/max par gymnase et par jour pour la ville de "STAINS"
`,

    '07-lookup': `
# Module 7 : $lookup - Jointures

## C'est quoi $lookup ?

\`$lookup\` est l'équivalent MongoDB du **LEFT JOIN** en SQL.

### Équivalence SQL

\`\`\`sql
SELECT * FROM Orders
LEFT JOIN Customers ON Orders.customerId = Customers._id
\`\`\`

### Version MongoDB

\`\`\`javascript
db.Orders.aggregate([
    { "$lookup": {
        "from": "Customers",           // Collection à joindre
        "localField": "customerId",    // Champ local
        "foreignField": "_id",         // Champ distant
        "as": "client"                 // Nom du tableau résultat
    }}
])
\`\`\`

## Paramètres

| Paramètre | Description | Équivalent SQL |
|-----------|-------------|----------------|
| \`from\` | Collection à joindre | \`JOIN table\` |
| \`localField\` | Clé dans le doc actuel | \`ON a.field\` |
| \`foreignField\` | Clé dans l'autre collection | \`= b.field\` |
| \`as\` | Nom du tableau résultat | Alias |

> ⚠️ **Important** : Le résultat est toujours un **tableau** (même vide ou avec 1 élément). Utilisez \`$unwind\` pour "aplatir".

## Exemple : Trouver les sportifs les plus jeunes

\`\`\`javascript
db.Sportifs.aggregate([
    // 1. Calculer l'âge minimum
    { "$group": { "_id": null, "minAge": { "$min": "$Age" } } },
    
    // 2. Joindre tous les sportifs de cet âge
    { "$lookup": {
        "from": "Sportifs",
        "localField": "minAge",
        "foreignField": "Age",
        "as": "Jeunes"
    }},
    
    // 3. Éclater le tableau
    { "$unwind": "$Jeunes" },
    
    // 4. Remplacer le document racine
    { "$replaceRoot": { "newRoot": "$Jeunes" } }
])
\`\`\`

## $lookup avec Pipeline (Avancé)

Pour des **conditions complexes** (comparer plusieurs champs) :

\`\`\`javascript
db.Sportifs.aggregate([
    { "$project": { "Nom": 1, "Prenom": 1, "Age": 1 } },
    { "$lookup": {
        "from": "Sportifs",
        "let": { "age": "$Age", "id": "$_id" },  // Variables du doc actuel
        "pipeline": [
            { "$match": {
                "$expr": {
                    "$and": [
                        { "$eq": ["$Age", "$$age"] },   // Même âge
                        { "$lt": ["$_id", "$$id"] }     // Éviter doublons
                    ]
                }
            }}
        ],
        "as": "MemeAge"
    }},
    { "$match": { "MemeAge": { "$ne": [] } } }
])
\`\`\`

### Syntaxe des Variables

| Syntaxe | Description |
|---------|-------------|
| \`let\` | Déclare des variables depuis le doc actuel |
| \`$$var\` | Accède à une variable déclarée dans \`let\` |
| \`$var\` | Accède à un champ de l'autre collection |

## Exercice 🎯

Trouvez le conseiller de chaque sportif en utilisant \`$lookup\` (self-join sur Sportifs).
`,

    '08-variables': `
# Module 8 : Variables et Sous-Requêtes

## Pourquoi Stocker des Résultats ?

MongoDB Shell utilise **JavaScript**. Vous pouvez :
- Stocker un résultat pour le réutiliser
- Éviter les requêtes imbriquées complexes
- Débugger étape par étape

## Méthodes Clés

| Méthode | Description | Retourne |
|---------|-------------|----------|
| \`toArray()\` | Convertit un curseur en tableau | Array |
| \`findOne()\` | Retourne 1 seul document | Object |
| \`distinct()\` | Valeurs uniques d'un champ | Array |

## Sous-Requête avec distinct()

\`\`\`javascript
// Trouver les sportifs qui sont conseillers

// 1. Récupérer les IDs des conseillers (valeurs uniques)
conseillers = db.Sportifs.distinct("IdSportifConseiller")
// Résultat : [1, 5, 12, 23, ...]

// 2. Chercher les sportifs avec ces IDs
db.Sportifs.find({
    "IdSportif": { "$in": conseillers }
})
\`\`\`

## Sous-Requête avec findOne()

\`\`\`javascript
// Trouver le conseiller de Kervadec

// Version en 2 étapes (plus lisible)
kervadec = db.Sportifs.findOne({ "Nom": "KERVADEC" })
idConseiller = kervadec.IdSportifConseiller
db.Sportifs.find({ "IdSportif": idConseiller })

// Version en 1 ligne (sous-requête)
db.Sportifs.find({
    "IdSportif": db.Sportifs.findOne({ "Nom": "KERVADEC" }).IdSportifConseiller
})
\`\`\`

## Utiliser map() pour Extraire des IDs

\`\`\`javascript
// Trouver les séances des entraîneurs de Hand ball

// 1. Récupérer les entraîneurs de Hand
entraineursHand = db.Sportifs.find(
    { "Sports.Entrainer": "Hand ball" },
    { "_id": 0, "IdSportif": 1 }
).toArray()

// 2. Extraire seulement les IDs avec map()
ids = entraineursHand.map(e => e.IdSportif)
// [1, 2, 7, 151]

// 3. Utiliser dans une requête
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": { "Seances.IdSportifEntraineur": { "$in": ids } } }
])
\`\`\`

## Stocker un Résultat d'Agrégation

\`\`\`javascript
// Trouver les sportifs les plus jeunes

// 1. Calculer l'âge minimum
agemin = db.Sportifs.aggregate([
    { "$group": { "_id": null, "agemin": { "$min": "$Age" } } }
]).toArray()[0]
// Résultat : { "_id": null, "agemin": 22 }

// 2. Utiliser la valeur dans une autre requête
db.Sportifs.find(
    { "Age": agemin.agemin },
    { "_id": 0, "Nom": 1, "Age": 1 }
)
\`\`\`

## Exercice 🎯

1. Trouvez tous les sports qui ne sont PAS entraînés par des sportifs qui entraînent du Hand ball
2. Listez les gymnases qui n'ont aucune séance le dimanche
`,

    '09-best-practices': `
# Module 9 : Bonnes Pratiques et Pièges

## Ordre Optimal du Pipeline

\`\`\`
Documents originaux
        │
        ▼
    ┌───────────┐
    │  $match   │  ← 1. Filtrer EN PREMIER (réduire le volume)
    └───────────┘
        │
        ▼
    ┌───────────┐
    │  $project │  ← 2. Garder seulement les champs nécessaires
    └───────────┘
        │
        ▼
    ┌───────────┐
    │  $unwind  │  ← 3. Éclater APRÈS filtrage
    └───────────┘
        │
        ▼
    ┌───────────┐
    │  $group   │  ← 4. Regrouper + agréger
    └───────────┘
        │
        ▼
    ┌───────────┐
    │  $match   │  ← 5. Re-filtrer les groupes (= HAVING en SQL)
    └───────────┘
        │
        ▼
    ┌───────────┐
    │   $sort   │  ← 6. Trier les résultats
    └───────────┘
\`\`\`

## Règles d'Or

1. **\`$match\` en premier** : Réduit le volume de données dès le début
2. **\`$project\` tôt** : Supprime les champs inutiles
3. **\`$unwind\` après filtrage** : Évite d'éclater des documents inutiles
4. **Testez avec \`$limit: 5\`** : Debug progressif

## Pièges Courants

### 1. Oublier \`_id: 0\` dans la projection

\`\`\`javascript
// ❌ _id affiché par défaut
db.Sportifs.find({}, { "Nom": 1 })

// ✅ Masquer explicitement _id
db.Sportifs.find({}, { "_id": 0, "Nom": 1 })
\`\`\`

### 2. Conditions sur tableau sans $elemMatch

\`\`\`javascript
// ❌ Hockey peut être Lundi, Horaire > 15 peut être Mardi !
db.Gymnases.find({
    "Seances.Libelle": "Hockey",
    "Seances.Horaire": { "$gt": 15 }
})

// ✅ Les deux conditions sur LA MÊME séance
db.Gymnases.find({
    "Seances": { "$elemMatch": {
        "Libelle": "Hockey",
        "Horaire": { "$gt": 15 }
    }}
})
\`\`\`

### 3. Écraser une clé dans le filtre

\`\`\`javascript
// ❌ La 2ème clé écrase la 1ère (JSON invalide)
{ "Sports.Entrainer": "Hand ball", "Sports.Entrainer": "Basket ball" }

// ✅ Utiliser $all pour TOUS les éléments
{ "Sports.Entrainer": { "$all": ["Hand ball", "Basket ball"] } }
\`\`\`

### 4. Casse des valeurs (case sensitivity)

\`\`\`javascript
// ❌ Peut rater "mercredi" si la BDD a "Mercredi"
{ "Seances.Jour": "mercredi" }

// ✅ Gérer les deux casses
{ "Seances.Jour": { "$in": ["mercredi", "Mercredi"] } }

// ✅ Ou normaliser avec $toLower dans aggregate
{ "$project": { "jour": { "$toLower": "$Seances.Jour" } } }
\`\`\`

## Opérateurs d'Accumulation Avancés

| Opérateur | Description |
|-----------|-------------|
| \`$first\` | Premier du groupe (dépend de l'ordre !) |
| \`$last\` | Dernier du groupe |
| \`$push\` | Tableau de toutes les valeurs |
| \`$addToSet\` | Tableau sans doublons |

> 💡 **Astuce** : \`$first\` et \`$last\` dépendent de l'ordre des documents. Utilisez \`$sort\` avant \`$group\` pour garantir l'ordre.

## Exercice Final 🎯

Écrivez le pipeline le plus optimisé pour :
1. Lister tous les sports pratiqués dans les gymnases de plus de 500 m² à STAINS
2. Grouper par sport et compter les séances
3. Trier par nombre de séances décroissant
`
};

export const getChapterContent = (chapterId) => {
    return mongodbChapters[chapterId] || null;
};

