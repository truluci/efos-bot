const fetch = require('node-fetch');

const createDropdownMenu = require('../utils/createDropdownMenu');

const CITIES_AND_DESCRIPTIONS = {
  en: [
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
  ],
  tr: [
    {
      label: 'Ankara',
      description: 'legendary city',
      value: 'Ankara'
    },
    {
      label: 'Glasgow',
      description: 'legendary city too',
      value: 'Glasgow'
    },
    {
      label: 'Istanbul',
      description: 'shitty city (alizade)',
      value: 'Istanbul'
    },
    {
      label: 'Antalya',
      description: 'legendary city too (mero)',
      value: 'Antalya'
    }
  ]
};
const RESPONSES = {
  ask_city: {
    en: 'Select a city',
    tr: 'neresi kanka?'
  },
  error: {
    en: 'An error occured',
    tr: 'bi sıkıntı çıktı kanzi'
  }
};

module.exports = {
  name: {
    en: 'Weather',
    tr: 'Hava'
  },
  description: {
    en: 'See the weather of a city.\n`weather`',
    tr: 'Bir şehrin hava durumunu görüntüler.\n`hava`'
  },
  detailedDescription: {
    en: 'See the weather of a city.\n\n`weather`\n\nYou can select a city from the dropdown menu. Contact the bot owner if you want to add a city to the list.',
    tr: 'Bir şehrin hava durumunu görüntüler.\n\n`hava`\n\nAçılır menüden bir şehir seçebilirsiniz. Listeye bir şehir eklemek isterseniz bot sahibiyle iletişime geçin.'
  },
  triggers: ['weather', 'hava'],
  execute(message) {
    const lang = message.content.toLowerCase().split(' ')[0] == this.triggers[0] ? 'en' : 'tr';

    createDropdownMenu(message, {
      content: RESPONSES.ask_city[lang],
      customId: lang == 'en' ? 'weather' : 'hava',
      options: CITIES_AND_DESCRIPTIONS[lang]
    });
  },
  getAndSendWeather(interaction) {
    const selectedValue = interaction.values[0];
    const lang = interaction.customId == 'weather' ? 'en' : 'tr';

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

        if (lang == 'en')
          interaction.channel.send(`Weather for ${selectedValue} is ${Math.floor(temperature)}°C and ${weatherDescription}`);
        else
          interaction.channel.send(`${selectedValue} için hava ${Math.floor(temperature)}°C ve ${weatherDescription}`);

        interaction.deferUpdate();
      })
      .catch(error => {
        console.log(error);

        interaction.channel.send(RESPONSES.error[lang]);
        interaction.deferUpdate();
      });
  }
};