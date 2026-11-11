import React from 'react';
import { Volume2, VolumeX, Plane, PlusCircle } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onQuickLog: () => void;
  overheadActive: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  isMuted,
  onToggleMute,
  onQuickLog,
  overheadActive,
}) => {
  const navItems = [
    { id: 'radar', label: 'Radar & Queue' },
    { id: 'map', label: 'Spotter Map' },
    { id: 'viewfinder', label: 'Viewfinder & Lens' },
    { id: 'runway', label: 'Runway & Sun' },
    { id: 'logbook', label: 'Logbook' },
    { id: 'atc', label: 'ATC Scanner' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onTabChange('radar');
          }}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-100 hover:text-amber-400 transition-colors whitespace-nowrap"
        >
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Plane className="w-5 h-5 rotate-45" />
          </span>
          <span>Myrtle Avenue Hub</span>
        </a>
        <span className="hidden sm:inline text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
          EGLL / 27L
        </span>
      </div>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action cluster */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap shrink-0 ${
            !isMuted
              ? 'bg-slate-800 border-slate-700 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
          <span className="hidden md:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
        </button>

        <button
          onClick={onQuickLog}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            overheadActive
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-slate-100 text-slate-950 hover:bg-white'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Log Sighting</span>
        </button>
      </div>
    </header>
  );
};
