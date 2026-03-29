/**
 * Registre des ressources PDF téléchargeables.
 * Pour ajouter une ressource :
 *  1. Déposer le PDF dans public/resources/
 *  2. Ajouter une entrée ci-dessous
 */
export const RESOURCES = [
  {
    id: 'cours-python',
    title: 'Programming for Computations – Python',
    description: 'Introduction à la programmation scientifique avec Python par Svein Linge et Hans Petter Langtangen (Springer). Couvre les simulations numériques, les boucles, les fonctions et la résolution d\'équations différentielles.',
    fileName: 'cours-python.pdf',
    category: 'Python',
  },
  {
    id: 'python-interview',
    title: 'Python Interview Questions',
    description: 'Recueil de questions fréquentes en entretien Python avec leurs réponses détaillées. Idéal pour préparer un entretien technique ou réviser les fondamentaux du langage.',
    fileName: 'python-interview-questions.pdf',
    category: 'Python',
  },
  {
    id: 'python-proba-stats-ml',
    title: 'Python for Probability, Statistics, and Machine Learning',
    description: 'Ouvrage de José Unpingco (Springer) reliant probabilités, statistiques et machine learning avec Python. Couvre les distributions, l\'inférence bayésienne, la régression et la classification.',
    fileName: 'python-probability-statistics-ml.pdf',
    category: 'Python',
  },
  {
    id: 'numpy',
    title: 'NumPy – Guide complet',
    description: 'Guide pratique sur NumPy : création de tableaux, indexation, opérations mathématiques, algèbre linéaire et comparaison avec Pandas. Référence rapide pour le calcul scientifique.',
    fileName: 'numpy.pdf',
    category: 'Python',
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning (fastai & PyTorch)',
    description: 'Livre complet sur le deep learning avec fastai et PyTorch. Couvre les réseaux de neurones, la vision par ordinateur, le NLP, les systèmes de recommandation et le déploiement de modèles.',
    fileName: 'deep-learning.pdf',
    category: 'Machine Learning',
  },
  {
    id: 'mathematics-ml',
    title: 'Mathematics of Machine Learning',
    description: 'Ouvrage de Tivadar Danka (Packt, 2025) couvrant les fondements mathématiques du ML : algèbre linéaire, calcul différentiel et probabilités appliqués aux algorithmes d\'apprentissage.',
    fileName: 'mathematics-machine-learning.pdf',
    category: 'Machine Learning',
  },
  {
    id: 'foundations-ml-notes',
    title: 'Foundations of Machine Learning – Lecture Notes',
    description: 'Notes de cours CS725 par Ajay Nagesh. Couvre les arbres de décision, les probabilités, le théorème de Bayes, les espaces de versions et les biais d\'apprentissage.',
    fileName: 'foundations-machine-learning-notes.pdf',
    category: 'Machine Learning',
  },
  {
    id: 'mastering-rag',
    title: 'Mastering RAG Guide',
    description: 'Guide avancé sur l\'architecture Retrieval-Augmented Generation (RAG). Couvre les stratégies de découpage, l\'indexation vectorielle, le re-ranking et l\'optimisation des pipelines RAG.',
    fileName: 'mastering-rag-guide.pdf',
    category: 'IA & LLM',
  },
  {
    id: 'rag-langgraph',
    title: 'RAG with LangGraph – Hands-On',
    description: 'Guide pratique pour construire un pipeline RAG avec LangGraph. Couvre le chargement de documents, le découpage en chunks, l\'embedding et la génération de réponses.',
    fileName: 'rag-langgraph.pdf',
    category: 'IA & LLM',
  },
  {
    id: 'microsoft-fabric',
    title: 'Microsoft Fabric : Le guide complet (2e édition)',
    description: 'Guide francophone complet sur Microsoft Fabric par Marie Aubert, Matthieu Roy et Charles-Henri Sauget. Couvre l\'écosystème Fabric, l\'ingestion de données, les lakehouses et l\'analytique.',
    fileName: 'microsoft-fabric-guide.pdf',
    category: 'Data Engineering',
  },
];
