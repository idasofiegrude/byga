import React, { useState, useEffect } from "react";

function SearchBox({ onWeatherData }) {
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    // Setter fra- og tildatoer ved første render
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setFromDate(today.toISOString().split("T")[0]);
    setToDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  function handleInputChange(event) {
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
      <label htmlFor="city-input" className="input-label">
        By:
      </label>
      <input
        id="city-input"
        className="search-input"
        placeholder="Skriv inn by"
        type="text"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor="from-date" className="input-label">
        Fra dato:
      </label>
      <input
        id="from-date"
        className="date-input"
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <label htmlFor="to-date" className="input-label">
        Til dato:
      </label>
      <input
        id="to-date"
        className="date-input"
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />

      <button className="search-button" onClick={getWeatherFromApi}>
        Søk
      </button>
    </div>
  );
}

export default SearchBox;
