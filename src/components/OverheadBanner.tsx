import React from 'react';
import { Flight } from '../types/aviation';
import { Volume2, Camera, ShieldAlert } from 'lucide-react';
import { playJetFlyover } from '../utils/audio';

interface OverheadBannerProps {
  flight: Flight;
  onLogFlight: (flight: Flight) => void;
  onDismiss: () => void;
}

export const OverheadBanner: React.FC<OverheadBannerProps> = ({
  flight,
  onLogFlight,
  onDismiss,
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/80 via-slate-900/90 to-slate-900 p-4 shadow-xl shadow-amber-950/30 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Flight Info & Alert */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 animate-bounce" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
              <span>Overhead Myrtle Avenue Now</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-200">Altitude: {flight.altitudeFt} ft AGL</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">{flight.distanceNM} NM to 27L</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-0.5 flex items-center gap-2">
              <span>{flight.airline} {flight.flightNumber}</span>
              <span className="text-sm font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                {flight.registration}
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              <span className="font-semibold text-slate-100">{flight.aircraftType}</span> ({flight.wakeCategory} Wake) from{' '}
              <span className="text-slate-200">{flight.origin.city} ({flight.origin.code})</span>
              {flight.liveryNote && (
                <span className="text-amber-300/90 italic ml-1">· {flight.liveryNote}</span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Quick Spotter Actions */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={() => playJetFlyover(flight.wakeCategory)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Replay jet turbofan roar"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Play Jet Roar</span>
          </button>

          <button
            onClick={() => onLogFlight(flight)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Log Sighting</span>
          </button>

          <button
            onClick={onDismiss}
            className="px-2 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            title="Dismiss notification"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
