import React, { useState } from 'react';
import { MONETIZATION_CONFIG } from '../config/monetization';
import { ShieldCheck, Info, DollarSign, X, Check, Copy } from 'lucide-react';

interface MonetizationDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MonetizationDisclosureModal: React.FC<MonetizationDisclosureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(`adSenseClientId: "${MONETIZATION_CONFIG.adSenseClientId}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 text-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Advertising &amp; Affiliate Disclosure
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FTC / ASA Compliance Body */}
        <div className="space-y-3 text-slate-300 leading-relaxed text-[11px]">
          <p>
            The <strong>Myrtle Avenue Visitor &amp; Creator Guide</strong> is a free community resource. To cover server hosting and data stream costs, this application utilizes:
          </p>

          <div className="space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <strong className="text-slate-100">1. Google AdSense Display Ads:</strong>
              <p className="text-slate-400 mt-0.5">
                Standard banner placements served via Google AdSense. Ads are clearly labeled as &ldquo;Advertisement&rdquo; or &ldquo;Sponsored&rdquo;.
              </p>
            </div>
            <div>
              <strong className="text-slate-100">2. Affiliate Partner Recommendations:</strong>
              <p className="text-slate-400 mt-0.5">
                We partner with verified travel platforms (e.g., Booking.com for Heathrow runway-view hotels) and creator equipment providers (Amazon). If you make a booking or purchase through our links, we may earn a small referral commission at <strong>zero extra cost to you</strong>.
              </p>
            </div>
          </div>

          <p className="text-slate-400">
            All recommendations (such as the Renaissance London Heathrow runway balcony rooms or phone tripod rigs) are independently curated for visitors attending Myrtle Avenue.
          </p>
        </div>

        {/* Site Owner Quick Setup Helper */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Publisher Setup Guide</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">src/config/monetization.ts</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            To connect your live Google AdSense account, open <code>src/config/monetization.ts</code>, update <code>adSenseClientId</code> with your publisher code (e.g. <code>ca-pub-XXXXXXXXXX</code>), and switch <code>enableLiveAdSense: true</code>.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors"
          >
            Close Disclosure
          </button>
        </div>
      </div>
    </div>
  );
};
