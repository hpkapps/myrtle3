import React, { useState, useEffect, useRef } from 'react';
import { Flight } from './types/aviation';
import {
  generateInitialFlightQueue,
  advanceFlightQueue,
  INITIAL_FLIGHT_CATALOG,
  calculateCoordinates,
} from './utils/flightSimulation';

import { TopBar } from './components/TopBar';
import { LiveRunwayStatus, SimulatedRunwayMode } from './components/LiveRunwayStatus';
import { HeavyArrivalsFeed } from './components/HeavyArrivalsFeed';
import { AlternativeSpots } from './components/AlternativeSpots';
import { CreatorGuide } from './components/CreatorGuide';
import { VisitorTransitGuide } from './components/VisitorTransitGuide';
import { VisitorChecklist } from './components/VisitorChecklist';
import { SunGoldenHourBox } from './components/SunGoldenHourBox';
import { RadarScope } from './components/RadarScope';
import { OfficialSchedule2026 } from './components/OfficialSchedule2026';
import { getScheduleForDate } from './utils/heathrowSchedule2026';
import { ArrowRight, Sparkles, MapPin, Camera, Clock, Calendar, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('status');
  const [flights, setFlights] = useState<Flight[]>(() => generateInitialFlightQueue());
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);

  // Simulation mode for runway status (AUTO follows real time, or force 27L/27R/09R)
  const [simulatedMode, setSimulatedMode] = useState<SimulatedRunwayMode>('AUTO');

  // Real clock state
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  // 15:00 switch countdown in seconds
  const totalSecondsNow = currentHour * 3600 + currentMinute * 60 + currentSeconds;
  const targetSwitchSeconds = 15 * 3600;
  let countdownSeconds = targetSwitchSeconds - totalSecondsNow;
  if (countdownSeconds <= 0) {
    // Next morning at 06:00 or tomorrow at 15:00
    countdownSeconds = 24 * 3600 - totalSecondsNow + 6 * 3600;
  }

  // Official 2026 schedule for today's week
  const todaySchedule = getScheduleForDate(currentTime);

  // Determine if planes are currently landing here at Myrtle Ave based on 2026 programme
  const isLandingHere =
    simulatedMode === 'FORCE_27L_LANDING' ||
    (simulatedMode === 'AUTO' && todaySchedule.activeRunwayNow === '27L');

  // Simulation loop tick for aircraft approach queue
  const simSpeedRef = useRef(simSpeed);
  simSpeedRef.current = simSpeed;
  const isSimulatingRef = useRef(isSimulating);
  isSimulatingRef.current = isSimulating;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSimulatingRef.current) return;

      setFlights((currentFlights) => {
        const { updatedFlights } = advanceFlightQueue(
          currentFlights,
          1.0,
          simSpeedRef.current
        );
        return updatedFlights;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Action: Spool an Emirates A380 Superjumbo on short final (0.8 NM / 22s out)
  const handleTriggerA380 = () => {
    const a380Template = INITIAL_FLIGHT_CATALOG[0]; // Emirates A380 A6-EVS
    const dist = 0.85;
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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Bar Header */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isLandingHere={isLandingHere}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Tab 1: Live Status & Heavies Feed (The Main Visitor Dashboard) */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            {/* Hero Feature: Are Planes Landing Here Right Now? */}
            <LiveRunwayStatus
              currentHour={currentHour}
              currentMinute={currentMinute}
              simulatedMode={simulatedMode}
              onSetSimulatedMode={setSimulatedMode}
              onNavigateToAlternativeSpots={() => setActiveTab('spots')}
              onNavigateToCalendar={() => setActiveTab('calendar')}
              countdownSeconds={countdownSeconds}
            />

            {/* Inbound Heavies Countdown Feed */}
            <HeavyArrivalsFeed
              flights={flights}
              onTriggerA380={handleTriggerA380}
            />

            {/* Quick Visitor Assistance 4-Column Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Official 2026 Alternation Calendar */}
              <div
                onClick={() => setActiveTab('calendar')}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Official 2026</span>
                    </span>
                    <span className="text-slate-400">{todaySchedule.schedule.displayDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    2026 Alternation Calendar
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Check which weeks have morning vs afternoon arrivals at Myrtle Avenue from Heathrow&apos;s official plan.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>View 52-Week Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 2: 3 PM Switch Explanation */}
              <div
                onClick={() => setActiveTab('spots')}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all group flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Heathrow Rule</span>
                    </span>
                    <span className="text-slate-400">15:00 Daily</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                    The 3:00 PM Runway Switch
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Planes switch to the North Runway (27R) at 3 PM. Find out where to walk or take the free bus to keep watching!
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>See Alternative Spots</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 3: Creator Phone Tips */}
              <div
                onClick={() => setActiveTab('creator')}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all group flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" />
                      <span>TikTok &amp; Reels</span>
                    </span>
                    <span className="text-emerald-400 font-bold">0.5x Mode</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                    Phone Camera Filming Guide
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    How to use 0.5x ultra-wide, 4K 60fps slow-motion, and lock exposure for the viral overhead flyover video.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>View Creator Presets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card 4: Tube & Parking Warning */}
              <div
                onClick={() => setActiveTab('transit')}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all group flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Transit Info</span>
                    </span>
                    <span className="text-rose-400 font-bold">No Parking</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                    Getting Here &amp; Tube Walk
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    6-minute flat walk from Hatton Cross Piccadilly Line tube. Why you should never try to park on Myrtle Avenue.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Walking Directions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Approach Radar Scope for visual spatial context */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                  Live Approach Radar (Runway 27L &amp; Myrtle Avenue)
                </span>
                <span className="text-xs text-slate-400">
                  Track planes sequencing into London Heathrow
                </span>
              </div>
              <RadarScope
                flights={flights}
                selectedFlightId={selectedFlightId}
                onSelectFlight={setSelectedFlightId}
                onLogFlight={() => setActiveTab('checklist')}
              />
            </div>
          </div>
        )}

        {/* Tab: Official 2026 Calendar */}
        {activeTab === 'calendar' && <OfficialSchedule2026 />}

        {/* Tab: 3 PM Switch & Alternative Viewing Spots */}
        {activeTab === 'spots' && <AlternativeSpots />}

        {/* Tab 3: Creator & TikTok Filming Guide */}
        {activeTab === 'creator' && <CreatorGuide />}

        {/* Tab 4: Golden Hour & Lighting Calculator */}
        {activeTab === 'golden' && (
          <div className="space-y-6">
            <SunGoldenHourBox />
          </div>
        )}

        {/* Tab 5: Getting Here & Travel Advice */}
        {activeTab === 'transit' && <VisitorTransitGuide />}

        {/* Tab 6: Visitor Checklist */}
        {activeTab === 'checklist' && <VisitorChecklist />}
      </main>

      {/* Quiet Clean Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Myrtle Avenue Visitor Guide</span>
            <span aria-hidden="true">·</span>
            <span>London Heathrow (EGLL)</span>
            <span aria-hidden="true">·</span>
            <span>Feltham TW14 9QU</span>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            Hatton Cross Piccadilly Line · Built for Visitors, Families &amp; Creators
          </div>
        </div>
      </footer>
    </div>
  );
}
