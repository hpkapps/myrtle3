import React from 'react';
import {
  MapPin,
  Bus,
  Footprints,
  Compass,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const AlternativeSpots: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner Explaining the 3 PM Switch */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>The Famous Heathrow 3:00 PM Runway Switch Explained</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Why did planes suddenly stop landing over Myrtle Avenue?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          If you arrive at Myrtle Avenue and see no planes landing directly overhead,{' '}
          <strong>you have not missed out</strong>! Heathrow operates two parallel runways and switches between them at <strong>exactly 3:00 PM every day</strong> under UK government noise-relief laws.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-emerald-400 block mb-1">
              Morning (06:00 to 15:00)
            </span>
            <span className="text-slate-300">
              Runway 27L is used for landings. <strong>Planes roar directly over Myrtle Avenue!</strong>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-rose-400 block mb-1">
              Afternoon (15:00 to 23:00)
            </span>
            <span className="text-slate-300">
              Landings switch to Runway 27R (1.4 miles to the north). <strong>See below for where to go!</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Alternative Spots Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Where to Go When Landings Move to the North (27R)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">All within 10–15 mins</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Option 1: Hatton Cross Roundabout (27R Approach) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                <span className="flex items-center gap-1">
                  <Footprints className="w-3.5 h-3.5" />
                  <span>14 min walk / 4 min bus</span>
                </span>
                <span className="text-emerald-400 font-bold">Recommended</span>
              </div>

              <h4 className="text-base font-bold text-slate-100">
                1. Northern Perimeter / Hatton Cross North (27R)
              </h4>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Walk north past Hatton Cross station onto the Great South-West Road / Northern Perimeter. There is a wide public pedestrian pavement directly under the approach path to Runway 27R.
              </p>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-400">
                <div>🚌 <strong>Free Bus:</strong> Bus 285 or 423 from Hatton Cross</div>
                <div>📍 <strong>Stop:</strong> Envoy Avenue or Newport Road</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              📸 <strong>Photo view:</strong> 45-degree angle touchdown profile shots.
            </div>
          </div>

          {/* Option 2: Stay at Myrtle Avenue for 27L Takeoffs! */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>0 min (Stay on the Green)</span>
                </span>
                <span className="text-sky-400 font-bold">Earth-Shaking Roar</span>
              </div>

              <h4 className="text-base font-bold text-slate-100">
                2. Stay on Myrtle Avenue for 27L Departures
              </h4>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                When landings switch to 27R, <strong>Runway 27L becomes the active departure runway</strong>! Heavies line up right at the threshold fence, hold the brakes, and spool up full takeoff thrust.
              </p>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-400">
                <div>🔊 <strong>Sound:</strong> Deep sub-bass vibration in your chest</div>
                <div>👀 <strong>View:</strong> Rolling takeoff run and rotation</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              🎥 <strong>TikTok Tip:</strong> Film the massive heat haze exhaust shimmering off the tarmac!
            </div>
          </div>

          {/* Option 3: Terminal 4 / Terminal 5 Free Transit */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                <span className="flex items-center gap-1">
                  <Bus className="w-3.5 h-3.5" />
                  <span>8 min free tube ride</span>
                </span>
                <span className="text-purple-400 font-bold">Sheltered &amp; Food</span>
              </div>

              <h4 className="text-base font-bold text-slate-100">
                3. Terminal 4 Viewing Area (Hilton Walkway)
              </h4>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Hop on the Piccadilly Line at Hatton Cross towards Terminal 4 (free travel within the Heathrow airport free-fare zone). The covered glass skybridge to the Hilton has panoramic tarmac views.
              </p>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-400">
                <div>🚇 <strong>Transit:</strong> Free Piccadilly tube between terminals</div>
                <div>☕ <strong>Amenities:</strong> Warm indoor seating, cafés &amp; Wi-Fi</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              ☔ <strong>Rainy day tip:</strong> Completely dry indoor viewing.
            </div>
          </div>
        </div>
      </div>

      {/* Easterly Winds Takeoff Thunder Explanation */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>What about Easterly Winds? (Wind blowing towards the East)</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          On roughly 25–30% of days, prevailing winds blow from the east instead of the west. In easterly operations, aircraft take off on <strong>Runway 09R</strong>, climbing right directly over Myrtle Avenue at full power! If you visit on an easterly day, stand in the middle of the grass to watch 400-ton aircraft bank steeply over your head.
        </p>
      </div>
    </div>
  );
};
