const express = require("express");
const cors = require("cors");
const axios = require('axios');

require("dotenv").config();
const PORT = 8080;
const app = express();
app.use(cors());

app.get("/api-data", async (request, response) => {
    try {
      const search = request.query.search;
      const weatherAPI = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d4f0a78dda6dc24e04bb2529264ab939`);
      
      const weatherData = {
        temperature: weatherAPI.data.main.temp,
        description: weatherAPI.data.weather[0].description,
        humidity: weatherAPI.data.main.humidity,
      };
      
      response.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      response.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });
  


//leave alone
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));


  