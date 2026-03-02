export type SlideType = 'title' | 'rules' | 'statement' | 'lightning' | 'summary';

export interface BaseSlide {
    id: string;
    type: SlideType;
    title: string;
}

export interface TitleSlideData extends BaseSlide {
    type: 'title';
    subtitle: string;
    bullets: string[];
    presenterNotes: string;
}

export interface RulesSlideData extends BaseSlide {
    type: 'rules';
    rules: { icon: string; text: string }[];
    presenterNotes: string;
}

export interface StatementSlideData extends BaseSlide {
    type: 'statement';
    statement: string;
    economistName: string;
    economistPortrait: string;
    economistEra?: string;
    economistSchool?: string;
    profileBullets: string[];
    discussionPrompt: string;
}

export interface LightningRoundItem {
    id: string;
    statement: string;
    reveal: string;
    economists: string[];
}

export interface LightningSlideData extends BaseSlide {
    type: 'lightning';
    items: LightningRoundItem[];
    presenterNotes: string;
}

export interface EconomistSummary {
    name: string;
    label: string;
    portrait: string;
    slideId: string;
    era?: string;
    schoolOfThought?: string;
}

export interface SummarySlideData extends BaseSlide {
    type: 'summary';
    economists: EconomistSummary[];
    reflectionPrompt: string;
}

export type Slide =
    | TitleSlideData
    | RulesSlideData
    | StatementSlideData
    | LightningSlideData
    | SummarySlideData;

export type SwipeChoice = 'left' | 'right';
export type SwipeChoices = Record<string, SwipeChoice>;
