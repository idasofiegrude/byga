import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const DateRangeButton = React.forwardRef(({ value, onClick }, ref) => (
  <button className="date-range-button" onClick={onClick} ref={ref} type="button">
    <Calendar size={15} strokeWidth={2} />
    {value || "Velg datoer"}
  </button>
));

function SearchBox({ onTripData }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date(Date.now() + 86400000)]);
  const [startDate, endDate] = dateRange;
  const debounceRef = useRef(null);

  function handleCityChange(e) {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(true);
    clearTimeout(debounceRef.current);
    if (value.length < 2) { setSuggestions([]); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=8`
        );
        const data = await res.json();
        const names = data.features
          .filter(f => ["city", "town", "village"].includes(f.properties.type))
          .map(f => {
            const { name, country } = f.properties;
            return country ? `${name}, ${country}` : name;
          })
          .filter((v, i, arr) => arr.indexOf(v) === i)
          .slice(0, 5);
        setSuggestions(names);
      } catch {}
    }, 300);
  }

  function selectSuggestion(name) {
    setCity(name);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  function search() {
    if (!city.trim() || !startDate || !endDate) return;
    fetch(
      `${process.env.REACT_APP_API_URL}/by/${encodeURIComponent(city)}/${formatDate(startDate)}/${formatDate(endDate)}`
    )
      .then(r => r.json())
      .then(days => onTripData({ city, fromDate: formatDate(startDate), toDate: formatDate(endDate), days }))
      .catch(console.error);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") search();
  }

  return (
    <div className="search-box">
      <div className="autocomplete-wrapper">
        <label className="input-label">By</label>
        <input
          className="search-input"
          placeholder="Skriv inn by"
          value={city}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item" onMouseDown={() => selectSuggestion(s)}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="date-picker-wrapper">
        <label className="input-label">Reiseperiode</label>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={setDateRange}
          minDate={new Date()}
          dateFormat="d. MMM"
          customInput={<DateRangeButton />}
          popperPlacement="bottom-start"
        />
      </div>

      <button className="search-button" onClick={search}>
        Legg til by +
      </button>
    </div>
  );
}

export default SearchBox;
