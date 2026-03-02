import React from 'react';
import type { SummarySlideData, SwipeChoices } from '../types/slides';
import { RotateCcw, Heart } from 'lucide-react';

interface SummarySlideProps {
    slide: SummarySlideData;
    swipeChoices: SwipeChoices;
    onRestart: () => void;
}

export function SummarySlide({ slide, swipeChoices, onRestart }: SummarySlideProps) {
    const matchedEconomists = slide.economists.filter(
        (e) => swipeChoices[e.slideId] === 'right'
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 md:py-12">
            <div className="max-w-3xl w-full">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <p className="text-gold text-sm font-bold uppercase tracking-widest mb-3">
                        Results
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl font-black text-foreground mb-3">
                        {slide.title}
                    </h2>
                    <p className="text-foreground/60 text-base md:text-lg">
                        Who did you swipe right on?
                    </p>
                </div>

                {/* Match count */}
                {matchedEconomists.length > 0 && (
                    <div className="text-center mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 rounded-full px-6 py-2">
                            <Heart size={16} className="text-gold fill-gold" />
                            <span className="text-gold font-bold">
                                {matchedEconomists.length} match{matchedEconomists.length !== 1 ? 'es' : ''}!
                            </span>
                        </div>
                    </div>
                )}

                {/* Economists Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                    {slide.economists.map((economist, i) => {
                        const isMatch = swipeChoices[economist.slideId] === 'right';
                        const hasVoted = economist.slideId in swipeChoices;

                        return (
                            <div
                                key={economist.name}
                                className={`relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-300 animate-fade-in-up ${
                                    isMatch
                                        ? 'bg-gold/10 border-gold glow-gold'
                                        : hasVoted
                                        ? 'bg-slide-surface border-slide-surface-2 opacity-60'
                                        : 'bg-slide-surface border-slide-surface-2'
                                }`}
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                {/* Match badge */}
                                {isMatch && (
                                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gold rounded-full flex items-center justify-center shadow-lg">
                                        <Heart size={14} className="text-slide-bg fill-slide-bg" />
                                    </div>
                                )}

                                {/* Portrait */}
                                <div className={`w-14 h-14 rounded-full overflow-hidden mb-3 border-2 ${isMatch ? 'border-gold' : 'border-slide-surface-2'}`}>
                                    <img
                                        src={economist.portrait}
                                        alt={economist.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(economist.name)}&background=2a2a4a&color=d4a843&size=128`;
                                        }}
                                    />
                                </div>

                                {/* Name */}
                                <p className={`font-bold text-sm leading-tight mb-1 ${isMatch ? 'text-gold' : 'text-foreground/80'}`}>
                                    {economist.name}
                                </p>

                                {/* Label */}
                                <p className={`text-xs leading-tight ${isMatch ? 'text-foreground/70' : 'text-foreground/40'}`}>
                                    {economist.label}
                                </p>

                                {/* Vote indicator */}
                                {hasVoted && (
                                    <div className={`mt-2 text-xs font-bold ${isMatch ? 'text-swipe-right' : 'text-swipe-left'}`}>
                                        {isMatch ? '✓ Agreed' : '✗ Disagreed'}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Reflection Prompt */}
                <div className="bg-slide-surface border border-gold/30 rounded-3xl p-6 md:p-8 mb-8 text-center animate-fade-in-up glow-gold" style={{ animationDelay: '400ms' }}>
                    <div className="text-gold text-3xl mb-3">🤔</div>
                    <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">
                        Reflection Prompt
                    </p>
                    <p className="text-foreground text-xl md:text-2xl font-display font-bold leading-relaxed italic">
                        "{slide.reflectionPrompt}"
                    </p>
                </div>

                {/* Restart */}
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <button
                        onClick={onRestart}
                        className="flex items-center gap-2 mx-auto bg-slide-surface border border-gold/30 text-foreground/70 hover:text-gold hover:border-gold font-semibold text-base px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <RotateCcw size={18} />
                        Restart Activity
                    </button>
                </div>
            </div>
        </div>
    );
}
