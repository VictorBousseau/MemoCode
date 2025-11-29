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
                            code: `-- Sélectionner toutes les colonnes (*)
SELECT * 
FROM users 
LIMIT 10; -- Toujours limiter pour explorer !

-- Sélectionner des colonnes spécifiques (Recommandé)
SELECT 
    id, 
    name, 
    country 
FROM users;`
                        },
                        {
                            id: 'filtering',
                            title: 'Filtrage (WHERE)',
                            description: 'Filtrer les lignes avec des conditions.',
                            code: `SELECT * 
FROM orders 
WHERE status = 'completed' 
  AND amount > 50 -- Condition ET
  AND (country = 'France' OR country = 'Germany'); -- Parenthèses importantes pour le OU

-- Utilisation de IN pour une liste de valeurs
SELECT * 
FROM users 
WHERE country IN ('France', 'Belgium', 'Switzerland');`
                        },
                        {
                            id: 'null_handling',
                            title: 'Gestion des NULL',
                            description: 'Attention : NULL n\'est pas égal à 0 ou vide.',
                            code: `-- ❌ NE PAS FAIRE : status = NULL (ne marche jamais)
-- ✅ FAIRE : IS NULL ou IS NOT NULL

SELECT * 
FROM users 
WHERE signup_date IS NULL; -- Utilisateurs sans date d'inscription

SELECT * 
FROM orders 
WHERE status IS NOT NULL; -- Commandes avec un statut défini`
                        },
                        {
                            id: 'sorting_dedup',
                            title: 'Trier et Dédoublonner',
                            description: 'ORDER BY et DISTINCT.',
                            code: `-- Trier les résultats
SELECT * 
FROM orders 
ORDER BY created_at DESC; -- Du plus récent au plus ancien (ASC pour croissant)

-- Supprimer les doublons
SELECT DISTINCT country 
FROM users; -- Liste unique des pays`
                        },
                        {
                            id: 'execution_order',
                            title: 'Ordre d\'Exécution SQL',
                            description: 'Comprendre comment le moteur lit votre requête.',
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
                            code: `SELECT 
    COUNT(*) AS total_orders,       -- Compte toutes les lignes
    COUNT(user_id) AS active_users, -- Compte les valeurs non-NULL
    SUM(amount) AS total_revenue,   -- Somme
    AVG(amount) AS average_basket   -- Moyenne
FROM orders;`
                        },
                        {
                            id: 'group_by',
                            title: 'GROUP BY',
                            description: 'La règle d\'or : Tout ce qui n\'est pas agrégé doit être groupé.',
                            code: `SELECT 
    country,                -- Colonne de groupement
    COUNT(id) AS user_count -- Fonction d'agrégation
FROM users 
GROUP BY country; -- OBLIGATOIRE si on sélectionne 'country'

-- Erreur classique : Oublier le GROUP BY ou une colonne dedans`
                        },
                        {
                            id: 'having',
                            title: 'Filtrer après agrégation (HAVING)',
                            description: 'WHERE filtre les lignes, HAVING filtre les groupes.',
                            code: `SELECT 
    user_id, 
    COUNT(id) AS order_count 
FROM orders 
GROUP BY user_id 
HAVING COUNT(id) > 5; -- Garder uniquement les gros acheteurs

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
                            code: `-- Objectif : Avoir tous les utilisateurs, et leurs commandes s'ils en ont
SELECT 
    u.name, 
    o.amount, 
    o.created_at 
FROM users u              -- Table de gauche (Tout est gardé)
LEFT JOIN orders o        -- Table de droite (Match ou NULL)
    ON u.id = o.user_id;  -- Clé de jointure

-- Si un user n'a pas de commande, amount sera NULL`
                        },
                        {
                            id: 'inner_join',
                            title: 'INNER JOIN',
                            description: 'Garder uniquement l\'intersection.',
                            code: `-- Objectif : Avoir uniquement les utilisateurs QUI ONT commandé
SELECT 
    u.name, 
    o.amount 
FROM users u 
INNER JOIN orders o 
    ON u.id = o.user_id;

-- Les utilisateurs sans commande sont exclus`
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
                            code: `WITH clean_orders AS (
    -- Étape 1 : On filtre et on nettoie d'abord
    SELECT * 
    FROM orders 
    WHERE status = 'completed' 
      AND created_at >= '2023-01-01'
)

-- Étape 2 : On fait notre analyse sur la donnée propre
SELECT 
    user_id, 
    SUM(amount) as total 
FROM clean_orders 
GROUP BY user_id;`
                        },
                        {
                            id: 'cte_chaining',
                            title: '2. Chaînage de CTE',
                            description: 'Décomposer un problème complexe.',
                            code: `WITH active_users AS (
    SELECT id, name FROM users WHERE country = 'France'
),

high_value_orders AS (
    SELECT user_id, amount FROM orders WHERE amount > 100
)

-- Jointure finale entre nos deux briques logiques
SELECT 
    u.name, 
    o.amount 
FROM active_users u 
INNER JOIN high_value_orders o 
    ON u.id = o.user_id;`
                        },
                        {
                            id: 'cte_agg_join',
                            title: '3. Agrégation avant Jointure',
                            description: 'Best Practice : Éviter de dupliquer les lignes.',
                            code: `WITH user_sales AS (
    -- On calcule d'abord le total par user (1 ligne par user)
    SELECT 
        user_id, 
        SUM(amount) as total_spent 
    FROM orders 
    GROUP BY user_id
)

SELECT 
    u.name, 
    u.country, 
    COALESCE(s.total_spent, 0) as total_spent -- 0 si pas de commande
FROM users u 
LEFT JOIN user_sales s 
    ON u.id = s.user_id;

-- Si on avait fait le JOIN avant le GROUP BY sur une grosse table, 
-- ça aurait été beaucoup plus lent et risqué (doublons).`
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
                            title: 'Manipulation de Dates',
                            description: 'Grouper par mois/année.',
                            code: `-- DATE_TRUNC (PostgreSQL/BigQuery)
-- Ramène la date au premier jour du mois/année
SELECT 
    DATE_TRUNC('month', created_at) as sales_month, 
    SUM(amount) as revenue 
FROM orders 
GROUP BY 1 -- Groupe par la 1ère colonne sélectionnée
ORDER BY 1;`
                        },
                        {
                            id: 'case_when',
                            title: 'Logique Conditionnelle (CASE)',
                            description: 'Le "IF/ELSE" du SQL.',
                            code: `SELECT 
    id, 
    amount,
    CASE 
        WHEN amount > 100 THEN 'VIP'
        WHEN amount > 50 THEN 'Standard'
        ELSE 'Petit Panier' 
    END AS segment_client 
FROM orders;`
                        },
                        {
                            id: 'window_functions',
                            title: 'Window Functions (ROW_NUMBER)',
                            description: 'Calculer sans écraser les lignes.',
                            code: `-- Objectif : Trouver la DERNIÈRE commande de chaque user
WITH ranked_orders AS (
    SELECT 
        *,
        -- Numérote les commandes par user, de la plus récente (1) à la plus ancienne
        ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC) as rn 
    FROM orders
)

SELECT * 
FROM ranked_orders 
WHERE rn = 1; -- On ne garde que la plus récente`
                        },
                        {
                            id: 'lag_lead',
                            title: 'LAG & LEAD',
                            description: 'Comparer avec la ligne précédente/suivante.',
                            code: `SELECT 
    month,
    revenue,
    -- LAG(col, 1) : Valeur de la ligne précédente
    LAG(revenue, 1) OVER(ORDER BY month) as prev_month_revenue,
    
    -- Calcul de la croissance (Growth Rate)
    (revenue - LAG(revenue, 1) OVER(ORDER BY month)) / LAG(revenue, 1) OVER(ORDER BY month) as growth
FROM monthly_sales;`
                        },
                        {
                            id: 'regex',
                            title: 'Expressions Régulières (REGEXP)',
                            description: 'Filtrage de texte avancé.',
                            code: `-- Trouver les emails gmail ou hotmail
SELECT * 
FROM users 
WHERE email ~* '@(gmail|hotmail)\\.com'; -- ~* = Regex insensible à la casse (Postgres)

-- Sur BigQuery / MySQL :
-- WHERE REGEXP_CONTAINS(email, r'@(gmail|hotmail)\\.com')`
                        }
                    ]
                }
            ]
        }
    ]
};
