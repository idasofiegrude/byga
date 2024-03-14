import React from "react";
import {
  Sun,
  CloudLightning,
  CloudSun,
  Snowflake,
  Cloud,
  CloudDrizzle,
  Dot,
} from "lucide-react";

function WeatherCard({ city, temp, weatherId, date }) {
  let iconComponent;

  if (weatherId === "clear" || weatherId === "sun") {
    iconComponent = <Sun size={100} color={"yellow"} />;
  } else if (weatherId === "cloudy") {
    iconComponent = <Cloud size={100} color={"#f5f5f5"} />;
  } else if (weatherId === "snow") {
    iconComponent = <Snowflake size={100} color="white" />;
  } else if (weatherId === "rain") {
    iconComponent = <CloudDrizzle size={100} color="lightblue" />;
  } else if (weatherId === "sun and cloud") {
    iconComponent = <CloudSun size={100} color="white" />;
  } else {
    iconComponent = <Dot size={100} color="yellow" />;
  }

  // Anta at `date` er i formatet "YYYY-MM-DD"
  const dateObject = new Date(date);
  const dayOfWeekNumber = dateObject.getDay();

  const days = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];
  const dayOfWeek = days[dayOfWeekNumber];

  return (
    <div className="weather-card">
      <div className="weather-icon">{iconComponent}</div>
      <div className="weather-info">
        <div className="date">
          <span className="bold">{dayOfWeek}</span>{" "}
          {dateObject.toLocaleDateString()}
        </div>
        <div className="city">{city}</div>
      </div>
      <div>
        <div className="temp">{temp}°C</div>
      </div>
    </div>
  );
}

export default WeatherCard;
