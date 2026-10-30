import React from 'react';
import { useCamera } from './CameraProvider';
export function CameraPanel() {
  const { isStreaming, permissionState, streamRef, selectedDevice, setSelectedDevice, setIsStreaming, setPermissionState } = useCamera();
  return (
    <div className="h-full flex flex-col bg-card rounded-xl overflow-hidden" aria-label="Camera panel" role="region">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between"><h2 className="text-sm font-semibold">Camera Feed</h2></div>
      <div className="flex-1 bg-neutral-950 relative"><video ref={streamRef} className="w-full h-full object-contain" muted playsInline aria-label="Camera preview" /></div>
      <div className="p-3 border-t border-border space-y-3">
        <select value={selectedDevice || ''} onChange={e => setSelectedDevice(e.target.value || null)} className="w-full rounded-md border px-3 py-2 text-sm" aria-label="Select camera"><option>Default camera</option></select>
        <button onClick={() => isStreaming ? (setIsStreaming(false), setPermissionState('prompt')) : (setIsStreaming(true), setPermissionState('granted'))} className="w-full rounded-md bg-primary-600 text-white px-3 py-2 text-sm">{isStreaming ? 'Stop' : 'Start'}</button>
      </div>
    </div>
  );
}
