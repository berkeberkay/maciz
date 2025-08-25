import React from 'react';
import type { Story } from '../types';

interface LibraryScreenProps {
  stories: Story[];
  onPlayStory: (storyId: number) => void;
}

export function LibraryScreen({ stories, onPlayStory }: LibraryScreenProps) {
  const totalStories = stories.length;
  const weeklyStories = stories.filter(story => {
    const storyDate = new Date(story.id);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return storyDate > weekAgo;
  }).length;
  
  const totalMinutes = Math.floor(stories.reduce((sum, story) => sum + (story.duration || 0), 0) / 60);

  if (totalStories === 0) {
    return (
      <div className="library-screen">
        <div className="library-header">
          <h1 className="section-title">Hikaye Kitaplığım</h1>
        </div>
        <div className="empty-library">
          <div className="empty-icon">📚</div>
          <p>Henüz hikayen yok</p>
          <p className="empty-subtitle">İlk hikayeni oluşturmak için çizim yap!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="library-screen">
      <div className="library-header">
        <h1 className="section-title">Hikaye Kitaplığım</h1>
        
        <div className="library-stats">
          <div className="stat-card">
            <div className="stat-number">{totalStories}</div>
            <div className="stat-label">Toplam Hikaye</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{weeklyStories}</div>
            <div className="stat-label">Bu Hafta</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalMinutes}</div>
            <div className="stat-label">Dakika</div>
          </div>
        </div>
      </div>

      <div className="story-list">
        {stories.map((story) => (
          <div
            key={story.id}
            className="story-item"
            onClick={() => onPlayStory(story.id)}
          >
            <div className="story-thumbnail">
              <img src={story.image} alt={story.title} className="w-full h-full object-cover rounded" />
            </div>
            <div className="story-info">
              <div className="story-title">{story.title}</div>
              <div className="story-meta">{story.date} • {Math.floor(story.duration / 60)} dakika</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}