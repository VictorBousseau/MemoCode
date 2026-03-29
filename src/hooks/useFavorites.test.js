import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';

const mockSnippet = { id: 'snippet_123', title: 'Test', code: 'print()' };
const mockSnippet2 = { id: 'snippet_456', title: 'Test 2', code: 'pass' };

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] ?? null,
        setItem: (key, value) => { store[key] = value; },
        clear: () => { store = {}; },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => localStorageMock.clear());

describe('useFavorites', () => {
    test('démarre avec une liste vide', () => {
        const { result } = renderHook(() => useFavorites());
        expect(result.current.favorites).toEqual([]);
    });

    test('addFavorite ajoute un snippet', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        expect(result.current.favorites).toHaveLength(1);
        expect(result.current.favorites[0].id).toBe('snippet_123');
    });

    test('addFavorite ne duplique pas un favori existant', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        act(() => result.current.addFavorite(mockSnippet));
        expect(result.current.favorites).toHaveLength(1);
    });

    test('removeFavorite supprime le bon snippet', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        act(() => result.current.addFavorite(mockSnippet2));
        act(() => result.current.removeFavorite('snippet_123'));
        expect(result.current.favorites).toHaveLength(1);
        expect(result.current.favorites[0].id).toBe('snippet_456');
    });

    test('isFavorite retourne true pour un favori', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        expect(result.current.isFavorite('snippet_123')).toBe(true);
        expect(result.current.isFavorite('snippet_456')).toBe(false);
    });

    test('toggleFavorite ajoute si absent, retire si présent', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.toggleFavorite(mockSnippet));
        expect(result.current.isFavorite('snippet_123')).toBe(true);
        act(() => result.current.toggleFavorite(mockSnippet));
        expect(result.current.isFavorite('snippet_123')).toBe(false);
    });

    test('persiste les favoris dans localStorage', () => {
        const { result } = renderHook(() => useFavorites());
        act(() => result.current.addFavorite(mockSnippet));
        const stored = JSON.parse(localStorageMock.getItem('memocode_favorites'));
        expect(stored).toHaveLength(1);
        expect(stored[0].id).toBe('snippet_123');
    });
});
