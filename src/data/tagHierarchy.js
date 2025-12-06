// Tag Hierarchy Structure for MemoCode
// Maps flat tags to hierarchical categories

export const tagHierarchy = {
    python: {
        id: 'python',
        label: 'Python',
        icon: '🐍',
        children: {
            pandas: {
                id: 'pandas',
                label: 'Pandas',
                children: {
                    io: { id: 'io', label: 'Import/Export' },
                    eda: { id: 'eda', label: 'Exploration' },
                    cleaning: { id: 'cleaning', label: 'Nettoyage' },
                    transformation: { id: 'transformation', label: 'Transformation' },
                    subsetting: { id: 'subsetting', label: 'Sélection' }
                }
            },
            ml: {
                id: 'ml',
                label: 'Machine Learning',
                children: {
                    supervised: {
                        id: 'supervised',
                        label: 'Supervisé',
                        children: {
                            classification: { id: 'classification', label: 'Classification' },
                            regression: { id: 'regression', label: 'Regression' }
                        }
                    },
                    unsupervised: {
                        id: 'unsupervised',
                        label: 'Non-Supervisé',
                        children: {
                            clustering: { id: 'clustering', label: 'Clustering' },
                            dimensionality: { id: 'dimensionality', label: 'Réduction Dimension' }
                        }
                    },
                    preprocessing: { id: 'preprocessing', label: 'Prétraitement' },
                    evaluation: { id: 'evaluation', label: 'Évaluation' }
                }
            },
            viz: {
                id: 'viz',
                label: 'Visualisation',
                children: {
                    seaborn: { id: 'seaborn', label: 'Seaborn' },
                    matplotlib: { id: 'matplotlib', label: 'Matplotlib' }
                }
            },
            web: {
                id: 'web',
                label: 'Web & APIs',
                children: {
                    requests: { id: 'requests', label: 'Requests' },
                    fastapi: { id: 'fastapi', label: 'FastAPI' },
                    pydantic: { id: 'pydantic', label: 'Pydantic' }
                }
            }
        }
    },
    sql: {
        id: 'sql',
        label: 'SQL',
        icon: '🗄️',
        children: {
            basics: { id: 'basics', label: 'Bases' },
            aggregation: { id: 'aggregation', label: 'Agrégation' },
            join: { id: 'join', label: 'Jointures' },
            cte: { id: 'cte', label: 'CTE (WITH)' },
            'window-function': { id: 'window-function', label: 'Window Functions' },
            text: { id: 'text', label: 'Texte' },
            json: { id: 'json', label: 'JSON' },
            performance: { id: 'performance', label: 'Performance' }
        }
    },
    dax: {
        id: 'dax',
        label: 'DAX',
        icon: '📊',
        children: {
            basics: { id: 'basics', label: 'Bases' },
            'time-intelligence': { id: 'time-intelligence', label: 'Time Intelligence' },
            context: { id: 'context', label: 'Contexte' },
            advanced: { id: 'advanced', label: 'Avancé' }
        }
    },
    nosql: {
        id: 'nosql',
        label: 'NoSQL',
        icon: '📦',
        children: {
            mongodb: { id: 'mongodb', label: 'MongoDB' },
            neo4j: { id: 'neo4j', label: 'Neo4j' }
        }
    },
    r: {
        id: 'r',
        label: 'R',
        icon: '📈',
        children: {
            dplyr: { id: 'dplyr', label: 'dplyr' },
            ggplot2: { id: 'ggplot2', label: 'ggplot2' }
        }
    }
};

// Utility Functions

/**
 * Flatten hierarchy to get all tag IDs
 */
export function getAllTagIds(node = tagHierarchy, prefix = '') {
    let tags = [];

    Object.values(node).forEach(item => {
        const fullId = prefix ? `${prefix}.${item.id}` : item.id;
        tags.push(fullId);

        if (item.children) {
            tags = tags.concat(getAllTagIds(item.children, fullId));
        }
    });

    return tags;
}

/**
 * Get tag path (breadcrumb)
 * Example: 'ml.supervised.classification' => ['Machine Learning', 'Supervisé', 'Classification']
 */
export function getTagPath(tagId) {
    const parts = tagId.split('.');
    let current = tagHierarchy;
    const path = [];

    for (const part of parts) {
        if (current[part]) {
            path.push(current[part].label);
            current = current[part].children || {};
        }
    }

    return path;
}

/**
 * Get parent tag ID
 */
export function getParentTag(tagId) {
    const parts = tagId.split('.');
    if (parts.length === 1) return null;
    return parts.slice(0, -1).join('.');
}

/**
 * Get all children tag IDs (recursive)
 */
export function getChildTags(tagId) {
    const parts = tagId.split('.');
    let current = tagHierarchy;

    for (const part of parts) {
        if (current[part]) {
            current = current[part];
        } else {
            return [];
        }
    }

    if (!current.children) return [];

    return getAllTagIds(current.children, tagId);
}

/**
 * Check if a snippet matches selected tags
 * @param {Array} snippetTags - Flat tags from snippet
 * @param {Array} selectedTags - Hierarchical tag IDs
 * @param {String} mode - 'AND' or 'OR'
 */
export function matchesTags(snippetTags, selectedTags, mode = 'AND') {
    if (!selectedTags || selectedTags.length === 0) return true;
    if (!snippetTags || snippetTags.length === 0) return false;

    const matches = selectedTags.map(selectedTag => {
        // Split hierarchical tag into parts
        // Example: 'python.pandas.io' => ['python', 'pandas', 'io']
        const tagParts = selectedTag.split('.');

        // Strategy: Match the LAST (most specific) part
        // Example: 'sql.aggregation' should match snippets with tag 'aggregation'
        // NOT all snippets with tag 'sql'
        const lastPart = tagParts[tagParts.length - 1];

        // Check if the most specific part matches
        return snippetTags.some(snippetTag =>
            snippetTag.toLowerCase() === lastPart.toLowerCase() ||
            snippetTag.toLowerCase().includes(lastPart.toLowerCase()) ||
            lastPart.toLowerCase().includes(snippetTag.toLowerCase())
        );
    });

    return mode === 'AND'
        ? matches.every(m => m)
        : matches.some(m => m);
}

/**
 * Count snippets per tag
 */
export function countSnippetsByTag(allSnippets) {
    const counts = {};

    allSnippets.forEach(snippet => {
        if (snippet.tags) {
            snippet.tags.forEach(tag => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        }
    });

    return counts;
}

/**
 * Map flat tag to hierarchical path
 * Example: 'pandas' => 'python.pandas'
 */
export function mapFlatToHierarchical(flatTag) {
    function search(node, prefix = '') {
        for (const [key, value] of Object.entries(node)) {
            const fullPath = prefix ? `${prefix}.${key}` : key;

            if (key === flatTag || value.id === flatTag) {
                return fullPath;
            }

            if (value.children) {
                const found = search(value.children, fullPath);
                if (found) return found;
            }
        }
        return null;
    }

    return search(tagHierarchy) || flatTag;
}
