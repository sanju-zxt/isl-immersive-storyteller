import { useState, useCallback } from 'react';
import { SplitView } from '@/components/layout/SplitView';
import { CameraPanel } from '@/components/camera/CameraPanel';
import { CameraProvider } from '@/components/camera/CameraProvider';
import { AvatarPanel } from '@/components/avatar/AvatarPanel';
import { TranscriptPanel } from '@/components/transcript/TranscriptPanel';
import { HUDPanel } from '@/components/hud/HUDPanel';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { SkipLink } from '@/components/accessibility/SkipLink';
import { Announcer } from '@/components/accessibility/Announcer';
import { useThemeStore } from '@/store/themeStore';
import './i18n/i18n';

export function App() {
  const { theme } = useThemeStore();
  const [announcement, setAnnouncement] = useState('');

  const announce = useCallback((msg: string) => setAnnouncement(msg), []);

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      data-theme={theme}
      role="application"
      aria-label="Sign Language Translation Interface"
    >
      <SkipLink />
      <Announcer message={announcement} />

      {/* Skip target */}
      <a id="main-content" className="sr-only focus:not-sr-only" aria-hidden="true" />

      <header className="fixed top-0 left-0 right-0 h-14 bg-card/90 backdrop-blur-sm border-b border-border z-50 flex items-center justify-between px-4" aria-label="Application navigation">
        <h1 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">Sign Language Translation</h1>
        <nav aria-label="Theme settings">
          <ThemeSwitcher />
        </nav>
      </header>

      <main id="main-content" className="pt-14 h-screen flex flex-col overflow-hidden" role="main">
        <div className="flex-1 flex overflow-hidden">
          <SplitView
            panels={[
              { id: 'camera', minWidth: 300, maxWidth: 600, defaultWidth: 25 },
              { id: 'avatar', minWidth: 300, maxWidth: 800, defaultWidth: 50 },
              { id: 'transcript', minWidth: 300, maxWidth: 700, defaultWidth: 25 },
            ]}
            direction="horizontal"
            gap={4}
            className="w-full h-full"
          >
            <CameraProvider>
              <CameraPanel />
            </CameraProvider>
            <AvatarPanel />
            <TranscriptPanel />
          </SplitView>
        </div>

        <div className="h-16 border-t border-border bg-card shadow-md" role="region" aria-label="Status HUD">
          <HUDPanel />
        </div>
      </main>
    </div>
  );
}
