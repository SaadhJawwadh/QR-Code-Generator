
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getQrCodeIdea = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "AI service is unavailable. Please configure your API key.";
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a creative and practical idea for a QR code for the following context: "${prompt}".
      Provide only the content that should be encoded in the QR code.
      For example, if the idea is to link to a menu, just return the URL like "https://example.com/menu".
      If it's for a Wi-Fi network, return the Wi-Fi string like "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;".
      Be concise and return only the data for the QR code.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't generate an idea right now.";
  }
};
