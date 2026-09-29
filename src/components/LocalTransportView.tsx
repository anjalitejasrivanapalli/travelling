import React from 'react';
import { 
  Train, 
  CreditCard, 
  Smartphone, 
  Map, 
  Car, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Info,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { TRAVEL_PLAN } from '../data/travelPlanData';

interface LocalTransportViewProps {
  currency: 'INR' | 'RUB' | 'USD';
}

export const LocalTransportView: React.FC<LocalTransportViewProps> = ({ currency }) => {
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
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Section 4</span>
            <span className="text-xs text-slate-500">· Intercity & Urban Mobility</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Comprehensive Transportation Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            How to navigate between Moscow and St. Petersburg seamlessly with bullet trains, metro passes, airport express, and taxi apps.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="text-slate-400 block text-[11px]">Total Transport Budget:</span>
          <span className="text-lg font-bold text-amber-300 font-mono">{formatMoney(14000)}</span>
          <span className="text-[11px] text-slate-400 block">≈ 14,735 RUB (All inclusive)</span>
        </div>
      </div>

      {/* 1. INTERCITY BULLET TRAIN: SAPSAN */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Intercity Rail (650 km)</span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Sapsan High-Speed Bullet Train (Moscow ⇄ St. Petersburg)
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">One-Way Fare:</span>
            <span className="text-base font-extrabold text-amber-300 font-mono">
              ~3,500 RUB ({formatMoney(3325)})
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The <strong>Sapsan</strong> (Peregrine Falcon) is Russia’s flagship high-speed electric train built by Siemens. It travels at speeds up to 250 km/h, linking Moscow and St. Petersburg in just <strong>3 hours 45 minutes</strong>—far faster and more relaxing than flying when accounting for airport security lines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Stations & Timing</span>
            <span className="text-slate-400 block">
              Departs: Moscow Leningradsky Station (Metro Komsomolskaya)<br />
              Arrives: St. Petersburg Moskovsky Station (Metro Mayakovskaya / Ploshchad Vosstaniya).
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Luggage & Onboard Comfort</span>
            <span className="text-slate-400 block">
              Up to 36 kg free luggage per ticket in overhead racks. Free water cooler, clean European-standard restrooms, bistro carriage, and power outlets at every seat.
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-white block">Booking Strategy</span>
            <span className="text-slate-400 block">
              Ticket sales open 90 days before departure on <strong>rzd.ru</strong> or Russian travel aggregators (tutu.travel). Booking 45–60 days ahead locks in low-tier fares.
            </span>
          </div>
        </div>

        {/* Overnight train alternative note */}
        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Classic Overnight Alternative:</strong> For an atmospheric Soviet experience, take the legendary <em>Red Arrow (#002 "Krasnaya Strela")</em> overnight sleeper train. Departs Moscow at 23:55 and arrives at St. Petersburg at 07:55 AM. A 4-berth "Kupe" compartment costs ~3,800 RUB and saves one full night of hotel accommodation!
          </span>
        </div>
      </section>

      {/* 2. URBAN TRANSIT CARDS: TROIKA & PODOROZHNIK */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Moscow Troika Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-rose-400" />
              <h4 className="font-bold text-white text-sm">Moscow: Troika Smart Card</h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Cost: 65 RUB / Ride</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The Troika card works on the entire Moscow Metro, MCC (Central Circle), MCD suburban trains, buses, and electric trams.
          </p>

          <ul className="text-xs text-slate-400 space-y-1.5">
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Deposit:</strong> 150 RUB refundable card deposit. Buy at any metro ticket kiosk.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Free Transfers:</strong> 90-minute free transfer between Metro and Central Circle (MCC).</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Budget for 5 Days:</strong> ~1,000 RUB ({formatMoney(950)}) for 15+ unlimited journeys.</span>
            </li>
          </ul>
        </div>

        {/* St. Petersburg Podorozhnik Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-sky-400" />
              <h4 className="font-bold text-white text-sm">St. Petersburg: Podorozhnik Card</h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">Cost: 50–65 RUB / Ride</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Contactless card for St. Petersburg Metro, trolleybuses, buses, and trams across the city canals.
          </p>

          <ul className="text-xs text-slate-400 space-y-1.5">
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Deposit:</strong> 80 RUB refundable card deposit at any metro cashier.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Deep Escalators:</strong> SPb has the world’s deepest metro stations (rides down escalators take 3 minutes!).</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Budget for 5 Days:</strong> ~800 RUB ({formatMoney(760)}) for 12+ rides.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. AIRPORT EXPRESS & TAXI SERVICES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Aeroexpress Airport Train */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white text-sm">Aeroexpress Airport Trains</h4>
            </div>
            <span className="text-[11px] font-mono text-amber-300">550 RUB ({formatMoney(520)})</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Direct electric train operating every 30 minutes from Moscow airports directly to central ring metro stations:
          </p>

          <ul className="text-xs text-slate-400 space-y-1.5">
            <li>• <strong>Sheremetyevo (SVO) ➔ Belorusskaya Station:</strong> 35 minutes nonstop.</li>
            <li>• <strong>Domodedovo (DME) ➔ Paveletskaya Station:</strong> 45 minutes nonstop.</li>
            <li>• <strong>Why Avoid Airport Taxis:</strong> Moscow highway traffic can take 2+ hours during evening rush hour; Aeroexpress runs exactly on the minute!</li>
          </ul>
        </div>

        {/* Yandex Go Taxi App Guide */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Yandex Go (Taxi App)</h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">~300–600 RUB / ride</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Russia’s equivalent to Uber. Clean, highly efficient, and reliable.
          </p>

          <ul className="text-xs text-slate-400 space-y-1.5">
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Download in India:</strong> Install the Yandex Go app from Google Play or App Store before departure.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Set to Cash Payment:</strong> Since Indian cards won’t charge, toggle payment mode to "Cash to Driver".</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Safety Rule:</strong> Never accept rides from touts whispering "Taxi!" in the airport arrivals hall.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
