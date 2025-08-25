import React, { useState, useEffect } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import type { InteractionPrompt } from '../types';

interface StoryScreenProps {
  storyText: string;
  storyImage: string;
  speechRate: number;
  onBack: () => void;
}

const interactionPrompts: InteractionPrompt[] = [
  {
    question: "🤔 Resimde en çok hangi renk var?",
    answers: ["Kırmızı", "Mavi"]
  },
  {
    question: "🎨 Çizdiğin resimde kaç şekil var?",
    answers: ["1-3", "4 ve üzeri"]
  },
  {
    question: "😊 Hikayeyi beğendin mi?",
    answers: ["Evet", "Çok!"]
  }
];

export function StoryScreen({ storyText, storyImage, speechRate, onBack }: StoryScreenProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<InteractionPrompt | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { isPlaying, speak, pause, resume, stop } = useSpeech();

  useEffect(() => {
    if (storyText) {
      setDisplayedText('');
      typewriterEffect(storyText);
    }
  }, [storyText]);

  const typewriterEffect = (text: string) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          speak(text, speechRate);
          setTimeout(() => {
            showInteractionPrompt();
          }, 2000);
        }, 500);
      }
    }, 30);
  };

  const showInteractionPrompt = () => {
    const randomPrompt = interactionPrompts[Math.floor(Math.random() * interactionPrompts.length)];
    setCurrentPrompt(randomPrompt);
    setShowPrompt(true);
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      if (window.speechSynthesis.paused) {
        resume();
      } else {
        speak(storyText, speechRate);
      }
    }
  };

  const handleReplay = () => {
    stop();
    setDisplayedText('');
    typewriterEffect(storyText);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAnswerQuestion = () => {
    setShowPrompt(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="story-screen">
      <div className="story-player">
        <div className="story-visual">
          {storyImage && (
            <img 
              src={storyImage} 
              alt="Çizim" 
              className="story-image"
            />
          )}
        </div>

        <div className="story-text">
          {displayedText || 'Hikayeniz hazırlanıyor...'}
        </div>

        <div className="story-controls">
          <button className="control-button" onClick={handleReplay}>
            🔄
          </button>
          <button className="control-button" onClick={handleTogglePlayPause}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button 
            className={`control-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            ❤️
          </button>
        </div>

        {showPrompt && currentPrompt && (
          <div className="interaction-prompt">
            <p>{currentPrompt.question}</p>
            <div className="prompt-buttons">
              {currentPrompt.answers.map((answer, index) => (
                <button
                  key={index}
                  className="btn prompt-answer-btn"
                  onClick={handleAnswerQuestion}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="story-back">
          <button className="btn btn-secondary btn-block" onClick={onBack}>
            Ana Sayfaya Dön
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="success-message">
          <div className="success-content">
            Harika! 🎉
          </div>
        </div>
      )}
    </div>
  );
}