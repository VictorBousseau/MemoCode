import { useState, useEffect, useCallback, useRef } from 'react';
import initSqlJs from 'sql.js';

/**
 * Custom hook for managing SQL.js (SQLite in browser)
 */
export function useSqlJs() {
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);

    const dbRef = useRef(null);
    const sqlRef = useRef(null);

    // Load SQL.js and create sample database
    useEffect(() => {
        let mounted = true;

        async function loadSqlJs() {
            if (sqlRef.current) return; // Already loaded

            setIsLoading(true);
            setError(null);

            try {
                // Load SQL.js from CDN
                const SQL = await initSqlJs({
                    locateFile: file => `https://sql.js.org/dist/${file}`
                });

                // Create database
                const db = new SQL.Database();

                // Create sample tables and insert data
                db.run(`
                    -- Table Departments
                    CREATE TABLE departments (
                        id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL,
                        location TEXT NOT NULL,
                        budget INTEGER NOT NULL
                    );

                    -- Table Employees
                    CREATE TABLE employees (
                        id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL,
                        department_id INTEGER NOT NULL,
                        salary INTEGER NOT NULL,
                        hire_date TEXT NOT NULL,
                        FOREIGN KEY (department_id) REFERENCES departments(id)
                    );

                    -- Table Sales
                    CREATE TABLE sales (
                        id INTEGER PRIMARY KEY,
                        employee_id INTEGER,
                        product TEXT NOT NULL,
                        amount REAL NOT NULL,
                        sale_date TEXT NOT NULL,
                        FOREIGN KEY (employee_id) REFERENCES employees(id)
                    );

                    -- Insert departments
                    INSERT INTO departments (id, name, location, budget) VALUES
                        (1, 'IT', 'Paris', 500000),
                        (2, 'Sales', 'Lyon', 300000),
                        (3, 'HR', 'Paris', 200000),
                        (4, 'Marketing', 'Marseille', 250000);

                    -- Insert employees
                    INSERT INTO employees (id, name, department_id, salary, hire_date) VALUES
                        (1, 'Alice Martin', 1, 65000, '2020-01-15'),
                        (2, 'Bob Dupont', 2, 55000, '2019-03-20'),
                        (3, 'Charlie Durand', 1, 70000, '2018-06-10'),
                        (4, 'Diana Bernard', 3, 60000, '2021-02-01'),
                        (5, 'Eve Petit', 2, 58000, '2020-08-15'),
                        (6, 'Frank Moreau', 1, 72000, '2017-11-05'),
                        (7, 'Grace Laurent', 4, 62000, '2019-09-12'),
                        (8, 'Henry Simon', 2, 56000, '2021-05-20');

                    -- Insert sales
                    INSERT INTO sales (id, employee_id, product, amount, sale_date) VALUES
                        (1, 2, 'Laptop', 1200.00, '2024-01-10'),
                        (2, 2, 'Mouse', 25.00, '2024-01-12'),
                        (3, 5, 'Keyboard', 80.00, '2024-01-15'),
                        (4, 8, 'Monitor', 350.00, '2024-01-18'),
                        (5, 2, 'Laptop', 1200.00, '2024-02-05'),
                        (6, 5, 'Headset', 120.00, '2024-02-10'),
                        (7, 8, 'Laptop', 1200.00, '2024-02-15'),
                        (8, 2, 'Mouse', 25.00, '2024-02-20'),
                        (9, 5, 'Monitor', 350.00, '2024-03-01'),
                        (10, 8, 'Keyboard', 80.00, '2024-03-05');
                `);

                if (mounted) {
                    sqlRef.current = SQL;
                    dbRef.current = db;
                    setIsReady(true);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Failed to load SQL.js:', err);
                if (mounted) {
                    setError('Erreur lors du chargement de SQL. Veuillez rafraîchir la page.');
                    setIsLoading(false);
                }
            }
        }

        loadSqlJs();

        return () => {
            mounted = false;
            if (dbRef.current) {
                dbRef.current.close();
            }
        };
    }, []);

    // Run SQL query
    const runSQL = useCallback(async (query) => {
        if (!dbRef.current) {
            setError('SQL n\'est pas encore chargé');
            return null;
        }

        setIsExecuting(true);
        setError(null);
        setResults(null);

        try {
            const db = dbRef.current;
            const startTime = performance.now();

            // Execute query
            const result = db.exec(query);

            const executionTime = ((performance.now() - startTime) / 1000).toFixed(3);

            // Format results
            if (result.length === 0) {
                // No results (INSERT, UPDATE, DELETE, CREATE, etc.)
                setResults({
                    type: 'success',
                    message: '✅ Requête exécutée avec succès',
                    executionTime,
                    rowCount: 0
                });
            } else {
                // SELECT query with results
                const formattedResults = result.map(res => ({
                    columns: res.columns,
                    values: res.values
                }));

                setResults({
                    type: 'data',
                    data: formattedResults,
                    executionTime,
                    rowCount: formattedResults[0]?.values.length || 0
                });
            }

            setIsExecuting(false);

            return {
                success: true,
                results: result,
                executionTime
            };

        } catch (err) {
            console.error('SQL execution error:', err);

            let errorMessage = err.message || 'Erreur SQL inconnue';

            setError(errorMessage);
            setResults(null);
            setIsExecuting(false);

            return {
                success: false,
                error: errorMessage
            };
        }
    }, []);

    // Clear results
    const clearResults = useCallback(() => {
        setResults(null);
        setError(null);
    }, []);

    // Get database schema
    const getSchema = useCallback(() => {
        if (!dbRef.current) return null;

        try {
            const result = dbRef.current.exec(`
                SELECT name, sql 
                FROM sqlite_master 
                WHERE type='table' 
                ORDER BY name;
            `);

            return result[0]?.values || [];
        } catch (err) {
            console.error('Failed to get schema:', err);
            return null;
        }
    }, []);

    return {
        isLoading,
        isReady,
        isExecuting,
        error,
        results,
        runSQL,
        clearResults,
        getSchema
    };
}
