import React, { useState, useEffect, useRef } from 'react';
import { Flight, SpottingLogEntry } from './types/aviation';
import {
  generateInitialFlightQueue,
  advanceFlightQueue,
  INITIAL_FLIGHT_CATALOG,
  calculateCoordinates,
  SAMPLE_SPOT_LOG,
} from './utils/flightSimulation';
import { getAudioState, setAudioMuted, playJetFlyover } from './utils/audio';

import { TopBar } from './components/TopBar';
import { OverheadBanner } from './components/OverheadBanner';
import { RadarScope } from './components/RadarScope';
import { ApproachQueue } from './components/ApproachQueue';
import { SpotterMap } from './components/SpotterMap';
import { CameraSimulator } from './components/CameraSimulator';
import { RunwayAlternation } from './components/RunwayAlternation';
import { SpotterLogbook } from './components/SpotterLogbook';
import { AtcScanner } from './components/AtcScanner';
import { SunGoldenHourBox } from './components/SunGoldenHourBox';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('radar');
  const [flights, setFlights] = useState<Flight[]>(() => generateInitialFlightQueue());
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [overheadFlight, setOverheadFlight] = useState<Flight | null>(null);

  // Audio state
  const [isMuted, setIsMutedState] = useState<boolean>(true); // Start muted by default to respect browser autoplay

  // Spotter Logbook with LocalStorage
  const [logEntries, setLogEntries] = useState<SpottingLogEntry[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('myrtle_avenue_spot_log');
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return SAMPLE_SPOT_LOG;
  });

  const [prefillFlight, setPrefillFlight] = useState<Flight | null>(null);

  // Save logbook to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('myrtle_avenue_spot_log', JSON.stringify(logEntries));
    } catch {
      // Ignored
    }
  }, [logEntries]);

  // Audio toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMutedState(nextMuted);
    setAudioMuted(nextMuted);
    if (!nextMuted) {
      // Play a quick test burst so user knows audio context unlocked
      playJetFlyover('Medium');
    }
  };

  // Simulation loop tick
  const simSpeedRef = useRef(simSpeed);
  simSpeedRef.current = simSpeed;
  const isSimulatingRef = useRef(isSimulating);
  isSimulatingRef.current = isSimulating;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSimulatingRef.current) return;

      setFlights((currentFlights) => {
        const { updatedFlights, overheadFlight: justCrossed } = advanceFlightQueue(
          currentFlights,
          1.0,
          simSpeedRef.current
        );

        if (justCrossed) {
          setOverheadFlight(justCrossed);
          // Play engine flyover sound
          playJetFlyover(justCrossed.wakeCategory);
        }

        return updatedFlights;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Quick Action: Spool A380 Super Heavy on Short Final (0.8 NM out)
  const handleTriggerHeavyArrival = () => {
    const a380Template = INITIAL_FLIGHT_CATALOG[0]; // Emirates A380 A6-EVS
    const dist = 0.85; // 0.85 NM is ~22 seconds from Myrtle Ave!
    const coords = calculateCoordinates(dist);

    const urgentFlight: Flight = {
      id: `urgent-a380-${Date.now()}`,
      ...a380Template,
      distanceNM: dist,
      altitudeFt: Math.round(dist * 318 + 50),
      speedKts: 148,
      heading: 272,
      lat: coords.lat,
      lng: coords.lng,
      status: 'Short Final',
      etaSeconds: Math.round((dist / 148) * 3600),
    };

    setFlights((prev) => [urgentFlight, ...prev]);
    setSelectedFlightId(urgentFlight.id);
    setActiveTab('radar');
  };

  // Action: Open log modal with flight prefilled
  const handleLogFlight = (flight: Flight) => {
    setPrefillFlight(flight);
    setActiveTab('logbook');
  };

  // Add sighting to logbook
  const handleAddLogEntry = (entry: SpottingLogEntry) => {
    setLogEntries((prev) => [entry, ...prev]);
  };

  // Delete sighting from logbook
  const handleDeleteLogEntry = (id: string) => {
    setLogEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // Dismiss overhead banner
  const handleDismissOverhead = () => {
    setOverheadFlight(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Bar Header */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onQuickLog={() => {
          setPrefillFlight(overheadFlight || (flights.length > 0 ? flights[0] : null));
          setActiveTab('logbook');
        }}
        overheadActive={Boolean(overheadFlight)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Overhead Alert Banner (shows when an aircraft is passing at ~160ft!) */}
        {overheadFlight && (
          <OverheadBanner
            flight={overheadFlight}
            onLogFlight={handleLogFlight}
            onDismiss={handleDismissOverhead}
          />
        )}

        {/* Tab 1: Radar & Queue (Main Dashboard) */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            {/* Split layout: Radar Scope & Right Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Radar on left/top */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-4">
                <RadarScope
                  flights={flights}
                  selectedFlightId={selectedFlightId}
                  onSelectFlight={setSelectedFlightId}
                  onLogFlight={handleLogFlight}
                />
              </div>

              {/* Right Column: Sun Position & Golden Hour Calculator + Photo spotlight */}
              <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4">
                {/* Helpful Sun Position & Golden Hour Calculator Info Box */}
                <SunGoldenHourBox />

                {/* Photo spotlight & perspective overview */}
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src="/src/assets/images/myrtle_avenue_hero_1794361648557.jpg"
                      alt="British Airways A350-1000 over Myrtle Avenue grass"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-3.5 bg-slate-900 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-1">
                      <span>Threshold 27L Approach View</span>
                      <span className="text-slate-400">~160 ft AGL</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">
                      Myrtle Avenue Field Perspective
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Westerly 27L arrivals descend directly above the boundary fence at ~148 knots. Superjumbos like the A380 span 79.8m across the field.
                    </p>
                  </div>
                </div>

                {/* Live Field Metric Strip */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Runway in Use</span>
                    <span className="text-slate-100 font-bold text-sm">27L (Westerly)</span>
                    <span className="text-emerald-400 text-[10px] block">Prime Overhead</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Next Overhead</span>
                    <span className="text-amber-400 font-bold text-sm">
                      {flights.length > 0 ? `${flights[0].etaSeconds}s` : 'Sequencing'}
                    </span>
                    <span className="text-slate-400 text-[10px] block truncate">
                      {flights.length > 0 ? `${flights[0].airline} ${flights[0].flightNumber}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Approach Queue Table */}
            <ApproachQueue
              flights={flights}
              isSimulating={isSimulating}
              onToggleSim={() => setIsSimulating(!isSimulating)}
              simSpeed={simSpeed}
              onSetSimSpeed={setSimSpeed}
              onTriggerHeavyArrival={handleTriggerHeavyArrival}
              onSelectFlight={setSelectedFlightId}
              selectedFlightId={selectedFlightId}
              onLogFlight={handleLogFlight}
            />
          </div>
        )}

        {/* Tab 2: Spotter Field Map */}
        {activeTab === 'map' && <SpotterMap />}

        {/* Tab 3: Camera Simulator & Viewfinder */}
        {activeTab === 'viewfinder' && <CameraSimulator />}

        {/* Tab 4: Runway Alternation & Sun Tracker */}
        {activeTab === 'runway' && <RunwayAlternation />}

        {/* Tab 5: Personal Logbook */}
        {activeTab === 'logbook' && (
          <SpotterLogbook
            entries={logEntries}
            onAddEntry={handleAddLogEntry}
            onDeleteEntry={handleDeleteLogEntry}
            prefillFlight={prefillFlight}
            onClearPrefill={() => setPrefillFlight(null)}
          />
        )}

        {/* Tab 6: ATC Scanner */}
        {activeTab === 'atc' && <AtcScanner />}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Myrtle Avenue Spotter Hub</span>
            <span aria-hidden="true">·</span>
            <span>Heathrow Airport (EGLL / LHR)</span>
            <span aria-hidden="true">·</span>
            <span>Runway 27L Approach</span>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            Hatton Cross · TW14 9QU · Dedicated to Aviation Photographers Worldwide
          </div>
        </div>
      </footer>
    </div>
  );
}
