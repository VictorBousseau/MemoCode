// Course data structure for MemoCode
// Each course has chapters with markdown content

export const COURSES = {
    python: {
        id: 'python',
        title: 'Python - Les Fondamentaux',
        description: 'Maîtrisez Python de zéro jusqu\'à la POO',
        icon: '🐍',
        color: 'from-blue-500 to-yellow-500',
        duration: '~10 heures',
        level: 'Débutant → Intermédiaire',
        chapters: [
            {
                id: '00-environnement',
                title: 'Module 0 : Environnement Professionnel',
                duration: '30 min',
                description: 'Installation, IDE, premiers pas'
            },
            {
                id: '01-variables',
                title: 'Module 1 : Variables et Mémoire',
                duration: '40 min',
                description: 'Types, références, F-Strings'
            },
            {
                id: '02-operateurs',
                title: 'Module 2 : Opérateurs',
                duration: '25 min',
                description: 'Arithmétique, comparaison, logique'
            },
            {
                id: '03-conditions',
                title: 'Module 3 : Conditions',
                duration: '30 min',
                description: 'if/elif/else, opérateur ternaire'
            },
            {
                id: '04-boucles',
                title: 'Module 4 : Boucles',
                duration: '40 min',
                description: 'for, while, break, continue'
            },
            {
                id: '05-listes',
                title: 'Module 5 : Listes',
                duration: '45 min',
                description: 'Indexation, slicing, comprehensions'
            },
            {
                id: '06-dictionnaires',
                title: 'Module 6 : Dictionnaires',
                duration: '40 min',
                description: 'Clé-valeur, JSON, comprehensions'
            },
            {
                id: '07-tuples-sets',
                title: 'Module 7 : Tuples et Sets',
                duration: '25 min',
                description: 'Immutabilité, unicité'
            },
            {
                id: '08-fonctions',
                title: 'Module 8 : Fonctions',
                duration: '50 min',
                description: 'args, kwargs, scope, lambda'
            },
            {
                id: '09-fichiers',
                title: 'Module 9 : Gestion des Fichiers',
                duration: '30 min',
                description: 'Lecture, écriture, JSON'
            },
            {
                id: '10-erreurs',
                title: 'Module 10 : Gestion des Erreurs',
                duration: '25 min',
                description: 'try/except, raise'
            },
            {
                id: '11-modules',
                title: 'Module 11 : Modules et Packages',
                duration: '30 min',
                description: 'import, pip, venv'
            },
            {
                id: '12-poo',
                title: 'Module 12 : POO',
                duration: '60 min',
                description: 'Classes, héritage, dunder methods'
            },
            {
                id: '13-bonnes-pratiques',
                title: 'Module 13 : Bonnes Pratiques',
                duration: '20 min',
                description: 'PEP 8, DRY, clean code'
            }
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
