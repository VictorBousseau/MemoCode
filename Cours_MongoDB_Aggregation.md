# Cours MongoDB : Requêtes et Agrégations

## Table des matières
1. [Introduction](#introduction)
2. [Requêtes simples avec `find()`](#requêtes-simples-avec-find)
3. [Pipeline d'agrégation](#pipeline-dagrégation)
4. [Opérateurs principaux](#opérateurs-principaux)
5. [Exercices corrigés](#exercices-corrigés)

---

## Introduction

MongoDB utilise **JavaScript** comme langage de requête. Il existe deux méthodes principales pour interroger les données :

| Méthode | Usage |
|---------|-------|
| `db.collection.find()` | Requêtes simples (filtrage, projection, tri) |
| `db.collection.aggregate()` | Requêtes complexes (jointures, calculs, transformations) |

### Schéma de la base de données

```
Sportifs : {
    IdSportif, Nom, Prenom, Sexe, Age,
    Sports: { Jouer: [...], Entrainer: [...], Arbitrer: [...] },
    IdSportifConseiller
}

Gymnases : {
    IdGymnase, NomGymnase, Adresse, Ville, Surface,
    Seances: [{ IdSeance, Libelle, Jour, Horaire, Duree, IdSportifEntraineur }]
}
```

---

## Requêtes simples avec `find()`

### Syntaxe générale

```javascript
db.collection.find(
    { /* filtre */ },      // Conditions de sélection (WHERE en SQL)
    { /* projection */ }   // Champs à afficher (SELECT en SQL)
)
```

### Opérateurs de comparaison

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| `$eq` | Égal à | `{ "Age": { "$eq": 25 } }` ou `{ "Age": 25 }` |
| `$ne` | Différent de | `{ "Age": { "$ne": 25 } }` |
| `$gt` | Supérieur à | `{ "Age": { "$gt": 25 } }` |
| `$gte` | Supérieur ou égal | `{ "Age": { "$gte": 25 } }` |
| `$lt` | Inférieur à | `{ "Age": { "$lt": 25 } }` |
| `$lte` | Inférieur ou égal | `{ "Age": { "$lte": 25 } }` |
| `$in` | Dans une liste | `{ "Ville": { "$in": ["Paris", "Lyon"] } }` |
| `$nin` | Pas dans une liste | `{ "Ville": { "$nin": ["Paris", "Lyon"] } }` |

### Opérateurs logiques

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| `$and` | ET logique | `{ "$and": [{ cond1 }, { cond2 }] }` |
| `$or` | OU logique | `{ "$or": [{ cond1 }, { cond2 }] }` |
| `$not` | Négation | `{ "champ": { "$not": { condition } } }` |
| `$nor` | NI...NI | `{ "$nor": [{ cond1 }, { cond2 }] }` |

### Opérateurs sur les champs

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| `$exists` | Le champ existe-t-il ? | `{ "Sports": { "$exists": true } }` |
| `$type` | Type du champ | `{ "Age": { "$type": "int" } }` |
| `$size` | Taille d'un tableau | `{ "Sports.Jouer": { "$size": 2 } }` |

### Projection

```javascript
{
    "_id": 0,           // 0 = masquer, 1 = afficher
    "Nom": 1,
    "Age": 1
}
```

> [!IMPORTANT]
> Par défaut, `_id` est toujours affiché. Il faut explicitement le masquer avec `"_id": 0`.

### Modificateurs de résultat

```javascript
db.collection.find({...})
    .sort({ "Age": -1, "Nom": 1 })  // Tri (-1 = DESC, 1 = ASC)
    .limit(5)                        // Limiter à 5 résultats
    .skip(10)                        // Sauter 10 résultats
```

---

## Pipeline d'agrégation

Le pipeline d'agrégation est une **séquence d'étapes** où chaque étape transforme les documents.

```javascript
db.collection.aggregate([
    { $stage1: { ... } },
    { $stage2: { ... } },
    { $stage3: { ... } }
])
```

Les documents passent d'une étape à l'autre comme dans un **pipeline Unix**.

### Étapes principales

| Étape | Description | Équivalent SQL |
|-------|-------------|----------------|
| `$match` | Filtrer les documents | `WHERE` |
| `$project` | Sélectionner/transformer les champs | `SELECT` |
| `$group` | Regrouper et agréger | `GROUP BY` |
| `$sort` | Trier les résultats | `ORDER BY` |
| `$limit` | Limiter le nombre de résultats | `LIMIT` |
| `$skip` | Ignorer les N premiers résultats | `OFFSET` |
| `$unwind` | Éclater un tableau en documents | (pas d'équivalent SQL) |
| `$lookup` | Jointure entre collections | `JOIN` |

---

### `$match` - Filtrage

Filtre les documents selon des critères. **Toujours placer `$match` en début de pipeline** pour optimiser les performances.

```javascript
{ "$match": { "Ville": "STAINS", "Surface": { "$gt": 400 } } }
```

---

### `$project` - Projection et transformation

Sélectionne, renomme ou crée des champs.

```javascript
{ "$project": {
    "_id": 0,
    "nom": "$NomGymnase",           // Renommage
    "jour": { "$toLower": "$Seances.Jour" },  // Transformation
    "surface": "$Surface"
}}
```

**Fonctions utiles dans `$project` :**

| Fonction | Description | Exemple |
|----------|-------------|---------|
| `$toLower` | Minuscules | `{ "$toLower": "$Jour" }` |
| `$toUpper` | Majuscules | `{ "$toUpper": "$Nom" }` |
| `$concat` | Concaténer | `{ "$concat": ["$Nom", " ", "$Prenom"] }` |
| `$size` | Taille tableau | `{ "$size": "$Sports.Jouer" }` |
| `$add` | Addition | `{ "$add": ["$a", "$b"] }` |
| `$subtract` | Soustraction | `{ "$subtract": ["$a", "$b"] }` |

---

### `$group` - Regroupement

Regroupe les documents par une clé et applique des opérations d'agrégation.

```javascript
{ "$group": {
    "_id": "$Ville",                    // Clé de regroupement (NULL = tous)
    "nb": { "$sum": 1 },                // Compter
    "ageMoyen": { "$avg": "$Age" },     // Moyenne
    "ageMin": { "$min": "$Age" },       // Minimum
    "ageMax": { "$max": "$Age" },       // Maximum
    "total": { "$sum": "$Surface" }     // Somme
}}
```

**Clé de regroupement composée :**

```javascript
"_id": { "ville": "$Ville", "jour": "$Seances.Jour" }
```

> [!TIP]
> Utilisez `"_id": null` pour regrouper **tous** les documents (équivalent de `COUNT(*)` sans `GROUP BY`).

---

### `$unwind` - Éclater un tableau

Transforme un document contenant un tableau en **plusieurs documents** (un par élément).

**Avant `$unwind` :**
```json
{ "NomGymnase": "Gym A", "Seances": [{ "Jour": "Lundi" }, { "Jour": "Mardi" }] }
```

**Après `{ "$unwind": "$Seances" }` :**
```json
{ "NomGymnase": "Gym A", "Seances": { "Jour": "Lundi" } }
{ "NomGymnase": "Gym A", "Seances": { "Jour": "Mardi" } }
```

> [!WARNING]
> `$unwind` multiplie le nombre de documents. Placez `$match` **avant** si possible pour réduire le volume.

---

### `$sort` - Tri

```javascript
{ "$sort": { "Ville": 1, "Surface": -1 } }  // 1 = ASC, -1 = DESC
```

---

### `$lookup` - Jointure

Jointure entre deux collections (équivalent `LEFT JOIN`).

```javascript
{ "$lookup": {
    "from": "Sportifs",              // Collection à joindre
    "localField": "IdSportifEntraineur",  // Champ local
    "foreignField": "IdSportif",     // Champ distant
    "as": "entraineur"               // Nom du nouveau champ (tableau)
}}
```

---

## Stockage des résultats dans des variables

MongoDB Shell (mongosh) utilise JavaScript. Vous pouvez donc **stocker les résultats** de requêtes dans des variables pour les réutiliser.

### Syntaxe de base

```javascript
// Stocker le résultat d'un find() dans une variable
variable = db.collection.find({ ... })

// Stocker le résultat d'une agrégation
variable = db.collection.aggregate([ ... ])
```

### Accéder aux résultats

```javascript
// Le résultat est un curseur. Pour le convertir en tableau :
resultats = db.Sportifs.find({ "Age": 25 }).toArray()

// Accéder au premier élément
premier = resultats[0]

// Accéder à un champ spécifique du premier élément
premier["Nom"]
// ou
premier.Nom
```

### Exemple : Requête en plusieurs étapes

**Cas d'usage : Trouver le conseiller de Kervadec**

```javascript
// Étape 1 : Trouver Kervadec et récupérer l'ID de son conseiller
kervadec = db.Sportifs.findOne({ "Nom": "KERVADEC" })
idConseiller = kervadec.IdSportifConseiller

// Étape 2 : Trouver le conseiller avec cet ID
db.Sportifs.find({ "IdSportif": idConseiller })
```

### Exemple : Utiliser `distinct()` pour récupérer une liste

```javascript
// Récupérer tous les IDs des sportifs qui sont conseillers
conseillers = db.Sportifs.distinct("IdSportifConseiller")
// Résultat : [1, 5, 12, 23, ...]

// Utiliser cette liste dans une requête
db.Sportifs.find({ "IdSportif": { "$in": conseillers } })
```

### Exemple : Filtrer avec JavaScript

```javascript
// Récupérer tous les sports entraînés
sports = db.Sportifs.distinct("Sports.Entrainer")
// ["Hand ball", "Basket ball", "Volley ball", "Hockey", ...]

// Filtrer avec JavaScript pour ne garder que certains sports
autres = sports.filter(s => s !== "Hand ball" && s !== "Basket ball")
// ["Volley ball", "Hockey", ...]

// Utiliser dans une requête $nin
db.Sportifs.find({ "Sports.Entrainer": { "$nin": autres } })
```

### Exemple : Stocker un résultat d'agrégation

```javascript
// Trouver l'âge minimum
agemin = db.Sportifs.aggregate([
    { "$group": { "_id": null, "agemin": { "$min": "$Age" } } }
]).toArray()[0]
// Résultat : { "_id": null, "agemin": 22 }

// Utiliser la valeur dans une autre requête
db.Sportifs.find({ "Age": agemin.agemin })
```

### Syntaxe Python (list comprehension)

Dans mongosh, vous pouvez utiliser une syntaxe proche de Python :

```javascript
// Récupérer les entraîneurs de Hand ball
entraineursHand = db.Sportifs.find(
    { "Sports.Entrainer": "Hand ball" },
    { "_id": 0, "IdSportif": 1 }
).toArray()

// Extraire uniquement les IDs (équivalent list comprehension Python)
ids = entraineursHand.map(e => e.IdSportif)
// ou avec la syntaxe Python-like dans mongosh :
[e.IdSportif for e in entraineursHand]
// Résultat : [1, 2, 3, 7, 151]

// Utiliser dans $in
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": { "Seances.IdSportifEntraineur": { "$in": ids } } }
])
```

> [!TIP]
> Utilisez des variables pour :
> - **Éviter les requêtes imbriquées** complexes
> - **Réutiliser des listes** de valeurs dans plusieurs requêtes
> - **Débugger étape par étape** en inspectant les résultats intermédiaires

---

## Opérateurs principaux

### Opérateurs d'agrégation

| Opérateur | Description |
|-----------|-------------|
| `$sum` | Somme ou comptage (`$sum: 1`) |
| `$avg` | Moyenne |
| `$min` | Valeur minimum |
| `$max` | Valeur maximum |
| `$first` | Premier élément |
| `$last` | Dernier élément |
| `$push` | Ajoute à un tableau |
| `$addToSet` | Ajoute sans doublons |

### Opérateurs de tableau

| Opérateur | Description | Exemple |
|-----------|-------------|---------|
| `$all` | Contient tous les éléments | `{ "Sports.Jouer": { "$all": ["Tennis", "Golf"] } }` |
| `$elemMatch` | Au moins un élément correspond | `{ "Seances": { "$elemMatch": { "Jour": "Lundi", "Horaire": 10 } } }` |

---

## Exercices corrigés

### Question 1 : Sportifs entre 20 et 30 ans

```javascript
db.Sportifs.find(
    { "Age": { "$gte": 20, "$lte": 30 } },
    { "_id": 0, "IdSportif": 1, "Nom": 1, "Prenom": 1 }
)
```

**Explication :** Utilise `$gte` (≥) et `$lte` (≤) pour définir un intervalle.

---

### Question 2 : Gymnases de Villetaneuse ou Sarcelles > 400 m²

```javascript
db.Gymnases.find(
    {
        "Ville": { "$in": ["VILLETANEUSE", "SARCELLES"] },
        "Surface": { "$gt": 400 }
    },
    { "_id": 0, "NomGymnase": 1, "Ville": 1, "Surface": 1 }
)
```

**Explication :** `$in` permet de tester l'appartenance à une liste. Les deux conditions sont implicitement reliées par un `AND`.

---

### Question 3 : Sportifs qui jouent au hand ball

```javascript
db.Sportifs.find(
    { "Sports.Jouer": "Hand ball" },
    { "_id": 0, "IdSportif": 1, "Nom": 1 }
)
```

**Explication :** MongoDB recherche automatiquement dans les tableaux. Si `Sports.Jouer` est `["Hand ball", "Tennis"]`, le document est trouvé.

---

### Question 4 : Gymnases avec séances de hand ball (et jours)

**Version simple (problème d'affichage) :**
```javascript
db.Gymnases.find(
    { "Seances.Libelle": "Hand ball" },
    { "_id": 0, "NomGymnase": 1, "Ville": 1, "Seances.Jour": 1 }
)
```

**Version avec agrégation (affichage correct) :**
```javascript
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": { "Seances.Libelle": "Hand ball" } },
    { "$group": {
        "_id": { "Nom": "$NomGymnase", "Ville": "$Ville", "Jour": { "$toLower": "$Seances.Jour" } },
        "nb": { "$sum": 1 }
    }},
    { "$sort": { "_id.Ville": 1, "_id.Nom": 1 } }
])
```

**Explication :** La version `find` affiche **toutes** les séances du gymnase. L'agrégation avec `$unwind` puis `$match` ne garde que les séances de hand ball.

---

### Question 5 : Hockey le mercredi après 15H

**Version agrégation (plus précise) :**
```javascript
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": {
        "Seances.Libelle": "Hockey",
        "Seances.Jour": { "$in": ["mercredi", "Mercredi"] },
        "Seances.Horaire": { "$gte": 15 }
    }},
    { "$project": { "_id": 0, "Gymnase": "$NomGymnase", "Ville": "$Ville" }},
    { "$sort": { "Ville": 1, "Gymnase": 1 } }
])
```

> [!CAUTION]
> Avec `find()`, les conditions sur les éléments d'un tableau sont évaluées **indépendamment**. Utilisez `$elemMatch` ou `aggregate` pour des conditions combinées sur le même élément.

---

### Question 6 : Sportifs qui ne pratiquent aucun sport

```javascript
db.Sportifs.find(
    { "Sports": { "$exists": false } },
    { "_id": 0, "Nom": 1 }
)
```

**Explication :** `$exists: false` vérifie que le champ `Sports` n'existe pas dans le document.

---

### Question 7 : Gymnases sans séances le dimanche

```javascript
db.Gymnases.find(
    { "Seances.Jour": { "$nin": ["dimanche", "Dimanche"] } },
    { "_id": 0, "NomGymnase": 1, "Ville": 1 }
)
```

**Explication :** `$nin` (not in) exclut les documents où `Seances.Jour` contient "dimanche" ou "Dimanche".

---

### Question 8 : Gymnases avec uniquement basket ou volley

```javascript
db.Gymnases.find({
    "$nor": [
        { "Seances.Libelle": { "$ne": "Basket ball" } },
        { "Seances.Libelle": { "$ne": "Volley ball" } }
    ]
})
```

**Explication :** Logique complexe - on exclut les gymnases qui ont des séances qui ne sont ni basket ni volley.

---

### Question 9 : Entraîneurs qui sont aussi joueurs

```javascript
db.Sportifs.find({
    "Sports.Jouer": { "$exists": true },
    "Sports.Entrainer": { "$exists": true }
})
```

**Explication :** Les deux champs doivent exister.

---

### Question 10 : Sportifs qui sont conseillers

```javascript
db.Sportifs.find({
    "IdSportif": { "$in": db.Sportifs.distinct("IdSportifConseiller") }
})
```

**Explication :**
1. `distinct()` récupère toutes les valeurs uniques de `IdSportifConseiller`
2. `$in` trouve les sportifs dont l'`IdSportif` est dans cette liste

---

### Question 11 : Conseiller de Kervadec

```javascript
db.Sportifs.find({
    "IdSportif": db.Sportifs.findOne({ "Nom": "KERVADEC" }).IdSportifConseiller
})
```

**Explication :** Requête imbriquée - on récupère d'abord l'ID du conseiller de Kervadec, puis on cherche ce sportif.

---

### Question 12 : Entraîneurs de hand ET basket

```javascript
db.Sportifs.find({
    "Sports.Entrainer": { "$all": ["Hand ball", "Basket ball"] }
})
```

> [!WARNING]
> Attention à ne pas écrire `{ "Sports.Entrainer": "Hand ball", "Sports.Entrainer": "Basket ball" }` car en JSON, la deuxième clé **écrase** la première !

---

### Question 14 : Moyenne d'âge des sportives basketteuses

```javascript
db.Sportifs.aggregate([
    { "$match": { "Sports.Jouer": "Basket ball", "Sexe": { "$in": ["f", "F"] } } },
    { "$group": { "_id": null, "AgeMoyen": { "$avg": "$Age" } } }
])
```

---

### Question 15 : Sportifs les plus jeunes

```javascript
// Étape 1 : Trouver l'âge minimum
agemin = db.Sportifs.aggregate([
    { "$group": { "_id": null, "agemin": { "$min": "$Age" } } }
]).toArray()[0]

// Étape 2 : Trouver les sportifs avec cet âge
db.Sportifs.find({ "Age": agemin.agemin }, { "_id": 0, "Nom": 1, "Age": 1 })
```

---

### Question 17 : Entraîneurs uniquement hand ou basket

```javascript
// Étape 1 : Liste des autres sports
sports = db.Sportifs.distinct("Sports.Entrainer")
autres = sports.filter(s => s !== "Hand ball" && s !== "Basket ball")

// Étape 2 : Requête
db.Sportifs.find({
    "$and": [
        { "$or": [
            { "Sports.Entrainer": "Hand ball" },
            { "Sports.Entrainer": "Basket ball" }
        ]},
        { "Sports.Entrainer": { "$nin": autres } }
    ]
})
```

**Explication :** On veut les entraîneurs qui entraînent hand OU basket, MAIS qui n'entraînent AUCUN autre sport.

---

### Question 19 : Sportifs sans conseiller

```javascript
db.Sportifs.find({ "IdSportifConseiller": { "$exists": false } })
```

---

### Question 20 : Nombre de sports arbitrés par sportif

```javascript
db.Sportifs.aggregate([
    { "$match": { "Sports.Arbitrer": { "$exists": true } } },
    { "$unwind": "$Sports.Arbitrer" },
    { "$group": { "_id": "$Nom", "nbArbitrer": { "$sum": 1 } } }
])
```

**Explication :** On éclate le tableau `Sports.Arbitrer`, puis on compte le nombre d'éléments par sportif.

---

### Question 21 : Horaires par jour pour gymnases de Stains

```javascript
db.Gymnases.aggregate([
    { "$match": { "Ville": "STAINS" } },
    { "$unwind": "$Seances" },
    { "$project": {
        "nom": "$NomGymnase",
        "jour": { "$toLower": "$Seances.Jour" },
        "h": "$Seances.Horaire"
    }},
    { "$group": {
        "_id": { "nom": "$nom", "jour": "$jour" },
        "debut": { "$min": "$h" },
        "fin": { "$max": "$h" }
    }}
])
```

---

### Question 22 : Séances journalières des entraîneurs de hand

```javascript
// Étape 1 : Récupérer les IDs des entraîneurs de Hand ball
entraineursHand = db.Sportifs.find(
    { "Sports.Entrainer": "Hand ball" },
    { "_id": 0, "IdSportif": 1 }
).toArray()

ids = entraineursHand.map(e => e.IdSportif)  // [1, 2, 3, 7, 151]

// Étape 2 : Compter les séances par entraîneur et par jour
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": { "Seances.IdSportifEntraineur": { "$in": ids } } },
    { "$project": {
        "ent": "$Seances.IdSportifEntraineur",
        "jour": { "$toLower": "$Seances.Jour" }
    }},
    { "$group": {
        "_id": { "entraineur": "$ent", "jour": "$jour" },
        "nbSeances": { "$sum": 1 }
    }}
])
```

> [!NOTE]
> On cherche **toutes les séances** des entraîneurs qui entraînent du hand, pas seulement leurs séances de hand.

---

### Question 23 : Gymnases avec plus de 15 séances le mercredi

```javascript
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": { "Seances.Jour": { "$in": ["mercredi", "Mercredi"] } } },
    { "$group": {
        "_id": { "nom": "$NomGymnase", "ville": "$Ville" },
        "nbMercredi": { "$sum": 1 }
    }},
    { "$match": { "nbMercredi": { "$gte": 15 } } }
])
```

**Explication :** Double `$match` - un avant le groupe (filtrer les séances du mercredi) et un après (filtrer les gymnases avec ≥15 séances).

---

## Bonnes pratiques

1. **Placez `$match` en premier** pour réduire le volume de données dès le début
2. **Utilisez `$project` tôt** pour ne garder que les champs nécessaires
3. **Normalisez les données** avec `$toLower` pour éviter les problèmes de casse
4. **Préférez `aggregate` à `find`** pour les conditions sur les éléments de tableaux
5. **Testez chaque étape** en ajoutant `{ "$limit": 5 }` temporairement

---

## Résumé visuel du pipeline

```
Documents originaux
        │
        ▼
    ┌───────────┐
    │  $match   │  ← Filtrer (WHERE)
    └───────────┘
        │
        ▼
    ┌───────────┐
    │  $unwind  │  ← Éclater tableaux
    └───────────┘
        │
        ▼
    ┌───────────┐
    │  $project │  ← Transformer champs
    └───────────┘
        │
        ▼
    ┌───────────┐
    │  $group   │  ← Regrouper + agréger
    └───────────┘
        │
        ▼
    ┌───────────┐
    │   $sort   │  ← Trier
    └───────────┘
        │
        ▼
    Résultat final
```
