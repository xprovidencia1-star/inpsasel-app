

const API_KEY = process.env.GEMINI_API_KEY;

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!API_KEY) return null;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: `Proporciona las coordenadas geográficas (latitud y longitud) para esta dirección en Venezuela: "${address}". Responde únicamente en formato JSON con las llaves "lat" y "lng".` }]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1
        }
      })
    });

    if (!response.ok) throw new Error("Gemini API error");

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const result = JSON.parse(text);
    return result;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
