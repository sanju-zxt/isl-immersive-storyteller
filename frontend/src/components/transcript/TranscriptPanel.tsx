import React, { useState, useEffect, useRef } from 'react';

export function TranscriptPanel() {
  const [words, setWords] = useState([{ signId: 's1', word: 'Hello', startTime: 0, endTime: 1200, confidence: 0.98 }]);
  const [listening, setListening] = useState(false);
  const [caption, setCaption] = useState('Say something...');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = (e: any) => {
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        final += e.results[i][0].transcript;
      }
      setCaption(final || 'Listening...');
      if (final.trim()) {
        setWords([{ signId: Date.now().toString(), word: final.trim(), startTime: Date.now(), endTime: Date.now() + 1000, confidence: 0.92 }]);
      }
    };
    recognitionRef.current.onerror = () => setListening(false);
    return () => recognitionRef.current?.abort();
  }, []);

  const toggleListen = () => {
    if (listening) recognitionRef.current?.stop();
    else recognitionRef.current?.start();
    setListening(!listening);
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-xl overflow-hidden" aria-label="Transcript panel" role="region">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold">Transcript</h2>
        <button onClick={toggleListen} className={`text-xs px-3 py-1 rounded-full ${listening ? 'bg-red-500 text-white' : 'bg-primary-600 text-white'}`} aria-label={listening ? 'Stop listening' : 'Start speech recognition'}>{listening ? 'Stop' : 'Listen'}</button>
      </div>
      <div className="p-3 bg-neutral-50 border-b border-border">
        <p className="text-sm text-neutral-700 font-medium" aria-live="polite">{caption}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {words.map(w => (
          <div key={w.signId} className="p-2 rounded-lg bg-neutral-50 border border-neutral-200 mb-2">
            <div className="flex justify-between">
              <span className="font-medium">{w.word}</span>
              <span className="text-xs text-success-600">{Math.round(w.confidence * 100)}%</span>
            </div>
            <div className="text-[10px] text-neutral-400">{new Date(w.startTime).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
