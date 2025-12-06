// SQL code examples for the playground

export const sqlExamples = {
    select_all: {
        title: 'SELECT - Tous les employés',
        code: `-- Sélectionner tous les employés
SELECT * FROM employees;`,
        description: 'Requête SELECT basique'
    },

    select_columns: {
        title: 'SELECT - Colonnes spécifiques',
        code: `-- Sélectionner nom et salaire
SELECT name, salary 
FROM employees;`,
        description: 'Sélectionner des colonnes spécifiques'
    },

    where_clause: {
        title: 'WHERE - Filtrer les données',
        code: `-- Employés du département IT
SELECT name, department, salary
FROM employees
WHERE department = 'IT';`,
        description: 'Filtrer avec WHERE'
    },

    order_by: {
        title: 'ORDER BY - Trier les résultats',
        code: `-- Employés triés par salaire décroissant
SELECT name, salary
FROM employees
ORDER BY salary DESC;`,
        description: 'Trier les résultats'
    },

    aggregate: {
        title: 'Fonctions d\'agrégation',
        code: `-- Statistiques sur les salaires
SELECT 
    COUNT(*) as nombre_employes,
    AVG(salary) as salaire_moyen,
    MIN(salary) as salaire_min,
    MAX(salary) as salaire_max
FROM employees;`,
        description: 'COUNT, AVG, MIN, MAX'
    },

    group_by: {
        title: 'GROUP BY - Grouper les données',
        code: `-- Nombre d'employés par département
SELECT 
    department,
    COUNT(*) as nombre,
    AVG(salary) as salaire_moyen
FROM employees
GROUP BY department
ORDER BY nombre DESC;`,
        description: 'Grouper et agréger'
    },

    join: {
        title: 'JOIN - Joindre des tables',
        code: `-- Ventes avec nom de l'employé
SELECT 
    e.name,
    s.product,
    s.amount,
    s.sale_date
FROM sales s
JOIN employees e ON s.employee_id = e.id
ORDER BY s.sale_date DESC;`,
        description: 'Jointure entre tables'
    },

    join_aggregate: {
        title: 'JOIN + GROUP BY',
        code: `-- Total des ventes par employé
SELECT 
    e.name,
    e.department,
    COUNT(s.id) as nombre_ventes,
    SUM(s.amount) as total_ventes
FROM employees e
LEFT JOIN sales s ON e.employee_id = s.id
GROUP BY e.id, e.name, e.department
ORDER BY total_ventes DESC;`,
        description: 'Jointure avec agrégation'
    },

    subquery: {
        title: 'Sous-requête',
        code: `-- Employés avec salaire > moyenne
SELECT name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
)
ORDER BY salary DESC;`,
        description: 'Utiliser une sous-requête'
    },

    having: {
        title: 'HAVING - Filtrer les groupes',
        code: `-- Départements avec salaire moyen > 60000
SELECT 
    department,
    COUNT(*) as nombre,
    AVG(salary) as salaire_moyen
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;`,
        description: 'Filtrer après GROUP BY'
    }
};

// Get example by key
export function getSqlExample(key) {
    return sqlExamples[key] || sqlExamples.select_all;
}

// Get all example keys and titles
export function getSqlExamplesList() {
    return Object.entries(sqlExamples).map(([key, example]) => ({
        key,
        title: example.title,
        description: example.description
    }));
}
