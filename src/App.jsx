import React, { useState } from 'react';
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

  const getContent = () => {
    switch (selectedLanguage) {
      case 'Overview':
        return null; // Special case handled in render
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
      {selectedLanguage === 'Overview' ? (
        <Overview onNavigate={setSelectedLanguage} />
      ) : (
        <LanguageView content={getContent()} searchQuery={searchQuery} />
      )}
    </Layout>
  );
}
