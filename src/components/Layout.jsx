import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, selectedLanguage, onSelectLanguage }) {
    return (
        <div className="flex min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30">
            <Sidebar selectedLanguage={selectedLanguage} onSelectLanguage={onSelectLanguage} />
            <main className="flex-1 overflow-y-auto h-screen">
                <div className="w-full p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
