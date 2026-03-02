import React, { useState } from 'react';
import type { StatementSlideData, SwipeChoice } from '../types/slides';
import { SwipeButton } from './SwipeButton';
import { EconomistRevealCard } from './EconomistRevealCard';
import { ProfileCardHeader } from './ProfileCardHeader';

interface StatementSlideProps {
    slide: StatementSlideData;
    existingChoice?: SwipeChoice;
    onSwipe: (slideId: string, choice: SwipeChoice) => void;
    slideNumber: number;
}

export function StatementSlide({ slide, existingChoice, onSwipe, slideNumber }: StatementSlideProps) {
    const [revealed, setRevealed] = useState(!!existingChoice);
    const [choice, setChoice] = useState<SwipeChoice | undefined>(existingChoice);

    const handleSwipe = (direction: SwipeChoice) => {
        setChoice(direction);
        setRevealed(true);
        onSwipe(slide.id, direction);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 md:py-12">
            <div className="max-w-2xl w-full">
                {/* Slide label */}
                <div className="text-center mb-6 animate-fade-in-up">
                    <p className="text-gold text-sm font-bold uppercase tracking-widest mb-2">
                        Round {slideNumber}
                    </p>
                    <h2 className="font-display text-2xl md:text-4xl font-black text-foreground">
                        {slide.title}
                    </h2>
                </div>

                {!revealed ? (
                    /* Statement Card with Tinder-style profile header teaser */
                    <div className="animate-fade-in-scale space-y-5">
                        {/* Tinder profile card teaser — blurred/mystery */}
                        <div className="relative rounded-3xl overflow-hidden border border-gold/20 shadow-card-lg">
                            <div className="relative" style={{ aspectRatio: '4 / 3' }}>
                                <img
                                    src={slide.economistPortrait}
                                    alt="Mystery economist"
                                    className="w-full h-full object-cover object-top"
                                    style={{ filter: 'blur(18px) brightness(0.35) saturate(0.4)' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=?&background=1a1a3a&color=d4a843&size=400`;
                                    }}
                                />
                                {/* Dark overlay */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            'linear-gradient(to top, oklch(0.10 0.025 265 / 0.95) 0%, oklch(0.12 0.025 265 / 0.5) 50%, transparent 100%)',
                                    }}
                                />
                                {/* Mystery label */}
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
                                {/* Mystery economist overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                                        style={{
                                            background: 'oklch(0.82 0.16 75 / 0.15)',
                                            border: '2px solid oklch(0.82 0.16 75 / 0.5)',
                                        }}
                                    >
                                        🎭
                                    </div>
                                    <p
                                        className="font-display font-bold text-lg"
                                        style={{ color: 'oklch(0.82 0.16 75)' }}
                                    >
                                        Mystery Economist
                                    </p>
                                    <p className="text-white/60 text-sm">Swipe to reveal</p>
                                </div>
                                {/* Bottom shimmer */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-0.5"
                                    style={{
                                        background:
                                            'linear-gradient(to right, transparent, oklch(0.82 0.16 75 / 0.6), transparent)',
                                    }}
                                />
                            </div>

                            {/* Statement inside the card */}
                            <div className="bg-slide-surface px-6 py-5 text-center">
                                <div className="text-gold text-2xl mb-3">💬</div>
                                <p className="text-foreground text-lg md:text-2xl font-display font-bold leading-relaxed">
                                    {slide.statement}
                                </p>
                            </div>
                        </div>

                        {/* Swipe Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <SwipeButton direction="left" onClick={() => handleSwipe('left')} />
                            <SwipeButton direction="right" onClick={() => handleSwipe('right')} />
                        </div>
                    </div>
                ) : (
                    /* Reveal */
                    <div className="space-y-4">
                        {/* Statement recap */}
                        <div
                            className={`border rounded-2xl px-5 py-3 text-center animate-fade-in-up ${
                                choice === 'right'
                                    ? 'bg-swipe-right/10 border-swipe-right/40'
                                    : 'bg-swipe-left/10 border-swipe-left/40'
                            }`}
                        >
                            <p className="text-foreground/70 text-sm md:text-base italic leading-snug">
                                {slide.statement}
                            </p>
                            <p className={`text-sm font-bold mt-1 ${choice === 'right' ? 'text-swipe-right' : 'text-swipe-left'}`}>
                                You swiped {choice === 'right' ? 'RIGHT ✓' : 'LEFT ✗'}
                            </p>
                        </div>

                        <EconomistRevealCard
                            name={slide.economistName}
                            portrait={slide.economistPortrait}
                            era={slide.economistEra}
                            schoolOfThought={slide.economistSchool}
                            bullets={slide.profileBullets}
                            discussionPrompt={slide.discussionPrompt}
                            userChoice={choice}
                        />

                        {/* Change mind option */}
                        {choice && (
                            <div className="text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                                <button
                                    onClick={() => {
                                        setRevealed(false);
                                        setChoice(undefined);
                                    }}
                                    className="text-foreground/40 hover:text-foreground/70 text-sm underline underline-offset-2 transition-colors"
                                >
                                    ← Change my answer
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
