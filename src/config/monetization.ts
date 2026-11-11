/**
 * Monetization Configuration for Myrtle Avenue Visitor Hub
 * Configure your Google AdSense Publisher ID and affiliate partner tracking links.
 */

export interface AffiliateProduct {
  id: string;
  category: 'hotel' | 'gear' | 'transit';
  title: string;
  tagline: string;
  description: string;
  badge: string;
  ctaText: string;
  url: string;
  imageUrl?: string;
  priceNote?: string;
}

export const MONETIZATION_CONFIG = {
  // Replace with your real Google AdSense publisher ID (e.g. 'ca-pub-1234567890123456')
  adSenseClientId: 'ca-pub-9999999999999999',
  
  // Set to true once your AdSense site is approved by Google
  enableLiveAdSense: false,

  // Ad Slot IDs from your Google AdSense console
  adSlots: {
    dashboardLeaderboard: '1234567890',
    feedNativeSlot: '0987654321',
    creatorSidebar: '1122334455',
  },

  // Curated high-converting affiliate partners
  affiliates: [
    {
      id: 'renaissance-hotel',
      category: 'hotel',
      title: 'Renaissance London Heathrow',
      tagline: 'World-Famous Runway View Rooms',
      description:
        'Watch A380s and 777s touch down from your private bedroom balcony. Located on Bath Road directly overlooking Runway 27R & 27L.',
      badge: 'Spotter Favorite Hotel',
      ctaText: 'Check Runway View Rates',
      url: 'https://www.booking.com/hotel/gb/renaissance-london-heathrow.html',
      priceNote: 'Rooms from £89/night',
    },
    {
      id: 'hilton-garden-inn',
      category: 'hotel',
      title: 'Hilton Garden Inn T2/T3',
      tagline: 'Runway Observation Deck & Bar',
      description:
        'Features the 14th-floor Runway Bar with panoramic glass views of both Heathrow runways and taxiway links.',
      badge: 'Rooftop Bar Spotting',
      ctaText: 'View Rooftop Availability',
      url: 'https://www.booking.com/hotel/gb/hilton-garden-inn-london-heathrow-airport.html',
      priceNote: 'Direct Terminal 2/3 Access',
    },
    {
      id: 'creator-magsafe-tripod',
      category: 'gear',
      title: 'MagSafe Heavy-Duty Video Tripod',
      tagline: 'Zero-Shake 0.5x Ultra-Wide Flyovers',
      description:
        'Quick magnetic snap for iPhone/Android. Low-angle leg spread designed specifically for filming planes from the grass.',
      badge: 'TikTok Creator Essential',
      ctaText: 'View on Amazon',
      url: 'https://www.amazon.co.uk/dp/B0CKW7P2X4',
      priceNote: 'Top Rated for Planespotting',
    },
    {
      id: 'creator-powerbank',
      category: 'gear',
      title: 'Anker 20,000mAh Fast-Charge Power Bank',
      tagline: 'Film 4K 60fps All Afternoon',
      description:
        'Cold winds and continuous video recording drain phone batteries in 90 minutes. Keep your device powered for the 3 PM switch!',
      badge: 'All-Day Battery Backup',
      ctaText: 'Check Price on Amazon',
      url: 'https://www.amazon.co.uk/dp/B0BYP6N145',
      priceNote: 'Charges phone 4.5x',
    },
  ] as AffiliateProduct[],
};
