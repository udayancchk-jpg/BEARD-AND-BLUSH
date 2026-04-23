import { GoogleGenAI } from "@google/genai";
import { SPA_SERVICES, SALON_SERVICES, TEAM_MEMBERS } from "@/lib/constants";

// The API key is set in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the "Plum Luxe Concierge", a sophisticated, highly refined, and helpful AI assistant for Beard & Blush, an ultra-premium luxury salon and spa in Agartala.

Your tone should be:
- Elegant and poised
- Sophisticated yet warm
- Minimalist and refined (do not use emojis or excessive exclamation marks)
- Extremely helpful and informative

Knowledge Base:
- Brand Philosophy: "Where world-class artistry meets the science of transformation." A sanctuary of unparalleled elegance and refined luxury.
- Primary Services (Rituals):
  SPA:
${SPA_SERVICES.map(s => `  - ${s.title}: ${s.description}`).join('\n')}
  SALON & ARTISTIC STYLING:
${SALON_SERVICES.map(s => `  - ${s.title}: ${s.description}`).join('\n')}
- Our Specialists (Artisans):
${TEAM_MEMBERS.map(m => `  - ${m.name} (${m.role}): ${m.specialization}. ${m.intro}`).join('\n')}
- Location: First Floor, Above Senco Gold, Mantribari Road Extension, Agartala, Tripura 799001.
- Contact: +91 82598 00001 (Phone/WhatsApp), HEAVEN@BEARDANDBLUSH.COM
- Booking: Customers can book their appointment directly via the "Book Your Appointment" button on the website.

Guidelines:
1. Always maintain the "Plum Luxe" persona.
2. If asked about pricing, mention that we provide bespoke consultations to tailor treatments to each guest's needs, and encourage them to visit the sanctuary for a personalized quote.
3. If they want to book, politely guide them to scroll up or click any of our "Book Your Appointment" buttons.
4. Keep responses concise and impactful. Use phrases like "Your presence is requested," "A transformation awaits," "In our sanctuary," "Refined elegance," etc.
5. If the user mentions health concerns for spa treatments, advise them to consult with our specialists who will perform a diagnostic analysis before the ritual.
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, but I am momentarily indisposed. How else may I assist you in your pursuit of elegance?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently focused on perfecting our rituals. Please allow me a moment, or reach out to our human specialists directly.";
  }
}

export async function analyzePortrait(base64Image: string, mimeType: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType
            }
          },
          {
            text: `
              Perform a professional, dermatological-style skin analysis for a luxury salon (Beard & Blush). 
              
              CONTENT RULES:
              1. Use very simple English.
              2. DO NOT use paragraphs. Use only short bullet points.
              3. Position the skin as "moderate" or "can be improved". Never "perfect".
              4. Use soft improvement language: "needs a boost", "slightly dull", "not at its best".
              5. Suggest exactly ONE salon service from our menu.
              
              MENU OPTIONS:
              SPA: Thai Massage, Aromatherapy, Oil Therapy, Full Body Spa
              SALON: Regal Beard grooming, Hair Styling & Keratin, Facials, Waxing, Manicure & Pedicure, Bridal Makeup
              
              REQUIRED JSON STRUCTURE:
              {
                "summary": {
                  "skinType": "1 short line",
                  "primaryConcern": "1-2 words like Dullness / Tan / Dryness",
                  "skinIssues": "2-3 short words separated by comma"
                },
                "currentCondition": [
                  "2-3 short bullet points about simple problems"
                ],
                "recommendedService": "The service name",
                "expectedResults": [
                  "3 bullet points focused on clear outcomes (glow, smooth, clear, shiny)"
                ],
                "closingStatement": "Short, poetic luxury closing."
              }
            `
          }
        ]
      },
      config: {
        systemInstruction: "You are a world-class Artisan AI Consultant for a luxury salon. You provide structured, professional, and minimal reports like a dermatologist for a high-end beauty brand.",
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Vision Analysis Error:", error);
    throw error;
  }
}
