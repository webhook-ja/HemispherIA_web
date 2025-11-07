"use client";

import { useState, useEffect } from "react";

const useSound = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on client side only
    if (typeof window !== "undefined") {
      setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
    }

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const playHoverSound = () => {
    if (!audioContext) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.value = 440; // A4 note
      gainNode.gain.value = 0.1; // Low volume

      oscillator.start();
      
      // Quickly fade out to create a click-like sound
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
  };

  return { playHoverSound };
};

export default useSound;