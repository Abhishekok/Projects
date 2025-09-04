import { useState } from "react";

export default function SearchBar({ onCitySelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);


  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5`
      );
      const data = await res.json();
      setSuggestions(data.results || []);
    } catch (err) {
      console.error(err);
    }
  };


  const handleSelect = (city) => {
    onCitySelect(city); 
    setQuery(city.name); 
    setSuggestions([]); 
  };

  return (
    <div className="relative w-80">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter city name"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        
      />
      
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded-lg shadow-md mt-1 z-10">
          {suggestions.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelect(city)}
               className="px-4 py-2 hover:bg-blue-100 cursor-grab"
               style={{ cursor: "pointer" }} 
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
