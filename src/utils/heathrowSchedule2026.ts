/**
 * Official Heathrow Airport Runway Alternation Programme 2026 Schedule
 * Source: Heathrow Airport Limited (Public Classification)
 * Document: Heathrow_Runway_Alternation_Programme_2026_85902dc5.pdf
 */

export interface WeekSchedule2026 {
  weekCommencing: string; // ISO date string YYYY-MM-DD (Monday)
  displayDate: string;   // e.g. "9 Nov"
  morningRunway: '27L' | '27R'; // 06:00 - 15:00
  afternoonRunway: '27L' | '27R'; // 15:00 until last departure
  nightPrimary: '27R' | '09L' | '09R' | '27L';
  nightSecondary: '09L' | '27L' | '09R' | '27R';
}

// Complete 52-week 2026 daytime & nighttime schedule directly from Heathrow Airport document
export const HEATHROW_2026_SCHEDULE: WeekSchedule2026[] = [
  // First Half 2026
  { weekCommencing: '2026-01-05', displayDate: '5 Jan', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-01-12', displayDate: '12 Jan', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-01-19', displayDate: '19 Jan', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-01-26', displayDate: '26 Jan', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-02-02', displayDate: '2 Feb', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-02-09', displayDate: '9 Feb', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-02-16', displayDate: '16 Feb', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-02-23', displayDate: '23 Feb', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-03-02', displayDate: '2 Mar', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-03-09', displayDate: '9 Mar', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-03-16', displayDate: '16 Mar', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-03-23', displayDate: '23 Mar', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-03-30', displayDate: '30 Mar', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-04-06', displayDate: '6 Apr', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-04-13', displayDate: '13 Apr', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-04-20', displayDate: '20 Apr', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-04-27', displayDate: '27 Apr', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-05-04', displayDate: '4 May', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-05-11', displayDate: '11 May', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-05-18', displayDate: '18 May', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-05-25', displayDate: '25 May', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-06-01', displayDate: '1 Jun', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-06-08', displayDate: '8 Jun', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-06-15', displayDate: '15 Jun', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-06-22', displayDate: '22 Jun', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-06-29', displayDate: '29 Jun', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },

  // Second Half 2026
  { weekCommencing: '2026-07-06', displayDate: '6 Jul', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-07-13', displayDate: '13 Jul', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-07-20', displayDate: '20 Jul', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-07-27', displayDate: '27 Jul', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-08-03', displayDate: '3 Aug', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-08-10', displayDate: '10 Aug', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-08-17', displayDate: '17 Aug', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-08-24', displayDate: '24 Aug', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-08-31', displayDate: '31 Aug', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-09-07', displayDate: '7 Sep', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-09-14', displayDate: '14 Sep', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-09-21', displayDate: '21 Sep', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-09-28', displayDate: '28 Sep', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-10-05', displayDate: '5 Oct', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-10-12', displayDate: '12 Oct', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-10-19', displayDate: '19 Oct', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-10-26', displayDate: '26 Oct', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-11-02', displayDate: '2 Nov', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-11-09', displayDate: '9 Nov', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-11-16', displayDate: '16 Nov', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-11-23', displayDate: '23 Nov', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-11-30', displayDate: '30 Nov', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
  { weekCommencing: '2026-12-07', displayDate: '7 Dec', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27R', nightSecondary: '09L' },
  { weekCommencing: '2026-12-14', displayDate: '14 Dec', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09R', nightSecondary: '27L' },
  { weekCommencing: '2026-12-21', displayDate: '21 Dec', morningRunway: '27L', afternoonRunway: '27R', nightPrimary: '27L', nightSecondary: '09R' },
  { weekCommencing: '2026-12-28', displayDate: '28 Dec', morningRunway: '27R', afternoonRunway: '27L', nightPrimary: '09L', nightSecondary: '27R' },
];

/**
 * Finds the schedule entry for any date in 2026
 */
export function getScheduleForDate(date: Date): {
  schedule: WeekSchedule2026;
  isMyrtleLandingMorning: boolean;
  isMyrtleLandingAfternoon: boolean;
  activeRunwayNow: '27L' | '27R';
  myrtleActiveWindowLabel: string;
  myrtleStatusNow: 'LANDING_OVERHEAD' | 'SWITCHED_TO_NORTH' | 'DUAL_BUSY_HOUR' | 'NIGHT_OPERATIONS';
} {
  const targetTime = date.getTime();

  // Find the closest week commencing on or before the target date
  let matched = HEATHROW_2026_SCHEDULE[0];
  for (let i = 0; i < HEATHROW_2026_SCHEDULE.length; i++) {
    const entryDate = new Date(HEATHROW_2026_SCHEDULE[i].weekCommencing + 'T00:00:00');
    if (entryDate.getTime() <= targetTime) {
      matched = HEATHROW_2026_SCHEDULE[i];
    } else {
      break;
    }
  }

  const isMyrtleLandingMorning = matched.morningRunway === '27L';
  const isMyrtleLandingAfternoon = matched.afternoonRunway === '27L';

  const hour = date.getHours();
  let activeRunwayNow: '27L' | '27R' = '27L';
  let myrtleStatusNow: 'LANDING_OVERHEAD' | 'SWITCHED_TO_NORTH' | 'DUAL_BUSY_HOUR' | 'NIGHT_OPERATIONS' = 'LANDING_OVERHEAD';

  // 06:00 to 07:00 is dual runway busy hour
  if (hour === 6) {
    activeRunwayNow = '27L';
    myrtleStatusNow = 'DUAL_BUSY_HOUR';
  } else if (hour >= 7 && hour < 15) {
    activeRunwayNow = matched.morningRunway;
    myrtleStatusNow = matched.morningRunway === '27L' ? 'LANDING_OVERHEAD' : 'SWITCHED_TO_NORTH';
  } else if (hour >= 15 && hour < 23) {
    activeRunwayNow = matched.afternoonRunway;
    myrtleStatusNow = matched.afternoonRunway === '27L' ? 'LANDING_OVERHEAD' : 'SWITCHED_TO_NORTH';
  } else {
    // Night operations (after 23:00 to 06:00)
    activeRunwayNow = matched.nightPrimary === '27L' ? '27L' : '27R';
    myrtleStatusNow = 'NIGHT_OPERATIONS';
  }

  const myrtleActiveWindowLabel = isMyrtleLandingMorning
    ? 'Morning Flyover Week (06:00 – 15:00 at Myrtle Ave)'
    : 'Afternoon & Golden Hour Flyover Week (15:00 until dusk at Myrtle Ave)';

  return {
    schedule: matched,
    isMyrtleLandingMorning,
    isMyrtleLandingAfternoon,
    activeRunwayNow,
    myrtleActiveWindowLabel,
    myrtleStatusNow,
  };
}
