import React, { useState } from 'react';
import Layout from './components/Layout';
import LanguageView from './components/LanguageView';
import { pythonContent } from './data/pythonContent';
import { sqlContent } from './data/sqlContent';
import { gitContent } from './data/gitContent';
import { pysparkContent } from './data/pysparkContent';
import { daxContent } from './data/daxContent';
import { rContent } from './data/rContent';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('Python');

  const getContent = () => {
    switch (selectedLanguage) {
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
      case 'R':
        return rContent;
      default:
        return pythonContent;
    }
  };

  return (
    <Layout selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage}>
      <LanguageView content={getContent()} />
    </Layout>
  );
}
