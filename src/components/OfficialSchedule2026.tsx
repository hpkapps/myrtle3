import React, { useState } from 'react';
import {
  HEATHROW_2026_SCHEDULE,
  getScheduleForDate,
  WeekSchedule2026,
} from '../utils/heathrowSchedule2026';
import {
  Calendar,
  Clock,
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Info,
  ShieldCheck,
} from 'lucide-react';

export const OfficialSchedule2026: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const months = [
    'All',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Current today schedule
  const todaySchedule = getScheduleForDate(new Date());

  // Filtered schedule list
  const filteredSchedule = HEATHROW_2026_SCHEDULE.filter((entry) => {
    if (selectedMonth !== 'All') {
      if (!entry.displayDate.includes(selectedMonth)) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        entry.displayDate.toLowerCase().includes(q) ||
        entry.weekCommencing.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Official Document Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Heathrow Airport Limited 2026 Programme</span>
          </div>

          <a
            href="/assets/aistudio/Heathrow_Runway_Alternation_Programme_2026_85902dc5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors self-start sm:self-auto border border-slate-700"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>View Official 2026 PDF</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Heathrow 2026 Runway Alternation Calendar
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Heathrow alternates landing runways every week. One week Myrtle Avenue gets{' '}
          <strong>morning landings (06:00–15:00)</strong>, and the next week Myrtle Avenue gets{' '}
          <strong>afternoon &amp; golden hour landings (15:00 until dusk)</strong>! Plan your visit using the official schedule below.
        </p>

        {/* Current Active Week Callout */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[11px]">
              Current Week ({todaySchedule.schedule.displayDate} 2026)
            </span>
            <span className="text-slate-100 font-bold text-sm block mt-0.5">
              {todaySchedule.myrtleActiveWindowLabel}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <div>
              <span className="text-slate-500 text-[10px] block">06:00 – 15:00</span>
              <span
                className={`font-bold ${
                  todaySchedule.schedule.morningRunway === '27L'
                    ? 'text-emerald-400'
                    : 'text-slate-400'
                }`}
              >
                {todaySchedule.schedule.morningRunway}{' '}
                {todaySchedule.schedule.morningRunway === '27L' ? '(Myrtle Ave)' : '(North)'}
              </span>
            </div>
            <span>·</span>
            <div>
              <span className="text-slate-500 text-[10px] block">15:00 – Dusk</span>
              <span
                className={`font-bold ${
                  todaySchedule.schedule.afternoonRunway === '27L'
                    ? 'text-emerald-400'
                    : 'text-slate-400'
                }`}
              >
                {todaySchedule.schedule.afternoonRunway}{' '}
                {todaySchedule.schedule.afternoonRunway === '27L' ? '(Myrtle Ave)' : '(North)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Month Navigation */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Month Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedMonth === m
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-56">
          <input
            type="text"
            placeholder="Search date (e.g. 16 Nov)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Schedule Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Week Commencing</th>
                <th className="py-3 px-4 font-semibold">Morning (06:00 – 15:00)</th>
                <th className="py-3 px-4 font-semibold">Afternoon (15:00 – Last Flight)</th>
                <th className="py-3 px-4 font-semibold">Myrtle Avenue Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredSchedule.map((week) => {
                const isMorningMyrtle = week.morningRunway === '27L';
                const isAfternoonMyrtle = week.afternoonRunway === '27L';
                const isCurrentWeek = week.weekCommencing === todaySchedule.schedule.weekCommencing;

                return (
                  <tr
                    key={week.weekCommencing}
                    className={`transition-colors ${
                      isCurrentWeek ? 'bg-amber-500/10' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Date */}
                    <td className="py-3 px-4 font-bold text-slate-100 flex items-center gap-2">
                      <span>{week.displayDate} 2026</span>
                      {isCurrentWeek && (
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                          THIS WEEK
                        </span>
                      )}
                    </td>

                    {/* Morning Runway */}
                    <td className="py-3 px-4">
                      <span
                        className={`font-bold ${
                          isMorningMyrtle ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {week.morningRunway}
                      </span>
                      <span className="text-slate-500 ml-1.5 font-sans">
                        {isMorningMyrtle ? '(Myrtle Ave)' : '(North 27R)'}
                      </span>
                    </td>

                    {/* Afternoon Runway */}
                    <td className="py-3 px-4">
                      <span
                        className={`font-bold ${
                          isAfternoonMyrtle ? 'text-amber-400' : 'text-slate-400'
                        }`}
                      >
                        {week.afternoonRunway}
                      </span>
                      <span className="text-slate-500 ml-1.5 font-sans">
                        {isAfternoonMyrtle ? '(Myrtle Ave Golden Hour!)' : '(North 27R)'}
                      </span>
                    </td>

                    {/* Verdict */}
                    <td className="py-3 px-4 font-sans text-xs">
                      {isMorningMyrtle ? (
                        <span className="text-emerald-300 font-medium">
                          🌅 Visit Morning (06:00 to 15:00)
                        </span>
                      ) : (
                        <span className="text-amber-300 font-medium">
                          ⭐ Visit Afternoon (15:00 to Dusk for Golden Hour)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Footnotes from Heathrow Document */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <Info className="w-4 h-4 text-amber-400" />
          <span>Official Heathrow Rules &amp; Exceptions</span>
        </div>
        <p className="leading-relaxed text-[11px]">
          • <strong>06:00 to 07:00 Busy Hour:</strong> Heathrow uses <em>both</em> runways (27L and 27R) for arrivals simultaneously between 06:00 and 07:00 as this is the busiest arrival wave of the day from Asia and North America.<br />
          • <strong>Westerly operations:</strong> This schedule applies whenever westerly operations are in effect (~70% of days). If sustained winds blow from the east, aircraft take off over Myrtle Avenue on Runway 09R.<br />
          • <strong>Source:</strong> Heathrow Airport Limited Public Classification 2026 Programme.
        </p>
      </div>
    </div>
  );
};
