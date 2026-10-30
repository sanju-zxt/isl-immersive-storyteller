import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type Theme = 'light' | 'dark' | 'high-contrast';
interface ThemeState { theme: Theme; setTheme: (t: Theme) => void; }
export const useThemeStore = create<ThemeState>()(persist((set) => ({ theme: 'light', setTheme: (theme) => set({ theme }) }), { name: 'theme' }));
