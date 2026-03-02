import React from 'react';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { ProfileCardHeader } from './ProfileCardHeader';

interface EconomistRevealCardProps {
    name: string;
    portrait: string;
    era?: string;
    schoolOfThought?: string;
    bullets: string[];
    discussionPrompt: string;
    userChoice?: 'left' | 'right';
    animationDelay?: number;
}

export function EconomistRevealCard({
    name,
    portrait,
    era,
    schoolOfThought,
    bullets,
    discussionPrompt,
    userChoice,
    animationDelay = 0,
}: EconomistRevealCardProps) {
    return (
        <div
            className="animate-fade-in-scale"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            <div className="bg-slide-surface border border-gold/30 rounded-3xl overflow-hidden shadow-card-lg glow-gold max-w-2xl mx-auto">
                {/* Tinder-style profile card header */}
                <ProfileCardHeader
                    name={name}
                    portrait={portrait}
                    era={era}
                    schoolOfThought={schoolOfThought}
                    badge="Economist Match"
                />

                {/* Body */}
                <div className="px-6 md:px-8 py-5 md:py-6">
                    {/* User choice badge */}
                    {userChoice && (
                        <div className="mb-5">
                            <div
                                className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${
                                    userChoice === 'right'
                                        ? 'bg-swipe-right/20 text-swipe-right'
                                        : 'bg-swipe-left/20 text-swipe-left'
                                }`}
                            >
                                <CheckCircle size={14} />
                                {userChoice === 'right' ? 'You agreed with this!' : 'You disagreed with this'}
                            </div>
                        </div>
                    )}

                    {/* Key Beliefs */}
                    <div className="mb-5">
                        <h4 className="text-gold-dim text-xs font-bold uppercase tracking-widest mb-3">
                            Key Beliefs
                        </h4>
                        <ul className="space-y-2">
                            {bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3 text-foreground/90">
                                    <span className="text-gold mt-0.5 flex-shrink-0">◆</span>
                                    <span className="text-base md:text-lg leading-snug">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Discussion Prompt */}
                    <div className="bg-slide-surface-2 border border-gold/20 rounded-2xl p-4 md:p-5">
                        <div className="flex items-start gap-3">
                            <MessageCircle size={20} className="text-gold flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">
                                    Discussion Prompt
                                </p>
                                <p className="text-foreground/90 text-base md:text-lg leading-relaxed italic">
                                    {discussionPrompt}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
