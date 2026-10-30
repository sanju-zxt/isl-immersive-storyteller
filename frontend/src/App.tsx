import { useState, useCallback } from 'react';
import { CameraPanel } from '@/components/camera/CameraPanel';
import { CameraProvider } from '@/components/camera/CameraProvider';
import { AvatarPanel } from '@/components/avatar/AvatarPanel';
import { TranscriptPanel } from '@/components/transcript/TranscriptPanel';
import { HUDPanel } from '@/components/hud/HUDPanel';
import { SkipLink } from '@/components/accessibility/SkipLink';
import { Announcer } from '@/components/accessibility/Announcer';
import './i18n/i18n';

export function App() {
  const [announcement] = useState('');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-teal-50/40 text-slate-900 antialiased font-sans" role="application" aria-label="SignBridge Vision Dashboard">
      <SkipLink />
      <Announcer message={announcement} />
      <a id="main-content" className="sr-only focus:not-sr-only" aria-hidden="true" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm h-16 flex items-center justify-between px-6" aria-label="SignBridge Navigation">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <span className="text-white font-extrabold text-lg">S</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800">SignBridge</h1>
          <span className="ml-2 text-[11px] bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 px-2.5 py-1 rounded-full font-semibold border border-teal-200/40 shadow-sm">Real-Time Multimodal AI</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" /> SYSTEM ONLINE
          </span>
          <span className="text-slate-400">Meeting ID: <b className="text-slate-700 font-mono text-xs">SDV-12045</b></span>
          <button className="bg-gradient-to-r from-slate-800 to-blue-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-blue-900/20 hover:shadow-xl hover:scale-[1.02] transition-all">Meeting View</button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-56 bg-gradient-to-b from-white/70 to-slate-50/80 border-r border-slate-200/50 backdrop-blur-md flex flex-col p-4 shadow-[4px_0_24px_rgba(0,0,0,0.02)]" aria-label="Sidebar navigation">
          <nav className="flex-1 space-y-1 mt-2" aria-label="Dashboard menu">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 font-bold text-sm shadow-sm border border-teal-100/60 hover:shadow-md transition-all" aria-label="Dashboard"><span aria-hidden="true">🏠</span> Dashboard</a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100/60 text-slate-600 font-medium text-sm transition-colors" aria-label="Meeting"><span aria-hidden="true">📹</span> Meeting</a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100/60 text-slate-600 font-medium text-sm transition-colors" aria-label="History"><span aria-hidden="true">🕒</span> History</a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100/60 text-slate-600 font-medium text-sm transition-colors" aria-label="Settings"><span aria-hidden="true">⚙️</span> Settings</a>
          </nav>
        </aside>

        {/* Main content */}
        <main id="main-content" className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-slate-50/50 to-white/60" aria-label="Main dashboard">
          <div className="grid grid-cols-3 gap-5 h-full">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-5">
              {/* LIVE CAMERA */}
              <CameraProvider>
                <section className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200/40 overflow-hidden ring-1 ring-slate-100/50" aria-label="Live Camera">
                  <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-teal-50/60 to-blue-50/40 border-b border-slate-100/60">
                    <h3 className="text-sm font-extrabold text-slate-800 tracking-wide uppercase">Live Camera</h3>
                    <label className="inline-flex items-center gap-2 bg-white/80 border border-teal-200 rounded-full px-3 py-1 text-[10px] font-bold text-teal-700 shadow-sm cursor-pointer hover:border-teal-300 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)] animate-pulse" /> Active
                      <input type="checkbox" className="hidden" onChange={() => {}} />
                    </label>
                  </div>
                  <CameraPanel />
                </section>
              </CameraProvider>

              {/* GESTURE RECOGNITION */}
              <section className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200/40 p-5 ring-1 ring-slate-100/50" aria-label="Gesture Recognition">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Gesture Recognition</h3>
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-black text-slate-800 tracking-tighter">HELLO</div>
                  <div className="flex-1">
                    <div className="h-3.5 bg-gradient-to-r from-teal-400 via-blue-500 to-cyan-400 rounded-full shadow-lg shadow-blue-400/20 overflow-hidden">
                      <div className="h-full w-[80%] bg-gradient-to-r from-teal-300/60 to-blue-300/60 rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
                    </div>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Ready for next sign.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* MIDDLE COLUMN */}
            <div className="flex flex-col gap-5">
              {/* 3D SIGN AVATAR */}
              <section className="bg-gradient-to-b from-slate-900 via-blue-950/90 to-teal-950/80 rounded-2xl shadow-2xl shadow-blue-900/20 border border-white/5 overflow-hidden ring-1 ring-white/10 relative" aria-label="3D Sign Avatar">
                <div className="absolute top-4 left-4 z-10 bg-black/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-white/90 border border-white/10">Passed</div>
                <AvatarPanel />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 px-2">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg shadow-black/20" aria-label="Play avatar animation">▶</button>
                    <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg shadow-black/20" aria-label="Loop animation">↻</button>
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 shadow-lg shadow-black/20">
                    <span className="text-[10px] font-bold text-white/80">Speed</span>
                    <select className="bg-transparent text-[10px] font-bold text-white border-none outline-none cursor-pointer" aria-label="Animation speed">
                      <option>1x</option><option>1.5x</option><option>2x</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-5">
              {/* LIVE TRANSCRIPTION */}
              <section className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200/40 overflow-hidden ring-1 ring-slate-100/50 flex-1" aria-label="Live Transcription">
                <div className="px-5 py-3.5 bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-100/60 flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">LIVE TRANSCRIPTION</h3>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">LIVE</span>
                </div>
                <div className="p-4 h-full overflow-y-auto">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 shadow-sm mb-2">
                    <p className="text-base font-bold text-slate-800">Hello! How can I help you?</p>
                    <p className="text-[10px] text-slate-400 font-medium">10:20:45 AM</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['Hello', 'Thank you', 'Sorry', 'Please', 'Help', 'Water'].map(w => (
                      <span key={w} className="text-xs bg-slate-100 hover:bg-teal-50 border border-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium transition-colors cursor-default shadow-sm">{w}</span>
                    ))}
                  </div>
                </div>
              </section>

              {/* VOICE ACCESSIBILITY */}
              <section className="bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200/40 overflow-hidden ring-1 ring-slate-100/50" aria-label="Voice Accessibility">
                <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-blue-50 to-teal-50/40 border-b border-slate-200/30">
                  <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">VOICE ACCESSIBILITY</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                    <span className="text-[10px] font-bold text-emerald-600">Mic On</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" aria-hidden="true">🎤</span>
                      <input type="text" placeholder="Type a message to translate..." className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-transparent shadow-inner transition-all font-medium placeholder:text-slate-400" aria-label="Speech input" />
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2.5 rounded-xl text-sm font-extrabold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-[1.02] transition-all" aria-label="Send message">Send</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200/40 text-teal-700 text-xs font-bold hover:shadow-md transition-all" aria-label="Toggle voice output">🔊 Voice output <span className="bg-teal-500 text-white text-[9px] px-1 rounded-full font-extrabold">On</span></button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/40 text-blue-700 text-xs font-bold hover:shadow-md transition-all" aria-label="Toggle subtitles">CC Subtitles <span className="bg-blue-500 text-white text-[9px] px-1 rounded-full font-extrabold">On</span></button>
                    <select className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400/30 shadow-sm" aria-label="Select language">
                      <option>ISL → English</option>
                      <option>English → ISL</option>
                      <option>English → ASL</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-slate-900/90 to-blue-950/80 border-t border-white/10 py-2 flex items-center justify-between px-6 text-[10px] font-medium text-slate-300/80 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.05)]" aria-label="Footer">
          <span>Privacy-first processing</span>
          <span>Accessibility mode</span>
        </footer>
      </div>
    </div>
  );
}
