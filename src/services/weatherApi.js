const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export const fetchWeatherData = async (lat, lon, cityName) => {
  try {
    // first option
    console.log("api key is loading", OPENWEATHER_KEY ? "yes" : "no");

    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`,
    );
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`,
    );

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("OpenWeatherMap failed, switching to fallback...");
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const dailyForecast = forecastData.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .map((item) => ({
        date: item.dt_txt.split(" ")[0],
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      }));

    return {
      source: "OpenWeatherMap",
      city: cityName || currentData.name,
      temp: Math.round(currentData.main.temp),
      humidity: currentData.main.humidity,
      windSpeed: currentData.wind.speed,
      condition: currentData.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
      forecast: dailyForecast,
      lat: lat,
      lon: lon,
    };
  } catch (error) {
    console.warn(error.message);

    // backup
    const meteoRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,weathercode&timezone=auto`,
    );

    if (!meteoRes.ok) {
      throw new Error(
        "Dono Weather APIs fail ho gayin. Internet check karein.",
      );
    }

    const meteoData = await meteoRes.json();

    const dailyForecast = meteoData.daily.time.slice(0, 5).map((date, idx) => ({
      date,
      temp: Math.round(meteoData.daily.temperature_2m_max[idx]),
      condition: "Clear/Cloudy",
      icon: "https://openweathermap.org/img/wn/02d@2x.png",
    }));

    return {
      source: "Open-Meteo (Fallback)",
      city: cityName,
      temp: Math.round(meteoData.current_weather.temperature),
      humidity: "N/A",
      windSpeed: meteoData.current_weather.windspeed,
      condition: "Weather Code: " + meteoData.current_weather.weathercode,
      icon: "https://openweathermap.org/img/wn/01d@2x.png",
      forecast: dailyForecast,
      lat: lat,
      lon: lon,
    };
  }
};
