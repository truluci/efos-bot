const Discord = require('discord.js');

const CITIES_AND_DESCRIPTIONS = {
  'Ankara': {
    description: 'efso sehir',
    value: 'Ankara'
  },
  'Glasgow': {
    description: 'efso sehir bura da',
    value: 'Glasgow'
  },
  'Istanbul': {
    description: 'burasi shitty biraz (alizade)',
    value: 'Istanbul'
  }
};

module.exports = async (message) => {
  const options = Object.keys(CITIES_AND_DESCRIPTIONS).map(city => {
    return new Discord.StringSelectMenuOptionBuilder()
      .setLabel(city)
      .setDescription(CITIES_AND_DESCRIPTIONS[city].description)
      .setValue(CITIES_AND_DESCRIPTIONS[city].value);
  });

  await message.reply({
    content: 'neresi kanka?',
    components: [
      new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.StringSelectMenuBuilder()
            .setCustomId('weather')
            .addOptions(options)
      )
    ],
  });
};