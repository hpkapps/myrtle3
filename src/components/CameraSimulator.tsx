import React, { useState } from 'react';
import { Camera, Sliders, Info, Eye, Layers } from 'lucide-react';

interface SensorFormat {
  id: string;
  name: string;
  cropFactor: number;
}

export const CameraSimulator: React.FC = () => {
  const [sensorId, setSensorId] = useState<string>('fullframe');
  const [focalLength, setFocalLength] = useState<number>(70);
  const [aircraftModel, setAircraftModel] = useState<string>('a380');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showAfPoints, setShowAfPoints] = useState<boolean>(true);

  const sensors: SensorFormat[] = [
    { id: 'fullframe', name: 'Full Frame (35mm)', cropFactor: 1.0 },
    { id: 'apsc', name: 'APS-C (Sony/Nikon/Fuji 1.5x)', cropFactor: 1.5 },
    { id: 'canon_apsc', name: 'Canon APS-C (1.6x)', cropFactor: 1.6 },
    { id: 'mft', name: 'Micro Four Thirds (2.0x)', cropFactor: 2.0 },
  ];

  const focalLengths = [24, 35, 50, 70, 85, 105, 135, 200, 300];

  const currentSensor = sensors.find((s) => s.id === sensorId) || sensors[0];
  const equivalentFocalLength = Math.round(focalLength * currentSensor.cropFactor);

  // Field of view calculation (horizontal degrees approx)
  const fovDegrees = Math.round(2 * Math.atan(36 / (2 * equivalentFocalLength)) * (180 / Math.PI));

  // Visual zoom scale factor relative to standard 35mm wide view (base 24mm = scale 1.0)
  const zoomScale = (equivalentFocalLength / 28) * 0.9;

  // Recommended camera exposure settings for Myrtle Avenue
  const shutterSpeed = focalLength > 100 ? '1/1600s' : '1/1250s';
  const aperture = equivalentFocalLength > 150 ? 'f/7.1' : 'f/6.3';
  const iso = 'ISO 200 (Overcast +0.7 EV)';

  // Choose appropriate image based on aircraft
  const selectedImage =
    aircraftModel === 'a380'
      ? '/src/assets/images/myrtle_avenue_a380_1794361649655.jpg'
      : '/src/assets/images/myrtle_avenue_hero_1794361648557.jpg';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wide">
            Spotter Optics & Viewfinder Simulator
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            Focal Length & Field-of-View Framing at 160 FT AGL
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Simulate how different camera lenses and sensor crop factors frame widebody airliners over Myrtle Avenue.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showGrid
                ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Grid 3x3
          </button>
          <button
            onClick={() => setShowAfPoints(!showAfPoints)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showAfPoints
                ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            AF Points
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Viewfinder Graphic Display */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          <div className="relative aspect-[3/2] w-full bg-black rounded-xl overflow-hidden border-2 border-slate-800 shadow-2xl">
            {/* Base Image with simulated optical zoom */}
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-slate-950">
              <img
                src={selectedImage}
                alt="Framed planespotting view at Myrtle Avenue"
                className="w-full h-full object-cover transition-transform duration-300 ease-out origin-center"
                style={{
                  transform: `scale(${Math.max(1, zoomScale)})`,
                }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Viewfinder Matte & Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-950/80 shadow-inner" />

            {/* Rule of Thirds Grid Overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-white/20" />
                <div className="border-r border-white/20" />
                <div />
              </div>
            )}

            {/* AF Sensor Points in Center Area */}
            {showAfPoints && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="relative w-44 h-32 border border-red-500/40 rounded">
                  {/* Center Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-red-500/80" />
                  {/* Surrounding AF points */}
                  <div className="absolute top-2 left-3 w-2.5 h-2.5 border border-red-500/60" />
                  <div className="absolute top-2 right-3 w-2.5 h-2.5 border border-red-500/60" />
                  <div className="absolute bottom-2 left-3 w-2.5 h-2.5 border border-red-500/60" />
                  <div className="absolute bottom-2 right-3 w-2.5 h-2.5 border border-red-500/60" />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 border border-red-500/60" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 border border-red-500/60" />
                </div>
              </div>
            )}

            {/* Viewfinder OSD Bottom Bar (Like professional DSLR/Mirrorless HUD) */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-950/90 border-t border-slate-800/80 px-4 flex items-center justify-between font-mono text-xs text-amber-400 select-none">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-100">{shutterSpeed}</span>
                <span>{aperture}</span>
                <span className="text-slate-300">{iso}</span>
              </div>

              {/* Exposure scale */}
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400">
                <span>-2</span>
                <span>·</span>
                <span>-1</span>
                <span>·</span>
                <span className="text-amber-400 font-bold">▲</span>
                <span>·</span>
                <span>+1</span>
                <span>·</span>
                <span>+2</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">{focalLength}mm</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">
                  (eq. {equivalentFocalLength}mm)
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded">
                  RAW
                </span>
              </div>
            </div>
          </div>

          {/* Quick Framing Guide Output */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs flex flex-wrap items-center justify-between gap-2">
            <span className="text-slate-300">
              Horizontal Field of View:{' '}
              <strong className="text-amber-400 font-mono">{fovDegrees}°</strong>
            </span>
            <span className="text-slate-400 font-mono">
              35mm Equivalent: <strong className="text-slate-200">{equivalentFocalLength}mm</strong>
            </span>
            <span className="text-emerald-400">
              {equivalentFocalLength <= 35
                ? 'Wide Environmental (Aircraft + Field + Houses)'
                : equivalentFocalLength <= 85
                ? 'Full Airframe Profile (Complete Wingspan)'
                : equivalentFocalLength <= 135
                ? 'Nose & Flight Deck Compression'
                : 'Tight Engines & Gear Nacelle Crop'}
            </span>
          </div>
        </div>

        {/* Right Column: Controls & Photographer Recommendations */}
        <div className="lg:col-span-4 space-y-4">
          {/* Lens Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Focal Length (mm)</span>
            </h3>

            <div className="grid grid-cols-3 gap-1.5">
              {focalLengths.map((fl) => (
                <button
                  key={fl}
                  onClick={() => setFocalLength(fl)}
                  className={`py-2 text-xs font-mono font-bold rounded-lg border transition-colors ${
                    focalLength === fl
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {fl}mm
                </button>
              ))}
            </div>

            {/* Slider */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                <span>24mm (Wide)</span>
                <span className="text-amber-400 font-bold">{focalLength}mm</span>
                <span>400mm (Tele)</span>
              </div>
              <input
                type="range"
                min="24"
                max="300"
                step="5"
                value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 cursor-pointer"
              />
            </div>
          </div>

          {/* Sensor Format */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Camera Sensor Body</span>
            </h3>

            <div className="space-y-1.5">
              {sensors.map((sensor) => (
                <button
                  key={sensor.id}
                  onClick={() => setSensorId(sensor.id)}
                  className={`w-full px-3 py-2 text-xs text-left rounded-lg border transition-colors flex items-center justify-between ${
                    sensorId === sensor.id
                      ? 'bg-slate-800 text-slate-100 border-amber-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="font-medium">{sensor.name}</span>
                  <span className="font-mono text-[11px] text-amber-400">
                    {sensor.cropFactor}x
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Aircraft Subject */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide mb-2">
              Aircraft Scale Model
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setAircraftModel('a380')}
                className={`py-2 px-3 rounded-lg border text-left transition-colors ${
                  aircraftModel === 'a380'
                    ? 'bg-slate-800 text-amber-400 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <div className="font-bold">Airbus A380</div>
                <div className="text-[10px] text-slate-400">79.8m Wingspan</div>
              </button>

              <button
                onClick={() => setAircraftModel('a350')}
                className={`py-2 px-3 rounded-lg border text-left transition-colors ${
                  aircraftModel === 'a350'
                    ? 'bg-slate-800 text-amber-400 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <div className="font-bold">Airbus A350-1000</div>
                <div className="text-[10px] text-slate-400">73.8m Length</div>
              </button>
            </div>
          </div>

          {/* Shutter Speed & Panning Tips */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Myrtle Avenue Pro Settings</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              • <strong>Shutter Speed:</strong> Keep at <strong>1/1250s – 1/1600s</strong> to eliminate motion blur on landing jets moving at ~150 knots.<br />
              • <strong>Aperture:</strong> Set to <strong>f/6.3 to f/8</strong> so the entire fuselage from nose to tailfin stays in sharp focus.<br />
              • <strong>Exposure Compensation:</strong> Dial in <strong>+0.7 to +1.0 EV</strong> when shooting against bright white London overcast skies to avoid underexposing the dark aircraft belly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
