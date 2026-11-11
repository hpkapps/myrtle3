import React, { useState } from 'react';
import { MapPin, Navigation, Info, AlertTriangle, Coffee, Train, Camera } from 'lucide-react';

interface SpotZone {
  id: string;
  name: string;
  coords: string;
  lensGuide: string;
  altitudeAgl: string;
  description: string;
  bestTime: string;
}

export const SpotterMap: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('fence');

  const spotZones: SpotZone[] = [
    {
      id: 'fence',
      name: 'The Perimeter Fence ("Goalpost" Corner)',
      coords: '51.4688° N, -0.4285° W',
      lensGuide: '24mm – 50mm (Full Frame)',
      altitudeAgl: '~140 – 160 ft AGL',
      description:
        'The most iconic spot on earth for wide-angle landing shots. Stand near the southern chainlink fence bordering Heathrow Southern Perimeter Road. Aircraft pass directly above your head as they reach threshold 27L. Captures tire smoke on touchdown down the runway.',
      bestTime: 'After 13:00 for golden side-light on 27L approach',
    },
    {
      id: 'center',
      name: 'The Center Green Meadow',
      coords: '51.4692° N, -0.4282° W',
      lensGuide: '50mm – 85mm (Full Frame)',
      altitudeAgl: '~170 – 190 ft AGL',
      description:
        'Directly aligned with the Runway 27L extended centerline. Stand in the open grass lawn to capture breathtaking full-belly passes, flaps and flap track fairings, main landing gear retraction bays, and wingtip vortices on humid days.',
      bestTime: 'Mid-day and afternoon when light covers both wings',
    },
    {
      id: 'east',
      name: 'North-East Tree Line & Benches',
      coords: '51.4695° N, -0.4275° W',
      lensGuide: '70mm – 135mm (Full Frame)',
      altitudeAgl: '~210 – 240 ft AGL',
      description:
        'Slightly offset from centerline, this spot gives a classic 3/4 banking perspective as airliners make minor crab adjustments for crosswinds before touchdown. Shaded benches make it comfortable for long spotting sessions.',
      bestTime: 'Late afternoon Golden Hour (warm amber glow on port fuselage)',
    },
  ];

  const selectedZone = spotZones.find((z) => z.id === selectedZoneId) || spotZones[0];

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Context */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-2">
                Aviation Enthusiast Field Guide · Feltham TW14 9QU
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                Planespotting at Myrtle Avenue Green
              </h1>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Myrtle Avenue is the world&apos;s most celebrated commercial aviation vantage point. Located right at the eastern threshold of Heathrow Runway 27L, widebody heavy aircraft roar just 150–180 feet above the public grass lawn on short final approach.
              </p>
            </div>

            {/* Quick Metadata Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[11px] block">Coordinates</span>
                <span className="text-slate-200 font-semibold">51.4688° N, 0.4285° W</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Public Access</span>
                <span className="text-emerald-400 font-semibold">Open 24/7 Free</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Nearest Tube</span>
                <span className="text-amber-400 font-semibold">Hatton Cross (6 min)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
            <img
              src="/src/assets/images/myrtle_avenue_spotters_1794361649892.jpg"
              alt="Planespotters on Myrtle Avenue green with telephoto camera lenses"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-300 bg-slate-950/70 px-2 py-1 rounded backdrop-blur-xs">
              Spotters at Myrtle Ave Green
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Field Map Schematic */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Interactive Spotting Field Schematic</span>
            </h2>
            <p className="text-xs text-slate-400">
              Select a spot on the field to inspect photo angles, focal lengths, and lighting advice
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
            {spotZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedZoneId === zone.id
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {zone.id === 'fence' ? 'Fence Corner' : zone.id === 'center' ? 'Centerline' : 'East Trees'}
              </button>
            ))}
          </div>
        </div>

        {/* Vector SVG Schematic Map */}
        <div className="relative w-full aspect-[21/9] min-h-[280px] bg-slate-950 rounded-lg border border-slate-800 overflow-hidden select-none">
          <svg viewBox="0 0 900 380" className="w-full h-full font-mono">
            {/* Background grass lawn */}
            <rect x="0" y="0" width="900" height="380" fill="#091410" />

            {/* Heathrow Airport Boundary (West) */}
            <rect x="0" y="0" width="220" height="380" fill="#0f172a" />
            <text x="110" y="30" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">
              HEATHROW AIRFIELD (EGLL)
            </text>

            {/* Runway 27L Tarmac threshold */}
            <rect x="0" y="140" width="160" height="70" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <text x="80" y="180" fill="#f8fafc" fontSize="18" fontWeight="bold" textAnchor="middle">
              27L
            </text>

            {/* Piano Keys on 27L */}
            {[146, 154, 162, 170, 178, 186, 194, 202].map((y, i) => (
              <rect key={i} x="120" y={y} width="28" height="4" fill="#ffffff" />
            ))}

            {/* Perimeter Fence Line */}
            <line x1="220" y1="0" x2="220" y2="380" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" />
            <text x="212" y="360" fill="#f59e0b" fontSize="9" textAnchor="end">
              Airport Perimeter Fence
            </text>

            {/* Southern Perimeter Road */}
            <rect x="180" y="0" width="35" height="380" fill="#1e293b" />
            <text x="198" y="190" fill="#94a3b8" fontSize="8" textAnchor="middle" transform="rotate(-90, 198, 190)">
              Southern Perimeter Rd
            </text>

            {/* MYRTLE AVENUE GREEN FIELD */}
            <rect x="230" y="60" width="460" height="260" fill="#064e3b" fillOpacity="0.4" rx="12" stroke="#059669" strokeWidth="1.5" />
            <text x="460" y="90" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
              MYRTLE AVENUE GREEN (PUBLIC PARK)
            </text>

            {/* Myrtle Avenue Residential Road & Houses */}
            <rect x="230" y="330" width="460" height="30" fill="#1e293b" rx="4" />
            <text x="460" y="350" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
              Myrtle Avenue (Residents Parking Only - Permit Required)
            </text>

            {/* Terraced Houses */}
            {[260, 320, 380, 440, 500, 560, 620].map((x, i) => (
              <rect key={i} x={x} y="365" width="45" height="15" fill="#475569" rx="2" />
            ))}

            {/* 27L Approach Centerline Beam */}
            <line x1="160" y1="175" x2="900" y2="175" stroke="#ef4444" strokeWidth="2" strokeDasharray="8 6" strokeOpacity="0.8" />
            <text x="820" y="165" fill="#f87171" fontSize="10" textAnchor="end">
              ILS 27L Centerline Flight Path ➔
            </text>

            {/* Stanchion Approach Lights on the field */}
            <circle cx="250" cy="175" r="4" fill="#fbbf24" />
            <circle cx="310" cy="175" r="4" fill="#fbbf24" />
            <circle cx="370" cy="175" r="4" fill="#fbbf24" />
            <text x="310" y="192" fill="#fbbf24" fontSize="8" textAnchor="middle">
              Approach Light Towers
            </text>

            {/* HATTON CROSS TUBE STATION CALLOUT (East) */}
            <g transform="translate(730, 70)">
              <rect x="0" y="0" width="150" height="65" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" rx="6" />
              <text x="75" y="22" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">
                🚇 Hatton Cross
              </text>
              <text x="75" y="38" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">
                Piccadilly Line Tube
              </text>
              <text x="75" y="52" fill="#94a3b8" fontSize="8" textAnchor="middle">
                6 min walk to Green
              </text>
            </g>

            {/* BP & M&S FOOD AMENITIES */}
            <g transform="translate(730, 240)">
              <rect x="0" y="0" width="150" height="55" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" rx="6" />
              <text x="75" y="20" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                ☕ BP Petrol & M&S
              </text>
              <text x="75" y="36" fill="#cbd5e1" fontSize="8" textAnchor="middle">
                Drinks, Snacks & WC
              </text>
              <text x="75" y="48" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
                Hatton Rd / Great S-West Rd
              </text>
            </g>

            {/* WALKING PATH FROM TUBE */}
            <path
              d="M 730 110 L 690 140 L 690 200"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="705" y="160" fill="#60a5fa" fontSize="7.5">
              Footpath
            </text>

            {/* INTERACTIVE SPOT PINS */}
            {/* Spot 1: Fence Corner */}
            <g
              onClick={() => setSelectedZoneId('fence')}
              className="cursor-pointer group"
              transform="translate(245, 150)"
            >
              <circle cx="0" cy="0" r={selectedZoneId === 'fence' ? 16 : 10} fill="#f59e0b" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="10" fill={selectedZoneId === 'fence' ? '#f59e0b' : '#334155'} stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="3.5" fill="#020617" fontSize="8" fontWeight="bold" textAnchor="middle">
                1
              </text>
              <text x="0" y="-14" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">
                Fence Corner
              </text>
            </g>

            {/* Spot 2: Centerline Meadow */}
            <g
              onClick={() => setSelectedZoneId('center')}
              className="cursor-pointer group"
              transform="translate(420, 205)"
            >
              <circle cx="0" cy="0" r={selectedZoneId === 'center' ? 16 : 10} fill="#f59e0b" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="10" fill={selectedZoneId === 'center' ? '#f59e0b' : '#334155'} stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="3.5" fill="#020617" fontSize="8" fontWeight="bold" textAnchor="middle">
                2
              </text>
              <text x="0" y="-14" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">
                Center Meadow
              </text>
            </g>

            {/* Spot 3: East Trees */}
            <g
              onClick={() => setSelectedZoneId('east')}
              className="cursor-pointer group"
              transform="translate(580, 240)"
            >
              <circle cx="0" cy="0" r={selectedZoneId === 'east' ? 16 : 10} fill="#f59e0b" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="10" fill={selectedZoneId === 'east' ? '#f59e0b' : '#334155'} stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="3.5" fill="#020617" fontSize="8" fontWeight="bold" textAnchor="middle">
                3
              </text>
              <text x="0" y="-14" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">
                East Benches
              </text>
            </g>
          </svg>
        </div>

        {/* Selected Zone Deep Dive Card */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400 font-semibold uppercase">
                Vantage Point Analysis
              </span>
              <h3 className="text-base font-bold text-slate-100">{selectedZone.name}</h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">
                Altitude: <strong className="text-emerald-400">{selectedZone.altitudeAgl}</strong>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">
                Lens: <strong className="text-amber-300">{selectedZone.lensGuide}</strong>
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            {selectedZone.description}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Recommended Light:</span>
            <span>{selectedZone.bestTime}</span>
          </div>
        </div>
      </div>

      {/* Practical Spotter Etiquette & Vital Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tip 1: Parking & Transport */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Strict Parking Rules</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Do not park on Myrtle Avenue!</strong> The entire street is a strict Controlled Parking Zone (CPZ) for local residents only. Traffic wardens patrol frequently and issue harsh fines.
          </p>
          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            💡 <strong>Best Option:</strong> Take the London Underground Piccadilly Line to <strong>Hatton Cross Station</strong>. It is a scenic 6-minute flat walk to the green.
          </div>
        </div>

        {/* Tip 2: Stepladders & Courtesy */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
            <Camera className="w-4 h-4 shrink-0" />
            <span>Field & Ladder Etiquette</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Spotters frequently bring small 2-3 step aluminum ladders to peer over the fence line. Always ensure your ladder doesn&apos;t obstruct other photographers behind you, and never climb onto the perimeter security fence.
          </p>
          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            🌳 <strong>Community rule:</strong> Take all litter with you. Keep the green pristine for fellow spotters and local residents.
          </div>
        </div>

        {/* Tip 3: Amenities & Food */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
            <Coffee className="w-4 h-4 shrink-0" />
            <span>Food, Coffee & Toilets</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            There are no restrooms on the field itself. Just 5 minutes away on the walk from Hatton Cross is the BP Service Station with an M&amp;S Simply Food, hot coffee machines, and customer toilets.
          </p>
          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            ☕ <strong>Tip:</strong> Pick up hot drinks and meal deals at Hatton Cross before settling in for afternoon heavies!
          </div>
        </div>
      </div>
    </div>
  );
};
