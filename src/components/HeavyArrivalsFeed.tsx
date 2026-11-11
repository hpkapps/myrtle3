import React, { useState } from 'react';
import { Flight } from '../types/aviation';
import { Plane, Sparkles, Filter, Clock, MapPin, Eye, Camera } from 'lucide-react';
import { NativeSponsorCard } from './NativeSponsorCard';
import { MONETIZATION_CONFIG } from '../config/monetization';

interface HeavyArrivalsFeedProps {
  flights: Flight[];
  onTriggerA380: () => void;
  onRecordSighting?: (flight: Flight) => void;
}

export const HeavyArrivalsFeed: React.FC<HeavyArrivalsFeedProps> = ({
  flights,
  onTriggerA380,
  onRecordSighting,
}) => {
  const [filter, setFilter] = useState<'all' | 'a380' | 'ba'>('all');

  // Filter flights
  const filtered = flights.filter((flight) => {
    if (filter === 'a380') return flight.aircraftType.includes('A380') || flight.icaoType === 'A388';
    if (filter === 'ba') return flight.airlineIcao === 'BAW';
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 bg-slate-950/70 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
              Live Approach Countdown
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {filtered.length} Inbound Heavies
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 mt-0.5">
            Next Giant Planes Coming Overhead
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Get your phone camera ready before they emerge from the cloud base!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-slate-800 text-slate-100 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Heavies
            </button>
            <button
              onClick={() => setFilter('a380')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filter === 'a380'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              A380 Supers Only
            </button>
            <button
              onClick={() => setFilter('ba')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filter === 'ba'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              British Airways
            </button>
          </div>

          {/* Test Flyover Button */}
          <button
            onClick={onTriggerA380}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs"
            title="Spawns an Emirates A380 superjumbo 20 seconds from the field"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spool A380 Now</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.slice(0, 5).map((flight, idx) => {
          const isA380 = flight.aircraftType.includes('A380') || flight.icaoType === 'A388';
          const isOverhead = flight.status === 'Overhead Myrtle Ave';

          return (
            <React.Fragment key={flight.id}>
              <div
                className={`p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isOverhead
                    ? 'bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 border-amber-500 shadow-lg shadow-amber-950/30'
                    : isA380
                    ? 'bg-slate-950/90 border-sky-500/30 hover:border-sky-500/60'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Badge: Airplane Type & Category */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        isA380
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Plane className="w-3 h-3 rotate-45" />
                      <span>{isA380 ? 'Double-Decker Superjumbo' : flight.aircraftType}</span>
                    </span>

                    <span className="text-xs font-mono font-bold text-amber-400">
                      {flight.flightNumber}
                    </span>
                  </div>

                  {/* Airline & Origin */}
                  <h3 className="text-base font-bold text-slate-100 flex items-center justify-between">
                    <span>{flight.airline}</span>
                    <span className="text-xs font-mono font-normal text-slate-400">
                      {flight.registration}
                    </span>
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      Flying in from <strong>{flight.origin.city}</strong> ({flight.origin.code})
                    </span>
                  </div>

                  {flight.liveryNote && (
                    <p className="text-[11px] text-amber-300/90 italic mt-1 line-clamp-1">
                      Special: {flight.liveryNote}
                    </p>
                  )}
                </div>

                {/* Bottom Strip: Countdown & Altitude */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Overhead Time
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      {flight.etaSeconds <= 8 ? (
                        <span className="text-lg font-bold font-mono text-amber-400 animate-pulse">
                          OVERHEAD NOW!
                        </span>
                      ) : (
                        <>
                          <span className="text-xl font-bold font-mono text-slate-100 tabular-nums">
                            {Math.floor(flight.etaSeconds / 60)}m {flight.etaSeconds % 60}s
                          </span>
                          <span className="text-[10px] text-slate-400">left</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <span className="text-[10px] text-slate-400 block uppercase">Altitude</span>
                    <span className="font-bold text-slate-200 tabular-nums">
                      {flight.altitudeFt} ft
                    </span>
                  </div>
                </div>
              </div>

              {/* In-Feed Native Sponsor Card right after the 2nd flight */}
              {idx === 1 && (
                <NativeSponsorCard product={MONETIZATION_CONFIG.affiliates[0]} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
