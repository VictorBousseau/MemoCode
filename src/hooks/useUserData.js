import { useLocalStorage } from './useLocalStorage';

export function useUserData() {
    const [userData, setUserData] = useLocalStorage('memocode_user_data', { priorities: {}, sortOrders: {} });

    const setPriority = (snippetId, level) => {
        setUserData(prev => ({
            ...prev,
            priorities: {
                ...prev.priorities,
                [snippetId]: level
            }
        }));
    };

    const getPriority = (snippetId) => {
        return userData.priorities?.[snippetId] || 0;
    };

    const updateSortOrder = (categoryId, newOrder) => {
        setUserData(prev => ({
            ...prev,
            sortOrders: {
                ...prev.sortOrders,
                [categoryId]: newOrder
            }
        }));
    };

    const getSortOrder = (categoryId) => {
        return userData.sortOrders?.[categoryId] || null;
    };

    return {
        priorities: userData.priorities || {},
        sortOrders: userData.sortOrders || {},
        setPriority,
        getPriority,
        updateSortOrder,
        getSortOrder
    };
}
