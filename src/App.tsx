import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Navigation,
  Clock,
  Cloud,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Loader2,
  Sun,
  CloudRain,
  CloudLightning,
  Wind,
  Search,
  ShieldCheck,
  Info,
  Map as MapIcon,
  User
} from 'lucide-react';
import { LOCATIONS, Location } from './constants';
import { getDirections } from './services/geminiService';
import { getWeather, WeatherData } from './services/weatherService';
import { geocodeAddress } from './services/geocodingService';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [directions, setDirections] = useState<{ text: string; mapLinks: string[] } | null>(null);
  const [locationWeather, setLocationWeather] = useState<WeatherData | null>(null);
  const [userWeather, setUserWeather] = useState<WeatherData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [safetyTips, setSafetyTips] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserCoords(coords);
          try {
            const w = await getWeather(coords.lat, coords.lng);
            setUserWeather(w);
          } catch (e) {
            console.error("User weather error", e);
          }
        },
        (err) => console.warn("Geolocation denied", err)
      );
    }

    // Static safety tips for Inpsasel context
    setSafetyTips([
      "Mantén siempre tus documentos de identidad a la mano al visitar una sede.",
      "Verifica los horarios de atención antes de salir; suelen ser de 8:00 AM a 4:00 PM.",
      "Utiliza transporte oficial o rutas conocidas para llegar a las sedes en zonas industriales.",
      "En caso de lluvia, extrema precauciones en las vías de acceso a sedes como las de Mérida o Táchira.",
      "Reporta cualquier irregularidad en las instalaciones al personal de seguridad identificado."
    ]);

    return () => clearInterval(timer);
  }, []);

  const filteredLocations = useMemo(() => {
    return LOCATIONS.filter(loc =>
      loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleLocationClick = async (loc: Location) => {
    setSelectedLocation(loc);
    setLoading(true);
    setDirections(null);
    setLocationWeather(null);

    try {
      const dirPromise = getDirections(loc.address, userCoords);
      const coords = await geocodeAddress(loc.address + ", Venezuela");

      if (coords) {
        const weatherPromise = getWeather(coords.lat, coords.lng);
        const [dirResult, weatherResult] = await Promise.all([dirPromise, weatherPromise]);
        setDirections(dirResult);
        setLocationWeather(weatherResult);
      } else {
        const dirResult = await dirPromise;
        setDirections(dirResult);
      }
    } catch (error) {
      console.error("Error loading location details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#004A99] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#004A99]">INPSASEL</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Portal de Atención Ciudadana</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tu Ubicación</span>
              <div className="flex items-center gap-2 text-sm font-semibold">
                {userWeather ? (
                  <>
                    <WeatherIcon code={userWeather.current.iconCode} size={16} className="text-blue-500" />
                    <span>{Math.round(userWeather.current.temp)}°C</span>
                  </>
                ) : (
                  <span className="text-gray-300">Cargando...</span>
                )}
              </div>
            </div>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hora Local</span>
              <span className="text-sm font-mono font-bold text-[#004A99]">
                {currentTime.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {!selectedLocation && (
        <section className="bg-[#F8FAFC] py-16 px-6 border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black text-[#004A99] mb-6 leading-tight"
            >
              Encuentra tu sede <br /> más cercana
            </motion.h2>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Accede a la red nacional de sedes de Inpsasel. Obtén direcciones precisas,
              clima en tiempo real y recomendaciones de seguridad para tu visita.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Busca por estado o dirección..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-blue-50/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg font-medium"
              />
            </div>
          </div>
        </section>
      )}

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar / List */}
          <div className={`lg:col-span-4 space-y-8 ${selectedLocation ? 'hidden lg:block' : 'block'}`}>
            {selectedLocation && (
              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <User className="text-blue-600" size={20} />
                  <h3 className="font-bold text-blue-900">Tu Clima Actual</h3>
                </div>
                {userWeather ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-black text-blue-900">{Math.round(userWeather.current.temp)}°C</p>
                      <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">{userWeather.current.description}</p>
                    </div>
                    <WeatherIcon code={userWeather.current.iconCode} size={48} className="text-blue-400" />
                  </div>
                ) : (
                  <p className="text-sm text-blue-400">Obteniendo ubicación...</p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Sedes Disponibles</h3>
                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-500">{filteredLocations.length}</span>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleLocationClick(loc)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all group ${selectedLocation?.id === loc.id
                      ? 'bg-[#004A99] border-[#004A99] text-white shadow-2xl shadow-blue-200'
                      : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'
                      }`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${selectedLocation?.id === loc.id ? 'text-blue-200' : 'text-blue-600'}`}>
                      {loc.state}
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-bold text-sm leading-snug line-clamp-2">{loc.address}</p>
                      <ChevronRight className={`shrink-0 transition-transform group-hover:translate-x-1 ${selectedLocation?.id === loc.id ? 'text-white' : 'text-gray-300'}`} size={18} />
                    </div>
                  </button>
                ))}
                {filteredLocations.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <Search className="mx-auto text-gray-300 mb-2" size={32} />
                    <p className="text-sm font-bold text-gray-400">No se encontraron sedes</p>
                  </div>
                )}
              </div>
            </div>

            {/* Safety Tips Sidebar */}
            <div className="p-8 bg-[#1A1A1A] rounded-3xl text-white shadow-2xl shadow-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Info className="text-blue-400" size={24} />
                <h3 className="font-black text-lg tracking-tight">Consejos de Seguridad</h3>
              </div>
              <ul className="space-y-4">
                {safetyTips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className={`lg:col-span-8 ${!selectedLocation ? 'hidden lg:block' : 'block'}`}>
            {!selectedLocation ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-10 bg-blue-50 rounded-[40px] border border-blue-100 flex flex-col justify-between min-h-[300px]">
                  <MapIcon className="text-blue-600 mb-6" size={48} />
                  <div>
                    <h3 className="text-2xl font-black text-blue-900 mb-2">Mapa Interactivo</h3>
                    <p className="text-blue-700/70 font-medium">Selecciona una sede para visualizar su ubicación exacta y obtener la mejor ruta.</p>
                  </div>
                </div>
                <div className="p-10 bg-emerald-50 rounded-[40px] border border-emerald-100 flex flex-col justify-between min-h-[300px]">
                  <ShieldCheck className="text-emerald-600 mb-6" size={48} />
                  <div>
                    <h3 className="text-2xl font-black text-emerald-900 mb-2">Trámites Seguros</h3>
                    <p className="text-emerald-700/70 font-medium">Información oficial actualizada para tus gestiones ante el Inpsasel.</p>
                  </div>
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="flex items-center gap-2 text-gray-400 font-bold hover:text-[#004A99] transition-colors"
                  >
                    <ArrowLeft size={20} /> Volver al inicio
                  </button>

                  {/* Detailed View Header */}
                  <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-2xl shadow-blue-100/20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div className="max-w-xl">
                        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-widest mb-6">
                          Sede {selectedLocation.state}
                        </span>
                        <h2 className="text-4xl font-black text-[#1A1A1A] leading-tight mb-4">{selectedLocation.address}</h2>
                      </div>

                      {loading ? (
                        <div className="flex items-center gap-3 text-blue-600 font-bold bg-blue-50 px-6 py-3 rounded-2xl">
                          <Loader2 className="animate-spin" size={20} />
                          Localizando...
                        </div>
                      ) : directions?.mapLinks[0] && (
                        <a
                          href={directions.mapLinks[0]}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 bg-[#004A99] text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1"
                        >
                          <ExternalLink size={20} />
                          Abrir en Maps
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Directions Card */}
                    <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                          <Navigation size={24} />
                        </div>
                        <h3 className="font-black text-xl">Guía de Llegada</h3>
                      </div>

                      {loading ? (
                        <div className="space-y-4">
                          <div className="h-4 bg-gray-50 rounded w-full animate-pulse"></div>
                          <div className="h-4 bg-gray-50 rounded w-5/6 animate-pulse"></div>
                          <div className="h-4 bg-gray-50 rounded w-4/6 animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
                          <ReactMarkdown>{directions?.text || "Instrucciones no disponibles."}</ReactMarkdown>
                        </div>
                      )}
                    </div>

                    {/* Weather Card */}
                    <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                          <Cloud size={24} />
                        </div>
                        <h3 className="font-black text-xl">Clima en Sede</h3>
                      </div>

                      {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="animate-spin text-gray-200 mb-4" size={48} />
                          <p className="text-sm font-bold text-gray-400">Sincronizando satélites...</p>
                        </div>
                      ) : locationWeather ? (
                        <div className="space-y-10">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-6xl font-black tracking-tighter text-[#1A1A1A]">{Math.round(locationWeather.current.temp)}°C</p>
                              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">{locationWeather.current.description}</p>
                            </div>
                            <WeatherIcon code={locationWeather.current.iconCode} className="text-orange-400" size={80} />
                          </div>

                          <div className="pt-8 border-t border-gray-50">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-6">Próximos Días</h4>
                            <div className="grid grid-cols-4 gap-4">
                              {locationWeather.daily.slice(1, 5).map((day, idx) => (
                                <div key={idx} className="text-center group">
                                  <p className="text-[10px] font-black text-gray-400 uppercase mb-3 group-hover:text-blue-600 transition-colors">
                                    {new Date(day.date).toLocaleDateString('es-VE', { weekday: 'short' })}
                                  </p>
                                  <WeatherIcon code={day.iconCode} className="mx-auto mb-3 text-gray-300 group-hover:text-blue-400 transition-colors" size={24} />
                                  <p className="text-sm font-black text-[#1A1A1A]">{Math.round(day.maxTemp)}°</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-bold text-gray-300">Datos meteorológicos no disponibles.</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] border-t border-gray-800 mt-20 py-16 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center shadow-inner shadow-white/5 border border-white/10">
              <ShieldCheck size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="font-black text-white text-lg tracking-tight">INPSASEL</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Seguridad y Salud en el Trabajo</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-sm font-medium text-gray-400">
              Desarrollado y diseñado con <span className="text-red-500 animate-pulse inline-block">❤️</span> por
            </p>
            <p className="text-lg font-black text-white mt-1">
              Moises Tortolero
              <span className="text-blue-500 mx-2">•</span>
              <a href="#" className="hover:text-blue-400 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">CEO de Providencia.pro</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <a
          href="https://www.inpsaseletica.gob.ve/"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 bg-[#004A99] text-white p-4 rounded-full shadow-2xl shadow-blue-500/30 hover:-translate-y-1 hover:bg-blue-800 transition-all border border-blue-400/30 backdrop-blur-md"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-black text-sm pl-2">
            INPSASEL Ética
          </span>
          <ShieldCheck size={24} className="shrink-0" />
        </a>

        <a
          href="https://www.linkedin.com/pulse/gu%C3%ADa-epsica-de-registro-profesionales-sst-en-inpsasel-elio-pimentel-uu6de/"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/30 hover:-translate-y-1 hover:bg-emerald-600 transition-all border border-emerald-400/30 backdrop-blur-md"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-black text-sm pl-2 flex flex-col items-end leading-none">
            <span>Guía EPSICA Registro</span>
            <span className="text-[9px] font-bold text-emerald-100 mt-1 uppercase tracking-widest">Créditos: Elio Pimentel</span>
          </span>
          <User size={24} className="shrink-0" />
        </a>

        {/* WhatsApp Error Reporting Button */}
        <a
          href="https://wa.me/584140000000?text=Hola,%20quisiera%20reportar%20un%20error%20con%20la%20dirección%20de%20una%20sede%20en%20la%20App%20Inpsasel."
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 hover:-translate-y-1 hover:bg-[#128C7E] transition-all border border-green-400/30 backdrop-blur-md"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-black text-sm pl-2">
            Reportar Error
          </span>
          <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
        </a>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>
    </div>
  );
}

function WeatherIcon({ code, className, size }: { code: number; className?: string; size: number }) {
  if (code === 0) return <Sun className={className} size={size} />;
  if (code <= 3) return <Cloud className={className} size={size} />;
  if (code >= 51 && code <= 67) return <CloudRain className={className} size={size} />;
  if (code >= 80 && code <= 82) return <CloudRain className={className} size={size} />;
  if (code >= 95) return <CloudLightning className={className} size={size} />;
  return <Wind className={className} size={size} />;
}
