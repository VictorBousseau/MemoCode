import { Database, Network, FileJson, Server } from 'lucide-react';

export const nosqlContent = {
    themes: [
        {
            id: 'nosql_intro',
            title: 'Introduction NoSQL',
            description: 'Comprendre la révolution "Not Only SQL".',
            categories: [
                {
                    id: 'why_nosql',
                    title: '1. Pourquoi le NoSQL ?',
                    description: 'Limites du SQL et nouvelles exigences.',
                    snippets: [
                        {
                            id: 'sql_vs_nosql',
                            title: 'SQL vs NoSQL',
                            description: 'Comparaison fondamentale.',
                            markdown: `### 🆚 Le Duel
| Caractéristique | SQL (Relationnel) | NoSQL (Distribué) |
| :--- | :--- | :--- |
| **Structure** | Tableaux rigides (Schéma fixe) | Flexible (JSON, Graphe, Clé-Valeur) |
| **Scalabilité** | Verticale (Plus gros serveur) | Horizontale (Plus de serveurs) |
| **Relations** | Jointures complexes (JOIN) | Données dénormalisées (imbriquées) |
| **Transaction** | ACID (Rigueur absolue) | BASE (Disponibilité avant tout) |

### 🚀 Quand choisir NoSQL ?
1.  **Big Data** : Volumes énormes impossibles à gérer sur une seule machine.
2.  **Données non structurées** : Logs, réseaux sociaux, IoT, catalogues produits variés.
3.  **Développement Agile** : Le schéma de données change tout le temps.`
                        },
                        {
                            id: 'nosql_types',
                            title: 'Les 4 Familles',
                            description: 'Document, Graphe, Clé-Valeur, Colonne.',
                            markdown: `### 👨‍👩‍👧‍👦 Les 4 Types de NoSQL

#### 1. Document (ex: MongoDB)
*   **Quoi** : Stocke des objets JSON (BSON).
*   **Usage** : Catalogues, Profils utilisateurs, CMS.
*   **Force** : Flexibilité totale du schéma.

#### 2. Graphe (ex: Neo4j)
*   **Quoi** : Noeuds et Relations.
*   **Usage** : Réseaux sociaux, Recommandation, Détection de fraude.
*   **Force** : Traverser des relations complexes ultra-rapidement.

#### 3. Clé-Valeur (ex: Redis)
*   **Quoi** : Un dictionnaire géant.
*   **Usage** : Cache, Sessions, Files d'attente.
*   **Force** : Vitesse extrême (en mémoire RAM).

#### 4. Colonne (ex: Cassandra)
*   **Quoi** : Comme SQL mais optimisé pour l'écriture massive.
*   **Usage** : Séries temporelles, IoT, Messages (Facebook).
*   **Force** : Écriture massive et lecture ciblée.`
                        }
                    ]
                }
            ]
        },
        {
            id: 'mongodb',
            title: 'MongoDB (Document)',
            description: 'La base de données JSON la plus populaire.',
            categories: [
                {
                    id: 'mongo_basics',
                    title: '1. Concepts & CRUD',
                    description: 'Manipuler des documents.',
                    snippets: [
                        {
                            id: 'mongo_structure',
                            title: 'Structure : Collection & Document',
                            description: 'L\'équivalent Table & Ligne.',
                            code: `// SQL : Table "users"
// Mongo : Collection "users"

// SQL : Une ligne
// Mongo : Un Document JSON (BSON)
{
    "_id": ObjectId("507f1f77bcf86cd799439011"), // Clé primaire auto
    "name": "Victor",
    "age": 28,
    "skills": ["Python", "JS"], // Tableau (Impossible en SQL standard)
    "address": {                // Objet imbriqué
        "city": "Paris",
        "zip": "75000"
    }
}`
                        },
                        {
                            id: 'mongo_crud',
                            title: 'CRUD (Insert, Find)',
                            description: 'Les commandes de base.',
                            code: `// 1. Insérer (Create)
db.users.insertOne({ name: "Alice", age: 25 })

// 2. Lire (Read)
db.users.find() // Tout
db.users.find({ name: "Alice" }) // Filtrer (WHERE)
db.users.findOne({ _id: ... }) // Un seul

// 3. Mettre à jour (Update)
// $set est OBLIGATOIRE sinon ça écrase tout le document !
db.users.updateOne(
    { name: "Alice" },    // Filtre
    { $set: { age: 26 } } // Action
)

// 4. Supprimer (Delete)
db.users.deleteOne({ name: "Alice" })`
                        }
                    ]
                },
                {
                    id: 'mongo_query',
                    title: '2. Requêtage Avancé',
                    description: 'Opérateurs et Agrégations.',
                    snippets: [
                        {
                            id: 'mongo_operators',
                            title: 'Opérateurs ($gt, $in...)',
                            description: 'Filtrer finement.',
                            code: `// Age > 18 (Greater Than)
db.users.find({ age: { $gt: 18 } })

// Age entre 18 et 30
db.users.find({ 
    age: { $gte: 18, $lte: 30 } 
})

// Ville dans une liste (IN)
db.users.find({ 
    "address.city": { $in: ["Paris", "Lyon"] } 
})

// Contient "Python" dans la liste skills
db.users.find({ skills: "Python" })`
                        },
                        {
                            id: 'mongo_aggregation',
                            title: 'Aggregation Pipeline',
                            description: 'Le "Group By" de Mongo (Puissant !).',
                            markdown: `### 🏭 Le Pipeline
Les données passent à travers une série d'étapes (stages).
\`$match\` -> \`$group\` -> \`$sort\``,
                            code: `db.orders.aggregate([
    // Étape 1 : Filtrer (WHERE)
    { $match: { status: "completed" } },

    // Étape 2 : Grouper (GROUP BY)
    { $group: {
        _id: "$customerId",       // Group By Customer
        totalSpent: { $sum: "$amount" }, // Sum Amount
        nbOrders: { $sum: 1 }     // Count
    }},

    // Étape 3 : Trier (ORDER BY)
    { $sort: { totalSpent: -1 } } // Descending
])`
                        }
                    ]
                },
                {
                    id: 'mongo_practice',
                    title: '3. Cas Pratiques (Restaurants)',
                    description: 'Exercices sur le dataset NYC Restaurants.',
                    snippets: [
                        {
                            id: 'mongo_ex_sort_array',
                            title: '1. Trier par taille de tableau',
                            description: 'Top 10 des restaurants les plus visités.',
                            code: `db.Restaurants.aggregate([
    // 1. Créer un champ calculé (Nombre de visites = taille du tableau grades)
    { $addFields: { "Nombre visite": { $size: "$grades" } } },
    
    // 2. Sélectionner les colonnes à garder (Projection)
    // borough: 1 (Garder), _id: 0 (Cacher), Nombre visite: 1 (Garder)
    { $project: { borough: 1, _id: 0, "Nombre visite": 1 } },
    
    // 3. Trier par nombre de visites décroissant (-1)
    { $sort: { "Nombre visite": -1 } },
    
    // 4. Garder les 10 premiers
    { $limit: 10 }
])`
                        },
                        {
                            id: 'mongo_ex_group_count',
                            title: '2. Compter par Quartier',
                            description: 'Nombre de restaurants par Borough.',
                            code: `db.Restaurants.aggregate([
    // Grouper par quartier (borough)
    { $group: { 
        _id: { borough: "$borough" }, // Clé de groupement
        nombreResto: { $sum: 1 }      // Compteur (+1 pour chaque ligne)
    }}
])`
                        },
                        {
                            id: 'mongo_ex_unwind_avg',
                            title: '3. Moyenne des notes (Unwind)',
                            description: 'Aplatir un tableau pour calculer la moyenne.',
                            markdown: `### 🌪️ $unwind
Cette étape "explose" le tableau \`grades\`.
Si un restaurant a 3 notes, il deviendra **3 documents** distincts dans le pipeline.
C'est indispensable pour faire des calculs sur les éléments d'un tableau.`,
                            code: `db.Restaurants.aggregate([
    // 1. Aplatir le tableau grades (1 ligne par note)
    { $unwind: "$grades" }, 
    
    // 2. Grouper par quartier et faire la moyenne des scores
    { $group: { 
        _id: { borough: "$borough" }, 
        moyenne: { $avg: "$grades.score" } 
    }}
])`
                        },
                        {
                            id: 'mongo_ex_complex',
                            title: '4. Pipeline Complexe',
                            description: 'Les rues où on mange le plus sainement.',
                            markdown: `### 🎯 Objectif
Trouver les 10 rues avec les meilleurs scores (basé sur la note la plus récente).
*Note : Dans ce dataset, un score bas est meilleur (moins de violations sanitaires).*`,
                            code: `db.Restaurants.aggregate([
    // 1. Exclure les restaurants sans notes (tableau vide)
    { $match: { grades: { $ne: [] } } },
    
    // 2. Aplatir le tableau grades
    { $unwind: "$grades" },
    
    // 3. Trier par date décroissante (pour avoir la plus récente en premier)
    { $sort: { "grades.date": -1 } },
    
    // 4. Grouper par Restaurant (Quartier + Rue) pour choper la 1ère note (la plus récente)
    { $group: { 
        _id: { borough: "$borough", street: "$address.street" },
        firstGrade: { $first: "$grades.score" } 
    }},
    
    // 5. Regrouper par Rue pour faire la moyenne de ces "dernières notes"
    { $group: { 
        _id: "$_id.street", 
        moyenneScore: { $avg: "$firstGrade" } 
    }},
    
    // 6. Trier par score décroissant (ou croissant selon la logique métier)
    { $sort: { moyenneScore: -1 } },
    
    // 7. Top 10
    { $limit: 10 }
]);`
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
                    title: '1. Le Langage Cypher',
                    description: 'L\'ASCII Art pour requêter.',
                    snippets: [
                        {
                            id: 'cypher_concept',
                            title: 'Noeuds & Relations',
                            description: 'La syntaxe intuitive (Node)-[RELATION]->(Node).',
                            markdown: `### 🎨 Le Graphe en Image
Voici à quoi ressemble un graphe Neo4j typique :

\`\`\`mermaid
graph LR
    V((Victor)) -- FRIEND --> A((Alice))
    V -- LIKES --> N[Neo4j]
    A -- KNOWS --> N
    
    style V fill:#0077ff,stroke:#fff,stroke-width:2px,color:#fff
    style A fill:#0077ff,stroke:#fff,stroke-width:2px,color:#fff
    style N fill:#00cc44,stroke:#fff,stroke-width:2px,color:#fff
\`\`\`

### ✍️ La Syntaxe Cypher
Cypher est conçu pour **ressembler** à ce dessin (ASCII Art).
*   \`(p:Person)\` : Un Noeud (avec parenthèses comme un rond).
*   \`[r:FRIEND]\` : Une Relation (avec crochets).
*   \`->\` : Une flèche pour la direction.

**Exemple :**
\`(Victor)-[:FRIEND]->(Alice)\``
                        },
                        {
                            id: 'cypher_create',
                            title: 'Créer (CREATE)',
                            description: 'Insérer des données.',
                            code: `// Créer un noeud
CREATE (v:Person {name: "Victor", age: 28})

// Créer une relation (Victor AIME le Graph)
MATCH (p:Person {name: "Victor"})
CREATE (t:Tech {name: "Graph DB"})
CREATE (p)-[:LOVES]->(t)`
                        }
                    ]
                },
                {
                    id: 'cypher_query',
                    title: '2. Requêter (MATCH)',
                    description: 'Trouver des motifs dans le graphe.',
                    snippets: [
                        {
                            id: 'match_basic',
                            title: 'Recherche Simple',
                            description: 'Trouver qui connait qui.',
                            code: `// Trouver tous les amis de Victor
MATCH (victor:Person {name: "Victor"})-[:FRIEND]->(ami)
RETURN ami.name, ami.age`
                        },
                        {
                            id: 'recommendation',
                            title: 'Recommandation (Le Graal)',
                            description: 'L\'ami d\'un ami (Pattern Matching).',
                            code: `// "Les amis de mes amis sont mes amis"
// Trouver les amis de mes amis que je ne connais pas encore
MATCH (moi:Person {name: "Victor"})-[:FRIEND]->(ami)-[:FRIEND]->(ami_d_ami)
WHERE NOT (moi)-[:FRIEND]->(ami_d_ami)
  AND moi <> ami_d_ami // Pas moi-même
RETURN ami_d_ami.name, COUNT(*) as nb_connexions_communes
ORDER BY nb_connexions_communes DESC`
                        },
                        {
                            id: 'shortest_path',
                            title: 'Chemin le plus court',
                            description: 'GPS du graphe.',
                            code: `// Degrés de séparation entre Kevin Bacon et moi
MATCH p=shortestPath(
  (bacon:Person {name:"Kevin Bacon"})-[*]-(moi:Person {name:"Victor"})
)
RETURN p`
                        }
                    ]
                }
            ]
        }
    ]
};
