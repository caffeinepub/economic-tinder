import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface SwipeButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function SwipeButton({ direction, onClick, disabled = false, size = 'lg' }: SwipeButtonProps) {
    const isRight = direction === 'right';

    const sizeClasses = {
        sm: 'px-5 py-2.5 text-base gap-2',
        md: 'px-7 py-3.5 text-lg gap-2.5',
        lg: 'px-10 py-5 text-xl gap-3',
    };

    const iconSize = {
        sm: 18,
        md: 22,
        lg: 28,
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative flex items-center justify-center font-bold rounded-2xl
                border-2 transition-all duration-200 select-none
                ${sizeClasses[size]}
                ${isRight
                    ? 'bg-swipe-right/15 border-swipe-right text-swipe-right hover:bg-swipe-right hover:text-white hover:glow-green active:scale-95'
                    : 'bg-swipe-left/15 border-swipe-left text-swipe-left hover:bg-swipe-left hover:text-white hover:glow-red active:scale-95'
                }
                ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
            `}
        >
            {!isRight && <ThumbsDown size={iconSize[size]} />}
            <span>{isRight ? 'Swipe Right ✓' : 'Swipe Left ✗'}</span>
            {isRight && <ThumbsUp size={iconSize[size]} />}
        </button>
    );
}
