import React, { useState } from "react";
import axios from "axios";
import "./Data.scss";

function WeatherComponent() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}`
      )
      .then((response) => {
        setWeatherData(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
    <nav className="navbar">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#home">
          Check Weather
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#about">
          About
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#services">
          Services
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#contact">
          Contact
        </a>
      </li>
    </ul>
  </nav>
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          class="form__field"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
        <label for="Enter location" class="form__label">
          Enter location
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <div class="card">
            <div class="container">
            <img src={weatherData.current.condition.icon} alt='' />
            </div>

            <div class="card-header">
              <span>
                {weatherData.location.name}, {weatherData.location.region},
                <br/>
                {weatherData.location.country}
              </span>
              <span>{weatherData.current.last_updated}</span>
              <span>Condition: {weatherData.current.condition.text}</span>
            </div>

            <span class="temp">{weatherData.current.temp_c}°C</span>

            <div class="temp-scale">
              <span>Celcius</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherComponent;
