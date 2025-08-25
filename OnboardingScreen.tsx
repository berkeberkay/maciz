import React from 'react';
import type { AgeGroup } from '../types';

interface OnboardingScreenProps {
  selectedAge: AgeGroup | null;
  onAgeSelect: (age: AgeGroup) => void;
  onStart: () => void;
}

export function OnboardingScreen({ selectedAge, onAgeSelect, onStart }: OnboardingScreenProps) {
  return (
    <div className="onboarding-screen">
      <div className="logo">🎨</div>
      <h1 className="onboarding-title">Maciz'e Hoş Geldin!</h1>
      <p className="onboarding-subtitle">Çizimlerini yapay zeka ile hikayelere dönüştür</p>
      
      <div className="age-verification">
        <h2>Kaç yaşındasın?</h2>
        <div className="age-options">
          {[
            { value: '4-5', label: '4-5 Yaş' },
            { value: '6-7', label: '6-7 Yaş' },
            { value: 'parent', label: 'Ebeveyn' },
            { value: 'other', label: '8+ Yaş' }
          ].map(({ value, label }) => (
            <div
              key={value}
              className={`age-option ${selectedAge === value ? 'selected' : ''}`}
              onClick={() => onAgeSelect(value as AgeGroup)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      
      {selectedAge && (
        <button className="btn btn-primary btn-block start-button" onClick={onStart}>
          Başla
        </button>
      )}
    </div>
  );
}