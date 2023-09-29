


from flask import Flask
import requests

app = Flask(__name__)


def get_temperature(city):
    api_key = "922ea66953a2c3373bb4d23b90ed224f"
    response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric")
    data = response.json()
    # print(data)  # legg til denne linjen
    return data['main']['temp']

def get_sky(city):
    api_key = "922ea66953a2c3373bb4d23b90ed224f"
    response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric")
    data = response.json()
    # print(data)  # legg til denne linjen
    return data['weather'][0]['main']
    


@app.route('/by/<city>')
def home(city):
    cityname = str(city)
    temp = get_temperature(cityname)
    himmel = get_sky(cityname)

    return f"<h1>Temperaturen i {cityname} er nå {temp} grader Celsius.</h1><h1>The sky in Bologna is now: {himmel} </h1>"

if __name__ == '__main__':
    app.run(debug=True)


