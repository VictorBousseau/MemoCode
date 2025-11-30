import React from 'react';

const DIFFICULTY_CONFIG = {
    beginner: {
        label: 'Débutant',
        emoji: '🟢',
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20'
    },
    intermediate: {
        label: 'Intermédiaire',
        emoji: '🟡',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20'
    },
    advanced: {
        label: 'Avancé',
        emoji: '🔴',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20'
    }
};

export default function DifficultyBadge({ level }) {
    if (!level || !DIFFICULTY_CONFIG[level]) return null;

    const config = DIFFICULTY_CONFIG[level];

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.color} ${config.bgColor} border ${config.borderColor}`}
            title={`Niveau: ${config.label}`}
        >
            <span>{config.emoji}</span>
            <span>{config.label}</span>
        </span>
    );
}
