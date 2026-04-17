import axios from "axios";
import { useState } from "react";
import "./App.css";

import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "e89d7ca57257195e5066673904e5d14f";

  const fetchWeather = async (city) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
      );

      const data = res.data;
      const today = data.list[0];

      setWeather({
        city: data.city.name,
        temp: today.main.temp,
        desc: today.weather[0].description,
        humidity: today.main.humidity,
        wind: today.wind.speed,
      });

      const daily = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .map((day) => ({
          date: new Date(day.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          temp: Math.round(day.main.temp),
          desc: day.weather[0].description,
          icon: day.weather[0].icon,
        }));

      setForecast(daily);
    } catch (error) {
      alert("City not found!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">🌦️ Weather Forecast</h1>
        <SearchBox onSearch={fetchWeather} />
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : weather ? (
        <>
          <WeatherCard weather={weather} />
          <ForecastList forecast={forecast} />
        </>
      ) : (
        <p className="empty">Search for a city to see weather</p>
      )}
    </div>
  );
}

export default App;
