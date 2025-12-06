import React from 'react';
import { ChevronRight, ChevronDown, Check } from 'lucide-react';
import { tagHierarchy, getChildTags } from '../data/tagHierarchy';

export default function TagHierarchy({
    selectedTags = [],
    expandedNodes = [],
    onToggleTag,
    onToggleNode,
    tagCounts = {}
}) {

    const renderNode = (node, parentPath = '', level = 0) => {
        const nodeId = parentPath ? `${parentPath}.${node.id}` : node.id;
        const isExpanded = expandedNodes.includes(nodeId);
        const isSelected = selectedTags.includes(nodeId);
        const hasChildren = node.children && Object.keys(node.children).length > 0;
        const count = tagCounts[node.id] || 0;

        // Check if any child is selected
        const childTags = hasChildren ? getChildTags(nodeId) : [];
        const hasSelectedChild = childTags.some(childId => selectedTags.includes(childId));

        return (
            <div key={nodeId} className="select-none">
                <div
                    className={`
            flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer
            transition-colors hover:bg-zinc-800/50
            ${isSelected ? 'bg-blue-500/20 border border-blue-500/30' : ''}
            ${hasSelectedChild && !isSelected ? 'bg-blue-500/10' : ''}
          `}
                    style={{ paddingLeft: `${level * 0.75 + 0.5}rem` }}
                >
                    {/* Expand/Collapse Icon - Fixed width for alignment */}
                    <div className="w-5 flex items-center justify-center flex-shrink-0">
                        {hasChildren && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleNode(nodeId);
                                }}
                                className="p-0.5 hover:bg-zinc-700 rounded transition-colors"
                            >
                                {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                                )}
                            </button>
                        )}
                    </div>

                    {/* Checkbox - Fixed size */}
                    <button
                        onClick={() => onToggleTag(nodeId)}
                        className={`
              w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center
              transition-all
              ${isSelected
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-zinc-600 hover:border-blue-400'
                            }
            `}
                    >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                    </button>

                    {/* Icon */}
                    {node.icon && <span className="text-base">{node.icon}</span>}

                    {/* Label */}
                    <span
                        className={`
              flex-1 text-sm
              ${isSelected ? 'text-blue-300 font-medium' : 'text-zinc-300'}
            `}
                        onClick={() => onToggleTag(nodeId)}
                    >
                        {node.label}
                    </span>

                    {/* Count Badge */}
                    {count > 0 && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-zinc-700 text-zinc-400">
                            {count}
                        </span>
                    )}
                </div>

                {/* Children */}
                {hasChildren && isExpanded && (
                    <div className="mt-1">
                        {Object.values(node.children).map(child =>
                            renderNode(child, nodeId, level + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-1">
            {Object.values(tagHierarchy).map(node => renderNode(node))}
        </div>
    );
}
