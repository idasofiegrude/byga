import requests
from classes import LocationWeather

def get_weather_from_open_weather(city:str)->LocationWeather: #det betyr at funksjonen vil returnere et CityWeather objekt
    
    #denne delen av koden henter ut all data fra api-et med en nøkkel 
    #og den byen som sendes inn som parameter 
    api_key = "922ea66953a2c3373bb4d23b90ed224f"
    response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric")
    data = response.json()

    #denne delen av koden henter ut infoen fra dataen - temp og sky - og lagrer den i variabler

    temp = data["main"]["temp"]
    sky = data["weather"][0]["id"]
    dato = "2023-10-25/2023-10-28"
    cityname = data["name"]
    country = data["sys"]["country"]
   

    #så bruker jeg de variablene til å laget et klasseobjekt av den klassen - 
    # CityWeather - der jeg trenger temp og sky som parametrer

    weatherobjekt = LocationWeather(cityname=cityname, temp=temp,weatherId=sky)

    #alt dette for at jeg skal returnere begge deler samtidig, 
    #fordelen er at jeg bare trenger å hente ut all dataen en gang og bare returnere det samtidig

    return weatherobjekt
