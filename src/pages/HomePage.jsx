import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MapPin, CloudSun, Thermometer, Globe, Wifi, Droplets, Wind, Clock, Sparkles, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  const weatherApiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const locationRes = await axios.get("http://ip-api.com/json");
        const locData = locationRes.data;
        setLocation(locData);

        if (locData.city) {
          const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locData.city}&appid=${weatherApiKey}&units=metric`);
          setWeather(weatherRes.data);
        }
      } catch (err) {
        setError("Could not fetch dashboard data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [weatherApiKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white w-full">
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center py-14 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          ✉️ AI Powered Mail Checker
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          A smart web application that uses Artificial Intelligence to check, filter & secure your emails from spam & threats – faster than ever!
        </p>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/analyzer")} className="mt-8 px-8 py-4 text-lg font-bold rounded-full shadow-lg bg-gradient-to-r from-green-400 via-emerald-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-green-500/50 transition relative overflow-hidden">
          <span className="relative z-10">🚀 Get Started</span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 opacity-0 hover:opacity-30 transition"></span>
        </motion.button>
      </motion.div>
      {error && <p className="text-center text-red-500 bg-red-900/30 py-2 rounded-lg w-11/12 md:w-1/2 mx-auto mb-6">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-12">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center"><Sparkles className="text-yellow-400 w-10 h-10 mb-3" /><h3 className="text-xl font-bold">AI Powered</h3><p className="text-gray-300 mt-2 text-sm">Advanced AI models to analyze & filter your emails in real-time.</p></motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center"><Shield className="text-green-400 w-10 h-10 mb-3" /><h3 className="text-xl font-bold">Spam Protection</h3><p className="text-gray-300 mt-2 text-sm">Automatically blocks phishing & unwanted spam emails for your safety.</p></motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center"><Zap className="text-blue-400 w-10 h-10 mb-3" /><h3 className="text-xl font-bold">Fast & Smart</h3><p className="text-gray-300 mt-2 text-sm">Super-fast mail scanning with smart suggestions for important mails.</p></motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-12">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"><h2 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2"><MapPin /> Location</h2>{isLoading ? (<div className="animate-pulse space-y-2"><div className="h-4 bg-gray-700 rounded w-1/2"></div><div className="h-4 bg-gray-700 rounded w-2/3"></div></div>) : location ? (<div className="space-y-3 text-sm"><p className="flex items-center gap-2"><Globe className="text-blue-400" /> {location.country}</p><p className="flex items-center gap-2"><MapPin className="text-red-400" /> {location.city}</p><p className="flex items-center gap-2"><Wifi className="text-green-400" /> {location.query}</p></div>) : (<p>Location data unavailable.</p>)}</motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"><h2 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2"><CloudSun /> Weather</h2>{isLoading ? (<div className="animate-pulse space-y-2"><div className="h-16 w-16 bg-gray-700 rounded-full"></div></div>) : weather ? (<div><div className="flex items-center gap-4"><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" /><div><p className="text-2xl font-bold flex items-center gap-2"><Thermometer className="text-red-400" /> {Math.round(weather.main.temp)}°C</p><p className="capitalize text-gray-300 text-sm">{weather.weather[0].description}</p></div></div><div className="flex gap-4 mt-3 text-gray-300 text-sm"><p className="flex items-center gap-1"><Droplets className="text-blue-400 w-4 h-4" /> {weather.main.humidity}%</p><p className="flex items-center gap-1"><Wind className="text-green-400 w-4 h-4" /> {weather.wind.speed} m/s</p></div></div>) : (<p>Weather data unavailable.</p>)}</motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"><h2 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2"><Clock /> Date & Time</h2><div className="text-xl font-bold">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", })}</div><div className="text-gray-300 mt-1 text-sm">{time.toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric", })}</div></motion.div>
      </div>
    </div>
  );
}