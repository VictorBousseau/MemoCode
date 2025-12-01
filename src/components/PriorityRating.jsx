import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PriorityRating({ priority, onChange, readOnly = false }) {
    const stars = [1, 2, 3];

    return (
        <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
            {stars.map((star) => (
                <button
                    key={star}
                    onClick={() => !readOnly && onChange(star === priority ? 0 : star)}
                    className={`p-1 rounded-full transition-all ${readOnly ? 'cursor-default' : 'cursor-pointer hover:bg-zinc-800'}`}
                    disabled={readOnly}
                    title={readOnly ? `Priorité ${priority}` : `Définir priorité ${star}`}
                >
                    <Star
                        className={`w-3.5 h-3.5 transition-all ${star <= priority
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-zinc-600 hover:text-zinc-400'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}
