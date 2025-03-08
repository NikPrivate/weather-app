import express from "express";
import axios from "axios";
import cors from "cors";
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY; //OpenWeather API Key

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Cannot fetched the weather data" });
  }
});

app.get("/timezone", async (req, res) => {
  const timeAPIKey = process.env.TIMEZONE_API_KEY;
  const lat = req.query.lat;
  const lon = req.query.lon;

  try {
    // Second API call: TimeZoneDB for time zone data using the lat/lon from the request
    const secondResponse = await axios.get(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeAPIKey}&format=json&by=position&lat=${lat}&lng=${lon}`
    );

    // Send the time zone data back to the client
    res.json(secondResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching time zone data" });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
