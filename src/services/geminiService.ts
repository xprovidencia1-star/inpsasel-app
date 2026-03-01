import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

export async function getDirections(address: string, userLocation?: { lat: number; lng: number }) {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-2.5-flash";

  const prompt = `Explica detalladamente cómo llegar a la siguiente dirección en Venezuela: "${address}". 
  ${userLocation ? `El usuario se encuentra cerca de las coordenadas ${userLocation.lat}, ${userLocation.lng}.` : ""}
  Proporciona puntos de referencia y consejos útiles. Responde en español.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: userLocation ? {
            latLng: {
              latitude: userLocation.lat,
              longitude: userLocation.lng
            }
          } : undefined
        }
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    // Extract map URIs if available
    const mapLinks = groundingChunks
      ?.map(chunk => chunk.maps?.uri)
      .filter(Boolean) || [];

    return {
      text,
      mapLinks
    };
  } catch (error) {
    console.error("Error fetching directions from Gemini:", error);
    return {
      text: "No se pudo obtener información detallada en este momento.",
      mapLinks: []
    };
  }
}
