'use client';

import { useState, useEffect } from 'react';
import { TypewriterProps } from '@/types';

export default function Typewriter({
  texts,
  delay = 100,
  deleteDelay = 50,
  loop = true,
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => {
          if (loop) {
            return (prevIndex + 1) % texts.length;
          } else {
            return prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex;
          }
        });
      }
    }, isDeleting ? deleteDelay : delay);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, delay, deleteDelay, loop, isClient]);

  return (
    <span suppressHydrationWarning>
      {isClient ? currentText : texts[0]}
      <span className="animate-pulse">|</span>
    </span>
  );
}