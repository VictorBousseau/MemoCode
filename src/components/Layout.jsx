import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, selectedLanguage, onSelectLanguage }) {
    return (
        <div className="flex min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30">
            <Sidebar selectedLanguage={selectedLanguage} onSelectLanguage={onSelectLanguage} />
            <main className="flex-1 overflow-y-auto h-screen">
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">
                        {selectedLanguage}
                    </h1>
                    {children}
                </div>
            </main>
        </div>
    );
}
