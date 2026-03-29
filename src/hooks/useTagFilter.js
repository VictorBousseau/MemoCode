import { useCallback } from 'react';
import { matchesTags } from '../data/tagHierarchy';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing tag filters
 */
export function useTagFilter() {
    const [filterState, setFilterState] = useLocalStorage('memocode_tag_filters', {
        selectedTags: [],
        filterMode: 'AND',
        expandedNodes: []
    });

    const { selectedTags, filterMode, expandedNodes } = filterState;

    const toggleTag = useCallback((tagId) => {
        setFilterState(prev => ({
            ...prev,
            selectedTags: prev.selectedTags.includes(tagId)
                ? prev.selectedTags.filter(t => t !== tagId)
                : [...prev.selectedTags, tagId]
        }));
    }, [setFilterState]);

    const clearTags = useCallback(() => {
        setFilterState(prev => ({
            ...prev,
            selectedTags: []
        }));
    }, [setFilterState]);

    const toggleFilterMode = useCallback(() => {
        setFilterState(prev => ({
            ...prev,
            filterMode: prev.filterMode === 'AND' ? 'OR' : 'AND'
        }));
    }, [setFilterState]);

    const toggleNode = useCallback((nodeId) => {
        setFilterState(prev => ({
            ...prev,
            expandedNodes: prev.expandedNodes.includes(nodeId)
                ? prev.expandedNodes.filter(n => n !== nodeId)
                : [...prev.expandedNodes, nodeId]
        }));
    }, [setFilterState]);

    const filterSnippets = useCallback((snippets) => {
        if (selectedTags.length === 0) return snippets;

        return snippets.filter(snippet =>
            matchesTags(snippet.tags || [], selectedTags, filterMode)
        );
    }, [selectedTags, filterMode]);

    return {
        selectedTags,
        filterMode,
        expandedNodes,
        toggleTag,
        clearTags,
        toggleFilterMode,
        toggleNode,
        filterSnippets,
        hasActiveFilters: selectedTags.length > 0
    };
}
