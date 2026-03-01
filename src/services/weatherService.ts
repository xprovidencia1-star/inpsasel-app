export interface WeatherData {
  current: {
    temp: number;
    description: string;
    iconCode: number;
  };
  daily: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    iconCode: number;
  }>;
}

// Open-Meteo doesn't need an API key
export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch weather");
  
  const data = await response.json();
  
  return {
    current: {
      temp: data.current.temperature_2m,
      description: getWeatherDescription(data.current.weather_code),
      iconCode: data.current.weather_code,
    },
    daily: data.daily.time.map((time: string, index: number) => ({
      date: time,
      maxTemp: data.daily.temperature_2m_max[index],
      minTemp: data.daily.temperature_2m_min[index],
      iconCode: data.daily.weather_code[index],
    })),
  };
}

function getWeatherDescription(code: number): string {
  const codes: Record<number, string> = {
    0: "Cielo despejado",
    1: "Principalmente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna densa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia fuerte",
    71: "Nieve ligera",
    73: "Nieve moderada",
    75: "Nieve fuerte",
    80: "Chubascos ligeros",
    81: "Chubascos moderados",
    82: "Chubascos violentos",
    95: "Tormenta eléctrica",
  };
  return codes[code] || "Desconocido";
}
