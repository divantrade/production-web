// Theme management utilities
import { useState, useEffect, useContext, createContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ThemeContext.Provider;

// Custom hook for theme management
export const useThemeState = (): ThemeContextType => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Detect system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Update resolved theme based on current theme setting
  const updateResolvedTheme = (currentTheme: Theme) => {
    const resolved = currentTheme === 'system' ? getSystemTheme() : currentTheme;
    setResolvedTheme(resolved);
    
    // Update document class and localStorage
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
      
      // Update data attribute for CSS
      root.setAttribute('data-theme', resolved);
      
      // Save preference (but not system)
      if (currentTheme !== 'system') {
        localStorage.setItem('theme', currentTheme);
      } else {
        localStorage.removeItem('theme');
      }
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const initialTheme = savedTheme || 'system';
    
    setThemeState(initialTheme);
    updateResolvedTheme(initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        updateResolvedTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Update resolved theme when theme changes
  useEffect(() => {
    updateResolvedTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
};

// Theme-aware color utilities
export const getThemeColors = (theme: 'light' | 'dark') => {
  if (theme === 'dark') {
    return {
      background: 'bg-gray-900',
      surface: 'bg-gray-800',
      surfaceHover: 'hover:bg-gray-700',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      border: 'border-gray-700',
      primary: 'text-primary-400',
      accent: 'text-accent-400',
    };
  }
  
  return {
    background: 'bg-white',
    surface: 'bg-gray-50',
    surfaceHover: 'hover:bg-gray-100',
    text: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    border: 'border-gray-200',
    primary: 'text-primary',
    accent: 'text-accent',
  };
};

// Theme transition utility
export const applyThemeTransition = () => {
  if (typeof document === 'undefined') return;
  
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `* {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
      }`
    )
  );
  document.head.appendChild(css);

  // Remove transition styles after animation
  setTimeout(() => {
    document.head.removeChild(css);
  }, 300);
};

// Utility to check if dark mode is preferred by system
export const prefersDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};