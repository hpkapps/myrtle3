import React, { useState, useEffect } from 'react';
import {
  calculateMyrtleSun,
  formatTime,
  GoldenHourTimes,
  RUNWAY_27L_HEADING,
} from '../utils/sunCalculator';
import {
  Sun,
  Sunset,
  Sunrise,
  Compass,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Info,
  Sliders,
} from 'lucide-react';

export const SunGoldenHourBox: React.FC = () => {
  // Selected date state (defaults to current system date)
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  // Optional scrubbed hour/minute override (null = live current time)
  const [scrubMinutes, setScrubMinutes] = useState<number | null>(null);
  // Real-time tick every 30 seconds
  const [ticker, setTicker] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Compute effective date/time for solar calculation
  const effectiveDate = new Date(selectedDate);
  if (scrubMinutes !== null) {
    const hours = Math.floor(scrubMinutes / 60);
    const mins = Math.floor(scrubMinutes % 60);
    effectiveDate.setHours(hours, mins, 0, 0);
  } else {
    // Keep current time
    const now = new Date();
    effectiveDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0);
  }

  const sunData: GoldenHourTimes = calculateMyrtleSun(effectiveDate);

  // Quick Date Helpers
  const handleShiftDays = (days: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + days);
    setSelectedDate(next);
  };

  const handleResetToToday = () => {
    setSelectedDate(new Date());
    setScrubMinutes(null);
  };

  const isToday =
    selectedDate.toDateString() === new Date().toDateString() && scrubMinutes === null;

  // Format date string for the native HTML date input (YYYY-MM-DD)
  const dateInputStr = selectedDate.toISOString().split('T')[0];

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-').map(Number);
    const newDate = new Date(y, m - 1, d);
    setSelectedDate(newDate);
  };

  // Daylight timeline progress percentage (0 - 100)
  const currentTotalMins = effectiveDate.getHours() * 60 + effectiveDate.getMinutes();
  const timelinePercent = Math.min(100, Math.max(0, (currentTotalMins / 1440) * 100));

  // Golden hour duration in minutes
  const eveningGoldenDuration = Math.round(
    (sunData.sunset.getTime() - sunData.eveningGoldenHourStart.getTime()) / 60000
  );
  const morningGoldenDuration = Math.round(
    (sunData.morningGoldenHourEnd.getTime() - sunData.sunrise.getTime()) / 60000
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Box Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-slate-950/70 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Sun className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">
                Sun Position &amp; Golden Hour Calculator
              </h3>
              {sunData.isCurrentlyGoldenHour && (
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30 animate-pulse">
                  GOLDEN HOUR ACTIVE
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Runway 27L Approach Lighting · Myrtle Avenue (51.47° N, -0.43° W)
            </p>
          </div>
        </div>

        {/* Date Selector Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            onClick={() => handleShiftDays(-1)}
            className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Date Picker Input */}
          <div className="relative flex items-center">
            <input
              type="date"
              value={dateInputStr}
              onChange={handleDateInputChange}
              className="bg-slate-950 border border-slate-700/80 rounded px-2.5 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            />
          </div>

          <button
            onClick={() => handleShiftDays(1)}
            className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {!isToday && (
            <button
              onClick={handleResetToToday}
              className="px-2 py-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded border border-amber-500/30 transition-colors whitespace-nowrap"
            >
              Reset to Now
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Golden Hour Windows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Evening Golden Hour Card (The Crown Jewel for Myrtle Avenue) */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              sunData.currentPhase === 'EVENING_GOLDEN_HOUR'
                ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/50 shadow-md shadow-amber-950/20'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
                <Sunset className="w-3.5 h-3.5 text-amber-400" />
                <span>Evening Golden Hour (Peak Myrtle)</span>
              </span>
              <span className="text-[10px] font-mono text-amber-300/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                {eveningGoldenDuration} min window
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-mono font-bold text-slate-100 tabular-nums">
                {formatTime(sunData.eveningGoldenHourStart)} – {formatTime(sunData.sunset)}
              </span>
              <span className="text-xs text-slate-400 font-sans">
                (Sunset at {formatTime(sunData.sunset)})
              </span>
            </div>

            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              ⭐ <strong>The Holy Grail of Spotting:</strong> Sun sets at ~240°–260° WSW, aligning directly with Runway 27L heading (272°). Deep amber warmth lights up aircraft nose cowlings, flight deck, and underbelly!
            </p>
          </div>

          {/* Morning Golden Hour Card */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              sunData.currentPhase === 'MORNING_GOLDEN_HOUR'
                ? 'bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/40'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                <Sunrise className="w-3.5 h-3.5 text-amber-300" />
                <span>Morning Golden Hour</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                {morningGoldenDuration} min window
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-mono font-bold text-slate-100 tabular-nums">
                {formatTime(sunData.sunrise)} – {formatTime(sunData.morningGoldenHourEnd)}
              </span>
              <span className="text-xs text-slate-400 font-sans">
                (Sunrise at {formatTime(sunData.sunrise)})
              </span>
            </div>

            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              Low horizontal morning illumination across the starboard (right) side of arrivals with soft contrast. Best for early transpacific/Asian arrivals.
            </p>
          </div>
        </div>

        {/* Live / Simulated Sun Position Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Current Phase</span>
            <span className="font-bold text-slate-100 text-xs truncate block mt-0.5">
              {sunData.phaseLabel}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Sun Elevation</span>
            <span
              className={`font-bold text-sm block mt-0.5 tabular-nums ${
                sunData.currentElevationDeg > 0 ? 'text-amber-400' : 'text-indigo-400'
              }`}
            >
              {sunData.currentElevationDeg > 0 ? `+${sunData.currentElevationDeg}°` : `${sunData.currentElevationDeg}°`}
            </span>
            <span className="text-[10px] text-slate-500">
              Noon Peak: +{sunData.maxSolarElevationDeg}°
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Sun Azimuth</span>
            <span className="font-bold text-slate-100 text-sm block mt-0.5 tabular-nums">
              {sunData.currentAzimuthDeg}°
            </span>
            <span className="text-[10px] text-slate-500">
              {sunData.currentAzimuthDeg >= 225 && sunData.currentAzimuthDeg <= 315 ? 'West/WSW' : 'Compass Angle'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 text-[10px] block uppercase">Runway 27L Alignment</span>
            <span className="font-bold text-amber-400 text-sm block mt-0.5 tabular-nums">
              {sunData.relativeRunwayAngleDeg}° Offset
            </span>
            <span className="text-[10px] text-slate-500">
              Runway Heading: {RUNWAY_27L_HEADING}°
            </span>
          </div>
        </div>

        {/* 24-Hour Daylight & Lighting Spectrum Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Daylight Progression · {formatTime(effectiveDate)}</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-amber-400">Golden: {formatTime(sunData.eveningGoldenHourStart)}</span>
              <span>·</span>
              <span className="text-indigo-300">Blue: {formatTime(sunData.duskCivil)}</span>
            </div>
          </div>

          {/* Visual Spectrum Bar */}
          <div className="relative h-3 w-full rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            {/* Sunrise marker */}
            <div
              className="absolute top-0 bottom-0 bg-amber-500/40"
              style={{
                left: `${(sunData.sunrise.getHours() * 60 + sunData.sunrise.getMinutes()) / 14.4}%`,
                width: `${morningGoldenDuration / 14.4}%`,
              }}
              title="Morning Golden Hour"
            />

            {/* Midday daylight */}
            <div
              className="absolute top-0 bottom-0 bg-sky-500/20"
              style={{
                left: `${(sunData.morningGoldenHourEnd.getHours() * 60 + sunData.morningGoldenHourEnd.getMinutes()) / 14.4}%`,
                right: `${100 - (sunData.eveningGoldenHourStart.getHours() * 60 + sunData.eveningGoldenHourStart.getMinutes()) / 14.4}%`,
              }}
              title="Full Daylight"
            />

            {/* Evening Golden Hour Peak */}
            <div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-amber-400 to-amber-600"
              style={{
                left: `${(sunData.eveningGoldenHourStart.getHours() * 60 + sunData.eveningGoldenHourStart.getMinutes()) / 14.4}%`,
                width: `${eveningGoldenDuration / 14.4}%`,
              }}
              title="Evening Golden Hour Peak"
            />

            {/* Current Time Pin */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-xs z-10"
              style={{ left: `${timelinePercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Time Scrubber Slider (Preview lighting at any hour) */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Scrub Time of Day Preview:</span>
            </span>
            <span className="font-mono font-bold text-amber-300 tabular-nums">
              {formatTime(effectiveDate)}
              {scrubMinutes !== null && <span className="text-slate-500 text-[10px] ml-1">(Simulated)</span>}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1439"
            step="15"
            value={currentTotalMins}
            onChange={(e) => setScrubMinutes(Number(e.target.value))}
            className="w-full accent-amber-500 bg-slate-800 cursor-pointer h-1.5 rounded-lg"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
            <span>00:00</span>
            <span>Dawn {formatTime(sunData.sunrise)}</span>
            <span>Noon {formatTime(sunData.solarNoon)}</span>
            <span className="text-amber-400 font-bold">Golden {formatTime(sunData.eveningGoldenHourStart)}</span>
            <span>Dusk {formatTime(sunData.duskCivil)}</span>
            <span>23:59</span>
          </div>
        </div>

        {/* Live Lighting Advice & Lens Recommendation for this Moment */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/90 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
            <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Photographer Recommendation for {formatTime(effectiveDate)}:</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {sunData.lightingAdvice}
          </p>
          <div className="text-[11px] text-amber-300/90 font-mono pt-1 border-t border-slate-800/60">
            📷 <strong>Lens &amp; Settings Tip:</strong> {sunData.lensTip}
          </div>
        </div>
      </div>
    </div>
  );
};
