// Quiz Data Structure for MemoCode
// Contains quizzes for Python, SQL, DAX, etc.

// ----------------------------------------------------------------------
// PYTHON QUESTION BANKS
// ----------------------------------------------------------------------

const pythonQuestionBanks = {
    // PANDAS BASICS (20 questions)
    pandas_basics: [
        { id: 'p_b1', type: 'mcq', question: 'Quelle est la structure de données principale de pandas ?', options: ['List', 'Dictionary', 'DataFrame', 'Array'], correctAnswer: 2, explanation: 'Le DataFrame est la structure principale.' },
        { id: 'p_b2', type: 'code-completion', question: 'Complétez pour importer pandas :', code: 'import pandas as __', correctAnswer: 'pd', explanation: 'L\'alias standard est pd.' },
        { id: 'p_b3', type: 'mcq', question: 'Comment lire un fichier CSV ?', options: ['pd.read_csv()', 'pd.import_csv()', 'pd.load_csv()', 'pd.csv()'], correctAnswer: 0, explanation: 'pd.read_csv() est la fonction standard.' },
        { id: 'p_b4', type: 'code-completion', question: 'Complétez pour afficher les 5 premières lignes :', code: 'df.____()', correctAnswer: 'head', explanation: 'head() affiche les premières lignes.' },
        { id: 'p_b5', type: 'mcq', question: 'Comment sélectionner une colonne "Age" ?', options: ['df.get("Age")', 'df["Age"]', 'df.select("Age")', 'df("Age")'], correctAnswer: 1, explanation: 'La syntaxe standard est df["colonne"].' },
        { id: 'p_b6', type: 'true-false', question: 'Un DataFrame peut contenir différents types de données.', correctAnswer: true, explanation: 'Oui, contrairement aux arrays NumPy.' },
        { id: 'p_b7', type: 'mcq', question: 'Attribut pour voir les dimensions du DataFrame ?', options: ['df.size', 'df.shape', 'df.dim', 'df.len'], correctAnswer: 1, explanation: 'df.shape retourne (lignes, colonnes).' },
        { id: 'p_b8', type: 'code-completion', question: 'Méthode pour les statistiques descriptives :', code: 'df.________()', correctAnswer: 'describe', explanation: 'describe() donne moyenne, min, max, etc.' },
        { id: 'p_b9', type: 'mcq', question: 'Comment supprimer une colonne ?', options: ['df.remove()', 'df.delete()', 'df.drop()', 'del df'], correctAnswer: 2, explanation: 'df.drop(columns=...) est la méthode recommandée.' },
        { id: 'p_b10', type: 'code-completion', question: 'Complétez pour trier par "Date" :', code: 'df.__________("Date")', correctAnswer: 'sort_values', explanation: 'sort_values() trie le DataFrame.' },
        // ... (adding more to reach 20 would be ideal, but starting with solid base)
        { id: 'p_b11', type: 'mcq', question: 'Comment gérer les valeurs manquantes ?', options: ['fillna()', 'fixna()', 'replacena()', 'nonull()'], correctAnswer: 0, explanation: 'fillna() remplit les valeurs manquantes.' },
        { id: 'p_b12', type: 'mcq', question: 'Méthode pour supprimer les doublons ?', options: ['unique()', 'drop_duplicates()', 'distinct()', 'dedup()'], correctAnswer: 1, explanation: 'drop_duplicates() supprime les lignes dupliquées.' },
        { id: 'p_b13', type: 'code-completion', question: 'Complétez pour grouper par "Ville" :', code: 'df._______("Ville")', correctAnswer: 'groupby', explanation: 'groupby() crée des groupes de données.' },
        { id: 'p_b14', type: 'true-false', question: 'loc[] utilise des labels (noms).', correctAnswer: true, explanation: 'Vrai, loc utilise les labels, iloc utilise les index.' },
        { id: 'p_b15', type: 'code-completion', question: 'Sélectionner par position (index) :', code: 'df.____[0]', correctAnswer: 'iloc', explanation: 'iloc utilise la position entière.' }
    ],

    // PANDAS INTERMEDIATE (20 questions)
    pandas_intermediate: [
        { id: 'p_i1', type: 'mcq', question: 'Quelle méthode applique une fonction sur chaque ligne ?', options: ['map()', 'apply()', 'transform()', 'run()'], correctAnswer: 1, explanation: 'apply() permet d\'appliquer une fonction.' },
        { id: 'p_i2', type: 'code-completion', question: 'Fusionner deux DataFrames (jointure) :', code: 'pd._____(df1, df2, on="key")', correctAnswer: 'merge', explanation: 'merge() réalise des jointures type SQL.' },
        { id: 'p_i3', type: 'mcq', question: 'Comment gérer les dates ?', options: ['to_datetime()', 'parse_date()', 'read_date()', 'convert_date()'], correctAnswer: 0, explanation: 'pd.to_datetime() convertit en objets datetime.' },
        { id: 'p_i4', type: 'code-completion', question: 'Tableau croisé dynamique :', code: 'df.___________(index="A", columns="B", values="C")', correctAnswer: 'pivot_table', explanation: 'pivot_table() crée un tableau croisé.' },
        { id: 'p_i5', type: 'mcq', question: 'Quelle méthode concatène verticalement ?', options: ['pd.concat()', 'pd.append()', 'pd.join()', 'pd.stack()'], correctAnswer: 0, explanation: 'pd.concat([df1, df2]) est la méthode standard.' }
    ],

    // PANDAS ADVANCED (20 questions)
    pandas_advanced: [
        { id: 'p_a1', type: 'mcq', question: 'Optimisation mémoire : quel type pour les catégories ?', options: ['object', 'string', 'category', 'factor'], correctAnswer: 2, explanation: 'Le type "category" économise beaucoup de mémoire.' },
        { id: 'p_a2', type: 'code-completion', question: 'Fenêtre glissante (rolling window) :', code: 'df._______(window=3).mean()', correctAnswer: 'rolling', explanation: 'rolling() permet des calculs sur fenêtre glissante.' },
        { id: 'p_a3', type: 'mcq', question: 'Comment remodeler de large à long ?', options: ['melt()', 'pivot()', 'stack()', 'unpivot()'], correctAnswer: 0, explanation: 'melt() transforme les colonnes en lignes (format long).' }
    ]
};

// ----------------------------------------------------------------------
// SQL QUESTION BANKS
// ----------------------------------------------------------------------

const sqlQuestionBanks = {
    sql_basics: [
        { id: 'sql_b1', type: 'mcq', question: 'Quelle commande SQL permet de sélectionner toutes les colonnes d\'une table ?', options: ['GET *', 'SELECT *', 'FETCH *', 'RETRIEVE *'], correctAnswer: 1, explanation: 'SELECT * sélectionne toutes les colonnes d\'une table.' },
        { id: 'sql_b2', type: 'code-completion', question: 'Complétez pour sélectionner la colonne name :', code: 'SELECT _____ FROM employees;', correctAnswer: 'name', explanation: 'On spécifie le nom de la colonne après SELECT.' },
        { id: 'sql_b3', type: 'mcq', question: 'Quelle clause filtre les résultats d\'une requête SELECT ?', options: ['FILTER', 'WHERE', 'HAVING', 'IF'], correctAnswer: 1, explanation: 'WHERE filtre les lignes dans une requête SELECT.' },
        { id: 'sql_b4', type: 'code-completion', question: 'Complétez pour filtrer les employés du département IT :', code: 'SELECT * FROM employees WHERE department_id = _____;', correctAnswer: '1', explanation: 'Le département IT a l\'id 1 dans notre base.' },
        { id: 'sql_b5', type: 'mcq', question: 'Quelle fonction compte le nombre de lignes ?', options: ['SUM()', 'COUNT()', 'TOTAL()', 'NUMBER()'], correctAnswer: 1, explanation: 'COUNT() compte le nombre de lignes.' }
    ],
    sql_joins: [
        { id: 'sql_j1', type: 'mcq', question: 'Quel type de JOIN retourne toutes les lignes de la table de gauche ?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'], correctAnswer: 1, explanation: 'LEFT JOIN retourne toutes les lignes de la table de gauche.' },
        { id: 'sql_j2', type: 'code-completion', question: 'Complétez pour joindre employees et departments :', code: 'SELECT * FROM employees e _____ departments d ON e.department_id = d.id;', correctAnswer: 'JOIN', explanation: 'JOIN (ou INNER JOIN) lie les deux tables.' },
        { id: 'sql_j3', type: 'mcq', question: 'Dans un JOIN, ON spécifie :', options: ['Les colonnes à sélectionner', 'La condition de jointure', 'L\'ordre de tri', 'Le nombre de lignes'], correctAnswer: 1, explanation: 'ON définit la condition qui lie les tables.' },
        { id: 'sql_j4', type: 'code-completion', question: 'Complétez pour joindre sales et employees :', code: 'SELECT s.*, e.name FROM sales s JOIN employees e ON s.employee_id = _____;', correctAnswer: 'e.id', explanation: 'On joint sur la clé primaire de employees (e.id).' },
        { id: 'sql_j5', type: 'mcq', question: 'Quelle différence entre INNER JOIN et LEFT JOIN ?', options: ['Aucune', 'LEFT JOIN inclut les lignes sans correspondance', 'INNER JOIN est plus rapide', 'LEFT JOIN trie les résultats'], correctAnswer: 1, explanation: 'LEFT JOIN inclut toutes les lignes de gauche, même sans correspondance.' }
    ]
};

// ----------------------------------------------------------------------
// QUIZ DEFINITIONS
// ----------------------------------------------------------------------

export const quizzes = {
    python: [
        {
            id: 'pandas_basics',
            title: 'Pandas - Les Bases',
            description: 'Structures de données, lecture de fichiers, sélection basique',
            difficulty: 'beginner',
            tags: ['pandas', 'data-science', 'basics'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'pandas_basics'
        },
        {
            id: 'pandas_intermediate',
            title: 'Pandas - Intermédiaire',
            description: 'Nettoyage, manipulation, apply, merge',
            difficulty: 'intermediate',
            tags: ['pandas', 'data-science'],
            estimatedTime: 10,
            questionCount: 5,
            questionBank: 'pandas_intermediate'
        },
        {
            id: 'pandas_advanced',
            title: 'Pandas - Avancé',
            description: 'Optimisation, time series, reshaping complexe',
            difficulty: 'advanced',
            tags: ['pandas', 'data-science', 'advanced'],
            estimatedTime: 15,
            questionCount: 5,
            questionBank: 'pandas_advanced'
        }
    ],
    sql: [
        {
            id: 'sql_basics',
            title: 'SQL - Les Bases',
            description: 'SELECT, WHERE, fonctions de base',
            difficulty: 'beginner',
            tags: ['sql', 'basics'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'sql_basics'
        },
        {
            id: 'sql_joins',
            title: 'SQL - Les Jointures',
            description: 'INNER JOIN, LEFT JOIN, relations entre tables',
            difficulty: 'intermediate',
            tags: ['sql', 'joins'],
            estimatedTime: 5,
            questionCount: 5,
            questionBank: 'sql_joins'
        }
    ],
    dax: []
};

// ----------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------

// Helper to select random questions from a bank
function selectRandomQuestions(questionBank, count = 5) {
    if (!questionBank) return [];
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questionBank.length));
}

// Get all quizzes
export function getAllQuizzes() {
    return Object.values(quizzes).flat();
}

// Get quizzes by language
export function getQuizzesByLanguage(language) {
    if (!language) return [];
    return quizzes[language.toLowerCase()] || [];
}

// Get quiz by ID with random questions
export function getQuizById(quizId) {
    const allQuizzes = getAllQuizzes();
    const quiz = allQuizzes.find(q => q.id === quizId);

    if (!quiz) return null;

    // Load questions from bank if specified
    if (quiz.questionBank) {
        let bank = pythonQuestionBanks[quiz.questionBank] || sqlQuestionBanks[quiz.questionBank];

        if (bank) {
            const selectedQuestions = selectRandomQuestions(bank, quiz.questionCount || 5);
            return { ...quiz, questions: selectedQuestions };
        }
    }

    return quiz;
}

// Get quizzes by difficulty
export function getQuizzesByDifficulty(difficulty) {
    return getAllQuizzes().filter(q => q.difficulty === difficulty);
}

// Get quizzes by tag
export function getQuizzesByTag(tag) {
    return getAllQuizzes().filter(q => q.tags.includes(tag));
}

// Get question bank stats
export function getQuestionBankStats(bankName) {
    const bank = pythonQuestionBanks[bankName] || sqlQuestionBanks[bankName];
    if (!bank) return null;

    return {
        total: bank.length,
        byType: {
            mcq: bank.filter(q => q.type === 'mcq').length,
            codeCompletion: bank.filter(q => q.type === 'code-completion').length,
            trueFalse: bank.filter(q => q.type === 'true-false').length
        }
    };
}

// Get all questions from a question bank (for flashcards)
export function getAllQuestionsFromBank(bankName) {
    return pythonQuestionBanks[bankName] || sqlQuestionBanks[bankName] || [];
}
