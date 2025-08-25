import React, { useState } from 'react';
import type { AppSettings } from '../types';

interface SettingsScreenProps {
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
}

export function SettingsScreen({ settings, onSaveSettings }: SettingsScreenProps) {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [notifications, setNotifications] = useState({
    newStory: true,
    weeklyReport: true
  });

  const handleSettingChange = (key: keyof AppSettings, value: string | number) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSaveSettings(localSettings);
    alert('Ayarlar kaydedildi!');
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="settings-screen">
      <h1 className="section-title">Ayarlar</h1>
      
      <div className="form-group">
        <label className="form-label">Çocuk Adı</label>
        <input
          type="text"
          className="form-input"
          value={localSettings.childName}
          onChange={(e) => handleSettingChange('childName', e.target.value)}
          placeholder="Adını girin"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Yaş</label>
        <select
          className="form-input"
          value={localSettings.childAge}
          onChange={(e) => handleSettingChange('childAge', e.target.value)}
        >
          <option value="4">4 yaş</option>
          <option value="5">5 yaş</option>
          <option value="6">6 yaş</option>
          <option value="7">7 yaş</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Dil</label>
        <select
          className="form-input"
          value={localSettings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
        >
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Ses Hızı</label>
        <input
          type="range"
          className="speech-rate-slider"
          min="0.5"
          max="1.5"
          step="0.1"
          value={localSettings.speechRate}
          onChange={(e) => handleSettingChange('speechRate', parseFloat(e.target.value))}
        />
        <div className="speech-rate-labels">
          <span>Yavaş</span>
          <span>{localSettings.speechRate}</span>
          <span>Hızlı</span>
        </div>
      </div>

      <div className="notification-settings">
        <h2 className="section-title">Bildirimler</h2>
        
        <div className="setting-row">
          <span>Yeni hikaye bildirimi</span>
          <div 
            className={`toggle-switch ${notifications.newStory ? 'active' : ''}`}
            onClick={() => toggleNotification('newStory')}
          />
        </div>
        
        <div className="setting-row">
          <span>Haftalık rapor</span>
          <div 
            className={`toggle-switch ${notifications.weeklyReport ? 'active' : ''}`}
            onClick={() => toggleNotification('weeklyReport')}
          />
        </div>
      </div>

      <div className="save-settings">
        <button className="btn btn-primary btn-block" onClick={handleSave}>
          Kaydet
        </button>
      </div>

      <div className="app-info">
        <p>Sürüm 1.0.0</p>
        <p>© 2025 Maciz</p>
      </div>
    </div>
  );
}