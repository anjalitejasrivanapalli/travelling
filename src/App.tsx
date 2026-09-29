import React, { useState } from 'react';
import { 
  Wallet, 
  Map, 
  Plane, 
  Building2, 
  Train, 
  UtensilsCrossed, 
  ShieldCheck, 
  Lightbulb,
  Sparkles,
  Printer,
  ChevronRight,
  Compass,
  ArrowRight
} from 'lucide-react';
import { HeaderBanner } from './components/HeaderBanner';
import { BudgetBreakdownView } from './components/BudgetBreakdownView';
import { ItineraryView } from './components/ItineraryView';
import { FlightOptionsView } from './components/FlightOptionsView';
import { AccommodationsView } from './components/AccommodationsView';
import { LocalTransportView } from './components/LocalTransportView';
import { FoodAndDiningView } from './components/FoodAndDiningView';
import { VisaAndRequirementsView } from './components/VisaAndRequirementsView';
import { PracticalTravelTipsView } from './components/PracticalTravelTipsView';
import { AiTravelAgentChat } from './components/AiTravelAgentChat';
import { TRAVEL_PLAN, getPlanSummary } from './data/travelPlanData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('budget');
  const [currency, setCurrency] = useState<'INR' | 'RUB' | 'USD'>('INR');
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);

  const summary = getPlanSummary();

  const tabs = [
    { id: 'budget', label: 'Budget Breakdown', icon: Wallet, badge: '₹1.98L / ₹5L' },
    { id: 'itinerary', label: '11-Day Itinerary', icon: Map, badge: '20–30 Oct' },
    { id: 'flights', label: 'Flight Options', icon: Plane, badge: 'VTZ ⇄ Russia' },
    { id: 'hotels', label: 'Accommodations', icon: Building2, badge: '10 Nights' },
    { id: 'transport', label: 'Local Transport', icon: Train, badge: 'Sapsan & Metro' },
    { id: 'food', label: 'Food & Dining', icon: UtensilsCrossed, badge: '₹1.8k/day' },
    { id: 'visa', label: 'Visa & Regulations', icon: ShieldCheck, badge: 'E-Visa + Cards' },
    { id: 'tips', label: 'Travel Tips & Apps', icon: Lightbulb, badge: 'Survival Guide' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header Banner & Financial Calculation */}
      <HeaderBanner
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      {/* Sticky Tab Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2.5 no-scrollbar gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'budget' && (
          <BudgetBreakdownView
            currency={currency}
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryView currency={currency} />
        )}

        {activeTab === 'flights' && (
          <FlightOptionsView currency={currency} />
        )}

        {activeTab === 'hotels' && (
          <AccommodationsView currency={currency} />
        )}

        {activeTab === 'transport' && (
          <LocalTransportView currency={currency} />
        )}

        {activeTab === 'food' && (
          <FoodAndDiningView currency={currency} />
        )}

        {activeTab === 'visa' && (
          <VisaAndRequirementsView currency={currency} />
        )}

        {activeTab === 'tips' && (
          <PracticalTravelTipsView />
        )}
      </main>

      {/* AI Assistant In-App Modal */}
      <AiTravelAgentChat
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />

      {/* Floating Modal Trigger Button (Docked cleanly on the bottom-left to avoid overlapping n8n widget) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsAiChatOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 font-semibold shadow-xl backdrop-blur-md hover:bg-slate-800 hover:border-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs"
        >
          <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Trip FAQ & n8n AI</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-300">Safar-e-Rus: India to Russia Solo Travel Blueprint</span>
            <span>· 10 Nights / 11 Days (20–30 October 2026)</span>
          </div>
          <div className="text-slate-500 flex items-center gap-3">
            <span>Visakhapatnam (VTZ) ➔ Moscow ➔ St. Petersburg</span>
            <span>·</span>
            <span>Total Budget: ₹5,00,000 | Est. Plan: ₹1,98,500</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
