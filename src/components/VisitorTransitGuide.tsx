import React from 'react';
import { Train, AlertTriangle, Coffee, MapPin, Footprints, ShieldAlert } from 'lucide-react';

export const VisitorTransitGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
          <Train className="w-4 h-4 text-amber-400" />
          <span>Travel &amp; Arrival Guide · Feltham TW14 9QU</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          How to Get to Myrtle Avenue (And Avoid Parking Fines!)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Myrtle Avenue is a quiet residential street right on the Heathrow airport perimeter. Here is the easiest, stress-free way to visit using public transit.
        </p>
      </div>

      {/* Critical Warning: DO NOT DRIVE / PARK ON MYRTLE AVENUE */}
      <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-2">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <span>Strict Parking Enforcement Warning (Read Before Visiting)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          <strong>Do not attempt to park on Myrtle Avenue or adjacent residential streets.</strong> The entire neighborhood is a strict Controlled Parking Zone (CPZ) reserved exclusively for local residents with permits. Traffic wardens patrol frequently and issue £130 penalty charge notices.
        </p>
        <div className="text-xs text-rose-300/90 font-mono pt-1">
          💡 If you must drive, park at the official <strong>Hatton Cross Underground Station car park</strong> and walk over.
        </div>
      </div>

      {/* Recommended Tube Journey */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1: Tube */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>Step 1 · London Underground</span>
            <span className="text-emerald-400 font-bold">Fastest &amp; Easiest</span>
          </div>

          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Train className="w-5 h-5 text-blue-400" />
            <span>Piccadilly Line to Hatton Cross</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Board any westbound Piccadilly Line train heading towards <strong>Heathrow Terminals 1, 2, 3 or Terminal 4</strong>. Get off at <strong>Hatton Cross Station</strong> (Zone 5).
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            <div>⏱️ <strong>Travel Time:</strong> ~40 mins from Central London</div>
            <div>💳 <strong>Payment:</strong> Contactless / Oyster accepted</div>
          </div>
        </div>

        {/* Step 2: The 6-Min Walk */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>Step 2 · Walking Route</span>
            <span className="text-slate-400">450 meters (flat)</span>
          </div>

          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Footprints className="w-5 h-5 text-emerald-400" />
            <span>6-Minute Scenic Footpath to the Grass</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Exit Hatton Cross station, cross Great South-West Road at the pedestrian signals, and walk down Hatton Road. Turn right onto Myrtle Avenue and follow the path directly onto the green meadow!
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            <div>👟 <strong>Footwear:</strong> Sturdy trainers (grass can be wet)</div>
            <div>📍 <strong>Address:</strong> Myrtle Ave, Feltham TW14 9QU</div>
          </div>
        </div>
      </div>

      {/* Facilities & Food */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Coffee className="w-4 h-4 text-emerald-400" />
            <span>Restrooms, Hot Coffee &amp; Meal Deals</span>
          </h4>
          <p className="text-xs text-slate-300">
            There are no public toilets on the grass field. Just 4 minutes away on the walk from Hatton Cross is the BP service station with an <strong>M&amp;S Simply Food</strong>, hot drinks machines, and customer toilets.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 shrink-0">
          Open 24 Hours
        </div>
      </div>
    </div>
  );
};
