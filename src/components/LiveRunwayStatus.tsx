import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Wind,
  Navigation,
  Compass,
  ArrowRight,
  Info,
  Calendar,
} from 'lucide-react';
import { getScheduleForDate } from '../utils/heathrowSchedule2026';

export type SimulatedRunwayMode =
  | 'AUTO' // Follows official 2026 Heathrow schedule & real clock
  | 'FORCE_27L_LANDING' // Morning westerly - planes landing overhead
  | 'FORCE_27R_SWITCHED' // Afternoon westerly - planes landing on north runway
  | 'FORCE_09R_TAKEOFF'; // Easterly winds - planes climbing out over Myrtle

interface LiveRunwayStatusProps {
  currentHour: number;
  currentMinute: number;
  simulatedMode: SimulatedRunwayMode;
  onSetSimulatedMode: (mode: SimulatedRunwayMode) => void;
  onNavigateToAlternativeSpots: () => void;
  onNavigateToCalendar: () => void;
  countdownSeconds: number;
}

export const LiveRunwayStatus: React.FC<LiveRunwayStatusProps> = ({
  currentHour,
  currentMinute,
  simulatedMode,
  onSetSimulatedMode,
  onNavigateToAlternativeSpots,
  onNavigateToCalendar,
  countdownSeconds,
}) => {
  // Official Heathrow 2026 schedule for today
  const officialToday = getScheduleForDate(new Date());

  // Determine operational state based on simulation mode or official schedule
  let isLandingOverhead = false;
  let isSwitchedToNorth = false;
  let isEasterlyTakeoffs = false;

  if (simulatedMode === 'FORCE_27L_LANDING') {
    isLandingOverhead = true;
  } else if (simulatedMode === 'FORCE_27R_SWITCHED') {
    isSwitchedToNorth = true;
  } else if (simulatedMode === 'FORCE_09R_TAKEOFF') {
    isEasterlyTakeoffs = true;
  } else {
    // AUTO: Evaluates exact official 2026 schedule for this week!
    if (officialToday.activeRunwayNow === '27L') {
      isLandingOverhead = true;
    } else {
      isSwitchedToNorth = true;
    }
  }

  // Format countdown HH:MM:SS
  const formatCountdown = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-2xl border overflow-hidden transition-all shadow-lg bg-slate-900 border-slate-800">
      {/* Top Banner Status Header */}
      <div
        className={`p-6 sm:p-8 border-b ${
          isLandingOverhead
            ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-emerald-500/30'
            : isSwitchedToNorth
            ? 'bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 border-rose-500/30'
            : 'bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border-amber-500/30'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            {/* Status Tag */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                  isLandingOverhead
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : isSwitchedToNorth
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {isLandingOverhead ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Runway 27L Active · Landing Overhead</span>
                  </>
                ) : isSwitchedToNorth ? (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Runway 27R Active · Landings Switched to North</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Runway 09R Active · Takeoffs Overhead</span>
                  </>
                )}
              </span>

              <button
                onClick={onNavigateToCalendar}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 transition-colors"
              >
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Heathrow 2026 Schedule ({officialToday.schedule.displayDate})</span>
              </button>

              {simulatedMode !== 'AUTO' && (
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Simulation Active
                </span>
              )}
            </div>

            {/* Huge Headline for Instant Clarity */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
              {isLandingOverhead ? (
                <>
                  YES! Planes are landing{' '}
                  <span className="text-emerald-400 underline decoration-emerald-500/40">
                    directly over Myrtle Avenue
                  </span>{' '}
                  right now.
                </>
              ) : isSwitchedToNorth ? (
                <>
                  Planes are{' '}
                  <span className="text-rose-400">landing on the other side</span> (North
                  Runway 27R).
                </>
              ) : (
                <>
                  Planes are{' '}
                  <span className="text-amber-400">taking off over Myrtle Avenue</span>{' '}
                  (Easterly Winds).
                </>
              )}
            </h1>

            {/* Plain English Explanation */}
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {isLandingOverhead ? (
                <>
                  Massive international heavies (A380s, A350s, 777s) are touching down every 90 seconds
                  at merely <strong>150–180 feet above the grass</strong>. It is prime time for viral
                  videos and photos!
                </>
              ) : isSwitchedToNorth ? (
                <>
                  Because of Heathrow&apos;s <strong>mandatory 3:00 PM switchover</strong>, landing aircraft
                  swapped to the northern runway (27R) 1.4 miles away. Myrtle Avenue is quiet for landings
                  right now, but you can easily see them at the nearby northern spots!
                </>
              ) : (
                <>
                  Winds from the east shifted operations. Heavies are departing over Myrtle Avenue on
                  Runway 09R with roaring takeoff thrust, banking right above the trees!
                </>
              )}
            </p>
          </div>

          {/* Quick Action or 3PM Countdown Box */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {isLandingOverhead ? (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>3:00 PM Switch In:</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-100 tabular-nums">
                  {formatCountdown(countdownSeconds)}
                </div>
                <div className="text-slate-400 text-[10px]">
                  Switches to 27R north at 15:00 sharp
                </div>
              </div>
            ) : isSwitchedToNorth ? (
              <button
                onClick={onNavigateToAlternativeSpots}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all shadow-md active:scale-98"
              >
                <span>Where to Go Instead (5 min)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
                <span className="text-amber-400 font-bold block mb-1">Takeoff Thunder Mode</span>
                <span className="text-slate-300">
                  Hear full spool-up power as widebodies climb out.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Mode Simulator Bar (So tourists can test what happens at 3 PM or windy weather) */}
      <div className="p-4 bg-slate-950/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Trip Planning Simulator:</strong> See what the field looks like during different times of day or wind conditions:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => onSetSimulatedMode('AUTO')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              simulatedMode === 'AUTO'
                ? 'bg-slate-800 text-slate-100 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Clock (Auto)
          </button>
          <button
            onClick={() => onSetSimulatedMode('FORCE_27L_LANDING')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              simulatedMode === 'FORCE_27L_LANDING'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Morning Landing (27L)
          </button>
          <button
            onClick={() => onSetSimulatedMode('FORCE_27R_SWITCHED')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              simulatedMode === 'FORCE_27R_SWITCHED'
                ? 'bg-rose-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            After 3 PM Switch (27R)
          </button>
          <button
            onClick={() => onSetSimulatedMode('FORCE_09R_TAKEOFF')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              simulatedMode === 'FORCE_09R_TAKEOFF'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Easterly Winds (09R Takeoffs)
          </button>
        </div>
      </div>
    </div>
  );
};
