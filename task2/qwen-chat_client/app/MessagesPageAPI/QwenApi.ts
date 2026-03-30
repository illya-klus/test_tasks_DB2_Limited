import { GEMINI_API_KEY } from '@env';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

type Role = "system" | "user" | "assistant";

export async function sendToGeminiWithContext(
  messages: { role: Role; content: string }[]
): Promise<string> {
  try {
    // Генеруємо масив Content для Gemini
    const contents = messages.map(msg => ({
      type: "text",       // обов’язково має бути "text"
      text: msg.content   // сам текст повідомлення
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents
    });

    return response.text ?? "Проблема з відповіддю AI. Спробуй ще раз.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Помилка при звʼязку з AI. Спробуй ще раз.";
  }
}

