'use client';

import { useCountAnimation, useScrollReveal } from '@/lib/animations';
import { motion } from 'framer-motion';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export default function CounterAnimation({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0
}: CounterAnimationProps) {
  const { ref, isVisible } = useScrollReveal();
  const { count, setIsVisible } = useCountAnimation(end, duration);

  // Trigger animation when element becomes visible
  if (isVisible) {
    setIsVisible(true);
  }

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className={className}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.div>
  );
}