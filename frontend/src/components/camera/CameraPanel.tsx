import React from 'react';
import { useCamera } from './CameraProvider';
export function CameraPanel() {
  const { isStreaming, permissionState, streamRef, selectedDevice, setSelectedDevice, setIsStreaming, setPermissionState } = useCamera();
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-800/80 to-blue-950/60 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 backdrop-blur-sm" aria-label="Live Camera panel" role="region">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-teal-600/20 to-blue-700/10">
        <h2 className="text-sm font-extrabold text-white tracking-wide">LIVE CAMERA</h2>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full shadow-md ${isStreaming ? 'bg-emerald-400 shadow-emerald-400/50 animate-pulse' : 'bg-red-400 shadow-red-400/50'}`} aria-label={isStreaming ? 'Streaming' : 'Stopped'} />
          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Active</span>
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-b from-neutral-950 to-slate-900 relative">
        <video ref={streamRef} className="w-full h-full object-cover rounded-b-xl" muted playsInline aria-label="Live camera preview" />
      </div>
      <div className="p-3 bg-gradient-to-b from-slate-800/90 to-blue-950/80 border-t border-white/10 space-y-3">
        <select value={selectedDevice || ''} onChange={e => setSelectedDevice(e.target.value || null)} className="w-full rounded-lg bg-slate-700/60 text-white px-3 py-2 text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400/40" aria-label="Select camera device">
          <option>Default camera</option>
        </select>
        <button onClick={() => isStreaming ? (setIsStreaming(false), setPermissionState('prompt')) : (setIsStreaming(true), setPermissionState('granted'))} className={`w-full rounded-lg font-bold px-4 py-2.5 text-sm transition shadow-lg ${isStreaming ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-red-500/30' : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-teal-500/30'}`} aria-label={isStreaming ? 'Stop camera' : 'Start camera'}>{isStreaming ? 'Stop Streaming' : 'Start Streaming'}</button>
      </div>
    </div>
  );
}
