/**
 * Heathrow EGLL 27L Myrtle Avenue Flight Corridor Simulation
 * Simulates real-time ADS-B transponder data along the 27L ILS localizer.
 */

import { Flight, HeathrowOperations, SpottingLogEntry } from '../types/aviation';

// Myrtle Avenue reference coordinate & 27L threshold
export const MYRTLE_COORDINATES = {
  lat: 51.4688,
  lng: -0.4285,
  name: 'Myrtle Avenue Green, Feltham',
  elevationFt: 75,
};

export const RUNWAY_27L_THRESHOLD = {
  lat: 51.4650,
  lng: -0.4240,
  headingDeg: 272,
  lengthM: 3660,
};

export const INITIAL_FLIGHT_CATALOG: Omit<Flight, 'id' | 'distanceNM' | 'altitudeFt' | 'speedKts' | 'lat' | 'lng' | 'heading' | 'status' | 'etaSeconds'>[] = [
  {
    flightNumber: 'EK001',
    callsign: 'Emirates 1 Heavy',
    airline: 'Emirates',
    airlineIcao: 'UAE',
    aircraftType: 'Airbus A380-800',
    icaoType: 'A388',
    wakeCategory: 'Super',
    registration: 'A6-EVS',
    liveryNote: 'Museum of the Future Livery',
    origin: { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates' },
  },
  {
    flightNumber: 'BA117',
    callsign: 'Speedbird 117 Heavy',
    airline: 'British Airways',
    airlineIcao: 'BAW',
    aircraftType: 'Airbus A350-1000',
    icaoType: 'A35K',
    wakeCategory: 'Heavy',
    registration: 'G-XWBA',
    liveryNote: 'Club Suite Flagship',
    origin: { code: 'JFK', city: 'New York', country: 'United States' },
  },
  {
    flightNumber: 'VS3',
    callsign: 'Virgin 3 Heavy',
    airline: 'Virgin Atlantic',
    airlineIcao: 'VIR',
    aircraftType: 'Airbus A350-1000',
    icaoType: 'A35K',
    wakeCategory: 'Heavy',
    registration: 'G-VJAM',
    liveryNote: 'Queen of the Skies / Flying Icon',
    origin: { code: 'JFK', city: 'New York', country: 'United States' },
  },
  {
    flightNumber: 'SQ318',
    callsign: 'Singapore 318 Heavy',
    airline: 'Singapore Airlines',
    airlineIcao: 'SIA',
    aircraftType: 'Airbus A380-800',
    icaoType: 'A388',
    wakeCategory: 'Super',
    registration: '9V-SKV',
    liveryNote: 'First Class Suites Configuration',
    origin: { code: 'SIN', city: 'Singapore', country: 'Singapore' },
  },
  {
    flightNumber: 'BA178',
    callsign: 'Speedbird 178 Heavy',
    airline: 'British Airways',
    airlineIcao: 'BAW',
    aircraftType: 'Boeing 777-300ER',
    icaoType: 'B77W',
    wakeCategory: 'Heavy',
    registration: 'G-STBG',
    liveryNote: 'Standard Union Flag Livery',
    origin: { code: 'BOS', city: 'Boston', country: 'United States' },
  },
  {
    flightNumber: 'QR007',
    callsign: 'Qatari 7 Heavy',
    airline: 'Qatar Airways',
    airlineIcao: 'QTR',
    aircraftType: 'Boeing 777-300ER',
    icaoType: 'B77W',
    wakeCategory: 'Heavy',
    registration: 'A7-BEB',
    liveryNote: 'Oryx Special Livery',
    origin: { code: 'DOH', city: 'Doha', country: 'Qatar' },
  },
  {
    flightNumber: 'NH211',
    callsign: 'All Nippon 211 Heavy',
    airline: 'All Nippon Airways',
    airlineIcao: 'ANA',
    aircraftType: 'Boeing 777-300ER',
    icaoType: 'B77W',
    wakeCategory: 'Heavy',
    registration: 'JA795A',
    liveryNote: 'THE Room & THE Suite Flagship',
    origin: { code: 'HND', city: 'Tokyo Haneda', country: 'Japan' },
  },
  {
    flightNumber: 'AA100',
    callsign: 'American 100 Heavy',
    airline: 'American Airlines',
    airlineIcao: 'AAL',
    aircraftType: 'Boeing 787-9 Dreamliner',
    icaoType: 'B789',
    wakeCategory: 'Heavy',
    registration: 'N834AA',
    liveryNote: 'Silver Eagle Flagship',
    origin: { code: 'JFK', city: 'New York', country: 'United States' },
  },
  {
    flightNumber: 'BA198',
    callsign: 'Speedbird 198 Heavy',
    airline: 'British Airways',
    airlineIcao: 'BAW',
    aircraftType: 'Boeing 787-10 Dreamliner',
    icaoType: 'B78X',
    wakeCategory: 'Heavy',
    registration: 'G-ZBLA',
    liveryNote: 'Longest Dreamliner Variant',
    origin: { code: 'BOM', city: 'Mumbai', country: 'India' },
  },
  {
    flightNumber: 'DL1',
    callsign: 'Delta 1 Heavy',
    airline: 'Delta Air Lines',
    airlineIcao: 'DAL',
    aircraftType: 'Airbus A330-900neo',
    icaoType: 'A339',
    wakeCategory: 'Heavy',
    registration: 'N401DZ',
    liveryNote: 'Delta One Suite Neo',
    origin: { code: 'JFK', city: 'New York', country: 'United States' },
  },
  {
    flightNumber: 'LH910',
    callsign: 'Lufthansa 910',
    airline: 'Lufthansa',
    airlineIcao: 'DLH',
    aircraftType: 'Airbus A320neo',
    icaoType: 'A20N',
    wakeCategory: 'Medium',
    registration: 'D-AINO',
    liveryNote: 'Deep Blue Crane Livery',
    origin: { code: 'FRA', city: 'Frankfurt', country: 'Germany' },
  },
  {
    flightNumber: 'BA493',
    callsign: 'Speedbird 493',
    airline: 'British Airways',
    airlineIcao: 'BAW',
    aircraftType: 'Airbus A321neo',
    icaoType: 'A21N',
    wakeCategory: 'Medium',
    registration: 'G-NEOP',
    liveryNote: 'Sharklets Eco-Flight',
    origin: { code: 'GVA', city: 'Geneva', country: 'Switzerland' },
  },
  {
    flightNumber: 'EK029',
    callsign: 'Emirates 29 Heavy',
    airline: 'Emirates',
    airlineIcao: 'UAE',
    aircraftType: 'Airbus A380-800',
    icaoType: 'A388',
    wakeCategory: 'Super',
    registration: 'A6-EOQ',
    liveryNote: 'Journey of the Future Expo Livery',
    origin: { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates' },
  },
];

/**
 * Calculates realistic coordinates along the ILS 27L extended centerline
 * Runway 27L magnetic heading is ~272°. Planes approach from the East heading West.
 * Bearing towards threshold from inbound plane is ~272°.
 */
export function calculateCoordinates(distanceNM: number): { lat: number; lng: number } {
  // 1 NM latitude delta approx 1/60 deg, longitude delta approx 1/(60*cos(lat))
  // Bearing 272° means vector is almost purely eastward along longitude
  const latOffset = (distanceNM * Math.sin((92 * Math.PI) / 180)) * 0.002;
  const lngOffset = (distanceNM * Math.cos((2 * Math.PI) / 180)) * 0.027;

  return {
    lat: RUNWAY_27L_THRESHOLD.lat - latOffset,
    lng: RUNWAY_27L_THRESHOLD.lng + lngOffset,
  };
}

/**
 * Generates an initial queue of realistic staggered arrivals along ILS 27L
 */
export function generateInitialFlightQueue(): Flight[] {
  // Stagger flights from 0.4 NM (about to cross Myrtle Ave!) up to 14 NM
  const distances = [0.35, 1.8, 3.6, 5.5, 7.8, 10.2, 12.8, 15.5];

  return distances.map((dist, idx) => {
    const template = INITIAL_FLIGHT_CATALOG[idx % INITIAL_FLIGHT_CATALOG.length];
    const speedKts = template.wakeCategory === 'Super' ? 148 : template.wakeCategory === 'Heavy' ? 152 : 140;
    
    // 3.0° ILS glide slope: 318 ft per NM + 50 ft threshold height
    const altitudeFt = Math.round(dist * 318 + 50);
    const coords = calculateCoordinates(dist);
    const etaSeconds = Math.round((dist / speedKts) * 3600);

    let status: Flight['status'] = 'Inbound';
    if (dist <= 0.4) {
      status = 'Overhead Myrtle Ave';
    } else if (dist <= 1.2) {
      status = 'Short Final';
    }

    return {
      id: `flt-${Date.now()}-${idx}`,
      ...template,
      distanceNM: Number(dist.toFixed(2)),
      altitudeFt,
      speedKts,
      heading: 272,
      lat: coords.lat,
      lng: coords.lng,
      status,
      etaSeconds,
    };
  });
}

/**
 * Advance flights by delta seconds (e.g. 1.0 second per tick)
 */
export function advanceFlightQueue(flights: Flight[], deltaSeconds: number, speedMultiplier: number = 1): { updatedFlights: Flight[]; overheadFlight: Flight | null } {
  const effectiveSeconds = deltaSeconds * speedMultiplier;
  let overheadFlight: Flight | null = null;

  const nextFlights: Flight[] = [];

  for (const flight of flights) {
    const distanceTraveledNM = (flight.speedKts / 3600) * effectiveSeconds;
    const newDistanceNM = flight.distanceNM - distanceTraveledNM;

    if (newDistanceNM <= -0.5) {
      // Landed and exited 27L runway onto taxiway Link A / B
      continue;
    }

    const altitudeFt = Math.max(0, Math.round(newDistanceNM * 318 + 50));
    const coords = calculateCoordinates(Math.max(0, newDistanceNM));
    const etaSeconds = Math.max(0, Math.round((newDistanceNM / flight.speedKts) * 3600));

    let status: Flight['status'] = flight.status;
    if (newDistanceNM <= 0.05 && newDistanceNM > -0.5) {
      status = 'Touchdown 27L';
    } else if (newDistanceNM <= 0.4 && newDistanceNM > 0.05) {
      if (flight.status !== 'Overhead Myrtle Ave') {
        overheadFlight = flight; // Just reached Myrtle Ave!
      }
      status = 'Overhead Myrtle Ave';
    } else if (newDistanceNM <= 1.5) {
      status = 'Short Final';
    } else {
      status = 'Inbound';
    }

    nextFlights.push({
      ...flight,
      distanceNM: Number(newDistanceNM.toFixed(2)),
      altitudeFt,
      lat: coords.lat,
      lng: coords.lng,
      status,
      etaSeconds,
    });
  }

  // Refill queue if flights have landed (maintain at least 7 active arrivals on the ILS)
  if (nextFlights.length < 8) {
    const maxDist = Math.max(...nextFlights.map((f) => f.distanceNM), 10);
    const spawnDist = maxDist + 2.2 + Math.random() * 1.5;
    const randomTemplate = INITIAL_FLIGHT_CATALOG[Math.floor(Math.random() * INITIAL_FLIGHT_CATALOG.length)];
    const speedKts = randomTemplate.wakeCategory === 'Super' ? 148 : randomTemplate.wakeCategory === 'Heavy' ? 152 : 142;

    const newFlight: Flight = {
      id: `flt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...randomTemplate,
      distanceNM: Number(spawnDist.toFixed(2)),
      altitudeFt: Math.round(spawnDist * 318 + 50),
      speedKts,
      heading: 272,
      lat: calculateCoordinates(spawnDist).lat,
      lng: calculateCoordinates(spawnDist).lng,
      status: 'Inbound',
      etaSeconds: Math.round((spawnDist / speedKts) * 3600),
    };

    nextFlights.push(newFlight);
  }

  // Sort by closest to threshold
  nextFlights.sort((a, b) => a.distanceNM - b.distanceNM);

  return { updatedFlights: nextFlights, overheadFlight };
}

/**
 * Calculates current Heathrow operations based on time of day:
 * Standard Heathrow Alternation:
 * - Westerly operations: Winds from ~250°-290° (~70% of days)
 *   - Morning to 15:00: 27L Arrivals (Myrtle Ave is PRIME SPOT!), 27R Departures.
 *   - 15:00 to 06:00: 27R Arrivals, 27L Departures (Switches at 15:00 UTC/local!).
 */
export function getHeathrowOperations(): HeathrowOperations {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSeconds = now.getSeconds();

  // 15:00 runway switchover calculation
  let switchHour = 15;
  if (currentHour >= 15) {
    switchHour = 24 + 6; // next morning 06:00
  }
  const totalSecondsNow = currentHour * 3600 + currentMinute * 60 + currentSeconds;
  const targetSeconds = 15 * 3600;
  let switchCountdownSeconds = targetSeconds - totalSecondsNow;
  if (switchCountdownSeconds <= 0) {
    switchCountdownSeconds = (24 * 3600 - totalSecondsNow) + 6 * 3600;
  }

  const isPre1500 = currentHour < 15;
  const mode = isPre1500 ? 'WESTERLY_27L' : 'WESTERLY_27R';
  const landingRunway = isPre1500 ? '27L' : '27R';
  const departingRunway = isPre1500 ? '27R' : '27L';
  const myrtleStatus = isPre1500 ? 'DIRECT_OVERHEAD' : 'OFF_AXIS_PARALLEL';

  // Sun calculation relative to Runway 27L axis (272°)
  // London solar azimuth varies ~120° (morning) to 250° (afternoon) to 280° (golden hour)
  const hourRatio = (currentHour + currentMinute / 60) / 24;
  const sunAzimuthDeg = Math.round(80 + hourRatio * 200);
  const sunElevationDeg = Math.max(5, Math.round(Math.sin((hourRatio - 0.25) * Math.PI * 2) * 55));

  let lightingQuality = 'Optimal Light';
  let lightingDescription = 'Crisp side lighting highlighting fuselage livery and registration';
  if (currentHour >= 16 && currentHour <= 20) {
    lightingQuality = 'Golden Hour Peak';
    lightingDescription = 'Warm amber sunset glow illuminating underside and port engines';
  } else if (currentHour >= 11 && currentHour <= 14) {
    lightingQuality = 'Direct Overhead';
    lightingDescription = 'High sun angle; ideal for wingtip belly passes and dark shadows';
  } else if (currentHour < 10) {
    lightingQuality = 'Morning Soft Light';
    lightingDescription = 'Starboard illumination with long soft shadows';
  }

  return {
    mode,
    landingRunway,
    departingRunway,
    myrtleStatus,
    switchCountdownSeconds,
    windHeadingDeg: 260,
    windSpeedKts: 14,
    windGustKts: 20,
    visibilityKm: 10,
    qnhHpa: 1018,
    tempC: 16,
    dewpointC: 8,
    sunAzimuthDeg,
    sunElevationDeg,
    lightingQuality,
    lightingDescription,
  };
}

/**
 * Pre-seeded sample spotting logbook entries
 */
export const SAMPLE_SPOT_LOG: SpottingLogEntry[] = [
  {
    id: 'spot-1',
    timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    flightNumber: 'EK001',
    callsign: 'Emirates 1 Heavy',
    airline: 'Emirates',
    aircraftType: 'Airbus A380-800',
    icaoType: 'A388',
    registration: 'A6-EVS',
    origin: 'DXB (Dubai)',
    wakeCategory: 'Super',
    focalLengthUsed: 70,
    photoRating: 5,
    tags: ['Super Heavy', 'Golden Hour', 'Direct Overhead'],
    notes: 'Roared right over the Myrtle Avenue fence at ~170ft! Perfect gear-down shot with tire smoke visible down the piano keys.',
  },
  {
    id: 'spot-2',
    timestamp: new Date(Date.now() - 3600000 * 4.2).toISOString(),
    flightNumber: 'BA117',
    callsign: 'Speedbird 117 Heavy',
    airline: 'British Airways',
    aircraftType: 'Airbus A350-1000',
    icaoType: 'A35K',
    registration: 'G-XWBA',
    origin: 'JFK (New York)',
    wakeCategory: 'Heavy',
    focalLengthUsed: 50,
    photoRating: 5,
    tags: ['A350-1000', 'Flagship', 'Sharp Wingtips'],
    notes: 'Rolls-Royce Trent XWB engine spool sound is sensational. Curved winglets framed perfectly against the afternoon cloud deck.',
  },
  {
    id: 'spot-3',
    timestamp: new Date(Date.now() - 3600000 * 5.8).toISOString(),
    flightNumber: 'VS3',
    callsign: 'Virgin 3 Heavy',
    airline: 'Virgin Atlantic',
    aircraftType: 'Airbus A350-1000',
    icaoType: 'A35K',
    registration: 'G-VJAM',
    origin: 'JFK (New York)',
    wakeCategory: 'Heavy',
    focalLengthUsed: 85,
    photoRating: 4,
    tags: ['Virgin Atlantic', 'Flying Icon', 'Heavy'],
    notes: 'Deep scarlet metallic wingtips. Captured 3/4 port profile as it crossed Hatton Road.',
  },
];
