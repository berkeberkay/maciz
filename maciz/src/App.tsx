import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { DrawingScreen } from './components/DrawingScreen';
import { StoryScreen } from './components/StoryScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ParentScreen } from './components/ParentScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BottomNav } from './components/BottomNav';
import { ParentLockModal, PremiumModal, LoadingOverlay } from './components/Modals';
import { useLocalStorage } from './hooks/useLocalStorage';
import { analyzeDrawing } from './utils/drawingAnalyzer';
import { generateStory, generateStoryTitle } from './utils/storyGenerator';
import type { Screen, AgeGroup, Theme, Story, AppSettings } from './types';

const defaultSettings: AppSettings = {
  childName: '',
  childAge: '5',
  language: 'tr',
  speechRate: 0.9
};

export default function App() {
  // State
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme>('animals');
  const [storiesCreated, setStoriesCreated] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(1);
  const [currentStoryText, setCurrentStoryText] = useState('');
  const [currentStoryImage, setCurrentStoryImage] = useState('');
  const [showParentLock, setShowParentLock] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // Local Storage
  const [savedStories, setSavedStories] = useLocalStorage<Story[]>('maciz_stories', []);
  const [settings, setSettings] = useLocalStorage<AppSettings>('maciz_settings', defaultSettings);
  const [isPremium, setIsPremium] = useLocalStorage<boolean>('maciz_premium', false);

  // Effects
  useEffect(() => {
    if (isPremium) {
      setDailyLimit(999);
    }
  }, [isPremium]);

  // Navigation
  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  // Age Selection
  const handleAgeSelect = (age: AgeGroup) => {
    setSelectedAge(age);
  };

  const handleStartApp = () => {
    if (!selectedAge) return;

    if (selectedAge === 'parent') {
      setShowParentLock(true);
    } else if (selectedAge === 'other') {
      alert('Bu uygulama 4-7 yaş arası çocuklar için tasarlanmıştır.');
    } else {
      navigateTo('home');
    }
  };

  // Drawing
  const handleStartDrawing = (theme?: string) => {
    if (storiesCreated >= dailyLimit && !isPremium) {
      setShowPremium(true);
      return;
    }

    if (theme === 'animal') {
      setSelectedTheme('animals');
    }

    navigateTo('drawing');
  };

  const handleSaveDrawing = async (imageData: string) => {
    if (storiesCreated >= dailyLimit && !isPremium) {
      setShowPremium(true);
      return;
    }

    setShowLoading(true);

    // Simulate processing time
    setTimeout(() => {
      // Create temporary canvas to analyze the drawing
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const analysis = analyzeDrawing(canvas);
        const story = generateStory(analysis, selectedTheme);
        const title = generateStoryTitle(selectedTheme, analysis);

        // Create story object
        const newStory: Story = {
          id: Date.now(),
          title,
          story,
          image: imageData,
          theme: selectedTheme,
          date: new Date().toLocaleDateString('tr-TR'),
          duration: Math.floor(story.length / 50) * 60 // Approximate duration in seconds
        };

        // Save story
        setSavedStories(prev => [newStory, ...prev.slice(0, 19)]); // Keep only last 20

        // Update counters
        setStoriesCreated(prev => prev + 1);

        // Set current story
        setCurrentStoryText(story);
        setCurrentStoryImage(imageData);

        setShowLoading(false);
        navigateTo('story');
      };
      img.src = imageData;
    }, 2000);
  };

  // Story
  const handlePlayStory = (storyId: number) => {
    const story = savedStories.find(s => s.id === storyId);
    if (!story) return;

    setCurrentStoryText(story.story);
    setCurrentStoryImage(story.image);
    navigateTo('story');
  };

  // Parent Lock
  const handleParentLockSuccess = () => {
    setShowParentLock(false);
    navigateTo('parent');
  };

  // Premium
  const handleStartPremiumTrial = () => {
    setIsPremium(true);
    setDailyLimit(999);
    setShowPremium(false);
    alert('7 günlük ücretsiz deneme başladı! 🎉');
  };

  // Settings
  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  // Logout
  const handleLogout = () => {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      // Clear all data and reload
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="app-container">
      {/* Screens */}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen
          selectedAge={selectedAge}
          onAgeSelect={handleAgeSelect}
          onStart={handleStartApp}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          storiesCreated={storiesCreated}
          dailyLimit={dailyLimit}
          recentStories={savedStories.slice(0, 3)}
          isPremium={isPremium}
          onStartDrawing={handleStartDrawing}
          onShowPremium={() => setShowPremium(true)}
          onPlayStory={handlePlayStory}
        />
      )}

      {currentScreen === 'drawing' && (
        <DrawingScreen
          onBack={() => navigateTo('home')}
          onSave={handleSaveDrawing}
        />
      )}

      {currentScreen === 'story' && (
        <StoryScreen
          storyText={currentStoryText}
          storyImage={currentStoryImage}
          speechRate={settings.speechRate}
          onBack={() => navigateTo('home')}
        />
      )}

      {currentScreen === 'library' && (
        <LibraryScreen
          stories={savedStories}
          onPlayStory={handlePlayStory}
        />
      )}

      {currentScreen === 'parent' && (
        <ParentScreen
          selectedTheme={selectedTheme}
          onThemeSelect={setSelectedTheme}
          stories={savedStories}
          onShowPremium={() => setShowPremium(true)}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen
          settings={settings}
          onSaveSettings={handleSaveSettings}
        />
      )}

      {/* Bottom Navigation */}
      {currentScreen !== 'onboarding' && currentScreen !== 'drawing' && currentScreen !== 'story' && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          onStartDrawing={handleStartDrawing}
          onShowParentLock={() => setShowParentLock(true)}
        />
      )}

      {/* Modals */}
      <ParentLockModal
        isOpen={showParentLock}
        onClose={() => setShowParentLock(false)}
        onSuccess={handleParentLockSuccess}
      />

      <PremiumModal
        isOpen={showPremium}
        onClose={() => setShowPremium(false)}
        onStartTrial={handleStartPremiumTrial}
      />

      <LoadingOverlay isOpen={showLoading} />
    </div>
  );
}
