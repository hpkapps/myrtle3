# Myrtle Avenue Heathrow Visitor & Creator Guide

A visitor-focused, creator-ready web application designed specifically for tourists, casual spectators, and TikTok/Instagram creators visiting the legendary Myrtle Avenue at London Heathrow (EGLL). It instantly answers the single most critical question: **"Are planes landing directly over Myrtle Avenue right now?"** and guides visitors on timing, 3 PM runway switchovers, giant A380 arrivals, and phone camera filming tips.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Based on your feedback in Phase 1, we have aligned on the following structural pivots:
> - **Primary Target Audience**: Casual visitors, tourists, families, and creators who want the breathtaking low-flyover experience without needing to decipher complex pilot telemetry.
> - **Sound Effects**: **Completely removed**. No confusing synthesized jet noises or radio chatter; the app focuses on crystal-clear visual guidance and timing.
> - **Hero Feature**: A bold, unmistakable **"Are Planes Landing Here Right Now?" Live Checker** at the very top of the app, explaining current runway usage, the 3 PM switchover, and weather impact in plain English.
> - **Alternative Spot Finder**: If planes are landing on the other runway (27R) or taking off over Myrtle Avenue (09R), the app clearly informs visitors and provides interactive walking/bus directions to alternative viewing spots (such as Hatton Cross roundabout or northern viewing areas).

---

### 1. Overview & Core Concept

- **The Problem**: Hundreds of tourists and social media creators travel on the London Underground to Hatton Cross after seeing viral videos of massive Airbus A380s skimming trees at Myrtle Avenue, only to arrive and find empty skies because Heathrow switched to the northern runway (27R) at 3 PM, or because easterly winds shifted operations.
- **The Solution**: A fast, visually rich companion that instantly shows:
  1. **Live Landing Status**: A high-impact status card (**"YES, LANDING OVERHEAD NOW"** vs. **"SWITCHED: PLANES LANDING ON NORTH RUNWAY 27R"** vs. **"EASTERLY: PLANES CLIMBING OUT ON TAKEOFF"**).
  2. **Next Giant Heavies Countdown**: A countdown for superjumbos and widebodies (*Emirates A380 in 4 mins*, *British Airways A350 in 11 mins*).
  3. **3 PM Switchover Watch**: An intuitive clock explaining why planes switch runways halfway through the day and what to do next.
  4. **Creator & TikTok Filming Guide**: How to shoot the viral shot on iPhone/Android (0.5x ultra-wide lens, 60fps/120fps slow-motion, standing spots on the grass).
  5. **Golden Hour Video Lighting**: When the sunlight turns aircraft into glowing amber giants over the field.

---

### 2. User Experience & Visual Design

#### Key User Flows

1. **Instant Decision Flow ("Should I Go Now?")**:
   - The user opens the app on their phone at Hatton Cross station or Central London.
   - The top hero card prominently states:
     - 🟢 **"YES! Planes are landing right over Myrtle Avenue right now."** (Until 15:00 local time under westerly winds).
     - 🟡 **"SWITCHING SOON: 15:00 Runway Switch in 24 mins."**
     - 🔴 **"PLANES NOT LANDING HERE: Landing on 27R (North Runway)."** + One-tap button: *"See Where To Go Instead (Hatton Cross Roundabout / T5 Viewing)"*.
2. **Next Monster Plane Tracker**:
   - Visual cards showing the next incoming widebody aircraft (*Airbus A380*, *Boeing 777-300ER*, *Airbus A350-1000*) with origin city flags, minutes until overhead, and aircraft size badge (*"World's Biggest Passenger Plane"*, *"Twin-Engine Giant"*).
3. **Creator Camera Guide**:
   - Quick visual toggle for phone camera settings:
     - **0.5x Ultra-Wide Mode**: Stand by the corner fence to capture the entire 80-meter wingspan + grass field.
     - **4K 60fps / 120fps Slow-Mo**: When to press record as the aircraft emerges from the cloud base.
     - **Audio Note**: Turn off wind noise filters on your phone; the engine rumble in person is naturally earth-shaking.
4. **Getting There & Field Essentials**:
   - Step-by-step walk from Hatton Cross Piccadilly Line tube station (with interactive map).
   - Strict parking warning: Explaining why driving is a trap (residents parking tickets) and tube is 100x easier.
   - Nearest restrooms, food, and warm drinks at the BP/M&S store.

#### Visual Identity & Theme

- **Aesthetic Direction**: Vibrant, welcoming, consumer-grade travel & creator guide with aeronautical precision. High-contrast cards for outdoor daylight readability on mobile screens.
- **Color Palette**:
  - Dominant Canvas: Deep slate charcoal (`#090D16` / `#0F172A`) with warm amber accents (`#F59E0B`) and emerald green operational indicators (`#10B981`).
  - Alert States: High-visibility emerald (active landing here), amber (switch pending / easterly takeoff), and rose/slate (landing on opposite runway).
- **Typography**: `Plus Jakarta Sans` for clean, friendly, modern headings and body text, paired with `JetBrains Mono` for ETA countdowns and runway identifiers.
- **Layout Rhythm**: Mobile-first touch ergonomics (touch targets $\ge 44\text{px}$) that seamlessly scales to full 1440px desktop width with multi-column grid balance.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Eliminating Audio Synthesizer**:
  - *Chosen Approach*: Remove synthesized audio and Web Audio API oscillators completely.
  - *Why*: User feedback clearly noted that visitors and spotters do not understand or need synthesized engine whine or static bursts on a mobile website. In person, the planes themselves provide thunderous sound.
  - *Alternative Considered*: Ambient recorded MP3s. Rejected because mobile browsers aggressively block audio autoplay, causing friction.
- **Decision 2: Simplifying from Pilot Telemetry to Tourist / Creator Value**:
  - *Chosen Approach*: Replace dense raw ADS-B transponder tables with clear, friendly flight cards highlighting airline, aircraft size, minutes to overhead, and origin city.
  - *Why*: Flightradar24 already exists for technical avgeeks; Myrtle Avenue visitors need to know *when the big A380 is passing* and *if they are standing in the right spot*.
- **Decision 3: Dedicated "What If Planes Land on the Other Side?" Guidance**:
  - *Chosen Approach*: Provide an interactive "Runway Switch & Alternative Spots" section that clearly explains the 3 PM rule and directs visitors to alternative viewing spots when Myrtle Avenue is quiet.
  - *Why*: Solves the #1 complaint of tourists visiting Myrtle Avenue and leaving disappointed.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Myrtle Avenue Hub App                           │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐     ┌──────────────────┐      ┌──────────────────┐
│  Live Runway     │     │  Giant Heavies   │      │  Creator Guide   │
│  Status Checker  │     │  Inbound Stream  │      │  & Phone Tips    │
│  - 27L vs 27R    │     │  - A380/777/A350 │      │  - 0.5x UltraWide│
│  - 3 PM Switch   │     │  - Time to Flyover│     │  - Slow-Mo Video │
│  - Winds/Weather │     │  - Visual cards  │      │  - Exact Spots   │
└──────────────────┘     └──────────────────┘      └──────────────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌──────────────────────────────────┐       ┌──────────────────────────────────┐
│  Alternative Spot Finder         │       │  Golden Hour & Sunset Tracker    │
│  - Hatton Cross Roundabout       │       │  - Peak amber lighting windows   │
│  - Northern 27R vantage points   │       │  - Solar elevation & runway axis │
└──────────────────────────────────┘       └──────────────────────────────────┘
```

#### Core Data Entities & Components

1. **`RunwayStatusCard`**: Displays current status (Open for Arrivals / Switched to North / Easterly Takeoffs), time remaining until next 15:00 switch, wind direction, and recommendation score.
2. **`HeavyArrivalsFeed`**: Filtered highlight reel of approaching widebodies (Airbus A380, A350, Boeing 777, 787) with countdown timers and photo previews.
3. **`CreatorCameraGuide`**: Interactive mobile framing guide with visual tips on shutter speeds, 0.5x zoom framing, and slow-mo video capture.
4. **`AlternativeSpotsDirectory`**: Step-by-step guide and walking directions to secondary Heathrow spotting areas when Myrtle Avenue isn't in use.
5. **`VisitorMapAndTransit`**: Transit guide from Hatton Cross station, parking warnings, amenities, and food locations.
6. **`SunGoldenHourBox`**: Preserved and refined golden hour calculator showing when social media video lighting reaches peak warmth.
