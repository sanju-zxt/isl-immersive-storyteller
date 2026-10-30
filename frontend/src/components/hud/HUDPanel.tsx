import React, { useState, useEffect } from 'react';
export function HUDPanel() {
  const [fps] = useState(60); const [confidence] = useState(0.92); const [latency] = useState(120);
  return (
    <div className="flex items-center gap-6 px-4 h-full" role="status" aria-live="polite">
      <div><div className="text-xs text-neutral-500">FPS</div><div className="text-sm font-mono">{fps}</div></div>
      <div><div className="text-xs text-neutral-500">Latency</div><div className="text-sm font-mono">{latency}ms</div></div>
      <div><div className="text-xs text-neutral-500">Confidence</div><div className="text-sm font-mono text-success-600">{Math.round(confidence*100)}%</div></div>
    </div>
  );
}
