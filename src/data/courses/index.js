// Course data structure for MemoCode
// Enhanced Python course with 29 modules based on Complete Python 3 Bootcamp

export const COURSES = {
    python: {
        id: 'python',
        title: 'Python - De Débutant à Expert',
        description: 'Cours complet : fondamentaux jusqu\'aux sujets avancés (décorateurs, regex, web scraping)',
        icon: '🐍',
        color: 'from-blue-500 to-yellow-500',
        duration: '~25-30 heures',
        level: 'Débutant → Avancé',
        parts: [
            { id: 'part1', title: 'Partie 1 : Fondamentaux', modules: ['00', '01', '02', '03', '04', '05', '06'] },
            { id: 'part2', title: 'Partie 2 : Contrôle de Flux', modules: ['07', '08', '09', '10'] },
            { id: 'part3', title: 'Partie 3 : Fonctions', modules: ['11', '12', '13', '14'] },
            { id: 'part4', title: 'Partie 4 : POO', modules: ['15', '16'] },
            { id: 'part5', title: 'Partie 5 : Modules & Erreurs', modules: ['17', '18'] },
            { id: 'part6', title: 'Partie 6 : Concepts Avancés', modules: ['19', '20', '21', '22', '23'] },
            { id: 'part7', title: 'Partie 7 : Applications', modules: ['24', '25', '26', '27', '28'] },
        ],
        chapters: [
            // PARTIE 1 : FONDAMENTAUX
            { id: '00-environnement', title: 'Module 0 : Environnement & Installation', duration: '30 min', part: 'Fondamentaux' },
            { id: '01-variables', title: 'Module 1 : Variables et Types de Données', duration: '45 min', part: 'Fondamentaux' },
            { id: '02-strings', title: 'Module 2 : Chaînes de Caractères', duration: '50 min', part: 'Fondamentaux' },
            { id: '03-listes', title: 'Module 3 : Listes', duration: '50 min', part: 'Fondamentaux' },
            { id: '04-dictionnaires', title: 'Module 4 : Dictionnaires', duration: '45 min', part: 'Fondamentaux' },
            { id: '05-tuples-sets', title: 'Module 5 : Tuples et Sets', duration: '35 min', part: 'Fondamentaux' },
            { id: '06-fichiers', title: 'Module 6 : Fichiers I/O', duration: '40 min', part: 'Fondamentaux' },

            // PARTIE 2 : CONTRÔLE DE FLUX
            { id: '07-comparaisons', title: 'Module 7 : Opérateurs de Comparaison', duration: '25 min', part: 'Contrôle de Flux' },
            { id: '08-conditions', title: 'Module 8 : Conditions (if/elif/else)', duration: '35 min', part: 'Contrôle de Flux' },
            { id: '09-boucles', title: 'Module 9 : Boucles (for/while)', duration: '45 min', part: 'Contrôle de Flux' },
            { id: '10-fonctions-utiles', title: 'Module 10 : Fonctions Built-in Utiles', duration: '30 min', part: 'Contrôle de Flux' },

            // PARTIE 3 : FONCTIONS
            { id: '11-methodes', title: 'Module 11 : Méthodes d\'Objets', duration: '25 min', part: 'Fonctions' },
            { id: '12-fonctions', title: 'Module 12 : Fonctions', duration: '60 min', part: 'Fonctions' },
            { id: '13-lambda', title: 'Module 13 : Lambda, Map & Filter', duration: '35 min', part: 'Fonctions' },
            { id: '14-scope', title: 'Module 14 : Portée (Scope) & Closures', duration: '35 min', part: 'Fonctions' },

            // PARTIE 4 : POO
            { id: '15-poo-bases', title: 'Module 15 : POO - Classes & Objets', duration: '70 min', part: 'POO' },
            { id: '16-poo-avancee', title: 'Module 16 : POO Avancée', duration: '50 min', part: 'POO' },

            // PARTIE 5 : MODULES & ERREURS
            { id: '17-modules', title: 'Module 17 : Modules et Packages', duration: '40 min', part: 'Modules & Erreurs' },
            { id: '18-erreurs', title: 'Module 18 : Gestion des Erreurs', duration: '45 min', part: 'Modules & Erreurs' },

            // PARTIE 6 : CONCEPTS AVANCÉS
            { id: '19-decorateurs', title: 'Module 19 : Décorateurs', duration: '45 min', part: 'Concepts Avancés' },
            { id: '20-generateurs', title: 'Module 20 : Générateurs & Itérateurs', duration: '40 min', part: 'Concepts Avancés' },
            { id: '21-modules-avances', title: 'Module 21 : Modules Avancés', duration: '60 min', part: 'Concepts Avancés' },
            { id: '22-regex', title: 'Module 22 : Expressions Régulières', duration: '50 min', part: 'Concepts Avancés' },
            { id: '23-zip-files', title: 'Module 23 : Fichiers ZIP', duration: '25 min', part: 'Concepts Avancés' },

            // PARTIE 7 : APPLICATIONS
            { id: '24-web-scraping', title: 'Module 24 : Web Scraping', duration: '60 min', part: 'Applications' },
            { id: '25-images', title: 'Module 25 : Manipulation d\'Images', duration: '35 min', part: 'Applications' },
            { id: '26-pdf-excel', title: 'Module 26 : PDFs et Spreadsheets', duration: '45 min', part: 'Applications' },
            { id: '27-email', title: 'Module 27 : Email avec Python', duration: '30 min', part: 'Applications' },
            { id: '28-gui', title: 'Module 28 : GUIs avec Tkinter', duration: '50 min', part: 'Applications' },
        ]
    },
    bayesian: {
        id: 'bayesian',
        title: 'Réseaux Bayésiens',
        description: 'Modélisation probabiliste, inférence et apprentissage avec pgmpy',
        icon: '🎲',
        color: 'from-purple-500 to-pink-500',
        duration: '~8-10 heures',
        level: 'Intermédiaire → Avancé',
        parts: [
            { id: 'part1', title: 'Partie 1 : Fondements Théoriques', modules: ['01', '02', '03'] },
            { id: 'part2', title: 'Partie 2 : Modélisation', modules: ['04', '05'] },
            { id: 'part3', title: 'Partie 3 : Inférence', modules: ['06', '07'] },
            { id: 'part4', title: 'Partie 4 : Apprentissage', modules: ['08', '09'] },
        ],
        chapters: [
            // PARTIE 1 : FONDEMENTS THÉORIQUES
            { id: '01-introduction', title: 'Module 1 : Introduction aux Réseaux Bayésiens', duration: '45 min', part: 'Fondements Théoriques' },
            { id: '02-probabilites', title: 'Module 2 : Rappels de Probabilités', duration: '60 min', part: 'Fondements Théoriques' },
            { id: '03-independance', title: 'Module 3 : Indépendance Conditionnelle', duration: '45 min', part: 'Fondements Théoriques' },

            // PARTIE 2 : MODÉLISATION
            { id: '04-dag', title: 'Module 4 : Graphes Orientés Acycliques (DAG)', duration: '50 min', part: 'Modélisation' },
            { id: '05-cpt', title: 'Module 5 : Tables de Probabilités Conditionnelles', duration: '55 min', part: 'Modélisation' },

            // PARTIE 3 : INFÉRENCE
            { id: '06-inference-exacte', title: 'Module 6 : Inférence Exacte', duration: '70 min', part: 'Inférence' },
            { id: '07-inference-approchee', title: 'Module 7 : Inférence Approchée (Sampling)', duration: '50 min', part: 'Inférence' },

            // PARTIE 4 : APPRENTISSAGE
            { id: '08-apprentissage-params', title: 'Module 8 : Apprentissage des Paramètres', duration: '60 min', part: 'Apprentissage' },
            { id: '09-apprentissage-structure', title: 'Module 9 : Apprentissage de Structure', duration: '65 min', part: 'Apprentissage' },
        ]
    },
    mongodb: {
        id: 'mongodb',
        title: 'MongoDB - Requêtes et Agrégations',
        description: 'Maîtrisez find(), aggregate, $unwind, $lookup et les bonnes pratiques',
        icon: '🍃',
        color: 'from-green-500 to-emerald-600',
        duration: '~6-8 heures',
        level: 'Débutant → Intermédiaire',
        parts: [
            { id: 'part1', title: 'Partie 1 : Requêtes de Base', modules: ['01', '02', '03', '04'] },
            { id: 'part2', title: 'Partie 2 : Pipeline d\'Agrégation', modules: ['05', '06', '07'] },
            { id: 'part3', title: 'Partie 3 : Techniques Avancées', modules: ['08', '09'] },
        ],
        chapters: [
            // PARTIE 1 : REQUÊTES DE BASE
            { id: '01-introduction', title: 'Module 1 : Introduction à MongoDB', duration: '30 min', part: 'Requêtes de Base' },
            { id: '02-find-basics', title: 'Module 2 : Requêtes avec find()', duration: '45 min', part: 'Requêtes de Base' },
            { id: '03-operators', title: 'Module 3 : Opérateurs Logiques et de Champs', duration: '40 min', part: 'Requêtes de Base' },
            { id: '04-arrays', title: 'Module 4 : Opérations sur les Tableaux', duration: '35 min', part: 'Requêtes de Base' },

            // PARTIE 2 : PIPELINE D'AGRÉGATION
            { id: '05-aggregate-basics', title: 'Module 5 : Pipeline d\'Agrégation', duration: '50 min', part: 'Pipeline d\'Agrégation' },
            { id: '06-unwind', title: 'Module 6 : $unwind - Éclater les Tableaux', duration: '45 min', part: 'Pipeline d\'Agrégation' },
            { id: '07-lookup', title: 'Module 7 : $lookup - Jointures', duration: '55 min', part: 'Pipeline d\'Agrégation' },

            // PARTIE 3 : TECHNIQUES AVANCÉES
            { id: '08-variables', title: 'Module 8 : Variables et Sous-Requêtes', duration: '40 min', part: 'Techniques Avancées' },
            { id: '09-best-practices', title: 'Module 9 : Bonnes Pratiques et Pièges', duration: '35 min', part: 'Techniques Avancées' },
        ]
    }
};

export const getCourse = (courseId) => COURSES[courseId] || null;

export const getChapter = (courseId, chapterId) => {
    const course = getCourse(courseId);
    if (!course) return null;
    return course.chapters.find(ch => ch.id === chapterId) || null;
};

export const getAllCourses = () => Object.values(COURSES);
