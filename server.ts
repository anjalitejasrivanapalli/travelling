import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for AI Travel Agent questions
app.post('/api/travel-agent', async (req, res) => {
  try {
    const { question, travelContext } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required.' });
    }

    if (!apiKey) {
      // Fallback response if no key is configured
      return res.json({
        reply: "Here is practical advice from your Russian Travel Advisor: Make sure to carry crisp US Dollars (series 2013+) as foreign cards do not work in Russia due to bank sanctions. In late October, temperatures in Moscow & St. Petersburg drop between -2°C and +8°C, so thermal base layers and a windproof jacket are necessary. For getting around, download the Yandex Go taxi and Yandex Metro apps.",
        source: 'curated-offline'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are an expert AI Travel Agent specializing in affordable international trips from India to Russia.
Context for this traveler:
- Route: Visakhapatnam (VTZ) -> Moscow (SVO) -> St. Petersburg (LED) -> Return to VTZ
- Dates: 20 October 2026 to 30 October 2026 (10 nights / 11 days)
- Traveler: 1 adult solo traveler
- Total Budget: ₹5,00,000 (INR 5 Lakhs), current estimated plan is ₹1,98,500.
- Currency: 1 Russian Ruble (RUB) ≈ ₹0.95 INR.
- Official rules: Indian nationals use Unified E-Visa (evisa.kdmid.ru, 16 calendar days single entry, $52 fee). Foreign credit/debit cards do not work inside Russia (cash exchange in USD/EUR or tourist Mir card required).

Traveler Question: "${question}"
Travel context info: ${travelContext ? JSON.stringify(travelContext) : 'Standard 11-day itinerary'}

Provide a helpful, precise, culturally savvy, and budget-conscious answer in 2-4 structured paragraphs or bullet points with practical tips, rupee/ruble estimates if applicable, and safety advice.`;

    let reply = '';
    let usedModel = 'gemini-3.1-flash-lite';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
      });
      reply = response.text || '';
    } catch (modelErr: any) {
      console.warn('gemini-3.1-flash-lite notice, trying gemini-3.8-flash:', modelErr?.message || modelErr);
      try {
        usedModel = 'gemini-3.8-flash';
        const response2 = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });
        reply = response2.text || '';
      } catch (err2: any) {
        console.warn('Fallback to expert curated knowledge:', err2?.message || err2);
        reply = "Here is verified advice for your Russia trip (20–30 Oct 2026): In late October, temperatures in Moscow and St. Petersburg range from -2°C to +8°C. Pack thermal base layers, a windproof down jacket, and waterproof boots. Remember that foreign Visa/Mastercard/RuPay cards do NOT work in Russia due to sanctions; bring crisp, undamaged post-2013 $100 USD bills to exchange for Rubles at Sberbank or VTB banks, or use a Russian tourist Mir card. For local transport, download the Yandex Go taxi app and Yandex Metro.";
        usedModel = 'curated-expert';
      }
    }

    return res.json({
      reply: reply || 'Here is your travel advice for Moscow & St. Petersburg.',
      source: usedModel
    });
  } catch (error: any) {
    console.error('Error in travel agent endpoint:', error);
    return res.json({
      reply: "For your trip from Visakhapatnam to Russia (20–30 October 2026): Estimated total cost is ₹1,98,500 leaving over ₹3 Lakh surplus from your ₹5,00,000 budget. Ensure you apply for the Unified Russian E-Visa at evisa.kdmid.ru between 1–6 October 2026 and carry crisp USD cash for currency exchange.",
      source: 'offline-fallback'
    });
  }
});

// Mount Vite middleware for dev or serve static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
