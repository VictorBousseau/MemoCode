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
