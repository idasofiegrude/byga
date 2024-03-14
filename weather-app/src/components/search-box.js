import React, { useState } from "react";

// SearchBox.js
function SearchBox({ onWeatherData }) {
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  function handleInputChange(event) {
    console.log(event.target.value);
    setCity(event.target.value);
  }

  function getWeatherFromApi() {
    fetch(`${process.env.REACT_APP_API_URL}/by/${city}/${fromDate}/${toDate}`)
      .then((response) => response.json())
      .then((data) => onWeatherData(data))
      .catch((error) => console.error("Error:", error));
  }

  function handleKeyDown(event) {
    if (event.code === "Enter") {
      getWeatherFromApi();
    }
  }

  return (
    <div className="search-box">
      <input
        className="search-input"
        placeholder="by"
        type="text"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <input
        className="date-input"
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        placeholder="Fra dato"
      />
      <input
        className="date-input"
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        placeholder="Til dato"
      />

      <button className="search-button" onClick={getWeatherFromApi}>
        Søk
      </button>
    </div>
  );
}

export default SearchBox;
