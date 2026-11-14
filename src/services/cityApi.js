const RAPID_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export const fetchCitySuggestions = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      },
    );

    if (!response.ok) throw new Error("City suggestions fetch failed");

    const data = await response.json();
    
    return data.data.map((city) => ({
      id: city.id,
      name: city.name,
      country: city.country,
      lat: city.latitude,
      lon: city.longitude,
    }));
  } catch (error) {
    console.error("GeoDB Error:", error);
    throw error;
  }
};
