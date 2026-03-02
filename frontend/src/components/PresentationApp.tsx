import React, { useState, useCallback } from 'react';
import { slides } from '../data/slides';
import type { SwipeChoices, SwipeChoice } from '../types/slides';
import { ProgressIndicator } from './ProgressIndicator';
import { TitleSlide } from './TitleSlide';
import { RulesSlide } from './RulesSlide';
import { StatementSlide } from './StatementSlide';
import { LightningRoundSlide } from './LightningRoundSlide';
import { SummarySlide } from './SummarySlide';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PresentationApp() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeChoices, setSwipeChoices] = useState<SwipeChoices>({});

    const totalSlides = slides.length;
    const currentSlide = slides[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === totalSlides - 1;

    const goNext = useCallback(() => {
        if (!isLast) setCurrentIndex((i) => i + 1);
    }, [isLast]);

    const goBack = useCallback(() => {
        if (!isFirst) setCurrentIndex((i) => i - 1);
    }, [isFirst]);

    const handleSwipe = useCallback((slideId: string, choice: SwipeChoice) => {
        setSwipeChoices((prev) => ({ ...prev, [slideId]: choice }));
    }, []);

    const handleRestart = useCallback(() => {
        setCurrentIndex(0);
        setSwipeChoices({});
    }, []);

    const renderSlide = () => {
        switch (currentSlide.type) {
            case 'title':
                return <TitleSlide slide={currentSlide} onStart={goNext} />;
            case 'rules':
                return <RulesSlide slide={currentSlide} />;
            case 'statement':
                return (
                    <StatementSlide
                        slide={currentSlide}
                        existingChoice={swipeChoices[currentSlide.id]}
                        onSwipe={handleSwipe}
                        slideNumber={currentIndex - 1}
                    />
                );
            case 'lightning':
                return <LightningRoundSlide slide={currentSlide} />;
            case 'summary':
                return (
                    <SummarySlide
                        slide={currentSlide}
                        swipeChoices={swipeChoices}
                        onRestart={handleRestart}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slide-bg flex flex-col">
            {/* Top bar */}
            <header className="flex-shrink-0 flex items-center justify-between px-4 md:px-8 py-3 border-b border-gold/10 bg-slide-surface/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <img
                        src="/assets/generated/economic-tinder-logo.dim_512x512.png"
                        alt="Economic Tinder"
                        className="w-8 h-8"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    <span className="font-display font-bold text-gold text-lg hidden sm:block">
                        Economic Tinder
                    </span>
                </div>

                <ProgressIndicator current={currentIndex + 1} total={totalSlides} />

                <div className="flex items-center gap-2">
                    {/* Slide type badge */}
                    <span className="hidden sm:block text-foreground/40 text-xs font-semibold uppercase tracking-wider">
                        {currentSlide.type === 'title' && 'Intro'}
                        {currentSlide.type === 'rules' && 'Rules'}
                        {currentSlide.type === 'statement' && 'Statement'}
                        {currentSlide.type === 'lightning' && '⚡ Lightning'}
                        {currentSlide.type === 'summary' && 'Results'}
                    </span>
                </div>
            </header>

            {/* Main slide area */}
            <main className="flex-1 overflow-y-auto">
                <div key={currentIndex} className="min-h-full">
                    {renderSlide()}
                </div>
            </main>

            {/* Bottom navigation */}
            <footer className="flex-shrink-0 border-t border-gold/10 bg-slide-surface/50 backdrop-blur-sm">
                <div className="flex items-center justify-between px-4 md:px-8 py-3">
                    {/* Back button */}
                    <button
                        onClick={goBack}
                        disabled={isFirst}
                        className={`flex items-center gap-2 font-semibold text-base px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                            isFirst
                                ? 'opacity-0 pointer-events-none'
                                : 'border-gold/30 text-foreground/60 hover:text-gold hover:border-gold hover:scale-105 active:scale-95 cursor-pointer'
                        }`}
                    >
                        <ChevronLeft size={18} />
                        Back
                    </button>

                    {/* Slide title */}
                    <p className="text-foreground/40 text-sm font-medium text-center hidden md:block max-w-xs truncate">
                        {currentSlide.title}
                    </p>

                    {/* Next button */}
                    {currentSlide.type !== 'title' && !isLast ? (
                        <button
                            onClick={goNext}
                            className="flex items-center gap-2 bg-gold text-slide-bg font-bold text-base px-6 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-card"
                        >
                            Next
                            <ChevronRight size={18} />
                        </button>
                    ) : currentSlide.type === 'title' ? (
                        <div className="w-24" />
                    ) : isLast ? (
                        <div className="w-24" />
                    ) : null}
                </div>

                {/* Attribution footer */}
                <div className="text-center pb-2 px-4">
                    <p className="text-foreground/25 text-xs">
                        © {new Date().getFullYear()} Built with{' '}
                        <span className="text-swipe-left">♥</span>{' '}
                        using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'economic-tinder')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold/50 hover:text-gold transition-colors underline underline-offset-2"
                        >
                            caffeine.ai
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
