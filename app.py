

from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


#lager en klasse 
class CityWeather:
    temp:int
    sky:str
    def __init__(self, temp, sky, humidity) -> None:
        self.temp = temp
        self.sky = sky 
        self.humidity = humidity


#lager en funksjon 

def get_weather(city:str)->CityWeather: #det betyr at funksjonen vil returnere et CityWeather objekt
    
    #denne delen av koden henter ut all data fra api-et med en nøkkel 
    #og den byen som sendes inn som parameter 
    api_key = "922ea66953a2c3373bb4d23b90ed224f"
    response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric")
    data = response.json()

    #denne delen av koden henter ut infoen fra dataen - temp og sky - og lagrer den i variabler

    temp = data["main"]["temp"]
    sky = data["weather"][0]["main"]
    humidity = data["main"]["humidity"]


    #så bruker jeg de variablene til å laget et klasseobjekt av den klassen - 
    # CityWeather - der jeg trenger temp og sky som parametrer

    weatherobjekt = CityWeather(temp,sky,humidity)

    #alt dette for at jeg skal returnere begge deler samtidig, 
    #fordelen er at jeg bare trenger å hente ut all dataen en gang og bare returnere det samtidig

    return weatherobjekt 


# bruker flask
@app.route('/by/<city>') #<city> er at det kan være hvilken som helst city
def get_weather_api(city):
    cityname = str(city)
    weather = get_weather(cityname)
    return vars(weather) 
#vars er en funksjon som endrer json til en dictonary
#fordi det er det som fungerer i python



if __name__ == '__main__':
    app.run(debug=True)