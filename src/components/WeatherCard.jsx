import React from "react";

import {
  Heart,
  Droplets,
  Wind,
  CalendarDays,
  CloudSun,
  MapPin,
} from "lucide-react";

export default function WeatherCard({
  weatherData,
  onSaveFavourite,
  darkMode = true,
}) {
  if (!weatherData) return null;

  const cardTheme = darkMode
    ? "bg-slate-800/70 border-slate-700 text-white"
    : "bg-white border-blue-100 text-slate-800";

  const mutedText = darkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div
      className={`w-full rounded-3xl border p-5 md:p-7 shadow-xl transition-all duration-300 ${cardTheme}`}
    >
      {/* City Header */}
      <div className="flex justify-between items-center gap-3">
        <div>
          <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
            <MapPin size={16} className="text-blue-500" />
            Current Location
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold mt-1">
            {weatherData.city}
          </h2>
        </div>

        <button
          onClick={() => onSaveFavourite(weatherData)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
        >
          <Heart size={17} />
          Save City
        </button>
      </div>

      {/* Main Weather */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 py-8">
        <img
          src={weatherData.icon}
          alt={weatherData.condition}
          className="w-28 h-28 object-contain drop-shadow-lg"
        />

        <div className="text-center sm:text-left">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            {weatherData.temp}°<span className="text-3xl text-blue-500">C</span>
          </h1>

          <p className={`text-lg capitalize mt-2 font-medium ${mutedText}`}>
            {weatherData.condition}
          </p>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div
          className={`rounded-2xl p-4 ${darkMode ? "bg-slate-700/50" : "bg-blue-50"}`}
        >
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Droplets size={20} />
            <span className={`text-sm ${mutedText}`}>Humidity</span>
          </div>

          <p className="text-2xl font-bold">{weatherData.humidity}%</p>
        </div>

        <div
          className={`rounded-2xl p-4 ${darkMode ? "bg-slate-700/50" : "bg-blue-50"}`}
        >
          <div className="flex items-center gap-2 text-cyan-500 mb-2">
            <Wind size={20} />
            <span className={`text-sm ${mutedText}`}>Wind Speed</span>
          </div>

          <p className="text-2xl font-bold">{weatherData.windSpeed} m/s</p>
        </div>
      </div>

      {/* 5 Day Forecast */}
      <div
        className={`border-t pt-6 ${darkMode ? "border-slate-700" : "border-blue-100"}`}
      >
        <div className="flex items-center gap-2 mb-5">
          <CalendarDays size={20} className="text-blue-500" />

          <h3 className="font-bold text-lg">5-Day Forecast</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {weatherData.forecast?.map((day, index) => (
            <div
              key={index}
              className={`rounded-2xl p-3 text-center transition-all hover:-translate-y-1 ${
                darkMode
                  ? "bg-slate-700/50 hover:bg-slate-700"
                  : "bg-blue-50 hover:bg-blue-100"
              }`}
            >
              <p className={`text-xs font-medium ${mutedText}`}>
                {day.date.slice(5)}
              </p>

              <img
                src={day.icon}
                alt="Weather"
                className="w-12 h-12 mx-auto my-2 object-contain"
              />

              <p className="font-bold text-lg">{day.temp}°C</p>
            </div>
          ))}
        </div>
      </div>

      <p className={`text-xs text-center mt-6 ${mutedText}`}>
        Weather data source: {weatherData.source}
      </p>
    </div>
  );
}
