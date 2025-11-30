import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import LanguageView from './components/LanguageView';
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

export default function App() {
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
        ...addLang(nosqlContent, 'javascript', 'NoSQL').themes, // NoSQL often uses JS/JSON
        ...addLang(rContent, 'r', 'R').themes,
        ...addLang(examplesContent, 'python', 'Exemples').themes // Examples are mostly Python
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

  return (
    <Layout
      selectedLanguage={selectedLanguage}
      onSelectLanguage={setSelectedLanguage}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      {selectedLanguage === 'Overview' && !searchQuery ? (
        <Overview onNavigate={setSelectedLanguage} />
      ) : (
        <LanguageView
          content={getContent()}
          searchQuery={searchQuery}
          languageName={selectedLanguage}
          onNavigate={setSelectedLanguage}
          onSearch={setSearchQuery}
        />
      )}
    </Layout>
  );
}
