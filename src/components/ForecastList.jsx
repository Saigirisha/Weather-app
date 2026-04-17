import React from "react";
import "./ForecastList.css";

const ForecastingList = ({ forecast }) => {
  if (!forecast.length) return null;

  return (
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <div className="forecast-card" key={index}>
          <p className="day">{day.date}</p>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt="weather icon"
          />
          <p className="temp">{day.temp}°C</p>
          <p className="desc">{day.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastingList;
