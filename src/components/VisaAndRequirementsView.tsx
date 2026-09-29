import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CreditCard, 
  DollarSign, 
  ThermometerSnowflake, 
  CheckCircle, 
  ExternalLink,
  Clock,
  Luggage,
  Info
} from 'lucide-react';
import { TRAVEL_PLAN } from '../data/travelPlanData';

interface VisaAndRequirementsViewProps {
  currency: 'INR' | 'RUB' | 'USD';
}

export const VisaAndRequirementsView: React.FC<VisaAndRequirementsViewProps> = ({ currency }) => {
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

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Section 6</span>
            <span className="text-xs text-slate-500">· Official Consular & Regulatory Standards</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Russian E-Visa & Mandatory Entry Regulations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Current verified guidelines for Indian passport holders, including official portal links, critical payment sanctions workarounds, and October weather gear.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="text-slate-400 block text-[11px]">Visa + Insurance Allocation:</span>
          <span className="text-xl font-bold text-amber-300 font-mono">{formatMoney(7500)}</span>
          <span className="text-[11px] text-emerald-400 block">₹4,500 Visa + ₹2,500 Medical + Fees</span>
        </div>
      </div>

      {/* CRITICAL 2026 SANCTIONS & FINANCIAL ADVISORY (MUST HIGHLIGHT) */}
      <section className="rounded-xl border-2 border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/20 p-5 space-y-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400">
                CRITICAL FINANCIAL REALITY (2026 MANDATORY NOTICE)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                Sanctions Compliance
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Indian Visa, Mastercard & RuPay Cards DO NOT WORK inside Russia!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Due to ongoing international banking sanctions and SWIFT disconnection, any credit or debit card issued outside Russia (including State Bank of India, HDFC, ICICI, Axis) will be completely declined at all Russian POS terminals and ATMs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 text-xs">
          <div className="p-3.5 bg-slate-950/90 rounded-lg border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-amber-400" />
              1. Carry Crisp US Dollars / Euros
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Carry approximately <strong>$1,200 to $1,500 USD</strong> in cash. Bank notes must be <strong>clean, uncreased, no pen marks, and series 2013 or newer</strong> ($100 bills get the best rates). Exchange them easily for Rubles at official Sberbank, VTB, or airport exchange booths.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/90 rounded-lg border border-slate-800 space-y-1.5">
            <span className="font-bold text-sky-300 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-sky-400" />
              2. Tourist Mir Card on Arrival
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Foreign tourists can obtain a local Russian <strong>Mir debit card</strong> directly at Sheremetyevo Airport (Sberbank desk). You can deposit cash USD into it, and then tap your card or phone everywhere (Metro, cafes, shops).
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/90 rounded-lg border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              3. Cash is King for Transport
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Keep small cash ruble bills (100, 200, 500, 1,000 RUB) handy for street kiosks, tipping, and paying Yandex Go taxi drivers directly in cash.
            </p>
          </div>
        </div>
      </section>

      {/* 1. OFFICIAL RUSSIAN UNIFIED E-VISA SPECIFICATIONS */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-white text-base">
              Unified Russian Electronic Visa (E-Visa) for Indian Citizens
            </h3>
          </div>
          <a
            href="https://electronic-visa.kdmid.ru/index_en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
          >
            Official MFA Portal: electronic-visa.kdmid.ru <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px] block">Eligibility</span>
            <span className="font-bold text-white text-sm block">Indian Passport Holders</span>
            <span className="text-[11px] text-emerald-400">Included in list of 55 countries</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px] block">Duration of Permitted Stay</span>
            <span className="font-bold text-white text-sm block">Up to 16 Calendar Days</span>
            <span className="text-[11px] text-sky-400">Our trip is 11 days (fits easily)</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px] block">Visa Validity Period</span>
            <span className="font-bold text-white text-sm block">60 Days from Issuance</span>
            <span className="text-[11px] text-slate-400">Single entry permission</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px] block">Consular & Processing Fee</span>
            <span className="font-bold text-amber-300 text-sm block font-mono">$52 USD (~₹4,500)</span>
            <span className="text-[11px] text-slate-400">Paid online via international gateway</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
          <h4 className="font-bold text-slate-200">Mandatory Application Checklist:</h4>
          <ul className="text-slate-300 space-y-1.5 leading-relaxed text-[11px]">
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Passport:</strong> Machine-readable Indian passport with at least 6 months validity from application submission date, with at least 2 clean blank pages.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Digital Photo:</strong> Clean 35×45 mm JPEG photo taken against a plain light background without shadows, glares, or glasses.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Application Timing:</strong> Submit application between <strong>20 days and 4 calendar days</strong> before departure (Ideal window: 1 October – 6 October 2026). Standard turnaround is 4 calendar days.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Printed Approval:</strong> Always carry <strong>2 paper printouts</strong> of your e-visa PDF notification letter upon check-in and border control.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. MANDATORY TRAVEL & MEDICAL INSURANCE */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Mandatory Medical Travel Insurance</h3>
          </div>
          <span className="text-xs text-amber-300 font-mono">Min. €30,000 Coverage (~₹2,500)</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Russian law strictly requires all foreign travelers to carry a valid health insurance policy covering the entire duration of stay. Border guards and e-visa verification officers can request proof upon arrival.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Required Policy Terms</span>
            <span className="text-slate-400 text-[11px] block">
              Must state coverage in the "Russian Federation" or "Worldwide including Russia" with emergency medical, hospital, and medical evacuation coverage of at least €30,000 (~$35,000 USD).
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Approved Indian Providers</span>
            <span className="text-slate-400 text-[11px] block">
              Tata AIG, Care Health Insurance, Reliance General, or Bajaj Allianz. Alternatively, purchase Russian domestic policies from AlfaStrakhovanie or Ingosstrakh online.
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Cost & Period</span>
            <span className="text-slate-400 text-[11px] block">
              11-day single trip travel insurance policy costs approximately <strong>₹1,800 to ₹2,500 INR</strong>.
            </span>
          </div>
        </div>
      </section>

      {/* 3. LATE OCTOBER RUSSIAN WEATHER & CLOTHING GUIDE */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ThermometerSnowflake className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-white text-base">Late October Russian Weather & Packing Checklist</h3>
          </div>
          <span className="text-xs text-sky-300 font-mono">Temp Range: -2°C to +8°C</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Coming from the tropical warmth of coastal Visakhapatnam, Russia in late October represents golden late autumn transitioning into early winter. Expect brisk breezes, occasional light snow flurries or rains, and heated interiors (22°C inside buildings).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-sky-300 block">1. Layering Formula</span>
            <span className="text-slate-400 text-[11px] block">
              • Base: Thermal merino wool or synthetic top + bottoms (2 sets).<br />
              • Mid: Warm fleece sweater or knit pullover.<br />
              • Outer: Windproof, water-resistant hooded down parka (rated to -5°C).
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-amber-300 block">2. Footwear & Accessories</span>
            <span className="text-slate-400 text-[11px] block">
              • Waterproof walking boots with deep rubber treads (cobblestones can get slippery).<br />
              • Woolen socks (3–4 pairs).<br />
              • Knitted beanie cap, touchscreen-friendly gloves, and neck gaiter.
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-300 block">3. Digital & Medical Kit</span>
            <span className="text-slate-400 text-[11px] block">
              • 10,000+ mAh power bank (cold weather drains phone batteries 2x faster!).<br />
              • European 2-pin Type C/F power adapter.<br />
              • Moisturizing lip balm and cold cream.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
