const setAvatar = require('../commands/avatar/setAvatar');
const sendWeatherByCity = require('../commands/weather/sendWeatherByCity');

module.exports = interaction => {
  if (!interaction.isStringSelectMenu() && !interaction.isButton())
    return;

  if (interaction.customId == 'weather') {
    sendWeatherByCity(interaction);
  } else if (interaction.customId == 'confirm-avatar-change' || interaction.customId == 'reject-avatar-change') {
    setAvatar(interaction);
  };
};