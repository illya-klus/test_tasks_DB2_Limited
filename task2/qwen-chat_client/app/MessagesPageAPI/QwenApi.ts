import { GEMINI_API_KEY } from '@env';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export async function sendToGemini(message: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
    });

    return response.text ?? "Наразі я маю проблеми з відповіддю. Спробуй ще раз через кілька хвилин.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Помилка при звʼязку з AI. Спробуй ще раз.";
  }
}