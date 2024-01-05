
import React from 'react';
import {Sun, CloudLightning, CloudSun, Snowflake, Cloud, CloudDrizzle, Dot} from "lucide-react";


function WeatherCard({city, temp, weatherId, country, date}) {
    let iconComponent;

    if(weatherId === "clear"){
        iconComponent = <Sun size={100} color={"yellow"}/>;

    } else if(weatherId === "cloudy" ){
        iconComponent = <Cloud size={100} color={"#f5f5f5"} />;

    } else if(weatherId === "snow" ){
        iconComponent = <Snowflake size={100} />;

    } else if (weatherId === "rain" ){
        iconComponent = <CloudDrizzle size={100} color="lightblue" />;

    } else if (weatherId === "sun and cloud"){
        iconComponent = <CloudSun size={100} color="yellow" />;
    }
    
    else if (weatherId === "lightning and thunder")
        iconComponent = <CloudLightning size={100} color='yellow'/>

    else {
        iconComponent = <Dot size={100} color="yellow"/>;
    }
    
    
    return (
        
      <div className='weather-card'>
        <div className='weather-icon'>
             {iconComponent}
        </div>
        <div className='weather-info'>
            <div className='city'>{city} ({country})</div>
            <div className='temp'>{temp}°C</div>
            <div className='date'>{date}</div>

        </div>
      </div>

    );
  }

  export default WeatherCard;


