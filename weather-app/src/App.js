import React, { useState } from "react";
import SearchBox from "./components/search-box";
import WeatherCard from "./components/weather-card";

function App() {
  const [trips, setTrips] = useState([]);

  function handleTripData(trip) {
    setTrips(prev => [...prev, trip]);
  }

  return (
    <div className="app">
      <h1 className="title">Byga</h1>
      <div className="explanation-card">
        Legg inn din fremtidige reiserute — by for by og datoen du befinner deg
        der, så får du raskt oversikt over været som venter deg. God tur 🥰
      </div>
      <SearchBox onTripData={handleTripData} />
      {trips.length > 0 && (
        <div className="timeline">
          {trips.map((trip, i) => (
            <div className="timeline-stop" key={i}>
              <div className="timeline-spine">
                <div className="timeline-dot" />
                {i < trips.length - 1 && <div className="timeline-connector" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-city">{trip.city}</span>
                  <span className="timeline-range">{trip.fromDate} → {trip.toDate}</span>
                </div>
                <div className="timeline-cards">
                  {trip.days.map((day, j) => (
                    <WeatherCard
                      key={j}
                      compact
                      city={day.cityname}
                      temp={day.temp}
                      weatherId={day.sky}
                      date={day.date}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
