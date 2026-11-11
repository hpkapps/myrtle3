# Monetization Strategy: Display Ads & Contextual Aviation Affiliates

A comprehensive, production-grade monetization architecture for the Myrtle Avenue Visitor & Creator Guide. Combines standard IAB Google AdSense display banners with native in-feed sponsor cards promoting **runway-view Heathrow hotels** and **phone creator accessories**, ensuring strong revenue potential without ruining the clean user experience.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Based on your Phase 1 selections, we are implementing:
> - **Primary Ad Engine**: Standard display ad banners with native support for **Google AdSense** script injection (`adsbygoogle.js`) and auto-fallback sponsor units when AdSense is pending approval or blocked.
> - **Placement Style**: Contextual **in-feed native sponsor cards** blended directly into the arrivals feed and creator guides, plus standard responsive leaderboard banner slots.
> - **Affiliate Focus**: Hand-picked high-converting products specifically for Myrtle Avenue visitors:
>   1. **Heathrow Runway View Hotels** (*Renaissance London Heathrow*, *Hilton Garden Inn T2/T3*, *Sofitel T5*) where aviation enthusiasts and tourists pay premium rates for tarmac-facing balconies.
>   2. **Phone Creator & Spotter Gear** (*MagSafe video tripods*, *20,000mAh power banks*, *lens cleaning kits*, *portable pocket stepladders*).

---

### 1. Overview & Core Concept

- **The Opportunity**: Visitors using this app are high-intent aviation enthusiasts, tourists visiting London, and social media creators on-site at Heathrow. They are primed to book nearby hotels with runway views, purchase creator filming accessories, or click travel-related ads.
- **The Solution**:
  1. **Google AdSense Display Units**: Standard responsive leaderboard (728x90 / 320x50) and rectangle (300x250) units with ready-to-use AdSense configuration.
  2. **In-Feed Native Sponsor Cards**: Blended seamlessly into the Heavy Arrivals feed, featuring runway hotel booking links and creator gear recommendations with affiliate attribution tags.
  3. **AdSense Config & Transparency Modal**: A dedicated panel for the site owner to paste their Google AdSense Publisher ID (`pub-XXXXXX`) and affiliate IDs directly, with complete FTC compliance disclosures.
  4. **Graceful Zero-Broken-Ad Policy**: If an ad blocker is running or AdSense is awaiting approval, the slots gracefully collapse or show useful affiliate travel recommendations rather than blank white boxes.

---

### 2. User Experience & Visual Design

#### Placements & Visual Rhythm

1. **Dashboard In-Feed Native Card (Between Flight Cards)**:
   - Positioned naturally within the incoming heavies list (e.g. after the second flight card).
   - Styled as a clean card with an unobtrusive `Sponsored` label in muted typography.
   - Highlights *Renaissance London Heathrow Runway View Rooms* ("Watch A380s touch down from your bedroom window").
2. **Creator Guide Gear Recommendations**:
   - Integrated into the TikTok/Instagram guide: *"Recommended Gear for Filming at Myrtle Ave"* showcasing MagSafe video tripods, 20,000mAh portable power banks, and lens wipes.
3. **Responsive Display Banner Slots**:
   - Positioned between the hero status card and the radar section (`max-w-4xl mx-auto py-2`).
   - Adapts from a full 728x90 Leaderboard on desktop to a 320x50 / 300x100 Mobile Banner on phones.
4. **Affiliate Disclosure & Ad Settings**:
   - A quiet link in the footer: *"Sponsor & Affiliate Disclosure"* explaining that links may earn a commission, maintaining full compliance with advertising standards.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Native In-Feed Sponsors vs. Aggressive Popups / Interstitials**:
  - *Chosen Approach*: Strictly zero popups, interstitials, or floating bottom sticky ad bars that cover mobile content. In-feed native cards and responsive banner slots respect the mobile thumb zone.
  - *Why*: Aggressive popups destroy user trust and cause immediate bounce on mobile browsers.
- **Decision 2: Dual Mode (AdSense Script + Affiliate Fallback)**:
  - *Chosen Approach*: Support real Google AdSense (`<ins class="adsbygoogle">`) while providing immediate affiliate card fallbacks.
  - *Why*: New sites often take 1–3 weeks for Google AdSense site approval. Having affiliate cards ensures the app can generate revenue from Day 1.
- **Decision 3: Configurable Publisher Credentials**:
  - *Chosen Approach*: Centralized config in `src/config/monetization.ts` where you can set your AdSense Client ID (`ca-pub-XXXXXXXXXX`) and Amazon / Booking.com affiliate tags in one place.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      Monetization Architecture                          │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│   Google AdSense Display Engine  │        │   Contextual Affiliate Cards     │
│   - adsbygoogle.js script loader │        │   - Runway View Hotels           │
│   - Responsive Leaderboard slot  │        │   - Phone Creator Video Gear     │
│   - AdBlocker detection fallback │        │   - FTC Affiliate Disclosures    │
└──────────────────────────────────┘        └──────────────────────────────────┘
           │                                                   │
           └─────────────────────────┬─────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                  Centralized Config: monetization.ts                    │
│      - adSenseClientId, adSlotIds, hotelAffiliateUrl, gearLinks         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Component & File Structure

1. **`src/config/monetization.ts`**: Centralized configuration holding AdSense client ID, ad slot IDs, and curated affiliate partners (Hotels & Creator Gear).
2. **`src/components/AdSenseBanner.tsx`**: Reusable display banner component supporting real AdSense script injection with placeholder/affiliate fallback.
3. **`src/components/NativeSponsorCard.tsx`**: In-feed native card highlighting runway-view hotels and phone video accessories.
4. **`src/components/MonetizationDisclosureModal.tsx`**: Legal disclosure and partner transparency modal for FTC/ASA compliance.
