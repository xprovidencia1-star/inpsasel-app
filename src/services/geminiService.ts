import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

export async function getDirections(address: string, userLocation?: { lat: number; lng: number }) {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-2.5-pro";

  const prompt = `Redacta una guía detallada y elegante sobre cómo llegar a la siguiente sede de INPSASEL en Venezuela: "${address}". 
  ${userLocation ? `Ten en consideración que el usuario se encuentra actualmente cerca de las coordenadas geográficas ${userLocation.lat}, ${userLocation.lng}.` : ""}
  
  Instrucciones de formato y estilo:
  1. Utiliza un tono profesional, cortés y sumamente elegante, propio de un asesor gubernamental de alto nivel.
  2. Estructura la respuesta utilizando normas de estilo inspiradas en APA: párrafos bien definidos, uso correcto de cursivas para términos específicos si aplica, y viñetas (bullet points) para listar instrucciones de ruta paso a paso.
  3. Divide la guía en tres secciones claras con encabezados Markdown en negrita: "📌 Contexto de la Ubicación", "🛣️ Ruta Sugerida" y "💡 Recomendaciones Adicionales".
  4. Proporciona puntos de referencia icónicos locales para facilitar la llegada. Todo en idioma español.`;

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
