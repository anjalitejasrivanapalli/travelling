import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  Train, 
  Utensils, 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Compass,
  Building2,
  Navigation
} from 'lucide-react';
import { TRAVEL_PLAN, DayItinerary, ItineraryItem } from '../data/travelPlanData';

interface ItineraryViewProps {
  currency: 'INR' | 'RUB' | 'USD';
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ currency }) => {
  const [filterCity, setFilterCity] = useState<'All' | 'Moscow' | 'St. Petersburg' | 'Transit'>('All');
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    6: true,
    7: true,
  });

  const toggleDay = (dayNum: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    TRAVEL_PLAN.itinerary.forEach(d => { all[d.dayNumber] = true; });
    setExpandedDays(all);
  };

  const collapseAll = () => {
    setExpandedDays({});
  };

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

  const filteredDays = TRAVEL_PLAN.itinerary.filter(d => {
    if (filterCity === 'All') return true;
    if (filterCity === 'Moscow') return d.city === 'Moscow' || (d.dayNumber === 1 && d.city === 'Transit');
    if (filterCity === 'St. Petersburg') return d.city === 'St. Petersburg';
    if (filterCity === 'Transit') return d.city === 'Transit';
    return true;
  });

  const renderActivityBlock = (item: ItineraryItem, badgeColor: string) => {
    return (
      <div className="rounded-lg bg-slate-950 p-4 border border-slate-800/80 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
              {item.timeOfDay}
            </span>
            <h5 className="font-bold text-white text-sm sm:text-base mt-1">{item.title}</h5>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
              <span>{item.location}</span>
            </p>
          </div>

          <div className="text-right shrink-0">
            {item.isFree ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Free Entry
              </span>
            ) : (
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-bold text-amber-300 block">
                  {formatMoney(item.entryFeeINR)}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {item.entryFeeRUB.toLocaleString()} RUB
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {item.description}
        </p>

        {/* Transit instructions */}
        {item.transitTip && (
          <div className="text-xs text-sky-300 bg-sky-950/30 p-2.5 rounded border border-sky-900/40 flex items-start gap-2">
            <Train className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed"><strong>Transit:</strong> {item.transitTip}</span>
          </div>
        )}

        {/* Dining Recommendation */}
        {item.foodSuggestion && (
          <div className="text-xs text-orange-300 bg-orange-950/20 p-2.5 rounded border border-orange-900/30 flex items-start gap-2">
            <Utensils className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed"><strong>Food Recommendation:</strong> {item.foodSuggestion}</span>
          </div>
        )}

        {/* Insider Tip */}
        {item.insiderTip && (
          <div className="text-xs text-amber-300 bg-amber-950/20 p-2.5 rounded border border-amber-900/30 flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed"><strong>Insider Tip:</strong> {item.insiderTip}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Section 3</span>
            <span className="text-xs text-slate-500">· 10 Nights / 11 Days Itinerary</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Curated Day-by-Day Russia Itinerary (20–30 Oct 2026)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Intelligently paced schedule avoiding exhaustion: Red Square, Kremlin Armoury, Hermitage, Amber Room, Metro Palaces, and authentic culinary stops.
          </p>
        </div>

        {/* Expand / Collapse buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={expandAll}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            Expand All Days
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Filter Tabs by City */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium mr-1">Filter Region:</span>
        {(['All', 'Moscow', 'St. Petersburg', 'Transit'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterCity(tab)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              filterCity === tab
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {tab === 'All' ? 'Full 11-Day Schedule' : tab}
          </button>
        ))}
      </div>

      {/* Day Cards List */}
      <div className="space-y-5">
        {filteredDays.map((day) => {
          const isExpanded = !!expandedDays[day.dayNumber];
          return (
            <div
              key={day.dayNumber}
              className="rounded-xl border border-slate-800 bg-slate-900/80 shadow-md transition-all overflow-hidden"
            >
              {/* Day Card Header Bar */}
              <div
                onClick={() => toggleDay(day.dayNumber)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-850/60 transition-colors border-b border-slate-800/80"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 shrink-0 font-mono">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">DAY</span>
                    <span className="text-lg font-black text-amber-400 leading-none">{day.dayNumber}</span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-slate-300">
                        {day.dayOfWeek}, {day.date}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        day.city === 'Moscow'
                          ? 'bg-rose-500/20 text-rose-300'
                          : day.city === 'St. Petersburg'
                          ? 'bg-sky-500/20 text-sky-300'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {day.city}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Pace: {day.pace}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {day.headline}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-15 sm:pl-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Est. Day Spend</span>
                    <span className="font-mono font-bold text-xs sm:text-sm text-amber-300">
                      {formatMoney(day.dayTotalEstimatedINR)}
                    </span>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-800 text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Day Card Expanded Body */}
              {isExpanded && (
                <div className="p-4 sm:p-6 bg-slate-900/40 space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Morning */}
                    {renderActivityBlock(day.morning, 'bg-amber-500/20 text-amber-300 border border-amber-500/30')}

                    {/* Afternoon */}
                    {renderActivityBlock(day.afternoon, 'bg-sky-500/20 text-sky-300 border border-sky-500/30')}

                    {/* Evening */}
                    {renderActivityBlock(day.evening, 'bg-purple-500/20 text-purple-300 border border-purple-500/30')}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
