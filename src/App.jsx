import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import FavouriteList from "./components/FavouriteList";

import { fetchWeatherData } from "./services/weatherApi";

import { Sun, Moon, CloudSun, CloudMoon, Cloud, WifiOff } from "lucide-react";
import "./index.css";
import Swal from "sweetalert2";

export default function App() {
  // offline mode
  const [weather, setWeather] = useState(() => {
    const savedWeather = localStorage.getItem("last_weather");
    return savedWeather ? JSON.parse(savedWeather) : null;
  });

  const [favourites, setFavourites] = useState(() => {
    const savedFavs = localStorage.getItem("favourite_cities");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [darkMode, setDarkMode] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const [notificationPermission, setNotificationPermission] = useState(
    () => Notification.permission,
  );

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleEnableNotifications = async () => {
    const permission = await Notification.requestPermission();

    setNotificationPermission(permission);

    if (permission === "granted") {
      Swal.fire({
        icon: "success",
        title: "Notifications Enabled!",
        text: "You have successfully enabled notifications.",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Permission Denied",
        text: "Please allow notifications from your browser settings.",
        background: "#1e293b",
        color: "#fff",
      });
    }
  };

  // Select and save city weather
  const handleSelectCity = async (city) => {
    console.log("Selected City:", city);

    try {
      const data = await fetchWeatherData(city.lat, city.lon, city.name);
      setWeather(data);
      localStorage.setItem("last_weather", JSON.stringify(data)); // Offline cache
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.message,
        confirmButtonText: "Try Again",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  // Save favourite
  const handleSaveFavourite = (currentWeather) => {
    if (favourites.length >= 5) {
      Swal.fire({
        icon: "warning",
        title: "Limit Reached!",
        text: "You can only save 5 favourite cities.",
        confirmButtonColor: "#3b82f6",
        background: "#1e293b",
        color: "#fff",
      });
      return;
    }

    const exists = favourites.some((fav) => fav.name === currentWeather.city);

    if (!exists) {
      const newFav = {
        name: currentWeather.city,
        lat: currentWeather.lat || 0,
        lon: currentWeather.lon || 0,
      };

      const updated = [...favourites, newFav];
      setFavourites(updated);
      localStorage.setItem("favourite_cities", JSON.stringify(updated));
    }
  };

  // Remove favourite
  const handleRemoveFavourite = async (cityName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Remove ${cityName} from favourites?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      const updated = favourites.filter((fav) => fav.name !== cityName);

      setFavourites(updated);

      localStorage.setItem("favourite_cities", JSON.stringify(updated));

      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: `${cityName} removed successfully.`,
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-[#080F1E] text-white"
          : "bg-gradient-to-bright from-sky-100 via-blue-50 to-white text-slate-900"
      }`}
    >
      {/* Offline Mode */}
      {isOffline && (
        <div
          className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs md:text-sm font-medium border-b transition-all ${
            darkMode
              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
              : "bg-amber-50 border-amber-200 text-amber-800"
          }`}
        >
          <WifiOff size={16} className="animate-pulse" />
          <span>
            You are currently offline. Showing data for the last viewed city.
          </span>
        </div>
      )}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] ${
            darkMode ? "bg-blue-600/20" : "bg-sky-400/30"
          }`}
        />
        <div
          className={`absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-[120px] ${
            darkMode ? "bg-purple-600/20" : "bg-blue-300/30"
          }`}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-5 py-8 md:px-8">
        {/* Navbar */}
        
<header className="flex flex-wrap items-center justify-between gap-3 mb-8 md:mb-12">

  {/* Logo */}
  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
    <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 shrink-0">
      <CloudSun size={26} className="text-white" />
    </div>

    <div className="min-w-0">
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight whitespace-nowrap">
        Weather<span className="text-blue-500">Board</span>
      </h1>
      <p className={`text-[10px] sm:text-xs ${
        darkMode ? "text-slate-400" : "text-slate-500"
      }`}>
        Your personal weather companion
      </p>
    </div>
  </div>

  {/* Theme Button */}
  <button
    onClick={() => setDarkMode(!darkMode)}
    className={`p-2.5 sm:p-3 rounded-2xl border shrink-0 transition-all ${
      darkMode
        ? "bg-slate-800 border-slate-700 text-yellow-400"
        : "bg-white border-blue-100 text-indigo-600 shadow-md"
    }`}
    title="Toggle Day/Night Mode"
  >
    {darkMode ? <Sun size={22} /> : <Moon size={22} />}
  </button>

  {/* Notification Button */}
  <button
    onClick={handleEnableNotifications}
    disabled={notificationPermission === "granted"}
    className="w-full md:w-auto md:ml-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all disabled:opacity-50"
  >
    {notificationPermission === "granted"
      ? "Notifications Enabled ✓"
      : "🔔 Enable Notifications"}
  </button>

</header>


        {/* Welcome bro */}
        <section className="text-center mb-10">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-5 ${
              darkMode
                ? "bg-blue-500/10 border-blue-400/20 text-blue-300"
                : "bg-blue-100 border-blue-200 text-blue-700"
            }`}
          >
            {darkMode ? <CloudMoon size={16} /> : <Sun size={16} />}
            Live Weather Dashboard
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Explore the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Weather
            </span>
          </h2>

          <p
            className={`max-w-xl mx-auto text-sm md:text-base ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Discover real-time weather conditions and stay updated wherever you
            go.
          </p>
        </section>

        {/* Search Section */}
        <section
          className={`p-4 md:p-6 rounded-3xl border shadow-xl mb-8 ${
            darkMode
              ? "bg-slate-900/70 border-slate-700/60 shadow-black/20"
              : "bg-white/80 border-white shadow-blue-100"
          }`}
        >
          <SearchBar onSelectCity={handleSelectCity} darkMode={darkMode} />
        </section>

        {/* Weather Section */}
        <section
          className={`rounded-3xl border p-4 md:p-6 mb-8 ${
            darkMode
              ? "bg-slate-900/60 border-slate-700/60"
              : "bg-white/80 border-white shadow-lg shadow-blue-100/50"
          }`}
        >
          <div className="flex items-center gap-2 mb-5">
            <Cloud size={21} className="text-blue-500" />
            <h3 className="font-bold text-lg">Weather Overview</h3>
          </div>

          <WeatherCard
            weatherData={weather}
            onSaveFavourite={handleSaveFavourite}
            darkMode={darkMode}
          />
        </section>

        {/* Favourite Section */}
        <section
          className={`rounded-3xl border p-4 md:p-6 ${
            darkMode
              ? "bg-slate-900/60 border-slate-700/60"
              : "bg-white/80 border-white shadow-lg shadow-blue-100/50"
          }`}
        >
          <FavouriteList
            favourites={favourites}
            onSelectFavourite={handleSelectCity}
            onRemoveFavourite={handleRemoveFavourite}
            darkMode={darkMode}
          />
        </section>

        {/* Footer */}
        <footer
          className={`text-center mt-12 pb-5 text-sm border-t pt-6 ${
            darkMode
              ? "border-slate-800 text-slate-400"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <p className="font-medium">
            Designed & Developed by{" "}
            <span className="text-blue-500 font-semibold">Wajhi Rizvi</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            WeatherBoard © 2026 • All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
