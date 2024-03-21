// App.js
import React, { useState } from "react";
import SearchBox from "./components/search-box";
import WeatherCard from "./components/weather-card";

function App() {
  const [weatherDataList, setWeatherDataList] = useState([]);

  function handleWeatherData(data) {
    console.log(data[0]);
    setWeatherDataList((oldList) => [...oldList, ...data]);
  }
  return (
    <div className="app">
      <h1 class="title">Byga</h1>
      <SearchBox onWeatherData={handleWeatherData} />
      <div className="card-container">
        {weatherDataList.map((weatherData, index) => (
          <WeatherCard
            key={index}
            city={weatherData.cityname}
            temp={weatherData.temp}
            weatherId={weatherData.sky}
            country={weatherData.country}
            date={weatherData.date}
          />
        ))}
      </div>
      <h2 class="explaination-card">
        Legg inn din fremtidige reiserute, både by og datoen du befinner deg der
        så får du raskt oversikt over været som venter deg på veien.
      </h2>
    </div>
  );
}

export default App;
