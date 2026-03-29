import { useLocalStorage } from './useLocalStorage';

export function useHistory() {
    const [history, setHistory] = useLocalStorage('memocode_history', []);

    const addToHistory = (snippet, themeTitle, categoryTitle) => {
        setHistory(prev => {
            // Remove if already exists (to move to top)
            const filtered = prev.filter(item => item.id !== snippet.id);

            const newItem = {
                id: snippet.id,
                title: snippet.title,
                description: snippet.description,
                code: snippet.code,
                language: snippet.language, // Optional
                themeTitle,
                categoryTitle,
                timestamp: Date.now()
            };

            return [newItem, ...filtered].slice(0, 10); // Keep last 10
        });
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return { history, addToHistory, clearHistory };
}
