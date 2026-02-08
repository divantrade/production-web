'use client';

import { useThemeState, ThemeProvider as BaseThemeProvider } from '@/lib/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeState = useThemeState();

  return (
    <BaseThemeProvider value={themeState}>
      {children}
    </BaseThemeProvider>
  );
}