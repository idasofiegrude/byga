import React from "react";
import {
  Sun,
  CloudSun,
  Snowflake,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
} from "lucide-react";

const weatherConfig = {
  clear: { icon: Sun, color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
  sun: { icon: Sun, color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
  cloudy: { icon: Cloud, color: "#cbd5e1", bg: "rgba(203,213,225,0.15)" },
  snow: { icon: Snowflake, color: "#bae6fd", bg: "rgba(186,230,253,0.15)" },
  rain: { icon: CloudRain, color: "#93c5fd", bg: "rgba(147,197,253,0.15)" },
  "sun and cloud": { icon: CloudSun, color: "#fcd34d", bg: "rgba(252,211,77,0.15)" },
  drizzle: { icon: CloudDrizzle, color: "#93c5fd", bg: "rgba(147,197,253,0.15)" },
  "lightning and thunder": { icon: CloudLightning, color: "#e879f9", bg: "rgba(232,121,249,0.15)" },
};

function WeatherCard({ city, temp, weatherId, date, compact }) {
  const config = weatherConfig[weatherId] ?? { icon: Cloud, color: "#cbd5e1", bg: "rgba(203,213,225,0.15)" };
  const IconComponent = config.icon;

  const dateObject = new Date(date);
  const days = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
  const dayOfWeek = days[dateObject.getDay()];
  const formattedDate = dateObject.toLocaleDateString("no-NO", {
    day: "numeric",
    month: "short",
  });

  if (compact) {
    return (
      <div className="weather-card-compact">
        <div className="wcc-icon-wrapper" style={{ background: config.bg }}>
          <IconComponent size={22} color={config.color} strokeWidth={1.5} />
        </div>
        <div className="wcc-day">{dayOfWeek.slice(0, 3)}</div>
        <div className="wcc-date">{formattedDate}</div>
        <div className="wcc-temp">{temp}°</div>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div className="weather-icon-wrapper" style={{ background: config.bg }}>
        <IconComponent size={36} color={config.color} strokeWidth={1.5} />
      </div>
      <div className="weather-info">
        <div className="weather-city">{city}</div>
        <div className="weather-date">
          {dayOfWeek} · {formattedDate}
        </div>
      </div>
      <div className="weather-temp">{temp}°</div>
    </div>
  );
}

export default WeatherCard;
