import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeSelector() {
    const { currentTheme, setTheme, availableThemes, themes } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                title="Changer de thème"
            >
                <Palette className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="p-2">
                        <div className="text-xs font-semibold text-zinc-500 px-3 py-2">THÈME</div>
                        {availableThemes.map((themeName) => (
                            <button
                                key={themeName}
                                onClick={() => {
                                    setTheme(themeName);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${currentTheme === themeName
                                    ? 'bg-blue-600/20 text-blue-400'
                                    : 'text-zinc-300 hover:bg-zinc-800'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-4 h-4 rounded border border-zinc-700"
                                        style={{ backgroundColor: themes[themeName].colors.accent }}
                                    />
                                    <span>{themes[themeName].name}</span>
                                </div>
                                {currentTheme === themeName && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
