'use client';

import type { FontPreference } from '@/types';

import { ThemeProvider } from 'next-themes';
import { useState, useContext, createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------------

interface FontContextType {
  font: FontPreference;
  setFont: (font: FontPreference) => void;
}

// ----------------------------------------------------------------------

const FontContext = createContext<FontContextType | undefined>(undefined);

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}

export const Providers = ({
  children,
  defaultFont,
}: {
  children: React.ReactNode;
  defaultFont: FontPreference;
}) => {
  const [font, setFontState] = useState<FontPreference>(defaultFont);

  const setFont = (newFont: FontPreference) => {
    setFontState(newFont);
    document.cookie = `preferred-font=${newFont}; path=/; max-age=31536000`; // 1 year

    const htmlElement = document.documentElement;
    htmlElement.classList.remove('font-sans', 'font-serif', 'font-mono');
    htmlElement.classList.add(newFont);
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: Infinity, refetchOnWindowFocus: false } },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <FontContext.Provider value={{ font, setFont }}>{children}</FontContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
