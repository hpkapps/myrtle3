import React from 'react';
import { AffiliateProduct } from '../config/monetization';
import { ExternalLink, Hotel, Smartphone, Sparkles, BatteryCharging } from 'lucide-react';

interface NativeSponsorCardProps {
  product: AffiliateProduct;
}

export const NativeSponsorCard: React.FC<NativeSponsorCardProps> = ({ product }) => {
  const isHotel = product.category === 'hotel';

  return (
    <div className="p-4 rounded-xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 hover:border-amber-500/60 transition-all shadow-sm flex flex-col justify-between relative overflow-hidden group">
      <div>
        {/* Top Tag: Sponsored Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            {isHotel ? <Hotel className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
            <span>{product.badge}</span>
          </span>

          <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
            Partner
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
          {product.title}
        </h3>

        <div className="text-xs font-medium text-amber-300/90 mt-0.5">
          {product.tagline}
        </div>

        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">
          {product.priceNote || 'Verified Spotter Recommendation'}
        </span>

        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-xs"
        >
          <span>{product.ctaText}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
