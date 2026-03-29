import { useLocalStorage } from './useLocalStorage';

export function useNotes() {
    const [notes, setNotes] = useLocalStorage('memocode_notes', {});

    const getNote = (id) => notes[id] || '';

    const setNote = (id, text) => {
        setNotes(prev => {
            const newNotes = { ...prev, [id]: text };
            if (!text) {
                delete newNotes[id];
            }
            return newNotes;
        });
    };

    const deleteNote = (id) => {
        setNotes(prev => {
            const newNotes = { ...prev };
            delete newNotes[id];
            return newNotes;
        });
    };

    return { notes, getNote, setNote, deleteNote };
}
