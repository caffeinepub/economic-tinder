import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { TitleSlideData } from '../types/slides';

interface TitleSlideProps {
    slide: TitleSlideData;
    onStart: () => void;
}

export function TitleSlide({ slide, onStart }: TitleSlideProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-full text-center px-6 py-12 animate-fade-in-up">
            {/* Logo */}
            <div className="mb-8">
                <img
                    src="/assets/generated/economic-tinder-logo.dim_512x512.png"
                    alt="Economic Tinder Logo"
                    className="w-28 h-28 md:w-36 md:h-36 mx-auto drop-shadow-2xl"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl font-black text-foreground mb-3 leading-tight">
                Economic{' '}
                <span className="text-gold">Tinder</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-xl leading-relaxed">
                {slide.subtitle}
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3 mb-12 max-w-md w-full">
                {slide.bullets.map((bullet, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 bg-slide-surface border border-gold/20 rounded-xl px-5 py-3 text-left animate-fade-in-up"
                        style={{ animationDelay: `${(i + 1) * 120}ms` }}
                    >
                        <span className="text-gold text-lg">✦</span>
                        <span className="text-foreground/85 text-base md:text-lg">{bullet}</span>
                    </div>
                ))}
            </div>

            {/* Start Button */}
            <button
                onClick={onStart}
                className="group flex items-center gap-3 bg-gold text-slide-bg font-bold text-xl md:text-2xl px-12 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse-gold shadow-card-lg"
            >
                Let's Start
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
