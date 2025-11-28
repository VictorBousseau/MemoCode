import React, { useState } from 'react';
import Layout from './components/Layout';
import LanguageView from './components/LanguageView';
import { pythonContent } from './data/pythonContent';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('Python');

  return (
    <Layout selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{selectedLanguage}</h2>
        <p className="text-zinc-400">
          {selectedLanguage === 'Python'
            ? 'Essential snippets for Data Science and Machine Learning.'
            : 'Coming soon...'}
        </p>
      </div>

      {selectedLanguage === 'Python' ? (
        <LanguageView content={pythonContent} />
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
          <p className="text-zinc-500 text-lg">Content for {selectedLanguage} is coming soon!</p>
          <p className="text-zinc-600 text-sm mt-2">Check back later for updates.</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
