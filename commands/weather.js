const fetch = require('node-fetch');

const { weather } = require('../config');
const createDropdownMenu = require('../utils/createDropdownMenu');

module.exports = {
  name: weather.info.name,
  description: weather.info.description,
  detailedDescription: weather.info.detailedDescription,
  triggers: weather.info.triggers,
  execute(message) {
    const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr';

    createDropdownMenu(message, {
      content: weather.responses.ask_city[lang],
      customId: `weather-${lang}`,
      options: weather.cities[lang]
    });
  },
  getAndSendWeather(interaction) {
    const selectedValue = interaction.values[0];
    const lang = interaction.customId.split('-').pop();

    const params = new URLSearchParams({
      appid: process.env.WEATHER_API_KEY,
      lang: lang,
      q: selectedValue,
      units: 'metric',
    });

    fetch(`https://api.openweathermap.org/data/2.5/weather?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;

        interaction.channel.send(
          weather.message[lang]
            .replace('{city}', selectedValue)
            .replace('{temperature}', Math.floor(temperature))
            .replace('{weatherDescription}', weatherDescription)
        );

        interaction.deferUpdate();
      })
      .catch(error => {
        console.log(error);

        interaction.channel.send(weather.responses.error[lang]);
        interaction.deferUpdate();
      });
  }
};