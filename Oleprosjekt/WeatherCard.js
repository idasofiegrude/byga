
import {Sun, Snowflake, Cloud, CloudDrizzle} from "lucide-react";


const WeatherCard = ({location, temp, icon}) => {
    //Icon can be "sun", "cloud", "snow" or "rain"
    let iconComponent;

    switch(icon) {
        case "sun":
            iconComponent = <Sun size={50} color={"yellow"}/>;
            break;
        case "cloud":
            iconComponent = <Cloud size={50} color={"#f5f5f5"} />;
            break;
        case "snow":
            iconComponent = <Snowflake size={50} />;
            break;
        case "rain":
            iconComponent = <CloudDrizzle size={50} color="lightblue" />;
            break;
        default:
            iconComponent = <Sun size={50} color="yellow"/>;
            break;
    }
    return (
        <div className="weather-card">
            <div className="weather-icon">
                {iconComponent}
            </div>
            <div className="weather-info">
                <div className="weather-location">{location}</div>
                <div className="weather-temp">{temp} °C</div>
            </div>
        </div>
    )
}

export default WeatherCard;
