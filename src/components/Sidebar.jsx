                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    MemoCode
                </h1>
                <p className="text-xs text-zinc-400 mt-1">Snippets Data Science</p>
            </div >
            <nav className="flex-1 p-4 space-y-2">
                {languages.map((lang) => (
                    <button
                        key={lang.name}
                        onClick={() => onSelectLanguage(lang.name)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${selectedLanguage === lang.name
                            ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                    >
                        <lang.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{lang.name}</span>
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-zinc-800">
                <div className="bg-zinc-800/50 rounded-lg p-3 text-xs text-zinc-500 text-center">
                    v1.0.0 • Built with ❤️
                </div>
            </div>
        </aside >
    );
}
