'use client';

import { useEffect, useRef, useCallback } from 'react';

export function ScrollSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const canPlaySoundRef = useRef(true);

  const playSound = useCallback(() => {
    if (!audioContextRef.current) {
        // AudioContext is not supported or not yet initialized
        return;
    }
    // Create an oscillator
    const oscillator = audioContextRef.current.createOscillator();
    oscillator.type = 'sine'; // 'sine', 'square', 'sawtooth', 'triangle'
    oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime); // A4 pitch

    // Create a gain node to control the volume
    const gainNode = audioContextRef.current.createGain();
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime); // Start with low volume
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.5); // Fade out

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // Start and stop the oscillator
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  }, []);

  const handleScroll = useCallback(() => {
    if (canPlaySoundRef.current) {
        // Resume AudioContext if it's suspended (e.g., due to browser policy)
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        playSound();
        canPlaySoundRef.current = false;
        setTimeout(() => {
            canPlaySoundRef.current = true;
        }, 500); // Throttle sound to play at most every 500ms
    }
  }, [playSound]);

  useEffect(() => {
    // Initialize AudioContext on the client-side after user interaction might have occurred
    if (!audioContextRef.current) {
        try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.", e);
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return null; // This component doesn't render anything
}
