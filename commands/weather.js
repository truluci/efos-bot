const fetch = require('node-fetch');

const createDropdownMenu = require('../utils/createDropdownMenu');

const CITIES_AND_DESCRIPTIONS = [
  {
    label: 'Ankara',
    description: 'efso sehir',
    value: 'Ankara'
  },
  {
    label: 'Glasgow',
    description: 'efso sehir bura da',
    value: 'Glasgow'
  },
  {
    label: 'Istanbul',
    description: 'burasi shitty biraz (alizade)',
    value: 'Istanbul'
  },
  {
    label: 'Antalya',
    description: 'mero sevdigi icin efso sehir',
    value: 'Antalya'
  }
];

module.exports = {
  name: 'Weather',
  description: 'See the weather of a city.\n`weather`',
  detailedDescription: 'See the weather of a city.\n\n`weather`\n\nYou can select a city from the dropdown menu. Contact the bot owner if you want to add a city to the list.',
  triggers: ['weather', 'hava'],
  execute(message) {
    createDropdownMenu(message, {
      content: 'neresi kanka?',
      customId: 'weather',
      options: CITIES_AND_DESCRIPTIONS
    });
  },
  getAndSendWeather(interaction) {
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
  }
};