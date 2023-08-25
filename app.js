const express = require('express');
const request = require('request');

const app = express();
const apiKey = '9f30edf5577b96aa7a77b04b40fd45c0';

app.use(express.json());

app.post('/getWeather', (req, res) => {
  const {cities} = req.body;
  const weatherData = {};

    if(!cities) {
      return res.status(400).json({ error: 'Cities array is required' });
    }

  cities.forEach((city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const temperature = data.main.temp;
        weatherData[city] = `${temperature}C`;

        if (Object.keys(weatherData).length === cities.length) {
          res.json({ weather: weatherData });
        }
      }
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
