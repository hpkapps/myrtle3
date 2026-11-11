import React from 'react';
import { Plane, Compass, Camera, Sun, Train, CheckSquare } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLandingHere: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  isLandingHere,
}) => {
  const navItems = [
    { id: 'status', label: 'Live Status' },
    { id: 'calendar', label: '2026 Schedule' },
    { id: 'spots', label: '3 PM Switch & Spots' },
    { id: 'creator', label: 'Creator Camera Guide' },
    { id: 'golden', label: 'Golden Hour' },
    { id: 'transit', label: 'Getting Here' },
    { id: 'checklist', label: 'Checklist' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-5 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onTabChange('status');
          }}
          className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-slate-100 hover:text-amber-400 transition-colors whitespace-nowrap"
        >
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Plane className="w-4 h-4 rotate-45" />
          </span>
          <span>Myrtle Avenue Guide</span>
        </a>

        {/* Live Status Pill in Header */}
        <span
          className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
            isLandingHere
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isLandingHere ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
            }`}
          />
          <span>{isLandingHere ? '27L Landing Active' : 'Switched to North (27R)'}</span>
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
                  ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 Primary CTA button */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onTabChange('spots')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs whitespace-nowrap"
        >
          <span>3 PM Switch Advice</span>
        </button>
      </div>
    </header>
  );
};
