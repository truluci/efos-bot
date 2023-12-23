const avatar = require('../commands/avatar');
const vote = require('../commands/vote');
const weather = require('../commands/weather');

module.exports = interaction => {
  if (!interaction.isStringSelectMenu() && !interaction.isButton())
    return;

  if (interaction.customId.includes('weather')) {
    weather.getAndSendWeather(interaction);
  } else if (interaction.customId.includes('confirm-set-avatar') || interaction.customId.includes('reject-set-avatar')) {
    avatar.handleInteraction(interaction);
  } else if (interaction.customId.includes('unpin-affirmation')) {
    vote.handleInteraction(interaction);
  };
};