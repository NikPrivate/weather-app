import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date());

  //Function to update time every second

  const fetchWeather = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://weather-app-production-dd93.up.railway.app/weather?city=${city}`
      );

      setWeather(weatherResponse.data);
      setError("");

      //Extract latitude and longitude from weather data
      const lat = weatherResponse.data.coord.lat;
      const lon = weatherResponse.data.coord.lon;

      const timeResponse = await axios.get(
        `https://weather-app-production-dd93.up.railway.app/timezone?lat=${lat}&lon=${lon}`
      );
      setTime(timeResponse.data);
    } catch (err) {
      setError("Error fetching weather or time data");
      setWeather(null);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/background_image.jpg')",
      }}
    >
      {/* Centered content */}
      <div className="relative flex flex-col justify-center items-center space-y-7">
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchWeather();
              }
            }}
            placeholder="Search"
            className="mb-4 py-2 px-4 bg-transparent border-2 rounded-lg bg-white focus:outline-none w-[400px]"
          />
          <button className="cursor-pointer">
            <IoSearch
              className="absolute right-3 top-2/5 transform -translate-y-1/2"
              onClick={fetchWeather}
            />
          </button>
        </div>
        <h1 className="text-7xl text-gray-100">{weather.name}</h1>
        <h1 className="text-6xl text-gray-100">
          {Math.round(weather.main?.temp - 273.15)} &deg;c
        </h1>
        <div className="border py-2 px-[100px] rounded-lg bg-gray-200">
          <p className="text-5xl flex items-center justify-center gap-2 text-black font-sans">
            {time.formatted?.substring(10, 16)}
          </p>
          <p className="text-center text-lg mt-5 text-black text-gray-700">
            {time.formatted?.substring(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
