import React, { useState } from 'react';
import { AtcFrequency } from '../types/aviation';
import { Radio, Volume2, Shield, Info, Play, CheckCircle } from 'lucide-react';
import { playAtcTransmission, playRadioSquelch } from '../utils/audio';

export const AtcScanner: React.FC = () => {
  const [selectedFreq, setSelectedFreq] = useState<string>('120.400');
  const [recentTransmission, setRecentTransmission] = useState<string | null>(null);

  const frequencies: AtcFrequency[] = [
    {
      facility: 'Heathrow Director (Final 27L)',
      channel: 'DIR FINAL',
      mhz: '120.400',
      role: 'Assigns ILS 27L localizer capture, final approach spacing, and glidepath clearance.',
      typicalCallsign: 'Heathrow Director',
    },
    {
      facility: 'Heathrow Director (Intermediate)',
      channel: 'DIR INT',
      mhz: '119.725',
      role: 'Radar vectors arrivals from holding stacks (Ockham, Bovingdon, Lambourne, Biggin) onto downwind.',
      typicalCallsign: 'Heathrow Director',
    },
    {
      facility: 'Heathrow Tower (Runway 27L)',
      channel: 'TWR 27L',
      mhz: '118.500',
      role: 'Issues landing clearance directly as aircraft pass overhead Myrtle Avenue.',
      typicalCallsign: 'Heathrow Tower',
    },
    {
      facility: 'Heathrow Tower (Runway 27R)',
      channel: 'TWR 27R',
      mhz: '118.700',
      role: 'Controls northern parallel runway for westerly departures or alternated landings.',
      typicalCallsign: 'Heathrow Tower',
    },
    {
      facility: 'Heathrow ATIS (Arrivals)',
      channel: 'ATIS ARR',
      mhz: '128.075',
      role: 'Continuous broadcast of current runway in use, transition level, and wind conditions.',
      typicalCallsign: 'Heathrow Information',
    },
    {
      facility: 'Heathrow Ground Control',
      channel: 'GND NORTH',
      mhz: '121.900',
      role: 'Ground taxi instructions once vacated 27L via Link Alpha or Bravo toward Terminal 5.',
      typicalCallsign: 'Heathrow Ground',
    },
  ];

  const sampleTransmissions = [
    {
      label: 'Speedbird 117 · ILS 27L Cleared',
      phrase: 'Speedbird 117 Heavy, turn left heading 300, intercept localiser 27L, descend on the glidepath, cleared ILS approach runway 27L.',
    },
    {
      label: 'Emirates 1 Super · Cleared to Land',
      phrase: 'Emirates 1 Super, surface wind 260 degrees 14 knots, runway 27L, cleared to land.',
    },
    {
      label: 'Virgin 3 · Wake Turbulence Caution',
      phrase: 'Virgin 3 Heavy, number 2 to land following the A380, caution wake turbulence, wind 260 at 14 knots.',
    },
    {
      label: 'Qatari 7 · Vacate Rapid Exit',
      phrase: 'Qatari 7 Heavy, vacate left via Link Alpha when able, contact Ground 121 decimal 900, good day.',
    },
  ];

  const handleBroadcast = (phrase: string) => {
    setRecentTransmission(phrase);
    playAtcTransmission(phrase);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wide">
              VHF Aeronautical Radio &amp; Scanner Directory
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-0.5">
              London Heathrow ATC Frequencies (EGLL)
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Live scanner frequencies used by spotters at Myrtle Avenue with handheld airband transceivers (Uniden, Icom, Yaesu).
            </p>
          </div>

          <button
            onClick={() => playRadioSquelch()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors self-start sm:self-auto"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Squelch Click</span>
          </button>
        </div>
      </div>

      {/* Simulated Radio Broadcast Dispatcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Simulate Heathrow Director Radio Transmissions</span>
          </h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Channel: 120.400 MHz
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Click any authentic approach clearance below to play synthesized VHF aeronautical radio audio with radio squelch and authentic UK phraseology:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {sampleTransmissions.map((t, idx) => (
            <button
              key={idx}
              onClick={() => handleBroadcast(t.phrase)}
              className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/60 text-left transition-colors group flex items-start justify-between gap-3"
            >
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                  {t.label}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1 line-clamp-2">
                  &ldquo;{t.phrase}&rdquo;
                </div>
              </div>
              <Play className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 mt-0.5" />
            </button>
          ))}
        </div>

        {recentTransmission && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-200">Active Transmission:</span> &ldquo;{recentTransmission}&rdquo;
            </div>
          </div>
        )}
      </div>

      {/* Heathrow Frequency Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-slate-950/70 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-100">
            EGLL Operational Airband Channels
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Program these VHF AM frequencies into your scanner before arriving at Myrtle Avenue
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-2.5 px-4">Frequency</th>
                <th className="py-2.5 px-3">Channel / Tag</th>
                <th className="py-2.5 px-3">Callsign</th>
                <th className="py-2.5 px-4">Operational Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {frequencies.map((freq) => (
                <tr
                  key={freq.mhz}
                  onClick={() => setSelectedFreq(freq.mhz)}
                  className={`cursor-pointer transition-colors ${
                    selectedFreq === freq.mhz ? 'bg-slate-800/80' : 'hover:bg-slate-800/30'
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-amber-400 tabular-nums">
                    {freq.mhz} MHz
                  </td>
                  <td className="py-3 px-3 text-slate-200">
                    {freq.channel}
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans">
                    {freq.typicalCallsign}
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-400">
                    {freq.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spotter Scanner Legal Advice in the UK */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <Info className="w-4 h-4 text-amber-400" />
          <span>UK Wireless Telegraphy Act &amp; Airband Scanner Etiquette</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          In the United Kingdom, listening to airband radio with headphones in public spaces like Myrtle Avenue is tolerated for aviation enthusiasts; however, under the Wireless Telegraphy Act 2006, you should never rebroadcast ATC communications over public loudspeakers. Keep scanner volume considerate with earbuds.
        </p>
      </div>
    </div>
  );
};
