const changeBotsAvatar = require('../commands/changeBotsAvatar');
const weather = require('../commands/weather');

module.exports = async (interaction) => {
  if (!interaction.isStringSelectMenu() && !interaction.isButton())
    return;

  if (interaction.customId == 'weather') {
    weather(interaction);
  } else if (interaction.customId == 'confirm-avatar-change' || interaction.customId == 'reject-avatar-change') {
    changeBotsAvatar(interaction);
  };
};