import React from 'react';
import type { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onStartDrawing: () => void;
  onShowParentLock: () => void;
}

const navItems = [
  { id: 'home' as Screen, emoji: '🏠', label: 'Ana Sayfa' },
  { id: 'library' as Screen, emoji: '📚', label: 'Kitaplık' },
  { id: 'parent' as Screen, emoji: '👨‍👩‍👧', label: 'Ebeveyn' },
  { id: 'settings' as Screen, emoji: '⚙️', label: 'Ayarlar' }
];

export function BottomNav({ currentScreen, onNavigate, onStartDrawing, onShowParentLock }: BottomNavProps) {
  const handleNavClick = (screenId: Screen) => {
    if (screenId === 'parent') {
      onShowParentLock();
    } else {
      onNavigate(screenId);
    }
  };

  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <React.Fragment key={item.id}>
          <button
            className={`nav-item ${currentScreen === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span className="nav-icon">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
          
          {index === 1 && (
            <button className="fab" onClick={onStartDrawing}>
              +
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}