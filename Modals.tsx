import React, { useState } from 'react';

interface ParentLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ParentLockModal({ isOpen, onClose, onSuccess }: ParentLockModalProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer === '15') {
      onSuccess();
      setAnswer('');
    } else {
      alert('Yanlış cevap. Tekrar deneyin.');
      setAnswer('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">Ebeveyn Girişi</div>
        <div className="modal-body">
          <p>Ebeveyn paneline girmek için soruyu cevaplayın:</p>
          <p className="math-question">7 + 8 = ?</p>
          <div className="form-group">
            <input
              type="number"
              className="form-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Cevabınız"
              autoFocus
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            İptal
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Giriş
          </button>
        </div>
      </div>
    </div>
  );
}

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
}

export function PremiumModal({ isOpen, onClose, onStartTrial }: PremiumModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">Premium'a Geçin 🌟</div>
        <div className="modal-body">
          <p>Günlük hikaye hakkınız doldu!</p>
          <ul className="premium-features">
            <li>Sınırsız hikaye oluşturma</li>
            <li>Özel temalar ve karakterler</li>
            <li>Gelişmiş ses seçenekleri</li>
            <li>Reklamsız deneyim</li>
          </ul>
          <p className="trial-offer">7 gün ücretsiz deneyin!</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Sonra
          </button>
          <button className="btn btn-primary" onClick={onStartTrial}>
            Ücretsiz Dene
          </button>
        </div>
      </div>
    </div>
  );
}

interface LoadingOverlayProps {
  isOpen: boolean;
}

export function LoadingOverlay({ isOpen }: LoadingOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="loading-overlay active">
      <div className="loading-content">
        <div className="loading-spinner" />
        <p className="loading-title">Hikaye hazırlanıyor...</p>
        <p className="loading-subtitle">Çizimin analiz ediliyor...</p>
      </div>
    </div>
  );
}