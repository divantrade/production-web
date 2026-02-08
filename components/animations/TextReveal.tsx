'use client';

import { motion } from 'framer-motion';
import { useScrollReveal, textStagger, charVariants } from '@/lib/animations';

interface TextRevealProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export default function TextReveal({
  text,
  tag = 'p',
  className = '',
  delay = 0,
  stagger = false
}: TextRevealProps) {
  const { ref, isVisible } = useScrollReveal();
  const MotionTag = motion[tag] as any;

  if (stagger) {
    return (
      <MotionTag
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={textStagger}
        className={className}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {text}
    </MotionTag>
  );
}