import { useCallback } from 'react';

export const useTTS = () => {
  const speak = useCallback((text: string, lang: string = 'zh-CN') => {
    // Check if the browser supports Speech Synthesis API
    if (!('speechSynthesis' in window)) {
      console.error('Speech Synthesis API not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8; // Slower speech for better learning
    utterance.pitch = 1;
    utterance.volume = 1;

    // Speak the text
    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
};
