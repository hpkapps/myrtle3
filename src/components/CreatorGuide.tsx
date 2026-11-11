import React, { useState } from 'react';
import { Camera, Smartphone, Sparkles, Video, Eye, CheckCircle2, AlertTriangle } from 'lucide-react';

export const CreatorGuide: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'ultrawide' | 'slowmo' | 'selfie'>('ultrawide');

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>TikTok, Reels &amp; iPhone/Android Filming Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          How to Film the Viral Myrtle Avenue Flyover
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Airliners pass over Myrtle Avenue at 170 mph (270 km/h) just 160 feet above the lawn. Here are the exact phone camera settings and standing positions used by creators to capture videos that get millions of views.
        </p>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setActivePreset('ultrawide')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activePreset === 'ultrawide'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            📸 0.5x Ultra-Wide Wingspan Shot
          </button>
          <button
            onClick={() => setActivePreset('slowmo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activePreset === 'slowmo'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🎥 4K 60fps &amp; Slow-Mo Video
          </button>
          <button
            onClick={() => setActivePreset('selfie')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activePreset === 'selfie'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🤳 The "Plane Right Behind Me" Frame
          </button>
        </div>
      </div>

      {/* Preset Details Card */}
      {activePreset === 'ultrawide' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Secret #1: Why Standard 1x Zoom Ruined Your Shot
            </span>
            <h3 className="text-xl font-bold text-slate-100">
              Always Switch to 0.5x Ultra-Wide Lens
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              An Airbus A380 has a staggering <strong>80-meter wingspan</strong>. At 160 feet altitude, its wingtips will completely spill outside a standard 1x camera frame.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Step 1:</strong> Open camera app, tap <strong>0.5x</strong> (ultra-wide).
                </span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Step 2:</strong> Hold phone low to the grass pointing slightly up at a 45-degree angle towards the airport fence.
                </span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Step 3:</strong> Keep the tree line in the bottom 25% of your frame for scale!
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-800 aspect-[4/3] bg-slate-950">
            <img
              src="/src/assets/images/myrtle_avenue_a380_1794361649655.jpg"
              alt="A380 wingspan over Myrtle Avenue"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {activePreset === 'slowmo' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Secret #2: High Frame Rates for 170 MPH Jets
            </span>
            <h3 className="text-xl font-bold text-slate-100">
              Record in 4K at 60fps or 120fps Slow-Mo
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Because landing aircraft move so fast, regular 30fps video blurs the winglets and only lasts ~2 seconds in frame. Recording at <strong>60fps</strong> or <strong>120fps slow-motion</strong> produces that dreamlike TikTok cinematic roar!
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                ⏱️ <strong>When to press record:</strong> Look east towards Bedfont / Feltham. The moment you spot the landing gear down emerging over the houses, hit record! (About 8 seconds before overhead).
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                ☀️ <strong>Overcast Skies Fix:</strong> Tap on the screen and drag the sun icon slightly <strong>UP (+0.5 exposure)</strong> so the plane doesn&apos;t turn into a dark silhouette against grey London clouds.
              </div>
            </div>
          </div>

          <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-800 aspect-[4/3] bg-slate-950">
            <img
              src="/src/assets/images/myrtle_avenue_hero_1794361648557.jpg"
              alt="Planespotting high speed flyover"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {activePreset === 'selfie' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Secret #3: The Viral "Giant Plane Above My Head" Framing
            </span>
            <h3 className="text-xl font-bold text-slate-100">
              Positioning for the Perfect Creator Shot
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To get the viral video where you are looking at the camera as a monster Emirates A380 or British Airways A350 roars right behind your head:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                📍 <strong>Stand at the Center Lawn:</strong> About 30 meters back from the corner fence.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                📐 <strong>Camera Angle:</strong> Have a friend crouch down with the phone at waist height pointing up at you.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                🔊 <strong>Sound:</strong> Don&apos;t cover your phone&apos;s bottom mic with your hands; the deep engine rumble in person is half the thrill of the video!
              </div>
            </div>
          </div>

          <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-800 aspect-[4/3] bg-slate-950">
            <img
              src="/src/assets/images/myrtle_avenue_spotters_1794361649892.jpg"
              alt="People taking photos on Myrtle Ave green"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* 3 Pro Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Clean Your Lenses</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Wipe your phone lens with your shirt before recording! Stray fingerprint grease creates ugly light flares across the plane&apos;s strobe lights.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
            <Video className="w-4 h-4 text-emerald-400" />
            <span>Lock Focus &amp; Exposure</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Long-press your phone screen where the plane will pass to lock AE/AF. This stops the camera hunting for focus when the plane zips past.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Beware of Jet Wash Wind</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            3 to 5 seconds after a heavy widebody passes, a noticeable gust of warm engine air wash blows across the grass. Hold onto your hats!
          </p>
        </div>
      </div>
    </div>
  );
};
