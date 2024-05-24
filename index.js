
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const WeatherApp = () => {
  const [place, setPlace] = useState('');
  const [speed, setSpeed] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [status, setStatus] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [humidity, setHumidity] = useState('');
  const [pressure, setPressure] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [temp, setTemp] = useState('');
  const [search, setSearch] = useState('goa');

  const apiKey = 'abd58d704d28a32983ed897c81173f13';

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const weatherData = await response.json();

    setTemp(weatherData.main.temp);
    setPlace(weatherData.name);
    setLongitude(weatherData.coord.lon);
    setLatitude(weatherData.coord.lat);
    setStatus(weatherData.weather[0].main);
    setSpeed(weatherData.wind.speed);
    setMin(weatherData.main.temp_min);
    setMax(weatherData.main.temp_max);
    setPressure(weatherData.main.pressure);
    setHumidity(weatherData.main.humidity);
    setSunrise(new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString());
    setSunset(new Date(weatherData.sys.sunset * 1000).toLocaleTimeString());
  };

  useEffect(() => {
    fetchWeatherData(search);
  }, []);

  return (
    <div className="weather-container">
      <div className="search-container">
        <input
          type="text"
          value={search}
          placeholder="Ex: Bangalore, Goa,..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            fetchWeatherData(search);
            setSearch('');
          }}
        >
          Search
        </button>
      </div>
      <div className="degrees">
        <i className="bi bi-cloud-sun-fill"></i>
        <h1>{place}</h1>
        <h1>{temp}°C</h1>
        <div className="all-data-container">
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-globe2"></i>
              </h1>
              <h1>Longitude</h1>
            </div>
            <h1>{longitude}</h1>
          </div>
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-globe-americas"></i>
              </h1>
              <h1>Latitude</h1>
            </div>
            <h1>{latitude}</h1>
          </div>
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-cloud-lightning-rain"></i>
              </h1>
              <h1>Min Temperature</h1>
            </div>
            <h1>{min}°C</h1>
          </div>
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-brightness-high"></i>
              </h1>
              <h1>Max Temperature</h1>
            </div>
            <h1>{max}°C</h1>
          </div>
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-wind"></i>
              </h1>
              <h1>Pressure</h1>
            </div>
            <h1>{pressure} hPa</h1>
          </div>
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-cloud-fog2"></i>
              </h1>
              <h1>Humidity</h1>
            </div>
            <h1>{humidity}%</h1>
          </div>
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-speedometer"></i>
              </h1>
              <h1>Wind Speed</h1>
            </div>
            <h1>{speed} m/s</h1>
          </div>
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-sunrise"></i>
              </h1>
              <h1>Sunrise</h1>
            </div>
            <h1>{sunrise}</h1>
          </div>
          <div className="data">
            <div className="icon-flex">
              <h1 className="icon">
                <i className="bi bi-sunset"></i>
              </h1>
              <h1>Sunset</h1>
            </div>
            <h1>{sunset}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WeatherApp />);
