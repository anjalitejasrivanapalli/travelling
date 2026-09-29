import React, { useState } from 'react';
import { 
  Plane, 
  Clock, 
  Luggage, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight, 
  Info,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { TRAVEL_PLAN, FlightOption } from '../data/travelPlanData';

interface FlightOptionsViewProps {
  currency: 'INR' | 'RUB' | 'USD';
}

export const FlightOptionsView: React.FC<FlightOptionsViewProps> = ({ currency }) => {
  const [selectedFlightId, setSelectedFlightId] = useState<string>('flight-aeroflot');

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

  const selectedFlight = TRAVEL_PLAN.flightOptions.find(f => f.id === selectedFlightId) || TRAVEL_PLAN.flightOptions[0];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">Section 1</span>
          <span className="text-xs text-slate-500">· Flight Options & Transit Architecture</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Round-Trip Flight Routes: Visakhapatnam (VTZ) ⇄ Russia
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Evaluated for best airfare, baggage allowances, shortest transit layovers, and maximum reliability for an Indian solo traveler.
        </p>
      </div>

      {/* Flight comparison cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {TRAVEL_PLAN.flightOptions.map((opt) => {
          const isSelected = opt.id === selectedFlightId;
          return (
            <div
              key={opt.id}
              onClick={() => setSelectedFlightId(opt.id)}
              className={`rounded-xl border p-5 cursor-pointer transition-all flex flex-col justify-between space-y-4 relative ${
                isSelected
                  ? 'border-sky-500 bg-sky-950/20 ring-2 ring-sky-500/50 shadow-lg shadow-sky-500/10'
                  : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                    opt.statusLabel === 'Recommended'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : opt.statusLabel === 'Budget Alternative'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {opt.statusLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">1 Adult Round-Trip</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{opt.airline}</h3>
                  <p className="text-xs text-slate-400 truncate">{opt.route}</p>
                </div>

                <div className="space-y-1 py-1">
                  <div className="text-2xl font-black text-amber-300 font-mono tracking-tight">
                    {formatMoney(opt.estimatedRoundTripINR)}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Estimated round-trip airfare (incl. taxes & surcharges)
                  </div>
                </div>

                {/* Baggage allowance */}
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-sky-400">
                    <Luggage className="w-3.5 h-3.5" />
                    <span>Baggage Policy</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    <span className="font-semibold text-white">Checked:</span> {opt.baggage.checked}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    <span className="font-semibold text-slate-300">Cabin:</span> {opt.baggage.cabin}
                  </div>
                </div>

                {/* Quick Pros */}
                <ul className="space-y-1 text-xs text-slate-300 pt-1">
                  {opt.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-[11px]">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-xs font-semibold flex items-center justify-between text-slate-400">
                <span>{isSelected ? 'Currently Selected' : 'Click to View Full Leg Details'}</span>
                <span className={isSelected ? 'text-sky-400' : 'text-slate-500'}>
                  {isSelected ? '✓ Selected' : 'Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Flight Detailed Flight Schedules */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">Detailed Flight Schedule</span>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Plane className="w-5 h-5 text-sky-400" />
              {selectedFlight.airline}
            </h3>
            <p className="text-xs text-slate-400">{selectedFlight.route}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-amber-300 font-mono">
              {formatMoney(selectedFlight.estimatedRoundTripINR)}
            </div>
            <div className="text-xs text-emerald-400 font-semibold">
              Selected in ₹5,00,000 Budget
            </div>
          </div>
        </div>

        {/* Two Legs (Outbound & Return) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Leg 1: Outbound */}
          <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 uppercase">
                  Outbound Leg
                </span>
                <span className="text-xs text-slate-300 font-semibold">20 October 2026 (Tue)</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedFlight.outbound.totalDuration}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Visakhapatnam (VTZ)</div>
                  <div className="text-xs text-slate-400">{selectedFlight.outbound.departureTime}</div>
                  <div className="text-[11px] text-sky-400 font-mono mt-0.5">Flight: {selectedFlight.outbound.flightNumbers.split('+')[0]}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 mt-2 shrink-0" />
                <div className="text-right">
                  <div className="text-sm font-bold text-white">Transit Hub</div>
                  <div className="text-xs text-slate-400">{selectedFlight.outbound.layover}</div>
                  <div className="text-[11px] text-amber-400">Connection Window</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Transit Hub Departure</div>
                  <div className="text-[11px] text-sky-400 font-mono">Flight: {selectedFlight.outbound.flightNumbers.split('+')[1] || selectedFlight.outbound.flightNumbers}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 mt-2 shrink-0" />
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">Moscow Arrival</div>
                  <div className="text-xs text-slate-300 font-semibold">{selectedFlight.outbound.arrivalTime}</div>
                  <div className="text-[11px] text-slate-400">Clear Russian Border & E-Visa</div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800/80 leading-relaxed">
              💡 <strong>Transit Note:</strong> When connecting through Delhi Terminal 3, your checked bag is automatically transferred to Aeroflot. Proceed directly through international flight transfer security to board the flight to Moscow.
            </div>
          </div>

          {/* Leg 2: Return */}
          <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 uppercase">
                  Return Leg
                </span>
                <span className="text-xs text-slate-300 font-semibold">30 October 2026 (Fri)</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedFlight.returnFlight.totalDuration}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Russia Departure</div>
                  <div className="text-xs text-slate-400">{selectedFlight.returnFlight.departureTime}</div>
                  <div className="text-[11px] text-amber-400 font-mono mt-0.5">Flight: {selectedFlight.returnFlight.flightNumbers.split('+')[0]}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 mt-2 shrink-0" />
                <div className="text-right">
                  <div className="text-sm font-bold text-white">Transit Hub</div>
                  <div className="text-xs text-slate-400">{selectedFlight.returnFlight.layover}</div>
                  <div className="text-[11px] text-sky-400">Clear India Customs</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Domestic Connector</div>
                  <div className="text-[11px] text-sky-400 font-mono">Flight: {selectedFlight.returnFlight.flightNumbers.split('+')[1] || 'Domestic Link'}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 mt-2 shrink-0" />
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">Visakhapatnam (VTZ)</div>
                  <div className="text-xs text-slate-300 font-semibold">{selectedFlight.returnFlight.arrivalTime}</div>
                  <div className="text-[11px] text-slate-400">Home Safe & Sound</div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800/80 leading-relaxed">
              💡 <strong>Arrival Note:</strong> Arrive back in Visakhapatnam around midday on Saturday, 31 October 2026. Keep your Russian souvenir receipts and declared caviar containers easily accessible in your checked luggage for Indian customs.
            </div>
          </div>
        </div>

        {/* Practical Flight Booking & Baggage Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-400" /> Best Booking Window
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Book this route between <strong>April and June 2026</strong> (4 to 6 months in advance). October is early shoulder season, which keeps airfares economical.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Luggage className="w-3.5 h-3.5 text-amber-400" /> Baggage Packing Tip
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              The 23 kg checked bag is ample for warm autumn clothing (heavy jacket, boots, thermals) with at least 8 kg of spare weight for Russian chocolate, matryoshkas, and tea.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Single Ticket Guarantee
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Always issue VTZ-DEL-SVO on a <strong>single PNR ticket</strong>. If a domestic fog or delay happens in VTZ, the airline is legally obligated to rebook the international sector free of charge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
