import React, { useEffect, useRef } from 'react';

const N8N_WEBHOOK_URL = 'https://anjalivanapalli.app.n8n.cloud/webhook/e7cfa100-ed9d-4409-95bc-6ea7fb829041/chat';

export const N8nChatWidget: React.FC = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // 1. Inject n8n Chat stylesheet if not already present
    if (!document.getElementById('n8n-chat-style')) {
      const link = document.createElement('link');
      link.id = 'n8n-chat-style';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      document.head.appendChild(link);
    }

    // 2. Load n8n Chat bundle and initialize
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      try {
        createChat({
          webhookUrl: '${N8N_WEBHOOK_URL}',
          webhookConfig: {
            method: 'POST',
            headers: {}
          },
          target: '#n8n-chat-root',
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          metadata: {
            app: 'Safar-e-Rus Travel Planner',
            traveler: 'Solo Explorer (VTZ to Russia)',
            budget: '₹5,00,000'
          },
          showWelcomeScreen: false,
          defaultLanguage: 'en',
          initialMessages: [
            'Namaste! Welcome to your Russia Solo Travel Advisor.',
            'Ask me anything about your 20–30 October 2026 trip: flights, e-visa, budget breakdown, weather, or recommendations!'
          ],
          i18n: {
            en: {
              title: 'Russia AI Travel Advisor',
              subtitle: 'Online • Powered by n8n Workflow',
              footer: 'n8n Cloud Automation',
              getStarted: 'Start Travel Consultation',
              inputPlaceholder: 'Ask about flights, hotels, visa, weather...',
              closeButtonTooltip: 'Minimize chat',
            }
          }
        });
      } catch (err) {
        console.error('Error initializing n8n chat:', err);
      }
    `;
    document.body.appendChild(script);

    return () => {
      // Keep script active for SPA lifetime
    };
  }, []);

  return <div id="n8n-chat-root" className="n8n-chat-wrapper" />;
};
