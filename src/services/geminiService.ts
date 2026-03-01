import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

export async function getDirections(address: string, userLocation?: { lat: number; lng: number }) {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const prompt = `Redacta una guía detallada y elegante sobre cómo llegar a la siguiente sede de INPSASEL en Venezuela: "${address}". 
  ${userLocation ? `Ten en consideración que el usuario se encuentra actualmente cerca de las coordenadas geográficas ${userLocation.lat}, ${userLocation.lng}.` : ""}
  
  Instrucciones de formato y estilo:
  1. Utiliza un tono profesional, cortés y sumamente elegante, propio de un asesor gubernamental de alto nivel.
  2. Estructura la respuesta utilizando normas de estilo inspiradas en APA: párrafos bien definidos, uso correcto de cursivas para términos específicos si aplica, y viñetas (bullet points) para listar instrucciones de ruta paso a paso.
  3. Divide la guía en tres secciones claras con encabezados Markdown en negrita: "📌 Contexto de la Ubicación", "🛣️ Ruta Sugerida" y "💡 Recomendaciones Adicionales".
  4. Proporciona puntos de referencia icónicos locales para facilitar la llegada. Todo en idioma español.`;

  const config = {
    tools: [{ googleMaps: {} }],
    toolConfig: {
      retrievalConfig: userLocation ? {
        latLng: {
          latitude: userLocation.lat,
          longitude: userLocation.lng
        }
      } : undefined
    }
  };

  const processResponse = (response: any) => {
    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const mapLinks = groundingChunks
      ?.map((chunk: any) => chunk.maps?.uri)
      .filter(Boolean) || [];

    return { text, mapLinks };
  };

  try {
    // Attempt 1: State-of-the-art Pro model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config,
    });
    return processResponse(response);
  } catch (error) {
    console.warn("Excepción con gemini-2.5-pro (posible límite de cuota), intentando gemini-2.5-flash como respaldo:", error);

    try {
      // Attempt 2: Faster, more resilient Flash model fallback
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config,
      });
      return processResponse(fallbackResponse);
    } catch (fallbackError) {
      console.error("Error definitivo al obtener direcciones desde Gemini (ambos modelos fallaron):", fallbackError);
      return {
        text: "Hubo un pequeño retraso de red y no pudimos generar tu guía detallada en este instante. Por favor, selecciona la sede nuevamente o usa el mapa interactivo de arriba para guiarte.",
        mapLinks: []
      };
    }
  }
}
