import { Database, Server, Share2, Box, Layers, Network } from 'lucide-react';

export const nosqlContent = {
    themes: [
        {
            id: 'nosql_concepts',
            title: 'Concepts NoSQL',
            description: 'Comprendre la révolution du Big Data.',
            categories: [
                {
                    id: 'intro',
                    title: '1. Introduction',
                    description: 'Pourquoi et Quand ?',
                    snippets: [
                        {
                            id: 'what_is_nosql',
                            title: 'C\'est quoi NoSQL ?',
                            description: 'Not Only SQL.',
                            level: 'beginner',
                            tags: ['nosql', 'concept', 'intro'],
                            markdown: `### 🚫 La fin du "Taille Unique"
Avant, on utilisait des bases relationnelles (SQL) pour TOUT.
Mais avec le Web (Facebook, Google), on a eu besoin de :
1.  **Volume** : Stocker des pétaoctets.
1.  **Document (MongoDB)** : Stocke des JSON. Flexible. Idéal pour le Web.
2.  **Clé-Valeur (Redis)** : Comme un dictionnaire géant. Ultra rapide (Cache).
3.  **Colonnes Larges (Cassandra)** : Pour les séries temporelles et l'IoT.
4.  **Graphe (Neo4j)** : Pour les réseaux sociaux et la fraude.`
                        },
                        {
                            id: 'cap_theorem',
                            title: 'Théorème CAP',
                            description: 'On ne peut pas tout avoir.',
                            level: 'beginner',
                            tags: ['nosql', 'cap', 'theory'],
                            markdown: `### ⚖️ Choisis-en 2 sur 3
Dans un système distribué, tu dois choisir entre :
*   **C**onsistency (Cohérence) : Tout le monde voit la même donnée au même moment.
*   **A**vailability (Disponibilité) : Le système répond toujours (même si la donnée est vieille).
*   **P**artition Tolerance (Tolérance aux pannes) : Le système résiste aux coupures réseau.

**SQL** = CA (Souvent)
**MongoDB** = CP (Par défaut)
**Cassandra** = AP`
                        }
                    ]
                }
            ]
        },
        {
            id: 'mongodb',
            title: 'MongoDB (Document)',
            description: 'La base NoSQL la plus populaire.',
            categories: [
                {
                    id: 'mongo_basics',
                    title: '1. CRUD de base',
                    description: 'Create, Read, Update, Delete.',
                    snippets: [
                        {
                            id: 'mongo_insert',
                            title: 'Insérer (Insert)',
                            description: 'Ajouter un document JSON.',
                            level: 'beginner',
                            tags: ['mongodb', 'insert', 'crud'],
                            code: `// Insérer un seul document
db.users.insertOne({
    name: "Alice",
    age: 25,
    skills: ["Python", "SQL"]
})

// Insérer plusieurs
db.users.insertMany([
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
])`
                        },
                        {
                            id: 'mongo_find',
                            title: 'Rechercher (Find)',
                            description: 'Le SELECT du NoSQL.',
                            level: 'beginner',
                            tags: ['mongodb', 'find', 'query'],
                            code: `// Tout sélectionner (SELECT *)
db.users.find()

// Filtrer (WHERE name = "Alice")
db.users.find({ name: "Alice" })

// Opérateurs ($gt, $in...)
db.users.find({ age: { $gt: 25 } }) // age > 25
db.users.find({ skills: { $in: ["Python"] } }) // contient Python`
                        },
                        {
                            id: 'mongo_update',
                            title: 'Mettre à jour (Update)',
                            description: 'Modifier des documents.',
                            level: 'beginner',
                            tags: ['mongodb', 'update', 'crud'],
                            code: `// Modifier le premier trouvé
db.users.updateOne(
    { name: "Alice" }, // Filtre
    { $set: { age: 26 } } // Action ($set, $inc...)
)

// Modifier tous les matchs
db.users.updateMany(
    { age: { $lt: 30 } },
    { $set: { status: "Junior" } }
)`
                        },
                        {
                            id: 'mongo_delete',
                            title: 'Supprimer (Delete)',
                            description: 'Retirer des documents.',
                            level: 'beginner',
                            tags: ['mongodb', 'delete', 'crud'],
                            code: `db.users.deleteOne({ name: "Charlie" })
db.users.deleteMany({ status: "Inactive" })`
                        }
                    ]
                },
                {
                    id: 'mongo_advanced',
                    title: '2. Avancé',
                    description: 'Agrégations et Index.',
                    snippets: [
                        {
                            id: 'mongo_aggregation',
                            title: 'Pipeline d\'Agrégation',
                            description: 'Le GROUP BY puissant de Mongo.',
                            level: 'intermediate',
                            tags: ['mongodb', 'aggregation', 'pipeline'],
                            code: `db.orders.aggregate([
    // 1. Filtrer (WHERE)
    { $match: { status: "completed" } },
    
    // 2. Grouper (GROUP BY)
    { $group: {
        _id: "$customerId", // Group by Customer
        totalSpent: { $sum: "$amount" }, // Sum Amount
        avgCart: { $avg: "$amount" }
    }},
    
    // 3. Trier (ORDER BY)
    { $sort: { totalSpent: -1 } }
])`
                        },
                        {
                            id: 'mongo_index',
                            title: 'Les Index',
                            description: 'Accélérer les recherches.',
                            level: 'intermediate',
                            tags: ['mongodb', 'index', 'performance'],
                            code: `// Créer un index sur le champ "email"
db.users.createIndex({ email: 1 })

// Index composé (Nom + Prénom)
db.users.createIndex({ lastname: 1, firstname: 1 })`
                        }
                    ]
                },
                {
                    id: 'mongo_syntax',
                    title: '3. Syntaxe des Requêtes',
                    description: 'L\'ordre des mots-clés MongoDB.',
                    snippets: [
                        {
                            id: 'mongo_query_order',
                            title: 'Ordre des Mots-Clés',
                            description: 'Comment construire une requête complète.',
                            level: 'beginner',
                            tags: ['mongodb', 'syntax', 'query'],
                            markdown: `### 📝 Structure d'une Requête MongoDB

\`\`\`javascript
db.collection.method({ filtre }, { projection })
    .sort({ tri })
    .skip(n)
    .limit(n)
\`\`\`

### 🔢 Ordre des Éléments

| # | Élément | Description | Exemple |
|---|---------|-------------|---------|
| 1 | \`db\` | Base de données | \`db\` |
| 2 | \`collection\` | Nom de la collection | \`.Sportifs\` |
| 3 | \`method()\` | find, aggregate, etc. | \`.find()\` |
| 4 | \`{ filtre }\` | Condition WHERE | \`{ Age: { $gte: 25 } }\` |
| 5 | \`{ projection }\` | Champs à afficher | \`{ _id: 0, Nom: 1 }\` |
| 6 | \`.sort()\` | Tri des résultats | \`.sort({ Age: -1 })\` |
| 7 | \`.skip()\` | Sauter N résultats | \`.skip(10)\` |
| 8 | \`.limit()\` | Limiter les résultats | \`.limit(5)\` |

### 🎯 Exemple Complet

\`\`\`javascript
// Trouver les sportifs de 25 ans ou plus,
// Afficher seulement Nom et Age,
// Trier par Age décroissant puis Nom croissant,
// Prendre les 10 premiers résultats.

db.Sportifs.find(
    { "Age": { "$gte": 25 } },           // 1. FILTRE
    { "_id": 0, "Nom": 1, "Age": 1 }     // 2. PROJECTION
).sort(
    { "Age": -1, "Nom": 1 }              // 3. TRI
).limit(10)                               // 4. LIMITE
\`\`\`

> **💡 Astuce**: La projection utilise \`1\` pour afficher et \`0\` pour masquer.`
                        }
                    ]
                },
                {
                    id: 'mongo_operators',
                    title: '4. Opérateurs Avancés',
                    description: '$or, $exists, $regex, $in, $nin...',
                    snippets: [
                        {
                            id: 'mongo_logical_ops',
                            title: 'Opérateurs Logiques',
                            description: '$or, $and, $not, $nor.',
                            level: 'intermediate',
                            tags: ['mongodb', 'operators', 'logical'],
                            code: `// $or : Age >= 32 OU Sexe = "F"
db.Sportifs.find({
    "$or": [
        { "Age": { "$gte": 32 } },
        { "Sexe": "F" }
    ]
})

// $and implicite (les deux conditions)
db.Sportifs.find({
    "Age": { "$gte": 25 },
    "Sexe": "M"
})

// $not : inverse une condition
db.Sportifs.find({
    "Sports.Entrainer": {
        "$not": { "$elemMatch": { "$nin": ["Hand ball", "Basket ball"] } }
    }
})`
                        },
                        {
                            id: 'mongo_element_ops',
                            title: 'Opérateurs d\'Éléments',
                            description: '$exists, $type.',
                            level: 'intermediate',
                            tags: ['mongodb', 'operators', 'exists'],
                            code: `// Sportifs qui ont le champ "Sports.Arbitrer"
db.Sportifs.find({
    "Sports.Arbitrer": { "$exists": true }
})

// Sportifs sans conseiller (champ absent ou null)
db.Sportifs.find({
    "$or": [
        { "IdSportifConseiller": { "$exists": false } },
        { "IdSportifConseiller": null }
    ]
})`
                        },
                        {
                            id: 'mongo_comparison_ops',
                            title: 'Opérateurs de Comparaison',
                            description: '$in, $nin, $gt, $gte, $lt, $lte.',
                            level: 'beginner',
                            tags: ['mongodb', 'operators', 'comparison'],
                            code: `// $in : Ville dans la liste
db.Gymnases.find({
    "Ville": { "$in": ["Villetaneuse", "Sarcelles"] }
})

// $nin : Jour PAS dans la liste
db.Gymnases.find({
    "Seances.Jour": { "$nin": ["Dimanche", "dimanche"] }
})

// Combinaison : Ville dans liste ET Surface > 400
db.Gymnases.find({
    "Ville": { "$in": ["Villetaneuse", "Sarcelles"] },
    "Surface": { "$gt": 400 }
})`
                        },
                        {
                            id: 'mongo_regex',
                            title: 'Pattern Matching ($regex)',
                            description: 'Recherche par expression régulière.',
                            level: 'intermediate',
                            tags: ['mongodb', 'regex', 'pattern'],
                            code: `// Séances le mercredi (insensible à la casse)
db.Gymnases.find({
    "Seances.Jour": { "$regex": /mercredi/i }
})

// Noms commençant par "K"
db.Sportifs.find({
    "Nom": { "$regex": /^K/ }
})`
                        }
                    ]
                },
                {
                    id: 'mongo_arrays',
                    title: '5. Tableaux (Arrays)',
                    description: '$elemMatch, $all, $size, $unwind.',
                    snippets: [
                        {
                            id: 'mongo_array_intro',
                            title: 'Comprendre les Tableaux',
                            description: 'Le problème des documents imbriqués.',
                            level: 'intermediate',
                            tags: ['mongodb', 'arrays', 'concept'],
                            markdown: `### 📦 Le Problème des Tableaux Imbriqués

En MongoDB, un document peut contenir des **tableaux d'objets** :

\`\`\`json
{
  "NomGymnase": "Gym A",
  "Seances": [
    { "Jour": "Lundi", "Libelle": "Hockey", "Horaire": 14 },
    { "Jour": "Mardi", "Libelle": "Basket", "Horaire": 18 }
  ]
}
\`\`\`

### ❓ Comment chercher dedans ?

| Besoin | Opérateur | Exemple |
|--------|-----------|----------|
| Un élément contient une valeur | Requête simple | \`"Seances.Jour": "Lundi"\` |
| Plusieurs conditions sur le **même** élément | \`$elemMatch\` | Hockey ET après 15h |
| Toutes les valeurs sont présentes | \`$all\` | Joue au Hand ET Basket |
| Taille exacte du tableau | \`$size\` | Exactement 3 sports |

> **⚠️ Piège classique** : Sans \`$elemMatch\`, MongoDB peut matcher des conditions sur des éléments *différents* du tableau !`
                        },
                        {
                            id: 'mongo_array_query',
                            title: 'Requêtes sur Tableaux',
                            description: '$elemMatch, $all, $size.',
                            level: 'intermediate',
                            tags: ['mongodb', 'arrays', 'elemMatch'],
                            code: `// $all : Entraîne Hand ball ET Basket ball
db.Sportifs.find({
    "Sports.Entrainer": { "$all": ["Hand ball", "Basket ball"] }
})

// $size : Tableau vide (0 éléments)
db.Sportifs.find({
    "Sports.Jouer": { "$size": 0 }
})

// $elemMatch : Condition complexe sur UN MÊME élément
// ⚠️ SANS $elemMatch : "Hockey" peut être Lundi, "Horaire > 15" peut être Mardi
// ✅ AVEC $elemMatch : Les deux conditions sur LA MÊME séance
db.Gymnases.find({
    "Seances": {
        "$elemMatch": {
            "Libelle": "Hockey",
            "Horaire": { "$gt": 15 }
        }
    }
})`
                        },
                        {
                            id: 'mongo_unwind_concept',
                            title: 'Aplatir un Tableau ($unwind)',
                            description: 'Pourquoi et comment dérouler.',
                            level: 'intermediate',
                            tags: ['mongodb', 'unwind', 'concept'],
                            markdown: `### 🔄 C'est quoi $unwind ?

\`$unwind\` **"explose"** un tableau : il crée **un document par élément** du tableau.

### Avant $unwind (1 document)
\`\`\`json
{
  "Gymnase": "Gym A",
  "Seances": [
    { "Jour": "Lundi", "Sport": "Hockey" },
    { "Jour": "Mardi", "Sport": "Basket" }
  ]
}
\`\`\`

### Après $unwind (2 documents)
\`\`\`json
{ "Gymnase": "Gym A", "Seances": { "Jour": "Lundi", "Sport": "Hockey" } }
{ "Gymnase": "Gym A", "Seances": { "Jour": "Mardi", "Sport": "Basket" } }
\`\`\`

### 🎯 Pourquoi faire ça ?

| Cas d'usage | Explication |
|-------------|-------------|
| **Compter** | Combien de séances par jour ? |
| **Grouper** | Regrouper par sport |
| **Filtrer** | Garder seulement les séances de Hockey |
| **Statistiques** | Calculer la moyenne des horaires |

> **💡** \`$unwind\` s'utilise dans un **\`aggregate()\`**, pas dans \`find()\`.`
                        },
                        {
                            id: 'mongo_unwind',
                            title: '$unwind en Pratique',
                            description: 'Exemples concrets.',
                            level: 'intermediate',
                            tags: ['mongodb', 'unwind', 'aggregation'],
                            code: `// 1. Aplatir puis limiter
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$limit": 5 }
])

// 2. Compter les séances par jour (insensible à la casse)
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$group": {
        "_id": { "$toLower": "$Seances.Jour" },
        "nb": { "$sum": 1 }
    }}
])

// 3. Pipeline complet : Filtrer -> Aplatir -> Grouper
db.Gymnases.aggregate([
    { "$match": { "Ville": "Stains" } },     // 1. Filtrer par ville
    { "$unwind": "$Seances" },                // 2. Aplatir
    { "$group": {                             // 3. Grouper par gymnase/jour
        "_id": { "Gym": "$NomGymnase", "Jour": "$Seances.Jour" },
        "Debut": { "$min": "$Seances.Horaire" },
        "Fin": { "$max": "$Seances.Horaire" }
    }}
])`
                        }
                    ]
                },
                {
                    id: 'mongo_lookup',
                    title: '6. Jointures ($lookup)',
                    description: 'Le LEFT JOIN de MongoDB.',
                    snippets: [
                        {
                            id: 'mongo_lookup_intro',
                            title: 'Comprendre $lookup',
                            description: 'Les jointures en MongoDB.',
                            level: 'advanced',
                            tags: ['mongodb', 'lookup', 'concept'],
                            markdown: `### 🔗 C'est quoi $lookup ?

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
        "localField": "customerId",    // Champ de Orders
        "foreignField": "_id",         // Champ de Customers
        "as": "client"                 // Nom du tableau résultat
    }}
])
\`\`\`

### 📋 Les Paramètres

| Paramètre | Description | Équivalent SQL |
|-----------|-------------|----------------|
| \`from\` | Collection à joindre | \`JOIN table\` |
| \`localField\` | Clé dans le doc actuel | \`ON a.field\` |
| \`foreignField\` | Clé dans l'autre collection | \`= b.field\` |
| \`as\` | Nom du tableau résultat | Alias |

> **⚠️ Important** : Le résultat est toujours un **tableau** (même vide ou avec 1 élément). Utilisez \`$unwind\` pour "aplatir".`
                        },
                        {
                            id: 'mongo_lookup_simple',
                            title: '$lookup Simple',
                            description: 'Jointure basique entre collections.',
                            level: 'advanced',
                            tags: ['mongodb', 'lookup', 'join'],
                            code: `// Trouver les sportifs les plus jeunes
// 1. Récupérer l'âge minimum
// 2. Joindre tous les sportifs de cet âge
db.Sportifs.aggregate([
    { "$group": { "_id": null, "minAge": { "$min": "$Age" } } },
    {
        "$lookup": {
            "from": "Sportifs",
            "localField": "minAge",
            "foreignField": "Age",
            "as": "Jeunes"
        }
    },
    { "$unwind": "$Jeunes" },
    { "$replaceRoot": { "newRoot": "$Jeunes" } }
])`
                        },
                        {
                            id: 'mongo_lookup_advanced_intro',
                            title: '$lookup avec Pipeline',
                            description: 'Pour des jointures complexes.',
                            level: 'advanced',
                            tags: ['mongodb', 'lookup', 'concept'],
                            markdown: `### 🚀 Jointure Avancée avec Pipeline

Parfois on a besoin de **conditions complexes** dans la jointure :
- Comparer plusieurs champs
- Filtrer les résultats de la jointure
- Faire des calculs

### Syntaxe Étendue
\`\`\`javascript
{ "$lookup": {
    "from": "AutreCollection",
    "let": { "var1": "$champ1", "var2": "$champ2" },  // Variables locales
    "pipeline": [                                      // Pipeline sur l'autre collection
        { "$match": { "$expr": { ... } } }
    ],
    "as": "resultat"
}}
\`\`\`

### 🔑 Points Clés

| Élément | Rôle |
|---------|------|
| \`let\` | Déclare des variables depuis le doc actuel |
| \`$$var\` | Accède à une variable déclarée dans \`let\` |
| \`$var\` | Accède à un champ de l'autre collection |
| \`$expr\` | Permet de comparer des champs entre eux |

> **💡 Cas d'usage** : Self-joins (couples de même âge), jointures conditionnelles, filtrage post-jointure.`
                        },
                        {
                            id: 'mongo_lookup_pipeline',
                            title: '$lookup Pipeline (Code)',
                            description: 'Exemple : couples de même âge.',
                            level: 'advanced',
                            tags: ['mongodb', 'lookup', 'pipeline'],
                            code: `// Trouver les couples de sportifs du même âge
// Self-join : on joint Sportifs avec... Sportifs !
db.Sportifs.aggregate([
    { "$project": { "Nom": 1, "Prenom": 1, "Age": 1 } },
    {
        "$lookup": {
            "from": "Sportifs",
            "let": { "age": "$Age", "id": "$_id" },  // Variables du doc actuel
            "pipeline": [
                {
                    "$match": {
                        "$expr": {
                            "$and": [
                                { "$eq": ["$Age", "$$age"] },   // Même âge
                                { "$lt": ["$_id", "$$id"] }     // Éviter doublons (A,B) et (B,A)
                            ]
                        }
                    }
                },
                { "$project": { "Nom": 1, "Prenom": 1 } }
            ],
            "as": "MemeAge"
        }
    },
    { "$match": { "MemeAge": { "$ne": [] } } }  // Garder seulement ceux avec matches
])`
                        }
                    ]
                }
            ]
        },
        {
            id: 'neo4j',
            title: 'Neo4j (Graphe)',
            description: 'Penser en Noeuds et Relations.',
            categories: [
                {
                    id: 'cypher_basics',
                    title: '1. Cypher Basics',
                    description: 'Le SQL des Graphes.',
                    snippets: [
                        {
                            id: 'neo4j_create',
                            title: 'Créer un Noeud',
                            description: 'CREATE (n:Label {prop: val}).',
                            level: 'beginner',
                            tags: ['neo4j', 'cypher', 'create'],
                            code: `CREATE (p:Person {name: "Alice", age: 30})
CREATE (c:Company {name: "Google"})`
                        },
                        {
                            id: 'neo4j_relationship',
                            title: 'Créer une Relation',
                            description: '(A)-[REL]->(B).',
                            level: 'beginner',
                            tags: ['neo4j', 'cypher', 'relationship'],
                            code: `MATCH (a:Person {name: "Alice"}), (c:Company {name: "Google"})
CREATE (a)-[:WORKS_AT {since: 2020}]->(c)`
                        },
                        {
                            id: 'neo4j_match',
                            title: 'Rechercher (MATCH)',
                            description: 'Trouver des patterns.',
                            level: 'beginner',
                            tags: ['neo4j', 'cypher', 'match'],
                            code: `// Qui travaille chez Google ?
MATCH (p:Person)-[:WORKS_AT]->(c:Company {name: "Google"})
RETURN p.name, p.age`
                        }
                    ]
                },
                {
                    id: 'cypher_advanced',
                    title: '2. requêtes Avancées',
                    description: 'Chemins et Algorithmes.',
                    snippets: [
                        {
                            id: 'neo4j_path',
                            title: 'Chemin le plus court',
                            description: 'ShortestPath.',
                            level: 'intermediate',
                            tags: ['neo4j', 'cypher', 'path'],
                            code: `// Comment Alice est reliée à Bob ?
MATCH path = shortestPath(
    (p1:Person {name: "Alice"})-[*]-(p2:Person {name: "Bob"})
)
RETURN path`
                        },
                        {
                            id: 'neo4j_algo',
                            title: 'Recommandation (Collaborative Filtering)',
                            description: 'L\'ami d\'un ami.',
                            level: 'intermediate',
                            tags: ['neo4j', 'algo', 'graph'],
                            code: `// Que recommandent mes amis ?
MATCH (moi:Person {name: "Alice"})-[:FRIEND]->(ami)-[:LIKES]->(film)
WHERE NOT (moi)-[:LIKES]->(film)
RETURN film.title, COUNT(ami) as score
ORDER BY score DESC`
                        }
                    ]
                }
            ]
        }
    ]
};
