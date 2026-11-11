/**
 * Astronomical Sun Position & Golden Hour Calculator for Myrtle Avenue
 * Coordinates: 51.4688° N, -0.4285° W (Feltham / London Heathrow EGLL)
 * Runway 27L Approach Heading: 272°
 */

export const MYRTLE_LAT = 51.4688;
export const MYRTLE_LNG = -0.4285;
export const RUNWAY_27L_HEADING = 272; // Magnetic/true runway heading

export interface GoldenHourTimes {
  date: Date;
  // Morning windows
  dawnCivil: Date;            // Sun at -6°
  sunrise: Date;              // Sun at -0.833°
  morningGoldenHourEnd: Date; // Sun at +6°
  // Solar Noon
  solarNoon: Date;
  maxSolarElevationDeg: number;
  // Evening windows
  afternoonSweetspotStart: Date; // Ideal side-lighting window
  eveningGoldenHourStart: Date; // Sun at +6°
  sunset: Date;                 // Sun at -0.833°
  duskCivil: Date;              // Sun at -6°
  // Current live values
  currentElevationDeg: number;
  currentAzimuthDeg: number;
  currentPhase: SunPhase;
  phaseLabel: string;
  lightingAdvice: string;
  lensTip: string;
  relativeRunwayAngleDeg: number; // Angle relative to 27L heading (272°)
  isCurrentlyGoldenHour: boolean;
}

export type SunPhase =
  | 'NIGHT'
  | 'DAWN_BLUE_HOUR'
  | 'MORNING_GOLDEN_HOUR'
  | 'DAY_RISING'
  | 'MIDDAY_HIGH'
  | 'AFTERNOON_SIDELIGHT'
  | 'EVENING_GOLDEN_HOUR'
  | 'DUSK_BLUE_HOUR';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

/**
 * Calculates day of year (1-366)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime() + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Calculates solar position and golden hour windows for Myrtle Avenue on a given date
 */
export function calculateMyrtleSun(targetDate: Date = new Date()): GoldenHourTimes {
  const year = targetDate.getFullYear();
  const dayOfYear = getDayOfYear(targetDate);

  // Fractional year in radians
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);

  // Equation of time in minutes
  const eqTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  // Solar declination angle in radians
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const phi = MYRTLE_LAT * DEG2RAD;

  // Timezone offset for target date in minutes (e.g. London GMT is 0, BST is -60)
  // targetDate.getTimezoneOffset() returns minutes *behind* UTC, so UTC+1 (BST) returns -60.
  const tzOffsetMinutes = -targetDate.getTimezoneOffset();

  // Solar noon in minutes from midnight local time
  const solarNoonMinutes = 720 - 4 * MYRTLE_LNG - eqTime + tzOffsetMinutes;

  // Helper to calculate hour angle in degrees for given solar zenith/elevation
  // elevation = 90 - zenith
  const getHourAngleDeg = (elevationDeg: number): number | null => {
    const sinElevation = Math.sin(elevationDeg * DEG2RAD);
    const cosH = (sinElevation - Math.sin(phi) * Math.sin(decl)) / (Math.cos(phi) * Math.cos(decl));
    if (cosH > 1 || cosH < -1) return null; // Sun never reaches this elevation on this day
    return Math.acos(cosH) * RAD2DEG;
  };

  // 1. Sunrise / Sunset (elevation = -0.833° for standard atmospheric refraction)
  const hRiseSet = getHourAngleDeg(-0.833) || 90;
  const riseMinutes = solarNoonMinutes - hRiseSet * 4;
  const setMinutes = solarNoonMinutes + hRiseSet * 4;

  // 2. Golden Hour Boundary (elevation = +6.0°)
  const hGolden = getHourAngleDeg(6.0) || 80;
  const morningGoldenEndMinutes = solarNoonMinutes - hGolden * 4;
  const eveningGoldenStartMinutes = solarNoonMinutes + hGolden * 4;

  // 3. Civil Twilight (elevation = -6.0°)
  const hCivil = getHourAngleDeg(-6.0) || 100;
  const dawnCivilMinutes = solarNoonMinutes - hCivil * 4;
  const duskCivilMinutes = solarNoonMinutes + hCivil * 4;

  // 4. Afternoon sweet spot: approximately 2.5 hours before evening golden hour
  const afternoonSweetMinutes = eveningGoldenStartMinutes - 150;

  // Helper to convert minutes from midnight to a Date object on targetDate
  const toDate = (minutes: number): Date => {
    const d = new Date(targetDate);
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes * 60) % 60);
    d.setHours(hours, mins, secs, 0);
    return d;
  };

  // Maximum solar elevation at noon
  const maxElevationRad = Math.asin(Math.sin(phi) * Math.sin(decl) + Math.cos(phi) * Math.cos(decl));
  const maxSolarElevationDeg = Math.round(maxElevationRad * RAD2DEG * 10) / 10;

  // Calculate live current elevation and azimuth
  const currentMinutes = targetDate.getHours() * 60 + targetDate.getMinutes() + targetDate.getSeconds() / 60;
  const hourAngleCurrent = (currentMinutes - solarNoonMinutes) / 4; // in degrees
  const hourAngleRad = hourAngleCurrent * DEG2RAD;

  const sinElevationCurrent = Math.sin(phi) * Math.sin(decl) + Math.cos(phi) * Math.cos(decl) * Math.cos(hourAngleRad);
  const currentElevationDeg = Math.round(Math.asin(Math.max(-1, Math.min(1, sinElevationCurrent))) * RAD2DEG * 10) / 10;

  // Azimuth calculation
  let azimuthRad = Math.acos(
    (Math.sin(decl) - Math.sin(phi) * sinElevationCurrent) /
      (Math.cos(phi) * Math.cos(Math.asin(sinElevationCurrent)))
  );
  if (hourAngleCurrent > 0) {
    azimuthRad = 2 * Math.PI - azimuthRad;
  }
  let currentAzimuthDeg = Math.round(((azimuthRad * RAD2DEG + 180) % 360) * 10) / 10;
  if (isNaN(currentAzimuthDeg)) currentAzimuthDeg = 180;

  // Relative angle to Runway 27L heading (272°)
  const relativeRunwayAngleDeg = Math.round(Math.abs(currentAzimuthDeg - RUNWAY_27L_HEADING));

  // Determine current lighting phase
  let currentPhase: SunPhase = 'NIGHT';
  let phaseLabel = 'Night Operations';
  let lightingAdvice = 'Runway and approach light towers active; shoot long-exposure light trails from the fence.';
  let lensTip = 'Tripod recommended. 24–35mm f/2.8 or prime for approach light beacon trails.';
  let isCurrentlyGoldenHour = false;

  if (currentMinutes >= dawnCivilMinutes && currentMinutes < riseMinutes) {
    currentPhase = 'DAWN_BLUE_HOUR';
    phaseLabel = 'Dawn Blue Hour';
    lightingAdvice = 'Cool deep blue ambient sky. Aircraft landing lights and red strobe beacons pop vividly.';
    lensTip = 'High ISO (800–1600), fast 50mm f/1.8 to freeze 145kt arrivals.';
  } else if (currentMinutes >= riseMinutes && currentMinutes < morningGoldenEndMinutes) {
    currentPhase = 'MORNING_GOLDEN_HOUR';
    phaseLabel = 'Morning Golden Hour';
    lightingAdvice = 'Low golden sun illuminating the starboard (right) side of 27L arrivals with long soft shadows.';
    lensTip = '70–135mm lens. Expose for the lit starboard fuselage and engine intake rims.';
    isCurrentlyGoldenHour = true;
  } else if (currentMinutes >= morningGoldenEndMinutes && currentMinutes < solarNoonMinutes - 90) {
    currentPhase = 'DAY_RISING';
    phaseLabel = 'Morning Ascending';
    lightingAdvice = 'Crisp daylight. Good side contrast on liveries.';
    lensTip = '70–200mm f/6.3. Standard matrix metering.';
  } else if (currentMinutes >= solarNoonMinutes - 90 && currentMinutes < afternoonSweetMinutes) {
    currentPhase = 'MIDDAY_HIGH';
    phaseLabel = 'Midday Overhead Sun';
    lightingAdvice = 'High sun elevation causes deep shadows under aircraft wings; ideal for direct belly passes.';
    lensTip = 'Stand at Center Meadow with 24–50mm for massive overhead wingspan captures.';
  } else if (currentMinutes >= afternoonSweetMinutes && currentMinutes < eveningGoldenStartMinutes) {
    currentPhase = 'AFTERNOON_SIDELIGHT';
    phaseLabel = 'Afternoon Cross-Light';
    lightingAdvice = 'Optimal directional side-lighting on 27L arrivals. Port-side liveries, registration, and tailfins glow cleanly.';
    lensTip = '70–135mm on 3/4 banking shots from the East Tree Line.';
  } else if (currentMinutes >= eveningGoldenStartMinutes && currentMinutes <= setMinutes) {
    currentPhase = 'EVENING_GOLDEN_HOUR';
    phaseLabel = 'Evening Golden Hour (Peak Myrtle Light)';
    lightingAdvice = 'The Holy Grail of planespotting! Sun aligns almost directly with Runway 27L heading (272°), illuminating the nose, flight deck, and engine cowlings in deep amber warmth.';
    lensTip = '50–85mm or 70–200mm. Dial in -0.3 EV to preserve golden highlight roll-off.';
    isCurrentlyGoldenHour = true;
  } else if (currentMinutes > setMinutes && currentMinutes <= duskCivilMinutes) {
    currentPhase = 'DUSK_BLUE_HOUR';
    phaseLabel = 'Dusk Blue Hour';
    lightingAdvice = 'Glowing horizon afterglow behind Terminal 5. Aircraft silhouettes framed against vibrant twilight gradients.';
    lensTip = 'Open aperture to f/2.8–f/4, shutter 1/250s–1/500s, track landing gears against the sunset horizon.';
  }

  return {
    date: targetDate,
    dawnCivil: toDate(dawnCivilMinutes),
    sunrise: toDate(riseMinutes),
    morningGoldenHourEnd: toDate(morningGoldenEndMinutes),
    solarNoon: toDate(solarNoonMinutes),
    maxSolarElevationDeg,
    afternoonSweetspotStart: toDate(afternoonSweetMinutes),
    eveningGoldenHourStart: toDate(eveningGoldenStartMinutes),
    sunset: toDate(setMinutes),
    duskCivil: toDate(duskCivilMinutes),
    currentElevationDeg,
    currentAzimuthDeg,
    currentPhase,
    phaseLabel,
    lightingAdvice,
    lensTip,
    relativeRunwayAngleDeg,
    isCurrentlyGoldenHour,
  };
}

/**
 * Format Date to HH:MM (e.g. "16:42")
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}
