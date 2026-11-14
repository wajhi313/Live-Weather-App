import React from "react";

import { Heart, MapPin, Trash2, ArrowUpRight, Star } from "lucide-react";

export default function FavouriteList({
  favourites,
  onSelectFavourite,
  onRemoveFavourite,
  darkMode = true,
}) {
  if (!favourites || favourites.length === 0) return null;

  const cardTheme = darkMode
    ? "bg-slate-800/70 border-slate-700 hover:bg-slate-700/70"
    : "bg-white border-blue-100 hover:bg-blue-50";

  const textTheme = darkMode ? "text-white" : "text-slate-800";

  const mutedText = darkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-500">
            <Heart size={22} />
          </div>

          <div>
            <h3 className={`text-lg md:text-xl font-bold ${textTheme}`}>
              Favourite Cities
            </h3>

            <p className={`text-xs ${mutedText}`}>Your saved locations</p>
          </div>
        </div>

        {/* City Counter */}
        <div className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 text-sm font-bold">
          {favourites.length}/5 Cities
        </div>
      </div>

      {/* Favourite Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favourites.map((city, idx) => (
          <div
            key={city.name}
            className={`group flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${cardTheme}`}
          >
            {/* City Info */}
            <button
              onClick={() => onSelectFavourite(city)}
              className="flex items-center gap-3 min-w-0 text-left flex-1"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                <MapPin size={21} />
              </div>

              <div className="min-w-0">
                <p className={`font-bold truncate ${textTheme}`}>{city.name}</p>

                <p className={`text-xs mt-1 ${mutedText}`}>Quick access</p>
              </div>

              <ArrowUpRight
                size={17}
                className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all shrink-0"
              />
            </button>

            {/* Remove Button */}
            <button
              onClick={() => onRemoveFavourite(city.name)}
              title="Remove favourite"
              className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all shrink-0"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <p className={`flex items-center gap-2 mt-5 text-xs ${mutedText}`}>
        <Star size={14} className="text-yellow-500" />
        Click any city to view its latest weather.
      </p>
    </div>
  );
}
