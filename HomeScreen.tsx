import React from 'react';
import type { Story } from '../types';

interface HomeScreenProps {
  storiesCreated: number;
  dailyLimit: number;
  recentStories: Story[];
  isPremium: boolean;
  onStartDrawing: (theme?: string) => void;
  onShowPremium: () => void;
  onPlayStory: (storyId: number) => void;
}

export function HomeScreen({
  storiesCreated,
  dailyLimit,
  recentStories,
  isPremium,
  onStartDrawing,
  onShowPremium,
  onPlayStory
}: HomeScreenProps) {
  const remaining = Math.max(0, dailyLimit - storiesCreated);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Günaydın';
    if (hours < 18) return 'İyi günler';
    return 'İyi akşamlar';
  };

  return (
    <div className="home-screen">
      <div className="home-header">
        <div className="welcome-text">{getGreeting()}! 👋</div>
        <div className="daily-limit">
          <span>Günlük Hak: {remaining}/{dailyLimit}</span>
          {!isPremium && (
            <span className="premium-badge" onClick={onShowPremium}>
              Premium'a Geç
            </span>
          )}
        </div>
      </div>
      
      <div className="recent-drawings">
        <h2 className="section-title">Son Çizimler</h2>
        <div className="drawing-grid">
          {recentStories.slice(0, 3).map((story) => (
            <div
              key={story.id}
              className="drawing-card"
              onClick={() => onPlayStory(story.id)}
            >
              <div className="drawing-preview">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover rounded" />
              </div>
              <div className="drawing-date">{story.date}</div>
            </div>
          ))}
          
          <div className="drawing-card" onClick={() => onStartDrawing()}>
            <div className="drawing-preview">➕</div>
            <div className="drawing-date">Yeni Çizim</div>
          </div>
        </div>

        <h2 className="section-title" style={{ marginTop: '30px' }}>Bugünün Görevi</h2>
        <div className="daily-task">
          <h3>🦁 Hayvan Dostum</h3>
          <p>En sevdiğin hayvanı çiz ve onun macerasını dinle!</p>
          <button className="btn task-button" onClick={() => onStartDrawing('animal')}>
            Göreve Başla
          </button>
        </div>
      </div>
    </div>
  );
}