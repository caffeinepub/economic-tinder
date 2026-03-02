import React from 'react';
import type { RulesSlideData } from '../types/slides';

interface RulesSlideProps {
    slide: RulesSlideData;
}

export function RulesSlide({ slide }: RulesSlideProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-full px-6 py-12 animate-fade-in-up">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-gold text-sm font-bold uppercase tracking-widest mb-3">
                        Before We Begin
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl font-black text-foreground">
                        {slide.title}
                    </h2>
                </div>

                {/* Rules */}
                <div className="space-y-4 mb-10">
                    {slide.rules.map((rule, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-5 bg-slide-surface border border-gold/20 rounded-2xl px-6 py-5 animate-fade-in-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <span className="text-3xl flex-shrink-0">{rule.icon}</span>
                            <p className="text-foreground/90 text-lg md:text-xl leading-snug">
                                {rule.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Swipe preview */}
                <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 bg-swipe-left/15 border border-swipe-left rounded-xl px-5 py-3">
                        <span className="text-swipe-left text-2xl">✗</span>
                        <span className="text-swipe-left font-bold text-lg">Disagree</span>
                    </div>
                    <div className="text-foreground/40 text-2xl font-light">vs</div>
                    <div className="flex items-center gap-2 bg-swipe-right/15 border border-swipe-right rounded-xl px-5 py-3">
                        <span className="text-swipe-right font-bold text-lg">Agree</span>
                        <span className="text-swipe-right text-2xl">✓</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
