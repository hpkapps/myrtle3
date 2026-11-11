/**
 * Aviation and planespotting data models for Myrtle Avenue (Heathrow EGLL / LHR)
 */

export type WakeCategory = 'Super' | 'Heavy' | 'Medium';

export interface Flight {
  id: string;
  flightNumber: string;
  callsign: string;
  airline: string;
  airlineIcao: string;
  aircraftType: string;
  icaoType: string;
  wakeCategory: WakeCategory;
  registration: string;
  liveryNote?: string;
  origin: {
    code: string;
    city: string;
    country: string;
  };
  distanceNM: number;       // Nautical miles to Myrtle Ave / 27L threshold
  altitudeFt: number;       // Altitude above ground level (Myrtle Ave is ~160ft AGL)
  speedKts: number;         // Groundspeed in knots
  heading: number;          // Magnetic heading
  lat: number;              // Latitude on approach corridor
  lng: number;              // Longitude on approach corridor
  status: 'Inbound' | 'Short Final' | 'Overhead Myrtle Ave' | 'Touchdown 27L' | 'Landed';
  etaSeconds: number;       // Seconds until overhead Myrtle Avenue
  spotted?: boolean;
}

export interface SpottingLogEntry {
  id: string;
  timestamp: string;
  flightNumber: string;
  callsign: string;
  airline: string;
  aircraftType: string;
  icaoType: string;
  registration: string;
  origin: string;
  wakeCategory: WakeCategory;
  focalLengthUsed: number;
  photoRating: number;      // 1 to 5
  tags: string[];
  notes: string;
  photoUrl?: string;
}

export type RunwayMode = 'WESTERLY_27L' | 'WESTERLY_27R' | 'EASTERLY_09R';

export interface HeathrowOperations {
  mode: RunwayMode;
  landingRunway: '27L' | '27R' | '09L';
  departingRunway: '27R' | '27L' | '09R';
  myrtleStatus: 'DIRECT_OVERHEAD' | 'OFF_AXIS_PARALLEL' | 'DEPARTURE_CLIMB';
  switchCountdownSeconds: number; // to 15:00 UTC/local
  windHeadingDeg: number;
  windSpeedKts: number;
  windGustKts?: number;
  visibilityKm: number;
  qnhHpa: number;
  tempC: number;
  dewpointC: number;
  sunAzimuthDeg: number;
  sunElevationDeg: number;
  lightingQuality: string;
  lightingDescription: string;
}

export interface AtcFrequency {
  facility: string;
  channel: string;
  mhz: string;
  role: string;
  typicalCallsign: string;
}
