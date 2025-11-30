import { useState, useEffect } from 'react';

export function useNotes() {
    const [notes, setNotes] = useState({});

    useEffect(() => {
        const stored = localStorage.getItem('memocode_notes');
        if (stored) {
            try {
                setNotes(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse notes:', e);
            }
        }
    }, []);

    const saveNotes = (newNotes) => {
        setNotes(newNotes);
        localStorage.setItem('memocode_notes', JSON.stringify(newNotes));
    };

    const getNote = (id) => notes[id] || '';

    const setNote = (id, text) => {
        const newNotes = { ...notes, [id]: text };
        if (!text) {
            delete newNotes[id];
        }
        saveNotes(newNotes);
    };

    const deleteNote = (id) => {
        const newNotes = { ...notes };
        delete newNotes[id];
        saveNotes(newNotes);
    };

    return { notes, getNote, setNote, deleteNote };
}
