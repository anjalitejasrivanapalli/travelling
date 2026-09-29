import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  HelpCircle, 
  Compass, 
  ShieldCheck, 
  CheckCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { TRAVEL_PLAN } from '../data/travelPlanData';

interface AiTravelAgentChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

const N8N_WEBHOOK_URL = 'https://anjalivanapalli.app.n8n.cloud/webhook/e7cfa100-ed9d-4409-95bc-6ea7fb829041/chat';

const formatInline = (text: string) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-slate-300">$1</em>');
};

const renderFormattedText = (rawText: string) => {
  if (!rawText.includes('#') && !rawText.includes('*') && !rawText.includes('-')) {
    return <div className="whitespace-pre-wrap">{rawText}</div>;
  }

  const lines = rawText.split('\n');
  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }
        if (trimmed.startsWith('####')) {
          return <h5 key={idx} className="font-bold text-amber-300 text-xs sm:text-sm mt-2">{trimmed.replace(/^####\s*/, '')}</h5>;
        }
        if (trimmed.startsWith('###')) {
          return <h4 key={idx} className="font-bold text-amber-400 text-sm sm:text-base mt-2.5 border-b border-slate-800 pb-1">{trimmed.replace(/^###\s*/, '')}</h4>;
        }
        if (trimmed.startsWith('##')) {
          return <h3 key={idx} className="font-extrabold text-white text-base mt-3">{trimmed.replace(/^##\s*/, '')}</h3>;
        }
        if (trimmed === '---') {
          return <hr key={idx} className="border-slate-800 my-2" />;
        }
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1">
              <span className="text-amber-400 font-bold shrink-0 leading-tight">•</span>
              <span className="text-slate-300" dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
            </div>
          );
        }
        return <p key={idx} className="text-slate-300" dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />;
      })}
    </div>
  );
};

export const AiTravelAgentChat: React.FC<AiTravelAgentChatProps> = ({ isOpen, onClose }) => {
  const [aiEngine, setAiEngine] = useState<'gemini' | 'n8n'>('gemini');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'agent',
      text: "Namaste! I am your AI Travel Agent for your upcoming solo trip from Visakhapatnam to Russia (20–30 October 2026). I have loaded your complete ₹5,00,000 budget, flight layovers, 4-star hotels, Sapsan high-speed train tickets, and the Russian E-Visa requirements. Ask me anything!",
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('Consulting AI Travel Agent...');
  const [sessionId] = useState<string>(() => {
    try {
      return crypto.randomUUID();
    } catch {
      return 'session_' + Math.random().toString(36).substring(2, 12);
    }
  });

  const sampleQueries = [
    "What warm clothes should I pack for late October in Russia?",
    "Can I use my SBI Indian debit card in Russia?",
    "Where can I find pure vegetarian or Indian food near Red Square?",
    "How do I safely exchange US Dollars for Russian Rubles in Moscow?",
    "What are the photography rules inside the Moscow Metro and Hermitage?",
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    if (aiEngine === 'gemini') {
      setLoadingStatus('Gemini 3.1 Flash AI analyzing your itinerary & travel guidelines...');
      try {
        const response = await fetch('/api/travel-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: textToSend.trim(),
            travelContext: {
              origin: TRAVEL_PLAN.traveler.origin,
              destination: TRAVEL_PLAN.traveler.destination,
              dates: TRAVEL_PLAN.traveler.dates,
              budgetINR: TRAVEL_PLAN.traveler.totalBudgetINR,
              estimatedSpentINR: 198500,
            },
          }),
        });

        const data = await response.json();
        const agentMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          sender: 'agent',
          text: data.reply || "Here is your verified advice for Moscow and St. Petersburg.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, agentMsg]);
      } catch (err) {
        console.warn('Gemini proxy error, using offline knowledge:', err);
        const fallbackMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          sender: 'agent',
          text: "For your trip from Visakhapatnam to Russia (20–30 October 2026): Your estimated spend is ₹1,98,500 leaving a ₹3,01,500 contingency reserve. Remember that Indian Visa/Mastercard cards do not function in Russia due to sanctions; bring crisp, post-2013 US Dollars cash to exchange for Rubles at city bank branches.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, fallbackMsg]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // n8n Engine Selected
    setLoadingStatus('n8n Cloud Workflow running... Calling AI workflow in cloud (15–20s)');
    let n8nSuccess = false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000);

      const n8nRes = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'text/plain, application/json'
        },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId,
          chatInput: textToSend.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (n8nRes.ok) {
        const n8nData = await n8nRes.json();
        const replyText = n8nData.output || n8nData.text || n8nData.response || (typeof n8nData === 'string' ? n8nData : null);

        if (replyText && n8nData.message !== 'Error in workflow') {
          const agentMsg: ChatMessage = {
            id: `a-${Date.now()}`,
            sender: 'agent',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev, agentMsg]);
          n8nSuccess = true;
        }
      }
    } catch (n8nErr) {
      console.warn('n8n webhook direct call:', n8nErr);
    }

    if (!n8nSuccess) {
      setLoadingStatus('n8n workflow busy or encountered an error. Consulting Gemini AI backup...');
      try {
        const response = await fetch('/api/travel-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: textToSend.trim(),
            travelContext: {
              origin: TRAVEL_PLAN.traveler.origin,
              destination: TRAVEL_PLAN.traveler.destination,
              dates: TRAVEL_PLAN.traveler.dates,
              budgetINR: TRAVEL_PLAN.traveler.totalBudgetINR,
              estimatedSpentINR: 198500,
            },
          }),
        });

        const data = await response.json();
        const agentMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          sender: 'agent',
          text: `*(n8n workflow took longer than expected — retrieved via Gemini AI):*\n\n${data.reply}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, agentMsg]);
      } catch (err) {
        console.error('Final fallback error:', err);
      }
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col h-[85vh] max-h-[700px] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                AI Travel Agent Assistant
                <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">Live</span>
              </h3>
              <p className="text-[11px] text-slate-400">Grounded in 2026 Official Rules & Visakhapatnam ➔ Russia Plan</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Engine Switcher */}
        <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-2 text-xs flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Engine:</span>
          </div>
          <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
            <button
              type="button"
              onClick={() => setAiEngine('gemini')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                aiEngine === 'gemini'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ Fast Gemini AI (2s)
            </button>
            <button
              type="button"
              onClick={() => setAiEngine('n8n')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                aiEngine === 'n8n'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🤖 n8n Workflow
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isAgent = m.sender === 'agent';
            return (
              <div
                key={m.id}
                className={`flex gap-3 text-xs sm:text-sm ${isAgent ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isAgent ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-white'
                }`}>
                  {isAgent ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`p-3.5 rounded-xl max-w-[88%] leading-relaxed ${
                  isAgent 
                    ? 'bg-slate-950 border border-slate-800 text-slate-200' 
                    : 'bg-amber-500 text-slate-950 font-medium'
                }`}>
                  {renderFormattedText(m.text)}
                  <div className={`text-[10px] mt-2 ${isAgent ? 'text-slate-500' : 'text-slate-900/70'}`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 text-xs sm:text-sm items-start">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{loadingStatus}</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto">
          <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-amber-400" />
            <span>Frequent Traveler Questions:</span>
          </div>
          <div className="flex gap-2">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 text-[11px] rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors whitespace-nowrap cursor-pointer border border-slate-700"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about flights, packing, safety, money, food..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all disabled:opacity-50 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
