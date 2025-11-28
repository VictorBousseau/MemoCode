import React, { useState } from 'react';
import Layout from './components/Layout';
import LanguageView from './components/LanguageView';
import { pythonContent } from './data/pythonContent';
import { sqlContent } from './data/sqlContent';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('Python');

  const getContent = () => {
    switch (selectedLanguage) {
      case 'Python':
        return pythonContent;
      case 'SQL':
        return sqlContent;
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
