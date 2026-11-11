import React, { useEffect, useRef, useState } from 'react';
import { MONETIZATION_CONFIG } from '../config/monetization';
import { ExternalLink, Hotel, Plane, Sparkles } from 'lucide-react';

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotId = MONETIZATION_CONFIG.adSlots.dashboardLeaderboard,
  format = 'auto',
  className = '',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [adError, setAdError] = useState<boolean>(false);

  useEffect(() => {
    if (!MONETIZATION_CONFIG.enableLiveAdSense) return;

    try {
      // Load AdSense script once if not already present
      const scriptId = 'google-adsense-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${MONETIZATION_CONFIG.adSenseClientId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // Push ad unit
      // @ts-expect-error - adsbygoogle is provided dynamically by Google AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setAdError(true);
    }
  }, []);

  // If live AdSense is enabled and no error occurred, render real AdSense tag
  if (MONETIZATION_CONFIG.enableLiveAdSense && !adError) {
    return (
      <div className={`my-4 flex flex-col items-center justify-center ${className}`}>
        <span className="text-[10px] font-mono uppercase text-slate-500 mb-1 tracking-wider">
          Advertisement
        </span>
        <div className="w-full max-w-4xl min-h-[90px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={MONETIZATION_CONFIG.adSenseClientId}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Graceful Fallback / Native Sponsor Banner (High-converting Heathrow Hotel Partner)
  const hotelPartner = MONETIZATION_CONFIG.affiliates[0];

  return (
    <div className={`my-4 flex flex-col items-center justify-center ${className}`}>
      <div className="w-full max-w-4xl flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1 px-1">
        <span className="uppercase tracking-wider">Sponsored Travel Partner</span>
        <span>Heathrow Runway Hotels</span>
      </div>

      <a
        href={hotelPartner.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="w-full max-w-4xl group p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 hover:border-amber-500/50 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
            <Hotel className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                {hotelPartner.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {hotelPartner.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
              {hotelPartner.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <span className="text-xs font-mono text-slate-400 hidden md:inline">
            {hotelPartner.priceNote}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-xs">
            <span>{hotelPartner.ctaText}</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </a>
    </div>
  );
};
