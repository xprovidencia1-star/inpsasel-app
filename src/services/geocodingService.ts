import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Proporciona las coordenadas geográficas (latitud y longitud) para esta dirección en Venezuela: "${address}". Responde únicamente en formato JSON con las llaves "lat" y "lng".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lat: { type: Type.NUMBER },
            lng: { type: Type.NUMBER },
          },
          required: ["lat", "lng"],
        },
      },
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
