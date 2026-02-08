'use client';

import { motion } from 'framer-motion';
import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi';
import { useTheme, applyThemeTransition, type Theme } from '@/lib/theme';
import { useState } from 'react';

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown' | 'switch';
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ 
  variant = 'icon', 
  className = '',
  showLabel = false 
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleThemeChange = (newTheme: Theme) => {
    applyThemeTransition();
    setTheme(newTheme);
    setIsDropdownOpen(false);
  };

  const getThemeIcon = (themeType: Theme | 'resolved') => {
    if (themeType === 'resolved') {
      return resolvedTheme === 'dark' ? (
        <HiMoon className="w-5 h-5" />
      ) : (
        <HiSun className="w-5 h-5" />
      );
    }

    switch (themeType) {
      case 'light':
        return <HiSun className="w-5 h-5" />;
      case 'dark':
        return <HiMoon className="w-5 h-5" />;
      case 'system':
        return <HiDesktopComputer className="w-5 h-5" />;
    }
  };

  const getThemeLabel = (themeType: Theme) => {
    switch (themeType) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
    }
  };

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {resolvedTheme === 'dark' ? 'Dark' : 'Light'} Mode
          </span>
        )}
        <button
          onClick={() => {
            applyThemeTransition();
            toggleTheme();
          }}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <motion.div
            animate={{
              x: resolvedTheme === 'dark' ? 20 : 2
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-between px-1">
            <HiSun className="w-3 h-3 text-yellow-500" />
            <HiMoon className="w-3 h-3 text-gray-400" />
          </div>
        </button>
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {getThemeIcon(theme)}
          {showLabel && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {getThemeLabel(theme)}
            </span>
          )}
        </button>

        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
          >
            {(['light', 'dark', 'system'] as Theme[]).map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => handleThemeChange(themeOption)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  theme === themeOption ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {getThemeIcon(themeOption)}
                <span className="text-sm">{getThemeLabel(themeOption)}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Backdrop */}
        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    );
  }

  // Default icon variant
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        applyThemeTransition();
        toggleTheme();
      }}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === 'dark' ? 180 : 0,
          scale: resolvedTheme === 'dark' ? 0.8 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {getThemeIcon('resolved')}
      </motion.div>
    </motion.button>
  );
}

// Floating theme toggle with position options
export function FloatingThemeToggle({
  position = 'bottom-left',
  className = ''
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 ${className}`}>
      <ThemeToggle variant="icon" />
    </div>
  );
}

// Compact theme selector for mobile
export function CompactThemeSelector({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 ${className}`}>
      {(['light', 'dark', 'system'] as Theme[]).map((themeOption) => (
        <button
          key={themeOption}
          onClick={() => {
            applyThemeTransition();
            setTheme(themeOption);
          }}
          className={`p-2 rounded-md transition-colors ${
            theme === themeOption
              ? 'bg-white dark:bg-gray-700 shadow-sm text-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          title={getThemeLabel(themeOption)}
        >
          {getThemeIcon(themeOption)}
        </button>
      ))}
    </div>
  );
}