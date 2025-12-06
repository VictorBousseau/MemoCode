import { useState, useEffect, useCallback } from 'react';
import { matchesTags } from '../data/tagHierarchy';

const STORAGE_KEY = 'memocode_tag_filters';

/**
 * Custom hook for managing tag filters
 */
export function useTagFilter() {
    const [selectedTags, setSelectedTags] = useState([]);
    const [filterMode, setFilterMode] = useState('AND'); // 'AND' or 'OR'
    const [expandedNodes, setExpandedNodes] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                setSelectedTags(data.selectedTags || []);
                setFilterMode(data.filterMode || 'AND');
                setExpandedNodes(data.expandedNodes || []);
            } catch (e) {
                console.error('Failed to load tag filters:', e);
            }
        }
    }, []);

    // Save to localStorage whenever filters change
    useEffect(() => {
        const data = {
            selectedTags,
            filterMode,
            expandedNodes
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [selectedTags, filterMode, expandedNodes]);

    const toggleTag = useCallback((tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(t => t !== tagId)
                : [...prev, tagId]
        );
    }, []);

    const clearTags = useCallback(() => {
        setSelectedTags([]);
    }, []);

    const toggleFilterMode = useCallback(() => {
        setFilterMode(prev => prev === 'AND' ? 'OR' : 'AND');
    }, []);

    const toggleNode = useCallback((nodeId) => {
        setExpandedNodes(prev =>
            prev.includes(nodeId)
                ? prev.filter(n => n !== nodeId)
                : [...prev, nodeId]
        );
    }, []);

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
