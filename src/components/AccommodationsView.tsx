import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Train, 
  Star, 
  CheckCircle, 
  Sparkles, 
  Wifi, 
  Thermometer, 
  Coffee,
  Info
} from 'lucide-react';
import { TRAVEL_PLAN, HotelOption } from '../data/travelPlanData';

interface AccommodationsViewProps {
  currency: 'INR' | 'RUB' | 'USD';
}

export const AccommodationsView: React.FC<AccommodationsViewProps> = ({ currency }) => {
  const [selectedMoscowHotelId, setSelectedMoscowHotelId] = useState<string>('hotel-mow-vega');
  const [selectedSpbHotelId, setSelectedSpbHotelId] = useState<string>('hotel-spb-station');

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

  const moscowHotels = TRAVEL_PLAN.accommodations.filter(h => h.city === 'Moscow');
  const spbHotels = TRAVEL_PLAN.accommodations.filter(h => h.city === 'St. Petersburg');

  const activeMoscow = moscowHotels.find(h => h.id === selectedMoscowHotelId) || moscowHotels[0];
  const activeSpb = spbHotels.find(h => h.id === selectedSpbHotelId) || spbHotels[0];

  const totalAccommodationCostINR = activeMoscow.totalCostINR + activeSpb.totalCostINR;
  const totalAccommodationCostRUB = activeMoscow.totalCostRUB + activeSpb.totalCostRUB;

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Section 2</span>
            <span className="text-xs text-slate-500">· Safe & Affordable Solo Stays</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Curated Accommodations: Moscow & St. Petersburg
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Selected specifically for solo travel security, proximity to Metro stations (&lt;5 min walk), 24/7 reception, and central heating.
          </p>
        </div>

        {/* Total Cost Counter */}
        <div className="rounded-xl bg-slate-900 border border-amber-500/30 p-3.5 sm:text-right shrink-0">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Combined 10-Night Accommodation Total
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
            {formatMoney(totalAccommodationCostINR)}
          </div>
          <div className="text-xs text-emerald-400 font-medium">
            5 Nights Moscow + 5 Nights St. Petersburg
          </div>
        </div>
      </div>

      {/* CITY 1: MOSCOW HOTELS (5 Nights: Oct 20 - 25) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-300 uppercase">
              Part 1: Moscow
            </span>
            <h3 className="font-bold text-white text-base">5 Nights (20 Oct – 25 Oct 2026)</h3>
          </div>
          <span className="text-xs text-slate-400">Select preferred property</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {moscowHotels.map((hotel) => {
            const isSelected = hotel.id === selectedMoscowHotelId;
            return (
              <div
                key={hotel.id}
                onClick={() => setSelectedMoscowHotelId(hotel.id)}
                className={`rounded-xl border p-5 cursor-pointer transition-all flex flex-col justify-between space-y-4 relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-950/20 ring-2 ring-amber-500/50 shadow-lg'
                    : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {hotel.recommendedPick && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                        Recommended Solo Pick
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-base leading-snug">{hotel.name}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{hotel.neighborhood}</span>
                    </p>
                  </div>

                  {/* Price & Nightly calculation */}
                  <div className="space-y-1 bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Nightly Rate:</span>
                      <span className="font-mono font-bold text-white text-sm">
                        {formatMoney(hotel.pricePerNightINR)} <span className="text-[11px] text-slate-400 font-normal">/ night</span>
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-slate-800/80 pt-1">
                      <span className="text-xs text-slate-400">5-Night Total:</span>
                      <span className="font-mono font-extrabold text-amber-300 text-base">
                        {formatMoney(hotel.totalCostINR)}
                      </span>
                    </div>
                  </div>

                  {/* Metro proximity */}
                  <div className="text-xs text-sky-400 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 shrink-0" />
                    <span>{hotel.metroProximity}</span>
                  </div>

                  {/* Highlight */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hotel.highlight}
                  </p>

                  {/* Safety Features */}
                  <div className="space-y-1 pt-1 border-t border-slate-800/60 text-xs">
                    <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Safety: {hotel.safetyRating}
                    </div>
                    <ul className="text-[11px] text-slate-400 space-y-0.5">
                      {hotel.safetyFeatures.map((f, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <span className="text-emerald-500">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs font-semibold flex items-center justify-between">
                  <span className={isSelected ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                    {isSelected ? '✓ Selected for Moscow' : 'Click to Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CITY 2: ST. PETERSBURG HOTELS (5 Nights: Oct 25 - 30) */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-sky-500/20 text-sky-300 uppercase">
              Part 2: St. Petersburg
            </span>
            <h3 className="font-bold text-white text-base">5 Nights (25 Oct – 30 Oct 2026)</h3>
          </div>
          <span className="text-xs text-slate-400">Select preferred property</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {spbHotels.map((hotel) => {
            const isSelected = hotel.id === selectedSpbHotelId;
            return (
              <div
                key={hotel.id}
                onClick={() => setSelectedSpbHotelId(hotel.id)}
                className={`rounded-xl border p-5 cursor-pointer transition-all flex flex-col justify-between space-y-4 relative ${
                  isSelected
                    ? 'border-sky-500 bg-sky-950/20 ring-2 ring-sky-500/50 shadow-lg'
                    : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {hotel.recommendedPick && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                        Recommended Solo Pick
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-base leading-snug">{hotel.name}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{hotel.neighborhood}</span>
                    </p>
                  </div>

                  {/* Price & Nightly calculation */}
                  <div className="space-y-1 bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Nightly Rate:</span>
                      <span className="font-mono font-bold text-white text-sm">
                        {formatMoney(hotel.pricePerNightINR)} <span className="text-[11px] text-slate-400 font-normal">/ night</span>
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-slate-800/80 pt-1">
                      <span className="text-xs text-slate-400">5-Night Total:</span>
                      <span className="font-mono font-extrabold text-sky-300 text-base">
                        {formatMoney(hotel.totalCostINR)}
                      </span>
                    </div>
                  </div>

                  {/* Metro proximity */}
                  <div className="text-xs text-sky-400 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 shrink-0" />
                    <span>{hotel.metroProximity}</span>
                  </div>

                  {/* Highlight */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hotel.highlight}
                  </p>

                  {/* Safety Features */}
                  <div className="space-y-1 pt-1 border-t border-slate-800/60 text-xs">
                    <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Safety: {hotel.safetyRating}
                    </div>
                    <ul className="text-[11px] text-slate-400 space-y-0.5">
                      {hotel.safetyFeatures.map((f, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <span className="text-emerald-500">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs font-semibold flex items-center justify-between">
                  <span className={isSelected ? 'text-sky-400 font-bold' : 'text-slate-500'}>
                    {isSelected ? '✓ Selected for St. Petersburg' : 'Click to Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Solo Traveler Safety & Registration Policy */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Mandatory Hotel Registration (Migratsionny Uchet) Protocol
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          Under Russian Federal Law, foreign travelers staying at any registered hotel or hostel are automatically registered with the migration authorities. At check-in:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 pt-1">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">1. Check-In Submission</span>
            <span>Hand over your passport, e-visa printout, and stamped migration white slip.</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">2. Registration Slip</span>
            <span>The hotel issues a paper registration slip (usually free or small 200–300 RUB administrative stamp). Keep this inside your passport until border exit!</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 block">3. Safety Features</span>
            <span>All recommended hotels feature electronic keycard access, 24/7 security desks, English-speaking staff, and secure indoor luggage lockers.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
