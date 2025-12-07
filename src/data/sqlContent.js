import { Database, Filter, GitMerge, Layers, Calendar } from 'lucide-react';

export const sqlContent = {
    themes: [
        {
            id: 'sql_basics',
            title: 'SQL Standard',
            description: 'Extraction et Manipulation de Données',
            categories: [
                {
                    id: 'fundamentals',
                    title: '1. Les Fondamentaux',
                    description: 'Extraction, Filtrage et Tri',
                    snippets: [
                        {
                            id: 'select_basics',
                            title: 'SELECT, FROM, LIMIT',
                            description: 'La base de toute requête.',
                            level: 'beginner',
                            tags: ['sql', 'select', 'basics'],
                            code: `-- Sélectionner toutes les colonnes (*)
SELECT * 
FROM employees 
LIMIT 5; -- Toujours limiter pour explorer !

-- Sélectionner des colonnes spécifiques (Recommandé)
SELECT 
    id, 
    name, 
    salary 
FROM employees;`
                        },
                        {
                            id: 'filtering',
                            title: 'Filtrage (WHERE)',
                            description: 'Filtrer les lignes avec des conditions.',
                            level: 'beginner',
                            tags: ['sql', 'where', 'filter'],
                            code: `SELECT * 
FROM sales 
WHERE amount > 100 
  AND product = 'Laptop' -- Condition ET
  AND (employee_id = 2 OR employee_id = 5); -- Parenthèses importantes pour le OU

-- Utilisation de IN pour une liste de valeurs
SELECT * 
FROM departments 
WHERE location IN ('Paris', 'Lyon');`
                        },
                        {
                            id: 'null_handling',
                            title: 'Gestion des NULL',
                            description: 'Attention : NULL n\'est pas égal à 0 ou vide.',
                            level: 'beginner',
                            tags: ['sql', 'null', 'basics'],
                            code: `-- ❌ NE PAS FAIRE : column = NULL (ne marche jamais)
-- ✅ FAIRE : IS NULL ou IS NOT NULL

SELECT * 
FROM sales 
WHERE employee_id IS NULL; -- Ventes sans vendeur assigné (si possible)

SELECT * 
FROM employees 
WHERE department_id IS NOT NULL; -- Employés affectés à un département`
                        },
                        {
                            id: 'sorting_dedup',
                            title: 'Trier et Dédoublonner',
                            description: 'ORDER BY et DISTINCT.',
                            level: 'beginner',
                            tags: ['sql', 'order-by', 'distinct'],
                            code: `-- Trier les résultats
SELECT * 
FROM sales 
ORDER BY amount DESC; -- Du plus grand au plus petit (ASC pour croissant)

-- Supprimer les doublons
SELECT DISTINCT location 
FROM departments; -- Liste unique des lieux`
                        },
                        {
                            id: 'execution_order',
                            title: 'Ordre d\'Exécution SQL',
                            description: 'Comprendre comment le moteur lit votre requête.',
                            level: 'beginner',
                            tags: ['sql', 'concept', 'basics'],
                            code: `-- L'ordre dans lequel vous ÉCRIVEZ :
-- SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT

-- L'ordre dans lequel le moteur EXÉCUTE :
-- 1. FROM (Je charge la table)
-- 2. WHERE (Je filtre les lignes)
-- 3. GROUP BY (Je crée des groupes)
-- 4. HAVING (Je filtre les groupes)
-- 5. SELECT (Je sélectionne/calcule les colonnes)
-- 6. ORDER BY (Je trie)
-- 7. LIMIT (Je coupe)

-- C'est pourquoi on ne peut pas utiliser un alias du SELECT dans le WHERE !`
                        }
                    ]
                },
                {
                    id: 'aggregation',
                    title: '2. Agrégation',
                    description: 'Grouper et résumer les données',
                    snippets: [
                        {
                            id: 'agg_functions',
                            title: 'Fonctions d\'agrégation',
                            description: 'Compter, Sommer, Moyenne.',
                            level: 'beginner',
                            tags: ['sql', 'aggregation', 'count', 'sum'],
                            code: `SELECT 
    COUNT(*) AS total_sales,        -- Compte toutes les ventes
    COUNT(employee_id) AS assigned_sales, -- Compte les non-NULL
    SUM(amount) AS total_revenue,   -- Somme des montants
    AVG(amount) AS average_basket   -- Panier moyen
FROM sales;`
                        },
                        {
                            id: 'group_by',
                            title: 'GROUP BY',
                            description: 'La règle d\'or : Tout ce qui n\'est pas agrégé doit être groupé.',
                            level: 'beginner',
                            tags: ['sql', 'group-by', 'aggregation'],
                            code: `SELECT 
    product,                -- Colonne de groupement
    COUNT(id) AS sales_count, -- Nombre de ventes
    SUM(amount) as revenue    -- CA par produit
FROM sales 
GROUP BY product; -- OBLIGATOIRE si on sélectionne 'product'

-- Erreur classique : Oublier le GROUP BY ou une colonne dedans`
                        },
                        {
                            id: 'having',
                            title: 'Filtrer après agrégation (HAVING)',
                            description: 'WHERE filtre les lignes, HAVING filtre les groupes.',
                            level: 'beginner',
                            tags: ['sql', 'having', 'filter'],
                            code: `SELECT 
    product, 
    SUM(amount) AS total_revenue 
FROM sales 
GROUP BY product 
HAVING SUM(amount) > 1000; -- Garder uniquement les produits best-sellers

-- Ordre d'exécution : FROM -> WHERE -> GROUP BY -> HAVING -> SELECT`
                        }
                    ]
                },
                {
                    id: 'joins',
                    title: '3. Croiser les données (Joins)',
                    description: 'Connecter les tables entre elles',
                    snippets: [
                        {
                            id: 'left_join',
                            title: 'LEFT JOIN (Standard)',
                            description: 'Garder tout ce qui est à gauche (table principale).',
                            level: 'intermediate',
                            tags: ['sql', 'join', 'left-join'],
                            code: `-- Objectif : Avoir TOUS les employés, et leurs ventes s'ils en ont
SELECT 
    e.name, 
    s.product, 
    s.amount 
FROM employees e          -- Table de gauche (Tout est gardé)
LEFT JOIN sales s         -- Table de droite (Match ou NULL)
    ON e.id = s.employee_id; -- Clé de jointure

-- Si un employé n'a rien vendu, product/amount seront NULL`
                        },
                        {
                            id: 'inner_join',
                            title: 'INNER JOIN',
                            description: 'Garder uniquement l\'intersection.',
                            level: 'intermediate',
                            tags: ['sql', 'join', 'inner-join'],
                            code: `-- Objectif : Avoir la liste des ventes avec le nom de l'employé
SELECT 
    e.name, 
    s.product, 
    s.amount 
FROM employees e 
INNER JOIN sales s 
    ON e.id = s.employee_id;

-- Les employés sans ventes sont exclus`
                        },
                        {
                            id: 'join_departments',
                            title: 'JOIN avec 3 tables',
                            description: 'Lier Employé, Département et Ventes.',
                            level: 'intermediate',
                            tags: ['sql', 'join', 'multi-join'],
                            code: `SELECT 
    d.name as department,
    e.name as employee,
    s.amount
FROM departments d
INNER JOIN employees e ON d.id = e.department_id
INNER JOIN sales s ON e.id = s.employee_id
ORDER BY d.name;`
                        }
                    ]
                },
                {
                    id: 'ctes',
                    title: '4. Structurer (WITH / CTE)',
                    description: 'Rendre le code lisible et modulaire. Indispensable.',
                    snippets: [
                        {
                            id: 'cte_cleaning',
                            title: '1. Nettoyage préalable',
                            description: 'Préparer les données avant l\'analyse.',
                            level: 'intermediate',
                            tags: ['sql', 'cte', 'with', 'cleaning'],
                            code: `WITH big_sales AS (
    -- Étape 1 : On filtre les grosses ventes
    SELECT * 
    FROM sales 
    WHERE amount >= 500
)

-- Étape 2 : On fait notre analyse sur la donnée filtrée
SELECT 
    product, 
    COUNT(*) as count 
FROM big_sales 
GROUP BY product;`
                        },
                        {
                            id: 'cte_chaining',
                            title: '2. Chaînage de CTE',
                            description: 'Décomposer un problème complexe.',
                            level: 'intermediate',
                            tags: ['sql', 'cte', 'advanced'],
                            code: `WITH paris_employees AS (
    SELECT id, name FROM employees WHERE department_id = 1 -- Suppose ID 1 is IT in Paris
),

laptop_sales AS (
    SELECT employee_id, amount FROM sales WHERE product = 'Laptop'
)

-- Jointure finale entre nos deux briques logiques
SELECT 
    pe.name, 
    ls.amount 
FROM paris_employees pe 
INNER JOIN laptop_sales ls 
    ON pe.id = ls.employee_id;`
                        },
                        {
                            id: 'cte_agg_join',
                            title: '3. Agrégation avant Jointure',
                            description: 'Best Practice : Éviter de dupliquer les lignes.',
                            level: 'intermediate',
                            tags: ['sql', 'cte', 'join', 'aggregation'],
                            code: `WITH sales_per_emp AS (
    -- On calcule d'abord le total par employé (1 ligne par employé)
    SELECT 
        employee_id, 
        SUM(amount) as total_sold 
    FROM sales 
    GROUP BY employee_id
)

SELECT 
    e.name, 
    d.name as dept, 
    COALESCE(s.total_sold, 0) as total_sold -- 0 si pas de vente
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
LEFT JOIN sales_per_emp s ON e.id = s.employee_id;

-- Beaucoup plus performant que de tout joindre puis grouper !`
                        }
                    ]
                },
                {
                    id: 'advanced',
                    title: '5. SQL Avancé',
                    description: 'Dates, Logique et Window Functions',
                    snippets: [
                        {
                            id: 'dates',
                            title: 'Manipulation de Dates (SQLite)',
                            description: 'Grouper par mois/année.',
                            level: 'advanced',
                            tags: ['sql', 'date', 'time', 'sqlite'],
                            code: `-- SQLite n'a pas DATE_TRUNC, on utilise strftime
-- %Y-%m : Année-Mois
SELECT 
    strftime('%Y-%m', sale_date) as sales_month, 
    SUM(amount) as revenue 
FROM sales 
GROUP BY 1 
ORDER BY 1;`
                        },
                        {
                            id: 'case_when',
                            title: 'Logique Conditionnelle (CASE)',
                            description: 'Le "IF/ELSE" du SQL.',
                            level: 'advanced',
                            tags: ['sql', 'case', 'logic'],
                            code: `SELECT 
    id, 
    amount,
    CASE 
        WHEN amount >= 1000 THEN 'High Value'
        WHEN amount >= 100 THEN 'Medium'
        ELSE 'Low' 
    END AS category
FROM sales;`
                        },
                        {
                            id: 'window_functions',
                            title: 'Window Functions (OVER)',
                            description: 'Calculs sans réduire le nombre de lignes.',
                            level: 'advanced',
                            tags: ['sql', 'window', 'rank'],
                            code: `-- Comparer chaque vente à la moyenne du produit
SELECT 
    product,
    amount,
    AVG(amount) OVER (PARTITION BY product) as avg_product_price,
    amount - AVG(amount) OVER (PARTITION BY product) as diff_vs_avg
FROM sales;`
                        }
                    ]
                }
            ]
        }
    ]
};
