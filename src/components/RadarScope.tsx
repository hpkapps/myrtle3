import React, { useState } from 'react';
import { Flight } from '../types/aviation';
import { ZoomIn, ZoomOut, Crosshair, MapPin, Eye } from 'lucide-react';

interface RadarScopeProps {
  flights: Flight[];
  selectedFlightId: string | null;
  onSelectFlight: (flightId: string) => void;
  onLogFlight: (flight: Flight) => void;
}

export const RadarScope: React.FC<RadarScopeProps> = ({
  flights,
  selectedFlightId,
  onSelectFlight,
  onLogFlight,
}) => {
  // Zoom level in nautical miles maximum display: 5, 10, or 16 NM
  const [rangeNM, setRangeNM] = useState<number>(10);
  const [showGlideProfile, setShowGlideProfile] = useState<boolean>(true);

  // Radar SVG dimensions
  const svgWidth = 800;
  const svgHeight = 440;
  // Center is offset towards the left because planes approach 27L from the East (right side of radar)
  const originX = 140; // 27L threshold X position
  const originY = 220; // 27L threshold Y position

  // Scale factor: how many pixels per NM
  const scale = (svgWidth - originX - 40) / rangeNM;

  // Selected flight object
  const selectedFlight = flights.find((f) => f.id === selectedFlightId) || null;

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      {/* Scope Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950/70 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            EGLL Approach Radar · ILS 27L
          </span>
          <span className="text-xs font-mono text-slate-400">
            Range: <span className="text-emerald-400 font-semibold">{rangeNM} NM</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60">
            <button
              onClick={() => setRangeNM(5)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                rangeNM === 5 ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              5 NM
            </button>
            <button
              onClick={() => setRangeNM(10)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                rangeNM === 10 ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              10 NM
            </button>
            <button
              onClick={() => setRangeNM(16)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                rangeNM === 16 ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              16 NM
            </button>
          </div>

          <button
            onClick={() => setShowGlideProfile(!showGlideProfile)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
              showGlideProfile
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Glide Slope</span>
          </button>
        </div>
      </div>

      {/* Main Radar Screen */}
      <div className="relative w-full aspect-[16/9] min-h-[360px] bg-slate-950 overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full font-mono"
        >
          {/* Background Grid Lines */}
          <defs>
            <radialGradient id="radarGlow" cx="17%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#064e3b" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#022c22" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.0" />
            </radialGradient>
            <linearGradient id="ilsBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.03" />
            </linearGradient>
            <pattern id="radarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.6" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width={svgWidth} height={svgHeight} fill="url(#radarGrid)" />
          <rect width={svgWidth} height={svgHeight} fill="url(#radarGlow)" />

          {/* Range Rings centered on Runway 27L threshold */}
          {[1, 2, 5, 10, 15].map((ring) => {
            if (ring > rangeNM * 1.2) return null;
            const rPx = ring * scale;
            return (
              <g key={`ring-${ring}`}>
                <circle
                  cx={originX}
                  cy={originY}
                  r={rPx}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  strokeOpacity="0.7"
                />
                <text
                  x={originX + rPx - 4}
                  y={originY - 6}
                  fill="#64748b"
                  fontSize="9"
                  textAnchor="end"
                >
                  {ring} NM
                </text>
              </g>
            );
          })}

          {/* ILS 27L Localizer Beam Cone (extended centerline) */}
          <path
            d={`M ${originX} ${originY} L ${svgWidth} ${originY - 35} L ${svgWidth} ${originY + 35} Z`}
            fill="url(#ilsBeam)"
          />
          {/* Extended Centerline Line */}
          <line
            x1={originX}
            y1={originY}
            x2={svgWidth}
            y2={originY}
            stroke="#10b981"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            strokeOpacity="0.6"
          />

          {/* Runway 27R parallel centerline (approx 1.4km / 0.75 NM north) */}
          <line
            x1={originX}
            y1={originY - 48}
            x2={svgWidth}
            y2={originY - 48}
            stroke="#475569"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            strokeOpacity="0.4"
          />
          <text
            x={originX - 10}
            y={originY - 46}
            fill="#64748b"
            fontSize="9"
            textAnchor="end"
          >
            27R
          </text>

          {/* Heathrow Runways Tarmac Representation */}
          {/* 27L Runway Strip */}
          <rect
            x={originX - 100}
            y={originY - 4}
            width={100}
            height={8}
            fill="#334155"
            stroke="#64748b"
            strokeWidth="1"
            rx="1"
          />
          <text
            x={originX - 105}
            y={originY + 3}
            fill="#94a3b8"
            fontSize="9"
            fontWeight="bold"
            textAnchor="end"
          >
            27L
          </text>

          {/* 27R Runway Strip */}
          <rect
            x={originX - 105}
            y={originY - 52}
            width={105}
            height={8}
            fill="#334155"
            stroke="#64748b"
            strokeWidth="1"
            rx="1"
          />

          {/* MYRTLE AVENUE SPOTTER LOCATION */}
          {/* Situated at ~0.3 NM from 27L threshold along the approach path */}
          {(() => {
            const myrtleDistNM = 0.3;
            const myrtleX = originX + myrtleDistNM * scale;
            const myrtleY = originY + 14; // slightly south of centerline
            return (
              <g className="cursor-pointer group">
                {/* Visual pulse ring around Myrtle Ave */}
                <circle
                  cx={myrtleX}
                  cy={myrtleY}
                  r="14"
                  fill="#f59e0b"
                  fillOpacity="0.15"
                  className="animate-pulse"
                />
                <circle
                  cx={myrtleX}
                  cy={myrtleY}
                  r="5"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                {/* Label */}
                <rect
                  x={myrtleX - 48}
                  y={myrtleY + 8}
                  width="96"
                  height="16"
                  fill="#0f172a"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  rx="3"
                />
                <text
                  x={myrtleX}
                  y={myrtleY + 19}
                  fill="#fbbf24"
                  fontSize="8.5"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  📍 Myrtle Avenue
                </text>
              </g>
            );
          })()}

          {/* Heathrow Terminal Area Callout */}
          <text
            x={originX - 50}
            y={originY - 22}
            fill="#475569"
            fontSize="8"
            textAnchor="middle"
          >
            EGLL / LHR TERMINALS
          </text>

          {/* Inbound Aircraft Blips on Localizer */}
          {flights.map((flight) => {
            if (flight.distanceNM > rangeNM * 1.15) return null;

            // X is threshold + distance in NM * scale
            const x = originX + flight.distanceNM * scale;
            const y = originY; // Right down 27L centerline

            const isSelected = flight.id === selectedFlightId;
            const isOverhead = flight.status === 'Overhead Myrtle Ave';
            const isHeavyOrSuper = flight.wakeCategory === 'Super' || flight.wakeCategory === 'Heavy';

            const blipColor = isOverhead
              ? '#f59e0b'
              : flight.wakeCategory === 'Super'
              ? '#38bdf8'
              : isHeavyOrSuper
              ? '#10b981'
              : '#94a3b8';

            return (
              <g
                key={flight.id}
                onClick={() => onSelectFlight(flight.id)}
                className="cursor-pointer group"
              >
                {/* Velocity Vector (heading 272° is facing left) */}
                <line
                  x1={x}
                  y1={y}
                  x2={x - 24}
                  y2={y}
                  stroke={blipColor}
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />

                {/* Selection indicator */}
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Aircraft Blip Symbol */}
                <polygon
                  points={`${x - 5},${y} ${x + 4},${y - 4} ${x + 2},${y} ${x + 4},${y + 4}`}
                  fill={blipColor}
                />

                {/* Data Block Leader Line & Tag */}
                <line
                  x1={x}
                  y1={y}
                  x2={x + 10}
                  y2={y - 14}
                  stroke={blipColor}
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                />

                {/* Flight Data Block */}
                <g transform={`translate(${x + 12}, ${y - 28})`}>
                  <rect
                    x="0"
                    y="0"
                    width="68"
                    height="24"
                    fill="#020617"
                    fillOpacity="0.85"
                    stroke={isSelected ? '#f59e0b' : '#334155'}
                    strokeWidth="0.8"
                    rx="2"
                  />
                  <text
                    x="4"
                    y="10"
                    fill={isSelected ? '#fbbf24' : '#f8fafc'}
                    fontSize="8.5"
                    fontWeight="bold"
                  >
                    {flight.flightNumber}
                  </text>
                  <text
                    x="4"
                    y="19"
                    fill="#94a3b8"
                    fontSize="7.5"
                  >
                    A{Math.round(flight.altitudeFt / 100).toString().padStart(2, '0')} · {flight.icaoType}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Selected Flight Quick Drawer on Radar overlay */}
        {selectedFlight && (
          <div className="absolute top-3 right-3 max-w-xs bg-slate-900/95 border border-slate-700/80 rounded-lg p-3 shadow-xl backdrop-blur-md">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs font-mono text-emerald-400 font-semibold">
                  {selectedFlight.callsign}
                </div>
                <div className="text-sm font-bold text-slate-100">
                  {selectedFlight.airline} ({selectedFlight.flightNumber})
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {selectedFlight.wakeCategory}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px]">Type / Reg</span>
                <div className="text-slate-200 font-semibold">{selectedFlight.icaoType} · {selectedFlight.registration}</div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Distance</span>
                <div className="text-amber-400 font-bold">{selectedFlight.distanceNM} NM</div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Altitude AGL</span>
                <div className="text-slate-200">{selectedFlight.altitudeFt} ft</div>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">ETA Myrtle Ave</span>
                <div className="text-slate-200">{selectedFlight.etaSeconds}s</div>
              </div>
            </div>

            <div className="mt-2 text-[11px] text-slate-300">
              From <span className="font-semibold text-slate-100">{selectedFlight.origin.city}</span> ({selectedFlight.origin.code})
            </div>

            <button
              onClick={() => onLogFlight(selectedFlight)}
              className="mt-2.5 w-full py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 rounded font-sans transition-colors"
            >
              Log Sighting
            </button>
          </div>
        )}
      </div>

      {/* Altitude Glide-Slope Profile View (3-Degree ILS) */}
      {showGlideProfile && (
        <div className="p-3 bg-slate-950 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-slate-300">Runway 27L ILS 3.0° Vertical Glidepath Profile</span>
            <span className="font-mono text-[11px]">Myrtle Ave Altitude: ~160ft AGL</span>
          </div>

          <div className="relative h-16 w-full bg-slate-900/60 rounded border border-slate-800 overflow-hidden">
            {/* 3 Degree Slope Line */}
            <svg viewBox="0 0 800 64" className="w-full h-full">
              {/* Ground level */}
              <line x1="0" y1="56" x2="800" y2="56" stroke="#334155" strokeWidth="2" />
              {/* Runway threshold */}
              <rect x="70" y="52" width="60" height="6" fill="#64748b" />
              <text x="100" y="48" fill="#94a3b8" fontSize="8" textAnchor="middle">27L</text>
              {/* Myrtle Avenue Marker */}
              <line x1="120" y1="10" x2="120" y2="56" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
              <text x="120" y="8" fill="#fbbf24" fontSize="8" textAnchor="middle">Myrtle (160ft)</text>

              {/* Glide slope gradient beam */}
              <polygon points="100,54 780,10 780,14 100,56" fill="#10b981" fillOpacity="0.25" />
              <line x1="100" y1="54" x2="780" y2="10" stroke="#10b981" strokeWidth="1.2" />

              {/* Aircraft on glide path */}
              {flights.map((flight) => {
                const normalizedDist = Math.min(1, flight.distanceNM / 15);
                const x = 100 + normalizedDist * 660;
                const y = 54 - (flight.altitudeFt / 3500) * 44;

                return (
                  <circle
                    key={`prof-${flight.id}`}
                    cx={x}
                    cy={y}
                    r={flight.id === selectedFlightId ? 4 : 2.5}
                    fill={flight.id === selectedFlightId ? '#f59e0b' : '#38bdf8'}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
