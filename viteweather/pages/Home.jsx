import { useState } from "react";
import SearchBar from "../components/SearchBar"; 
import BackgroundIMG from "../assets/bg.jpg";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("");


  const fetchWeatherByCoords = async (lat, lon, label = "Your Location") => {
    setCityName(label);
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.current_weather);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchWeather = async (selectedCity) => {
    fetchWeatherByCoords(selectedCity.latitude, selectedCity.longitude, selectedCity.name);
  };


  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          fetchWeatherByCoords(lat, lon);
        },
        (err) => {
          console.error(err);
          alert("Could not get location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundImage: `url(${BackgroundIMG})` }}
    >
      <h1 className="text-3xl font-bold mb-6">Weather Now</h1>

   
      <SearchBar onCitySelect={fetchWeather} />


      <button
        onClick={handleGetLocation}
        className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Get My Location
      </button>


      {weather && (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-md text-center w-80">
          <p className="text-xl font-semibold">{cityName}</p>
          <p>🌡 Temperature: {weather.temperature}°C</p>
          <p>💨 Windspeed: {weather.windspeed} km/h</p>
          <p>📊 Condition code: {weather.weathercode}</p>
        </div>
      )}
    </div>
  );
}
