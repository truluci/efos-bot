const fetch = require('node-fetch');

module.exports = interaction => {
  const selectedValue = interaction.values[0];

  const params = new URLSearchParams({
    appid: process.env.WEATHER_API_KEY,
    lang: 'tr',
    q: selectedValue,
    units: 'metric',
  });
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?${params.toString()}`)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;

      interaction.channel.send(`${selectedValue} için hava ${Math.floor(temperature)}°C ve ${weatherDescription}`);
      interaction.deferUpdate();
    })
    .catch(error => {
      console.log(error);

      interaction.channel.send('bi sıkıntı çıktı kanzi');
      interaction.deferUpdate();
    });
};