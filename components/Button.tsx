'use client';

import { motion } from 'framer-motion';
import { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className,
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-none border-2 uppercase tracking-wider';
  
  const variants = {
    primary: 'bg-accent text-black border-accent hover:bg-transparent hover:text-accent',
    secondary: 'bg-transparent text-white border-white hover:bg-white hover:text-black',
    outline: 'bg-transparent text-accent border-accent hover:bg-accent hover:text-black',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-12 py-4 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  );
}