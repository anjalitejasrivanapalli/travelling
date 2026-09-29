import React from 'react';
import { 
  AlertTriangle, 
  Smartphone, 
  PhoneCall, 
  Languages, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  Info,
  Clock,
  Compass
} from 'lucide-react';

export const PracticalTravelTipsView: React.FC = () => {
  const vocabulary = [
    { ru: 'Здравствуйте (Zdravstvuyte)', en: 'Hello (Formal)' },
    { ru: 'Привет (Privet)', en: 'Hi (Informal)' },
    { ru: 'Спасибо (Spasibo)', en: 'Thank you' },
    { ru: 'Пожалуйста (Pozhaluysta)', en: 'Please / You’re welcome' },
    { ru: 'Да / Нет (Da / Net)', en: 'Yes / No' },
    { ru: 'Сколько это стоит? (Skolko stoit?)', en: 'How much does this cost?' },
    { ru: 'Где метро? (Gde metro?)', en: 'Where is the metro station?' },
    { ru: 'Счёт, пожалуйста (Schot, pozhaluysta)', en: 'The bill/check, please' },
    { ru: 'Вы говорите по-английски? (Vy govorite po-angliyski?)', en: 'Do you speak English?' },
    { ru: 'Без мяса (Bez myasa)', en: 'Without meat (Vegetarian)' },
  ];

  const apps = [
    {
      name: 'Yandex Maps (Яндекс Карты)',
      why: 'Far more detailed than Google Maps in Russia. Shows real-time bus arrivals, metro entrance numbers, pedestrian passageways, and indoor museum layouts.',
    },
    {
      name: 'Yandex Go (Taxi)',
      why: 'The essential ride-hailing app. Set payment mode to "Cash" so you can pay Russian ruble bills directly to the driver with fixed in-app fares.',
    },
    {
      name: 'Yandex Metro (Метро)',
      why: 'Interactive subway maps for Moscow and St. Petersburg in English romanization. Tells you exactly which train car to board for the fastest transfer.',
    },
    {
      name: 'Yandex Translate',
      why: 'Download the offline Russian-English language dictionary and use camera lens translation to read restaurant menus, street signs, and museum placards in seconds.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Section 10</span>
          <span className="text-xs text-slate-500">· Practical Solo Traveler Survival Guide</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Field Manual & Practical Travel Tips for Russia (2026)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Crucial offline apps, cultural etiquette, language survival kit, and Indian consular contacts in Moscow and St. Petersburg.
        </p>
      </div>

      {/* 1. APPS TO INSTALL IN INDIA BEFORE FLYING */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <Smartphone className="w-4 h-4 text-sky-400" />
          <h3 className="font-bold text-white text-base">
            Essential Smartphone Apps (Install Before Leaving Visakhapatnam)
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Google Services operate with limited local data inside Russia. The Yandex ecosystem is universally used by locals and tourists alike:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {apps.map((app, idx) => (
            <div key={idx} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <h4 className="font-bold text-sky-300 text-sm">{app.name}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">{app.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CULTURAL ETIQUETTE & LOCAL NORMS */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white text-base">Local Etiquette, Traditions & Safety Rules</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-300 block">The Cloakroom Culture (Гардероб)</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              In theaters, museums, and mid-to-high-end restaurants, wearing heavy winter coats inside the dining room or auditorium is considered impolite. Hand your coat to the cloakroom attendant, who will hand you a plastic numbered token (nomerok).
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-300 block">Orthodox Cathedral Decorum</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              When entering functioning Orthodox churches (like Cathedral of Christ the Saviour or Kazan Cathedral), men must remove all hats and beanies. Women traditionally cover their heads with a light scarf or shawl. Keep voices hushed.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <span className="font-bold text-sky-300 block">Metro Escalator Discipline</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Always stand strictly on the <strong>right side</strong> of the moving escalators. The left side is reserved for commuters walking up or down rapidly. Never sit on the escalator steps.
            </p>
          </div>
        </div>
      </section>

      {/* 3. RUSSIAN LANGUAGE SURVIVAL VOCABULARY */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-orange-400" />
            <h3 className="font-bold text-white text-base">Key Russian Travel Vocabulary</h3>
          </div>
          <span className="text-xs text-slate-400">Locals deeply appreciate tourists trying Russian words</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {vocabulary.map((item, idx) => (
            <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-0.5">
              <span className="font-bold text-white block text-xs">{item.ru}</span>
              <span className="text-[11px] text-amber-400 block">{item.en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EMERGENCY & INDIAN CONSULAR CONTACTS */}
      <section className="rounded-xl border border-rose-500/30 bg-rose-950/10 p-5 space-y-3.5">
        <div className="flex items-center gap-2 text-rose-400">
          <PhoneCall className="w-4 h-4" />
          <h3 className="font-bold text-white text-base">Emergency & Indian Embassy Assistance Contacts</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Keep these official numbers saved in your phone and written on a slip in your wallet:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-white block">Universal Russian Emergency</span>
            <div className="text-lg font-mono font-bold text-rose-400">112</div>
            <span className="text-slate-400 text-[11px] block">Free from any mobile phone (Police, Fire, Medical, English operator available).</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-white block">Embassy of India, Moscow</span>
            <div className="text-xs font-mono text-amber-300 font-semibold">+7 (495) 783-7535</div>
            <span className="text-slate-400 text-[11px] block">
              Address: Ulitsa Vorontsovo Pole 6-8, Moscow (near Kurskaya Metro). Emergency helpline active 24/7.
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-white block">Consulate General of India, St. Petersburg</span>
            <div className="text-xs font-mono text-amber-300 font-semibold">+7 (812) 640-7222</div>
            <span className="text-slate-400 text-[11px] block">
              Address: Ulitsa Ryleyeva 35, St. Petersburg (near Chernyshevskaya Metro).
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
