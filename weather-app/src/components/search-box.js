
  import React, { useState } from 'react';


// SearchBox.js
function SearchBox({ onWeatherData }) {
    const [city, setCity] = useState('');

    function handleInputChange(event) {
        console.log(event.target.value)
        setCity(event.target.value);
    }

    function getWeatherFromApi() {
        fetch('http://127.0.0.1:5000/by/' + city + "/2023-11-02" + "/2023-11-03")
            .then(response => response.json())
            .then((data)=>onWeatherData(data))
            .catch(error => console.error('Error:', error));
    }

    function handleKeyDown(event){
        if(event.code === "Enter"){
            getWeatherFromApi()
        }
    }

    return (
        <div className='search-box'>

            <input 
            className='search-input' 
            placeholder='by' 
            type="text" 
            value={city} 
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
             />

            <button className='search-button' onClick={getWeatherFromApi}>Søk</button>
            
        </div>
    );
}

export default SearchBox;
