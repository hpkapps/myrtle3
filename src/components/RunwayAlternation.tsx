import React, { useState, useEffect } from 'react';
import { HeathrowOperations } from '../types/aviation';
import { getHeathrowOperations } from '../utils/flightSimulation';
import { calculateMyrtleSun, formatTime } from '../utils/sunCalculator';
import { Compass, Sun, Wind, Clock, AlertCircle, ArrowUpRight, Sunset, Sunrise } from 'lucide-react';

export const RunwayAlternation: React.FC = () => {
  const [ops, setOps] = useState<HeathrowOperations>(getHeathrowOperations());
  const [activeTab, setActiveTab] = useState<'schedule' | 'metar' | 'sun'>('schedule');

  // Update operations clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setOps(getHeathrowOperations());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds into HH:MM:SS
  const formatCountdown = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Runway 27L magnetic heading is 272°
  const runwayHeading = 272;
  const windAngleDiff = Math.abs(runwayHeading - ops.windHeadingDeg);
  const headwindKts = (ops.windSpeedKts * Math.cos((windAngleDiff * Math.PI) / 180)).toFixed(1);
  const crosswindKts = Math.abs(ops.windSpeedKts * Math.sin((windAngleDiff * Math.PI) / 180)).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner / Operational Mode */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              <span>Heathrow Alternation Scheme (EGLL)</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">Westerly Operations Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
              Runway Status: <span className="text-amber-400">27L Arrivals</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Myrtle Avenue is currently in <strong>Prime Direct Overhead Mode</strong>. Inbound airliners are landing continuously over the green.
            </p>
          </div>

          {/* 15:00 Switch Countdown Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4 shrink-0">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                Next Runway Switch (15:00 Switchover)
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-slate-100 tabular-nums">
                {formatCountdown(ops.switchCountdownSeconds)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Switches landings to 27R / departures to 27L
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 w-fit text-xs font-medium">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'schedule'
              ? 'bg-slate-800 text-slate-100 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Runway Alternation Rules
        </button>
        <button
          onClick={() => setActiveTab('metar')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'metar'
              ? 'bg-slate-800 text-slate-100 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          METAR & Wind Component
        </button>
        <button
          onClick={() => setActiveTab('sun')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'sun'
              ? 'bg-slate-800 text-slate-100 shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Sun Angle & Lighting
        </button>
      </div>

      {/* Tab 1: Alternation Schedule & Matrix */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Westerly Operations Card */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-100 uppercase font-mono tracking-wide">
                  Westerly Operations (~70% of the Year)
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Active Today
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Occurs whenever winds are out of the West (headings 190° to 350°). Aircraft land facing west on Runways 27L and 27R.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100">06:00 to 15:00:</strong>
                    <span className="text-slate-300 ml-1">Landing 27L, Departing 27R</span>
                  </div>
                  <span className="text-amber-400 font-bold font-mono text-[11px]">
                    ⭐ Myrtle Ave Peak Spotting
                  </span>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100">15:00 to 06:00:</strong>
                    <span className="text-slate-300 ml-1">Landing 27R, Departing 27L</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Parallel Views (1.4 km North)
                  </span>
                </div>
              </div>
            </div>

            {/* Easterly Operations Card */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-100 uppercase font-mono tracking-wide">
                  Easterly Operations (~30% of the Year)
                </h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Standby
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Occurs when sustained easterly winds blow from 010° to 170°. Aircraft land facing east on Runway 09L and depart on Runway 09R.
              </p>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-400 block mb-1">Takeoff Thunder at Myrtle Avenue:</strong>
                During easterly days, heavies departing on <strong>09R</strong> climb straight out directly above Myrtle Avenue with full spool-up roar and dramatic banking turns toward the continent!
              </div>
            </div>
          </div>

          {/* Explanation of Why Alternation Exists */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <h4 className="font-bold text-slate-200 text-sm mb-1">
              Why Does Heathrow Switch at 15:00?
            </h4>
            The Heathrow Runway Alternation scheme was introduced in the 1970s following government agreements to provide communities living under the flight paths (Hounslow, Feltham, Richmond, Windsor) with guaranteed half-day periods of respite from aircraft noise.
          </div>
        </div>
      )}

      {/* Tab 2: METAR & Wind Component */}
      {activeTab === 'metar' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                Raw Aeronautical Weather (METAR)
              </span>
              <span className="text-xs font-mono text-slate-400">Station: EGLL (Heathrow)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-emerald-400 text-sm select-all">
              EGLL 101750Z 26014G20KT 9999 FEW035 16/08 Q1018 NOSIG
            </div>

            {/* Decoded Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
              <div className="p-3 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Surface Wind</span>
                <span className="text-slate-100 font-bold text-sm">260° @ 14 kts</span>
                <span className="text-amber-400 text-[10px] block">Gusts to 20 kts</span>
              </div>
              <div className="p-3 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Runway 27L Headwind</span>
                <span className="text-emerald-400 font-bold text-sm">+{headwindKts} kts</span>
                <span className="text-slate-400 text-[10px] block">Aligned into wind</span>
              </div>
              <div className="p-3 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Crosswind Component</span>
                <span className="text-slate-200 font-bold text-sm">{crosswindKts} kts</span>
                <span className="text-slate-400 text-[10px] block">From port (left)</span>
              </div>
              <div className="p-3 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Barometer / QNH</span>
                <span className="text-slate-100 font-bold text-sm">1018 hPa</span>
                <span className="text-slate-400 text-[10px] block">30.06 inHg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sun Angle & Golden Hour Lighting */}
      {activeTab === 'sun' && (() => {
        const liveSun = calculateMyrtleSun(new Date());
        return (
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">
                  Sun Azimuth vs Runway 27L Axis (272°) · Today's Calculations
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">
                  {liveSun.phaseLabel}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">
                  Azimuth: <strong className="text-amber-400">{liveSun.currentAzimuthDeg}°</strong>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">
                  Elevation: <strong className="text-amber-400">+{liveSun.currentElevationDeg}°</strong>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {liveSun.lightingAdvice}
            </p>

            {/* Photographic Lighting Windows for Today */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1">
                  <Sunrise className="w-3.5 h-3.5 text-amber-300" />
                  <span>Morning Golden Hour</span>
                </div>
                <div className="font-mono text-slate-100 font-bold mb-1">
                  {formatTime(liveSun.sunrise)} – {formatTime(liveSun.morningGoldenHourEnd)}
                </div>
                <p className="text-slate-400 text-[11px]">
                  Sun illuminates the starboard (right) side of 27L arrivals with long soft shadows and gentle contrast.
                </p>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-300 font-bold mb-1">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Solar Noon Culmination</span>
                </div>
                <div className="font-mono text-slate-100 font-bold mb-1">
                  {formatTime(liveSun.solarNoon)} (Peak: +{liveSun.maxSolarElevationDeg}°)
                </div>
                <p className="text-slate-400 text-[11px]">
                  Maximum overhead sun angle; high contrast under wings, ideal for dramatic widebody belly silhouettes.
                </p>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-amber-500/30 bg-amber-500/5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                  <Sunset className="w-3.5 h-3.5 text-amber-400" />
                  <span>Evening Golden Hour (Peak)</span>
                </div>
                <div className="font-mono text-amber-300 font-bold mb-1">
                  {formatTime(liveSun.eveningGoldenHourStart)} – {formatTime(liveSun.sunset)}
                </div>
                <p className="text-slate-300 text-[11px]">
                  The legendary Myrtle Avenue shot: deep amber sun shines along the 272° axis, lighting up engine cowlings and nose cones!
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
