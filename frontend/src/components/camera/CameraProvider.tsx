import React, { createContext, useContext, ReactNode, useState, useRef, useEffect } from 'react';
export interface CameraDevice { deviceId: string; label: string; kind: 'videoinput'; }
interface CameraContextType {
  devices: CameraDevice[]; selectedDevice: string | null; isStreaming: boolean;
  permissionState: 'prompt' | 'granted' | 'denied'; streamRef: React.RefObject<HTMLVideoElement> | null;
  setSelectedDevice: (id: string | null) => void; setIsStreaming: (v: boolean) => void; setPermissionState: (s: 'prompt'|'granted'|'denied') => void;
}
const C = createContext<CameraContextType | undefined>(undefined);
export function CameraProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [permissionState, setPermissionState] = useState<'prompt'|'granted'|'denied'>('prompt');
  const streamRef = useRef<HTMLVideoElement>(null);
  const streamObj = useRef<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices?.enumerateDevices().then(devs => {
      const cams = devs.filter(d => d.kind === 'videoinput').map(d => ({ deviceId: d.deviceId, label: d.label || `Camera ${d.deviceId.slice(0,4)}`, kind: 'videoinput' as const }));
      setDevices(cams);
      if (cams.length > 0 && !selectedDevice) setSelectedDevice(cams[0].deviceId);
    });
  }, []);

  useEffect(() => {
    if (isStreaming && streamRef.current) {
      navigator.mediaDevices.getUserMedia({ video: selectedDevice ? { deviceId: { exact: selectedDevice } } : true })
        .then(s => {
          streamObj.current = s;
          if (streamRef.current) streamRef.current.srcObject = s;
          setPermissionState('granted');
        })
        .catch(() => { setPermissionState('denied'); setIsStreaming(false); });
    } else {
      if (streamObj.current) { streamObj.current.getTracks().forEach(t => t.stop()); streamObj.current = null; }
      if (streamRef.current) streamRef.current.srcObject = null;
    }
  }, [isStreaming, selectedDevice]);

  return <C.Provider value={{ devices, selectedDevice, isStreaming, permissionState, streamRef, setSelectedDevice, setIsStreaming, setPermissionState }}>{children}</C.Provider>;
}
export function useCamera() { const c = useContext(C); if (!c) throw new Error('useCamera'); return c; }
