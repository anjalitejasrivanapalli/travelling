import React from 'react';
import { 
  UtensilsCrossed, 
  Coffee, 
  Leaf, 
  Heart, 
  CheckCircle, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { TRAVEL_PLAN } from '../data/travelPlanData';

interface FoodAndDiningViewProps {
  currency: 'INR' | 'RUB' | 'USD';
}

export const FoodAndDiningView: React.FC<FoodAndDiningViewProps> = ({ currency }) => {
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

  const iconicDishes = [
    {
      name: 'Borscht (Борщ)',
      pronunciation: 'Borshch',
      desc: 'Rich ruby-red beetroot and vegetable soup served piping hot with a dollop of fresh sour cream (smetana) and garlic bread (pampushka).',
      price: '280–400 RUB (~₹265–₹380)',
      vegAvailable: 'Easily ordered as Vegetarian Borscht (Постный борщ).',
    },
    {
      name: 'Pelmeni (Пельмени)',
      pronunciation: 'Pel-MEN-ee',
      desc: 'Traditional Siberian dumplings stuffed with tender minced beef, pork, or mushrooms, boiled and served with melted butter, pepper, and herbs.',
      price: '350–550 RUB (~₹330–₹520)',
      vegAvailable: 'Vareniki (Вареники) with potato, wild forest mushrooms, or cherry.',
    },
    {
      name: 'Beef Stroganoff (Бефстроганов)',
      pronunciation: 'Bef-STRO-ga-nof',
      desc: 'Thinly sliced tender beef sautéed with onions and button mushrooms in a rich sour-cream mustard sauce over fluffy mashed potatoes or buckwheat kasha.',
      price: '550–900 RUB (~₹520–₹855)',
      vegAvailable: 'Mushroom Stroganoff widely available across Moscow & SPb.',
    },
    {
      name: 'Blini (Блины)',
      pronunciation: 'Blee-NEE',
      desc: 'Paper-thin golden Russian crepes. Can be eaten savory (filled with chicken, melted cheese, caviar) or sweet (with wildflower honey, berries, or condensed milk).',
      price: '180–350 RUB (~₹170–₹330)',
      vegAvailable: 'Sweet blini with berries or honey are 100% vegetarian.',
    },
    {
      name: 'Syrniki (Сырники)',
      pronunciation: 'SEER-nee-kee',
      desc: 'Thick, fluffy fried cottage-cheese pancakes with a golden crust and creamy interior, dusted with powdered sugar and served with berry jam.',
      price: '220–350 RUB (~₹210–₹330)',
      vegAvailable: 'Vegetarian breakfast staple.',
    },
    {
      name: 'Pyshki (Пышки)',
      pronunciation: 'PISH-kee',
      desc: 'St. Petersburg’s signature Soviet-era hot donuts fried to crisp golden perfection and showered in powdered sugar, eaten hot with milky coffee.',
      price: '30 RUB each (~₹28) / 120 RUB for full set',
      vegAvailable: 'Vegetarian sweet treat.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Section 5</span>
            <span className="text-xs text-slate-500">· Daily Dining & Culinary Experience</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Daily Food Expenses & Affordable Dining Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Realistic daily allowance for one traveler, featuring Soviet-style canteens, blini houses, and vegetarian/Indian options.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="text-slate-400 block text-[11px]">Total 11-Day Food Budget:</span>
          <span className="text-xl font-bold text-amber-300 font-mono">{formatMoney(20000)}</span>
          <span className="text-[11px] text-emerald-400 block">≈ ₹1,818 / day (~1,910 RUB / day)</span>
        </div>
      </div>

      {/* DAILY MEAL BUDGET BREAKDOWN */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <Coffee className="w-4 h-4 text-amber-400" />
          Single Person Daily Food Expense Allocation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-sky-400 uppercase text-[10px] tracking-wider block">Breakfast</span>
            <div className="text-base font-bold text-white font-mono">300 RUB (~₹285)</div>
            <p className="text-slate-400 text-[11px]">
              Hotel buffet or cozy neighborhood bakery: Syrniki (cheese pancakes), croissants, and coffee.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-amber-400 uppercase text-[10px] tracking-wider block">Hearty Lunch</span>
            <div className="text-base font-bold text-white font-mono">500 RUB (~₹475)</div>
            <p className="text-slate-400 text-[11px]">
              Full 3-course warm cafeteria meal at Stolovaya 57 or Teremok: Borscht, hot blini, and berry tea.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-purple-400 uppercase text-[10px] tracking-wider block">Casual Dinner</span>
            <div className="text-base font-bold text-white font-mono">900 RUB (~₹855)</div>
            <p className="text-slate-400 text-[11px]">
              Sit-down dinner at Varenichnaya No. 1 or Georgian restaurant: dumplings, hot khachapuri, or beef stroganoff.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-emerald-400 uppercase text-[10px] tracking-wider block">Tea & Snacks</span>
            <div className="text-base font-bold text-white font-mono">250 RUB (~₹238)</div>
            <p className="text-slate-400 text-[11px]">
              Afternoon tea, Pyshki doughnuts, hot spiced sbiten in autumn cold, and bottled mineral water.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 flex items-center justify-between">
          <span>✓ Total Daily Expense = <strong>1,950 RUB (approx ₹1,850 INR)</strong> per person.</span>
          <span className="text-slate-300">Generous comfort without overspending!</span>
        </div>
      </section>

      {/* TOP AFFORDABLE LOCAL FOOD CHAINS & CANTEENS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4 text-orange-400" />
          Recommended Affordable Dining Spots in Moscow & St. Petersburg
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Stolovaya 57 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Stolovaya 57 (GUM, Moscow)</h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">Soviet Classic</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Located on the 3rd floor of the iconic GUM department store right on Red Square. Authentic Soviet self-service canteen with red banners, vintage trays, and hearty food at non-tourist prices.
            </p>
            <div className="text-[11px] text-amber-300 font-mono">Average meal: 400–550 RUB (~₹380–₹520)</div>
          </div>

          {/* Teremok */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Teremok (Everywhere)</h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Russian Crepes</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Over 300 locations across Moscow and St. Petersburg. Watch chefs make fresh, oversized blinis right in front of you. Extremely clean, fast, and comforting hot soups.
            </p>
            <div className="text-[11px] text-amber-300 font-mono">Average meal: 350–480 RUB (~₹330–₹455)</div>
          </div>

          {/* Mu-Mu */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Mu-Mu (Moscow)</h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Buffet Style</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Family-friendly cafeterias with spotted cow statues outside. Take a tray and point to what you want: roast chicken, salmon cutlets, buckwheat kasha, Olivier salad, and fresh berry mors.
            </p>
            <div className="text-[11px] text-amber-300 font-mono">Average meal: 450–600 RUB (~₹425–₹570)</div>
          </div>

          {/* Varenichnaya No. 1 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Varenichnaya No. 1</h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Soviet Retro</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Decorated like a 1970s Soviet living room with old record players, books, and rotary phones. Over 20 kinds of dumplings (potato, cheese, cherry, meat) served in cast-iron pots.
            </p>
            <div className="text-[11px] text-amber-300 font-mono">Average meal: 650–850 RUB (~₹615–₹805)</div>
          </div>

          {/* Pyshki 1958 */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Pyshechnaya 1958 (SPb)</h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">Living Museum</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              On Bolshaya Konyushennaya 25. Has operated unchanged since Soviet times. Golden piping-hot ring doughnuts sprinkled with powdered sugar. A true Petersburg cultural institution.
            </p>
            <div className="text-[11px] text-amber-300 font-mono">Average treat: 120–160 RUB (~₹115–₹150)</div>
          </div>

          {/* Georgian Restaurants */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Georgian Cafés (Khachapuri)</h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">Local Favorite</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Georgian food is loved across Russia for its spices, fresh cheeses, garlic, and fresh herbs. Try "Khachapuri & Wine" or "Megobari" for oven-baked cheese boat breads and spiced bean stews.
            </p>
            <div className="text-[11px] text-amber-300 font-mono">Average meal: 700–950 RUB (~₹665–₹900)</div>
          </div>
        </div>
      </section>

      {/* ICONIC DISHES TABLE */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Must-Try Russian Dishes & Pronunciation Guide
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {iconicDishes.map((dish, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{dish.name}</h4>
                  <span className="text-[11px] text-amber-400 font-mono">Pronounced: {dish.pronunciation}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {dish.price}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{dish.desc}</p>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1 border-t border-slate-900">
                <Leaf className="w-3 h-3 shrink-0" />
                <span><strong>Veg alternative:</strong> {dish.vegAvailable}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VEGETARIAN & INDIAN RESTAURANTS GUIDE */}
      <section className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-5 space-y-3.5">
        <div className="flex items-center gap-2 text-emerald-400">
          <Leaf className="w-4 h-4" />
          <h4 className="font-bold text-white text-base">Indian & Vegetarian Travel Guide</h4>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          If you prefer pure vegetarian or authentic Indian food during your trip, both Moscow and St. Petersburg have established options:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-white block">Moscow Indian / Veg Restaurants</span>
            <ul className="text-slate-400 space-y-1 text-[11px]">
              <li>• <strong>Jagannath (Джаганнат):</strong> Popular chain of vegetarian & vegan cafes serving dal, paneer curries, samosas, and chai (~450 RUB/meal).</li>
              <li>• <strong>Dhaba:</strong> Authentic North Indian curries and tandoori rotis near Baumanskaya.</li>
              <li>• <strong>Ganga & Jai Hind:</strong> Long-standing Indian dining spots in central Moscow.</li>
            </ul>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-white block">St. Petersburg Indian / Veg Restaurants</span>
            <ul className="text-slate-400 space-y-1 text-[11px]">
              <li>• <strong>Tandoor (Тандур):</strong> Historic Indian restaurant 2 minutes from St. Isaac’s Cathedral on Voznesensky Prospekt.</li>
              <li>• <strong>Troitsky Most (Троицкий мост):</strong> Vegetarian café chain serving hearty vegetable bakes, quiches, and lentil soups.</li>
              <li>• <strong>Kashmir Café:</strong> Cozy Indian-inspired tea room with vegetarian thalis.</li>
            </ul>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
          <strong>Essential Dietary Russian Phrases:</strong><br />
          • <em>"Ya vegetarianets" (Я вегетарианец)</em> = I am vegetarian.<br />
          • <em>"Bez myasa, pozhaluysta" (Без мяса, пожалуйста)</em> = Without meat, please.<br />
          • <em>"Bez yaits" (Без яиц)</em> = Without eggs.
        </div>
      </section>
    </div>
  );
};
