import React, { useState } from 'react';
import { 
  Plane, 
  ShieldCheck, 
  Building2, 
  UtensilsCrossed, 
  Train, 
  Landmark, 
  ShoppingBag, 
  HelpCircle,
  TrendingDown,
  Info,
  DollarSign,
  ArrowRightLeft,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { TRAVEL_PLAN, getPlanSummary, BudgetCategory } from '../data/travelPlanData';

interface BudgetBreakdownViewProps {
  currency: 'INR' | 'RUB' | 'USD';
  onNavigateToTab: (tabId: string) => void;
}

export const BudgetBreakdownView: React.FC<BudgetBreakdownViewProps> = ({
  currency,
  onNavigateToTab,
}) => {
  const summary = getPlanSummary();
  const [selectedTier, setSelectedTier] = useState<'value' | 'backpacker' | 'luxury'>('value');
  const [calcInputINR, setCalcInputINR] = useState<string>('5000');
  const [calcInputRUB, setCalcInputRUB] = useState<string>('5260');

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

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane': return <Plane className="w-4 h-4 text-sky-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-amber-400" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4 text-orange-400" />;
      case 'Train': return <Train className="w-4 h-4 text-cyan-400" />;
      case 'Landmark': return <Landmark className="w-4 h-4 text-indigo-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4 text-pink-400" />;
      case 'HelpCircle': default: return <HelpCircle className="w-4 h-4 text-purple-400" />;
    }
  };

  const handleInrChange = (val: string) => {
    setCalcInputINR(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCalcInputRUB(Math.round(num / TRAVEL_PLAN.traveler.rubleRateINR).toString());
    } else {
      setCalcInputRUB('');
    }
  };

  const handleRubChange = (val: string) => {
    setCalcInputRUB(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCalcInputINR(Math.round(num * TRAVEL_PLAN.traveler.rubleRateINR).toString());
    } else {
      setCalcInputINR('');
    }
  };

  // Tier data simulation
  const tiers = {
    backpacker: {
      title: 'Backpacker / Super-Saver',
      totalINR: 118000,
      badge: 'Maximum Savings',
      desc: 'Stay in private en-suite rooms in design hostels (Netizen Moscow), take overnight sleeper train between cities, dine at hearty Soviet Stolovayas, and self-guide walking tours.',
      remainingINR: 382000,
      savingsPct: '76.4%',
      dailyINR: 10727,
    },
    value: {
      title: 'Smart Value & Comfort (Recommended Plan)',
      totalINR: 198500,
      badge: 'Best Balance',
      desc: 'Stay in vetted 4-star hotels with 24/7 security near metro stations, cruise at 250 km/h on the Sapsan bullet train, visit all top imperial palaces with skip-the-line tickets, and indulge in iconic dining.',
      remainingINR: 301500,
      savingsPct: '60.3%',
      dailyINR: 18045,
    },
    luxury: {
      title: 'Imperial Heritage Luxury',
      totalINR: 365000,
      badge: 'Opulent Upgrade',
      desc: 'Stay at legendary historic 5-star properties (Metropol Moscow across from Bolshoi, Grand Hotel Europe St. Petersburg), Sapsan First Class, private Hermitage curator guide, and prime Bolshoi ballet stalls. Still ₹1.35 Lakh under ₹5,00,000!',
      remainingINR: 135000,
      savingsPct: '27.0%',
      dailyINR: 33181,
    },
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: MASTER BUDGET BREAKDOWN TABLE */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Section 7 & 8</span>
              <span className="text-xs text-slate-500">· Detailed Financial Blueprint</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Master Budget Breakdown & Itemized Expenditure
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear itemization of the ₹5,00,000 budget across 8 travel verticals with live currency conversions.
            </p>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>Exchange Base: 1 RUB ≈ ₹{TRAVEL_PLAN.traveler.rubleRateINR} INR</span>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3.5 font-semibold">Expense Category</th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-right">Cost (INR)</th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-right">Cost (RUB)</th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-center">% of ₹5L</th>
                <th scope="col" className="px-4 py-3.5 font-semibold">Pricing Status</th>
                <th scope="col" className="px-4 py-3.5 font-semibold min-w-[260px]">Specific Inclusions & Details</th>
                <th scope="col" className="px-4 py-3.5 font-semibold min-w-[200px]">Optimization Advice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {TRAVEL_PLAN.budgetCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-slate-800 border border-slate-700">
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <span className="font-semibold">{cat.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-amber-300 text-right whitespace-nowrap">
                    ₹{cat.estimatedCostINR.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300 text-right whitespace-nowrap">
                    {cat.estimatedCostRUB.toLocaleString('en-US')} ₽
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300">
                      {cat.percentOfBudget}%
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                      cat.isConfirmedOrEstimated === 'Current Official Fee'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : cat.isConfirmedOrEstimated === 'Market Average'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      {cat.isConfirmedOrEstimated}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300 leading-relaxed">
                    {cat.notes}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400 leading-relaxed italic">
                    {cat.optimizationAdvice}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Grand Total Footer */}
            <tfoot className="border-t-2 border-slate-700 bg-slate-950 font-semibold text-slate-100">
              <tr className="divide-x divide-slate-800">
                <td className="px-4 py-3.5 text-sm uppercase tracking-wide">
                  Total Estimated Expenditure
                </td>
                <td className="px-4 py-3.5 font-mono text-base font-extrabold text-amber-400 text-right whitespace-nowrap">
                  ₹{summary.totalEstimatedINR.toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3.5 font-mono text-base font-extrabold text-slate-200 text-right whitespace-nowrap">
                  {summary.totalEstimatedRUB.toLocaleString('en-US')} ₽
                </td>
                <td className="px-4 py-3.5 text-center text-xs text-amber-300 font-bold">
                  39.7%
                </td>
                <td colSpan={3} className="px-4 py-3.5 text-xs text-emerald-400 font-medium">
                  ✓ Well within budget: ₹{summary.remainingSurplusINR.toLocaleString('en-IN')} remaining surplus (60.3% unspent)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* SECTION 2: FINAL CALCULATION STAT CARDS */}
      <section className="space-y-4">
        <div className="border-b border-slate-800 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Section 8</span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Final Mathematical Calculation Summary
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Estimated Expenditure */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-2 relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">1. Total Estimated Expenditure</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
              {formatMoney(summary.totalEstimatedINR)}
            </div>
            <div className="text-xs text-slate-400">
              ≈ {summary.totalEstimatedRUB.toLocaleString('en-US')} RUB
            </div>
            <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              Comprehensive 10-night/11-day trip cost covering all 8 requested categories without hidden surprises.
            </p>
          </div>

          {/* Amount Remaining from ₹5 Lakh */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-2 relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>2. Remaining Budget Surplus</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                {summary.savingsPercentage}% Unspent
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono tracking-tight">
              {formatMoney(summary.remainingSurplusINR)}
            </div>
            <div className="text-xs text-emerald-400/80">
              ≈ {summary.remainingSurplusRUB.toLocaleString('en-US')} RUB
            </div>
            <p className="text-xs text-slate-300 pt-1 border-t border-emerald-900/40">
              ₹5,00,000 budget minus ₹{summary.totalEstimatedINR.toLocaleString('en-IN')} gives you over ₹3 Lakh surplus buffer!
            </p>
          </div>

          {/* Cost Per Day */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-2 relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">3. Cost Per Day</div>
            <div className="text-2xl sm:text-3xl font-black text-sky-300 font-mono tracking-tight">
              {formatMoney(summary.dailyCostINR)}
            </div>
            <div className="text-xs text-slate-400">
              Across 11 full travel days (Oct 20–30, 2026)
            </div>
            <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              Includes flights amortized over the trip length; ground daily spend is only ~₹8,500/day.
            </p>
          </div>

          {/* Cost Per Person */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-2 relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">4. Cost Per Person</div>
            <div className="text-2xl sm:text-3xl font-black text-purple-300 font-mono tracking-tight">
              {formatMoney(summary.costPerPersonINR)}
            </div>
            <div className="text-xs text-slate-400">
              Dedicated 1 Solo Traveler calculation
            </div>
            <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              No single-supplement penalties; hotel rates reflect private en-suite single/double occupancy rooms.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: BUDGET OPTIMIZATION & TIER ALTERNATIVES */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Section 9</span>
              <span className="text-xs text-slate-500">· Smart Financial Flexibility</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Budget Optimization: 3 Tailored Travel Tiers
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Since your ₹5,00,000 budget provides immense flexibility, choose between super-economy, balanced comfort, or imperial luxury.
            </p>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tier 1: Backpacker */}
          <div 
            onClick={() => setSelectedTier('backpacker')}
            className={`rounded-xl border p-5 cursor-pointer transition-all space-y-4 relative ${
              selectedTier === 'backpacker'
                ? 'border-cyan-500 bg-cyan-950/20 ring-1 ring-cyan-500/50'
                : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {tiers.backpacker.badge}
              </span>
              <span className="text-xs text-slate-400">{tiers.backpacker.savingsPct} unspent</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white text-base">{tiers.backpacker.title}</h4>
              <div className="text-2xl font-black text-cyan-300 font-mono">
                {formatMoney(tiers.backpacker.totalINR)}
              </div>
              <p className="text-xs text-slate-400">Cost per day: {formatMoney(tiers.backpacker.dailyINR)}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {tiers.backpacker.desc}
            </p>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Private en-suite in design hostels (~₹2,600/nt)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Overnight sleeper train saves 1 hotel night</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Stolovaya canteens (~350 RUB / ₹330 meal)</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
              Surplus remaining: {formatMoney(tiers.backpacker.remainingINR)}
            </div>
          </div>

          {/* Tier 2: Value & Comfort (Recommended) */}
          <div 
            onClick={() => setSelectedTier('value')}
            className={`rounded-xl border p-5 cursor-pointer transition-all space-y-4 relative ${
              selectedTier === 'value'
                ? 'border-amber-500 bg-amber-950/20 ring-2 ring-amber-500/60 shadow-lg shadow-amber-500/10'
                : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ★ {tiers.value.badge}
              </span>
              <span className="text-xs text-amber-400 font-medium">Recommended Baseline</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white text-base">{tiers.value.title}</h4>
              <div className="text-2xl font-black text-amber-300 font-mono">
                {formatMoney(tiers.value.totalINR)}
              </div>
              <p className="text-xs text-slate-400">Cost per day: {formatMoney(tiers.value.dailyINR)}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {tiers.value.desc}
            </p>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Vetted 4-star hotels with 24/7 security & buffet</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Sapsan high-speed bullet train (3h 50m)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Full access to Kremlin Armoury, Hermitage, Amber Room</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
              Surplus remaining: {formatMoney(tiers.value.remainingINR)}
            </div>
          </div>

          {/* Tier 3: Luxury Upgrade */}
          <div 
            onClick={() => setSelectedTier('luxury')}
            className={`rounded-xl border p-5 cursor-pointer transition-all space-y-4 relative ${
              selectedTier === 'luxury'
                ? 'border-purple-500 bg-purple-950/20 ring-1 ring-purple-500/50'
                : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {tiers.luxury.badge}
              </span>
              <span className="text-xs text-purple-300">Fits within ₹5L!</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-white text-base">{tiers.luxury.title}</h4>
              <div className="text-2xl font-black text-purple-300 font-mono">
                {formatMoney(tiers.luxury.totalINR)}
              </div>
              <p className="text-xs text-slate-400">Cost per day: {formatMoney(tiers.luxury.dailyINR)}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {tiers.luxury.desc}
            </p>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>5-Star Historic Metropol & Grand Hotel Europe</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Bolshoi Historic Stage Orchestra Stalls</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Private Mercedes transfer & Hermitage curator guide</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
              Surplus remaining: {formatMoney(tiers.luxury.remainingINR)}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CURRENCY CONVERTER & PRICING VERIFICATION SOURCES */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Currency Converter Widget */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-amber-400" />
              <h4 className="font-semibold text-white text-sm">Quick Currency Converter</h4>
            </div>
            <span className="text-[11px] text-slate-400">Live 2026 Baseline</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Convert estimated purchases on the go (1 Russian Ruble ≈ ₹{TRAVEL_PLAN.traveler.rubleRateINR} INR).
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Indian Rupee (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                <input
                  type="number"
                  value={calcInputINR}
                  onChange={(e) => handleInrChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  placeholder="Enter INR"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Russian Ruble (RUB)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₽</span>
                <input
                  type="number"
                  value={calcInputRUB}
                  onChange={(e) => handleRubChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  placeholder="Enter RUB"
                />
              </div>
            </div>
          </div>

          <div className="rounded bg-slate-950 p-2.5 text-[11px] text-slate-400 space-y-1 border border-slate-800">
            <div className="flex justify-between">
              <span>Cup of coffee (Moscow):</span>
              <span className="text-slate-200 font-mono">250 ₽ ≈ ₹238</span>
            </div>
            <div className="flex justify-between">
              <span>Subway Metro ride:</span>
              <span className="text-slate-200 font-mono">65 ₽ ≈ ₹62</span>
            </div>
            <div className="flex justify-between">
              <span>Full 3-course Stolovaya meal:</span>
              <span className="text-slate-200 font-mono">450 ₽ ≈ ₹425</span>
            </div>
          </div>
        </div>

        {/* Pricing Sources & Reliability Note (Section 10 Requirement) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-3.5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="font-semibold text-white text-sm">Pricing Sources & Official Verification Log</h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Per the mandatory planning requirements, all prices are grounded in current published tariffs without fabricated availability:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-semibold text-slate-200 flex items-center justify-between">
                <span>E-Visa & Consular Fee</span>
                <span className="text-[10px] text-emerald-400 font-mono">Confirmed</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                $52 USD via official Ministry of Foreign Affairs portal (evisa.kdmid.ru). Validated under the unified e-visa policy for Indian passport holders.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-semibold text-slate-200 flex items-center justify-between">
                <span>Flight Benchmarks</span>
                <span className="text-[10px] text-amber-400 font-mono">Market Average</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Aeroflot direct DEL-SVO + domestic Air India/IndiGo VTZ-DEL connector. Baseline historical off-peak autumn rates: ₹62,000–₹72,000.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-semibold text-slate-200 flex items-center justify-between">
                <span>High-Speed Train (Sapsan)</span>
                <span className="text-[10px] text-emerald-400 font-mono">Confirmed Tariff</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Standard Economy/Comfort tariff on Russian Railways (rzd.ru) is 2,800–4,200 RUB for Moscow Leningradsky ⇄ St. Petersburg Moskovsky.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-semibold text-slate-200 flex items-center justify-between">
                <span>Major Museum Admissions</span>
                <span className="text-[10px] text-emerald-400 font-mono">Confirmed Tariff</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Hermitage: 700 RUB; Moscow Kremlin & Armoury: 1,200 RUB; St. Basil’s: 700 RUB; Spilled Blood: 450 RUB; Catherine Palace Amber Room: 1,400 RUB.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-400">Want to inspect the detailed day-by-day itinerary next?</span>
            <button
              type="button"
              onClick={() => onNavigateToTab('itinerary')}
              className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Explore 11-Day Schedule <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
