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
        code: `-- Employés avec un salaire > 60000
SELECT name, salary, hire_date
FROM employees
WHERE salary > 60000;`,
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
        code: `-- Nombre d'employés par département (avec Jointure)
SELECT 
    d.name as department,
    COUNT(e.id) as nombre,
    AVG(e.salary) as salaire_moyen
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.name
ORDER BY nombre DESC;`,
        description: 'Grouper et agréger'
    },

    join: {
        title: 'JOIN - Joindre des tables',
        code: `-- Ventes avec nom de l'employé
SELECT 
    e.name as employee,
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
        code: `-- Total des ventes par employé et département
SELECT 
    e.name,
    d.name as department,
    COUNT(s.id) as nombre_ventes,
    SUM(s.amount) as total_ventes
FROM employees e
JOIN departments d ON e.department_id = d.id
LEFT JOIN sales s ON e.id = s.employee_id
GROUP BY e.id, e.name, d.name
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
    d.name as department,
    COUNT(e.id) as nombre,
    AVG(e.salary) as salaire_moyen
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.name
HAVING AVG(e.salary) > 60000;`,
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
