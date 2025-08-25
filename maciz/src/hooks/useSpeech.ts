import { useState, useCallback, useRef } from 'react';

export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, rate: number = 0.9) => {
    if (!'speechSynthesis' in window) {
      console.log('Tarayıcınız sesli okumayı desteklemiyor');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set properties
    utterance.lang = 'tr-TR';
    utterance.rate = rate;
    utterance.pitch = 1.1;
    utterance.volume = 0.9;

    // Try to find Turkish voice
    const voices = window.speechSynthesis.getVoices();
    const turkishVoice = voices.find(voice => 
      voice.lang.includes('tr') || voice.lang.includes('TR')
    );

    if (turkishVoice) {
      utterance.voice = turkishVoice;
    }

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      console.error('TTS Error:', event);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    speak,
    pause,
    resume,
    stop
  };
}