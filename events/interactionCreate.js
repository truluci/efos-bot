const avatar = require('../commands/avatar');
const weather = require('../commands/weather');

module.exports = interaction => {
  if (!interaction.isStringSelectMenu() && !interaction.isButton())
    return;

  if (weather.triggers.includes(interaction.customId)) {
    weather.getAndSendWeather(interaction);
  } else if (interaction.customId == 'confirm-set-avatar' || interaction.customId == 'reject-set-avatar') {
    avatar.handleInteraction(interaction);
  };
};