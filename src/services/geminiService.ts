export async function getDirections(address: string, userLocation?: { lat: number; lng: number }) {
  const prompt = `Redacta una guía detallada y elegante sobre cómo llegar a la siguiente sede de INPSASEL en Venezuela: "${address}". 
  ${userLocation ? `Ten en consideración que el usuario se encuentra actualmente cerca de las coordenadas geográficas ${userLocation.lat}, ${userLocation.lng}.` : ""}
  
  Instrucciones de formato y estilo:
  1. Utiliza un tono profesional, cortés y sumamente elegante, propio de un asesor gubernamental de alto nivel.
  2. Estructura la respuesta utilizando normas de estilo inspiradas en APA: párrafos bien definidos, uso correcto de cursivas para términos específicos si aplica, y viñetas (bullet points) para listar instrucciones de ruta paso a paso.
  3. Divide la guía en tres secciones claras con encabezados Markdown en negrita: "📌 Contexto de la Ubicación", "🛣️ Ruta Sugerida" y "💡 Recomendaciones Adicionales".
  4. Proporciona puntos de referencia icónicos locales para facilitar la llegada. Todo en idioma español.`;

  try {
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "Eres un asistente experto en direcciones y geografía de Venezuela, respondiendo siempre en español impecable y estructurado." },
          { role: "user", content: prompt }
        ],
        model: "openai" // Usar el modelo avanzado subyacente
      })
    });

    if (!response.ok) {
      throw new Error(`Free AI API Error: ${response.status}`);
    }

    const text = await response.text();

    // Fallback if empty response
    if (!text || text.trim() === "") throw new Error("Empty response from AI");

    return { text, mapLinks: [] };
  } catch (error) {
    console.error("Definitive error fetching directions from Free AI:", error);
    return {
      text: "Hubo un pequeño retraso de red y no pudimos generar tu guía detallada en este instante. Por favor, selecciona la sede nuevamente o usa el mapa interactivo de arriba para guiarte.",
      mapLinks: []
    };
  }
}
