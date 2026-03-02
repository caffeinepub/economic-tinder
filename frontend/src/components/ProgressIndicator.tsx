import React from 'react';

interface ProgressIndicatorProps {
    current: number;
    total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
    const percentage = ((current - 1) / (total - 1)) * 100;

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
                {Array.from({ length: total }, (_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${
                            i + 1 === current
                                ? 'w-6 h-2 bg-gold'
                                : i + 1 < current
                                ? 'w-2 h-2 bg-gold opacity-50'
                                : 'w-2 h-2 bg-slide-surface-2'
                        }`}
                    />
                ))}
            </div>
            <span className="text-sm font-semibold text-gold tabular-nums">
                {current} / {total}
            </span>
        </div>
    );
}
