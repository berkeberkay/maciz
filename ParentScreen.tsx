import React, { useState } from 'react';
import type { Theme, Story } from '../types';

interface ParentScreenProps {
  selectedTheme: Theme;
  onThemeSelect: (theme: Theme) => void;
  stories: Story[];
  onShowPremium: () => void;
  onLogout: () => void;
}

const themes = [
  { id: 'animals', emoji: '🦁', name: 'Hayvanlar' },
  { id: 'nature', emoji: '🌳', name: 'Doğa' },
  { id: 'numbers', emoji: '🔢', name: 'Sayılar' },
  { id: 'emotions', emoji: '😊', name: 'Duygular' }
];

export function ParentScreen({ 
  selectedTheme, 
  onThemeSelect, 
  stories, 
  onShowPremium, 
  onLogout 
}: ParentScreenProps) {
  const [settings, setSettings] = useState({
    contentFilter: true,
    quietHours: true,
    timeLimit: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalDrawings = stories.length;
  const totalTime = Math.floor(stories.reduce((sum, story) => sum + (story.duration || 0), 0) / 60);

  return (
    <div className="parent-screen">
      <div className="parent-header">
        <h1>Ebeveyn Paneli</h1>
        <p>Çocuğunuzun gelişimini takip edin</p>
      </div>

      <div className="theme-selector">
        <h2 className="section-title">Hikaye Temaları</h2>
        <div className="theme-grid">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`theme-option ${selectedTheme === theme.id ? 'selected' : ''}`}
              onClick={() => onThemeSelect(theme.id as Theme)}
            >
              <div className="theme-emoji">{theme.emoji}</div>
              <div>{theme.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="safety-settings">
        <h2 className="section-title">Güvenlik Ayarları</h2>
        
        <div className="setting-row">
          <span>İçerik Filtreleme</span>
          <div 
            className={`toggle-switch ${settings.contentFilter ? 'active' : ''}`}
            onClick={() => toggleSetting('contentFilter')}
          />
        </div>
        
        <div className="setting-row">
          <span>Sessiz Saatler (20:00 - 08:00)</span>
          <div 
            className={`toggle-switch ${settings.quietHours ? 'active' : ''}`}
            onClick={() => toggleSetting('quietHours')}
          />
        </div>
        
        <div className="setting-row">
          <span>Günlük Süre Limiti</span>
          <div 
            className={`toggle-switch ${settings.timeLimit ? 'active' : ''}`}
            onClick={() => toggleSetting('timeLimit')}
          />
        </div>
      </div>

      <div className="progress-report">
        <h2 className="section-title">İlerleme Raporu</h2>
        <div className="progress-grid">
          <div className="progress-item">
            <div className="progress-number">{totalDrawings}</div>
            <div className="progress-label">Toplam Çizim</div>
          </div>
          <div className="progress-item">
            <div className="progress-number">95%</div>
            <div className="progress-label">Tamamlama Oranı</div>
          </div>
          <div className="progress-item">
            <div className="progress-number">8.5</div>
            <div className="progress-label">Ortalama Puan</div>
          </div>
          <div className="progress-item">
            <div className="progress-number">{totalTime}</div>
            <div className="progress-label">Dakika</div>
          </div>
        </div>
      </div>

      <div className="premium-promotion">
        <h3>Premium'a Yükseltin</h3>
        <p>Sınırsız hikaye, özel temalar ve daha fazlası!</p>
        <button className="btn premium-btn" onClick={onShowPremium}>
          Ücretsiz Dene (7 Gün)
        </button>
      </div>

      <button className="btn btn-danger btn-block" onClick={onLogout}>
        Çıkış Yap
      </button>
    </div>
  );
}