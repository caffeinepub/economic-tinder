import React from 'react';

interface ProfileCardHeaderProps {
    name: string;
    portrait: string;
    era?: string;
    schoolOfThought?: string;
    /** Optional badge label shown in top-right corner */
    badge?: string;
    className?: string;
}

/**
 * Tinder-style profile card header — for design purposes.
 * Displays a full-bleed portrait with a gradient overlay and
 * economist metadata (name, era, school of thought) at the bottom-left.
 */
export function ProfileCardHeader({
    name,
    portrait,
    era,
    schoolOfThought,
    badge,
    className = '',
}: ProfileCardHeaderProps) {
    return (
        <div
            className={`relative w-full overflow-hidden rounded-t-3xl ${className}`}
            style={{ aspectRatio: '4 / 3' }}
            aria-label={`Profile card for ${name} — for design purposes`}
        >
            {/* Portrait image */}
            <img
                src={portrait}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover object-top"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1a3a&color=d4a843&size=400&bold=true&font-size=0.33`;
                }}
            />

            {/* Gradient overlay — dark at bottom, transparent at top */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(to top, oklch(0.10 0.025 265 / 0.97) 0%, oklch(0.12 0.025 265 / 0.6) 40%, transparent 75%)',
                }}
            />

            {/* Design-purposes watermark — top-left */}
            <div className="absolute top-3 left-3">
                <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                        background: 'oklch(0.82 0.16 75 / 0.18)',
                        color: 'oklch(0.82 0.16 75)',
                        border: '1px solid oklch(0.82 0.16 75 / 0.35)',
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    Design Preview
                </span>
            </div>

            {/* Optional badge — top-right (e.g. "Economist Match") */}
            {badge && (
                <div className="absolute top-3 right-3">
                    <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                            background: 'oklch(0.82 0.16 75 / 0.22)',
                            color: 'oklch(0.82 0.16 75)',
                            border: '1px solid oklch(0.82 0.16 75 / 0.4)',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        {badge}
                    </span>
                </div>
            )}

            {/* Bottom-left info overlay — Tinder style */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10">
                {/* School of thought tag */}
                {schoolOfThought && (
                    <div className="mb-2">
                        <span
                            className="inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                            style={{
                                background: 'oklch(0.82 0.16 75 / 0.2)',
                                color: 'oklch(0.82 0.16 75)',
                                border: '1px solid oklch(0.82 0.16 75 / 0.4)',
                                backdropFilter: 'blur(6px)',
                            }}
                        >
                            {schoolOfThought}
                        </span>
                    </div>
                )}

                {/* Name */}
                <h3
                    className="font-display font-black text-white leading-tight"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
                >
                    {name}
                </h3>

                {/* Era */}
                {era && (
                    <p
                        className="text-sm font-medium mt-0.5"
                        style={{ color: 'oklch(0.88 0.08 75)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                    >
                        {era}
                    </p>
                )}
            </div>

            {/* Subtle gold shimmer line at bottom */}
            <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(to right, transparent, oklch(0.82 0.16 75 / 0.6), transparent)' }}
            />
        </div>
    );
}
