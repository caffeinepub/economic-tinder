import React, { useState } from 'react';
import type { LightningSlideData } from '../types/slides';
import { Zap } from 'lucide-react';

interface LightningRoundSlideProps {
    slide: LightningSlideData;
}

type LightningAnswer = 'agree' | 'disagree';

export function LightningRoundSlide({ slide }: LightningRoundSlideProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, LightningAnswer>>({});
    const [showReveal, setShowReveal] = useState(false);

    const allAnswered = Object.keys(answers).length === slide.items.length;

    const handleAnswer = (itemId: string, answer: LightningAnswer) => {
        const newAnswers = { ...answers, [itemId]: answer };
        setAnswers(newAnswers);

        if (currentIndex < slide.items.length - 1) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
        } else {
            setTimeout(() => setShowReveal(true), 400);
        }
    };

    const currentItem = slide.items[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 md:py-12">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Zap size={24} className="text-gold fill-gold" />
                        <p className="text-gold text-sm font-bold uppercase tracking-widest">
                            Lightning Round
                        </p>
                        <Zap size={24} className="text-gold fill-gold" />
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-black text-foreground">
                        {slide.title}
                    </h2>
                    {!showReveal && (
                        <p className="text-foreground/50 text-base mt-2">
                            Swipe Fast — No Overthinking!
                        </p>
                    )}
                </div>

                {!showReveal ? (
                    /* Active question */
                    <div key={currentItem.id} className="animate-fade-in-scale">
                        {/* Progress dots */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            {slide.items.map((item, i) => (
                                <div
                                    key={item.id}
                                    className={`rounded-full transition-all duration-300 ${
                                        i < currentIndex
                                            ? 'w-3 h-3 bg-gold'
                                            : i === currentIndex
                                            ? 'w-5 h-3 bg-gold animate-pulse'
                                            : 'w-3 h-3 bg-slide-surface-2'
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="bg-slide-surface border border-gold/30 rounded-3xl p-8 md:p-10 mb-8 shadow-card-lg text-center">
                            <div className="text-gold text-3xl mb-4">⚡</div>
                            <p className="text-foreground text-xl md:text-2xl font-display font-bold leading-relaxed">
                                {currentItem.statement}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => handleAnswer(currentItem.id, 'disagree')}
                                className="flex items-center gap-2 bg-swipe-left/15 border-2 border-swipe-left text-swipe-left font-bold text-lg px-8 py-4 rounded-2xl hover:bg-swipe-left hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                            >
                                <span>✗</span> Disagree
                            </button>
                            <button
                                onClick={() => handleAnswer(currentItem.id, 'agree')}
                                className="flex items-center gap-2 bg-swipe-right/15 border-2 border-swipe-right text-swipe-right font-bold text-lg px-8 py-4 rounded-2xl hover:bg-swipe-right hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                            >
                                Agree <span>✓</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Reveal all */
                    <div className="space-y-4 animate-fade-in-up">
                        <p className="text-center text-gold font-bold text-lg mb-6">
                            🎯 Here are the reveals!
                        </p>
                        {slide.items.map((item, i) => (
                            <div
                                key={item.id}
                                className="bg-slide-surface border border-gold/20 rounded-2xl p-5 animate-fade-in-up"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <p className="text-foreground/70 text-sm italic mb-2 leading-snug">
                                    {item.statement}
                                </p>
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gold text-xs font-bold uppercase tracking-wider">
                                            Match →
                                        </span>
                                        <span className="text-foreground font-bold text-base">
                                            {item.reveal}
                                        </span>
                                    </div>
                                    <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                                        answers[item.id] === 'agree'
                                            ? 'bg-swipe-right/20 text-swipe-right'
                                            : 'bg-swipe-left/20 text-swipe-left'
                                    }`}>
                                        {answers[item.id] === 'agree' ? 'You agreed ✓' : 'You disagreed ✗'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
