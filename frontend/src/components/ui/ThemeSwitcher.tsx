import React from 'react';
import { useThemeStore, type Theme } from '@/store/themeStore';

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  const themes: { value: Theme; label: string; desc: string }[] = [
    { value: 'light', label: 'Light', desc: 'Standard light mode' },
    { value: 'dark', label: 'Dark', desc: 'Low-light dark mode' },
    { value: 'high-contrast', label: 'High Contrast', desc: 'Maximum visibility' },
  ];

  return (
    <div role="group" aria-label="Theme settings">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`px-3 py-2 text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            theme === t.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-card text-foreground border-border hover:bg-neutral-50 dark:hover:bg-neutral-800'
          }`}
          aria-pressed={theme === t.value}
          aria-label={`${t.label}, ${t.desc}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
