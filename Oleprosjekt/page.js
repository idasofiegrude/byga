import WeatherCard from "./WeatherCard"
import { ArrowBigDown, Square } from "lucide-react";


export default function Home() {

  let weather = {"location":"Bologna","temp":20,"icon":"sun️"};

  return (
    <div className="container">
      <WeatherCard 
        location={weather.location}
        temp={weather.temp}
        icon={weather.icon}
       />
       <ArrowBigDown size={50} color="blue" />

    <WeatherCard 
        location={"Skudenes"}
        temp={10}
        icon={"rain"}
       />
       <ArrowBigDown size={50} color="blue" />

    <WeatherCard 
        location={"Bergen"}
        temp={5}
        icon={"snow"}
       />
    </div>
  )
}