import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Map from './Map';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState('');
  const [locationData, setLocationData] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [title, setTitle] = useState("");
  const [splooshData, setSplooshData] = useState("");

  const handleSearch = () => {
    if (query) {
      axios.get(`https://weather-app-972u.onrender.com/api-data?search=${query}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });

      getData();
      getSplooshData();
    }
  }

  const getData = () => {
    if (query) {
      axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.afb342d4c91f573489b33b65cb1c0f3f&q=${query}&format=json`)
        .then(response => {
          if (response.data[0]) {
            const { lat, lon } = response.data[0];
            setLocationData(`Latitude: ${lat}, Longitude: ${lon}`);
            setLat(lat);
            setLon(lon);
          } else {
            setLocationData('Location not found');
            setLat(null);
            setLon(null);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const getSplooshData = () => {
    if (query) {
      axios.get(`https://weather-app-972u.onrender.com/sploosh-data?search=${query}`)
        .then(response => {
          setSplooshData(response.data);
        })
        .catch(error => {
          console.error('Error fetching sploosh data:', error);
        });
    }
  }

  const handleQueryChange = event => {
    setQuery(event.target.value);
  };

  const handleReset = () => {
    setWeatherData('');
    setQuery('');
    setLocationData('');
    setLat(null);
    setLon(null);
    setTitle('');
    setSplooshData('');
  }

  return (
    <div className="App">
      <div id="input-section">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter a city or location"
          value={query}
          onChange={handleQueryChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weatherData ? (
        <div id="weather-section">
          <h1>Weather Information</h1>
          <p>Temperature: {weatherData.temperature} K</p>
          <p>Description: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Title: {weatherData.image}</p>
        </div>
      ) : null}

      <div>
        <h1>Location Data</h1>
        {locationData ? <h2>{locationData}</h2> : null}
        {lat && lon && <Map lat={lat} lon={lon} />}
      </div>

      <div id="button-container">
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
