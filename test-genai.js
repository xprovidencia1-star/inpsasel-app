import { GoogleGenAI } from "@google/genai";

async function test() {
    const ai = new GoogleGenAI({ apiKey: "test" });
    try {
        const prompt = `Test`;
        const config = {
            tools: [{ googleMaps: {} }],
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config,
        });
        console.log(response);
    } catch (e) {
        console.error("Caught error:", e.message);
    }
}

test();
