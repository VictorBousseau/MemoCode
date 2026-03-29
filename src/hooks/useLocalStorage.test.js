import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

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

describe('useLocalStorage', () => {
    test('retourne la valeur par défaut si rien en storage', () => {
        const { result } = renderHook(() => useLocalStorage('test_key', []));
        expect(result.current[0]).toEqual([]);
    });

    test('charge la valeur existante depuis localStorage', () => {
        localStorageMock.setItem('test_key', JSON.stringify(['a', 'b']));
        const { result } = renderHook(() => useLocalStorage('test_key', []));
        expect(result.current[0]).toEqual(['a', 'b']);
    });

    test('persiste la nouvelle valeur dans localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('test_key', []));
        act(() => result.current[1](['x']));
        expect(JSON.parse(localStorageMock.getItem('test_key'))).toEqual(['x']);
    });

    test('retourne la valeur par défaut si localStorage est corrompu', () => {
        localStorageMock.setItem('test_key', 'json invalide {{');
        const { result } = renderHook(() => useLocalStorage('test_key', 'default'));
        expect(result.current[0]).toBe('default');
    });
});
