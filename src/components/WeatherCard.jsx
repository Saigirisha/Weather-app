import { useState, useEffect } from "react";
import "./WeatherCard.css";

import SunWithClouds from "../assets/sun-with-cloud.png";
import Winter from "../assets/winter.png";
import Rain from "../assets/rain.png";
import Summer from "../assets/summer.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

const WeatherCard = ({ weather }) => {
  const [date] = useState(new Date());
  const [weatherImage, setWeatherImage] = useState(SunWithClouds);

  useEffect(() => {
    if (!weather) return;

    const desc = weather.desc.toLowerCase();

    if (desc.includes("rain")) setWeatherImage(Rain);
    else if (desc.includes("snow")) setWeatherImage(Winter);
    else if (desc.includes("clear")) setWeatherImage(Summer);
    else if (desc.includes("cloud")) setWeatherImage(SunWithClouds);
    else setWeatherImage(SunWithClouds);
  }, [weather]);

  if (!weather) return null;

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="weather-card">
      <h2 className="city">{weather.city}</h2>

      <h2 className="date">
        {date.toLocaleDateString("en-US", { weekday: "long" })} {formattedTime}
      </h2>

      <div className="weather-icon">
        <img src={weatherImage} alt={weather.desc} />
      </div>

      <h1 className="temperature">{weather.temp}°C</h1>
      <p className="description">{weather.desc}</p>

      <div className="extra-info">
        <div className="info-box">
          <img src={humidity} alt="Humidity" />
          <div>
            <p>Humidity</p>
            <p className="value">{weather.humidity}%</p>
          </div>
        </div>

        <div className="info-box">
          <img src={wind} alt="Wind" />
          <div>
            <p>Wind</p>
            <p className="value">{weather.wind} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
