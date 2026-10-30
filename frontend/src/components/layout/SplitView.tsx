import { useCallback, useState, useRef, ReactNode } from 'react';

export interface PanelConfig {
  id: string;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
}

export interface SplitViewProps {
  panels: PanelConfig[];
  direction?: 'horizontal' | 'vertical';
  children: ReactNode[];
  className?: string;
  gap?: number;
}

export function SplitView({ panels, direction = 'horizontal', children, className = '', gap = 4 }: SplitViewProps) {
  const [sizes] = useState<Record<string, number>>(() => {
    const s: Record<string, number> = {};
    panels.forEach(p => { s[p.id] = p.defaultWidth ?? 33.3333; });
    return s;
  });
  return (
    <div className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-row'} ${className}`} style={{ gap: `${gap}px` }} role="region" aria-label="Split view">
      {children.map((child, i) => {
        const p = panels[i];
        const w = sizes[p.id] || p.defaultWidth || 33.3333;
        return (
          <div key={p.id} className="relative overflow-auto" style={{ [direction === 'horizontal' ? 'width' : 'height']: `${w}%`, minWidth: p.minWidth ?? 200, maxWidth: p.maxWidth ?? 800, flexShrink: 0 }} role="region" aria-label={`${p.id} panel`}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
