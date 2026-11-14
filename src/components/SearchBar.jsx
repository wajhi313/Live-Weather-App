import React, { useState, useEffect } from "react";

import { fetchCitySuggestions } from "../services/cityApi";

import { Search, MapPin, LoaderCircle, X } from "lucide-react";

export default function SearchBar({ onSelectCity, darkMode = true }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        setError(null);

        try {
          const results = await fetchCitySuggestions(query);
          setSuggestions(results);
        } catch (err) {
          setError("Unable to fetch city suggestions. Please try again later.");
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setError(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const inputTheme = darkMode
    ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
    : "bg-white border-blue-100 text-slate-800 placeholder:text-slate-400 focus:border-blue-500";

  const dropdownTheme = darkMode
    ? "bg-slate-800 border-slate-700 text-white"
    : "bg-white border-blue-100 text-slate-800";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={21}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any city... Karachi, London, Dubai"
          className={`w-full py-4 pl-12 pr-24 rounded-2xl border outline-none transition-all shadow-sm focus:ring-4 focus:ring-blue-500/10 ${inputTheme}`}
        />

        {/* Loading / Clear Button */}
        {loading ? (
          <LoaderCircle
            size={21}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500 animate-spin"
          />
        ) : query ? (
          <button
            onClick={() => {
              setQuery("");
              setSuggestions([]);
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
          >
            <X size={20} />
          </button>
        ) : (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-500 cursor-pointer">
            SEARCH
          </span>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul
          className={`absolute z-50 w-full mt-3 rounded-2xl border shadow-2xl overflow-hidden max-h-64 overflow-y-auto ${dropdownTheme}`}
        >
          {suggestions.map((city) => (
            <li
              key={city.id}
              onClick={() => {
                onSelectCity(city);

                setQuery("");
                setSuggestions([]);
              }}
              className={`flex items-center gap-3 p-4 cursor-pointer border-b last:border-none transition-colors ${
                darkMode
                  ? "border-slate-700 hover:bg-slate-700"
                  : "border-blue-50 hover:bg-blue-50"
              }`}
            >
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                <MapPin size={19} />
              </div>

              <div>
                <p className="font-semibold">{city.name}</p>

                <p className="text-sm text-slate-400">{city.country}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Loading tex */}
      {loading && (
        <p className="text-blue-500 text-xs mt-2">Searching cities...</p>
      )}

      {!loading &&
        query.trim().length >= 2 &&
        !error &&
        suggestions.length === 0 && (
          <p
            className={`text-sm mt-3 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            No cities found.
          </p>
        )}
    </div>
  );
}
