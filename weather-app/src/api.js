export const fetchWeather = async (city) => {
  try {
    // Endre URL-en til å matche din Flask-API's rute/endepunkt
    const response = await fetch(`${process.env.REACT_APP_API_URL}/by/${city}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json(); // Konverterer respons til JSON
  } catch (error) {
    console.error("Could not fetch weather data:", error);
    throw error;
  }
};
