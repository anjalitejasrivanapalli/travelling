import React, { useEffect } from 'react';

const N8N_WEBHOOK_URL = 'https://anjalivanapalli.app.n8n.cloud/webhook/e7cfa100-ed9d-4409-95bc-6ea7fb829041/chat';

export const N8nChatWidget: React.FC = () => {
  useEffect(() => {
    // 1. Ensure style is loaded
    if (!document.getElementById('n8n-chat-style')) {
      const link = document.createElement('link');
      link.id = 'n8n-chat-style';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      document.head.appendChild(link);
    }

    // 2. Ensure container exists
    let chatTarget = document.getElementById('n8n-chat');
    if (!chatTarget) {
      chatTarget = document.createElement('div');
      chatTarget.id = 'n8n-chat';
      document.body.appendChild(chatTarget);
    }

    let isCancelled = false;

    // 3. Dynamically load official bundle from CDN (using dynamic function to bypass TypeScript URL module check)
    const loadDynamicModule = new Function('url', 'return import(url)');

    loadDynamicModule('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then((module: any) => {
        if (isCancelled) return;
        const createChatFn = module.createChat || module.default?.createChat;
        if (typeof createChatFn === 'function' && chatTarget && chatTarget.children.length === 0) {
          createChatFn({
            webhookUrl: N8N_WEBHOOK_URL,
            target: '#n8n-chat',
            mode: 'window',
            showWelcomeScreen: false,
            initialMessages: [
              'Namaste! Welcome to your Russia Solo Travel Advisor.',
              'Ask me anything about your Visakhapatnam to Russia trip (20–30 October 2026): flights, e-visa, budget breakdown, weather, or recommendations!'
            ],
            i18n: {
              en: {
                title: 'Russia AI Travel Advisor',
                subtitle: 'Online • Connected to n8n Workflow',
                footer: 'n8n Cloud Automation',
                getStarted: 'Start Consultation',
                inputPlaceholder: 'Ask about flights, hotels, visa, weather...',
              }
            }
          });
        }
      })
      .catch((err: any) => {
        console.error('Failed to initialize official @n8n/chat widget:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return null;
};
