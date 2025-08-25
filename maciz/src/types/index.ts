export interface Story {
  id: number;
  title: string;
  story: string;
  image: string;
  theme: string;
  date: string;
  duration: number;
}

export interface DrawingAnalysis {
  dominantColor: string;
  complexity: 'simple' | 'detailed';
  hasCircular: boolean;
  pixelCount: number;
}

export interface AppSettings {
  childName: string;
  childAge: string;
  language: string;
  speechRate: number;
}

export interface InteractionPrompt {
  question: string;
  answers: string[];
}

export type AgeGroup = '4-5' | '6-7' | 'parent' | 'other';
export type Theme = 'animals' | 'nature' | 'numbers' | 'emotions';
export type DrawingTool = 'pen' | 'brush' | 'eraser' | 'fill' | 'shapes';
export type Screen = 'onboarding' | 'home' | 'drawing' | 'story' | 'library' | 'parent' | 'settings';