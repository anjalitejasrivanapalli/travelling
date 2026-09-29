import React from 'react';
import { 
  Plane, 
  Calendar, 
  MapPin, 
  User, 
  Wallet, 
  CheckCircle2, 
  ArrowUpRight, 
  Printer, 
  Compass, 
  ShieldCheck,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { TRAVEL_PLAN, getPlanSummary } from '../data/travelPlanData';

interface HeaderBannerProps {
  currency: 'INR' | 'RUB' | 'USD';
  onCurrencyChange: (c: 'INR' | 'RUB' | 'USD') => void;
  onOpenAiChat: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  currency,
  onCurrencyChange,
  onOpenAiChat,
}) => {
  const summary = getPlanSummary();

  const formatMoney = (inr: number) => {
    if (currency === 'INR') {
      return `₹${inr.toLocaleString('en-IN')}`;
    } else if (currency === 'RUB') {
      const rub = Math.round(inr / TRAVEL_PLAN.traveler.rubleRateINR);
      return `${rub.toLocaleString('en-US')} ₽`;
    } else {
      const usd = Math.round(inr / 86.5);
      return `$${usd.toLocaleString('en-US')}`;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 px-4 pt-6 pb-6 sm:px-6 lg:px-8">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-64 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-1/4 -z-10 h-64 w-96 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top brand & actions row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" /> AI Travel Agent Blueprint
              </span>
              <span className="text-xs text-slate-400">· Official 2026 Guidelines & Rates</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-['Playfair_Display',serif]">
              Visakhapatnam to Russia: Moscow & St. Petersburg
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
              Complete 10-night/11-day solo travel itinerary with verified flight routes, 4-star safety-rated accommodations, official e-visa instructions, and a ₹5,00,000 budget allocation.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Currency Switcher */}
            <div className="inline-flex rounded-lg bg-slate-800/80 p-1 border border-slate-700 text-xs font-medium">
              <button
                type="button"
                onClick={() => onCurrencyChange('INR')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  currency === 'INR' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('RUB')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  currency === 'RUB' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                ₽ RUB
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('USD')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  currency === 'USD' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>

            {/* AI Assistant button */}
            <button
              type="button"
              onClick={onOpenAiChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask AI Travel Agent
            </button>

            {/* Print / Export */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all cursor-pointer"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              Export / Print
            </button>
          </div>
        </div>

        {/* Traveler Quick Summary Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-amber-500/10 text-amber-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Route & Destination</div>
              <div className="font-semibold text-slate-100 truncate">VTZ ➔ MOW & LED</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-sky-500/10 text-sky-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Travel Dates</div>
              <div className="font-semibold text-slate-100">20 Oct – 30 Oct 2026</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Traveler Profile</div>
              <div className="font-semibold text-slate-100">1 Solo Adult (Indian)</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="p-2 rounded-md bg-purple-500/10 text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Visa Classification</div>
              <div className="font-semibold text-slate-100">Unified Russian E-Visa</div>
            </div>
          </div>
        </div>

        {/* Financial Highlights Bar - Grand Calculation Display */}
        <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-4 border border-amber-500/20 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Total Budget */}
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-slate-400" /> Total Budget
              </span>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {formatMoney(summary.totalBudgetINR)}
              </div>
              <p className="text-[11px] text-slate-400">Target cap specified</p>
            </div>

            {/* Estimated Total Expenditure */}
            <div className="space-y-0.5 pt-3 md:pt-0 md:pl-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Estimated Total Cost
              </span>
              <div className="text-xl sm:text-2xl font-bold text-amber-300 tracking-tight">
                {formatMoney(summary.totalEstimatedINR)}
              </div>
              <p className="text-[11px] text-amber-400/80">All 8 categories inclusive</p>
            </div>

            {/* Budget Surplus Saved */}
            <div className="space-y-0.5 pt-3 md:pt-0 md:pl-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" /> Remaining Surplus
              </span>
              <div className="text-xl sm:text-2xl font-bold text-emerald-300 tracking-tight">
                {formatMoney(summary.remainingSurplusINR)}
              </div>
              <p className="text-[11px] text-emerald-400/80 font-medium">
                {summary.savingsPercentage}% under budget saved!
              </p>
            </div>

            {/* Daily Cost */}
            <div className="space-y-0.5 pt-3 md:pt-0 md:pl-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-sky-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-400" /> Cost Per Day
              </span>
              <div className="text-xl sm:text-2xl font-bold text-sky-200 tracking-tight">
                {formatMoney(summary.dailyCostINR)}
              </div>
              <p className="text-[11px] text-slate-400">Across 11 travel days</p>
            </div>

            {/* Cost Per Person */}
            <div className="space-y-0.5 pt-3 md:pt-0 md:pl-4 col-span-2 md:col-span-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-purple-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-purple-400" /> Cost Per Person
              </span>
              <div className="text-xl sm:text-2xl font-bold text-purple-200 tracking-tight">
                {formatMoney(summary.costPerPersonINR)}
              </div>
              <p className="text-[11px] text-slate-400">1 Solo Traveler</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
