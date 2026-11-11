import React, { useState } from 'react';
import { Flight } from '../types/aviation';
import { Play, Pause, FastForward, Sparkles, Volume2, Camera, Search } from 'lucide-react';
import { playJetFlyover } from '../utils/audio';

interface ApproachQueueProps {
  flights: Flight[];
  isSimulating: boolean;
  onToggleSim: () => void;
  simSpeed: number;
  onSetSimSpeed: (speed: number) => void;
  onTriggerHeavyArrival: () => void;
  onSelectFlight: (flightId: string) => void;
  selectedFlightId: string | null;
  onLogFlight: (flight: Flight) => void;
}

export const ApproachQueue: React.FC<ApproachQueueProps> = ({
  flights,
  isSimulating,
  onToggleSim,
  simSpeed,
  onSetSimSpeed,
  onTriggerHeavyArrival,
  onSelectFlight,
  selectedFlightId,
  onLogFlight,
}) => {
  const [filter, setFilter] = useState<'all' | 'heavies' | 'specials' | 'ba' | 'super'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering
  const filteredFlights = flights.filter((flight) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        flight.flightNumber.toLowerCase().includes(q) ||
        flight.callsign.toLowerCase().includes(q) ||
        flight.airline.toLowerCase().includes(q) ||
        flight.registration.toLowerCase().includes(q) ||
        flight.aircraftType.toLowerCase().includes(q) ||
        flight.origin.city.toLowerCase().includes(q) ||
        flight.origin.code.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filter === 'super') return flight.wakeCategory === 'Super';
    if (filter === 'heavies') return flight.wakeCategory === 'Super' || flight.wakeCategory === 'Heavy';
    if (filter === 'specials') return Boolean(flight.liveryNote);
    if (filter === 'ba') return flight.airlineIcao === 'BAW';
    return true;
  });

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      {/* Top Header & Simulation Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 bg-slate-950/70 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
              Live Runway 27L Approach Queue
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {flights.length} Tracking
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Active ADS-B telemetry sequenced on the ILS 27L glide slope toward Myrtle Avenue
          </p>
        </div>

        {/* Sim Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Play/Pause */}
          <button
            onClick={onToggleSim}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isSimulating
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 border-amber-400'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Stream' : 'Resume'}</span>
          </button>

          {/* Speed Multiplier */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700">
            <span className="px-2 text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <FastForward className="w-3 h-3" />
            </span>
            {[1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => onSetSimSpeed(speed)}
                className={`px-2 py-1 text-xs font-mono font-medium rounded transition-colors ${
                  simSpeed === speed ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Trigger Super Heavy Arrival */}
          <button
            onClick={onTriggerHeavyArrival}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
            title="Spawns an Airbus A380 Superjumbo on short final to Myrtle Avenue"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spool A380 Heavy</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        {/* Interactive Filter Tabs (functional segmented control) */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-slate-800 text-slate-100 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Flights
          </button>
          <button
            onClick={() => setFilter('super')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'super'
                ? 'bg-slate-800 text-sky-400 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            A380 Super
          </button>
          <button
            onClick={() => setFilter('heavies')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'heavies'
                ? 'bg-slate-800 text-emerald-400 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Heavies
          </button>
          <button
            onClick={() => setFilter('specials')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'specials'
                ? 'bg-slate-800 text-amber-400 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Special Liveries
          </button>
          <button
            onClick={() => setFilter('ba')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'ba'
                ? 'bg-slate-800 text-blue-400 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Speedbird (BA)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reg, airline, origin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Table of Inbound Flights */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-4 font-semibold">Flight / Callsign</th>
              <th className="py-2.5 px-3 font-semibold">Aircraft / Wake</th>
              <th className="py-2.5 px-3 font-semibold">Registration</th>
              <th className="py-2.5 px-3 font-semibold">Origin</th>
              <th className="py-2.5 px-3 font-semibold text-right">Dist (NM)</th>
              <th className="py-2.5 px-3 font-semibold text-right">Altitude</th>
              <th className="py-2.5 px-3 font-semibold text-right">ETA Myrtle</th>
              <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredFlights.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 font-sans">
                  No arriving flights match the current filter criteria.
                </td>
              </tr>
            ) : (
              filteredFlights.map((flight) => {
                const isSelected = flight.id === selectedFlightId;
                const isOverhead = flight.status === 'Overhead Myrtle Ave';
                const isSuper = flight.wakeCategory === 'Super';

                return (
                  <tr
                    key={flight.id}
                    onClick={() => onSelectFlight(flight.id)}
                    className={`cursor-pointer transition-colors ${
                      isOverhead
                        ? 'bg-amber-500/15 hover:bg-amber-500/20'
                        : isSelected
                        ? 'bg-slate-800/90'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Flight & Airline */}
                    <td className="py-3 px-4 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 font-mono text-xs">
                          {flight.flightNumber}
                        </span>
                        {isOverhead && (
                          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 animate-pulse">
                            OVERHEAD
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        {flight.callsign} · {flight.airline}
                      </div>
                    </td>

                    {/* Aircraft & Wake Category */}
                    <td className="py-3 px-3 font-sans">
                      <div className="text-slate-200 font-medium font-sans">
                        {flight.aircraftType}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span className="font-mono text-slate-300 font-semibold">{flight.icaoType}</span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={`font-semibold ${
                            isSuper
                              ? 'text-sky-400'
                              : flight.wakeCategory === 'Heavy'
                              ? 'text-emerald-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {flight.wakeCategory}
                        </span>
                      </div>
                    </td>

                    {/* Registration & Livery Note */}
                    <td className="py-3 px-3">
                      <div className="text-slate-200 font-semibold">
                        {flight.registration}
                      </div>
                      {flight.liveryNote ? (
                        <div className="text-[11px] text-amber-300/90 italic font-sans truncate max-w-[140px]">
                          {flight.liveryNote}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 font-sans">Standard Livery</div>
                      )}
                    </td>

                    {/* Origin */}
                    <td className="py-3 px-3 font-sans">
                      <div className="text-slate-200 font-medium">
                        {flight.origin.city}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {flight.origin.code} · {flight.origin.country}
                      </div>
                    </td>

                    {/* Distance */}
                    <td className="py-3 px-3 text-right tabular-nums">
                      <span
                        className={`font-bold ${
                          flight.distanceNM <= 0.5
                            ? 'text-amber-400'
                            : flight.distanceNM <= 3.0
                            ? 'text-emerald-400'
                            : 'text-slate-300'
                        }`}
                      >
                        {flight.distanceNM.toFixed(2)}
                      </span>
                    </td>

                    {/* Altitude */}
                    <td className="py-3 px-3 text-right tabular-nums text-slate-200">
                      {flight.altitudeFt.toLocaleString()} ft
                    </td>

                    {/* ETA Myrtle */}
                    <td className="py-3 px-3 text-right tabular-nums">
                      {flight.etaSeconds <= 5 ? (
                        <span className="text-amber-400 font-bold">Passing</span>
                      ) : (
                        <span className="text-slate-300">{flight.etaSeconds}s</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right font-sans">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => playJetFlyover(flight.wakeCategory)}
                          className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors"
                          title="Play flyover roar"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onLogFlight(flight)}
                          className="px-2 py-1 text-xs font-medium rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-amber-400 transition-colors flex items-center gap-1"
                        >
                          <Camera className="w-3 h-3" />
                          <span>Log</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
