import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import LanguageView from './components/LanguageView';
import { NavigationContext } from './context/NavigationContext';
import { pythonContent } from './data/pythonContent';
import { sqlContent } from './data/sqlContent';
import { gitContent } from './data/gitContent';
import { pysparkContent } from './data/pysparkContent';
import { daxContent } from './data/daxContent';
import { rContent } from './data/rContent';
import { examplesContent } from './data/examplesContent';
import { mContent } from './data/mContent';
import { nosqlContent } from './data/nosqlContent';
import Overview from './components/Overview';
import CodeGenerator from './components/CodeGenerator';
import QuizList from './components/QuizList';
import FlashcardDeck from './components/FlashcardDeck';
import CodePlayground from './components/CodePlayground';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function PublicApp() {
  const [selectedLanguage, setSelectedLanguage] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  const allContent = useMemo(() => {
    const addLang = (content, lang, contextName) => ({
      ...content,
      themes: content.themes.map(t => ({
        ...t,
        categories: t.categories.map(c => ({
          ...c,
          snippets: c.snippets.map(s => ({ ...s, language: lang, contextName }))
        }))
      }))
    });

    return {
      themes: [
        ...addLang(pythonContent, 'python', 'Python').themes,
        ...addLang(sqlContent, 'sql', 'SQL').themes,
        ...addLang(gitContent, 'bash', 'Git').themes,
        ...addLang(pysparkContent, 'python', 'PySpark').themes,
        ...addLang(daxContent, 'dax', 'DAX').themes,
        ...addLang(mContent, 'powerquery', 'Power Query (M)').themes,
        ...addLang(nosqlContent, 'javascript', 'NoSQL').themes,
        ...addLang(rContent, 'r', 'R').themes,
        ...addLang(examplesContent, 'python', 'Exemples').themes
      ]
    };
  }, []);

  const getContent = () => {
    switch (selectedLanguage) {
      case 'Overview':
        return allContent;
      case 'Python':
        return pythonContent;
      case 'SQL':
        return sqlContent;
      case 'Git':
        return gitContent;
      case 'PySpark':
        return pysparkContent;
      case 'DAX':
        return daxContent;
      case 'Power Query (M)':
        return mContent;
      case 'NoSQL':
        return nosqlContent;
      case 'R':
        return rContent;
      case 'Exemples':
        return examplesContent;
      default:
        return pythonContent;
    }
  };

  const [navigationParams, setNavigationParams] = useState(null);

  const navigate = (view, params = null) => {
    setSelectedLanguage(view);
    setNavigationParams(params);
  };

  return (
    <NavigationContext.Provider value={{ currentView: selectedLanguage, navigate }}>
      <Layout
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      >
        <AnimatePresence mode="wait">
          {selectedLanguage === 'Overview' && !searchQuery ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Overview onNavigate={setSelectedLanguage} />
            </motion.div>
          ) : selectedLanguage === 'CodeCreation' ? (
            <motion.div
              key="code-generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CodeGenerator />
            </motion.div>
          ) : selectedLanguage === 'Playground' ? (
            <motion.div
              key="playground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CodePlayground
                initialCode={navigationParams?.code}
                initialLanguage={navigationParams?.language}
              />
            </motion.div>
          ) : (
            <motion.div
              key={selectedLanguage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LanguageView
                content={getContent()}
                searchQuery={searchQuery}
                languageName={selectedLanguage}
                onNavigate={setSelectedLanguage}
                onSearch={setSearchQuery}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </NavigationContext.Provider>
  );
}

function PrivateApp() {
  const [selectedView, setSelectedView] = useState('Quiz');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedView === 'Quiz' ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizList />
            </motion.div>
          ) : selectedView === 'Flashcards' ? (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FlashcardDeck />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <Router basename="/MemoCode">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/learn/*" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/learn/quiz" replace />} />
          <Route path="quiz" element={<PrivateApp />} />
          <Route path="flashcards" element={<PrivateApp />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
