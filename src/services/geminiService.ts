const API_KEY = process.env.GEMINI_API_KEY;

export async function getDirections(address: string, userLocation?: { lat: number; lng: number }) {
  if (!API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY is completely missing in Vercel or .env");
    return {
      text: "Falta configurar la Clave de API de Gemini en Vercel. Por favor, añade la variable de entorno GEMINI_API_KEY en tu panel de control de Vercel para activar la Inteligencia Artificial.",
      mapLinks: []
    };
  }

  const prompt = `Redacta una guía detallada y elegante sobre cómo llegar a la siguiente sede de INPSASEL en Venezuela: "${address}". 
  ${userLocation ? `Ten en consideración que el usuario se encuentra actualmente cerca de las coordenadas geográficas ${userLocation.lat}, ${userLocation.lng}.` : ""}
  
  Instrucciones de formato y estilo:
  1. Utiliza un tono profesional, cortés y sumamente elegante, propio de un asesor gubernamental de alto nivel.
  2. Estructura la respuesta utilizando normas de estilo inspiradas en APA: párrafos bien definidos, uso correcto de cursivas para términos específicos si aplica, y viñetas (bullet points) para listar instrucciones de ruta paso a paso.
  3. Divide la guía en tres secciones claras con encabezados Markdown en negrita: "📌 Contexto de la Ubicación", "🛣️ Ruta Sugerida" y "💡 Recomendaciones Adicionales".
  4. Proporciona puntos de referencia icónicos locales para facilitar la llegada. Todo en idioma español.`;

  const requestBody = {
    contents: [{
      role: "user",
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.7
    }
  };

  const fetchFromGemini = async (model: string) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    const groundingChunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const mapLinks = groundingChunks
      ?.map((chunk: any) => chunk.maps?.uri)
      .filter(Boolean) || [];

    if (!text) throw new Error("Empty response from Gemini");

    return { text, mapLinks };
  };

  try {
    return await fetchFromGemini("gemini-2.5-pro");
  } catch (error) {
    console.warn("Excepción con gemini-2.5-pro, intentando gemini-2.5-flash como respaldo:", error);

    try {
      return await fetchFromGemini("gemini-2.5-flash");
    } catch (fallbackError) {
      console.error("Error definitivo al obtener direcciones desde Gemini:", fallbackError);
      return {
        text: "Hubo un pequeño retraso de red y no pudimos generar tu guía detallada en este instante. Por favor, selecciona la sede nuevamente o usa el mapa interactivo de arriba para guiarte.",
        mapLinks: []
      };
    }
  }
}
